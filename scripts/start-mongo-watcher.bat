@echo off
echo 🎯 Starting MongoDB, Docker, and Prisma Auto Testing Watcher...
echo.

REM Check if PowerShell is available
powershell -Command "Get-Host" >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ PowerShell is not available. Please install PowerShell.
    pause
    exit /b 1
)

REM Check if Docker is available
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Docker is not available. The script will try to use local MongoDB.
    echo.
)

REM Navigate to the project root (assuming this script is in scripts folder)
cd /d "%~dp0.."

REM Start the PowerShell watcher script
echo 🚀 Launching watcher...
powershell -ExecutionPolicy Bypass -File "scripts\mongo-docker-prisma-watcher.ps1"

pause 