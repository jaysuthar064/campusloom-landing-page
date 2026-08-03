# SmartShala — Home Page Design Spec

My working understanding of `Smart Shala_home_page.pdf` (Canva export, Site ON Lab,
27 Jul 2026). This is the reference we build against, section by section.

**Source:** one page, `1024.5 × 5760 pt`. All text is flattened to images — there is
no selectable text in the PDF, so every string below was read off the render.
Treat the copy here as the source of truth and correct me where I misread.

**Per-section crops:** [`design-reference/`](design-reference/) — `01-navbar.png` …
`11-footer.png`, generated from the PDF.

---

## 1. Scale and layout

The artboard is `1024.5 pt` wide. Mapping that to a **1440 px** desktop viewport
gives a scale of **≈1.406 px per pt**, which puts the content column at
**≈1280 px** — the standard container. Use these:

| Token | Value |
|---|---|
| Design viewport | 1440 px |
| Container max-width | **1320 px** |
| Gutter | ≈60 px |
| Full page height | ≈8100 px (5760 pt) |

Container width was measured off the artboard, not assumed: ink spans
`1334 px` across the navbar row and `1309 px` across the features grid at a
1440 px viewport. Rows where the ambient blur graphics bleed to the page edge
(benefits, testimonials, FAQ) measure full-width and are not usable for this.

Everything is centred, generously spaced, and **very white**. 27% of the page is
pure `#FEFEFE`; whitespace is the dominant design element. Do not compress the
vertical rhythm.

## 2. Colour

Sampled directly from the PDF render, not eyeballed:

| Role | Hex | Notes |
|---|---|---|
| **Brand blue** | `#0047FD` | CTA fills, highlighted heading words, icons, links. A vivid near-pure blue — not indigo, not sky. |
| Heading ink | `#08080F` | Near-black with a faint blue cast. |
| Body / muted ink | `#798298` | Slate-grey for all paragraph copy. |
| Footer link ink | `#3D405E` | Darker slate than body copy. |
| Soft tint background | `#F5F7FE` | Icon chips, alternating section bands, stat pills. |
| Page background | `#FEFEFE` | Effectively white. |

The palette is **monochrome blue + neutrals**. There is no secondary accent
colour anywhere — the only non-blue colours on the page are inside the fake
school crests and the dashboard chart data (which uses orange `#F4643C`-ish for
"Absent"/"Outstanding" series and green/orange/blue for the donut).

Ambient decoration: large soft blue radial blurs bleeding in from the page
edges, plus faint dotted-grid patterns in the margins. Both are decorative and
low-opacity.

## 3. Type

Canva flattens text to outlines, so the PDF carries no font names. The face was
identified by measurement instead: the navbar's cap-to-descender height is
`14.06 px`, which puts it at ~15.5 px — but at that size its glyphs run ~10%
narrower than Poppins. **Outfit** has the same geometric skeleton at that
narrower width, and reproduces the navbar to within 1–4 px across every
element. Outfit is the font.

Confirmed against the artboard (navbar, §01):

| Element | Size @1440 | Weight |
|---|---|---|
| Nav link / Log In | 15.5 px | 500 |
| Wordmark | 27 px | 700 |
| Logo tagline | 10 px | 600, `0.19em` tracking |
| Button label | 14 px | 600 |

Still estimated — confirm each as its section is built:

| Element | Approx size @1440 | Weight |
|---|---|---|
| Hero H1 | 76–80 px | 700 |
| Section H2 | 54–58 px | 700 |
| Card title | 20–22 px | 600 |
| Body / paragraph | 17–18 px | 400 |
| Eyebrow pill | 14–15 px | 600, wide tracking |
| Stat number | 40–44 px | 700 |

**Method that worked** — worth repeating per section rather than eyeballing:
render the artboard region, find ink-column clusters to get each element's
`x0/x1/width`, screenshot the built page at 1440 and cluster it the same way,
then compare. It caught a 40 px container error and a 26 px menu offset that
looked fine by eye.

**The signature heading pattern**, used in nearly every section: a two-line
heading, black on line one, with the emphasis word(s) in brand blue —
e.g. "Helping Schools / **Simplify** Administration", "Everything You Need. /
Built for **Modern Schools.**", "Loved by Schools. / Trusted by **Leaders.**"

## 4. Recurring components

