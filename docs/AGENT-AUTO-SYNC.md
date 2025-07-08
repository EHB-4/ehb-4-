# Agent Auto Sync System

## Overview

The Agent Auto Sync System is a comprehensive solution that automatically synchronizes data between your local PC and GitHub in real-time, specifically designed to work with AI agents like Cursor, GitHub Copilot, and other automation tools.

## Features

### 🤖 Agent Integration
- **Automatic Detection**: Detects when AI agents are active
- **Smart Timing**: Starts sync when agent begins work, stops when complete
- **Work Completion**: Automatically detects when agent work is finished
- **Real-time Monitoring**: Monitors file changes during agent activity

### 🔄 Real-time Synchronization
- **Auto Push**: Automatically pushes changes to GitHub when agent completes work
- **Auto Pull**: Automatically pulls updates from GitHub when remote changes detected
- **Conflict Resolution**: Handles merge conflicts intelligently
- **Performance Optimized**: Efficient sync with minimal resource usage

### 🛠️ Management Tools
- **PowerShell Scripts**: Easy Windows integration
- **Batch Files**: Simple command-line execution
- **Status Monitoring**: Real-time status tracking
- **Logging**: Comprehensive logging system

## Quick Start

### 1. Install Dependencies

Make sure you have Node.js and Git installed:

```bash
# Check Node.js
node --version

# Check Git
git --version
```

### 2. Start the System

#### Option A: Using PowerShell (Recommended)
```powershell
# Start agent sync integration
.\scripts\start-agent-sync.ps1 start

# Install auto-startup
.\scripts\start-agent-sync.ps1 install
```

#### Option B: Using Batch File
```cmd
# Start agent sync integration
scripts\start-agent-sync.bat start

# Install auto-startup
scripts\start-agent-sync.bat install
```

#### Option C: Direct Node.js
```bash
# Start integration service
node scripts/agent-sync-integration.js start

# Start sync system directly
node scripts/agent-auto-sync.js start
```

### 3. Verify Installation

Check the status:
```bash
# Check integration status
node scripts/agent-sync-integration.js status

# Check sync status
node scripts/agent-auto-sync.js status
```

## How It Works

### Agent Detection
The system monitors for:
- **Cursor** processes
- **AI agent** processes
- **Automation** tools
- **File changes** in project directories

### Sync Workflow
1. **Agent Starts**: System detects agent activity
2. **Sync Starts**: Auto-sync system activates
3. **File Monitoring**: Real-time file change detection
4. **Work Complete**: Agent finishes work
5. **Auto Push**: Changes automatically pushed to GitHub
6. **Remote Check**: System checks for remote updates
7. **Auto Pull**: Remote changes pulled to local

### File Monitoring
The system monitors these directories:
- `app/` - Next.js app directory
- `components/` - React components
- `scripts/` - Project scripts
- `lib/` - Utility libraries

## Configuration

### Sync Intervals
Default sync interval is 15 seconds. You can modify this in `scripts/agent-auto-sync.js`:

```javascript
this.syncInterval = 15000; // 15 seconds
```

### File Patterns
The system watches these file types:
- `*.tsx` - TypeScript React components
- `*.ts` - TypeScript files
- `*.js` - JavaScript files
- `*.jsx` - React components
- `*.json` - Configuration files
- `*.md` - Documentation files

### Ignored Patterns
These files/directories are ignored:
- `node_modules/`
- `.git/`
- `dist/`
- `build/`
- `.next/`
- `*.log`
- `.env*`
- `temp/`
- `backups/`

## Commands Reference

### Integration Service
```bash
# Start integration service
node scripts/agent-sync-integration.js start

# Stop integration service
node scripts/agent-sync-integration.js stop

# Check status
node scripts/agent-sync-integration.js status

# Test agent detection
node scripts/agent-sync-integration.js test
```

### Sync System
```bash
# Start sync system
node scripts/agent-auto-sync.js start

# Stop sync system
node scripts/agent-auto-sync.js stop

# Perform one-time sync
node scripts/agent-auto-sync.js sync

# Check sync status
node scripts/agent-auto-sync.js status
```

### PowerShell Commands
```powershell
# Start service
.\scripts\start-agent-sync.ps1 start

# Stop service
.\scripts\start-agent-sync.ps1 stop

# Restart service
.\scripts\start-agent-sync.ps1 restart

# Check status
.\scripts\start-agent-sync.ps1 status

# View logs
.\scripts\start-agent-sync.ps1 logs

# Install auto-startup
.\scripts\start-agent-sync.ps1 install

# Remove auto-startup
.\scripts\start-agent-sync.ps1 uninstall
```

