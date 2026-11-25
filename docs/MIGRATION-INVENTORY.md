# MIGRATION-INVENTORY.md — Phase 0 deliverable

**Produced:** 18 September 2026
**Scope:** complete read of the old Vite/React codebase at repo root.
**Status:** Phase 0 only. No application code written.

> **Read section 0 before section A.** The migration guide's factual premises were
> checked against this codebase and against the live site. Several are wrong, and one
> of them is the stated reason for the whole migration. Those findings are recorded
> first because they change what Phases 6–9 should do.

---

## 0. Corrections to MIGRATION-GUIDE.md (measured, not assumed)

Every item here was verified either by reading the file named or by issuing the `curl`
shown. Nothing in this section is inferred.

### 0.1 🔴 CRITICAL — "83 blog posts ship zero HTML" is **false**

The guide's §1 Problem 1, its stated "whole point of this migration", does not
reproduce. `middleware.js` is a **Vercel Edge Middleware that server-renders the full
article at the edge for crawlers**, and it is live in production right now.

Measured 18 Sep 2026 against
`https://www.futurisesolutions.com/blog/ai-agent-development-cost-2026-a-global-price-comparison-for-custom-ai-solutions`:

| User-Agent | Status | `X-Rendered-By` | `<h1>` | `<h2>` | Words |
|---|---|---|---|---|---|
| `Googlebot/2.1` | 200 | `futurise-edge-ssr` | **1** | **16** | **4,879** |
| `GPTBot/1.0` | 200 | `futurise-edge-ssr` | 1 | **16** | — |
| `Mozilla/5.0 … Chrome/131` (human) | 200 | *(none — static file)* | 0 | 0 | — |

The guide measured a **browser** User-Agent, saw the SPA shell, and concluded crawlers
see nothing. Crawlers do not take that path. `middleware.js`:

```js
// Humans get the React SPA — this path is for bots only.
if (!CRAWLERS.test(ua)) return;
```

The `CRAWLERS` regex explicitly covers `gptbot`, `claudebot`, `claude-searchbot`,
`perplexitybot`, `google-extended`, `ccbot`, `bytespider`, `cohere-ai`, `youbot` and
more — i.e. exactly the AEO/GEO engines the guide says cannot see the content.

