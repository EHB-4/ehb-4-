#!/usr/bin/env node
// ehb-watcher.js
// Project folder watcher: Auto-runs ehb-autofix.js on any file change
// Urdu/Hindi comments for beginners

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Yeh function ehb-autofix.js ko chalata hai
function runAutofix() {
  console.log('\n[Watcher] File change detect hui. AutoFix script chala rahe hain...');
  exec('node ehb-autofix.js', (error, stdout, stderr) => {
    if (error) {
      console.log('❌ AutoFix script run nahi ho saki:', error.message);
      return;
    }
    // Agar autofix-log.txt me koi warning ya error hai, usko check karo
    if (fs.existsSync('autofix-log.txt')) {
      const log = fs.readFileSync('autofix-log.txt', 'utf-8');
      if (/⚠️|❌|Error|missing|nahi mila|not found|fix nahi ho/.test(log)) {
        console.log(
          '\n[AutoFix] Kuch errors/warnings fix nahi ho sake. Tafseeli maloomat ke liye autofix-log.txt dekhein.'
        );
      } else {
        // Sab kuch sahi ho gaya, kuch na karo
      }
    }
  });
}

// Project folder ko watch karo (recursive)
function watchProject(dir) {
  fs.watch(dir, { recursive: true }, (eventType, filename) => {
    if (filename && !filename.endsWith('autofix-log.txt')) {
      // Har change par autofix run karo
      runAutofix();
    }
  });
  console.log('[Watcher] Project folder watch ho raha hai. Har file change par AutoFix chalegi.');
}

// Script start
watchProject(process.cwd());
