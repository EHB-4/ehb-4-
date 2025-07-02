const { exec, spawn } = require('child_process');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const execAsync = promisify(exec);

class PortFix {
  constructor() {
    this.projectRoot = process.cwd();
    this.ports = [3000, 5500, 3001, 3002];
    this.currentPort = null;
  }

  log(message) {
    console.log(`[PortFix] ${message}`);
  }

  async checkPort(port) {
    try {
      const { stdout } = await execAsync(`netstat -ano | findstr :${port}`);
      return stdout.trim().length > 0;
    } catch (error) {
      return false;
    }
  }

  async killPort(port) {
    try {
      await execAsync(`npx kill-port ${port}`);
      this.log(`✅ Port ${port} cleared`);
      return true;
    } catch (error) {
      this.log(`ℹ️ Port ${port} was not in use`);
      return false;
    }
  }

  async findAvailablePort() {
    for (const port of this.ports) {
      const isInUse = await this.checkPort(port);
      if (!isInUse) {
        this.currentPort = port;
        this.log(`✅ Found available port: ${port}`);
        return port;
      }
    }

    // If all ports are busy, try to kill port 3000 and use it
    await this.killPort(3000);
    this.currentPort = 3000;
    this.log(`✅ Using port 3000 after clearing`);
    return 3000;
  }

  async startServer() {
    this.log('🔧 Fixing port issues and starting server...');

    try {
      // Find available port
      const port = await this.findAvailablePort();

      // Set environment variables
      process.env.PORT = port.toString();
      process.env.NODE_ENV = 'development';
      process.env.NEXT_TELEMETRY_DISABLED = '1';

      this.log(`🚀 Starting Next.js server on port ${port}...`);

      // Start the server
      const serverProcess = spawn('npm', ['run', `dev:${port}`], {
        cwd: this.projectRoot,
        stdio: 'inherit',
        shell: true,
        env: {
          ...process.env,
          PORT: port.toString(),
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

      // Handle process termination
      process.on('SIGINT', async () => {
        this.log('🛑 Shutting down...');
        serverProcess.kill();
        await this.killPort(port);
        process.exit(0);
      });

      return serverProcess;
    } catch (error) {
      this.log(`❌ Failed to start server: ${error.message}`);
      throw error;
    }
  }

  async fixAllPorts() {
    this.log('🔧 Fixing all port conflicts...');

    for (const port of this.ports) {
      await this.killPort(port);
    }

    this.log('✅ All ports cleared');
  }
}

// Run the script
if (require.main === module) {
  const portFix = new PortFix();

  const args = process.argv.slice(2);

  if (args.includes('--fix-all')) {
    portFix.fixAllPorts();
  } else {
    portFix.startServer();
  }
}

module.exports = PortFix;
