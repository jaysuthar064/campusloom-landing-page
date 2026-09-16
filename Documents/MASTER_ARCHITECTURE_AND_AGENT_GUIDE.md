# SmartShala — Master Architecture & Agent Guide

> **CRITICAL DIRECTIVE FOR ALL AI AGENTS & DEVELOPERS:**  
> Read this document completely BEFORE making any code or configuration changes.  
> This site is in production-ready condition with high-value architecture. Do not alter architecture or core schemas arbitrarily. Follow the established patterns strictly.

---

## 1. Project Overview & Business Intent

**SmartShala** (owned by **Hybrid Monks LLP**, Ahmedabad, Gujarat) is a modern, high-converting B2B SaaS platform and digital storefront for an Education ERP software solution designed for schools, coaching institutes, and colleges in India.

The site is built as a **Headless Decoupled Architecture**:
1. **CMS Backend (`/cms`):** Headless WordPress (PHP 8+, MySQL 8+, WP-CLI), running on Apache via Laragon locally. It does not render public HTML templates. Instead, it exposes custom, schema-driven REST APIs (`/wp-json/smartshala/v1/`) and manages lead submissions.
2. **Frontend (`/smartshala-landing`):** A modern, high-performance Single Page Application built with **React 19**, **Vite 8**, **Tailwind CSS v4**, and **Lucide React**. Content is fetched client-side with full fallback handling.

---

## 2. Directory Layout & File Organization

```text
Campus Loom/
├── cms/                                 # Headless WordPress CMS (DocumentRoot)
│   ├── wp-config.php                   # Local DB config, salts, debug flags (GIT-IGNORED)
│   ├── wp-content/
│   │   ├── mu-plugins/
│   │   │   ├── smartshala-local-login.php # 1-click tokenized admin auth for localhost
│   │   │   └── smartshala-local-mail.php  # Local mail delivery interceptor/logger
│   │   └── plugins/
│   │       ├── smartshala-cms/          # Custom core engine for this site
│   │       │   ├── smartshala-cms.php   # Main entry point & CORS filters
│   │       │   ├── includes/
│   │       │   │   ├── class-smartshala-schema.php   # Schema loader & validator
│   │       │   │   ├── class-smartshala-store.php    # DB storage (wp_options) & resolvers
│   │       │   │   ├── class-smartshala-admin.php    # Custom WP-Admin tabbed UI
│   │       │   │   ├── class-smartshala-rest.php     # REST API route registration
│   │       │   │   ├── class-smartshala-leads.php    # Lead CPT, honeypot, rate limiting
│   │       │   │   └── class-smartshala-settings.php # Origin & notification settings
│   │       │   └── schema/              # Declarative page schemas (PHP arrays)
│   │       │       ├── home.php, features.php, modules.php, pricing.php,
│   │       │       ├── about.php, contact.php, book-demo.php, faqs.php,
│   │       │       └── help.php, privacy.php, terms.php
│   │       └── updraftplus/             # Backup plugin
│   └── (wp-admin, wp-includes, etc.)   # WordPress core files (never edit!)
│
├── smartshala-landing/                  # Frontend React SPA
│   ├── index.html                       # Base HTML shell with Outfit Google Font
│   ├── package.json                     # React 19, Vite 8, Tailwind v4, Framer Motion, Lenis
│   ├── vite.config.js                   # Vite config with @tailwindcss/vite and @vitejs/plugin-react
│   ├── vercel.json                      # Production SPA rewrite & security/caching headers
│   ├── .env                             # VITE_WP_API_URL=http://localhost:8883
│   ├── .env.example
│   └── src/
│       ├── main.jsx                     # ReactDOM root with BrowserRouter
│       ├── App.jsx                      # App routes, ScrollToTop, SmoothScroll
│       ├── index.css                    # Tailwind v4 @theme, tokens, animations, .reveal, .lift
│       ├── assets/                      # Static assets, logos, notes (e.g. client docs)
│       ├── lib/
│       │   ├── api.js                   # fetchPage client targeting /wp-json/smartshala/v1
│       │   ├── usePageContent.js        # React hook fetching schema content per page
│       │   └── leadFields.js            # Shared lead form submission validator
│       ├── components/
│       │   ├── layout/                  # Navbar.jsx (with DROPDOWNS), Footer.jsx
│       │   ├── sections/                # Hero, Features, TrustStats, Testimonials, Faq, etc.
│       │   └── ui/                      # Button, Container, Card, Reveal, SmoothScroll, etc.
│       └── pages/                       # Home, FeaturesPage, ModulesPage, PricingPage,
│                                        # BookDemoPage, AboutPage, ContactPage, FaqsPage,
│                                        # HelpPage, LegalPage, NotFoundPage
│
├── Documents/                           # Full project history & design specifications
│   ├── DESIGN.md                        # Pixel-accurate specs derived from Canva PDF
│   ├── PAGES.md                         # Detailed page inventory & status
│   ├── Landing_Page_Integration_Analysis.md
│   ├── SmartShala_ERP_Landing_Page_Content.md
│   └── MASTER_ARCHITECTURE_AND_AGENT_GUIDE.md # This document
│
├── tools/
│   └── wp-cli.phar                      # Bundled WP-CLI binary
├── start-wordpress.ps1                  # PowerShell launcher (starts MySQL, Apache, repairs junction)
├── start-wordpress.bat                  # Double-clickable Windows launcher
├── wp.bat                               # Shortcut to run WP-CLI commands
└── README-LOCAL.md                      # Local environment quickstart guide
```

