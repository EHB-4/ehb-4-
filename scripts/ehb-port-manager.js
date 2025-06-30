#!/usr/bin/env node

/**
 * EHB Port Manager
 * Manages all EHB services across different ports
 *
 * Port Allocation:
 * - 3000: EHB Home (Main Frontend)
 * - 8000: Backend API
 * - 8080: Development Portal
 * - 5000: Admin Panel
 */

const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT_CONFIG = {
  home: { port: 3000, name: 'EHB Home', script: 'dev:home' },
  backend: { port: 8000, name: 'EHB Backend', script: 'dev:backend' },
  portal: { port: 8080, name: 'Development Portal', script: 'dev:portal' },
  admin: { port: 5000, name: 'Admin Panel', script: 'dev:admin' },
};

const LOG_FILE = path.join(__dirname, '../logs/port-manager.log');

// Ensure logs directory exists
if (!fs.existsSync(path.dirname(LOG_FILE))) {
  fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
}

function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  console.log(logMessage.trim());
  fs.appendFileSync(LOG_FILE, logMessage);
}

function checkPort(port) {
  return new Promise(resolve => {
    const netstat = spawn('netstat', ['-ano']);
    let output = '';

    netstat.stdout.on('data', data => {
      output += data.toString();
    });

    netstat.on('close', () => {
      const lines = output.split('\n');
      const isInUse = lines.some(line => line.includes(`:${port}`) && line.includes('LISTENING'));
      resolve(isInUse);
    });
  });
}

function killProcessOnPort(port) {
  return new Promise(resolve => {
    exec(`netstat -ano | findstr :${port}`, (error, stdout) => {
      if (stdout) {
        const lines = stdout.split('\n');
        lines.forEach(line => {
          const parts = line.trim().split(/\s+/);
          if (parts.length > 4 && parts[1].includes(`:${port}`)) {
            const pid = parts[4];
            exec(`taskkill /F /PID ${pid}`, err => {
              if (!err) {
                log(`Killed process ${pid} on port ${port}`);
              }
            });
          }
        });
      }
      resolve();
    });
  });
}

function startService(serviceName) {
  const config = PORT_CONFIG[serviceName];
  if (!config) {
    log(`Unknown service: ${serviceName}`);
    return;
  }

  log(`Starting ${config.name} on port ${config.port}...`);

  const child = spawn('npm', ['run', config.script], {
    stdio: 'pipe',
    shell: true,
  });

  child.stdout.on('data', data => {
    log(`[${config.name}] ${data.toString().trim()}`);
  });

  child.stderr.on('data', data => {
    log(`[${config.name}] ERROR: ${data.toString().trim()}`);
  });

  child.on('close', code => {
    log(`${config.name} process exited with code ${code}`);
  });

  return child;
}

function startAll() {
  log('Starting all EHB services...');

  Object.keys(PORT_CONFIG).forEach(serviceName => {
    setTimeout(() => {
      startService(serviceName);
    }, 1000 * Object.keys(PORT_CONFIG).indexOf(serviceName));
  });

  log('All services started. Opening browsers...');

  setTimeout(() => {
    exec('npm run open:home');
    setTimeout(() => exec('npm run open:backend'), 1000);
    setTimeout(() => exec('npm run open:portal'), 2000);
    setTimeout(() => exec('npm run open:admin'), 3000);
  }, 5000);
}

function stopAll() {
  log('Stopping all EHB services...');

  Object.values(PORT_CONFIG).forEach(config => {
    killProcessOnPort(config.port);
  });

  log('All services stopped.');
}

function status() {
  log('Checking EHB services status...');

  Object.entries(PORT_CONFIG).forEach(([name, config]) => {
    checkPort(config.port).then(isInUse => {
      const status = isInUse ? '🟢 RUNNING' : '🔴 STOPPED';
      log(`${config.name} (Port ${config.port}): ${status}`);
    });
  });
}

function monitor() {
  log('Starting EHB services monitor...');

  setInterval(() => {
    console.clear();
    log('=== EHB Services Monitor ===');

    Object.entries(PORT_CONFIG).forEach(([name, config]) => {
      checkPort(config.port).then(isInUse => {
        const status = isInUse ? '🟢 RUNNING' : '🔴 STOPPED';
        console.log(`${config.name} (Port ${config.port}): ${status}`);
      });
    });
  }, 2000);
}

function restart() {
  log('Restarting all EHB services...');
  stopAll();
  setTimeout(startAll, 2000);
}

// Command line interface
const command = process.argv[2];

switch (command) {
  case 'start':
    startAll();
    break;
  case 'stop':
    stopAll();
    break;
  case 'status':
    status();
    break;
  case 'restart':
    restart();
    break;
  case 'monitor':
    monitor();
    break;
  default:
    console.log(`
EHB Port Manager

Usage: node scripts/ehb-port-manager.js <command>

Commands:
  start     - Start all EHB services
  stop      - Stop all EHB services
  status    - Check status of all services
  restart   - Restart all services
  monitor   - Monitor services in real-time

Port Allocation:
  - 3000: EHB Home (Main Frontend)
  - 8000: Backend API
  - 8080: Development Portal
  - 5000: Admin Panel
    `);
}
