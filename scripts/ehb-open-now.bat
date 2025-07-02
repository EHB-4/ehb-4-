@echo off
chcp 65001 >nul

echo 🌐 EHB Open All Pages NOW
echo =========================
echo Opening all pages in browser immediately...
echo.

echo 🚀 Opening 🏠 Home Page...
echo 📍 http://localhost:3000
start "" "http://localhost:3000"
timeout /t 1 /nobreak >nul

echo 🚀 Opening ⚙️ Admin Panel...
echo 📍 http://localhost:5000
start "" "http://localhost:5000"
timeout /t 1 /nobreak >nul

echo 🚀 Opening 🔧 Development Portal...
echo 📍 http://localhost:8080
start "" "http://localhost:8080"
timeout /t 1 /nobreak >nul

echo 🚀 Opening 🛒 GoSellr...
echo 📍 http://localhost:4000
start "" "http://localhost:4000"
timeout /t 1 /nobreak >nul

echo.
echo 🎉 All pages opened!
echo.
echo 📋 Pages opened:
echo    • 🏠 Home Page - http://localhost:3000
echo    • ⚙️ Admin Panel - http://localhost:5000
echo    • 🔧 Development Portal - http://localhost:8080
echo    • 🛒 GoSellr - http://localhost:4000
echo.
echo 💡 If pages show errors, the services are not running yet.
echo    Start services first, then run this script again.
echo.
pause 