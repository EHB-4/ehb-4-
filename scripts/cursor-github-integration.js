#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

/**
 * Cursor GitHub Integration Script
 * Provides seamless integration between Cursor editor and GitHub
 */

class CursorGitHubIntegration {
  constructor() {
    this.projectRoot = process.cwd();
    this.watcher = null;
    this.isWatching = false;
    this.syncInterval = 30000; // 30 seconds
    this.autoSaveDelay = 1000; // 1 second
    this.lastSync = null;
    this.pendingChanges = new Set();
    this.syncInProgress = false;
  }

  /**
   * Initialize the integration
   */
  async init() {
    console.log('🚀 Initializing Cursor GitHub Integration...');
    
    // Check if Git repository exists
    if (!this.checkGitRepo()) {
      console.log('❌ Git repository not found. Please initialize Git first.');
      return false;
    }

    // Create logs directory
    this.createLogsDirectory();

    // Start file watcher
    this.startFileWatcher();

    // Start auto sync
    this.startAutoSync();

    console.log('✅ Cursor GitHub Integration initialized successfully!');
    console.log('📁 Watching for file changes...');
    console.log('🔄 Auto sync every 30 seconds');
    console.log('💾 Auto save on file changes');
    console.log('📤 Auto push to GitHub');
    console.log('📥 Auto pull from GitHub');
    console.log('🛑 Press Ctrl+C to stop');

    return true;
  }

  /**
   * Check if Git repository exists
   */
  checkGitRepo() {
    try {
      const gitDir = path.join(this.projectRoot, '.git');
      return fs.existsSync(gitDir);
    } catch (error) {
      return false;
    }
  }