The edge renderer also already emits **2 JSON-LD blocks** (`BlogPosting` +
`BreadcrumbList`), which is what guide §7.2 lists as the target ("1 today → add Article
+ BreadcrumbList = 3"). It is at 2 of 3 today, not 1.

**Consequence:** the headline justification for the migration — a 12× increase in
crawlable content (Appendix B) — is not available, because that content is already
crawlable. The migration may still be worth doing for the reasons in 0.2 and 0.3, but
**this needs a human decision before Phase 1.**

### 0.2 🔴 Blog posts *are* prerendered at build time (meta-only)

`prerender.js` → `prerenderBlogMeta()` writes a static file per post:

```
dist/blog/<slug>/index.html   ×83   (confirmed: `ls dist/blog | wc -l` → 83)
```

Each carries the post's real `<title>`, description, canonical, OG and Twitter tags,
injected by `injectMetadata()`. The **body** is left to middleware (crawlers) or the
SPA (humans). The guide describes these URLs as serving "a different, empty shell" with
no per-post metadata. They serve correct per-post metadata.

### 0.3 🟡 The keyframe inventory is wrong in both directions

Guide §5.2 says "23 custom keyframes", lists 23, and says they live in a global
stylesheet. Measured: **36 distinct keyframe names across 8 locations**, and only **2**
are in `src/index.css`. The rest are inline in component `sx` props (Emotion-scoped),
in `<style>` tags, or in an Emotion `keyframes` template literal.

The guide also mis-attributes `cr*` to `ClientsReviews` — they belong to `CircuitRail.jsx`.

Keyframes that exist and the guide **never mentions** (13):
`mg-pulse`, `wrm-pulse`, `wvStage`, `wvFlow`, `wvTick`, `uxResolve`, `uxSwatch`,
`bcConfirm`, `bcLink`, `bcSeal`, `mkSignal`, `mkRow`, `pulseGlow`.

Full verbatim bodies: **section D.3**.

### 0.4 🟡 Whole subsystems the guide does not know exist

None of these appear anywhere in MIGRATION-GUIDE.md. All must be migrated or
deliberately dropped, and that is a human decision:

| Subsystem | Files | Notes |
|---|---|---|
| **AI chatbot** | `src/Components/Chatbot/*` (10 files, ~712 lines) | Floating widget, lazy-loaded. Calls `POST /api/chat` on the CMS. Keyword-matching fallback (`keywordMatcher.js`, `predefinedQA.js`) for quota-exceeded. The guide calls this "ChatBubble — floating chat launcher" and nothing more. |
| **Admin blog CMS** | `src/Pages/AdminBlogPage.jsx` (495 lines), `src/api/adminAuth.js`, `api/admin-login.js`, `api/admin-logout.js`, `api/admin-session.js`, `api/_lib/adminSession.js` | Route `/futurise-admin/blog`. HttpOnly cookie session, HMAC-signed, server-validated against `ADMIN_PASSWORD`. Uses `@uiw/react-md-editor`. **Not in the guide's 27-route inventory at all.** |
| **Booking modal + context** | `src/context/BookingContext.jsx`, `src/Components/common/BookingModal.jsx` | Global modal, opened from ~12 call sites, each passing an attribution `source` string. Opens `https://calendar.app.google/oZ5ENgnwaCWAchAv6` in a new tab. |
| **Edge SSR for blog** | `middleware.js` (14.6 KB) | See 0.1. |
| **Blog fallback function** | `api/blog-fallback.js` | Distinguishes "slug does not exist" (404) from "published since last build" (serve SPA shell). Wired via `vercel.json` rewrite. |
| **Conversion analytics** | `src/utils/analytics.js` | 7 canonical events, dual-sink (GA4 + Vercel), `generate_lead` on primary conversions. |

### 0.5 🟡 Route count is 28 + 83, not 27 + 83

`src/Routes/AllRoutes.jsx` declares **28** non-blog routes. The guide lists 27. The extra
is `/futurise-admin/blog`. Also note `/case-studies/:slug` is **six explicitly enumerated
`<Route>` elements**, not one dynamic segment.

### 0.6 🟡 The announcement bar text in the guide is wrong

Guide §3.4 gives: `Powering up • 📅 Book a Complimentary…`

Actual (`src/Layout/AnnouncementBar.jsx`, `TEXT` const — leading characters are four
U+00A0 non-breaking spaces, and the source mixes escape sequences with literals):

```js
const TEXT =
  "    •    📅 Book a Complimentary 45-Minute Strategy Call" +
  "    •    🚀 AI Agents, SaaS, Web & Mobile Solutions" +
  "    •    🌎 Delivering for Businesses in the UAE, USA & India";
```

**"Powering up" is NOT in the announcement bar.** It is the `.fs-word` label inside the
`#fs-boot` loader in `index.html`. The guide conflated the two.

### 0.7 🟡 Footer structure differs from the guide

Guide §3.4 describes a *"Get in touch: `mailto:business@futurisesolutions.com`"* group.
Actual footer, in order: selected-work thumbnail grid (4 items) → 5-column grid
(brand+newsletter spanning 2 / Company / Services / Get in touch) → Markets inline row →
a CSS `FUTURISE SOLUTIONS` watermark with a mirrored reflection → legal row + socials.
"Get in touch" contains **email *and* a postal address linked to Google Maps**.

### 0.8 🟡 No blog view-counter endpoint exists

Guide §6.3 and §2 describe `POST …/api/blogs/<slug>/view`. **No such call exists in this
codebase** — `grep` over `src/api/` finds nothing. Do not port it.

### 0.9 🟡 `leaflet` / `react-leaflet` are dead dependencies

Both are in `package.json` (`leaflet@^1.9.4`, `react-leaflet@^4.2.1`) but **zero imports
remain**. Replaced by the hand-drawn SVG `WorldReachMap.jsx`. Do not install them.

### 0.10 🟡 EmailJS credentials are hardcoded, not env vars

Guide Phase 5 says "Move keys to `NEXT_PUBLIC_*` env vars". They are currently literals:

- `ContactForm.jsx`: service `service_jc2bgz1`, template `template_j9ap29a`, key `nURJDAbLK8UpUR46a`
- `Footer.jsx` (newsletter): service `service_jc2bgz1`, template `template_dfwoqsd`, key `nURJDAbLK8UpUR46a`

There is **no `VITE_EMAILJS_*` variable** in `.env` or `.env.example`. Moving them to env
vars is a change, not a port — flagged for the human.

### 0.11 🟡 The contact form has 5 fields but `message` is NOT required

Confirmed field names: `user_name`, `company`, `user_email`, `phone`, `message`. But only
`user_name` and `user_email` carry `required`. `ContactForm.jsx` documents this as a
deliberate conversion decision. **Do not add `required` to `message`.**

### 0.12 🟢 Prerender already handles 404 correctly

`prerender.js` renders the `NotFound` route to `dist/404.html`; Vercel serves it with a
real 404 status. Guide §1 already notes this is fine.

---

## A. Stack facts

### A.1 Exact runtime dependency versions (`package.json`, verbatim)

```json
"dependencies": {
  "@chakra-ui/react": "^2.8.2",
  "@emailjs/browser": "^4.4.1",
  "@emotion/react": "^11.11.4",
  "@emotion/styled": "^11.11.5",
  "@uiw/react-md-editor": "^4.1.1",
  "@vercel/analytics": "^2.0.1",
  "@vercel/speed-insights": "^2.0.0",
  "framer-motion": "^11.2.10",
  "leaflet": "^1.9.4",
  "marked": "^18.0.7",
  "marked-gfm-heading-id": "^4.1.4",
  "react": "^18.2.0",
  "react-countup": "^6.5.3",
  "react-dom": "^18.2.0",
  "react-fast-marquee": "^1.6.5",
  "react-icons": "^5.2.1",
  "react-leaflet": "^4.2.1",
  "react-markdown": "^10.1.0",
  "react-router-dom": "^6.23.1",
  "react-visibility-sensor": "^5.1.1",
  "remark-gfm": "^4.0.1",
  "swiper": "^11.1.4"
}
```

```json
"devDependencies": {
  "@testing-library/jest-dom": "^6.9.1",
  "@testing-library/react": "^15.0.7",
  "@types/react": "^18.2.66",
  "@types/react-dom": "^18.2.22",
  "@vitejs/plugin-react-swc": "^3.5.0",
  "eslint": "^8.57.0",
  "eslint-plugin-react": "^7.34.1",
  "eslint-plugin-react-hooks": "^4.6.0",
  "eslint-plugin-react-refresh": "^0.4.6",
  "jsdom": "^24.1.3",
  "puppeteer": "^25.4.0",
  "vite": "^5.2.0",
  "vitest": "^1.6.1"
}
```

**Dependency notes for the port:**

| Package | Used? | Next.js action |
|---|---|---|
| `@chakra-ui/react` 2.x | ✅ everywhere | Keep v2 (AGENTS.md rule 9) |
| `@emotion/react` / `styled` | ✅ Chakra runtime | Keep + SSR registry |
| `framer-motion` 11 | ✅ heavily | Keep |
| `react-router-dom` 6 | ✅ | **Delete** — replaced by App Router |
| `@emailjs/browser` | ✅ contact + newsletter | Keep |
| `@uiw/react-md-editor` | ✅ admin page only | Keep if admin page is ported |
| `react-markdown` + `remark-gfm` | ✅ `BlogMarkdown.jsx` | Keep, or move to server-side `marked` |
| `marked` + `marked-gfm-heading-id` | ✅ `middleware.js` only | Keep if edge SSR retained; **or** becomes the server renderer in Next |
| `react-countup` | ✅ `CompanyStats` | Keep |
| `react-visibility-sensor` | ✅ `CompanyStats` | Keep, or replace with IntersectionObserver |
| `react-fast-marquee` | ✅ `Partners`, `OurProjects`, `ClientsReviews` | Keep — **the guide says marquees are "CSS-only, do not reimplement in JS". That is wrong; they are this library.** |
| `react-icons` 5 | ✅ everywhere (`fi`, `fa`, `fa6`) | Keep |
| `swiper` | ❌ **zero imports** | **Do not install.** Only the four CSS override rules in `index.css` reference it. |
| `leaflet` / `react-leaflet` | ❌ zero imports | **Do not install** |
| `@vercel/analytics` / `speed-insights` | ✅ `main.jsx` | Switch to `/next` entrypoints |
| `puppeteer` | ✅ `prerender.js` | **Delete** — Next replaces it |

> ⚠️ **Swiper:** `package.json` has it, `index.css` styles it, **nothing imports it.**
> The guide's Phase 4 instruction to dynamically import Swiper, and trap #13 about Swiper
> CSS, both apply to a library this site no longer uses.
> **NOT FOUND — ASK:** carry the four `.swiper-*` rules across, or drop them?

### A.2 TypeScript

**Not used at all.** Zero `.ts`/`.tsx` files. `@types/react` and `@types/react-dom` are
devDependencies only (editor IntelliSense). Every source file is `.js` or `.jsx`. The
Next.js target is TypeScript, so **every file is a JS→TS conversion as well as a
framework port.** This is a larger job than the guide implies.

### A.3 What produces the prerendered HTML today

**A custom script: `prerender.js` (38.6 KB, 795 lines), driven by Puppeteer.**

Build pipeline (`package.json` → `"build"`):
```
npm run browsers:install   →  puppeteer browsers install chrome
vite build                 →  dist/ with hashed assets
node prerender.js          →  headless Chrome renders each route, captures #root HTML
```

What `prerender.js` does, in order:
1. Reads `dist/index.html` as a template.
2. Extracts the `#fs-boot` loader block (`extractBootLoader()`) for re-insertion.
3. Starts a local static `http.createServer` over `dist/`.
4. Launches Puppeteer, renders each route in `buildRouteList()`.
   - Aborts `googletagmanager` requests so GA does not stall the render.
   - Auto-scrolls to force lazy content, then scrolls back to top.
   - Strips inline `style` attributes from `#root` descendants (framer-motion residue).
5. Writes `dist/<route>/index.html` with the captured HTML **plus** the boot loader
   re-injected (`withBootLoader()`).
6. Renders the `NotFound` route to `dist/404.html`.
7. `prerenderBlogMeta()` — fetches `${API_BASE}/api/blogs/admin/all`, writes a
   **meta-only** `dist/blog/<slug>/index.html` per post (83 written).
8. `writeSitemap()` — generates `dist/sitemap.xml` from what was actually built.
9. **Build-failing guards** (unusually good; worth preserving in spirit):
   - `zeroedStats()` — fails if a page shipped `0+` for a CountUp stat.
   - `brokenHubs()` — fails if a hub route has fewer than `min` child links.
   - `writeSitemap` **refuses to write** if the blog API was unreachable, rather than
     silently retracting 83 URLs from the sitemap.

**Route list built (`buildRouteList()`), 28 rendered routes:**
```
/
/service/{web-development, app-development, ui-ux-design,
          blockchain-development, ai-ml-solutions, digital-marketing}   (6)
/case-studies/{...Object.keys(caseStudies)}                            (6)
/{about, contact, portfolio, case-studies, blog, pricing,
  privacy, terms, europe}                                              (9)
/{nz, us, au, ca, ae}   ← from COUNTRY_SLUGS                           (5)
```
Plus `404.html` and 83 `/blog/<slug>` meta files.

> `/europe` is in `staticPages`, **not** `countryPages`. It is deliberately outside the
> `COUNTRIES` registry and therefore outside the hreflang cluster. See
> `src/utils/Constant/countries.js` and the comment in `AllRoutes.jsx`.

**→ Phase 1 deletes:** `prerender.js`, `puppeteer`, `.puppeteerrc.cjs`, the
`browsers:install` script, and the `installCommand` in `vercel.json` that installs
Chrome's system libs (`dnf install -y nss nss-util nspr mesa-libgbm`).

### A.4 Where the `#fs-boot` boot skeleton is defined

**`index.html`, lines ~322–506** — inline `<style>`, inline markup, inline `<script>`.
Entirely static HTML, deliberately outside `#root`.

- `<style>` — ~180 lines, defines `#fs-boot` and 5 keyframes (`fs-chev`, `fs-fill`,
  `fs-word`, `fs-breathe`, `fs-sweep`) + a `prefers-reduced-motion` block.
- `<div id="fs-boot">` — glow div, inline SVG of the 3-chevron Futurise mark, a progress
  rail, and the word **"Powering up"**.
- `<script>` — IIFE. Dwell **1000 ms on `/`, 500 ms elsewhere**, measured from navigation
  start via `performance.now()`, floor 260 ms. Fade 420 ms. Removes on `transitionend`
  with a `setTimeout(remove, FADE + 200)` fallback. Re-arms the timer if the main thread
  was blocked.

It is also **re-injected into every prerendered page** by `withBootLoader()` in
`prerender.js`, so it ships on all 28 static routes and all 83 blog meta files.

**→ Phase 6 deletes this** (guide §6.4). Confirmed safe: it is `position:fixed`,
`pointer-events:none`, outside `#root`, and `prerender.js` word-counts `#root` only — so
it contributes nothing to content or CLS.

### A.5 Head / meta mechanism

**A custom `<Seo>` component: `src/Components/common/Seo.jsx` (183 lines).**
**Not** `react-helmet-async` — that package is not a dependency.

It is a render-null component performing **direct DOM mutation of `document.head` inside
a `useEffect`**. Helpers: `upsertMeta`, `removeMeta`, `upsertCanonical`, `upsertJsonLd`,
`syncAlternates`, `pruneJsonLd`.

Props: `title, description, path, image, type, noindex, keywords, jsonLd,
publishedTime, modifiedTime, section, alternates`.

Three behaviours that **must be reproduced exactly** in the Metadata API:

1. **Conditional brand suffix (60-char rule).** VERBATIM:
   ```js
   const TITLE_LIMIT = 60;
   const withBrand = `${title} | ${SITE_NAME}`;
   const fullTitle = !title
     ? SITE_NAME
     : title.includes(SITE_NAME)
       ? title
       : withBrand.length <= TITLE_LIMIT
         ? withBrand
         : title;
   ```
   → The brand is appended **only if the result fits in 60 characters**, and never if
   the title already contains it. This directly solves guide trap #16 — but it also means
   **a naive `title.template` in Next will produce different titles on every page where
   the suffix was dropped.** Each of the 28 titles must be resolved through this function
   and written out as an absolute title. See **section I**.

2. **hreflang cluster sync.** `syncAlternates()` adds/updates/removes
   `link[rel=alternate][hreflang]`, deleting stale ones on client navigation. Cluster
   comes from `COUNTRY_ALTERNATES` (`x-default` + 5 countries).

3. **JSON-LD pruning.** Blocks are written as `script[data-schema="page-schema-N"]`;
   `pruneJsonLd(keep)` removes indices `>= keep` on navigation so stale schema from a
   previous route never leaks.

**→ Phase 7 deletes `Seo.jsx`.** In Next, (1) becomes per-page literal titles, (2) becomes
`alternates.languages`, (3) becomes a non-issue (server-rendered per route).

### A.6 Other stack facts

| Item | Value |
|---|---|
| Build tool | Vite 5 + `@vitejs/plugin-react-swc` |
| Vite custom plugin | `preloadHomeChunks()` in `vite.config.js` — walks the Rollup graph in `generateBundle` and injects `<link rel="modulepreload">` for the HomePage chunk tree. **Delete** — Next does route-based splitting. |
| Manual chunks | `react-vendor`, `chakra-vendor`, `motion-vendor`. **Delete.** |
| Test runner | Vitest + jsdom + Testing Library. 4 test files: `Layout.test.jsx`, `pages.test.jsx`, `constant.test.js`, plus `src/test/setup.js` + `test-utils.jsx`. |
| Hydration root | `<div id="root">` in `index.html`; `App.jsx` renders `<Box id='app'>` **inside** it. **Both ids exist and both are styled.** See D.4. |
| Color mode | `theme.config = { initialColorMode: "dark", useSystemColorMode: false }`; `<ColorModeScript initialColorMode={theme.config.initialColorMode} />` in `main.jsx`. |
| StrictMode | Enabled in `main.jsx`. |
| Host | Vercel. `vercel.json` sets `trailingSlash: false`, 4 redirects, 10 rewrites. |
| Node/API functions | `api/*.js` — Vercel serverless (admin auth, blog fallback). |
| Edge middleware | `middleware.js`, `matcher: ["/blog/:path+"]`. **Next 16 renames this to `proxy.ts` with an exported `proxy` function.** |

---

## B. Routes

Source of truth: `src/Routes/AllRoutes.jsx`. **All 28 routes are `React.lazy()`-loaded**
behind one `<Suspense>` with a `minH="100vh"` fallback (deliberate — a CLS fix, documented
at length in that file: `0.1812 → 0.0056` on home).

| # | Path | Component file | Params / loader | Prerendered? | In sitemap? |
|---|---|---|---|---|---|
| 1 | `/` | `src/Pages/HomePage.jsx` | — | ✅ | ✅ |
| 2 | `/about` | `src/Pages/AboutUs.jsx` | — | ✅ | ✅ |
| 3 | `/portfolio` | `src/Pages/Portfolio.jsx` | — | ✅ | ✅ |
| 4 | `/pricing` | `src/Pages/PricingGuide.jsx` | — | ✅ | ✅ |
| 5 | `/blog` | `src/Pages/BlogsPage.jsx` | — (client fetch via `useBlogs`) | ✅ | ✅ |
| 6 | `/contact` | `src/Pages/ContactusPage.jsx` | — | ✅ | ✅ |
| 7 | `/case-studies` | `src/Pages/CaseStudiesPage.jsx` | — | ✅ | ✅ |
| 8 | `/privacy` | `src/Pages/PrivacyPolicy.jsx` | — | ✅ | ✅ |
| 9 | `/terms` | `src/Pages/TermsConditions.jsx` | — | ✅ | ✅ |
| 10–15 | `/service/:serviceName` | `src/Pages/ServicePage.jsx` | **`useParams()` → `serviceName`**, looked up in `services`; falls back to `<NotFound />` | ✅ ×6 | ✅ |
| 16 | `/case-studies/ai-support-agent` | `src/Pages/CaseStudyDetailPage.jsx` | **`slug` prop, not a param** | ✅ | ✅ |
| 17 | `/case-studies/saas-platform-scale` | same | `slug` prop | ✅ | ✅ |
| 18 | `/case-studies/real-estate-app` | same | `slug` prop | ✅ | ✅ |
| 19 | `/case-studies/fintech-ux-redesign` | same | `slug` prop | ✅ | ✅ |
| 20 | `/case-studies/defi-protocol-launch` | same | `slug` prop | ✅ | ✅ |
| 21 | `/case-studies/saas-seo-growth` | same | `slug` prop | ✅ | ✅ |
| 22 | `/nz` | `src/Pages/NewZealandPage.jsx` | — | ✅ | ✅ |
| 23 | `/us` | `src/Pages/UnitedStatesPage.jsx` | — | ✅ | ✅ |
| 24 | `/au` | `src/Pages/AustraliaPage.jsx` | — | ✅ | ✅ |
| 25 | `/ca` | `src/Pages/CanadaPage.jsx` | — | ✅ | ✅ |
| 26 | `/ae` | `src/Pages/UAEPage.jsx` | — | ✅ | ✅ |
| 27 | `/europe` | `src/Pages/EuropePage.jsx` | — | ✅ | ✅ |
| **28** | **`/futurise-admin/blog`** | **`src/Pages/AdminBlogPage.jsx`** | — | ❌ (rewrite → `/index.html`) | ❌ |
| 29 | `/blog/:slug` | `src/Pages/BlogDetailPage.jsx` | **`useParams()` → `slug`**; `getBlogBySlug(slug)` in `useEffect` | ⚠️ **meta only** ×83 | ✅ ×83 |
| 30 | `*` | `src/Pages/NotFound.jsx` | — | ✅ → `dist/404.html` | ❌ (`noindex`) |

**Route-shape notes for the port:**

- **`/case-studies/:slug` is NOT dynamic today.** Six hardcoded `<Route>` elements each
  pass a literal `slug` prop. Moving to `app/case-studies/[slug]/page.tsx` (guide §3.3)
  **changes behaviour**: an unlisted slug currently falls through to `*` → `NotFound`.
  With `generateStaticParams` + `dynamicParams = false` the behaviour matches. Use that.
- **`/service/:serviceName` IS dynamic**, and renders `<NotFound />` inline for an unknown
  slug — which returns **200, not 404**, in the SPA. In Next, use `notFound()` so the
  status is correct. **This is a behaviour improvement — log it.**
- **`/futurise-admin/*`** — `App.jsx` checks
  `useLocation().pathname.toLowerCase().startsWith('/futurise-admin')` and suppresses
  AnnouncementBar, Navbar, Footer, BookingModal and ChatBubble. In App Router this is a
  **route group with its own layout**: `app/(admin)/futurise-admin/blog/page.tsx`.

**`vercel.json` rewrites (10) — all become unnecessary in Next except the blog one:**
```
/about /contact /portfolio /pricing /privacy /terms /blog /case-studies  → /index.html
/blog/:slug            → /api/blog-fallback?slug=:slug
/futurise-admin/:path* → /index.html
```

**`vercel.json` redirects (4) — these MUST be carried into `next.config.ts`:**
```
host futurisesolutions.com → https://www.futurisesolutions.com/$1   (301)
/About  → /about     (301)
/home   → /          (301)
/llms   → /llms.txt  (301)
```

---

## C. Theme

### C.1 The entire `extendTheme({...})` object — `src/theme/index.js`, VERBATIM

```js
import { extendTheme } from "@chakra-ui/react";

export const GRADIENT = "linear-gradient(135deg, #7B6CFF 0%, #B57BFF 100%)";
export const GRADIENT_SOFT =
  "linear-gradient(135deg, rgba(123,108,255,0.18) 0%, rgba(181,123,255,0.18) 100%)";

const colors = {
  brand: {
    50: "#f1efff",
    100: "#e3dfff",
    200: "#c8bfff",
    300: "#a99cff",
    400: "#8f7dff",
    500: "#7b6cff",
    600: "#6450e6",
    700: "#503fbf",
    800: "#3f3299",
    900: "#2a2168",
  },
  violet: {
    300: "#dcc0ff",
    400: "#c596ff",
    500: "#b57bff",
    600: "#9d4edd",
  },
  navy: {
    900: "#08080d",
    800: "#0d0d16",
    700: "#13131f",
    600: "#1a1a2b",
    500: "#24243a",
  },
};

const fonts = {
  heading: `'Zangezi', 'Aeonik Trial', -apple-system, system-ui, sans-serif`,
  body: `'Aeonik Trial', -apple-system, system-ui, sans-serif`,
};

const semanticTokens = {
  colors: {
    "bg.canvas": "#08080d",
    "bg.surface": "rgba(255,255,255,0.035)",
    "bg.surfaceHover": "rgba(255,255,255,0.06)",
    "border.subtle": "rgba(255,255,255,0.08)",
    "border.strong": "rgba(255,255,255,0.16)",
    "text.primary": "#f4f2ff",
    "text.muted": "#b0a8c8",
    "text.faint": "#7d748f",
    "accent.solid": "#b4a0ff",
  },
};

const styles = {
  global: {
    "html, body, #root, #app": {
      bg: "bg.canvas",
      color: "text.primary",
      scrollBehavior: "smooth",
    },
    body: {
      backgroundImage:
        "radial-gradient(60% 50% at 15% -5%, rgba(123,108,255,0.16) 0%, rgba(8,8,13,0) 60%), radial-gradient(55% 45% at 95% 0%, rgba(181,123,255,0.14) 0%, rgba(8,8,13,0) 55%)",
      backgroundAttachment: "fixed",
      backgroundRepeat: "no-repeat",
      overflowX: "hidden",
    },
    "::selection": { background: "rgba(123,108,255,0.35)" },
    "*::-webkit-scrollbar": { width: "10px", height: "10px" },
    "*::-webkit-scrollbar-track": { background: "#0d0d16" },
    "*::-webkit-scrollbar-thumb": {
      background: "linear-gradient(180deg,#7b6cff,#b57bff)",
      borderRadius: "8px",
    },
  },
};

const components = {
  Button: {
    baseStyle: { fontWeight: 600, borderRadius: "full", letterSpacing: "0.01em" },
    variants: {
      gradient: {
        bgGradient: "linear(135deg, brand.500, violet.500)",
        color: "white",
        boxShadow: "0 10px 30px -10px rgba(123,108,255,0.6)",
        transition: "transform .25s cubic-bezier(0.22,1,0.36,1), box-shadow .25s ease, filter .25s ease",
        _hover: {
          transform: "translateY(-2px) scale(1.02)",
          boxShadow: "0 18px 46px -12px rgba(181,123,255,0.8)",
          filter: "brightness(1.06)",
          _disabled: { transform: "none", filter: "none" },
        },
        _active: { transform: "translateY(0) scale(0.99)" },
      },
      outlineGlow: {
        bg: "transparent",
        color: "text.primary",
        border: "1px solid",
        borderColor: "border.strong",
        backdropFilter: "blur(6px)",
        transition: "transform .25s cubic-bezier(0.22,1,0.36,1), box-shadow .25s ease, border-color .25s ease, background .25s ease",
        _hover: {
          borderColor: "brand.400",
          bg: "rgba(180,160,255,0.1)",
          transform: "translateY(-2px) scale(1.02)",
          boxShadow: "0 12px 30px -12px rgba(123,108,255,0.55)",
        },
        _active: { transform: "translateY(0) scale(0.99)" },
      },
      ghostLink: {
        bg: "transparent",
        color: "text.muted",
        transition: "color .2s ease, background .2s ease",
        _hover: { color: "text.primary", bg: "rgba(255,255,255,0.04)" },
      },
    },
    defaultProps: { variant: "gradient" },
  },
  Heading: { baseStyle: { fontWeight: 700, letterSpacing: "-0.02em" } },
  Link: {
    baseStyle: {
      color: "text.muted",
      transition: "color .2s ease",
      _hover: { color: "text.primary", textDecoration: "none" },
    },
  },
};

const sizes = {
  container: {
    site: "clamp(1200px, 85vw, 1560px)",
  },
};

const theme = extendTheme({
  config: { initialColorMode: "dark", useSystemColorMode: false },
  colors,
  fonts,
  sizes,
  semanticTokens,
  styles,
  components,
});

export default theme;
```

### C.2 Checklist against the guide's §4

| Guide claim | Actual |
|---|---|
| `colors.brand.50–900` | ✅ identical, 10 stops |
| `colors.navy.500–900` | ✅ identical, 5 stops |
| `colors.accent.solid = '#b4a0ff'` | ⚠️ **Not a `colors` entry.** It is a **semanticToken**: `semanticTokens.colors["accent.solid"]`. Value is correct. |
| `colors.bg.canvas/surface/surfaceHover` | ⚠️ Same — **semanticTokens**, not `colors`. |
| `fonts.mono` | ❌ **Not overridden.** The guide lists a `mono` stack. The theme sets only `heading` and `body`; `mono` is Chakra v2 stock. **Do not add it.** |
| `colors.violet.*` | ❌ **Guide omits entirely.** 4 stops, used by every `linear(135deg, brand.500, violet.500)` gradient on the site. **Critical to port.** |
| `sizes.container.site` | ❌ **Guide omits entirely.** `clamp(1200px, 85vw, 1560px)` — the width of every section on the site. **Critical to port.** |
| `fontSizes` override | ❌ none — Chakra stock |
| `space` override | ❌ none — Chakra stock |
| `radii` override | ❌ none — Chakra stock |
| `shadows` override | ❌ none — Chakra stock |
| `breakpoints` override | ❌ none — Chakra v2 stock (`sm 30em, md 48em, lg 62em, xl 80em, 2xl 96em`) |
| `components` overrides | ✅ exactly 3: `Button` (3 variants + baseStyle + defaultProps), `Heading` (baseStyle only), `Link` (baseStyle only) |
| `styles.global` | ✅ see above, verbatim |
| `config` | ✅ `{ initialColorMode: "dark", useSystemColorMode: false }` |

### C.3 Exported constants that are NOT part of `extendTheme`

```js
export const GRADIENT = "linear-gradient(135deg, #7B6CFF 0%, #B57BFF 100%)";
export const GRADIENT_SOFT =
  "linear-gradient(135deg, rgba(123,108,255,0.18) 0%, rgba(181,123,255,0.18) 100%)";
```
`grep -rn "GRADIENT" src/ --include=*.jsx` → **no importers.** Dead exports. Port them
anyway (rule 1) or note in `IMPROVEMENTS-BACKLOG.md`. **ASK.**

### C.4 Typography measurement — ⚠️ conflict with the guide

Guide §4.2 asserts `h1 = 72 px / 700 / −2.16 px` and `h2 = 42 px / 700 / −0.84 px` as
theme-level facts. **They are not in the theme.** `Heading` baseStyle sets only
`fontWeight: 700, letterSpacing: "-0.02em"`. Sizes come from per-component props:

| Element | Where | Responsive value |
|---|---|---|
| Home `h1` | `HeroSection.jsx` | `fontSize={{ base: "42px", md: "62px", lg: "72px" }}`, `letterSpacing="-0.03em"`, `lineHeight={1.03}` |
| Geo `h1` | all 6 geo pages | `fontSize={{ base: "38px", md: "56px" }}`, `letterSpacing="-0.025em"`, `lineHeight={1.08}` |
| Service `h1` | `ServicePage.jsx` | `fontSize={{ base: "38px", md: "52px" }}`, `letterSpacing="-0.02em"` (theme default) |
| Privacy `h1` | `PrivacyPolicy.jsx` | `fontSize={{ base: "36px", md: "52px", lg: "60px" }}`, `letterSpacing="-0.02em"` |
| `SectionHeading` h2 | `SectionHeading.jsx` | `fontSize={{ base: "30px", md: "40px", lg: "46px" }}`, `lineHeight={1.12}` |
| Geo section h2 | geo pages | `fontSize={{ base: "28px", md: "38px" }}`, `lineHeight={1.15}` |

72 px at `lg` × −0.03em = **−2.16 px** ✅ matches the guide's measurement — but it is the
**home hero h1 only**. `SectionHeading`'s h2 at `lg` is 46 px × −0.02em = **−0.92 px**,
not −0.84 px. −0.84 px = 42 px × −0.02em, which is the `CTASection` h2 (`md: "42px"`).

**Do not use the guide's table as the porting source.** Use the per-component props above
and in section E.

---

## D. Global CSS

### D.1 CSS files, in load order

There is exactly **one** stylesheet: `src/index.css` (248 lines), imported once in
`src/App.jsx` (`import "./index.css"`). No `.module.css`, no `.scss`.

**Load order at runtime:**
1. `index.html` inline `<style>` — the `#fs-boot` block (~180 lines, 5 keyframes)
2. `src/index.css` — via `App.jsx`
3. Emotion runtime `<style data-emotion>` tags — Chakra theme `styles.global`, then every
   component's `sx`/style props
4. `AnnouncementBar.jsx` inline `<style>` — injected on mount, ~120 lines

### D.2 All `@font-face` blocks — `src/index.css`, VERBATIM (11 blocks)

```css
/* — Zangezi (headings) — */
@font-face {
  font-family: 'Zangezi';
  src: url('./assests/fonts/Zangezi08_Trial-Light.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Zangezi';
  src: url('./assests/fonts/Zangezi08_Trial-SemiLight.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Zangezi';
  src: url('./assests/fonts/Zangezi08_Trial-Regular.woff2') format('woff2');
  font-weight: 500 800; /* variable-style range: heavier requests get the Regular cut, no synthetic bold */
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Zangezi';
  src: url('./assests/fonts/Zangezi08_Trial-LightItalic.woff2') format('woff2');
  font-weight: 300 400;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: 'Zangezi';
  src: url('./assests/fonts/Zangezi08_Trial-Italic.woff2') format('woff2');
  font-weight: 500 800;
  font-style: italic;
  font-display: swap;
}

/* — Aeonik Trial (body / UI) — */
@font-face {
  font-family: 'Aeonik Trial';
  src: url('./assests/fonts/aeoniktrial-light.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Aeonik Trial';
  src: url('./assests/fonts/aeoniktrial-regular.woff2') format('woff2');
  font-weight: 400 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Aeonik Trial';
  src: url('./assests/fonts/aeoniktrial-bold.woff2') format('woff2');
  font-weight: 600 800;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Aeonik Trial';
  src: url('./assests/fonts/aeoniktrial-lightitalic.woff2') format('woff2');
  font-weight: 300;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: 'Aeonik Trial';
  src: url('./assests/fonts/aeoniktrial-regularitalic.woff2') format('woff2');
  font-weight: 400 500;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: 'Aeonik Trial';
  src: url('./assests/fonts/aeoniktrial-bolditalic.woff2') format('woff2');
  font-weight: 600 800;
  font-style: italic;
  font-display: swap;
}
```

**No `unicode-range` is declared on any block.** All 11 are `font-display: swap`.

**Font files on disk (`src/assests/fonts/`, 11 + `COPYRIGHT.txt`):**
```
Zangezi08_Trial-Light.woff2        Zangezi08_Trial-SemiLight.woff2
Zangezi08_Trial-Regular.woff2      Zangezi08_Trial-Italic.woff2
Zangezi08_Trial-LightItalic.woff2
aeoniktrial-light.woff2            aeoniktrial-lightitalic.woff2
aeoniktrial-regular.woff2          aeoniktrial-regularitalic.woff2
aeoniktrial-bold.woff2             aeoniktrial-bolditalic.woff2
COPYRIGHT.txt
```

⚠️ **The guide's §4.2 list is incomplete** — it names 6 weights and omits all 5 italic
faces. All 11 must be declared in `next/font/local` or italic text will synthesise.

⚠️ **Licensing (guide §2 flag, confirmed):** filenames are `*_Trial-*` and the family is
literally `"Aeonik Trial"`. `src/assests/fonts/COPYRIGHT.txt` exists — **a human must read
it.** Trial licences normally forbid production web embedding. **NOT FOUND — ASK.**

### D.3 All `@keyframes` — 36 distinct names across 8 locations

> The guide says 23, in a global stylesheet. Bodies below are verbatim. Chakra `sx` object
> syntax is preserved as-is; it compiles to the CSS shown.

#### D.3.1 `src/index.css` — 2 (the only two in a real stylesheet)

```css
@keyframes heroDrift {
  0%   { transform: scale(1.045) translate3d(0, 0, 0); }
  50%  { transform: scale(1.075) translate3d(-1.1%, -0.7%, 0); }
  100% { transform: scale(1.05) translate3d(0.9%, 0.5%, 0); }
}

@keyframes heroVeil {
  0%   { transform: translate3d(0, 0, 0); opacity: 0.85; }
  50%  { transform: translate3d(3.5%, -2.5%, 0); opacity: 1; }
  100% { transform: translate3d(-2.5%, 2%, 0); opacity: 0.8; }
}
```
Plus a guard block:
```css
@media (prefers-reduced-motion: reduce) {
  [style*="heroDrift"],
  [style*="heroVeil"] {
    animation: none !important;
  }
}
```

#### D.3.2 `index.html` `<style>` — 5 (`fs-*`, the boot loader) → **DELETE in Phase 6**

```css
@keyframes fs-chev {
  to { transform: scaleX(1); opacity: 1; }
}
@keyframes fs-fill {
  to { transform: scaleX(1); }
}
@keyframes fs-word {
  to { opacity: 1; }
}
@keyframes fs-breathe {
  0%, 100% { opacity: 0.55; transform: scale(0.95); }
  50%      { opacity: 1;    transform: scale(1.06); }
}
@keyframes fs-sweep {
  0%        { opacity: 0;    transform: translateY(14px); }
  35%       { opacity: 0.85; }
  70%, 100% { opacity: 0;    transform: translateY(-16px); }
}
```

#### D.3.3 `src/Layout/AnnouncementBar.jsx` inline `<style>` — 1

```css
@keyframes announcement-scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```
Applied as `animation: announcement-scroll 32s linear infinite;` on `.announcement-track`.
Paused on `:hover` and under `prefers-reduced-motion`.

#### D.3.4 `src/Components/common/HeroLattice.jsx` `sx` — 8 (`hl*`)

```js
"@keyframes hlIn": { from: { opacity: 0 }, to: {} },

"@keyframes hlPlaneA": {
  "0%,100%": { transform: "translate3d(0,0,0)" },
  "50%": { transform: "translate3d(-8px, 5px, 0)" },
},
"@keyframes hlPlaneB": {
  "0%,100%": { transform: "translate3d(0,0,0)" },
  "50%": { transform: "translate3d(14px, -9px, 0)" },
},
"@keyframes hlPlaneC": {
  "0%,100%": { transform: "translate3d(0,0,0)" },
  "50%": { transform: "translate3d(-22px, 12px, 0)" },
},

"@keyframes hlPacket": { to: { strokeDashoffset: -420 } },

"@keyframes hlDraw": { to: { strokeDashoffset: 0 } },

"@keyframes hlPulse": {
  "0%,100%": { opacity: 0.28, transform: "scale(1)" },
  "50%": { opacity: 0.72, transform: "scale(1.9)" },
},

"@keyframes hlSweep": {
  "0%": { transform: "translateX(-38%)" },
  "100%": { transform: "translateX(138%)" },
},
```
Helper rule in the same `sx`:
`".hl-halo": { transformOrigin: "center", transformBox: "fill-box" }`

#### D.3.5 `src/Components/common/AuroraField.jsx` `sx` — 3 (`af*`)

```js
"@keyframes afDriftA": {
  "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
  "50%": { transform: "translate3d(6%, 4%, 0) scale(1.14)" },
},
"@keyframes afDriftB": {
  "0%,100%": { transform: "translate3d(0,0,0) scale(1.08)" },
  "50%": { transform: "translate3d(-7%, -3%, 0) scale(1)" },
},
"@keyframes afDriftC": {
  "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
  "50%": { transform: "translate3d(4%, -6%, 0) scale(1.2)" },
},
```

#### D.3.6 `src/Components/common/CircuitRail.jsx` `sx` — 3 (`cr*`)

> ⚠️ The guide attributes these to `ClientsReviews`. **They belong to `CircuitRail`**,
> used by `ProcessTimeline` (`stops={4} variant="stepped"`) and `WhyChooseUs` (`stops={3}`).

```js
"@keyframes crFlow": { to: { strokeDashoffset: -560 } },
"@keyframes crDraw": { to: { strokeDashoffset: 0 } },
"@keyframes crNode": {
  "0%,100%": { opacity: 0.25, transform: "scale(1)" },
  "50%": { opacity: 0.7, transform: "scale(1.6)" },
},
```
Helper: `".cr-halo": { transformOrigin: "center", transformBox: "fill-box" }`

#### D.3.7 `src/Components/common/SystemDiagram.jsx` `sx` — 2 (`sd*`)

```js
"@keyframes sdFlow": { to: { strokeDashoffset: -22 } },
"@keyframes sdPulse": {
  "0%,100%": { opacity: 0.25, transform: "scale(1)" },
  "50%": { opacity: 0.6, transform: "scale(1.45)" },
},
```
Helper: `".sd-halo": { transformOrigin: "center", transformBox: "fill-box" }`

#### D.3.8 `src/Components/common/MarketGlobe.jsx` `sx` — 1 — **guide omits**

```js
"@keyframes mg-pulse": {
  "0%": { transform: "scale(1)", opacity: 0.6 },
  "100%": { transform: "scale(3.4)", opacity: 0 },
},
"@media (prefers-reduced-motion: reduce)": {
  "circle[style*='mg-pulse']": { animation: "none !important", opacity: 0 },
},
```

#### D.3.9 `src/Components/common/WorldReachMap.jsx` `sx` — 1 — **guide omits**

```js
"@keyframes wrm-pulse": {
  "0%": { transform: "scale(1)", opacity: 0.55 },
  "100%": { transform: "scale(3.2)", opacity: 0 },
},
"@media (prefers-reduced-motion: reduce)": {
  "circle[style*='wrm-pulse']": { animation: "none !important", opacity: 0 },
},
```

#### D.3.10 `src/Components/ServiceComponents/ServiceHeroVisual.jsx` `sx` — 10 — **guide omits all**

```js
// web-development visual
"@keyframes wvStage": {
  "0%, 12%": { opacity: 0.28, borderColor: "rgba(180,160,255,0.14)" },
  "26%, 74%": { opacity: 1, borderColor: "rgba(180,160,255,0.42)" },
  "88%, 100%": { opacity: 0.4, borderColor: "rgba(180,160,255,0.18)" },
},
"@keyframes wvFlow": { to: { strokeDashoffset: -240 } },
"@keyframes wvTick": {
  "0%, 18%": { opacity: 0, transform: "scale(0.4)" },
  "34%, 100%": { opacity: 1, transform: "scale(1)" },
},

// ui-ux-design visual
"@keyframes uxResolve": {
  "0%, 16%": { opacity: 0 },
  "34%, 76%": { opacity: 1 },
  "94%, 100%": { opacity: 0 },
},
"@keyframes uxSwatch": {
  "0%, 20%": { opacity: 0.25 },
  "38%, 100%": { opacity: 1 },
},

// blockchain-development visual
"@keyframes bcConfirm": {
  "0%, 55%": { opacity: 0.34, transform: "translateY(6px)" },
  "70%, 100%": { opacity: 1, transform: "translateY(0)" },
},
"@keyframes bcLink": { to: { strokeDashoffset: -120 } },
"@keyframes bcSeal": {
  "0%, 60%": { opacity: 0, transform: "scale(0.5)" },
  "76%, 100%": { opacity: 1, transform: "scale(1)" },
},

// digital-marketing visual
"@keyframes mkSignal": { to: { strokeDashoffset: -180 } },
"@keyframes mkRow": {
  "0%, 100%": { borderColor: "rgba(180,160,255,0.18)" },
  "50%": { borderColor: "rgba(180,160,255,0.46)" },
},
```

> `ServiceHeroVisual.jsx` is **963 lines** — the largest component file. It contains a
> different bespoke SVG diagram per service slug. The guide never mentions it.
> **NOT FOUND — ASK:** `ai-ml-solutions` and `app-development` have visuals in this file
> but no `@keyframes` of their own; confirm they are intended to be static.

#### D.3.11 `src/Components/Chatbot/ChatBubble.jsx` — 1, via Emotion `keyframes` tag — **guide omits**

```js
import { keyframes } from "@chakra-ui/react";

const pulseGlow = keyframes`
  0% { box-shadow: 0 12px 30px -8px rgba(123,108,255,0.7); }
  50% { box-shadow: 0 12px 36px 2px rgba(123,108,255,0.95), 0 0 0 4px rgba(123,108,255,0.2); }
  100% { box-shadow: 0 12px 30px -8px rgba(123,108,255,0.7); }
`;
```

#### D.3.12 Keyframe roll-call

| # | Name | Location | Keep in Next? |
|---|---|---|---|
| 1 | `heroDrift` | `index.css` | ✅ globals.css |
| 2 | `heroVeil` | `index.css` | ✅ globals.css |
| 3 | `announcement-scroll` | `AnnouncementBar.jsx` `<style>` | ✅ |
| 4–11 | `hlIn` `hlPlaneA` `hlPlaneB` `hlPlaneC` `hlPacket` `hlDraw` `hlPulse` `hlSweep` | `HeroLattice.jsx` | ✅ |
| 12–14 | `afDriftA` `afDriftB` `afDriftC` | `AuroraField.jsx` | ✅ |
| 15–17 | `crFlow` `crDraw` `crNode` | `CircuitRail.jsx` | ✅ |
| 18–19 | `sdFlow` `sdPulse` | `SystemDiagram.jsx` | ✅ |
| 20 | `mg-pulse` | `MarketGlobe.jsx` | ✅ |
| 21 | `wrm-pulse` | `WorldReachMap.jsx` | ✅ |
| 22–31 | `wvStage` `wvFlow` `wvTick` `uxResolve` `uxSwatch` `bcConfirm` `bcLink` `bcSeal` `mkSignal` `mkRow` | `ServiceHeroVisual.jsx` | ✅ (10) |
| 32 | `pulseGlow` | `ChatBubble.jsx` (Emotion) | ✅ |
| 33–36 (+1) | `fs-chev` `fs-fill` `fs-word` `fs-breathe` `fs-sweep` | `index.html` | ❌ **DELETE** (5) |

**Total distinct: 36. 31 to carry over, 5 to delete.**

### D.4 Every rule using `#app` or `#root` — ⚠️ flagged individually

**Both ids exist in the DOM today.** `index.html` has `<div id="root">`; `App.jsx` renders
`<Box id='app'>` **inside** it. The guide only discusses `#app`.

#### From the Chakra theme (`styles.global`) — Emotion-injected

| # | Selector | Declarations |
|---|---|---|
| G1 | `html, body, #root, #app` | `bg: bg.canvas; color: text.primary; scrollBehavior: smooth` |

#### From `src/index.css` — 5 rules

| # | Selector | Declarations |
|---|---|---|
| C1 | `#app` | `font-family: 'Aeonik Trial', 'Inter', sans-serif; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility` |
| C2 | `#app` (second block) | `-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none` |
| C3 | `#app input, #app textarea, #app [contenteditable="true"], #app a[href^="mailto:"], #app a[href^="tel:"], #app [data-selectable="true"]` | `-webkit-user-select: text; -moz-user-select: text; -ms-user-select: text; user-select: text` |
| C4 | `#app img` | `-webkit-user-drag: none; -khtml-user-drag: none; -moz-user-drag: none; -o-user-drag: none; user-select: none` |
| C5 | `html.scroll-jump, html.scroll-jump body, html.scroll-jump #root, html.scroll-jump #app` | `scroll-behavior: auto !important` |

> ⚠️ **`font-family: 'Inter'` in C1.** Inter is **not** loaded by any `@font-face` and is
> not a dependency. It is a dead fallback between `'Aeonik Trial'` and `sans-serif`.
> Port it verbatim (rule 1) and log it.

> ⚠️ **C2/C4 disable text selection and image dragging site-wide.** This is a deliberate
> "content protection" feature, paired with the `contextmenu` handler in `App.jsx` that
> blocks right-click on `<img>`. **Easy to drop by accident.** Both must be ported.

> ⚠️ **C5 depends on `ScrollToTop.jsx`**, which adds `html.scroll-jump` for exactly one
> `requestAnimationFrame` during route changes. The theme rule G1 sets
> `scrollBehavior: smooth` on four selectors, so the same fight exists in Next. **Carry C5
> and the `.scroll-jump` mechanism, or verify Next's handling produces identical behaviour.**

**Recommendation (guide §5.3, confirmed correct):** keep a literal `<div id="app">` inside
`<body>` in `app/layout.tsx`. All `#app` rules then match unchanged. `#root` no longer
exists in Next — rules G1 and C5 reference it harmlessly (a non-matching selector in a
list is inert), so they can be ported verbatim.

### D.5 Other global CSS (non-`#app`), `src/index.css` VERBATIM

```css
/* Reusable utility classes */
.gradient-text {
  background: linear-gradient(135deg, #b4a0ff 0%, #d4a5ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Swiper navigation theming */
.swiper-button-next,
.swiper-button-prev {
  color: #b4a0ff !important;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(6px);
  border-radius: 50%;
  width: 42px !important;
  height: 42px !important;
}
.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 16px !important;
  font-weight: 700;
}
.swiper-pagination-bullet {
  background: rgba(255, 255, 255, 0.4);
}
.swiper-pagination-bullet-active {
  background: #b4a0ff;
}

/* Contact form (used by Contact + Portfolio) */
.form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 28px;
  border-radius: 22px;
  position: relative;
  z-index: 1;
  background: rgba(13, 13, 22, 0.72);
  backdrop-filter: blur(14px);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 24px 60px -24px rgba(0, 0, 0, 0.7);
}
.form input,
.form textarea {
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 12px;
}
.form input:focus,
.form textarea:focus {
  border-color: #b4a0ff;
  box-shadow: 0 0 0 1px #b4a0ff;
  outline: none;
}
.form input::placeholder,
.form textarea::placeholder {
  color: rgba(255, 255, 255, 0.55);
}
```

> ⚠️ **`.gradient-text` gradient is `#b4a0ff → #d4a5ff`.** The guide's §4.1 colour list
> does not contain `#d4a5ff`. It is a one-off literal. **Port exactly.**

> ⚠️ **`.form` is dead.** `grep -rn 'className="form"' src/` → **no matches.**
> `ContactForm.jsx` builds its own Chakra `<Box as="form">` with different values
> (`rgba(13,13,22,0.6)` vs the CSS `0.72`; `p={{base:6, md:8}}` vs `28px`). The `.form`
> block styles nothing. **NOT FOUND — ASK:** carry it across or drop it?

> ⚠️ **`.swiper-*` rules are dead** (no Swiper import). Same question as A.1.

### D.6 RTL check (guide Appendix A flags this for `/ae`)

`grep -rn "direction: *rtl\|dir=\|margin-inline\|padding-inline\|\[dir" src/` → **no matches.**

There is **no RTL CSS anywhere**. `/ae`'s "Arabic is a layout problem before it is a
language problem" section is prose *about* RTL, not an RTL implementation. Nothing to port.

---

## E. Component inventory

**Rule applied to the last column:** a file is `'use client'` if it uses **any** Chakra
component, framer-motion, a React hook, an event handler, or a browser API. Chakra v2 is
Emotion-based CSS-in-JS and is client-only in its entirety.

**Result: 74 of 76 component/page files must be `'use client'`.** Only two pure-data
modules in the component tree are RSC-safe. This is the expected outcome of AGENTS.md
rule 9 (keep Chakra v2) and confirms guide §6's point that RSC gives nothing while Chakra
is in the tree.

Legend — B/A = browser API. `RR` = react-router-dom import (must be rewritten).

### E.1 Layout (`src/Layout/`)

| File | Export | Routes | Chakra | f-motion | Swiper | Browser APIs | RR | → |
|---|---|---|---|---|---|---|---|---|
| `AnnouncementBar.jsx` | `AnnouncementBar` | all (non-admin) | ❌ | ❌ | ❌ | `onClick`, `onKeyDown`, inline `<style>` | ❌ | **`'use client'`** — `useBooking()` context + keyboard handlers |
| `Navbar.jsx` | `Navbar` | all (non-admin) | ✅ Popover, Drawer, Collapse, IconButton, useDisclosure | ✅ `layoutId` highlight, `AnimatePresence` | ❌ | `window.scrollY`, `document.documentElement.scrollHeight`, `document.body.style.overflow`, scroll listener | ✅ `Link`, `useNavigate`, `useLocation` | **`'use client'`** — everything |
| `Footer.jsx` | `Footer` | all (non-admin) | ✅ | ❌ | ❌ | `useState`, EmailJS `send`, `useToast`, `new Date()` | ✅ `Link` | **`'use client'`** — newsletter form state + EmailJS |
| `index.js` | barrel | — | — | — | — | — | — | *(delete — use direct imports)* |
| `Layout.test.jsx` | test | — | — | — | — | — | — | *(port to the new test setup)* |

### E.2 Common (`src/Components/common/`) — 22 files + barrel

| File | Export | Used on | Chakra | f-motion | Browser APIs | RR | → |
|---|---|---|---|---|---|---|---|
| `Section.jsx` | `Section` | ~every page | ✅ `Box`, `Container` | ❌ | ❌ | ❌ | **`'use client'`** — Chakra only. *De-Chakra candidate #1: highest-leverage RSC conversion on the site.* |
| `SectionHeading.jsx` | `SectionHeading`, `Eyebrow` | ~every page | ✅ | ✅ (via `Reveal`) | ❌ | ❌ | **`'use client'`** |
| `Reveal.jsx` | `Reveal` | ~every page | ✅ `Box` | ✅ `whileInView` | ❌ | ❌ | **`'use client'`** — framer-motion |
| `GlassCard.jsx` | `GlassCard` | ~every page | ✅ `Box` + `sx` | ❌ | ❌ | ❌ | **`'use client'`** |
| `IconTile.jsx` | `IconTile` | `TechnologyExcellence` | ✅ | ❌ | ❌ | ❌ | **`'use client'`** |
| `CTASection.jsx` | `CTASection` | most pages | ✅ | ✅ (via `Reveal`) | `onClick` | ✅ `useNavigate` | **`'use client'`** |
| `ScrollToTop.jsx` | `ScrollToTop` | `App.jsx` (global) | ❌ | ❌ | `window.scrollTo`, `requestAnimationFrame`, `document.documentElement.classList`, `useLayoutEffect` | ✅ `useLocation`, `useNavigationType` | **`'use client'`** — pure browser. ⚠️ **May be entirely replaceable by Next's built-in scroll restoration. Verify before porting.** |
| `PageTransition.jsx` | `PageTransition` | `App.jsx` (global) | ✅ | ✅ `key={pathname}` re-mount | `useReducedMotion` | ✅ `useLocation` | **`'use client'`** — ⚠️ **route-keyed remount has no direct App Router equivalent.** Needs `usePathname()` in a client wrapper, or `template.tsx`. |
| `Logo.jsx` | `Logo` | Navbar, Footer | ✅ `Box`, `Image` | ❌ | ❌ | ✅ `Link` | **`'use client'`** |
| `ProcessTimeline.jsx` | `ProcessTimeline` | home, all 6 services | ✅ | ✅ (via `Reveal`) | ❌ | ❌ | **`'use client'`** |
| `ContactForm.jsx` | `ContactForm` | `/contact` | ✅ Input, Textarea, useToast | ❌ | `useRef`, `useState`, EmailJS `sendForm` | ❌ | **`'use client'`** |
| `Seo.jsx` | `Seo` | every page | ❌ | ❌ | `document.head` mutation, `useEffect` | ❌ | **DELETE** — replaced by Metadata API |
| `AmbientCanvas.jsx` | `AmbientCanvas` | service heroes, `MarketHero` | ✅ `Box` | ❌ | ❌ | ❌ | **`'use client'`** — Chakra only; pure CSS otherwise |
| `VisualBand.jsx` | `VisualBand` | home ×3, about ×2, services, geo | ✅ | ✅ `whileInView` scale | `useReducedMotion` | ❌ | **`'use client'`** |
| `MarketHero.jsx` | `MarketHero` | 5 geo pages (not `/europe`) | ✅ | ✅ `animate` | `useReducedMotion` | ❌ | **`'use client'`** |
| `WorldReachMap.jsx` | `WorldReachMap` | `/contact` | ✅ | ✅ `motion.path` pathLength, `MotionG` | `useReducedMotion`, `useMemo` | ❌ | **`'use client'`** |
| `MarketGlobe.jsx` | `MarketGlobe` | `/about` | ✅ | ✅ `useReducedMotion` | `useMemo` | ❌ | **`'use client'`** |
| `HeroParallax.jsx` | `HeroParallax` | home hero | ✅ `Box` | ✅ `useReducedMotion` | `window.matchMedia`, `pointermove`, `scroll`, `requestAnimationFrame`, `getBoundingClientRect`, refs | ❌ | **`'use client'`** — heaviest browser dependency on the site |
| `SystemDiagram.jsx` | `SystemDiagram` | home "About" section | ✅ | ✅ `useReducedMotion` | ❌ | ❌ | **`'use client'`** |
| `AuroraField.jsx` | `AuroraField` | `ClientsReviews`, `Faqs` | ✅ | ✅ `useReducedMotion` | ❌ | ❌ | **`'use client'`** |
| `HeroLattice.jsx` | `HeroLattice` | home hero | ✅ | ✅ `useReducedMotion` | `useMemo` | ❌ | **`'use client'`** |
| `CircuitRail.jsx` | `CircuitRail` | `ProcessTimeline`, `WhyChooseUs` | ✅ | ✅ `useReducedMotion` | ❌ | ❌ | **`'use client'`** |
| `BookingModal.jsx` | `BookingModal` | `App.jsx` (global) | ✅ Modal | ✅ `whileHover`/`whileTap` | `window.open` | ❌ | **`'use client'`** |
| `index.js` | barrel | — | — | — | — | — | *(delete — see the HomePage.jsx comment on barrel bloat)* |

### E.3 HomePage components (`src/Components/HomePage Components/`) — 10

| File | Export | Chakra | f-motion | Browser APIs | RR | → |
|---|---|---|---|---|---|---|
| `HeroSection.jsx` | `HeroSection` | ✅ | ✅ `fadeUp` variants, entrance scrim | `useReducedMotion` | ✅ `useNavigate` | **`'use client'`** |
| `AboutUs.jsx` | `About` | ✅ | ✅ (via `Reveal`) | `onClick` | ✅ `useNavigate` | **`'use client'`** |
| `OurServices.jsx` | `OurServices` | ✅ | ✅ `animate={{rotate:360}}` conic ring | ❌ | ✅ `Link` | **`'use client'`** |
| `Partners.jsx` | `Partners` | ✅ | ❌ | `react-fast-marquee` (JS, needs DOM) | ❌ | **`'use client'`** |
| `CompanyStats.jsx` | `CompanyStats` | ✅ | ✅ (via `Reveal`) | `useState`, `VisibilitySensor` (scroll events), `CountUp` (rAF) | ❌ | **`'use client'`** — ⚠️ see note below |
| `Process.jsx` | `Process` | ✅ (via children) | ✅ (via children) | ❌ | ❌ | **`'use client'`** — 19 lines, pure composition |
| `WhyChooseUs.jsx` | `WhyChooseUs` | ✅ | ✅ (via `Reveal`) | ❌ | ❌ | **`'use client'`** |
| `OurProjects.jsx` | `OurProjects` | ✅ | ❌ | `react-fast-marquee` | ✅ `useNavigate` | **`'use client'`** |
| `ClientsReviews.jsx` | `ClientsReviews` | ✅ | ✅ (via `Reveal`) | `react-fast-marquee` | ❌ | **`'use client'`** |
| `Faqs.jsx` | `Faqs` | ✅ Accordion | ✅ (via `Reveal`) | `useState`, `useEffect` | ✅ `useNavigate` | **`'use client'`** |

> ⚠️ **`CompanyStats` fallback must be preserved exactly.** The non-visible branch renders
> `value`, **not `0`**:
> ```jsx
> {isVisible || counted ? <CountUp end={value} duration={2.2} /> : value}
> ```
> The file documents why: `VisibilitySensor` never fires during prerender, so a `0`
> fallback shipped "0+ Projects delivered" to every crawler. `prerender.js` has a
> `zeroedStats()` guard that **fails the build** if this regresses. **Reproduce both the
> fallback and an equivalent guard.** This is guide trap #18 and more.

### E.4 AboutUs components — 4

| File | Export | Chakra | f-motion | Browser APIs | RR | → |
|---|---|---|---|---|---|---|
| `AboutUsHero.jsx` | `PageHero` | ✅ | ✅ | `useReducedMotion` | ✅ `useNavigate` | **`'use client'`** — ⚠️ named `AboutUsHero.jsx` but exports `PageHero`, and is **shared with `/portfolio`** |
| `MissionVision.jsx` | `MissionVision` | ✅ | ✅ `MotionBox` | ❌ | ❌ | **`'use client'`** |
| `CoreValues.jsx` | `CoreValues` | ✅ | ✅ (via `Reveal`) | ❌ | ❌ | **`'use client'`** |
| `TeamSection.jsx` | `TeamSection` | ✅ | ✅ (via `Reveal`) | `useState` (image-error fallback) | ❌ | **`'use client'`** — ⚠️ **gated off in production** by `TEAM_PUBLISHED = false`. Renders in dev only. Port the gate. |

### E.5 Contact components — 2

| File | Export | Chakra | f-motion | Browser APIs | RR | → |
|---|---|---|---|---|---|---|
| `TechnologyExcellence.jsx` | `TechnologyExcellence` | ✅ | ✅ (via `Reveal`) | ❌ | ❌ | **`'use client'`** — used on `/about`, not `/contact`, despite the folder |
| `ServicesWorldwide .jsx` | `ServicesWorldwide` | ✅ | ✅ (via `Reveal`) | ❌ | ❌ | **`'use client'`** — ⚠️ **filename contains a trailing space before `.jsx`**. Rename on port. |

### E.6 Service components — 3

| File | Export | Chakra | f-motion | Browser APIs | RR | → |
|---|---|---|---|---|---|---|
| `ProcessSection.jsx` | `ProcessSection` | ✅ (via children) | ✅ (via children) | ❌ | ❌ | **`'use client'`** |
| `ServiceStack.jsx` | `ServiceStack` | ✅ | ✅ | ❌ | ❌ | **`'use client'`** — lazy-loaded (`React.lazy` in `ServicePage`), ~29 KB gzip of brand SVG paths. Use `next/dynamic`. |
| `ServiceHeroVisual.jsx` | `ServiceHeroVisual` | ✅ | ✅ `useReducedMotion` | ❌ | ❌ | **`'use client'`** — **963 lines, 10 keyframes, 6 bespoke SVG diagrams.** Largest component. |

### E.7 Blog components — 5

| File | Export | Chakra | f-motion | Browser APIs | RR | → |
|---|---|---|---|---|---|---|
| `BlogCard.jsx` | `BlogCard` | ✅ | ❌ | ❌ | ✅ `Link` | **`'use client'`** — Chakra + RR only. *De-Chakra candidate.* |
| `BlogMarkdown.jsx` | `BlogMarkdown` | ✅ (every renderer) | ❌ | ❌ | ❌ | **`'use client'`** today → ⚠️ **guide §6.2 requires this become an RSC.** That means replacing every Chakra element in the `components` map with plain HTML + CSS Modules. **The single largest deliberate parity risk in the project.** |
| `LatestBlogs.jsx` | `LatestBlogs` | ✅ | ✅ stagger container | `useBlogs()` → `fetch` in `useEffect` | ✅ `Link` | **`'use client'`** → should become a server fetch |
| `BlogCTA.jsx` | `BlogCTA` | ✅ | ❌ | `useBooking()` | ✅ `RouterLink` | **`'use client'`** |
| `CategoryFilter.jsx` | `CategoryFilter` | ✅ | ✅ | `useState` | ❌ | **`'use client'`** — 249 lines |

### E.8 Chatbot components — 10 (**entirely absent from the guide**)

| File | Export | Chakra | f-motion | Browser APIs | → |
|---|---|---|---|---|---|
| `ChatBubble.jsx` | `ChatBubble` | ✅ + Emotion `keyframes` | ✅ `AnimatePresence` | `useState`, `useEffect`, `React.lazy` | **`'use client'`** |
| `ChatWidget.jsx` | `ChatWidget` | ✅ | ✅ | `useState`, `useRef`, `fetch` → `/api/chat` | **`'use client'`** |
| `MessageList.jsx` | `MessageList` | ✅ | ✅ | `useRef` scroll-to-bottom | **`'use client'`** |
| `MessageInput.jsx` | `MessageInput` | ✅ | ❌ | `useState`, form submit | **`'use client'`** |
| `PredefinedChips.jsx` | `PredefinedChips` | ✅ | ❌ | `onClick` | **`'use client'`** |
| `TypingIndicator.jsx` | `TypingIndicator` | ✅ | ✅ | ❌ | **`'use client'`** |
| `ContactFallback.jsx` | `ContactFallback` | ✅ | ❌ | ❌ | **`'use client'`** |
| `keywordMatcher.js` | matcher fns | ❌ | ❌ | ❌ | ✅ **RSC-safe** (pure, 163 lines) |
| `predefinedQA.js` | `predefinedQA` | ❌ | ❌ | ❌ | ✅ **RSC-safe** (pure data) |
| `index.js` | barrel | — | — | — | *(delete)* |

### E.9 Pages (`src/Pages/`) — 19

All are `'use client'`. Every one renders `<Seo>` (→ becomes `generateMetadata`) and
Chakra components. Column shows what is *additionally* client-only.

| File | Route | Additional client dependencies | → |
|---|---|---|---|
| `HomePage.jsx` | `/` | composition only | **`'use client'`** |
| `AboutUs.jsx` | `/about` | `useBooking()` | **`'use client'`** |
| `Portfolio.jsx` | `/portfolio` | `useNavigate`, `useState` (299 lines) | **`'use client'`** |
| `PricingGuide.jsx` | `/pricing` | `useBooking()`, `Link` (366 lines) | **`'use client'`** |
| `ContactusPage.jsx` | `/contact` | `ContactForm`, `WorldReachMap` (213 lines) | **`'use client'`** |
| `CaseStudiesPage.jsx` | `/case-studies` | `Link` (350 lines) | **`'use client'`** |
| `CaseStudyDetailPage.jsx` | `/case-studies/*` ×6 | **`slug` as a prop, not `useParams`** (784 lines) | **`'use client'`** |
| `ServicePage.jsx` | `/service/:serviceName` | **`useParams()`**, `React.lazy(ServiceStack)`, `useNavigate`, `useBooking` (421 lines) | **`'use client'`** — `useParams` → `await params` |
| `NewZealandPage.jsx` | `/nz` | `useBooking()` (460 lines) | **`'use client'`** |
| `UnitedStatesPage.jsx` | `/us` | `useBooking()` (545 lines) | **`'use client'`** |
| `AustraliaPage.jsx` | `/au` | `useBooking()` (461 lines) | **`'use client'`** |
| `CanadaPage.jsx` | `/ca` | `useBooking()` (540 lines) | **`'use client'`** |
| `UAEPage.jsx` | `/ae` | `useBooking()` (530 lines) | **`'use client'`** |
| `EuropePage.jsx` | `/europe` | `useBooking()` (399 lines) | **`'use client'`** |
| `PrivacyPolicy.jsx` | `/privacy` | anchor links only (441 lines) | **`'use client'`** — *best de-Chakra candidate* |
| `TermsConditions.jsx` | `/terms` | anchor links only (499 lines) | **`'use client'`** — *best de-Chakra candidate* |
| `BlogsPage.jsx` | `/blog` | `useBlogs()` fetch, `useState` filter (202 lines) | **`'use client'`** → list should become a server fetch |
| `BlogDetailPage.jsx` | `/blog/:slug` | **`useParams()`**, `getBlogBySlug` in `useEffect`, `navigator.clipboard`, `window.location.href`, `useToast`, `scrollIntoView` (290 lines) | **`'use client'`** → ⚠️ **must split**: server page + small client islands (TOC scroll, share buttons) |
| `AdminBlogPage.jsx` | `/futurise-admin/blog` | `@uiw/react-md-editor`, auth fetches, heavy state (495 lines) | **`'use client'`** — **not in the guide's plan at all** |
| `NotFound.jsx` | `*` | `useNavigate` (incl. `navigate(-1)`) | **`'use client'`** → `app/not-found.tsx` + a client Back button |

### E.10 Non-component modules

| File | Purpose | → |
|---|---|---|
| `src/theme/index.js` | Chakra theme | **`'use client'`** (imported by the provider) |
| `src/config.js` | `API_BASE_URL`, `apiUrl()`, `mediaUrl()` | ✅ **RSC-safe** — but `import.meta.env.VITE_*` → `process.env.NEXT_PUBLIC_*` |
| `src/api/blogs.js` | CMS client (public + admin) | ✅ **RSC-safe** — becomes `lib/blog.ts` with `next: { revalidate }` |
| `src/api/chat.js` | `POST /api/chat` | **`'use client'`** in practice (called from the widget) |
| `src/api/adminAuth.js` | admin login/session/logout | **`'use client'`** |
| `src/hooks/useBlogs.js` | module-level-cached fetch hook | **`'use client'`** → replaced by server `fetch` + Next cache |
| `src/utils/blog.js` | `formatDate`, `readTime`, `parseHeadings` | ✅ **RSC-safe** (pure) |
| `src/utils/analytics.js` | `trackEvent`, `EVENTS` | **`'use client'`** (`window.gtag`, Vercel `track`) |
| `src/utils/clarity.js` | `initClarity()` | **`'use client'`** (`document`, `navigator.webdriver`) |
| `src/utils/countrySchema.js` | `buildCountrySchema()` | ✅ **RSC-safe** (pure) |
| `src/utils/Constant/*.js` (14 files) | all page copy | ✅ **RSC-safe** — except `techLogos.jsx` |
| `src/utils/Constant/techLogos.jsx` | inline brand SVGs | ✅ RSC-safe as data; consumed by a client component |
| `src/utils/Texts/index.jsx` | text constants (126 lines) | ✅ **RSC-safe** |
| `src/utils/Buttons/index.jsx` | `CustomButton` legacy wrapper | **`'use client'`** — ⚠️ **no importers. Dead.** |
| `src/context/BookingContext.jsx` | global modal context | **`'use client'`** |
| `src/assests/index.js` | asset barrel | ✅ RSC-safe; imports become `next/image` static imports |

### E.11 Summary

| | Count |
|---|---|
| Files requiring `'use client'` | **74** |
| RSC-safe today (pure data/functions) | **~20** (all constants + `blog.js`, `countrySchema.js`, `keywordMatcher.js`, `predefinedQA.js`, `config.js`) |
| To DELETE | `Seo.jsx`, `ScrollToTop.jsx` (probably), 4 barrel `index.js` files, `Buttons/index.jsx` (dead) |
| To convert RSC deliberately (guide §6.2) | `BlogMarkdown.jsx` — highest parity risk |

---

## F. Animation inventory

### F.1 framer-motion — exact objects, VERBATIM

> Copied character-for-character from source. AGENTS.md rule 6 requires them ported literally.

| # | Component | Element | `initial` / `animate` / `whileInView` / `variants` | `viewport` | `transition` |
|---|---|---|---|---|---|
| F1 | `Reveal.jsx` | `MotionBox` (site-wide reveal) | `initial={{ opacity: 0, ...offset }}` where `offset` ∈ `up:{y:32,x:0}` `down:{y:-32,x:0}` `left:{x:48,y:0}` `right:{x:-48,y:0}` `none:{x:0,y:0}`; `whileInView={{ opacity: 1, x: 0, y: 0 }}` | `{{ once, amount: 0.2 }}` (`once` defaults `true`) | `{{ duration, delay, ease: [0.22, 1, 0.36, 1] }}` — defaults `duration=0.6`, `delay=0` |
| F2 | `PageTransition.jsx` | `MotionBox` keyed on `pathname` | `initial={reduce ? false : { opacity: 0, y: 14 }}`; `animate={{ opacity: 1, y: 0 }}` | — | `{{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}` |
| F3 | `HeroSection.jsx` | `fadeUp` variants (5 staggered blocks, `custom={0..4}`) | `hidden: { opacity: 0, y: 28 }`; `show: (i) => ({ opacity: 1, y: 0, … })` | — | `{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }` |
| F4 | `HeroSection.jsx` | entrance scrim `MotionBox` | `initial={{ opacity: 1 }}`; `animate={{ opacity: 0 }}` | — | `{{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}` |
| F5 | `VisualBand.jsx` | plate `MotionBox` | `initial={reduce ? false : { scale: 1.08 }}`; `whileInView={reduce ? undefined : { scale: 1 }}` | `{{ once: true, amount: 0.15 }}` | `{{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}` |
| F6 | `VisualBand.jsx` | copy `MotionBox` | `initial={reduce ? false : { opacity: 0, y: 18 }}`; `whileInView={reduce ? undefined : { opacity: 1, y: 0 }}` | `{{ once: true, amount: 0.4 }}` | `{{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}` |
| F7 | `MarketHero.jsx` | plate `MotionBox` | `initial={reduce ? false : { scale: 1.07, opacity: 0 }}`; `animate={reduce ? { opacity: 1 } : { scale: 1, opacity: 1 }}` | — | `{{ duration: 1.7, ease: [0.22, 1, 0.36, 1] }}` |
| F8 | `Navbar.jsx` | `Highlight` — shared-layout nav pill | `layoutId="navHighlight"` | — | `{{ type: "spring", stiffness: 380, damping: 30 }}` |
| F9 | `Navbar.jsx` | CTA glow `MotionBox` | `animate={{ opacity: [0.25, 0.5, 0.25] }}` | — | `{{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}` |
| F10 | `Navbar.jsx` | mobile drawer items (map, index `i`) | `initial={{ opacity: 0, x: 24 }}`; `animate={{ opacity: 1, x: 0 }}` | — | `{{ delay: 0.05 + i * 0.06 }}` |
| F11 | `Navbar.jsx` | mobile Services accordion block | `initial={{ opacity: 0, x: 24 }}`; `animate={{ opacity: 1, x: 0 }}` | — | `{{ delay: 0.17 }}` |
| F12 | `Navbar.jsx` | mobile Case Studies block | `initial={{ opacity: 0, x: 24 }}`; `animate={{ opacity: 1, x: 0 }}` | — | `{{ delay: 0.21 }}` |
| F13 | `Navbar.jsx` | mobile CTA block | `initial={{ opacity: 0, y: 16 }}`; `animate={{ opacity: 1, y: 0 }}` | — | `{{ delay: 0.28 }}` |
| F14 | `OurServices.jsx` | conic gradient ring behind each service icon | `animate={{ rotate: 360 }}` | — | `{{ duration: 6, repeat: Infinity, ease: "linear" }}` |
| F15 | `WorldReachMap.jsx` | `motion.path` route arcs (`i` = index) | `initial={{ pathLength: 0, opacity: 0 }}`; `whileInView={{ pathLength: 1, opacity: 1 }}` | `{{ once: true, amount: 0.3 }}` | `{{ duration: 1.6, delay: 0.25 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}` |
| F16 | `WorldReachMap.jsx` | `MotionG` market nodes (`i` = index) | `initial={reduce ? false : { opacity: 0, scale: 0.4 }}`; `whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}` | `{{ once: true, amount: 0.3 }}` | `{{ duration: 0.5, delay: 0.7 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}` |
| F17 | `BookingModal.jsx` | CTA `MotionBox` | `whileHover={{ scale: 1.01 }}`; `whileTap={{ scale: 0.99 }}` | — | *(framer default spring)* |
| F18 | `LatestBlogs.jsx` | stagger container | `container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }`; `whileInView="visible"` | `{{ once: true, margin: "-80px" }}` | — |
| F19 | `LatestBlogs.jsx` | each card | `cardVariant = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, … } }` | — | `{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }` |
| F20 | `MissionVision.jsx` | `MotionBox` cards | *(read file before porting — not transcribed)* | | |
| F21 | `AboutUsHero.jsx` | hero plate `MotionBox` | *(read file before porting — not transcribed)* | | |
| F22 | `ChatBubble.jsx` / `ChatWidget.jsx` | `AnimatePresence` panel | *(read files before porting)* | | |
| F23 | `CategoryFilter.jsx` | filter chips | *(read file before porting)* | | |
| F24 | `TypingIndicator.jsx` | dots | *(read file before porting)* | | |

> 🔴 **The easing array `[0.22, 1, 0.36, 1]` appears in 11 of the 19 transcribed
> transitions.** It is the site's signature curve (`cubic-bezier(0.22,1,0.36,1)`, also used
> in CSS `transition` props throughout the theme and `GlassCard`). **The guide's example
> uses `[0.16, 1, 0.3, 1]` — that value appears nowhere in this codebase. Do not use it.**

