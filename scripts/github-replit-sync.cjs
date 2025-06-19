const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const execAsync = promisify(exec);

class GitHubReplitSync {
  constructor() {
    this.projectRoot = process.cwd();
    this.replitToken = process.env.REPLIT_TOKEN;
    this.replitUrl = process.env.REPLIT_GIT_URL;
    this.isRunning = false;
  }

  log(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
  }

  async setupReplit() {
    try {
      // Check if .replit and replit.nix exist
      if (!fs.existsSync('.replit')) {
        const replitConfig = `
run = "npm run dev:5500"
language = "nodejs"
entrypoint = "app/page.tsx"

[nix]
channel = "stable-22_11"

[deployment]
run = ["sh", "-c", "npm run start"]
deploymentTarget = "cloudrun"
ignorePorts = false

[languages]
javascript = "nodejs-18"
typescript = "nodejs-18"

[env]
NEXT_PUBLIC_API_URL = "https://$REPL_SLUG.$REPL_OWNER.repl.co/api"
NEXTAUTH_URL = "https://$REPL_SLUG.$REPL_OWNER.repl.co"

[packager]
language = "nodejs"
respectLockFile = true

[packager.features]
packageSearch = true
guessImports = true

[languages.javascript]
pattern = "**/{*.js,*.jsx,*.ts,*.tsx}"
syntax = "javascript"

[languages.javascript.languageServer]
start = "typescript-language-server --stdio"
`;
        fs.writeFileSync('.replit', replitConfig);
        this.log('✅ Created .replit configuration');
      }

      if (!fs.existsSync('replit.nix')) {
        const replitNix = `
{ pkgs }: {
  deps = [
    pkgs.nodejs-18_x
    pkgs.nodePackages.typescript
    pkgs.nodePackages.pm2
    pkgs.yarn
    pkgs.replitPackages.jest
  ];
  env = {
    LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
      pkgs.libuuid
    ];
  };
}
`;
        fs.writeFileSync('replit.nix', replitNix);
        this.log('✅ Created replit.nix configuration');
      }
    } catch (error) {
      this.log(`❌ Error setting up Replit config: ${error.message}`);
    }
  }

  async setupGitHubActions() {
    try {
      const workflowsDir = path.join(this.projectRoot, '.github', 'workflows');
      if (!fs.existsSync(workflowsDir)) {
        fs.mkdirSync(workflowsDir, { recursive: true });
      }

      const replitSync = `
name: Sync to Replit

on:
  push:
    branches: [ main, master ]
  workflow_dispatch:

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0
      
      - name: Push to Replit
        env:
          REPLIT_TOKEN: \${{ secrets.REPLIT_TOKEN }}
          REPLIT_URL: \${{ secrets.REPLIT_GIT_URL }}
        run: |
          git remote add replit $REPLIT_URL
          git push replit \${GITHUB_REF#refs/heads/}:master --force
`;

      fs.writeFileSync(path.join(workflowsDir, 'replit-sync.yml'), replitSync.trim());
      this.log('✅ Created GitHub Actions workflow for Replit sync');
    } catch (error) {
      this.log(`❌ Error setting up GitHub Actions: ${error.message}`);
    }
  }

  async addReplitRemote() {
    try {
      if (!this.replitUrl) {
        this.log('⚠️ REPLIT_GIT_URL not set. Please set it in your environment variables.');
        return;
      }

      // Check if replit remote exists
      const { stdout: remotes } = await execAsync('git remote');
      if (!remotes.includes('replit')) {
        await execAsync(`git remote add replit ${this.replitUrl}`);
        this.log('✅ Added Replit remote');
      }
    } catch (error) {
      this.log(`❌ Error adding Replit remote: ${error.message}`);
    }
  }

  async pushToReplit() {
    try {
      if (!this.replitUrl) {
        this.log('⚠️ REPLIT_GIT_URL not set');
        return;
      }

      // Get current branch
      const { stdout: branch } = await execAsync('git rev-parse --abbrev-ref HEAD');
      const currentBranch = branch.trim();

      // Push to replit
      await execAsync(`git push replit ${currentBranch}:master --force`);
      this.log('✅ Pushed to Replit successfully');
    } catch (error) {
      this.log(`❌ Error pushing to Replit: ${error.message}`);
    }
  }

  async setupHooks() {
    try {
      const hooksDir = path.join(this.projectRoot, '.git', 'hooks');
      const postPushHook = path.join(hooksDir, 'post-push');

      const hookContent = `
#!/bin/sh
node "${path.join(this.projectRoot, 'scripts', 'github-replit-sync.cjs')}" --push
`;

      fs.writeFileSync(postPushHook, hookContent);
      fs.chmodSync(postPushHook, '755');
      this.log('✅ Set up Git hooks for auto-sync');
    } catch (error) {
      this.log(`❌ Error setting up hooks: ${error.message}`);
    }
  }

  async start() {
    this.log('🚀 Starting GitHub to Replit Sync Setup');

    // Setup configurations
    await this.setupReplit();
    await this.setupGitHubActions();
    await this.addReplitRemote();
    await this.setupHooks();

    // If --push flag is present, push to Replit
    if (process.argv.includes('--push')) {
      await this.pushToReplit();
    }
  }
}

// Auto-start if run directly
if (require.main === module) {
  const sync = new GitHubReplitSync();
  sync.start();
}

module.exports = GitHubReplitSync;
