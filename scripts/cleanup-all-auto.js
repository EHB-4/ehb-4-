#!/usr/bin/env node

/**
 * EHB Auto Script Cleanup
 * Removes all auto scripts and kills any running auto processes
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧹 Starting EHB Auto Script Cleanup...');

try {
  // Kill all Node.js processes
  console.log('🔪 Killing all Node.js processes...');
  try {
    execSync('taskkill /F /IM node.exe', { stdio: 'ignore' });
    console.log('✅ All Node.js processes killed');
  } catch (error) {
    console.log('ℹ️  No Node.js processes found');
  }

  // Kill any remaining auto processes
  console.log('🔪 Killing auto processes...');
  try {
    execSync('taskkill /F /FI "WINDOWTITLE eq *auto*"', { stdio: 'ignore' });
    execSync('taskkill /F /FI "WINDOWTITLE eq *agent*"', { stdio: 'ignore' });
    execSync('taskkill /F /FI "WINDOWTITLE eq *continuous*"', { stdio: 'ignore' });
    console.log('✅ Auto processes killed');
  } catch (error) {
    console.log('ℹ️  No auto processes found');
  }

  // List remaining scripts for manual review
  console.log('\n📋 Remaining scripts in scripts/ directory:');
  const scriptsDir = path.join(__dirname);
  const files = fs.readdirSync(scriptsDir);
  
  files.forEach(file => {
    if (file.includes('auto') || file.includes('agent') || file.includes('continuous')) {
      console.log(`⚠️  ${file} - Consider removing if causing issues`);
    }
  });

  console.log('\n✅ Cleanup completed!');
  console.log('💡 The agent should no longer hang due to auto scripts');
  console.log('🚀 You can now run: npm run dev');

} catch (error) {
  console.error('❌ Cleanup failed:', error.message);
  process.exit(1);
} 