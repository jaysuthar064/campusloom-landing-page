# Orbitt — Complete Site Design & Prompt Document (Deep Analysis)
> **Reference:** https://crmai.framer.website  
> **Template Engine:** Framer  
> **Pages Analyzed:** Home 01, Home 02, Features, About, Pricing, Blog  
> **Document Type:** Full Design Specification + Developer Prompt

---

## TABLE OF CONTENTS

1. [Brand & Concept Overview](#1-brand--concept-overview)
2. [Complete Color System](#2-complete-color-system)
3. [Typography System](#3-typography-system)
4. [Spacing & Layout Grid](#4-spacing--layout-grid)
5. [Component Library](#5-component-library)
6. [Animation System — Complete Reference](#6-animation-system--complete-reference)
7. [Image Asset Map (All Pages)](#7-image-asset-map-all-pages)
8. [HOME 01 — Section-by-Section](#8-home-01--section-by-section)
9. [HOME 02 — Section-by-Section](#9-home-02--section-by-section)
10. [FEATURES PAGE](#10-features-page)
11. [ABOUT PAGE](#11-about-page)
12. [PRICING PAGE](#12-pricing-page)
13. [BLOG PAGE](#13-blog-page)
14. [SHARED COMPONENTS (Appear on All Pages)](#14-shared-components-appear-on-all-pages)
15. [Master Recreation Prompt (Copy-Paste Ready)](#15-master-recreation-prompt-copy-paste-ready)
16. [Design Rules Cheatsheet](#16-design-rules-cheatsheet)

---

## 1. BRAND & CONCEPT OVERVIEW

| Field | Value |
|---|---|
| **Product Name** | Orbitt |
| **Product Type** | AI-powered CRM / SaaS |
| **Founded** | 2018 (per About page) |
| **Target Audience** | Startups, SMBs, enterprises, founders, sales teams |
| **Aesthetic Direction** | Dark-mode premium tech — think Linear.app meets Framer template |
| **Emotional Tone** | Confident, modern, enterprise-grade but approachable |
| **Primary CTA** | "Get Orbit For Free" (free 14-day trial) |
| **Secondary CTA** | "Book A Demo" / "Request A Demo" |
| **Social Proof** | 38,456 Happy Customers / 10,000+ founders & business owners |
| **Tagline** | "The modern solutions to run your agency." |

**Design Philosophy:** One dark background + one mint-green accent + white text. Every section repeats this without variation. No light mode, no gradients that add color, no secondary accent. The entire product feels like looking at a premium enterprise app in a dark IDE.

---

## 2. COMPLETE COLOR SYSTEM

### Core Palette

```css
:root {
  /* Backgrounds */
  --bg-primary:       #0A0B0F;  /* Main page background — near-black blue-grey */
  --bg-card:          #111318;  /* All cards, pricing boxes, feature cards */
  --bg-elevated:      #161920;  /* Slightly raised elements inside cards */
  --bg-inner-ui:      #1A1D26;  /* Inner product screenshot card backgrounds */
  --bg-overlay:       rgba(17, 19, 24, 0.85);  /* Overlay panels, modals */

  /* Accent — Mint Green (THE only accent color) */
  --accent:           #4ADE80;  /* Primary CTA buttons, active states */
  --accent-soft:      #6EE7B7;  /* Hover states on accent elements */
  --accent-muted:     rgba(74, 222, 128, 0.12);  /* Badge backgrounds, highlight fills */
  --accent-border:    rgba(74, 222, 128, 0.30);  /* Green glow borders */
  --accent-glow:      rgba(74, 222, 128, 0.15);  /* Ambient glow in hero, CTA sections */

  /* Text Hierarchy */
  --text-primary:     #F0F0F5;  /* Headlines, bold text */
  --text-secondary:   #8A8FA3;  /* Descriptions, sub-labels, body */
  --text-muted:       #555A6E;  /* Footer text, meta info, timestamps */
  --text-on-accent:   #0A0B0F;  /* Text that sits on green buttons */

  /* Borders */
  --border-subtle:    rgba(255, 255, 255, 0.07);  /* Card edges, dividers */
  --border-medium:    rgba(255, 255, 255, 0.12);  /* More visible separators */
  --border-accent:    rgba(74, 222, 128, 0.25);   /* Green-tinted borders on highlighted cards */

  /* Shadows */
  --shadow-card:      0 4px 24px rgba(0, 0, 0, 0.4);
  --shadow-float:     0 8px 40px rgba(0, 0, 0, 0.6);
  --shadow-glow:      0 0 30px rgba(74, 222, 128, 0.2);

  /* Backdrop */
  --navbar-blur:      blur(14px);
  --card-blur:        blur(8px);
}
```

### Color Usage Rules
- **Green ONLY for:** CTA buttons, active tab indicators, eyebrow badges, bullet points on feature lists, checkmarks in pricing, stat icon glows
- **Never use green decoratively** — every green element has a function
- **Text on dark cards:** Use `--text-primary` for titles, `--text-secondary` for descriptions
- **Borders are invisible at a glance** — they just prevent cards from bleeding into the bg

---

## 3. TYPOGRAPHY SYSTEM

### Font Families

| Role | Font | Source |
|---|---|---|
| **Display (All H1, H2)** | `Bricolage Grotesque` | Google Fonts |
| **UI / Body / Navigation** | `Inter` | Google Fonts |

```html
<!-- Import in <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

### Type Scale

```css
/* H1 — Hero Headline */
.hero-h1 {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(42px, 6vw, 72px);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.025em;
  color: var(--text-primary);
}

/* H2 — Section Headlines */
.section-h2 {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

/* H3 — Card / Sub-section titles */
.h3 {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(22px, 2.5vw, 30px);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.015em;
}

/* H4 — Feature card titles */
.h4 {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.3;
}

/* Eyebrow / Label */
.eyebrow {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
}

/* Body Text */
.body {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.65;
  color: var(--text-secondary);
}

/* Small / Meta */
.meta {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: var(--text-muted);
}

/* Stat Number */
.stat-number {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(48px, 6vw, 72px);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text-primary);
}

/* Nav Links */
.nav-link {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: var(--text-secondary);
}

/* Button Text */
.btn-text {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
}

/* Price Display */
.price {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 48px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text-primary);
}
```

---

## 4. SPACING & LAYOUT GRID

```css
/* Layout */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Section Padding */
.section {
  padding: 100px 0;          /* Desktop */
}
@media (max-width: 768px) {
  .section { padding: 64px 0; }
}

/* Grid Systems Used */
.grid-2col   { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
.grid-3col   { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.grid-4col   { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }

/* Card Inner Padding */
--card-padding-lg:  40px;
--card-padding-md:  28px;
--card-padding-sm:  20px;

/* Border Radius */
--radius-xl:  20px;   /* Main feature cards, hero image */
--radius-lg:  16px;   /* Smaller cards */
--radius-md:  12px;   /* Buttons, tags, inner elements */
--radius-sm:   8px;   /* Small badges, chips */
--radius-pill: 100px; /* All buttons */

/* Navbar */
--nav-height: 68px;
--nav-bg: rgba(10, 11, 15, 0.75);
--nav-blur: blur(14px);
--nav-border-bottom: 1px solid rgba(255,255,255,0.06);
```

---

## 5. COMPONENT LIBRARY

### 5.1 — Buttons

```css
/* PRIMARY — Green CTA */
.btn-primary {
  background: var(--accent);
  color: var(--text-on-accent);
  border: none;
  border-radius: var(--radius-pill);
  padding: 13px 26px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  white-space: nowrap;
}
.btn-primary:hover {
  transform: scale(1.04);
  box-shadow: 0 0 24px rgba(74, 222, 128, 0.35);
}

/* SECONDARY — Outlined */
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-medium);
  border-radius: var(--radius-pill);
  padding: 13px 26px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}
.btn-secondary:hover {
  border-color: rgba(255,255,255,0.3);
  background: rgba(255,255,255,0.04);
}

/* TEXT LINK CTA — "Get Orbit For Free →" */
.btn-link {
  color: var(--accent);
  font-size: 14px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  transition: gap 0.2s;
}
.btn-link:hover { gap: 10px; }
```

### 5.2 — Cards

```css
/* FEATURE CARD (standard) */
.feature-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  padding: var(--card-padding-lg);
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}
.feature-card:hover {
  transform: translateY(-5px);
  border-color: var(--border-accent);
  box-shadow: var(--shadow-card);
}

/* PRICING CARD — normal */
.pricing-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  padding: 36px;
}

/* PRICING CARD — highlighted (middle card) */
.pricing-card--featured {
  border: 1px solid var(--accent-border);
  box-shadow: 0 0 40px rgba(74, 222, 128, 0.12);
  position: relative;
  /* Contains "Most Popular" badge */
}
.pricing-card--featured::before {
  content: "Most Popular";
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--accent);
  color: var(--text-on-accent);
  font-size: 11px;
  font-weight: 600;
  padding: 4px 14px;
  border-radius: 100px;
}

/* TESTIMONIAL CARD */
.testimonial-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  padding: 28px;
}

/* STAT CARD */
.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  padding: 32px;
  text-align: left;
}
```

### 5.3 — Badges & Labels

```css
/* EYEBROW BADGE — green pill */
.badge-green {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--accent-muted);
  border: 1px solid var(--accent-border);
  border-radius: 100px;
  padding: 5px 14px;
  font-size: 12px;
  font-weight: 500;
  color: var(--accent);
}

/* HERO SOCIAL PROOF BADGE */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 100px;
  padding: 6px 16px 6px 6px;
  font-size: 13px;
  color: var(--text-secondary);
}
/* Avatar cluster inside hero badge */
.avatar-cluster { display: flex; }
.avatar-cluster img {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 2px solid var(--bg-primary);
  margin-left: -8px;
}
.avatar-cluster img:first-child { margin-left: 0; }

/* SAVE BADGE on pricing toggle */
.save-badge {
  background: var(--accent-muted);
  color: var(--accent);
  border: 1px solid var(--accent-border);
  border-radius: 100px;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 10px;
}
```

### 5.4 — Navbar

```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--nav-height);
  background: var(--nav-bg);
  backdrop-filter: var(--nav-blur);
  -webkit-backdrop-filter: var(--nav-blur);
  border-bottom: var(--nav-border-bottom);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
}
/* Nav links have muted grey color, no underline, subtle hover */
.navbar a { color: var(--text-secondary); text-decoration: none; }
.navbar a:hover { color: var(--text-primary); }
/* Active page link is white, slightly bolder */
.navbar a.active { color: var(--text-primary); font-weight: 500; }
```

### 5.5 — FAQ Accordion

```css
.faq-item {
  border-bottom: 1px solid var(--border-subtle);
  padding: 20px 0;
}
.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: var(--text-primary);
}
.faq-icon {
  font-size: 20px;
  color: var(--text-secondary);
  transition: transform 0.25s ease;
}
.faq-item.open .faq-icon { transform: rotate(45deg); }
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s ease, padding 0.2s;
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.65;
}
.faq-item.open .faq-answer {
  max-height: 200px;
  padding-top: 12px;
}
```

### 5.6 — Pricing Toggle

```css
.pricing-toggle {
  display: inline-flex;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 100px;
  padding: 4px;
  gap: 4px;
}
.toggle-option {
  padding: 8px 20px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  color: var(--text-secondary);
  transition: background 0.2s, color 0.2s;
}
.toggle-option.active {
  background: var(--bg-elevated);
  color: var(--text-primary);
}
```

### 5.7 — Marquee / Trust Bar

```css
.marquee-wrapper {
  overflow: hidden;
  -webkit-mask: linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%);
  mask: linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%);
}
.marquee-track {
  display: flex;
  gap: 48px;
  width: max-content;
  animation: marquee-scroll 28s linear infinite;
}
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
/* Logo images inside: grayscale filter, 0.5 opacity, hover restores */
.marquee-logo {
  filter: grayscale(1) opacity(0.5);
  transition: filter 0.3s, opacity 0.3s;
  height: 28px;
}
.marquee-logo:hover { filter: grayscale(0) opacity(1); }
```

### 5.8 — Feature List Items (Bullet Style)

```css
/* Used in Sales Pipeline section and others */
.feature-list-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 15px;
  color: var(--text-secondary);
  margin-bottom: 10px;
}
.feature-list-item::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
  margin-top: 7px;
}
```

### 5.9 — Comparison Table (Pricing Page)

```css
.compare-table {
  width: 100%;
  border-collapse: collapse;
}
.compare-table th {
  background: var(--bg-card);
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 600;
  padding: 16px 20px;
  text-align: center;
  border-bottom: 1px solid var(--border-subtle);
}
.compare-table td {
  padding: 14px 20px;
  font-size: 14px;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-subtle);
}
/* Checkmark icon is SVG — green tick */
.compare-table .check { color: var(--accent); }
/* Row label (leftmost col) */
.compare-table td:first-child {
  color: var(--text-primary);
  font-weight: 500;
}
```

---

## 6. ANIMATION SYSTEM — COMPLETE REFERENCE

### 6.1 — Page Load Sequence (Hero, staggered)

```
Time 0.0s → Navbar fades in (opacity 0→1, translateY -10→0), duration 0.4s
Time 0.1s → Hero badge scales in (scale 0.9→1, opacity 0→1), duration 0.4s
Time 0.2s → Hero H1 slides up (translateY 24→0, opacity 0→1), duration 0.6s
Time 0.35s → Hero subtext fades in (opacity 0→1, translateY 16→0), duration 0.5s
Time 0.5s → CTA buttons slide up (translateY 16→0, opacity 0→1), duration 0.4s
Time 0.6s → Micro-text beneath buttons fades in, duration 0.35s
Time 0.7s → Hero dashboard image floats up (translateY 30→0, opacity 0→1), duration 0.8s
Time 0.9s → Floating card 1 pops in (scale 0.85→1, opacity 0→1), duration 0.4s
Time 1.0s → Floating card 2 pops in, duration 0.4s
```

**Easing for all page-load:** `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out spring feel)