- **Eyebrow pill** — small rounded-full chip, `#F5F7FE` background, blue
  uppercase or sentence-case label, often with a leading icon. Centred above H2.
- **Card** — white fill, ~16–20 px radius, hairline border or very soft shadow,
  generous internal padding. Used for features, benefits, testimonials, stats.
- **Icon chip** — ~56 px rounded square, `#F5F7FE` fill, blue line icon centred.
- **Primary button** — brand blue fill, white text, pill or ~10 px radius
  depending on placement (nav = rounded rect, in-page CTAs = full pill), often
  with a trailing `→`.
- **Secondary button** — white fill, blue border, blue text.

All icons are **line-style, single-weight, brand blue**. Lucide matches this
well and is already a dependency.

---

## 5. Section-by-section

Heights are measured from the artboard, converted to px at 1440 width.

### 01 — Navbar ✅ built — height **147 px**
Sticky white bar. Left: `Ss` blue rounded-square logo + wordmark **SmartShala**
with a rule-flanked `SCHOOL ERP` beneath. Then **Features ▾ · Modules ▾ ·
Pricing · Resources ▾ · Company ▾** (three have dropdowns). Right: **Log In**
as a plain text link, then **Book Free Demo** as a blue rounded-rect button.

Measured geometry (px at a 1440 viewport):

| | x0 | x1 | width |
|---|---|---|---|
| Logo lockup | 52 | 253 | 201 |
| Features | 385 | 460 | 75 |
| Modules | 501 | 575 | 74 |
| Pricing | 613 | 658 | 45 |
| Resources | 701 | 787 | 86 |
| Company | 827 | 909 | 82 |
| Log In | 1166 | 1207 | 41 |
| Book Free Demo | 1235 | 1385 | 150 × 45 |

Two things that are **not** what they look like:

- Height is **147 px**, not ~112. The logo mark sits at y `51–96`, which only
  centres inside 147.
- The menu is **not** evenly distributed. It sits 132 px from the logo with the
  actions pushed to the far right — `justify-between` puts it ~26 px too far
  right.

Logo mark is a custom interlocking "Ss" monogram, not reproducible in CSS. The
built-in mark is a placeholder; upload the real asset in wp-admin.

### 02 — Hero ✅ built
Column split is 0.785 / 1.215 with no gutter (the visual starts at x=576 of
1334). The product visual is extracted from the artboard to
`public/hero-dashboard.png` with the four stat cards already composited in, so
the CMS `floating_cards` render as an overlay **only** when a custom dashboard
image is uploaded — otherwise each card would appear twice.

Original notes: `80–600 pt` (≈730 px)
Two columns, roughly 45 / 55.

**Left:** H1 "Modern Schools Choose" in black with **SmartShala** on line three
in brand blue. Sub: "One intelligent platform to manage your school smarter,
simpler and better." Buttons: **Book Free Demo** (blue, calendar icon) and
**Watch Product Tour** (outlined, play icon). Below, a row of three trust items
with icons, separated by vertical rules:
- Secure & Cloud-Based — "Your data is always safe"
- Trusted by Schools — "Across India"
- Dedicated Support — "We're here to help"

**Right:** the product shot — a slightly 3D-rotated SmartShala dashboard on a
blue glow, with four floating stat cards overlapping its edges: **Attendance
92.6% Today**, **Fees Collection ₹1.4 Cr This Month**, **Analytics +16.6% vs
Last Month**, **Communication 128 New Messages**.

### 03 — Trust & stats `585–1140 pt` (≈780 px)
Eyebrow: `TRUSTED BY SCHOOLS ACROSS INDIA`. H2: "Helping Schools / **Simplify**
Administration". Sub: "SmartShala is trusted by progressive schools to manage
their operations efficiently and focus on what matters most – students."

Then **six school logo cards** in one row: Greenwood International School,
Maple Heights Public School, St. Joseph's Convent School, Lotus Valley Global
School, Victoria World School, Cambridge International School. Each is a crest
+ name + descriptor. *(These are placeholder brands.)*

Then **four stat cards**: `5000+` Students Managed · `100+` Schools · `99.9%`
Uptime · `24/7` Support. Each has a blue icon in a circular tint chip on the
left, number and label stacked on the right.

### 04 — One Dashboard `1130–1740 pt` (≈855 px)
H2: "Everything. / **One Dashboard.**" Sub: "Every department. Every student.
Every report. **Connected.**"

