#!/usr/bin/env node

const GitHubAutoPusher = require('./github-auto-push');

console.log('🚀 EHB GitHub Auto-Push System');
console.log('================================');

// Configuration for EHB project
const config = {
  watchPath: '.',
  excludePatterns: [
    'node_modules/**',
    '.git/**',
    'dist/**',
    'build/**',
    '.next/**',
    '*.log',
    'temp-backup/**',
    'logs/**',
    'cypress/videos/**',
    'cypress/screenshots/**',
    'playwright-report/**',
    'test-results/**',
    'cursor-test-results/**',
    'ai-automation/logs/**',
    'ehb-backend/**',
    'ehb-frontend/**',
  ],
  commitMessage: 'EHB Auto-Push: Real-time data update',
  branch: 'main',
  pushInterval: 45000, // 45 seconds
  maxCommitsPerPush: 5,
};

console.log('📋 Configuration:');
console.log(`   Watch Path: ${config.watchPath}`);
console.log(`   Branch: ${config.branch}`);
console.log(`   Push Interval: ${config.pushInterval / 1000} seconds`);
console.log(`   Commit Message: ${config.commitMessage}`);
console.log('');

const autoPusher = new GitHubAutoPusher(config);

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Received SIGINT, shutting down gracefully...');
  autoPusher.stop();
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
  autoPusher.stop();
});

// Start the auto-pusher
autoPusher.init().catch(error => {
  console.error('❌ Failed to initialize auto-pusher:', error);
  console.log('\n💡 Make sure you have:');
  console.log('   1. Git initialized in this directory');
  console.log('   2. GitHub remote origin configured');
  console.log('   3. Proper permissions to push to the repository');
  process.exit(1);
});

// Status monitoring
setInterval(() => {
  const status = autoPusher.getStatus();
  if (status.pendingChanges.length > 0) {
    console.log(`\n📊 Status Update:`);
    console.log(`   Pending Changes: ${status.pendingChanges.length}`);
    console.log(`   Is Pushing: ${status.isPushing}`);
    console.log(`   Total Commits: ${status.commitCount}`);
    console.log(`   Last Push: ${new Date(status.lastPushTime).toLocaleTimeString()}`);
  }
}, 60000); // Status every minute
