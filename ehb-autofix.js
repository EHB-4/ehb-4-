#!/usr/bin/env node
// ehb-autofix.js
// Advanced Auto-Fix CLI Tool for Next.js/Node.js/Windows Projects
// Usage: node ehb-autofix.js

const inquirer = require('inquirer');
const chalk = require('chalk');
const shell = require('shelljs');
const fs = require('fs-extra');
const path = require('path');

// Utility: Log actions to a file
function logAction(type, message) {
  const logMsg = `[${new Date().toISOString()}] [${type.toUpperCase()}] ${message}\n`;
  fs.appendFileSync('ehb-autofix.log', logMsg);
}

// 1. Node.js Version Check & Suggestion
function checkNodeVersion() {
  const version = process.version;
  if (!version.startsWith('v18') && !version.startsWith('v20')) {
    console.log(chalk.yellow('Warning: Recommended Node.js v18.x or v20.x for Next.js 14.'));
    logAction('warn', 'Node.js version is not recommended.');
    if (shell.which('nvm')) {
      console.log(chalk.cyan('You have nvm. You can switch Node version with: nvm use 18'));
    } else {
      console.log(chalk.cyan('Please install Node.js LTS (v18 or v20) from https://nodejs.org/en/download'));
    }
  } else {
    console.log(chalk.green('Node.js version is OK.'));
    logAction('info', 'Node.js version is OK.');
  }
}

// 2. Port Conflict Detection & Auto-Fix
function checkPort(port = 3000) {
  let portInUse = false;
  if (process.platform === 'win32') {
    portInUse = !!shell.exec(`netstat -ano | findstr :${port}`, { silent: true }).stdout;
  } else {
    portInUse = !!shell.exec(`lsof -i :${port}`, { silent: true }).stdout;
  }
  if (portInUse) {
    console.log(chalk.red(`Port ${port} is in use. Switching to 3001...`));
    logAction('warn', `Port ${port} in use. Switching to 3001.`);
    process.env.PORT = 3001;
    if (fs.existsSync('.env')) {
      let envContent = fs.readFileSync('.env', 'utf-8');
      if (!/PORT=/.test(envContent)) {
        envContent += '\nPORT=3001\n';
      } else {
        envContent = envContent.replace(/PORT=\d+/, 'PORT=3001');
      }
      fs.writeFileSync('.env', envContent);
    } else {
      fs.writeFileSync('.env', 'PORT=3001\n');
    }
    console.log(chalk.green('Port set to 3001 in .env file.'));
    logAction('fix', 'Port set to 3001 in .env file.');
  } else {
    console.log(chalk.green(`Port ${port} is free.`));
    logAction('info', `Port ${port} is free.`);
  }
}

// 3. Dependency Issues Auto-Fix
function fixDependencies() {
  console.log(chalk.blue('Checking/fixing dependencies...'));
  logAction('info', 'Running npm install --legacy-peer-deps');
  shell.exec('npm install --legacy-peer-deps');
  // Optionally: npm audit fix
  shell.exec('npm audit fix');
  logAction('fix', 'Dependencies fixed (npm install & audit fix).');
}

// 4. Config Files Checker & Auto-Repair
function checkConfigFiles() {
  // .env
  if (!fs.existsSync('.env')) {
    fs.writeFileSync('.env', 'PORT=3000\n');
    console.log(chalk.green('.env file created.'));
    logAction('fix', '.env file created.');
  }
  // next.config.js
  if (!fs.existsSync('next.config.js')) {
    fs.writeFileSync('next.config.js', `/** @type {import('next').NextConfig} */\nconst nextConfig = { reactStrictMode: true };\nmodule.exports = nextConfig;\n`);
    console.log(chalk.green('next.config.js created.'));
    logAction('fix', 'next.config.js created.');
  }
  // tsconfig.json
  if (!fs.existsSync('tsconfig.json')) {
    fs.writeFileSync('tsconfig.json', `{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "jsx": "preserve",
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}`);
    console.log(chalk.green('tsconfig.json created.'));
    logAction('fix', 'tsconfig.json created.');
  }
}

