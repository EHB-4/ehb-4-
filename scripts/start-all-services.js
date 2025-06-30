#!/usr/bin/env node

/**
 * Start All EHB Services
 * Simple script to start all services with proper error handling
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const services = [
  { name: 'EHB Home', script: 'dev:home', port: 3000 },
  { name: 'EHB Backend', script: 'dev:backend', port: 8000 },
  { name: 'Development Portal', script: 'dev:portal', port: 8080 },
  { name: 'Admin Panel', script: 'dev:admin', port: 5000 },
];

console.log('🚀 Starting all EHB services...\n');

let startedCount = 0;

services.forEach((service, index) => {
  setTimeout(() => {
    console.log(`📡 Starting ${service.name} on port ${service.port}...`);

    const child = spawn('npm', ['run', service.script], {
      stdio: 'pipe',
      shell: true,
      detached: false,
    });

    child.stdout.on('data', data => {
      const output = data.toString().trim();
      if (output.includes('Ready') || output.includes('Started') || output.includes('listening')) {
        console.log(`✅ ${service.name} is running on port ${service.port}`);
        startedCount++;

        if (startedCount === services.length) {
          console.log('\n🎉 All services started successfully!');
          console.log('\n📋 Service URLs:');
          console.log('🏠 EHB Home: http://localhost:3000');
          console.log('🔧 EHB Backend: http://localhost:8000');
          console.log('🚀 Development Portal: http://localhost:8080');
          console.log('⚙️ Admin Panel: http://localhost:5000');
        }
      }
    });

    child.stderr.on('data', data => {
      const error = data.toString().trim();
      if (error.includes('EADDRINUSE')) {
        console.log(`❌ Port ${service.port} is already in use for ${service.name}`);
      } else if (error.includes('Error')) {
        console.log(`❌ Error starting ${service.name}: ${error}`);
      }
    });

    child.on('close', code => {
      if (code !== 0) {
        console.log(`⚠️ ${service.name} exited with code ${code}`);
      }
    });
  }, index * 2000); // Start each service with 2 second delay
});

// Keep the script running
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping all services...');
  process.exit(0);
});
