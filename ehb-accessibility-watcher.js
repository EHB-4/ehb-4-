#!/usr/bin/env node
// ehb-accessibility-watcher.js
// Watches .tsx/.jsx files and auto-runs accessibility fixer (Urdu/Hindi)

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const LOG_FILE = 'accessibility-watcher-log.txt';
function log(msg) {
  fs.appendFileSync(LOG_FILE, `[${new Date().toLocaleString()}] ${msg}\n`);
}
function print(msg) {
  console.log(msg);
  log(msg);
}

// Sare .tsx/.jsx files dhoondo (recursive)
function getAllJSXFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllJSXFiles(fullPath, files);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
      files.push(fullPath);
    }
  }
  return files;
}

// Watcher setup
function watchJSXFiles() {
  print('[Watcher] Sare .tsx/.jsx files ko monitor kiya ja raha hai...');
  const files = getAllJSXFiles('.', []);
  files.forEach(file => {
    fs.watchFile(file, { interval: 2000 }, (curr, prev) => {
      if (curr.mtime !== prev.mtime) {
        print(`\n[Watcher] File change detect hui: ${file}`);
        print('ehb-accessibility-fix.js script auto-run ho rahi hai...');
        exec('node ehb-accessibility-fix.js', (err, stdout, stderr) => {
          if (err) {
            print('❌ Accessibility fixer script run nahi ho saki: ' + err.message);
          } else {
            print('✅ Accessibility fixer script run ho gayi. Console/output check karein.');
          }
        });
      }
    });
  });
  print('Har 2 second par .tsx/.jsx files check ho rahi hain.');
}

// Script start
watchJSXFiles();
