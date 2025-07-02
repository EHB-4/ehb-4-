@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo 🚀 EHB Quick Start - Auto Start and Open All Pages
echo ==================================================
echo.

:: Kill any existing processes on ports
echo 🔄 Killing existing processes on ports...
for %%p in (3000 5000 8080 4000) do (
    netstat -ano | findstr :%%p >nul 2>&1
    if !errorlevel! equ 0 (
        for /f "tokens=5" %%a in ('netstat -ano ^| findstr :%%p') do (
            taskkill /PID %%a /F >nul 2>&1
            echo ✅ Killed process on port %%p
        )
    )
)

echo.
echo 🚀 Starting all services...

:: Service configurations
set "services[0].name=🏠 Home Page"
set "services[0].port=3000"
set "services[0].folder=ehb-home"
set "services[0].url=http://localhost:3000"

set "services[1].name=⚙️ Admin Panel"
set "services[1].port=5000"
set "services[1].folder=ehb-admin-panel"
set "services[1].url=http://localhost:5000"

set "services[2].name=🔧 Development Portal"
set "services[2].port=8080"
set "services[2].folder=ehb-dev-portal"
set "services[2].url=http://localhost:8080"

set "services[3].name=🛒 GoSellr"
set "services[3].port=4000"
set "services[3].folder=ehb-gosellr"
set "services[3].url=http://localhost:4000"

:: Start each service
for /L %%i in (0,1,3) do (
    echo.
    echo 🚀 Starting !services[%%i].name!...
    
    :: Create folder if it doesn't exist
    if not exist "!services[%%i].folder!" (
        echo 📁 Creating folder: !services[%%i].folder!
        mkdir "!services[%%i].folder!"
        
        :: Create package.json
        echo {> "!services[%%i].folder!\package.json"
        echo   "name": "!services[%%i].folder!",>> "!services[%%i].folder!\package.json"
        echo   "version": "1.0.0",>> "!services[%%i].folder!\package.json"
        echo   "scripts": {>> "!services[%%i].folder!\package.json"
        echo     "dev": "next dev --port !services[%%i].port!",>> "!services[%%i].folder!\package.json"
        echo     "build": "next build",>> "!services[%%i].folder!\package.json"
        echo     "start": "next start --port !services[%%i].port!">> "!services[%%i].folder!\package.json"
        echo   }>> "!services[%%i].folder!\package.json"
        echo }>> "!services[%%i].folder!\package.json"
    )
    
    :: Start service in background
    start "EHB !services[%%i].name!" cmd /c "cd /d !services[%%i].folder! && npm run dev -- --port !services[%%i].port!"
    
    echo ✅ !services[%%i].name! started
    echo ⏳ Waiting for service to be ready...
    
    :: Wait for service to be ready
    :wait_loop_%%i
    timeout /t 1 /nobreak >nul
    netstat -ano | findstr :!services[%%i].port! >nul 2>&1
    if !errorlevel! neq 0 (
        goto wait_loop_%%i
    )
    
    echo ✅ !services[%%i].name! is ready on port !services[%%i].port!
    
    :: Open in browser after 2 seconds
    timeout /t 2 /nobreak >nul
    start "" "!services[%%i].url!"
    echo 🌐 Opened !services[%%i].name! in browser
    
    :: Wait before next service
    if %%i lss 3 (
        echo ⏳ Waiting 3 seconds before next service...
        timeout /t 3 /nobreak >nul
    )
)

:: Start ultra-fast agent
echo.
echo 🚀 Starting 🚀 Ultra-Fast Agent...
if exist "scripts\ehb-ultra-fast-agent.cjs" (
    start "EHB Ultra-Fast Agent" cmd /c "node scripts\ehb-ultra-fast-agent.cjs"
    echo ✅ Ultra-Fast Agent started
) else (
    echo ⚠️ Ultra-Fast Agent script not found
)

echo.
echo ✅ All services started successfully!
echo 🌐 All pages should be open in your browser
echo.
echo 📋 Services running:
echo    • 🏠 Home Page - http://localhost:3000
echo    • ⚙️ Admin Panel - http://localhost:5000
echo    • 🔧 Development Portal - http://localhost:8080
echo    • 🛒 GoSellr - http://localhost:4000
echo    • 🚀 Ultra-Fast Agent
echo.
echo 💡 Tips:
echo    • Use Ctrl+Tab to switch between browser tabs
echo    • Services will continue running in background
echo    • Press any key to exit this window
echo.
pause 