### 6.2 — Scroll Animations (IntersectionObserver)

```javascript
// Setup
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
```

```css
/* Base state (hidden) */
[data-animate] {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Revealed state */
[data-animate].is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger delays for child elements */
[data-animate-stagger] > *:nth-child(1) { transition-delay: 0.00s; }
[data-animate-stagger] > *:nth-child(2) { transition-delay: 0.08s; }
[data-animate-stagger] > *:nth-child(3) { transition-delay: 0.16s; }
[data-animate-stagger] > *:nth-child(4) { transition-delay: 0.24s; }

/* Left-slide variant (images entering from left) */
[data-animate="slide-left"] {
  transform: translateX(-30px);
  opacity: 0;
}
[data-animate="slide-left"].is-visible {
  transform: translateX(0);
  opacity: 1;
}

/* Right-slide variant */
[data-animate="slide-right"] {
  transform: translateX(30px);
  opacity: 0;
}
[data-animate="slide-right"].is-visible {
  transform: translateX(0);
  opacity: 1;
}
```

### 6.3 — Stat Count-Up Animation

```javascript
function countUp(el, target, duration = 1600) {
  const suffix = el.dataset.suffix || ''; // e.g. "k", "%"
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + suffix;
    }
  }, 16);
}
// Triggered when stat section enters viewport via IntersectionObserver
// Stats: 100 (displayed as "100k"), 90 (displayed as "90%"), 80 (displayed as "80%")
```

