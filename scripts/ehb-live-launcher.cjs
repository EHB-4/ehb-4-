#!/usr/bin/env node

const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const net = require('net');

class EHBLiveLauncher {
  constructor() {
    this.services = {
      main: { port: 3000, url: 'http://localhost:3000', name: 'Main App' },
      admin: { port: 3000, url: 'http://localhost:3000/admin', name: 'Admin Panel' },
      dashboard: { port: 3000, url: 'http://localhost:3000/dashboard', name: 'Dashboard' },
      ai: { port: 3000, url: 'http://localhost:3000/ai', name: 'AI Services' },
      wallet: { port: 3000, url: 'http://localhost:3000/wallet', name: 'Wallet' },
      analytics: { port: 3000, url: 'http://localhost:3000/analytics', name: 'Analytics' },
      ehbDashboard: {
        port: 3000,
        url: 'http://localhost:3000/ehb-dashboard',
        name: 'EHB Dashboard',
      },
      ehbHome: { port: 3000, url: 'http://localhost:3000/ehb-home-page', name: 'EHB Home' },
      aiMarketplace: {
        port: 3000,
        url: 'http://localhost:3000/ehb-ai-market-place',
        name: 'AI Marketplace',
      },
      ehbTube: { port: 3000, url: 'http://localhost:3000/ehb-tube', name: 'EHB Tube' },
      ehbWallet: { port: 3000, url: 'http://localhost:3000/ehb-wallet', name: 'EHB Wallet' },
      ehbAds: { port: 3000, url: 'http://localhost:3000/ehb-ads', name: 'EHB Ads' },
      gosellr: { port: 3000, url: 'http://localhost:3000/gosellr', name: 'GoSellr' },
      franchise: { port: 3000, url: 'http://localhost:3000/franchise', name: 'Franchise' },
      orders: { port: 3000, url: 'http://localhost:3000/orders', name: 'Orders' },
      cart: { port: 3000, url: 'http://localhost:3000/cart', name: 'Cart' },
      wishlist: { port: 3000, url: 'http://localhost:3000/wishlist', name: 'Wishlist' },
      profile: { port: 3000, url: 'http://localhost:3000/profile', name: 'Profile' },
      settings: { port: 3000, url: 'http://localhost:3000/settings', name: 'Settings' },
      search: { port: 3000, url: 'http://localhost:3000/search', name: 'Search' },
      reviews: { port: 3000, url: 'http://localhost:3000/reviews', name: 'Reviews' },
      notifications: {
        port: 3000,
        url: 'http://localhost:3000/notifications',
        name: 'Notifications',
      },
      roadmap: { port: 3000, url: 'http://localhost:3000/roadmap', name: 'Roadmap' },
      development: { port: 3000, url: 'http://localhost:3000/development', name: 'Development' },
      developmentPortal: {
        port: 3000,
        url: 'http://localhost:3000/development-portal',
        name: 'Development Portal',
      },
      amAffiliate: { port: 3000, url: 'http://localhost:3000/am-affiliate', name: 'AM Affiliate' },
      assistant: { port: 3000, url: 'http://localhost:3000/assistant', name: 'Assistant' },
      auth: { port: 3000, url: 'http://localhost:3000/auth', name: 'Auth' },
      signup: { port: 3000, url: 'http://localhost:3000/signup', name: 'Signup' },
      register: { port: 3000, url: 'http://localhost:3000/register', name: 'Register' },
    };

    this.logFile = path.join(__dirname, '../logs/ehb-live-launcher.log');
    this.ensureLogDirectory();
    this.nextProcess = null;
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

  async killProcessOnPort(port) {
    return new Promise(resolve => {
      exec(`netstat -ano | findstr :${port}`, (error, stdout) => {
        if (stdout) {
          const lines = stdout.split('\n');
          lines.forEach(line => {
            const parts = line.trim().split(/\s+/);
            if (parts.length > 4) {
              const pid = parts[4];
              if (pid && pid !== '0') {
                exec(`taskkill /PID ${pid} /F`, err => {
                  if (!err) {
                    this.log(`Killed process ${pid} on port ${port}`);
                  }
                });
              }
            }
          });
        }
        resolve();
      });
    });
  }

  async openInBrowser(url, serviceName) {
    return new Promise(resolve => {
      exec(`start ${url}`, error => {
        if (error) {
          this.log(`❌ Failed to open ${serviceName}: ${error.message}`);
        } else {
          this.log(`✅ Opened ${serviceName}: ${url}`);
        }
        resolve();
      });
    });
  }

  async startNextJS() {
    this.log('🚀 Starting Next.js development server...');

    this.nextProcess = spawn('npm', ['run', 'dev'], {
      stdio: 'pipe',
      shell: true,
    });

    this.nextProcess.stdout.on('data', data => {
      const output = data.toString().trim();
      this.log(`[Next.js] ${output}`);

      // Check if server is ready
      if (
        output.includes('Ready') ||
        output.includes('started server') ||
        output.includes('Local:')
      ) {
        this.log('✅ Next.js server is ready!');
        this.openAllServices();
      }
    });

    this.nextProcess.stderr.on('data', data => {
      this.log(`[Next.js ERROR] ${data.toString().trim()}`);
    });

    this.nextProcess.on('close', code => {
      this.log(`Next.js process exited with code ${code}`);
    });

    return this.nextProcess;
  }

  async openAllServices() {
    this.log('🌐 Opening all EHB services in browser...');

    // Wait a bit for server to fully start
    await new Promise(resolve => setTimeout(resolve, 3000));

    let delay = 0;
    const delayIncrement = 500; // 500ms between each tab

    for (const [key, service] of Object.entries(this.services)) {
      setTimeout(async () => {
        await this.openInBrowser(service.url, service.name);
      }, delay);

      delay += delayIncrement;
    }

    this.log(`🎉 Opening ${Object.keys(this.services).length} services in browser...`);
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

  async cleanup() {
    this.log('🧹 Cleaning up existing processes...');
    await this.killProcessOnPort(3000);
  }

  async launch() {
    try {
      this.log('🎯 Starting EHB Live Launcher...');

      // Clean up existing processes
      await this.cleanup();

      // Start Next.js server
      await this.startNextJS();

      // Wait for server to start
      await new Promise(resolve => setTimeout(resolve, 15000));

      // Perform health check
      await this.healthCheck();

      this.log('🎉 EHB Live Launcher is running!');
      this.log('📊 All services are being opened in browser...');
      this.log('🛑 Press Ctrl+C to stop');

      // Keep monitoring
      setInterval(async () => {
        await this.healthCheck();
      }, 60000); // Check every minute

      // Handle shutdown
      process.on('SIGINT', () => {
        this.log('🛑 Shutting down EHB Live Launcher...');
        if (this.nextProcess) {
          this.nextProcess.kill('SIGTERM');
        }
        process.exit(0);
      });
    } catch (error) {
      this.log(`❌ EHB Live Launcher failed: ${error.message}`);
      process.exit(1);
    }
  }
}

// Start the EHB Live Launcher
const launcher = new EHBLiveLauncher();
launcher.launch();
