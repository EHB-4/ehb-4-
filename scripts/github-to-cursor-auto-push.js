#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');
const chokidar = require('chokidar');

/**
 * EHB GitHub-to-Cursor Auto-Push System
 * Automatically syncs GitHub repository changes to Cursor IDE
 */
class GitHubToCursorAutoPusher {
  constructor() {
    this.isPushing = false;
    this.isPulling = false;
    this.pendingChanges = new Set();
    this.lastPushTime = Date.now();
    this.lastPullTime = Date.now();
    this.commitCount = 0;
    this.pullCount = 0;
    this.cursorProcess = null;
    this.config = {
      watchPath: '.',
      pushInterval: 30000, // 30 seconds
      pullInterval: 60000, // 1 minute
      commitMessage: 'EHB Auto-Push to Cursor',
      branch: 'main',
      cursorPath: null,
      autoOpenCursor: true,
      excludePatterns: [
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
        '.cursor/**',
        '.vscode/**',
      ],
      criticalFiles: [
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
        'scripts/**/*.js',
        'scripts/**/*.ts',
      ],
    };
  }

  async init() {
    console.log('🚀 Starting EHB GitHub-to-Cursor Auto-Push System...');

    // Load configuration
    this.loadConfig();

    // Validate environment
    if (!(await this.validateEnvironment())) {
      return false;
    }

    // Setup file watchers
    this.setupFileWatcher();
    this.setupPeriodicSync();

    // Setup Cursor integration
    await this.setupCursorIntegration();

    console.log('✅ EHB GitHub-to-Cursor Auto-Push System is now active!');
    console.log('📊 Monitoring GitHub ↔ Cursor synchronization...');

    return true;
  }

