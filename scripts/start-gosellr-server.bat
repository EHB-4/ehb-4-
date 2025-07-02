@echo off
echo ========================================
echo GoSellr Server Starter
echo ========================================
echo.

echo [1/4] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js first
    pause
    exit /b 1
)
echo ✅ Node.js is installed

echo.
echo [2/4] Checking npm installation...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed or not in PATH
    pause
    exit /b 1
)
echo ✅ npm is installed

echo.
echo [3/4] Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)
echo ✅ Dependencies installed

echo.
echo [4/4] Starting GoSellr server on port 4000...
echo.
echo 🚀 Starting server...
echo 📍 Port: 4000
echo 🌐 URL: http://localhost:4000/gosellr
echo.
echo ⏳ Waiting 5 seconds for server to start...
timeout /t 5 /nobreak >nul

echo.
echo 🌐 Opening GoSellr in browser...
start http://localhost:4000/gosellr

echo.
echo ========================================
echo ✅ GoSellr server started successfully!
echo ========================================
echo.
echo 💡 Server Commands:
echo    • Press Ctrl+C to stop the server
echo    • Use npm run dev -- --port 4000 to restart
echo    • Check logs for any errors
echo.
echo 🌐 Access URLs:
echo    • Main: http://localhost:4000/gosellr
echo    • Dashboard: http://localhost:4000/gosellr/dashboard
echo    • Products: http://localhost:4000/gosellr/products
echo.

npm run dev -- --port 4000 