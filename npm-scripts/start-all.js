#!/usr/bin/env node

const { spawn } = require('child_process');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

class ServiceManager {
  constructor() {
    this.services = [];
    this.isRunning = false;
  }

  // Kill existing processes
  async killExistingProcesses() {
    return new Promise(resolve => {
      const platform = process.platform;
      let command;

      if (platform === 'win32') {
        command = 'taskkill /F /IM node.exe';
      } else {
        command = 'pkill -f "next dev"';
      }

      exec(command, error => {
        if (error) {
          console.log('ℹ No existing processes to kill');
        } else {
          console.log('✅ Killed existing processes');
        }
        resolve();
      });
    });
  }

  // Clean .next directory
  cleanNextDirectory() {
    const nextDir = path.join(process.cwd(), '.next');
    if (fs.existsSync(nextDir)) {
      try {
        fs.rmSync(nextDir, { recursive: true, force: true });
        console.log('✅ Cleaned .next directory');
      } catch (error) {
        console.log('⚠ Could not clean .next directory');
      }
    }
  }

  // Start development server
  startDevServer() {
    console.log('🚀 Starting Development Server...');

    const devProcess = spawn('npm', ['run', 'dev'], {
      stdio: 'inherit',
      shell: true,
      detached: true,
    });

    this.services.push(devProcess);
    console.log('✅ Development Server started (PID: ' + devProcess.pid + ')');
  }

  // Start keep-alive server
  startKeepAliveServer() {
    console.log('🔄 Starting Keep-Alive Server...');

    const keepAliveProcess = spawn('cmd', ['/c', 'keep-alive.bat'], {
      stdio: 'inherit',
      shell: true,
      detached: true,
    });

    this.services.push(keepAliveProcess);
    console.log('✅ Keep-Alive Server started (PID: ' + keepAliveProcess.pid + ')');
  }

  // Start voice assistant
  startVoiceAssistant() {
    console.log('🎤 Starting Voice Assistant...');

    const voiceProcess = spawn('cmd', ['/c', 'start-voice.bat'], {
      stdio: 'inherit',
      shell: true,
      detached: true,
    });

    this.services.push(voiceProcess);
    console.log('✅ Voice Assistant started (PID: ' + voiceProcess.pid + ')');
  }

  // Open browsers
  openBrowsers() {
    console.log('🌐 Opening browsers...');

    setTimeout(() => {
      const { exec } = require('child_process');
      exec('start http://localhost:3001', () => {
        console.log('✅ Development server opened');
      });

      setTimeout(() => {
        exec('start http://localhost:3000', () => {
          console.log('✅ Keep-alive server opened');
        });
      }, 1000);
    }, 3000);
  }

  // Start all services
  async startAllServices() {
    console.log('🚀 EHB Next.js 04 - Starting All Services');
    console.log('========================================');
    console.log('');

    this.isRunning = true;

    try {
      // Kill existing processes
      await this.killExistingProcesses();

      // Clean .next directory
      this.cleanNextDirectory();

      // Start all services
      this.startDevServer();

      setTimeout(() => {
        this.startKeepAliveServer();
      }, 2000);

      setTimeout(() => {
        this.startVoiceAssistant();
      }, 4000);

      // Open browsers
      this.openBrowsers();

      console.log('');
      console.log('========================================');
      console.log('✅ All Services Started Successfully!');
      console.log('========================================');
      console.log('');
      console.log('🌐 Development Server: http://localhost:3001');
      console.log('🔄 Keep-Alive Server: http://localhost:3000');
      console.log('🎤 Voice Assistant: Active');
      console.log('');
      console.log('🛑 To stop all services: npm run stop-all');
      console.log('');
    } catch (error) {
      console.error('❌ Failed to start services:', error);
      process.exit(1);
    }
  }

  // Stop all services
  stopAllServices() {
    console.log('🛑 Stopping all services...');

    this.services.forEach(process => {
      try {
        process.kill();
      } catch (error) {
        // Process might already be dead
      }
    });

    this.services = [];
    this.isRunning = false;

    console.log('✅ All services stopped');
  }
}

// Handle command line arguments
const args = process.argv.slice(2);
const serviceManager = new ServiceManager();

switch (args[0]) {
  case 'start':
  case undefined:
    serviceManager.startAllServices();
    break;
  case 'stop':
    serviceManager.stopAllServices();
    break;
  default:
    console.log('🚀 EHB Next.js 04 - Service Manager');
    console.log('===================================');
    console.log('');
    console.log('Usage:');
    console.log('  node npm-scripts/start-all.js start  - Start all services');
    console.log('  node npm-scripts/start-all.js stop   - Stop all services');
    console.log('');
    serviceManager.startAllServices();
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Received SIGINT, stopping all services...');
  serviceManager.stopAllServices();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Received SIGTERM, stopping all services...');
  serviceManager.stopAllServices();
  process.exit(0);
});
