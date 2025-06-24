#!/usr/bin/env node

const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

class Server247 {
  constructor() {
    this.isRunning = false;
    this.serverProcess = null;
    this.restartCount = 0;
    this.maxRestarts = 1000; // Unlimited restarts
    this.restartDelay = 3000; // 3 seconds
    this.port = 3000;
    this.alternatePorts = [3001, 3002, 3003, 3004, 3005];
    this.currentPortIndex = 0;
  }

  // Start the 24/7 server
  async start() {
    console.log('🌍 Starting 24/7 Development Server...');
    console.log('⏰ Server will run permanently in background');
    console.log('🔄 Auto-restart enabled');
    console.log('🛑 To stop: npm run server:stop');
    console.log('');

    this.isRunning = true;
    await this.startServer();
  }

  // Start the development server
  async startServer() {
    if (!this.isRunning) return;

    try {
      // Kill any existing processes
      await this.killExistingProcesses();

      // Clean .next directory
      await this.cleanNextDirectory();

      // Get available port
      const port = await this.getAvailablePort();

      console.log(`🚀 Starting server on port ${port}...`);

      // Start the development server
      this.serverProcess = spawn('npm', ['run', 'dev'], {
        stdio: 'inherit',
        shell: true,
        env: { ...process.env, PORT: port.toString() },
      });

      this.serverProcess.on('error', error => {
        console.error('❌ Server error:', error.message);
        this.handleServerError();
      });

      this.serverProcess.on('exit', code => {
        console.log(`⚠️ Server exited with code ${code}`);
        this.handleServerExit(code);
      });

      // Log server start
      console.log(`✅ Server started successfully on port ${port}`);
      console.log(`🌐 Access at: http://localhost:${port}`);
      console.log(`📝 Auto-restart: Enabled (${this.restartCount}/${this.maxRestarts})`);
      console.log('');
    } catch (error) {
      console.error('❌ Failed to start server:', error);
      this.handleServerError();
    }
  }

  // Handle server errors
  handleServerError() {
    if (!this.isRunning) return;

    this.restartCount++;
    console.log(`🔄 Restarting server... (Attempt ${this.restartCount})`);

    setTimeout(() => {
      if (this.isRunning) {
        this.startServer();
      }
    }, this.restartDelay);
  }

  // Handle server exit
  handleServerExit(code) {
    if (!this.isRunning) return;

    if (code === 0) {
      console.log('✅ Server stopped normally');
      return;
    }

    this.restartCount++;
    console.log(`🔄 Server crashed, restarting... (Attempt ${this.restartCount})`);

    setTimeout(() => {
      if (this.isRunning) {
        this.startServer();
      }
    }, this.restartDelay);
  }

  // Kill existing processes
  async killExistingProcesses() {
    return new Promise(resolve => {
      const platform = os.platform();
      let command;

      if (platform === 'win32') {
        command = 'taskkill /F /IM node.exe';
      } else {
        command = 'pkill -f "next dev"';
      }

      exec(command, error => {
        if (error) {
          console.log('ℹ️ No existing processes to kill');
        } else {
          console.log('✅ Killed existing processes');
        }
        resolve();
      });
    });
  }

  // Clean .next directory
  async cleanNextDirectory() {
    const nextDir = path.join(process.cwd(), '.next');
    if (fs.existsSync(nextDir)) {
      try {
        fs.rmSync(nextDir, { recursive: true, force: true });
        console.log('🧹 Cleaned .next directory');
      } catch (error) {
        console.log('⚠️ Could not clean .next directory');
      }
    }
  }

  // Get available port
  async getAvailablePort() {
    const port = this.port + this.currentPortIndex;
    this.currentPortIndex = (this.currentPortIndex + 1) % this.alternatePorts.length;
    return port;
  }

  // Stop the server
  stop() {
    console.log('🛑 Stopping 24/7 server...');
    this.isRunning = false;

    if (this.serverProcess) {
      this.serverProcess.kill();
      console.log('✅ Server stopped');
    }

    process.exit(0);
  }

  // Get server status
  getStatus() {
    return {
      isRunning: this.isRunning,
      restartCount: this.restartCount,
      port: this.port + this.currentPortIndex,
    };
  }
}

// Create global instance
global.server247 = new Server247();

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Received SIGINT, shutting down 24/7 server...');
  global.server247.stop();
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Received SIGTERM, shutting down 24/7 server...');
  global.server247.stop();
});

// Handle uncaught exceptions
process.on('uncaughtException', error => {
  console.error('❌ Uncaught Exception:', error);
  if (global.server247) {
    global.server247.handleServerError();
  }
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection:', reason);
  if (global.server247) {
    global.server247.handleServerError();
  }
});

// Start the 24/7 server
global.server247.start();
