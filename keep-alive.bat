@echo off
title EHB Next.js 04 - Keep Alive Server
color 0A

echo.
echo ========================================
echo   EHB Next.js 04 - Keep Alive Server
echo ========================================
echo.
echo 🌍 Server will run 24/7 automatically
echo 🔄 Auto-restart on any crash
echo 🌐 Available at: http://localhost:3000
echo 🛑 To stop: Close this window
echo.

:start_server
echo [%time%] Starting development server...
echo.

:: Kill existing processes
taskkill /F /IM node.exe >nul 2>&1

:: Clean .next directory
if exist ".next" rmdir /s /q ".next" >nul 2>&1

:: Start development server
npm run dev

echo.
echo [%time%] Server stopped, restarting in 3 seconds...
timeout /t 3 /nobreak >nul

:: Restart automatically
goto start_server 