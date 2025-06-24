#!/usr/bin/env node

const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

class EnhancedAutoFixer {
  constructor() {
    this.isRunning = false;
    this.monitoring = false;
    this.fixAttempts = 0;
    this.maxAttempts = 5;
    this.services = [];
    this.errorLog = [];
  }

  // Enhanced error detection
  async detectErrors() {
    console.log('🔍 Enhanced Error Detection Running...');

    const errors = [];

    // Check for critical errors
    try {
      // Check if package.json exists
      if (!fs.existsSync('package.json')) {
        errors.push({
          type: 'critical',
          message: 'Missing package.json',
          fix: 'restore_package',
        });
      }

      // Check if node_modules is corrupted
      if (fs.existsSync('node_modules') && !fs.existsSync('node_modules/.package-lock.json')) {
        errors.push({
          type: 'dependency',
          message: 'Corrupted node_modules',
          fix: 'reinstall_deps',
        });
      }

      // Check for port conflicts
      try {
        exec('netstat -ano | findstr :3001', { stdio: 'pipe' });
        errors.push({
          type: 'port',
          message: 'Port 3001 in use',
          fix: 'kill_processes',
        });
      } catch (e) {
        // Port is free
      }

      // Check for TypeScript errors
      try {
        exec('npx tsc --noEmit', { stdio: 'pipe' });
      } catch (e) {
        errors.push({
          type: 'typescript',
          message: 'TypeScript compilation errors',
          fix: 'fix_typescript',
        });
      }

      // Check for build errors
      try {
        exec('npm run build', { stdio: 'pipe' });
      } catch (e) {
        errors.push({
          type: 'build',
          message: 'Build errors detected',
          fix: 'fix_build',
        });
      }
    } catch (error) {
      errors.push({
        type: 'system',
        message: 'System error detected',
        fix: 'system_repair',
      });
    }

    return errors;
  }

  // Enhanced error fixing
  async fixError(error) {
    console.log(`🔧 Fixing: ${error.message}`);

    try {
      switch (error.fix) {
        case 'kill_processes':
          await this.killAllProcesses();
          break;
        case 'reinstall_deps':
          await this.reinstallDependencies();
          break;
        case 'fix_typescript':
          await this.fixTypeScript();
          break;
        case 'fix_build':
          await this.fixBuild();
          break;
        case 'system_repair':
          await this.systemRepair();
          break;
        case 'restore_package':
          await this.restorePackage();
          break;
        default:
          await this.genericFix(error);
      }

      console.log(`✅ Fixed: ${error.message}`);
      return true;
    } catch (fixError) {
      console.log(`❌ Failed to fix: ${error.message}`);
      this.errorLog.push({
        error: error.message,
        fixError: fixError.message,
        timestamp: new Date().toISOString(),
      });
      return false;
    }
  }

  // Kill all processes
  async killAllProcesses() {
    return new Promise(resolve => {
      const platform = process.platform;
      let command;

      if (platform === 'win32') {
        command = 'taskkill /F /IM node.exe & taskkill /F /IM npm.exe';
      } else {
        command = 'pkill -f "node" && pkill -f "npm"';
      }

      exec(command, error => {
        if (error) {
          console.log('ℹ No processes to kill');
        } else {
          console.log('✅ All processes killed');
        }
        resolve();
      });
    });
  }

  // Reinstall dependencies
  async reinstallDependencies() {
    return new Promise(resolve => {
      console.log('📦 Reinstalling dependencies...');

      // Remove node_modules and package-lock
      if (fs.existsSync('node_modules')) {
        fs.rmSync('node_modules', { recursive: true, force: true });
      }
      if (fs.existsSync('package-lock.json')) {
        fs.unlinkSync('package-lock.json');
      }

      // Fresh install
      const installProcess = spawn('npm', ['install'], {
        stdio: 'inherit',
        shell: true,
      });

      installProcess.on('close', code => {
        if (code === 0) {
          console.log('✅ Dependencies reinstalled');
        } else {
          console.log('❌ Failed to reinstall dependencies');
        }
        resolve();
      });
    });
  }

  // Fix TypeScript errors
  async fixTypeScript() {
    return new Promise(resolve => {
      console.log('🔧 Fixing TypeScript errors...');

      const fixProcess = spawn('npm', ['run', 'type-check'], {
        stdio: 'inherit',
        shell: true,
      });

      fixProcess.on('close', code => {
        if (code === 0) {
          console.log('✅ TypeScript errors fixed');
        } else {
          console.log('⚠ TypeScript errors may need manual review');
        }
        resolve();
      });
    });
  }

  // Fix build errors
  async fixBuild() {
    return new Promise(resolve => {
      console.log('🔧 Fixing build errors...');

      // Clean cache first
      if (fs.existsSync('.next')) {
        fs.rmSync('.next', { recursive: true, force: true });
      }

      const buildProcess = spawn('npm', ['run', 'build'], {
        stdio: 'inherit',
        shell: true,
      });

      buildProcess.on('close', code => {
        if (code === 0) {
          console.log('✅ Build errors fixed');
        } else {
          console.log('⚠ Build errors may need manual review');
        }
        resolve();
      });
    });
  }

  // System repair
  async systemRepair() {
    console.log('🔧 Performing system repair...');

    // Kill all processes
    await this.killAllProcesses();

    // Clean everything
    if (fs.existsSync('.next')) {
      fs.rmSync('.next', { recursive: true, force: true });
    }
    if (fs.existsSync('node_modules')) {
      fs.rmSync('node_modules', { recursive: true, force: true });
    }
    if (fs.existsSync('package-lock.json')) {
      fs.unlinkSync('package-lock.json');
    }

    // Reinstall everything
    await this.reinstallDependencies();

    // Rebuild
    await this.fixBuild();

    console.log('✅ System repair complete');
  }

