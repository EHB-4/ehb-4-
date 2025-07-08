#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Test Script for Agent Auto Sync System
 * Verifies all components are working correctly
 */

class AgentSyncTester {
  constructor() {
    this.projectRoot = process.cwd();
    this.testResults = [];
  }

  /**
   * Run all tests
   */
  async runTests() {
    console.log('🧪 Running Agent Auto Sync System Tests...\n');
    
    // Test 1: Check dependencies
    this.testDependencies();
    
    // Test 2: Check Git repository
    this.testGitRepository();
    
    // Test 3: Check script files
    this.testScriptFiles();
    
    // Test 4: Test agent detection
    this.testAgentDetection();
    
    // Test 5: Test sync functionality
    this.testSyncFunctionality();
    
    // Test 6: Test file monitoring
    this.testFileMonitoring();
    
    // Display results
    this.displayResults();
  }

  /**
   * Test dependencies
   */
  testDependencies() {
    console.log('📦 Testing Dependencies...');
    
    // Test Node.js
    try {
      const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
      this.addResult('Node.js', true, `Version: ${nodeVersion}`);
    } catch (error) {
      this.addResult('Node.js', false, 'Node.js not found');
    }
    
    // Test Git
    try {
      const gitVersion = execSync('git --version', { encoding: 'utf8' }).trim();
      this.addResult('Git', true, `Version: ${gitVersion}`);
    } catch (error) {
      this.addResult('Git', false, 'Git not found');
    }
    
    // Test PowerShell (Windows)
    try {
      const psVersion = execSync('powershell -Command "$PSVersionTable.PSVersion"', { encoding: 'utf8' }).trim();
      this.addResult('PowerShell', true, `Version: ${psVersion}`);
    } catch (error) {
      this.addResult('PowerShell', false, 'PowerShell not available');
    }
  }

  /**
   * Test Git repository
   */
  testGitRepository() {
    console.log('📁 Testing Git Repository...');
    
    const gitDir = path.join(this.projectRoot, '.git');
    
    if (fs.existsSync(gitDir)) {
      this.addResult('Git Repository', true, 'Repository found');
      
      // Test remote
      try {
        const remote = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
        this.addResult('Git Remote', true, `Remote: ${remote}`);
      } catch (error) {
        this.addResult('Git Remote', false, 'No remote configured');
      }
      
      // Test branch
      try {
        const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
        this.addResult('Git Branch', true, `Current branch: ${branch}`);
      } catch (error) {
        this.addResult('Git Branch', false, 'Could not determine branch');
      }
    } else {
      this.addResult('Git Repository', false, 'No Git repository found');
    }
  }

  /**
   * Test script files
   */
  testScriptFiles() {
    console.log('📜 Testing Script Files...');
    
    const scripts = [
      'scripts/agent-auto-sync.js',
      'scripts/agent-sync-integration.js',
      'scripts/start-agent-sync.ps1',
      'scripts/start-agent-sync.bat'
    ];
    
    scripts.forEach(script => {
      const scriptPath = path.join(this.projectRoot, script);
      if (fs.existsSync(scriptPath)) {
        const stats = fs.statSync(scriptPath);
        this.addResult(script, true, `${(stats.size / 1024).toFixed(1)} KB`);
      } else {
        this.addResult(script, false, 'File not found');
      }
    });
  }

