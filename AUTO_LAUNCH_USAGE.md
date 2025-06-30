# EHB Auto-Launch Services - Quick Usage Guide

## 🚀 Quick Start

### Start All Services (Recommended)

```bash
npm run auto:all
```

### Start Individual Services

```bash
# Home Page (Port 3000)
npm run auto:home

# Admin Panel (Port 5000)
npm run auto:admin

# Development Portal (Port 8080)
npm run auto:dev-portal

# GoSellr (Port 4000)
npm run auto:gosellr
```

## 📋 Service Details

| Service            | Port | URL                   | Command                   |
| ------------------ | ---- | --------------------- | ------------------------- |
| Home Page          | 3000 | http://localhost:3000 | `npm run auto:home`       |
| Admin Panel        | 5000 | http://localhost:5000 | `npm run auto:admin`      |
| Development Portal | 8080 | http://localhost:8080 | `npm run auto:dev-portal` |
| GoSellr            | 4000 | http://localhost:4000 | `npm run auto:gosellr`    |

## 🔧 What Happens Automatically

1. **Port Management**: Kills any existing processes on the target port
2. **Service Startup**: Starts the service with correct port configuration
3. **Health Check**: Waits for service to be ready
4. **Browser Launch**: Opens the service URL in your default browser
5. **Status Monitoring**: Shows real-time service status

## 🛠️ Manual Commands

### Open Services in Browser (if already running)

```bash
npm run open:home
npm run open:admin
npm run open:dev-portal
npm run open:gosellr
```

### Test Auto-Launch Functionality

```bash
node scripts/test-auto-launch.js
```

## ⚠️ Troubleshooting

### Port Already in Use

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### Service Not Starting

1. Check if folder exists: `ehb-home`, `ehb-admin-panel`, etc.
2. Run `npm install` in the service folder
3. Check console for error messages

### Browser Not Opening

1. Verify service is running on correct port
2. Check default browser settings
3. Try manual browser opening: `npm run open:home`

## 📚 More Information

- **Detailed Guide**: `docs/auto-launch-guide.md`
- **Test Script**: `scripts/test-auto-launch.js`
- **PowerShell Script**: `scripts/ehb-auto-launch.ps1`

## 🎯 Examples

### Development Workflow

```bash
# Start all services for full development
npm run auto:all

# Start only home page for focused development
npm run auto:home

# Start admin panel for admin work
npm run auto:admin
```

### Quick Testing

```bash
# Test all functionality
node scripts/test-auto-launch.js

# Start and test home page
npm run auto:home
```

## 🔄 Auto-Restart

The services will automatically restart if they crash. To stop all services, press `Ctrl+C` in the terminal.

## 📊 Status Monitoring

When running `npm run auto:all`, you'll see real-time status:

```
✅ Home Page - http://localhost:3000
✅ Admin Panel - http://localhost:5000
✅ Development Portal - http://localhost:8080
✅ GoSellr - http://localhost:4000
```

## 🎉 Ready to Use!

Your EHB services are now configured for automatic browser launching. Just run `npm run auto:all` and all services will start and open in your browser automatically!
