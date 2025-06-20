#!/usr/bin/env node

const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const net = require('net');

class LiveMonitor {
  constructor() {
    this.services = {
      main: { port: 3000, url: 'http://localhost:3000', name: 'Main App' },
      admin: { port: 3000, url: 'http://localhost:3000/admin', name: 'Admin Panel' },
      dashboard: { port: 3000, url: 'http://localhost:3000/dashboard', name: 'Dashboard' },
      api: { port: 3000, url: 'http://localhost:3000/api', name: 'API' },
      ai: { port: 3000, url: 'http://localhost:3000/ai', name: 'AI Services' },
      wallet: { port: 3000, url: 'http://localhost:3000/wallet', name: 'Wallet' },
      analytics: { port: 3000, url: 'http://localhost:3000/analytics', name: 'Analytics' },
    };
    this.logFile = path.join(__dirname, '../logs/live-monitor.log');
    this.ensureLogDirectory();
  }

  ensureLogDirectory() {
    const logDir = path.dirname(this.logFile);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    console.log(logMessage.trim());
    fs.appendFileSync(this.logFile, logMessage);
  }

  async checkPort(port) {
    return new Promise(resolve => {
      const server = net.createServer();
      server.listen(port, () => {
        server.close();
        resolve(true); // Port is available
      });
      server.on('error', () => {
        resolve(false); // Port is in use
      });
    });
  }

  async openInBrowser(url, serviceName) {
    try {
      exec(`start ${url}`, error => {
        if (error) {
          this.log(`❌ Failed to open ${serviceName}: ${error.message}`);
        } else {
          this.log(`✅ Opened ${serviceName} in browser: ${url}`);
        }
      });
    } catch (error) {
      this.log(`❌ Error opening ${serviceName}: ${error.message}`);
    }
  }

  async startNextJS() {
    this.log('🚀 Starting Next.js development server...');

    const child = spawn('npm', ['run', 'dev'], {
      stdio: 'pipe',
      shell: true,
    });

    child.stdout.on('data', data => {
      const output = data.toString().trim();
      this.log(`[Next.js] ${output}`);

      // Check if server is ready
      if (output.includes('Ready') || output.includes('started server')) {
        this.log('✅ Next.js server is ready!');
        this.openAllServices();
      }
    });

    child.stderr.on('data', data => {
      this.log(`[Next.js ERROR] ${data.toString().trim()}`);
    });

    child.on('close', code => {
      this.log(`Next.js process exited with code ${code}`);
    });

    return child;
  }

  async openAllServices() {
    this.log('🌐 Opening all services in browser...');

    // Wait a bit for server to fully start
    await new Promise(resolve => setTimeout(resolve, 3000));

    for (const [key, service] of Object.entries(this.services)) {
      await this.openInBrowser(service.url, service.name);
      // Small delay between opening tabs
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  async healthCheck() {
    this.log('🔍 Performing health check...');

    for (const [key, service] of Object.entries(this.services)) {
      const isAvailable = await this.checkPort(service.port);
      if (isAvailable) {
        this.log(`✅ ${service.name} is available on port ${service.port}`);
      } else {
        this.log(`❌ ${service.name} is not available on port ${service.port}`);
      }
    }
  }

  async startMonitoring() {
    try {
      this.log('🎯 Starting Live Monitor...');

      // Start Next.js server
      const nextProcess = await this.startNextJS();

      // Wait for server to start
      await new Promise(resolve => setTimeout(resolve, 10000));

      // Perform health check
      await this.healthCheck();

      // Open all services
      await this.openAllServices();

      this.log('🎉 All services are live and running!');
      this.log('📊 Monitoring active... Press Ctrl+C to stop');

      // Keep monitoring
      setInterval(async () => {
        await this.healthCheck();
      }, 30000); // Check every 30 seconds

      // Handle shutdown
      process.on('SIGINT', () => {
        this.log('🛑 Shutting down Live Monitor...');
        nextProcess.kill('SIGTERM');
        process.exit(0);
      });
    } catch (error) {
      this.log(`❌ Live Monitor failed: ${error.message}`);
      process.exit(1);
    }
  }
}

// Start the live monitor
const monitor = new LiveMonitor();
monitor.startMonitoring();
