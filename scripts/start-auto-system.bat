@echo off
echo ========================================
echo    EHB Auto System Startup Script
echo ========================================
echo.

echo [1/5] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo ✅ Node.js found

echo.
echo [2/5] Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo ✅ Dependencies installed

echo.
echo [3/5] Installing automation dependencies...
npm install puppeteer nodemailer
if %errorlevel% neq 0 (
    echo ERROR: Failed to install automation dependencies
    pause
    exit /b 1
)
echo ✅ Automation dependencies installed

echo.
echo [4/5] Starting development server...
start "EHB Dev Server" cmd /k "npm run dev"

echo.
echo [5/5] Waiting for server to start...
timeout /t 10 /nobreak >nul

echo.
echo ========================================
echo    Starting Auto Master System
echo ========================================
echo.
echo 🚀 Initializing automation system...
echo 📊 This will automatically:
echo    - Test all pages for errors
echo    - Monitor system performance
echo    - Send email alerts for issues
echo    - Generate detailed reports
echo.
echo Press Ctrl+C to stop the system
echo.

node scripts/ehb-auto-master.js --monitor

echo.
echo ========================================
echo    Auto System Stopped
echo ========================================
pause 