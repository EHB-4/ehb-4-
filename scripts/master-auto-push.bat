@echo off
title EHB Master Auto Push & Git Scripts

start "" node "scripts\github-auto-push-simple.js"
start "" node "scripts\github-to-cursor-auto-push.js"
start "" node "scripts\test-github-cursor-sync.js"
start "" node "scripts\ehb-auto-push.js"
start "" node "scripts\enhanced-github-auto-push.js"
start "" node "scripts\auto-push.js"
start "" node "scripts\auto-git-push.cjs"
start "" "scripts\force-auto-push.bat"
start "" node "scripts\auto-push.cjs"
echo All auto push & git scripts launched!
exit 