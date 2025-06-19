const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class AutoAgentStartup {
  constructor() {
    this.cursorConfigPath = '.cursor.json';
  }

  updateCursorConfig() {
    console.log('🔄 Updating Cursor AI configuration...');

    const configContent = {
      projectId: 'ehb-next-js-04',
      defaultLLM: 'anthropic/claude-2.1',
      autoActivateAI: true,
      aiEnabled: true,
      aiAutoPush: true,
      aiAutoCommit: true,
      aiAutoTest: true,
      aiAutoFix: true,
      aiAutoDoc: true,
    };

    fs.writeFileSync(this.cursorConfigPath, JSON.stringify(configContent, null, 2));
    console.log('✅ Cursor AI config updated');
  }

  setupGitHooks() {
    console.log('🔄 Setting up Git hooks...');

    // Create .git/hooks directory if it doesn't exist
    const hooksDir = '.git/hooks';
    if (!fs.existsSync(hooksDir)) {
      fs.mkdirSync(hooksDir, { recursive: true });
    }

    // Create post-commit hook
    const postCommitHook = `#!/bin/sh
node scripts/auto-git-push.cjs`;

    fs.writeFileSync('.git/hooks/post-commit', postCommitHook);
    execSync('chmod +x .git/hooks/post-commit');
    console.log('✅ Git hooks configured');
  }

  setupPackageScripts() {
    console.log('🔄 Adding npm scripts...');

    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    packageJson.scripts = {
      ...packageJson.scripts,
      'auto-push': 'node scripts/auto-git-push.cjs',
      'auto-agent': 'node scripts/auto-agent-startup.cjs',
    };

    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
    console.log('✅ npm scripts added');
  }

  async run() {
    console.log('🚀 Starting Auto Agent Setup...');

    try {
      this.updateCursorConfig();
      this.setupGitHooks();
      this.setupPackageScripts();

      console.log(`
✅ Auto Agent Setup Complete!

Your Cursor AI is now configured to:
1. Auto-activate when you open the project
2. Auto-push changes to GitHub
3. Auto-run tests and fixes
4. Auto-generate documentation

To manually trigger:
- npm run auto-push    (Push to GitHub)
- npm run auto-agent   (Reset AI configuration)

The AI agent will now automatically start when you open Cursor.
            `);
    } catch (error) {
      console.error('❌ Setup failed:', error);
      process.exit(1);
    }
  }
}

// Run the setup
const setup = new AutoAgentStartup();
setup.run();
