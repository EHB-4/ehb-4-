#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');
const chokidar = require('chokidar');

class GitHubAutoPusher {
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
      ],
      commitMessage: options.commitMessage || 'Auto-push: Real-time data update',
      branch: options.branch || 'main',
      pushInterval: options.pushInterval || 30000, // 30 seconds
      maxCommitsPerPush: options.maxCommitsPerPush || 10,
      ...options,
    };

    this.pendingChanges = new Set();
    this.isPushing = false;
    this.lastPushTime = Date.now();
    this.commitCount = 0;
  }

  // Initialize the auto-pusher
  async init() {
    console.log('🚀 Starting GitHub Auto-Push System...');

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

    // Setup file watcher
    this.setupFileWatcher();

    // Setup periodic push
    this.setupPeriodicPush();

    console.log('✅ GitHub Auto-Push System is now active!');
    console.log(`📁 Watching: ${this.options.watchPath}`);
    console.log(`⏱️  Push interval: ${this.options.pushInterval / 1000} seconds`);
    console.log(`🌿 Branch: ${this.options.branch}`);

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
    const watcher = chokidar.watch(this.options.watchPath, {
      ignored: this.options.excludePatterns,
      persistent: true,
      ignoreInitial: true,
      awaitWriteFinish: {
        stabilityThreshold: 2000,
        pollInterval: 100,
      },
    });

    watcher
      .on('add', filePath => this.handleFileChange('add', filePath))
      .on('change', filePath => this.handleFileChange('change', filePath))
      .on('unlink', filePath => this.handleFileChange('delete', filePath))
      .on('error', error => console.error('❌ Watcher error:', error));

    console.log('👀 File watcher initialized');
  }

  // Handle file changes
  handleFileChange(type, filePath) {
    const relativePath = path.relative(process.cwd(), filePath);
    this.pendingChanges.add(relativePath);

    console.log(`📝 ${type}: ${relativePath}`);

    // Trigger immediate push for critical files
    if (this.isCriticalFile(relativePath)) {
      this.schedulePush('critical');
    }
  }

  // Check if file is critical and needs immediate push
  isCriticalFile(filePath) {
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

    return criticalPatterns.some(pattern => {
      const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));
      return regex.test(filePath);
    });
  }

  // Setup periodic push
  setupPeriodicPush() {
    setInterval(() => {
      if (this.pendingChanges.size > 0) {
        this.schedulePush('periodic');
      }
    }, this.options.pushInterval);
  }

  // Schedule a push operation
  schedulePush(reason) {
    if (this.isPushing) {
      console.log('⏳ Push already in progress, skipping...');
      return;
    }

    const timeSinceLastPush = Date.now() - this.lastPushTime;
    if (timeSinceLastPush < 5000) {
      // Minimum 5 seconds between pushes
      console.log('⏳ Too soon since last push, waiting...');
      return;
    }

    this.performPush(reason);
  }

  // Perform the actual push operation
  async performPush(reason) {
    this.isPushing = true;

    try {
      console.log(`\n🔄 Starting push (${reason})...`);

      // Stage all changes
      await this.stageChanges();

      // Check if there are staged changes
      if (!this.hasStagedChanges()) {
        console.log('📭 No changes to commit');
        this.isPushing = false;
        return;
      }

      // Commit changes
      await this.commitChanges();

      // Push to remote
      await this.pushToRemote();

      // Update state
      this.lastPushTime = Date.now();
      this.commitCount++;
      this.pendingChanges.clear();

      console.log('✅ Push completed successfully!');
    } catch (error) {
      console.error('❌ Push failed:', error.message);
    } finally {
      this.isPushing = false;
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

  // Commit changes
  async commitChanges() {
    try {
      const timestamp = new Date().toISOString();
      const message = `${this.options.commitMessage} - ${timestamp}`;

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

  // Get status information
  getStatus() {
    return {
      isPushing: this.isPushing,
      pendingChanges: Array.from(this.pendingChanges),
      lastPushTime: this.lastPushTime,
      commitCount: this.commitCount,
      branch: this.options.branch,
    };
  }

  // Stop the auto-pusher
  stop() {
    console.log('🛑 Stopping GitHub Auto-Push System...');
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

  const autoPusher = new GitHubAutoPusher(options);

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

module.exports = GitHubAutoPusher;
