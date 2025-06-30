@echo off
title EHB Auto System - Windows Startup
echo ========================================
echo    EHB Auto System - Windows Startup
echo ========================================
echo.
echo Starting EHB services automatically...
echo.

cd /d "F:\ehb next.js 04"

echo [%time%] Starting EHB Auto Developer...
node scripts/ehb-auto-developer.js create

echo.
echo [%time%] Starting EHB Auto System...
node scripts/ehb-auto-system.js start-all

echo.
echo [%time%] EHB Auto System started successfully!
echo.
echo Services are now running on their assigned ports:
echo - EHB Dashboard: http://localhost:3001
echo - Admin Panel: http://localhost:3002
echo - PSS: http://localhost:4001
echo - EDR: http://localhost:4002
echo - EMO: http://localhost:4003
echo - Wallet: http://localhost:5001
echo - Blockchain: http://localhost:5007
echo - SQL Level: http://localhost:4014
echo.
echo Auto system will continue monitoring and developing...
echo.
echo Press any key to close this window...
pause >nul 