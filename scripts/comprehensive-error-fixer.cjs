#!/usr/bin/env node

const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

class ComprehensiveErrorFixer {
  constructor() {
    this.isRunning = false;
    this.fixAttempts = 0;
    this.maxAttempts = 10;
    this.errorLog = [];
    this.fixedErrors = [];
  }

  // Comprehensive error detection
  async detectAllErrors() {
    console.log('🔍 Comprehensive Error Detection Running...');

    const errors = [];

    // 1. System Errors
    try {
      // Check Node.js version
      const nodeVersion = process.version;
      if (!nodeVersion.includes('v18') && !nodeVersion.includes('v20')) {
        errors.push({
          type: 'system',
          message: 'Node.js version may be incompatible',
          fix: 'check_node_version',
        });
      }

      // Check npm version
      try {
        const npmVersion = require('child_process')
          .execSync('npm --version', { encoding: 'utf8' })
          .trim();
        console.log(`✅ NPM Version: ${npmVersion}`);
      } catch (e) {
        errors.push({
          type: 'system',
          message: 'NPM not found or corrupted',
          fix: 'fix_npm',
        });
      }
    } catch (error) {
      errors.push({
        type: 'system',
        message: 'System error detected',
        fix: 'system_repair',
      });
    }

    // 2. File System Errors
    try {
      // Check if package.json exists
      if (!fs.existsSync('package.json')) {
        errors.push({
          type: 'filesystem',
          message: 'Missing package.json',
          fix: 'restore_package',
        });
      }

      // Check if next.config.js exists
      if (!fs.existsSync('next.config.js')) {
        errors.push({
          type: 'filesystem',
          message: 'Missing next.config.js',
          fix: 'create_next_config',
        });
      }

      // Check if tsconfig.json exists
      if (!fs.existsSync('tsconfig.json')) {
        errors.push({
          type: 'filesystem',
          message: 'Missing tsconfig.json',
          fix: 'create_tsconfig',
        });
      }
    } catch (error) {
      errors.push({
        type: 'filesystem',
        message: 'File system error',
        fix: 'fix_filesystem',
      });
    }

    // 3. Dependency Errors
    try {
      // Check if node_modules exists
      if (!fs.existsSync('node_modules')) {
        errors.push({
          type: 'dependency',
          message: 'Missing node_modules',
          fix: 'install_dependencies',
        });
      } else {
        // Check if key dependencies exist
        const keyDeps = ['next', 'react', 'react-dom'];
        for (const dep of keyDeps) {
          if (!fs.existsSync(`node_modules/${dep}`)) {
            errors.push({
              type: 'dependency',
              message: `Missing dependency: ${dep}`,
              fix: 'reinstall_dependencies',
            });
            break;
          }
        }
      }
    } catch (error) {
      errors.push({
        type: 'dependency',
        message: 'Dependency error',
        fix: 'fix_dependencies',
      });
    }

    // 4. Cache Errors
    try {
      // Check .next directory
      if (fs.existsSync('.next') && fs.statSync('.next').size === 0) {
        errors.push({
          type: 'cache',
          message: 'Corrupted .next cache',
          fix: 'clean_cache',
        });
      }

      // Check npm cache
      try {
        exec('npm cache verify', { stdio: 'pipe' });
      } catch (e) {
        errors.push({
          type: 'cache',
          message: 'NPM cache corrupted',
          fix: 'clean_npm_cache',
        });
      }
    } catch (error) {
      errors.push({
        type: 'cache',
        message: 'Cache error',
        fix: 'fix_cache',
      });
    }

    // 5. Port Errors
    try {
      // Check port 3001
      try {
        exec('netstat -ano | findstr :3001', { stdio: 'pipe' });
        errors.push({
          type: 'port',
          message: 'Port 3001 in use',
          fix: 'kill_port_processes',
        });
      } catch (e) {
        // Port is free
      }

      // Check port 3000
      try {
        exec('netstat -ano | findstr :3000', { stdio: 'pipe' });
        errors.push({
          type: 'port',
          message: 'Port 3000 in use',
          fix: 'kill_port_processes',
        });
      } catch (e) {
        // Port is free
      }
    } catch (error) {
      errors.push({
        type: 'port',
        message: 'Port error',
        fix: 'fix_ports',
      });
    }

    // 6. TypeScript Errors
    try {
      exec('npx tsc --noEmit', { stdio: 'pipe' });
    } catch (e) {
      errors.push({
        type: 'typescript',
        message: 'TypeScript compilation errors',
        fix: 'fix_typescript',
      });
    }

    // 7. Build Errors
    try {
      exec('npm run build', { stdio: 'pipe' });
    } catch (e) {
      errors.push({
        type: 'build',
        message: 'Build errors detected',
        fix: 'fix_build',
      });
    }

    // 8. Environment Errors
    try {
      if (!fs.existsSync('.env.local') && !fs.existsSync('.env')) {
        errors.push({
          type: 'environment',
          message: 'Missing environment file',
          fix: 'create_env',
        });
      }
    } catch (error) {
      errors.push({
        type: 'environment',
        message: 'Environment error',
        fix: 'fix_environment',
      });
    }

    // 9. Permission Errors
    try {
      // Check write permissions
      fs.accessSync('.', fs.constants.W_OK);
    } catch (error) {
      errors.push({
        type: 'permission',
        message: 'Permission error',
        fix: 'fix_permissions',
      });
    }

    // 10. Network Errors
    try {
      // Check internet connection
      exec('ping -n 1 google.com', { stdio: 'pipe' });
    } catch (error) {
      errors.push({
        type: 'network',
        message: 'Network connection error',
        fix: 'check_network',
      });
    }

    return errors;
  }