Centrepiece: the dashboard screenshot, flat and centred, with **twelve labelled
capability chips orbiting it** — connected by thin blue lines with node dots.
Left column: Attendance, Fees, Communication, Reports, Exams, Students. Right
column: Analytics, Teachers, Timetable, Admissions, Logs, Notifications.

This is the most complex section to build. The orbit lines and node dots are
decorative; the chips are white cards with icon + label.

### 05 — Features grid `1730–2300 pt` (≈800 px)
Eyebrow: `POWERFUL FEATURES`. H2: "Everything You Need. / Built for **Modern
Schools.**" Sub: "SmartShala brings every aspect of school administration
together in one intelligent platform."

**5 × 2 grid** of ten cards (icon chip, title, two-line description):

| | |
|---|---|
| Student Management | Manage student profiles, admissions, roll numbers and more. |
| Attendance Management | Track daily attendance with real-time updates and reports. |
| Fee Management | Automate fee collection, reminders and receipts effortlessly. |
| Examinations & Marks | Schedule exams, record marks and generate grade reports. |
| Parent Communication | Keep parents informed with instant alerts and messages. |
| Reports & Analytics | Get insightful reports and analytics for better decision making. |
| Teacher Management | Manage teacher profiles, subjects, classes and workloads. |
| Cloud Access | Access your school data securely from anywhere, anytime. |
| Regular Updates | Get automatic updates with new features and improvements. |
| Customer Support | Dedicated support team available 24/7 to help you succeed. |

Footer line, centred with a shield icon: **"Secure. Reliable. Trusted by
Schools."** / "Enterprise-grade security with 99.9% uptime."

### 06 — Benefits `2290–2870 pt` (≈815 px)
Background shifts to a very light tint with blue blurs at both edges.

Eyebrow: `✦ Smarter Administration. Stronger Schools.` H2: "Spend Less Time
Managing. / **More Time Growing.**" Sub: "SmartShala helps schools work smarter,
not harder."

**3 × 2 grid** of six cards. These differ from section 05 — the icon sits
**left** of the text, is larger, in a circular tint chip, and each card has a
short underline rule at the bottom.

| | |
|---|---|
| Save Time | Automate daily tasks and free up hours for what matters most. |
| Reduce Paperwork | Go digital and eliminate stacks of paper for good. |
| Collect Fees Faster | Streamline fee collection and improve cash flow. |
| Better Communication | Keep parents, teachers and students informed, always. |
| Cloud Based | Access your school data securely from anywhere, anytime. |
| Real-time Reports | Get instant insights and make smarter decisions, faster. |

### 07 — How It Works `2860–3450 pt` (≈830 px)
Centred logo mark + wordmark, then H2 "How It **Works**" and sub "From demo to
digital transformation in 4 simple steps."

**Four steps** in a row, each a large soft circle containing a big ghosted
number (`01`–`04`), a blue icon, a title, a short rule, and a caption. Chevron
`›` connectors on the lines between them.

1. **Book Demo** — Schedule a personalised walkthrough
2. **Setup** — Configure your school in minutes
3. **Training** — Quick onboarding for your staff
4. **Go Live** — Start managing your school digitally

Below: **Book Free Demo** pill button with `→`, then a shield line: "Simple
setup. Fast onboarding. Ready in days."

### 08 — Testimonials `3440–4030 pt` (≈830 px)
Eyebrow: `Trusted by Principals` (quote icon). H2: "Loved by Schools. / Trusted
by **Leaders.**" Sub: "See what school leaders have to say about SmartShala."

**Three testimonial cards** — circular avatar, name, role, 5 blue stars, quote
body, a large decorative `"` glyph, then a school icon with name + location.

- **Mrs. Anjali Sharma**, Principal — "SmartShala has simplified how we manage our school. It saves time, reduces paperwork and helps us focus on what truly matters – students." — Sunrise International School, Jaipur, Rajasthan
- **Mr. Rajiv Mehta**, Principal — "The fee management and real-time reports are excellent. Communication with parents has never been easier and more effective." — Greenfield Public School, Bengaluru, Karnataka
- **Dr. Neha Kapoor**, Principal — "SmartShala is user-friendly, reliable and packed with everything a modern school needs. Highly recommended for every school leader." — Bright Future Academy, Lucknow, Uttar Pradesh

**Three carousel dots** below, middle one active — so this is a slider, not a
static grid.