### 6.4 — Hover Animations

| Element | Hover Effect | CSS |
|---|---|---|
| Primary Button | Scale + green glow | `transform: scale(1.04); box-shadow: 0 0 24px rgba(74,222,128,0.35)` |
| Secondary Button | Border lightens + faint bg | `border-color: rgba(255,255,255,0.3); background: rgba(255,255,255,0.04)` |
| Feature Card | Lift + green border hint | `transform: translateY(-5px); border-color: var(--accent-border)` |
| Pricing Card | Lift only | `transform: translateY(-4px)` |
| Nav Link | Color shifts white | `color: var(--text-primary)` |
| Marquee Logo | De-grayscale | `filter: grayscale(0) opacity(1)` |
| Link CTA ("→") | Arrow moves right | Gap increases: `gap: 10px` |
| Blog Card | Image zooms subtly | `img { transform: scale(1.04) }` |
| Team Member Card | Soft lift | `transform: translateY(-3px)` |

### 6.5 — Tab / Workflow Section

```css
/* Tab indicator sliding underline */
.tabs-indicator {
  height: 2px;
  background: var(--accent);
  position: absolute;
  bottom: 0;
  transition: left 0.25s ease, width 0.25s ease;
}

/* Content cross-fade on tab switch */
.tab-panel {
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  position: absolute;
}
.tab-panel.active {
  opacity: 1;
  pointer-events: auto;
  position: relative;
}
```

### 6.6 — FAQ Accordion

```css
/* Height expand */
.faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.35s ease; }
.faq-item.open .faq-answer { max-height: 300px; }

/* Icon rotate */
.faq-icon { transition: transform 0.25s ease; }
.faq-item.open .faq-icon { transform: rotate(45deg); } /* + → × */
```

### 6.7 — Hero Image Float Loop

```css
/* Subtle continuous float on hero dashboard */
@keyframes float-idle {
  0%   { transform: translateY(0px); }
  50%  { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
}
.hero-image { animation: float-idle 5s ease-in-out infinite; }
```

### 6.8 — CTA Section Idle Pulse

```css
/* Subtle glow pulse on the bottom CTA button */
@keyframes btn-pulse {
  0%, 100% { box-shadow: 0 0 0px rgba(74,222,128,0); }
  50%       { box-shadow: 0 0 30px rgba(74,222,128,0.3); }
}
.cta-section .btn-primary { animation: btn-pulse 3.5s ease-in-out infinite; }
```

---

## 7. IMAGE ASSET MAP (ALL PAGES)

### Hero Images
| Description | URL |
|---|---|
| Hero dashboard screenshot (main) | `https://framerusercontent.com/images/UVCTHco8NAy7ULPbE1GDbVeGfw.png` |
| Hero floating card 1 | `https://framerusercontent.com/images/RUpOwqhCu5BENjzFxvV0q1lrQ.png` |
| Hero dashboard alt (variant) | `https://framerusercontent.com/images/PvqS6T9Z5JcdQDKfz8Y3cmKd3Hs.png` |
| Hero card alt | `https://framerusercontent.com/images/4xwZiAvJfBfFAEtZlXJvjCPHFR4.png` |
| Hero badge avatar 1 | `https://framerusercontent.com/images/r6fPHSXp7BQTVxj79WPqrKPxjM.png` |
| Hero badge avatar 2 | `https://framerusercontent.com/images/XAKUqV5deCV3qRNI1P1FYFImtJA.png` |
| Home 02 hero image | `https://framerusercontent.com/images/aoz7gF5lxZOQG38sGAQ4M6jbLw.png` |
| Home 02 person image | `https://framerusercontent.com/images/OYVfzUBepHIKGd6KENbzeuDcIWw.png` |