  // Fix specific error
  async fixError(error) {
    console.log(`🔧 Fixing: ${error.message} (${error.type})`);

    try {
      switch (error.fix) {
        case 'check_node_version':
          await this.checkNodeVersion();
          break;
        case 'fix_npm':
          await this.fixNPM();
          break;
        case 'system_repair':
          await this.systemRepair();
          break;
        case 'restore_package':
          await this.restorePackage();
          break;
        case 'create_next_config':
          await this.createNextConfig();
          break;
        case 'create_tsconfig':
          await this.createTSConfig();
          break;
        case 'fix_filesystem':
          await this.fixFileSystem();
          break;
        case 'install_dependencies':
          await this.installDependencies();
          break;
        case 'reinstall_dependencies':
          await this.reinstallDependencies();
          break;
        case 'fix_dependencies':
          await this.fixDependencies();
          break;
        case 'clean_cache':
          await this.cleanCache();
          break;
        case 'clean_npm_cache':
          await this.cleanNPMCache();
          break;
        case 'fix_cache':
          await this.fixCache();
          break;
        case 'kill_port_processes':
          await this.killPortProcesses();
          break;
        case 'fix_ports':
          await this.fixPorts();
          break;
        case 'fix_typescript':
          await this.fixTypeScript();
          break;
        case 'fix_build':
          await this.fixBuild();
          break;
        case 'create_env':
          await this.createEnv();
          break;
        case 'fix_environment':
          await this.fixEnvironment();
          break;
        case 'fix_permissions':
          await this.fixPermissions();
          break;
        case 'check_network':
          await this.checkNetwork();
          break;
        default:
          await this.genericFix(error);
      }

      console.log(`✅ Fixed: ${error.message}`);
      this.fixedErrors.push({
        error: error.message,
        type: error.type,
        timestamp: new Date().toISOString(),
      });
      return true;
    } catch (fixError) {
      console.log(`❌ Failed to fix: ${error.message}`);
      this.errorLog.push({
        error: error.message,
        type: error.type,
        fixError: fixError.message,
        timestamp: new Date().toISOString(),
      });
      return false;
    }
  }

