#!/usr/bin/env node

/**
 * EHB 24/7 Real-Time Monitor
 * Keeps all services running continuously and includes ultra-fast agent
 */

const { spawn, exec } = require('child_process');
const { existsSync } = require('fs');
const path = require('path');

// Service configurations
const services = [
  {
    name: '🏠 Home Page',
    port: 3000,
    folder: 'ehb-home',
    command: 'npm run dev -- --port 3000',
    url: 'http://localhost:3000',
    autoRestart: true,
    maxRestarts: 10,
  },
  {
    name: '⚙️ Admin Panel',
    port: 5000,
    folder: 'ehb-admin-panel',
    command: 'npm run dev -- --port 5000',
    url: 'http://localhost:5000',
    autoRestart: true,
    maxRestarts: 10,
  },
  {
    name: '🔧 Development Portal',
    port: 8080,
    folder: 'ehb-dev-portal',
    command: 'npm run dev -- --port 8080',
    url: 'http://localhost:8080',
    autoRestart: true,
    maxRestarts: 10,
  },
  {
    name: '🛒 GoSellr',
    port: 4000,
    folder: 'ehb-gosellr',
    command: 'npm run dev -- --port 4000',
    url: 'http://localhost:4000',
    autoRestart: true,
    maxRestarts: 10,
  },
];

// Ultra-fast agent configuration
const ultraFastAgent = {
  name: '🚀 Ultra-Fast Agent',
  script: 'scripts/ehb-ultra-fast-agent.cjs',
  autoRestart: true,
  maxRestarts: 5,
};

class EHBMonitor {
  constructor() {
    this.processes = new Map();
    this.restartCounts = new Map();
    this.isRunning = false;
    this.startTime = new Date();
  }

  /**
   * Kill process on specific port
   */
  async killProcessOnPort(port) {
    return new Promise(resolve => {
      const platform = process.platform;
      let command;

      if (platform === 'win32') {
        command = `netstat -ano | findstr :${port}`;
      } else {
        command = `lsof -ti:${port}`;
      }

      exec(command, (error, stdout) => {
        if (stdout) {
          const lines = stdout.trim().split('\n');
          lines.forEach(line => {
            let pid;
            if (platform === 'win32') {
              const match = line.match(/\s+(\d+)$/);
              pid = match ? match[1] : null;
            } else {
              pid = line.trim();
            }

            if (pid) {
              const killCommand =
                platform === 'win32' ? `taskkill /PID ${pid} /F` : `kill -9 ${pid}`;

              exec(killCommand, () => {
                console.log(`✅ Killed process on port ${port}`);
              });
            }
          });
        }
        resolve();
      });
    });
  }

  /**
   * Check if port is available
   */
  async isPortAvailable(port) {
    return new Promise(resolve => {
      const net = require('net');
      const client = new net.Socket();

      client.connect(port, 'localhost', () => {
        client.destroy();
        resolve(false); // Port is in use
      });

      client.on('error', () => {
        resolve(true); // Port is available
      });
    });
  }