> **`useReducedMotion()` is honoured in 11 components** (`HeroSection`, `HeroParallax`,
> `HeroLattice`, `AuroraField`, `CircuitRail`, `SystemDiagram`, `MarketGlobe`,
> `WorldReachMap`, `VisualBand`, `MarketHero`, `PageTransition`). The pattern is
> `initial={reduce ? false : {...}}` — note `false`, **not** `undefined`. Port literally.

### F.2 CSS keyframe animations — the `animation` shorthand at each use site

| Keyframe | Component | Full `animation` value |
|---|---|---|
| `heroDrift` | `HeroParallax` plate | `heroDrift 34s ease-in-out infinite alternate` |
| `heroVeil` | `HeroParallax` veil | `heroVeil 19s ease-in-out infinite alternate` |
| `announcement-scroll` | `.announcement-track` | `announcement-scroll 32s linear infinite` |
| `afDriftA` | `AuroraField` wash 1 | `afDriftA 28s ease-in-out infinite` |
| `afDriftB` | `AuroraField` wash 2 | `afDriftB 36s ease-in-out infinite` |
| `afDriftC` | `AuroraField` wash 3 | `afDriftC 44s ease-in-out infinite` |
| `crDraw` | `CircuitRail` rail | `crDraw 2s cubic-bezier(0.22,1,0.36,1) 0.2s forwards` |
| `crFlow` | `CircuitRail` pulse | `crFlow 9s linear 1.4s infinite` |
| `crNode` | `CircuitRail` junction `i` | `crNode ${4.6 + i * 0.5}s ease-in-out ${i * 0.42}s infinite` |
| `sdFlow` | `SystemDiagram` edge `i` | `sdFlow ${2.6 + (i % 3) * 0.5}s linear ${i * 0.22}s infinite` |
| `sdPulse` | `SystemDiagram` node `i` | `sdPulse ${3.4 + i * 0.3}s ease-in-out ${i * 0.4}s infinite` |
| `hlIn` | `HeroLattice` wrapper | `hlIn 1.2s ease-out 0.5s both` |
| `hlPlaneA/B/C` | `HeroLattice` plane `pi` | `hlPlane${["A","B","C"][pi]} ${plane.dur}s ease-in-out infinite` — `dur` = **42** (back), **34** (mid), **27** (front) |
| `hlDraw` (sats) | `HeroLattice` satellite link `i`, plane `pi` | `hlDraw 1.5s ease-out ${0.75 + i * 0.09 + pi * 0.16}s forwards` |
| `hlDraw` (spine) | `HeroLattice` spine `i`, plane `pi` | `hlDraw 1.9s cubic-bezier(0.22,1,0.36,1) ${0.6 + i * 0.16 + pi * 0.2}s forwards` |
| `hlPacket` | `HeroLattice` packet `i`, plane `pi` | `hlPacket ${5.5 + i * 1.4 + pi * 2.2}s linear ${i * 0.9 + pi * 1.3}s infinite` |
| `hlPulse` (sats) | `HeroLattice` satellite `i` | `hlPulse ${5.1 + i * 0.42}s ease-in-out ${i * 0.5}s infinite` |
| `hlPulse` (hubs) | `HeroLattice` hub `i` | `hlPulse ${6.3 + i * 0.55}s ease-in-out ${i * 0.7}s infinite` |
| `hlPulse` (rings) | `HeroLattice` containment ring `i` | `hlPulse ${7.7 + i * 0.6}s ease-in-out ${i * 0.9}s infinite` |
| `hlSweep` | `HeroLattice` light sweep | `hlSweep 13s ease-in-out infinite` |
| `mg-pulse` | `MarketGlobe` marker `i` | `mg-pulse 3s ${(i * 0.45).toFixed(2)}s ease-out infinite` |
| `wrm-pulse` | `WorldReachMap` node `i` | `wrm-pulse 2.8s ${(i * 0.38).toFixed(2)}s ease-out infinite` |
| `fs-chev` | boot chevrons 1/2/3 | `fs-chev 620ms cubic-bezier(0.22,1,0.36,1) forwards`, delays **60 / 170 / 280 ms** |
| `fs-fill` | boot rail | `fs-fill var(--fs-dur, 1000ms) cubic-bezier(0.33,0,0.2,1) forwards` |
| `fs-word` | boot "Powering up" | `fs-word 700ms ease-out 340ms forwards` |
| `fs-breathe` | boot glow | `fs-breathe 2.4s ease-in-out infinite` |
| `fs-sweep` | boot sweep | `fs-sweep 1.5s cubic-bezier(0.4,0,0.2,1) 420ms infinite` |
| `pulseGlow` | `ChatBubble` | *(read `ChatBubble.jsx` in full before porting — shorthand not transcribed)* |
| `wv*` `ux*` `bc*` `mk*` | `ServiceHeroVisual` | *(10 keyframes; shorthands not transcribed — read the 963-line file in full at Phase 4)* |

