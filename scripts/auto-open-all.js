#!/usr/bin/env node

/**
 * EHB Auto-Open All Services Script
 * Automatically opens all EHB services in browser including Development Portal
 */

const { exec } = require('child_process');

// All EHB services configuration
const services = [
  {
    name: '🏠 Home Page',
    port: 3000,
    url: 'http://localhost:3000',
    description: 'Main EHB Home Page',
  },
  {
    name: '⚙️ Admin Panel',
    port: 5000,
    url: 'http://localhost:5000',
    description: 'EHB Admin Panel',
  },
  {
    name: '🔧 Development Portal',
    port: 8080,
    url: 'http://localhost:8080',
    description: 'EHB Development Portal',
  },
  {
    name: '🛒 GoSellr',
    port: 4000,
    url: 'http://localhost:4000',
    description: 'EHB GoSellr Platform',
  },
];

/**
 * Opens URL in default browser
 * @param {string} url - URL to open
 * @param {string} serviceName - Name of the service
 * @returns {Promise<boolean>}
 */
function openBrowser(url, serviceName) {
  return new Promise(resolve => {
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
        resolve(false);
      } else {
        console.log(`✅ Opened ${serviceName} - ${url}`);
        resolve(true);
      }
    });
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
  console.log('🌐 EHB Auto-Open All Services');
  console.log('=============================');
  console.log('Opening all EHB services in browser...\n');

  let successCount = 0;
  const totalServices = services.length;

  for (let i = 0; i < services.length; i++) {
    const service = services[i];

    console.log(`🚀 Opening ${service.name} (${i + 1}/${totalServices})...`);
    console.log(`   📍 ${service.url}`);
    console.log(`   📝 ${service.description}`);

    const success = await openBrowser(service.url, service.name);
    if (success) successCount++;

    // Wait 1.5 seconds between each browser opening
    if (i < services.length - 1) {
      console.log('   ⏳ Waiting 1.5 seconds...\n');
      await wait(1500);
    }
  }

  console.log('\n📊 Summary:');
  console.log(`✅ Successfully opened: ${successCount}/${totalServices} services`);

  console.log('\n📋 Services opened:');
  services.forEach((service, index) => {
    console.log(`   ${index + 1}. ${service.name} - ${service.url}`);
  });

  console.log('\n🎉 All EHB services opened in browser!');
  console.log('\n💡 Tips:');
  console.log('   • If services show connection errors, start them first with: npm run auto:all');
  console.log('   • Use Ctrl+Tab to switch between browser tabs');
  console.log('   • Each service runs on its dedicated port');
}

// Run the script
if (require.main === module) {
  openAllServices().catch(console.error);
}

module.exports = { openAllServices, services };
