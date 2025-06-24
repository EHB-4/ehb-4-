@echo off
echo 🚀 EHB Next.js 04 - Auto Development
echo ====================================

:: Kill existing processes
echo 🔄 Stopping existing processes...
taskkill /F /IM node.exe >nul 2>&1

:: Clean .next directory
echo 🧹 Cleaning .next directory...
if exist ".next" rmdir /s /q ".next" >nul 2>&1

:: Install dependencies if needed
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
)

:: Start development server
echo 🚀 Starting development server...
echo 🌐 Server will be available at: http://localhost:3000
echo 📝 File changes will auto-restart the server
echo 🛑 Press Ctrl+C to stop
echo.

npm run dev 