  /**
   * Test agent detection
   */
  testAgentDetection() {
    console.log('🤖 Testing Agent Detection...');
    
    try {
      const processes = execSync('tasklist /FO CSV', { encoding: 'utf8' });
      const lines = processes.split('\n');
      
      const agentPatterns = ['cursor', 'agent', 'ai', 'automation', 'assistant', 'copilot'];
      const foundAgents = [];
      
      for (const line of lines) {
        for (const pattern of agentPatterns) {
          if (line.toLowerCase().includes(pattern.toLowerCase())) {
            const parts = line.split(',');
            if (parts.length > 1) {
              const processName = parts[0].replace(/"/g, '');
              if (!foundAgents.includes(processName)) {
                foundAgents.push(processName);
              }
            }
          }
        }
      }
      
      if (foundAgents.length > 0) {
        this.addResult('Agent Detection', true, `Found: ${foundAgents.join(', ')}`);
      } else {
        this.addResult('Agent Detection', true, 'No agents currently running');
      }
    } catch (error) {
      this.addResult('Agent Detection', false, `Error: ${error.message}`);
    }
  }

  /**
   * Test sync functionality
   */
  testSyncFunctionality() {
    console.log('🔄 Testing Sync Functionality...');
    
    // Test if we can run the sync script
    try {
      const syncScript = path.join(this.projectRoot, 'scripts', 'agent-auto-sync.js');
      if (fs.existsSync(syncScript)) {
        // Test status command
        const status = execSync(`node "${syncScript}" status`, { encoding: 'utf8' });
        this.addResult('Sync Script', true, 'Script executable');
        
        // Check if Git status works
        try {
          const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
          this.addResult('Git Status', true, 'Git status accessible');
        } catch (error) {
          this.addResult('Git Status', false, `Error: ${error.message}`);
        }
      } else {
        this.addResult('Sync Script', false, 'Script not found');
      }
    } catch (error) {
      this.addResult('Sync Script', false, `Error: ${error.message}`);
    }
  }

  /**
   * Test file monitoring
   */
  testFileMonitoring() {
    console.log('👀 Testing File Monitoring...');
    
    const testDirs = [
      'app',
      'components',
      'scripts',
      'lib'
    ];
    
    testDirs.forEach(dir => {
      const dirPath = path.join(this.projectRoot, dir);
      if (fs.existsSync(dirPath)) {
        const stats = fs.statSync(dirPath);
        if (stats.isDirectory()) {
          this.addResult(`Directory: ${dir}`, true, 'Directory accessible');
        } else {
          this.addResult(`Directory: ${dir}`, false, 'Not a directory');
        }
      } else {
        this.addResult(`Directory: ${dir}`, false, 'Directory not found');
      }
    });
    
    // Test file watching capability
    try {
      const testFile = path.join(this.projectRoot, 'temp', 'test-watch.txt');
      const tempDir = path.dirname(testFile);
      
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }
      
      fs.writeFileSync(testFile, 'test');
      fs.unlinkSync(testFile);
      
      this.addResult('File Watching', true, 'File operations working');
    } catch (error) {
      this.addResult('File Watching', false, `Error: ${error.message}`);
    }
  }

  /**
   * Add test result
   */
  addResult(test, passed, message) {
    this.testResults.push({
      test,
      passed,
      message
    });
  }

  /**
   * Display test results
   */
  displayResults() {
    console.log('\n📊 Test Results:');
    console.log('================');
    
    let passed = 0;
    let total = this.testResults.length;
    
    this.testResults.forEach(result => {
      const status = result.passed ? '✅' : '❌';
      const color = result.passed ? '\x1b[32m' : '\x1b[31m';
      const reset = '\x1b[0m';
      
      console.log(`${status} ${color}${result.test}${reset}: ${result.message}`);
      
      if (result.passed) {
        passed++;
      }
    });
    
    console.log('\n📈 Summary:');
    console.log(`Passed: ${passed}/${total} (${Math.round(passed/total*100)}%)`);
    
    if (passed === total) {
      console.log('\n🎉 All tests passed! Agent Auto Sync System is ready to use.');
      console.log('\n🚀 To start the system:');
      console.log('   node scripts/agent-sync-integration.js start');
      console.log('   or');
      console.log('   .\\scripts\\start-agent-sync.ps1 start');
    } else {
      console.log('\n⚠️ Some tests failed. Please fix the issues before using the system.');
      console.log('\n🔧 Common fixes:');
      console.log('   - Install Node.js: https://nodejs.org/');
      console.log('   - Install Git: https://git-scm.com/');
      console.log('   - Initialize Git repository: git init');
      console.log('   - Add remote: git remote add origin <your-repo>');
    }
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  const tester = new AgentSyncTester();
  tester.runTests();
}

module.exports = AgentSyncTester; 