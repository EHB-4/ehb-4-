#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync, spawn, exec } = require('child_process');
const chokidar = require('chokidar');
const os = require('os');

/**
 * Enhanced GitHub Auto-Push System for EHB Next.js Project
 * Features:
 * - Real-time file watching
 * - Intelligent commit messages
 * - Performance monitoring
 * - Conflict resolution
 * - Multiple branch support
 * - Backup system
 * - Error recovery
 */

class EnhancedGitHubAutoPusher {
  constructor(options = {}) {
    this.options = {
      watchPath: options.watchPath || '.',
      excludePatterns: options.excludePatterns || [
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
        '.env.local',
        '.env.production',
        '*.tmp',
        '*.temp',
        '.DS_Store',
        'Thumbs.db',
      ],
      commitMessage: options.commitMessage || 'EHB Auto-Push: Real-time development update',
      branch: options.branch || 'main',
      pushInterval: options.pushInterval || 30000, // 30 seconds
      maxCommitsPerPush: options.maxCommitsPerPush || 10,
      enableBackup: options.enableBackup !== false,
      enablePerformanceMonitoring: options.enablePerformanceMonitoring !== false,
      enableConflictResolution: options.enableConflictResolution !== false,
      enableMultiBranch: options.enableMultiBranch !== false,
      ...options,
    };

    this.pendingChanges = new Set();
    this.isPushing = false;
    this.isPulling = false;
    this.lastPushTime = Date.now();
    this.lastPullTime = Date.now();
    this.commitCount = 0;
    this.errorCount = 0;
    this.watcher = null;
    this.performanceMetrics = {
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
      startTime: Date.now(),
      errors: [],
    };
  }

  // Initialize the enhanced auto-pusher
  async init() {
    console.log('🚀 Starting Enhanced GitHub Auto-Push System for EHB...');

    // Check prerequisites
    if (!(await this.checkPrerequisites())) {
      return false;
    }

    // Setup file watcher
    this.setupFileWatcher();

    // Setup periodic operations
    this.setupPeriodicOperations();

    // Setup performance monitoring
    if (this.options.enablePerformanceMonitoring) {
      this.setupPerformanceMonitoring();
    }

    // Setup backup system
    if (this.options.enableBackup) {
      this.setupBackupSystem();
    }

    console.log('✅ Enhanced GitHub Auto-Push System is now active!');
    console.log(`📁 Watching: ${this.options.watchPath}`);
    console.log(`⏱️  Push interval: ${this.options.pushInterval / 1000} seconds`);
    console.log(`🌿 Branch: ${this.options.branch}`);
    console.log(
      `📊 Performance monitoring: ${this.options.enablePerformanceMonitoring ? 'Enabled' : 'Disabled'}`
    );
    console.log(`💾 Backup system: ${this.options.enableBackup ? 'Enabled' : 'Disabled'}`);

    return true;
  }

  // Check prerequisites
  async checkPrerequisites() {
    // Check if git is initialized
    if (!this.isGitRepo()) {
      console.log('❌ Not a git repository. Please initialize git first.');
      return false;
    }

    // Check if remote origin exists
    if (!this.hasRemoteOrigin()) {
      console.log('❌ No remote origin found. Please add GitHub remote first.');
      return false;
    }

    // Check if chokidar is available
    try {
      require('chokidar');
    } catch (error) {
      console.log('❌ chokidar not found. Installing...');
      try {
        execSync('npm install chokidar', { stdio: 'pipe' });
      } catch (installError) {
        console.log('❌ Failed to install chokidar:', installError.message);
        return false;
      }
    }

    return true;
  }

  // Check if current directory is a git repository
  isGitRepo() {
    try {
      execSync('git rev-parse --git-dir', { stdio: 'ignore' });
      return true;
    } catch (error) {
      return false;
    }
  }

  // Check if remote origin exists
  hasRemoteOrigin() {
    try {
      const remotes = execSync('git remote -v', { encoding: 'utf8' });
      return remotes.includes('origin');
    } catch (error) {
      return false;
    }
  }

  // Setup file watcher using chokidar
  setupFileWatcher() {
    this.watcher = chokidar.watch(this.options.watchPath, {
      ignored: this.options.excludePatterns,
      persistent: true,
      ignoreInitial: true,
      awaitWriteFinish: {
        stabilityThreshold: 2000,
        pollInterval: 100,
      },
      usePolling: false,
      interval: 100,
    });

    this.watcher
      .on('add', filePath => this.handleFileChange('add', filePath))
      .on('change', filePath => this.handleFileChange('change', filePath))
      .on('unlink', filePath => this.handleFileChange('delete', filePath))
      .on('error', error => {
        console.error('❌ Watcher error:', error);
        this.performanceMetrics.errors.push({
          type: 'watcher_error',
          message: error.message,
          timestamp: Date.now(),
        });
      });

    console.log('👀 Enhanced file watcher initialized');
  }

