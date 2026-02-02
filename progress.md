# Progress Tracker - GrowthExperts Astro Website

## Project Overview
SEO/Digital Marketing agency website built with Astro.

## Current Status
Fixed contact form service selector View Transitions bug.

## Modified Files (from git status)
- `src/components/ui/PortfolioLightbox.astro` - staged changes (previous fix)
- `src/pages/contact.astro` - **UPDATED** - fixed View Transitions bug

---

## Current File Being Edited
`src/pages/contact.astro`

## Changes Made
| Component/Route | Change | Date |
|-----------------|--------|------|
| `src/pages/contact.astro` | Fixed service selector not working on mobile initial load with View Transitions | 2026-02-02 |

## Decisions
| Decision | Rationale |
|----------|-----------|
| Use IIFE wrapper for contact form script | Proper scope management with View Transitions |
| Use only `astro:page-load` event | Single initialization point handles both initial load AND view transitions (per Astro docs) |
| Remove `DOMContentLoaded` and immediate fallback | Redundant - caused race conditions with View Transitions |
| Remove `_initialized` flags on individual radio/CTA elements | Unreliable when View Transitions swap DOM - only keep flag on form element |

## Questions / Blockers
- None yet

---

## Project Structure (Key Files)
```
src/
├── layouts/
│   ├── Layout.astro
│   ├── BaseLayout.astro
│   ├── BlogLayout.astro
│   └── LegalLayout.astro
├── pages/
│   ├── index.astro (homepage)
│   ├── about.astro
│   ├── contact.astro
│   ├── faq.astro
│   ├── industries.astro
│   ├── blog/
│   ├── services/
│   ├── website-design/
│   ├── legal/
│   └── [industry/location]-seo.astro pages
├── components/
│   ├── layout/ (Header, Footer)
│   ├── sections/ (Hero, CTA, Testimonials, etc.)
│   ├── ui/ (Button, Cards, Forms, etc.)
│   ├── blog/ (BlogCard, Pagination, etc.)
│   ├── seo/ (SEO, SchemaOrg)
│   └── analytics/
```
