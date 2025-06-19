const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const execAsync = promisify(exec);

class Port5500Guardian {
  constructor() {
    this.projectRoot = process.cwd();
    this.port = 5500;
    this.process = null;
    this.isRunning = false;
    this.restartCount = 0;
    this.maxRestarts = 10;
    this.checkInterval = 5000; // 5 seconds
    this.logFile = path.join(this.projectRoot, 'logs', 'port-5500-guardian.log');
    this.ensureLogDirectory();
  }

  ensureLogDirectory() {
    const logDir = path.dirname(this.logFile);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    console.log(logMessage.trim());
    fs.appendFileSync(this.logFile, logMessage);
  }

  async checkPortStatus() {
    try {
      const { stdout } = await execAsync(`netstat -ano | findstr :${this.port}`);
      return stdout.includes(`:${this.port}`);
    } catch (error) {
      return false;
    }
  }

  async killPort() {
    try {
      await execAsync(`npx kill-port ${this.port}`);
      this.log(`✅ Port ${this.port} cleared`);
    } catch (error) {
      this.log(`ℹ️ Port ${this.port} was not in use`);
    }
  }

  async startServer() {
    if (this.isRunning) {
      this.log(`⚠️ Server already running on port ${this.port}`);
      return;
    }

    this.log(`🚀 Starting Next.js server on port ${this.port}...`);

    try {
      // Kill any existing process on the port
      await this.killPort();

      // Start the development server
      this.process = spawn('npm', ['run', 'dev:5500'], {
        cwd: this.projectRoot,
        stdio: 'pipe',
        shell: true,
      });

      this.isRunning = true;
      this.restartCount++;

      this.process.stdout.on('data', data => {
        const output = data.toString();
        this.log(`📤 Server Output: ${output.trim()}`);

        // Check if server is ready
        if (output.includes('Ready in') || output.includes('Local:')) {
          this.log(`✅ Server successfully started on port ${this.port}`);
        }
      });

      this.process.stderr.on('data', data => {
        const error = data.toString();
        this.log(`❌ Server Error: ${error.trim()}`);
      });

      this.process.on('close', code => {
        this.log(`⚠️ Server process closed with code ${code}`);
        this.isRunning = false;

        if (this.restartCount < this.maxRestarts) {
          this.log(
            `🔄 Restarting server... (Attempt ${this.restartCount + 1}/${this.maxRestarts})`
          );
          setTimeout(() => this.startServer(), 2000);
        } else {
          this.log(`❌ Max restart attempts reached. Manual intervention required.`);
        }
      });

      this.process.on('error', error => {
        this.log(`❌ Server process error: ${error.message}`);
        this.isRunning = false;
      });
    } catch (error) {
      this.log(`❌ Failed to start server: ${error.message}`);
      this.isRunning = false;
    }
  }

  async autoGitPush() {
    try {
      this.log(`🔄 Starting auto Git push...`);

      // Check if there are changes to commit
      const { stdout: status } = await execAsync('git status --porcelain');

      if (status.trim()) {
        // Add all changes
        await execAsync('git add .');
        this.log(`✅ Added all changes to Git`);

        // Commit with timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        await execAsync(`git commit -m "Auto-commit: ${timestamp} - Port 5500 Guardian Update"`);
        this.log(`✅ Committed changes`);

        // Push to remote
        await execAsync('git push');
        this.log(`✅ Pushed to remote repository`);
      } else {
        this.log(`ℹ️ No changes to commit`);
      }
    } catch (error) {
      this.log(`❌ Git push failed: ${error.message}`);
    }
  }

  async monitorAndFix() {
    this.log(`🔍 Starting Port 5500 Guardian Monitor...`);

    // Start the server initially
    await this.startServer();

    // Set up monitoring interval
    setInterval(async () => {
      try {
        const isPortActive = await this.checkPortStatus();

        if (!isPortActive && this.isRunning) {
          this.log(`⚠️ Port ${this.port} is not responding but process is running`);
          this.isRunning = false;
          await this.startServer();
        } else if (!isPortActive && !this.isRunning) {
          this.log(`⚠️ Port ${this.port} is not active, restarting server`);
          await this.startServer();
        } else if (isPortActive && !this.isRunning) {
          this.log(`✅ Port ${this.port} is active but process flag is wrong, fixing...`);
          this.isRunning = true;
        }

        // Auto Git push every 10 minutes
        if (Date.now() % 600000 < 5000) {
          // Every 10 minutes
          await this.autoGitPush();
        }
      } catch (error) {
        this.log(`❌ Monitor error: ${error.message}`);
      }
    }, this.checkInterval);
  }

  async healthCheck() {
    try {
      const response = await fetch(`http://localhost:${this.port}/api/health-check`);
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  async emergencyFix() {
    this.log(`🚨 Emergency fix initiated...`);

    try {
      // Kill all Node processes
      await execAsync('taskkill /f /im node.exe');
      this.log(`✅ Killed all Node processes`);

      // Clear port
      await this.killPort();

      // Clear Next.js cache
      await execAsync('npm run clean');
      this.log(`✅ Cleared Next.js cache`);

      // Reinstall dependencies if needed
      if (!fs.existsSync('node_modules')) {
        this.log(`📦 Installing dependencies...`);
        await execAsync('npm install');
      }

      // Reset restart count
      this.restartCount = 0;

      // Start server
      await this.startServer();
    } catch (error) {
      this.log(`❌ Emergency fix failed: ${error.message}`);
    }
  }

  async start() {
    this.log(`🎯 Port 5500 Guardian Started`);
    this.log(`📁 Project Root: ${this.projectRoot}`);
    this.log(`🔧 Port: ${this.port}`);
    this.log(`⏱️ Check Interval: ${this.checkInterval}ms`);
    this.log(`🔄 Max Restarts: ${this.maxRestarts}`);

    // Start monitoring
    await this.monitorAndFix();

    // Set up emergency fix on Ctrl+C
    process.on('SIGINT', async () => {
      this.log(`🛑 Received SIGINT, performing emergency fix...`);
      await this.emergencyFix();
      process.exit(0);
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', async error => {
      this.log(`❌ Uncaught Exception: ${error.message}`);
      await this.emergencyFix();
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', async (reason, promise) => {
      this.log(`❌ Unhandled Rejection: ${reason}`);
      await this.emergencyFix();
    });
  }
}

// Auto-start if this script is run directly
if (require.main === module) {
  const guardian = new Port5500Guardian();
  guardian.start();
}

module.exports = Port5500Guardian;
