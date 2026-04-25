@echo off
setlocal enabledelayedexpansion
set SCRIPT_DIR=%~dp0
set ROOT_DIR=%SCRIPT_DIR%..
set PID_FILE=%SCRIPT_DIR%app.pid
set PORT=4321
set PASS=0
set FAIL=0
echo [*] npuliga.github.io -- Health Check
echo.

where node >nul 2>&1
if %ERRORLEVEL% equ 0 (echo [OK] Node.js installed & set /a PASS+=1) else (echo [X] Node.js not found & set /a FAIL+=1)

where npm >nul 2>&1
if %ERRORLEVEL% equ 0 (echo [OK] npm installed & set /a PASS+=1) else (echo [X] npm not found & set /a FAIL+=1)

if exist "%ROOT_DIR%\node_modules" (echo [OK] node_modules present & set /a PASS+=1) else (echo [X] node_modules missing & set /a FAIL+=1)

if exist "%ROOT_DIR%\astro.config.mjs" (echo [OK] astro.config.mjs present & set /a PASS+=1) else (echo [X] astro.config.mjs missing & set /a FAIL+=1)

if exist "%ROOT_DIR%\src\data\resume.json" (echo [OK] resume.json present & set /a PASS+=1) else (echo [X] resume.json missing & set /a FAIL+=1)

if exist "%PID_FILE%" (
  set /p PID=<"%PID_FILE%"
  tasklist /fi "PID eq !PID!" 2>nul | find "!PID!" >nul 2>&1
  if !ERRORLEVEL! equ 0 (echo [OK] Dev server process running & set /a PASS+=1) else (echo [X] Dev server not running & set /a FAIL+=1)
) else (echo [X] Dev server not running & set /a FAIL+=1)

powershell -command "try{$r=(Invoke-WebRequest -Uri 'http://localhost:%PORT%/' -UseBasicParsing -TimeoutSec 5).StatusCode;if($r -lt 400){exit 0}else{exit 1}}catch{exit 1}" >nul 2>&1
if %ERRORLEVEL% equ 0 (echo [OK] HTTP localhost:%PORT% responds & set /a PASS+=1) else (echo [X] Dev server not responding & set /a FAIL+=1)

echo.
echo Results: %PASS% passed, %FAIL% failed
if %FAIL% equ 0 (exit /b 0) else (exit /b 1)
