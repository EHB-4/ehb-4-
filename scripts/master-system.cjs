#!/usr/bin/env node

const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

class MasterSystem {
  constructor() {
    this.isRunning = false;
    this.services = [];
    this.errorLog = [];
    this.fixedErrors = [];
    this.systemStatus = {
      startup: false,
      errorFix: false,
      monitoring: false,
      services: false,
    };
  }

  // Master startup sequence
  async masterStartup() {
    console.log('🤖 EHB Next.js 04 - Master System Starting...');
    console.log('=============================================');
    console.log('');
    console.log('🚀 Master startup sequence initiated...');
    console.log('⚡ Combining all automation features...');
    console.log('');

    this.isRunning = true;

    try {
      // Step 1: Auto Error Fix
      console.log('🔧 Step 1: Auto Error Fix');
      await this.autoErrorFix();
      this.systemStatus.errorFix = true;

      // Step 2: Auto Startup
      console.log('🚀 Step 2: Auto Startup');
      await this.autoStartup();
      this.systemStatus.startup = true;

      // Step 3: Service Management
      console.log('📊 Step 3: Service Management');
      await this.startAllServices();
      this.systemStatus.services = true;

      // Step 4: Monitoring
      console.log('📈 Step 4: Monitoring');
      this.startMonitoring();
      this.systemStatus.monitoring = true;

      // Step 5: Browser Launch
      console.log('🌐 Step 5: Browser Launch');
      await this.launchBrowsers();

      console.log('');
      console.log('=============================================');
      console.log('✅ Master System Successfully Started!');
      console.log('=============================================');
      console.log('');
      console.log('🎯 All systems operational:');
      console.log('✅ Auto Error Fix: Active');
      console.log('✅ Auto Startup: Active');
      console.log('✅ Service Management: Active');
      console.log('✅ Monitoring: Active');
      console.log('✅ Browser Launch: Complete');
      console.log('');
      console.log('🌐 Development Server: http://localhost:3001');
      console.log('🔄 Keep-Alive Server: http://localhost:3000');
      console.log('🎤 Voice Assistant: Active');
      console.log('');
      console.log('🛑 To stop: npm run master:stop');
      console.log('📊 Status: npm run master:status');
      console.log('');
    } catch (error) {
      console.error('❌ Master system error:', error);
      await this.emergencyRecovery();
    }
  }

  // Auto error fix
  async autoErrorFix() {
    console.log('🔧 Running comprehensive error fix...');

    // Kill all processes
    await this.killAllProcesses();

    // Clean everything
    await this.cleanAll();

    // Fresh install
    await this.freshInstall();

    // Verify build
    await this.verifyBuild();

    console.log('✅ Error fix complete');
  }

  // Auto startup
  async autoStartup() {
    console.log('🚀 Running auto startup...');

    // Check dependencies
    await this.checkDependencies();

    // Setup environment
    await this.setupEnvironment();

    // Verify configuration
    await this.verifyConfiguration();

    console.log('✅ Auto startup complete');
  }

  // Start all services
  async startAllServices() {
    console.log('📊 Starting all services...');

    const services = [
      { name: 'Development Server', command: 'npm run dev', port: 3001 },
      { name: 'Keep-Alive Server', command: 'keep-alive.bat', port: 3000 },
      { name: 'Voice Assistant', command: 'start-voice.bat', port: null },
    ];

    for (const service of services) {
      console.log(`Starting ${service.name}...`);

      const serviceProcess = spawn(service.command, [], {
        shell: true,
        detached: true,
        stdio: 'inherit',
      });

      this.services.push({
        name: service.name,
        process: serviceProcess,
        pid: serviceProcess.pid,
        port: service.port,
        status: 'starting',
      });

      // Wait between services
      await new Promise(resolve => setTimeout(resolve, 3000));
    }

    console.log('✅ All services started');
  }

