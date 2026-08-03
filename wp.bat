@echo off
REM WP-CLI shortcut. Runs against the cms/ install from anywhere in the project.
REM Examples:
REM   wp plugin list
REM   wp user list
REM   wp db export ..\backup.sql
REM   wp search-replace http://localhost:8883 https://admin.smartshala.com --dry-run
pushd "%~dp0cms"
php "%~dp0tools\wp-cli.phar" %*
popd
