# SmartShala — local environment

## Quick start

```powershell
.\start-wordpress.ps1          # start everything + open the site
.\start-wordpress.ps1 -Admin   # ...and open /wp-admin instead
.\start-wordpress.ps1 -Stop    # stop Apache + MySQL
```

Or just double-click **`start-wordpress.bat`**.

| | |
|---|---|
| Site | http://localhost:8883 |
| Admin | http://localhost:8883/wp-admin/ |
| REST | http://localhost:8883/wp-json/ |
| Alt host | http://campus-loom.test |
| Login | `admin` / `admin` |

**One-click admin login** — double-click `Open WP Admin.url`, or:

```
http://localhost:8883/?smartshala_login=1&token=026d4e7fda059c8dde48ae812194611c0c229c54ea89e4c0aad965d1a4866fe0
```

This is handled by `cms/wp-content/mu-plugins/smartshala-local-login.php`. It is
a deliberate auth bypass, so it only works when **all three** hold: the
environment is `local`, the request comes from loopback (`127.0.0.1`/`::1`), and
the token matches `SMARTSHALA_LOCAL_LOGIN_TOKEN` in `wp-config.php`. Add
`&user=<login>` to sign in as someone other than the first administrator.
Delete the mu-plugin before deploying anywhere that isn't your machine.

The React landing page is separate:

```powershell
cd smartshala-landing
npm run dev                    # http://localhost:5173
```

## Layout

```
Campus Loom/
├── cms/                  WordPress 7.0.2 (the CMS backend)
├── smartshala-landing/   React 19 + Vite 8 + Tailwind v4 (the frontend)
├── tools/wp-cli.phar     WP-CLI
├── Documents/            Project docs
├── start-wordpress.ps1   Launcher
├── start-wordpress.bat   Double-click wrapper
└── wp.bat                WP-CLI shortcut
```

## How it's wired

Laragon serves this project through a **junction**:

```
C:\laragon\www\campus-loom  ->  <project>\cms
```

Apache's vhost (`C:\laragon\etc\apache2\sites-enabled\auto.campus-loom-8883.conf`)
has `DocumentRoot C:/laragon/www/campus-loom`, so the junction is what decides
which folder is public. Pointing it at `cms/` rather than the project root means:

- WordPress is served from `/`, so no `/cms` prefix in URLs.
- **Your source is not web-exposed.** Previously the whole project root was
  served, so `Documents/`, `.git/` and the frontend source were all reachable
  over HTTP.
- Laragon can regenerate its `auto.*.conf` files without breaking anything,
  because the vhost itself never needed editing.

If the site ever shows a directory listing instead of WordPress, the junction
has drifted. Repair it with:

```powershell
.\start-wordpress.ps1 -Fix
```

## WP-CLI

`wp.bat` runs WP-CLI against `cms/` from anywhere in the project:

```powershell
.\wp.bat plugin list
.\wp.bat user list
.\wp.bat db export ..\backup.sql
.\wp.bat search-replace http://localhost:8883 https://admin.smartshala.com --dry-run
```

## Database

| | |
|---|---|
| Name | `smartshala` |
| User | `root` (no password — Laragon default) |
| Host | `127.0.0.1:3306` |

The **old `campus_loom` database is still on the server, untouched**, with all
14 tables from the previous headless build. It is not used by anything now, but
it's there if any old content is ever needed. Drop it once you're sure:

```sql
DROP DATABASE campus_loom;
```

## Notes

- `wp-config.php` is **git-ignored** — it holds local credentials. If you clone
  this fresh, copy the values from this file's Database section and regenerate
  salts at https://api.wordpress.org/secret-key/1.1/salt/
- WP-Cron's loopback is disabled (`DISABLE_WP_CRON`). `start-wordpress.ps1`
  runs due events once at startup instead. To run them manually:
  `.\wp.bat cron event run --due-now`
- Apache and MySQL are **shared with your other Laragon sites** (agorafeed,
  dollhouse, grow-my-security). `-Stop` takes them all down.
- Only `cms/wp-content/plugins/` and `cms/wp-content/themes/` are tracked in
  git. WordPress core is disposable — re-download it any time.
