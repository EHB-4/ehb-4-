# 🚀 Auto Browser Launch Guide - EHB Next.js 04

## 🎯 Quick Start Commands

### Development Server + Auto Browser

```bash
npm run dev:auto
```

- Starts Next.js dev server on port 3001
- Automatically opens browser to http://localhost:3001
- Hot reload enabled

### Storybook + Auto Browser

```bash
npm run storybook:auto
```

- Starts Storybook on port 6006
- Automatically opens browser to http://localhost:6006
- Component development environment

### Both Servers + Auto Browser

```bash
npm run dev:both
```

- Starts both Next.js dev server and Storybook
- Opens both browsers automatically
- Complete development environment

## 🛠️ Manual Commands (Alternative)

### Using PowerShell Directly

```powershell
# Development server
powershell -ExecutionPolicy Bypass -File scripts/auto-launch.ps1 dev

# Storybook
powershell -ExecutionPolicy Bypass -File scripts/auto-launch.ps1 storybook

# Both
powershell -ExecutionPolicy Bypass -File scripts/auto-launch.ps1 both
```

### Using Windows Commands

```bash
# Development server
npm run dev & timeout 3 && start http://localhost:3001

# Storybook
npm run storybook & timeout 3 && start http://localhost:6006
```

## 📋 Auto Launch Features

### ✅ What's Included:

- **Automatic Browser Launch**: Opens default browser
- **Port Management**: Uses ports 3001 (dev) and 6006 (storybook)
- **Background Processing**: Servers run in background
- **Error Handling**: Graceful fallback if browser launch fails
- **Cross-Platform**: Works on Windows, macOS, Linux

### 🎨 Browser Options:

- **Chrome**: Default browser
- **Edge**: Microsoft Edge
- **Firefox**: Mozilla Firefox
- **Default**: System default browser

## 🔧 Configuration

### Port Configuration

Edit `scripts/auto-launch.ps1` to change ports:

```powershell
$DevPort = 3001        # Next.js dev server
$StorybookPort = 6006  # Storybook server
```

### Delay Configuration

Edit delay before browser launch:

```powershell
$Delay = 3  # Seconds to wait before launching browser
```

### Browser Selection

Change default browser in the script:

```powershell
# Available options: chrome, edge, firefox
$Browser = "chrome"
```

## 🚨 Troubleshooting

### Browser Not Opening

1. **Check if server is running**:

   ```bash
   netstat -an | findstr :3001
   netstat -an | findstr :6006
   ```

2. **Manual browser launch**:

   ```bash
   start http://localhost:3001
   start http://localhost:6006
   ```

3. **Check PowerShell execution policy**:
   ```powershell
   Get-ExecutionPolicy
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

### Port Already in Use

1. **Kill existing processes**:

   ```bash
   taskkill /F /IM node.exe
   ```

2. **Use different ports**:
   ```bash
   npm run dev -- --port 3002
   npm run storybook -- --port 6007
   ```

### Permission Issues

1. **Run as Administrator**:
   - Right-click PowerShell
   - Select "Run as Administrator"

2. **Check file permissions**:
   ```powershell
   Get-Acl scripts/auto-launch.ps1
   ```

## 📊 Development Workflow

### Daily Development Routine:

1. **Start Development**:

   ```bash
   npm run dev:auto
   ```

2. **Component Development**:

   ```bash
   npm run storybook:auto
   ```

3. **Full Environment**:
   ```bash
   npm run dev:both
   ```

### Quick Commands Reference:

```bash
# Development
npm run dev:auto          # Dev server + browser
npm run storybook:auto    # Storybook + browser
npm run dev:both          # Both + browsers

# Manual
npm run dev               # Dev server only
npm run storybook         # Storybook only
npm run build             # Production build
npm run lint              # Code linting
```

## 🎯 Best Practices

### 1. Development Workflow

- Use `npm run dev:auto` for daily development
- Use `npm run storybook:auto` for component development
- Use `npm run dev:both` for full environment

### 2. Browser Management

- Keep development browser tab open
- Use browser dev tools for debugging
- Enable hot reload for instant updates

### 3. Performance Tips

- Close unused browser tabs
- Monitor memory usage
- Restart servers if needed

## 🔄 Auto Restart Features

### File Watching

- Next.js automatically restarts on file changes
- Storybook automatically updates on component changes
- No manual restart needed

### Hot Reload

- React components update instantly
- CSS changes apply immediately
- JavaScript changes reload automatically

## 📱 Mobile Development

### Mobile Testing

1. **Find your IP address**:

   ```bash
   ipconfig
   ```

2. **Access on mobile**:

   ```
   http://YOUR_IP:3001
   http://YOUR_IP:6006
   ```

3. **Enable mobile debugging**:
   - Use browser dev tools
   - Enable mobile viewport

## 🎉 Success Indicators

### ✅ Working Auto Launch:

- Browser opens automatically
- Server starts without errors
- Hot reload works
- No console errors

### ⚠️ Common Issues:

- Browser doesn't open → Check execution policy
- Port in use → Kill existing processes
- Permission denied → Run as administrator

---

**Ready to start auto development!** 🚀

Use `npm run dev:auto` to begin your development session with automatic browser launch.

# EHB Auto-Launch Services Guide

## Overview

This guide explains how to automatically launch EHB services and open them in your default browser.

## Service Configuration

| Service/Department | Port | Folder Name     | URL                   |
| ------------------ | ---- | --------------- | --------------------- |
| Home Page          | 3000 | ehb-home        | http://localhost:3000 |
| Admin Panel        | 5000 | ehb-admin-panel | http://localhost:5000 |
| Development Portal | 8080 | ehb-dev-portal  | http://localhost:8080 |
| GoSellr            | 4000 | ehb-gosellr     | http://localhost:4000 |

## Quick Start

### Using NPM Scripts (Recommended)

```bash
# Start individual services with auto-browser opening
npm run auto:home        # Home Page (Port 3000)
npm run auto:admin       # Admin Panel (Port 5000)
npm run auto:dev-portal  # Development Portal (Port 8080)
npm run auto:gosellr     # GoSellr (Port 4000)

