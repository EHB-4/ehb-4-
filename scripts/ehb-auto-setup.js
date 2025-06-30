#!/usr/bin/env node

/**
 * EHB Auto Setup Script
 * Automatically configures complete EHB port structure and management system
 */

const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

class EHBAutoSetup {
  constructor() {
    this.projectRoot = path.join(__dirname, '..');
    this.configPath = path.join(this.projectRoot, 'config/ehb-port-structure.json');
    this.logFile = path.join(this.projectRoot, 'logs/ehb-auto-setup.log');
    this.ensureLogDirectory();
  }

  ensureLogDirectory() {
    const logDir = path.dirname(this.logFile);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  log(message, type = 'INFO') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${type}] ${message}`;
    console.log(logMessage);

    fs.appendFileSync(this.logFile, logMessage + '\n');
  }

  async runCommand(command, description) {
    return new Promise((resolve, reject) => {
      this.log(`🔄 ${description}...`);

      exec(command, { cwd: this.projectRoot }, (error, stdout, stderr) => {
        if (error) {
          this.log(`❌ ${description} failed: ${error.message}`, 'ERROR');
          reject(error);
        } else {
          this.log(`✅ ${description} completed successfully`);
          resolve(stdout);
        }
      });
    });
  }

  async checkDependencies() {
    this.log('🔍 Checking dependencies...');

    const dependencies = [
      { name: 'Node.js', command: 'node --version' },
      { name: 'npm', command: 'npm --version' },
      { name: 'Next.js', command: 'npm list next' },
    ];

    for (const dep of dependencies) {
      try {
        await this.runCommand(dep.command, `Checking ${dep.name}`);
      } catch (error) {
        this.log(`⚠️ ${dep.name} not found or not working properly`, 'WARN');
      }
    }
  }

  async installDependencies() {
    this.log('📦 Installing dependencies...');

    try {
      await this.runCommand('npm install', 'Installing npm packages');
      this.log('✅ Dependencies installed successfully');
    } catch (error) {
      this.log('❌ Failed to install dependencies', 'ERROR');
      throw error;
    }
  }

  async setupPortStructure() {
    this.log('🏗️ Setting up port structure...');

    // Check if port structure config exists
    if (!fs.existsSync(this.configPath)) {
      this.log('❌ Port structure configuration not found', 'ERROR');
      return;
    }

    this.log('✅ Port structure configuration found');

    // Validate configuration
    try {
      const config = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
      this.log(
        `✅ Found ${Object.keys(config.mainApplication.ports).length} main application ports`
      );
      this.log(`✅ Found ${Object.keys(config.serviceModules.ports).length} service module ports`);
      this.log(
        `✅ Found ${Object.keys(config.supportServices.ports).length} support service ports`
      );
    } catch (error) {
      this.log('❌ Invalid port structure configuration', 'ERROR');
      throw error;
    }
  }

  async setupDevelopmentEnvironment() {
    this.log('🛠️ Setting up development environment...');

    // Create necessary directories
    const directories = ['logs', 'temp', 'backups', 'reports'];

    for (const dir of directories) {
      const dirPath = path.join(this.projectRoot, dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        this.log(`✅ Created directory: ${dir}`);
      }
    }

    // Setup environment variables
    const envFile = path.join(this.projectRoot, '.env.local');
    const envContent = `
# EHB Development Environment
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
PORT=3001
ADMIN_PORT=3002
DEV_PORTAL_PORT=3003
ANALYTICS_PORT=3004
AI_MARKETPLACE_PORT=3005

# Auto Management
AUTO_LAUNCH=true
AUTO_RESTART=true
AUTO_MONITOR=true

# Development Features
HOT_RELOAD=true
FAST_REFRESH=true
SWC_MINIFY=true
    `.trim();

    fs.writeFileSync(envFile, envContent);
    this.log('✅ Environment variables configured');
  }

  async setupAutoLaunch() {
    this.log('🚀 Setting up auto-launch system...');

    // Create PowerShell auto-launch script
    const psScript = path.join(this.projectRoot, 'scripts/auto-launch.ps1');
    const psContent = `
# EHB Auto Launch Script
param(
    [string]$Mode = "all"
)

$DevPort = 3001
$AdminPort = 3002
$DevPortalPort = 3003
$AnalyticsPort = 3004
$AIMarketplacePort = 3005

function Launch-Browser {
    param([string]$Url, [string]$Service)
    try {
        Start-Process $Url
        Write-Host "✅ Launched browser for $Service at $Url" -ForegroundColor Green
    } catch {
        Write-Host "❌ Failed to launch browser for $Service" -ForegroundColor Red
    }
}

function Start-Service {
    param([string]$Port, [string]$Service)
    try {
        $env:PORT = $Port
        Start-Process "npm" -ArgumentList "run", "dev" -NoNewWindow
        Start-Sleep -Seconds 3
        Launch-Browser "http://localhost:$Port" $Service
    } catch {
        Write-Host "❌ Failed to start $Service" -ForegroundColor Red
    }
}

switch ($Mode) {
    "main" {
        Start-Service $DevPort "EHB Main App"
    }
    "admin" {
        Start-Service $AdminPort "EHB Admin Panel"
    }
    "portal" {
        Start-Service $DevPortalPort "EHB Development Portal"
    }
    "analytics" {
        Start-Service $AnalyticsPort "EHB Analytics"
    }
    "ai-marketplace" {
        Start-Service $AIMarketplacePort "EHB AI Marketplace"
    }
    "all" {
        Start-Service $DevPort "EHB Main App"
        Start-Sleep -Seconds 2
        Start-Service $AdminPort "EHB Admin Panel"
        Start-Sleep -Seconds 2
        Start-Service $DevPortalPort "EHB Development Portal"
        Start-Sleep -Seconds 2
        Start-Service $AnalyticsPort "EHB Analytics"
        Start-Sleep -Seconds 2
        Start-Service $AIMarketplacePort "EHB AI Marketplace"
    }
    default {
        Write-Host "Usage: .\\auto-launch.ps1 [main|admin|portal|analytics|ai-marketplace|all]" -ForegroundColor Yellow
    }
}
    `.trim();

    fs.writeFileSync(psScript, psContent);
    this.log('✅ Auto-launch PowerShell script created');
  }

  async setupMonitoring() {
    this.log('📊 Setting up monitoring system...');

    // Create monitoring script
    const monitorScript = path.join(this.projectRoot, 'scripts/ehb-auto-monitor.js');
    const monitorContent = `
#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

class EHBAutoMonitor {
  constructor() {
    this.logFile = path.join(__dirname, '../logs/ehb-monitor.log');
    this.ports = [3001, 3002, 3003, 3004, 3005];
    this.isMonitoring = false;
  }

