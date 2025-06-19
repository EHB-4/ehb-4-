#!/usr/bin/env node
// ehb-optimize.js
// System & Project Optimization Script (Urdu/Hindi)

const { execSync, exec } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const LOG_FILE = 'optimize-log.txt';
function log(msg) {
  fs.appendFileSync(LOG_FILE, `[${new Date().toLocaleString()}] ${msg}\n`);
}
function print(msg) {
  console.log(msg);
  log(msg);
}

// 1. Heavy/background processes list karo (Windows only)
function listHeavyProcesses() {
  print('\n[1] Background/Heavy Processes:');
  if (os.platform() === 'win32') {
    try {
      const out = execSync('wmic process get Description,WorkingSetSize', { encoding: 'utf-8' });
      const lines = out.split('\n').slice(1);
      let heavy = [];
      for (let line of lines) {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 2) {
          const mem = parseInt(parts[parts.length - 1], 10);
          const name = parts.slice(0, -1).join(' ');
          if (mem > 200 * 1024 * 1024) {
            // >200MB
            heavy.push({ name, mem });
          }
        }
      }
      if (heavy.length) {
        print('⚠️  Ye processes bohat RAM use kar rahe hain (band kar dein agar zaroori na ho):');
        heavy.forEach(p => print(`  ${p.name} (${(p.mem / 1024 / 1024).toFixed(1)} MB)`));
      } else {
        print('✅ Koi heavy background process nahi mila.');
      }
    } catch (e) {
      print('⚠️  Processes list nahi ho saki.');
    }
  } else {
    print('⚠️  Sirf Windows par process list ki ja sakti hai.');
  }
}

// 2. Project folder me heavy files scan karo
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

// 3. node_modules, .next, .git ko Defender/Antivirus se exclude karne ki yaad de
function checkExcludeFolders() {
  print('\n[3] Defender/Antivirus Exclusion:');
  const folders = ['node_modules', '.next', '.git'];
  let found = false;
  for (const f of folders) {
    if (fs.existsSync(f)) {
      print(
        `⚠️  Folder "${f}" mil gaya. Isay Windows Defender/Antivirus ki scanning se exclude kar dein.`
      );
      found = true;
    }
  }
  if (!found) print('✅ Exclude karne layak folder nahi mila ya already excluded hain.');
}

// 4. Node.js version check karo
function checkNodeVersion() {
  const version = process.version;
  print(`\n[4] Node.js version: ${version}`);
  if (!version.startsWith('v18') && !version.startsWith('v20')) {
    print('⚠️  Node.js v18 ya v20 use karein. Dusri version pe issues aa sakte hain.');
  } else {
    print('✅ Node.js version sahi hai.');
  }
}

// 5. Internet speed check karo (ping google.com)
function checkInternetSpeed() {
  print('\n[5] Internet Speed Check:');
  exec('ping -n 2 google.com', (err, stdout, stderr) => {
    if (err) {
      print('⚠️  Internet ya Google.com se connection nahi ho raha. Internet check karein.');
    } else {
      const match = stdout.match(/Average = (\d+)ms/);
      if (match && parseInt(match[1], 10) < 150) {
        print('✅ Internet speed theek hai.');
      } else {
        print('⚠️  Internet slow lag raha hai. Fast connection use karein.');
      }
    }
    // 6. Cursor/AI agent update reminder
    print('\n[6] Cursor/AI Agent Update:');
    print(
      '⚠️  Cursor/AI agent ko latest version par update rakhein. (Aksar updates se speed improve hoti hai)'
    );
    print('\n--- Optimization Complete ---');
    print(
      'Agar koi ⚠️ warning hai, us par amal karein. Baaki sab sahi hai to project fast chalega.'
    );
    print('Tafseeli report optimize-log.txt me hai.');
  });
}

// Main
fs.writeFileSync(LOG_FILE, 'EHB Optimize Log\n================\n');
print('EHB Project/PC Optimization Tool (Windows)\n');
listHeavyProcesses();
print('\n[2] Project Folder Heavy Files:');
const heavy = checkHeavyFiles('.', []);
if (heavy.length) {
  print('⚠️  Ye files bohat heavy hain (delete ya move kar dein):');
  heavy.forEach(f => print(`  ${f.file} (${(f.size / 1024 / 1024).toFixed(1)} MB)`));
} else {
  print('✅ Koi heavy file nahi mili.');
}
checkExcludeFolders();
checkNodeVersion();
checkInternetSpeed();
