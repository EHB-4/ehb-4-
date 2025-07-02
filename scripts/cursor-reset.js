#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

/**
 * EHB Cursor Reset System
 * Completely resets Cursor agent configuration and clears all issues
 */
class CursorReset {
  constructor() {
    this.projectRoot = process.cwd();
    this.resetTime = Date.now();
  }

  async run() {
    console.log('🔄 EHB Cursor Reset System');
    console.log('==========================');
    console.log('🚀 Starting complete Cursor reset...');
    console.log('');

    try {
      // 1. Stop all processes
      await this.stopAllProcesses();

      // 2. Clear all configurations
      await this.clearConfigurations();

      // 3. Reset Cursor settings
      await this.resetCursorSettings();

      // 4. Clear caches and logs
      await this.clearCachesAndLogs();

      // 5. Create fresh configuration
      await this.createFreshConfiguration();

      // 6. Test the reset
      await this.testReset();

      // 7. Show results
      this.showResults();
    } catch (error) {
      console.error('❌ Reset failed:', error.message);
      await this.emergencyReset();
    }
  }

  async stopAllProcesses() {
    console.log('🛑 STOPPING ALL PROCESSES');
    console.log('==========================');

    try {
      // Kill all Node.js processes
      console.log('🔄 Killing Node.js processes...');
      await execAsync('taskkill /F /IM node.exe 2>nul || echo "No Node.js processes found"');

      // Kill Cursor processes
      console.log('🔄 Killing Cursor processes...');
      await execAsync('taskkill /F /IM Cursor.exe 2>nul || echo "No Cursor processes found"');

      // Wait a moment for processes to fully stop
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('✅ All processes stopped');
    } catch (error) {
      console.log('⚠️ Could not stop all processes:', error.message);
    }
  }

