#!/usr/bin/env node
// ehb-autofix.js
// Automatic Next.js project fixer for Windows (Urdu/Hindi summary)

const { execSync, exec } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const LOG_FILE = 'autofix-log.txt';
function log(msg) {
  fs.appendFileSync(LOG_FILE, `[${new Date().toLocaleString()}] ${msg}\n`);
}
function print(msg) {
  console.log(msg);
  log(msg);
}

function checkNodeVersion() {
  const version = process.version;
  print(`Node.js version: ${version}`);
  if (!version.startsWith('v18') && !version.startsWith('v20')) {
    print('⚠️  Node.js v18 ya v20 use karein. Dusri version pe issues aa sakte hain.');
  } else {
    print('✅ Node.js version sahi hai.');
  }
}

function runCmd(cmd, desc) {
  print(`\n> ${desc} (${cmd})`);
  try {
    const out = execSync(cmd, { stdio: 'pipe', encoding: 'utf-8' });
    print(out);
    return out;
  } catch (e) {
    print(`⚠️  Error: ${e.message}`);
    if (e.stdout) print(e.stdout);
    if (e.stderr) print(e.stderr);
    return null;
  }
}

function checkAndInstallDeps() {
  if (!fs.existsSync('package.json')) {
    print('❌ package.json nahi mila. Yeh Next.js project nahi lagta.');
    return;
  }
  print('Dependencies install kar rahe hain...');
  runCmd('npm install --legacy-peer-deps', 'npm dependencies install karna');
  print('npm audit fix chala rahe hain...');
  runCmd('npm audit fix --force', 'npm audit fix');
}

function checkHeavyFiles(dir, heavyFiles = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    try {
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        checkHeavyFiles(fullPath, heavyFiles);
      } else if (stat.size > 10 * 1024 * 1024) {
        heavyFiles.push({ file: fullPath, size: stat.size });
      }
    } catch (e) {}
  }
  return heavyFiles;
}

function countFilesAndFolders(dir) {
  let files = 0,
    folders = 0;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    try {
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        folders++;
        const [f, d] = countFilesAndFolders(fullPath);
        files += f;
        folders += d;
      } else {
        files++;
      }
    } catch (e) {}
  }
  return [files, folders];
}

function checkPortConflict(port) {
  if (os.platform() === 'win32') {
    try {
      const out = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf-8' });
      if (out && out.includes('LISTENING')) {
        print(`⚠️  Port ${port} already use ho raha hai. Dusra port try karein (e.g., 3001).`);
        return true;
      }
    } catch (e) {}
  }
  return false;
}

function checkVersions() {
  let pkg = null;
  try {
    pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  } catch (e) {
    print('package.json read nahi ho raha.');
    return;
  }
  const next = pkg.dependencies?.next || pkg.devDependencies?.next;
  const react = pkg.dependencies?.react || pkg.devDependencies?.react;
  const ts = pkg.dependencies?.typescript || pkg.devDependencies?.typescript;
  print(`Next.js: ${next || 'N/A'}, React: ${react || 'N/A'}, TypeScript: ${ts || 'N/A'}`);
  if (next && react) {
    if (next.startsWith('13') && !react.startsWith('18')) {
      print('⚠️  Next.js 13 ke liye React 18 chahiye.');
    }
    if (next.startsWith('14') && !react.startsWith('18')) {
      print('⚠️  Next.js 14 ke liye React 18 chahiye.');
    }
  }
}

function checkConfigFiles() {
  const files = ['package.json', 'next.config.js', '.env'];
  for (const f of files) {
    if (!fs.existsSync(f)) {
      print(`⚠️  Zaroori file missing hai: ${f}`);
    } else {
      print(`✅ ${f} mil gayi.`);
    }
  }
}

function main() {
  fs.writeFileSync(LOG_FILE, 'EHB AutoFix Log\n================\n');
  print('EHB Next.js AutoFix Tool (Windows)\n');
  checkNodeVersion();
  checkConfigFiles();
  checkAndInstallDeps();
  checkVersions();
  print('\nHeavy files (>10MB) check kar rahe hain...');
  const heavy = checkHeavyFiles('.', []);
  if (heavy.length) {
    print('⚠️  Ye files bohat heavy hain:');
    heavy.forEach(f => print(`  ${f.file} (${(f.size / 1024 / 1024).toFixed(1)} MB)`));
  } else {
    print('✅ Koi heavy file nahi mili.');
  }
  print('\nFiles/folders count kar rahe hain...');
  const [files, folders] = countFilesAndFolders('.');
  print(`Total files: ${files}, Total folders: ${folders}`);
  print('\nPort conflicts check kar rahe hain...');
  checkPortConflict(3000);
  checkPortConflict(3001);
  print('\nSab checks complete ho gaye!\n');
  print('--- Urdu/Hindi Summary ---');
  print('1. Node.js version sahi hai ya nahi, check kar liya.');
  print('2. Dependencies install/auto-fix ho gayi.');
  print('3. Heavy files detect kar li.');
  print('4. Files/folders count kar li.');
  print('5. Port conflicts check kar liye.');
  print('6. Zaroori config files check kar li.');
  print('Agar koi ⚠️ warning hai, usko follow karein. Baaki sab sahi hai to project run karein:');
  print('  npm run dev');
  print('Agar phir bhi problem ho, yeh autofix-log.txt file mujhe bhej dein.');
}

main();
