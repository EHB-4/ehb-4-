const { spawn, exec } = require('child_process');

class AutoRunner {
  constructor() {
    this.processes = new Map();
    this.isRunning = true;
  }

  async start() {
    console.log('🚀 EHB Auto Runner Starting...');

    // Kill existing processes
    await this.killProcesses();

    // Start development server
    this.startDevServer();

    // Start monitoring
    this.startMonitoring();

    // Open browser
    setTimeout(() => this.openBrowser(), 5000);
  }

  async killProcesses() {
    try {
      if (process.platform === 'win32') {
        exec('taskkill /F /IM node.exe');
      } else {
        exec('pkill -f node');
      }
      console.log('✅ Processes stopped');
    } catch (error) {
      console.log('ℹ️ No processes to stop');
    }
  }

  startDevServer() {
    console.log('🚀 Starting development server...');

    const devProcess = spawn('npm', ['run', 'dev'], {
      stdio: 'inherit',
      shell: true,
    });

    this.processes.set('dev', devProcess);

    devProcess.on('close', code => {
      console.log(`Dev server exited with code ${code}`);
      if (this.isRunning) {
        console.log('🔄 Restarting dev server...');
        setTimeout(() => this.startDevServer(), 2000);
      }
    });
  }

  startMonitoring() {
    setInterval(() => {
      this.checkHealth();
    }, 30000);
  }

  async checkHealth() {
    try {
      const response = await fetch('http://localhost:3000');
      if (!response.ok) {
        console.log('⚠️ Server health check failed, restarting...');
        this.restartDevServer();
      }
    } catch (error) {
      console.log('⚠️ Server not responding, restarting...');
      this.restartDevServer();
    }
  }

  restartDevServer() {
    const devProcess = this.processes.get('dev');
    if (devProcess) {
      devProcess.kill();
    }
  }

  openBrowser() {
    try {
      if (process.platform === 'win32') {
        spawn('start', ['http://localhost:3000'], { shell: true });
        spawn('start', ['http://localhost:3000/development-portal'], { shell: true });
      } else {
        spawn('open', ['http://localhost:3000']);
      }
      console.log('✅ Browser opened');
    } catch (error) {
      console.log('⚠️ Could not open browser');
    }
  }

  stop() {
    this.isRunning = false;
    for (const process of this.processes.values()) {
      process.kill();
    }
    console.log('✅ Auto runner stopped');
  }
}

// Handle shutdown
process.on('SIGINT', () => {
  if (global.autoRunner) {
    global.autoRunner.stop();
  }
  process.exit(0);
});

// Start auto runner
const autoRunner = new AutoRunner();
global.autoRunner = autoRunner;
autoRunner.start();
