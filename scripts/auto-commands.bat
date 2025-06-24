@echo off
setlocal enabledelayedexpansion

:: Auto Development Commands for Windows Batch
:: This script automates all development tasks

set "COMMAND=%1"
set "AUTO_MODE=%2"

echo 🚀 EHB Next.js 04 - Auto Development Commands
echo =============================================

if "%COMMAND%"=="dev" (
    if "%AUTO_MODE%"=="auto" (
        call :auto_dev
    ) else if "%AUTO_MODE%"=="clean" (
        call :clean_restart
    ) else (
        call :start_dev
    )
) else if "%COMMAND%"=="clean" (
    call :cleanup
) else if "%COMMAND%"=="restart" (
    call :clean_restart
) else if "%COMMAND%"=="build" (
    call :build_production
) else if "%COMMAND%"=="test" (
    call :run_tests
) else if "%COMMAND%"=="install" (
    call :install_deps
) else if "%COMMAND%"=="lint" (
    call :run_lint
) else if "%COMMAND%"=="auto" (
    call :auto_dev
) else (
    call :show_help
)

goto :eof

:auto_dev
echo 🤖 Starting Auto Development Mode...
echo 📝 File changes will auto-restart the server
echo 🛑 Press Ctrl+C to stop
call :kill_processes
call :clean_next
call :check_deps
call :start_dev
goto :eof

:clean_restart
echo 🔄 Clean restart...
call :kill_processes
call :clean_next
call :start_dev
goto :eof

:cleanup
echo 🧹 Cleaning up...
call :kill_processes
call :clean_next
echo ✅ Cleanup completed
goto :eof

:kill_processes
echo 🔄 Stopping all Node processes...
taskkill /F /IM node.exe >nul 2>&1
if !errorlevel! equ 0 (
    echo ✅ All Node processes stopped
) else (
    echo ℹ️ No Node processes found
)
goto :eof

:clean_next
echo 🧹 Cleaning .next directory...
if exist ".next" (
    rmdir /s /q ".next" >nul 2>&1
    echo ✅ .next directory cleaned
) else (
    echo ℹ️ .next directory not found
)
goto :eof

:check_deps
if not exist "node_modules" (
    call :install_deps
)
goto :eof

:install_deps
echo 📦 Installing dependencies...
npm install
if !errorlevel! equ 0 (
    echo ✅ Dependencies installed successfully
) else (
    echo ❌ Failed to install dependencies
    exit /b 1
)
goto :eof

:start_dev
echo 🚀 Starting development server...
echo 🌐 Server will be available at: http://localhost:3000
npm run dev
goto :eof

:build_production
echo 🏗️ Building for production...
npm run build
if !errorlevel! equ 0 (
    echo ✅ Production build successful
) else (
    echo ❌ Production build failed
    exit /b 1
)
goto :eof

:run_tests
echo 🧪 Running tests...
npm test
if !errorlevel! equ 0 (
    echo ✅ All tests passed
) else (
    echo ⚠️ Some tests failed
)
goto :eof

:run_lint
echo 🔍 Running linting...
npm run lint
if !errorlevel! equ 0 (
    echo ✅ Code linting passed
) else (
    echo ⚠️ Code linting issues found
)
goto :eof

:show_help
echo ❌ Unknown command: %COMMAND%
echo Available commands:
echo   dev        - Start development server
echo   dev auto   - Start auto development mode
echo   dev clean  - Clean and start development server
echo   clean      - Clean .next directory and stop processes
echo   restart    - Clean restart development server
echo   build      - Build for production
echo   test       - Run tests
echo   install    - Install dependencies
echo   lint       - Run linting
echo   auto       - Start auto development mode
goto :eof 