#!/usr/bin/env node

const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * EHB Auto-Run Master System
 * Automatically runs all commands and scripts
 */
class AutoRunMaster {
  constructor() {
    this.processes = new Map();
    this.isRunning = false;
    this.config = {
      autoStart: true,
      autoRestart: true,
      restartDelay: 5000,
      maxRetries: 3,
      logLevel: 'info',
    };
  }

  async init() {
    console.log('🚀 Starting EHB Auto-Run Master System...');

    if (this.config.autoStart) {
      await this.startAllServices();
    }

    this.setupAutoRestart();
    this.setupHealthMonitoring();

    console.log('✅ Auto-Run Master System is now active!');
  }

  async startAllServices() {
    const services = [
      { name: 'Development Server', command: 'npm run dev', port: 3001 },
      { name: 'GitHub Auto-Push', command: 'npm run github-simple:start', port: null },
      { name: 'Package Test', command: 'npm run test', port: null },
      { name: 'Linting', command: 'npm run lint', port: null },
      { name: 'Type Check', command: 'npm run type-check', port: null },
      { name: 'Build Process', command: 'npm run build', port: null },
    ];

    for (const service of services) {
      await this.startService(service);
    }
  }

  async startService(service) {
    try {
      console.log(`🔄 Starting ${service.name}...`);

      const process = spawn(service.command, [], {
        shell: true,
        stdio: 'pipe',
        detached: false,
      });

      this.processes.set(service.name, {
        process,
        service,
        startTime: Date.now(),
        retries: 0,
      });

      process.stdout.on('data', data => {
        console.log(`[${service.name}] ${data.toString().trim()}`);
      });

      process.stderr.on('data', data => {
        console.error(`[${service.name}] ERROR: ${data.toString().trim()}`);
      });

      process.on('close', code => {
        console.log(`[${service.name}] Process exited with code ${code}`);

        if (this.config.autoRestart && code !== 0) {
          this.restartService(service.name);
        }
      });

      process.on('error', error => {
        console.error(`[${service.name}] Process error:`, error.message);

        if (this.config.autoRestart) {
          this.restartService(service.name);
        }
      });

      console.log(`✅ ${service.name} started successfully`);
    } catch (error) {
      console.error(`❌ Failed to start ${service.name}:`, error.message);
    }
  }

  async restartService(serviceName) {
    const serviceInfo = this.processes.get(serviceName);

    if (!serviceInfo) {
      console.log(`Service ${serviceName} not found`);
      return;
    }

    if (serviceInfo.retries >= this.config.maxRetries) {
      console.error(`❌ Max retries reached for ${serviceName}`);
      return;
    }

    console.log(`🔄 Restarting ${serviceName} in ${this.config.restartDelay}ms...`);

    setTimeout(async () => {
      serviceInfo.retries++;
      await this.startService(serviceInfo.service);
    }, this.config.restartDelay);
  }

  setupAutoRestart() {
    // Auto-restart on file changes
    const watcher = require('chokidar').watch(
      [
        'package.json',
        'next.config.js',
        'tailwind.config.js',
        'tsconfig.json',
        'app/**/*',
        'components/**/*',
        'lib/**/*',
      ],
      {
        ignored: ['node_modules/**', '.next/**', '*.log'],
        persistent: true,
      }
    );

    watcher.on('change', filePath => {
      console.log(`📝 File changed: ${filePath}`);
      this.handleFileChange(filePath);
    });
  }

  handleFileChange(filePath) {
    const fileName = path.basename(filePath);

    switch (fileName) {
      case 'package.json':
        console.log('🔄 Package.json changed, restarting services...');
        this.restartAllServices();
        break;
      case 'next.config.js':
        console.log('🔄 Next.js config changed, restarting dev server...');
        this.restartService('Development Server');
        break;
      default:
        // For other files, just log the change
        console.log(`📝 File change detected: ${fileName}`);
    }
  }

  async restartAllServices() {
    console.log('🔄 Restarting all services...');

    for (const [serviceName, serviceInfo] of this.processes) {
      serviceInfo.process.kill();
    }

    this.processes.clear();

    setTimeout(async () => {
      await this.startAllServices();
    }, 2000);
  }

  setupHealthMonitoring() {
    setInterval(() => {
      this.checkHealth();
    }, 30000); // Check every 30 seconds
  }

  checkHealth() {
    console.log('🏥 Health check...');

    for (const [serviceName, serviceInfo] of this.processes) {
      const uptime = Date.now() - serviceInfo.startTime;
      const isAlive = !serviceInfo.process.killed;

      console.log(
        `📊 ${serviceName}: ${isAlive ? '✅ Alive' : '❌ Dead'} (${Math.round(uptime / 1000)}s)`
      );

      if (!isAlive && this.config.autoRestart) {
        console.log(`🔄 Auto-restarting ${serviceName}...`);
        this.restartService(serviceName);
      }
    }
  }

  async stop() {
    console.log('🛑 Stopping Auto-Run Master System...');

    for (const [serviceName, serviceInfo] of this.processes) {
      console.log(`🛑 Stopping ${serviceName}...`);
      serviceInfo.process.kill();
    }

    this.processes.clear();
    console.log('✅ Auto-Run Master System stopped');
    process.exit(0);
  }

  getStatus() {
    const status = {};

    for (const [serviceName, serviceInfo] of this.processes) {
      status[serviceName] = {
        isAlive: !serviceInfo.process.killed,
        uptime: Date.now() - serviceInfo.startTime,
        retries: serviceInfo.retries,
      };
    }

    return status;
  }
}

// Main execution
async function main() {
  const autoRunMaster = new AutoRunMaster();

  // Handle graceful shutdown
  process.on('SIGINT', () => autoRunMaster.stop());
  process.on('SIGTERM', () => autoRunMaster.stop());

  // Start the system
  await autoRunMaster.init();

  // Keep the process alive and show status
  setInterval(() => {
    const status = autoRunMaster.getStatus();
    console.log('📊 Auto-Run Status:', status);
  }, 60000); // Log status every minute
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = AutoRunMaster;
