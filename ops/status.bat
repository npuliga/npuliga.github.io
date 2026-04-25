@echo off
setlocal enabledelayedexpansion
set SCRIPT_DIR=%~dp0
set ROOT_DIR=%SCRIPT_DIR%..
set PID_FILE=%SCRIPT_DIR%app.pid
echo [*] npuliga.github.io -- Status
echo.
if exist "%PID_FILE%" (
  set /p PID=<"%PID_FILE%"
  tasklist /fi "PID eq !PID!" 2>nul | find "!PID!" >nul 2>&1
  if !ERRORLEVEL! equ 0 (echo [OK] Dev server running (PID !PID!) at http://localhost:4321) else (echo [X] Dev server not running)
) else (echo [X] Dev server not running)
where node >nul 2>&1
if %ERRORLEVEL% equ 0 (for /f "tokens=*" %%v in ('node --version') do echo [OK] Node: %%v) else (echo [X] Node.js not found)
where npm >nul 2>&1
if %ERRORLEVEL% equ 0 (for /f "tokens=*" %%v in ('npm --version') do echo [OK] npm: %%v) else (echo [X] npm not found)
if exist "%ROOT_DIR%\node_modules" (echo [OK] node_modules present) else (echo [X] node_modules missing)
if exist "%ROOT_DIR%\dist" (echo [OK] dist/ present) else (echo [!] dist/ missing -- run npm run build)
exit /b 0
