#!/usr/bin/env node
// ehb-cuda-cudnn-watcher.js
// Watches error logs for CUDA/cuDNN/NVIDIA/DLL errors and auto-runs guide script (Urdu/Hindi)

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const LOG_FILE = 'cuda-cudnn-watcher-log.txt';
function log(msg) {
  fs.appendFileSync(LOG_FILE, `[${new Date().toLocaleString()}] ${msg}\n`);
}
function print(msg) {
  console.log(msg);
  log(msg);
}

// Yeh error patterns hain jo CUDA/cuDNN/NVIDIA/DLL issues dikhate hain
const ERROR_PATTERNS = [
  /cudnn/i,
  /cuda/i,
  /nvidia/i,
  /dll/i,
  /not found/i,
  /missing/i,
  /driver/i,
  /could not load/i,
  /failed to load/i,
];

// Watch karne layak log files
const LOG_FILES = [
  'error.log',
  'agent.log',
  'tf-error.log',
  'autofix-log.txt',
  'tf-docker-fix-log.txt',
  'cuda-cudnn-auto-guide-log.txt',
];

// File watcher setup
function watchLogs() {
  print('[Watcher] CUDA/cuDNN/NVIDIA error logs ko monitor kiya ja raha hai...');
  LOG_FILES.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (!fs.existsSync(filePath)) {
      // Agar file nahi hai, create kar dein (empty)
      fs.writeFileSync(filePath, '');
    }
    fs.watchFile(filePath, { interval: 2000 }, (curr, prev) => {
      if (curr.mtime !== prev.mtime) {
        // File update hui hai
        const content = fs.readFileSync(filePath, 'utf-8');
        for (const pattern of ERROR_PATTERNS) {
          if (pattern.test(content)) {
            print(`\n[Watcher] Error detect hua (${file}): ${pattern}`);
            print('ehb-cuda-cudnn-auto-guide.js script auto-run ho rahi hai...');
            exec('node ehb-cuda-cudnn-auto-guide.js', (err, stdout, stderr) => {
              if (err) {
                print('❌ Guide script run nahi ho saki: ' + err.message);
              } else {
                print('✅ Guide script run ho gayi. Console/output check karein.');
              }
            });
            break;
          }
        }
      }
    });
  });
  print('Har 2 second par log files check ho rahi hain.');
}

// Script start
watchLogs();
