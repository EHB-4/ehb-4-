@echo off
title EHB Next.js 04 - Quick Start
color 0B

echo.
echo ========================================
echo   EHB Next.js 04 - Quick Start
echo ========================================
echo.
echo ⚡ Quick start - no PC restart needed!
echo.

:: Kill existing processes
taskkill /F /IM node.exe >nul 2>&1

:: Clean cache
if exist ".next" rmdir /s /q ".next" >nul 2>&1

:: Start all services in background
echo 🚀 Starting all services...

:: Development Server
start "Dev Server" cmd /k "npm run dev"

:: Wait 2 seconds
timeout /t 2 /nobreak >nul

:: Keep-Alive Server  
start "Keep-Alive" cmd /k "keep-alive.bat"

:: Wait 2 seconds
timeout /t 2 /nobreak >nul

:: Voice Assistant
start "Voice Assistant" cmd /k "start-voice.bat"

echo.
echo ========================================
echo   ✅ All Services Started!
echo ========================================
echo.
echo 🌐 Development: http://localhost:3001
echo 🔄 Keep-Alive: http://localhost:3000
echo 🎤 Voice: Active
echo.
echo 🚀 Opening browsers...
timeout /t 3 /nobreak >nul

:: Open browsers
start http://localhost:3001
start http://localhost:3000

echo ✅ Done! All services running.
echo.
pause 