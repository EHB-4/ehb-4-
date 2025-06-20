#!/usr/bin/env node

/**
 * EHB Next.js 04 - GPU & Cursor AI Diagnostic Script
 * Checks graphics card performance and Cursor AI compatibility
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

class GPUCursorDiagnostic {
  constructor() {
    this.projectRoot = process.cwd();
    this.diagnosticResults = {
      system: {},
      gpu: {},
      cursor: {},
      performance: {},
      recommendations: [],
    };
  }

  log(message, type = 'info') {
    const colors = {
      info: '\x1b[34m',
      success: '\x1b[32m',
      warning: '\x1b[33m',
      error: '\x1b[31m',
    };
    const reset = '\x1b[0m';
    console.log(`${colors[type]}🔍 ${message}${reset}`);
  }

  async checkSystemInfo() {
    this.log('🖥️ Checking system information...');

    try {
      const platform = os.platform();
      const arch = os.arch();
      const cpus = os.cpus();
      const totalMem = os.totalmem();
      const freeMem = os.freemem();
      const nodeVersion = process.version;

      this.diagnosticResults.system = {
        platform,
        arch,
        cpuCount: cpus.length,
        cpuModel: cpus[0].model,
        totalMemory: Math.round(totalMem / 1024 / 1024 / 1024),
        freeMemory: Math.round(freeMem / 1024 / 1024 / 1024),
        memoryUsage: Math.round(((totalMem - freeMem) / totalMem) * 100),
        nodeVersion,
        uptime: Math.round(os.uptime() / 3600),
      };

      this.log(
        `✅ System: ${platform} ${arch} | CPU: ${cpus.length} cores | RAM: ${this.diagnosticResults.system.totalMemory}GB`,
        'success'
      );
    } catch (error) {
      this.log(`❌ Error checking system info: ${error.message}`, 'error');
    }
  }

  async checkGPUInfo() {
    this.log('🎮 Checking graphics card information...');

    try {
      const platform = os.platform();
      let gpuInfo = {};

      if (platform === 'win32') {
        // Windows GPU check
        try {
          const dxdiag = execSync('dxdiag /t dxdiag_output.txt', { stdio: 'pipe' });
          await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for file to be written

          if (fs.existsSync('dxdiag_output.txt')) {
            const dxdiagContent = fs.readFileSync('dxdiag_output.txt', 'utf8');
            const gpuMatch = dxdiagContent.match(/Card Name:\s*(.+)/i);
            const driverMatch = dxdiagContent.match(/Driver Version:\s*(.+)/i);
            const memoryMatch = dxdiagContent.match(/Display Memory:\s*(.+)/i);

            gpuInfo = {
              name: gpuMatch ? gpuMatch[1].trim() : 'Unknown',
              driver: driverMatch ? driverMatch[1].trim() : 'Unknown',
              memory: memoryMatch ? memoryMatch[1].trim() : 'Unknown',
              platform: 'Windows',
            };

            // Clean up
            fs.unlinkSync('dxdiag_output.txt');
          }
        } catch (error) {
          this.log('⚠️ Could not run dxdiag, trying alternative method', 'warning');
        }

        // Alternative Windows GPU check using PowerShell
        try {
          const psCommand =
            'Get-WmiObject -Class Win32_VideoController | Select-Object Name, DriverVersion, AdapterRAM | ConvertTo-Json';
          const gpuData = execSync(`powershell -Command "${psCommand}"`, { encoding: 'utf8' });
          const gpuJson = JSON.parse(gpuData);

          if (gpuJson && gpuJson.Name) {
            gpuInfo = {
              name: gpuJson.Name,
              driver: gpuJson.DriverVersion || 'Unknown',
              memory: gpuJson.AdapterRAM
                ? Math.round(gpuJson.AdapterRAM / 1024 / 1024 / 1024) + 'GB'
                : 'Unknown',
              platform: 'Windows',
            };
          }
        } catch (error) {
          this.log('⚠️ PowerShell GPU check failed', 'warning');
        }
      } else if (platform === 'darwin') {
        // macOS GPU check
        try {
          const gpuData = execSync('system_profiler SPDisplaysDataType', { encoding: 'utf8' });
          const gpuMatch = gpuData.match(/Chipset Model:\s*(.+)/i);
          const memoryMatch = gpuData.match(/VRAM \(Total\):\s*(.+)/i);

          gpuInfo = {
            name: gpuMatch ? gpuMatch[1].trim() : 'Unknown',
            driver: 'macOS Built-in',
            memory: memoryMatch ? memoryMatch[1].trim() : 'Unknown',
            platform: 'macOS',
          };
        } catch (error) {
          this.log('⚠️ macOS GPU check failed', 'warning');
        }
      } else {
        // Linux GPU check
        try {
          const lspci = execSync('lspci | grep -i vga', { encoding: 'utf8' });
          const gpuMatch = lspci.match(/(.+)/);

          gpuInfo = {
            name: gpuMatch ? gpuMatch[1].trim() : 'Unknown',
            driver: 'Linux',
            memory: 'Unknown',
            platform: 'Linux',
          };
        } catch (error) {
          this.log('⚠️ Linux GPU check failed', 'warning');
        }
      }

      this.diagnosticResults.gpu = gpuInfo;

      if (gpuInfo.name && gpuInfo.name !== 'Unknown') {
        this.log(`✅ GPU: ${gpuInfo.name} | Driver: ${gpuInfo.driver}`, 'success');
      } else {
        this.log('⚠️ Could not detect GPU information', 'warning');
      }
    } catch (error) {
      this.log(`❌ Error checking GPU: ${error.message}`, 'error');
    }
  }

  async checkCursorAICompatibility() {
    this.log('🤖 Checking Cursor AI compatibility...');

    try {
      const cursorInfo = {
        version: 'Unknown',
        installed: false,
        configPath: '',
        performanceMode: false,
      };

      // Check if Cursor is installed
      const cursorPaths = [
        path.join(os.homedir(), 'AppData', 'Local', 'Programs', 'cursor', 'Cursor.exe'),
        path.join(os.homedir(), 'Applications', 'Cursor.app'),
        '/usr/bin/cursor',
        '/usr/local/bin/cursor',
      ];

      for (const cursorPath of cursorPaths) {
        if (fs.existsSync(cursorPath)) {
          cursorInfo.installed = true;
          cursorInfo.configPath = cursorPath;
          break;
        }
      }

      // Check Cursor configuration
      const configPaths = [
        path.join(os.homedir(), '.cursor', 'settings.json'),
        path.join(
          os.homedir(),
          'Library',
          'Application Support',
          'Cursor',
          'User',
          'settings.json'
        ),
      ];

      for (const configPath of configPaths) {
        if (fs.existsSync(configPath)) {
          try {
            const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            cursorInfo.performanceMode = config['cursor.gpu.acceleration'] || false;
            cursorInfo.version = config.version || 'Unknown';
          } catch (error) {
            // Config file exists but can't be parsed
          }
        }
      }

      this.diagnosticResults.cursor = cursorInfo;

      if (cursorInfo.installed) {
        this.log(
          `✅ Cursor AI: Installed | GPU Acceleration: ${cursorInfo.performanceMode ? 'Enabled' : 'Disabled'}`,
          'success'
        );
      } else {
        this.log('⚠️ Cursor AI not found in common locations', 'warning');
      }
    } catch (error) {
      this.log(`❌ Error checking Cursor AI: ${error.message}`, 'error');
    }
  }

  async checkPerformanceIssues() {
    this.log('⚡ Checking performance issues...');

    try {
      const performance = {
        memoryPressure: false,
        cpuPressure: false,
        diskSpace: false,
        networkIssues: false,
        gpuIssues: false,
      };

      // Check memory pressure
      const memUsage = this.diagnosticResults.system.memoryUsage;
      if (memUsage > 85) {
        performance.memoryPressure = true;
        this.log('⚠️ High memory usage detected (>85%)', 'warning');
      }

      // Check CPU usage
      const loadAvg = os.loadavg();
      const cpuCount = this.diagnosticResults.system.cpuCount;
      const cpuUsage = (loadAvg[0] / cpuCount) * 100;

      if (cpuUsage > 80) {
        performance.cpuPressure = true;
        this.log('⚠️ High CPU usage detected (>80%)', 'warning');
      }

      // Check disk space
      try {
        const diskUsage = execSync('df -h .', { encoding: 'utf8' });
        const usageMatch = diskUsage.match(/(\d+)%/);
        if (usageMatch && parseInt(usageMatch[1]) > 90) {
          performance.diskSpace = true;
          this.log('⚠️ Low disk space detected (>90% used)', 'warning');
        }
      } catch (error) {
        // Disk check failed, skip
      }

      // Check for common performance issues
      const issues = [];
      if (performance.memoryPressure) issues.push('High memory usage');
      if (performance.cpuPressure) issues.push('High CPU usage');
      if (performance.diskSpace) issues.push('Low disk space');
      if (!this.diagnosticResults.cursor.performanceMode) issues.push('GPU acceleration disabled');

      this.diagnosticResults.performance = {
        ...performance,
        issues,
        cpuUsage: Math.round(cpuUsage),
        recommendations: this.generatePerformanceRecommendations(performance),
      };

      this.log(`✅ Performance check complete. Issues found: ${issues.length}`, 'success');
    } catch (error) {
      this.log(`❌ Error checking performance: ${error.message}`, 'error');
    }
  }

  generatePerformanceRecommendations(performance) {
    const recommendations = [];

    if (performance.memoryPressure) {
      recommendations.push('Close unnecessary applications to free up memory');
      recommendations.push('Consider upgrading RAM if frequently hitting memory limits');
    }

    if (performance.cpuPressure) {
      recommendations.push('Close CPU-intensive applications');
      recommendations.push('Check for background processes consuming CPU');
    }

    if (performance.diskSpace) {
      recommendations.push('Free up disk space by removing unnecessary files');
      recommendations.push('Consider using external storage for large files');
    }

    if (!this.diagnosticResults.cursor.performanceMode) {
      recommendations.push('Enable GPU acceleration in Cursor AI settings');
      recommendations.push('Update graphics drivers to latest version');
    }

    // General recommendations
    recommendations.push('Restart Cursor AI if experiencing slowness');
    recommendations.push('Update Cursor AI to latest version');
    recommendations.push('Check for system updates');

    return recommendations;
  }

  async generateDiagnosticReport() {
    this.log('📄 Generating diagnostic report...');

    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        system: this.diagnosticResults.system,
        gpu: this.diagnosticResults.gpu,
        cursor: this.diagnosticResults.cursor,
        performance: this.diagnosticResults.performance,
      },
      recommendations: this.diagnosticResults.performance.recommendations,
    };

    const logsDir = path.join(this.projectRoot, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(logsDir, 'gpu-cursor-diagnostic.json'),
      JSON.stringify(report, null, 2)
    );

    // Generate readable report
    const readableReport = this.generateReadableReport(report);
    fs.writeFileSync(path.join(logsDir, 'gpu-cursor-diagnostic.txt'), readableReport);

    this.log('✅ Diagnostic report generated');
    return report;
  }

  generateReadableReport(report) {
    return `
=== GPU & Cursor AI Diagnostic Report ===
Generated: ${report.timestamp}

SYSTEM INFORMATION:
- Platform: ${report.summary.system.platform} ${report.summary.system.arch}
- CPU: ${report.summary.system.cpuCount} cores (${report.summary.system.cpuModel})
- Memory: ${report.summary.system.totalMemory}GB total, ${report.summary.system.freeMemory}GB free (${report.summary.system.memoryUsage}% used)
- Node.js: ${report.summary.system.nodeVersion}
- Uptime: ${report.summary.system.uptime} hours

GRAPHICS CARD:
- Name: ${report.summary.gpu.name}
- Driver: ${report.summary.gpu.driver}
- Memory: ${report.summary.gpu.memory}
- Platform: ${report.summary.gpu.platform}

CURSOR AI:
- Installed: ${report.summary.cursor.installed ? 'Yes' : 'No'}
- GPU Acceleration: ${report.summary.cursor.performanceMode ? 'Enabled' : 'Disabled'}
- Config Path: ${report.summary.cursor.configPath}

PERFORMANCE ISSUES:
- Memory Pressure: ${report.summary.performance.memoryPressure ? 'Yes' : 'No'}
- CPU Pressure: ${report.summary.performance.cpuPressure ? 'Yes' : 'No'}
- Disk Space: ${report.summary.performance.diskSpace ? 'Yes' : 'No'}
- CPU Usage: ${report.summary.performance.cpuUsage}%

ISSUES FOUND: ${report.summary.performance.issues.length}
${report.summary.performance.issues.map(issue => `- ${issue}`).join('\n')}

RECOMMENDATIONS:
${report.recommendations.map(rec => `- ${rec}`).join('\n')}

=== End Report ===
`;
  }

  async run() {
    try {
      this.log('🚀 Starting GPU & Cursor AI Diagnostic...');
      console.log('');

      await this.checkSystemInfo();
      console.log('');

      await this.checkGPUInfo();
      console.log('');

      await this.checkCursorAICompatibility();
      console.log('');

      await this.checkPerformanceIssues();
      console.log('');

      const report = await this.generateDiagnosticReport();

      console.log('');
      this.log('🎉 Diagnostic Complete!', 'success');
      console.log('');

      // Display summary
      console.log('📊 SUMMARY:');
      console.log(
        `System: ${report.summary.system.platform} | RAM: ${report.summary.system.totalMemory}GB | CPU: ${report.summary.system.cpuCount} cores`
      );
      console.log(`GPU: ${report.summary.gpu.name || 'Unknown'}`);
      console.log(
        `Cursor AI: ${report.summary.cursor.installed ? 'Installed' : 'Not Found'} | GPU Accel: ${report.summary.cursor.performanceMode ? 'ON' : 'OFF'}`
      );
      console.log(`Performance Issues: ${report.summary.performance.issues.length}`);

      if (report.summary.performance.issues.length > 0) {
        console.log('');
        console.log('⚠️  PERFORMANCE ISSUES DETECTED:');
        report.summary.performance.issues.forEach(issue => {
          console.log(`   - ${issue}`);
        });
      }

      console.log('');
      console.log(
        '📁 Reports saved to: logs/gpu-cursor-diagnostic.json and logs/gpu-cursor-diagnostic.txt'
      );
    } catch (error) {
      this.log(`❌ Diagnostic failed: ${error.message}`, 'error');
      process.exit(1);
    }
  }
}

// Run diagnostic
const diagnostic = new GPUCursorDiagnostic();
diagnostic.run();