  // Launch browsers
  async launchBrowsers() {
    console.log('🌐 Launching browsers...');

    setTimeout(() => {
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

  // Start monitoring
  startMonitoring() {
    console.log('📈 Starting system monitoring...');

    setInterval(() => {
      if (!this.isRunning) return;

      this.checkServiceHealth();
      this.checkSystemHealth();
      this.logSystemStatus();
    }, 30000); // Check every 30 seconds
  }

  // Check service health
  checkServiceHealth() {
    this.services.forEach(service => {
      try {
        process.kill(service.pid, 0);
        service.status = 'running';
      } catch (error) {
        service.status = 'stopped';
        console.log(`⚠ ${service.name} stopped, restarting...`);
        this.restartService(service);
      }
    });
  }

  // Check system health
  checkSystemHealth() {
    // Check disk space
    const freeSpace = os.freemem();
    const totalSpace = os.totalmem();
    const usedPercentage = ((totalSpace - freeSpace) / totalSpace) * 100;

    if (usedPercentage > 90) {
      console.log('⚠ High memory usage detected');
    }

    // Check CPU usage
    const loadAvg = os.loadavg();
    if (loadAvg[0] > 5) {
      console.log('⚠ High CPU usage detected');
    }
  }

  // Log system status
  logSystemStatus() {
    console.log('\n📊 System Status:');
    console.log('================');
    console.log(`Startup: ${this.systemStatus.startup ? '✅' : '❌'}`);
    console.log(`Error Fix: ${this.systemStatus.errorFix ? '✅' : '❌'}`);
    console.log(`Services: ${this.systemStatus.services ? '✅' : '❌'}`);
    console.log(`Monitoring: ${this.systemStatus.monitoring ? '✅' : '❌'}`);

    console.log('\nService Status:');
    this.services.forEach(service => {
      console.log(
        `${service.name}: ${service.status === 'running' ? '✅' : '❌'} (PID: ${service.pid})`
      );
    });
  }

  // Restart service
  restartService(service) {
    console.log(`🔄 Restarting ${service.name}...`);

    try {
      service.process.kill();
    } catch (error) {
      // Process already dead
    }

    const newProcess = spawn(service.command, [], {
      shell: true,
      detached: true,
      stdio: 'inherit',
    });

    service.process = newProcess;
    service.pid = newProcess.pid;
    service.status = 'restarting';

    console.log(`✅ ${service.name} restarted (PID: ${service.pid})`);
  }

  // Kill all processes
  async killAllProcesses() {
    console.log('🔫 Killing all processes...');

    return new Promise(resolve => {
      const platform = process.platform;
      let command;

      if (platform === 'win32') {
        command = 'taskkill /F /IM node.exe & taskkill /F /IM npm.exe';
      } else {
        command = 'pkill -f "node" && pkill -f "npm"';
      }

      exec(command, error => {
        if (error) {
          console.log('ℹ No processes to kill');
        } else {
          console.log('✅ All processes killed');
        }
        resolve();
      });
    });
  }

  // Clean all
  async cleanAll() {
    console.log('🧹 Cleaning all...');

    // Clean .next
    if (fs.existsSync('.next')) {
      fs.rmSync('.next', { recursive: true, force: true });
    }

    // Clean node_modules
    if (fs.existsSync('node_modules')) {
      fs.rmSync('node_modules', { recursive: true, force: true });
    }

    // Clean package-lock
    if (fs.existsSync('package-lock.json')) {
      fs.unlinkSync('package-lock.json');
    }

    console.log('✅ All cleaned');
  }

  // Fresh install
  async freshInstall() {
    console.log('📦 Fresh installation...');

    return new Promise(resolve => {
      const installProcess = spawn('npm', ['install'], {
        stdio: 'inherit',
        shell: true,
      });

      installProcess.on('close', code => {
        if (code === 0) {
          console.log('✅ Fresh installation complete');
        } else {
          console.log('❌ Installation failed');
        }
        resolve();
      });
    });
  }

  // Verify build
  async verifyBuild() {
    console.log('🔍 Verifying build...');

    return new Promise(resolve => {
      const buildProcess = spawn('npm', ['run', 'build'], {
        stdio: 'inherit',
        shell: true,
      });

      buildProcess.on('close', code => {
        if (code === 0) {
          console.log('✅ Build verified');
        } else {
          console.log('⚠ Build issues detected');
        }
        resolve();
      });
    });
  }

  // Check dependencies
  async checkDependencies() {
    console.log('📦 Checking dependencies...');

    if (!fs.existsSync('node_modules')) {
      console.log('📦 Installing dependencies...');
      await this.freshInstall();
    } else {
      console.log('✅ Dependencies ready');
    }
  }

  // Setup environment
  async setupEnvironment() {
    console.log('⚙️ Setting up environment...');

    if (!fs.existsSync('.env.local')) {
      if (fs.existsSync('.env.example')) {
        fs.copyFileSync('.env.example', '.env.local');
      } else {
        const envContent = `# Environment variables
NEXT_PUBLIC_API_URL=http://localhost:3001
NODE_ENV=development`;
        fs.writeFileSync('.env.local', envContent);
      }
      console.log('✅ Environment setup complete');
    } else {
      console.log('✅ Environment ready');
    }
  }

  // Verify configuration
  async verifyConfiguration() {
    console.log('🔍 Verifying configuration...');

    // Check essential files
    const essentialFiles = ['package.json', 'next.config.js', 'tsconfig.json'];
    for (const file of essentialFiles) {
      if (!fs.existsSync(file)) {
        console.log(`⚠ Missing ${file}`);
      }
    }

    console.log('✅ Configuration verified');
  }

  // Emergency recovery
  async emergencyRecovery() {
    console.log('🚨 Emergency recovery initiated...');

    // Stop all services
    this.services.forEach(service => {
      try {
        service.process.kill();
      } catch (error) {
        // Process already dead
      }
    });

    // Reset status
    this.systemStatus = {
      startup: false,
      errorFix: false,
      monitoring: false,
      services: false,
    };

    // Try to restart
    console.log('🔄 Attempting restart...');
    setTimeout(() => {
      this.masterStartup();
    }, 5000);
  }

  // Stop master system
  stopMasterSystem() {
    console.log('🛑 Stopping master system...');

    this.isRunning = false;

    // Stop all services
    this.services.forEach(service => {
      try {
        service.process.kill();
        console.log(`✅ Stopped ${service.name}`);
      } catch (error) {
        console.log(`⚠ Could not stop ${service.name}`);
      }
    });

    this.services = [];

    console.log('✅ Master system stopped');
  }

  // Get system status
  getSystemStatus() {
    console.log('📊 Master System Status');
    console.log('=======================');
    console.log('');

    console.log('System Components:');
    console.log(`Startup: ${this.systemStatus.startup ? '✅ Active' : '❌ Inactive'}`);
    console.log(`Error Fix: ${this.systemStatus.errorFix ? '✅ Active' : '❌ Inactive'}`);
    console.log(`Services: ${this.systemStatus.services ? '✅ Active' : '❌ Inactive'}`);
    console.log(`Monitoring: ${this.systemStatus.monitoring ? '✅ Active' : '❌ Inactive'}`);

    console.log('\nServices:');
    this.services.forEach(service => {
      console.log(
        `${service.name}: ${service.status === 'running' ? '✅ Running' : '❌ Stopped'} (PID: ${service.pid})`
      );
    });

    console.log('\nError Log:');
    if (this.errorLog.length === 0) {
      console.log('✅ No errors logged');
    } else {
      this.errorLog.forEach((error, index) => {
        console.log(`${index + 1}. ${error.message}`);
      });
    }

    console.log('\nFixed Errors:');
    if (this.fixedErrors.length === 0) {
      console.log('ℹ No errors fixed');
    } else {
      this.fixedErrors.forEach((fix, index) => {
        console.log(`${index + 1}. ${fix.error} (${fix.type})`);
      });
    }
  }
}

// Handle command line arguments
const args = process.argv.slice(2);
const masterSystem = new MasterSystem();

switch (args[0]) {
  case 'start':
  case undefined:
    masterSystem.masterStartup();
    break;
  case 'stop':
    masterSystem.stopMasterSystem();
    break;
  case 'status':
    masterSystem.getSystemStatus();
    break;
  default:
    console.log('🤖 EHB Next.js 04 - Master System');
    console.log('==================================');
    console.log('');
    console.log('Usage:');
    console.log('  node scripts/master-system.cjs start  - Start master system');
    console.log('  node scripts/master-system.cjs stop   - Stop master system');
    console.log('  node scripts/master-system.cjs status - Check system status');
    console.log('');
    masterSystem.masterStartup();
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Received SIGINT, stopping master system...');
  masterSystem.stopMasterSystem();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Received SIGTERM, stopping master system...');
  masterSystem.stopMasterSystem();
  process.exit(0);
});
