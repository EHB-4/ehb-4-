@echo off
title EHB Auto Runner - Startup
cd /d "F:\ehb next.js 04"

echo 🚀 EHB Auto Runner Starting on PC Boot...
echo =========================================
echo 📅 Date: %date%
echo ⏰ Time: %time%
echo 📁 Directory: %cd%
echo =========================================

:: Wait for network to be ready
timeout /t 10 /nobreak >nul

:: Kill existing processes
echo 🔄 Stopping existing processes...
taskkill /F /IM node.exe >nul 2>&1
echo ✅ Processes stopped

:: Auto error fixing
echo 🔧 Fixing all errors...
npm run lint -- --fix
if exist scripts\fix-all-errors.bat call scripts\fix-all-errors.bat
if exist scripts\quick-error-fix.bat call scripts\quick-error-fix.bat
if exist scripts\instant-error-fix.bat call scripts\instant-error-fix.bat

:: Start development server
echo 🚀 Starting development server...
start "EHB Dev Server" cmd /k "npm run dev"

:: Wait for server to start
echo ⏳ Waiting for server to start...
timeout /t 15 /nobreak >nul

:: Open browser
echo 🌐 Opening browser...
start http://localhost:3000
start http://localhost:3000/development-portal

:: Start monitoring
echo 👀 Auto monitoring started...
echo 📝 This window will stay open for monitoring

:: Monitoring loop
:monitor_loop
timeout /t 60 /nobreak >nul
echo 💓 Health check at %time%...
curl -s http://localhost:3000 >nul 2>&1
if errorlevel 1 (
    echo ⚠️ Server not responding, restarting...
    taskkill /F /IM node.exe >nul 2>&1
    timeout /t 3 /nobreak >nul
    start "EHB Dev Server" cmd /k "npm run dev"
    timeout /t 10 /nobreak >nul
)
goto monitor_loop
