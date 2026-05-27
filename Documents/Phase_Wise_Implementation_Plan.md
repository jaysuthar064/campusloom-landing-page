# SmartShala ERP - Detailed Phase-Wise Implementation Plan
> **Core Architecture:** Headless WordPress (CMS Backend) + React/Vite (Frontend)
> **Design Specifications:** Mapped exactly to `Orbitt_Landing_Page_Design_Document.md`
> **Copywriting:** Mapped exactly to `SmartShala_ERP_Landing_Page_Content.md`
> **Integration:** Mapped exactly to `Landing_Page_Integration_Analysis.md`

---

## Phase 1: Foundation & Design System (React + Vite)
**Goal:** Setup the technical base matching the Orbitt Design System.

**References from `Orbitt_Landing_Page_Design_Document.md`:**
- **CSS Variables (Sec 2):** Set global roots.
  - Backgrounds: `--bg-primary: #0A0B0F`, `--bg-card: #111318`.
  - Accent: `--accent: #4ADE80` (Mint Green).
- **Typography (Sec 3):** Import Google Fonts.
  - Headings: `Bricolage Grotesque` (Weights: 600, 700, 800).
  - Body/UI: `Inter` (Weights: 400, 500, 600).
- **Layout (Sec 4):**
  - `max-width: 1200px` for container.
  - `padding: 100px 0` for main sections.

---

## Phase 2: Atomic UI Component Library
**Goal:** Build the reusable CSS/React components dictated by Orbitt before assembling the page.

**References from `Orbitt_Landing_Page_Design_Document.md`:**
- **Buttons (Sec 5.1):** 
  - Primary CTA (`.btn-primary`): Pill-shaped (`border-radius: 100px`), green background. Hover animation: `scale(1.04)` + `box-shadow: 0 0 24px rgba(74,222,128,0.35)`.
- **Badges (Sec 5.3):**
  - Eyebrow badges (`.badge-green`): Green pill with uppercase tracked text.
  - Social Proof pill with overlapping avatar cluster.
- **Cards (Sec 5.2):**
  - `.feature-card` and `.pricing-card` with `border: 1px solid rgba(255,255,255,0.07)` and hover lift `translateY(-5px)`.
- **Animation System (Sec 6):**
  - Implement `IntersectionObserver` for scroll reveals (Slide up/fade in over 0.65s).
  - Add `float-idle` keyframes for Hero images.
  - Add JS `countUp` function for the Stats section.

---

## Phase 3: Static Frontend Assembly (Page Layout)
**Goal:** Assemble the page using the Orbitt Layouts and the SmartShala Content.

**Section-by-Section Mapping:**

1. **Sticky Navbar**
   - *Design (Orbitt Sec 8.S1):* Fixed top, `blur(14px)`, rgba(10,11,15,0.75).
   - *Integration (`Landing_Page_Integration_Analysis.md`):* "Login" CTA links directly to `https://campus-loom.vercel.app/login`.

2. **Hero Section**
   - *Design (Orbitt Sec 8.S2 & 6.1):* Radial green ambient glow, staggered load animations.
   - *Content (`SmartShala Content` Sec 1):* 
     - Badge: "Trusted by Schools, Educators & Academic Institutions".
     - H1: "Simplify School Management With Smart Digital ERP Solutions." (Size: clamp 42px-72px, Bricolage 800).
     - Subtext: "SmartShala ERP is a complete cloud-based education management platform..."
   - *Integration:* Primary CTA "Get Free Demo" routes to `https://campus-loom.vercel.app/register`.

3. **Trust Section / Marquee**
   - *Design (Orbitt Sec 5.7):* Infinite CSS marquee scroll, grayscale logos with mask-image fade edges.
   - *Content (`SmartShala Content` Sec 2):* "Trusted by Schools, Coaching Institutes & Educational Organizations."

4. **Alternating Feature Sections (Student Mgmt, Finance)**
   - *Design (Orbitt Sec 9 - Home 02 Layout):* Alternating 60/40 splits (Image Left / Text Right, then Text Left / Image Right).
   - *Content (`SmartShala Content` Sec 3 & 4):* 
     - H2: "Student Information Management Made Simple."
     - H2: "Automate Fees, Payments & Financial Operations."
   - *Elements:* Include the green-dot bullet lists (`.feature-list-item`) from Orbitt Sec 5.8.

5. **Workflow / Modules Tab Section**
   - *Design (Orbitt Sec 8.S6):* 3-tab sliding component.
   - *Content (`SmartShala Content` Sec 5):* 
     - Tabs: Academic Management, Administration Management, Communication Management.

6. **Stats Grid Section**
   - *Design (Orbitt Sec 8.S7 & 6.3):* Dark atmospheric background, 3 cards, JS count-up animation.
   - *Content (`SmartShala Content` Sec 7):* "500+ Institutions", "95% Time Reduced", "100% Cloud-Based Accessibility".

7. **Pricing Section**
   - *Design (Orbitt Sec 12 & 5.2):* 3-Card Grid. Middle card highlighted with `--accent-border` and "Most Popular" badge.
   - *Content (`SmartShala Content` Sec 13):* Starter Plan, Professional Plan, Enterprise Plan.
   - *Integration:* "Get Started" buttons link to Vercel app's signup flow.

8. **Testimonials & FAQ**
   - *Design (Orbitt Sec 8.S10):* Accordion with `+` to `x` rotation animation. Testimonial grid (Orbitt Sec 11).
   - *Content (`SmartShala Content` Sec 14 & 15):* 3 Testimonial quotes and 5 FAQ questions.

---

## Phase 4: Custom Headless WP Plugin (The "Dollhouse" Pattern)
**Goal:** Setup the backend infrastructure using a hardened custom plugin to serve REST APIs securely, matching the `tldc-headless` architecture.

- **Infrastructure (`Integration Analysis` Sec 3):** Install WordPress on the backend subdomain.
- **Custom Plugin Creation (`smartshala-headless`):** 
  - Build a custom singleton plugin (`smartshala-headless.php`) replicating the rock-solid architecture of the `tldc-headless` plugin.
  - Create an `includes/` directory with dedicated classes for specific domains: `class-security.php`, `class-admin.php`, `class-api-landing.php`, `class-api-pricing.php`, `class-api-testimonials.php`.
  - Manage custom admin data entry screens through `class-admin.php` ensuring editors have a clean UI.
- **API Exposure:** Register custom `smartshala/v1` namespace REST routes explicitly inside the plugin (`register_api_routes`). This guarantees 100% control over the exact JSON schema and endpoints, rather than relying on generic WP APIs.

---

## Phase 5: API Integration (Connecting React & WP)
**Goal:** Replace the hardcoded Phase 3 text with the dynamic Phase 4 API data.

- Create an API service in the React project (`src/services/wpApi.js`).
- Use `useEffect` hooks to fetch data from `https://admin.smartshala.com/wp-json/wp/v2/landing-page`.
- Map the JSON response to the React components (e.g., `<h1>{apiData.acf.hero_h1}</h1>`).

---

## Phase 6: Final Polish & Vercel Linking
**Goal:** Ensure the absolute URLs work perfectly with the main MERN app.

- *Routing Check:* Verify all "Login" buttons properly redirect to `campus-loom.vercel.app` (or custom subdomain equivalent like `app.smartshala.com`).
- *Animation Audit:* Ensure all 13 animations listed in Orbitt Sec 15 (Page load staggers, hover effects, floating loops) are smooth.
- *Deployment:* Push the frontend Vite app to production.
