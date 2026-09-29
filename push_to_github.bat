@echo off
REM ================================================================
REM CTRL+CELL — GitHub Upload Script
REM Double-click this file to save and upload ALL changes to GitHub.
REM ================================================================

cd /d "%~dp0"

echo ================================================================
echo  CTRL+CELL — GitHub Uploader
echo ================================================================
echo.

REM Use the full path to git in case it's not in PATH
set GIT="C:\Program Files\Git\cmd\git.exe"

REM Check if git is available
if not exist %GIT% (
    echo ERROR: Git was not found at C:\Program Files\Git\
    echo Please install Git from https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

echo [1/3] Adding all changed files...
%GIT% add .
echo Done.
echo.

echo [2/3] Creating a save point (commit)...
set /p MSG="Enter a short description of your changes (e.g. 'update about page'): "
%GIT% commit -m "%MSG%"
echo Done.
echo.

echo [3/3] Uploading to GitHub...
echo (A browser login window may pop up — please sign in to GitHub if it does.)
echo.
%GIT% push -u origin main
echo.

if %ERRORLEVEL% == 0 (
    echo ================================================================
    echo  SUCCESS! Your code is now live on GitHub:
    echo  https://github.com/Manohar12095/CTRL-CELL-Tyrosinase-Inhibitor-Discovery-Platform
    echo ================================================================
) else (
    echo ================================================================
    echo  Something went wrong. Check the error message above.
    echo  If it says "sign in" or "authentication", a browser window
    echo  should have opened — please log in and try again.
    echo ================================================================
)

echo.
pause
