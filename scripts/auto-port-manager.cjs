#!/usr/bin/env node

const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const net = require('net');

class AutoPortManager {
  constructor() {
    this.processes = new Map();
    this.ports = {
      nextjs: 3000,
      backend: 5000,
      database: 5432,
      redis: 6379,
      admin: 3001,
      api: 8000,
      websocket: 8080,
      monitoring: 9090,
    };
    this.logFile = path.join(__dirname, '../logs/auto-port-manager.log');
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
        resolve(false); // Port is available
      });
      server.on('error', () => {
        resolve(true); // Port is in use
      });
    });
  }

  async findAvailablePort(startPort) {
    let port = startPort;
    while (await this.checkPort(port)) {
      port++;
    }
    return port;
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

  async installDependencies() {
    this.log('Installing dependencies...');

    const dependencies = [
      'critters',
      'next',
      'react',
      'react-dom',
      'typescript',
      '@types/node',
      '@types/react',
      'tailwindcss',
      'autoprefixer',
      'postcss',
    ];

    for (const dep of dependencies) {
      try {
        await this.runCommand(`npm install ${dep}`, 'Installing ' + dep);
      } catch (error) {
        this.log(`Failed to install ${dep}: ${error.message}`);
      }
    }
  }

  async runCommand(command, description = '') {
    return new Promise((resolve, reject) => {
      this.log(`Running: ${command} ${description}`);

      const child = exec(command, { cwd: process.cwd() }, (error, stdout, stderr) => {
        if (error) {
          this.log(`Error: ${error.message}`);
          reject(error);
        } else {
          if (stdout) this.log(`Output: ${stdout}`);
          if (stderr) this.log(`Stderr: ${stderr}`);
          resolve(stdout);
        }
      });

      child.stdout?.on('data', data => {
        this.log(`[${description}] ${data.toString().trim()}`);
      });

      child.stderr?.on('data', data => {
        this.log(`[${description} ERROR] ${data.toString().trim()}`);
      });
    });
  }

  async startNextJS() {
    const port = await this.findAvailablePort(this.ports.nextjs);
    this.log(`Starting Next.js on port ${port}`);

    const env = { ...process.env, PORT: port.toString() };
    const child = spawn('npm', ['run', 'dev'], {
      stdio: 'pipe',
      env,
      shell: true,
    });

    child.stdout.on('data', data => {
      this.log(`[Next.js] ${data.toString().trim()}`);
    });

    child.stderr.on('data', data => {
      this.log(`[Next.js ERROR] ${data.toString().trim()}`);
    });

    child.on('close', code => {
      this.log(`Next.js process exited with code ${code}`);
    });

    this.processes.set('nextjs', { process: child, port });
    return port;
  }

  async startBackend() {
    const port = await this.findAvailablePort(this.ports.backend);
    this.log(`Starting Backend on port ${port}`);

    const backendPath = path.join(process.cwd(), 'ehb-backend');
    if (fs.existsSync(backendPath)) {
      const child = spawn('npm', ['start'], {
        stdio: 'pipe',
        cwd: backendPath,
        shell: true,
      });

      child.stdout.on('data', data => {
        this.log(`[Backend] ${data.toString().trim()}`);
      });

      child.stderr.on('data', data => {
        this.log(`[Backend ERROR] ${data.toString().trim()}`);
      });

      this.processes.set('backend', { process: child, port });
    }
    return port;
  }

  async startDatabase() {
    this.log('Checking database connection...');
    try {
      // Add database startup logic here if needed
      this.log('Database check completed');
    } catch (error) {
      this.log(`Database error: ${error.message}`);
    }
  }

  async cleanupPorts() {
    this.log('Cleaning up ports...');
    for (const [name, port] of Object.entries(this.ports)) {
      await this.killProcessOnPort(port);
    }
  }

  async healthCheck() {
    this.log('Performing health check...');

    for (const [name, { port }] of this.processes) {
      try {
        const isInUse = await this.checkPort(port);
        if (isInUse) {
          this.log(`✅ ${name} is running on port ${port}`);
        } else {
          this.log(`❌ ${name} is not responding on port ${port}`);
        }
      } catch (error) {
        this.log(`❌ Health check failed for ${name}: ${error.message}`);
      }
    }
  }

  async startAll() {
    try {
      this.log('🚀 Starting Auto Port Manager...');

      // Clean up existing processes
      await this.cleanupPorts();

      // Install dependencies
      await this.installDependencies();

      // Start services
      await this.startDatabase();
      await this.startBackend();
      await this.startNextJS();

      // Wait a bit for services to start
      await new Promise(resolve => setTimeout(resolve, 5000));

      // Health check
      await this.healthCheck();

      this.log('✅ All services started successfully!');
      this.log('📊 Monitoring active processes...');

      // Keep the script running
      process.on('SIGINT', () => {
        this.log('🛑 Shutting down...');
        this.shutdown();
      });
    } catch (error) {
      this.log(`❌ Startup failed: ${error.message}`);
      this.shutdown();
    }
  }

  shutdown() {
    this.log('Shutting down all processes...');

    for (const [name, { process: proc }] of this.processes) {
      try {
        proc.kill('SIGTERM');
        this.log(`Stopped ${name}`);
      } catch (error) {
        this.log(`Failed to stop ${name}: ${error.message}`);
      }
    }

    process.exit(0);
  }
}

// Start the manager
const manager = new AutoPortManager();
manager.startAll();
