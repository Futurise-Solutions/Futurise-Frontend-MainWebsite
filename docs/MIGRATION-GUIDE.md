# Futurise Solutions — Vite/React → Next.js Migration Guide

**Target site:** https://www.futurisesolutions.com
**Audited live:** 18 September 2026
**Goal:** Move to Next.js with **100% visual parity** (pixel-identical), and fix SEO / AEO / GEO + Core Web Vitals.
**Audience:** the AI coding agent doing the migration, and the human reviewing it.

> **How to use this document**
> Give this whole file to the AI agent **together with the old codebase**.
> Do **not** ask the agent to "convert the site to Next.js" in one prompt. That is why the previous attempt failed.
> Work through Phase 0 → Phase 9 in order. Every phase has a **STOP gate** that must pass before the next phase starts.

---

## Table of contents

1. [Executive summary — what is actually broken](#1-executive-summary--what-is-actually-broken)
2. [Measured audit of the current site](#2-measured-audit-of-the-current-site)
3. [Complete route inventory](#3-complete-route-inventory)
4. [Design system extracted from the live site](#4-design-system-extracted-from-the-live-site)
5. [Component & animation inventory](#5-component--animation-inventory)
6. [Decision: keep Chakra UI or drop it?](#6-decision-keep-chakra-ui-or-drop-it)
7. [Target architecture](#7-target-architecture)
8. [PHASE 0 — Read the old codebase (mandatory, no code yet)](#phase-0--read-the-old-codebase-mandatory-no-code-yet)
9. [PHASE 1 — Scaffold Next.js + providers](#phase-1--scaffold-nextjs--providers)
10. [PHASE 2 — Theme, fonts, global CSS, keyframes](#phase-2--theme-fonts-global-css-keyframes)
11. [PHASE 3 — Layout shell (announcement bar, header, footer, chat)](#phase-3--layout-shell)
12. [PHASE 4 — Shared components](#phase-4--shared-components)
13. [PHASE 5 — Static pages, one at a time](#phase-5--static-pages-one-at-a-time)
14. [PHASE 6 — Blog (the biggest win)](#phase-6--blog-the-biggest-win)
15. [PHASE 7 — SEO / AEO / GEO layer](#phase-7--seo--aeo--geo-layer)
16. [PHASE 8 — Performance pass](#phase-8--performance-pass)
17. [PHASE 9 — Cutover, redirects, rollback](#phase-9--cutover-redirects-rollback)
18. [Pixel-parity verification protocol](#pixel-parity-verification-protocol)
19. [Acceptance criteria](#acceptance-criteria)
20. [Known traps that will break parity](#known-traps-that-will-break-parity)
21. [Copy-paste prompts for the AI agent](#copy-paste-prompts-for-the-ai-agent)
22. [**Appendix A — Page-by-page section blueprint**](#appendix-a--page-by-page-section-blueprint) ← every route's full outline + the content-integrity check
23. [Appendix B — Site-wide totals](#appendix-b--site-wide-totals-sanity-check-after-migration)

---

## 1. Executive summary — what is actually broken

The site is **not** a typical "SPA with no SEO" case. Static marketing pages are already pre-rendered to HTML. Three real problems remain:

### Problem 1 — 83 blog posts ship **zero HTML** (severity: critical)

> ## ⛔ CORRECTED — THIS SECTION IS FALSE. DO NOT ACT ON IT.
>
> **See `MIGRATION-INVENTORY.md` §0.1 for the measurements.**
>
> This was measured with a **browser** User-Agent. Crawlers do not take that path.
> `middleware.js` is a live Vercel Edge Middleware that **server-renders the full
> article at the edge for bots**. Measured against production 18 Sep 2026:
>
> | User-Agent | `X-Rendered-By` | `<h1>` | `<h2>` | Words |
> |---|---|---|---|---|
> | Googlebot | `futurise-edge-ssr` | 1 | 16 | 4,879 |
> | GPTBot | `futurise-edge-ssr` | 1 | 16 | — |
> | Chrome (human) | *(static file)* | 0 | 0 | — |
>
> The `CRAWLERS` regex in `middleware.js` covers 45 UAs including GPTBot, ClaudeBot,
> PerplexityBot, CCBot and Google-Extended — precisely the engines this section claims
> cannot see the content. All 14 priority UAs verified covered; see
> `CRAWLER-COVERAGE-AUDIT.md`.
>
> Blog posts are **also** prerendered at build time (meta-only) to
> `dist/blog/<slug>/index.html` ×83 with correct per-post title/description/canonical/OG.
>
> **There is no indexing emergency.** The real case for the migration is engineering
> debt — see the revised goal in `MIGRATION-STATUS.md`. The text below is retained only
> as a record of what was originally believed.

Static routes serve pre-rendered HTML into `<div id="app">`. But `/blog/<slug>` serves a **different, empty shell**:

```html
<body>
  <style>…4.8 KB boot skeleton CSS…</style>
  <div id="fs-boot">…loading animation…</div>
  <script>…4.6 KB boot script…</script>
  <div id="root"></div>     <!-- EMPTY -->
</body>
```

The article body is fetched client-side from
`https://futurise-backend-main-website.vercel.app/api/blogs/<slug>`.

Measured on `/blog/the-ai-governance-gap-2026-…`:

| Metric | In served HTML | After JS runs |
|---|---|---|
| `<h1>` | 0 | 1 |
| `<h2>` | 0 | 10+ |
| `<p>` | 0 | many |
| Images | 0 | 16 |
| Word count | 0 (article) | ~6,440 |

`sitemap.xml` submits **83 blog URLs** whose HTML contains no content. Googlebot renders JS eventually, but:

- **AEO** (AI Overviews, featured snippets) and **GEO** (ChatGPT, Perplexity, Claude, Gemini browsing) crawlers mostly **do not execute JavaScript**. To them these 83 long-form articles do not exist.
- Render-budget delay means slow / partial indexing.
- This is by far the largest content asset on the site and it is invisible.

**Fix:** SSG + ISR for `/blog/[slug]`. This alone is the main reason to move to Next.js.

### Problem 2 — JavaScript weight (severity: high)

Decoded transfer measured on the live site:

| Chunk | Decoded size |
|---|---|
| `chakra-vendor-*.js` | **269 KB** |
| `index-*.js` (app) | **218 KB** |
| `react-vendor-*.js` | **158 KB** |
| `motion-vendor-*.js` (framer-motion) | **116 KB** |
| **Subtotal** | **~761 KB** |

On a **blog URL** it *additionally* loads a **second app bundle** `index-AdyIymAa.js` (**153 KB**) *and* still downloads `HomePage-*.js` and `CompanyStats-*.js` — chunks that route will never render. Effective payload on a blog page: **~914 KB decoded JS**.

Every byte of this is hydration work on the main thread. This is what kills INP/TBT and the Lighthouse performance score.

### Problem 3 — Image and layout hygiene (severity: medium)

Measured on `/`:

- **91** `<img>` elements
- **71** of them have **no `width`/`height` attribute** → CLS risk on every one
- **4** have no `alt`
- 88 use `loading="lazy"` (good), but no responsive `srcset` — one fixed WebP is served to a 390px phone and a 2560px desktop alike
- Only **1** `<picture>` element; hero uses a single `hero-atmosphere.avif` preload

`next/image` fixes all four of these mechanically.

### What is already good (do not "fix" these)

- HTTP **404** is correctly returned for unknown paths (`/zzz-not-found` → 404, titled "Page Not Found (404)")
- `robots.txt` and `sitemap.xml` (110 URLs) exist
- Rich, correct JSON-LD on static routes: `Organization`, `AboutPage`, `CollectionPage`, `Service`, `BreadcrumbList`, `FAQPage`, `ProfessionalService`, `WebPage`
- Genuinely strong long-form copy — the service, geo and pricing pages are unusually well written for AEO. The content is not the problem; the delivery is.
- TTFB measured at **68 ms** (Vercel edge) — hosting is fine

---

## 2. Measured audit of the current site

| Item | Finding |
|---|---|
| Host | Vercel (`/_vercel/insights`, `/_vercel/speed-insights` present) |
| Build tool | Vite (hashed `assets/*.js`, `modulepreload` graph) |
| Router | React Router — `window.__reactRouterVersion` is defined |
| UI library | **Chakra UI v2** — `--chakra-*` CSS vars, `.chakra-stack`, `.chakra-popover__content`, `.chakra-button`, 8 × `<style data-emotion>` tags injected at runtime |
| CSS engine | Emotion (Chakra v2's styling runtime) |
| Animation | **framer-motion** (`motion-vendor` chunk, 134 elements with inline `transform` on `/`) |
| Carousel | **Swiper** (global CSS has `.swiper-button-next/prev`, `.swiper-pagination-bullet` overrides) |
| Pre-render | Yes for static routes → hydration root is `#app`. Blog detail routes fall back to a CSR shell with root `#root`. |
| Blog data | REST API: `https://futurise-backend-main-website.vercel.app/api/blogs` and `/api/blogs/<slug>`, plus a `…/view` write for the view counter |
| Analytics | GA4 `G-5FKB0BL3MQ`, Microsoft Clarity `ycomehde8x`, Vercel Analytics, Vercel Speed Insights |
| Fonts | Self-hosted woff2: **Zangezi** (headings), **Aeonik Trial** (body). `font-display: swap`. Zangezi Regular alone is **41 KB**. |
| Forms | Contact form fields: `user_name`, `company`, `user_email`, `phone`, `message`. Newsletter: single `email` input. Both submit via JS handler (no `action` attribute). |
| Icons | 89 inline `<svg>` on `/`; 0 `<canvas>`; 0 `<video>` |

> ⚠️ **Licensing flag, not a technical one:** the font files are named `Zangezi08_Trial-Regular.woff2` and the family is `"Aeonik Trial"`. Trial licences normally forbid production web embedding. Buy the web licences (or swap the families) before the new site goes live. Migrating the files carries the problem across.

> ⚠️ **Field data:** I could not pull PageSpeed Insights (API rate-limited, HTTP 429). Run it yourself before starting and save the JSON as your **baseline** — you need a before/after number:
> `https://pagespeed.web.dev/analysis?url=https://www.futurisesolutions.com/`
> Do it for `/`, `/blog/<any-post>`, and `/service/web-development`, mobile strategy.

---

## 3. Complete route inventory

`sitemap.xml` contains **110 URLs**. Every one must exist at the same path after migration.

### 3.1 Static routes (27) — all currently pre-rendered

| # | Path | `<title>` | HTML size | JSON-LD blocks |
|---|---|---|---|---|
| 1 | `/` | AI, SaaS & Web App Development Company \| Futurise Solutions | 257 KB | 3 |
| 2 | `/about` | About Futurise Solutions — NZ-Registered Dev Studio | 208 KB | 3 |
| 3 | `/portfolio` | Portfolio — AI, SaaS & Web Projects \| Futurise Solutions | 141 KB | 2 |
| 4 | `/pricing` | How We Price Projects — Costs, Scope & Engagement | 120 KB | 3 |
| 5 | `/blog` | AI, SaaS & Web Development Insights \| Futurise Solutions | 210 KB | 4 |
| 6 | `/contact` | Contact Us — Get a Free Quote \| Futurise Solutions | 241 KB | 3 |
| 7 | `/case-studies` | Case Studies — How We Build, In Detail | 106 KB | 3 |
| 8 | `/service/web-development` | Web Development Company — React, Next.js & Node.js | 172 KB | 4 |
| 9 | `/service/app-development` | App Development Company — iOS & Android (React Native) | 148 KB | 4 |
| 10 | `/service/ui-ux-design` | UI/UX Design Agency — Product Design & Figma | 125 KB | 4 |
| 11 | `/service/blockchain-development` | Blockchain Development … | — | 4 |
| 12 | `/service/ai-ml-solutions` | AI & ML Solutions … | — | 4 |
| 13 | `/service/digital-marketing` | Digital Marketing … | — | 4 |
| 14 | `/case-studies/ai-support-agent` | Building a RAG AI Support Agent | 108 KB | 3 |
| 15 | `/case-studies/saas-platform-scale` | Rebuilding a B2B SaaS Platform | 108 KB | 3 |
| 16 | `/case-studies/real-estate-app` | React Native Property App for India & US Markets | 108 KB | 3 |
| 17 | `/case-studies/fintech-ux-redesign` | FinTech Dashboard UX Redesign Case Study | 108 KB | 3 |
| 18 | `/case-studies/defi-protocol-launch` | DeFi Protocol Launch … | 108 KB | 3 |
| 19 | `/case-studies/saas-seo-growth` | SaaS SEO Growth … | 108 KB | 3 |
| 20 | `/nz` | Software Development Company New Zealand | 146 KB | **5** |
| 21 | `/us` | Software Development Company USA | 166 KB | **5** |
| 22 | `/au` | Software Development Company Australia | 159 KB | **5** |
| 23 | `/ca` | Software Development Company Canada | 167 KB | **5** |
| 24 | `/ae` | Software Development Company UAE | 158 KB | **5** |
| 25 | `/europe` | Software Development for European Businesses | 125 KB | **5** |
| 26 | `/privacy` | Privacy Policy \| Futurise Solutions | 96 KB | 2 |
| 27 | `/terms` | Terms & Conditions \| Futurise Solutions | 100 KB | 2 |

Plus: **404 page** — H1 "This page drifted into the future." — must keep returning HTTP 404.

### 3.2 Dynamic routes

| Pattern | Count | Source |
|---|---|---|
| `/blog/[slug]` | **83** | REST API `/api/blogs/<slug>` |

### 3.3 Page templates (reuse these, don't write 27 pages from scratch)

The six `/service/*` pages share **one template**. Confirmed by identical H2 sequence:

```
H1  {Service Name}
H2  Our {Service Name}                      → 5 capability cards
H2  How we craft great products             → 7-step process (Discovery…Support)
H2  {Service Name} for teams in every industry
H2  See {service} in production             → linked case study
H2  Questions worth answering before you brief anyone  → 4 blog links
H2  Frequently asked questions              → FAQ accordion + FAQPage JSON-LD
H2  Ready to start your {Service Name} project?  → CTA
```

The six `/case-studies/*` detail pages share **one template**:

```
H1  {Case study title}
H2  The Problem
H2  Our Approach
H2  Our Step-by-Step Process
H2  Measurable impact — verified outcomes
H2  Lessons Learned & Refinements          → 2× H3
H2  Trending Questions & FAQs
H2  Let's build your success story.        → CTA
```

### ⚠️ The six geo pages are NOT a shared template — do not build them as one

This is the biggest content trap in the migration. The geo pages share a *shell* (5 sections, ~20 images each) but **every H2 differs and every page is bespoke long-form copy**. Verified live:

| Route | H2s | H3s | Words |
|---|---|---|---|
| `/nz` | 11 | 38 | 2,392 |
| `/us` | 11 | 41 | 4,595 |
| `/au` | 10 | 37 | 3,674 |
| `/ca` | 12 | 41 | **4,716** |
| `/ae` | 10 | 37 | 3,607 |
| `/europe` | 8 | 30 | 2,573 |

How different they actually are:

- `/ca` → "Where French stops being a translation task" · "Two languages, one product" · "What Canadian law puts on the screen"
- `/ae` → "The invoice format is changing, and it is code" · "Free zone or mainland, the build differs" · "Arabic is a layout problem before it is a language problem"
- `/au` → "The compliance deadlines already on your roadmap" · "Building for a regulated data economy"
- `/us` → "Fifty states, one architecture" · "Who owns what, and what happens if it ends"
- `/nz` → "Distance is a constraint, not an excuse" · Xero / MYOB / Windcave / NZ Post integrations
- `/europe` → "What it takes to engage a supplier outside the EEA" · "Decided in week one, not retrofitted"

That is **~21,500 words** of market-specific, genuinely researched copy. If the agent builds these from one template with a country variable, it will silently destroy most of it — and you will **not** catch it in a screenshot diff, because the layout will still look right.

**→ In Next.js:**

| Routes | Approach |
|---|---|
| 6 × `/service/*` | **One** template: `app/service/[slug]/page.tsx` + `content/services.ts` |
| 6 × `/case-studies/*` | **One** template: `app/case-studies/[slug]/page.tsx` + `content/case-studies.ts` |
| 6 × geo pages | **Six separate route folders**: `app/nz/page.tsx`, `app/us/page.tsx`, … Share the *section components*, never the content. |
| 9 × one-off pages | One file each |

27 pages → ~17 route files. See **Appendix A** for every page's full section blueprint.

### 3.4 Navigation structure (must match exactly)

**Announcement bar** (above header, marquee, `announcement-scroll` keyframe):

> ## ⛔ CORRECTED — "Powering up" is NOT in the announcement bar.
>
> **Use `MIGRATION-INVENTORY.md` §0.6 for the exact string.**
>
> "Powering up" is the `.fs-word` label inside the `#fs-boot` loader in `index.html`.
> The guide conflated two different elements. The real `TEXT` const in
> `src/Layout/AnnouncementBar.jsx` begins with **four U+00A0 non-breaking spaces**, and
> the source mixes `\uXXXX` escapes with literal characters — copy it from the source
> file, not from any rendering of it:
>
> ```js
> const TEXT =
>   "    •    📅 Book a Complimentary 45-Minute Strategy Call" +
>   "    •    🚀 AI Agents, SaaS, Web & Mobile Solutions" +
>   "    •    🌎 Delivering for Businesses in the UAE, USA & India";
> ```

*(original, incorrect)* Powering up • 📅 Book a Complimentary 45-Minute Strategy Call • 🚀 AI Agents, SaaS, Web & Mobile Solutions • 🌎 Delivering for Businesses in the UAE, USA & India

**Header:** logo → `Home` · `About` · `Services ▾` (Chakra Popover, 6 items) · `Case Studies ▾` (Chakra Popover) · `Portfolio` · `Pricing` · `Blog` · `Contact` → **Book appointment** button + mobile hamburger.

**Footer** groups:
- *Selected work*: Infinity Bay Trading, Dhanlaxmi Property, Palm Vision Technology, HOMIES PropTech, → View all projects
- *Company*: Home, About Us, Portfolio, Pricing, Case Studies, Contact
- *Services*: all six `/service/*`
- *Get in touch*: `mailto:business@futurisesolutions.com`
- *Markets*: the six geo pages
- Newsletter subscribe input
- `© 2026 Futurise Solutions. All rights reserved.` · Privacy · Terms

**Floating:** "Open chat" bubble (bottom-right, `ChatBubble` chunk).

---

## 4. Design system extracted from the live site

These are the **real computed values** from the running site. Copy them verbatim into the new theme. If any value differs, parity is already broken.

### 4.1 Colors

```ts
// theme/colors.ts — verbatim from live --chakra-colors-*
export const colors = {
  brand: {
    50:  '#f1efff',
    100: '#e3dfff',
    200: '#c8bfff',
    300: '#a99cff',
    400: '#8f7dff',
    500: '#7b6cff',   // primary
    600: '#6450e6',
    700: '#503fbf',
    800: '#3f3299',
    900: '#2a2168',
  },
  navy: {
    500: '#24243a',
    600: '#1a1a2b',
    700: '#13131f',
    800: '#0d0d16',
    900: '#08080d',
  },
  accent: {
    solid: '#b4a0ff',
  },
  bg: {
    canvas:       '#08080d',
    surface:      'rgba(255,255,255,0.035)',
    surfaceHover: 'rgba(255,255,255,0.06)',
  },
}
```

- `body` background: `rgb(8, 8, 13)` = `#08080d`
- `body` color: `rgb(244, 242, 255)` = `#f4f2ff`
- The site is **dark-mode only** — `ChakraProvider` must be locked to `initialColorMode: 'dark'`, `useSystemColorMode: false`. Do **not** let Next.js add a light theme.

### 4.2 Typography

```ts
fonts: {
  heading: `'Zangezi','Aeonik Trial',-apple-system,system-ui,sans-serif`,
  body:    `'Aeonik Trial',-apple-system,system-ui,sans-serif`,
  mono:    `SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace`,
}
```

Measured desktop (viewport 1127 px):

| Element | Family | Size | Weight | Letter-spacing |
|---|---|---|---|---|
| `h1` | Zangezi | 72 px | 700 | **−2.16 px** (= −0.03em) |
| `h2` | Zangezi | 42 px | 700 | **−0.84 px** (= −0.02em) |
| body | Aeonik Trial | 16 px | 400 | normal |

> The negative tracking is a large part of the site's look. `next/font` **must not** change it. Verify after migration.

> ## ⛔ CORRECTED — this list is incomplete. It omits EVERY italic face.
>
> **Use `MIGRATION-INVENTORY.md` §D.2 — it has all eleven `@font-face` blocks verbatim.**
>
> **Cause of the error (stated so it is not repeated):** this list was enumerated from
> `document.fonts` **on the homepage only**. Any face that page never rendered never
> appeared — which is every italic cut, plus any weight the homepage does not use.
> Enumerating loaded fonts from one page does not enumerate declared fonts.
>
> **Six listed. Eleven exist.** The five missing are all italic:
>
> | Missing face | Family | Weight | Style |
> |---|---|---|---|
> | `Zangezi08_Trial-LightItalic.woff2` | Zangezi | `300 400` | italic |
> | `Zangezi08_Trial-Italic.woff2` | Zangezi | `500 800` | italic |
> | `aeoniktrial-lightitalic.woff2` | Aeonik Trial | `300` | italic |
> | `aeoniktrial-regularitalic.woff2` | Aeonik Trial | `400 500` | italic |
> | `aeoniktrial-bolditalic.woff2` | Aeonik Trial | `600 800` | italic |
>
> Wiring only six leaves every italic run **synthesised** (browser-obliqued), which is a
> visible parity failure that a screenshot diff on the homepage would not catch.
>
> Note also the **weight ranges** (`500 800`, `400 500`, `600 800`) are deliberate:
> Zangezi ships no true bold, so heavier requests map onto the Regular cut to avoid
> faux-bold. Collapsing a range to a single weight changes every heading on the site.

*(original, incomplete)* `@font-face` weights currently declared (all `font-display: swap`):
`Zangezi 300`, `Zangezi 400`, `Zangezi 500 800` (variable range), `Aeonik Trial 300`, `Aeonik Trial 400 500`, `Aeonik Trial 600 800`.

### 4.3 Spacing / radii / shadows

Chakra v2 defaults are in use (`--chakra-space-*`, `--chakra-radii-*`, `--chakra-sizes-*` all match stock). Only the colors, fonts and the `bg.*` semantic tokens are customised. **Do not restyle anything to "improve" it.**

---

## 5. Component & animation inventory

### 5.1 Shared components (names come from the live Vite chunk graph — these exist in the old codebase)

| Chunk name | What it is |
|---|---|
| `Section` | section wrapper (padding / max-width) |
| `SectionHeading` | eyebrow + H2 + sub-line pattern used on every section |
| `GlassCard` | the translucent card (`bg.surface` + border + blur) |
| `ProcessTimeline` | the 7-step "How we work" timeline |
| `ClientsReviews` | testimonial block (`cr*` keyframes) |
| `AuroraField` | animated background field (`af*` keyframes) |
| `CompanyStats` | 25+ / 15+ / 4+ / 6 counters |
| `Faqs` | FAQ accordion + FAQPage JSON-LD |
| `BlogCard` | blog listing card |
| `CTASection` | "Start building today" band |
| `Seo` | head-tag component (react-helmet-style) — **this gets deleted**, replaced by Next Metadata API |
| `ChatBubble` | floating chat launcher |
| `market-reach` | geo/market map block |
| `blog` | blog data/API module |
| `config` | site config |
| `HomePage` | home route |

### 5.2 CSS keyframes (23 custom, all must be carried over byte-for-byte)

> ## ⛔ CORRECTED — the count and the locations are both wrong.
>
> **Use `MIGRATION-INVENTORY.md` §D.3 — it has all 36 bodies verbatim.**
>
> - **36 distinct keyframes, not 23.** This count was homepage-only but stated as
>   site-wide.
> - **They are not in a global stylesheet.** Only **2** (`heroDrift`, `heroVeil`) are in
>   `src/index.css`. The rest are inline in component `sx` props (Emotion-scoped), in
>   `<style>` tags, or in an Emotion `keyframes` template literal — across 8 locations.
> - **`cr*` is mis-attributed.** `crFlow`/`crDraw`/`crNode` belong to `CircuitRail.jsx`,
>   not `ClientsReviews`.
> - **13 keyframes are missing from the table below entirely:** `mg-pulse`, `wrm-pulse`,
>   `wvStage`, `wvFlow`, `wvTick`, `uxResolve`, `uxSwatch`, `bcConfirm`, `bcLink`,
>   `bcSeal`, `mkSignal`, `mkRow`, `pulseGlow`.
>
> 31 carry over; the 5 `fs-*` boot-loader keyframes are deleted in Phase 6.

| Prefix | Keyframes | Belongs to |
|---|---|---|
| hero | `heroDrift`, `heroVeil` | hero background |
| hl | `hlIn`, `hlPlaneA`, `hlPlaneB`, `hlPlaneC`, `hlPacket`, `hlDraw`, `hlPulse`, `hlSweep` | the "Request → Gateway → AI agents → Application → Pipeline → Data layer" hero diagram |
| sd | `sdFlow`, `sdPulse` | "Systems designed to carry weight" diagram |
| cr | `crFlow`, `crDraw`, `crNode` | ClientsReviews |
| af | `afDriftA`, `afDriftB`, `afDriftC` | AuroraField |
| fs | `fs-chev`, `fs-fill`, `fs-word`, `fs-breathe`, `fs-sweep` | the `#fs-boot` CSR loading skeleton — **delete these**, Next.js SSR makes the boot screen unnecessary |
| misc | `scroll` (logo/project marquee), `announcement-scroll` (top bar) | marquees |

Plus 2 emotion-generated keyframes (`animation-b7n1on`, `animation-1694tdw`) which come from framer-motion / Chakra and regenerate automatically.

### 5.3 Global CSS selectors (outside Chakra)

```
#app                     → root reset
#app input, #app …       → input resets
.gradient-text           → the purple gradient text treatment
.form                    → contact form container
.form input, .form textarea
.form input:focus, .form textarea:focus
.form input::placeholder, .form textarea::placeholder
.swiper-button-next, .swiper-button-prev
.swiper-button-next::after, .swiper-button-prev::after
.swiper-pagination-bullet
.swiper-pagination-bullet-active
```

⚠️ `#app` is the Vite hydration root id. In Next.js the root is `<body>`. **Every `#app …` rule must be rewritten** (to `body …` or to a wrapper `<div id="app">` kept for compatibility). Missing this is the single most likely cause of "everything looks slightly off after migration."

**Safest choice for parity:** keep a literal `<div id="app">` wrapper inside `<body>` in `app/layout.tsx` so all `#app` selectors keep matching. Remove it later in Phase 8 if you want.

---

## 6. Decision: keep Chakra UI or drop it?

You asked me to decide. Here it is.

### Verdict: **Keep Chakra UI v2 for the migration. Remove it afterwards, section by section.**

### Why keep it (Phase 1)

- **Compatibility is not a blocker.** Chakra UI v2 (`@chakra-ui/react@2.10.4`) is confirmed by the Chakra maintainer to work with **React 19 and Next.js 16** with no breaking changes. ([chakra-ui discussion #10439](https://github.com/chakra-ui/chakra-ui/discussions/10439))
- **Pixel parity is the stated end goal.** Every `sx`, `_hover`, `Stack spacing`, `Popover` and responsive array prop in the old code maps 1:1. Swapping to Tailwind or Chakra v3 at the same time means re-deriving thousands of style decisions by hand — that is exactly how "AI ne same nahi banaya" happens.
- **Chakra v3 is a rewrite, not an upgrade.** Different component APIs (`Popover`, `Menu`, `Modal` all changed), different styling system, different theme shape. Doing v2→v3 *and* Vite→Next at once doubles the risk for zero parity benefit.

### Why remove it later (Phase 8+)

- **Chakra v2 is Emotion-based CSS-in-JS.** Every Chakra component must be a Client Component (`'use client'`). That means **React Server Components give you nothing** while Chakra is in the tree — no reduction in shipped JS for your FAQ lists, pricing tables, process timelines or blog article bodies, which are 100% static content.
- `chakra-vendor` is **269 KB decoded**, your single biggest chunk.
- Emotion injects 8 `<style>` tags at runtime on every page — main-thread work during hydration, and a known source of hydration mismatch flashes.

### The honest trade-off table

| Path | Visual-parity risk | Time | JS after migration | SEO/AEO/GEO gain |
|---|---|---|---|---|
| **A. Next.js + Chakra v2** ← *do this first* | **Low** | 2–3 weeks | ~700 KB (same) | **Full** — blog gets SSG, all the win |
| B. Next.js + Chakra v3 | High | 4–6 weeks | ~550 KB | Full |
| C. Next.js + Tailwind/CSS Modules | **Very high** | 6–10 weeks | ~150 KB | Full |

**Critical insight:** *the entire SEO/AEO/GEO win comes from Path A.* Dropping Chakra only buys performance, and you can buy that incrementally later without risking the redesign. Do not couple the two.

### De-Chakra priority order (Phase 8+, after the site is live and verified)

Convert these to plain CSS Modules first — they are pure static content, zero interactivity, and become **Server Components shipping 0 KB of JS**:

1. `Faqs` content wrapper (keep only the accordion toggle as a tiny client island)
2. `ProcessTimeline` (7 static steps)
3. Blog article body renderer (biggest single win — 6,400 words × 83 pages)
4. Pricing page tables
5. Footer
6. `Section` / `SectionHeading` / `GlassCard` primitives

Keep Chakra for: header popovers, mobile drawer, forms, modals, carousels.

---

## 7. Target architecture

```
Next.js 16.3.x  (latest stable, released 11 Sep 2026)
React 19.2      (required by Next 16 App Router)
App Router      (not Pages Router)
Turbopack       (default in 16 — no flag needed)
Node 20.9+      (Next 16 minimum)
TypeScript 5.1+
Chakra UI v2.10.4 + @emotion/react + @emotion/styled + framer-motion
Deploy: Vercel (unchanged)
```

### Rendering strategy per route

| Route | Strategy | Why |
|---|---|---|
| `/`, `/about`, `/portfolio`, `/pricing`, `/contact`, `/case-studies`, `/privacy`, `/terms` | **SSG** (static, no `revalidate`) | content is in-repo, never changes at runtime |
| `/service/[slug]` (6) | **SSG** via `generateStaticParams` | same |
| `/nz` `/us` `/au` `/ca` `/ae` `/europe` | **SSG**, six separate route files | bespoke copy per market — **not** a shared template (see §3.3) |
| `/case-studies/[slug]` (6) | **SSG** via `generateStaticParams` | same |
| `/blog` | **ISR**, `revalidate = 600` | list changes when a post is published |
| `/blog/[slug]` | **SSG + ISR**, `revalidate = 3600`, `dynamicParams = true` | ← **the whole point of this migration** |
| `/sitemap.xml` | `app/sitemap.ts` (dynamic, includes API blog slugs) | auto-stays in sync |
| `/robots.txt` | `app/robots.ts` | |
| 404 | `app/not-found.tsx` | keeps the HTTP 404 status |

### Proposed folder structure

```
app/
  layout.tsx                    ← html/body, fonts, providers, announcement bar, header, footer, chat, analytics
  providers.tsx                 ← 'use client' — EmotionRegistry + ChakraProvider (dark locked)
  emotion-registry.tsx          ← 'use client' — useServerInsertedHTML cache
  globals.css                   ← the 23 keyframes + .gradient-text + .form + swiper overrides
  page.tsx                      ← /
  not-found.tsx
  sitemap.ts
  robots.ts
  about/page.tsx
  portfolio/page.tsx
  pricing/page.tsx
  contact/page.tsx
  privacy/page.tsx
  terms/page.tsx
  case-studies/
    page.tsx
    [slug]/page.tsx
  service/
    [slug]/page.tsx
  nz/page.tsx                   ← six separate files, bespoke copy each
  us/page.tsx
  au/page.tsx
  ca/page.tsx
  ae/page.tsx
  europe/page.tsx
  blog/
    page.tsx
    [slug]/page.tsx
components/
  layout/  Header.tsx  Footer.tsx  AnnouncementBar.tsx  ChatBubble.tsx
  ui/      Section.tsx  SectionHeading.tsx  GlassCard.tsx
  home/    Hero.tsx  CompanyStats.tsx  ServicesGrid.tsx  ProcessTimeline.tsx
           ClientsReviews.tsx  AuroraField.tsx  Faqs.tsx  CTASection.tsx
  blog/    BlogCard.tsx  ArticleBody.tsx  TableOfContents.tsx
content/
  services.ts       ← the 6 service page payloads
  markets/          ← one file per market: nz.ts us.ts au.ts ca.ts ae.ts europe.ts
  case-studies.ts   ← the 6 case-study payloads
  site.ts           ← nav, footer, contact details, socials
lib/
  blog.ts           ← typed API client for futurise-backend-main-website
  seo.ts            ← metadata + JSON-LD builders
theme/
  index.ts  colors.ts  fonts.ts  components/…
public/
  fonts/  images/  …
```

---

## PHASE 0 — Read the old codebase (mandatory, no code yet)

> **This phase exists because the previous attempt failed.** The agent must not write a single line of the new app until this phase's deliverable is produced and a human has skimmed it.

### Rules for the agent

1. **You are porting, not designing.** You have no creative licence. If you think something in the old code is ugly, wrong, or could be improved — **port it as-is** and note it in a separate `IMPROVEMENTS-BACKLOG.md`. Zero unrequested changes.
2. **Never invent a value.** If you cannot find a color, spacing, duration, easing or breakpoint in the old code, **stop and ask**. Do not guess "close enough".
3. **Never summarise a file you are about to port.** Read it fully. Truncated reads cause silently dropped sections.
4. **One file at a time.** Do not batch-convert.

### Step 0.1 — Map the repo

Run and record:

```bash
# tree, excluding noise
find . -type f \
  -not -path './node_modules/*' -not -path './.git/*' -not -path './dist/*' \
  | sort

# dependency truth
cat package.json
cat vite.config.* 

# how many components, how big
find src -name '*.jsx' -o -name '*.tsx' -o -name '*.js' | xargs wc -l | sort -n

# every route definition
grep -rn "createBrowserRouter\|<Route\|path:" src/ | head -100

# every place styles live
find src -name '*.css' -o -name '*.scss' -o -name '*.module.*'
```

### Step 0.2 — Answer these questions explicitly, in writing

Fill in a file `MIGRATION-INVENTORY.md` with these sections:

**A. Stack facts**

- [ ] Exact versions: `react`, `react-dom`, `react-router-dom`, `@chakra-ui/react`, `@emotion/react`, `@emotion/styled`, `framer-motion`, `swiper`, and every other runtime dep
- [ ] Is TypeScript used? Partially?
- [ ] What tool produces the pre-rendered HTML today? (`vite-plugin-*`, `react-snap`, `vite-react-ssg`, a custom script, Vercel config?) — **this gets deleted in Phase 1**
- [ ] Where is the `#fs-boot` boot skeleton defined? (it is injected into `index.html`) — **this gets deleted**
- [ ] What is the head/meta mechanism? (`react-helmet-async`? a custom `<Seo>`?) — **replaced by Metadata API**

**B. Routes**

For each of the 27 static routes + `/blog/:slug`: the route path, the component file, and whether it uses any loader/param.

**C. Theme**

Paste the **entire** `extendTheme({...})` object into the inventory, plus:
- [ ] every custom `colors` scale
- [ ] `fonts`, `fontSizes`, `space`, `radii`, `shadows`, `breakpoints` overrides
- [ ] every `components: { Button: {…}, Heading: {…} }` style override with all variants/sizes
- [ ] `styles.global`
- [ ] `config` (colorMode)

**D. Global CSS**

- [ ] Every `.css` file, in load order
- [ ] All `@font-face` blocks (family, weight, style, src path, `font-display`, `unicode-range`)
- [ ] All `@keyframes` — list all 23 by name with their full body
- [ ] Every rule using `#app` — flag each one

**E. Component inventory table**

| File | Exported component | Used on routes | Chakra? | framer-motion? | Swiper? | Browser APIs (`window`, `document`, `localStorage`, `IntersectionObserver`)? | → RSC or `'use client'`? |
|---|---|---|---|---|---|---|---|

The last column is the whole point: **anything touching `window`, `document`, state, effects, event handlers, framer-motion, or any Chakra component is `'use client'`.** Everything else can be a Server Component.

**F. Animation inventory**

| Name | Where defined (CSS keyframe / framer-motion variant) | Component | Trigger (`whileInView`? `animate`? scroll?) | Duration | Easing | Delay / stagger |
|---|---|---|---|---|---|---|

For framer-motion: record the exact `initial` / `animate` / `whileInView` / `transition` / `viewport` objects. These must be copied literally.

**G. Asset inventory**

| Source path | Format | Dimensions | Used by | Above the fold? | → `next/image` `priority`? |
|---|---|---|---|---|---|

Note which assets come from **Cloudinary** (`res.cloudinary.com` is preconnected on the live site) vs local `src/assets/`. Cloudinary hosts need `images.remotePatterns` in `next.config.ts`.

**H. Data & integrations**

- [ ] Blog API base URL, endpoints, response shape (TypeScript interface), auth if any
- [ ] The `…/view` counter endpoint — when is it called?
- [ ] Contact form: which service? Field names are `user_name`, `company`, `user_email`, `phone`, `message` — `user_name`/`user_email` are **EmailJS template defaults**, so verify whether EmailJS is in `package.json`. Record the service ID / template ID / public key env var names.
- [ ] Newsletter form: endpoint
- [ ] Every `VITE_*` env var → must be renamed `NEXT_PUBLIC_*` (client) or plain (server)
- [ ] Analytics: GA4 `G-5FKB0BL3MQ`, Clarity `ycomehde8x`, Vercel Analytics, Vercel Speed Insights

**I. SEO inventory**

For **every** route: exact `<title>`, `<meta name="description">`, canonical, OG tags, Twitter tags, and **every JSON-LD block verbatim**. Do not paraphrase the JSON-LD — copy it.

### 🛑 STOP GATE 0

Do not proceed until `MIGRATION-INVENTORY.md` exists, sections A–I are filled, and a human has read section C, F and I. If the agent says "I have a general understanding of the codebase" — that is a fail. It needs the tables.

---

## PHASE 1 — Scaffold Next.js + providers

### 1.1 Create the project

```bash
npx create-next-app@latest futurise-next \
  --typescript --app --src-dir=false --eslint --no-tailwind --import-alias "@/*"
cd futurise-next
npm i @chakra-ui/react@2 @emotion/react @emotion/styled framer-motion
npm i @vercel/analytics @vercel/speed-insights
# only if the old site uses them:
npm i swiper
```

Verify `next@16.3.x`, `react@19.2.x`.

### 1.2 Emotion SSR registry — **this is the make-or-break file**

Without it, Chakra styles are not in the server HTML → a flash of unstyled content and hydration mismatches. Hand-rolled (no extra dependency, works on Next 16):

```tsx
// app/emotion-registry.tsx
'use client'

import { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'

export default function EmotionRegistry({ children }: { children: React.ReactNode }) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: 'chakra' })
    cache.compat = true
    const prevInsert = cache.insert
    let inserted: string[] = []
    cache.insert = (...args) => {
      const serialized = args[1]
      if (cache.inserted[serialized.name] === undefined) inserted.push(serialized.name)
      return prevInsert(...args)
    }
    const flush = () => {
      const prev = inserted
      inserted = []
      return prev
    }
    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const names = flush()
    if (names.length === 0) return null
    let styles = ''
    for (const name of names) styles += cache.inserted[name]
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    )
  })

  return <CacheProvider value={cache}>{children}</CacheProvider>
}
```

> Chakra's own docs suggest `CacheProvider` from `@chakra-ui/next-js`. The hand-rolled version above has no extra dependency and no risk of that package lagging behind Next 16. Use it.

### 1.3 Providers

```tsx
// app/providers.tsx
'use client'

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import EmotionRegistry from './emotion-registry'
import theme from '@/theme'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <EmotionRegistry>
      <ColorModeScript initialColorMode="dark" type="cookie" />
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </EmotionRegistry>
  )
}
```

Theme config **must** be:

```ts
config: { initialColorMode: 'dark', useSystemColorMode: false }
```

### 1.4 Root layout — keep `#app` for CSS compatibility

```tsx
// app/layout.tsx
import './globals.css'
import { Providers } from './providers'
import { zangezi, aeonik } from '@/theme/fonts'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${zangezi.variable} ${aeonik.variable}`} data-scroll-behavior="smooth">
      <body>
        {/* keeps every legacy `#app ...` CSS selector matching */}
        <div id="app">
          <Providers>
            <AnnouncementBar />
            <Header />
            <main>{children}</main>
            <Footer />
            <ChatBubble />
          </Providers>
        </div>
      </body>
    </html>
  )
}
```

> `data-scroll-behavior="smooth"` is a **Next 16 change**: Next no longer overrides `scroll-behavior` during navigation unless you set this attribute. Without it, if the old site had `scroll-behavior: smooth`, route changes will animate-scroll instead of jumping. ([Next 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16))

### 1.5 `next.config.ts`

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      // add the blog API's image host here
    ],
    // Next 16 defaults changed — restore what you need:
    qualities: [75, 90],          // default is now only [75]
    minimumCacheTTL: 14400,       // default changed 60s → 4h
  },
}

export default nextConfig
```

### 🛑 STOP GATE 1

`npm run dev` boots. A single Chakra `<Button>` in `app/page.tsx` renders **with its styles present in "View Source"** (not just after hydration). No hydration warnings in console. Background is `#08080d`.

---

## PHASE 2 — Theme, fonts, global CSS, keyframes

### 2.1 Fonts with `next/font/local`

```ts
// theme/fonts.ts
import localFont from 'next/font/local'

export const zangezi = localFont({
  src: [
    { path: '../public/fonts/Zangezi08-Regular.woff2', weight: '400', style: 'normal' },
    // ...one entry per weight found in Phase 0 section D
  ],
  variable: '--font-zangezi',
  display: 'swap',
  preload: true,
})

export const aeonik = localFont({
  src: [ /* ... */ ],
  variable: '--font-aeonik',
  display: 'swap',
  preload: true,
})
```

Then in the Chakra theme:

```ts
fonts: {
  heading: `var(--font-zangezi), var(--font-aeonik), -apple-system, system-ui, sans-serif`,
  body:    `var(--font-aeonik), -apple-system, system-ui, sans-serif`,
}
```

**Remove the old `@font-face` blocks from `globals.css`** — `next/font` generates them. Keeping both causes a double download.

⚠️ After this step, **measure `h1` letter-spacing again**. It must still compute to `-2.16px` at 72px. `next/font` adds a fallback-metrics adjustment that can shift things.

### 2.2 Port the theme

Copy the `extendTheme` object from Phase 0 section C **verbatim** into `theme/index.ts`. Change only the `fonts` values (to the CSS variables above). Change nothing else.

### 2.3 `globals.css`

Port, in this order:

1. The 23 `@keyframes` — **minus** the five `fs-*` ones (boot skeleton, no longer needed)
2. `.gradient-text`
3. `.form`, `.form input`, `.form textarea`, `:focus`, `::placeholder`
4. Swiper overrides (`.swiper-button-next/prev`, `::after`, `.swiper-pagination-bullet`, `-active`) — **plus** the Swiper base CSS import if Swiper is used
5. Any `#app` rules — they keep working because of the `<div id="app">` wrapper

### 🛑 STOP GATE 2

Open a scratch page rendering an `h1`, `h2`, and a body `p`. Compare computed styles against the live site with DevTools side by side:
`font-family`, `font-size`, `font-weight`, `letter-spacing`, `line-height`, `color`. **All six must match exactly on all three elements.**

---

## PHASE 3 — Layout shell

Port in this order, one component per commit, verifying each:

1. `AnnouncementBar` — marquee, `announcement-scroll` keyframe, exact copy text
2. `Header` — `'use client'`. Logo, 8 nav items, two Chakra `Popover` mega-menus (Services, Case Studies), "Book appointment" CTA, mobile hamburger + drawer
3. `Footer` — 5 link groups + newsletter + legal row
4. `ChatBubble` — `'use client'`, floating bottom-right

### Router migration rules (mechanical, apply everywhere)

| React Router (old) | Next.js App Router (new) |
|---|---|
| `import { Link } from 'react-router-dom'` | `import Link from 'next/link'` |
| `<Link to="/about">` | `<Link href="/about">` |
| `<NavLink className={({isActive}) => …}>` | `const pathname = usePathname()` + manual active check |
| `useNavigate()` → `navigate('/x')` | `useRouter()` from `next/navigation` → `router.push('/x')` |
| `useParams()` | `params` prop (**now a Promise** — `const { slug } = await params`) |
| `useSearchParams()` from RRD | `useSearchParams()` from `next/navigation` (wrap in `<Suspense>`) |
| `useLocation().pathname` | `usePathname()` from `next/navigation` |
| `<Outlet />` | nested `layout.tsx` `{children}` |
| `<Navigate to="/x" replace />` | `redirect('/x')` from `next/navigation` |

**Chakra + Next Link:** use `as`, not nesting:

```tsx
import NextLink from 'next/link'
import { Link as ChakraLink } from '@chakra-ui/react'

<ChakraLink as={NextLink} href="/about" _hover={{ color: 'brand.400' }}>About</ChakraLink>
```

Never write `<Link href><a></a></Link>` — that renders nested anchors.

### 🛑 STOP GATE 3

Screenshot the header (desktop + 390 px mobile) and the footer on old vs new. Open both Popovers. **Diff must be < 1%** (see verification protocol).

---

## PHASE 4 — Shared components

Port each, verify each, commit each:

`Section` → `SectionHeading` → `GlassCard` → `AuroraField` → `CompanyStats` → `ProcessTimeline` → `Faqs` → `ClientsReviews` → `CTASection` → `BlogCard` → `market-reach`

### Rules

- **`'use client'` at the top of every file that uses Chakra components, framer-motion, hooks, or event handlers.** Chakra v2 is client-only. Do not fight this in Phase 4.
- **framer-motion props are copied literally.** `initial`, `animate`, `whileInView`, `viewport`, `transition` — every number, every easing array. A changed easing is a parity failure you will not notice in a screenshot but will feel on scroll.

  > ## ⛔ CORRECTED — the easing in the original example was not a real value.
  >
  > **Use `MIGRATION-INVENTORY.md` §F.1 — it has all 19 transition objects verbatim.**
  >
  > The original text illustrated this rule with `ease: [0.16,1,0.3,1]`. **That value
  > appears nowhere in this codebase** and was an invented example that reads like a
  > measurement. Copying it would silently change the feel of every animation on the site.
  >
  > The real signature curve, in 11 of the 19 transitions and in every CSS `transition`
  > prop in the theme and `GlassCard`:
  >
  > ```
  > framer-motion:   ease: [0.22, 1, 0.36, 1]
  > CSS:             cubic-bezier(0.22,1,0.36,1)
  > ```
  >
  > Also note `viewport` is **not** uniformly `{ once: true, amount: 0.3 }` — `Reveal`
  > uses `amount: 0.2`, `VisualBand` uses `0.15` and `0.4`, `LatestBlogs` uses
  > `margin: "-80px"`. Take each from the inventory table, not from this example.
- **Counters (`CompanyStats`)** likely use `IntersectionObserver` + `requestAnimationFrame`. Guard with `typeof window !== 'undefined'` and keep it client-side.
- **Swiper** — ⛔ **CORRECTED: Swiper is not used. Do not install it.**

  > **See `MIGRATION-INVENTORY.md` §0.9 and §A.1.** `swiper@^11.1.4` is in
  > `package.json` and the four `.swiper-*` override rules are in `src/index.css`, but
  > **zero files import it** and zero `.swiper` elements render on the live site. Same for
  > `leaflet` / `react-leaflet` — replaced by the hand-drawn SVG `WorldReachMap.jsx`.
  >
  > Install neither. Delete the orphaned `.swiper-*` CSS rules and log it in
  > `IMPROVEMENTS-BACKLOG.md`. Trap #13 below (about Swiper CSS) is likewise void.
  >
  > **The real carousels are `react-fast-marquee`** (`Partners` speed 40, `OurProjects`
  > speed 36, `ClientsReviews` speed 34 — all `gradient={false} pauseOnHover`). Which
  > also voids the "marquees are CSS-only, do not reimplement in JS" note below: they
  > are a JS library today and must stay one.
- **Marquees** (`scroll` keyframe) are CSS-only — port the CSS, do not reimplement in JS.

### 🛑 STOP GATE 4

A scratch page stacking all 11 components renders identically to the corresponding sections on the live homepage.

---

## PHASE 5 — Static pages, one at a time

**Order** (easiest → hardest, so problems surface cheap):

`/privacy` → `/terms` → `/pricing` → `/about` → `/portfolio` → `/case-studies` → `/case-studies/[slug]` → `/service/[slug]` → `/nz` → `/us` → `/au` → `/ca` → `/ae` → `/europe` → `/contact` → `/` (home last, it is the heaviest)

> The six geo pages are the **most dangerous** step — 21,500 words of unique copy. Port them **one page per commit**, and after each one run a word-count check against the live page (see Appendix A for expected counts). A page that comes out 40% shorter has lost content.

### Templated routes

```tsx
// app/service/[slug]/page.tsx
import { services } from '@/content/services'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return services.map(s => ({ slug: s.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: PageProps<'/service/[slug]'>) {
  const { slug } = await params            // ← params is a Promise in Next 16
  const s = services.find(x => x.slug === slug)
  if (!s) return {}
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `https://www.futurisesolutions.com/service/${slug}` },
    openGraph: { /* … */ },
  }
}

export default async function Page({ params }: PageProps<'/service/[slug]'>) {
  const { slug } = await params
  const s = services.find(x => x.slug === slug)
  if (!s) notFound()
  return <ServicePageTemplate data={s} />
}
```

Do the same for `app/case-studies/[slug]/page.tsx`.

**Do NOT do this for the geo pages.** They get six plain `page.tsx` files with their own content modules — see §3.3.

> `params` being a Promise is a **Next 16 hard requirement** — synchronous access was removed. ([upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16))

### Content extraction

Move every page's copy out of JSX into `content/*.ts` as typed objects. Two reasons: the six-page templates become one file, and content edits stop requiring component changes. **Copy the strings character-for-character** — including the curly quotes (`'`, `"`) and em dashes (`—`) the site uses heavily.

### Images

```tsx
import Image from 'next/image'
import heroAtmosphere from '@/public/images/hero-atmosphere.avif'

<Image
  src={heroAtmosphere}
  alt="…"
  priority              // ONLY for the LCP image, once per page
  sizes="100vw"
/>
```

- Local imports give Next the intrinsic dimensions → **fixes all 71 missing width/height** automatically
- `priority` on exactly one image per page (the LCP element). On `/` that is the hero.
- Everything else: default lazy loading, `sizes` set to the real rendered width, e.g. `sizes="(max-width: 768px) 100vw, 400px"`
- `fill` + a positioned parent for background-style images

### Forms (`/contact`)

Keep the existing provider (EmailJS or whatever Phase 0 found). Just:
- `'use client'` on the form component
- Move keys to `NEXT_PUBLIC_*` env vars
- **Do not change the field names** — `user_name`, `company`, `user_email`, `phone`, `message` map to the provider's template. Renaming them silently breaks the emails.

### 🛑 STOP GATE 5

Every one of the 27 static routes resolves, at the same path, and passes the pixel-diff protocol at 390 / 768 / 1440 px.

---

## PHASE 6 — Blog (the biggest win)

This is the phase that pays for the entire migration.

### 6.1 Typed API client

> ## ⛔ CORRECTED — the `BlogPost` type below is invented and does not match the API.
>
> **Use `MIGRATION-INVENTORY.md` §H.1 for the real shape.** Using the type below renders
> blank titles, dates and images, because none of these field names exist:
>
> | Guide (wrong) | Real API field |
> |---|---|
> | `description` | **`shortDescription`** |
> | `publishedAt` | **`createdAt`** (`publishedAt` exists only in `middleware.js`) |
> | `coverImage` | **`featuredImage`** (relative path OR absolute — run through `mediaUrl()`) |
> | `readingTime` | **computed**, not stored — `readTime()` in `src/utils/blog.js`, ~200 wpm |
>
> `content` is **Markdown** (answering the guide's own "confirm:" note). Meta fields live
> under a nested `meta: { metaTitle, metaDescription, metaKeywords, ogType, robots }`.
> List endpoints return `T[]` **or** `{ blogs: T[] }` **or** `{ data: T[] }` — normalise
> with `toBlogArray()`. Detail returns `T` **or** `{ blog: T }` **or** `[T]`.
>
> There is **no `/view` counter endpoint** — see §6.3 below, also corrected.

```ts
// lib/blog.ts
const API = process.env.BLOG_API_BASE!   // https://futurise-backend-main-website.vercel.app/api

// ⛔ WRONG — see the correction above. Real shape is in MIGRATION-INVENTORY.md §H.1.
export type BlogPost = {
  slug: string
  title: string
  description: string
  category: string
  publishedAt: string
  updatedAt?: string
  coverImage?: string
  author?: { name: string; avatar?: string }
  content: string           // confirm: HTML? Markdown? blocks? ← Phase 0 section H
  readingTime?: number
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const res = await fetch(`${API}/blogs`, { next: { revalidate: 600, tags: ['blog-list'] } })
  if (!res.ok) throw new Error(`blog list ${res.status}`)
  return res.json()
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  const res = await fetch(`${API}/blogs/${slug}`, { next: { revalidate: 3600, tags: [`blog-${slug}`] } })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`blog ${slug} ${res.status}`)
  return res.json()
}
```

### 6.2 The post page

```tsx
// app/blog/[slug]/page.tsx
import { getAllPosts, getPost } from '@/lib/blog'
import { notFound } from 'next/navigation'

export const revalidate = 3600
export const dynamicParams = true      // new posts work before the next build

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<'/blog/[slug]'>) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://www.futurisesolutions.com/blog/${slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default async function Page({ params }: PageProps<'/blog/[slug]'>) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(post)) }}
      />
      <ArticleBody post={post} />     {/* Server Component — ships 0 KB JS */}
    </>
  )
}
```

**`ArticleBody` must be a Server Component.** 6,400 words × 83 posts rendered on the server with zero client JS is the single biggest performance and AEO win available. Do not put `'use client'` on it. If it currently uses Chakra components, replace those with plain elements + CSS Modules **for this component only** — it is worth the parity risk here, and the blog body is visually simple (headings, paragraphs, lists, images, code).

Keep as small client islands: the table of contents scroll-spy, the share buttons, the view counter.

### 6.3 View counter

> ## ⛔ CORRECTED — THIS ENDPOINT DOES NOT EXIST. Drop it from the plan.
>
> **See `MIGRATION-INVENTORY.md` §0.8 and §H.1.**
>
> There is no `/view` call anywhere in the codebase. `src/api/blogs.js` defines exactly
> eight endpoints and none of them is a view counter. Do not build one — that would be a
> new feature, not a port.

*(original, incorrect)* The old site POSTs to `…/blogs/<slug>/view` on mount. Keep that as a tiny `'use client'` component with a `useEffect`, or move it to a Route Handler. **Do not let it block rendering.**

### 6.4 Delete the boot skeleton

`#fs-boot` and the `fs-chev` / `fs-fill` / `fs-word` / `fs-breathe` / `fs-sweep` keyframes exist only because blog pages had nothing to show. With SSR there is nothing to wait for. Delete them.

### 🛑 STOP GATE 6

```bash
npm run build && npm start
curl -s http://localhost:3000/blog/<any-slug> | grep -c "<h2"
```
Must return **> 0**. Then:
```bash
curl -s http://localhost:3000/blog/<any-slug> | wc -w
```
Must be in the thousands. If it is under 200, the article is still client-rendered and Phase 6 has failed.

---

## PHASE 7 — SEO / AEO / GEO layer

### 7.1 Metadata

Delete the old `<Seo>` component entirely. Use the Metadata API.

```ts
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://www.futurisesolutions.com'),
  title: {
    default: 'AI, SaaS & Web App Development Company | Futurise Solutions',
    template: '%s | Futurise Solutions',
  },
  description: '…',
  alternates: { canonical: '/' },
  openGraph: { siteName: 'Futurise Solutions', locale: 'en_NZ', type: 'website' },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true, googleBot: { 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
}
```

⚠️ **Titles must match the current ones character-for-character** (see the table in §3.1). These pages already rank; changing titles resets that.

> ## ⛔ CORRECTED — do NOT use a `title.template` anywhere. It will rewrite 6 ranking pages.
>
> **See `MIGRATION-INVENTORY.md` §A.5 and §I.6.**
>
> `Seo.jsx` applies a **60-character rule**: the brand suffix is appended only if the
> result fits in 60 chars, and never if the title already contains "Futurise Solutions".
>
> ```js
> const TITLE_LIMIT = 60;
> const withBrand = `${title} | ${SITE_NAME}`;
> const fullTitle = !title ? SITE_NAME
>   : title.includes(SITE_NAME) ? title
>   : withBrand.length <= TITLE_LIMIT ? withBrand
>   : title;
> ```
>
> **All six `/service/*` pages exceed 60 chars with the suffix and therefore ship
> without it today.** `/about` and `/privacy` already contain the brand and also ship
> without a second copy. A `template: '%s | Futurise Solutions'` appends it to all of
> them — silently changing eight live, ranking titles.
>
> **Rule: every page gets `title: { absolute: '...' }`** with the exact string production
> serves today. No template at any level. Verify all 28 against production with `curl`
> before Phase 7 closes.

### 7.2 JSON-LD

Port every block from Phase 0 section I **verbatim** into `lib/seo.ts` builders. Render as `<script type="application/ld+json">` inside the Server Component. Count check after migration:

| Route group | Expected blocks |
|---|---|
| `/` | 3 |
| `/about` | 3 |
| `/blog` | 4 |
| `/service/*` | 4 (graph + Service + BreadcrumbList + FAQPage) |
| geo pages | 5 (graph + WebPage + ProfessionalService + FAQPage + BreadcrumbList) |
| `/case-studies/*` | 3 |
| `/privacy`, `/terms` | 2 |
| `/blog/[slug]` | **1 today → add `Article` + `BreadcrumbList` = 3** |

### 7.3 `sitemap.ts` / `robots.ts`

```ts
// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { services } from '@/content/services'
import { markets } from '@/content/markets'      // [{ slug: 'nz' }, { slug: 'us' }, …]
import { caseStudies } from '@/content/case-studies'

const BASE = 'https://www.futurisesolutions.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()
  return [
    { url: BASE, priority: 1.0, changeFrequency: 'weekly' },
    ...['about','portfolio','pricing','blog','contact','case-studies','privacy','terms']
      .map(p => ({ url: `${BASE}/${p}`, priority: 0.8 as const })),
    ...services.map(s => ({ url: `${BASE}/service/${s.slug}`, priority: 0.9 as const })),
    ...markets.map(m => ({ url: `${BASE}/${m.slug}`, priority: 0.8 as const })),
    ...caseStudies.map(c => ({ url: `${BASE}/case-studies/${c.slug}`, priority: 0.7 as const })),
    ...posts.map(p => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt ?? p.publishedAt),
      priority: 0.6 as const,
    })),
  ]
}
```

Final count must be **≥ 110**.

### 7.4 AEO / GEO specifics (this is what you asked about)

Answer-engine and generative-engine crawlers (GPTBot, PerplexityBot, ClaudeBot, Google-Extended) largely **do not run JavaScript**. Everything below only works because of Phase 6.

- [ ] **Server-rendered article HTML** — done in Phase 6. Nothing else on this list matters without it.
- [ ] **Semantic markup in articles**: real `<article>`, `<h2>`/`<h3>` hierarchy, `<ol>`/`<ul>`, `<table>` for comparisons. AI engines extract structure, not divs.
- [ ] **Answer-first paragraphs**: the first 40–60 words under each `<h2>` should answer that heading directly. Your existing content largely does this already — preserve it, don't reflow it.
- [ ] **`Article` JSON-LD** on all 83 posts with `author`, `datePublished`, `dateModified`, `publisher`.
- [ ] **`FAQPage` JSON-LD** — already on service/geo/pricing. Add it to blog posts that have a Q&A section.
- [ ] **`speakable`** schema on key answer paragraphs (optional, low cost).
- [ ] **`llms.txt`** at the site root — a plain-text index of your highest-value URLs with one-line summaries. Cheap, and increasingly read by generative engines. Serve via `app/llms.txt/route.ts`.
- [ ] **`robots.txt`**: explicitly allow `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `CCBot` *if* you want citation traffic. This is a business decision — being crawled means being quoted, and also being trained on. Decide deliberately; do not leave it to a default.
- [ ] **Internal linking**: every blog post should link to its parent `/service/*` page and one `/case-studies/*`. Service pages already link to 4 blog posts ("Questions worth answering before you brief anyone") — mirror that in reverse.
- [ ] **`dateModified` must be real.** Generative engines weight freshness heavily and 83 posts with a fake or missing modified date get discounted.
- [ ] **Breadcrumbs** rendered visually *and* as `BreadcrumbList` JSON-LD on every non-home page.

### 🛑 STOP GATE 7

For all 110 URLs, compare old vs new: `<title>`, meta description, canonical, and JSON-LD `@type` list. Script it:

```bash
for url in $(cat urls.txt); do
  echo "=== $url"
  curl -s "https://www.futurisesolutions.com$url" | grep -o '<title>[^<]*' 
  curl -s "http://localhost:3000$url"            | grep -o '<title>[^<]*'
done
```
Any mismatch is either an intentional improvement (log it) or a bug (fix it).

---

## PHASE 8 — Performance pass

Only start this **after** Phase 7 passes. Never mix performance work with parity work.

### 8.1 Baseline vs target

| Metric | Now (measured / estimated) | Target |
|---|---|---|
| Decoded JS, `/` | ~761 KB | < 400 KB |
| Decoded JS, `/blog/[slug]` | ~914 KB (two app bundles!) | **< 150 KB** |
| Images without dimensions, `/` | 71 | 0 |
| Images without alt | 4 | 0 |
| Article HTML word count | 0 | 6,000+ |
| Lighthouse mobile perf | *run PSI for the baseline* | ≥ 90 |

### 8.2 Actions, in order of payoff

1. **The double bundle is already fixed** by moving to Next's route-based splitting — `/blog/<slug>` will no longer load `HomePage` and `CompanyStats`. Verify in DevTools.
2. **De-Chakra the blog article body** (Phase 6 already did this) → removes 269 KB of Chakra from the highest-traffic route type.
3. **Lazy-load below-fold heavy components:**
   ```tsx
   const ClientsReviews = dynamic(() => import('@/components/home/ClientsReviews'))
   const AuroraField    = dynamic(() => import('@/components/home/AuroraField'), { ssr: false })
   ```
4. **Defer third-party scripts** — all four are render-blocking-ish today:
   ```tsx
   import Script from 'next/script'
   <Script src="https://www.googletagmanager.com/gtag/js?id=G-5FKB0BL3MQ" strategy="afterInteractive" />
   <Script id="clarity" strategy="lazyOnload">{`…ycomehde8x…`}</Script>
   ```
   Vercel Analytics + Speed Insights: use `@vercel/analytics/next` and `@vercel/speed-insights/next`.
5. **Font subsetting.** Zangezi Regular alone is 41 KB. Subset to Latin + the punctuation the site actually uses (`—`, `'`, `"`, `·`, `→`, `✓`). Expect 41 KB → ~12 KB. Use `glyphhanger` or `pyftsubset`.
6. **`next/image` everywhere** → AVIF/WebP negotiation + `srcset` + correct dimensions. Expect the 260 KB of homepage images to drop 40–60% on mobile.
7. **Enable the React Compiler** (stable in Next 16) once everything is green:
   ```ts
   // next.config.ts
   reactCompiler: true
   ```
   Auto-memoizes components. Build times go up; runtime re-renders go down.
8. **Consider `cacheComponents: true`** (Next 16's PPR successor) *only after* the site is stable. It surfaces build errors for uncached data outside `<Suspense>` and is a real migration of its own. Not for cutover week.

### 8.3 Progressive de-Chakra (ongoing, post-launch)

Follow the priority order in §6. After each conversion, re-run the pixel-diff protocol. Target: get `/` under 300 KB JS within a quarter.

---

## PHASE 9 — Cutover, redirects, rollback

### 9.1 Redirects

Every path stays identical, so **you should need almost no redirects.** Verify anyway:

```ts
// next.config.ts
async redirects() {
  return [
    // only add entries for paths that genuinely changed
    // + trailing-slash normalisation if the old build served both
  ]
}
```

Check whether the current site serves `/about/` (with slash) as 200 or 301. Match that behaviour via `trailingSlash` in `next.config.ts`.

### 9.2 Pre-flight checklist

- [ ] All 110 sitemap URLs return **200** on the new build
- [ ] `/zzz-not-found` returns **404** (not 200 with a 404-looking page)
- [ ] `robots.txt` and `sitemap.xml` resolve
- [ ] Contact form sends a real test email
- [ ] Newsletter signup writes a real test record
- [ ] GA4 realtime shows the new deployment
- [ ] Clarity records a session
- [ ] Blog view counter increments
- [ ] Every env var set in Vercel for **Production**, not just Preview
- [ ] `BLOG_API_BASE` reachable from the Vercel build environment (it is, both are on Vercel)
- [ ] Font licences resolved (see §2 warning)

### 9.3 Cutover

1. Deploy the Next.js app to a **preview** domain first. Let it sit 48 h.
2. Run the full pixel-diff protocol against production one final time.
3. Point the domain. Keep the old Vite deployment alive and reachable at a preview URL.
4. In Google Search Console: submit the sitemap again, then **URL-inspect 5 blog posts** and request indexing. Watch "Crawled – currently not indexed" drop over 2–4 weeks.
5. Watch Vercel Speed Insights for 7 days — real-user CWV, not lab numbers.

### 9.4 Rollback

One DNS/domain-assignment change back to the old deployment. Keep it available for 30 days. Do not delete the old repo until the blog posts are confirmed indexed.

---

## Resolution checks — what computed style will not tell you

> **Added 19 Sep 2026 after a Phase 2 finding. Run these on every route from Phase 3
> onward, alongside the pixel diff. Script: `scripts/resolution-checks.mjs`.**

`getComputedStyle` reports what was **requested**, not what the renderer **used**. A page
can pass a complete computed-style comparison while rendering in the wrong typeface,
animating nothing, faking a bold, and 404-ing its images.

### The canonical example (Phase 2, real)

Porting `#app { font-family: 'Aeonik Trial', 'Inter', sans-serif }` verbatim broke **all
body text**. `next/font` renames families to hashed identifiers, so the literal string
matched nothing and the cascade fell through `'Inter'` (never loaded) to plain `sans-serif`.

| | production `<p>` | broken port `<p>` |
|---|---|---|
| `getComputedStyle().fontFamily` | `"Aeonik Trial", Inter, sans-serif` | `"Aeonik Trial", Inter, sans-serif` ← **identical** |
| **CDP `CSS.getPlatformFontsForNode`** | `AeonikTRIAL-Regular` (`isCustomFont: true`) | **`ArialMT`** (`isCustomFont: false`) |

The computed-style check passed. The page was rendering in Arial.

### The four properties that lie

| Property | Lies by |
|---|---|
| `font-family` | returning the requested stack even when nothing in it resolved |
| `font-weight` | returning `700` even when only a 400 face exists — the browser synthesises |
| `animation-name` | returning the name even when **no `@keyframes` rule of that name exists** |
| `background-image` | returning the `url()` even when the asset 404s |

> ⚠️ **Phase 4 ports 31 keyframes.** One mistyped or dropped name still reads correct in
> computed style and silently animates nothing — the Arial bug, thirty-one times over.
> This is why check 1 is mandatory from Phase 3 on.

### The checks

```js
// 1. Every animation-name in use resolves to a real @keyframes rule
const declared = new Set()
for (const ss of document.styleSheets) {
  try { for (const r of ss.cssRules) if (r instanceof CSSKeyframesRule) declared.add(r.name) } catch {}
}
const used = new Set()
document.querySelectorAll('*').forEach(el => {
  const n = getComputedStyle(el).animationName
  if (n && n !== 'none') n.split(',').forEach(x => used.add(x.trim()))
})
const unresolved = [...used].filter(n => !declared.has(n))   // must be []

// 2. Animated elements actually have running animations
//    (catches a keyframe that exists but never triggers)
document.querySelectorAll('*').forEach(el => { /* el.getAnimations().length > 0 */ })

// 3. No synthesised weights or styles — a real face exists for each combination
document.fonts.check('700 16px Zangezi')              // must be true
document.fonts.check('italic 400 16px "Aeonik Trial"')

// 3b. Which face the RENDERER actually chose — the check that caught the Arial bug
//     CDP: CSS.getPlatformFontsForNode → { postScriptName, isCustomFont, glyphCount }

// 4. No broken assets
performance.getEntriesByType('resource').filter(r => r.responseStatus >= 400)
```

Report each as part of every gate, alongside the pixel diff.

### Retroactive fix to STOP GATE 2

Phase 2 was the only phase with **no visual check**, because there is no page to
screenshot yet — so a computed-style comparison had to carry weight it cannot bear. That
is the structural reason this hole existed.

**Gate 2 therefore also renders a type specimen** — `h1`, `h2`, a body paragraph, an
italic run and a bold run, using the same strings as production — and pixel-diffs it
against those strings rendered on the live site. Same thresholds as any other diff.

*(Not re-run for the original Phase 2 sign-off: the fix was already proven by CDP face
inspection, which is strictly stronger evidence than a pixel diff for this failure mode.
The specimen step is recorded here so it runs if fonts ever change again.)*

---

## Pixel-parity verification protocol

Screenshot diffing is not optional. "Looks the same to me" is how the previous attempt failed.

### Setup

```bash
npm i -D playwright pixelmatch pngjs
npx playwright install chromium
```

### Script

```js
// scripts/visual-diff.mjs
import { chromium } from 'playwright'
import pixelmatch from 'pixelmatch'
import { PNG } from 'pngjs'
import fs from 'fs'

const ROUTES = [
  '/', '/about', '/portfolio', '/pricing', '/blog', '/contact', '/case-studies',
  '/service/web-development', '/service/app-development', '/service/ui-ux-design',
  '/service/blockchain-development', '/service/ai-ml-solutions', '/service/digital-marketing',
  '/case-studies/ai-support-agent', '/case-studies/saas-platform-scale',
  '/case-studies/real-estate-app', '/case-studies/fintech-ux-redesign',
  '/case-studies/defi-protocol-launch', '/case-studies/saas-seo-growth',
  '/nz', '/us', '/au', '/ca', '/ae', '/europe', '/privacy', '/terms',
]
const VIEWPORTS = [
  { name: 'mobile',  width: 390,  height: 844 },
  { name: 'tablet',  width: 768,  height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
]
const OLD = 'https://www.futurisesolutions.com'
const NEW = 'http://localhost:3000'

const browser = await chromium.launch()
const results = []

for (const vp of VIEWPORTS) {
  for (const route of ROUTES) {
    const shots = {}
    for (const [label, base] of [['old', OLD], ['new', NEW]]) {
      const page = await browser.newPage({ viewport: vp, deviceScaleFactor: 1 })
      // freeze animations so diffs are deterministic
      await page.addStyleTag({ content: `*,*::before,*::after{
        animation-duration:0s!important;animation-delay:0s!important;
        transition-duration:0s!important;transition-delay:0s!important;
        animation-iteration-count:1!important;caret-color:transparent!important}` })
      await page.goto(base + route, { waitUntil: 'networkidle' })
      await page.evaluate(async () => {           // force all lazy images to load
        await new Promise(r => { let t = 0
          const i = setInterval(() => { window.scrollBy(0, 400); t += 400
            if (t > document.body.scrollHeight) { clearInterval(i); window.scrollTo(0,0); r() } }, 40) })
      })
      await page.waitForTimeout(1500)
      shots[label] = await page.screenshot({ fullPage: true })
      await page.close()
    }
    const a = PNG.sync.read(shots.old), b = PNG.sync.read(shots.new)
    if (a.width !== b.width || a.height !== b.height) {
      results.push({ route, vp: vp.name, status: 'SIZE MISMATCH', a: `${a.width}x${a.height}`, b: `${b.width}x${b.height}` })
      continue
    }
    const diff = new PNG({ width: a.width, height: a.height })
    const n = pixelmatch(a.data, b.data, diff.data, a.width, a.height, { threshold: 0.1 })
    const pct = (n / (a.width * a.height) * 100).toFixed(3)
    fs.mkdirSync('diffs', { recursive: true })
    if (n > 0) fs.writeFileSync(`diffs/${vp.name}${route.replace(/\//g,'_')}.png`, PNG.sync.write(diff))
    results.push({ route, vp: vp.name, diffPct: pct, status: pct < 0.5 ? 'PASS' : 'FAIL' })
  }
}
await browser.close()
console.table(results)
```

### Pass criteria

| Diff | Verdict |
|---|---|
| < 0.5 % | PASS |
| 0.5 – 2 % | Investigate — usually font rendering or a lazy image that didn't load |
| > 2 % | FAIL — fix before continuing |
| Size mismatch | FAIL — a section is missing or duplicated |

Run this at **every STOP GATE from Phase 3 onward**, not just at the end.

---

## Acceptance criteria

The migration is done when **all** of these are true:

**Parity**
- [ ] All 27 static routes: visual diff < 0.5 % at 390 / 768 / 1440 px
- [ ] Header, footer, both mega-menus, mobile drawer: identical
- [ ] All 23 animations present and running at the same duration/easing
- [ ] `h1` computes to Zangezi / 72px / 700 / −2.16px tracking on desktop
- [ ] `body` background is exactly `#08080d`
- [ ] Hover states on nav, buttons and cards match

**Function**
- [ ] Contact form sends
- [ ] Newsletter subscribes
- [ ] Blog list paginates/filters as before
- [ ] Blog view counter increments
- [ ] Chat bubble opens
- [ ] All 110 URLs return 200; unknown paths return 404

**SEO / AEO / GEO**
- [ ] `curl` of any blog post shows the full article in HTML (this is the headline result)
- [ ] All 110 titles + descriptions match or are deliberately improved (logged)
- [ ] JSON-LD block counts match §7.2, plus `Article` added to blog posts
- [ ] `sitemap.xml` ≥ 110 URLs, generated dynamically
- [ ] `llms.txt` published
- [ ] Canonical on every page, absolute URL, `www` included

**Performance**
- [ ] Lighthouse mobile ≥ 90 on `/`, `/service/web-development`, `/blog/<post>`
- [ ] Blog post route ships < 150 KB JS
- [ ] Zero images without width/height
- [ ] Zero images without alt
- [ ] CLS < 0.1, LCP < 2.5 s, INP < 200 ms in Vercel Speed Insights after 7 days

---

## Known traps that will break parity

| # | Trap | Fix |
|---|---|---|
| 1 | **`#app` CSS rules stop matching** — Vite's root id doesn't exist in Next | Keep `<div id="app">` in `layout.tsx` (Phase 1.4) |
| 2 | **Emotion styles missing from server HTML** → FOUC + hydration mismatch | The `EmotionRegistry` in Phase 1.2. Non-negotiable. |
| 3 | **Light mode leaks in** | `initialColorMode: 'dark'`, `useSystemColorMode: false`, `<ColorModeScript>` |
| 4 | **`next/font` changes letter-spacing** | Re-measure `h1` after Phase 2. Adjust `adjustFontFallback` if needed. |
| 5 | **Double font loading** — old `@font-face` left in `globals.css` alongside `next/font` | Delete the old blocks |
| 6 | **`params` accessed synchronously** — removed in Next 16 | `const { slug } = await params` everywhere |
| 7 | **`revalidateTag('x')` with one argument** — deprecated in Next 16 | `revalidateTag('x', 'max')` |
| 8 | **`middleware.ts`** — renamed to `proxy.ts` in Next 16 | Rename file and the exported function |
| 9 | **Smooth scroll behaves differently on navigation** | `data-scroll-behavior="smooth"` on `<html>` |
| 10 | **`images.qualities` default is now `[75]` only** | Declare the qualities you actually use |
| 11 | **Nested anchors** from `<Link><ChakraLink>` | Use `<ChakraLink as={NextLink}>` |
| 12 | **`window`/`document` in a Server Component** → build error | Mark `'use client'` or guard with `typeof window !== 'undefined'` |
| 13 | **Swiper CSS missing** | Import `swiper/css` etc. in `globals.css`, keep the four override rules |
| 14 | **framer-motion `whileInView` not firing** because the element is server-rendered above the viewport trigger | Keep motion components `'use client'`; keep `viewport={{ once: true }}` |
| 15 | **Copy drift** — agent "cleans up" a sentence | Diff `content/*.ts` against the live page text before sign-off |
| 16 | **Title template double-suffix** — `%s \| Futurise Solutions` applied to titles already containing it | Audit all 27 titles |
| 17 | **Trial fonts shipped to production** | Buy licences or swap families |
| 18 | **Scroll-triggered counters double-fire** in React 19 StrictMode | Guard with a ref |
| 19 | **Geo pages built from one template** → ~21,500 words of unique copy silently lost, and the screenshot diff still passes | Six separate route files. Enforce with the word-count gate in Appendix A. |
| 20 | **Blog `/blog` index has 95 images and 83 cards** — naive port loads all of them eagerly | Paginate or virtualise; `loading="lazy"` on every card image except the first 6 |

---

## Copy-paste prompts for the AI agent

Give these **one at a time**. Wait for the STOP GATE to pass before sending the next.

### Prompt 0 — codebase reading

```
You are migrating a Vite + React + Chakra UI v2 marketing site to Next.js 16 (App Router).

Read MIGRATION-GUIDE.md first — it is the source of truth for this project.

Right now you are in PHASE 0 only. Do NOT write any application code.

Your task: read the ENTIRE old codebase and produce MIGRATION-INVENTORY.md
with sections A through I exactly as specified in PHASE 0 of the guide.

Hard rules:
- Read every file fully. Do not skim, do not summarise a file you will later port.
- Never invent a value. If you cannot find a color, spacing, duration, easing or
  breakpoint in the source, write "NOT FOUND — ASK" instead of guessing.
- Copy the theme object, all @keyframes, all @font-face blocks and all JSON-LD
  verbatim into the inventory. Do not paraphrase.
- The component inventory table must have a row for every component file, and the
  final column must state RSC or 'use client' with the reason.

When done, tell me which files you could not fully read and what is still unknown.
```

### Prompt 1 — scaffold

```
PHASE 1 from MIGRATION-GUIDE.md. Scaffold the Next.js 16 app, the Emotion SSR
registry, the providers, next.config.ts and the root layout exactly as written
in the guide. Nothing else — no pages, no components yet.

Then verify STOP GATE 1 and show me the "View Source" output proving Chakra
styles are in the server HTML.
```

### Prompt N — per component / per page

```
PHASE {n} from MIGRATION-GUIDE.md. Port ONLY: {component or route name}.

Rules:
- Open the old file and read it in full before writing anything.
- Copy every style prop, every framer-motion transition object, and every string
  character-for-character. Curly quotes and em dashes matter.
- You are porting, not designing. Zero unrequested changes. If you think something
  should be improved, append it to IMPROVEMENTS-BACKLOG.md and port it as-is.
- Mark 'use client' only where the guide's rules require it, and say why.

When done, run the visual-diff script for this route/component and paste the
diff percentage. If it is above 0.5%, open diffs/*.png, tell me exactly what
differs, and fix it before moving on.
```

---

## Sources

- [Next.js 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16) — async `params`, Turbopack default, `proxy` rename, `next/image` default changes, scroll-behavior, React 19.2
- [Next.js version support timeline](https://endoflife.date/nextjs) — 16.3.5 latest stable, released 11 Sep 2026
- [Chakra UI discussion #10439 — v2 with React 19 / Next 16](https://github.com/chakra-ui/chakra-ui/discussions/10439) — maintainer confirms compatibility
- [Chakra UI v2 — Next.js App Router setup](https://v2.chakra-ui.com/getting-started/nextjs-app-guide)
- Live audit of https://www.futurisesolutions.com, 18 September 2026 — all bundle sizes, theme tokens, keyframe names, route inventory and HTML measurements in this document were taken directly from the running site.

---

# Appendix A — Page-by-page section blueprint

Measured from the live pre-rendered HTML on 18 September 2026. `sec` = `<section>` count, `img` = `<img>` count, `words` = visible word count inside the hydration root.

**How to use this appendix:** after porting each page, run the content-integrity check at the end of this appendix. If the new page's word count is more than 5% below the number here, content was dropped. This catches the failure mode that screenshot diffing cannot.

---

## `/` — Home
`sec: 16 · img: 91 · h3: 29 · words: 1,892 · HTML: 257 KB · JSON-LD: 3`

```
H1  AI-powered apps & SaaS that scale.
    └ eyebrow: AI AGENTS · SAAS · WEB · MOBILE · BLOCKCHAIN
    └ CTAs: Start your project | Book appointment
    └ hero diagram: Request → Gateway → AI agents → Application → Pipeline → Data layer
       (keyframes hlIn, hlPlaneA/B/C, hlPacket, hlDraw, hlPulse, hlSweep)
    └ background: hero-atmosphere.avif + heroDrift, heroVeil
─── trust strip: "TRUSTED BY TEAMS ACROSS NZ, INDIA & THE USA" (marquee, `scroll`)
─── CompanyStats: 25+ projects · 15+ clients · 4+ countries · 6 core service areas
H2  Senior engineers who ship AI products that scale.      [eyebrow: EXPERT ENGINEERING TEAM]
    └ 3 bullets + "See how we work"
H2  Services that move your business forward                [eyebrow: WHAT WE DO]
    └ 6 numbered cards 01–06: AI & ML · Web Dev · App Dev · UI/UX · Blockchain · Digital Marketing
H2  Systems designed to carry weight                        [eyebrow: HOW WE BUILD]
    └ architecture diagram (keyframes sdFlow, sdPulse)
H2  Built on trust, delivered with care                     [eyebrow: WHY FUTURISE]
    └ 6 cards: Expertise & Innovation · Client-Centric · Quality & Reliability
              · On-Time Delivery · Scalable Architecture · Post-Launch Support
H2  A proven process, from idea to impact                   [eyebrow: HOW WE WORK]
    └ ProcessTimeline 01–07: Discovery · Design · Planning · Build · Testing · Launch · Support
H2  Projects we're proud of                                 [eyebrow: FEATURED WORK]
    └ 9-item marquee ×2 rows: Infinity Bay · Dhanlaxmi · Palm Vision · HOMIES · Marty-QR
      · David Tishbi · Estate Realty · GDT Exchange · Platinum Peak
H2  Products we've shipped for real businesses              [eyebrow: CLIENT WORK]
    └ ClientsReviews: Abbas Kagzi testimonial (Infinity Bay Trading, Dubai)
      + 7 client cards, duplicated for the loop (crFlow, crDraw, crNode)
─── 4 assurance tiles: Free discovery call · Fixed-scope estimates · Two-week sprints · NDA on request
H2  Questions? We've got answers.                           [eyebrow: FAQ]
    └ 6 accordion items + FAQPage JSON-LD
H2  Got an idea? We'll build your AI-powered product.       [eyebrow: START BUILDING TODAY]
    └ CTASection + business@futurisesolutions.com
H2  Latest from the Blog                                    [eyebrow: INSIGHTS]
    └ 4 BlogCards + "View all articles"
```

> **LCP element:** the hero. `hero-atmosphere.avif` is already `<link rel="preload">`-ed. In Next.js give it `priority` and nothing else on this page.

---

## `/about`
`sec: 9 · img: 21 · h3: 21 · words: 1,503 · HTML: 208 KB · JSON-LD: 3 (graph, AboutPage, Organization)`

```
H1  We turn bold ideas into products that scale.
H2  Mission & Vision                          → H3 Our Mission · H3 Our Vision
H2  Our core values                           → H3 Transparency · Craftsmanship · Partnership · Innovation
H2  Structure first, surface second
H2  Technology excellence                     → H3 ×6 (the six services)
H2  Who you are actually contracting with     → H3 A New Zealand company, founded in 2024
                                                 H3 Delivered work sits in three markets
                                                 H3 One published way to reach a human
H2  What this site does not claim             → H3 No colleagues you cannot look up
                                                 H3 No logo wall
                                                 H3 No awards, ratings or scores
H2  Where to check what it does claim
H2  What changes when you build for a particular market   → links to the 6 geo pages
H2  Ready to build something exceptional?     → CTA
```

> This page's "What this site does not claim" section is unusual and high-trust. Port the wording exactly — it is a deliberate positioning choice, not filler.

---

## `/portfolio`
`sec: 5 · img: 56 · h3: 18 · words: 1,650 · HTML: 141 KB · JSON-LD: 2 (null, CollectionPage)`

```
H1  Crafting innovation with every project.
    9 project blocks, each: H2 {name — subtitle} → H3 The Problem → H3 Our Solution
      1. Infinity Bay Trading — B2B Supply Website, Rebuilt for Speed & SEO
      2. Dhanlaxmi Property — Land Advisory Site Built for Qualified Enquiries
      3. Palm Vision Technology — Ten Service Lines, One Findable Shop
      4. HOMIES — Property Management & Analytics Dashboard
      5. Marty-QR — AI-Powered Review Management
      6. David Tishbi — Luxury Jewelry E-commerce
      7. Estate — Property Search & Listings Platform
      8. Crypto Exchange — Perpetuals Trading Terminal
      9. Platinum Peak — Luxury Hotel Booking Experience
H2  Every project here came out of one of six disciplines
H2  Let's create something worth showcasing.   → CTA
```

> **56 images on one page.** Highest image count outside the blog index. This page benefits most from `next/image` + `sizes`. Only the first project's image gets `priority`.

---

## `/pricing`
`sec: 5 · img: 13 · h3: 34 · words: 2,113 · HTML: 120 KB · JSON-LD: 3 (null, FAQPage, BreadcrumbList)`

```
H1  What actually drives the cost of your project
    └ lede: "We don't publish rate cards, because a number quoted before we
             understand your scope would be wrong for almost everyone who read it."
H2  Eight factors that decide what a project costs
    → H3 Scope and feature depth · Integrations with systems you already run
         · Data readiness · Compliance, security and regulatory load
         · Design maturity · Expected scale and reliability
         · Timeline pressure · What happens after launch
H2  Four kinds of build, and when each is right
    → H3 Prototype / proof of concept · MVP — first production release
         · Full production platform · Enterprise / regulated build
H2  Fixed-scope, dedicated team, or discovery first
    → H3 Fixed-scope project · Dedicated team / retainer
         · Discovery engagement · Support and maintenance
H2  Where the time actually goes                → H3 phase breakdown
H2  Four questions that tell you if it's worth building
H2  The six kinds of work these numbers cover   → links to the 6 service pages
H2  The questions buyers actually ask.          → FAQ + FAQPage JSON-LD
H2  Get a fixed-scope estimate for your project → CTA
```

---

## `/contact`
`sec: 4 · img: 12 · h3: 0 · words: 1,032 · HTML: 241 KB · JSON-LD: 3`

```
H1  Tell us about your project.
H2  Share your Details
    └ FORM (js handler, no action attribute) — field names MUST NOT change:
         user_name    (text)
         company      (text)
         user_email   (email)
         phone        (text)
         message      (textarea)
       ⚠ user_name / user_email are EmailJS template defaults — confirm the provider
         in package.json during Phase 0 before touching this form.
H2  We serve clients worldwide        → market-reach map, links to the 6 geo pages
H2  Products we've shipped for real businesses   → ClientsReviews (shared with home)
H2  Work out what you need before you write it down
```

---

## `/case-studies`
`sec: 4 · img: 13 · words: ~1,100 · HTML: 106 KB · JSON-LD: 3`

```
H1  From Brief to Breakthrough
H2  A Support Agent That Retrieves Before It Answers.          → /case-studies/ai-support-agent
H2  Rebuilding a SaaS Platform on Foundations That Hold.       → /case-studies/saas-platform-scale
H2  Two Markets. One Codebase.                                 → /case-studies/real-estate-app
H2  Rebuilding a Wealth Dashboard Around Progressive Disclosure. → /case-studies/fintech-ux-redesign
H2  Immutable Contracts. An MEV-Resistant Launch.              → /case-studies/defi-protocol-launch
H2  Building an SEO System Foundation First.                   → /case-studies/saas-seo-growth
H2  Every study here came from a shipped product
H2  Let's build something worth writing about.                 → CTA
```

## `/case-studies/[slug]` — shared template (×6)
`sec: 3 · img: 12 · words: ~1,160 each · HTML: 108 KB each · JSON-LD: 3`

```
H1  {title}
H2  The Problem
H2  Our Approach
H2  Our Step-by-Step Process
H2  Measurable impact — verified outcomes
H2  Lessons Learned & Refinements     → 2× H3  (e.g. "Dynamic Chunking Wins",
                                                    "Human-in-the-Loop Backup")
H2  Trending Questions & FAQs
H2  Let's build your success story.   → CTA
```

**Content model:** `{ slug, title, metaTitle, metaDescription, problem, approach, process[], impact[], lessons[{h3, body}], faqs[{q,a}], hero }`

---

## `/service/[slug]` — shared template (×6)
`sec: 7 · img: 13 · h3: 19–20 · words: 1,046–1,100 each`

| Slug | H1 | Words | HTML |
|---|---|---|---|
| `web-development` | Web Development | ~1,100 | 172 KB |
| `app-development` | App Development | ~1,090 | 148 KB |
| `ui-ux-design` | UI/UX Design | ~1,060 | 125 KB |
| `blockchain-development` | Blockchain Development | 1,046 | — |
| `ai-ml-solutions` | AI & ML Solutions | 1,100 | — |
| `digital-marketing` | Digital Marketing | 1,096 | — |

```
H1  {Service Name}
H2  Our {Service Name}                                 → 5 capability H3s
      e.g. web-development: Frontend Development · Backend & APIs · Databases
                            · DevOps & Deployment · Testing
H2  How we craft great products                        → 7 H3s, identical across all six:
      Discovery · Design · Planning · Build · Testing · Launch · Support
H2  {Service Name} for teams in every industry
H2  See {service, lowercased} in production            → 1 linked case study
H2  Questions worth answering before you brief anyone  → 4 H3 blog links
H2  Frequently asked questions                         → FAQ accordion + FAQPage JSON-LD
H2  Ready to start your {Service Name} project?        → CTA
```

> Note the H2 "See {service} in production" **lowercases** the service name ("See ai & ml solutions in production"). That is the live behaviour. Reproduce it; don't "fix" the casing.

**Content model:** `{ slug, name, metaTitle, metaDescription, capabilities[{title,body}], industries[], caseStudy: {slug,title,blurb}, relatedPosts[{slug,title}], faqs[{q,a}] }`

JSON-LD per page: `@graph` + `Service` + `BreadcrumbList` + `FAQPage` = **4 blocks**.

---

## Geo pages — six bespoke pages, NOT a template

All six: `sec: 5`. Everything else differs.

### `/nz` — `img: 20 · h3: 38 · words: 2,392 · HTML: 146 KB · JSON-LD: 5`
```
H1  Software development for New Zealand businesses
H2  What building software here actually changes
    → A domestic market that forces you offshore early · Cloud accounting is the
      centre of the stack · Small teams, senior expectations
      · Distance is a delivery constraint, not a slogan
H2  The honest version of the offshore question
    → Where a local team genuinely wins · Where distributed delivery genuinely wins
      · Where offshore fails, and why
H2  What New Zealand businesses ask us to build
    → Agritech and primary industries · Professional services and finance
      · Tourism and hospitality · SaaS founders building for export
H2  The systems your software has to talk to
    → Xero · MYOB · Windcave · Stripe · NZ Post · HubSpot & Salesforce
H2  Distance is a constraint, not an excuse
H2  New Zealand obligations that shape the build
H2  How we price work in New Zealand dollars
H2  Working with us from New Zealand
H2  What we build, and what we have published on it
H2  Questions from New Zealand buyers.
H2  Building something in New Zealand?          → CTA
```

### `/us` — `img: 20 · h3: 41 · words: 4,595 · HTML: 166 KB · JSON-LD: 5`
```
H1  Software development for US businesses
H2  Six engagements, and the gap they leave
H2  What building software for the US actually changes
H2  The honest version of the offshore question
H2  Who owns what, and what happens if it ends
H2  How we price work for US projects
H2  Fifty states, one architecture
H2  What US businesses ask us to build
H2  The systems your software has to talk to
H2  What we build, and what it costs to build it
H2  Questions from US buyers.
H2  Building something for the US market?       → CTA
```

### `/au` — `img: 20 · h3: 37 · words: 3,674 · HTML: 159 KB · JSON-LD: 5`
```
H1  Software development for Australian businesses
H2  The compliance deadlines already on your roadmap
H2  Building for a regulated data economy
H2  Where these obligations land hardest
H2  Built for what is already scheduled
H2  The rails these builds have to run on
H2  Choosing a delivery partner from Australia
H2  How estimates are built
H2  What we build for Australian clients
H2  Questions from Australian buyers.
H2  Building something under Australian obligations?   → CTA
```

### `/ca` — `img: 20 · h3: 41 · words: 4,716 (largest page on the site) · HTML: 167 KB · JSON-LD: 5`
```
H1  Software development for Canadian businesses
H2  What Canadian law puts on the screen
H2  Where French stops being a translation task
H2  What changed this year
H2  How a supplier ends up in your risk register
H2  The one rule that argues against hiring us
H2  Two languages, one product
H2  Where these obligations concentrate
H2  When to hire in Canada, and when not to
H2  What moves a Canadian estimate
H2  The work itself, and what it costs
H2  Questions from Canadian buyers.
H2  Building for users in Canada or Quebec?     → CTA
```

### `/ae` — `img: 20 · h3: 37 · words: 3,607 · HTML: 158 KB · JSON-LD: 5`
```
H1  Software development for UAE businesses
H2  What we've shipped in the UAE — and what we haven't
H2  Which UAE are you building in?
H2  The invoice format is changing, and it is code
H2  Arabic is a layout problem before it is a language problem
H2  Where a licence comes before the build
H2  Free zone or mainland, the build differs
H2  Who ends up inside these rules
H2  When to hire in the UAE, and when not to
H2  Services and the guides that price them
H2  Questions from Emirates buyers.
H2  Building for customers in Dubai or Abu Dhabi?   → CTA
```

> ⚠️ The "Arabic is a layout problem" section may contain RTL-specific CSS. Check for `direction: rtl`, logical properties (`margin-inline-start`) or `[dir]` selectors during Phase 0 section D.

### `/europe` — `img: 14 · h3: 30 · words: 2,573 · HTML: 125 KB · JSON-LD: 5`
```
H1  Software development for European businesses
H2  What it takes to engage a supplier outside the EEA
H2  What we claim, and what we do not
H2  Decided in week one, not retrofitted
H2  Builds where European rules change the architecture
H2  How a European engagement actually runs
H2  Six disciplines, one team
H2  Questions from European buyers.
H2  Let's scope it properly                     → CTA
```

**JSON-LD on every geo page (5 blocks):** `@graph` + `WebPage` + `ProfessionalService` + `FAQPage` + `BreadcrumbList`.

---

## `/blog` — index
`sec: 2 · img: 95 · h3: 82 · words: 4,050 · HTML: 210 KB · JSON-LD: 4`

```
H1  Insights on AI, SaaS & Product Engineering
    └ 83 BlogCards, each: category chip · H3 title · excerpt · date · "Read more"
    └ categories seen: Digital Marketing · AI & ML · (confirm the full list in Phase 0)
```

> **95 images and 83 cards rendered at once.** In Next.js: paginate (or infinite-scroll with a server action), `priority` on none, `loading="lazy"` on all but the first 6. This page is a Core Web Vitals liability in its current form.

---

## `/blog/[slug]` — ×83 — **currently ships zero HTML**

```
Served HTML:   <div id="fs-boot">…</div> + <div id="root"></div>   ← EMPTY
After JS:      H1 + ~10 H2 + ~6,440 words + 16 images + Table of Contents
Data:          GET  https://futurise-backend-main-website.vercel.app/api/blogs/<slug>
View counter:  POST …/api/blogs/<slug>/view
JSON-LD:       2 blocks today → must become 3 (add Article + BreadcrumbList)
```

Observed article structure (from `the-ai-governance-gap-2026-…`):

```
H1  {post title}
H2  Table of Contents          ← scroll-spy, keep as a small client island
H2  What are {topic}?
H2  Why {market} Businesses Need …
H2  The '{concept}': Why … 
H2  Key Factors That Affect …
H2  Pricing {topic} in {market}
H2  Typical Process & Timeline for …
H2  Benefits & ROI for {market} Businesses from …
H2  Common Mistakes to Avoid in …
H2  How to Choose the Right {service} Partner
```

> That heading pattern is **already AEO-optimised** — each H2 is a question a person or an AI engine would ask. The only thing missing is that no crawler can see it. Phase 6 is the entire fix.

---

## `/privacy` and `/terms`
| Route | sec | img | H2 | words | HTML | JSON-LD |
|---|---|---|---|---|---|---|
| `/privacy` | 2 | 12 | 10 | 1,482 | 96 KB | 2 |
| `/terms` | 2 | 13 | 13 | 1,782 | 100 KB | 2 |

Plain legal prose, no interactivity. **Ideal first port** (Phase 5 starts here) and ideal first candidates for de-Chakra'ing into Server Components later.

---

## `/404` — not-found
```
H1  This page drifted into the future.
HTTP status: 404   ← must stay 404, not 200
```
In Next.js: `app/not-found.tsx` returns 404 automatically. Verify with `curl -I`.

---

## Content-integrity check (run after every page port)

Screenshot diffing catches layout regressions. It does **not** catch dropped paragraphs. Run this too:

```js
// scripts/content-check.mjs
import { chromium } from 'playwright'

const EXPECTED = {
  '/': 1892, '/about': 1503, '/portfolio': 1650, '/pricing': 2113,
  '/contact': 1032, '/case-studies': 1100, '/privacy': 1482, '/terms': 1782,
  '/service/web-development': 1100, '/service/app-development': 1090,
  '/service/ui-ux-design': 1060, '/service/blockchain-development': 1046,
  '/service/ai-ml-solutions': 1100, '/service/digital-marketing': 1096,
  '/case-studies/ai-support-agent': 1162,
  '/nz': 2392, '/us': 4595, '/au': 3674, '/ca': 4716, '/ae': 3607, '/europe': 2573,
  '/blog': 4050,
}

const browser = await chromium.launch()
const page = await browser.newPage()
for (const [route, expected] of Object.entries(EXPECTED)) {
  await page.goto('http://localhost:3000' + route, { waitUntil: 'networkidle' })
  const got = await page.evaluate(() => (document.body.innerText.match(/\S+/g) || []).length)
  const delta = ((got - expected) / expected * 100).toFixed(1)
  const verdict = Math.abs(delta) <= 5 ? 'OK  ' : (got < expected ? 'LOST' : 'GREW')
  console.log(`${verdict} ${route.padEnd(36)} expected ${expected}  got ${got}  (${delta}%)`)
}
await browser.close()
```

Also check heading counts per page against this appendix:

```js
const counts = await page.evaluate(() => ({
  h1: document.querySelectorAll('h1').length,
  h2: document.querySelectorAll('h2').length,
  h3: document.querySelectorAll('h3').length,
  img: document.querySelectorAll('img').length,
  ld: document.querySelectorAll('script[type="application/ld+json"]').length,
}))
```

**Gate:** every route within ±5% on words, exact match on `h1` count (always 1), and JSON-LD block count ≥ the number in this appendix.

---

## Appendix B — site-wide totals (sanity check after migration)

> ## ⛔ CORRECTED — the 12× claim is false. There is no content gain.
>
> **See `MIGRATION-INVENTORY.md` §0.1 and `CRAWLER-COVERAGE-AUDIT.md`.**
>
> The "words visible to a non-JS crawler" row assumed crawlers receive an empty shell.
> They do not — `middleware.js` already serves them the full article (4,879 words on the
> post measured). **Crawlable content is ~578,000 words today and will be ~578,000 words
> after. The gain is 1×, not 12×.**
>
> What *does* change is the delivery mechanism: a UA-regex-gated edge renderer that fails
> silently on any unlisted crawler (14 known misses) is replaced by SSG, which serves
> identical HTML to everyone. That is the honest argument — a removed failure mode, not
> new content. **Do not cite the 12× figure.**

| Measure | Live site today | After migration should be |
|---|---|---|
| Static routes | **28** (incl. `/futurise-admin/blog`) | **28** |
| Blog posts | 83 | 83 |
| Sitemap URLs | 110 | ≥ 110 |
| Route files needed | — | ~18 |
| Total static-page words | ~48,000 | ~48,000 |
| Total blog words (est.) | ~530,000 (83 × ~6.4k) | same |
| Words visible to a **listed** crawler | ~578,000 | ~578,000 (**no change**) |
| Words visible to an **unlisted** crawler | ~48,000 | **~578,000** ← the actual gain |
| Crawlers that can silently miss the content | **14 measured** | **0** |
