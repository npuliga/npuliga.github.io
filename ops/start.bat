@echo off
setlocal enabledelayedexpansion
set SCRIPT_DIR=%~dp0
set ROOT_DIR=%SCRIPT_DIR%..
set PID_FILE=%SCRIPT_DIR%app.pid
set LOG_FILE=%SCRIPT_DIR%app.log
set PORT=4321

if exist "%PID_FILE%" (
  set /p PID=<"%PID_FILE%"
  tasklist /fi "PID eq !PID!" 2>nul | find "!PID!" >nul 2>&1
  if !ERRORLEVEL! equ 0 (echo [!] Dev server already running (PID !PID!) & exit /b 0)
)

where node >nul 2>&1
if %ERRORLEVEL% neq 0 (echo [X] Node.js not found & exit /b 1)
for /f "tokens=*" %%v in ('node --version') do echo [OK] Node: %%v

where npm >nul 2>&1
if %ERRORLEVEL% neq 0 (echo [X] npm not found & exit /b 1)

if not exist "%ROOT_DIR%\node_modules" (
  echo [!] node_modules missing -- running npm install...
  cd /d "%ROOT_DIR%" && npm install
)

echo [*] Starting Astro dev server on http://localhost:%PORT%...
cd /d "%ROOT_DIR%"
start /b "" npx astro dev --port %PORT% >> "%LOG_FILE%" 2>&1
timeout /t 3 /nobreak >nul
echo [OK] Dev server started at http://localhost:%PORT%
exit /b 0
