#!/usr/bin/env node

/**
 * EHB Franchise Auto Launcher
 * Automatically starts and manages the franchise scanning system
 *
 * Features:
 * - Auto-starts on system boot
 * - Continuous monitoring
 * - Automatic restart on failure
 * - Performance optimization
 * - Resource management
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Initializing EHB Franchise Auto Launcher...');

// Configuration
const config = {
  scannerScript: path.join(__dirname, 'franchise-auto-scanner.js'),
  managerScript: path.join(__dirname, 'franchise-auto-manager.js'),
  logDir: path.join(__dirname, '../logs'),
  maxRetries: 3,
  retryDelay: 5000,
  healthCheckInterval: 30000,
};

// Ensure log directory exists
if (!fs.existsSync(config.logDir)) {
  fs.mkdirSync(config.logDir, { recursive: true });
}

class FranchiseAutoLauncher {
  constructor() {
    this.processes = new Map();
    this.retryCounts = new Map();
    this.isShuttingDown = false;
  }

  async start() {
    try {
      console.log('📋 Starting Franchise Auto System...');

      // Start scanner process
      await this.startProcess('scanner', config.scannerScript);

      // Wait a bit before starting manager
      await this.sleep(2000);

      // Start manager process
      await this.startProcess('manager', config.managerScript);

      console.log('✅ Franchise Auto System started successfully!');
      console.log('📊 Monitoring processes...');

      // Start health monitoring
      this.startHealthMonitoring();

      // Handle graceful shutdown
      this.setupGracefulShutdown();
    } catch (error) {
      console.error('❌ Failed to start Franchise Auto Launcher:', error.message);
      process.exit(1);
    }
  }

  async startProcess(name, scriptPath) {
    return new Promise((resolve, reject) => {
      console.log(`🔄 Starting ${name} process...`);

      const logFile = path.join(config.logDir, `${name}-${Date.now()}.log`);
      const logStream = fs.createWriteStream(logFile, { flags: 'a' });

      const child = spawn('node', [scriptPath], {
        stdio: ['pipe', 'pipe', 'pipe'],
        detached: false,
      });

      // Store process info
      this.processes.set(name, {
        process: child,
        logFile,
        logStream,
        startTime: Date.now(),
        status: 'starting',
      });

      // Handle stdout
      child.stdout.on('data', data => {
        const output = data.toString();
        logStream.write(`[${new Date().toISOString()}] ${output}`);
        console.log(`[${name.toUpperCase()}] ${output.trim()}`);
      });

      // Handle stderr
      child.stderr.on('data', data => {
        const output = data.toString();
        logStream.write(`[${new Date().toISOString()}] ERROR: ${output}`);
        console.error(`[${name.toUpperCase()}] ERROR: ${output.trim()}`);
      });

      // Handle process exit
      child.on('exit', (code, signal) => {
        const processInfo = this.processes.get(name);
        if (processInfo) {
          processInfo.status = 'exited';
          processInfo.exitCode = code;
          processInfo.exitSignal = signal;
          processInfo.logStream.end();
        }

        console.log(`[${name.toUpperCase()}] Process exited with code ${code}`);

        if (!this.isShuttingDown && code !== 0) {
          this.handleProcessFailure(name, scriptPath);
        }
      });

      // Handle process errors
      child.on('error', error => {
        console.error(`[${name.toUpperCase()}] Process error:`, error.message);
        logStream.write(`[${new Date().toISOString()}] PROCESS ERROR: ${error.message}\n`);

        if (!this.isShuttingDown) {
          this.handleProcessFailure(name, scriptPath);
        }
      });

      // Mark as started after a short delay
      setTimeout(() => {
        const processInfo = this.processes.get(name);
        if (processInfo && processInfo.process.exitCode === undefined) {
          processInfo.status = 'running';
          console.log(`✅ ${name} process started successfully`);
          resolve();
        }
      }, 3000);

      // Timeout for process start
      setTimeout(() => {
        const processInfo = this.processes.get(name);
        if (processInfo && processInfo.status === 'starting') {
          console.error(`❌ ${name} process failed to start within timeout`);
          reject(new Error(`${name} process failed to start`));
        }
      }, 10000);
    });
  }

  async handleProcessFailure(name, scriptPath) {
    const retryCount = this.retryCounts.get(name) || 0;

    if (retryCount < config.maxRetries) {
      console.log(
        `🔄 Retrying ${name} process (attempt ${retryCount + 1}/${config.maxRetries})...`
      );
      this.retryCounts.set(name, retryCount + 1);

      // Wait before retry
      await this.sleep(config.retryDelay);

      // Restart process
      try {
        await this.startProcess(name, scriptPath);
      } catch (error) {
        console.error(`❌ Failed to restart ${name} process:`, error.message);
      }
    } else {
      console.error(`❌ ${name} process failed after ${config.maxRetries} retries`);
      console.log(`📋 Please check the logs at: ${config.logDir}`);
    }
  }

  startHealthMonitoring() {
    setInterval(() => {
      if (this.isShuttingDown) return;

      console.log('🔍 Health check...');

      for (const [name, processInfo] of this.processes) {
        if (processInfo.status === 'running') {
          // Check if process is still alive
          if (processInfo.process.exitCode !== undefined) {
            console.log(`⚠️ ${name} process has exited, attempting restart...`);
            this.handleProcessFailure(
              name,
              name === 'scanner' ? config.scannerScript : config.managerScript
            );
          }
        }
      }
    }, config.healthCheckInterval);
  }

  setupGracefulShutdown() {
    const shutdown = async signal => {
      console.log(`\n🛑 Received ${signal}, shutting down gracefully...`);
      this.isShuttingDown = true;

      for (const [name, processInfo] of this.processes) {
        if (processInfo.status === 'running') {
          console.log(`🛑 Stopping ${name} process...`);
          processInfo.process.kill('SIGTERM');

          // Wait for graceful shutdown
          setTimeout(() => {
            if (processInfo.process.exitCode === undefined) {
              console.log(`⚠️ Force killing ${name} process...`);
              processInfo.process.kill('SIGKILL');
            }
          }, 5000);
        }
      }

      // Close log streams
      for (const processInfo of this.processes.values()) {
        if (processInfo.logStream) {
          processInfo.logStream.end();
        }
      }

      console.log('✅ Shutdown complete');
      process.exit(0);
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getStatus() {
    const status = {};
    for (const [name, processInfo] of this.processes) {
      status[name] = {
        status: processInfo.status,
        uptime: processInfo.status === 'running' ? Date.now() - processInfo.startTime : 0,
        logFile: processInfo.logFile,
      };
    }
    return status;
  }
}

// Start the launcher
const launcher = new FranchiseAutoLauncher();
launcher.start().catch(error => {
  console.error('❌ Failed to start Franchise Auto Launcher:', error.message);
  process.exit(1);
});

// Export for testing
module.exports = FranchiseAutoLauncher;
