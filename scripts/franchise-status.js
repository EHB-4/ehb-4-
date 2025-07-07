#!/usr/bin/env node

/**
 * EHB Franchise Status Script
 * Check status of franchise auto system and processes
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

class FranchiseStatus {
  constructor() {
    this.pidFile = './temp/franchise-launcher.pid';
    this.logFile = './logs/franchise-launcher.log';
    this.managerLogFile = './logs/franchise-manager.log';
    this.scannerLogFile = './logs/franchise-scanner.log';
  }

  /**
   * Get comprehensive status
   */
  async getStatus() {
    console.log('📊 EHB Franchise Auto System Status Report');
    console.log('='.repeat(50));

    try {
      // Check processes
      const processStatus = await this.checkProcesses();

      // Check logs
      const logStatus = await this.checkLogs();

      // Check files
      const fileStatus = await this.checkFiles();

      // Check API endpoints
      const apiStatus = await this.checkAPI();

      // Display status
      this.displayStatus(processStatus, logStatus, fileStatus, apiStatus);
    } catch (error) {
      console.error('❌ Error getting status:', error.message);
    }
  }

  /**
   * Check running processes
   */
  async checkProcesses() {
    const status = {
      launcher: false,
      manager: false,
      scanner: false,
      processes: [],
    };

    // Check launcher
    if (fs.existsSync(this.pidFile)) {
      try {
        const pid = fs.readFileSync(this.pidFile, 'utf8').trim();
        status.launcher = this.isProcessRunning(parseInt(pid));
        if (status.launcher) {
          status.processes.push({ name: 'Launcher', pid: parseInt(pid) });
        }
      } catch (error) {
        status.launcher = false;
      }
    }

    // Check manager
    const managerPid = await this.findProcessByScript('franchise-auto-manager.js');
    status.manager = managerPid !== null;
    if (managerPid) {
      status.processes.push({ name: 'Manager', pid: managerPid });
    }

    // Check scanner
    const scannerPid = await this.findProcessByScript('franchise-auto-scanner.js');
    status.scanner = scannerPid !== null;
    if (scannerPid) {
      status.processes.push({ name: 'Scanner', pid: scannerPid });
    }

    return status;
  }

  /**
   * Check log files
   */
  async checkLogs() {
    const status = {
      launcher: { exists: false, size: 0, lastModified: null },
      manager: { exists: false, size: 0, lastModified: null },
      scanner: { exists: false, size: 0, lastModified: null },
    };

    // Check launcher log
    if (fs.existsSync(this.logFile)) {
      const stats = fs.statSync(this.logFile);
      status.launcher = {
        exists: true,
        size: stats.size,
        lastModified: stats.mtime,
      };
    }

    // Check manager log
    if (fs.existsSync(this.managerLogFile)) {
      const stats = fs.statSync(this.managerLogFile);
      status.manager = {
        exists: true,
        size: stats.size,
        lastModified: stats.mtime,
      };
    }

    // Check scanner log
    if (fs.existsSync(this.scannerLogFile)) {
      const stats = fs.statSync(this.scannerLogFile);
      status.scanner = {
        exists: true,
        size: stats.size,
        lastModified: stats.mtime,
      };
    }

    return status;
  }

  /**
   * Check important files
   */
  async checkFiles() {
    const files = [
      './scripts/franchise-auto-launcher.js',
      './scripts/franchise-auto-manager.js',
      './scripts/franchise-auto-scanner.js',
      './temp/franchise-scan/scan-data.json',
      './reports/franchise',
    ];

    const status = {};

    for (const file of files) {
      if (fs.existsSync(file)) {
        const stats = fs.statSync(file);
        status[file] = {
          exists: true,
          size: stats.size,
          lastModified: stats.mtime,
          isDirectory: stats.isDirectory(),
        };
      } else {
        status[file] = { exists: false };
      }
    }

    return status;
  }

  /**
   * Check API endpoints
   */
  async checkAPI() {
    const endpoints = ['http://localhost:3001/health', 'http://localhost:3001/status'];

    const status = {};

    for (const endpoint of endpoints) {
      try {
        const response = await this.makeRequest(endpoint);
        status[endpoint] = {
          available: true,
          status: response.status,
          responseTime: response.responseTime,
        };
      } catch (error) {
        status[endpoint] = {
          available: false,
          error: error.message,
        };
      }
    }

    return status;
  }

  /**
   * Make HTTP request
   */
  async makeRequest(url) {
    return new Promise((resolve, reject) => {
      const http = require('http');
      const https = require('https');

      const client = url.startsWith('https') ? https : http;
      const startTime = Date.now();

      const req = client.get(url, res => {
        const responseTime = Date.now() - startTime;
        resolve({
          status: res.statusCode,
          responseTime: responseTime,
        });
      });

      req.on('error', error => {
        reject(error);
      });

      req.setTimeout(5000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
    });
  }

  /**
   * Display status information
   */
  displayStatus(processStatus, logStatus, fileStatus, apiStatus) {
    console.log('\n🔄 Process Status:');
    console.log(`  Launcher: ${processStatus.launcher ? '🟢 Running' : '🔴 Stopped'}`);
    console.log(`  Manager: ${processStatus.manager ? '🟢 Running' : '🔴 Stopped'}`);
    console.log(`  Scanner: ${processStatus.scanner ? '🟢 Running' : '🔴 Stopped'}`);

    if (processStatus.processes.length > 0) {
      console.log('\n  Active Processes:');
      processStatus.processes.forEach(proc => {
        console.log(`    ${proc.name}: PID ${proc.pid}`);
      });
    }

    console.log('\n📝 Log Files:');
    console.log(
      `  Launcher Log: ${logStatus.launcher.exists ? '📄' : '❌'} ${this.formatFileInfo(logStatus.launcher)}`
    );
    console.log(
      `  Manager Log: ${logStatus.manager.exists ? '📄' : '❌'} ${this.formatFileInfo(logStatus.manager)}`
    );
    console.log(
      `  Scanner Log: ${logStatus.scanner.exists ? '📄' : '❌'} ${this.formatFileInfo(logStatus.scanner)}`
    );

    console.log('\n📁 Important Files:');
    Object.entries(fileStatus).forEach(([file, info]) => {
      const icon = info.exists ? (info.isDirectory ? '📁' : '📄') : '❌';
      console.log(`  ${icon} ${file}: ${this.formatFileInfo(info)}`);
    });

    console.log('\n🌐 API Endpoints:');
    Object.entries(apiStatus).forEach(([endpoint, info]) => {
      const icon = info.available ? '🟢' : '🔴';
      const details = info.available
        ? `Status: ${info.status}, Response: ${info.responseTime}ms`
        : `Error: ${info.error}`;
      console.log(`  ${icon} ${endpoint}: ${details}`);
    });

    console.log('\n' + '='.repeat(50));

    // Summary
    const totalProcesses = processStatus.processes.length;
    const totalLogs = Object.values(logStatus).filter(log => log.exists).length;
    const totalFiles = Object.values(fileStatus).filter(file => file.exists).length;
    const totalAPIs = Object.values(apiStatus).filter(api => api.available).length;

    console.log(
      `📊 Summary: ${totalProcesses} processes, ${totalLogs} logs, ${totalFiles} files, ${totalAPIs} APIs`
    );

    if (totalProcesses === 0) {
      console.log('\n⚠️ No franchise processes are running. Start with: npm run franchise:start');
    } else if (totalProcesses < 3) {
      console.log(
        '\n⚠️ Some franchise processes are missing. Consider restarting: npm run franchise:restart'
      );
    } else {
      console.log('\n✅ Franchise Auto System is running properly');
    }
  }

  /**
   * Format file information
   */
  formatFileInfo(info) {
    if (!info.exists) {
      return 'Not found';
    }

    const size = info.size ? this.formatBytes(info.size) : '';
    const modified = info.lastModified ? info.lastModified.toLocaleString() : '';

    return `${size}${size && modified ? ', ' : ''}${modified}`;
  }

  /**
   * Format bytes to human readable
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Find process by script name
   */
  async findProcessByScript(scriptName) {
    return new Promise(resolve => {
      const command =
        process.platform === 'win32'
          ? `tasklist /FI "IMAGENAME eq node.exe" /FO CSV`
          : `ps aux | grep node`;

      exec(command, (error, stdout) => {
        if (error) {
          resolve(null);
          return;
        }

        const lines = stdout.split('\n');
        for (const line of lines) {
          if (line.includes(scriptName)) {
            const parts = line.trim().split(/\s+/);
            const pid = process.platform === 'win32' ? parts[1]?.replace(/"/g, '') : parts[1];

            if (pid && !isNaN(parseInt(pid))) {
              resolve(parseInt(pid));
              return;
            }
          }
        }

        resolve(null);
      });
    });
  }

  /**
   * Check if process is running
   */
  isProcessRunning(pid) {
    try {
      process.kill(pid, 0);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get recent log entries
   */
  getRecentLogs(logFile, lines = 10) {
    if (!fs.existsSync(logFile)) {
      return [];
    }

    try {
      const content = fs.readFileSync(logFile, 'utf8');
      const logLines = content.split('\n').filter(line => line.trim());
      return logLines.slice(-lines);
    } catch (error) {
      return [];
    }
  }

  /**
   * Show recent logs
   */
  showRecentLogs() {
    console.log('\n📝 Recent Log Entries:');

    const logFiles = [
      { name: 'Launcher', file: this.logFile },
      { name: 'Manager', file: this.managerLogFile },
      { name: 'Scanner', file: this.scannerLogFile },
    ];

    logFiles.forEach(({ name, file }) => {
      const logs = this.getRecentLogs(file, 5);
      if (logs.length > 0) {
        console.log(`\n  ${name} Log (last 5 entries):`);
        logs.forEach(log => {
          console.log(`    ${log}`);
        });
      }
    });
  }
}

// Main execution
const statusScript = new FranchiseStatus();

// Handle command line arguments
const args = process.argv.slice(2);

if (args.includes('--logs') || args.includes('-l')) {
  statusScript.showRecentLogs();
} else {
  statusScript.getStatus();
}

module.exports = FranchiseStatus;
