# SmartShala — site page inventory

What the client design actually covers, and what the navigation implies still
has to be built.

**The PDF is one page: the home page.** Every other page below is inferred from
links that exist in the design's navbar and footer. None of them have designs
yet.

---

## 1. Built

| Page | Route | Status |
|---|---|---|
| Home | `/` | ✅ Complete — all 11 sections, CMS-driven |

## 2. Implied by the navbar

The navbar has five items, three with dropdowns. The dropdown *contents* are
not drawn in the PDF, so the counts below are the likely shape, not confirmed.

| Nav item | Dropdown? | Pages implied |
|---|---|---|
| Features | yes | 1 overview page, or one page per feature (up to 10 — see §5) |
| Modules | yes | 1 overview page, or one per module (up to 12 — see §5) |
| Pricing | no | 1 |
| Resources | yes | Brochure, Help Center, FAQs, Blog → 3–4 |
| Company | yes | About, Contact, Careers → 2–3 |

## 3. Implied by the footer

| Column | Links |
|---|---|
| Product | Features, Modules, Attendance, Fee Management, Reports |
| Company | About, Pricing, Book Demo, Contact |
| Resources | Brochure, Help Center, FAQs, Privacy Policy, Terms |

## 4. Consolidated page count

Deduplicated across navbar and footer:

| # | Page | Priority | Notes |
|---|---|---|---|
| 1 | Home | — | ✅ built |
| 2 | Features | High | Overview of all 10 features |
| 3 | Modules | High | Overview of all 12 modules |
| 4 | Pricing | High | Plans + comparison table |
| 5 | Book Demo | High | The conversion page — every CTA points here |
| 6 | About | Medium | Company story |
| 7 | Contact | Medium | Form + details already in the footer |
| 8 | FAQs | Medium | Long-form version of the home FAQ |
| 9 | Help Center | Medium | Support/docs hub |
| 10 | Brochure | Low | Usually a PDF download, may not need a page |
| 11 | Privacy Policy | Required | Legal |
| 12 | Terms | Required | Legal |
| 13 | 404 | Required | Not in any nav, still needed |

**Minimum: 12 pages + 404.** That is the "one page per nav item" reading.

**If Features and Modules get a page each** — common for SEO in this market,
since schools search for "school attendance software", "school fee management
software" and so on as separate terms — that becomes:

`11 feature pages + 12 module pages` → **up to 35 pages.**

My recommendation: build the 12 core pages first, then add individual
feature/module pages later only for the terms worth ranking for. Landing pages
that exist purely for SEO and repeat each other tend to hurt more than help.

## 5. Feature and module inventory

Already in the CMS from the home page, so any per-item page can reuse the copy.

**Features (10):** Student Management · Attendance Management · Fee Management ·
Examinations & Marks · Parent Communication · Reports & Analytics ·
Teacher Management · Cloud Access · Regular Updates · Customer Support

**Modules (12):** Attendance · Fees · Communication · Reports · Exams ·
Students · Analytics · Teachers · Timetable · Admissions · Logs · Notifications

## 6. Effort note

The CMS plugin is schema-driven, so a new page is a new file in
`cms/wp-content/plugins/smartshala-cms/schema/`. That gives it an admin screen,
save handling and a REST endpoint with no new PHP. The frontend work is a route
plus components — and the shared pieces (`Container`, `SectionHeading`, `Icon`,
`Reveal`, the buttons, the card styles) already exist from the home page.

The realistic cost per page is therefore the **design**, not the build. Nothing
can start until the client supplies artwork for these pages.

## 7. Open questions

1. Do Features/Modules get one page each, or one overview page each?
2. Is Pricing public, or "contact us for a quote"? The research below suggests
   Indian school ERPs mostly publish a per-student annual figure.
3. Is Brochure a page or a PDF download?
4. Is a blog wanted under Resources? It's the main organic channel in this
   market, but it's an ongoing content commitment.