  /**
   * Wait for service to be ready
   */
  async waitForService(port, serviceName) {
    console.log(`⏳ Waiting for ${serviceName} to be ready on port ${port}...`);

    let attempts = 0;
    const maxAttempts = 30;

    while (attempts < maxAttempts) {
      if (!(await this.isPortAvailable(port))) {
        console.log(`✅ ${serviceName} is ready on port ${port}`);
        return true;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      attempts++;
    }

    console.log(`❌ Timeout waiting for ${serviceName}`);
    return false;
  }

  /**
   * Start a service
   */
  async startService(service) {
    const serviceKey = `${service.name}-${service.port}`;

    // Kill any existing process on the port
    await this.killProcessOnPort(service.port);

    // Check if folder exists
    const folderPath = path.join(process.cwd(), service.folder);
    if (!existsSync(folderPath)) {
      console.log(`⚠️  Folder ${service.folder} not found, creating it...`);
      const fs = require('fs');
      fs.mkdirSync(folderPath, { recursive: true });

      // Create basic package.json if it doesn't exist
      const packageJsonPath = path.join(folderPath, 'package.json');
      if (!existsSync(packageJsonPath)) {
        const packageJson = {
          name: service.folder,
          version: '1.0.0',
          scripts: {
            dev: `next dev --port ${service.port}`,
            build: 'next build',
            start: `next start --port ${service.port}`,
          },
        };
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      }
    }

    // Change to service directory
    const originalCwd = process.cwd();
    process.chdir(folderPath);

    // Start the service
    const child = spawn('npm', ['run', 'dev', '--', '--port', service.port.toString()], {
      stdio: 'pipe',
      shell: true,
    });

    // Store process info
    this.processes.set(serviceKey, {
      process: child,
      service: service,
      startTime: new Date(),
      restarts: this.restartCounts.get(serviceKey) || 0,
    });

    // Handle process events
    child.stdout.on('data', data => {
      console.log(`[${service.name}] ${data.toString().trim()}`);
    });

    child.stderr.on('data', data => {
      console.log(`[${service.name}] ERROR: ${data.toString().trim()}`);
    });

    child.on('close', code => {
      console.log(`🛑 ${service.name} stopped with code ${code}`);

      if (service.autoRestart && this.isRunning) {
        const currentRestarts = this.restartCounts.get(serviceKey) || 0;
        if (currentRestarts < service.maxRestarts) {
          console.log(
            `🔄 Restarting ${service.name} (${currentRestarts + 1}/${service.maxRestarts})...`
          );
          this.restartCounts.set(serviceKey, currentRestarts + 1);
          setTimeout(() => this.startService(service), 3000);
        } else {
          console.log(`❌ ${service.name} exceeded max restart attempts`);
        }
      }
    });

    child.on('error', error => {
      console.error(`❌ Error starting ${service.name}:`, error.message);
    });

    // Return to original directory
    process.chdir(originalCwd);

    // Wait for service to be ready
    await this.waitForService(service.port, service.name);

    return child;
  }

  /**
   * Start ultra-fast agent
   */
  async startUltraFastAgent() {
    console.log(`🚀 Starting ${ultraFastAgent.name}...`);

    const agentPath = path.join(process.cwd(), ultraFastAgent.script);
    if (!existsSync(agentPath)) {
      console.log(`⚠️  Ultra-fast agent script not found: ${agentPath}`);
      return;
    }

    const child = spawn('node', [ultraFastAgent.script], {
      stdio: 'pipe',
      shell: true,
    });

    this.processes.set('ultra-fast-agent', {
      process: child,
      service: ultraFastAgent,
      startTime: new Date(),
      restarts: this.restartCounts.get('ultra-fast-agent') || 0,
    });

    child.stdout.on('data', data => {
      console.log(`[${ultraFastAgent.name}] ${data.toString().trim()}`);
    });

    child.stderr.on('data', data => {
      console.log(`[${ultraFastAgent.name}] ERROR: ${data.toString().trim()}`);
    });

    child.on('close', code => {
      console.log(`🛑 ${ultraFastAgent.name} stopped with code ${code}`);

      if (ultraFastAgent.autoRestart && this.isRunning) {
        const currentRestarts = this.restartCounts.get('ultra-fast-agent') || 0;
        if (currentRestarts < ultraFastAgent.maxRestarts) {
          console.log(
            `🔄 Restarting ${ultraFastAgent.name} (${currentRestarts + 1}/${
              ultraFastAgent.maxRestarts
            })...`
          );
          this.restartCounts.set('ultra-fast-agent', currentRestarts + 1);
          setTimeout(() => this.startUltraFastAgent(), 5000);
        } else {
          console.log(`❌ ${ultraFastAgent.name} exceeded max restart attempts`);
        }
      }
    });

    return child;
  }

  /**
   * Start all services
   */
  async startAll() {
    this.isRunning = true;
    this.startTime = new Date();

    console.log('🚀 EHB 24/7 Real-Time Monitor Starting...');
    console.log('==========================================');
    console.log(`⏰ Start Time: ${this.startTime.toLocaleString()}`);
    console.log('');

    // Start all services
    const servicePromises = services.map(service => this.startService(service));
    await Promise.all(servicePromises);

    // Start ultra-fast agent
    await this.startUltraFastAgent();

    console.log('');
    console.log('✅ All services started successfully!');
    console.log('🔄 Auto-restart enabled for all services');
    console.log('📊 Monitoring active - services will restart automatically if they crash');
    console.log('');

    // Start status monitoring
    this.startStatusMonitor();

    // Handle graceful shutdown
    process.on('SIGINT', () => this.shutdown());
    process.on('SIGTERM', () => this.shutdown());
  }

  /**
   * Start status monitoring
   */
  startStatusMonitor() {
    setInterval(() => {
      this.showStatus();
    }, 30000); // Show status every 30 seconds
  }

  /**
   * Show current status
   */
  showStatus() {
    const uptime = Date.now() - this.startTime.getTime();
    const uptimeHours = Math.floor(uptime / (1000 * 60 * 60));
    const uptimeMinutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));

    console.log('');
    console.log('📊 EHB Services Status');
    console.log('======================');
    console.log(`⏰ Uptime: ${uptimeHours}h ${uptimeMinutes}m`);
    console.log(`🔄 Active Services: ${this.processes.size}`);
    console.log('');

    for (const [key, info] of this.processes) {
      const isAlive = !info.process.killed;
      const status = isAlive ? '✅ Running' : '❌ Stopped';
      const restarts = info.restarts;

      console.log(`${status} ${info.service.name} (Restarts: ${restarts})`);
    }

    console.log('');
    console.log('💡 Services will auto-restart if they crash');
    console.log('🛑 Press Ctrl+C to stop all services');
  }

  /**
   * Shutdown all services
   */
  async shutdown() {
    console.log('\n🛑 Shutting down EHB 24/7 Monitor...');

    this.isRunning = false;

    for (const [key, info] of this.processes) {
      try {
        info.process.kill('SIGTERM');
        console.log(`✅ Stopped ${info.service.name}`);
      } catch (error) {
        console.log(`❌ Error stopping ${info.service.name}: ${error.message}`);
      }
    }

    console.log('👋 EHB 24/7 Monitor stopped');
    process.exit(0);
  }
}

// Start the monitor
if (require.main === module) {
  const monitor = new EHBMonitor();
  monitor.startAll().catch(console.error);
}

module.exports = EHBMonitor;
