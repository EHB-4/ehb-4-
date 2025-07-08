@echo off
title EHB Auto Manager
color 0A

echo.
echo ========================================
echo    EHB Auto Manager - Frontend Control
echo ========================================
echo.

:menu
echo Choose an option:
echo 1. Start Frontend
echo 2. Stop Frontend  
echo 3. Check Status
echo 4. Open Browser
echo 5. Exit
echo.

set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" goto start
if "%choice%"=="2" goto stop
if "%choice%"=="3" goto status
if "%choice%"=="4" goto browser
if "%choice%"=="5" goto exit
goto menu

:start
echo.
echo Starting frontend...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul
start "Frontend" cmd /k "npm run dev"
timeout /t 5 /nobreak >nul
echo Frontend started!
echo.
pause
goto menu

:stop
echo.
echo Stopping frontend...
taskkill /F /IM node.exe >nul 2>&1
echo Frontend stopped!
echo.
pause
goto menu

:status
echo.
echo Checking frontend status...
netstat -ano | findstr ":3000" >nul
if %errorlevel%==0 (
    echo Frontend is running on http://localhost:3000
) else (
    echo Frontend is not running
)
echo.
pause
goto menu

:browser
echo.
echo Opening browser...
start http://localhost:3000
echo Browser opened!
echo.
pause
goto menu

:exit
echo.
echo Goodbye!
timeout /t 2 /nobreak >nul
exit 