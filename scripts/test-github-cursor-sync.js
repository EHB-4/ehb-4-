#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Test script for GitHub-to-Cursor Auto-Push System
 */
class GitHubCursorSyncTester {
  constructor() {
    this.testResults = [];
    this.errors = [];
  }

  async runTests() {
    console.log('🧪 Testing EHB GitHub-to-Cursor Auto-Push System...\n');

    // Run all tests
    await this.testDependencies();
    await this.testGitSetup();
    await this.testCursorDetection();
    await this.testConfiguration();
    await this.testFileWatching();
    await this.testSyncOperations();

    // Display results
    this.displayResults();
  }

  async testDependencies() {
    console.log('📦 Testing Dependencies...');

    try {
      // Test Node.js
      const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
      this.addResult('Node.js', true, `Version: ${nodeVersion}`);
    } catch (error) {
      this.addResult('Node.js', false, 'Not installed or not in PATH');
    }

    try {
      // Test npm
      const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
      this.addResult('npm', true, `Version: ${npmVersion}`);
    } catch (error) {
      this.addResult('npm', false, 'Not available');
    }

    try {
      // Test chokidar
      require('chokidar');
      this.addResult('chokidar', true, 'Installed');
    } catch (error) {
      this.addResult('chokidar', false, 'Not installed - run: npm install chokidar');
    }

    try {
      // Test git
      const gitVersion = execSync('git --version', { encoding: 'utf8' }).trim();
      this.addResult('Git', true, gitVersion);
    } catch (error) {
      this.addResult('Git', false, 'Not installed or not in PATH');
    }
  }

  async testGitSetup() {
    console.log('🔧 Testing Git Setup...');

    try {
      // Test if git repository
      execSync('git rev-parse --git-dir', { stdio: 'ignore' });
      this.addResult('Git Repository', true, 'Initialized');
    } catch (error) {
      this.addResult('Git Repository', false, 'Not initialized - run: git init');
      return;
    }

    try {
      // Test remote origin
      const remotes = execSync('git remote -v', { encoding: 'utf8' });
      if (remotes.includes('origin')) {
        const originUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
        this.addResult('Remote Origin', true, originUrl);
      } else {
        this.addResult(
          'Remote Origin',
          false,
          'Not configured - run: git remote add origin <your-repo-url>'
        );
      }
    } catch (error) {
      this.addResult('Remote Origin', false, 'Error checking remote');
    }

    try {
      // Test current branch
      const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
      this.addResult('Current Branch', true, branch);
    } catch (error) {
      this.addResult('Current Branch', false, 'Error getting branch');
    }
  }

  async testCursorDetection() {
    console.log('🚀 Testing Cursor Detection...');

    const cursorPaths = [
      'cursor',
      'Cursor',
      path.join(process.env.APPDATA, 'Cursor', 'Cursor.exe'),
      path.join(process.env.LOCALAPPDATA, 'Programs', 'Cursor', 'Cursor.exe'),
    ];

    let cursorFound = false;
    for (const cursorPath of cursorPaths) {
      try {
        execSync(`${cursorPath} --version`, { stdio: 'ignore' });
        this.addResult('Cursor IDE', true, `Found at: ${cursorPath}`);
        cursorFound = true;
        break;
      } catch (error) {
        // Continue checking other paths
      }
    }

    if (!cursorFound) {
      this.addResult(
        'Cursor IDE',
        false,
        'Not found in common paths - install from https://cursor.sh/'
      );
    }
  }

  async testConfiguration() {
    console.log('⚙️  Testing Configuration...');

    const configPath = path.join(process.cwd(), 'config', 'github-cursor-config.json');

    if (fs.existsSync(configPath)) {
      try {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        this.addResult('Configuration File', true, 'Valid JSON configuration');

        // Test required fields
        const requiredFields = [
          'watchPath',
          'pushInterval',
          'pullInterval',
          'commitMessage',
          'branch',
        ];
        const missingFields = requiredFields.filter(field => !config[field]);

        if (missingFields.length === 0) {
          this.addResult('Configuration Fields', true, 'All required fields present');
        } else {
          this.addResult('Configuration Fields', false, `Missing: ${missingFields.join(', ')}`);
        }
      } catch (error) {
        this.addResult('Configuration File', false, 'Invalid JSON format');
      }
    } else {
      this.addResult('Configuration File', false, 'Not found - will use defaults');
    }
  }