### Batch Commands
```cmd
# Start service
scripts\start-agent-sync.bat start

# Stop service
scripts\start-agent-sync.bat stop

# Restart service
scripts\start-agent-sync.bat restart

# Check status
scripts\start-agent-sync.bat status

# View logs
scripts\start-agent-sync.bat logs

# Install auto-startup
scripts\start-agent-sync.bat install

# Remove auto-startup
scripts\start-agent-sync.bat uninstall
```

## Status Files

The system creates several status files:

### `.last-sync`
Contains the timestamp of the last successful sync.

### `.agent-sync`
Contains agent sync status information:
```json
{
  "isActive": true,
  "timestamp": "2024-01-01T12:00:00.000Z",
  "pendingChanges": ["app/page.tsx", "components/Button.tsx"]
}
```

### `.agent-integration`
Contains integration service status:
```json
{
  "isActive": true,
  "lastActivity": "2024-01-01T12:00:00.000Z",
  "syncStatus": "running",
  "agentProcesses": ["cursor.exe"]
}
```

## Logging

### Log Files
- **Integration Logs**: `logs/agent-sync.log`
- **Sync Logs**: Console output and file logs
- **Error Logs**: Error tracking and debugging

### Log Levels
- **Info**: General information
- **Success**: Successful operations
- **Warning**: Non-critical issues
- **Error**: Critical errors

## Troubleshooting

### Common Issues

#### 1. Git Repository Not Found
```
❌ Git repository not found. Please initialize Git first.
```
**Solution**: Initialize Git repository:
```bash
git init
git remote add origin <your-github-repo>
```

#### 2. Node.js Not Installed
```
❌ Node.js is not installed. Please install Node.js first.
```
**Solution**: Install Node.js from [nodejs.org](https://nodejs.org/)

#### 3. Git Not Installed
```
❌ Git is not installed. Please install Git first.
```
**Solution**: Install Git from [git-scm.com](https://git-scm.com/)

#### 4. Permission Denied
```
❌ Permission denied when accessing files
```
**Solution**: Run as administrator or check file permissions

#### 5. Sync Conflicts
```
❌ Merge conflicts detected
```
**Solution**: The system will attempt to resolve conflicts automatically. Check the logs for details.

### Debug Mode

Enable debug mode for detailed logging:

```javascript
// In agent-auto-sync.js
this.debug = true;
```

### Manual Sync

If automatic sync fails, you can perform manual sync:

```bash
# Manual sync
node scripts/agent-auto-sync.js sync

# Force push (use with caution)
git add .
git commit -m "Manual sync"
git push origin main
```

## Performance Optimization

### Sync Intervals
- **Development**: 15 seconds (default)
- **Production**: 30 seconds
- **Low Activity**: 60 seconds

### File Watching
- **Selective Monitoring**: Only watches relevant directories
- **Pattern Filtering**: Ignores unnecessary file types
- **Debouncing**: Prevents excessive sync operations

### Resource Usage
- **Memory**: ~10-20MB
- **CPU**: Minimal impact
- **Network**: Only when changes detected

## Security Considerations

### Git Credentials
- Use SSH keys or personal access tokens
- Never commit credentials to repository
- Use environment variables for sensitive data

### File Permissions
- Ensure proper file permissions
- Don't run as root/administrator unless necessary
- Use least privilege principle

### Network Security
- Use HTTPS for Git operations
- Verify remote repository authenticity
- Monitor for unauthorized changes

## Advanced Configuration

### Custom Hooks
You can add custom hooks to the integration system:

```javascript
const integration = require('./scripts/agent-sync-integration');

// Add custom hook
integration.addHook('onWorkComplete', () => {
  console.log('Custom work completion hook');
  // Your custom logic here
});
```

### Environment Variables
Set these environment variables for customization:

```bash
# Sync interval (milliseconds)
AGENT_SYNC_INTERVAL=15000

# Log level
AGENT_SYNC_LOG_LEVEL=info

# Debug mode
AGENT_SYNC_DEBUG=true
```

### Custom File Patterns
Modify the file patterns in the scripts:

```javascript
// In agent-auto-sync.js
this.watchPatterns = [
  '**/*.tsx',
  '**/*.ts',
  '**/*.js',
  '**/*.jsx',
  '**/*.json',
  '**/*.md',
  '**/*.css',  // Add custom patterns
  '**/*.scss'
];
```

## Support

### Getting Help
1. Check the logs: `.\scripts\start-agent-sync.ps1 logs`
2. Verify status: `.\scripts\start-agent-sync.ps1 status`
3. Test agent detection: `node scripts/agent-sync-integration.js test`

### Reporting Issues
When reporting issues, include:
- Operating system and version
- Node.js version
- Git version
- Error messages from logs
- Steps to reproduce

### Contributing
To contribute to the agent sync system:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This agent auto sync system is part of the EHB project and follows the same licensing terms.

---

**Note**: This system is designed to work seamlessly with AI agents and automation tools. It automatically adapts to your workflow and requires minimal configuration. 