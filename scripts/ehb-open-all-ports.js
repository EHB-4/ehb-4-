#!/usr/bin/env node

// EHB Open All Ports Script
// Opens all active/autoStart EHB service ports in the default browser

const { exec } = require('child_process');
const path = require('path');

// List of EHB service ports (add more as needed)
const ports = [
  3001, // EHB Dashboard
  3002, // Admin Panel
  4001, // PSS
  4002, // EDR
  4003, // EMO
  4004, // GoSellr
  5001, // Wallet
  5007, // Blockchain
  4014, // SQL Level
];

function openUrl(url) {
  // Windows: use 'start', Mac: 'open', Linux: 'xdg-open'
  const platform = process.platform;
  let cmd = '';
  if (platform === 'win32') {
    cmd = `start "" "${url}"`;
  } else if (platform === 'darwin') {
    cmd = `open "${url}"`;
  } else {
    cmd = `xdg-open "${url}"`;
  }
  exec(cmd);
}

console.log('🌐 Opening all EHB service ports in browser...');
ports.forEach(port => {
  const url = `http://localhost:${port}`;
  openUrl(url);
  console.log(`➡️  ${url}`);
});

console.log('✅ All EHB service ports opened in your default browser!');
