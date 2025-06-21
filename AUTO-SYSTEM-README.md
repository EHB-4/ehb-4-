# 🤖 EHB Auto System - Complete Automation Suite

## Overview

The EHB Auto System is a comprehensive automation suite that provides continuous testing, monitoring, and deployment for your Next.js application. It automatically opens pages in the browser, checks for errors, and provides real-time alerts.

## 🚀 Quick Start

### Windows

```bash
# Double-click or run:
scripts/start-auto-system.bat
```

### Linux/Mac

```bash
# Make executable and run:
chmod +x scripts/start-auto-system.sh
./scripts/start-auto-system.sh
```

### Manual Start

```bash
# Install dependencies
npm install puppeteer nodemailer

# Start development server
npm run dev

# In another terminal, start auto system
npm run auto:monitor
```

## 📋 System Components

### 1. **Auto Test Monitor** (`scripts/auto-test-monitor.js`)

- ✅ Opens pages in browser automatically
- ✅ Tests all authentication flows
- ✅ Checks protected routes
- ✅ Takes screenshots of issues
- ✅ Generates detailed test reports
- ✅ Continuous monitoring every 5 minutes

### 2. **Auto Error Checker** (`scripts/auto-error-checker.js`)

- ✅ Real-time error detection
- ✅ Console error monitoring
- ✅ Network request failure tracking
- ✅ DOM error checking
- ✅ Accessibility validation
- ✅ Automatic error screenshots
- ✅ Email alerts for critical issues

### 3. **Auto Deploy Monitor** (`scripts/auto-deploy-monitor.js`)

- ✅ Automatic dependency management
- ✅ Project building and deployment
- ✅ Development server management
- ✅ File change monitoring
- ✅ Backup creation
- ✅ Continuous deployment

### 4. **Master System** (`scripts/ehb-auto-master.js`)

- ✅ Orchestrates all components
- ✅ Comprehensive reporting
- ✅ System health assessment
- ✅ Email notifications
- ✅ Performance tracking

## 🎯 Available Commands

### Master System Commands

```bash
# Initialize the system
npm run auto:init

# Run one complete cycle
npm run auto:cycle

# Start continuous monitoring
npm run auto:monitor

# Stop monitoring
npm run auto:stop

# Check system status
npm run auto:status

# Run quick test
npm run auto:quick
```

### Individual Component Commands

```bash
# Test Monitor
npm run test:monitor    # Start test monitoring
npm run test:check      # Run tests once

# Error Checker
npm run error:monitor   # Start error monitoring
npm run error:check     # Check errors once

# Deploy Monitor
npm run deploy:monitor  # Start deployment monitoring
npm run deploy:cycle    # Deploy once
```

## 📊 What Gets Tested

### Authentication System

- ✅ Login page functionality
- ✅ Registration form validation
- ✅ Password reset flow
- ✅ Protected route access
- ✅ Admin vs user permissions

### Pages Tested

- ✅ Homepage (`/`)
- ✅ Login (`/auth/login`)
- ✅ Register (`/auth/register`)
- ✅ Forgot Password (`/auth/forgot-password`)
- ✅ Admin Dashboard (`/admin/dashboard`)
- ✅ User Profile (`/profile`)
- ✅ Unauthorized (`/unauthorized`)

### Error Detection

- ✅ JavaScript console errors
- ✅ Network request failures
- ✅ DOM rendering issues
- ✅ Broken links and images
- ✅ Form validation errors
- ✅ Accessibility issues
- ✅ Performance problems

## 📧 Email Alerts

The system automatically sends email alerts for:

- 🚨 Critical errors (immediate)
- ⚠️ Multiple high-priority errors
- 📊 System health reports
- 💥 System failures

### Email Configuration

Add to your `.env` file:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ALERT_EMAIL=alerts@yourcompany.com
```

## 📁 Generated Files

### Reports

- `./reports/master-report-YYYY-MM-DD.json` - Daily master reports
- `./test-reports/report-YYYY-MM-DD.json` - Test reports
- `./error-reports/error-report-YYYY-MM-DD.json` - Error reports

### Screenshots

- `./test-screenshots/` - Test screenshots
- `./error-screenshots/` - Error screenshots

### Logs

- `./logs/master-log.json` - Master system logs
- `./logs/error-log.json` - Error logs
- `./logs/alert-log.json` - Alert logs
- `./logs/deployment-log.json` - Deployment logs

## 🔧 Configuration

### Test Intervals

- **Test Monitor**: 5 minutes
- **Error Checker**: 30 seconds
- **Master System**: 10 minutes

### Alert Thresholds

- **Critical Errors**: Immediate alert
- **High Priority Errors**: 5 errors in 5 minutes
- **System Health**: Based on test success rate

## 🎮 Demo Credentials

The system uses these demo credentials for testing:

- **Admin**: `admin@ehb.com` / `admin123`
- **User**: `user@ehb.com` / `user123`

## 📈 System Health Levels

- 🟢 **Excellent**: 100% test pass rate, no critical errors
- 🟡 **Good**: 95-99% test pass rate, minor issues
- 🟠 **Fair**: 80-94% test pass rate, some issues
- 🔴 **Poor**: 60-79% test pass rate, multiple issues
- ⚫ **Critical**: <60% test pass rate or critical errors

## 🛠️ Troubleshooting

### Common Issues

1. **Browser won't start**

   ```bash
   # Install additional dependencies
   npm install puppeteer
   ```

2. **Email alerts not working**

   - Check email credentials in `.env`
   - Enable 2FA and use app password for Gmail

3. **Server not starting**

   ```bash
   # Check if port 3000 is available
   netstat -ano | findstr :3000
   ```

4. **Permission errors**
   ```bash
   # Make scripts executable (Linux/Mac)
   chmod +x scripts/*.sh
   ```

### Log Analysis

```bash
# View latest logs
tail -f logs/master-log.json

# Check system status
npm run auto:status

# View error summary
node scripts/auto-error-checker.js --summary
```

## 🔄 Continuous Operation

The system is designed to run continuously and will:

- ✅ Automatically restart on failures
- ✅ Handle network interruptions
- ✅ Recover from browser crashes
- ✅ Maintain logs across restarts
- ✅ Send alerts for system issues

## 📱 Monitoring Dashboard

Access real-time status:

```bash
# Check system status
npm run auto:status

# View recent reports
ls -la reports/

# Monitor logs
tail -f logs/master-log.json
```

## 🎯 Best Practices

1. **Start with Quick Test**

   ```bash
   npm run auto:quick
   ```

2. **Monitor During Development**

   ```bash
   npm run auto:monitor
   ```

3. **Check Reports Regularly**

   - Review daily reports in `./reports/`
   - Monitor error trends
   - Address critical issues immediately

4. **Configure Email Alerts**
   - Set up proper email credentials
   - Test alert system
   - Monitor alert frequency

## 🚀 Production Deployment

For production use:

1. Set up proper email credentials
2. Configure monitoring intervals
3. Set up backup systems
4. Monitor system resources
5. Configure alert thresholds

## 📞 Support

If you encounter issues:

1. Check the logs in `./logs/`
2. Review error reports
3. Test individual components
4. Check system status

---

**🎉 Your EHB application is now fully automated with comprehensive testing, monitoring, and alerting!**
