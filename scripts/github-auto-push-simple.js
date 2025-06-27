#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const chokidar = require('chokidar');

/**
 * EHB GitHub Auto-Push System (Simplified)
 * Automatically syncs your project files with GitHub
 */
class GitHubAutoPusher {
  constructor() {
    this.isPushing = false;
    this.isPulling = false;
    this.pendingChanges = new Set();
    this.lastPushTime = Date.now();
    this.lastPullTime = Date.now();
    this.commitCount = 0;
    this.pullCount = 0;
    this.config = {
      watchPath: '.',
      pushInterval: 30000, // 30 seconds
      pullInterval: 60000, // 60 seconds
      commitMessage: 'EHB Auto-Push',
      branch: 'main',
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
    console.log('🚀 Starting EHB GitHub Auto-Push System...');

    // Load configuration
    this.loadConfig();

    // Validate environment
    if (!(await this.validateEnvironment())) {
      return false;
    }

    // Setup file watchers
    this.setupFileWatcher();
    this.setupPeriodicSync();

    console.log('✅ EHB GitHub Auto-Push System is now active!');
    console.log('📊 Monitoring GitHub synchronization...');

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

  getStatus() {
    return {
      isPushing: this.isPushing,
      isPulling: this.isPulling,
      pendingChanges: this.pendingChanges.size,
      commitCount: this.commitCount,
      pullCount: this.pullCount,
      lastPushTime: this.lastPushTime,
      lastPullTime: this.lastPullTime,
    };
  }

  async stop() {
    console.log('\n🛑 Stopping EHB GitHub Auto-Push System...');
    console.log('✅ System stopped');
    process.exit(0);
  }
}

// Main execution
async function main() {
  const autoPusher = new GitHubAutoPusher();

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

module.exports = GitHubAutoPusher;
