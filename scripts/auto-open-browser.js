#!/usr/bin/env node

/**
 * EHB Auto-Open Browser Script
 * Automatically opens all EHB services in browser
 */

const { exec } = require('child_process');

// Service configurations
const services = [
  {
    name: 'Home Page',
    port: 3000,
    url: 'http://localhost:3000',
  },
  {
    name: 'Admin Panel',
    port: 5000,
    url: 'http://localhost:5000',
  },
  {
    name: 'Development Portal',
    port: 8080,
    url: 'http://localhost:8080',
  },
  {
    name: 'GoSellr',
    port: 4000,
    url: 'http://localhost:4000',
  },
];

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

  exec(command, error => {
    if (error) {
      console.error(`❌ Failed to open ${serviceName}: ${error.message}`);
    } else {
      console.log(`✅ Opened ${serviceName} - ${url}`);
    }
  });
}

/**
 * Waits for a specified time
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise<void>}
 */
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Main function to open all services
 */
async function openAllServices() {
  console.log('🌐 EHB Auto-Open Browser');
  console.log('========================');
  console.log('Opening all services in browser...\n');

  for (const service of services) {
    console.log(`🚀 Opening ${service.name}...`);
    openBrowser(service.url, service.name);

    // Wait 1 second between each browser opening
    await wait(1000);
  }

  console.log('\n✅ All services opened in browser!');
  console.log('\n📋 Services opened:');
  services.forEach(service => {
    console.log(`   • ${service.name} - ${service.url}`);
  });
}

// Run the script
if (require.main === module) {
  openAllServices().catch(console.error);
}

module.exports = { openAllServices, services };
