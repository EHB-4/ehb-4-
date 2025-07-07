#!/usr/bin/env node

/**
 * EHB Franchise Stop Script
 * Stops all franchise auto processes gracefully
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

class FranchiseStop {
  constructor() {
    this.pidFile = './temp/franchise-launcher.pid';
    this.processes = [];
  }

  /**
   * Stop all franchise processes
   */
  async stop() {
    console.log('🛑 Stopping EHB Franchise Auto System...');

    try {
      // Stop launcher process
      await this.stopLauncher();

      // Stop manager process
      await this.stopManager();

      // Stop scanner process
      await this.stopScanner();

      // Kill any remaining Node.js processes related to franchise
      await this.killFranchiseProcesses();

      // Clean up PID file
      this.cleanupPidFile();

      console.log('✅ Franchise Auto System stopped successfully');
    } catch (error) {
      console.error('❌ Failed to stop Franchise Auto System:', error);
      process.exit(1);
    }
  }

  /**
   * Stop launcher process
   */
  async stopLauncher() {
    if (fs.existsSync(this.pidFile)) {
      try {
        const pid = fs.readFileSync(this.pidFile, 'utf8').trim();
        console.log(`🛑 Stopping launcher process (PID: ${pid})...`);

        process.kill(parseInt(pid), 'SIGTERM');

        // Wait for process to terminate
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Force kill if still running
        try {
          process.kill(parseInt(pid), 'SIGKILL');
        } catch (error) {
          // Process already terminated
        }

        console.log('✅ Launcher process stopped');
      } catch (error) {
        console.log('⚠️ Launcher process not found or already stopped');
      }
    }
  }

  /**
   * Stop manager process
   */
  async stopManager() {
    console.log('🛑 Stopping manager process...');

    try {
      // Find manager process
      const managerPid = await this.findProcessByScript('franchise-auto-manager.js');

      if (managerPid) {
        process.kill(managerPid, 'SIGTERM');
        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
          process.kill(managerPid, 'SIGKILL');
        } catch (error) {
          // Process already terminated
        }

        console.log('✅ Manager process stopped');
      } else {
        console.log('⚠️ Manager process not found');
      }
    } catch (error) {
      console.log('⚠️ Error stopping manager process:', error.message);
    }
  }

  /**
   * Stop scanner process
   */
  async stopScanner() {
    console.log('🛑 Stopping scanner process...');

    try {
      // Find scanner process
      const scannerPid = await this.findProcessByScript('franchise-auto-scanner.js');

      if (scannerPid) {
        process.kill(scannerPid, 'SIGTERM');
        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
          process.kill(scannerPid, 'SIGKILL');
        } catch (error) {
          // Process already terminated
        }

        console.log('✅ Scanner process stopped');
      } else {
        console.log('⚠️ Scanner process not found');
      }
    } catch (error) {
      console.log('⚠️ Error stopping scanner process:', error.message);
    }
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
   * Kill all franchise-related processes
   */
  async killFranchiseProcesses() {
    console.log('🛑 Killing any remaining franchise processes...');

    try {
      const command =
        process.platform === 'win32'
          ? `taskkill /F /IM node.exe /FI "WINDOWTITLE eq *franchise*"`
          : `pkill -f "franchise"`;

      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.log('⚠️ No franchise processes found to kill');
        } else {
          console.log('✅ Killed remaining franchise processes');
        }
      });
    } catch (error) {
      console.log('⚠️ Error killing franchise processes:', error.message);
    }
  }

  /**
   * Clean up PID file
   */
  cleanupPidFile() {
    if (fs.existsSync(this.pidFile)) {
      try {
        fs.unlinkSync(this.pidFile);
        console.log('✅ PID file cleaned up');
      } catch (error) {
        console.log('⚠️ Error cleaning up PID file:', error.message);
      }
    }
  }

  /**
   * Get status of franchise processes
   */
  async getStatus() {
    console.log('📊 Checking Franchise Auto System status...');

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
      } catch (error) {
        status.launcher = false;
      }
    }

    // Check manager
    const managerPid = await this.findProcessByScript('franchise-auto-manager.js');
    status.manager = managerPid !== null;

    // Check scanner
    const scannerPid = await this.findProcessByScript('franchise-auto-scanner.js');
    status.scanner = scannerPid !== null;

    // Add process details
    if (managerPid) status.processes.push({ name: 'Manager', pid: managerPid });
    if (scannerPid) status.processes.push({ name: 'Scanner', pid: scannerPid });

    return status;
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
}

// Main execution
const stopScript = new FranchiseStop();

// Handle command line arguments
const args = process.argv.slice(2);

if (args.includes('--status') || args.includes('-s')) {
  stopScript.getStatus().then(status => {
    console.log('\n📊 Franchise Auto System Status:');
    console.log(`Launcher: ${status.launcher ? '🟢 Running' : '🔴 Stopped'}`);
    console.log(`Manager: ${status.manager ? '🟢 Running' : '🔴 Stopped'}`);
    console.log(`Scanner: ${status.scanner ? '🟢 Running' : '🔴 Stopped'}`);

    if (status.processes.length > 0) {
      console.log('\nActive Processes:');
      status.processes.forEach(proc => {
        console.log(`  ${proc.name}: PID ${proc.pid}`);
      });
    }
  });
} else {
  stopScript.stop();
}

module.exports = FranchiseStop;