### Feature Section Images
| Description | URL |
|---|---|
| Customer database screenshot | `https://framerusercontent.com/images/qPiieduQQKtt1RER2rJuH3YSnw0.png` |
| Sales pipeline screenshot | `https://framerusercontent.com/images/pztIVZK01QSridsBWnbiQGG3wZ4.png` |
| Progress tracking screenshot | `https://framerusercontent.com/images/SZbtgM3aRA1fKgdGUqDOL4omqc.png` |
| Workday efficiency screenshot | `https://framerusercontent.com/images/PTtQfFruqBQ9snNDUP2ZBBBJ25Y.png` |
| Sales region boost screenshot | `https://framerusercontent.com/images/J1ffRQMkjsd2nTDhIfjSHP0GmtE.png` |
| Tax/Success section screenshot | `https://framerusercontent.com/images/udcfWbhjPv0RrjpfOiLN2MYWkAo.png` |

### Workflow Tab Images
| Tab | URL |
|---|---|
| Tab 1 screenshot | `https://framerusercontent.com/images/8ePmbu4AEktqvM5fGP2bebfflI.png` |
| Tab 2 screenshot | `https://framerusercontent.com/images/0A5Umh0GKpc1ZlBSncNYVPgHmiQ.png` |
| Tab 3 screenshot | `https://framerusercontent.com/images/Otbf2SfaKUScKHS1VmsNcZpRkEA.png` |

### Feature Mini-Card Icons (SVG)
| Icon | URL |
|---|---|
| Sales pipeline icon | `https://framerusercontent.com/images/oBmYpMdvL2Fm6B48Pk4UWLFI.svg` |
| Customer support icon | `https://framerusercontent.com/images/5xfzOveAP92TS2VN8ZPq9T3MoRs.svg` |
| Security & compliance icon | `https://framerusercontent.com/images/1pyvFrMvvUbzxhlv5d7aUbqIHk.svg` |
| Tax icon | `https://framerusercontent.com/images/XGmR7iot0dw21e88Fm1ysLniZc.svg` |
| Multi-currency icon | `https://framerusercontent.com/images/BsbKCWaqvrcsA9rrMjYOeMzVuc.svg` |
| Alerts icon | `https://framerusercontent.com/images/DfFmubrgtAbOTXQ5w4rzfaEKTQ.svg` |
| Testimonial quote icon | `https://framerusercontent.com/images/IEtLKpRbhJPYyM2R083OycFb0w.svg` |

### Stats Section Decorative Images
| Description | URL |
|---|---|
| Stats background image (Home 01) | `https://framerusercontent.com/images/7FWi42j6iA6GWhU1QdF4jTC6o.png` |
| Stats background image (alt) | `https://framerusercontent.com/images/BQk2nan5qa7hphFvshQn2BqQa8.png` |
| Stats background image (Pricing) | `https://framerusercontent.com/images/QYthN4ThMUvi7uwXJIWc6XPQe8.png` |
| Stat blob/glyph — 100k | `https://framerusercontent.com/images/28IDR1MfbMcR9mB0hXK3nswpDS4.png` |
| Stat blob/glyph — 90% | `https://framerusercontent.com/images/lcQll0IOEV4kpsNeyzmwHs714.png` |
| Stat blob/glyph — 80% | `https://framerusercontent.com/images/Ydt0xwuAPJMQGpfCNox13RoH2o.png` |

### CTA Banner Images
| Description | URL |
|---|---|
| CTA section background / illustration | `https://framerusercontent.com/images/hu8Wd9GhXBSy1DcDCXU1Ut7Mk4.png` |
| CTA logo/icon mark | `https://framerusercontent.com/images/t54Yz3ehMOcFFghHww0LDwIYk8.svg` |

### About Page Images
| Description | URL |
|---|---|
| About page hero banner image | `https://framerusercontent.com/images/YLVmmFzKto0jDDryqpQ6FlLjeyE.png` |
| Core value icon — Adaptability | `https://framerusercontent.com/images/ZPqaa2AZODmlSLxNNfz7xV3fV4.svg` |
| Core value icon — Collaboration | `https://framerusercontent.com/images/5JyWtDhn81V2YWAwwPgG58rW6Xk.svg` |
| Core value icon — Reliability | `https://framerusercontent.com/images/2LXRbfUIG804mjrJ1aPSG3LjH4.svg` |

### Team & Testimonial Photos
| Name | URL |
|---|---|
| Sarah Johnson (CEO) | `https://framerusercontent.com/images/hZqZ24t26tPr5v4Jau0tdZrjD0E.png` |
| Guy Hawkins | `https://framerusercontent.com/images/IgvcTpkd1InpHExMgJafC60n78.png` |
| Ralph Edwards | `https://framerusercontent.com/images/N89yl1xDKO1ylx2Hh82Lrpnj8U.png` |
| Robert Fox | `https://framerusercontent.com/images/4eHLrmCx03I53oKPkfMd8L4pQ.png` |
| Savannah Nguyen | `https://framerusercontent.com/images/edgeFSH8UtFtfXkvuQEVzLuab8.png` |
| Dianne Russell | `https://framerusercontent.com/images/8XOZ5aJLINy4CNuqytwp4ZPl8.png` |
| Leslie Alexander | `https://framerusercontent.com/images/F8ur4MxzltB6kcNMHbY8uVKQbg.jpg` |
| Ralph Edwards (testimonial) | `https://framerusercontent.com/images/FqHtm34Mtu4tlnzBC05xzFDTOFE.png` |

### Partner/Trust Logos (Pricing Page Marquee)
| # | URL |
|---|---|
| Logo 1 | `https://framerusercontent.com/images/nlr4arCmPPAgBlFSJvfEZDX62BE.png` |
| Logo 2 | `https://framerusercontent.com/images/tguCjb6UtjhVsGpRs66qaxuZ1g.png` |
| Logo 3 | `https://framerusercontent.com/images/H8nnNAtvKQqNsZtCL2SXxtnSx3o.png` |
| Logo 4 | `https://framerusercontent.com/images/v5fOXFqVTuPW7WghaWlR2aVLzI.png` |
| Logo 5 | `https://framerusercontent.com/images/MibShBjMKc9JX1NPgqvf0Bw9q4.png` |
| Logo 6 | `https://framerusercontent.com/images/NagvWUuREuxYY22YBc9fgXKGS4.png` |

### Blog Featured Image
| Post | URL |
|---|---|
| "ROI of CRM" featured image | `https://framerusercontent.com/images/egE36eMLCs7vb69ANg9J6GQevTI.png` |

