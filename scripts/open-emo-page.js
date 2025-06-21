#!/usr/bin/env node

const { exec } = require('child_process');
const open = require('open');

console.log('🚀 Opening EMO page in browser...');

// Wait a bit for the dev server to start
setTimeout(async () => {
  try {
    // Open EMO page in default browser
    await open('http://localhost:3000/emo');
    console.log('✅ EMO page opened successfully!');
    console.log('📍 URL: http://localhost:3000/emo');
  } catch (error) {
    console.error('❌ Failed to open EMO page:', error.message);
    console.log('💡 Please manually open: http://localhost:3000/emo');
  }
}, 3000); // Wait 3 seconds for server to start

// Also open the main page
setTimeout(async () => {
  try {
    await open('http://localhost:3000');
    console.log('✅ Main page also opened!');
  } catch (error) {
    console.log('⚠️  Could not open main page');
  }
}, 4000);