---

## 3. WordPress Backend Architecture (`smartshala-cms`)

The WordPress CMS is **not** a standard WordPress theme site. It runs completely headless using a custom plugin: `smartshala-cms`.

### 3.1 The Schema-Driven Model
Instead of hardcoding custom post types or ACF fields across multiple files, everything is defined **declaratively** in `cms/wp-content/plugins/smartshala-cms/schema/*.php`.

Each schema file exports a page definition array:
```php
return array(
    'id'       => 'home',
    'label'    => 'Home Page',
    'sections' => array(
        array(
            'id'     => 'hero',
            'label'  => 'Hero Section',
            'fields' => array(
                array(
                    'id'      => 'headline',
                    'label'   => 'Headline',
                    'type'    => 'text',
                    'default' => 'Simplify School Management',
                ),
                // ...
            ),
        ),
    ),
);
```

**What the schema automatically generates:**
1. **Admin Screens:** In WP-Admin, a custom top-level menu "SmartShala" is created. Each schema file gets a sub-page, and each section gets a dedicated tab.
2. **Validation & Sanitization:** Automatically handles strings, textareas, images (media library attachment IDs), repeaters, and groups upon save.
3. **Storage:** Stored in WordPress `wp_options` as serialized arrays under key `smartshala_page_{page_id}`.
4. **Default Merging:** When fetching content, `SmartShala_Store::page()` merges saved database values over the schema `default` values. **If a field is missing in the database, it falls back to the schema default automatically.** This prevents frontend crashes.

### 3.2 REST API Endpoints
All endpoints exist under the `smartshala/v1` namespace:

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/wp-json/smartshala/v1/pages` | Lists all registered pages and section IDs | Public |
| `GET` | `/wp-json/smartshala/v1/page/{page}` | Returns all sections and fields for a given page | Public |
| `GET` | `/wp-json/smartshala/v1/page/{page}/{section}` | Returns data for a single section | Public |
| `POST` | `/wp-json/smartshala/v1/leads` | Submits a lead / demo request / contact inquiry | Public (Honeypot + IP Rate Limited) |

### 3.3 Lead Management (`SmartShala_Leads`)
- Lead submissions from `/book-demo` or `/contact` POST to `/wp-json/smartshala/v1/leads`.
- Leads are stored as a private Custom Post Type `smartshala_lead`.
- **Spam Protection:** 
  1. Honeypot field `website` (must remain empty).
  2. Transient-based IP rate limit: maximum 5 submissions per 300 seconds per IP.
- **Email Notifications:** Configured via `SmartShala_Settings` in WP-Admin (`smartshala-settings`), allowing customizable notification emails and sender addresses.

### 3.4 CORS & Multi-Origin Support
In `smartshala-cms.php`, CORS headers are configured to respect WordPress core's default behavior: reflecting the requesting origin. This allows the API to work seamlessly across:
- `http://localhost:5173` (Vite dev server)
- `https://*.vercel.app` (Vercel preview & production deployments)
- Custom production domains
If locked down, the `smartshala_frontend_origins` option controls the allowed origins.

