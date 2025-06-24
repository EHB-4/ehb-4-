# 🚀 EHB Next.js 04 - Auto Development Guide

## 📋 Overview

This guide explains how to use the automated development system that eliminates the need to manually run commands. All development tasks are now automated!

## ⚡ Quick Start

### One-Click Development (Recommended)

#### Windows Batch File

```bash
# Double-click or run:
start-dev.bat
```

#### Windows PowerShell

```powershell
# Run in PowerShell:
.\start-dev.ps1
```

#### Manual Commands

```bash
# Auto development with all features:
npm run auto-dev

# Quick development:
npm run dev:auto

# Clean restart:
npm run dev:clean
```

## 🛠 Available Auto Commands

### Development Commands

| Command             | Description                | Auto Features                                  |
| ------------------- | -------------------------- | ---------------------------------------------- |
| `npm run auto-dev`  | Full auto development mode | ✅ Auto-restart, file watching, error handling |
| `npm run dev:auto`  | Quick auto development     | ✅ Auto-restart, basic monitoring              |
| `npm run dev:clean` | Clean restart              | ✅ Kills processes, cleans cache, restarts     |
| `npm run dev:fast`  | Turbo mode development     | ⚡ Faster compilation                          |

### Utility Commands

| Command                | Description                    |
| ---------------------- | ------------------------------ |
| `npm run auto-clean`   | Clean all caches and processes |
| `npm run auto-restart` | Restart development server     |
| `npm run auto-build`   | Build for production           |
| `npm run auto-test`    | Run all tests                  |

### Advanced Commands

| Command                | Description                        |
| ---------------------- | ---------------------------------- |
| `npm run auto:init`    | Initialize auto development system |
| `npm run auto:monitor` | Monitor system performance         |
| `npm run auto:status`  | Check system status                |
| `npm run auto:stop`    | Stop all auto processes            |

## 🔧 Auto Features

### ✅ Automatic Features

- **Auto-restart**: Server restarts when files change
- **Process Management**: Kills existing processes automatically
- **Cache Cleaning**: Cleans .next directory automatically
- **Dependency Installation**: Installs missing dependencies
- **Error Recovery**: Automatically recovers from errors
- **File Watching**: Monitors file changes in real-time
- **Performance Optimization**: Optimizes for faster development

### 📁 Watched Directories

The system automatically watches these directories for changes:

- `app/` - App router pages and components
- `components/` - Reusable components
- `lib/` - Utility functions and libraries
- `styles/` - CSS and styling files
- `pages/` - Pages directory (if using pages router)
- `public/` - Static assets

### 🚫 Ignored Directories

These directories are ignored to prevent unnecessary restarts:

- `node_modules/` - Dependencies
- `.next/` - Build cache
- `.git/` - Version control
- `logs/` - Log files

## 🎯 Development Workflow

### 1. Start Development

```bash
# Option 1: One-click (Recommended)
start-dev.bat

# Option 2: Auto development
npm run auto-dev

# Option 3: Quick development
npm run dev:auto
```

### 2. Make Changes

- Edit any file in the watched directories
- The server will automatically restart
- No manual intervention needed

### 3. View Results

- Open http://localhost:3000 in your browser
- Changes appear automatically
- Hot reload enabled

### 4. Stop Development

- Press `Ctrl+C` in the terminal
- All processes are automatically cleaned up

## 🔍 Troubleshooting

### Common Issues

#### Server Won't Start

```bash
# Clean everything and restart
npm run auto-clean
npm run auto-dev
```

#### Port Already in Use

```bash
# Kill all Node processes
taskkill /F /IM node.exe
npm run auto-dev
```

#### Dependencies Issues

```bash
# Reinstall dependencies
npm run auto-clean
npm install
npm run auto-dev
```

#### Build Errors

```bash
# Clean build cache
npm run auto-clean
npm run auto-build
```

### Performance Issues

#### Slow Development

```bash
# Use turbo mode
npm run dev:fast

# Or optimize performance
npm run optimize
```

#### High Memory Usage

```bash
# Monitor performance
npm run auto:monitor

# Check system status
npm run auto:status
```

## 📊 Monitoring & Analytics

### Performance Monitoring

```bash
# Monitor system performance
npm run auto:monitor

# Check GPU and cursor performance
npm run performance-check

# Run diagnostics
npm run qa-check
```

### Error Monitoring

```bash
# Monitor for errors
npm run error:monitor

# Check for errors
npm run error:check
```

### Test Monitoring

```bash
# Monitor tests
npm run test:monitor

# Check test status
npm run test:check
```

## 🚀 Advanced Configuration

### Auto Development Config

Edit `config/auto-dev.json` to customize:

- Auto-restart behavior
- File watching settings
- Performance limits
- Notification settings

### Custom Scripts

Add your own scripts to `package.json`:

```json
{
  "scripts": {
    "my-auto-command": "node scripts/my-auto-script.js"
  }
}
```

## 📱 Mobile Development

### React Native Auto Development

```bash
# Start React Native development
npm run mobile:dev

# Auto-restart for mobile
npm run mobile:auto
```

### PWA Development

```bash
# PWA development mode
npm run pwa:dev

# Auto PWA updates
npm run pwa:auto
```

## 🌐 Deployment Automation

### Auto Deployment

```bash
# Monitor deployment
npm run deploy:monitor

# Auto deploy cycle
npm run deploy:cycle

# Auto git push
npm run auto-push
```

### Production Build

```bash
# Auto production build
npm run auto-build

# Fast production build
npm run build:fast
```

## 🔒 Security & Best Practices

### Security Features

- Automatic security headers
- Content Security Policy
- Rate limiting
- Input validation

### Best Practices

- Always use auto-clean before major changes
- Monitor performance regularly
- Keep dependencies updated
- Use TypeScript for type safety

## 📞 Support

### Getting Help

1. Check this guide first
2. Run `npm run auto:status` for system status
3. Check logs in the `logs/` directory
4. Use `npm run qa-check` for diagnostics

### Common Commands Reference

```bash
# Quick reference
npm run auto-dev      # Start auto development
npm run auto-clean    # Clean everything
npm run auto-restart  # Restart server
npm run auto:status   # Check status
npm run auto:stop     # Stop all processes
```

## 🎉 Benefits

### Time Savings

- ✅ No manual command running
- ✅ Automatic error recovery
- ✅ Instant file watching
- ✅ One-click development

### Developer Experience

- ✅ Faster development cycles
- ✅ Reduced cognitive load
- ✅ Automatic optimization
- ✅ Better error handling

### Productivity

- ✅ Focus on coding, not commands
- ✅ Automated workflows
- ✅ Performance monitoring
- ✅ Quality assurance

---

**🎯 Goal**: Zero manual command execution during development!

**🚀 Result**: Faster, more efficient development workflow with automated everything!
