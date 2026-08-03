<#
.SYNOPSIS
    Starts the local SmartShala WordPress stack (MySQL + Apache).

.DESCRIPTION
    A Laragon-style one-command launcher that does not need the Laragon GUI.
    It uses Laragon's own bundled binaries and config, so this project and any
    other Laragon site behave identically whether you start them from here or
    from the Laragon tray icon.

    Steps:
      1. Locate PHP / MySQL / Apache in the Laragon install.
      2. Start MySQL if it is not already listening on 3306.
      3. Create the database if it is missing.
      4. Verify the Laragon junction still points at cms/ (see -Fix).
      5. Start Apache if nothing is serving port 8883 yet.
      6. Run any due WP-Cron events, then open the browser.

    Apache and MySQL are shared services, so this script leaves them running on
    exit - other Laragon projects depend on them. Use -Stop to shut them down.

.PARAMETER Stop
    Stop Apache (and MySQL) instead of starting them.

.PARAMETER Fix
    Recreate the C:\laragon\www\campus-loom junction so it points at cms/.
    Only needed if Laragon regenerates it or the site starts showing a
    directory listing of the project instead of WordPress.

.PARAMETER NoBrowser
    Do not open a browser window.

.PARAMETER Admin
    Open /wp-admin instead of the front page.

.EXAMPLE
    .\start-wordpress.ps1
    .\start-wordpress.ps1 -Admin
    .\start-wordpress.ps1 -Stop
#>

[CmdletBinding()]
param(
    [switch] $Stop,
    [switch] $Fix,
    [switch] $NoBrowser,
    [switch] $Admin
)

$ErrorActionPreference = 'Stop'

$Root       = $PSScriptRoot
$CmsDir     = Join-Path $Root 'cms'
$WpCli      = Join-Path $Root 'tools\wp-cli.phar'
$LaragonBin = 'C:\laragon\bin'
$Junction   = 'C:\laragon\www\campus-loom'
$SiteUrl    = 'http://localhost:8883'
$WebPort    = 8883
$DbPort     = 3306
$DbName     = 'smartshala'
$DbUser     = 'root'

function Write-Step { param($m) Write-Host "  ->  $m" -ForegroundColor Cyan }
function Write-Ok   { param($m) Write-Host "  OK  $m" -ForegroundColor Green }
function Write-Warn { param($m) Write-Host "  !   $m" -ForegroundColor Yellow }
function Write-Err  { param($m) Write-Host "  X   $m" -ForegroundColor Red }

function Test-PortListening {
    param([int] $P)
    $null -ne (Get-NetTCPConnection -LocalPort $P -State Listen -ErrorAction SilentlyContinue)
}

function Find-Newest {
    # Newest versioned folder under a Laragon bin dir, e.g. bin\mysql\mysql-8.4.3-winx64
    param([string] $Dir, [string] $Exe)
    if (-not (Test-Path $Dir)) { return $null }
    Get-ChildItem $Dir -Directory |
        Sort-Object Name -Descending |
        ForEach-Object { Join-Path $_.FullName $Exe } |
        Where-Object { Test-Path $_ } |
        Select-Object -First 1
}

function Wait-ForPort {
    param([int] $P, [int] $TimeoutSec = 30)
    $elapsed = 0
    while (-not (Test-PortListening -P $P) -and $elapsed -lt $TimeoutSec) {
        Start-Sleep -Milliseconds 500
        $elapsed += 0.5
    }
    return (Test-PortListening -P $P)
}

Write-Host ''
Write-Host '  SmartShala - local WordPress' -ForegroundColor White
Write-Host '  ----------------------------' -ForegroundColor DarkGray

# --- Locate binaries ---------------------------------------------------------
$Php    = (Get-Command php -ErrorAction SilentlyContinue).Source
if (-not $Php) { $Php = Find-Newest -Dir "$LaragonBin\php" -Exe 'php.exe' }
$Mysql  = Find-Newest -Dir "$LaragonBin\mysql"  -Exe 'bin\mysql.exe'
$Mysqld = Find-Newest -Dir "$LaragonBin\mysql"  -Exe 'bin\mysqld.exe'
$Httpd  = Find-Newest -Dir "$LaragonBin\apache" -Exe 'bin\httpd.exe'

if (-not $Php)   { Write-Err 'PHP not found. Install Laragon or put php.exe on PATH.'; exit 1 }
if (-not $Mysql) { Write-Err "MySQL not found under $LaragonBin\mysql."; exit 1 }

