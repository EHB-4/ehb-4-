@echo off
title EHB Next.js Development Server
cd /d "F:\ehb next.js 04"
:: Dependencies install karo (agar zarurat ho)
if not exist "node_modules" (
    npm install
)
:: Server start karo (agar already running nahi)
start "" "http://localhost:3001/ehb-home-page"
timeout /t 5 /nobreak >nul
npm run dev