---

## 8. HOME 01 — Section-by-Section

### [S1] STICKY NAVBAR
- **Height:** 68px, fixed to top, `z-index: 100`
- **Background:** `rgba(10,11,15,0.75)` + `backdrop-filter: blur(14px)`
- **Left:** Orbitt wordmark logo (white text or SVG)
- **Center:** Links: Features | About | Pricing | Blog | Career
- **Right:** "Contact" — pill-shaped outlined button
- **On scroll:** May increase opacity slightly
- **Animation:** Fade + slide down on page load, 0.4s

---

### [S2] HERO SECTION
- **Layout:** Full-width centered column, `max-width: 800px`
- **Background:** `--bg-primary` with radial green glow `radial-gradient(ellipse 60% 40% at 50% 0%, rgba(74,222,128,0.07), transparent)` at top-center

**Top Badge (Social Proof Pill):**
```
[ avatar1 | avatar2 | avatar3 ]  38,456 Happy Customers.
```
- Overlapping circular avatars (3–4, 26px each)
- Dark pill background, subtle border

**H1:**
```
Stay organized & efficient with our AI solutions.
```
- 72px, weight 800, tight letter spacing
- Max 2–3 lines, centered, `max-width: 720px`

**Subtext:**
```
Learn to grow your wealth with powerful analytics, customized insights
```
- 17px, muted grey, max-width 500px, centered

**CTA Row:**
```
[ Get Orbit For Free ]  [ Book A Demo ]
```
- Both pill-shaped, primary green + outlined secondary
- Gap: 12px between buttons

**Micro-text:** `"No credit card required. Free 14 days trial"` — 13px, muted, centered

**Hero Dashboard Image:**
- Width: ~900px, centered
- Rounded corners 20px
- Subtle inner glow/border
- 2 floating overlay cards positioned:
  - Card A: Top-right area of the image (floats slightly outside)
  - Card B: Bottom-left area (floats slightly outside)
  - Both cards: semi-transparent dark bg, rounded, drop shadow

---

### [S3] TRUST BAR / LOGO MARQUEE
- **Above text:** `"Trusted by 10,000+ founders & business owners."` — centered, small, muted
- **Marquee:** Infinite left-scroll of partner logos
- **Logo style:** Grayscale, 50% opacity
- **Edge fade:** CSS mask gradient both sides
- **Speed:** ~28 seconds per full loop

---

### [S4] FEATURE: CUSTOMER DATABASE
- **Layout:** 2-column grid, `60/40` split (image left, text right)
- **Image side (left):** Rounded dark card with customer database screenshot
- **Text side (right):**
  - H2: `"Customer database for effortless data access."`
  - Body: `"brings all customer information into one centralized location..."`
  - CTA link: `"Get Orbit For Free →"` (green text link)
- **Animation:** Image slides from left, text slides from right, on scroll

---

### [S5] FEATURE: SALES PIPELINE
- **Layout:** 2-column grid, flipped (text left, image right)
- **Text side (left):**
  - H2: `"Monitor manage and maximize sales pipeline."`
  - Subtext: `"Maximize Your Sales Pipeline with a streamlined tracking system..."`
  - Feature list (3 items with green bullet dots):
    - "With our advanced tracking tools."
    - "Customizable pipeline management features."
    - "Reduce lead leakage, and accelerate growth."
  - CTA link: `"Get Orbit For Free →"`
- **Image side (right):** Rounded dark card with pipeline UI screenshot

---

### [S6] WORKFLOW TABS SECTION
- **Header** (centered):
  - H2: `"All your team's workflow in a single place."`
- **Tabs:** 3 tabs in a horizontal row, green sliding indicator on active tab
  - Tab 1: "Sales Automation"
  - Tab 2: (second feature)
  - Tab 3: (third feature)
- **Tab Content Panel:**
  - Eyebrow label: `"Sales Automation"` (green badge)
  - H3: `"Tools and tactics to scale."`
  - Body: `"Sales automation is the process of using technology to streamline and automate repetitive tasks..."`
  - CTA: `"Book A Demo"` (pill button, green)
  - Large product screenshot image below
- **Below Tabs — 3 Mini Feature Cards (horizontal row):**
  - Card 1: SVG icon + `"Sales pipeline management."` + description
  - Card 2: SVG icon + `"Customer support & ticketing."` + description
  - Card 3: SVG icon + `"Security and compliance."` + description
  - Each: `background: #111318`, 16px radius, 20–24px padding, staggered fade-in

---

### [S7] STATS SECTION
- **Header** (centered):
  - H2: `"Numbers behind our influence."`
  - Subtext: `"You can easily view your spending patterns through intuitive visual"`
- **Background:** Full-width atmospheric dark image behind the cards
- **Stats Grid (3 cards):**
  - Card A: Decorative blob icon + `"100k"` + `"Client retention rate"` + description
  - Card B: Decorative blob icon + `"90%"` + `"Increased sales"` + description
  - Card C: Decorative blob icon + `"80%"` + `"Enhanced data accuracy"` + description
- **Animation:** Numbers count up from 0 on scroll entry

---

### [S8] SUCCESS FEATURES SECTION
- **Header** (centered):
  - H2: `"Success by the numbers."`
  - Same subtext pattern
- **Layout:** 2-column, `40/60` split (list left, image right)
- **Left (3 stacked feature rows):**
  - Row 1: Icon + `"Tax calculation & filing support."` + description
  - Row 2: Icon + `"Multi-currency Support."` + description
  - Row 3: Icon + `"Personalized Alerts & Notifications"` + description
  - Each row has a small colored SVG icon, eyebrow-style title, and body text
- **Right:** Large rounded product screenshot, same height as 3 rows combined

---

### [S9] PRICING SECTION
*(Detailed pricing data in Section 12)*

---

### [S10] FAQ ACCORDION
- **Header:** `"Got questions? We've got answers."`
- **4 Questions:**
  1. `"How does Orbit help in managing customer data?"` — Open by default, shows answer
  2. `"How Does Orbit provide automated workflow features?"`
  3. `"How does Orbit personalized alerts and notifications work?"`
  4. `"Can I use Orbit to manage recurring payments and subscriptions?"`
- **Open Answer Text:** "Orbit provides detailed analytics and insights, empowering businesses to make data-driven decisions about marketing strategies, product development, and customer engagement and more"

---