  /**
   * Create logs directory
   */
  createLogsDirectory() {
    const logsDir = path.join(this.projectRoot, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
  }

  /**
   * Start file watcher
   */
  startFileWatcher() {
    const patterns = [
      'app/**/*',
      'components/**/*',
      'lib/**/*',
      'hooks/**/*',
      'types/**/*',
      'scripts/**/*',
      'config/**/*',
      'public/**/*',
      '*.json',
      '*.ts',
      '*.tsx',
      '*.js',
      '*.jsx',
      '*.md'
    ];

    const ignored = [
      'node_modules/**',
      '.next/**',
      'dist/**',
      'build/**',
      '*.log',
      '.env*',
      'temp/**',
      'backups/**',
      '.git/**'
    ];

    this.watcher = chokidar.watch(patterns, {
      ignored,
      persistent: true,
      ignoreInitial: true,
      awaitWriteFinish: {
        stabilityThreshold: 1000,
        pollInterval: 100
      }
    });

    this.watcher
      .on('add', (filePath) => this.onFileChange(filePath, 'add'))
      .on('change', (filePath) => this.onFileChange(filePath, 'change'))
      .on('unlink', (filePath) => this.onFileChange(filePath, 'delete'))
      .on('error', (error) => this.logError('File watcher error:', error));

    this.isWatching = true;
  }

  /**
   * Handle file changes
   */
  onFileChange(filePath, event) {
    const relativePath = path.relative(this.projectRoot, filePath);
    console.log(`📝 File ${event}: ${relativePath}`);
    
    this.pendingChanges.add(relativePath);
    
    // Auto save after delay
    setTimeout(() => {
      this.autoSave();
    }, this.autoSaveDelay);
  }

  /**
   * Auto save changes
   */
  autoSave() {
    if (this.pendingChanges.size === 0) return;

    console.log('💾 Auto saving changes...');
    this.pendingChanges.clear();
    
    // Trigger sync
    this.sync();
  }

  /**
   * Start auto sync
   */
  startAutoSync() {
    setInterval(() => {
      if (!this.syncInProgress) {
        this.sync();
      }
    }, this.syncInterval);
  }

  /**
   * Sync with GitHub
   */
  async sync() {
    if (this.syncInProgress) return;

    this.syncInProgress = true;
    console.log('🔄 Syncing with GitHub...');

    try {
      // Check for remote changes
      const hasRemoteChanges = await this.checkRemoteChanges();
      
      if (hasRemoteChanges) {
        console.log('📥 Pulling changes from GitHub...');
        await this.pullFromGitHub();
      }

      // Check for local changes
      const hasLocalChanges = await this.checkLocalChanges();
      
      if (hasLocalChanges) {
        console.log('📤 Pushing changes to GitHub...');
        await this.pushToGitHub();
      }

      this.lastSync = new Date();
      console.log('✅ Sync completed successfully');
      
    } catch (error) {
      console.log('❌ Sync failed:', error.message);
      this.logError('Sync error:', error);
    } finally {
      this.syncInProgress = false;
    }
  }

  /**
   * Check for remote changes
   */
  async checkRemoteChanges() {
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
   * Check for local changes
   */
  async checkLocalChanges() {
    try {
      const status = execSync('git status --porcelain', { encoding: 'utf8' });
      return status.trim().length > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Pull from GitHub
   */
  async pullFromGitHub() {
    try {
      execSync('git pull origin main', { stdio: 'inherit' });
      console.log('✅ Successfully pulled from GitHub');
    } catch (error) {
      console.log('❌ Error pulling from GitHub:', error.message);
      throw error;
    }
  }

  /**
   * Push to GitHub
   */
  async pushToGitHub() {
    try {
      execSync('git add .', { stdio: 'pipe' });
      
      const status = await this.checkLocalChanges();
      if (status) {
        const timestamp = new Date().toISOString();
        const commitMessage = `Auto sync: ${timestamp}`;
        execSync(`git commit -m "${commitMessage}"`, { stdio: 'pipe' });
        execSync('git push origin main', { stdio: 'inherit' });
        console.log('✅ Successfully pushed to GitHub');
      } else {
        console.log('ℹ️ No changes to push');
      }
    } catch (error) {
      console.log('❌ Error pushing to GitHub:', error.message);
      throw error;
    }
  }

  /**
   * Log error
   */
  logError(message, error) {
    const logMessage = `${new Date().toISOString()} - ${message} ${error.message || error}`;
    const logFile = path.join(this.projectRoot, 'logs', 'cursor-sync.log');
    
    fs.appendFileSync(logFile, logMessage + '\n');
    console.log('❌', message, error.message || error);
  }

  /**
   * Get status
   */
  getStatus() {
    return {
      isWatching: this.isWatching,
      lastSync: this.lastSync,
      pendingChanges: Array.from(this.pendingChanges),
      syncInProgress: this.syncInProgress
    };
  }

  /**
   * Stop the integration
   */
  stop() {
    console.log('🛑 Stopping Cursor GitHub Integration...');
    
    if (this.watcher) {
      this.watcher.close();
      this.isWatching = false;
    }
    
    console.log('✅ Cursor GitHub Integration stopped');
  }
}

// CLI Interface
if (require.main === module) {
  const integration = new CursorGitHubIntegration();
  
  const command = process.argv[2];
  
  switch (command) {
    case 'start':
      integration.init();
      break;
    case 'stop':
      integration.stop();
      break;
    case 'sync':
      integration.sync();
      break;
    case 'status':
      console.log('📊 Cursor GitHub Integration Status:');
      console.log(JSON.stringify(integration.getStatus(), null, 2));
      break;
    default:
      console.log('🔄 Cursor GitHub Integration Tool');
      console.log('');
      console.log('Usage:');
      console.log('  node scripts/cursor-github-integration.js start    - Start integration');
      console.log('  node scripts/cursor-github-integration.js stop     - Stop integration');
      console.log('  node scripts/cursor-github-integration.js sync     - Manual sync');
      console.log('  node scripts/cursor-github-integration.js status   - Show status');
      console.log('');
      console.log('Features:');
      console.log('  ✅ Auto file watching');
      console.log('  ✅ Auto save on changes');
      console.log('  ✅ Auto sync with GitHub');
      console.log('  ✅ Auto commit and push');
      console.log('  ✅ Auto pull from GitHub');
      console.log('  ✅ Error handling and logging');
  }
}

module.exports = CursorGitHubIntegration; 