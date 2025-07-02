@echo off
echo ========================================
echo GoSellr Auto-Launcher
echo ========================================
echo.

echo [1/3] Starting GoSellr server on port 4000...
start /B npm run dev -- --port 4000

echo [2/3] Waiting for server to start...
timeout /t 8 /nobreak >nul

echo [3/3] Opening GoSellr in browser...
start http://localhost:4000/gosellr

echo.
echo ========================================
echo ✅ GoSellr launched successfully!
echo ========================================
echo.
echo 🌐 URL: http://localhost:4000/gosellr
echo 📱 Mobile: http://localhost:4000/gosellr
echo.
echo 💡 Tips:
echo    • Server is running in background
echo    • Press Ctrl+C in server window to stop
echo    • Use Ctrl+R to refresh the page
echo.
pause 