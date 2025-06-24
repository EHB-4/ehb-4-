# 🌍 EHB Next.js 04 - Permanent 24/7 Server Guide

## 📋 Overview

This guide explains how to run your development server **24/7 permanently** without manual intervention. The server will automatically restart on any crash and keep running continuously.

## ⚡ Quick Start

### One-Click Permanent Server (Recommended)

#### Windows Batch File

```bash
# Double-click or run:
keep-alive.bat
```

#### Windows PowerShell

```powershell
# Run in PowerShell:
.\keep-alive.ps1
```

#### NPM Commands

```bash
# Start permanent server
npm run server:permanent

# Start background server
npm run server:background

# Start 24/7 server
npm run server:24-7
```

## 🚀 Available Commands

### Permanent Server Commands

| Command                     | Description                 | Auto Features                       |
| --------------------------- | --------------------------- | ----------------------------------- |
| `npm run server:permanent`  | Permanent 24/7 server       | ✅ Auto-restart, crash recovery     |
| `npm run server:background` | Background server           | ✅ Auto-restart, process management |
| `npm run server:24-7`       | 24/7 server                 | ✅ Auto-restart, unlimited restarts |
| `npm run server:start`      | Start server if not running | ✅ Smart start                      |
| `npm run server:stop`       | Stop all servers            | ✅ Clean shutdown                   |
| `npm run server:status`     | Check server status         | ✅ Status monitoring                |
| `npm run server:restart`    | Restart server              | ✅ Clean restart                    |

### One-Click Solutions

| File                  | Description                             |
| --------------------- | --------------------------------------- |
| `keep-alive.bat`      | Windows batch file for permanent server |
| `keep-alive.ps1`      | PowerShell script for permanent server  |
| `start-permanent.bat` | One-click permanent server starter      |
| `start-permanent.ps1` | PowerShell permanent server starter     |

## 🔧 How It Works

### ✅ Automatic Features

- **24/7 Operation**: Server runs continuously
- **Auto-restart**: Automatically restarts on any crash
- **Process Management**: Kills existing processes before starting
- **Cache Cleaning**: Cleans .next directory automatically
- **Port Management**: Automatically finds available ports
- **Error Recovery**: Recovers from any error automatically
- **Unlimited Restarts**: No limit on restart attempts

### 🔄 Restart Logic

1. **Server crashes** → Wait 1-3 seconds
2. **Kill existing processes** → Clean up
3. **Clean .next directory** → Remove cache
4. **Start new server** → Fresh start
5. **Repeat forever** → 24/7 operation

### 📁 Monitored Directories

The server automatically watches these directories:

- `app/` - App router pages
- `components/` - Reusable components
- `lib/` - Utility functions
- `styles/` - CSS files
- `pages/` - Pages directory
- `public/` - Static assets

## 🎯 Usage Examples

### Start Permanent Server

```bash
# Option 1: One-click (Easiest)
keep-alive.bat

# Option 2: PowerShell
.\keep-alive.ps1

# Option 3: NPM command
npm run server:permanent
```

### Check Server Status

```bash
# Check if server is running
npm run server:status

# Check specific details
node scripts/server-status.js check
```

### Stop Server

```bash
# Stop all servers
npm run server:stop

# Or close the terminal window
```

### Restart Server

```bash
# Clean restart
npm run server:restart

# Or just close and reopen keep-alive.bat
```

## 📊 Server Monitoring

### Status Check

```bash
npm run server:status
```

This will show:

- ✅ Node.js processes running
- ✅ Next.js processes running
- 🌐 Port availability
- 📈 Overall server status
- 💡 Recommendations

### Example Output

```
📊 Server Status Report
========================

🖥️  Node.js Processes:
   ✅ node.exe                     34468 Console                    1     51,512 K

⚡ Next.js Processes:
   ✅ node.exe                     36840 Console                    1     41,304 K

🌐 Port Status:
   Port 3000: 🔴 In Use
   Port 3001: 🟢 Available

📈 Overall Status:
   🟢 Server is running properly
   🌐 Server is accessible
   🔄 Auto-restart is active

💡 Recommendations:
   ✅ Server is running optimally
   🌐 Access at: http://localhost:3000
```

## 🔧 Troubleshooting

### Server Won't Start

```bash
# Clean everything and restart
npm run server:stop
npm run server:permanent
```

### Port Already in Use

```bash
# The server will automatically find available ports
# Or manually kill processes
npm run server:stop
npm run server:start
```

### Server Keeps Crashing

```bash
# Check for errors
npm run server:status

# Clean restart
npm run server:restart

# Check dependencies
npm install
```

### High Memory Usage

```bash
# Monitor performance
npm run auto:monitor

# Restart server
npm run server:restart
```

## 🚀 Advanced Configuration

### Custom Restart Delay

Edit the scripts to change restart timing:

```javascript
// In permanent-server.js
this.restartDelay = 1000; // 1 second
```

### Custom Port Range

```javascript
// In permanent-server.js
this.alternatePorts = [3001, 3002, 3003, 3004, 3005];
```

### Custom Max Restarts

```javascript
// In permanent-server.js
this.maxRestarts = 99999; // Unlimited
```

## 📱 Mobile Development

### React Native Permanent Server

```bash
# Start React Native permanently
npm run mobile:permanent

# Auto-restart for mobile
npm run mobile:24-7
```

### PWA Permanent Server

```bash
# PWA permanent mode
npm run pwa:permanent

# Auto PWA updates
npm run pwa:24-7
```

## 🌐 Deployment

### Production Permanent Server

```bash
# Build for production
npm run build

# Start production server permanently
npm run start:permanent
```

### Docker Permanent Server

```bash
# Docker permanent container
docker run -d --name ehb-server your-image

# Auto-restart Docker container
docker run --restart=always your-image
```

## 🔒 Security & Best Practices

### Security Features

- Automatic security headers
- Content Security Policy
- Rate limiting
- Input validation

### Best Practices

- Always use `npm run server:stop` to stop properly
- Monitor server status regularly
- Keep dependencies updated
- Use TypeScript for type safety

## 📞 Support

### Getting Help

1. Check server status: `npm run server:status`
2. Check this guide first
3. Run `npm run auto:status` for system status
4. Check logs in the terminal

### Common Commands Reference

```bash
# Quick reference
npm run server:permanent    # Start permanent server
npm run server:stop        # Stop all servers
npm run server:status      # Check status
npm run server:restart     # Restart server
```

## 🎉 Benefits

### Time Savings

- ✅ **No manual server management** - runs 24/7
- ✅ **Instant auto-restart** - no downtime
- ✅ **Zero manual intervention** - fully automated
- ✅ **Continuous development** - always available

### Developer Experience

- ✅ **Always-on development** - server never stops
- ✅ **Zero downtime** - automatic crash recovery
- ✅ **Seamless workflow** - focus on coding
- ✅ **Reliable operation** - handles all errors

### Productivity

- ✅ **24/7 availability** - server always ready
- ✅ **Automatic recovery** - no manual fixes needed
- ✅ **Continuous operation** - never stops working
- ✅ **Peace of mind** - set and forget

---

**🎯 Goal**: **Server runs 24/7 without any manual intervention!**

**🌍 Result**: **Always-on development environment that never stops!**

Now you can:

1. **Double-click `keep-alive.bat`** to start permanent server
2. **Server runs 24/7** - never stops
3. **Auto-restart on crashes** - always recovers
4. **Focus on development** - no server management needed

Your development server is now **permanently running** at **http://localhost:3000** with 24/7 availability! 🌍
