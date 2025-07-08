# 🛠️ EHB Next.js 04 - Stable Setup Guide

## ✅ Permanent Settings Applied

This guide ensures your EHB Next.js 04 project runs with **maximum stability** and **no background processes**.

### 🎯 Key Features

1. **✅ Max 2 Node.js processes only:**
   - 1 for agent (if needed)
   - 1 for active dev server (frontend)

2. **🧹 Auto-cleanup of stale processes:**
   - Kills processes blocking port 3000
   - Prevents multiple instances
   - No background watchers

3. **🛑 Disabled auto-start features:**
   - No auto-runner scripts
   - No background monitors
   - No auto-restart loops

4. **🔐 Fixed ports (no auto-switching):**
   - Frontend: 3000
   - Backend: 8000
   - Admin: 5000
   - Portal: 8080

## 🚀 Quick Start

### Option 1: Clean Startup Script
```bash
npm run dev:clean
```

### Option 2: PowerShell (Windows)
```powershell
.\start-clean.ps1
```

### Option 3: Batch File (Windows)
```cmd
start-clean.bat
```

### Option 4: Manual Start
```bash
npm run dev
```

## 🧹 Cleanup Commands

### Remove All Auto-Start Scripts
```bash
npm run cleanup
```

### Check Port Availability
```bash
npm run check-ports
```

### Kill All Node.js Processes (Windows)
```cmd
taskkill /F /IM node.exe
```

### Kill All Node.js Processes (Unix/Mac)
```bash
pkill -f node
```

## 📁 Configuration Files

### `config/ehb-stable-config.json`
Permanent configuration that prevents auto-start features:
- Disables background processes
- Sets fixed ports
- Prevents auto-restart
- Limits Node.js processes

### `.env.development`
Environment variables for stable development:
- Fixed port configuration
- Disabled auto-start features
- Development settings

## 🔧 Manual Process Management

### Check Running Processes
```bash
# Windows
tasklist | findstr node

# Unix/Mac
ps aux | grep node
```

### Kill Specific Process
```bash
# Windows
taskkill /F /PID <process_id>

# Unix/Mac
kill -9 <process_id>
```

### Check Port Usage
```bash
# Windows
netstat -ano | findstr :3000

# Unix/Mac
lsof -i :3000
```

## 🚫 Blocked Commands

The following commands are **permanently disabled** to prevent instability:

- `auto-*` (all auto scripts)
- `monitor`
- `runner`
- `background`
- `forever`
- `24-7`
- `ultra-fast`
- `super-agent`

## ✅ Allowed Commands

Only these stable commands are available:

- `npm run dev` - Start development server
- `npm run dev:clean` - Clean startup with process cleanup
- `npm run build` - Build for production
- `npm run lint` - Run linting
- `npm run test:unit` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run health-check` - Check system health

## 🔄 Reset Configuration

If you need to reset to default settings:

1. Delete `config/ehb-stable-config.json`
2. Run `npm run cleanup`
3. Restart your development environment

## 📝 Troubleshooting

### Port 3000 Already in Use
```bash
# Check what's using the port
netstat -ano | findstr :3000

# Kill the process
taskkill /F /PID <process_id>
```

### Multiple Node.js Processes
```bash
# Kill all Node.js processes
taskkill /F /IM node.exe

# Start clean
npm run dev:clean
```

### Script Not Found
If you get "script not found" errors:
1. Run `npm run cleanup` to remove old scripts
2. Use `npm run dev:clean` for startup
3. Check `package.json` for available scripts

## 🎉 Benefits

- **🚀 Faster startup** - No background processes
- **💾 Lower memory usage** - Only essential processes
- **🔒 Stable operation** - No auto-restart loops
- **🎯 Predictable behavior** - Fixed ports and processes
- **🛠️ Easy management** - Simple start/stop commands

## 📞 Support

If you encounter issues:

1. Run `npm run cleanup` to remove problematic scripts
2. Use `npm run dev:clean` for startup
3. Check this guide for troubleshooting steps
4. Ensure only one development server is running

---

**🎯 Result:** Your EHB Next.js 04 project now runs with maximum stability and minimal resource usage! 