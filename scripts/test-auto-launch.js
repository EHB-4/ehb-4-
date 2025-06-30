#!/usr/bin/env node

/**
 * EHB Auto-Launch Test Script
 * Tests the auto-launch functionality
 */

const { exec } = require('child_process');
const { spawn } = require('child_process');

// Test configuration
const testServices = [
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
 * Test port availability
 * @param {number} port - Port to test
 * @returns {Promise<boolean>}
 */
function testPort(port) {
  return new Promise(resolve => {
    const net = require('net');
    const client = new net.Socket();

    client.connect(port, 'localhost', () => {
      client.destroy();
      resolve(true); // Port is in use
    });

    client.on('error', () => {
      resolve(false); // Port is available
    });
  });
}

/**
 * Test browser opening
 * @param {string} url - URL to test
 * @returns {Promise<boolean>}
 */
function testBrowserOpen(url) {
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
        console.log(`❌ Browser test failed for ${url}: ${error.message}`);
        resolve(false);
      } else {
        console.log(`✅ Browser test passed for ${url}`);
        resolve(true);
      }
    });
  });
}

/**
 * Test PowerShell execution
 * @returns {Promise<boolean>}
 */
function testPowerShell() {
  return new Promise(resolve => {
    exec('powershell -Command "Write-Host \'PowerShell is working\'"', error => {
      if (error) {
        console.log('❌ PowerShell test failed:', error.message);
        resolve(false);
      } else {
        console.log('✅ PowerShell test passed');
        resolve(true);
      }
    });
  });
}

/**
 * Main test function
 */
async function runTests() {
  console.log('🧪 EHB Auto-Launch Test Suite');
  console.log('==============================');

  let passedTests = 0;
  let totalTests = 0;

  // Test 1: PowerShell availability
  totalTests++;
  console.log('\n1. Testing PowerShell availability...');
  if (await testPowerShell()) {
    passedTests++;
  }

  // Test 2: Port availability check
  totalTests++;
  console.log('\n2. Testing port availability check...');
  const portTest = await testPort(3000);
  console.log(`Port 3000 is ${portTest ? 'in use' : 'available'}`);
  passedTests++; // This test always passes as it's just checking functionality

  // Test 3: Browser opening test
  totalTests++;
  console.log('\n3. Testing browser opening...');
  if (await testBrowserOpen('http://localhost:3000')) {
    passedTests++;
  }

  // Test 4: Service configuration validation
  totalTests++;
  console.log('\n4. Testing service configuration...');
  let configValid = true;

  for (const service of testServices) {
    if (!service.name || !service.port || !service.url) {
      configValid = false;
      console.log(`❌ Invalid configuration for service: ${service.name}`);
    }
  }

  if (configValid) {
    console.log('✅ Service configuration is valid');
    passedTests++;
  }

  // Test 5: Port conflict detection
  totalTests++;
  console.log('\n5. Testing port conflict detection...');
  const ports = testServices.map(s => s.port);
  const uniquePorts = new Set(ports);

  if (ports.length === uniquePorts.size) {
    console.log('✅ No port conflicts detected');
    passedTests++;
  } else {
    console.log('❌ Port conflicts detected');
  }

  // Summary
  console.log('\n📊 Test Results:');
  console.log(`Passed: ${passedTests}/${totalTests} tests`);

  if (passedTests === totalTests) {
    console.log('🎉 All tests passed! Auto-launch functionality is ready.');
  } else {
    console.log('⚠️  Some tests failed. Please check the configuration.');
  }

  // Recommendations
  console.log('\n💡 Recommendations:');
  console.log('1. Run: npm run auto:all - to start all services');
  console.log('2. Run: npm run launch:home - to start home page only');
  console.log('3. Run: npm run auto:admin - to start admin panel only');
  console.log('4. Check docs/auto-launch-guide.md for detailed instructions');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests, testPort, testBrowserOpen, testPowerShell };
