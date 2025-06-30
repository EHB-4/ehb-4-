@echo off
title EHB Master Error Fixing & Recovery Scripts

start "" "scripts\fix-all-errors.bat"
start "" node "scripts\comprehensive-error-fixer.cjs"
start "" "scripts\instant-error-fix.bat"
start "" node "scripts\enhanced-auto-fixer.cjs"
start "" "scripts\quick-error-fix.bat"
start "" node "scripts\auto-error-fixer.cjs"
start "" node "scripts\fix-all.js"
start "" node "scripts\fix-all-errors.js"
start "" node "scripts\auto-error-checker.js"
start "" node "scripts\auto-fix-all.cjs"
start "" node "scripts\generate-error-report.cjs"
start "" node "scripts\auto-recovery.cjs"
echo All error fixing & recovery scripts launched!
exit 