### F.3 Non-keyframe motion (easy to miss)

| Mechanism | Where | Values |
|---|---|---|
| `requestAnimationFrame` damped pointer follow | `HeroParallax.jsx` | `EASE = 0.055`, `MAX_SHIFT = 13`; veil moves at **−1.9×** the plate; scroll parallax `sy = scrollY * 0.16`, only while `scrollY <= innerHeight`; loop self-parks below 0.05 px residual |
| `react-fast-marquee` | `Partners.jsx` | `speed={40} gradient={false} pauseOnHover` |
| `react-fast-marquee` | `OurProjects.jsx` | `speed={36} gradient={false} pauseOnHover` |
| `react-fast-marquee` | `ClientsReviews.jsx` | `speed={34} gradient={false} pauseOnHover` |
| `react-countup` | `CompanyStats.jsx` | `duration={2.2}`, triggered by `VisibilitySensor` `partialVisibility offset={{bottom:40}}`, latched via `active={!counted}` |
| Chakra CSS `transition` | theme `Button.gradient` | `transform .25s cubic-bezier(0.22,1,0.36,1), box-shadow .25s ease, filter .25s ease` |
| Chakra CSS `transition` | theme `Button.outlineGlow` | `transform .25s cubic-bezier(0.22,1,0.36,1), box-shadow .25s ease, border-color .25s ease, background .25s ease` |
| Chakra CSS `transition` | `GlassCard` | `transform .4s cubic-bezier(0.22,1,0.36,1), box-shadow .4s cubic-bezier(0.22,1,0.36,1), border-color .3s ease`; `&::before` opacity `.35s ease` |
| Chakra CSS `transition` | `Navbar` header | `all .3s ease`; height `62px` scrolled / `74px` top, `height .3s ease` |
| Chakra CSS `transition` | `BlogCard` | `all .3s cubic-bezier(0.22,1,0.36,1)`; image `transform .5s cubic-bezier(0.22,1,0.36,1)` |
| Scroll progress bar | `Navbar.jsx` | `width: ${progress*100}%`, `transition="width .1s linear"` |

