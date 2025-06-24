@echo off
title EHB Next.js 04 - Quick Error Fix
color 0E

echo.
echo ========================================
echo   EHB Next.js 04 - Quick Error Fix
echo ========================================
echo.
echo ⚡ Quick fixing common errors...
echo.

:: Kill processes
taskkill /F /IM node.exe >nul 2>&1

:: Clean cache
if exist ".next" rmdir /s /q ".next" >nul 2>&1

:: Fix dependencies
if not exist "node_modules" (
    npm install
) else (
    echo Checking dependencies...
    npm install --silent
)

:: Fix environment
if not exist ".env.local" (
    if exist ".env.example" copy ".env.example" ".env.local" >nul 2>&1
)

:: Quick build
npm run build --silent >nul 2>&1

:: Start services
echo Starting services...
start "Dev" cmd /k "npm run dev"
timeout /t 2 /nobreak >nul
start "Keep-Alive" cmd /k "keep-alive.bat"
timeout /t 2 /nobreak >nul
start "Voice" cmd /k "start-voice.bat"

:: Open browsers
timeout /t 3 /nobreak >nul
start http://localhost:3001
start http://localhost:3000

echo.
echo ========================================
echo   ✅ Quick Error Fix Complete!
echo ========================================
echo.
echo 🌐 http://localhost:3001
echo 🔄 http://localhost:3000
echo.
pause 