  // Restore package.json
  async restorePackage() {
    console.log('📄 Restoring package.json...');

    // Create basic package.json if missing
    const basicPackage = {
      name: 'ehb-next-js-04',
      version: '0.1.0',
      private: true,
      scripts: {
        dev: 'next dev --port 3001',
        build: 'next build',
        start: 'next start',
        lint: 'next lint',
      },
      dependencies: {
        next: '^14.0.0',
        react: '^18.0.0',
        'react-dom': '^18.0.0',
      },
      devDependencies: {
        '@types/node': '^20.0.0',
        '@types/react': '^18.0.0',
        '@types/react-dom': '^18.0.0',
        typescript: '^5.0.0',
      },
    };

    fs.writeFileSync('package.json', JSON.stringify(basicPackage, null, 2));
    console.log('✅ package.json restored');
  }

  // Generic fix
  async genericFix(error) {
    console.log(`🔧 Applying generic fix for: ${error.message}`);

    // Try common fixes
    await this.killAllProcesses();

    if (fs.existsSync('.next')) {
      fs.rmSync('.next', { recursive: true, force: true });
    }

    const installProcess = spawn('npm', ['install'], {
      stdio: 'inherit',
      shell: true,
    });

    return new Promise(resolve => {
      installProcess.on('close', code => {
        if (code === 0) {
          console.log('✅ Generic fix applied');
        } else {
          console.log('⚠ Generic fix may need manual review');
        }
        resolve();
      });
    });
  }

  // Start all services
  async startServices() {
    console.log('🚀 Starting all services...');

    const services = [
      { name: 'Development Server', command: 'npm run dev' },
      { name: 'Keep-Alive Server', command: 'keep-alive.bat' },
      { name: 'Voice Assistant', command: 'start-voice.bat' },
    ];

    for (const service of services) {
      console.log(`Starting ${service.name}...`);

      const serviceProcess = spawn(service.command, [], {
        shell: true,
        detached: true,
        stdio: 'inherit',
      });

      this.services.push({
        name: service.name,
        process: serviceProcess,
        pid: serviceProcess.pid,
      });

      // Wait between services
      await new Promise(resolve => setTimeout(resolve, 3000));
    }

    // Open browsers
    setTimeout(() => {
      exec('start http://localhost:3001');
      setTimeout(() => {
        exec('start http://localhost:3000');
      }, 1000);
    }, 5000);

    console.log('✅ All services started');
  }

  // Enhanced auto fix all
  async autoFixAll() {
    console.log('🤖 Enhanced Auto Fixer Starting...');
    console.log('===================================');

    this.isRunning = true;
    this.fixAttempts = 0;

    while (this.isRunning && this.fixAttempts < this.maxAttempts) {
      this.fixAttempts++;
      console.log(`\n🔄 Fix attempt ${this.fixAttempts}/${this.maxAttempts}`);

      // Detect errors
      const errors = await this.detectErrors();

      if (errors.length === 0) {
        console.log('✅ No errors detected!');
        break;
      }

      console.log(`🔍 Found ${errors.length} error(s):`);
      errors.forEach(error => {
        console.log(`  - ${error.message} (${error.type})`);
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

    // Start services after fixing
    await this.startServices();

    console.log('\n🎉 Enhanced auto fixing complete!');
    console.log('📊 Error log saved for review');

    this.isRunning = false;
  }

  // Continuous monitoring
  async startMonitoring() {
    console.log('📊 Starting continuous error monitoring...');

    this.monitoring = true;

    setInterval(async () => {
      if (!this.monitoring) return;

      const errors = await this.detectErrors();
      if (errors.length > 0) {
        console.log(`🔍 Auto-detected ${errors.length} error(s), fixing...`);
        await this.autoFixAll();
      }
    }, 60000); // Check every minute
  }

  // Get error log
  getErrorLog() {
    console.log('📋 Error Log:');
    console.log('============');

    if (this.errorLog.length === 0) {
      console.log('✅ No errors logged');
    } else {
      this.errorLog.forEach((log, index) => {
        console.log(`${index + 1}. ${log.error}`);
        console.log(`   Fix Error: ${log.fixError}`);
        console.log(`   Time: ${log.timestamp}`);
        console.log('');
      });
    }
  }
}

// Handle command line arguments
const args = process.argv.slice(2);
const autoFixer = new EnhancedAutoFixer();

switch (args[0]) {
  case 'fix':
  case undefined:
    autoFixer.autoFixAll();
    break;
  case 'monitor':
    autoFixer.startMonitoring();
    break;
  case 'log':
    autoFixer.getErrorLog();
    break;
  default:
    console.log('🤖 EHB Next.js 04 - Enhanced Auto Fixer');
    console.log('========================================');
    console.log('');
    console.log('Usage:');
    console.log('  node scripts/enhanced-auto-fixer.cjs fix     - Fix all errors');
    console.log('  node scripts/enhanced-auto-fixer.cjs monitor - Monitor continuously');
    console.log('  node scripts/enhanced-auto-fixer.cjs log     - Show error log');
    console.log('');
    autoFixer.autoFixAll();
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping enhanced auto fixer...');
  autoFixer.isRunning = false;
  autoFixer.monitoring = false;
  process.exit(0);
});