---

## 4. Frontend Architecture (`smartshala-landing`)

### 4.1 Tech Stack
- **Framework:** React 19 (`react`, `react-dom`)
- **Build Tool:** Vite 8 (`@vitejs/plugin-react`)
- **Routing:** React Router DOM v7 (`BrowserRouter`, `Routes`, `Route`)
- **CSS / Styling:** Tailwind CSS v4 (`@tailwindcss/vite`, `@theme` in `src/index.css`)
- **Icons:** `lucide-react`
- **Animation & Motion:** 
  - `lenis` for high-fidelity smooth momentum scrolling.
  - Custom CSS transitions (`.reveal`, `.lift`, `.press`) with hardware-accelerated transforms.
  - `framer-motion` for complex UI transitions.

### 4.2 Design System Tokens
Extracted directly from the client's reference PDF (`Documents/DESIGN.md`):

| Token Name | Value | Purpose |
|---|---|---|
| `--color-brand` | `#0047FD` | Primary CTA, highlight words, links, icons. |
| `--color-brand-hover` | `#0039CE` | Hover state for primary buttons. |
| `--color-brand-soft` | `#E8EEFE` | Chip backgrounds, subtle active tabs. |
| `--color-ink` | `#08080F` | Main headings and dark text. |
| `--color-muted` | `#798298` | Slate-grey body text and descriptions. |
| `--color-footer-ink` | `#3D405E` | Footer links and secondary headers. |
| `--color-tint` | `#F5F7FE` | Section alternation, icon cards. |
| `--color-hairline` | `#EAEEF7` | Borders, divider lines. |
| `--font-sans` | `"Outfit", sans-serif` | Clean geometric font matched to design. |
| `--spacing-page` | `1440px` | Desktop design container limit (`Container.jsx`). |

### 4.3 Data Fetching & Reliability
- `src/lib/api.js`: Defines `API_ROOT` via `import.meta.env.VITE_WP_API_URL` (defaulting to `http://localhost:8883`).
- `src/lib/usePageContent.js`: Hook using `AbortController` to load page content on mount.
- If WordPress is offline or an endpoint fails, the UI gracefully renders a user-friendly fallback state rather than a blank white crash screen.

---

## 5. Local Environment & Laragon Wiring

The local WordPress stack runs on **Laragon**:
- **Apache Web Server:** Port `8883`
- **MySQL Database:** Port `3306`, Database: `smartshala`, User: `root`, Password: `""` (empty).

### The Junction Secret:
Laragon serves the site via an NTFS Directory Junction:
```text
C:\laragon\www\campus-loom  --->  <Project_Root>\cms
```
**Why this matters:**
- Apache's vhost DocumentRoot is `C:/laragon/www/campus-loom`.
- Because the junction points to `<Project_Root>\cms`, WordPress runs from `/` rather than `/cms/`.
- Project root directories like `.git/`, `Documents/`, and `smartshala-landing/` are **never web-exposed**.
- If the site ever shows a directory listing instead of WordPress, the junction has drifted. Repair it immediately with:
  ```powershell
  .\start-wordpress.ps1 -Fix
  ```

