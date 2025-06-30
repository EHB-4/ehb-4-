@echo off
title EHB Master Type, Test, Deploy, Accessibility Scripts

start "" node "scripts\auto-type-fixer.js"
start "" node "scripts\auto-test-monitor.js"
start "" node "scripts\auto-deploy-monitor.js"
start "" node "scripts\auto-accessibility-fixer.js"
start "" node "scripts\auto-accessibility-fixer.ts"
start "" node "scripts\ai-test-generator.js"
echo All type, test, deploy, accessibility scripts launched!
exit 