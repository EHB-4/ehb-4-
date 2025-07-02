const { exec, spawn } = require('child_process');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const execAsync = promisify(exec);

class BrowserConsoleFix {
  constructor() {
    this.projectRoot = process.cwd();
  }

  log(message) {
    console.log(`[BrowserConsoleFix] ${message}`);
  }

  async clearPorts() {
    this.log('🔧 Clearing common development ports...');

    const ports = [3000, 3001, 3002, 5500, 8000, 8080];

    for (const port of ports) {
      try {
        await execAsync(`npx kill-port ${port}`);
        this.log(`✅ Cleared port ${port}`);
      } catch (error) {
        this.log(`ℹ️ Port ${port} was not in use`);
      }
    }
  }

  async clearNextCache() {
    this.log('🧹 Clearing Next.js cache...');

    try {
      await execAsync('rm -rf .next');
      this.log('✅ Next.js cache cleared');
    } catch (error) {
      this.log('ℹ️ No Next.js cache to clear');
    }
  }

  async clearNodeModules() {
    this.log('🗑️ Clearing node_modules cache...');

    try {
      await execAsync('npm cache clean --force');
      this.log('✅ npm cache cleared');
    } catch (error) {
      this.log('⚠️ Could not clear npm cache');
    }
  }

  async installDependencies() {
    this.log('📦 Installing dependencies...');

    try {
      await execAsync('npm install');
      this.log('✅ Dependencies installed');
    } catch (error) {
      this.log('❌ Failed to install dependencies');
      throw error;
    }
  }

  async generatePrismaClient() {
    this.log('🔧 Generating Prisma client...');

    try {
      await execAsync('npx prisma generate');
      this.log('✅ Prisma client generated');
    } catch (error) {
      this.log('⚠️ Could not generate Prisma client');
    }
  }

  async startServer() {
    this.log('🚀 Starting development server...');

    try {
      const serverProcess = spawn('npm', ['run', 'port-fix'], {
        cwd: this.projectRoot,
        stdio: 'inherit',
        shell: true,
        env: {
          ...process.env,
          NODE_ENV: 'development',
          NEXT_TELEMETRY_DISABLED: '1',
        },
      });

      serverProcess.on('error', error => {
        this.log(`❌ Server error: ${error.message}`);
      });

      serverProcess.on('close', code => {
        this.log(`⚠️ Server closed with code ${code}`);
      });

      return serverProcess;
    } catch (error) {
      this.log(`❌ Failed to start server: ${error.message}`);
      throw error;
    }
  }

  async fixAll() {
    this.log('🔧 Starting comprehensive browser console fix...');

    try {
      // Step 1: Clear all caches and ports
      await this.clearPorts();
      await this.clearNextCache();
      await this.clearNodeModules();

      // Step 2: Reinstall dependencies
      await this.installDependencies();

      // Step 3: Generate Prisma client
      await this.generatePrismaClient();

      // Step 4: Start server
      await this.startServer();

      this.log('✅ Browser console fix completed successfully!');
      this.log('🌐 Server should now be running without console errors');
    } catch (error) {
      this.log(`❌ Fix failed: ${error.message}`);
      this.log('💡 Try running the steps manually:');
      this.log('   1. npm run port-fix:all');
      this.log('   2. npm install');
      this.log('   3. npm run port-fix');
    }
  }
}

// Run the script
if (require.main === module) {
  const fix = new BrowserConsoleFix();

  const args = process.argv.slice(2);

  if (args.includes('--all')) {
    fix.fixAll();
  } else {
    fix.startServer();
  }
}

module.exports = BrowserConsoleFix;
