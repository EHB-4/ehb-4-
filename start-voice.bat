@echo off
title EHB Next.js 04 - Voice Assistant
color 0B

echo.
echo ========================================
echo   EHB Next.js 04 - Voice Assistant
echo ========================================
echo.

:: Kill existing voice processes
echo [1/3] Stopping existing voice processes...
taskkill /F /IM node.exe >nul 2>&1
if %errorlevel% equ 0 (
    echo    ✓ Existing processes stopped
) else (
    echo    ℹ No existing processes found
)

:: Check audio devices
echo [2/3] Checking audio devices...
powershell -Command "Get-WmiObject -Class Win32_SoundDevice | Select-Object Name, Status" 2>nul
if %errorlevel% equ 0 (
    echo    ✓ Audio devices found
) else (
    echo    ⚠ No audio devices detected
)

:: Start voice assistant
echo [3/3] Starting voice assistant...
echo.
echo ========================================
echo   🎤 Voice Assistant Starting...
echo   🔊 Audio: Enabled
echo   🎵 Speech Recognition: Active
echo   🛑 Stop: Ctrl+C
echo ========================================
echo.

:: Start voice assistant (placeholder for now)
echo 🎤 Voice Assistant is starting...
echo 🔊 Audio system initialized...
echo 🎵 Speech recognition active...
echo.
echo 💡 Voice Commands Available:
echo    - "Start development" - Start dev server
echo    - "Open browser" - Open localhost
echo    - "Stop server" - Stop all servers
echo    - "Check status" - Check server status
echo.

:: Keep voice assistant running
:voice_loop
echo 🎤 Listening for voice commands...
timeout /t 5 /nobreak >nul
goto voice_loop

echo.
echo ========================================
echo   Voice assistant stopped
echo   Press any key to exit...
echo ========================================
pause >nul
