#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');

// Configuration
const DASHBOARD_URL = 'http://localhost:3000/ehb-dashboard';
const WAIT_TIME = 3000; // Wait 3 seconds for server to be ready

console.log('🚀 Auto-opening EHB Dashboard...');

// Function to check if server is running
function checkServer() {
  return new Promise((resolve) => {
    exec(`curl -s -o /dev/null -w "%{http_code}" ${DASHBOARD_URL}`, (error, stdout) => {
      const statusCode = stdout.trim();
      resolve(statusCode === '200');
    });
  });
}

// Function to open browser
function openBrowser(url) {
  const platform = process.platform;
  let command;

  switch (platform) {
    case 'darwin': // macOS
      command = `open "${url}"`;
      break;
    case 'linux':
      // Try different browsers available on Linux
      command = `command -v google-chrome >/dev/null 2>&1 && google-chrome "${url}" || ` +
                `command -v firefox >/dev/null 2>&1 && firefox "${url}" || ` +
                `command -v chromium-browser >/dev/null 2>&1 && chromium-browser "${url}" || ` +
                `command -v xdg-open >/dev/null 2>&1 && xdg-open "${url}" || ` +
                `echo "No suitable browser found"`;
      break;
    case 'win32': // Windows
      command = `start "${url}"`;
      break;
    default:
      console.log('❌ Unsupported platform:', platform);
      return false;
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log('❌ Error opening browser:', error.message);
      return;
    }
    console.log('✅ Browser opened successfully!');
    console.log('🌐 Dashboard URL:', url);
  });

  return true;
}

// Function to wait and retry
async function waitAndRetry(retries = 5) {
  for (let i = 0; i < retries; i++) {
    console.log(`🔍 Checking server (attempt ${i + 1}/${retries})...`);
    
    const isServerReady = await checkServer();
    
    if (isServerReady) {
      console.log('✅ Server is ready!');
      console.log('🌐 Opening EHB Dashboard in browser...');
      
      // Wait a bit more for complete loading
      setTimeout(() => {
        openBrowser(DASHBOARD_URL);
      }, 1000);
      
      return true;
    }
    
    if (i < retries - 1) {
      console.log(`⏳ Server not ready, waiting ${WAIT_TIME/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, WAIT_TIME));
    }
  }
  
  console.log('❌ Server is not responding after', retries, 'attempts');
  console.log('📝 Make sure the development server is running with: npm run dev');
  console.log('🌐 Then manually open:', DASHBOARD_URL);
  return false;
}

// Main execution
async function main() {
  console.log('📊 EHB Dashboard Auto-Opener');
  console.log('=' .repeat(50));
  
  const success = await waitAndRetry();
  
  if (success) {
    console.log('🎉 Dashboard opened successfully!');
    console.log('');
    console.log('📋 Dashboard Features:');
    console.log('  • 700+ Services Overview');
    console.log('  • Real-time Statistics');
    console.log('  • Quick Actions Panel');
    console.log('  • Featured Services Display');
    console.log('  • Recent Activity Feed');
    console.log('  • Personal Summary Card');
    console.log('');
    console.log('🔗 Direct URL:', DASHBOARD_URL);
  }
}

// Run the script
main().catch(console.error);