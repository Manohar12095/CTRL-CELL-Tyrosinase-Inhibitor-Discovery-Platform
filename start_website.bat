@echo off
REM ================================================================
REM CTRL+CELL — Local Development Server Runner
REM Double-click this file to start the website locally.
REM ================================================================

cd /d "%~dp0"

echo Starting the CTRL+CELL Next.js website...
echo Please wait a moment while the server boots up...
echo.

REM Start the server and wait
npm run dev

pause
