@echo off
title EHB Next.js 04 - Setup Auto Startup
color 0C

echo.
echo ========================================
echo   EHB Next.js 04 - Setup Auto Startup
echo ========================================
echo.
echo 🔧 Setting up automatic startup...
echo ⏰ Services will start when PC boots
echo.

:: Check if running as administrator
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ This script requires administrator privileges
    echo 🔧 Right-click and "Run as administrator"
    pause
    exit /b 1
)

:: Get current directory
set "CURRENT_DIR=%~dp0"
set "BATCH_FILE=%CURRENT_DIR%auto-startup.bat"

:: Create startup entry
echo [1/4] Creating startup entry...
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v "EHB-NextJS-04" /t REG_SZ /d "\"%BATCH_FILE%\"" /f
if %errorlevel% equ 0 (
    echo    ✓ Startup entry created successfully
) else (
    echo    ❌ Failed to create startup entry
    pause
    exit /b 1
)

:: Create desktop shortcut
echo [2/4] Creating desktop shortcut...
set "DESKTOP=%USERPROFILE%\Desktop"
set "SHORTCUT=%DESKTOP%\EHB Next.js 04 - Auto Startup.lnk"

powershell -Command "$WshShell = New-Object -comObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut('%SHORTCUT%'); $Shortcut.TargetPath = '%BATCH_FILE%'; $Shortcut.WorkingDirectory = '%CURRENT_DIR%'; $Shortcut.Description = 'EHB Next.js 04 Auto Startup'; $Shortcut.IconLocation = '%CURRENT_DIR%favicon.ico'; $Shortcut.Save()" 2>nul

if exist "%SHORTCUT%" (
    echo    ✓ Desktop shortcut created
) else (
    echo    ⚠ Desktop shortcut creation failed (continuing...)
)

:: Create start menu shortcut
echo [3/4] Creating start menu shortcut...
set "START_MENU=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "STARTUP_SHORTCUT=%START_MENU%\EHB Next.js 04.lnk"

if not exist "%START_MENU%" mkdir "%START_MENU%"

powershell -Command "$WshShell = New-Object -comObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut('%STARTUP_SHORTCUT%'); $Shortcut.TargetPath = '%BATCH_FILE%'; $Shortcut.WorkingDirectory = '%CURRENT_DIR%'; $Shortcut.Description = 'EHB Next.js 04 Auto Startup'; $Shortcut.Save()" 2>nul

if exist "%STARTUP_SHORTCUT%" (
    echo    ✓ Start menu shortcut created
) else (
    echo    ⚠ Start menu shortcut creation failed (continuing...)
)

:: Test the setup
echo [4/4] Testing auto-startup setup...
echo    🧪 Testing startup entry...
reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v "EHB-NextJS-04" >nul 2>&1
if %errorlevel% equ 0 (
    echo    ✓ Startup entry verified
) else (
    echo    ❌ Startup entry verification failed
)

echo.
echo ========================================
echo   ✅ Auto Startup Setup Complete!
echo ========================================
echo.
echo 🚀 Services will now start automatically:
echo    📱 When PC boots up
echo    🔄 When you log in
echo    ⏰ Every time Windows starts
echo.
echo 📁 Files created:
echo    🖥️  Registry entry: HKCU\...\Run\EHB-NextJS-04
echo    🖥️  Desktop shortcut: EHB Next.js 04 - Auto Startup
echo    🖥️  Start menu: Startup\EHB Next.js 04
echo.
echo 🛠️  To disable auto-startup:
echo    🔧 Run: reg delete "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v "EHB-NextJS-04" /f
echo.
echo 🧪 To test now:
echo    🚀 Run: auto-startup.bat
echo.
echo Press any key to exit...
pause >nul 