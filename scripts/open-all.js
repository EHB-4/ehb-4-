#!/usr/bin/env node

// EHB Open All Services in Browser
// Simple script to open all EHB services in browser

const { exec } = require('child_process');

console.log('🌐 Opening all EHB services in browser...');

// Open all services
const urls = [
  'http://localhost:3000', // Home Page
  'http://localhost:5000', // Admin Panel
  'http://localhost:8080', // Development Portal
  'http://localhost:4000', // GoSellr
];

urls.forEach((url, index) => {
  setTimeout(() => {
    const platform = process.platform;
    const command =
      platform === 'win32'
        ? `start ${url}`
        : platform === 'darwin'
          ? `open ${url}`
          : `xdg-open ${url}`;

    exec(command, error => {
      if (error) {
        console.error(`❌ Failed to open ${url}`);
      } else {
        console.log(`✅ Opened ${url}`);
      }
    });
  }, index * 500); // 500ms delay between each
});

console.log('✅ All services opened!');
