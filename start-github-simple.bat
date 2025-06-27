@echo off
title EHB GitHub Auto-Push System (Simple)
color 0A

echo.
echo ========================================
echo   EHB GitHub Auto-Push System (Simple)
echo ========================================
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

:: Check if npm is available
npm --version >nul 2>&1
if errorlevel 1 (
    echo npm is not available
    pause
    exit /b 1
)

:: Check if git is available
git --version >nul 2>&1
if errorlevel 1 (
    echo Git is not installed or not in PATH
    echo Please install Git from https://git-scm.com/
    pause
    exit /b 1
)

:: Install dependencies if needed
echo Checking dependencies...
if not exist "node_modules\chokidar" (
    echo Installing chokidar...
    npm install chokidar
)

:: Check if we're in a git repository
git status >nul 2>&1
if errorlevel 1 (
    echo Not a git repository
    echo Please initialize git or navigate to a git repository
    pause
    exit /b 1
)

:: Check if remote origin exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo No remote origin found
    echo Please add a GitHub remote: git remote add origin ^<your-repo-url^>
    pause
    exit /b 1
)

echo All checks passed!
echo.
echo Starting GitHub Auto-Push System...
echo This will automatically sync your changes with GitHub
echo.
echo Press Ctrl+C to stop the system
echo.

:: Start the auto-push system
node scripts/github-auto-push-simple.js

echo.
echo System stopped
pause 