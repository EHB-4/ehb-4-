@echo off
setlocal enabledelayedexpansion

REM Agent Auto Sync Starter Script (Batch Version)
REM Automatically starts the agent sync system

set "PROJECT_ROOT=%~dp0.."
set "SCRIPT_PATH=%PROJECT_ROOT%\scripts\agent-auto-sync.js"
set "LOG_PATH=%PROJECT_ROOT%\logs\agent-sync.log"
set "PID_FILE=%PROJECT_ROOT%\temp\agent-sync.pid"

REM Create necessary directories
if not exist "%PROJECT_ROOT%\logs" mkdir "%PROJECT_ROOT%\logs"
if not exist "%PROJECT_ROOT%\temp" mkdir "%PROJECT_ROOT%\temp"

REM Colors (Windows 10+)
set "INFO=[36m"
set "SUCCESS=[32m"
set "WARNING=[33m"
set "ERROR=[31m"
set "RESET=[0m"

echo %INFO%EHB Agent Auto Sync Manager%RESET%
echo =====================================

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo %ERROR%Node.js is not installed. Please install Node.js first.%RESET%
    pause
    exit /b 1
)

REM Check if Git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo %ERROR%Git is not installed. Please install Git first.%RESET%
    pause
    exit /b 1
)

REM Check if script exists
if not exist "%SCRIPT_PATH%" (
    echo %ERROR%Agent sync script not found: %SCRIPT_PATH%%RESET%
    pause
    exit /b 1
)

REM Parse command line arguments
set "COMMAND=%1"
if "%COMMAND%"=="" set "COMMAND=start"

if "%COMMAND%"=="start" (
    echo %INFO%Starting Agent Auto Sync System...%RESET%
    
    REM Check if already running
    if exist "%PID_FILE%" (
        set /p PID=<"%PID_FILE%"
        tasklist /FI "PID eq !PID!" 2>nul | find "!PID!" >nul
        if not errorlevel 1 (
            echo %WARNING%Agent sync is already running (PID: !PID!)%RESET%
            pause
            exit /b 0
        )
    )
    
    REM Start the sync process
    echo %INFO%Starting agent sync in background...%RESET%
    start /B node "%SCRIPT_PATH%" start > "%LOG_PATH%" 2>&1
    
    REM Save PID
    for /f "tokens=2" %%a in ('tasklist /FI "IMAGENAME eq node.exe" /FO CSV ^| find "node.exe"') do (
        set "PID=%%a"
        set "PID=!PID:"=!"
        echo !PID! > "%PID_FILE%"
        echo %SUCCESS%Agent sync started (PID: !PID!)%RESET%
        goto :end
    )
    
    echo %ERROR%Failed to start agent sync%RESET%
    
) else if "%COMMAND%"=="stop" (
    echo %INFO%Stopping Agent Auto Sync System...%RESET%
    
    if exist "%PID_FILE%" (
        set /p PID=<"%PID_FILE%"
        taskkill /F /PID !PID! >nul 2>&1
        if not errorlevel 1 (
            echo %SUCCESS%Agent sync stopped (PID: !PID!)%RESET%
        ) else (
            echo %WARNING%Could not stop process (PID: !PID!)%RESET%
        )
        del "%PID_FILE%" >nul 2>&1
    ) else (
        echo %INFO%Agent sync is not running%RESET%
    )
    
) else if "%COMMAND%"=="restart" (
    echo %INFO%Restarting Agent Auto Sync System...%RESET%
    call "%~f0" stop
    timeout /t 2 /nobreak >nul
    call "%~f0" start
    
) else if "%COMMAND%"=="status" (
    echo %INFO%Agent Auto Sync Status:%RESET%
    
    if exist "%PID_FILE%" (
        set /p PID=<"%PID_FILE%"
        tasklist /FI "PID eq !PID!" 2>nul | find "!PID!" >nul
        if not errorlevel 1 (
            echo %SUCCESS%Running (PID: !PID!)%RESET%
        ) else (
            echo %ERROR%Not running (stale PID file)%RESET%
        )
    ) else (
        echo %ERROR%Not running%RESET%
    )
    
    if exist "%SCRIPT_PATH%" (
        echo %SUCCESS%Script found%RESET%
    ) else (
        echo %ERROR%Script not found%RESET%
    )
    
    if exist "%LOG_PATH%" (
        for %%A in ("%LOG_PATH%") do set "LOG_SIZE=%%~zA"
        set /a "LOG_SIZE_KB=!LOG_SIZE!/1024"
        echo %INFO%Log file: %LOG_SIZE_KB% KB%RESET%
    )
    
) else if "%COMMAND%"=="logs" (
    if exist "%LOG_PATH%" (
        echo %INFO%Recent logs:%RESET%
        type "%LOG_PATH%"
    ) else (
        echo %ERROR%No log file found%RESET%
    )
    
) else if "%COMMAND%"=="install" (
    echo %INFO%Installing auto-startup...%RESET%
    
    set "STARTUP_SCRIPT=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\start-agent-sync.bat"
    
    (
        echo @echo off
        echo cd /d "%PROJECT_ROOT%"
        echo call "%~f0" start
    ) > "%STARTUP_SCRIPT%"
    
    echo %SUCCESS%Auto-startup installed: %STARTUP_SCRIPT%%RESET%
    
) else if "%COMMAND%"=="uninstall" (
    echo %INFO%Removing auto-startup...%RESET%
    
    set "STARTUP_SCRIPT=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\start-agent-sync.bat"
    if exist "%STARTUP_SCRIPT%" (
        del "%STARTUP_SCRIPT%"
        echo %SUCCESS%Auto-startup removed%RESET%
    ) else (
        echo %INFO%Auto-startup not found%RESET%
    )
    
) else (
    echo %ERROR%Unknown command: %COMMAND%%RESET%
    echo.
    echo Usage:
    echo   %~nx0 start     - Start agent sync
    echo   %~nx0 stop      - Stop agent sync
    echo   %~nx0 restart   - Restart agent sync
    echo   %~nx0 status    - Show status
    echo   %~nx0 logs      - Show recent logs
    echo   %~nx0 install   - Install auto-startup
    echo   %~nx0 uninstall - Remove auto-startup
    echo.
    echo Examples:
    echo   %~nx0 start
    echo   %~nx0 install
)

:end
if "%COMMAND%"=="start" (
    echo.
    echo %INFO%Agent sync is running in background%RESET%
    echo %INFO%Logs: %LOG_PATH%%RESET%
    echo %INFO%To stop: %~nx0 stop%RESET%
)

pause 