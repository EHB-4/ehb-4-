const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const AutoTestMonitor = require('./auto-test-monitor');

class AutoDeployMonitor {
  constructor() {
    this.isRunning = false;
    this.testMonitor = null;
    this.deploymentLog = [];
    this.lastDeployment = null;
    this.checkInterval = 2 * 60 * 1000; // 2 minutes
    this.logFile = './logs/deployment-log.json';

    this.ensureDirectories();
  }

  ensureDirectories() {
    const dirs = ['./logs', './deployments', './backups'];
    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  log(message, type = 'info') {
    const logEntry = {
      timestamp: new Date().toISOString(),
      type,
      message,
    };

    this.deploymentLog.push(logEntry);
    console.log(`[${type.toUpperCase()}] ${message}`);

    // Save to file
    fs.writeFileSync(this.logFile, JSON.stringify(this.deploymentLog, null, 2));
  }

  async runCommand(command, description) {
    return new Promise((resolve, reject) => {
      this.log(`Running: ${description}`);

      const child = exec(command, {
        cwd: process.cwd(),
        maxBuffer: 1024 * 1024 * 10, // 10MB buffer
      });

      let output = '';
      let errorOutput = '';

      child.stdout.on('data', data => {
        output += data;
        process.stdout.write(data);
      });

      child.stderr.on('data', data => {
        errorOutput += data;
        process.stderr.write(data);
      });

      child.on('close', code => {
        if (code === 0) {
          this.log(`${description} completed successfully`, 'success');
          resolve({ success: true, output, errorOutput });
        } else {
          this.log(`${description} failed with code ${code}`, 'error');
          reject({ success: false, code, output, errorOutput });
        }
      });

      child.on('error', error => {
        this.log(`${description} error: ${error.message}`, 'error');
        reject({ success: false, error: error.message });
      });
    });
  }

  async checkDependencies() {
    this.log('Checking dependencies...');

    try {
      // Check if Node.js is installed
      await this.runCommand('node --version', 'Node.js version check');

      // Check if npm is installed
      await this.runCommand('npm --version', 'npm version check');

      // Check if required packages are installed
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      const requiredPackages = ['puppeteer', 'nodemailer'];

      for (const pkg of requiredPackages) {
        try {
          require.resolve(pkg);
          this.log(`✅ ${pkg} is installed`);
        } catch (error) {
          this.log(`❌ ${pkg} is missing, installing...`, 'warning');
          await this.runCommand(`npm install ${pkg}`, `Installing ${pkg}`);
        }
      }

      return true;
    } catch (error) {
      this.log(`Dependency check failed: ${error.message}`, 'error');
      return false;
    }
  }

  async installDependencies() {
    this.log('Installing dependencies...');

    try {
      await this.runCommand('npm install', 'Installing npm dependencies');
      return true;
    } catch (error) {
      this.log(`Dependency installation failed: ${error.message}`, 'error');
      return false;
    }
  }

  async buildProject() {
    this.log('Building project...');

    try {
      await this.runCommand('npm run build', 'Building Next.js project');
      return true;
    } catch (error) {
      this.log(`Build failed: ${error.message}`, 'error');
      return false;
    }
  }

  async startDevelopmentServer() {
    this.log('Starting development server...');

    try {
      // Check if server is already running
      const isRunning = await this.checkServerStatus();
      if (isRunning) {
        this.log('Development server is already running');
        return true;
      }

      // Start server in background
      const child = exec('npm run dev', {
        cwd: process.cwd(),
        detached: true,
        stdio: 'ignore',
      });

      child.unref();

      // Wait for server to start
      await this.waitForServer();

      this.log('Development server started successfully');
      return true;
    } catch (error) {
      this.log(`Failed to start server: ${error.message}`, 'error');
      return false;
    }
  }

  async checkServerStatus() {
    return new Promise(resolve => {
      exec('curl -s http://localhost:3000 > /dev/null', error => {
        resolve(!error);
      });
    });
  }

  async waitForServer(timeout = 30000) {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      const isRunning = await this.checkServerStatus();
      if (isRunning) {
        return true;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    throw new Error('Server failed to start within timeout');
  }

  async stopDevelopmentServer() {
    this.log('Stopping development server...');

    try {
      // Find and kill the dev server process
      await this.runCommand('pkill -f "next dev"', 'Stopping Next.js dev server');
      this.log('Development server stopped');
      return true;
    } catch (error) {
      this.log(`Failed to stop server: ${error.message}`, 'warning');
      return false;
    }
  }

  async createBackup() {
    this.log('Creating backup...');

    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupDir = `./backups/backup-${timestamp}`;

      // Create backup directory
      fs.mkdirSync(backupDir, { recursive: true });

      // Copy important files
      const filesToBackup = [
        'package.json',
        'package-lock.json',
        'next.config.js',
        'tailwind.config.js',
        'tsconfig.json',
      ];

      for (const file of filesToBackup) {
        if (fs.existsSync(file)) {
          fs.copyFileSync(file, path.join(backupDir, file));
        }
      }

      // Copy app directory
      if (fs.existsSync('./app')) {
        await this.runCommand(`cp -r ./app ${backupDir}/`, 'Backing up app directory');
      }

      // Copy components directory
      if (fs.existsSync('./components')) {
        await this.runCommand(
          `cp -r ./components ${backupDir}/`,
          'Backing up components directory'
        );
      }

      this.log(`Backup created: ${backupDir}`);
      return backupDir;
    } catch (error) {
      this.log(`Backup failed: ${error.message}`, 'error');
      return null;
    }
  }

  async runTests() {
    this.log('Running automated tests...');

    try {
      if (!this.testMonitor) {
        this.testMonitor = new AutoTestMonitor();
        await this.testMonitor.initialize();
      }

      await this.testMonitor.runAllTests();
      const report = await this.testMonitor.generateReport();

      this.log(`Tests completed: ${report.passedTests}/${report.totalTests} passed`);
      return report;
    } catch (error) {
      this.log(`Tests failed: ${error.message}`, 'error');
      return null;
    }
  }

  async deploy() {
    this.log('🚀 Starting deployment process...');

    try {
      // Create backup
      await this.createBackup();

      // Check dependencies
      const depsOk = await this.checkDependencies();
      if (!depsOk) {
        await this.installDependencies();
      }

      // Build project
      const buildOk = await this.buildProject();
      if (!buildOk) {
        throw new Error('Build failed');
      }

      // Start development server
      const serverOk = await this.startDevelopmentServer();
      if (!serverOk) {
        throw new Error('Server failed to start');
      }

      // Run tests
      const testReport = await this.runTests();

      this.lastDeployment = {
        timestamp: new Date().toISOString(),
        success: true,
        testReport,
      };

      this.log('✅ Deployment completed successfully');
      return true;
    } catch (error) {
      this.log(`❌ Deployment failed: ${error.message}`, 'error');

      this.lastDeployment = {
        timestamp: new Date().toISOString(),
        success: false,
        error: error.message,
      };

      return false;
    }
  }

  async startContinuousMonitoring() {
    if (this.isRunning) {
      this.log('⚠️ Continuous monitoring is already running');
      return;
    }

    this.isRunning = true;
    this.log('🔄 Starting continuous monitoring and deployment...');

    // Initial deployment
    await this.deploy();

    // Start test monitor in continuous mode
    if (!this.testMonitor) {
      this.testMonitor = new AutoTestMonitor();
      await this.testMonitor.initialize();
    }

    // Start continuous monitoring
    this.testMonitor.startMonitoring();

    // Monitor for file changes and redeploy
    this.monitorFileChanges();
  }

  monitorFileChanges() {
    this.log('👀 Monitoring for file changes...');

    const watchDirs = ['./app', './components', './lib', './middleware'];

    watchDirs.forEach(dir => {
      if (fs.existsSync(dir)) {
        fs.watch(dir, { recursive: true }, async (eventType, filename) => {
          if (filename && !filename.includes('node_modules') && !filename.includes('.git')) {
            this.log(`📝 File changed: ${filename}`);

            // Debounce changes
            clearTimeout(this.changeTimeout);
            this.changeTimeout = setTimeout(async () => {
              this.log('🔄 File changes detected, redeploying...');
              await this.deploy();
            }, 5000); // Wait 5 seconds after last change
          }
        });
      }
    });
  }

  async stopMonitoring() {
    this.isRunning = false;
    this.log('🛑 Stopping continuous monitoring...');

    if (this.testMonitor) {
      await this.testMonitor.stopMonitoring();
    }

    await this.stopDevelopmentServer();
  }

  generateDeploymentReport() {
    const report = {
      timestamp: new Date().toISOString(),
      totalDeployments: this.deploymentLog.filter(log => log.message.includes('Deployment')).length,
      successfulDeployments: this.deploymentLog.filter(
        log => log.message.includes('Deployment') && log.type === 'success'
      ).length,
      failedDeployments: this.deploymentLog.filter(
        log => log.message.includes('Deployment') && log.type === 'error'
      ).length,
      lastDeployment: this.lastDeployment,
      recentLogs: this.deploymentLog.slice(-20), // Last 20 log entries
      systemStatus: {
        serverRunning: this.checkServerStatus(),
        monitoringActive: this.isRunning,
      },
    };

    const reportFile = `./deployments/deployment-report-${new Date().toISOString().split('T')[0]}.json`;
    fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));

