@echo off
title EHB Next.js 04 - Disable Auto Startup
color 0C

echo.
echo ========================================
echo   EHB Next.js 04 - Disable Auto Startup
echo ========================================
echo.
echo 🛑 Disabling automatic startup...
echo.

:: Check if running as administrator
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ This script requires administrator privileges
    echo 🔧 Right-click and "Run as administrator"
    pause
    exit /b 1
)

:: Remove startup entry
echo [1/3] Removing startup entry...
reg delete "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v "EHB-NextJS-04" /f
if %errorlevel% equ 0 (
    echo    ✓ Startup entry removed successfully
) else (
    echo    ℹ No startup entry found
)

:: Remove desktop shortcut
echo [2/3] Removing desktop shortcut...
set "DESKTOP=%USERPROFILE%\Desktop"
set "SHORTCUT=%DESKTOP%\EHB Next.js 04 - Auto Startup.lnk"

if exist "%SHORTCUT%" (
    del "%SHORTCUT%"
    echo    ✓ Desktop shortcut removed
) else (
    echo    ℹ No desktop shortcut found
)

:: Remove start menu shortcut
echo [3/3] Removing start menu shortcut...
set "START_MENU=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "STARTUP_SHORTCUT=%START_MENU%\EHB Next.js 04.lnk"

if exist "%STARTUP_SHORTCUT%" (
    del "%STARTUP_SHORTCUT%"
    echo    ✓ Start menu shortcut removed
) else (
    echo    ℹ No start menu shortcut found
)

echo.
echo ========================================
echo   ✅ Auto Startup Disabled Successfully!
echo ========================================
echo.
echo 🛑 Services will no longer start automatically
echo 🔧 To re-enable: Run setup-auto-startup.bat
echo.
echo Press any key to exit...
pause >nul 