### Starting the Stack:
```powershell
# 1. Start WordPress & Apache & MySQL:
.\start-wordpress.ps1

# 2. Open WP Admin directly:
.\start-wordpress.ps1 -Admin

# 3. Stop background services:
.\start-wordpress.ps1 -Stop

# 4. Start React Frontend:
cd smartshala-landing
npm run dev      # Serves at http://localhost:5173
```

---

## 6. CRITICAL RULES: HOW TO NOT BREAK THE SITE

Follow these rules unconditionally:

1. **NEVER modify WordPress Core:**  
   Do not touch files in `cms/wp-admin/`, `cms/wp-includes/`, or root PHP files (`cms/index.php`, `cms/wp-login.php`). All customization lives exclusively inside `cms/wp-content/plugins/smartshala-cms/` or `cms/wp-content/mu-plugins/`.

2. **NEVER bypass the Schema:**  
   When modifying content fields, always update `cms/wp-content/plugins/smartshala-cms/schema/<page>.php`. Provide reasonable `default` values for any new field so that missing database records never crash the frontend.

3. **NEVER hardcode localhost URLs in public frontend code:**  
   Always use `import.meta.env.VITE_WP_API_URL` or relative paths. Production builds on Vercel must communicate with the production WordPress instance.

4. **NEVER edit Laragon's `auto.*.conf` Apache files directly:**  
   Laragon regenerates these files automatically. Changes made there will be overwritten. Use `start-wordpress.ps1 -Fix` to adjust junctions if paths change.

5. **DO NOT replace Tailwind CSS v4 with v3:**  
   The project uses Tailwind v4 with the `@tailwindcss/vite` plugin and `@theme` block in `src/index.css`. Do not add a legacy `tailwind.config.js` or downgrade packages without explicit intent.

6. **PRESERVE Error Boundaries & Loading States:**  
   Every page component in `src/pages/` must maintain its loading spinner and `error` state handling.

7. **BE MINDFUL of Git-Ignored Files:**  
   `cms/wp-config.php`, `.env`, and database dumps are git-ignored to prevent leaking local secrets.

---

## 7. Current Client Requests & Pending Tasks

Based on client instructions found in `smartshala-landing/src/assets/Smart shala website changes.docx`:

| # | Requested Change | Status / Target Location |
|---|---|---|
| 1 | **Update Company Details & Footer Info** | `smartshala-landing/src/components/layout/Footer.jsx` & CMS schemas.<br>• Email: `support@letssmartshala.com`<br>• Website: `www.letssmartshala.com`<br>• Company Name: `Hybrid Monks LLP`<br>• Address: `Ahmedabad, Gujarat, India - 380015`<br>• Copyright: `@2026 Smart Shala (Product by Hybrid Monks LLP), All Rights Reserved` |
| 2 | **Remove School Names from Reviews / Testimonials** | `smartshala-landing/src/components/sections/Testimonials.jsx` & `cms/wp-content/plugins/smartshala-cms/schema/home.php`. Keep reviewer role/title, strip specific institutional names if requested. |
| 3 | **Remove Pricing Page** | Remove `/pricing` route or nav link from `Navbar.jsx` / `Footer.jsx` and CTA links. |
| 4 | **Remove Login Button** | Remove the "Log In" button from `Navbar.jsx` header. |
| 5 | **Simplify Navigation / Remove Modules Page** | Client noted Features and Modules seem redundant. Remove "Modules" from navigation, keep "Features". |
| 6 | **Add Blog Page placeholder in Resources** | Add Blog link under Resources in `Navbar.jsx` and `Footer.jsx`. |
| 7 | **Remove Help Center for now** | Remove `/help` from navigation links. |
| 8 | **About Page Content** | Note that final copy will be provided by Mehul. |

---

## 8. Quick Command Cheat Sheet

```powershell
# Check WP-CLI status:
.\wp.bat plugin list
.\wp.bat user list

# Database Backup:
.\wp.bat db export ..\backup.sql

# Lint and Build Frontend:
cd smartshala-landing
npm run lint
npm run build
```
