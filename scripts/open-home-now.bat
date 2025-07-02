@echo off
chcp 65001 >nul

echo 🏠 Opening EHB Home Page NOW
echo ============================
echo Opening http://localhost:3000 in browser...
echo.

set "HOME_URL=http://localhost:3000"

echo 🚀 Opening EHB Home Page...
echo 📍 %HOME_URL%

start "" "%HOME_URL%"

echo ✅ EHB Home Page opened in browser!
echo 🌐 %HOME_URL% should now be open
echo.
echo 🎉 Script completed!
echo.
echo 📋 What happened:
echo    • 🏠 EHB Home Page: %HOME_URL%
echo    • 🔧 Port: 3000
echo    • 🌐 Browser: Should be open now
echo.
echo 💡 If the page shows an error, the service is not running.
echo    Start the service first, then run this script again.
echo.
pause 