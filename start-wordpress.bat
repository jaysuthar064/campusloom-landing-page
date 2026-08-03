@echo off
REM Double-click launcher for the local SmartShala WordPress site.
REM Delegates to start-wordpress.ps1 next to this file.
title SmartShala - WordPress
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-wordpress.ps1" %*
if errorlevel 1 pause