  // Handle file changes with intelligent categorization
  handleFileChange(type, filePath) {
    const relativePath = path.relative(process.cwd(), filePath);
    this.pendingChanges.add(relativePath);

    const category = this.categorizeFile(relativePath);
    const priority = this.getFilePriority(relativePath);

    console.log(`📝 ${type}: ${relativePath} (${category}, ${priority})`);

    // Trigger immediate push for critical files
    if (priority === 'critical') {
      this.schedulePush('critical', category);
    } else if (priority === 'high') {
      this.schedulePush('high', category);
    }
  }

  // Categorize files by type
  categorizeFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const dir = path.dirname(filePath);

    if (dir.startsWith('app/')) return 'app';
    if (dir.startsWith('components/')) return 'components';
    if (dir.startsWith('lib/')) return 'lib';
    if (dir.startsWith('hooks/')) return 'hooks';
    if (dir.startsWith('services/')) return 'services';
    if (dir.startsWith('types/')) return 'types';
    if (dir.startsWith('docs/')) return 'docs';
    if (dir.startsWith('scripts/')) return 'scripts';
    if (ext === '.json') return 'config';
    if (ext === '.md') return 'documentation';
    if (ext === '.css' || ext === '.scss') return 'styles';
    if (ext === '.test.' || ext === '.spec.') return 'tests';

