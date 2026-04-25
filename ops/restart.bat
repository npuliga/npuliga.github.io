@echo off
set SCRIPT_DIR=%~dp0
call "%SCRIPT_DIR%stop.bat"
timeout /t 1 /nobreak >nul
call "%SCRIPT_DIR%start.bat"
