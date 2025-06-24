#!/usr/bin/env node

const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

class AutoErrorFixer {
  constructor() {
    this.errors = [];
    this.fixes = [];
    this.isRunning = false;
    this.autoFix = true;
    this.maxFixAttempts = 3;
    this.fixAttempts = 0;
  }

  // Check for common errors
  async checkForErrors() {
    console.log('🔍 Checking for errors...');

    const errors = [];

    // Check for missing dependencies
    if (!fs.existsSync('node_modules')) {
      errors.push({
        type: 'missing_dependencies',
        message: 'Missing node_modules directory',
        fix: 'npm install',
      });
    }

    // Check for missing .next directory
    if (!fs.existsSync('.next')) {
      errors.push({
        type: 'missing_build',
        message: 'Missing .next build directory',
        fix: 'npm run build',
      });
    }

    // Check for port conflicts
    try {
      const { execSync } = require('child_process');
      execSync('netstat -ano | findstr :3001', { stdio: 'pipe' });
      errors.push({
        type: 'port_conflict',
        message: 'Port 3001 is already in use',
        fix: 'taskkill /F /IM node.exe',
      });
    } catch (error) {
      // Port is free
    }

    // Check for missing environment variables
    if (!fs.existsSync('.env.local') && !fs.existsSync('.env')) {
      errors.push({
        type: 'missing_env',
        message: 'Missing environment variables',
        fix: 'copy .env.example .env.local',
      });
    }

    // Check for TypeScript errors
    try {
      const { execSync } = require('child_process');
      execSync('npx tsc --noEmit', { stdio: 'pipe' });
    } catch (error) {
      errors.push({
        type: 'typescript_errors',
        message: 'TypeScript compilation errors',
        fix: 'npm run type-check',
      });
    }

    return errors;
  }

  // Fix specific error
  async fixError(error) {
    console.log(`🔧 Fixing: ${error.message}`);

    return new Promise(resolve => {
      let command;

      switch (error.type) {
        case 'missing_dependencies':
          command = 'npm install';
          break;
        case 'missing_build':
          command = 'npm run build';
          break;
        case 'port_conflict':
          command = 'taskkill /F /IM node.exe';
          break;
        case 'missing_env':
          command = 'copy .env.example .env.local';
          break;
        case 'typescript_errors':
          command = 'npm run type-check';
          break;
        default:
          command = error.fix;
      }

      const fixProcess = spawn(command, [], {
        shell: true,
        stdio: 'inherit',
      });

      fixProcess.on('close', code => {
        if (code === 0) {
          console.log(`✅ Fixed: ${error.message}`);
          resolve(true);
        } else {
          console.log(`❌ Failed to fix: ${error.message}`);
          resolve(false);
        }
      });
    });
  }

  // Auto-fix all errors
  async autoFixAll() {
    console.log('🤖 Auto Error Fixer Starting...');
    console.log('================================');

    this.isRunning = true;
    this.fixAttempts = 0;

    while (this.isRunning && this.fixAttempts < this.maxFixAttempts) {
      this.fixAttempts++;
      console.log(`\n🔄 Fix attempt ${this.fixAttempts}/${this.maxFixAttempts}`);

      // Check for errors
      const errors = await this.checkForErrors();

      if (errors.length === 0) {
        console.log('✅ No errors found!');
        break;
      }

      console.log(`🔍 Found ${errors.length} error(s):`);
      errors.forEach(error => {
        console.log(`  - ${error.message}`);
      });

      // Fix each error
      for (const error of errors) {
        const success = await this.fixError(error);
        if (!success) {
          console.log(`⚠ Could not fix: ${error.message}`);
        }

        // Wait between fixes
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      // Wait before next check
      await new Promise(resolve => setTimeout(resolve, 5000));
    }

    if (this.fixAttempts >= this.maxFixAttempts) {
      console.log('⚠ Reached maximum fix attempts');
    }

    console.log('\n🎉 Auto error fixing complete!');
    this.isRunning = false;
  }

  // Monitor and auto-fix continuously
  async startMonitoring() {
    console.log('📊 Starting continuous error monitoring...');

    setInterval(async () => {
      if (this.isRunning) return;

      const errors = await this.checkForErrors();
      if (errors.length > 0) {
        console.log(`🔍 Auto-detected ${errors.length} error(s), fixing...`);
        await this.autoFixAll();
      }
    }, 30000); // Check every 30 seconds
  }

  // Quick fix common issues
  async quickFix() {
    console.log('⚡ Quick Fix - Common Issues');
    console.log('============================');

    const fixes = [
      { name: 'Kill existing processes', command: 'taskkill /F /IM node.exe' },
      { name: 'Clean cache', command: 'rmdir /s /q .next' },
      { name: 'Install dependencies', command: 'npm install' },
      { name: 'Build project', command: 'npm run build' },
      { name: 'Type check', command: 'npm run type-check' },
    ];

    for (const fix of fixes) {
      console.log(`🔧 ${fix.name}...`);

      try {
        const { execSync } = require('child_process');
        execSync(fix.command, { stdio: 'pipe' });
        console.log(`✅ ${fix.name} completed`);
      } catch (error) {
        console.log(`⚠ ${fix.name} failed (may be normal)`);
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('🎉 Quick fix complete!');
  }

  // Check system health
  async checkHealth() {
    console.log('🏥 System Health Check');
    console.log('=====================');

    const checks = [
      { name: 'Node.js', check: () => process.version },
      {
        name: 'NPM',
        check: () =>
          require('child_process').execSync('npm --version', { encoding: 'utf8' }).trim(),
      },
      { name: 'Next.js', check: () => require('./package.json').dependencies.next },
      {
        name: 'TypeScript',
        check: () =>
          require('child_process').execSync('npx tsc --version', { encoding: 'utf8' }).trim(),
      },
    ];

    for (const check of checks) {
      try {
        const result = check.check();
        console.log(`✅ ${check.name}: ${result}`);
      } catch (error) {
        console.log(`❌ ${check.name}: Not found or error`);
      }
    }
  }
}

// Handle command line arguments
const args = process.argv.slice(2);
const errorFixer = new AutoErrorFixer();

switch (args[0]) {
  case 'fix':
  case undefined:
    errorFixer.autoFixAll();
    break;
  case 'monitor':
    errorFixer.startMonitoring();
    break;
  case 'quick':
    errorFixer.quickFix();
    break;
  case 'health':
    errorFixer.checkHealth();
    break;
  default:
    console.log('🤖 EHB Next.js 04 - Auto Error Fixer');
    console.log('====================================');
    console.log('');
    console.log('Usage:');
    console.log('  node scripts/auto-error-fixer.cjs fix    - Fix all errors');
    console.log('  node scripts/auto-error-fixer.cjs monitor - Monitor continuously');
    console.log('  node scripts/auto-error-fixer.cjs quick  - Quick fix common issues');
    console.log('  node scripts/auto-error-fixer.cjs health - Check system health');
    console.log('');
    errorFixer.autoFixAll();
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping auto error fixer...');
  errorFixer.isRunning = false;
  process.exit(0);
});
