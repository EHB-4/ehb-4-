#!/usr/bin/env node

const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
};

// Configuration
const config = {
  port3000: 3000,
  port5500: 5500,
  projectPath: process.cwd(),
  logFile: path.join(process.cwd(), 'logs', 'auto-start.log'),
};

// Ensure logs directory exists
if (!fs.existsSync(path.dirname(config.logFile))) {
  fs.mkdirSync(path.dirname(config.logFile), { recursive: true });
}

// Logging function
function log(message, color = colors.reset) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  console.log(`${color}${logMessage}${colors.reset}`);

  // Write to log file
  fs.appendFileSync(config.logFile, logMessage + '\n');
}

// Check if port is in use
function isPortInUse(port) {
  return new Promise(resolve => {
    const net = require('net');
    const server = net.createServer();

    server.listen(port, () => {
      server.once('close', () => {
        resolve(false);
      });
      server.close();
    });

    server.on('error', () => {
      resolve(true);
    });
  });
}

// Kill process on port
async function killProcessOnPort(port) {
  return new Promise(resolve => {
    exec(`netstat -ano | findstr :${port}`, (error, stdout) => {
      if (stdout) {
        const lines = stdout.split('\n');
        for (const line of lines) {
          const parts = line.trim().split(/\s+/);
          if (parts.length > 4) {
            const pid = parts[4];
            if (pid && pid !== '0') {
              exec(`taskkill /F /PID ${pid}`, () => {
                log(`Killed process ${pid} on port ${port}`, colors.yellow);
              });
            }
          }
        }
      }
      resolve();
    });
  });
}

// Start Next.js development server
function startNextJS(port) {
  return new Promise((resolve, reject) => {
    log(`Starting Next.js server on port ${port}...`, colors.blue);

    const env = { ...process.env, PORT: port.toString() };
    const child = spawn('npm', ['run', 'dev'], {
      cwd: config.projectPath,
      env,
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: true,
    });

    child.stdout.on('data', data => {
      const output = data.toString();
      log(`[Port ${port}] ${output.trim()}`, colors.green);

      // Check if server is ready
      if (output.includes('Ready') || output.includes('started server')) {
        log(`✅ Next.js server is ready on port ${port}!`, colors.green);
        resolve(child);
      }
    });

    child.stderr.on('data', data => {
      const output = data.toString();
      log(`[Port ${port}] ERROR: ${output.trim()}`, colors.red);
    });

    child.on('error', error => {
      log(`Failed to start server on port ${port}: ${error.message}`, colors.red);
      reject(error);
    });

    child.on('close', code => {
      log(`Server on port ${port} closed with code ${code}`, colors.yellow);
    });

    // Timeout after 30 seconds
    setTimeout(() => {
      if (!child.killed) {
        log(`✅ Server on port ${port} started successfully`, colors.green);
        resolve(child);
      }
    }, 30000);
  });
}

// Start static server on port 5500
function startStaticServer(port) {
  return new Promise((resolve, reject) => {
    log(`Starting static server on port ${port}...`, colors.blue);

    const child = spawn('npx', ['http-server', '.', '-p', port.toString(), '--cors'], {
      cwd: config.projectPath,
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: true,
    });

    child.stdout.on('data', data => {
      const output = data.toString();
      log(`[Port ${port}] ${output.trim()}`, colors.cyan);

      if (output.includes('Available on')) {
        log(`✅ Static server is ready on port ${port}!`, colors.green);
        resolve(child);
      }
    });

    child.stderr.on('data', data => {
      const output = data.toString();
      log(`[Port ${port}] ERROR: ${output.trim()}`, colors.red);
    });

    child.on('error', error => {
      log(`Failed to start static server on port ${port}: ${error.message}`, colors.red);
      reject(error);
    });

    child.on('close', code => {
      log(`Static server on port ${port} closed with code ${code}`, colors.yellow);
    });

    // Timeout after 10 seconds
    setTimeout(() => {
      if (!child.killed) {
        log(`✅ Static server on port ${port} started successfully`, colors.green);
        resolve(child);
      }
    }, 10000);
  });
}

// Main function
async function main() {
  try {
    log('🚀 Starting EHB Next.js Auto-Start Script...', colors.cyan);
    log(`Project path: ${config.projectPath}`, colors.blue);

    // Check if ports are in use and kill processes if needed
    const port3000InUse = await isPortInUse(config.port3000);
    const port5500InUse = await isPortInUse(config.port5500);

    if (port3000InUse) {
      log(`Port ${config.port3000} is in use, killing existing process...`, colors.yellow);
      await killProcessOnPort(config.port3000);
    }

    if (port5500InUse) {
      log(`Port ${config.port5500} is in use, killing existing process...`, colors.yellow);
      await killProcessOnPort(config.port5500);
    }

    // Wait a bit for ports to be freed
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Start servers
    const servers = [];

    try {
      const nextServer = await startNextJS(config.port3000);
      servers.push({ name: 'Next.js', process: nextServer, port: config.port3000 });
    } catch (error) {
      log(`Failed to start Next.js server: ${error.message}`, colors.red);
    }

    try {
      const staticServer = await startStaticServer(config.port5500);
      servers.push({ name: 'Static Server', process: staticServer, port: config.port5500 });
    } catch (error) {
      log(`Failed to start static server: ${error.message}`, colors.red);
    }

    log('🎉 All servers started successfully!', colors.green);
    log(`📱 Next.js: http://localhost:${config.port3000}`, colors.cyan);
    log(`📁 Static: http://localhost:${config.port5500}`, colors.cyan);
    log('Press Ctrl+C to stop all servers', colors.yellow);

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      log('\n🛑 Shutting down servers...', colors.yellow);
      servers.forEach(server => {
        if (server.process && !server.process.killed) {
          server.process.kill('SIGTERM');
          log(`Stopped ${server.name} on port ${server.port}`, colors.yellow);
        }
      });
      process.exit(0);
    });

    // Keep the script running
    process.on('exit', () => {
      log('Auto-start script terminated', colors.red);
    });
  } catch (error) {
    log(`❌ Error in auto-start script: ${error.message}`, colors.red);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { main, config };
