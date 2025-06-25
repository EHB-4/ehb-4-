@echo off
title EHB Auto-Push System
color 0A

echo.
echo ========================================
echo    EHB Auto-Push System Starting...
echo ========================================
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

:: Check if chokidar is installed
echo 📦 Checking dependencies...
npm list chokidar >nul 2>&1
if errorlevel 1 (
    echo 📦 Installing chokidar...
    npm install chokidar
)

:: Check if git is initialized
echo 🔍 Checking git repository...
git status >nul 2>&1
if errorlevel 1 (
    echo ❌ Not a git repository
    echo Please initialize git first: git init
    pause
    exit /b 1
)

:: Check if remote origin exists
git remote -v | findstr origin >nul 2>&1
if errorlevel 1 (
    echo ❌ No remote origin found
    echo Please add GitHub remote: git remote add origin <your-repo-url>
    pause
    exit /b 1
)

echo.
echo ✅ All checks passed!
echo 🚀 Starting EHB Auto-Push System...
echo.
echo 📝 This system will automatically:
echo    - Watch for file changes
echo    - Commit changes every 30 seconds
echo    - Push to GitHub automatically
echo.
echo 🛑 Press Ctrl+C to stop
echo.

:: Start the auto-push system
node scripts/ehb-auto-push.js

pause 