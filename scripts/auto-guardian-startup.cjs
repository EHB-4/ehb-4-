const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const execAsync = promisify(exec);

class AutoGuardianStartup {
  constructor() {
    this.projectRoot = process.cwd();
    this.guardianProcess = null;
    this.isRunning = false;
  }

  log(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
  }

  async checkDependencies() {
    this.log('🔍 Checking dependencies...');

    try {
      // Check if kill-port is installed
      await execAsync('npx kill-port --version');
      this.log('✅ kill-port is available');
    } catch (error) {
      this.log('📦 Installing kill-port...');
      await execAsync('npm install -g kill-port');
    }
  }

  async startGuardian() {
    if (this.isRunning) {
      this.log('⚠️ Guardian already running');
      return;
    }

    this.log('🚀 Starting Port 5500 Guardian...');

    try {
      this.guardianProcess = spawn('node', ['scripts/port-5500-guardian.cjs'], {
        cwd: this.projectRoot,
        stdio: 'inherit',
        shell: true,
      });

      this.isRunning = true;

      this.guardianProcess.on('close', code => {
        this.log(`⚠️ Guardian process closed with code ${code}`);
        this.isRunning = false;

        // Restart guardian after 5 seconds
        setTimeout(() => {
          this.log('🔄 Restarting guardian...');
          this.startGuardian();
        }, 5000);
      });

      this.guardianProcess.on('error', error => {
        this.log(`❌ Guardian process error: ${error.message}`);
        this.isRunning = false;
      });
    } catch (error) {
      this.log(`❌ Failed to start guardian: ${error.message}`);
      this.isRunning = false;
    }
  }

  async autoGitPush() {
    try {
      this.log('🔄 Auto Git push...');

      const { stdout: status } = await execAsync('git status --porcelain');

      if (status.trim()) {
        await execAsync('git add .');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        await execAsync(`git commit -m "Auto-commit: ${timestamp} - Guardian Update"`);
        await execAsync('git push');
        this.log('✅ Auto Git push completed');
      } else {
        this.log('ℹ️ No changes to commit');
      }
    } catch (error) {
      this.log(`❌ Auto Git push failed: ${error.message}`);
    }
  }

  async start() {
    this.log('🎯 Auto Guardian Startup Started');
    this.log(`📁 Project Root: ${this.projectRoot}`);

    // Check dependencies
    await this.checkDependencies();

    // Start guardian
    await this.startGuardian();

    // Set up auto Git push every 15 minutes
    setInterval(
      async () => {
        await this.autoGitPush();
      },
      15 * 60 * 1000
    );

    // Handle process termination
    process.on('SIGINT', () => {
      this.log('🛑 Shutting down...');
      if (this.guardianProcess) {
        this.guardianProcess.kill();
      }
      process.exit(0);
    });

    process.on('SIGTERM', () => {
      this.log('🛑 Shutting down...');
      if (this.guardianProcess) {
        this.guardianProcess.kill();
      }
      process.exit(0);
    });
  }
}

// Auto-start if this script is run directly
if (require.main === module) {
  const startup = new AutoGuardianStartup();
  startup.start();
}

module.exports = AutoGuardianStartup;