    this.log(`📊 Deployment report generated: ${reportFile}`);
    return report;
  }
}

// CLI Interface
async function main() {
  const deployMonitor = new AutoDeployMonitor();

  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    console.log('\n🛑 Received SIGINT, shutting down gracefully...');
    await deployMonitor.stopMonitoring();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
    await deployMonitor.stopMonitoring();
    process.exit(0);
  });

  const args = process.argv.slice(2);

  if (args.includes('--deploy')) {
    await deployMonitor.deploy();
  } else if (args.includes('--monitor')) {
    await deployMonitor.startContinuousMonitoring();
  } else if (args.includes('--stop')) {
    await deployMonitor.stopMonitoring();
  } else if (args.includes('--report')) {
    deployMonitor.generateDeploymentReport();
  } else if (args.includes('--start-server')) {
    await deployMonitor.startDevelopmentServer();
  } else if (args.includes('--stop-server')) {
    await deployMonitor.stopDevelopmentServer();
  } else {
    console.log(`
🚀 EHB Auto Deploy Monitor

Usage:
  node auto-deploy-monitor.js --deploy        Deploy once
  node auto-deploy-monitor.js --monitor       Start continuous monitoring
  node auto-deploy-monitor.js --stop          Stop monitoring
  node auto-deploy-monitor.js --report        Generate deployment report
  node auto-deploy-monitor.js --start-server  Start development server
  node auto-deploy-monitor.js --stop-server   Stop development server

Features:
  ✅ Automatic dependency management
  ✅ Project building and deployment
  ✅ Development server management
  ✅ File change monitoring
  ✅ Automated testing integration
  ✅ Backup creation
  ✅ Continuous monitoring
  ✅ Detailed logging and reporting
    `);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = AutoDeployMonitor;