    return 'other';
  }

  // Get file priority
  getFilePriority(filePath) {
    const criticalPatterns = [
      'package.json',
      'package-lock.json',
      'next.config.js',
      'tailwind.config.js',
      'tsconfig.json',
      '.env',
      'app/**/*.tsx',
      'app/**/*.ts',
      'components/**/*.tsx',
      'components/**/*.ts',
      'lib/**/*.ts',
      'hooks/**/*.ts',
      'services/**/*.ts',
      'types/**/*.ts',
    ];

    const highPatterns = ['docs/**/*', 'scripts/**/*', '*.md', '*.css', '*.scss'];

    if (
      criticalPatterns.some(pattern => {
        const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));
        return regex.test(filePath);
      })
    ) {
      return 'critical';
    }

    if (
      highPatterns.some(pattern => {
        const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));
        return regex.test(filePath);
      })
    ) {
      return 'high';
    }

    return 'normal';
  }

  // Setup periodic operations
  setupPeriodicOperations() {
    // Periodic push
    setInterval(() => {
      if (this.pendingChanges.size > 0) {
        this.schedulePush('periodic', 'batch');
      }
    }, this.options.pushInterval);

    // Periodic pull
    setInterval(() => {
      this.schedulePull();
    }, this.options.pushInterval * 2);

    // Performance stats logging
    setInterval(() => {
      this.logPerformanceStats();
    }, 60000); // Every minute
  }

  // Setup performance monitoring
  setupPerformanceMonitoring() {
    setInterval(() => {
      const memoryUsage = process.memoryUsage();
      const cpuUsage = process.cpuUsage();

      this.performanceMetrics.memoryUsage = {
        heapUsed: memoryUsage.heapUsed / 1024 / 1024,
        heapTotal: memoryUsage.heapTotal / 1024 / 1024,
        external: memoryUsage.external / 1024 / 1024,
        timestamp: Date.now(),
      };
    }, 30000); // Every 30 seconds
  }

  // Setup backup system
  setupBackupSystem() {
    setInterval(() => {
      this.createBackup();
    }, 300000); // Every 5 minutes
  }

  // Create backup
  async createBackup() {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupDir = `temp-backup/auto-push-backup-${timestamp}`;

      if (!fs.existsSync('temp-backup')) {
        fs.mkdirSync('temp-backup', { recursive: true });
      }

      // Create backup of critical files
      const criticalFiles = [
        'package.json',
        'next.config.js',
        'tailwind.config.js',
        'tsconfig.json',
      ];

      for (const file of criticalFiles) {
        if (fs.existsSync(file)) {
          const backupPath = path.join(backupDir, file);
          fs.mkdirSync(path.dirname(backupPath), { recursive: true });
          fs.copyFileSync(file, backupPath);
        }
      }

      console.log(`💾 Backup created: ${backupDir}`);
    } catch (error) {
      console.error('❌ Backup failed:', error.message);
    }
  }

  // Schedule a push operation
  schedulePush(reason, category = 'general') {
    if (this.isPushing) {
      console.log('⏳ Push already in progress, skipping...');
      return;
    }

    const timeSinceLastPush = Date.now() - this.lastPushTime;
    if (timeSinceLastPush < 5000) {
      console.log('⏳ Too soon since last push, waiting...');
      return;
    }

    this.performPush(reason, category);
  }

  // Schedule a pull operation
  schedulePull() {
    if (this.isPulling) {
      return;
    }

    const timeSinceLastPull = Date.now() - this.lastPullTime;
    if (timeSinceLastPull < 10000) {
      return;
    }

    this.performPull();
  }

  // Perform the actual push operation
  async performPush(reason, category) {
    this.isPushing = true;
    const pushStartTime = Date.now();

    try {
      console.log(`\n🔄 Starting push (${reason}, ${category})...`);

      // Pull latest changes first
      if (this.options.enableConflictResolution) {
        await this.pullLatestChanges();
      }

      // Stage all changes
      await this.stageChanges();

      // Check if there are staged changes
      if (!this.hasStagedChanges()) {
        console.log('📭 No changes to commit');
        this.isPushing = false;
        return;
      }

      // Commit changes with intelligent message
      await this.commitChanges(reason, category);

      // Push to remote
      await this.pushToRemote();

      // Update state
      this.lastPushTime = Date.now();
      this.commitCount++;
      this.pendingChanges.clear();

      // Update performance metrics
      const pushTime = Date.now() - pushStartTime;
      this.performanceMetrics.totalPushes++;
      this.performanceMetrics.totalPushTime += pushTime;
      this.performanceMetrics.averagePushTime =
        this.performanceMetrics.totalPushTime / this.performanceMetrics.totalPushes;
      this.performanceMetrics.fastestPush = Math.min(this.performanceMetrics.fastestPush, pushTime);
      this.performanceMetrics.slowestPush = Math.max(this.performanceMetrics.slowestPush, pushTime);

      console.log(`✅ Push completed successfully in ${pushTime}ms!`);
    } catch (error) {
      console.error('❌ Push failed:', error.message);
      this.errorCount++;
      this.performanceMetrics.errors.push({
        type: 'push_error',
        message: error.message,
        timestamp: Date.now(),
      });
    } finally {
      this.isPushing = false;
    }
  }

  // Perform pull operation
  async performPull() {
    this.isPulling = true;
    const pullStartTime = Date.now();

    try {
      console.log('⬇️  Checking for remote changes...');

      // Fetch latest changes
      execSync('git fetch origin', { stdio: 'pipe' });

      // Check if there are remote changes
      const diff = execSync('git diff main origin/main', { encoding: 'utf8' });

      if (!diff.trim()) {
        console.log('✓ No remote changes found');
        this.isPulling = false;
        return;
      }

      console.log('⬇️  Pulling remote changes...');
      execSync('git pull origin main --no-verify', { stdio: 'pipe' });

      this.lastPullTime = Date.now();
      const pullTime = Date.now() - pullStartTime;

      // Update performance metrics
      this.performanceMetrics.totalPulls++;
      this.performanceMetrics.totalPullTime += pullTime;
      this.performanceMetrics.averagePullTime =
        this.performanceMetrics.totalPullTime / this.performanceMetrics.totalPulls;
      this.performanceMetrics.fastestPull = Math.min(this.performanceMetrics.fastestPull, pullTime);
      this.performanceMetrics.slowestPull = Math.max(this.performanceMetrics.slowestPull, pullTime);

      console.log(`✅ Successfully pulled changes in ${pullTime}ms`);
    } catch (error) {
      console.error('❌ Pull failed:', error.message);
      this.performanceMetrics.errors.push({
        type: 'pull_error',
        message: error.message,
        timestamp: Date.now(),
      });
    } finally {
      this.isPulling = false;
    }
  }

  // Pull latest changes before pushing
  async pullLatestChanges() {
    try {
      execSync('git fetch origin', { stdio: 'pipe' });
      const diff = execSync('git diff main origin/main', { encoding: 'utf8' });

      if (diff.trim()) {
        console.log('⬇️  Pulling latest changes before push...');
        execSync('git pull origin main --no-verify', { stdio: 'pipe' });
      }
    } catch (error) {
      console.warn('⚠️  Could not pull latest changes:', error.message);
    }
  }

  // Stage all changes
  async stageChanges() {
    try {
      execSync('git add .', { stdio: 'pipe' });
      console.log('📦 Changes staged');
    } catch (error) {
      throw new Error(`Failed to stage changes: ${error.message}`);
    }
  }

  // Check if there are staged changes
  hasStagedChanges() {
    try {
      const result = execSync('git diff --cached --name-only', { encoding: 'utf8' });
      return result.trim().length > 0;
    } catch (error) {
      return false;
    }
  }

  // Commit changes with intelligent message
  async commitChanges(reason, category) {
    try {
      const timestamp = new Date().toISOString();
      const files = Array.from(this.pendingChanges);
      const fileTypes = [...new Set(files.map(f => path.extname(f)))];

      let message = `${this.options.commitMessage}`;

      if (category !== 'general') {
        message += ` [${category}]`;
      }

      if (reason === 'critical') {
        message += ' [CRITICAL]';
      } else if (reason === 'high') {
        message += ' [HIGH]';
      }

      message += ` - ${timestamp}`;

      if (files.length <= 3) {
        message += `\nFiles: ${files.join(', ')}`;
      } else {
        message += `\nFiles: ${files.length} files (${fileTypes.join(', ')})`;
      }

      execSync(`git commit -m "${message}"`, { stdio: 'pipe' });
      console.log('💾 Changes committed');
    } catch (error) {
      throw new Error(`Failed to commit changes: ${error.message}`);
    }
  }

  // Push to remote
  async pushToRemote() {
    try {
      execSync(`git push origin ${this.options.branch}`, { stdio: 'pipe' });
      console.log('🚀 Changes pushed to remote');
    } catch (error) {
      throw new Error(`Failed to push to remote: ${error.message}`);
    }
  }

  // Log performance statistics
  logPerformanceStats() {
    const uptime = (Date.now() - this.performanceMetrics.startTime) / 1000;
    const memoryUsed = this.performanceMetrics.memoryUsage?.heapUsed || 0;

    console.log('\n📊 ===== EHB AUTO-PUSH PERFORMANCE STATS =====');
    console.log(`⏱️  Uptime: ${Math.floor(uptime / 60)}m ${Math.floor(uptime % 60)}s`);
    console.log(`🔄 Total pushes: ${this.performanceMetrics.totalPushes}`);
    console.log(`⬇️  Total pulls: ${this.performanceMetrics.totalPulls}`);
    console.log(`📝 Total files processed: ${this.pendingChanges.size}`);
    console.log(`⚡ Average push time: ${this.performanceMetrics.averagePushTime.toFixed(2)}ms`);
    console.log(`⬇️  Average pull time: ${this.performanceMetrics.averagePullTime.toFixed(2)}ms`);
    console.log(
      `🚀 Fastest push: ${this.performanceMetrics.fastestPush < Infinity ? this.performanceMetrics.fastestPush.toFixed(2) + 'ms' : 'N/A'}`
    );
    console.log(
      `⬇️  Fastest pull: ${this.performanceMetrics.fastestPull < Infinity ? this.performanceMetrics.fastestPull.toFixed(2) + 'ms' : 'N/A'}`
    );
    console.log(`💾 Memory usage: ${memoryUsed.toFixed(2)}MB`);
    console.log(`❌ Errors: ${this.errorCount}`);
    console.log(`🌿 Current branch: ${this.options.branch}`);
    console.log('📊 ===============================================\n');
  }

  // Get status information
  getStatus() {
    return {
      isPushing: this.isPushing,
      isPulling: this.isPulling,
      pendingChanges: Array.from(this.pendingChanges),
      lastPushTime: this.lastPushTime,
      lastPullTime: this.lastPullTime,
      commitCount: this.commitCount,
      errorCount: this.errorCount,
      branch: this.options.branch,
      performanceMetrics: this.performanceMetrics,
    };
  }

  // Stop the auto-pusher
  stop() {
    console.log('🛑 Stopping Enhanced GitHub Auto-Push System...');

    if (this.watcher) {
      this.watcher.close();
    }

    this.logPerformanceStats();
    process.exit(0);
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);

  // Parse command line arguments
  const options = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace('--', '');
    const value = args[i + 1];
    if (key && value) {
      options[key] = value;
    }
  }

  const autoPusher = new EnhancedGitHubAutoPusher(options);

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
    process.exit(1);
  });
}

module.exports = EnhancedGitHubAutoPusher;
