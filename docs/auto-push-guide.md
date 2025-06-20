# EHB GitHub Auto-Push System

## Overview

The EHB GitHub Auto-Push System automatically monitors file changes in your project and pushes them to GitHub in real-time. This ensures your repository stays up-to-date with the latest changes without manual intervention.

## Features

- 🔄 **Real-time file monitoring** - Watches for file changes and additions
- ⚡ **Smart push scheduling** - Prevents excessive pushes with intelligent timing
- 🎯 **Critical file detection** - Immediate push for important files
- 🛡️ **Exclusion patterns** - Ignores unnecessary files (node_modules, logs, etc.)
- 📊 **Status monitoring** - Real-time status updates
- 🚫 **Conflict prevention** - Prevents overlapping push operations

## Quick Start

### 1. Basic Usage

```bash
# Start the auto-push system
npm run auto-push:start

# Or use the direct script
node scripts/start-auto-push.js
```

### 2. Advanced Usage

```bash
# Custom configuration
node scripts/github-auto-push.js --watchPath . --pushInterval 30000 --branch main
```

### 3. Available Scripts

```bash
npm run auto-push:start    # Start with EHB configuration
npm run auto-push:watch    # Start with custom parameters
npm run auto-push          # Legacy auto-push script
```

## Configuration

### Default Settings

```javascript
{
  watchPath: '.',                    // Directory to watch
  pushInterval: 45000,              // Push every 45 seconds
  branch: 'main',                   // Target branch
  commitMessage: 'EHB Auto-Push: Real-time data update',
  maxCommitsPerPush: 5,             // Maximum commits per push
  excludePatterns: [                // Files to ignore
    'node_modules/**',
    '.git/**',
    'dist/**',
    'build/**',
    '.next/**',
    '*.log',
    'temp-backup/**',
    'logs/**',
    'cypress/videos/**',
    'cypress/screenshots/**',
    'playwright-report/**',
    'test-results/**',
    'cursor-test-results/**',
    'ai-automation/logs/**',
    'ehb-backend/**',
    'ehb-frontend/**'
  ]
}
```

### Critical Files

The system automatically detects and immediately pushes changes to critical files:

- `package.json`, `package-lock.json`
- `next.config.js`, `tailwind.config.js`, `tsconfig.json`
- `.env` files
- All TypeScript/React files in `app/`, `components/`, `lib/`, `hooks/`, `services/`, `types/`

## How It Works

### 1. File Monitoring

- Uses `chokidar` to watch file system changes
- Monitors file additions, modifications, and deletions
- Ignores files based on exclusion patterns

### 2. Smart Push Logic

- **Immediate Push**: Critical files trigger immediate push
- **Periodic Push**: Other files are pushed every 45 seconds
- **Conflict Prevention**: Minimum 5-second gap between pushes
- **Batch Processing**: Groups multiple changes into single commits

### 3. Git Operations

- Stages all changes with `git add .`
- Creates timestamped commit messages
- Pushes to the configured branch
- Handles errors gracefully

## Status Monitoring

The system provides real-time status updates:

```
📊 Status Update:
   Pending Changes: 3
   Is Pushing: false
   Total Commits: 15
   Last Push: 2:30:45 PM
```

## Log Output

### Normal Operation

```
🚀 EHB GitHub Auto-Push System
================================
📋 Configuration:
   Watch Path: .
   Branch: main
   Push Interval: 45 seconds
   Commit Message: EHB Auto-Push: Real-time data update

✅ GitHub Auto-Push System is now active!
📁 Watching: .
⏱️  Push interval: 45 seconds
🌿 Branch: main
👀 File watcher initialized

📝 change: app/page.tsx
🔄 Starting push (critical)...
📦 Changes staged
💾 Changes committed
🚀 Changes pushed to remote
✅ Push completed successfully!
```

### Error Handling

```
❌ Push failed: Failed to push to remote: Authentication failed
💡 Make sure you have:
   1. Git initialized in this directory
   2. GitHub remote origin configured
   3. Proper permissions to push to the repository
```

## Prerequisites

### 1. Git Setup

```bash
# Initialize git (if not already done)
git init

# Add GitHub remote
git remote add origin https://github.com/yourusername/your-repo.git

# Configure git user
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### 2. GitHub Authentication

- **Personal Access Token**: Recommended for automated pushes
- **SSH Keys**: Alternative authentication method
- **GitHub CLI**: Can be used for authentication

### 3. Dependencies

```bash
npm install chokidar --save
```

## Troubleshooting

### Common Issues

#### 1. "Not a git repository"

```bash
# Solution: Initialize git
git init
git remote add origin https://github.com/yourusername/your-repo.git
```

#### 2. "No remote origin found"

```bash
# Solution: Add GitHub remote
git remote add origin https://github.com/yourusername/your-repo.git
```

#### 3. "Authentication failed"

```bash
# Solution: Configure authentication
# Option 1: Personal Access Token
git remote set-url origin https://your-token@github.com/yourusername/your-repo.git

# Option 2: SSH
git remote set-url origin git@github.com:yourusername/your-repo.git
```

#### 4. "Permission denied"

```bash
# Solution: Check repository permissions
# Make sure you have write access to the repository
```

## Best Practices

### 1. Commit Messages

- Use descriptive commit messages
- Include timestamps automatically
- Group related changes

### 2. File Organization

- Keep critical files in watched directories
- Organize files logically
- Use appropriate exclusion patterns

### 3. Monitoring

- Monitor system logs regularly
- Check GitHub repository activity
- Verify push success

### 4. Backup

- Maintain local backups
- Use multiple branches
- Implement rollback procedures

## Support

For issues and questions:

1. Check the troubleshooting section
2. Review the logs for error messages
3. Verify git and GitHub configuration
4. Test with a simple file change

The auto-push system is designed to be reliable and self-healing, but manual intervention may be required for complex issues.
