@echo off
echo ========================================
echo GoSellr Auto-Launcher
echo ========================================
echo.

echo [1/3] Checking if GoSellr is running on port 4000...
netstat -an | findstr :4000 >nul
if %errorlevel% equ 0 (
    echo ✅ GoSellr is already running on port 4000
) else (
    echo ❌ GoSellr is not running on port 4000
    echo.
    echo [2/3] Starting GoSellr server...
    echo Please start your GoSellr server first:
    echo npm run dev -- --port 4000
    echo.
    pause
    exit /b 1
)

echo.
echo [3/3] Opening GoSellr in browser...
start http://localhost:4000/gosellr

echo.
echo ========================================
echo ✅ GoSellr opened successfully!
echo ========================================
echo.
echo 🌐 URL: http://localhost:4000/gosellr
echo 📱 Mobile: http://localhost:4000/gosellr
echo.
echo 💡 Tips:
echo    • Press Ctrl+C to stop the server
echo    • Use Ctrl+R to refresh the page
echo    • Check console for any errors
echo.
pause 