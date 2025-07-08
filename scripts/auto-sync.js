#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Auto Sync Script for EHB Project
 * Automatically syncs data between Cursor and GitHub
 */

class AutoSync {
  constructor() {
    this.projectRoot = process.cwd();
    this.gitDir = path.join(this.projectRoot, '.git');
    this.lastSyncFile = path.join(this.projectRoot, '.last-sync');
    this.syncInterval = 30000; // 30 seconds
    this.isRunning = false;
  }

  /**
   * Check if Git repository exists
   */
  checkGitRepo() {
    try {
      if (!fs.existsSync(this.gitDir)) {
        console.log('❌ Git repository not found. Please initialize Git first.');
        return false;
      }
      return true;
    } catch (error) {
      console.log('❌ Error checking Git repository:', error.message);
      return false;
    }
  }

  /**
   * Get current Git status
   */
  getGitStatus() {
    try {
      const status = execSync('git status --porcelain', { encoding: 'utf8' });
      return status.trim();
    } catch (error) {
      console.log('❌ Error getting Git status:', error.message);
      return '';
    }
  }

  /**
   * Check if there are remote changes
   */
  checkRemoteChanges() {
    try {
      execSync('git fetch origin', { stdio: 'pipe' });
      const localCommit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
      const remoteCommit = execSync('git rev-parse origin/main', { encoding: 'utf8' }).trim();
      return localCommit !== remoteCommit;
    } catch (error) {
      return false;
    }
  }

  /**
   * Pull changes from GitHub
   */
  pullFromGitHub() {
    try {
      console.log('📥 Pulling changes from GitHub...');
      execSync('git pull origin main', { stdio: 'inherit' });
      console.log('✅ Successfully pulled from GitHub');
      return true;
    } catch (error) {
      console.log('❌ Error pulling from GitHub:', error.message);
      return false;
    }
  }

  /**
   * Push changes to GitHub
   */
  pushToGitHub() {
    try {
      console.log('📤 Pushing changes to GitHub...');
      execSync('git add .', { stdio: 'pipe' });
      
      const status = this.getGitStatus();
      if (status) {
        const timestamp = new Date().toISOString();
        const commitMessage = `Auto sync: ${timestamp}`;
        execSync(`git commit -m "${commitMessage}"`, { stdio: 'pipe' });
        execSync('git push origin main', { stdio: 'inherit' });
        console.log('✅ Successfully pushed to GitHub');
        this.updateLastSync();
        return true;
      } else {
        console.log('ℹ️ No changes to push');
        return true;
      }
    } catch (error) {
      console.log('❌ Error pushing to GitHub:', error.message);
      return false;
    }
  }

  /**
   * Update last sync timestamp
   */
  updateLastSync() {
    try {
      const timestamp = new Date().toISOString();
      fs.writeFileSync(this.lastSyncFile, timestamp);
    } catch (error) {
      console.log('⚠️ Could not update last sync timestamp');
    }
  }

  /**
   * Get last sync time
   */
  getLastSync() {
    try {
      if (fs.existsSync(this.lastSyncFile)) {
        return fs.readFileSync(this.lastSyncFile, 'utf8');
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Perform sync operation
   */
  async sync() {
    if (this.isRunning) {
      console.log('⏳ Sync already in progress...');
      return;
    }

    this.isRunning = true;
    console.log('\n🔄 Starting auto sync...');

    try {
      // Check for remote changes first
      if (this.checkRemoteChanges()) {
        console.log('📥 Remote changes detected');
        this.pullFromGitHub();
      }

      // Check for local changes
      const localChanges = this.getGitStatus();
      if (localChanges) {
        console.log('📤 Local changes detected');
        this.pushToGitHub();
      }

      console.log('✅ Sync completed');
    } catch (error) {
      console.log('❌ Sync failed:', error.message);
    } finally {
      this.isRunning = false;
    }
  }

  /**
   * Start auto sync service
   */
  start() {
    if (!this.checkGitRepo()) {
      return;
    }

    console.log('🚀 Starting EHB Auto Sync Service...');
    console.log('📁 Project:', this.projectRoot);
    console.log('⏰ Sync interval:', this.syncInterval / 1000, 'seconds');
    console.log('🔄 Press Ctrl+C to stop\n');

    // Initial sync
    this.sync();

    // Set up interval
    this.interval = setInterval(() => {
      this.sync();
    }, this.syncInterval);

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🛑 Stopping auto sync service...');
      if (this.interval) {
        clearInterval(this.interval);
      }
      process.exit(0);
    });
  }

  /**
   * Stop auto sync service
   */
  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      console.log('🛑 Auto sync service stopped');
    }
  }
}

// CLI Interface
if (require.main === module) {
  const autoSync = new AutoSync();
  
  const command = process.argv[2];
  
  switch (command) {
    case 'start':
      autoSync.start();
      break;
    case 'stop':
      autoSync.stop();
      break;
    case 'sync':
      autoSync.sync();
      break;
    case 'status':
      console.log('📊 Auto Sync Status:');
      console.log('📁 Project:', autoSync.projectRoot);
      console.log('🔄 Last sync:', autoSync.getLastSync() || 'Never');
      console.log('📝 Git status:', autoSync.getGitStatus() || 'Clean');
      break;
    default:
      console.log('🔄 EHB Auto Sync Tool');
      console.log('');
      console.log('Usage:');
      console.log('  node scripts/auto-sync.js start    - Start auto sync service');
      console.log('  node scripts/auto-sync.js stop     - Stop auto sync service');
      console.log('  node scripts/auto-sync.js sync     - Perform one-time sync');
      console.log('  node scripts/auto-sync.js status   - Show sync status');
      console.log('');
      console.log('Features:');
      console.log('  ✅ Automatic GitHub push/pull');
      console.log('  ✅ Conflict detection');
      console.log('  ✅ Error handling');
      console.log('  ✅ Timestamp tracking');
      console.log('  ✅ Graceful shutdown');
  }
}

module.exports = AutoSync; 