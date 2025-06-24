@echo off
title EHB Next.js 04 - Start All Services
color 0A

echo.
echo ========================================
echo   EHB Next.js 04 - Start All Services
echo ========================================
echo.
echo 🚀 Starting all services immediately...
echo ⏰ No PC restart required!
echo.

:: Kill existing processes
echo [1/5] Stopping existing processes...
taskkill /F /IM node.exe >nul 2>&1
if %errorlevel% equ 0 (
    echo    ✓ Existing processes stopped
) else (
    echo    ℹ No existing processes found
)

:: Clean .next directory
echo [2/5] Cleaning .next directory...
if exist ".next" (
    rmdir /s /q ".next" >nul 2>&1
    echo    ✓ .next directory cleaned
) else (
    echo    ℹ .next directory not found
)

:: Install dependencies if needed
echo [3/5] Checking dependencies...
if not exist "node_modules" (
    echo    📦 Installing dependencies...
    npm install
    if %errorlevel% equ 0 (
        echo    ✓ Dependencies installed
    ) else (
        echo    ❌ Failed to install dependencies
        pause
        exit /b 1
    )
) else (
    echo    ✓ Dependencies already installed
)

:: Start Development Server (Background)
echo [4/5] Starting Development Server...
start "EHB Development Server" cmd /k "cd /d %~dp0 && npm run dev"

:: Wait a moment
timeout /t 3 /nobreak >nul

:: Start Keep-Alive Server (Background)
echo [5/5] Starting Keep-Alive Server...
start "EHB Keep-Alive Server" cmd /k "cd /d %~dp0 && keep-alive.bat"

:: Wait a moment
timeout /t 3 /nobreak >nul

:: Start Voice Assistant (Background)
echo [6/6] Starting Voice Assistant...
start "EHB Voice Assistant" cmd /k "cd /d %~dp0 && start-voice.bat"

echo.
echo ========================================
echo   ✅ All Services Started Successfully!
echo ========================================
echo.
echo 🌐 Development Server: http://localhost:3001
echo 🔄 Keep-Alive Server: http://localhost:3000
echo 🎤 Voice Assistant: Active
echo.
echo 📊 Services are running in separate windows
echo 🛑 Close individual windows to stop services
echo.
echo Press any key to open browser...
pause >nul

:: Open browser
start http://localhost:3001
start http://localhost:3000

echo.
echo 🌐 Browser opened with both servers!
echo.
echo Press any key to exit...
pause >nul 