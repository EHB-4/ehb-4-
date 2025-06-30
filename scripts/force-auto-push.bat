@echo off
echo Force auto git add, commit, and push...
git add .
git commit -m "Force auto commit"
git push --force
pause 