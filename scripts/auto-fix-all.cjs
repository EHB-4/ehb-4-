const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Starting comprehensive auto-fix process...');

try {
  // Run ESLint fix
  console.log('\n1️⃣ Running ESLint fixes...');
  execSync('npx eslint . --fix', { stdio: 'inherit' });

  // Run TypeScript checks
  console.log('\n2️⃣ Running TypeScript checks...');
  execSync('npx tsc --noEmit', { stdio: 'inherit' });

  // Run Prettier
  console.log('\n3️⃣ Running Prettier formatting...');
  execSync('npx prettier --write "**/*.{ts,tsx,js,jsx,json,md}"', { stdio: 'inherit' });

  // Run accessibility fixes
  console.log('\n4️⃣ Running accessibility fixes...');
  execSync('npx ts-node scripts/auto-accessibility-fixer.ts', { stdio: 'inherit' });

  // Run type fixes
  console.log('\n5️⃣ Running type definition fixes...');
  execSync('npx ts-node scripts/auto-type-fixer.ts', { stdio: 'inherit' });

  console.log('\n✅ All fixes completed successfully!');
} catch (error) {
  console.error('\n❌ Error during fix process:', error.message);
  process.exit(1);
}
