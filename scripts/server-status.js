#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

class ServerStatus {
  constructor() {
    this.port = 3000;
    this.alternatePorts = [3001, 3002, 3003, 3004, 3005];
  }

  // Check if server is running
  async checkServerStatus() {
    console.log('🔍 Checking server status...');
    console.log('');

    // Check for Node processes
    const nodeProcesses = await this.getNodeProcesses();

    // Check for Next.js processes
    const nextProcesses = await this.getNextProcesses();

    // Check port availability
    const portStatus = await this.checkPorts();

    // Display status
    this.displayStatus(nodeProcesses, nextProcesses, portStatus);
  }

  // Get Node processes
  async getNodeProcesses() {
    return new Promise(resolve => {
      exec('tasklist /FI "IMAGENAME eq node.exe"', (error, stdout) => {
        if (error) {
          resolve([]);
        } else {
          const lines = stdout.split('\n').filter(line => line.includes('node.exe'));
          resolve(lines);
        }
      });
    });
  }

  // Get Next.js processes
  async getNextProcesses() {
    return new Promise(resolve => {
      exec('tasklist /FI "WINDOWTITLE eq *next*"', (error, stdout) => {
        if (error) {
          resolve([]);
        } else {
          const lines = stdout.split('\n').filter(line => line.includes('node.exe'));
          resolve(lines);
        }
      });
    });
  }

  // Check port availability
  async checkPorts() {
    const ports = [this.port, ...this.alternatePorts];
    const results = [];

    for (const port of ports) {
      const isAvailable = await this.checkPort(port);
      results.push({ port, isAvailable });
    }

    return results;
  }

  // Check specific port
  async checkPort(port) {
    return new Promise(resolve => {
      exec(`netstat -an | findstr :${port}`, (error, stdout) => {
        if (error || !stdout) {
          resolve(true); // Port is available
        } else {
          resolve(false); // Port is in use
        }
      });
    });
  }

  // Display status
  displayStatus(nodeProcesses, nextProcesses, portStatus) {
    console.log('📊 Server Status Report');
    console.log('========================');
    console.log('');

    // Node processes
    console.log('🖥️  Node.js Processes:');
    if (nodeProcesses.length > 0) {
      nodeProcesses.forEach(process => {
        console.log(`   ✅ ${process.trim()}`);
      });
    } else {
      console.log('   ❌ No Node.js processes running');
    }
    console.log('');

    // Next.js processes
    console.log('⚡ Next.js Processes:');
    if (nextProcesses.length > 0) {
      nextProcesses.forEach(process => {
        console.log(`   ✅ ${process.trim()}`);
      });
    } else {
      console.log('   ❌ No Next.js processes running');
    }
    console.log('');

    // Port status
    console.log('🌐 Port Status:');
    portStatus.forEach(({ port, isAvailable }) => {
      const status = isAvailable ? '🟢 Available' : '🔴 In Use';
      console.log(`   Port ${port}: ${status}`);
    });
    console.log('');

    // Overall status
    const hasNodeProcesses = nodeProcesses.length > 0;
    const hasNextProcesses = nextProcesses.length > 0;
    const hasAvailablePort = portStatus.some(p => p.isAvailable);

    console.log('📈 Overall Status:');
    if (hasNodeProcesses && hasNextProcesses && hasAvailablePort) {
      console.log('   🟢 Server is running properly');
      console.log('   🌐 Server is accessible');
      console.log('   🔄 Auto-restart is active');
    } else if (hasNodeProcesses && !hasNextProcesses) {
      console.log('   🟡 Node.js is running but Next.js may have crashed');
      console.log('   🔄 Auto-restart should kick in soon');
    } else if (!hasNodeProcesses) {
      console.log('   🔴 No server is running');
      console.log('   🚀 Start with: npm run server:start');
    }
    console.log('');

    // Recommendations
    console.log('💡 Recommendations:');
    if (!hasNodeProcesses) {
      console.log('   🚀 Start the server: npm run server:start');
    } else if (!hasNextProcesses) {
      console.log('   🔄 Wait for auto-restart or restart manually');
    } else {
      console.log('   ✅ Server is running optimally');
      console.log('   🌐 Access at: http://localhost:3000');
    }
    console.log('');
  }

  // Start server if not running
  async startServerIfNeeded() {
    const nodeProcesses = await this.getNodeProcesses();

    if (nodeProcesses.length === 0) {
      console.log('🚀 No server running, starting permanent server...');
      console.log('');

      const { spawn } = require('child_process');
      const serverProcess = spawn('npm', ['run', 'server:start'], {
        stdio: 'inherit',
        shell: true,
      });

      serverProcess.on('error', error => {
        console.error('❌ Failed to start server:', error);
      });
    } else {
      console.log('✅ Server is already running');
    }
  }

  // Stop server
  async stopServer() {
    console.log('🛑 Stopping server...');

    return new Promise(resolve => {
      exec('taskkill /F /IM node.exe', error => {
        if (error) {
          console.log('❌ Failed to stop server:', error.message);
        } else {
          console.log('✅ Server stopped successfully');
        }
        resolve();
      });
    });
  }
}

// Handle command line arguments
const args = process.argv.slice(2);
const serverStatus = new ServerStatus();

switch (args[0]) {
  case 'check':
  case 'status':
    serverStatus.checkServerStatus();
    break;
  case 'start':
    serverStatus.startServerIfNeeded();
    break;
  case 'stop':
    serverStatus.stopServer();
    break;
  default:
    console.log('🔍 Server Status Checker');
    console.log('========================');
    console.log('');
    console.log('Usage:');
    console.log('  node scripts/server-status.js check   - Check server status');
    console.log('  node scripts/server-status.js start   - Start server if needed');
    console.log('  node scripts/server-status.js stop    - Stop server');
    console.log('');
    serverStatus.checkServerStatus();
}