  async testFileWatching() {
    console.log('👀 Testing File Watching...');

    try {
      const chokidar = require('chokidar');
      const watcher = chokidar.watch('.', {
        ignored: ['node_modules/**', '.git/**'],
        persistent: false,
        ignoreInitial: true,
      });

      let fileChangeDetected = false;

      watcher.on('ready', () => {
        // Create a test file
        const testFile = path.join(process.cwd(), 'test-sync-file.txt');
        fs.writeFileSync(testFile, 'Test content');

        setTimeout(() => {
          // Clean up test file
          if (fs.existsSync(testFile)) {
            fs.unlinkSync(testFile);
          }
          watcher.close();
        }, 100);
      });

      watcher.on('add', () => {
        fileChangeDetected = true;
      });

      // Wait for watcher to complete
      await new Promise(resolve => {
        setTimeout(() => {
          if (fileChangeDetected) {
            this.addResult('File Watching', true, 'File changes detected');
          } else {
            this.addResult('File Watching', false, 'No file changes detected');
          }
          resolve();
        }, 200);
      });
    } catch (error) {
      this.addResult('File Watching', false, `Error: ${error.message}`);
    }
  }

  async testSyncOperations() {
    console.log('🔄 Testing Sync Operations...');

    try {
      // Test git status
      const status = execSync('git status --porcelain', { encoding: 'utf8' });
      if (status.trim()) {
        this.addResult(
          'Git Status',
          true,
          `${status.split('\n').filter(line => line.trim()).length} changes detected`
        );
      } else {
        this.addResult('Git Status', true, 'Working directory clean');
      }
    } catch (error) {
      this.addResult('Git Status', false, `Error: ${error.message}`);
    }

    try {
      // Test git fetch
      execSync('git fetch origin', { stdio: 'ignore' });
      this.addResult('Git Fetch', true, 'Remote fetch successful');
    } catch (error) {
      this.addResult('Git Fetch', false, `Error: ${error.message}`);
    }

    try {
      // Test if we can commit
      const hasChanges = execSync('git diff --cached --name-only', { encoding: 'utf8' }).trim();
      if (hasChanges) {
        this.addResult('Git Commit', true, 'Changes ready to commit');
      } else {
        this.addResult('Git Commit', true, 'No staged changes');
      }
    } catch (error) {
      this.addResult('Git Commit', false, `Error: ${error.message}`);
    }
  }

  addResult(test, passed, message) {
    this.testResults.push({
      test,
      passed,
      message,
      timestamp: new Date().toISOString(),
    });
  }

  displayResults() {
    console.log('\n📊 Test Results Summary:');
    console.log('========================');

    const passed = this.testResults.filter(r => r.passed).length;
    const total = this.testResults.length;
    const failed = total - passed;

    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📈 Success Rate: ${((passed / total) * 100).toFixed(1)}%`);

    console.log('\n📋 Detailed Results:');
    console.log('===================');

    this.testResults.forEach(result => {
      const status = result.passed ? '✅' : '❌';
      console.log(`${status} ${result.test}: ${result.message}`);
    });

    if (failed > 0) {
      console.log('\n🔧 Recommendations:');
      console.log('==================');

      this.testResults
        .filter(r => !r.passed)
        .forEach(result => {
          console.log(`• Fix ${result.test}: ${result.message}`);
        });
    }

    console.log('\n🚀 Next Steps:');
    console.log('==============');

    if (passed === total) {
      console.log('🎉 All tests passed! You can now run:');
      console.log('   npm run github-cursor:start');
    } else {
      console.log('⚠️  Please fix the failed tests before running the sync system.');
    }
  }
}

// Run tests if called directly
if (require.main === module) {
  const tester = new GitHubCursorSyncTester();
  tester.runTests().catch(console.error);
}

module.exports = GitHubCursorSyncTester;