  loadConfig() {
    try {
      const configPath = path.join(process.cwd(), 'config', 'github-cursor-config.json');
      if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        this.config = { ...this.config, ...config };
        console.log('⚙️  Configuration loaded from config/github-cursor-config.json');
      }
    } catch (error) {
      console.log('ℹ️  Using default configuration');
    }
  }

  async validateEnvironment() {
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

    // Check if Cursor is available
    if (!(await this.checkCursorAvailability())) {
      console.log('⚠️  Cursor IDE not found. Auto-push will work without Cursor integration.');
    }

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

  async checkCursorAvailability() {
    try {
      // Check common Cursor installation paths
      const cursorPaths = [
        'cursor',
        'Cursor',
        path.join(process.env.APPDATA, 'Cursor', 'Cursor.exe'), // Windows
        path.join(process.env.HOME, 'Applications', 'Cursor.app', 'Contents', 'MacOS', 'Cursor'), // macOS
        '/usr/bin/cursor', // Linux
        '/usr/local/bin/cursor', // Linux
      ];

      for (const cursorPath of cursorPaths) {
        try {
          execSync(`${cursorPath} --version`, { stdio: 'ignore' });
          this.config.cursorPath = cursorPath;
          console.log(`✅ Cursor found at: ${cursorPath}`);
          return true;
        } catch (error) {
          // Continue checking other paths
        }
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  setupFileWatcher() {
    const watcher = chokidar.watch(this.config.watchPath, {
      ignored: this.config.excludePatterns,
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

    const priority = this.getFilePriority(relativePath);
    console.log(`📝 ${type}: ${relativePath} (${priority})`);

    if (priority === 'critical') {
      this.schedulePush('critical');
    }
  }

  getFilePriority(filePath) {
    if (
      this.config.criticalFiles.some(pattern => {
        const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));
        return regex.test(filePath);
      })
    ) {
      return 'critical';
    }

    if (filePath.includes('.tsx') || filePath.includes('.ts') || filePath.includes('.js')) {
      return 'high';
    }

    return 'normal';
  }

  setupPeriodicSync() {
    // Periodic push
    setInterval(() => {
      if (this.pendingChanges.size > 0) {
        this.schedulePush('periodic');
      }
    }, this.config.pushInterval);

    // Periodic pull from GitHub
    setInterval(() => {
      this.schedulePull('periodic');
    }, this.config.pullInterval);

    console.log('⏰ Periodic sync scheduled');
  }

  async setupCursorIntegration() {
    if (!this.config.cursorPath || !this.config.autoOpenCursor) {
      return;
    }

    try {
      // Open current project in Cursor
      const projectPath = process.cwd();

      // Test if Cursor is actually available
      try {
        execSync(`${this.config.cursorPath} --version`, { stdio: 'ignore' });
      } catch (error) {
        console.log('⚠️  Cursor executable not found, skipping Cursor integration');
        return;
      }

      // Use spawn with better error handling
      this.cursorProcess = spawn(this.config.cursorPath, [projectPath], {
        detached: true,
        stdio: 'ignore',
        windowsHide: true,
      });

      // Handle spawn errors
      this.cursorProcess.on('error', error => {
        console.log('⚠️  Could not open Cursor automatically:', error.message);
        this.cursorProcess = null;
      });

      this.cursorProcess.on('exit', code => {
        if (code !== 0) {
          console.log('⚠️  Cursor process exited with code:', code);
        }
        this.cursorProcess = null;
      });

      console.log('🚀 Cursor IDE opened with project');
    } catch (error) {
      console.log('⚠️  Could not open Cursor automatically:', error.message);
    }
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

  schedulePull(reason) {
    if (this.isPulling) {
      return;
    }

    const timeSinceLastPull = Date.now() - this.lastPullTime;
    if (timeSinceLastPull < 10000) {
      return;
    }

    this.performPull(reason);
  }

  async performPush(reason) {
    this.isPushing = true;

    try {
      console.log(`\n🔄 Starting push to GitHub (${reason})...`);

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

      console.log('✅ Push to GitHub completed successfully!');

      // Notify Cursor about changes
      await this.notifyCursor('push');
    } catch (error) {
      console.error('❌ Push failed:', error.message);
    } finally {
      this.isPushing = false;
    }
  }

  async performPull(reason) {
    this.isPulling = true;

    try {
      console.log(`\n📥 Starting pull from GitHub (${reason})...`);

      const hasChanges = await this.checkRemoteChanges();

      if (!hasChanges) {
        console.log('📭 No remote changes to pull');
        this.isPulling = false;
        return;
      }

      await this.pullFromRemote();

      this.lastPullTime = Date.now();
      this.pullCount++;

      console.log('✅ Pull from GitHub completed successfully!');

      // Notify Cursor about changes
      await this.notifyCursor('pull');
    } catch (error) {
      console.error('❌ Pull failed:', error.message);
    } finally {
      this.isPulling = false;
    }
  }

  async checkRemoteChanges() {
    try {
      execSync('git fetch origin', { stdio: 'pipe' });
      const result = execSync('git log HEAD..origin/main --oneline', { encoding: 'utf8' });
      return result.trim().length > 0;
    } catch (error) {
      return false;
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
      const files = Array.from(this.pendingChanges).slice(0, 5).join(', ');
      const message = `${this.config.commitMessage}: ${timestamp} - ${files}`;
      execSync(`git commit -m "${message}"`, { stdio: 'pipe' });
      console.log('💾 Changes committed');
    } catch (error) {
      throw new Error(`Failed to commit changes: ${error.message}`);
    }
  }

  async pushToRemote() {
    try {
      execSync(`git push origin ${this.config.branch}`, { stdio: 'pipe' });
      console.log('🚀 Changes pushed to GitHub');
    } catch (error) {
      throw new Error(`Failed to push to GitHub: ${error.message}`);
    }
  }

  async pullFromRemote() {
    try {
      execSync(`git pull origin ${this.config.branch}`, { stdio: 'pipe' });
      console.log('📥 Changes pulled from GitHub');
    } catch (error) {
      throw new Error(`Failed to pull from GitHub: ${error.message}`);
    }
  }

  async notifyCursor(action) {
    if (!this.config.cursorPath) {
      return;
    }

    try {
      const projectPath = process.cwd();
      const message = action === 'push' ? 'Changes pushed to GitHub' : 'Changes pulled from GitHub';

      // Create a temporary file to notify Cursor
      const notifyFile = path.join(projectPath, '.cursor-sync-notification');
      fs.writeFileSync(
        notifyFile,
        JSON.stringify({
          action,
          timestamp: new Date().toISOString(),
          message,
          files: Array.from(this.pendingChanges),
        })
      );

      // Remove notification file after a short delay
      setTimeout(() => {
        if (fs.existsSync(notifyFile)) {
          fs.unlinkSync(notifyFile);
        }
      }, 5000);

      console.log(`📢 Cursor notified: ${message}`);
    } catch (error) {
      // Silent fail for Cursor notification
    }
  }

  getStatus() {
    return {
      isPushing: this.isPushing,
      isPulling: this.isPulling,
      pendingChanges: this.pendingChanges.size,
      commitCount: this.commitCount,
      pullCount: this.pullCount,
      lastPushTime: this.lastPushTime,
      lastPullTime: this.lastPullTime,
      cursorPath: this.config.cursorPath,
    };
  }

  async stop() {
    console.log('\n🛑 Stopping EHB GitHub-to-Cursor Auto-Push System...');

    if (this.cursorProcess) {
      this.cursorProcess.kill();
    }

    console.log('✅ System stopped');
    process.exit(0);
  }
}

// Main execution
async function main() {
  const autoPusher = new GitHubToCursorAutoPusher();

  // Handle graceful shutdown
  process.on('SIGINT', () => autoPusher.stop());
  process.on('SIGTERM', () => autoPusher.stop());

  // Start the system
  await autoPusher.init();

  // Keep the process alive
  setInterval(() => {
    const status = autoPusher.getStatus();
    console.log(
      `📊 Status: ${status.pendingChanges} pending, ${status.commitCount} commits, ${status.pullCount} pulls`
    );
  }, 60000); // Log status every minute
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = GitHubToCursorAutoPusher;