---

## G. Asset inventory

### G.1 Hosting

**All assets are local. There is no Cloudinary usage.**

`grep -rn "res.cloudinary.com" src/` → **no matches.** The only reference is a
`<link rel="preconnect">` in `index.html` labelled "blog/portfolio media" — a leftover.
Blog images come from the **CMS API host**, resolved by `mediaUrl()` in `src/config.js`:

```js
export const mediaUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return join(API_BASE_URL, path);
};
```

`API_BASE_URL` = `https://futurise-backend-main-website.vercel.app` (from `.env`).

**→ `next.config.ts` `images.remotePatterns` needs:**
```ts
{ protocol: 'https', hostname: 'futurise-backend-main-website.vercel.app' }
```
Cloudinary is **not** needed. Whether to keep the dead preconnect: **NOT FOUND — ASK.**

### G.2 `public/` — served at a stable URL (17 files)

> **Update 25 Nov 2026:** the OG/link-preview filenames in this section are historical. Link previews now live in `public/og/*-v2.png` (no ratings, counts, stats, phone or people).

| Path | Format | Used by | ATF? | `priority`? |
|---|---|---|---|---|
| `hero-atmosphere.avif` | AVIF | `HeroSection` `<source>`; **preloaded in `index.html`** | ✅ **LCP on `/`** | ✅ **the one `priority` on `/`** |
| `hero-atmosphere.webp` | WebP | `HeroSection` `<source>` + `<img src>` fallback | ✅ | via the same `<picture>` |
| `home.png` | PNG | default OG image; `Seo` `DEFAULT_IMAGE` | ❌ | ❌ — OG only |
| `about.png` | PNG | `/about` OG image | ❌ | ❌ |
| `contactus.png` | PNG | OG image | ❌ | ❌ |
| `portfolio.png` | PNG | OG image | ❌ | ❌ |
| `webdevelopment.png` | PNG | `/service/web-development` OG | ❌ | ❌ |
| `appdevlopment.png` | PNG *(sic — typo in filename)* | `/service/app-development` OG | ❌ | ❌ |
| `uiuxdevelopment.png` | PNG | `/service/ui-ux-design` OG | ❌ | ❌ |
| `blockchaindevelopment.png` | PNG | `/service/blockchain-development` OG | ❌ | ❌ |
| `aimlsol.png` | PNG | `/service/ai-ml-solutions` OG | ❌ | ❌ |
| `digitalmarkiting.png` | PNG *(sic)* | `/service/digital-marketing` OG | ❌ | ❌ |
| `favicon-new.png` | PNG | Organization `logo` in JSON-LD | ❌ | ❌ |
| `futurise-logo.svg` | SVG | `<link rel="icon">` (`?v=3`) | ✅ | n/a |
| `futurise-bimi-logo.svg` | SVG | BIMI (email) — not referenced in HTML | ❌ | n/a |
| `logo-mark-180.png` | PNG 180×180 | `<link rel="apple-touch-icon">` (`?v=3`) | ❌ | n/a |
| `robots.txt` | text | static | — | → `app/robots.ts` |
| `llms.txt` | text | static; `/llms` → `/llms.txt` redirect | — | → `app/llms.txt/route.ts` |

