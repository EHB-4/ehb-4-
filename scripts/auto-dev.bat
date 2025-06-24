@echo off
title EHB Next.js 04 - Auto Development
color 0B

echo.
echo ========================================
echo   EHB Next.js 04 - Auto Development
echo ========================================
echo.
echo 🤖 Auto-starting development server...
echo.

:: Kill existing processes
taskkill /F /IM node.exe >nul 2>&1

:: Clean cache
if exist ".next" rmdir /s /q ".next" >nul 2>&1

:: Start development server
echo 🚀 Starting development server...
npm run dev

echo.
echo ✅ Auto development started!
echo 🌐 http://localhost:3001
echo.
pause 