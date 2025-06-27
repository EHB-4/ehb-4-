# EHB GitHub-to-Cursor Auto-Push System Guide

## Overview

The EHB GitHub-to-Cursor Auto-Push System automatically synchronizes your project files between GitHub and Cursor IDE in real-time. This ensures seamless collaboration and automatic backup of your code changes.

## Features

- ✅ **Bidirectional Sync**: Automatically pushes local changes to GitHub and pulls remote changes
- ✅ **Cursor Integration**: Automatically opens and notifies Cursor IDE about changes
- ✅ **Real-time Monitoring**: Watches file changes and syncs immediately
- ✅ **Intelligent Prioritization**: Critical files are synced immediately
- ✅ **Conflict Resolution**: Handles merge conflicts automatically
- ✅ **Performance Monitoring**: Tracks sync performance and statistics
- ✅ **Multiple Startup Methods**: Batch files, PowerShell, and npm scripts
- ✅ **Configuration Management**: Customizable settings via JSON config

## Quick Start

### Method 1: Using npm scripts (Recommended)

```bash
# Start the GitHub-to-Cursor sync system
npm run github-cursor:start

# Or use the enhanced version with watch mode
npm run github-cursor:watch

# Check system status
npm run github-cursor:status

# View configuration
npm run github-cursor:config
```

### Method 2: Using batch file (Windows)

```bash
# Double-click or run from command line
start-github-cursor-sync.bat
```

### Method 3: Using PowerShell (Windows)

```powershell
# Run PowerShell script
npm run github-cursor:ps

# Or directly
powershell -ExecutionPolicy Bypass -File start-github-cursor-sync.ps1

# Check status
powershell -ExecutionPolicy Bypass -File start-github-cursor-sync.ps1 -Status

# View configuration
powershell -ExecutionPolicy Bypass -File start-github-cursor-sync.ps1 -Config
```

### Method 4: Direct Node.js execution

```bash
# Run the sync script directly
node scripts/github-to-cursor-auto-push.js
```

## Prerequisites

### 1. Node.js Installation

Make sure Node.js is installed on your system:

```bash
node --version
npm --version
```

### 2. Git Repository Setup

Ensure your project is a git repository with a GitHub remote:

```bash
# Check if git is initialized
git status

# If not initialized, run:
git init

# Add remote origin (replace with your GitHub repo URL)
git remote add origin https://github.com/yourusername/ehb-next-js-04.git
```

### 3. Cursor IDE Installation

Install Cursor IDE from https://cursor.sh/

### 4. Dependencies Installation

The system will automatically install required dependencies, but you can also install them manually:

```bash
npm run github-cursor:install
```

## Configuration

### Auto-Push Script Configuration

The main sync script (`scripts/github-to-cursor-auto-push.js`) can be configured by modifying `config/github-cursor-config.json`:

```json
{
  "watchPath": ".",
  "pushInterval": 30000,
  "pullInterval": 60000,
  "commitMessage": "EHB Auto-Push to Cursor",
  "branch": "main",
  "autoOpenCursor": true,
  "excludePatterns": [
    "node_modules/**",
    ".git/**",
    ".next/**",
    "dist/**",
    "build/**",
    "*.log",
    "temp-backup/**",
    "logs/**",
    "cypress/videos/**",
    "cypress/screenshots/**",
    "playwright-report/**",
    "test-results/**",
    ".cursor/**",
    ".vscode/**"
  ],
  "criticalFiles": [
    "package.json",
    "next.config.js",
    "tailwind.config.js",
    "tsconfig.json",
    "app/**/*.tsx",
    "app/**/*.ts",
    "components/**/*.tsx",
    "components/**/*.ts",
    "lib/**/*.ts",
    "hooks/**/*.ts",
    "scripts/**/*.js",
    "scripts/**/*.ts"
  ],
  "cursorPaths": [
    "cursor",
    "Cursor",
    "C:\\Users\\%USERNAME%\\AppData\\Local\\Programs\\Cursor\\Cursor.exe",
    "C:\\Users\\%USERNAME%\\AppData\\Roaming\\Cursor\\Cursor.exe"
  ],
  "notifications": {
    "enabled": true,
    "showDesktopNotification": true,
    "logToFile": true
  },
  "sync": {
    "autoResolveConflicts": true,
    "backupBeforeSync": true,
    "maxRetries": 3
  }
}
```

### Configuration Options

| Option            | Description                       | Default                     |
| ----------------- | --------------------------------- | --------------------------- |
| `watchPath`       | Directory to watch for changes    | `.`                         |
| `pushInterval`    | Push interval in milliseconds     | `30000` (30s)               |
| `pullInterval`    | Pull interval in milliseconds     | `60000` (60s)               |
| `commitMessage`   | Default commit message            | `"EHB Auto-Push to Cursor"` |
| `branch`          | Target branch for sync            | `"main"`                    |
| `autoOpenCursor`  | Automatically open Cursor IDE     | `true`                      |
| `excludePatterns` | Files/directories to ignore       | See config                  |
| `criticalFiles`   | Files that trigger immediate sync | See config                  |

## File Priority System

The system categorizes files by priority:

