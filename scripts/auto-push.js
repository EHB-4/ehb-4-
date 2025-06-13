const { exec } = require('child_process');
const chokidar = require('chokidar');
const path = require('path');
const os = require('os');
const fs = require('fs');

// Configuration
const WATCH_PATHS = [
  'app/**/*',
  'components/**/*',
  'lib/**/*',
  'pages/**/*',
  'public/**/*',
  'styles/**/*',
  'types/**/*',
  'middleware/**/*',
  'services/**/*',
  'hooks/**/*',
  'models/**/*',
  'prisma/**/*',
  'docs/**/*',
  'scripts/**/*',
  'cypress/**/*',
  '*.js',
  '*.ts',
  '*.tsx',
  '*.jsx',
  '*.json',
  '*.md',
  '*.css',
  '*.scss'
];

// Ignore paths
const IGNORE_PATHS = [
  'node_modules/**',
  '.next/**',
  '.git/**',
  'coverage/**',
  'cypress/videos/**',
  'cypress/screenshots/**',
  'dist/**',
  'build/**',
  '**/*.log',
  '**/*.lock',
  '**/.DS_Store'
];

// Configuration
const DEBOUNCE_DELAY = 500;
const PULL_INTERVAL = 30000; // Check for remote changes every 30 seconds
const MAX_CONCURRENT_OPERATIONS = os.cpus().length;
const BATCH_CHANGES = true;

// Track operations
let isPushInProgress = false;
let isPullInProgress = false;
let pendingChanges = false;
let changedFiles = new Set();
let lastPushTime = Date.now();
let lastPullTime = Date.now();
let consecutivePushes = 0;
let forcePushNeeded = false;

// Performance monitoring
const performanceMetrics = {
  totalPushes: 0,
  totalPulls: 0,
  totalFilesChanged: 0,
  totalPushTime: 0,
  totalPullTime: 0,
  averagePushTime: 0,
  averagePullTime: 0,
  fastestPush: Infinity,
  slowestPush: 0,
  fastestPull: Infinity,
  slowestPull: 0,
  lastPushTime: 0,
  lastPullTime: 0,
  startTime: Date.now(),
  cpuUsage: [],
  memoryUsage: [],
  pushHistory: [],
  pullHistory: []
};

// Log performance stats
function logPerformanceStats() {
  const uptime = (Date.now() - performanceMetrics.startTime) / 1000;
  const memoryUsed = process.memoryUsage().heapUsed / 1024 / 1024;
  const cpuCount = os.cpus().length;
  
  console.log('\n📊 ===== AUTO-SYNC PERFORMANCE STATS =====');
  console.log(`⏱️  Uptime: ${Math.floor(uptime / 60)}m ${Math.floor(uptime % 60)}s`);
  console.log(`🔄 Total pushes: ${performanceMetrics.totalPushes}`);
  console.log(`⬇️  Total pulls: ${performanceMetrics.totalPulls}`);
  console.log(`📝 Total files processed: ${performanceMetrics.totalFilesChanged}`);
  console.log(`⚡ Average push time: ${performanceMetrics.averagePushTime.toFixed(2)}ms`);
  console.log(`⬇️  Average pull time: ${performanceMetrics.averagePullTime.toFixed(2)}ms`);
  console.log(`🚀 Fastest push: ${performanceMetrics.fastestPush < Infinity ? performanceMetrics.fastestPush.toFixed(2) + 'ms' : 'N/A'}`);
  console.log(`⬇️  Fastest pull: ${performanceMetrics.fastestPull < Infinity ? performanceMetrics.fastestPull.toFixed(2) + 'ms' : 'N/A'}`);
  console.log(`💾 Memory usage: ${memoryUsed.toFixed(2)}MB`);
  console.log(`💻 CPU cores: ${cpuCount}`);
  console.log('📊 ===============================================\n');
}

// Execute command
function executeCommand(command) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    exec(command, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
      const execTime = Date.now() - startTime;
      if (error) {
        console.error(`❌ Command failed (${execTime}ms): ${command}`);
        console.error(`Error: ${error.message}`);
        if (stderr) console.error(`stderr: ${stderr}`);
        reject(error);
        return;
      }
      console.log(`✓ Command completed in ${execTime}ms: ${command.slice(0, 40)}${command.length > 40 ? '...' : ''}`);
      resolve(stdout);
    });
  });
}

// Pull changes from remote
async function pullChanges() {
  if (isPullInProgress) {
    return;
  }

  const now = Date.now();
  const timeSinceLastPull = now - lastPullTime;
  if (timeSinceLastPull < 10000) {
    return;
  }

  const pullStartTime = Date.now();
  
  try {
    isPullInProgress = true;
    console.log('⬇️  Checking for remote changes...');
    
    const status = await executeCommand('git fetch origin');
    const diff = await executeCommand('git diff main origin/main');
    
    if (!diff.trim()) {
      console.log('✓ No remote changes found');
      isPullInProgress = false;
      return;
    }
    
    console.log('⬇️  Pulling remote changes...');
    await executeCommand('git pull origin main --no-verify');
    
    lastPullTime = Date.now();
    const pullTime = Date.now() - pullStartTime;
    
    performanceMetrics.totalPulls++;
    performanceMetrics.totalPullTime += pullTime;
    performanceMetrics.averagePullTime = performanceMetrics.totalPullTime / performanceMetrics.totalPulls;
    performanceMetrics.fastestPull = Math.min(performanceMetrics.fastestPull, pullTime);
    performanceMetrics.lastPullTime = pullTime;
    
    console.log(`✅ Successfully pulled changes in ${pullTime}ms`);
    
    // Refresh Cursor IDE
    console.log('🔄 Refreshing Cursor IDE...');
    // Add Cursor refresh logic here if available
    
  } catch (error) {
    console.error('❌ Error pulling changes:', error.message);
  } finally {
    isPullInProgress = false;
  }
}

