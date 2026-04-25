@echo off
set SCRIPT_DIR=%~dp0
set LOG_FILE=%SCRIPT_DIR%app.log
if not exist "%LOG_FILE%" (echo [!] No log file: %LOG_FILE% & exit /b 1)
powershell -command "Get-Content '%LOG_FILE%' -Tail 50"
exit /b 0