# Start all services at once
npm run auto:all
```

### Using Node.js Scripts

```bash
# Individual service scripts
npm run launch:home
npm run launch:admin
npm run launch:dev-portal
npm run launch:gosellr

# All services at once
npm run launch:all
```

### Using Windows Batch File

```bash
# Direct batch file usage
scripts\auto-launch.bat home
scripts\auto-launch.bat admin
scripts\auto-launch.bat dev-portal
scripts\auto-launch.bat gosellr
scripts\auto-launch.bat all
```

## Manual Browser Opening

If you want to manually open services in browser after they're running:

```bash
# Open specific services in browser
npm run open:home
npm run open:admin
npm run open:dev-portal
npm run open:gosellr
```

## How It Works

1. **Service Detection**: The scripts check if the service folder exists
2. **Port Management**: Automatically kills any existing processes on the target port
3. **Service Startup**: Starts the service with the correct port configuration
4. **Health Check**: Waits for the service to be ready by checking port availability
5. **Browser Launch**: Automatically opens the service URL in your default browser

## Features

### ✅ Automatic Features

- **Port Conflict Resolution**: Automatically kills conflicting processes
- **Health Monitoring**: Waits for services to be ready before opening browser
- **Cross-Platform Support**: Works on Windows, macOS, and Linux
- **Error Handling**: Graceful error handling and user feedback
- **Service Status**: Real-time status monitoring

### 🔧 Configuration Options

- **Custom Ports**: Each service uses its designated port
- **Custom Folders**: Services run from their respective folders
- **Browser Integration**: Opens in default browser automatically
- **Delay Management**: Configurable delays between service starts

## Troubleshooting

### Port Already in Use

```bash
# Kill process on specific port (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Kill process on specific port (macOS/Linux)
lsof -ti:3000 | xargs kill -9
```

### Service Not Starting

1. Check if the service folder exists
2. Verify `package.json` has the correct dev script
3. Ensure all dependencies are installed (`npm install`)
4. Check for any error messages in the console

### Browser Not Opening

1. Verify the service is running on the correct port
2. Check if your default browser is properly configured
3. Try manually opening the URL in browser

## Advanced Usage

### Custom Port Configuration

Edit the service configuration in the scripts:

```javascript
// In scripts/auto-launch-services.js
const services = [
  {
    name: 'Home Page',
    port: 3000, // Change this to your preferred port
    folder: 'ehb-home',
    url: 'http://localhost:3000', // Update URL accordingly
  },
  // ... other services
];
```

### Environment Variables

You can use environment variables for dynamic configuration:

```bash
# Set custom ports
export HOME_PORT=3001
export ADMIN_PORT=5001
export DEV_PORTAL_PORT=8081
export GOSELLR_PORT=4001
```

### Integration with Development Workflow

Add to your development workflow:

```json
{
  "scripts": {
    "dev:full": "npm run auto:all && npm run auto:monitor",
    "dev:home-only": "npm run auto:home",
    "dev:admin-only": "npm run auto:admin"
  }
}
```

## Security Considerations

- **Port Security**: Services run on localhost only
- **Process Management**: Automatic cleanup of background processes
- **Error Logging**: Comprehensive error logging for debugging
- **Resource Management**: Efficient resource usage and cleanup

## Performance Tips

1. **Sequential Startup**: Services start with delays to avoid resource conflicts
2. **Health Checks**: Efficient port checking with minimal overhead
3. **Background Processing**: Services run in background for better performance
4. **Memory Management**: Automatic cleanup of completed processes

## Support

For issues or questions:

1. Check the troubleshooting section above
2. Review the console output for error messages
3. Verify your system meets the requirements
4. Check the service-specific documentation

## Requirements

- **Node.js**: Version 16 or higher
- **npm**: Version 8 or higher
- **Operating System**: Windows 10+, macOS 10.15+, or Linux
- **Browser**: Any modern web browser
- **Permissions**: Ability to start processes and open browser windows
