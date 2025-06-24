#!/usr/bin/env node

const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

class AutoDevManager {
  constructor() {
    this.processes = new Map();
    this.isRunning = false;
    this.autoRestart = true;
  }

  // Auto-clean and restart development server
  async autoRestartDev() {
    console.log('🔄 Auto-restarting development server...');

    // Kill existing processes
    await this.killAllProcesses();

    // Clean .next directory
    await this.cleanNextDir();

    // Start development server
    await this.startDevServer();
  }

  // Kill all running processes
  async killAllProcesses() {
    return new Promise(resolve => {
      if (process.platform === 'win32') {
        exec('taskkill /F /IM node.exe', error => {
          if (error) {
            console.log('No existing Node processes to kill');
          } else {
            console.log('✅ Killed existing Node processes');
          }
          resolve();
        });
      } else {
        exec('pkill -f "next dev"', error => {
          if (error) {
            console.log('No existing Next.js processes to kill');
          } else {
            console.log('✅ Killed existing Next.js processes');
          }
          resolve();
        });
      }
    });
  }

  // Clean .next directory
  async cleanNextDir() {
    const nextDir = path.join(process.cwd(), '.next');
    if (fs.existsSync(nextDir)) {
      fs.rmSync(nextDir, { recursive: true, force: true });
      console.log('🧹 Cleaned .next directory');
    }
  }

  // Start development server
  async startDevServer() {
    console.log('🚀 Starting development server...');

    const devProcess = spawn('npm', ['run', 'dev'], {
      stdio: 'inherit',
      shell: true,
    });

    this.processes.set('dev', devProcess);

    devProcess.on('error', error => {
      console.error('❌ Development server error:', error);
      if (this.autoRestart) {
        setTimeout(() => this.autoRestartDev(), 5000);
      }
    });

    devProcess.on('exit', code => {
      console.log(`Development server exited with code ${code}`);
      if (this.autoRestart && code !== 0) {
        setTimeout(() => this.autoRestartDev(), 5000);
      }
    });
  }

  // Auto-install dependencies
  async installDependencies() {
    console.log('📦 Installing dependencies...');

    return new Promise((resolve, reject) => {
      const installProcess = spawn('npm', ['install'], {
        stdio: 'inherit',
        shell: true,
      });

      installProcess.on('close', code => {
        if (code === 0) {
          console.log('✅ Dependencies installed successfully');
          resolve();
        } else {
          console.error('❌ Failed to install dependencies');
          reject(new Error(`Install failed with code ${code}`));
        }
      });
    });
  }

  // Auto-run tests
  async runTests() {
    console.log('🧪 Running tests...');

    return new Promise(resolve => {
      const testProcess = spawn('npm', ['test'], {
        stdio: 'inherit',
        shell: true,
      });

      testProcess.on('close', code => {
        if (code === 0) {
          console.log('✅ All tests passed');
        } else {
          console.log('⚠️ Some tests failed');
        }
        resolve();
      });
    });
  }

  // Auto-lint and format code
  async lintAndFormat() {
    console.log('🔍 Linting and formatting code...');

    return new Promise(resolve => {
      const lintProcess = spawn('npm', ['run', 'lint'], {
        stdio: 'inherit',
        shell: true,
      });

      lintProcess.on('close', code => {
        if (code === 0) {
          console.log('✅ Code linting passed');
        } else {
          console.log('⚠️ Code linting issues found');
        }
        resolve();
      });
    });
  }

  // Auto-build for production
  async buildProduction() {
    console.log('🏗️ Building for production...');

    return new Promise((resolve, reject) => {
      const buildProcess = spawn('npm', ['run', 'build'], {
        stdio: 'inherit',
        shell: true,
      });

      buildProcess.on('close', code => {
        if (code === 0) {
          console.log('✅ Production build successful');
          resolve();
        } else {
          console.error('❌ Production build failed');
          reject(new Error(`Build failed with code ${code}`));
        }
      });
    });
  }

  // Monitor file changes and auto-restart
  startFileWatcher() {
    console.log('👀 Starting file watcher...');

    const watchDirs = ['app', 'components', 'lib', 'styles'];

    watchDirs.forEach(dir => {
      if (fs.existsSync(dir)) {
        fs.watch(dir, { recursive: true }, (eventType, filename) => {
          if (filename && !filename.includes('node_modules')) {
            console.log(`📝 File changed: ${filename}`);
            // Auto-restart after file changes
            if (this.autoRestart) {
              setTimeout(() => this.autoRestartDev(), 2000);
            }
          }
        });
      }
    });
  }

  // Start all automated processes
  async start() {
    console.log('🤖 Starting Auto Development Manager...');
    this.isRunning = true;

    try {
      // Install dependencies if needed
      if (!fs.existsSync('node_modules')) {
        await this.installDependencies();
      }

      // Start file watcher
      this.startFileWatcher();

      // Start development server
      await this.startDevServer();

      console.log('✅ Auto Development Manager is running!');
      console.log('🌐 Development server: http://localhost:3000');
      console.log('📝 File changes will auto-restart the server');
      console.log('🛑 Press Ctrl+C to stop');
    } catch (error) {
      console.error('❌ Failed to start Auto Development Manager:', error);
      process.exit(1);
    }
  }

  // Stop all processes
  stop() {
    console.log('🛑 Stopping Auto Development Manager...');
    this.isRunning = false;
    this.autoRestart = false;

    this.processes.forEach((process, name) => {
      process.kill();
      console.log(`✅ Stopped ${name} process`);
    });

    this.processes.clear();
  }
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Received SIGINT, shutting down...');
  if (autoDevManager) {
    autoDevManager.stop();
  }
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Received SIGTERM, shutting down...');
  if (autoDevManager) {
    autoDevManager.stop();
  }
  process.exit(0);
});

// Start the auto development manager
const autoDevManager = new AutoDevManager();
autoDevManager.start();
