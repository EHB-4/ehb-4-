#!/usr/bin/env node

/**
 * EHB Development Portal Auto-Launch Script
 * Starts the development portal service and opens it in browser
 */

const { spawn } = require('child_process');
const { exec } = require('child_process');
const path = require('path');

const SERVICE_CONFIG = {
  name: 'Development Portal',
  port: 8080,
  folder: 'ehb-dev-portal',
  url: 'http://localhost:8080',
};

/**
 * Opens URL in default browser
 * @param {string} url - URL to open
 */
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
      console.error(`❌ Failed to open browser for ${url}:`, error.message);
    } else {
      console.log(`✅ Opened ${url} in browser`);
    }
  });
}

/**
 * Waits for service to be ready
 * @param {number} port - Port to check
 * @returns {Promise<void>}
 */
function waitForService(port) {
  return new Promise(resolve => {
    const checkPort = () => {
      const net = require('net');
      const client = new net.Socket();

      client.connect(port, 'localhost', () => {
        client.destroy();
        console.log(`🚀 ${SERVICE_CONFIG.name} is ready on port ${port}`);
        resolve();
      });

      client.on('error', () => {
        setTimeout(checkPort, 1000);
      });
    };

    checkPort();
  });
}

/**
 * Main function
 */
async function main() {
  console.log('🔧 Starting EHB Development Portal...');

  // Change to service directory if it exists
  const folderPath = path.join(process.cwd(), SERVICE_CONFIG.folder);
  if (require('fs').existsSync(folderPath)) {
    process.chdir(folderPath);
  }

  // Start the service
  const child = spawn('npm', ['run', 'dev', '--', '--port', SERVICE_CONFIG.port.toString()], {
    stdio: 'inherit',
    shell: true,
  });

  // Wait for service to be ready
  await waitForService(SERVICE_CONFIG.port);

  // Open in browser after 2 seconds
  setTimeout(() => {
    openBrowser(SERVICE_CONFIG.url);
  }, 2000);

  child.on('close', code => {
    console.log(`\n🛑 ${SERVICE_CONFIG.name} stopped with code ${code}`);
  });

  child.on('error', error => {
    console.error(`❌ Error starting ${SERVICE_CONFIG.name}:`, error.message);
  });
}

if (require.main === module) {
  main();
}