// Push changes
async function pushChanges() {
  if (isPushInProgress) {
    pendingChanges = true;
    return;
  }
  
  const now = Date.now();
  const timeSinceLastPush = now - lastPushTime;
  if (timeSinceLastPush < 10000 && consecutivePushes > 5) {
    console.log('⏱️ Rate limiting active, delaying push...');
    setTimeout(pushChanges, 5000);
    return;
  }
  
  const pushStartTime = Date.now();
  let fileCount = 0;
  
  try {
    isPushInProgress = true;
    console.log('🚀 Fast-pushing changes to GitHub...');
    
    const status = await executeCommand('git status --porcelain');
    
    if (!status.trim()) {
      console.log('✓ No changes to commit');
      isPushInProgress = false;
      return;
    }
    
    fileCount = status.split('\n').filter(line => line.trim()).length;
    console.log(`📊 Processing ${fileCount} changed files`);
    
    await executeCommand('git add -A');
    
    const timestamp = new Date().toISOString();
    await executeCommand(`git commit -m "⚡ Auto-push: ${timestamp}" --no-verify`);
    
    try {
      if (forcePushNeeded) {
        console.log('🔄 Force pushing changes...');
        await executeCommand('git push -f origin main --no-verify');
        forcePushNeeded = false;
      } else {
        await executeCommand('git push origin main --no-verify');
      }
      
      lastPushTime = Date.now();
      consecutivePushes++;
      
      const pushTime = Date.now() - pushStartTime;
      performanceMetrics.totalPushes++;
      performanceMetrics.totalPushTime += pushTime;
      performanceMetrics.averagePushTime = performanceMetrics.totalPushTime / performanceMetrics.totalPushes;
      performanceMetrics.fastestPush = Math.min(performanceMetrics.fastestPush, pushTime);
      performanceMetrics.lastPushTime = pushTime;
      
      console.log(`✅ Successfully pushed ${fileCount} files in ${pushTime}ms`);
    } catch (pushError) {
      if (pushError.message.includes('rejected') || pushError.message.includes('non-fast-forward')) {
        console.log('⚠️ Push rejected, attempting force push...');
        forcePushNeeded = true;
        await executeCommand('git pull origin main --allow-unrelated-histories');
        await executeCommand('git push -f origin main --no-verify');
        console.log('✅ Force push successful');
      } else {
        throw pushError;
      }
    }
  } catch (error) {
    console.error('❌ Error during push:', error.message);
  } finally {
    isPushInProgress = false;
    if (pendingChanges) {
      pendingChanges = false;
      setTimeout(pushChanges, DEBOUNCE_DELAY);
    }
  }
}

// Watch for changes
const watcher = chokidar.watch(WATCH_PATHS, {
  ignored: IGNORE_PATHS,
  persistent: true,
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100
  }
});

// Handle file changes
watcher.on('change', (path) => {
  console.log(`📝 File changed: ${path}`);
  changedFiles.add(path);
  
  if (BATCH_CHANGES) {
    clearTimeout(pushChanges);
    setTimeout(pushChanges, DEBOUNCE_DELAY);
  } else {
    pushChanges();
  }
});

// Handle new files
watcher.on('add', (path) => {
  console.log(`📝 New file: ${path}`);
  changedFiles.add(path);
  
  if (BATCH_CHANGES) {
    clearTimeout(pushChanges);
    setTimeout(pushChanges, DEBOUNCE_DELAY);
  } else {
    pushChanges();
  }
});

// Handle deleted files
watcher.on('unlink', (path) => {
  console.log(`🗑️  File deleted: ${path}`);
  changedFiles.add(path);
  
  if (BATCH_CHANGES) {
    clearTimeout(pushChanges);
    setTimeout(pushChanges, DEBOUNCE_DELAY);
  } else {
    pushChanges();
  }
});

// Start periodic pull
setInterval(pullChanges, PULL_INTERVAL);

console.log('🚀 Auto-sync system initialized and watching for changes...');
console.log('📁 Watching paths:', WATCH_PATHS);
console.log('⏱️  Debounce delay:', DEBOUNCE_DELAY, 'ms');
console.log('⬇️  Pull interval:', PULL_INTERVAL / 1000, 'seconds');
console.log('💻 CPU cores:', MAX_CONCURRENT_OPERATIONS);
console.log('📦 Batch changes:', BATCH_CHANGES ? 'enabled' : 'disabled'); 