### 09 — FAQ `4020–4610 pt` (≈830 px)
Eyebrow: `? Frequently Asked Questions`. H2: "Everything You Need to Know /
About **SmartShala.**" Sub: "Quick answers to the most common questions from
schools."

**Accordion**, first item open. Open state has a blue border and a filled blue
circular chevron-up; closed items are plain with a tint chevron-down. Each row
has a leading icon chip.

1. **What is SmartShala?** *(open)* — "SmartShala is a comprehensive school management software that helps schools automate administration, improve communication and manage everything in one place."
2. Who can use SmartShala?
3. Is my data safe and secure?
4. Can I access SmartShala on mobile?
5. How does the billing and pricing work?
6. Do you provide training and support?

*Answers 2–6 are collapsed in the design — I'll need that copy from you.*

### 10 — Final CTA `4600–5160 pt` (≈790 px)
Eyebrow: `✦ Smarter Administration. Stronger Schools.` (repeats section 06's).
H2, very large and centred: "Ready To **Modernise** / Your **School?**" Sub:
"Join thousands of schools already using SmartShala to save time, reduce
paperwork and focus on what matters most — students."

**Book Free Demo** pill button with `→`. Below, a four-item trust strip with
icons and dividers: Secure. Reliable. · Cloud Based · 24/7 Support · Trusted by
1000+ Schools.

### 11 — Footer `5150–5760 pt` (≈855 px)
A heavily faded dashboard screenshot sits behind the whole footer as a
watermark. Centred at top: logo + wordmark, "Modern Schools Choose
**SmartShala.**", "Manage your entire school from one intelligent platform.",
then a dot-separated module list: Attendance · Fees · Students · Exams ·
Reports · Communication.

**Four link columns** (each link prefixed with a blue `›`):

| Product | Company | Resources | Contact |
|---|---|---|---|
| Features | About | Brochure | +91 98765 43210 |
| Modules | Pricing | Help Center | hello@letssmartshala.com |
| Attendance | Book Demo | FAQs | www.letssmartshala.com |
| Fee Management | Contact | Privacy Policy | SmartShala Technologies Pvt. Ltd. |
| Reports | | Terms | Ahmedabad, Gujarat, India – 380015 |

Then a bordered CTA band: school icon, **"Ready to Digitize Your School?"** /
"See how SmartShala can simplify operations and help your school grow.", with
**Book Free Demo** (blue) and **Schedule a Call** (outlined, phone icon).

Bottom bar: `© 2026 SmartShala. All Rights Reserved. Built for Modern Schools.`
and four social buttons — LinkedIn, Facebook, Instagram, YouTube.

---

## 6. Open questions

Things the PDF cannot tell me — worth settling before or during the build:

1. **Mobile / tablet layouts.** The PDF is desktop-only. I'll derive responsive
   behaviour myself unless you have those frames.
2. **Collapsed FAQ answers** (items 2–6) — copy needed.
3. **Nav dropdown contents** for Features, Modules, Resources, Company.
4. **Real assets** — school crests, principal photos, dashboard screenshots and
   the logo are all placeholders in this export. Do we get real ones, or
   recreate the dashboard in HTML/CSS? Recreating it would be sharp at every
   resolution and animatable, but is significantly more work than an image.
5. **Where the CTAs go.** Per `Landing_Page_Integration_Analysis.md`, Log In /
   Register point at the MERN ERP. What should **Book Free Demo** do — a form,
   a Calendly-type embed, or a page?
6. **Domain mismatch:** the footer says `letssmartshala.com`, but the analysis
   doc references `campus-loom.vercel.app`. Which is correct?
7. **Placeholder stats** — "5000+ students", "100+ schools", "1000+ schools" in
   the final CTA (which contradicts "100+ Schools" in section 03). Confirm real
   numbers, or keep as-is.

## 7. Build order

Straightforward top-to-bottom, since each section is largely independent:

1. Tokens + fonts in `smartshala-landing/src/index.css` `@theme` (Tailwind v4 —
   no `tailwind.config.js`)
2. Navbar · 3. Hero · 4. Trust & stats · 5. One Dashboard · 6. Features grid
7. Benefits · 8. How It Works · 9. Testimonials · 10. FAQ · 11. Final CTA · 12. Footer

Sections 04 (orbit diagram) and 11 (watermark footer) are the two with real
layout risk; the rest are conventional grids.
