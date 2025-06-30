const fs = require('fs');
const path = require('path');
const { spawn, exec } = require('child_process');
const chokidar = require('chokidar');

class RealTimeAutoRunner {
  constructor() {
    this.projectRoot = process.cwd();
    this.isRunning = false;
    this.processes = new Map();
    this.ports = {
      dev: 3000,
      admin: 3002,
      portal: 3003,
      analytics: 3004,
      aiMarketplace: 3005,
    };
  }

  async start() {
    console.log('🚀 EHB Real-Time Auto Runner Starting...');
    console.log('==========================================');

    // Kill existing processes
    await this.killAllProcesses();

    // Start all services
    await this.startAllServices();

    // Start file watcher
    this.startFileWatcher();

    // Start health monitor
    this.startHealthMonitor();

    // Open browser
    this.openBrowser();

    console.log('✅ Real-Time Auto Runner is now active!');
    console.log('📝 All changes will be automatically detected and applied');
    console.log('🛑 Press Ctrl+C to stop');
  }

  async killAllProcesses() {
    console.log('🔄 Stopping existing processes...');

    try {
      if (process.platform === 'win32') {
        await this.execCommand('taskkill /F /IM node.exe');
      } else {
        await this.execCommand('pkill -f node');
      }
      console.log('✅ All processes stopped');
    } catch (error) {
      console.log('ℹ️ No processes to stop');
    }
  }

  async startAllServices() {
    console.log('🚀 Starting all development services...');

    const services = [
      { name: 'dev', command: 'npm', args: ['run', 'dev'] },
      { name: 'admin', command: 'npm', args: ['run', 'dev:admin'] },
      { name: 'portal', command: 'npm', args: ['run', 'dev:portal'] },
      { name: 'analytics', command: 'npm', args: ['run', 'dev:analytics'] },
      { name: 'ai-marketplace', command: 'npm', args: ['run', 'dev:ai-marketplace'] },
    ];

    for (const service of services) {
      await this.startService(service);
      await this.sleep(2000); // Wait 2 seconds between starts
    }
  }

  async startService(service) {
    console.log(`🚀 Starting ${service.name}...`);

    const process = spawn(service.command, service.args, {
      stdio: 'pipe',
      shell: true,
      cwd: this.projectRoot,
    });

    this.processes.set(service.name, process);

    process.stdout.on('data', data => {
      console.log(`[${service.name}] ${data.toString().trim()}`);
    });

    process.stderr.on('data', data => {
      console.log(`[${service.name}] ERROR: ${data.toString().trim()}`);
    });

    process.on('close', code => {
      console.log(`[${service.name}] Process exited with code ${code}`);
      this.processes.delete(service.name);

      // Auto-restart if not manually stopped
      if (this.isRunning) {
        console.log(`🔄 Auto-restarting ${service.name}...`);
        setTimeout(() => this.startService(service), 3000);
      }
    });

    // Wait for service to be ready
    await this.waitForService(service.name);
  }

  async waitForService(serviceName) {
    const maxAttempts = 30;
    let attempts = 0;

    while (attempts < maxAttempts) {
      try {
        const port = this.ports[serviceName] || 3000;
        await this.execCommand(`netstat -an | findstr :${port}`);
        console.log(`✅ ${serviceName} is ready on port ${port}`);
        return;
      } catch (error) {
        attempts++;
        await this.sleep(1000);
      }
    }

    console.log(`⚠️ ${serviceName} may not be ready yet`);
  }

  startFileWatcher() {
    console.log('👀 Starting file watcher...');

    const watcher = chokidar.watch(
      ['app/**/*', 'components/**/*', 'lib/**/*', 'styles/**/*', 'public/**/*'],
      {
        ignored: /(node_modules|\.next|\.git)/,
        persistent: true,
      }
    );

    watcher.on('change', filePath => {
      console.log(`📝 File changed: ${filePath}`);
      this.handleFileChange(filePath);
    });

    watcher.on('add', filePath => {
      console.log(`➕ File added: ${filePath}`);
      this.handleFileChange(filePath);
    });

    watcher.on('unlink', filePath => {
      console.log(`➖ File removed: ${filePath}`);
      this.handleFileChange(filePath);
    });
  }

  async handleFileChange(filePath) {
    console.log(`🔄 Handling change in: ${filePath}`);

    // Auto-fix errors if needed
    if (filePath.includes('.tsx') || filePath.includes('.ts')) {
      await this.autoFixErrors();
    }

    // Auto-push to git if needed
    await this.autoPushToGit();
  }

  async autoFixErrors() {
    try {
      console.log('🔧 Auto-fixing errors...');
      await this.execCommand('npm run lint -- --fix');
      console.log('✅ Errors auto-fixed');
    } catch (error) {
      console.log('⚠️ Some errors could not be auto-fixed');
    }
  }

  async autoPushToGit() {
    try {
      console.log('📤 Auto-pushing to git...');
      await this.execCommand('git add .');
      await this.execCommand('git commit -m "Auto-commit: File changes detected"');
      await this.execCommand('git push');
      console.log('✅ Auto-push completed');
    } catch (error) {
      console.log('⚠️ Auto-push failed (may be no changes)');
    }
  }

  startHealthMonitor() {
    console.log('💓 Starting health monitor...');

    setInterval(async () => {
      for (const [serviceName, process] of this.processes) {
        if (process.killed) {
          console.log(`🔄 Restarting ${serviceName} (process died)`);
          await this.startService({
            name: serviceName,
            command: 'npm',
            args: ['run', `dev:${serviceName}`],
          });
        }
      }
    }, 30000); // Check every 30 seconds
  }

  openBrowser() {
    console.log('🌐 Opening browser...');

    setTimeout(() => {
      try {
        if (process.platform === 'win32') {
          spawn('start', ['http://localhost:3000'], { shell: true });
          spawn('start', ['http://localhost:3000/development-portal'], { shell: true });
        } else {
          spawn('open', ['http://localhost:3000']);
          spawn('open', ['http://localhost:3000/development-portal']);
        }
        console.log('✅ Browser opened');
      } catch (error) {
        console.log('⚠️ Could not open browser automatically');
      }
    }, 5000);
  }

  async execCommand(command) {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve(stdout);
        }
      });
    });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  stop() {
    console.log('🛑 Stopping Real-Time Auto Runner...');
    this.isRunning = false;

    for (const [name, process] of this.processes) {
      console.log(`🛑 Stopping ${name}...`);
      process.kill();
    }

    this.processes.clear();
    console.log('✅ Real-Time Auto Runner stopped');
    process.exit(0);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Received SIGINT, shutting down gracefully...');
  if (global.autoRunner) {
    global.autoRunner.stop();
  }
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
  if (global.autoRunner) {
    global.autoRunner.stop();
  }
});

// Start the auto runner
const autoRunner = new RealTimeAutoRunner();
global.autoRunner = autoRunner;
autoRunner.isRunning = true;
autoRunner.start().catch(console.error);