# --- Stop mode ---------------------------------------------------------------
if ($Stop) {
    Write-Step 'Stopping Apache ...'
    Get-Process httpd -ErrorAction SilentlyContinue | Stop-Process -Force
    Write-Ok 'Apache stopped'

    Write-Step 'Stopping MySQL ...'
    Get-Process mysqld -ErrorAction SilentlyContinue | Stop-Process -Force
    Write-Ok 'MySQL stopped'

    Write-Host ''
    Write-Warn 'These are shared with your other Laragon sites - they are down too.'
    Write-Host ''
    exit 0
}

Write-Ok "PHP  $((& $Php -r 'echo PHP_VERSION;'))"

# --- Repair the junction if asked, or if it drifted --------------------------
$junctionOk = $false
if (Test-Path $Junction) {
    $item = Get-Item $Junction -Force
    $junctionOk = ($item.LinkType -eq 'Junction') -and
                  ($item.Target -and ((Resolve-Path $item.Target[0]).Path.TrimEnd('\') -ieq $CmsDir.TrimEnd('\')))
}

if ($Fix -or -not $junctionOk) {
    if (-not $junctionOk) { Write-Warn 'Laragon junction is not pointing at cms/ - repairing.' }
    Write-Step "Linking $Junction -> $CmsDir"
    if (Test-Path $Junction) {
        # rmdir WITHOUT /s removes only the link. Remove-Item -Recurse would
        # follow the junction and delete the real project files.
        cmd /c rmdir "$Junction" | Out-Null
    }
    cmd /c mklink /J "$Junction" "$CmsDir" | Out-Null
    Write-Ok 'Junction repaired'
} else {
    Write-Ok 'Laragon junction -> cms/'
}

# --- MySQL -------------------------------------------------------------------
if (Test-PortListening -P $DbPort) {
    Write-Ok "MySQL running on $DbPort"
} else {
    if (-not $Mysqld) { Write-Err 'mysqld.exe not found.'; exit 1 }
    Write-Step 'Starting MySQL ...'
    Start-Process -FilePath $Mysqld -ArgumentList '--console' -WindowStyle Hidden
    if (Wait-ForPort -P $DbPort) { Write-Ok 'MySQL started' }
    else { Write-Err 'MySQL did not start within 30s.'; exit 1 }
}

# --- Database ----------------------------------------------------------------
$exists = & $Mysql -u $DbUser -h 127.0.0.1 -P $DbPort -N -B -e "SHOW DATABASES LIKE '$DbName';" 2>$null
if ([string]::IsNullOrWhiteSpace($exists)) {
    Write-Step "Creating database '$DbName' ..."
    & $Mysql -u $DbUser -h 127.0.0.1 -P $DbPort -e "CREATE DATABASE ``$DbName`` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
    Write-Warn "Database was empty - run: wp core install (see README-LOCAL.md)"
} else {
    Write-Ok "Database '$DbName' present"
}

# --- Sanity checks -----------------------------------------------------------
if (-not (Test-Path (Join-Path $CmsDir 'wp-load.php')))   { Write-Err "WordPress core missing from $CmsDir."; exit 1 }
if (-not (Test-Path (Join-Path $CmsDir 'wp-config.php'))) { Write-Err "wp-config.php missing from $CmsDir."; exit 1 }

# --- Apache ------------------------------------------------------------------
if (Test-PortListening -P $WebPort) {
    Write-Ok "Web server already running on $WebPort"
} else {
    if (-not $Httpd) { Write-Err "Apache not found under $LaragonBin\apache."; exit 1 }
    Write-Step 'Starting Apache ...'
    Start-Process -FilePath $Httpd -WindowStyle Hidden
    if (Wait-ForPort -P $WebPort) { Write-Ok 'Apache started' }
    else { Write-Err 'Apache did not start within 30s. Check C:\laragon\bin\apache\...\logs\error.log'; exit 1 }
}

# --- Cron (loopback cron is disabled in wp-config) ---------------------------
if (Test-Path $WpCli) {
    Push-Location $CmsDir
    try { & $Php $WpCli cron event run --due-now --quiet 2>$null | Out-Null } catch { }
    Pop-Location
}

# --- Done --------------------------------------------------------------------
$url = $SiteUrl + $(if ($Admin) { '/wp-admin/' } else { '/' })

Write-Host ''
Write-Host "  Site    $SiteUrl"            -ForegroundColor White
Write-Host "  Admin   $SiteUrl/wp-admin/"  -ForegroundColor White
Write-Host "  REST    $SiteUrl/wp-json/"   -ForegroundColor White
Write-Host "  Alt     http://campus-loom.test" -ForegroundColor DarkGray
Write-Host "  Login   admin / admin"       -ForegroundColor DarkGray
Write-Host ''
Write-Host '  Services stay up after this window closes.' -ForegroundColor DarkGray
Write-Host '  Run  .\start-wordpress.ps1 -Stop  to shut them down.' -ForegroundColor DarkGray
Write-Host ''

if (-not $NoBrowser) { Start-Process $url }
