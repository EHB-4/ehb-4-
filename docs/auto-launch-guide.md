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
