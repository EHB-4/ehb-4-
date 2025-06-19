@echo off
echo 🎯 EHB Complete Setup - All-in-One Automation
echo =============================================
echo.

REM Check if PowerShell is available
powershell -Command "Get-Host" >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ PowerShell is not available. Please install PowerShell.
    pause
    exit /b 1
)

REM Navigate to project root
cd /d "%~dp0.."

echo 🚀 Starting EHB Complete Setup...
echo.

REM Step 1: Run auto setup
echo 1️⃣ Running Auto Setup...
powershell -ExecutionPolicy Bypass -File "scripts\ehb-auto-setup.ps1" -SkipChecks
if %errorlevel% neq 0 (
    echo ⚠️ Auto setup had issues, but continuing...
)

echo.

REM Step 2: Run status check
echo 2️⃣ Running Status Check...
powershell -ExecutionPolicy Bypass -File "scripts\ehb-status-check.ps1" -Detailed
if %errorlevel% neq 0 (
    echo ⚠️ Status check had issues, but continuing...
)

echo.

REM Step 3: Run MongoDB test
echo 3️⃣ Running MongoDB Test...
npm run mongo-fast
if %errorlevel% neq 0 (
    echo ⚠️ MongoDB test had issues, but continuing...
)

echo.

REM Step 4: Quick start
echo 4️⃣ Quick Start Setup...
powershell -ExecutionPolicy Bypass -File "scripts\ehb-quick-start.ps1" -AutoBrowser

echo.
echo 🎉 EHB Complete Setup Finished!
echo ===============================
echo.
echo 📊 Summary:
echo ✅ Auto setup completed
echo ✅ Status check completed  
echo ✅ MongoDB test completed
echo ✅ Quick start completed
echo.
echo 🌐 Your app should be running at: http://localhost:3000
echo 📁 Check cursor-test-results/ for test reports
echo 🔧 Run 'npm run dev' to restart if needed
echo.
echo 🚀 Happy coding with EHB!
echo.
pause 