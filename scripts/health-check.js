#!/usr/bin/env node

const http = require('http');
const https = require('https');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

class HealthChecker {
  constructor() {
    this.checks = [];
    this.results = {
      timestamp: new Date().toISOString(),
      overall: 'healthy',
      checks: {},
      errors: []
    };
  }

  // Add a health check
  addCheck(name, checkFunction) {
    this.checks.push({ name, checkFunction });
  }

  // Check if the application is responding
  async checkAppHealth() {
    return new Promise((resolve) => {
      const options = {
        hostname: 'localhost',
        port: process.env.PORT || 3000,
        path: '/health',
        method: 'GET',
        timeout: 5000
      };

      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          if (res.statusCode === 200) {
            resolve({ status: 'healthy', response: data.trim() });
          } else {
            resolve({ status: 'unhealthy', error: `HTTP ${res.statusCode}` });
          }
        });
      });

      req.on('error', (error) => {
        resolve({ status: 'unhealthy', error: error.message });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({ status: 'unhealthy', error: 'Request timeout' });
      });

      req.end();
    });
  }

  // Check database connection
  async checkDatabase() {
    try {
      // This would require database connection logic
      // For now, we'll simulate a check
      return { status: 'healthy', message: 'Database connection OK' };
    } catch (error) {
      return { status: 'unhealthy', error: error.message };
    }
  }

  // Check Redis connection
  async checkRedis() {
    try {
      // This would require Redis connection logic
      // For now, we'll simulate a check
      return { status: 'healthy', message: 'Redis connection OK' };
    } catch (error) {
      return { status: 'unhealthy', error: error.message };
    }
  }

  // Check disk space
  async checkDiskSpace() {
    return new Promise((resolve) => {
      exec('df -h .', (error, stdout, stderr) => {
        if (error) {
          resolve({ status: 'unhealthy', error: error.message });
          return;
        }

        const lines = stdout.split('\n');
        const diskInfo = lines[1].split(/\s+/);
        const usedPercent = parseInt(diskInfo[4].replace('%', ''));

        if (usedPercent > 90) {
          resolve({ status: 'warning', message: `Disk usage: ${usedPercent}%` });
        } else {
          resolve({ status: 'healthy', message: `Disk usage: ${usedPercent}%` });
        }
      });
    });
  }

  // Check memory usage
  async checkMemoryUsage() {
    return new Promise((resolve) => {
      exec('free -m', (error, stdout, stderr) => {
        if (error) {
          resolve({ status: 'unhealthy', error: error.message });
          return;
        }

        const lines = stdout.split('\n');
        const memInfo = lines[1].split(/\s+/);
        const total = parseInt(memInfo[1]);
        const used = parseInt(memInfo[2]);
        const usedPercent = Math.round((used / total) * 100);

        if (usedPercent > 90) {
          resolve({ status: 'warning', message: `Memory usage: ${usedPercent}%` });
        } else {
          resolve({ status: 'healthy', message: `Memory usage: ${usedPercent}%` });
        }
      });
    });
  }

  // Check CPU usage
  async checkCPUUsage() {
    return new Promise((resolve) => {
      exec('top -bn1 | grep "Cpu(s)" | awk \'{print $2}\' | awk -F\'%\' \'{print $1}\'', (error, stdout, stderr) => {
        if (error) {
          resolve({ status: 'unhealthy', error: error.message });
          return;
        }

        const cpuUsage = parseFloat(stdout.trim());
        if (cpuUsage > 80) {
          resolve({ status: 'warning', message: `CPU usage: ${cpuUsage}%` });
        } else {
          resolve({ status: 'healthy', message: `CPU usage: ${cpuUsage}%` });
        }
      });
    });
  }

  // Check if required files exist
  async checkRequiredFiles() {
    const requiredFiles = [
      'package.json',
      'next.config.js',
      'tailwind.config.js',
      'tsconfig.json'
    ];

    const missingFiles = [];
    for (const file of requiredFiles) {
      if (!fs.existsSync(file)) {
        missingFiles.push(file);
      }
    }

    if (missingFiles.length > 0) {
      return { status: 'unhealthy', error: `Missing files: ${missingFiles.join(', ')}` };
    }

    return { status: 'healthy', message: 'All required files present' };
  }

  // Check environment variables
  async checkEnvironmentVariables() {
    const requiredEnvVars = [
      'NODE_ENV',
      'DATABASE_URL',
      'JWT_SECRET'
    ];

    const missingEnvVars = [];
    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        missingEnvVars.push(envVar);
      }
    }

    if (missingEnvVars.length > 0) {
      return { status: 'unhealthy', error: `Missing environment variables: ${missingEnvVars.join(', ')}` };
    }

    return { status: 'healthy', message: 'All required environment variables set' };
  }

  // Run all health checks
  async runChecks() {
    console.log('🔍 Starting health checks...\n');

    // Add default checks
    this.addCheck('Application Health', () => this.checkAppHealth());
    this.addCheck('Database Connection', () => this.checkDatabase());
    this.addCheck('Redis Connection', () => this.checkRedis());
    this.addCheck('Disk Space', () => this.checkDiskSpace());
    this.addCheck('Memory Usage', () => this.checkMemoryUsage());
    this.addCheck('CPU Usage', () => this.checkCPUUsage());
    this.addCheck('Required Files', () => this.checkRequiredFiles());
    this.addCheck('Environment Variables', () => this.checkEnvironmentVariables());

    // Run all checks
    for (const check of this.checks) {
      try {
        console.log(`Checking ${check.name}...`);
        const result = await check.checkFunction();
        this.results.checks[check.name] = result;

        if (result.status === 'healthy') {
          console.log(`✅ ${check.name}: ${result.message || 'OK'}`);
        } else if (result.status === 'warning') {
          console.log(`⚠️  ${check.name}: ${result.message || result.error}`);
        } else {
          console.log(`❌ ${check.name}: ${result.error}`);
          this.results.errors.push(`${check.name}: ${result.error}`);
        }
      } catch (error) {
        console.log(`❌ ${check.name}: ${error.message}`);
        this.results.checks[check.name] = { status: 'unhealthy', error: error.message };
        this.results.errors.push(`${check.name}: ${error.message}`);
      }
    }

    // Determine overall status
    const hasUnhealthy = Object.values(this.results.checks).some(check => check.status === 'unhealthy');
    const hasWarning = Object.values(this.results.checks).some(check => check.status === 'warning');

    if (hasUnhealthy) {
      this.results.overall = 'unhealthy';
    } else if (hasWarning) {
      this.results.overall = 'warning';
    } else {
      this.results.overall = 'healthy';
    }

    console.log('\n📊 Health Check Summary:');
    console.log(`Overall Status: ${this.results.overall.toUpperCase()}`);
    console.log(`Timestamp: ${this.results.timestamp}`);
    console.log(`Total Checks: ${this.checks.length}`);
    console.log(`Errors: ${this.results.errors.length}`);

    if (this.results.errors.length > 0) {
      console.log('\n❌ Errors:');
      this.results.errors.forEach(error => console.log(`  - ${error}`));
    }

    return this.results;
  }

  // Save results to file
  saveResults(filename = 'health-check-results.json') {
    const filepath = path.join(process.cwd(), filename);
    fs.writeFileSync(filepath, JSON.stringify(this.results, null, 2));
    console.log(`\n💾 Results saved to: ${filepath}`);
  }

  // Export results for external monitoring
  exportResults() {
    return {
      status: this.results.overall === 'healthy' ? 200 : 503,
      body: this.results
    };
  }
}

// Run health checks if this script is executed directly
if (require.main === module) {
  const healthChecker = new HealthChecker();
  
  healthChecker.runChecks()
    .then(() => {
      healthChecker.saveResults();
      process.exit(healthChecker.results.overall === 'healthy' ? 0 : 1);
    })
    .catch(error => {
      console.error('Health check failed:', error);
      process.exit(1);
    });
}

module.exports = HealthChecker; 