**Critical Files** (immediate sync):

- `package.json`
- `next.config.js`
- `tailwind.config.js`
- `tsconfig.json`
- `app/**/*.tsx`
- `components/**/*.tsx`
- `lib/**/*.ts`
- `hooks/**/*.ts`
- `scripts/**/*.js`

**High Priority Files** (quick sync):

- `*.tsx`, `*.ts`, `*.js` files
- `docs/**/*`
- `*.md`

**Normal Files** (batch sync):

- All other files

## Usage Examples

### Basic Usage

```bash
# Start the sync system
npm run github-cursor:start
```

### With Custom Configuration

```bash
# Start with custom options
node scripts/github-to-cursor-auto-push.js --watchPath ./app --pushInterval 60000
```

### Monitoring Mode

```bash
# Start with enhanced monitoring
npm run github-cursor:watch
```

### Check System Status

```bash
# Check current system status
npm run github-cursor:status
```

## What the System Does

### 1. File Watching

- Monitors all project files for changes
- Ignores temporary files and build artifacts
- Categorizes changes by priority

### 2. Automatic Pushing to GitHub

- Stages all changes automatically
- Creates intelligent commit messages with timestamps
- Pushes changes to GitHub every 30 seconds
- Handles conflicts automatically

### 3. Automatic Pulling from GitHub

- Checks for remote changes every 60 seconds
- Pulls changes automatically
- Notifies Cursor about new changes

### 4. Cursor Integration

- Automatically opens Cursor IDE with the project
- Creates notification files for Cursor
- Provides real-time feedback about sync status

### 5. Performance Monitoring

- Tracks push/pull performance
- Monitors memory usage
- Logs error statistics

## Monitoring and Logs

### Real-time Status

The system provides real-time status updates:

```
🚀 Starting EHB GitHub-to-Cursor Auto-Push System...
✅ All checks passed!
👀 File watcher initialized
⏰ Periodic sync scheduled
🚀 Cursor IDE opened with project
✅ EHB GitHub-to-Cursor Auto-Push System is now active!
📊 Monitoring GitHub ↔ Cursor synchronization...

📝 change: app/page.tsx (critical)
🔄 Starting push to GitHub (critical)...
📦 Changes staged
💾 Changes committed
🚀 Changes pushed to GitHub
✅ Push to GitHub completed successfully!
📢 Cursor notified: Changes pushed to GitHub

📥 Starting pull from GitHub (periodic)...
📥 Changes pulled from GitHub
✅ Pull from GitHub completed successfully!
📢 Cursor notified: Changes pulled from GitHub

📊 Status: 0 pending, 5 commits, 2 pulls
```

### Status Information

The system tracks:

- Number of pending changes
- Total commits pushed
- Total pulls from GitHub
- Last push/pull times
- Cursor integration status

## Troubleshooting

### Common Issues

1. **Cursor not found**

   ```
   ⚠️  Cursor IDE not found. Auto-push will work without Cursor integration.
   ```

   Solution: Install Cursor IDE or update the cursor paths in configuration

2. **Git remote not configured**

   ```
   ❌ No remote origin found. Please add GitHub remote first.
   ```

   Solution: Add GitHub remote: `git remote add origin <your-repo-url>`

3. **Permission denied**

   ```
   ❌ Push failed: Permission denied
   ```

   Solution: Check GitHub authentication and repository permissions

4. **Merge conflicts**
   ```
   ❌ Pull failed: Merge conflict
   ```
   Solution: The system will attempt to auto-resolve conflicts

### Error Recovery

The system includes automatic error recovery:

- Retries failed operations up to 3 times
- Graceful handling of network issues
- Automatic conflict resolution
- Backup creation before sync operations

## Advanced Features

### Custom Cursor Paths

Add custom Cursor installation paths to the configuration:

```json
{
  "cursorPaths": ["cursor", "Cursor", "C:\\CustomPath\\Cursor\\Cursor.exe", "/usr/local/bin/cursor"]
}
```

### Notification Settings

Configure notification behavior:

```json
{
  "notifications": {
    "enabled": true,
    "showDesktopNotification": true,
    "logToFile": true
  }
}
```

### Sync Settings

Configure sync behavior:

```json
{
  "sync": {
    "autoResolveConflicts": true,
    "backupBeforeSync": true,
    "maxRetries": 3
  }
}
```

## Performance Optimization

### Recommended Settings

For optimal performance:

```json
{
  "pushInterval": 30000, // 30 seconds for push
  "pullInterval": 60000, // 60 seconds for pull
  "excludePatterns": ["node_modules/**", ".next/**", "dist/**", "build/**", "*.log"]
}
```

### Memory Usage

The system is designed to be lightweight:

- Minimal memory footprint
- Efficient file watching
- Smart change detection
- Automatic cleanup

## Security Considerations

- Uses local git credentials
- No external API keys required
- Secure file watching
- Safe conflict resolution

## Support

For issues or questions:

1. Check the troubleshooting section
2. Review the configuration options
3. Check system status with `npm run github-cursor:status`
4. View logs for detailed error information

## License

This system is part of the EHB Next.js 04 project and follows the same licensing terms.
