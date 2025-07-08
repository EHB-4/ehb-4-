@echo off
echo 🚀 Starting EHB Frontend Development Server...
echo 📍 Port: 3000
echo 🌐 URL: http://localhost:3000
echo.

cd /d "%~dp0"
yarn dev:open

pause 