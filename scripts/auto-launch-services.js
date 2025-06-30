#!/usr/bin/env node

/**
 * EHB Auto-Launch Services Script
 * Automatically opens each service in the browser on their respective ports
 */

const { spawn } = require('child_process');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Service configuration
const services = [
  {
    name: 'Home Page',
    port: 3000,
    folder: 'ehb-home',
    command: 'npm run dev -- --port 3000',
    url: 'http://localhost:3000',
  },
  {
    name: 'Admin Panel',
    port: 5000,
    folder: 'ehb-admin-panel',
    command: 'npm run dev -- --port 5000',
    url: 'http://localhost:5000',
  },
  {
    name: 'Development Portal',
    port: 8080,
    folder: 'ehb-dev-portal',
    command: 'npm run dev -- --port 8080',
    url: 'http://localhost:8080',
  },
  {
    name: 'GoSellr',
    port: 4000,
    folder: 'ehb-gosellr',
    command: 'npm run dev -- --port 4000',
    url: 'http://localhost:4000',
  },
];

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
 * Waits for a service to be ready by checking if the port is available
 * @param {number} port - Port to check
 * @param {string} serviceName - Name of the service
 * @returns {Promise<void>}
 */
function waitForService(port, serviceName) {
  return new Promise(resolve => {
    const checkPort = () => {
      const net = require('net');
      const client = new net.Socket();

      client.connect(port, 'localhost', () => {
        client.destroy();
        console.log(`🚀 ${serviceName} is ready on port ${port}`);
        resolve();
      });

      client.on('error', () => {
        setTimeout(checkPort, 1000); // Check again in 1 second
      });
    };

    checkPort();
  });
}

/**
 * Starts a service and opens it in browser
 * @param {Object} service - Service configuration
 */
async function startService(service) {
  console.log(`\n🔄 Starting ${service.name}...`);

  // Check if folder exists
  const folderPath = path.join(process.cwd(), service.folder);
  if (!fs.existsSync(folderPath)) {
    console.log(`⚠️  Folder ${service.folder} not found, skipping...`);
    return;
  }

  // Change to service directory
  process.chdir(folderPath);

  // Start the service
  const child = spawn('npm', ['run', 'dev', '--', '--port', service.port.toString()], {
    stdio: 'inherit',
    shell: true,
  });

  // Wait for service to be ready
  await waitForService(service.port, service.name);

  // Open in browser
  setTimeout(() => {
    openBrowser(service.url);
  }, 2000); // Wait 2 seconds after service is ready

  // Handle process exit
  child.on('close', code => {
    console.log(`\n🛑 ${service.name} stopped with code ${code}`);
  });

  child.on('error', error => {
    console.error(`❌ Error starting ${service.name}:`, error.message);
  });
}

/**
 * Main function to start all services
 */
async function main() {
  console.log('🚀 EHB Auto-Launch Services');
  console.log('============================');

  // Start all services
  const promises = services.map(service => startService(service));

  try {
    await Promise.all(promises);
  } catch (error) {
    console.error('❌ Error starting services:', error.message);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { services, startService, openBrowser };
