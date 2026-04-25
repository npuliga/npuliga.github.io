@echo off
setlocal enabledelayedexpansion
set SCRIPT_DIR=%~dp0
set PID_FILE=%SCRIPT_DIR%app.pid
if not exist "%PID_FILE%" (echo [!] Dev server not running & exit /b 0)
set /p PID=<"%PID_FILE%"
taskkill /pid %PID% /f >nul 2>&1
del "%PID_FILE%" >nul 2>&1
echo [OK] Dev server stopped
exit /b 0