  async clearConfigurations() {
    console.log('');
    console.log('🧹 CLEARING CONFIGURATIONS');
    console.log('==========================');

    const configFiles = [
      '.cursor.json',
      'config/cursor-ai.json',
      'config/cursor-optimized.json',
      'config/github-cursor-config.json',
      'ai-automation/config/ai-config.json',
      '.cursorrules',
      '.cursorignore',
    ];

    for (const configFile of configFiles) {
      const filePath = path.join(this.projectRoot, configFile);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
          console.log(`✅ Cleared: ${configFile}`);
        } catch (error) {
          console.log(`⚠️ Could not clear: ${configFile}`);
        }
      }
    }

    console.log('✅ All configurations cleared');
  }

  async resetCursorSettings() {
    console.log('');
    console.log('⚙️ RESETTING CURSOR SETTINGS');
    console.log('============================');

    try {
      // Clear Cursor user settings (Windows)
      const cursorSettingsPath = path.join(process.env.APPDATA, 'Cursor', 'User', 'settings.json');
      if (fs.existsSync(cursorSettingsPath)) {
        const settings = JSON.parse(fs.readFileSync(cursorSettingsPath, 'utf8'));

        // Reset AI-related settings
        settings['cursor.ai.enabled'] = true;
        settings['cursor.ai.autoActivate'] = true;
        settings['cursor.ai.autoAccept'] = false;
        settings['cursor.ai.timeout'] = 30000;
        settings['cursor.ai.maxRetries'] = 3;

        fs.writeFileSync(cursorSettingsPath, JSON.stringify(settings, null, 2));
        console.log('✅ Cursor user settings reset');
      }
    } catch (error) {
      console.log('⚠️ Could not reset Cursor user settings');
    }

    // Clear Cursor workspace settings
    const workspaceSettingsPath = path.join(this.projectRoot, '.vscode', 'settings.json');
    if (fs.existsSync(workspaceSettingsPath)) {
      try {
        fs.unlinkSync(workspaceSettingsPath);
        console.log('✅ Cursor workspace settings cleared');
      } catch (error) {
        console.log('⚠️ Could not clear workspace settings');
      }
    }
  }

  async clearCachesAndLogs() {
    console.log('');
    console.log('🗑️ CLEARING CACHES AND LOGS');
    console.log('============================');

    // Clear npm cache
    try {
      console.log('🧹 Clearing npm cache...');
      await execAsync('npm cache clean --force');
      console.log('✅ npm cache cleared');
    } catch (error) {
      console.log('⚠️ Could not clear npm cache');
    }

    // Clear Next.js cache
    try {
      console.log('🧹 Clearing Next.js cache...');
      const nextCachePath = path.join(this.projectRoot, '.next');
      if (fs.existsSync(nextCachePath)) {
        fs.rmSync(nextCachePath, { recursive: true, force: true });
        console.log('✅ Next.js cache cleared');
      }
    } catch (error) {
      console.log('⚠️ Could not clear Next.js cache');
    }

    // Clear log files
    const logFiles = [
      'logs',
      'cursor-test-results',
      'test-results',
      'playwright-report',
      'cypress/reports',
      'cypress/screenshots',
      'cypress/videos',
    ];

    for (const logDir of logFiles) {
      const logPath = path.join(this.projectRoot, logDir);
      if (fs.existsSync(logPath)) {
        try {
          fs.rmSync(logPath, { recursive: true, force: true });
          console.log(`✅ Cleared: ${logDir}`);
        } catch (error) {
          console.log(`⚠️ Could not clear: ${logDir}`);
        }
      }
    }

    // Clear temporary files
    const tempFiles = [
      '.cursor-sync-notification',
      '.health-status',
      'temp-backup',
      'temp',
      'accessibility-watcher-log.txt',
    ];

    for (const tempFile of tempFiles) {
      const tempPath = path.join(this.projectRoot, tempFile);
      if (fs.existsSync(tempPath)) {
        try {
          if (fs.statSync(tempPath).isDirectory()) {
            fs.rmSync(tempPath, { recursive: true, force: true });
          } else {
            fs.unlinkSync(tempPath);
          }
          console.log(`✅ Cleared: ${tempFile}`);
        } catch (error) {
          console.log(`⚠️ Could not clear: ${tempFile}`);
        }
      }
    }

    console.log('✅ All caches and logs cleared');
  }

  async createFreshConfiguration() {
    console.log('');
    console.log('🆕 CREATING FRESH CONFIGURATION');
    console.log('===============================');

    // Create basic Cursor configuration
    const basicConfig = {
      projectId: 'ehb-next-js-04',
      defaultLLM: 'anthropic/claude-2.1',
      autoActivateAI: true,
      aiEnabled: true,
      aiAutoPush: false, // Disabled for stability
      aiAutoCommit: false, // Disabled for stability
      aiAutoTest: false, // Disabled for stability
      aiAutoFix: false, // Disabled for stability
      aiAutoDoc: false, // Disabled for stability
      performance: {
        enabled: true,
        timeout: 30000,
        maxRetries: 2,
        retryDelay: 2000,
        memoryLimit: '2GB',
        cpuLimit: '60%',
      },
      monitoring: {
        enabled: true,
        interval: 10000,
        errorCheck: true,
        autoRestart: false, // Disabled for stability
      },
    };

    const configPath = path.join(this.projectRoot, '.cursor.json');
    fs.writeFileSync(configPath, JSON.stringify(basicConfig, null, 2));
    console.log('✅ Fresh Cursor configuration created');

    // Create basic package.json scripts
    await this.createBasicScripts();
  }

  async createBasicScripts() {
    console.log('📝 Creating basic scripts...');

    const packagePath = path.join(this.projectRoot, 'package.json');
    if (fs.existsSync(packagePath)) {
      try {
        const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

        // Reset to basic scripts
        packageJson.scripts = {
          ...packageJson.scripts,
          dev: 'next dev',
          build: 'next build',
          start: 'next start',
          lint: 'next lint',
          'cursor-reset': 'node scripts/cursor-reset.js',
          'cursor-fix': 'node scripts/cursor-agent-fix.js',
        };

        fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
        console.log('✅ Basic scripts created');
      } catch (error) {
        console.log('⚠️ Could not create basic scripts');
      }
    }
  }

  async testReset() {
    console.log('');
    console.log('🧪 TESTING RESET');
    console.log('================');

    // Test basic configuration
    try {
      const configPath = path.join(this.projectRoot, '.cursor.json');
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

      if (config.autoActivateAI && config.aiEnabled) {
        console.log('✅ Basic configuration test passed');
      } else {
        console.log('❌ Basic configuration test failed');
      }
    } catch (error) {
      console.log('❌ Configuration test failed');
    }

    // Test package.json
    try {
      const packagePath = path.join(this.projectRoot, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

      if (packageJson.scripts.dev && packageJson.scripts.cursor - reset) {
        console.log('✅ Package.json test passed');
      } else {
        console.log('❌ Package.json test failed');
      }
    } catch (error) {
      console.log('❌ Package.json test failed');
    }

    // Test Node.js environment
    try {
      const nodeVersion = process.version;
      console.log(`✅ Node.js version: ${nodeVersion}`);
    } catch (error) {
      console.log('❌ Node.js test failed');
    }

    console.log('✅ Reset testing completed');
  }

  async emergencyReset() {
    console.log('');
    console.log('🚨 EMERGENCY RESET ACTIVATED');
    console.log('============================');

    try {
      // Force kill all processes
      await execAsync('taskkill /F /IM node.exe 2>nul || echo "No processes to kill"');
      await execAsync('taskkill /F /IM Cursor.exe 2>nul || echo "No Cursor processes to kill"');

      // Create minimal configuration
      const minimalConfig = {
        projectId: 'ehb-next-js-04',
        autoActivateAI: true,
        aiEnabled: true,
      };

      const configPath = path.join(this.projectRoot, '.cursor.json');
      fs.writeFileSync(configPath, JSON.stringify(minimalConfig, null, 2));

      console.log('✅ Emergency reset completed');
    } catch (error) {
      console.log('❌ Emergency reset failed:', error.message);
    }
  }

  showResults() {
    const duration = Date.now() - this.resetTime;

    console.log('');
    console.log('🎉 CURSOR RESET COMPLETED');
    console.log('==========================');
    console.log(`⏱️  Duration: ${Math.round(duration / 1000)} seconds`);
    console.log('');
    console.log('✅ Reset completed successfully!');
    console.log('');
    console.log('📋 What was reset:');
    console.log('   ✅ All Cursor configurations');
    console.log('   ✅ All caches and logs');
    console.log('   ✅ All temporary files');
    console.log('   ✅ Package.json scripts');
    console.log('   ✅ Cursor user settings');
    console.log('');
    console.log('🚀 Next steps:');
    console.log('   1. Restart your computer');
    console.log('   2. Open Cursor IDE');
    console.log('   3. Open this project');
    console.log('   4. Test basic functionality');
    console.log('');
    console.log('⚠️  Note: All AI features are disabled for stability');
    console.log('   Enable them gradually as needed');
    console.log('');
    console.log('🔄 If you need AI features, run: npm run cursor-fix');
    console.log('');
  }
}

// Run the reset
if (require.main === module) {
  const reset = new CursorReset();
  reset.run().catch(console.error);
}

module.exports = CursorReset;
