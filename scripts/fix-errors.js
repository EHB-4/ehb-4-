#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 EHB Error Fix Script Starting...\n');

try {
  // 1. Clear Next.js cache
  console.log('1️⃣ Clearing Next.js cache...');
  if (fs.existsSync('.next')) {
    execSync('rmdir /s /q .next', { stdio: 'inherit' });
    console.log('✅ Cache cleared');
  }

  // 2. Clear node_modules and reinstall
  console.log('\n2️⃣ Reinstalling dependencies...');
  if (fs.existsSync('node_modules')) {
    execSync('rmdir /s /q node_modules', { stdio: 'inherit' });
  }
  execSync('npm install', { stdio: 'inherit' });

  // 3. Install missing dependencies
  console.log('\n3️⃣ Installing missing dependencies...');
  execSync('npm install postcss tailwindcss autoprefixer --save-dev', { stdio: 'inherit' });
  execSync('npm install react@18.3.1 react-dom@18.3.1 --save', { stdio: 'inherit' });

  // 4. Build the project
  console.log('\n4️⃣ Building project...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('\n✅ All errors fixed! You can now run: npm run dev');
  
} catch (error) {
  console.error('❌ Error during fix process:', error.message);
  process.exit(1);
} 