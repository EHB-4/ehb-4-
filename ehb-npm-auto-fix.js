#!/usr/bin/env node

const { spawn } = require('child_process');
const readline = require('readline');

// Helper to extract missing package name from error
function extractMissingPackage(errorLine) {
  // Common patterns
  const patterns = [
    /Cannot find module '([^']+)'/,
    /Error: Cannot find module '([^']+)'/,
    /Module not found: Error: Can't resolve '([^']+)'/,
    /Error: Can't resolve '([^']+)'/,
    /Error: Cannot find package '([^']+)'/,
    /Error: Cannot find name '([^']+)'/,
    /Module not found: Can't resolve '([^']+)'/,
    /Error: Cannot find module ([^\s]+)/,
  ];
  for (const pattern of patterns) {
    const match = errorLine.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Detect npm command for platform (try all common Windows variants)
function getNpmCmd() {
  if (process.platform === 'win32') {
    // Try npm.cmd, npm.exe, then npm
    const { existsSync } = require('fs');
    const { join } = require('path');
    const pathDirs = process.env.PATH.split(';');
    for (const dir of pathDirs) {
      if (existsSync(join(dir, 'npm.cmd'))) return 'npm.cmd';
      if (existsSync(join(dir, 'npm.exe'))) return 'npm.exe';
      if (existsSync(join(dir, 'npm'))) return 'npm';
    }
    // Fallback
    return 'npm.cmd';
  } else {
    return 'npm';
  }
}
const npmCmd = getNpmCmd();
const cmdArgs = process.argv.slice(2);
console.log(`\x1b[36m[START]\x1b[0m Running: ${npmCmd} ${cmdArgs.join(' ')}`);

function runNpmCommand(cmdArgs, onDone) {
  let child;
  try {
    child = spawn(npmCmd, cmdArgs, { stdio: ['inherit', 'pipe', 'pipe'] });
  } catch (err) {
    console.error(
      `\x1b[31m[ERROR]\x1b[0m Failed to spawn npm. Make sure npm is in your PATH.\nAdd C:\\Program Files\\nodejs\\ to your PATH and restart your terminal.\nError:`,
      err
    );
    process.exit(1);
  }
  let errorLines = [];
  let foundMissing = null;

  const rlOut = readline.createInterface({ input: child.stdout });
  const rlErr = readline.createInterface({ input: child.stderr });

  rlOut.on('line', line => {
    console.log(line);
  });
  rlErr.on('line', line => {
    console.error(line);
    if (!foundMissing) {
      const missing = extractMissingPackage(line);
      if (missing) {
        foundMissing = missing;
      }
    }
    errorLines.push(line);
  });

  child.on('close', code => {
    rlOut.close();
    rlErr.close();
    onDone(code, foundMissing, errorLines);
  });
}

function autoFixNpm(cmdArgs) {
  runNpmCommand(cmdArgs, async (code, missing, errorLines) => {
    if (code === 0) {
      console.log('\x1b[32m[SUCCESS]\x1b[0m NPM command completed successfully!');
      return;
    }
    if (missing) {
      console.log(`\x1b[33m[INFO]\x1b[0m Missing package detected: ${missing}`);
      console.log(`\x1b[34m[ACTION]\x1b[0m Installing: ${missing} ...`);
      // Try to install as a regular dependency first
      const install = spawn('npm', ['install', missing]);
      install.stdout.on('data', data => process.stdout.write(data));
      install.stderr.on('data', data => process.stderr.write(data));
      install.on('close', installCode => {
        if (installCode === 0) {
          console.log(`\x1b[32m[SUCCESS]\x1b[0m Installed ${missing}. Retrying npm command...`);
          autoFixNpm(cmdArgs);
        } else {
          console.error(
            `\x1b[31m[ERROR]\x1b[0m Failed to install ${missing}. Please install manually.`
          );
        }
      });
    } else {
      console.error('\x1b[31m[ERROR]\x1b[0m NPM command failed. See errors above.');
      process.exit(code);
    }
  });
}

// Main
if (process.argv.length < 3) {
  console.log('Usage: node ehb-npm-auto-fix.js <npm command and args>');
  console.log('Example: node ehb-npm-auto-fix.js run dev');
  process.exit(1);
}

autoFixNpm(cmdArgs);
