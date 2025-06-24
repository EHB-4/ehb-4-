@echo off
REM Auto-generate EHB SDKs on startup
cd /d %~dp0..
python scripts\generate-sdks.py

npm run auto:system
