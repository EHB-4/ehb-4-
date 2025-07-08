@echo off
title EHB Next.js 04 - Clean Startup

echo 🚀 EHB Next.js 04 - Clean Startup
echo =================================

REM Kill processes using port 3000
echo 🧹 Cleaning up processes using port 3000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    echo    Killing process: %%a
    taskkill /F /PID %%a >nul 2>&1
)
echo ✅ Port cleanup complete

REM Check if port 3000 is available
echo 🔍 Checking port 3000 availability...
netstat -an | findstr :3000 >nul
if %errorlevel% equ 0 (
    echo ❌ Port 3000 is still in use
    echo 💡 Please stop the process using this port and try again
    pause
    exit /b 1
) else (
    echo ✅ Port 3000 is available
)

REM Start development server
echo 🚀 Starting development server...
echo 📝 Frontend will be available at http://localhost:3000
echo 🛑 Press Ctrl+C to stop
echo.

npm run dev

pause 