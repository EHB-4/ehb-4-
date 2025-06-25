#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chokidar = require('chokidar');

class EHBAutoPusher {
  constructor() {
    this.isPushing = false;
    this.pendingChanges = new Set();
    this.lastPushTime = Date.now();
    this.commitCount = 0;
  }

  async init() {
    console.log('🚀 Starting EHB Auto-Push System...');

    if (!this.isGitRepo()) {
      console.log('❌ Not a git repository. Please initialize git first.');
      return false;
    }

    if (!this.hasRemoteOrigin()) {
      console.log('❌ No remote origin found. Please add GitHub remote first.');
      return false;
    }

    this.setupFileWatcher();
    this.setupPeriodicPush();

    console.log('✅ EHB Auto-Push System is now active!');
    return true;
  }

  isGitRepo() {
    try {
      execSync('git rev-parse --git-dir', { stdio: 'ignore' });
      return true;
    } catch (error) {
      return false;
    }
  }

  hasRemoteOrigin() {
    try {
      const remotes = execSync('git remote -v', { encoding: 'utf8' });
      return remotes.includes('origin');
    } catch (error) {
      return false;
    }
  }

  setupFileWatcher() {
    const watcher = chokidar.watch('.', {
      ignored: [
        'node_modules/**',
        '.git/**',
        '.next/**',
        'dist/**',
        'build/**',
        '*.log',
        'temp-backup/**',
        'logs/**',
        'cypress/videos/**',
        'cypress/screenshots/**',
        'playwright-report/**',
        'test-results/**',
      ],
      persistent: true,
      ignoreInitial: true,
    });

    watcher
      .on('add', filePath => this.handleFileChange('add', filePath))
      .on('change', filePath => this.handleFileChange('change', filePath))
      .on('unlink', filePath => this.handleFileChange('delete', filePath))
      .on('error', error => console.error('❌ Watcher error:', error));

    console.log('👀 File watcher initialized');
  }

  handleFileChange(type, filePath) {
    const relativePath = path.relative(process.cwd(), filePath);
    this.pendingChanges.add(relativePath);
    console.log(`📝 ${type}: ${relativePath}`);

    if (this.isCriticalFile(relativePath)) {
      this.schedulePush('critical');
    }
  }

  isCriticalFile(filePath) {
    const criticalPatterns = [
      'package.json',
      'next.config.js',
      'tailwind.config.js',
      'tsconfig.json',
      'app/**/*.tsx',
      'app/**/*.ts',
      'components/**/*.tsx',
      'components/**/*.ts',
      'lib/**/*.ts',
      'hooks/**/*.ts',
    ];

    return criticalPatterns.some(pattern => {
      const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));
      return regex.test(filePath);
    });
  }

  setupPeriodicPush() {
    setInterval(() => {
      if (this.pendingChanges.size > 0) {
        this.schedulePush('periodic');
      }
    }, 30000); // 30 seconds
  }

  schedulePush(reason) {
    if (this.isPushing) {
      return;
    }

    const timeSinceLastPush = Date.now() - this.lastPushTime;
    if (timeSinceLastPush < 5000) {
      return;
    }

    this.performPush(reason);
  }

  async performPush(reason) {
    this.isPushing = true;

    try {
      console.log(`\n🔄 Starting push (${reason})...`);

      await this.stageChanges();

      if (!this.hasStagedChanges()) {
        console.log('📭 No changes to commit');
        this.isPushing = false;
        return;
      }

      await this.commitChanges();
      await this.pushToRemote();

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

  async stageChanges() {
    try {
      execSync('git add .', { stdio: 'pipe' });
      console.log('📦 Changes staged');
    } catch (error) {
      throw new Error(`Failed to stage changes: ${error.message}`);
    }
  }

  hasStagedChanges() {
    try {
      const result = execSync('git diff --cached --name-only', { encoding: 'utf8' });
      return result.trim().length > 0;
    } catch (error) {
      return false;
    }
  }

  async commitChanges() {
    try {
      const timestamp = new Date().toISOString();
      const message = `EHB Auto-Push: ${timestamp}`;
      execSync(`git commit -m "${message}"`, { stdio: 'pipe' });
      console.log('💾 Changes committed');
    } catch (error) {
      throw new Error(`Failed to commit changes: ${error.message}`);
    }
  }

  async pushToRemote() {
    try {
      execSync('git push origin main', { stdio: 'pipe' });
      console.log('🚀 Changes pushed to remote');
    } catch (error) {
      throw new Error(`Failed to push to remote: ${error.message}`);
    }
  }

  stop() {
    console.log('🛑 Stopping EHB Auto-Push System...');
    process.exit(0);
  }
}

// CLI interface
if (require.main === module) {
  const autoPusher = new EHBAutoPusher();

  process.on('SIGINT', () => {
    console.log('\n🛑 Received SIGINT, shutting down gracefully...');
    autoPusher.stop();
  });

  process.on('SIGTERM', () => {
    console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
    autoPusher.stop();
  });

  autoPusher.init().catch(error => {
    console.error('❌ Failed to initialize auto-pusher:', error);
    process.exit(1);
  });
}

module.exports = EHBAutoPusher;
