#!/usr/bin/env node

/**
 * GoSellr Quick Launcher
 * Automatically opens GoSellr on port 4000 in the browser
 */

const { exec } = require('child_process');
const http = require('http');

console.log('🚀 GoSellr Quick Launcher');
console.log('========================\n');

// Check if port 4000 is available
function checkPort(port) {
  return new Promise(resolve => {
    const server = http.createServer();
    server.listen(port, () => {
      server.close();
      resolve(false); // Port is available (server not running)
    });
    server.on('error', () => {
      resolve(true); // Port is in use (server running)
    });
  });
}

// Open browser
function openBrowser(url) {
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

  exec(command, error => {
    if (error) {
      console.log('❌ Error opening browser:', error.message);
    } else {
      console.log('✅ Browser opened successfully!');
    }
  });
}

// Main function
async function main() {
  console.log('[1/3] Checking if GoSellr server is running...');

  const isRunning = await checkPort(4000);

  if (!isRunning) {
    console.log('❌ GoSellr server is not running on port 4000');
    console.log('');
    console.log('🔧 To start the server, run:');
    console.log('   npm run dev -- --port 4000');
    console.log('');
    console.log('⏳ Waiting for server to start...');
    console.log('   (Press Ctrl+C to cancel)');

    // Wait for server to start
    let attempts = 0;
    const maxAttempts = 30; // 30 seconds

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      attempts++;

      const serverRunning = await checkPort(4000);
      if (serverRunning) {
        console.log('✅ Server detected!');
        break;
      }

      if (attempts % 5 === 0) {
        console.log(`   Still waiting... (${attempts}s)`);
      }
    }

    if (attempts >= maxAttempts) {
      console.log('❌ Server did not start within 30 seconds');
      process.exit(1);
    }
  } else {
    console.log('✅ GoSellr server is running on port 4000');
  }

  console.log('');
  console.log('[2/3] Opening GoSellr in browser...');

  const urls = [
    'http://localhost:4000/gosellr',
    'http://localhost:4000/gosellr/dashboard',
    'http://localhost:4000/gosellr/products',
  ];

  urls.forEach((url, index) => {
    setTimeout(() => {
      openBrowser(url);
      console.log(`   ${index + 1}. ${url}`);
    }, index * 500);
  });

  console.log('');
  console.log('[3/3] GoSellr launched successfully!');
  console.log('');
  console.log('🌐 Access URLs:');
  console.log('   • Main: http://localhost:4000/gosellr');
  console.log('   • Dashboard: http://localhost:4000/gosellr/dashboard');
  console.log('   • Products: http://localhost:4000/gosellr/products');
  console.log('');
  console.log('💡 Tips:');
  console.log('   • Press Ctrl+C to stop the server');
  console.log('   • Use Ctrl+R to refresh the page');
  console.log('   • Check console for any errors');
  console.log('');
}

// Run the script
main().catch(console.error);
