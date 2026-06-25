@echo off
title Rama Store Repo Junk Cleaner
echo Menjalankan script pembersih sampah repositori...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0clean-junk.ps1"
pause
