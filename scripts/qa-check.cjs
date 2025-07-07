#!/usr/bin/env node
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

async function runQualityAssurance() {
  console.log('🧪 Running Quality Assurance...');

  try {
    // Run linting
    console.log('🔍 Running ESLint...');
    await execAsync('npm run lint');

    // Run type checking
    console.log('📝 Running TypeScript check...');
    await execAsync('npx tsc --noEmit');

    // Run unit tests
    console.log('🧪 Running unit tests...');
    await execAsync('npm run mongo-fast');

    // Run E2E tests
    console.log('🌐 Running E2E tests...');
    await execAsync('npx playwright test');

    // Run performance tests
    console.log('⚡ Running performance tests...');
    await execAsync('npm run build');

    console.log('✅ Quality Assurance completed successfully!');
  } catch (error) {
    console.error('❌ Quality Assurance failed:', error.message);
    process.exit(1);
  }
}

runQualityAssurance();
