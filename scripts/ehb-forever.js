#!/usr/bin/env node

/**
 * EHB Forever Runner
 * Keeps all services running forever with auto-restart
 */

const { spawn } = require('child_process');
const { existsSync } = require('fs');
const path = require('path');

// Service configurations
const services = [
  {
    name: '🏠 Home Page',
    port: 3000,
    folder: 'ehb-home',
    command: 'npm run dev -- --port 3000',
  },
  {
    name: '⚙️ Admin Panel',
    port: 5000,
    folder: 'ehb-admin-panel',
    command: 'npm run dev -- --port 5000',
  },
  {
    name: '🔧 Development Portal',
    port: 8080,
    folder: 'ehb-dev-portal',
    command: 'npm run dev -- --port 8080',
  },
  {
    name: '🛒 GoSellr',
    port: 4000,
    folder: 'ehb-gosellr',
    command: 'npm run dev -- --port 4000',
  },
];

// Ultra-fast agent
const ultraFastAgent = {
  name: '🚀 Ultra-Fast Agent',
  script: 'scripts/ehb-ultra-fast-agent.cjs',
};

class EHBForever {
  constructor() {
    this.processes = new Map();
    this.restartCounts = new Map();
    this.isRunning = false;
  }

  /**
   * Kill process on port
   */
  async killPort(port) {
    const { exec } = require('child_process');
    const platform = process.platform;

    return new Promise(resolve => {
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
   * Start service with auto-restart
   */
  startService(service) {
    const serviceKey = `${service.name}-${service.port}`;

    console.log(`🚀 Starting ${service.name}...`);

    // Kill existing process on port
    this.killPort(service.port);

    // Check/create folder
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

    // Change directory and start service
    const originalCwd = process.cwd();
    process.chdir(folderPath);

    const child = spawn('npm', ['run', 'dev', '--', '--port', service.port.toString()], {
      stdio: 'pipe',
      shell: true,
    });

    // Store process
    this.processes.set(serviceKey, {
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

    // Handle restart
    child.on('close', code => {
      console.log(`🛑 ${service.name} stopped (code: ${code})`);

      if (this.isRunning) {
        const restarts = this.restartCounts.get(serviceKey) || 0;
        this.restartCounts.set(serviceKey, restarts + 1);

        console.log(`🔄 Restarting ${service.name} (attempt ${restarts + 1})...`);
        setTimeout(() => {
          process.chdir(originalCwd);
          this.startService(service);
        }, 3000);
      }
    });

    child.on('error', error => {
      console.error(`❌ Error in ${service.name}:`, error.message);
    });

    // Return to original directory
    process.chdir(originalCwd);

    return child;
  }

  /**
   * Start ultra-fast agent
   */
  startUltraFastAgent() {
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

    this.processes.set('ultra-fast-agent', {
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
      console.log(`🛑 ${ultraFastAgent.name} stopped (code: ${code})`);

      if (this.isRunning) {
        const restarts = this.restartCounts.get('ultra-fast-agent') || 0;
        this.restartCounts.set('ultra-fast-agent', restarts + 1);

        console.log(`🔄 Restarting ${ultraFastAgent.name} (attempt ${restarts + 1})...`);
        setTimeout(() => this.startUltraFastAgent(), 5000);
      }
    });

    return child;
  }

  /**
   * Start all services
   */
  async startAll() {
    this.isRunning = true;

    console.log('🚀 EHB Forever Runner Starting...');
    console.log('==================================');
    console.log('🔄 Auto-restart enabled for all services');
    console.log('📊 Services will restart automatically if they crash');
    console.log('');

    // Start all services
    services.forEach(service => {
      this.startService(service);
    });

    // Start ultra-fast agent
    setTimeout(() => {
      this.startUltraFastAgent();
    }, 5000);

    console.log('');
    console.log('✅ All services started!');
    console.log('🔄 Services will run forever with auto-restart');
    console.log('🛑 Press Ctrl+C to stop all services');
    console.log('');

    // Show status every minute
    setInterval(() => {
      this.showStatus();
    }, 60000);

    // Handle shutdown
    process.on('SIGINT', () => this.shutdown());
    process.on('SIGTERM', () => this.shutdown());
  }

  /**
   * Show status
   */
  showStatus() {
    console.log('');
    console.log('📊 EHB Services Status');
    console.log('======================');

    for (const [key, info] of this.processes) {
      const isAlive = !info.process.killed;
      const status = isAlive ? '✅ Running' : '❌ Stopped';
      const restarts = this.restartCounts.get(key) || 0;
      const uptime = Date.now() - info.startTime.getTime();
      const uptimeMinutes = Math.floor(uptime / (1000 * 60));

      console.log(
        `${status} ${info.service.name} (Restarts: ${restarts}, Uptime: ${uptimeMinutes}m)`
      );
    }

    console.log('');
  }

  /**
   * Shutdown
   */
  async shutdown() {
    console.log('\n🛑 Shutting down EHB Forever Runner...');

    this.isRunning = false;

    for (const [key, info] of this.processes) {
      try {
        info.process.kill('SIGTERM');
        console.log(`✅ Stopped ${info.service.name}`);
      } catch (error) {
        console.log(`❌ Error stopping ${info.service.name}`);
      }
    }

    console.log('👋 EHB Forever Runner stopped');
    process.exit(0);
  }
}

// Start forever runner
if (require.main === module) {
  const forever = new EHBForever();
  forever.startAll().catch(console.error);
}

module.exports = EHBForever;
