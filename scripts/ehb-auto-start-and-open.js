#!/usr/bin/env node

/**
 * EHB Auto Start and Open All Pages
 * Starts all services and automatically opens them in browser
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
  },
  {
    name: '⚙️ Admin Panel',
    port: 5000,
    folder: 'ehb-admin-panel',
    command: 'npm run dev -- --port 5000',
    url: 'http://localhost:5000',
  },
  {
    name: '🔧 Development Portal',
    port: 8080,
    folder: 'ehb-dev-portal',
    command: 'npm run dev -- --port 8080',
    url: 'http://localhost:8080',
  },
  {
    name: '🛒 GoSellr',
    port: 4000,
    folder: 'ehb-gosellr',
    command: 'npm run dev -- --port 4000',
    url: 'http://localhost:4000',
  },
];

// Ultra-fast agent
const ultraFastAgent = {
  name: '🚀 Ultra-Fast Agent',
  script: 'scripts/ehb-ultra-fast-agent.cjs',
};

class EHBStartAndOpen {
  constructor() {
    this.processes = new Map();
    this.isRunning = false;
  }

  /**
   * Kill process on port
   */
  async killPort(port) {
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
    const maxAttempts = 60; // 60 seconds timeout

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
   * Open URL in browser
   */
  openBrowser(url, serviceName) {
    return new Promise(resolve => {
      const platform = process.platform;
      let command;

      switch (platform) {
        case 'win32':
          command = `start ${url}`;
          break;
        case 'darwin':
          command = `open ${url}`;
          break;
        default:
          command = `xdg-open ${url}`;
      }

      exec(command, error => {
        if (error) {
          console.error(`❌ Failed to open ${serviceName}: ${error.message}`);
          resolve(false);
        } else {
          console.log(`🌐 Opened ${serviceName} - ${url}`);
          resolve(true);
        }
      });
    });
  }

  /**
   * Start service
   */
  async startService(service) {
    console.log(`🚀 Starting ${service.name}...`);

    // Kill any existing process on the port
    await this.killPort(service.port);

    // Check if folder exists
    const folderPath = path.join(process.cwd(), service.folder);
    if (!existsSync(folderPath)) {
      console.log(`📁 Creating folder: ${service.folder}`);
      const fs = require('fs');
      fs.mkdirSync(folderPath, { recursive: true });

      // Create package.json
      const packageJson = {
        name: service.folder,
        version: '1.0.0',
        scripts: {
          dev: `next dev --port ${service.port}`,
          build: 'next build',
          start: `next start --port ${service.port}`,
        },
      };

      fs.writeFileSync(path.join(folderPath, 'package.json'), JSON.stringify(packageJson, null, 2));
    }

    // Change to service directory
    const originalCwd = process.cwd();
    process.chdir(folderPath);

    // Start the service
    const child = spawn('npm', ['run', 'dev', '--', '--port', service.port.toString()], {
      stdio: 'pipe',
      shell: true,
    });

    // Store process
    this.processes.set(service.name, {
      process: child,
      service: service,
      startTime: new Date(),
    });

    // Handle output
    child.stdout.on('data', data => {
      console.log(`[${service.name}] ${data.toString().trim()}`);
    });

    child.stderr.on('data', data => {
      console.log(`[${service.name}] ERROR: ${data.toString().trim()}`);
    });

    child.on('close', code => {
      console.log(`🛑 ${service.name} stopped with code ${code}`);
    });

    child.on('error', error => {
      console.error(`❌ Error starting ${service.name}:`, error.message);
    });

    // Return to original directory
    process.chdir(originalCwd);

    // Wait for service to be ready
    const isReady = await this.waitForService(service.port, service.name);

    if (isReady) {
      // Open in browser after 2 seconds
      setTimeout(async () => {
        await this.openBrowser(service.url, service.name);
      }, 2000);
    }

    return child;
  }

  /**
   * Start ultra-fast agent
   */
  async startUltraFastAgent() {
    console.log(`🚀 Starting ${ultraFastAgent.name}...`);

    const agentPath = path.join(process.cwd(), ultraFastAgent.script);
    if (!existsSync(agentPath)) {
      console.log(`⚠️  Ultra-fast agent not found: ${agentPath}`);
      return;
    }

    const child = spawn('node', [ultraFastAgent.script], {
      stdio: 'pipe',
      shell: true,
    });

    this.processes.set(ultraFastAgent.name, {
      process: child,
      service: ultraFastAgent,
      startTime: new Date(),
    });

    child.stdout.on('data', data => {
      console.log(`[${ultraFastAgent.name}] ${data.toString().trim()}`);
    });

    child.stderr.on('data', data => {
      console.log(`[${ultraFastAgent.name}] ERROR: ${data.toString().trim()}`);
    });

    child.on('close', code => {
      console.log(`🛑 ${ultraFastAgent.name} stopped with code ${code}`);
    });

    return child;
  }

  /**
   * Start all services and open in browser
   */
  async startAll() {
    this.isRunning = true;

    console.log('🚀 EHB Auto Start and Open All Pages');
    console.log('=====================================');
    console.log('Starting all services and opening in browser...\n');

    // Start all services sequentially
    for (let i = 0; i < services.length; i++) {
      const service = services[i];
      await this.startService(service);

      // Wait between services
      if (i < services.length - 1) {
        console.log('⏳ Waiting 3 seconds before next service...\n');
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }

    // Start ultra-fast agent
    setTimeout(async () => {
      await this.startUltraFastAgent();
    }, 5000);

    console.log('\n✅ All services started!');
    console.log('🌐 All pages should be open in your browser');
    console.log('\n📋 Services running:');
    services.forEach(service => {
      console.log(`   • ${service.name} - ${service.url}`);
    });
    console.log(`   • ${ultraFastAgent.name}`);

    // Show status every 30 seconds
    setInterval(() => {
      this.showStatus();
    }, 30000);

    // Handle shutdown
    process.on('SIGINT', () => this.shutdown());
    process.on('SIGTERM', () => this.shutdown());
  }

  /**
   * Show status
   */
  showStatus() {
    console.log('\n📊 EHB Services Status');
    console.log('======================');

    for (const [name, info] of this.processes) {
      const isAlive = !info.process.killed;
      const status = isAlive ? '✅ Running' : '❌ Stopped';
      const uptime = Date.now() - info.startTime.getTime();
      const uptimeMinutes = Math.floor(uptime / (1000 * 60));

      console.log(`${status} ${name} (Uptime: ${uptimeMinutes}m)`);
    }

    console.log('');
  }

  /**
   * Shutdown
   */
  async shutdown() {
    console.log('\n🛑 Shutting down EHB services...');

    this.isRunning = false;

    for (const [name, info] of this.processes) {
      try {
        info.process.kill('SIGTERM');
        console.log(`✅ Stopped ${name}`);
      } catch (error) {
        console.log(`❌ Error stopping ${name}`);
      }
    }

    console.log('👋 EHB services stopped');
    process.exit(0);
  }
}

// Start the system
if (require.main === module) {
  const startAndOpen = new EHBStartAndOpen();
  startAndOpen.startAll().catch(console.error);
}

module.exports = EHBStartAndOpen;