  log(message) {
    const timestamp = new Date().toISOString();
    console.log(\`[\${timestamp}] \${message}\`);
  }

  async checkPort(port) {
    return new Promise((resolve) => {
      exec(\`netstat -ano | findstr :\${port}\`, (error, stdout) => {
        resolve(!error && stdout.trim() !== '');
      });
    });
  }

  async monitorPorts() {
    this.log('🔍 Checking port status...');
    
    for (const port of this.ports) {
      const isActive = await this.checkPort(port);
      const status = isActive ? '✅ Active' : '❌ Inactive';
      this.log(\`Port \${port}: \${status}\`);
    }
  }

  start() {
    this.isMonitoring = true;
    this.log('🚀 Starting EHB Auto Monitor...');
    
    setInterval(() => {
      if (this.isMonitoring) {
        this.monitorPorts();
      }
    }, 30000); // Check every 30 seconds
  }

  stop() {
    this.isMonitoring = false;
    this.log('🛑 Stopping EHB Auto Monitor...');
  }
}

const monitor = new EHBAutoMonitor();
monitor.start();

process.on('SIGINT', () => {
  monitor.stop();
  process.exit(0);
});
    `.trim();

    fs.writeFileSync(monitorScript, monitorContent);
    this.log('✅ Monitoring script created');
  }

  async testSetup() {
    this.log('🧪 Testing setup...');

    try {
      // Test port manager
      await this.runCommand('node scripts/ehb-port-manager.js status', 'Testing port manager');

      // Test configuration
      const config = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
      this.log(`✅ Configuration test passed: ${config.projectName} v${config.version}`);

      this.log('✅ All tests passed successfully');
    } catch (error) {
      this.log('❌ Some tests failed', 'ERROR');
      throw error;
    }
  }

  async showSummary() {
    this.log('\n🎉 EHB Auto Setup Complete!');
    this.log('============================');

    this.log('\n📋 Setup Summary:');
    this.log('✅ Dependencies checked and installed');
    this.log('✅ Port structure configured');
    this.log('✅ Development environment setup');
    this.log('✅ Auto-launch system configured');
    this.log('✅ Monitoring system setup');
    this.log('✅ All tests passed');

    this.log('\n🚀 Quick Start Commands:');
    this.log('npm run ehb:start     - Start all services');
    this.log('npm run ehb:status    - Check service status');
    this.log('npm run ehb:stop      - Stop all services');
    this.log('npm run auto:launch   - Auto-launch with browsers');
    this.log('npm run auto:monitor  - Start monitoring');

    this.log('\n🌐 Access URLs:');
    this.log('Main App:        http://localhost:3001');
    this.log('Admin Panel:     http://localhost:3002');
    this.log('Dev Portal:      http://localhost:3003');
    this.log('Analytics:       http://localhost:3004');
    this.log('AI Marketplace:  http://localhost:3005');

    this.log('\n📖 Documentation:');
    this.log('Port Guide:      docs/ehb-port-structure-guide.md');
    this.log('API Docs:        docs/api-documentation.md');
    this.log('Dev Guide:       docs/development-guide.md');

    this.log('\n🎯 Next Steps:');
    this.log('1. Run: npm run ehb:start');
    this.log('2. Access: http://localhost:3001');
    this.log('3. Check: http://localhost:3003 (Development Portal)');
    this.log('4. Monitor: npm run auto:monitor');
  }

  async run() {
    try {
      this.log('🚀 Starting EHB Auto Setup...');

      await this.checkDependencies();
      await this.installDependencies();
      await this.setupPortStructure();
      await this.setupDevelopmentEnvironment();
      await this.setupAutoLaunch();
      await this.setupMonitoring();
      await this.testSetup();
      await this.showSummary();

      this.log('🎉 EHB Auto Setup completed successfully!');
    } catch (error) {
      this.log(`❌ EHB Auto Setup failed: ${error.message}`, 'ERROR');
      process.exit(1);
    }
  }
}

// Run auto setup
if (require.main === module) {
  const setup = new EHBAutoSetup();
  setup.run();
}

module.exports = EHBAutoSetup;
