# Project Context & AI Agent Directive

Welcome to the **SmartShala** codebase.

Before making any modifications, running commands, or refactoring code, you **MUST** read the authoritative architecture and guidelines document:

👉 **[Documents/MASTER_ARCHITECTURE_AND_AGENT_GUIDE.md](Documents/MASTER_ARCHITECTURE_AND_AGENT_GUIDE.md)**

### Key Highlights:
1. **Headless Stack:** WordPress in `/cms` acts as a headless content API via the custom plugin `smartshala-cms`. The public frontend is React 19 + Vite 8 in `/smartshala-landing`.
2. **Do Not Break Anything:** All CMS endpoints are schema-driven (`cms/wp-content/plugins/smartshala-cms/schema/*.php`). Never alter WordPress core files.
3. **Laragon Web Server:** Apache points to `C:\laragon\www\campus-loom` which is an NTFS junction to `<repo>\cms`. If it ever breaks or shows a directory listing, run `.\start-wordpress.ps1 -Fix`.
4. **Active Client Changes:** Check Section 7 in the master guide for pending client requests extracted from `smartshala-landing/src/assets/Smart shala website changes.docx`.