### [S11] BOTTOM CTA BANNER
- **Layout:** Wide dark section, roughly card-style, centered or left-aligned text
- **Background:** Dark (`--bg-primary`) with atmospheric illustration (right side)
- **Left content:**
  - Small Orbitt icon/logo mark
  - H2: `"The modern solutions to run your agency."`
  - CTA: `"Request A Demo"` (green pill button)
  - Micro-text: `"No need for a credit card."` and `"Cancel at anytime."`
- **Right:** Decorative abstract SVG/image
- **Background images:** `hu8Wd9GhXBSy1DcDCXU1Ut7Mk4.png` + `t54Yz3ehMOcFFghHww0LDwIYk8.svg`

---

## 9. HOME 02 — Section-by-Section

**Hero Headline (different from Home 01):**
```
Boost growth with advanced AI management CRM.
```
- Same layout, one big CTA only: `"Get Orbit For 14 Days Free Trial"`
- Hero image: `aoz7gF5lxZOQG38sGAQ4M6jbLw.png` + person image

**Below Hero — 3 Mini Feature Cards (horizontal):**
- Card 1: Icon `8U3dfYsI1St0TDt0m9g94o7Ng8.png` + `"Progress tracking."` + desc
- Card 2: Icon `YLyisl4jjDqIb8nDrDBi7weBQ.png` + `"Task & activity tracking."` + desc
- Card 3: Icon `zHbOiWVSm4TrNxsAjbsPP6GGLtM.png` + `"Reporting and analytics."` + desc

**Feature Sections (alternating):**
1. `"Optimize sales with progress tracking tools."` — text left, image right
2. `"Boosting your sales performance by region."` — image left, text right
3. `"Manage your workday for maximum efficiency."` — text left, image right (with bullet list)

**Testimonials Grid:**  
Shown as a masonry/grid of testimonial cards (6 visible at once, 3×2 on desktop)

**Each testimonial card contains:**
- Quote icon (SVG) top-left
- Badge title (e.g. "A Must-Have for Growing Businesses")
- Heart emoji ❤️
- Quote text (truncated)
- Avatar image + Name + Role

**Pricing Section (Home 02 has 4 plans):**
- Starter: Free
- Starter Plan: $35/month
- Professional: $55 (highlighted with green border + special image `wnOvbfjSx1LzfRa7kDOSX4Nsb8.png`)
- Enterprise: $29/month

**Feature Horizontal Scroll Section:**
`"Powerful features to elevate your business smartly."` — 4 clickable feature tiles in a horizontal list:
- Scalable integration
- Analytics & reporting
- Integration & APIs
- Virtual assistants

---

## 10. FEATURES PAGE

**Hero (inner page style):**
- H1: `"Discover our features."` — centered, no hero image
- Subtext: `"Discover the powerful features of Orbit that redefine CRM management."`

**Feature Sections (alternating left-right, 4 total):**
1. Text left / Image right — `"Monitor manage and maximize sales pipeline."`
2. Image left / Text right — `"Customer database for effortless data access."`
3. Text left / Image right — `"Optimize sales with progress tracking tools."` (screenshot: `SZbtgM3aRA1fKgdGUqDOL4omqc.png`)
4. Image left / Text right — `"Manage your workday for maximum efficiency."`

**Testimonials Section:**
- H2: `"What Customer says about Orbit."`
- Subtext: `"We transformed the way we manage our customer relationships."`
- Single testimonial card displayed prominently (Robert Fox, CEO & Founder at AcmeCrop)

**Blog Preview Section:**
- H2: `"The latest from our blog."`
- 3 blog post items in a grid (title + date)

---

## 11. ABOUT PAGE

**Hero:**
- H1: `"About our company"` — centered
- Subtext: mission statement
- Full-width hero image below text (`YLVmmFzKto0jDDryqpQ6FlLjeyE.png`)

**Company History Row:**
- H3: `"We have started our journey since 2018 and we ensure quality."`
- Body: company description
- Partner logo row (6 small logos, side by side, `Xs30ArOPA1srCXR1CQszabd964c.png` + others)

**Mission & Vision (2-column):**
- Left box — `"Our Mission"` + body text
- Right box — `"Our Vision"` + body text
- Both boxes: dark card background, same height

**Core Values (3-column grid):**
- `"Adaptability"` — SVG icon + description
- `"Collaboration"` — SVG icon + description
- `"Reliability"` — SVG icon + description

**Sales Region Feature:**
- H2: `"Boosting your sales performance by region."`
- Text left + image right

**Team Grid:**
- H2: `"Team behind Orbit."`
- 4-column grid of team member cards
- Each: circular avatar photo + Name + Role
- Members: Sarah Johnson (CEO), Guy Hawkins (Dev), Ralph Edwards, Robert Fox (UX), Savannah Nguyen, Dianne Russell, + more

**Testimonials Grid:**
- H2: `"Discover the testimonials from our valued clients."`
- 3×2 grid of testimonial cards
- Each: quote icon + badge title + heart emoji + quote excerpt + avatar + name + role
- Testimonials from: Ralph Edwards, Leslie Alexander, Guy Hawkins, Robert Fox, Savannah Nguyen, Dianne Russell

---

## 12. PRICING PAGE

**Header:**
- H2: `"Choose the plan that fits your business."`
- Monthly/Annual toggle (SAVE 20% badge on Annual)

**3-Card Pricing Grid:**

| Feature | Starter | Business ⭐ | Enterprise |
|---|---|---|---|
| Price | $29/mo | $59/mo | $99/mo |
| Target | Small biz, startups | Growing teams | Large orgs |
| Highlighted | No | Yes (green border + glow) | No |
| CTA | "Buy Now" | "Buy Now" | "Buy Now" |

**Starter Features:**
- Contact and lead management
- Task and appointment scheduling
- Basic reporting and analytics
- Integration with email and calendar

**Business Features:**
- Customizable pipelines and workflows
- Team collaboration tools
- Advanced analytics and reporting
- API access and third-party integrations

**Enterprise Features:**
- Unlimited users and custom roles
- Multi-channel support
- AI-driven insights and forecasting
- Custom integration options

**Trust Bar (on Pricing Page):**
- `"Trusted by 10,000+ founders & business owners."`
- Logo marquee with 6 logos