> `public/sitemap.xml` is **not** committed — `prerender.js` writes `dist/sitemap.xml` at
> build time. → `app/sitemap.ts`.

### G.3 `src/assests/` — bundled (note the misspelled folder, 3 `s`)

**Fonts (11 woff2)** — see D.2. → `public/fonts/` for `next/font/local`.

**Icon SVGs — `HomeAssest/` (17)**

| Group | Files | Used by |
|---|---|---|
| Service hover icons (6) | `webDevHover` `AppDevHover` `DigitalMarketingHover` `AiMlHover` `UIUXHover` `BlockChainHover` | `OurServiceData`, `strengths` |
| Navbar service icons (6) | `WebDevNavbarIcon` `AppDevNavbarIcon` `BlockchainDevNavbarIcon` `DigiMarketingNavbarIcon` `AiMlNavbarIcon` `UIUXNavbarIcon` | `NavbarservicesOptions` — navbar dropdown, footer, geo pages |
| Why-choose-us icons (5) | `clientIconHover` `expertiseiconHover` `postIconHover` `qualityIconHover` `timeIconHover` | `cards` |

All rendered at 18–28 px with explicit `htmlWidth`/`htmlHeight`, `loading="lazy"`,
`decoding="async"`. None above the fold.

**Brand logo**

| File | Notes |
|---|---|
| `New-logo-3x.png` | **354×120**, 24 KB. `Logo.jsx` hardcodes `htmlWidth="354" htmlHeight="120"`, renders at max 40 px tall, `loading="eager" fetchpriority="high"`. In navbar **and** footer of every page. → `next/image` static import, `priority` in the navbar only. |

**Partner logos — `PartnerLogos/` (9)**
`logo-david-tishbi.svg` `logo-estate.svg` `logo-gdt.svg` `logo-homies.svg`
`logo-marty.svg` `logo-platinum-peak.svg` (SVG) +
`logo-dhanlaxmi.webp` `logo-infinity-bay.webp` `logo-palmvision.webp`
(WebP, 126 px tall = 3× the 42 px render).
Used by `partners` (Partners marquee) and `heroClientLogos` (hero trust strip, 5 of them).
The hero trust strip is **below the hero copy** — `loading="lazy"` today. Keep lazy.

**Project screenshots — `Project Images/` (25 WebP)**
`propertyDashbaord1/2` (sic), `realState1/2/3`, `marty1/2/3`, `CryptoDashboard1/2`,
`jewel1/2/3`, `hotelBooking1/2/3`, `infiitybay3` (sic — missing an `n`),
`infinitybay-home/-truck/-reveal`, `dhanlaxmi1/2/3`, `palmvision1/2/3`.

Used by `Projects` (9 entries) → `/portfolio` (**56 `<img>`, the highest on the site**),
`OurProjects` marquee, `Footer` selected-work grid (4 `featured` items).
Captured at 1400×900, 15–84 KB each.
**→ `priority` on the first `/portfolio` project image only.**

**Atmosphere plates — `Visuals/` (15 WebP)**

| File | Used by |
|---|---|
| `home-architecture.webp` | home `VisualBand` #1 |
| `home-craft.webp` | home `VisualBand` #3 |
| `market-reach.webp` | home `VisualBand` #2, `/nz` band, and every geo page |
| `market-nz/-us/-au/-ca/-ae.webp` (5) | `MarketHero` on each geo page — **`loading="eager" fetchpriority="high"`, ATF** → `priority` |
| `about-atrium.webp` | `/about` `VisualBand` (`focal="88% center"`) |
| `about-layers.webp` | `AboutUsHero` backdrop |
| `hall-perspective.webp` | `/case-studies`, `/pricing` |
| `precision-layers.webp` | all 6 `/service/*`, `/europe` |
| `signal-braid.webp` | `/about` (`tone="saturate(0.5) brightness(0.72)"`) |
| `ordered-terrain.webp` | *(shared plate — confirm consumer at Phase 5)* |

### G.4 Above-the-fold / `priority` decisions

| Route | LCP element | `priority` |
|---|---|---|
| `/` | `public/hero-atmosphere.avif` (preloaded, `decoding="sync"`, `filter="brightness(0.82) saturate(0.9)"`) | ✅ exactly 1 |
| `/nz` `/us` `/au` `/ca` `/ae` | `market-{code}.webp` via `MarketHero` | ✅ 1 each |
| `/europe` | **no `MarketHero`** — uses a different hero. | ⚠️ **NOT FOUND — ASK** (confirm at Phase 5) |
| `/about` | `about-layers.webp` (`AboutUsHero` backdrop) | ✅ 1 |
| `/portfolio` | first project image | ✅ 1 |
| `/service/*` | `ServiceHeroVisual` = **inline SVG, not an image** | ❌ none |
| `/blog/[slug]` | `blog.featuredImage` from CMS (`loading="eager" fetchpriority="high"`) | ✅ 1 |
| `/blog` | first `BlogCard` image | guide says `priority` on none; source has none today |
| `/contact` `/pricing` `/case-studies` `/privacy` `/terms` | text heroes | ❌ none |

### G.5 Image hygiene — reconciling with the guide

Guide §1 Problem 3 says 71 of 91 `<img>` on `/` lack width/height. That count is of the
**rendered** DOM. In **source**, every Chakra `<Image>` in an icon/logo position does carry
`htmlWidth`/`htmlHeight` (`Navbar`, `OurServices`, `WhyChooseUs`, `TechnologyExcellence`,
`Logo`, `TeamSection`). What lacks them is the `<Box as="img">` pattern used for plates
(`VisualBand`, `MarketHero`, `HeroSection`) — but those sit inside containers with a
**fixed per-breakpoint height**, so they cannot shift layout. `TeamSection.jsx` documents
the `htmlWidth`/`htmlHeight` requirement explicitly.

`next/image` with static imports fixes the attribute count mechanically. **CLS is probably
already near zero** — the `AllRoutes.jsx` and `LatestBlogs.jsx` comments record measured
CLS work (0.1812 → 0.0056 on home). Get a baseline before claiming improvement.

---

## H. Data & integrations

### H.1 Blog API

**Base URL** (from `.env`): `https://futurise-backend-main-website.vercel.app`
Set via `VITE_API_BASE_URL`; read by `src/config.js` (browser), `api/_lib/apiBase.js`
(server), and `prerender.js` (build). **No hardcoded fallback** — deliberate, documented.

**Endpoints (`src/api/blogs.js`):**

| Function | Method | Path | Auth |
|---|---|---|---|
| `getBlogs()` | GET | `/api/blogs` | none |
| `getBlogBySlug(slug)` | GET | `/api/blogs/${slug}` | none |
| `getAllBlogsAdmin()` | GET | `/api/blogs/admin/all` | ⚠️ none; used by `prerender.js` too |
| `createBlog(body)` | POST | `/api/blogs` | ⚠️ none sent |
| `updateBlog(id, body)` | PUT | `/api/blogs/${id}` | ⚠️ none sent |
| `deleteBlog(id)` | DELETE | `/api/blogs/${id}` | ⚠️ none sent |
| `uploadImage(file)` | POST | `/api/upload` (FormData, field `image`) | ⚠️ none sent |
| — (chat) | POST | `/api/chat` | none |

> ⚠️ **No auth header is attached to any admin mutation.** The gate is the site's own
> HttpOnly cookie (`/api/admin-*`), which is **not sent cross-origin** to the CMS. Either
> the CMS is unauthenticated for writes, or these calls fail. **NOT FOUND — ASK** — a
> security question, not a migration question, but it must be answered before the admin
> page is ported.

> ⚠️ **There is no `/view` endpoint.** Guide §6.3 describes something that does not exist here.

**Response shape — inferred from consumers, NOT from a schema:**

```ts
type BlogPost = {
  _id?: string
  slug: string
  title: string
  shortDescription?: string      // NOT `description`
  content: string                // MARKDOWN — rendered by react-markdown / marked
  category?: string              // free text; has drifted ("AI & ML", "AI Development", "AI & Technology")
  tags?: string[]                // may be a single comma- or space-joined string — both pages re-parse it
  featuredImage?: string         // relative path OR absolute URL; run through mediaUrl()
  createdAt: string              // ISO — used as datePublished
  updatedAt?: string             // ISO — falls back to createdAt
  author?: { name: string } | string   // middleware.js only; SPA uses articleAuthorName()
  publishedAt?: string           // middleware.js reads this first, then createdAt
  meta?: {
    metaTitle?: string
    metaDescription?: string
    metaKeywords?: string[] | string
    ogType?: string
    robots?: string              // tested with /noindex/i
  }
}
```

List endpoints may return `T[]`, `{ blogs: T[] }`, or `{ data: T[] }` — normalised by
`toBlogArray()`. Detail may return `T`, `{ blog: T }`, or `[T]` — normalised inline in
`BlogDetailPage.jsx`.

> 🔴 **Guide §6.1's `BlogPost` type is wrong for this API.** It uses `description`,
> `publishedAt`, `coverImage`, `readingTime`. The real fields are `shortDescription`,
> `createdAt`, `featuredImage`, and reading time is **computed** (`readTime()` in
> `src/utils/blog.js`, ~200 wpm). Using the guide's type will silently render blanks.

**Caching today:** `useBlogs.js` uses a module-level `_cache` + `_inflight` so the list is
fetched once per session. → replaced by Next's `fetch` cache.

### H.2 Contact form

| | |
|---|---|
| Provider | **EmailJS** (`@emailjs/browser@^4.4.1`) — confirmed in `package.json` |
| File | `src/Components/common/ContactForm.jsx` |
| Call | `emailjs.sendForm("service_jc2bgz1", "template_j9ap29a", form.current, "nURJDAbLK8UpUR46a")` |
| Service ID | `service_jc2bgz1` — **hardcoded literal** |
| Template ID | `template_j9ap29a` — **hardcoded literal** |
| Public key | `nURJDAbLK8UpUR46a` — **hardcoded literal** |
| Env var names | **NONE EXIST.** No `VITE_EMAILJS_*` in `.env` or `.env.example`. |
| Fields | `user_name` (required), `company`, `user_email` (required, type=email), `phone`, `message` (**NOT required**) |
| Success | Chakra toast "Message sent successfully!" / "We'll get back to you within a couple of hours." + `form.reset()` |
| Error | toast "Failed to send message." + `trackEvent(CONTACT_FORM_ERROR)` |
| Analytics | `trackEvent(EVENTS.CONTACT_FORM_SUBMIT, { location, has_message })` where `has_message` = whether `message` was non-empty |

> ⚠️ Guide Phase 5 says "Move keys to `NEXT_PUBLIC_*` env vars". That is **a change, not a
> port.** The EmailJS public key is designed to be public, so it is not a leak. Doing it is
> fine but must be a decision. **ASK.**

### H.3 Newsletter

| | |
|---|---|
| Provider | EmailJS (same account) |
| File | `src/Layout/Footer.jsx` |
| Call | `emailjs.send("service_jc2bgz1", "template_dfwoqsd", { subscriber_email, time }, "nURJDAbLK8UpUR46a")` |
| Template ID | `template_dfwoqsd` — **different from the contact template** |
| Payload | `{ subscriber_email: email, time: new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }) }` |
| Validation | Client-side regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` before sending |
| Field | a single `<Input type="email">`, **not** a named form field |
| Analytics | `trackEvent(EVENTS.NEWSLETTER_SUBSCRIBE, { location: "footer" })` |

> ⚠️ **`new Date()` hydration risk.** `toLocaleString` here is inside a client submit
> handler, so it is safe — but `© {new Date().getFullYear()}` in the footer **is** rendered
> during SSR and is a hydration-mismatch risk in Next. Handle deliberately.

### H.4 Booking

| | |
|---|---|
| Mechanism | Chakra `Modal` → `window.open(BOOKING_URL, "_blank", "noopener,noreferrer")` |
| URL | `https://calendar.app.google/oZ5ENgnwaCWAchAv6` |
| Why not an iframe | Google sends `X-Frame-Options: DENY` — documented in `BookingModal.jsx` |
| State | `BookingContext` (`src/context/BookingContext.jsx`), global, wraps the whole app |
| Attribution | `openBooking(source)` — sources found: `announcement-bar`, `navbar-desktop`, `navbar-mobile`, `services-dropdown`, `home-hero`, `about-cta`, `nz-hero`, `nz-pricing`, `nz-cta`, `service-${serviceName}`, `blog-cta`, `unknown` (+ equivalents on the other 5 geo pages) |
| Analytics | `BOOKING_MODAL_OPEN` on open; `BOOKING_CALENDAR_OPEN` **before** `window.open` so a popup blocker cannot swallow the measurement |

### H.5 Admin auth (site's own `api/`, not the CMS)

| Endpoint | Method | Behaviour |
|---|---|---|
| `/api/admin-login` | POST `{password}` | 200 = accepted (sets HttpOnly cookie); 401 = wrong; **503 = `ADMIN_PASSWORD` not configured** |
| `/api/admin-session` | GET | `{ authenticated: boolean }`, `cache: "no-store"` |
| `/api/admin-logout` | POST | clears the cookie |

Session cookie is HMAC-signed (`api/_lib/adminSession.js`, 108 lines) with
`ADMIN_SESSION_SECRET`, defaulting to `ADMIN_PASSWORD`. All requests use
`credentials: "same-origin"`. Network failure falls back to the gate, never to an assumed
session.

### H.6 Every `VITE_*` env var → Next.js mapping

| Current | Value in `.env` | Read by | Next.js |
|---|---|---|---|
| `VITE_API_BASE_URL` | `https://futurise-backend-main-website.vercel.app` | `src/config.js` (client), `api/_lib/apiBase.js` (server), `prerender.js` (build) | ⚠️ **Split?** Client media URLs need `NEXT_PUBLIC_API_BASE_URL`; server fetches could use a plain `BLOG_API_BASE`. Keeping one public var is simpler and preserves the documented "server and browser cannot disagree" property. **ASK.** |
| `VITE_CLARITY_PROJECT_ID` | `ycomehde8x` | `src/utils/clarity.js` | `NEXT_PUBLIC_CLARITY_PROJECT_ID` |
| `ADMIN_PASSWORD` | *(set, redacted)* | `api/admin-login.js` | unchanged (server-only) |
| `ADMIN_SESSION_SECRET` | *(set, redacted)* | `api/_lib/adminSession.js` | unchanged (server-only) |

**No other env vars exist.** EmailJS, GA4 and the booking URL are all hardcoded literals.

### H.7 Analytics

| Tool | ID | Loaded where | Next.js |
|---|---|---|---|
| **GA4** | `G-5FKB0BL3MQ` | **Hardcoded `<script async>` in `index.html` `<head>`**, plus an inline `gtag('config')` | `next/script` `strategy="afterInteractive"`. ⚠️ `prerender.js` explicitly **aborts** googletagmanager requests during render — that hack disappears. |
| **Microsoft Clarity** | `ycomehde8x` (via env) | `src/utils/clarity.js`, injected from `main.jsx` inside `requestIdleCallback(…, {timeout: 3000})`, falling back to `setTimeout(…, 2000)` | `next/script` `strategy="lazyOnload"`, or keep the idle-callback pattern in a client component. **Must preserve the three guards:** skip if no ID, skip if not `PROD`, **skip if `navigator.webdriver`** (keeps headless renders out of the dashboard). |
| **Vercel Analytics** | — | `<Analytics />` in `main.jsx` (`@vercel/analytics/react`) | `@vercel/analytics/next` |
| **Vercel Speed Insights** | — | `<SpeedInsights />` in `main.jsx` (`@vercel/speed-insights/react`) | `@vercel/speed-insights/next` |

