@echo off
title hotaru(n)

echo hotaru(n) easy deploy .bat file
: run
pause > NUL | set /p = press any key to continue...
echo:
cmd /c "node --trace-warnings sword.js"
echo:
goto run