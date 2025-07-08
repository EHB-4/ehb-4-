# Agent Troubleshooting Guide

## 🚨 Common Agent Stopping Issues

### 1. **Node.js Process Issues**

**Problem**: Agent stops due to Node.js process conflicts
**Symptoms**:

- "Port already in use" errors
- Multiple Node processes running
- Agent hangs on startup

**Solutions**:

```bash
# Kill all Node processes
taskkill /f /im node.exe

# Check running processes
tasklist | findstr node

# Start fresh
npm run dev
```

### 2. **Dependency Conflicts**

**Problem**: Package conflicts or corrupted dependencies
**Symptoms**:

- Module not found errors
- Version conflicts
- Build failures

**Solutions**:

```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Or use auto-fix script
node scripts/auto-fix-agent.js
```

### 3. **Port Conflicts**

**Problem**: Port 3000 already in use
**Symptoms**:

- "Address already in use" errors
- Cannot start development server

**Solutions**:

```bash
# Check port usage
netstat -ano | findstr :3000

# Kill process using port 3000
taskkill /PID <process_id> /F

# Use different port
npm run dev -- -p 3001
```

### 4. **Environment Variables**

**Problem**: Missing or incorrect environment variables
**Symptoms**:

- AWS connection errors
- Database connection failures
- Configuration errors

**Solutions**:

```bash
# Check environment variables
echo $AWS_ACCESS_KEY_ID
echo $AWS_SECRET_ACCESS_KEY
echo $AWS_REGION

# Set environment variables
export AWS_ACCESS_KEY_ID=your_key
export AWS_SECRET_ACCESS_KEY=your_secret
export AWS_REGION=ap-south-1
```

### 5. **Memory Issues**

**Problem**: Insufficient memory causing agent to stop
**Symptoms**:

- Slow performance
- Out of memory errors
- Agent crashes

**Solutions**:

```bash
# Increase Node.js memory limit
node --max-old-space-size=4096 scripts/start.js

# Monitor memory usage
tasklist | findstr node

# Close unnecessary applications
```

### 6. **File System Issues**

**Problem**: File permissions or corrupted files
**Symptoms**:

- Permission denied errors
- File not found errors
- Build failures

**Solutions**:

```bash
# Check file permissions
dir /q

# Run as administrator
# Right-click terminal -> Run as administrator

# Repair file system
chkdsk /f
```

## 🔧 Quick Fix Commands

### Auto-Diagnosis

```bash
node scripts/fix-agent-issues.js
```

### Auto-Fix

```bash
node scripts/auto-fix-agent.js
```

### Manual Reset

```bash
# 1. Kill processes
taskkill /f /im node.exe

# 2. Clear cache
npm cache clean --force

# 3. Remove dependencies
rm -rf node_modules package-lock.json

# 4. Reinstall
npm install

# 5. Start fresh
npm run dev
```

## 🚀 Prevention Tips

### 1. **Regular Maintenance**

- Clear npm cache weekly
- Update dependencies monthly
- Monitor system resources

### 2. **Proper Shutdown**

- Always use Ctrl+C to stop development server
- Don't force-close terminal while server is running
- Wait for graceful shutdown

### 3. **Resource Management**

- Monitor CPU and memory usage
- Close unnecessary applications
- Keep sufficient disk space

### 4. **Environment Setup**

- Use consistent Node.js version
- Set up proper environment variables
- Use version control for configuration

## 📊 System Requirements

### Minimum Requirements

- **RAM**: 4GB
- **CPU**: Dual-core 2.0GHz
- **Disk**: 10GB free space
- **Node.js**: v16 or higher

### Recommended Requirements

- **RAM**: 8GB or higher
- **CPU**: Quad-core 2.5GHz or higher
- **Disk**: 20GB free space
- **Node.js**: v18 LTS

## 🔍 Debug Mode

### Enable Debug Logging

```bash
# Set debug environment
set DEBUG=*
npm run dev

# Or use Node.js debug
node --inspect npm run dev
```

### Check Logs

```bash
# Check npm logs
npm logs

# Check Next.js logs
# Look in .next/logs directory
```

## 🆘 Emergency Recovery

### If Agent Completely Stops Working

1. **Restart Computer**
   - Save all work
   - Restart computer
   - Try again

2. **Reinstall Node.js**
   - Uninstall Node.js
   - Download latest LTS version
   - Reinstall

3. **Reset Project**

   ```bash
   # Backup important files
   cp -r app backups/app-backup
   cp package.json backups/package.json

   # Reset project
   git reset --hard HEAD
   npm install
   ```

4. **Use Alternative Terminal**
   - Try different terminal (PowerShell, CMD, Git Bash)
   - Run as administrator
   - Check antivirus settings

## 📞 Support

### When to Seek Help

- Agent stops repeatedly despite fixes
- Error messages are unclear
- Performance is consistently poor
- Database connection issues persist

### Information to Provide

- Error messages (full text)
- System specifications
- Node.js version
- Steps that caused the issue
- What you've already tried

## ✅ Success Checklist

After fixing agent issues, verify:

- [ ] Development server starts without errors
- [ ] Database connection works
- [ ] All pages load correctly
- [ ] No console errors
- [ ] Performance is acceptable
- [ ] Environment variables are set
- [ ] Dependencies are up to date

## 🎯 Best Practices

1. **Keep Dependencies Updated**

   ```bash
   npm update
   npm audit fix
   ```

2. **Use Version Control**

   ```bash
   git add .
   git commit -m "Working state"
   ```

3. **Regular Backups**

   ```bash
   # Backup important files
   cp -r app backups/app-$(date +%Y%m%d)
   ```

4. **Monitor Resources**
   - Use Task Manager to monitor CPU/Memory
   - Keep disk space above 20%
   - Close unnecessary applications

5. **Document Issues**
   - Keep a log of problems and solutions
   - Note what works and what doesn't
   - Share solutions with team

---

**Remember**: Most agent stopping issues can be resolved with the auto-fix script: `node scripts/auto-fix-agent.js`