**Feature Comparison Table:**
Full-width table comparing Free, Basic ($39), Professional ($99)
Rows:
- Ideal For
- Users (10 / 20 / Unlimited)
- Contact Management ✓/✓/✓
- Lead Tracking ✓/✓/✓
- Email Integration (Unlimited / ✓ / ✓)
- Task Management ✓/✓/✓
- Automation ✓/Advanced/Advanced
- Reporting (Basic / Advanced Insights / Custom Reports)
- Customization (Limited / Full / Full)
- API Access ✓/✓/Priority
- Pipeline Management ✓/Advanced/Advanced
- Role-Based Access ✓/✓/Priority
- Customer properties ✓/✓/Priority
- SSO/SAML authentication ✓/✓/✓
- Advanced permissions ✓/✓/✓
- Audit log ✓/✓/✓
- Data history ✓/✓/✓

**Stats Section:** Same as Home 01 stats section, reused here

---

## 13. BLOG PAGE

**Hero:**
- H1: `"Latest news & insights."`
- Subtext: `"Stay ahead of the curve with our latest updates and expert insights into the world."`

**Featured Post (Large):**
- Full-width banner image (`egE36eMLCs7vb69ANg9J6GQevTI.png`)
- Date: `August 3, 2025`
- Title: `"The ROI of CRM how Orbit helps you save time and money."`
- Excerpt + `"Read More"` CTA

**Article List Grid (9 posts):**
Displayed as a vertical list with date and title:

1. The ROI of CRM how Orbit helps you save time and money. — Aug 3, 2025
2. CRM success stories real businesses, real results with Orbit. — May 3, 2025
3. How Orbit CRM helps you close deals faster and smarter. — June 9, 2025
4. 10 reasons your business needs a powerful CRM system today. — July 16, 2025
5. Why CRM is the backbone of modern business success. — Sep 21, 2025
6. Transforming customer relation with next gen CRM solutions. — Oct 21, 2025
7. Data driven decision making with CRM analytics. — March 13, 2025
8. Why automation tool is the future of business management. — April 15, 2025
9. How to customize your CRM for maximum efficiency. — May 25, 2025

**Blog Card Style (list items):**
- Title (H3 size, white)
- Date (small, muted grey, left or below title)
- Hover: title color shifts to accent green, subtle lift
- Border-bottom between items

---

## 14. SHARED COMPONENTS (Appear on All Pages)

### FOOTER (4-column)

```
[Col 1 — Logo]        [Col 2 — Main Page]       [Col 3 — About]         [Col 4 — Resources]
Orbitt logo/name      Home 01                    About Us                Blog & Article
                      Home 02                    Features                Changelog
                      Home 03                    Career                  Contact Us
                                                 Pricing                 Error - 404

[Below separator]
Contact: tanjimislam27@gmail.com    [FB icon] [LinkedIn icon] [LinkedIn icon]

[Bottom bar]
© 2025 Orbit, Inc. All rights reserved.    Privacy Policy   Changelog
```

**Footer Styles:**
- Background: `--bg-primary` (same as page)
- Top border: `1px solid rgba(255,255,255,0.06)`
- Column labels: muted grey, uppercase, 11px
- Links: 13–14px, muted grey, hover → white
- Bottom bar: very muted, 12px

### BOTTOM CTA BANNER (all pages)
*Same section repeated on every page — see Section 8 [S11] above.*

### NAVBAR
*Same sticky navbar on every page — see Section 8 [S1] above.*

---

## 15. MASTER RECREATION PROMPT (COPY-PASTE READY)

