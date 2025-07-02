#!/usr/bin/env node

/**
 * EHB Force Open All Pages in Browser
 * Opens all pages in browser - simple and direct
 */

const { exec } = require('child_process');

console.log('🌐 EHB Force Open All Pages');
console.log('===========================');
console.log('Opening all pages in browser NOW...');
console.log('');

// All pages to open
const pages = [
  { name: '🏠 Home Page', url: 'http://localhost:3000' },
  { name: '⚙️ Admin Panel', url: 'http://localhost:5000' },
  { name: '🔧 Development Portal', url: 'http://localhost:8080' },
  { name: '🛒 GoSellr', url: 'http://localhost:4000' },
];

// Function to open browser
function openInBrowser(url, name) {
  const platform = process.platform;
  let command;

  switch (platform) {
    case 'win32':
      command = `start ${url}`;
      break;
    case 'darwin':
      command = `open ${url}`;
      break;
    default:
      command = `xdg-open ${url}`;
  }

  console.log(`🚀 Opening ${name}...`);
  console.log(`📍 ${url}`);

  exec(command, error => {
    if (error) {
      console.log(`❌ Failed to open ${name}: ${error.message}`);
      console.log(`💡 Try manually: ${url}`);
    } else {
      console.log(`✅ ${name} opened in browser!`);
    }
  });
}

// Open all pages with delay
async function openAllPages() {
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];

    // Open the page
    openInBrowser(page.url, page.name);

    // Wait 1 second before next page
    if (i < pages.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

// Main execution
openAllPages().then(() => {
  console.log('');
  console.log('🎉 All pages opened!');
  console.log('');
  console.log('📋 Pages opened:');
  pages.forEach(page => {
    console.log(`   • ${page.name} - ${page.url}`);
  });
  console.log('');
  console.log('💡 If pages show errors, the services are not running yet.');
  console.log('   Start services first, then run this script again.');
  console.log('');
  console.log('🛑 Press Ctrl+C to exit');
});

// Keep script running
process.on('SIGINT', () => {
  console.log('\n👋 Exiting...');
  process.exit(0);
});
