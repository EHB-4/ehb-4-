const { spawn, exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const execAsync = promisify(exec);

class DevServerManager {
  constructor() {
    this.port = 5500;
    this.projectRoot = process.cwd();
    this.process = null;
  }

  log(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
  }

  async killPort() {
    try {
      await execAsync(`npx kill-port ${this.port}`);
      this.log(`✅ Port ${this.port} cleared`);
    } catch (error) {
      this.log(`ℹ️ Port ${this.port} was not in use`);
    }
  }

  async killNodeProcesses() {
    try {
      await execAsync('taskkill /F /IM node.exe');
      this.log('✅ Killed all Node processes');
    } catch (error) {
      this.log('ℹ️ No Node processes to kill');
    }
  }

  async clearNextCache() {
    try {
      await execAsync('npm run clean');
      this.log('✅ Cleared Next.js cache');
    } catch (error) {
      this.log('⚠️ Could not clear Next.js cache');
    }
  }

  async startServer() {
    this.log('🚀 Starting development server...');

    // Kill existing processes
    await this.killNodeProcesses();
    await this.killPort();
    await this.clearNextCache();

    // Set environment variables
    process.env.PORT = this.port;
    process.env.NODE_ENV = 'development';
    process.env.NEXT_TELEMETRY_DISABLED = '1';

    // Start the server
    this.process = spawn('npm', ['run', 'dev:5500'], {
      cwd: this.projectRoot,
      stdio: 'inherit',
      shell: true,
      env: {
        ...process.env,
        PORT: this.port.toString(),
        NODE_ENV: 'development',
        NEXT_TELEMETRY_DISABLED: '1',
      },
    });

    this.process.on('error', error => {
      this.log(`❌ Server error: ${error.message}`);
    });

    this.process.on('close', code => {
      this.log(`⚠️ Server closed with code ${code}`);
    });

    // Handle process termination
    process.on('SIGINT', async () => {
      this.log('🛑 Shutting down...');
      if (this.process) {
        this.process.kill();
      }
      await this.killPort();
      process.exit(0);
    });
  }
}

// Start if run directly
if (require.main === module) {
  const manager = new DevServerManager();
  manager.startServer();
}

module.exports = DevServerManager;
