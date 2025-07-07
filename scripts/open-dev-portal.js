#!/usr/bin/env node

/**
 * Open EHB Development Portal in Browser
 * Opens http://localhost:8080 in browser
 */

const { exec } = require('child_process');

console.log('🔧 Opening EHB Development Portal');
console.log('==================================');
console.log('Opening Development Portal in browser...');
console.log('');

const DEV_PORTAL_URL = 'http://localhost:8080';

// Function to open browser
function openBrowser() {
  const platform = process.platform;
  let command;

  switch (platform) {
    case 'win32':
      command = `start ${DEV_PORTAL_URL}`;
      break;
    case 'darwin':
      command = `open ${DEV_PORTAL_URL}`;
      break;
    default:
      command = `xdg-open ${DEV_PORTAL_URL}`;
  }

  console.log(`🚀 Opening Development Portal...`);
  console.log(`📍 ${DEV_PORTAL_URL}`);

  exec(command, error => {
    if (error) {
      console.log(`❌ Failed to open browser: ${error.message}`);
      console.log(`💡 Please manually open: ${DEV_PORTAL_URL}`);
    } else {
      console.log(`✅ Development Portal opened in browser!`);
      console.log(`🌐 ${DEV_PORTAL_URL} should now be open`);
    }
  });
}

// Open browser immediately
openBrowser();

console.log('');
console.log('💡 If the page shows an error, the service is not running.');
console.log('   Start the service first, then run this script again.');
console.log('');
console.log('🛑 Press Ctrl+C to exit');
