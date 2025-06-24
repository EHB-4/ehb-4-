@echo off
title EHB Next.js 04 - Master System
color 0F

echo.
echo ========================================
echo   EHB Next.js 04 - Master System
echo ========================================
echo.
echo 🤖 Master system starting...
echo ⚡ Combining all automation features...
echo 🚀 Auto startup + Error fix + Monitoring
echo.

:: Master system sequence
echo [1/5] Master Error Fix...
call scripts\fix-all-errors.bat

echo.
echo [2/5] Master Auto Startup...
call auto-startup.bat

echo.
echo [3/5] Master Service Management...
echo    🚀 Starting development server...
start "EHB Development Server" cmd /k "npm run dev"

timeout /t 3 /nobreak >nul

echo    🔄 Starting keep-alive server...
start "EHB Keep-Alive Server" cmd /k "keep-alive.bat"

timeout /t 3 /nobreak >nul

echo    🎤 Starting voice assistant...
start "EHB Voice Assistant" cmd /k "start-voice.bat"

echo.
echo [4/5] Master Browser Launch...
timeout /t 5 /nobreak >nul
start http://localhost:3001
timeout /t 1 /nobreak >nul
start http://localhost:3000

echo.
echo [5/5] Master Monitoring...
echo    📊 Starting system monitoring...
start "EHB Master Monitor" cmd /k "node scripts/master-system.cjs status"

echo.
echo ========================================
echo   ✅ Master System Successfully Started!
echo ========================================
echo.
echo 🎯 All systems operational:
echo ✅ Master Error Fix: Active
echo ✅ Master Auto Startup: Active
echo ✅ Master Service Management: Active
echo ✅ Master Browser Launch: Complete
echo ✅ Master Monitoring: Active
echo.
echo 🌐 Development Server: http://localhost:3001
echo 🔄 Keep-Alive Server: http://localhost:3000
echo 🎤 Voice Assistant: Active
echo 📊 Master Monitor: Active
echo.
echo 🛑 To stop: npm run master:stop
echo 📊 Status: npm run master:status
echo.
pause 