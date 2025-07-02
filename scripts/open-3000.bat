@echo off
chcp 65001 >nul
setlocal

echo 🌐 EHB Open Port 3000
echo =====================
echo.

set "PORT=3000"
set "URL=http://localhost:3000"
set "SERVICE_NAME=🏠 Home Page"

echo 🚀 Opening %SERVICE_NAME%...
echo 📍 URL: %URL%
echo.

:: Check if port is in use
netstat -ano | findstr :%PORT% >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Service detected on port %PORT%
    echo 🌐 Opening in browser...
    start "" "%URL%"
    echo ✅ Successfully opened %SERVICE_NAME% in browser!
    echo 🌐 %URL% should now be open in your default browser
) else (
    echo ⚠️  No service detected on port %PORT%
    echo 💡 Starting service first...
    echo.
    
    :: Try to start the service
    start "EHB Home Page" cmd /c "npm run dev -- --port %PORT%"
    
    echo ⏳ Waiting for service to start...
    timeout /t 5 /nobreak >nul
    
    :: Check again
    netstat -ano | findstr :%PORT% >nul 2>&1
    if %errorlevel% equ 0 (
        echo ✅ Service is now running on port %PORT%
        echo 🌐 Opening in browser...
        start "" "%URL%"
        echo ✅ Successfully opened %SERVICE_NAME% in browser!
    ) else (
        echo ❌ Service failed to start on port %PORT%
        echo 💡 Please start the service manually first:
        echo    npm run dev -- --port %PORT%
        echo.
        echo 💡 Or try opening manually:
        echo    %URL%
    )
)

echo.
echo 💡 Tips:
echo    • If browser doesn't open, manually go to: %URL%
echo    • Use Ctrl+Tab to switch between browser tabs
echo    • Service will continue running in background
echo.
pause 