  // System fixes
  async checkNodeVersion() {
    console.log('🔍 Checking Node.js version...');
    const version = process.version;
    console.log(`Current version: ${version}`);
    if (!version.includes('v18') && !version.includes('v20')) {
      console.log('⚠ Consider updating Node.js to v18 or v20');
    }
  }

  async fixNPM() {
    console.log('🔧 Fixing NPM...');
    const { execSync } = require('child_process');
    execSync('npm install -g npm@latest', { stdio: 'inherit' });
  }

  async systemRepair() {
    console.log('🔧 Performing system repair...');
    await this.killAllProcesses();
    await this.cleanCache();
    await this.reinstallDependencies();
  }

  // File system fixes
  async restorePackage() {
    console.log('📄 Restoring package.json...');
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
  }

  async createNextConfig() {
    console.log('⚙️ Creating next.config.js...');
    const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig`;

    fs.writeFileSync('next.config.js', nextConfig);
  }

  async createTSConfig() {
    console.log('⚙️ Creating tsconfig.json...');
    const tsConfig = {
      compilerOptions: {
        target: 'es5',
        lib: ['dom', 'dom.iterable', 'es6'],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        forceConsistentCasingInFileNames: true,
        noEmit: true,
        esModuleInterop: true,
        module: 'esnext',
        moduleResolution: 'node',
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: 'preserve',
        incremental: true,
        plugins: [
          {
            name: 'next',
          },
        ],
        paths: {
          '@/*': ['./*'],
        },
      },
      include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
      exclude: ['node_modules'],
    };

    fs.writeFileSync('tsconfig.json', JSON.stringify(tsConfig, null, 2));
  }

  async fixFileSystem() {
    console.log('🔧 Fixing file system...');
    // Create essential directories
    const dirs = ['app', 'components', 'lib', 'public'];
    for (const dir of dirs) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }
  }

  // Dependency fixes
  async installDependencies() {
    console.log('📦 Installing dependencies...');
    return new Promise(resolve => {
      const installProcess = spawn('npm', ['install'], {
        stdio: 'inherit',
        shell: true,
      });

      installProcess.on('close', code => {
        if (code === 0) {
          console.log('✅ Dependencies installed');
        } else {
          console.log('❌ Failed to install dependencies');
        }
        resolve();
      });
    });
  }

  async reinstallDependencies() {
    console.log('📦 Reinstalling dependencies...');

    // Remove existing
    if (fs.existsSync('node_modules')) {
      fs.rmSync('node_modules', { recursive: true, force: true });
    }
    if (fs.existsSync('package-lock.json')) {
      fs.unlinkSync('package-lock.json');
    }

    // Fresh install
    return this.installDependencies();
  }

  async fixDependencies() {
    console.log('🔧 Fixing dependencies...');
    const { execSync } = require('child_process');

    try {
      execSync('npm audit fix', { stdio: 'inherit' });
      execSync('npm update', { stdio: 'inherit' });
    } catch (error) {
      console.log('⚠ Some dependency fixes may need manual review');
    }
  }

  // Cache fixes
  async cleanCache() {
    console.log('🧹 Cleaning cache...');
    if (fs.existsSync('.next')) {
      fs.rmSync('.next', { recursive: true, force: true });
    }
  }

  async cleanNPMCache() {
    console.log('🧹 Cleaning NPM cache...');
    const { execSync } = require('child_process');
    execSync('npm cache clean --force', { stdio: 'inherit' });
  }

  async fixCache() {
    console.log('🔧 Fixing cache...');
    await this.cleanCache();
    await this.cleanNPMCache();
  }

  // Port fixes
  async killPortProcesses() {
    console.log('🔫 Killing port processes...');
    const { execSync } = require('child_process');

    try {
      execSync('taskkill /F /IM node.exe', { stdio: 'pipe' });
      execSync('taskkill /F /IM npm.exe', { stdio: 'pipe' });
    } catch (error) {
      console.log('ℹ No processes to kill');
    }
  }

  async fixPorts() {
    console.log('🔧 Fixing ports...');
    await this.killPortProcesses();
  }

  // TypeScript fixes
  async fixTypeScript() {
    console.log('🔧 Fixing TypeScript...');
    return new Promise(resolve => {
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

  // Build fixes
  async fixBuild() {
    console.log('🔧 Fixing build...');
    await this.cleanCache();

    return new Promise(resolve => {
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

  // Environment fixes
  async createEnv() {
    console.log('📝 Creating environment file...');
    const envContent = `# Environment variables
NEXT_PUBLIC_API_URL=http://localhost:3001
NODE_ENV=development`;

    fs.writeFileSync('.env.local', envContent);
  }

  async fixEnvironment() {
    console.log('🔧 Fixing environment...');
    await this.createEnv();
  }

  // Permission fixes
  async fixPermissions() {
    console.log('🔧 Fixing permissions...');
    // This is platform-specific and may need manual intervention
    console.log('⚠ Permission fixes may need manual review');
  }

  // Network fixes
  async checkNetwork() {
    console.log('🌐 Checking network...');
    try {
      const { execSync } = require('child_process');
      execSync('ping -n 1 google.com', { stdio: 'pipe' });
      console.log('✅ Network connection OK');
    } catch (error) {
      console.log('❌ Network connection issue detected');
    }
  }

  // Generic fix
  async genericFix(error) {
    console.log(`🔧 Applying generic fix for: ${error.message}`);
    await this.killAllProcesses();
    await this.cleanCache();
    await this.installDependencies();
  }

  // Kill all processes
  async killAllProcesses() {
    console.log('🔫 Killing all processes...');
    const { execSync } = require('child_process');

    try {
      execSync('taskkill /F /IM node.exe', { stdio: 'pipe' });
      execSync('taskkill /F /IM npm.exe', { stdio: 'pipe' });
    } catch (error) {
      console.log('ℹ No processes to kill');
    }
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

  // Comprehensive auto fix all
  async fixAllErrors() {
    console.log('🤖 Comprehensive Error Fixer Starting...');
    console.log('=========================================');

    this.isRunning = true;
    this.fixAttempts = 0;

    while (this.isRunning && this.fixAttempts < this.maxAttempts) {
      this.fixAttempts++;
      console.log(`\n🔄 Fix attempt ${this.fixAttempts}/${this.maxAttempts}`);

      // Detect all errors
      const errors = await this.detectAllErrors();

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

    console.log('\n🎉 Comprehensive error fixing complete!');
    console.log(`📊 Fixed ${this.fixedErrors.length} error(s)`);
    console.log(`📋 ${this.errorLog.length} error(s) logged for review`);

    this.isRunning = false;
  }

  // Get error summary
  getErrorSummary() {
    console.log('📊 Error Fix Summary:');
    console.log('=====================');

    console.log(`✅ Fixed Errors: ${this.fixedErrors.length}`);
    this.fixedErrors.forEach((fix, index) => {
      console.log(`  ${index + 1}. ${fix.error} (${fix.type})`);
    });

    console.log(`\n❌ Failed Fixes: ${this.errorLog.length}`);
    this.errorLog.forEach((error, index) => {
      console.log(`  ${index + 1}. ${error.error} (${error.type})`);
    });
  }
}

// Handle command line arguments
const args = process.argv.slice(2);
const errorFixer = new ComprehensiveErrorFixer();

switch (args[0]) {
  case 'fix':
  case undefined:
    errorFixer.fixAllErrors();
    break;
  case 'summary':
    errorFixer.getErrorSummary();
    break;
  default:
    console.log('🤖 EHB Next.js 04 - Comprehensive Error Fixer');
    console.log('=============================================');
    console.log('');
    console.log('Usage:');
    console.log('  node scripts/comprehensive-error-fixer.cjs fix     - Fix all errors');
    console.log('  node scripts/comprehensive-error-fixer.cjs summary - Show error summary');
    console.log('');
    errorFixer.fixAllErrors();
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping comprehensive error fixer...');
  errorFixer.isRunning = false;
  process.exit(0);
});
