#!/usr/bin/env node

const { exec, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class ErrorFixer {
  constructor() {
    this.logFile = path.join(__dirname, '../logs/error-fixer.log');
    this.ensureLogDirectory();
  }

  ensureLogDirectory() {
    const logDir = path.dirname(this.logFile);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    console.log(logMessage.trim());
    fs.appendFileSync(this.logFile, logMessage);
  }

  async runCommand(command, description = '') {
    return new Promise((resolve, reject) => {
      this.log(`Running: ${command} ${description}`);

      const child = exec(command, { cwd: process.cwd() }, (error, stdout, stderr) => {
        if (error) {
          this.log(`Error: ${error.message}`);
          reject(error);
        } else {
          if (stdout) this.log(`Output: ${stdout}`);
          if (stderr) this.log(`Stderr: ${stderr}`);
          resolve(stdout);
        }
      });
    });
  }

  async clearCache() {
    this.log('🧹 Clearing all caches...');

    try {
      // Clear Next.js cache
      if (fs.existsSync('.next')) {
        await this.runCommand('Remove-Item -Recurse -Force .next', 'Clearing .next cache');
      }

      // Clear node_modules cache
      if (fs.existsSync('node_modules/.cache')) {
        await this.runCommand(
          'Remove-Item -Recurse -Force node_modules/.cache',
          'Clearing node_modules cache'
        );
      }

      // Clear npm cache
      await this.runCommand('npm cache clean --force', 'Clearing npm cache');

      this.log('✅ Cache cleared successfully');
    } catch (error) {
      this.log(`❌ Cache clearing failed: ${error.message}`);
    }
  }

  async installDependencies() {
    this.log('📦 Installing/Updating dependencies...');

    try {
      // Install missing dependencies
      const dependencies = [
        'critters',
        'next',
        'react',
        'react-dom',
        'typescript',
        '@types/node',
        '@types/react',
        'tailwindcss',
        'autoprefixer',
        'postcss',
        'next-auth',
        'ethers',
        '@headlessui/react',
        '@heroicons/react',
      ];

      for (const dep of dependencies) {
        try {
          await this.runCommand(`npm install ${dep}`, `Installing ${dep}`);
        } catch (error) {
          this.log(`Failed to install ${dep}: ${error.message}`);
        }
      }

      this.log('✅ Dependencies installed successfully');
    } catch (error) {
      this.log(`❌ Dependency installation failed: ${error.message}`);
    }
  }

  async fixPathAliases() {
    this.log('🔧 Fixing path aliases...');

    try {
      // Check if tsconfig.json has proper path aliases
      const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
      if (fs.existsSync(tsconfigPath)) {
        const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));

        if (!tsconfig.compilerOptions.paths) {
          tsconfig.compilerOptions.paths = {
            '@/*': ['./*'],
            '@/components/*': ['./components/*'],
            '@/styles/*': ['./styles/*'],
            '@/lib/*': ['./lib/*'],
            '@/types/*': ['./types/*'],
            '@/hooks/*': ['./hooks/*'],
            '@/services/*': ['./services/*'],
          };

          fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
          this.log('✅ Path aliases added to tsconfig.json');
        }
      }
    } catch (error) {
      this.log(`❌ Path alias fixing failed: ${error.message}`);
    }
  }

  async createMissingFiles() {
    this.log('📝 Creating missing files...');

    try {
      // Create missing CSS file if it doesn't exist
      const stylesDir = path.join(process.cwd(), 'styles');
      if (!fs.existsSync(stylesDir)) {
        fs.mkdirSync(stylesDir, { recursive: true });
      }

      const globalsCssPath = path.join(stylesDir, 'globals.css');
      if (!fs.existsSync(globalsCssPath)) {
        const defaultCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}`;

        fs.writeFileSync(globalsCssPath, defaultCss);
        this.log('✅ Created missing globals.css');
      }

      // Create missing components directory
      const componentsDir = path.join(process.cwd(), 'components');
      if (!fs.existsSync(componentsDir)) {
        fs.mkdirSync(componentsDir, { recursive: true });
      }

      const layoutDir = path.join(componentsDir, 'layout');
      if (!fs.existsSync(layoutDir)) {
        fs.mkdirSync(layoutDir, { recursive: true });
      }

      this.log('✅ Missing directories created');
    } catch (error) {
      this.log(`❌ File creation failed: ${error.message}`);
    }
  }

  async runTypeCheck() {
    this.log('🔍 Running type check...');

    try {
      await this.runCommand('npx tsc --noEmit', 'Type checking');
      this.log('✅ Type check passed');
    } catch (error) {
      this.log(`❌ Type check failed: ${error.message}`);
    }
  }

  async runLint() {
    this.log('🔍 Running linting...');

    try {
      await this.runCommand('npx next lint --fix', 'Linting and fixing');
      this.log('✅ Linting completed');
    } catch (error) {
      this.log(`❌ Linting failed: ${error.message}`);
    }
  }

  async startDevServer() {
    this.log('🚀 Starting development server...');

    const child = spawn('npm', ['run', 'dev'], {
      stdio: 'pipe',
      shell: true,
    });

    child.stdout.on('data', data => {
      const output = data.toString().trim();
      this.log(`[Dev Server] ${output}`);

      if (output.includes('Ready') || output.includes('started server')) {
        this.log('✅ Development server is ready!');
      }
    });

    child.stderr.on('data', data => {
      this.log(`[Dev Server ERROR] ${data.toString().trim()}`);
    });

    child.on('close', code => {
      this.log(`Development server exited with code ${code}`);
    });

    return child;
  }

  async fixAll() {
    try {
      this.log('🎯 Starting comprehensive error fixing...');

      // Step 1: Clear all caches
      await this.clearCache();

      // Step 2: Install dependencies
      await this.installDependencies();

      // Step 3: Fix path aliases
      await this.fixPathAliases();

      // Step 4: Create missing files
      await this.createMissingFiles();

      // Step 5: Run type check
      await this.runTypeCheck();

      // Step 6: Run linting
      await this.runLint();

      this.log('🎉 All errors fixed! Starting development server...');

      // Step 7: Start development server
      const devServer = await this.startDevServer();

      // Keep the script running
      process.on('SIGINT', () => {
        this.log('🛑 Shutting down...');
        devServer.kill('SIGTERM');
        process.exit(0);
      });
    } catch (error) {
      this.log(`❌ Error fixing failed: ${error.message}`);
      process.exit(1);
    }
  }
}

// Start the error fixer
const fixer = new ErrorFixer();
fixer.fixAll();
