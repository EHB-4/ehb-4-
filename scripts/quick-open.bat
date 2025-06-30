@echo off
chcp 65001 >nul
echo 🌐 EHB Quick Browser Open
echo ========================
echo.

echo 🚀 Opening all EHB services in browser...
echo.

echo 📱 Home Page (Port 3000)...
start "" "http://localhost:3000"
timeout /t 1 /nobreak >nul

echo ⚙️ Admin Panel (Port 5000)...
start "" "http://localhost:5000"
timeout /t 1 /nobreak >nul

echo 🔧 Development Portal (Port 8080)...
start "" "http://localhost:8080"
timeout /t 1 /nobreak >nul

echo 🛒 GoSellr (Port 4000)...
start "" "http://localhost:4000"
timeout /t 1 /nobreak >nul

echo.
echo ✅ All services opened in browser!
echo.
echo 📋 Services opened:
echo    • Home Page - http://localhost:3000
echo    • Admin Panel - http://localhost:5000
echo    • Development Portal - http://localhost:8080
echo    • GoSellr - http://localhost:4000
echo.
pause 