const fs = require('fs');
const path = require('path');
const { exec, spawn } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

class PortManager {
  constructor() {
    this.projectRoot = process.cwd();
    this.ports = {
      frontend: 3000,
      backend: 3001,
      admin: 3002,
      api: 3003,
      database: 27017,
      redis: 6379,
    };
    this.runningProcesses = new Map();
  }

  async initialize() {
    console.log('🔌 Port Manager Initializing...');

    // Check which ports are available
    await this.checkPortAvailability();

    // Start port monitoring
    await this.startPortMonitoring();
  }

  async checkPortAvailability() {
    console.log('🔍 Checking Port Availability...');

    for (const [service, port] of Object.entries(this.ports)) {
      const isAvailable = await this.isPortAvailable(port);
      console.log(
        `${isAvailable ? '✅' : '❌'} Port ${port} (${service}) - ${isAvailable ? 'Available' : 'In Use'}`
      );

      if (!isAvailable) {
        // Find alternative port
        const alternativePort = await this.findAlternativePort(port);
        this.ports[service] = alternativePort;
        console.log(`🔄 Using alternative port ${alternativePort} for ${service}`);
      }
    }
  }

  async isPortAvailable(port) {
    try {
      if (process.platform === 'win32') {
        await execAsync(`netstat -an | findstr :${port}`);
        return false; // If command succeeds, port is in use
      } else {
        await execAsync(`lsof -i :${port}`);
        return false; // If command succeeds, port is in use
      }
    } catch (error) {
      return true; // Port is available
    }
  }

  async findAlternativePort(startPort) {
    let port = startPort + 1;
    while (port < startPort + 100) {
      if (await this.isPortAvailable(port)) {
        return port;
      }
      port++;
    }
    return startPort; // Fallback to original port
  }

  async startPortMonitoring() {
    console.log('📊 Starting Port Monitoring...');

    setInterval(async () => {
      await this.monitorPorts();
    }, 5000); // Check every 5 seconds
  }

  async monitorPorts() {
    for (const [service, port] of Object.entries(this.ports)) {
      const isRunning = await this.isServiceRunning(service, port);

      if (!isRunning && this.shouldAutoStart(service)) {
        await this.startService(service, port);
      }
    }
  }

  async isServiceRunning(service, port) {
    try {
      if (process.platform === 'win32') {
        await execAsync(`netstat -an | findstr :${port}`);
        return true;
      } else {
        await execAsync(`lsof -i :${port}`);
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  shouldAutoStart(service) {
    // Define which services should auto-start
    const autoStartServices = ['frontend', 'backend', 'admin'];
    return autoStartServices.includes(service);
  }

  async startService(service, port) {
    console.log(`🚀 Starting ${service} on port ${port}...`);

    try {
      let command, args;

      switch (service) {
        case 'frontend':
          command = 'npm';
          args = ['run', 'dev', '--', '-p', port.toString()];
          break;
        case 'backend':
          command = 'node';
          args = ['server.js', '--port', port.toString()];
          break;
        case 'admin':
          command = 'npm';
          args = ['run', 'admin', '--', '-p', port.toString()];
          break;
        case 'api':
          command = 'npm';
          args = ['run', 'api', '--', '-p', port.toString()];
          break;
        default:
          return;
      }

      const process = spawn(command, args, {
        cwd: this.projectRoot,
        stdio: 'pipe',
      });

      this.runningProcesses.set(service, process);

      process.stdout.on('data', data => {
        console.log(`[${service}] ${data.toString()}`);
      });

      process.stderr.on('data', data => {
        console.error(`[${service}] Error: ${data.toString()}`);
      });

      process.on('close', code => {
        console.log(`[${service}] Process exited with code ${code}`);
        this.runningProcesses.delete(service);
      });
    } catch (error) {
      console.error(`❌ Failed to start ${service}:`, error.message);
    }
  }

  async stopService(service) {
    const process = this.runningProcesses.get(service);
    if (process) {
      process.kill();
      this.runningProcesses.delete(service);
      console.log(`🛑 Stopped ${service}`);
    }
  }

  async stopAllServices() {
    console.log('🛑 Stopping all services...');

    for (const [service, process] of this.runningProcesses) {
      process.kill();
    }

    this.runningProcesses.clear();
  }

  getPortInfo() {
    return {
      ports: this.ports,
      running: Array.from(this.runningProcesses.keys()),
      status: 'active',
    };
  }

  async createPortConfig() {
    const config = {
      ports: this.ports,
      autoStart: {
        frontend: true,
        backend: true,
        admin: true,
        api: false,
      },
      monitoring: {
        enabled: true,
        interval: 5000,
      },
    };

    const configPath = path.join(
      this.projectRoot,
      'scripts',
      'ehb-auto-system',
      'config',
      'ports.json'
    );
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

    console.log('✅ Port configuration saved');
  }
}

module.exports = PortManager;
