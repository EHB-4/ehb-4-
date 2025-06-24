@echo off
title EHB Next.js 04 - Auto Storybook
color 0C

echo.
echo ========================================
echo   EHB Next.js 04 - Auto Storybook
echo ========================================
echo.
echo 🤖 Auto-starting Storybook...
echo.

:: Kill existing storybook processes
taskkill /F /IM node.exe >nul 2>&1

:: Start storybook
echo 🚀 Starting Storybook...
npm run storybook

echo.
echo ✅ Auto Storybook started!
echo 🌐 http://localhost:6006
echo.
pause 