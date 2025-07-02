#!/usr/bin/env node

/**
 * Open EHB Home Page NOW
 * Immediately opens http://localhost:3000 in browser
 */

const { exec } = require('child_process');

console.log('🏠 Opening EHB Home Page NOW');
console.log('============================');
console.log('Opening http://localhost:3000 in browser...');
console.log('');

const HOME_URL = 'http://localhost:3000';

// Function to open browser
function openBrowser() {
  const platform = process.platform;
  let command;

  switch (platform) {
    case 'win32':
      command = `start ${HOME_URL}`;
      break;
    case 'darwin':
      command = `open ${HOME_URL}`;
      break;
    default:
      command = `xdg-open ${HOME_URL}`;
  }

  console.log(`🚀 Opening EHB Home Page...`);
  console.log(`📍 ${HOME_URL}`);

  exec(command, error => {
    if (error) {
      console.log(`❌ Failed to open browser: ${error.message}`);
      console.log(`💡 Please manually open: ${HOME_URL}`);
    } else {
      console.log(`✅ EHB Home Page opened in browser!`);
      console.log(`🌐 ${HOME_URL} should now be open`);
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