// 5. Windows System File Checker
function checkWindowsFiles() {
  if (process.platform === 'win32') {
    const cmdPath = 'C:\\Windows\\System32\\cmd.exe';
    if (!fs.existsSync(cmdPath)) {
      console.log(chalk.red('cmd.exe missing! Please run: sfc /scannow as administrator.'));
      logAction('error', 'cmd.exe missing!');
    } else {
      console.log(chalk.green('cmd.exe is present.'));
      logAction('info', 'cmd.exe is present.');
    }
  }
}

// 6. Next.js/React/TypeScript Version Compatibility Check
function checkPackageVersions() {
  if (!fs.existsSync('package.json')) {
    console.log(chalk.red('package.json not found! Please initialize your project with npm init.'));
    logAction('error', 'package.json not found.');
    return;
  }
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  const checks = [
    { name: 'next', min: '14.0.0' },
    { name: 'react', min: '18.0.0' },
    { name: 'typescript', min: '5.0.0' },
  ];
  checks.forEach(({ name, min }) => {
    if (deps[name]) {
      const ver = deps[name].replace(/[^\d.]/g, '');
      if (ver && ver < min) {
        console.log(chalk.yellow(`${name} version (${ver}) is less than recommended (${min})`));
        logAction('warn', `${name} version (${ver}) is less than recommended (${min})`);
      } else {
        console.log(chalk.green(`${name} version is OK.`));
        logAction('info', `${name} version is OK.`);
      }
    } else {
      console.log(chalk.red(`${name} is not installed!`));
      logAction('error', `${name} is not installed!`);
    }
  });
}

// 7. Common Error Log Parsing (basic)
function parseErrorLogs() {
  const logFiles = ['npm-debug.log', 'next-error.log', 'ehb-autofix.log'];
  logFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf-8');
      if (/EADDRINUSE/.test(content)) {
        console.log(chalk.red('Error: Port already in use detected in logs.')); 
        logAction('error', 'EADDRINUSE found in logs.');
      }
      if (/MODULE_NOT_FOUND/.test(content)) {
        console.log(chalk.red('Error: Module not found detected in logs. Run npm install.'));
        logAction('error', 'MODULE_NOT_FOUND found in logs.');
      }
      // Add more error patterns as needed
    }
  });
}

// 8. Main (Interactive/Auto Mode)
async function main() {
  console.log(chalk.cyan('\nEHB Next.js Auto-Fix Tool (Beginner Friendly)\n'));
  logAction('info', 'Auto-fix tool started.');

  // Interactive/Auto mode
  const { mode } = await inquirer.prompt([
    {
      type: 'list',
      name: 'mode',
      message: 'Choose mode:',
      choices: [
        { name: 'Auto-Fix (Recommended)', value: 'auto' },
        { name: 'Guide Me (Show steps, ask before fixing)', value: 'guide' },
      ],
      default: 'auto',
    },
  ]);

  checkNodeVersion();
  checkPort();
  checkConfigFiles();
  checkWindowsFiles();
  checkPackageVersions();
  parseErrorLogs();

  if (mode === 'auto') {
    fixDependencies();
    console.log(chalk.green('\nAll auto-fixes applied! Try running your app again.\n'));
    logAction('fix', 'All auto-fixes applied.');
  } else {
    const { fixDeps } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'fixDeps',
        message: 'Do you want to auto-fix dependencies?',
        default: true,
      },
    ]);
    if (fixDeps) fixDependencies();
    console.log(chalk.green('\nGuide mode complete! Try running your app again.\n'));
    logAction('info', 'Guide mode complete.');
  }

  console.log(chalk.gray('Log file: ehb-autofix.log'));
}

main(); 