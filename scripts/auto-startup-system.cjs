#!/usr/bin/env node

const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

class AutoStartupSystem {
  constructor() {
    this.services = [];
    this.isRunning = false;
    this.monitoring = false;
    this.autoRestart = true;
    this.maxRestarts = 5;
    this.restartCount = 0;
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

  // Clean cache
  cleanCache() {
    const nextDir = path.join(process.cwd(), '.next');
    if (fs.existsSync(nextDir)) {
      try {
        fs.rmSync(nextDir, { recursive: true, force: true });
        console.log('✅ Cache cleaned');
      } catch (error) {
        console.log('⚠ Could not clean cache');
      }
    } else {
      console.log('ℹ Cache already clean');
    }
  }

  // Check dependencies
  async checkDependencies() {
    return new Promise(resolve => {
      const nodeModulesPath = path.join(process.cwd(), 'node_modules');

      if (!fs.existsSync(nodeModulesPath)) {
        console.log('📦 Installing dependencies...');
        const installProcess = spawn('npm', ['install'], {
          stdio: 'inherit',
          shell: true,
        });

        installProcess.on('close', code => {
          if (code === 0) {
            console.log('✅ Dependencies installed');
          } else {
            console.log('❌ Failed to install dependencies');
          }
          resolve();
        });
      } else {
        console.log('✅ Dependencies ready');
        resolve();
      }
    });
  }

  // Start development server
  startDevServer() {
    console.log('🚀 Starting Development Server...');

    const devProcess = spawn('npm', ['run', 'dev'], {
      stdio: 'inherit',
      shell: true,
      detached: true,
    });

    devProcess.on('error', error => {
      console.log('❌ Development server error:', error.message);
      if (this.autoRestart && this.restartCount < this.maxRestarts) {
        this.restartService('dev');
      }
    });

    devProcess.on('close', code => {
      console.log(`Development server exited with code ${code}`);
      if (this.autoRestart && this.restartCount < this.maxRestarts) {
        this.restartService('dev');
      }
    });

    this.services.push({
      name: 'Development Server',
      process: devProcess,
      type: 'dev',
      pid: devProcess.pid,
    });

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

    keepAliveProcess.on('error', error => {
      console.log('❌ Keep-alive server error:', error.message);
      if (this.autoRestart && this.restartCount < this.maxRestarts) {
        this.restartService('keep-alive');
      }
    });

    keepAliveProcess.on('close', code => {
      console.log(`Keep-alive server exited with code ${code}`);
      if (this.autoRestart && this.restartCount < this.maxRestarts) {
        this.restartService('keep-alive');
      }
    });

    this.services.push({
      name: 'Keep-Alive Server',
      process: keepAliveProcess,
      type: 'keep-alive',
      pid: keepAliveProcess.pid,
    });

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

    voiceProcess.on('error', error => {
      console.log('❌ Voice assistant error:', error.message);
      if (this.autoRestart && this.restartCount < this.maxRestarts) {
        this.restartService('voice');
      }
    });

    voiceProcess.on('close', code => {
      console.log(`Voice assistant exited with code ${code}`);
      if (this.autoRestart && this.restartCount < this.maxRestarts) {
        this.restartService('voice');
      }
    });

    this.services.push({
      name: 'Voice Assistant',
      process: voiceProcess,
      type: 'voice',
      pid: voiceProcess.pid,
    });

    console.log('✅ Voice Assistant started (PID: ' + voiceProcess.pid + ')');
  }

  // Restart service
  restartService(type) {
    this.restartCount++;
    console.log(`🔄 Restarting ${type} service (attempt ${this.restartCount}/${this.maxRestarts})`);

    setTimeout(() => {
      switch (type) {
        case 'dev':
          this.startDevServer();
          break;
        case 'keep-alive':
          this.startKeepAliveServer();
          break;
        case 'voice':
          this.startVoiceAssistant();
          break;
      }
    }, 3000);
  }

  // Open browsers
  openBrowsers() {
    console.log('🌐 Opening browsers automatically...');

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
    }, 5000);
  }

  // Monitor services
  startMonitoring() {
    this.monitoring = true;
    console.log('📊 Starting service monitoring...');

    setInterval(() => {
      if (this.monitoring) {
        console.log('\n📊 Service Status:');
        this.services.forEach(service => {
          try {
            process.kill(service.pid, 0);
            console.log(`✅ ${service.name}: Running (PID: ${service.pid})`);
          } catch (error) {
            console.log(`❌ ${service.name}: Stopped (PID: ${service.pid})`);
            if (this.autoRestart && this.restartCount < this.maxRestarts) {
              this.restartService(service.type);
            }
          }
        });
      }
    }, 30000); // Check every 30 seconds
  }

  // Start all services automatically
  async startAllServices() {
    console.log('🤖 EHB Next.js 04 - Auto Startup System');
    console.log('========================================');
    console.log('');
    console.log('🚀 Starting all services automatically...');
    console.log('⚡ No manual intervention needed!');
    console.log('');

    this.isRunning = true;

    try {
      // Kill existing processes
      await this.killExistingProcesses();

      // Clean cache
      this.cleanCache();

      // Check dependencies
      await this.checkDependencies();

      // Start all services
      this.startDevServer();

      setTimeout(() => {
        this.startKeepAliveServer();
      }, 3000);

      setTimeout(() => {
        this.startVoiceAssistant();
      }, 6000);

      // Open browsers
      this.openBrowsers();

      // Start monitoring
      setTimeout(() => {
        this.startMonitoring();
      }, 10000);

      console.log('');
      console.log('========================================');
      console.log('✅ Auto Startup Complete!');
      console.log('========================================');
      console.log('');
      console.log('🤖 All services started automatically:');
      console.log('🌐 Development Server: http://localhost:3001');
      console.log('🔄 Keep-Alive Server: http://localhost:3000');
      console.log('🎤 Voice Assistant: Active');
      console.log('');
      console.log('📊 Service monitoring active');
      console.log('🔄 Auto-restart enabled');
      console.log('🛑 To stop: npm run stop:all');
      console.log('');
    } catch (error) {
      console.error('❌ Auto startup failed:', error);
      process.exit(1);
    }
  }

  // Stop all services
  stopAllServices() {
    console.log('🛑 Stopping all services...');

    this.monitoring = false;
    this.isRunning = false;

    this.services.forEach(service => {
      try {
        service.process.kill();
        console.log(`✅ Stopped ${service.name}`);
      } catch (error) {
        console.log(`⚠ Could not stop ${service.name}`);
      }
    });

    this.services = [];
    this.restartCount = 0;

    console.log('✅ All services stopped');
  }

  // Get service status
  getServiceStatus() {
    console.log('📊 Current Service Status:');
    console.log('==========================');

    this.services.forEach(service => {
      try {
        process.kill(service.pid, 0);
        console.log(`✅ ${service.name}: Running (PID: ${service.pid})`);
      } catch (error) {
        console.log(`❌ ${service.name}: Stopped (PID: ${service.pid})`);
      }
    });
  }
}

// Handle command line arguments
const args = process.argv.slice(2);
const autoStartup = new AutoStartupSystem();

switch (args[0]) {
  case 'start':
  case undefined:
    autoStartup.startAllServices();
    break;
  case 'stop':
    autoStartup.stopAllServices();
    break;
  case 'status':
    autoStartup.getServiceStatus();
    break;
  case 'monitor':
    autoStartup.startMonitoring();
    break;
  default:
    console.log('🤖 EHB Next.js 04 - Auto Startup System');
    console.log('========================================');
    console.log('');
    console.log('Usage:');
    console.log('  node scripts/auto-startup-system.cjs start   - Start all services');
    console.log('  node scripts/auto-startup-system.cjs stop    - Stop all services');
    console.log('  node scripts/auto-startup-system.cjs status  - Check status');
    console.log('  node scripts/auto-startup-system.cjs monitor - Start monitoring');
    console.log('');
    autoStartup.startAllServices();
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Received SIGINT, stopping all services...');
  autoStartup.stopAllServices();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Received SIGTERM, stopping all services...');
  autoStartup.stopAllServices();
  process.exit(0);
});
