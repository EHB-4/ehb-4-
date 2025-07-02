#!/usr/bin/env node

/**
 * EHB Open Port 3000 in Browser
 * Automatically opens http://localhost:3000 in browser
 */

const { exec } = require('child_process');

// Configuration
const PORT = 3000;
const URL = `http://localhost:${PORT}`;
const SERVICE_NAME = '🏠 Home Page';

/**
 * Opens URL in default browser
 * @param {string} url - URL to open
 * @param {string} serviceName - Name of the service
 */
function openBrowser(url, serviceName) {
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

  console.log(`🚀 Opening ${serviceName}...`);
  console.log(`📍 URL: ${url}`);

  exec(command, error => {
    if (error) {
      console.error(`❌ Failed to open ${serviceName}: ${error.message}`);
      console.log('');
      console.log('💡 Manual options:');
      console.log(`   • Open browser and go to: ${url}`);
      console.log(`   • Or run: npm run open:home`);
    } else {
      console.log(`✅ Successfully opened ${serviceName} in browser!`);
      console.log(`🌐 ${url} should now be open in your default browser`);
    }
  });
}

/**
 * Check if port is available
 * @param {number} port - Port to check
 * @returns {Promise<boolean>}
 */
function isPortAvailable(port) {
  return new Promise(resolve => {
    const net = require('net');
    const client = new net.Socket();

    client.connect(port, 'localhost', () => {
      client.destroy();
      resolve(false); // Port is in use (service is running)
    });

    client.on('error', () => {
      resolve(true); // Port is available (service not running)
    });
  });
}

/**
 * Main function
 */
async function main() {
  console.log('🌐 EHB Open Port 3000');
  console.log('=====================');
  console.log('');

  // Check if service is running on port 3000
  const portAvailable = await isPortAvailable(PORT);

  if (portAvailable) {
    console.log(`⚠️  No service detected on port ${PORT}`);
    console.log('💡 Starting service first...');

    // Try to start the service
    const { spawn } = require('child_process');
    const child = spawn('npm', ['run', 'dev', '--', '--port', PORT.toString()], {
      stdio: 'inherit',
      shell: true,
    });

    // Wait a bit for service to start
    setTimeout(async () => {
      const serviceRunning = !(await isPortAvailable(PORT));
      if (serviceRunning) {
        console.log(`✅ Service is now running on port ${PORT}`);
        openBrowser(URL, SERVICE_NAME);
      } else {
        console.log(`❌ Service failed to start on port ${PORT}`);
        console.log('💡 Please start the service manually first');
      }
    }, 5000);
  } else {
    console.log(`✅ Service detected on port ${PORT}`);
    openBrowser(URL, SERVICE_NAME);
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { openBrowser, isPortAvailable };
