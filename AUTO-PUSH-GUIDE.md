# EHB Auto-Push System Guide

## Overview

The EHB Auto-Push System automatically monitors your project files and pushes changes to GitHub in real-time. This ensures your code is always backed up and synchronized with your remote repository.

## Features

- ✅ Real-time file watching
- ✅ Intelligent commit messages
- ✅ Automatic conflict resolution
- ✅ Performance monitoring
- ✅ Multiple startup methods
- ✅ Error handling and recovery

## Quick Start

### Method 1: Using npm scripts (Recommended)

```bash
# Start auto-push system
npm run auto-push:start

# Or use the enhanced version
npm run auto-push:watch
```

### Method 2: Using batch file (Windows)

```bash
# Double-click or run from command line
start-auto-push.bat
```

### Method 3: Using PowerShell (Windows)

```powershell
# Run PowerShell script
npm run auto-push:ps

# Or directly
powershell -ExecutionPolicy Bypass -File start-auto-push.ps1
```

### Method 4: Direct Node.js execution

```bash
# Run the auto-push script directly
node scripts/ehb-auto-push.js
```

## Prerequisites

### 1. Node.js Installation

Make sure Node.js is installed on your system:

```bash
node --version
npm --version
```

### 2. Git Repository Setup

Ensure your project is a git repository with a remote origin:

```bash
# Check if git is initialized
git status

# If not initialized, run:
git init

# Add remote origin (replace with your GitHub repo URL)
git remote add origin https://github.com/yourusername/ehb-next-js-04.git
```

### 3. Dependencies Installation

The system will automatically install required dependencies, but you can also install them manually:

```bash
npm run auto-push:install
```

## Configuration

### Auto-Push Script Configuration

The main auto-push script (`scripts/ehb-auto-push.js`) can be configured by modifying these options:

```javascript
const options = {
  watchPath: '.', // Directory to watch
  pushInterval: 30000, // Push interval in milliseconds (30 seconds)
  commitMessage: 'EHB Auto-Push', // Default commit message
  branch: 'main', // Target branch
  excludePatterns: [
    // Files to ignore
    'node_modules/**',
    '.git/**',
    '.next/**',
    '*.log',
    // ... more patterns
  ],
};
```

### File Priority System

The system categorizes files by priority:

**Critical Files** (immediate push):

- `package.json`
- `next.config.js`
- `tailwind.config.js`
- `tsconfig.json`
- `app/**/*.tsx`
- `components/**/*.tsx`
- `lib/**/*.ts`

**High Priority Files** (quick push):

- `docs/**/*`
- `scripts/**/*`
- `*.md`
- `*.css`

**Normal Files** (batch push):

- All other files

## Usage Examples

### Basic Usage

```bash
# Start the auto-push system
npm run auto-push:start
```

### With Custom Configuration

```bash
# Start with custom options
node scripts/ehb-auto-push.js --watchPath ./app --pushInterval 60000
```

### Monitoring Mode

```bash
# Start with enhanced monitoring
npm run auto-push:watch
```

## What the System Does

### 1. File Watching

- Monitors all project files for changes
- Ignores temporary files and build artifacts
- Categorizes changes by priority

### 2. Automatic Committing

- Stages all changes automatically
- Creates intelligent commit messages with timestamps
- Includes file information in commit messages

### 3. Automatic Pushing

- Pushes changes to GitHub every 30 seconds
- Handles conflicts automatically
- Provides real-time feedback

### 4. Performance Monitoring

- Tracks push/pull performance
- Monitors memory usage
- Logs error statistics

## Monitoring and Logs

### Real-time Status

The system provides real-time status updates:

```
🚀 Starting EHB Auto-Push System...
✅ All checks passed!
👀 File watcher initialized
📝 change: app/page.tsx (app, critical)
🔄 Starting push (critical)...
📦 Changes staged
💾 Changes committed
🚀 Changes pushed to remote
✅ Push completed successfully!
```

### Performance Statistics

Every minute, the system logs performance statistics:

```
📊 ===== EHB AUTO-PUSH PERFORMANCE STATS =====
⏱️  Uptime: 5m 30s
🔄 Total pushes: 12
⬇️  Total pulls: 3
📝 Total files processed: 45
⚡ Average push time: 2.3s
💾 Memory usage: 45.2MB
❌ Errors: 0
🌿 Current branch: main
```

## Troubleshooting

### Common Issues

#### 1. "Not a git repository" Error

```bash
# Initialize git repository
git init

# Add remote origin
git remote add origin https://github.com/yourusername/ehb-next-js-04.git
```

#### 2. "No remote origin found" Error

```bash
# Add GitHub remote
git remote add origin https://github.com/yourusername/ehb-next-js-04.git

# Verify remote
git remote -v
```

#### 3. "chokidar not found" Error

```bash
# Install chokidar dependency
npm install chokidar

# Or use the auto-install script
npm run auto-push:install
```

#### 4. Push Conflicts

The system automatically handles conflicts by:

- Pulling latest changes before pushing
- Using `--no-verify` flag to skip hooks
- Providing detailed error messages

### Error Recovery

If the system encounters errors:

1. Check the console output for specific error messages
2. Verify your git configuration
3. Ensure you have proper permissions
4. Restart the system if needed

## Advanced Features

### Custom File Patterns

You can customize which files are watched by modifying the `excludePatterns` in the script:

```javascript
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
  '.env.local',
  '.env.production',
];
```

### Multiple Branch Support

To work with different branches:

```bash
# Switch to a different branch
git checkout feature-branch

# Start auto-push for that branch
node scripts/ehb-auto-push.js --branch feature-branch
```

### Integration with Development Workflow

The auto-push system works seamlessly with your development workflow:

1. **During Development**: Files are automatically committed and pushed
2. **Before Commits**: System pulls latest changes to avoid conflicts
3. **After Builds**: Build artifacts are ignored automatically
4. **Error Handling**: System continues working even if some pushes fail

## Best Practices

### 1. Regular Monitoring

- Check the console output regularly
- Monitor performance statistics
- Address any errors promptly

### 2. Backup Strategy

- The system creates automatic backups in `temp-backup/`
- Keep your GitHub repository as the primary backup
- Consider additional backup solutions for critical data

### 3. Performance Optimization

- The system is optimized for performance
- Monitor memory usage if running for extended periods
- Restart the system if performance degrades

### 4. Security Considerations

- Ensure sensitive files are in `.gitignore`
- Use environment variables for secrets
- Regularly review what's being committed

## Stopping the System

### Graceful Shutdown

Press `Ctrl+C` to stop the system gracefully. The system will:

- Close file watchers
- Complete any pending operations
- Display final statistics
- Exit cleanly

### Force Stop

If the system becomes unresponsive:

```bash
# Kill all Node.js processes (Windows)
taskkill /F /IM node.exe

# Kill all Node.js processes (Linux/Mac)
pkill -f node
```

## Support and Maintenance

### Regular Maintenance

- Update dependencies regularly: `npm update`
- Check for script updates
- Monitor system performance
- Review and clean up backup files

### Getting Help

If you encounter issues:

1. Check this guide first
2. Review the console output for error messages
3. Verify your git and Node.js setup
4. Check the GitHub repository for updates

## Conclusion

The EHB Auto-Push System provides a robust, automated solution for keeping your code synchronized with GitHub. With its intelligent file watching, conflict resolution, and performance monitoring, it ensures your development workflow is smooth and your code is always backed up.

Start using it today with `npm run auto-push:start` and enjoy worry-free development!