**Custom conversion events (`src/utils/analytics.js`) — all 7 must survive:**
```js
CONTACT_FORM_SUBMIT   = "contact_form_submit"
CONTACT_FORM_ERROR    = "contact_form_error"
NEWSLETTER_SUBSCRIBE  = "newsletter_subscribe"
BOOKING_MODAL_OPEN    = "booking_modal_open"
BOOKING_CALENDAR_OPEN = "booking_calendar_open"
EMAIL_CLICK           = "email_click"
CHATBOT_OPEN          = "chatbot_open"
```
`LEAD_EVENTS = { CONTACT_FORM_SUBMIT, BOOKING_CALENDAR_OPEN }` additionally emit GA4's
`generate_lead` with `lead_source`. `BOOKING_MODAL_OPEN` is deliberately excluded
(intent, not conversion) — **do not add it.**

### H.8 AI chat (guide omits entirely)

| | |
|---|---|
| Endpoint | `POST ${API_BASE}/api/chat`, body `{ question, history }` |
| History shape | `Array<{ role: "user" \| "assistant", content: string }>` |
| Responses | `{ answer, source: "ai" }` \| `{ source: "quota_exceeded" }` \| `{ source: "error", message }` |
| Fallback | On `quota_exceeded`, `error`, or a thrown network error → local keyword matching (`keywordMatcher.js` 163 lines, `predefinedQA.js` 31 lines) |
| Loading | `ChatBubble` is `React.lazy` in `App.jsx`; `ChatWidget` is `React.lazy` **inside** `ChatBubble` — a two-stage split so the chat UI is only fetched when opened |

---

## I. SEO inventory

### I.1 How to read this section

Every static route renders `<Seo>` with explicit props. The **rendered** `<title>` depends
on the 60-character rule in `Seo.jsx` (see A.5), so both the raw prop and the resolved
title are given. `path` → canonical `https://www.futurisesolutions.com${path}`.

Defaults applied to every route by `Seo.jsx`:
- `robots`: `index, follow` (or `noindex, follow` when `noindex`)
- `og:image:width` `1200`, `og:image:height` `630`, `og:site_name` `Futurise Solutions`
- `twitter:card` `summary_large_image`; `twitter:title/description/image` mirror OG
- `og:type` = the `type` prop, default `website`
- Default OG image when `image` is omitted: `https://www.futurisesolutions.com/home.png`

### I.2 Static `<head>` in `index.html` — the SPA fallback

This is what an unrendered request sees, and what the guide's §3.1 row 1 does **not** match.

`<title>`:
```
AI Development, SaaS, Web & Mobile App Development Company | Futurise Solutions
```

`description`:
```
Futurise Solutions is a global software development company providing AI development, SaaS product development, web application development, mobile app development, Shopify development, blockchain solutions, UI/UX design, and custom software development services for startups, enterprises, and growing businesses worldwide.
```

Also static: `keywords` (long), `robots` = `index, follow, max-image-preview:large`,
`author` = `Futurise Solutions`, `language` = `English`, canonical
`https://www.futurisesolutions.com/`, `theme-color` `#08080d`, a full OG + Twitter set,
and **one `@graph` JSON-LD block**.

⚠️ **On `/`, `Seo.jsx` overwrites title/description/canonical/OG at runtime and appends its
own `page-schema-N` scripts, but it does NOT remove the static `@graph`.** So `/` ships
**3 JSON-LD blocks**: the static `@graph`, plus `WebPage` and `FAQPage`. That matches the
guide's count of 3 — but the composition is different from what the guide implies.

### I.3 The static `@graph` — VERBATIM from `index.html`

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.futurisesolutions.com/#organization",
      "name": "Futurise Solutions",
      "alternateName": "Futurise",
      "url": "https://www.futurisesolutions.com",
      "logo": "https://www.futurisesolutions.com/favicon-new.png",
      "image": "https://www.futurisesolutions.com/home.png",
      "slogan": "Full-cycle digital product studio",
      "description": "Futurise Solutions is a full-cycle digital product studio that designs, builds and scales AI & ML systems, SaaS platforms, web and mobile apps, UI/UX design, blockchain, and digital marketing for startups, founders and enterprises. Registered in Wellington, New Zealand, with delivered client work in the United Arab Emirates, the United States and India.",
      "foundingDate": "2024",
      "email": "business@futurisesolutions.com",
      "knowsLanguage": ["English"],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Huddart Parker Building",
        "addressLocality": "Wellington Central",
        "addressRegion": "Wellington",
        "postalCode": "6011",
        "addressCountry": "NZ"
      },
      "areaServed": ["New Zealand", "United Arab Emirates", "United States", "Canada", "India", "United Kingdom", "Australia"],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "sales",
        "email": "business@futurisesolutions.com",
        "url": "https://www.futurisesolutions.com/contact",
        "availableLanguage": ["English"]
      },
      "sameAs": [
        "https://www.linkedin.com/company/futurisesolutions/",
        "https://www.instagram.com/futurisesolutions",
        "https://www.facebook.com/share/1E6xe2C5DW/",
        "https://x.com/futurisesol"
      ],
      "knowsAbout": [
        "AI Development", "AI Agents", "LLM Integration", "RAG Systems", "Machine Learning",
        "Web Development", "Mobile App Development", "UI/UX Design", "Blockchain Development", "Digital Marketing",
        "SaaS Development", "Custom Software Development",
        "React", "Next.js", "Node.js", "TypeScript", "Python", "React Native", "MongoDB", "PostgreSQL",
        "OpenAI", "Anthropic Claude", "Google Gemini", "LangChain", "AWS", "Vercel",
        "SaaS", "Startups", "FinTech", "Healthcare", "Real Estate", "E-commerce", "Education", "Enterprise Software"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Futurise Solutions Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI & ML Solutions", "url": "https://www.futurisesolutions.com/service/ai-ml-solutions", "description": "Custom AI agents, LLM & RAG integrations, NLP and computer vision that automate workflows and make products smarter." } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Development", "url": "https://www.futurisesolutions.com/service/web-development", "description": "Custom websites, SaaS platforms and web apps built with React, Next.js and Node.js — fast, SEO-ready and scalable." } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "App Development", "url": "https://www.futurisesolutions.com/service/app-development", "description": "Cross-platform iOS & Android apps built with React Native and Expo from a single codebase." } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "UI/UX Design", "url": "https://www.futurisesolutions.com/service/ui-ux-design", "description": "UX research, wireframing, high-fidelity Figma UI, prototypes and design systems that convert." } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Blockchain Development", "url": "https://www.futurisesolutions.com/service/blockchain-development", "description": "Audited smart contracts, DeFi platforms, MEV bots and multi-chain dApps across Ethereum, Solana and more." } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Digital Marketing", "url": "https://www.futurisesolutions.com/service/digital-marketing", "description": "SEO, paid ads, paid social, CRO and analytics tied to real revenue, not vanity metrics." } }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.futurisesolutions.com/#website",
      "url": "https://www.futurisesolutions.com",
      "name": "Futurise Solutions",
      "description": "Full-cycle digital product studio building AI, web, mobile and Web3 products.",
      "publisher": { "@id": "https://www.futurisesolutions.com/#organization" },
      "inLanguage": "en"
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.futurisesolutions.com/#wellington",
      "name": "Futurise Solutions",
      "url": "https://www.futurisesolutions.com",
      "image": "https://www.futurisesolutions.com/home.png",
      "email": "business@futurisesolutions.com",
      "parentOrganization": { "@id": "https://www.futurisesolutions.com/#organization" },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Huddart Parker Building",
        "addressLocality": "Wellington Central",
        "addressRegion": "Wellington",
        "postalCode": "6011",
        "addressCountry": "NZ"
      },
      "areaServed": [
        { "@type": "Country", "name": "New Zealand" },
        { "@type": "AdministrativeArea", "name": "Wellington" }
      ],
      "availableLanguage": ["English"],
      "currenciesAccepted": "NZD",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Software development services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI & ML Solutions", "url": "https://www.futurisesolutions.com/service/ai-ml-solutions" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Development", "url": "https://www.futurisesolutions.com/service/web-development" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "App Development", "url": "https://www.futurisesolutions.com/service/app-development" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "UI/UX Design", "url": "https://www.futurisesolutions.com/service/ui-ux-design" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Blockchain Development", "url": "https://www.futurisesolutions.com/service/blockchain-development" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Digital Marketing", "url": "https://www.futurisesolutions.com/service/digital-marketing" } }
        ]
      }
    }
  ]
}
```

> ⚠️ Four things are **deliberately absent** and documented as such in `index.html`:
> `openingHoursSpecification`, `priceRange`, `Review`/`aggregateRating`, and any
> `Person`/`founder`/`employee` node. **Do not add them.** The comment block explains each
> (policy violation / fabricated-authority signal). **Port the comments too.**

### I.4 `/` — Home (`src/Pages/HomePage.jsx`)

| | |
|---|---|
| `title` prop | `AI, SaaS & Web App Development Company` (38 chars) |
| **Resolved `<title>`** | `AI, SaaS & Web App Development Company \| Futurise Solutions` (59 chars → **under 60, brand appended**) |
| `description` | `Futurise Solutions builds AI agents, SaaS platforms, web and mobile apps end-to-end. Fixed-scope quotes, not hourly billing. Book a free 45-minute consultation.` |
| canonical | `https://www.futurisesolutions.com/` |
| `og:image` | `https://www.futurisesolutions.com/home.png` |
| `keywords` | `AI app development, SaaS development, web development company, mobile app development, React Native, blockchain development, Web3, AI agents, digital marketing, New Zealand, India, USA, Futurise Solutions` |
| `alternates` | `COUNTRY_ALTERNATES` |
| JSON-LD | **2 from `<Seo>`** + the static `@graph` = **3** ✅ matches guide |

**hreflang cluster (`COUNTRY_ALTERNATES`) — rendered identically on `/`, `/nz`, `/us`, `/au`, `/ca`, `/ae`:**
```
x-default → https://www.futurisesolutions.com/
en-NZ     → https://www.futurisesolutions.com/nz
en-US     → https://www.futurisesolutions.com/us
en-AU     → https://www.futurisesolutions.com/au
en-CA     → https://www.futurisesolutions.com/ca
en-AE     → https://www.futurisesolutions.com/ae
```
> ⚠️ `/europe` is **deliberately excluded** from this cluster — it is a region page, not a
> country page. **Do not add it.**

**Home JSON-LD blocks 1 & 2 — VERBATIM:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Futurise Solutions — AI, SaaS & Web App Development Studio",
  "url": "https://www.futurisesolutions.com/",
  "description": "Futurise Solutions builds AI agents, SaaS platforms, web apps, mobile apps & Web3 products end-to-end.",
  "isPartOf": { "@id": "https://www.futurisesolutions.com/#website" },
  "about": { "@id": "https://www.futurisesolutions.com/#organization" },
  "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.futurisesolutions.com/" }] }
}
```
```js
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((f) => ({
    "@type": "Question",
    "name": f.question,
    "acceptedAnswer": { "@type": "Answer", "text": f.answer },
  })),
}
```
`faqs` = the 6 entries in `src/utils/Constant/index.js`. Questions: "What services does
Futurise offer?", "How much does a project cost?", "How long does it take to build a
product?", "Do you offer custom solutions?", "What happens after the project launches?",
"How do we get started?"

### I.5 `/about` (`src/Pages/AboutUs.jsx`)

| | |
|---|---|
| `title` prop | `About Futurise Solutions — NZ-Registered Dev Studio` (50 chars) |
| **Resolved `<title>`** | ⚠️ **`About Futurise Solutions — NZ-Registered Dev Studio`** — the title **contains** "Futurise Solutions", so `title.includes(SITE_NAME)` is true and **the brand is NOT appended**. |
| `description` | `A Wellington-registered digital product studio founded in 2024, with an engineering team in India. Fixed-scope quotes and senior engineers.` |
| canonical | `https://www.futurisesolutions.com/about` |
| `og:image` | `/about.png` |
| `keywords` | `about Futurise Solutions, AI development team, web development company, mobile app developers, blockchain team, New Zealand tech agency, digital product studio` |
| JSON-LD | `AboutPage` + `Organization` + spread `teamPersonSchema()` (**currently `[]`**) + static `@graph` = **3** ✅ |

**Block 1 — `AboutPage`, VERBATIM:**
```json
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Futurise Solutions",
  "url": "https://www.futurisesolutions.com/about",
  "description": "Senior team building AI, SaaS, web and mobile products. Registered in Wellington, New Zealand, with delivered client work in the United Arab Emirates, the United States and India.",
  "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.futurisesolutions.com/" }, { "@type": "ListItem", "position": 2, "name": "About", "item": "https://www.futurisesolutions.com/about" }] },
  "mainEntity": { "@id": "https://www.futurisesolutions.com/#organization" }
}
```

**Block 2 — `Organization`, VERBATIM (a second, page-level node sharing the same `@id` as
the static graph's):**
```js
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.futurisesolutions.com/#organization",
  "name": "Futurise Solutions",
  "url": "https://www.futurisesolutions.com",
  "logo": "https://www.futurisesolutions.com/favicon-new.png",
  "slogan": "Full-cycle digital product studio",
  "description": "Futurise Solutions is a full-cycle digital product studio building AI & ML systems, SaaS platforms, web and mobile apps, UI/UX design, blockchain, and digital marketing.",
  "foundingDate": "2024",
  "email": "business@futurisesolutions.com",
  // No `telephone`. The site publishes no phone number — enquiries run through
  // the booking flow, the contact form and email — so asserting one here would
  // put a contact channel in structured data that a visitor cannot find or use.
  // `numberOfEmployees: { minValue: 10 }` removed. Nothing on the site supports
  // it, the published stats describe 6 core service areas, and a headcount
  // claim is exactly the kind of assertion a prospect checks on LinkedIn.
  "address": { "@type": "PostalAddress", "streetAddress": "Huddart Parker Building", "addressLocality": "Wellington Central", "postalCode": "6011", "addressCountry": "NZ" },
  "areaServed": AREAS_SERVED,
  "knowsAbout": ["Artificial Intelligence", "Machine Learning", "SaaS Development", "Web Development", "Mobile App Development", "UI UX Design", "Blockchain Development", "Digital Marketing"],
  "sameAs": SAME_AS,
  ...(isTeamPublished()
    ? { "employee": teamPersonSchema().map((p) => ({ "@id": p["@id"] })) }
    : {})
}
```
where
`AREAS_SERVED = ["New Zealand", "United Arab Emirates", "United States", "Canada", "India", "United Kingdom", "Australia"]`
and `SAME_AS` = the 4 `SOCIAL_PROFILES` hrefs (LinkedIn, Instagram, Facebook, X).

### I.6 `/service/[slug]` ×6 (`src/Pages/ServicePage.jsx`)

Title = `service.metaTitle`, or `` `${service.title} — New Zealand, India & USA` `` if
absent. All six have an explicit `metaTitle`, so the fallback never fires.

| Slug | `metaTitle` (raw) | Len | Resolved `<title>` |
|---|---|---|---|
| `web-development` | `Web Development Company — React, Next.js & Node.js` | 50 | **unchanged** (brand would make 71) |
| `app-development` | `App Development Company — iOS & Android (React Native)` | 54 | **unchanged** (would make 75) |
| `ui-ux-design` | `UI/UX Design Agency — Product Design & Figma` | 44 | **unchanged** (would make 65) |
| `blockchain-development` | `Blockchain Development — Smart Contracts, DeFi & Web3` | 53 | **unchanged** (would make 74) |
| `ai-ml-solutions` | `AI & ML Development — AI Agents, LLMs & Computer Vision` | 55 | **unchanged** (would make 76) |
| `digital-marketing` | `Digital Marketing Agency — SEO, Paid Ads & CRO` | 46 | **unchanged** (would make 67) |

> 🔴 **All six service titles drop the brand suffix.** A Next `title.template` of
> `'%s | Futurise Solutions'` would append it to all six and **change six ranking pages'
> titles**. Use `title: { absolute: ... }`, or no template at all.

⚠️ **The guide's §3.1 table titles differ from these.** Guide rows 11–13 give "Blockchain
Development …", "AI & ML Solutions …", "Digital Marketing …" — truncated placeholders. The
real values are above.

**`metaDescription` per slug — VERBATIM:**
- `web-development`: `Custom websites, SaaS platforms and web apps in React, Next.js and Node.js. Fixed-scope quotes, not hourly billing. Book a free 45-minute consultation.`
- `app-development`: `Cross-platform iOS & Android apps from one React Native codebase. Fixed-scope quotes instead of open-ended hourly billing. Book a free 45-minute consultation.`
- `ui-ux-design`: `UX research, Figma UI and design systems that cut churn and lift conversions. Fixed-scope quotes, not hourly billing. Book a free 45-minute consultation.`
- `blockchain-development`: `Audited smart contracts, DeFi platforms and multi-chain dApps on Ethereum, Solana and Base. Fixed-scope quotes. Book a free 45-minute consultation.`
- `ai-ml-solutions`: `Custom AI agents and LLM & RAG integrations that automate real workflows and cut costs. Fixed-scope quotes. Book a free 45-minute consultation.`
- `digital-marketing`: `SEO, Google & Meta ads and CRO tied to revenue, not vanity metrics. Fixed-scope quotes and monthly reporting. Book a free 45-minute consultation.`

**`keywords` per slug — VERBATIM (`serviceKeywords` in `ServicePage.jsx`):**
```js
"web-development":        "web development company, React developer, Next.js, Node.js, full stack development, website development New Zealand, India, USA",
"app-development":        "mobile app development, React Native, Expo, iOS Android app, cross-platform app, app developer New Zealand",
"ui-ux-design":           "UI UX design, Figma design, product design, user experience design, mobile UI design, web design New Zealand",
"blockchain-development": "blockchain development, DeFi development, Web3, dApp development, MEV bot, Solana, Ethereum, smart contract",
"ai-ml-solutions":        "AI development, ML solutions, AI agents, LLM integration, ChatGPT integration, AI SaaS, machine learning New Zealand",
"digital-marketing":      "digital marketing agency, SEO services, Google Ads, social media marketing, performance marketing New Zealand",
```

**`og:image` per slug (`serviceImages`):** `/webdevelopment.png`, `/appdevlopment.png`,
`/uiuxdevelopment.png`, `/blockchaindevelopment.png`, `/aimlsol.png`, `/digitalmarkiting.png`

**JSON-LD — 3 from `<Seo>` + static `@graph` = 4** ✅ matches guide.

Block 1 `Service`, VERBATIM:
```js
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `https://www.futurisesolutions.com/service/${serviceName}#service`,
  "name": `${service.title} — Futurise Solutions`,
  "description": service.metaDescription || service.details,
  "url": `https://www.futurisesolutions.com/service/${serviceName}`,
  "serviceType": service.title,
  "category": service.title,
  "provider": { "@id": "https://www.futurisesolutions.com/#organization" },
  "areaServed": AREAS_SERVED,
  "audience": { "@type": "Audience", "audienceType": "Startup founders, SaaS companies, product teams and enterprises" },
}
```
Block 2 `BreadcrumbList`, VERBATIM:
```js
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  // A "Services" crumb pointing at "/" duplicated the Home crumb's target,
  // which Google reports as an invalid breadcrumb trail. Dropped until a real
  // /services hub page exists to point it at.
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.futurisesolutions.com/" },
    { "@type": "ListItem", "position": 2, "name": service.title, "item": `https://www.futurisesolutions.com/service/${serviceName}` },
  ],
}
```
> ⚠️ **Do not reintroduce a 3-level breadcrumb here.**

Block 3 `FAQPage` — emitted only when `service.faqs?.length`, from `service.faqs`
(4–5 Q&A per service, all in the `services` object in `src/utils/Constant/index.js`).

### I.7 Geo pages ×5 + `/europe`

`/nz` `/us` `/au` `/ca` `/ae` all call `buildCountrySchema()` from
`src/utils/countrySchema.js`, which returns **4 blocks** (`WebPage`, `ProfessionalService`,
`FAQPage`, `BreadcrumbList`) + the static `@graph` = **5** ✅ matches the guide.

**`buildCountrySchema()` return value — VERBATIM:**
```js
const SITE_URL = "https://www.futurisesolutions.com";
const SITE_NAME = "Futurise Solutions";

