const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Starting auto-fix process...');

try {
  // Fix accessibility issues
  console.log('1️⃣ Running accessibility fixes...');
  execSync('npx ts-node ./scripts/auto-accessibility-fixer.ts', { stdio: 'inherit' });

  // Fix type issues
  console.log('2️⃣ Running type fixes...');
  execSync('npx ts-node ./scripts/auto-type-fixer.ts', { stdio: 'inherit' });

  // Run ESLint fixes
  console.log('3️⃣ Running ESLint fixes...');
  execSync('npx eslint . --fix', { stdio: 'inherit' });

  console.log('✅ All fixes completed successfully!');
} catch (error) {
  console.error('❌ Error during fix process:', error.message);
  process.exit(1);
}
