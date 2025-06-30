@echo off
setlocal enabledelayedexpansion

echo 🚀 EHB Auto Runner Starting...
echo =============================

:: Kill existing processes
echo 🔄 Stopping existing processes...
taskkill /F /IM node.exe >nul 2>&1
echo ✅ Processes stopped

:: Start development server
echo 🚀 Starting development server...
start "EHB Dev Server" cmd /k "npm run dev"

:: Wait a bit then open browser
timeout /t 5 /nobreak >nul
echo 🌐 Opening browser...
start http://localhost:3000
start http://localhost:3000/development-portal

:: Start monitoring loop
echo 👀 Auto monitoring started...
echo 📝 Press Ctrl+C to stop

:monitor_loop
timeout /t 30 /nobreak >nul
echo 💓 Health check...
curl -s http://localhost:3000 >nul 2>&1
if errorlevel 1 (
    echo ⚠️ Server not responding, restarting...
    taskkill /F /IM node.exe >nul 2>&1
    timeout /t 2 /nobreak >nul
    start "EHB Dev Server" cmd /k "npm run dev"
)
goto monitor_loop 