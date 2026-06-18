@echo off
cd /d "%~dp0"
set PORT=8000
set URL=http://localhost:%PORT%/index.html
start "" chrome "%URL%" || start "" "%URL%"
echo.
echo   Sivu aukeaa: %URL%
echo   Sulje palvelin sulkemalla tama ikkuna.
echo.
python -m http.server %PORT% 2>nul || py -m http.server %PORT%
