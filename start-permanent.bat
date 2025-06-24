@echo off
title EHB Next.js 04 - Permanent 24/7 Server
color 0A

echo.
echo ========================================
echo   EHB Next.js 04 - Permanent Server
echo ========================================
echo.
echo 🌍 Server will run 24/7 automatically
echo 🔄 Auto-restart on any crash
echo 🌐 Available at: http://localhost:3000
echo 🛑 To stop: npm run server:stop
echo.

:: Kill existing processes
echo [1/4] Stopping existing processes...
taskkill /F /IM node.exe >nul 2>&1
if %errorlevel% equ 0 (
    echo    ✓ Existing processes stopped
) else (
    echo    ℹ No existing processes found
)

:: Clean .next directory
echo [2/4] Cleaning .next directory...
if exist ".next" (
    rmdir /s /q ".next" >nul 2>&1
    echo    ✓ .next directory cleaned
) else (
    echo    ℹ .next directory not found
)

:: Install dependencies if needed
echo [3/4] Checking dependencies...
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

:: Start permanent server
echo [4/4] Starting permanent server...
echo.
echo ========================================
echo   🌍 Permanent Server Starting...
echo   🌐 Server: http://localhost:3000
echo   🔄 Auto-restart: Enabled
echo   ⏰ Running 24/7
echo   🛑 Stop: npm run server:stop
echo ========================================
echo.

:: Start the permanent server
npm run server:permanent

echo.
echo ========================================
echo   Permanent server stopped
echo   Press any key to exit...
echo ========================================
pause >nul 