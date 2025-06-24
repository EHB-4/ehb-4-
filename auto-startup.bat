@echo off
title EHB Next.js 04 - Auto Startup System
color 0A

echo.
echo ========================================
echo   EHB Next.js 04 - Auto Startup System
echo ========================================
echo.
echo 🤖 Auto-starting all services...
echo ⚡ No manual intervention needed!
echo.

:: Kill existing processes
echo [1/6] Stopping existing processes...
taskkill /F /IM node.exe >nul 2>&1
if %errorlevel% equ 0 (
    echo    ✅ Existing processes stopped
) else (
    echo    ℹ No existing processes found
)

:: Clean .next directory
echo [2/6] Cleaning cache...
if exist ".next" (
    rmdir /s /q ".next" >nul 2>&1
    echo    ✅ Cache cleaned
) else (
    echo    ℹ Cache already clean
)

:: Check dependencies
echo [3/6] Checking dependencies...
if not exist "node_modules" (
    echo    📦 Installing dependencies...
    npm install
    if %errorlevel% equ 0 (
        echo    ✅ Dependencies installed
    ) else (
        echo    ❌ Failed to install dependencies
        pause
        exit /b 1
    )
) else (
    echo    ✅ Dependencies ready
)

:: Start Development Server (Background)
echo [4/6] Starting Development Server...
start "EHB Development Server" cmd /k "cd /d %~dp0 && npm run dev"

:: Wait for dev server to start
timeout /t 5 /nobreak >nul

:: Start Keep-Alive Server (Background)
echo [5/6] Starting Keep-Alive Server...
start "EHB Keep-Alive Server" cmd /k "cd /d %~dp0 && keep-alive.bat"

:: Wait for keep-alive to start
timeout /t 3 /nobreak >nobreak

:: Start Voice Assistant (Background)
echo [6/6] Starting Voice Assistant...
start "EHB Voice Assistant" cmd /k "cd /d %~dp0 && start-voice.bat"

:: Wait for voice assistant to start
timeout /t 3 /nobreak >nobreak

:: Open browsers automatically
echo 🌐 Opening browsers automatically...
timeout /t 2 /nobreak >nul
start http://localhost:3001
timeout /t 1 /nobreak >nul
start http://localhost:3000

echo.
echo ========================================
echo   ✅ Auto Startup Complete!
echo ========================================
echo.
echo 🤖 All services started automatically:
echo 🌐 Development Server: http://localhost:3001
echo 🔄 Keep-Alive Server: http://localhost:3000
echo 🎤 Voice Assistant: Active
echo.
echo 📊 Services are running in separate windows
echo 🛑 Close individual windows to stop services
echo.
echo 🎯 Auto startup successful!
echo.
pause 