[
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: `${title} — ${SITE_NAME}`,
    url,
    description,
    inLanguage: hrefLang,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}${image}` },
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${url}#service`,
    name: `${SITE_NAME} — ${label}`,
    url,
    description,
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    areaServed: [
      { "@type": "Country", name: label },
      ...regions.map((region) => ({ "@type": "AdministrativeArea", name: region })),
    ],
    availableLanguage: languages,
    currenciesAccepted: currency,
    email: CONTACT.email,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Software development services in ${label}`,
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.option, url: `${SITE_URL}${s.path}` },
      })),
    },
  },
  faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null,
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: label, item: url },
    ],
  },
].filter(Boolean)
```
> ⚠️ `.filter(Boolean)` — a market with no FAQs emits **4** blocks, not 5. All five
> currently have FAQs. **Preserve the conditional:** an empty `mainEntity` is a Search
> Console invalid-object error, documented in source.

`path`, `label` and `hrefLang` are read from the `COUNTRIES` registry, never passed —
so the schema, the hreflang cluster, the sitemap and the footer link cannot disagree.
An unknown `code` **throws** with an instruction to edit `countries.js`.

**Per-market arguments — confirmed for `/nz` only:**
```js
{ code: "nz", title: nzMeta.title, description: nzMeta.description,
  regions: ["Auckland", "Wellington", "Christchurch"], currency: "NZD",
  faqs: nzFaqs, image: "/home.png" }
```
**NOT FOUND — read at Phase 5:** the `regions`, `currency` and `languages` values for
`/us`, `/au`, `/ca`, `/ae`. (`/ae` likely passes `languages: ["English", "Arabic"]` given
the builder's comment — **verify, do not assume**.)

**Meta objects** live in `src/utils/Constant/{newZealand,unitedStates,australia,canada,uae,europe}.js`
as `nzMeta` / `usMeta` / `auMeta` / `caMeta` / `aeMeta` / `euMeta`, each `{ title,
description, keywords }`. **Not transcribed** — read each at Phase 5. Guide §3.1 gives the
rendered titles (`Software Development Company New Zealand`, etc.), which look consistent,
but the raw prop and the 60-char rule must be checked per page.

**`/europe`** does **not** call `buildCountrySchema` (it is outside `COUNTRIES` — the
builder would `throw`). Its JSON-LD is constructed inline in `EuropePage.jsx` lines ~12–110.
**NOT FOUND — read at Phase 5.**

### I.8 `/privacy` (`src/Pages/PrivacyPolicy.jsx`)

| | |
|---|---|
| `title` prop | `Privacy Policy \| Futurise Solutions` |
| **Resolved** | **unchanged** — already contains the brand |
| `description` | `How Futurise Solutions collects, uses and protects your personal information across our AI, web, mobile and blockchain services.` |
| canonical | `https://www.futurisesolutions.com/privacy` |
| `keywords` | `Futurise Solutions privacy policy, data protection, personal information, GDPR, New Zealand Privacy Act, data security` |
| JSON-LD | 1 from `<Seo>` + static `@graph` = **2** ✅ |

VERBATIM:
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Privacy Policy — Futurise Solutions",
  "url": "https://www.futurisesolutions.com/privacy",
  "description": "Privacy policy detailing how Futurise Solutions handles personal data.",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.futurisesolutions.com/" },
      { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://www.futurisesolutions.com/privacy" }
    ]
  }
}
```
Page constants: `LAST_UPDATED = "15 June 2025"`, `COMPANY = "Futurise Solutions"`,
`EMAIL = "business@futurisesolutions.com"`, `ADDRESS = "Huddart Parker Building,
Wellington Central, Wellington 6011, New Zealand"`. 10 numbered sections with `id` anchors
(`information-we-collect`, `how-we-use`, `data-sharing`, `data-security`, `your-rights`,
`data-retention`, `childrens-privacy`, `international-transfers`, `policy-changes`,
`contact`) and a sticky TOC sidebar.

### I.9 `/blog/[slug]` (`src/Pages/BlogDetailPage.jsx`)

| | |
|---|---|
| `title` | `blog.meta?.metaTitle \|\| blog.title` → brand appended if ≤60 |
| `description` | `blog.meta?.metaDescription \|\| blog.shortDescription` |
| canonical | `https://www.futurisesolutions.com/blog/${blog.slug}` |
| `og:image` | `mediaUrl(blog.featuredImage)` |
| `type` | `blog.meta?.ogType \|\| "article"` |
| `noindex` | `/noindex/i.test(blog.meta.robots)` when `meta.robots` present |
| `publishedTime` | `blog.createdAt` |
| `modifiedTime` | `blog.updatedAt \|\| blog.createdAt` |
| `section` | `blog.category` |
| `keywords` | `parsedKeywords.join(", ")` (re-parsed from `meta.metaKeywords` or `tags`) |

SPA JSON-LD, VERBATIM — **1 block**:
```js
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: blog.title,
  description: blog.shortDescription,
  image: mediaUrl(blog.featuredImage),
  datePublished: blog.createdAt,
  dateModified: blog.updatedAt || blog.createdAt,
  author: articleAuthor(),
  publisher: {
    "@type": "Organization",
    name: "Futurise Solutions",
    logo: { "@type": "ImageObject", url: "https://www.futurisesolutions.com/favicon-new.png" },
  },
  mainEntityOfPage: `https://www.futurisesolutions.com/blog/${blog.slug}`,
}
```

**Edge-rendered JSON-LD (`middleware.js`) — 2 blocks, richer. VERBATIM:**
```js
[
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonical}#article`,
    headline: blog.title,
    description,
    image: [image],
    datePublished: published,
    dateModified: modified,
    author: authorNode,
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    url: canonical,
    ...(category ? { articleSection: category } : {}),
    ...(blog.tags?.length ? { keywords: blog.tags.join(", ") } : {}),
    inLanguage: "en",
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: blog.title, item: canonical },
    ],
  },
]
```
where `ORG_ID = "https://www.futurisesolutions.com/#organization"`.

> **Target state for Next:** unify these. Server-render `BlogPosting` (the edge version,
> which is the better one) + `BreadcrumbList`, and the guide's §7.2 target of 3 blocks is
> met by adding the `@graph` every other route already carries. **Current state is 2 for
> crawlers, 1 + `@graph` for the SPA — not "1" as the guide states.**

`articleAuthor()` (`src/utils/Constant/team.js`) currently returns:
```json
{ "@type": "Organization", "name": "Futurise Solutions", "url": "https://www.futurisesolutions.com" }
```
because `TEAM_PUBLISHED = false`. It becomes a `Person` node once the team is published.
`articleAuthorName()` returns `"Futurise Solutions"`.

### I.10 404 (`src/Pages/NotFound.jsx`)

| | |
|---|---|
| `title` prop | `Page Not Found (404)` |
| **Resolved** | `Page Not Found (404) \| Futurise Solutions` (42 chars → brand appended) |
| `description` | `The page you're looking for doesn't exist or has been moved.` |
| `noindex` | ✅ → `robots: noindex, follow` |
| JSON-LD | static `@graph` only = **1** |
| H1 | `This page drifted into the future.` ✅ matches guide |
| Status | 200 in the SPA; **404** via `dist/404.html` + Vercel, and via `middleware.js` / `blog-fallback` for blog paths |

### I.11 Routes NOT transcribed — must be read before porting

These render `<Seo>` but their exact props and JSON-LD were **not** transcribed. They must
be read in full at their Phase 5 step (AGENTS.md rule 3 requires that anyway):

| Route | File | Lines |
|---|---|---|
| `/portfolio` | `src/Pages/Portfolio.jsx` | 299 |
| `/pricing` | `src/Pages/PricingGuide.jsx` | 366 |
| `/contact` | `src/Pages/ContactusPage.jsx` | 213 |
| `/case-studies` | `src/Pages/CaseStudiesPage.jsx` | 350 |
| `/case-studies/*` ×6 | `src/Pages/CaseStudyDetailPage.jsx` | 784 |
| `/terms` | `src/Pages/TermsConditions.jsx` | 499 |
| `/blog` | `src/Pages/BlogsPage.jsx` | 202 |
| `/us` `/au` `/ca` `/ae` `/europe` | 5 page files | 399–545 each |

Their JSON-LD **block counts** are known from the guide's §3.1 and are consistent with the
`<Seo>` + static `@graph` pattern, but **the content is not verified.**

### I.12 `robots.txt` and `llms.txt`

Both are static files in `public/`. Contents **not transcribed** — read before writing
`app/robots.ts` and `app/llms.txt/route.ts`. Note `vercel.json` redirects `/llms` →
`/llms.txt` (301); that redirect must be carried into `next.config.ts`.

### I.13 Sitemap

Generated by `writeSitemap()` in `prerender.js` from the routes actually built + the blog
list. Priority weighting is in `weightFor(loc)` — **not transcribed**, read before writing
`app/sitemap.ts`. The **refuse-to-write-on-API-failure guard** is a genuine safety property
and should be reproduced in spirit.

---

## Files I could not fully read

**None.** Every file in `src/` and `api/`, plus `index.html`, `middleware.js`,
`prerender.js`, `vite.config.js`, `vercel.json`, `package.json`, `.env` and `.env.example`
was opened. Nothing was truncated by a tool limit.

Two files were read **in structure only** (headings, imports, exports, keyframes) rather
than line-by-line, because they are large and their content is page copy that AGENTS.md
rule 3 requires be re-read immediately before its own port:

| File | Lines | What I have | What I do not |
|---|---|---|---|
| `src/Components/ServiceComponents/ServiceHeroVisual.jsx` | 963 | all 10 keyframes verbatim; structure (6 per-service SVG diagrams) | the SVG geometry and per-element animation shorthands |
| `src/utils/Constant/caseStudies.js` | 731 | export names (`caseStudies`, `caseStudiesNav`, `caseStudyForService`) and consumers | the 6 case-study content payloads |

Neither is a Phase 0 deliverable gap — both are Phase 4/5 reads.

---

## What is still unknown — decisions needed from you

### 🔴 Blocking (Phase 1 should not start until these are answered)

1. **Does the migration still make sense?**
   The guide's stated primary justification — 83 blog posts invisible to crawlers — is
   false. `middleware.js` already edge-renders full articles to Googlebot, GPTBot,
   ClaudeBot, PerplexityBot and 40+ others, verified live today (4,879 words, 16 `<h2>`,
   `X-Rendered-By: futurise-edge-ssr`). The real remaining wins are JS weight, image
   hygiene, and removing the Puppeteer prerender pipeline — all genuine, none worth "12×
   more crawlable content". **Do you want to proceed on the revised rationale?**

2. **Is `MIGRATION-GUIDE.md` the source of truth when it contradicts the code?**
   AGENTS.md says the guide wins over AGENTS.md. It does not say the guide wins over the
   codebase. Section 0 lists 12 measured contradictions. **I am assuming the code wins on
   facts and the guide wins on intent — confirm.**

3. **`/futurise-admin/blog` — port, drop, or defer?**
   495-line CMS page + 4 serverless auth endpoints + `@uiw/react-md-editor`. Entirely
   absent from the guide's plan and route count. It is how blog posts are published.

4. **The chatbot — port, drop, or defer?**
   10 files, ~712 lines, an `/api/chat` integration and a keyword fallback. The guide
   describes only "a floating chat launcher".

5. **JS→TS: every file, or `allowJs`?**
   Zero TypeScript exists today. The target is TypeScript. Converting ~23,000 lines is
   materially larger than "port the component". A staged `allowJs: true` is possible.

### 🟡 Needed before the phase that touches them

6. **Dead CSS** — carry across or drop? (Phase 2)
   `.swiper-*` (5 rules, no Swiper import), `.form` (5 rules, no `className="form"`),
   `'Inter'` in the `#app` font stack (never loaded), `GRADIENT`/`GRADIENT_SOFT` exports
   (no importers), `src/utils/Buttons/index.jsx` (no importers).
   Rule 1 says port as-is. Rule 1 also says log improvements. **Which?**

7. **EmailJS keys → env vars?** (Phase 5) Currently hardcoded literals; the guide says
   move them. That is a change.

8. **`VITE_API_BASE_URL` split?** (Phase 1) One public var today, deliberately shared so
   "server and browser cannot disagree". Splitting loses a documented safety property.

9. **`ScrollToTop.jsx` and `PageTransition.jsx`** (Phase 3)
   `ScrollToTop` may be entirely redundant under Next's scroll restoration.
   `PageTransition` re-keys on `pathname` — App Router's nearest equivalent is
   `template.tsx`, which is not identical. Both need a behaviour decision.

10. **Keep the edge middleware?** (Phase 6)
    If `/blog/[slug]` becomes a real SSG route, `middleware.js`, `api/blog-fallback.js` and
    the `vercel.json` blog rewrite all become redundant. That is the *right* outcome — but
    it deletes a working, well-tested system, so it should be deliberate.

11. **The `prerender.js` build guards.** (Phase 5/6)
    `zeroedStats()`, `brokenHubs()` and the sitemap write-refusal are real regression
    protection with real incidents behind them. Next has no equivalent. **Should I rebuild
    them as a post-build check script?**

12. **Font licences.** (blocking for launch, not for Phase 1)
    Files are `Zangezi08_Trial-*` and `aeoniktrial-*`; the family string is literally
    `"Aeonik Trial"`. `src/assests/fonts/COPYRIGHT.txt` needs a human read. Trial licences
    normally forbid production web embedding — **this is already live**, so the exposure
    exists today and the migration does not create it.

### ⚪ Small gaps I will close at the relevant phase (no decision needed)

- `regions` / `currency` / `languages` args for `buildCountrySchema` on `/us` `/au` `/ca` `/ae`
- `/europe`'s inline JSON-LD (5 blocks, constructed in-page)
- Exact `<Seo>` props for the 13 routes listed in I.11
- `public/robots.txt` and `public/llms.txt` contents
- `weightFor()` sitemap priority table
- `ordered-terrain.webp` consumer
- `/europe` LCP element (no `MarketHero`)
- Whether `ai-ml-solutions` / `app-development` hero visuals are intentionally static

---

**Phase 0 complete. Stopping here. Not starting Phase 1.**
