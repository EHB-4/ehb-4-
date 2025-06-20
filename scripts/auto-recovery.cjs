const { spawn, exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const execAsync = promisify(exec);

class AutoRecoverySystem {
  constructor() {
    this.projectRoot = process.cwd();
    this.port = 5500;
    this.maxRetries = 3;
    this.retryDelay = 5000; // 5 seconds
    this.monitorInterval = 10000; // 10 seconds
    this.logFile = path.join(this.projectRoot, 'logs', 'auto-recovery.log');
  }

  log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    console.log(logMessage.trim());
    fs.appendFileSync(this.logFile, logMessage);
  }

  async checkServerHealth() {
    try {
      const response = await fetch(`http://localhost:${this.port}/api/health`);
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  async checkDatabaseHealth() {
    try {
      const response = await fetch(`http://localhost:${this.port}/api/health/db`);
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  async checkMemoryUsage() {
    const { stdout } = await execAsync(
      'wmic OS get FreePhysicalMemory,TotalVisibleMemorySize /Value'
    );
    const lines = stdout.split('\n');
    const freeMemory = parseInt(lines[0].split('=')[1]);
    const totalMemory = parseInt(lines[1].split('=')[1]);
    const memoryUsagePercent = ((totalMemory - freeMemory) / totalMemory) * 100;

    return {
      freeMemory,
      totalMemory,
      memoryUsagePercent,
      isHealthy: memoryUsagePercent < 90,
    };
  }

  async restartServer() {
    this.log('🔄 Restarting server...');

    try {
      // Kill existing processes
      await execAsync('taskkill /F /IM node.exe');
      await execAsync(`npx kill-port ${this.port}`);

      // Clear Next.js cache
      await execAsync('npm run clean');

      // Start server
      spawn('npm', ['run', 'start-dev'], {
        cwd: this.projectRoot,
        stdio: 'inherit',
        shell: true,
      });

      this.log('✅ Server restarted successfully');
    } catch (error) {
      this.log(`❌ Failed to restart server: ${error.message}`);
    }
  }

  async clearNodeModules() {
    this.log('🧹 Clearing node_modules...');

    try {
      await execAsync('rmdir /s /q node_modules');
      await execAsync('npm install');
      this.log('✅ Dependencies reinstalled successfully');
    } catch (error) {
      this.log(`❌ Failed to clear node_modules: ${error.message}`);
    }
  }

  async fixCommonErrors() {
    this.log('🔧 Fixing common errors...');

    try {
      // Fix TypeScript errors
      await execAsync('npm run type-check');

      // Fix ESLint errors
      await execAsync('npm run lint -- --fix');

      // Fix Prettier formatting
      await execAsync('npm run format');

      this.log('✅ Common errors fixed');
    } catch (error) {
      this.log(`⚠️ Some errors could not be fixed: ${error.message}`);
    }
  }

  async performEmergencyRecovery() {
    this.log('🚨 Starting emergency recovery...');

    try {
      // Stop all processes
      await execAsync('taskkill /F /IM node.exe');
      await execAsync(`npx kill-port ${this.port}`);

      // Clear caches
      await execAsync('npm run clean');
      await execAsync('npm cache clean --force');

      // Remove problematic directories
      await execAsync('rmdir /s /q .next');
      await execAsync('rmdir /s /q node_modules');

      // Reinstall everything
      await execAsync('npm install');

      // Fix common errors
      await this.fixCommonErrors();

      // Restart server
      await this.restartServer();

      this.log('✅ Emergency recovery completed');
    } catch (error) {
      this.log(`❌ Emergency recovery failed: ${error.message}`);
    }
  }

  async monitorAndRecover() {
    this.log('👀 Starting system monitoring...');

    let failureCount = 0;

    setInterval(async () => {
      try {
        // Check server health
        const isServerHealthy = await this.checkServerHealth();
        const isDatabaseHealthy = await this.checkDatabaseHealth();
        const memoryStatus = await this.checkMemoryUsage();

        if (!isServerHealthy || !isDatabaseHealthy || !memoryStatus.isHealthy) {
          failureCount++;
          this.log(`⚠️ Health check failed (Attempt ${failureCount}/${this.maxRetries})`);

          if (failureCount >= this.maxRetries) {
            this.log('🚨 Multiple failures detected, performing emergency recovery...');
            await this.performEmergencyRecovery();
            failureCount = 0;
          } else {
            await this.restartServer();
          }
        } else {
          failureCount = 0;
          this.log('✅ System healthy');
        }

        // Monitor memory usage
        if (memoryStatus.memoryUsagePercent > 80) {
          this.log(`⚠️ High memory usage: ${memoryStatus.memoryUsagePercent.toFixed(2)}%`);
        }
      } catch (error) {
        this.log(`❌ Monitoring error: ${error.message}`);
      }
    }, this.monitorInterval);
  }

  async start() {
    this.log('🚀 Starting Auto Recovery System');
    await this.monitorAndRecover();
  }
}

// Start if run directly
if (require.main === module) {
  const recovery = new AutoRecoverySystem();
  recovery.start();
}

module.exports = AutoRecoverySystem;