```
You are building a complete, production-ready dark SaaS landing page called "Orbitt" — an AI-powered CRM product. Build it in clean semantic HTML + CSS + JavaScript (vanilla). The page should be pixel-close to the following specifications.

═══════════════════════════════════════
DESIGN SYSTEM
═══════════════════════════════════════

Background:         #0A0B0F
Card background:    #111318
Elevated:           #161920
Accent green:       #4ADE80
Accent muted:       rgba(74,222,128,0.12)
Accent border:      rgba(74,222,128,0.30)
Text primary:       #F0F0F5
Text secondary:     #8A8FA3
Text muted:         #555A6E
Border subtle:      rgba(255,255,255,0.07)
Shadow card:        0 4px 24px rgba(0,0,0,0.4)
Shadow glow:        0 0 30px rgba(74,222,128,0.2)

Fonts:
- Headings: "Bricolage Grotesque" (800 weight for H1, 700 for H2, 600 for H3)
- Body/UI: "Inter" (400 for body, 500 for nav, 600 for buttons)
- Import both from Google Fonts

Type scale:
- H1: clamp(42px, 6vw, 72px) / weight 800 / letter-spacing -0.025em
- H2: clamp(32px, 4vw, 48px) / weight 700 / letter-spacing -0.02em
- H3: 28px / weight 600
- H4: 18px / weight 600
- Body: 16px / line-height 1.65
- Eyebrow: 11px / uppercase / letter-spacing 0.12em / color: accent
- Stat: 64–72px / weight 800

Layout:
- Max content width: 1200px, centered, padding: 0 24px
- Section padding: 100px vertical
- Card border-radius: 20px
- Button border-radius: 100px (pill)
- Card border: 1px solid rgba(255,255,255,0.07)

═══════════════════════════════════════
PAGE SECTIONS IN ORDER
═══════════════════════════════════════

[1] STICKY NAVBAR
Fixed top, height 68px, backdrop-blur 14px, bg rgba(10,11,15,0.75), 
border-bottom 1px solid rgba(255,255,255,0.06).
Left: "Orbitt" wordmark.
Center: nav links — Features | About | Pricing | Blog | Career.
Right: "Contact" outlined pill button.
Animation: fade + slideDown on load, 0.4s.

[2] HERO SECTION (centered)
Background: radial green ambient glow at top center.
Social proof badge: overlapping avatars + "38,456 Happy Customers." in a dark pill.
H1: "Stay organized & efficient with our AI solutions."
Subtext: "Learn to grow your wealth with powerful analytics, customized insights"
Buttons: [ Get Orbit For Free ] [ Book A Demo ] — primary green + outlined.
Micro-text: "No credit card required. Free 14 days trial"
Hero image: large dashboard screenshot (900px wide, 20px rounded, faint border).
Two floating overlay mini-cards on the image (top-right + bottom-left, absolute positioned, dark bg, shadow).
Load animations: staggered fade/slide sequence (badge→H1→sub→buttons→image→cards), delays 0→1s.
Hero image: subtle float-idle CSS animation loop.

[3] TRUST BAR
Caption: "Trusted by 10,000+ founders & business owners."
Infinite horizontal marquee of partner logos (grayscale, fade edges via CSS mask).
Speed: 28s linear infinite. 6 unique logos, duplicated for seamless loop.

[4] FEATURE — CUSTOMER DATABASE
2-col grid, image left (60%), text right (40%).
H2: "Customer database for effortless data access."
Body: "brings all customer information into one centralized location..."
CTA text link: "Get Orbit For Free →"
Scroll animation: image slides from left, text fades from right.

[5] FEATURE — SALES PIPELINE
2-col grid, text left (40%), image right (60%) — FLIPPED.
H2: "Monitor manage and maximize sales pipeline."
3 bullet points with green dot markers:
• "With our advanced tracking tools."
• "Customizable pipeline management features."
• "Reduce lead leakage, and accelerate growth."
CTA text link: "Get Orbit For Free →"

[6] WORKFLOW TABS
Centered header H2: "All your team's workflow in a single place."
3-tab component, green sliding indicator on active tab.
Tab labels: "Sales Automation" / "Features" / "Analytics"
Each tab panel: eyebrow label + H3 + body + product screenshot.
Active tab content: eyebrow="Sales Automation", H3="Tools and tactics to scale.", 
body="Sales automation is the process of using technology to streamline and automate..."
CTA: "Book A Demo" green pill button.
Below tabs: 3 mini-cards in a row (icon + title + description):
• SVG icon + "Sales pipeline management." + desc
• SVG icon + "Customer support & ticketing." + desc
• SVG icon + "Security and compliance." + desc
Staggered scroll animation on mini-cards.

[7] STATS SECTION
Atmospheric bg image + overlay cards.
H2: "Numbers behind our influence."
3 stat cards with count-up JS animation on scroll:
• Blob icon + "100k" + "Client retention rate"
• Blob icon + "90%" + "Increased sales"
• Blob icon + "80%" + "Enhanced data accuracy"

[8] SUCCESS FEATURES
H2: "Success by the numbers."
2-col: list left (3 rows) + screenshot right.
Left rows (icon + eyebrow title + body):
• "Tax calculation & filing support." 
• "Multi-currency Support."
• "Personalized Alerts & Notifications"

[9] PRICING
H2: "Choose the plan that fits your business."
Monthly/Annual toggle (pill toggle, green indicator).
3-card grid with center card highlighted (green border, "Most Popular" badge):
Starter $29/mo | Business $59/mo ⭐ | Enterprise $99/mo
Feature lists under each. "Buy Now" green buttons.
Center card: 1px solid rgba(74,222,128,0.30) border + box-shadow glow.

[10] FAQ ACCORDION
H2: "Got questions? We've got answers."
4 accordion items, first one open by default.
Q1 (open): "How does Orbit help in managing customer data?"
A1: "Orbit provides detailed analytics and insights, empowering businesses..."
Q2: "How Does Orbit provide automated workflow features?"
Q3: "How does Orbit personalized alerts and notifications work?"
Q4: "Can I use Orbit to manage recurring payments and subscriptions?"
Each item: border-bottom, question + "+" icon, click toggles max-height + rotates icon 45°.

[11] BOTTOM CTA BANNER
Dark full-width section with decorative bg image (right side).
Small logo icon top.
H2: "The modern solutions to run your agency."
"Request A Demo" green pill button with idle pulse animation.
Micro-text: "No need for a credit card." / "Cancel at anytime."

[12] FOOTER
4-column grid:
Col1: Logo
Col2: Main page (Home 01/02/03)
Col3: About, Features, Career, Pricing
Col4: Blog, Changelog, Contact, 404
Below: email + social icons.
Bottom bar: copyright + Privacy Policy + Changelog.

═══════════════════════════════════════
ANIMATIONS (IMPLEMENT ALL)
═══════════════════════════════════════

1. Page load: hero staggered reveals (0.0→1.0s range, see sequence above)
2. Scroll reveals: IntersectionObserver, threshold 0.12, opacity 0→1 + translateY 28→0, 0.65s cubic-bezier(0.16,1,0.3,1)
3. Stagger: 0.08s delay between child elements in grids
4. Marquee: CSS @keyframes translateX 0→-50%, 28s linear infinite
5. Stat count-up: JS counter from 0 to target on scroll entry, 1.6s
6. Tab switch: cross-fade panels (0.3s), slide indicator (0.25s)
7. FAQ: max-height expand (0.35s), icon rotate 45° (0.25s)
8. Button hover: scale(1.04) + green glow (0.15s)
9. Card hover: translateY(-5px) + border-color (0.2s)
10. Hero image: float loop (8px up/down, 5s ease-in-out infinite)
11. CTA button idle: glow pulse (0 → 30px → 0 glow, 3.5s loop)
12. Marquee logo: grayscale → color on hover (0.3s)
13. All link CTAs: arrow/gap expands on hover (0.2s)

Use CSS custom properties for ALL colors. No hardcoded hex in components.
Use semantic HTML (header, nav, main, section, footer, article).
Mobile responsive with breakpoints at 768px and 1024px.
Smooth scrolling: html { scroll-behavior: smooth; }
Implement IntersectionObserver for all scroll animations.
```

---

## 16. DESIGN RULES CHEATSHEET

| Rule | Do | Don't |
|---|---|---|
| Color | One accent only: `#4ADE80` | Add purple, blue, or red accents |
| Background | Always dark `#0A0B0F` | Use white or light sections |
| Buttons | Always pill-shaped (`border-radius: 100px`) | Use square or slight-radius buttons |
| Cards | Dark card `#111318` on dark page `#0A0B0F` | Use white cards |
| Typography | Bricolage Grotesque headlines + Inter body | Use Inter/Roboto for headings |
| Borders | Use `rgba(255,255,255,0.07)` — barely visible | Use visible hard borders |
| Spacing | Generous — 100px section padding | Crowd elements together |
| Green | Only on CTAs, badges, active states | Decorative green elements |
| Images | Large, prominent, rounded 20px, dark-framed | Small thumbnails |
| Animations | Soft, eased, < 0.7s duration | Bouncy, jarring, long animations |
| Layout | Alt left-right feature sections | Stack all features same direction |
| Pricing | Middle card always highlighted | Treat all cards equally |
| Marquee | Always fade edges with CSS mask | Hard start/stop |
| Body text | Always `#8A8FA3` muted grey | Pure white for descriptions |
| Eyebrows | Always uppercase, tracked, green | Sentence case eyebrow labels |

---

*Document compiled from deep analysis of: Home 01, Home 02, Features, About, Pricing, Blog pages.*  
*Reference: https://crmai.framer.website | Template: Orbitt by Framer*  
*Last analyzed: May 2026*
