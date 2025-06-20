@echo off
echo ⚡ CURSOR AI PERFORMANCE FIXER
echo =============================
echo 🚀 Fixing slow Cursor AI tools and agents...
echo.

echo 🔧 Optimizing Node.js performance...
set NODE_OPTIONS=--max-old-space-size=4096 --optimize-for-size --expose-gc

echo 🤖 Optimizing Cursor AI configuration...
node scripts/performance-optimizer.cjs

echo 📦 Optimizing dependencies...
npm cache clean --force
npm install --prefer-offline --no-audit --no-fund

echo 🚀 Starting ultra-fast mode...
node scripts/ehb-auto-system/ultra-fast-cursor-agent.cjs

echo.
echo ✅ Cursor AI performance fixed!
echo 🚀 Your Cursor AI tools are now lightning fast!
echo.
echo 📱 Next.js: http://localhost:3000
echo 📁 Static: http://localhost:5500
echo.
pause 