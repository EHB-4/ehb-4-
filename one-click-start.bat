@echo off
title EHB Next.js 04 - One Click Start
color 0E

echo.
echo ========================================
echo   EHB Next.js 04 - One Click Start
echo ========================================
echo.
echo 🎯 One click - all services start!
echo.

:: Kill existing processes
taskkill /F /IM node.exe >nul 2>&1

:: Clean cache
if exist ".next" rmdir /s /q ".next" >nul 2>&1

:: Start all services
echo 🚀 Starting services...

start "Dev" cmd /k "npm run dev"
timeout /t 2 /nobreak >nul
start "Keep-Alive" cmd /k "keep-alive.bat"
timeout /t 2 /nobreak >nul
start "Voice" cmd /k "start-voice.bat"

echo.
echo ========================================
echo   ✅ All Services Started!
echo ========================================
echo.
echo 🌐 http://localhost:3001 (Development)
echo 🔄 http://localhost:3000 (Keep-Alive)
echo 🎤 Voice Assistant Active
echo.
echo 🚀 Opening browsers...
timeout /t 3 /nobreak >nul

start http://localhost:3001
start http://localhost:3000

echo ✅ Ready! Press any key to exit...
pause >nul 