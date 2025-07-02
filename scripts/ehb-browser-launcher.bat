@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo 🌐 EHB Auto-Open All Services
echo =============================
echo Opening all EHB services in browser...
echo.

:: Service configurations
set "services[0].name=🏠 Home Page"
set "services[0].url=http://localhost:3000"
set "services[0].desc=Main EHB Home Page"

set "services[1].name=⚙️ Admin Panel"
set "services[1].url=http://localhost:5000"
set "services[1].desc=EHB Admin Panel"

set "services[2].name=🔧 Development Portal"
set "services[2].url=http://localhost:8080"
set "services[2].desc=EHB Development Portal"

set "services[3].name=🛒 GoSellr"
set "services[3].url=http://localhost:4000"
set "services[3].desc=EHB GoSellr Platform"

set "successCount=0"
set "totalServices=4"

:: Open each service
for /L %%i in (0,1,3) do (
    set /a "currentIndex=%%i+1"
    echo 🚀 Opening !services[%%i].name! (!currentIndex!/%totalServices%)...
    echo    📍 !services[%%i].url!
    echo    📝 !services[%%i].desc!
    
    start "" "!services[%%i].url!"
    if !errorlevel! equ 0 (
        echo ✅ Opened !services[%%i].name!
        set /a "successCount+=1"
    ) else (
        echo ❌ Failed to open !services[%%i].name!
    )
    
    if %%i lss 3 (
        echo    ⏳ Waiting 1.5 seconds...
        timeout /t 1 /nobreak >nul
        timeout /t 1 /nobreak >nul
        timeout /t 1 /nobreak >nul
        echo.
    )
)

echo.
echo 📊 Summary:
echo ✅ Successfully opened: %successCount%/%totalServices% services
echo.
echo 📋 Services opened:
echo    1. 🏠 Home Page - http://localhost:3000
echo    2. ⚙️ Admin Panel - http://localhost:5000
echo    3. 🔧 Development Portal - http://localhost:8080
echo    4. 🛒 GoSellr - http://localhost:4000
echo.
echo 🎉 All EHB services opened in browser!
echo.
echo 💡 Tips:
echo    • If services show connection errors, start them first with: npm run auto:all
echo    • Use Ctrl+Tab to switch between browser tabs
echo    • Each service runs on its dedicated port
echo.
pause 