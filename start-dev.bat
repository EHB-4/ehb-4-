@echo off
title EHB Next.js 04 - Development Server
color 0A

echo.
echo ========================================
echo   EHB Next.js 04 - Development Server
echo ========================================
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

:: Start development server
echo [4/4] Starting development server...
echo.
echo ========================================
echo   🌐 Server: http://localhost:3001
echo   📝 Auto-restart: Enabled
echo   🛑 Stop: Ctrl+C
echo ========================================
echo.

:: Start the development server
npm run dev

echo.
echo ========================================
echo   Development server stopped
echo   Press any key to exit...
echo ========================================
pause >nul 