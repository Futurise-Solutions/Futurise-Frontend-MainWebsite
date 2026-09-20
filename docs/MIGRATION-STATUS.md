# MIGRATION-STATUS.md

> ## ⚠️ SOURCE-OF-TRUTH PRECEDENCE
>
> **MIGRATION-INVENTORY.md supersedes MIGRATION-GUIDE.md on all factual claims.
> The guide is process-only.**
>
> Where they conflict, the inventory wins — silently, without asking. The guide's
> known-wrong sections are annotated in place with `⛔ CORRECTED` blocks.

---

## Owed

> **Chat is not durable storage.** Every open ask lands here the moment it is made —
> human→agent and agent→human alike. Over a multi-week port across many sessions, the
> things that get lost are exactly the unresolved ones. A turn has already been dropped
> once (the B1 / og:title asks never arrived), which is why this table exists.
>
> **Clear items by striking them through. Never delete a row.**

| # | Item | Owed by | Owed to | Raised | Status |
|---|---|---|---|---|---|
| O1 | ~~Name the three unnamed Phase 1 deviations~~ | Agent | Human | 18 Sep | ✅ **Cleared 18 Sep** — all four now named in the Phase 1 gate section below (ColorModeScript `type`, `turbopack.root`, `agentRules:false`, deleted scaffold `globals.css`) |
| O2 | `og:title` re-run on the six UAs showing "—" in `CRAWLER-COVERAGE-AUDIT.md` §1 | Agent | Human | 18 Sep | ✅ **Cleared 18 Sep** — table updated, all six confirmed |
| O3 | Capture a **real** WhatsApp in-app browser UA from an Android device | **Human** | Agent | 18 Sep | 🔴 **OPEN** — B1 must not be re-run until this lands |
| O4 | Choose + justify the **global daily** chat budget ceiling | Agent | Human | 18 Sep | ✅ **Cleared 18 Sep** — see D23; 2,000 req/day, fails closed to keyword fallback |
| O5 | Read `ServiceHeroVisual.jsx` line-by-line (963 lines, SVG geometry included) | Agent | — | 18 Sep | 🔴 **OPEN — blocks Phase 4** |
| O6 | Read `caseStudies.js` line-by-line (731 lines, all 6 payloads) | Agent | — | 18 Sep | 🔴 **OPEN — blocks Phase 5** |
| O7 | Specify the backend auth mechanism for Phase 5.5 | **Human** | Agent | 18 Sep | 🔴 **OPEN — blocks Phase 5.5** (D22) |
| O8 | Verify whether `ColorModeScript` is still doing anything, given the mode is locked and the three attributes are now declared server-side. If redundant it is a deletable blocking inline script. | Agent | Human | 18 Sep | ⏸️ **DEFERRED to Phase 8** — do not touch before. Logged as A7 in the backlog. |
| O9 | Human read of `src/assests/fonts/COPYRIGHT.txt` — trial-licence exposure | **Human** | Agent | 18 Sep | 🟡 **OPEN — blocks launch, not any phase** |
| O10 | **Sweep B — string-fidelity byte comparison** (ported string constants vs source bytes) | Agent | — | 19 Sep | ⏸️ **DEFERRED TO PHASE 4, BY DECISION.** Build it **immediately before the ClientsReviews probe**, not earlier. Reason: the shell has almost no prose and the AnnouncementBar `TEXT` const is already byte-asserted against source, so Sweep B has nothing meaningful to measure or control against today. The probe's Abbas Kagzi testimonial is where real prose first appears — curly quotes, em dash — so that is where it earns its cost and gets a real control. **Highest-risk open layer; must not evaporate.** |
| O12 | **Redirects diverge in BOTH directions — Phase 7 must fix BOTH, plus the full `vercel.json` behavioural audit** | Agent | — | 19 Sep | 🔴 **OPEN — MUST BE DONE IN PHASE 7.** Next matches redirect `source` case-INSENSITIVELY; Vercel's are case-SENSITIVE. **Two separate defects — fixing only the first leaves the worse half shipping.** **(A) RESTORE — lost redirects:** `/About` 404s where production 308s. (Porting the rule verbatim creates an infinite loop: `/about` matches `/About` → redirects to itself → `ERR_TOO_MANY_REDIRECTS`, blank page. Removed to unbreak `/about`.) **(B) SUPPRESS — INVENTED redirects, the worse half:** `/home` and `/llms` are written lowercase and look correct, but Next also answers `/Home`, `/HOME`, `/hOmE`, `/LLMs`, `/LLMS` — all **308**, where production **404s**. A permanent redirect from a URL that has never existed tells crawlers those URLs are canonical-adjacent and worth following, and creates an **unbounded set of case-variant URLs that all resolve**, on a site whose remaining SEO argument rests on not sending crawlers wrong signals. The old site has none of this. **Deliverable:** all three as explicit case-sensitive `pathname === …` comparisons in `proxy.ts` emitting **308** (not 301 — Vercel serves `"permanent": true` as 308), AND the `/home` + `/llms` entries **removed from `next.config.ts`** so the case variants fall through to 404. **Acceptance: the FULL table in `REDIRECT-BEHAVIOUR-BASELINE.md` must match by curl — including the 404 rows.** Asserting only that `/About` 308s passes (A) while leaving (B) shipping. **Also in scope:** full `vercel.json` behavioural audit — rewrites, headers, `cleanUrls`, `trailingSlash`, cache-control — per rule 1a/D29, verified by curl, **never** by reading the config. |
| O11 | **Hover pass** — element-level hover captures diffed against production | Agent | — | 19 Sep | ⏸️ **DEFERRED TO PHASE 4, BY DECISION.** Exactly one hover-dependent element exists today (the footer thumbnail `_groupHover` → CSS mechanism change). Phase 4 has many. Build it against ClientsReviews and the Phase 4 components together. Acceptance criterion "hover states on nav, buttons and cards match" remains **unverified** until then — recorded, not forgotten. |
| O13 | **Standing check for font preloads + double-downloads** | Agent | — | 19 Sep | 🟡 **OPEN — PHASE 8, with A8.** ⚠️ The *numbers* are no longer in doubt: re-measured 19 Sep — **port 0 font preloads, production 0 font preloads, 5 fetches / 5 unique / 0 duplicates.** `preload: false` is justified by measurement. What is missing is a **standing** check: that was a one-time measurement and does not run at future gates. If a future `localFont()` call ships `preload: true`, ~245KB of font returns to the critical path and **no instrument would notice**. Deferred by decision — the failure mode is a **performance** regression, not a parity failure, and performance is Phase 8's job, which **A8** already owns. **Deliverable:** assert `<link rel=preload as=font>` count and no duplicate face fetches, expected values from the inventory per rule 8c. Note `document.fonts.size` reads 15 in dev (11 project + 4 dev-overlay Geist faces) — the check must not naively assert 11. Found by the gate-claim audit (`GATE-CLAIM-AUDIT.md`). |

> ## 🧊 INSTRUMENT WORK IS FROZEN (19 Sep 2026)
>
> **No new checks, no new sweeps, no new rules until the ClientsReviews probe produces
> data.** Human decision, correcting the cumulative effect rather than any single
> addition: Phase 3 has spent ~7 sessions porting 3 components, most of it building the
> instrument rather than using it. The instrument is good enough now.
>
> If the probe finds something the current checks miss, a check is added **then** —
> justified by evidence, not by anticipation.
>
> **Path to the data:** Phase 3 gate → Section / SectionHeading / GlassCard → Sweep B →
> ClientsReviews probe → report (wall-clock, turns, bugs by layer, checks extended).
> Nothing gets inserted between those steps.
>
> 🔍 **PROBE BRIEF — WATCH FOR THE PHASE 3 SIGNATURE AT MOBILE WIDTH.** Phase 3 closed with
> three open deltas (footer mobile 1.834%, tablet 1.191%, drawer 1.296%) whose signature is
> a ~36–47px band near the bottom at **every** width plus extra 12–15px text-height bands
> at narrow widths only. **If ClientsReviews shows a narrow-viewport delta the desktop does
> not, that is the second data point and we chase it then, with more evidence.** Diff the
> probe at mobile/tablet/desktop, not desktop alone.

---

## Current phase

**PHASE 2 — COMPLETE.** ✅ Gate accepted by the human 19 Sep 2026.

**PHASE 3 — IN PROGRESS.** **All three components are ported, wired and building.**
AnnouncementBar ✅, Navbar ✅, Footer ✅, Logo ✅, BookingContext ✅, analytics ✅,
assets + constants ✅, flex shell ✅, `tsc` clean ✅, `next build` green ✅.

**Not yet gated.** Remaining: the first `scripts/visual-diff.mjs` run at 390/768/1440,
popover-portal capture, mobile-drawer capture with scroll-lock, and the five resolution
checks. See the Phase 3 checklist near the end of this file for the exact resume point.
**No ChatBubble** (D24) — its absence bottom-right is the one expected diff delta.

---

## STOP GATE 2 evidence (19 Sep 2026)

Measured with headless Chromium at the **1127 px** viewport, matching the guide's
reference measurement. Production = `https://www.futurisesolutions.com/`.

### Computed styles — all 18 values match

#### H1 (72px cut)
| prop | PRODUCTION | NEW | match |
|---|---|---|---|
| fontFamily | `Zangezi` | `zangezi` | ✅ (same face, next/font renames) |
| fontSize | `72px` | `72px` | ✅ |
| fontWeight | `700` | `700` | ✅ |
| letterSpacing | **`-2.16px`** | **`-2.16px`** | ✅ |
| lineHeight | `74.16px` | `74.16px` | ✅ |
| color | `rgb(244, 242, 255)` | `rgb(244, 242, 255)` | ✅ |

#### H2 (42px cut)
| prop | PRODUCTION | NEW | match |
|---|---|---|---|
| fontFamily | `Zangezi` | `zangezi` | ✅ |
| fontSize | `42px` | `42px` | ✅ |
| fontWeight | `700` | `700` | ✅ |
| letterSpacing | **`-0.84px`** | **`-0.84px`** | ✅ |
| lineHeight | `48.3px` | `48.3px` | ✅ |
| color | `rgb(244, 242, 255)` | `rgb(244, 242, 255)` | ✅ |

#### Body
| prop | PRODUCTION | NEW | match |
|---|---|---|---|
| fontFamily | `"Aeonik Trial"` | `aeonik` | ✅ (same face) |
| fontSize | `14px` | `14px` | ✅ |
| fontWeight | `400` | `400` | ✅ |
| letterSpacing | `normal` | `normal` | ✅ |
| lineHeight | `21px` | `21px` | ✅ |
| color | `rgb(176, 168, 200)` | `rgb(176, 168, 200)` | ✅ |

**next/font did NOT shift letter-spacing.** Both −2.16px and −0.84px reproduce exactly, so
no `adjustFontFallback` intervention was needed.

### Faces: eleven declared, no double-download

> ✅ **RE-MEASURED 19 Sep 2026 — both numbers CONFIRMED.** Originally reported without
> citing how they were counted, which left them unclassifiable. Measured directly rather
> than reconstructed from memory:
>
> ```
> PORT  /  →  totalFontFetches 5, uniqueFaces 5, duplicates [], fontPreloads 0
> PROD  /  →  font preloads 0   (1 rel=preload total, as="image")
> PORT  /  →  2 rel=preload total: as="image", as="script" (dev HMR) — no as="font"
> ```
>
> **0 font preloads on both sides; 0 duplicate fetches.** `preload: false` is justified by
> measurement, not by recollection.
>
> ⚠️ **Classification:** this is a **dated one-time measurement, not a standing check.**
> It fixes the record; it does not run at future gates. A future `localFont()` shipping
> `preload: true` would still go unnoticed. That standing check remains **O13 → Phase 8**,
> with **A8**.
>
> 📌 `document.fonts.size` reads **15**, not 11. Explained, benign: **11 project faces**
> (6 aeonik + 5 zangezi, matching this record) plus **4 `__nextjs-Geist` faces injected by
> the dev overlay**. Confirmed dev-only — zero occurrences of "geist" in the SSR HTML and
> zero in ported source. Do not "fix" this; it disappears in production.
>
> "11 faces declared" is separately mechanically verified — **check 3, coverage 6**.

`document.fonts` reports all 11 (5 Zangezi + 6 Aeonik). Only those actually needed are
fetched — 5 of 11 on the scratch page. No face is declared twice: the old `@font-face`
blocks were **not** carried into `globals.css`; next/font is the sole declarer.

### Rendered faces verified via CDP, not just computed styles
`CSS.getPlatformFontsForNode` reports the face the renderer actually chose:

| Element | Face | Custom? |
|---|---|---|
| h1 | `Zangezi08_Trial-Regular` | ✅ true |
| h2 | `Zangezi08_Trial-Regular` | ✅ true |
| p | `AeonikTRIAL-Regular` | ✅ true |
| italic p | `AeonikTRIAL-RegularItalic` | ✅ true — a **real italic cut**, not synthesised |

---

## 🔴 Two real bugs found and fixed in Phase 2

### 1. All body text was rendering in Arial — invisible to a computed-style check

Porting `#app { font-family: 'Aeonik Trial', 'Inter', sans-serif }` **verbatim** broke
every piece of body copy. `#app` is an ancestor of everything, so it is inherited by all
text that does not set its own family. In the Vite app `'Aeonik Trial'` was a real
`@font-face` family; **next/font renames families to a hashed identifier**, so the literal
string matched nothing and the cascade fell through `'Inter'` (never loaded either) to
plain `sans-serif`.

| | production `<p>` | verbatim port `<p>` |
|---|---|---|
| Face actually rendered | `AeonikTRIAL-Regular` | **`ArialMT`** |
| `isCustomFont` | true | **false** |

**Why this matters beyond the fix:** `getComputedStyle` reported
`"Aeonik Trial", Inter, sans-serif` on *both*, so the comparison STOP GATE 2 specifies
**passed while the page rendered in the wrong typeface**. Only `CSS.getPlatformFontsForNode`
surfaced it. Computed styles describe what was *asked for*, not what was *used*.

**Fix:** the first entry now points at `var(--font-aeonik)` — the same variable Chakra's
`fonts.body` uses. Everything else in the rule (the dead `'Inter'`, `sans-serif`, the
smoothing, `text-rendering`) is untouched. **This is the only non-verbatim line in
`globals.css`**, flagged as such in the file.

### 2. Eleven font preloads on the critical path

`preload: true` in next/font is **per-family, not per-face** — it emitted a
`<link rel="preload">` for every one of the eleven declared faces, including all five
italics, putting ~245 KB of font in front of first paint to render two cuts.
Production preloads **zero** fonts (plain `@font-face` + `swap`, fetched on demand).

**Fix:** `preload: false` on both families → **0 preload tags**, matching production.
All eleven stay declared and `display: swap`. Re-verified after the change: rendering
unchanged, real custom faces still used.

---

## STOP GATE 1 evidence (18 Sep 2026)

> ⚠️ **EVIDENCE CLASS: every row below is OBSERVED, NOT VERIFIED.** No instrument existed
> on 18 Sep — `ls scripts/` shows all four scripts dated 19 Sep. Each row is either a
> command reporting its own exit status (appropriate) or a value I read by hand in
> devtools. That is not a defect of Gate 1, but this record originally read as though the
> values were machine-produced, and they were not. See `GATE-CLAIM-AUDIT.md`.
>
> 🔴 **"Zero hydration warnings" was asserted here with NO DETECTOR IN EXISTENCE.** It is
> now enforced by **check 7**, which on its first run found a *second* permanent warning
> (**D11**) that inspection had missed at this gate and at Gate 2.
>
> Since retroactively covered by instruments: `<div id="app">` (check 6), background and
> body colours (visual diff), `data-scroll-behavior` (curl, this session). `tsc --noEmit`
> **re-run 19 Sep: still exit 0.**

| Criterion | Result |
|---|---|
| `npm run dev` boots | ✅ Next.js 16.3.5 (Turbopack), ready in 7.0s |
| Chakra styles in **View Source** (not post-hydration) | ✅ `<style data-emotion="chakra 1symdj0 fubdgu 1xs56z1 …">` — 12 rules server-rendered |
| Same in the **production** prerender | ✅ identical tag in `.next/server/app/index.html` |
| Zero hydration warnings | ✅ 0 concerning console messages, verified headless **without** `suppressHydrationWarning` |
| Background is `#08080d` | ✅ computed `rgb(8, 8, 13)` |
| Body text | ✅ computed `rgb(244, 242, 255)` = `#f4f2ff` |
| Brand gradient resolves | ✅ `linear-gradient(135deg, rgb(123,108,255), rgb(181,123,255))` — proves `violet.500` |
| `container.site` token | ✅ `--chakra-sizes-container-site: clamp(1200px, 85vw, 1560px)` |
| `<div id="app">` wrapper | ✅ present |
| `data-scroll-behavior="smooth"` | ✅ present |
| `npm run build` | ✅ compiles, typechecks, prerenders 3 static pages |
| `npx tsc --noEmit` | ✅ exit 0 |

**Versions:** `next@16.3.5`, `react@19.2.8`, `react-dom@19.2.8`, `@chakra-ui/react@2.10.10`,
`@emotion/react@11.14.0`, `@emotion/styled@11.14.1`, `framer-motion@11.18.2`. Node 24.19.0.
Chakra v2 installed against React 19 with **zero peer conflicts** — the compatibility claim
in guide §6 holds.

### One real bug found and fixed during the gate

`<ColorModeScript>` runs before hydration and sets `data-theme="dark"` +
`style="color-scheme:dark"` on `<html>` and `class="chakra-ui-dark"` on `<body>`. The
server render declared none of them, so React reported a genuine attribute mismatch.
**Fixed by declaring all three server-side in `app/layout.tsx`** so both renders agree —
then re-verified with the suppression flag removed, to prove the fix rather than mask it.
`suppressHydrationWarning` is deliberately **not** used.

### Deviations from the guide's literal code, recorded

| # | Guide says | Shipped | Why |
|---|---|---|---|
| 1 | `<ColorModeScript initialColorMode="dark" type="cookie" />` | `initialColorMode={theme.config.initialColorMode}`, no `type` | The old app (`src/main.jsx`) uses the localStorage default. `type="cookie"` is an unrequested behaviour change (rule 1) and makes the layout cookie-dependent. |
| 2 | — | Added `turbopack.root` | The old Vite app's `package-lock.json` one level up made Turbopack infer the wrong workspace root. |
| 3 | — | Added `agentRules: false` | `next dev` writes its own `AGENTS.md`/`CLAUDE.md`, which **shadow the project's real AGENTS.md** and its precedence rule. |
| 4 | — | Deleted the scaffold's `globals.css` | It shipped `--background:#ffffff`, `font-family: Arial` and a `prefers-color-scheme` block — all fighting a dark-only Chakra theme. |

### Phase 1 files

```
futurise-next/
  app/emotion-registry.tsx   ← hand-rolled Emotion SSR cache (no @chakra-ui/next-js)
  app/providers.tsx          ← EmotionRegistry > ColorModeScript > ChakraProvider
  app/layout.tsx             ← html/body, dark attrs, <div id="app">
  app/globals.css            ← emptied; Phase 2 fills it
  app/page.tsx               ← scratch gate page, DELETED in Phase 5
  theme/index.ts             ← full theme ported verbatim; only `fonts` changed to CSS vars
  theme/fonts.ts             ← ⚠️ PLACEHOLDER — Phase 2 must add all 11 faces
  next.config.ts             ← images, 4 redirects from vercel.json, turbopack.root
```

⚠️ **`theme/fonts.ts` is a stub.** It exports variable names only; no `@font-face` exists
yet, so type currently renders in the `-apple-system` fallback. Phase 2 must wire all
**eleven** faces (the guide lists only 6 and omits every italic). Until then, any
typography measurement is meaningless.

---

## The goal (revised 18 Sep 2026)

> Cut JS payload, fix image/CLS hygiene, and replace the bot-SSR middleware and
> prerender pipeline with native SSG/ISR — removing a silent-failure mode and a
> maintenance surface. Visual parity remains a hard requirement.
> **This is an engineering-debt migration, not an SEO rescue.**

### Arguments that are DEAD — do not cite these

- ~~"83 posts are invisible to crawlers"~~ — false. `middleware.js` edge-renders for bots.
- ~~"12× increase in crawlable content"~~ — false. Content is already crawlable.
- ~~Anything framed as an indexing emergency.~~

### Arguments that are LIVE — this is the real case

1. **Real users get nothing from the bot-SSR.** A person on a mid-range phone still waits
   on ~914 KB of JS and a boot skeleton before seeing a word. Core Web Vitals is measured
   on real users via CrUX, not on Googlebot — so page-experience signals are unaffected by
   the middleware. **Primary argument.**
2. **The UA regex is a permanent liability.** 14 measured misses today; every unlisted
   crawler gets an empty shell, silently, with a 200 status, forever.
   See `CRAWLER-COVERAGE-AUDIT.md`.
3. **UA-based differential serving is cloaking-adjacent.** Tolerated when content is
   equivalent, but deprecated as a recommended pattern, and it fails open — one regex miss
   and a page goes dark with nothing in Search Console until traffic drops.
4. **Maintenance surface.** Edge middleware + Puppeteer prerender + a second app bundle
   exists to reproduce what Next.js does with `export const revalidate`.
5. **Image hygiene.** 71 images without width/height and no responsive `srcset` — real,
   measured, and untouched by any of the above.

---

## Decisions locked in (18 Sep 2026)

| # | Decision | Detail |
|---|---|---|
| D1 | **Code wins on facts. Always.** | Inventory = facts. Guide = process only. No exceptions, don't re-ask. |
| D2 | **Proceed with the migration** | On the revised engineering-debt rationale above. |
| D3 | **Port the chatbot** | Phase 4, with the other shared components. `/api/chat` → Route Handler. Keyword fallback kept **exactly** as-is. |
| D4 | **Port the admin CMS** | **New Phase 5.5**, after all public pages pass their gates. |
| D5 | **Auth endpoints: line-for-line port** | 🔴 No refactor, no library swap, no cookie-flag or token-lifetime change. Security concerns → `IMPROVEMENTS-BACKLOG.md`, never fixed inside the port. A rewritten auth path is not reviewable against a diff. |
| D6 | **No JS→TS conversion during the port** | `allowJs: true, checkJs: false, strict: false`. Existing components stay `.jsx`. **New files only** are `.ts`/`.tsx`: `content/*`, `lib/blog.ts`, `lib/seo.ts`, `theme/*`, `app/**/page.tsx` wrappers, type definitions. Everything else converts after launch, one directory at a time. |
| D7 | **No `title.template` anywhere** | Every page gets `title: { absolute: '...' }` with the exact live string. Verify all 28 with `curl` before Phase 7 closes. See inventory §A.5. |
| D8 | **Do not install Swiper or Leaflet** | Both unused. Delete orphaned `.swiper-*` CSS; log in backlog. |
| D9 | **Drop the `/view` endpoint from the plan** | It does not exist. |
| D10 | **Easing is `[0.22, 1, 0.36, 1]`** | In all 19 transitions. The guide's `[0.16,1,0.3,1]` was never real. |
| D11 | **36 keyframes, not 23** | 31 carry over; 5 `fs-*` deleted in Phase 6. |
| D12 | **Route count is 28 + 83** | 27 public + `/futurise-admin/blog`. |
| D13 | **Theme: add `violet.*` and `container.site`** | Verbatim. `container.site = clamp(1200px, 85vw, 1560px)` sets every section width. Now in AGENTS.md constants. |
| D14 | **`BlogPost` uses the real API shape** | `shortDescription` / `featuredImage` / `createdAt`. Content is Markdown. |
| D22 | **Backend auth lands WITH Phase 5.5, not before** | Confirmed 18 Sep 2026: CMS routes have **no auth middleware at all** (B3), and `/api/chat` is an open unmetered LLM proxy (B4). Frontend-first sequencing is deliberate — 5.5 rewrites the admin frontend anyway, so auth is introduced once, not twice. 🔴 **Do not fix, probe, or touch the backend — not now, not in 5.5.** D5 stands: the admin frontend ports line-for-line *including* sending no auth header. **Phase 5.5 is BLOCKED** until the human specifies the mechanism. |
| D23 | **🔴 RULE-1 EXCEPTION — do not carry the open chat endpoint forward** | The Next Route Handler replacing `/api/chat` ships **hardened from its first commit**. Client-side chatbot behaviour still ports verbatim. See the full exception record below. |
| D24 | **ChatBubble lands in Phase 4, NOT Phase 3** | Resolves a contradiction in the source documents: guide Phase 3 lists `ChatBubble` in the layout shell, while D3 puts the chatbot in Phase 4. **D3 wins — the whole chatbot, launcher included, lands in Phase 4. Nothing half-ported.** Consequence: during Phase 3 the floating bubble is **absent bottom-right on every route**. That is a known, expected delta in the Phase 3 visual diff. Anything outside that region is a real failure. |
| D25 | **Resolution checks are mandatory from Phase 3 onward** | `getComputedStyle` reports what was *requested*, not what the renderer *used*. Four properties lie: `font-family`, `font-weight`, `animation-name`, `background-image`. Script: `scripts/resolution-checks.mjs`. Run on every route at every gate, alongside the pixel diff. Origin: the Phase 2 Arial bug, which passed a full computed-style comparison. Protocol written into MIGRATION-GUIDE.md under "Resolution checks". |
| D26 | **Never tune the diff threshold to make a diff pass** | 0.5% is the gate. If it is genuinely wrong for an articulable reason, raise it with the human and let them move it. Silently moving it is a project-ending habit. |
| D27 | **🔴 RULE-1 EXCEPTION #2 — `next/image` is the DEFAULT from Navbar onward** | Overrides my `assetSrc()`-by-default approach. Full reasoning + fallback rules recorded below, alongside D23. |

---

## 🔴 Recorded deviation from AGENTS.md rule 1 — D23

**This is the only place in the project where I deliberately do not port as-is.**
Recorded in full so the deviation is traceable and nobody later concludes I freelanced.

**Authorised by:** the human, 18 Sep 2026, explicitly overriding rule 1 for this case.
**Scope:** the server-side guarding of one endpoint. Nothing else.

### What rule 1 would have required

Port `POST /api/chat` to a Next.js Route Handler with identical behaviour — which means
unauthenticated and unrate-limited, because that is what it is today (B4).

### Why it is overridden

Porting a known-open endpoint forward is not faithful porting; it is **copying a live
exposure into a new system**. `/api/chat` calls an LLM provider on the company's key, so
the exposure is billing and abuse, not content. Recreating it in the new codebase would
mean knowingly shipping the same hole twice.

### What the new Route Handler ships with, from the first commit

| Guard | Value | Reasoning |
|---|---|---|
| **Rate limit** | **10 requests / IP / minute**, sliding window | Sized against the real UI, not a guess. A visitor asks a question, reads an answer, types another — a genuine burst is 3–5/min at most, so 10 leaves ~2× headroom for a fast reader or a double-submit and still caps an abuser at 600/hr/IP rather than unbounded. **Tell me if you want it tighter.** |
| **Origin / Referer check** | Reject anything not from the site's own origin | Blocks the trivial direct-`curl` case. Explicitly **not** a security boundary on its own (B3 records why) — it is one layer, paired with the rate limit. |
| **Provider key** | Server-side env var only, **never** `NEXT_PUBLIC_*` | A `NEXT_PUBLIC_` prefix inlines the value into the client bundle, publishing the key. |
| **Keyword fallback** | **Preserved exactly as-is**, per D3 | `keywordMatcher.js` + `predefinedQA.js` port verbatim. Unchanged. |

### What does NOT change

**The chatbot's client-side behaviour ports verbatim** — UI, copy, timing, animation,
`AnimatePresence` transitions, the two-stage lazy load, and the fallback logic on
`quota_exceeded` / `error` / network failure. Only the endpoint's server-side guarding
differs. A visual or behavioural diff of the widget itself must show nothing.

### Scope limit

This exception covers **`/api/chat` only**. It does **not** extend to the admin auth
endpoints — D5 and D22 stand: those port line-for-line, including sending no auth header.

---

## 🔴 Recorded deviation from AGENTS.md rule 1 — D27 (`next/image` by default)

**Authorised by:** the human, 19 Sep 2026, explicitly overriding rule 1 for image porting.
**Scope:** how images are rendered. Not layout, not styling, not copy.

### What I proposed, and why it was wrong

On finding that static imports resolve to a **string** in Vite but an **object**
(`{src, width, height, blurDataURL}`) in Next, I added `utils/asset.js` → `assetSrc()`
to unwrap the object, keeping every ported call site on a plain `<Image src="...">`.

That optimises for the wrong thing. **The object I was unwrapping is where the intrinsic
dimensions live** — and missing dimensions are exactly why 71 images on `/` have no
`width`/`height` today. Porting eight components through `assetSrc()` would mean Phase 8
has to reopen all of them to undo it.

**And Phase 8 is the phase most likely to be cut.** This migration is estimated at 4–6
weeks and may run longer; when a project overruns, the optimisation phase is what gets
dropped. Deferring the image work parks **one of only five live arguments for doing any of
this** (see "Arguments that are LIVE", item 5) in the phase least likely to happen.

The guide already specified `next/image` with local imports during Phase 5. My approach
inverted that.

### Why this is a rule-1 exception at all

"Never mix performance work with parity work" normally forbids this. The human's narrow
relaxation, recorded verbatim in intent:

> The image pipeline is not a separate optimisation here, it is **part of rendering the
> image correctly**, and the diff gate will catch it immediately if it breaks parity.

### The rule, from Navbar onward

| | Rule |
|---|---|
| **DEFAULT** | `next/image`, passing the **static import directly**. Intrinsic dimensions come through, `width`/`height` land in the HTML, CLS is fixed as a side effect of porting rather than as a later project. |
| **FALLBACK** | If a specific image fights the layout — `object-fit` tricks, CSS-background usage, a container assuming a bare `<img>` — use `assetSrc()`, **log the call site in the table below**, and move on. **One attempt maximum per image.** A logged fallback is fine; a stalled phase is not. |
| **NON-NEGOTIABLE** | Each page's **LCP image uses `next/image` with `priority`**. No fallback on that one. |

If a page's diff regresses because of `next/image` and it cannot be resolved in one
attempt: fall back, log it, and tell the human. A logged fallback beats a phase that
stops moving.

`assetSrc()` stays in the codebase — it is genuinely needed for the fallback cases and for
anything that remains a CSS background. It is simply no longer the default.

### `assetSrc()` fallback inventory — Phase 8 worklist

Every call site, so Phase 8 has a worklist rather than a grep.

| File | Image(s) | Why not `next/image` | Logged |
|---|---|---|---|
| — | — | **No fallbacks yet.** Every image ported so far uses `next/image` with the static import passed directly. | — |

**Verified in the rendered HTML after the Navbar port — 7 of 7 images carry `width` and
`height`:**

| Image | Rendered attributes |
|---|---|
| Wordmark (`New-logo-3x.png`) | `width="354" height="120"` + `srcset` 1x/2x + `priority` |
| 6 × service icons (nav dropdown + mobile drawer) | `width="20" height="20"` / `width="18" height="18"` |

The CLS fix is landing as a side effect of porting, which is the entire point of D27.
`assetSrc()` remains available and unused.

---

## Debt items — MUST be cleared before the phase that needs them

| Item | Owed by | Why it is outstanding |
|---|---|---|
| 🔴 **Read `ServiceHeroVisual.jsx` line-by-line (963 lines)** | **Before Phase 4** | Phase 0 read it structurally: all 10 keyframes captured verbatim, but **not the SVG geometry** for its 6 per-service diagrams. Keyframes alone will not reproduce it. |
| 🔴 **Read `caseStudies.js` line-by-line (731 lines)** | **Before Phase 5** | Phase 0 captured exports and consumers only, **not the 6 case-study content payloads**. |
| 🟡 Read the 13 routes listed in inventory §I.11 | Each at its own Phase 5 step | `<Seo>` props + JSON-LD not transcribed. AGENTS.md rule 3 requires a full read before porting anyway. |
| 🟡 `buildCountrySchema` args for `/us` `/au` `/ca` `/ae` | Phase 5 | `regions` / `currency` / `languages` not transcribed. Do not assume `/ae` passes Arabic — verify. |
| 🟡 `/europe` inline JSON-LD (5 blocks, in-page) | Phase 5 | Does not use `buildCountrySchema`. |
| 🟡 `public/robots.txt` + `llms.txt` contents | Phase 7 | Not transcribed. |
| 🟡 `weightFor()` sitemap priority table | Phase 7 | Not transcribed. |
| 🟡 `/europe` LCP element | Phase 5 | No `MarketHero`; LCP candidate unconfirmed. |

---

## Open questions for the human (non-blocking)

Raised in inventory §"What is still unknown". None block Phase 1.

- Dead CSS: carry `.swiper-*` / `.form` / `'Inter'` / `GRADIENT` across, or drop? *(D8
  resolves Swiper; the rest are open)*
- EmailJS keys → env vars? Currently hardcoded literals.
- `VITE_API_BASE_URL`: split into public + server-only, or keep one shared var?
- `ScrollToTop.jsx` — likely redundant under Next's scroll restoration. Verify.
- `PageTransition.jsx` — route-keyed remount has no exact App Router equivalent.
- Keep or delete the edge middleware once `/blog/[slug]` is real SSG?
- Rebuild `prerender.js`'s build guards (`zeroedStats`, `brokenHubs`, sitemap
  write-refusal) as a post-build script?
- 🔴 **Font licences** — `*_Trial-*` files, family literally `"Aeonik Trial"`.
  `src/assests/fonts/COPYRIGHT.txt` needs a human read. Blocking for **launch**, not for
  Phase 1. Exposure exists today; the migration does not create it.
- ~~🟠 CMS admin mutations send no auth header~~ — **RESOLVED 18 Sep 2026: confirmed
  unauthenticated.** See B3/B4 in the backlog and decisions D22/D23. Backend fix deferred
  to Phase 5.5; **Phase 5.5 is blocked** until the auth mechanism is specified.

---

## Phase log

| Phase | Status | Date | Notes |
|---|---|---|---|
| **0 — Read the old codebase** | ✅ **COMPLETE** | 18 Sep 2026 | `MIGRATION-INVENTORY.md` §A–I delivered. Found the guide's headline premise does not reproduce; 12 factual corrections. Gate passed, human confirmed. |
| **0.5 — Crawler audit + guide corrections** | ✅ **COMPLETE** | 18 Sep 2026 | `CRAWLER-COVERAGE-AUDIT.md` delivered: all 14 priority UAs covered, 14 other misses found, **1 live user-facing false positive (WhatsApp in-app browser)**. Guide annotated in 8 places. |
| **1 — Scaffold Next.js + providers** | ✅ **COMPLETE** | 18 Sep 2026 | STOP GATE 1 passed — Emotion styles server-rendered, 0 hydration warnings (verified without suppression), `#08080d`, prod build green. Found + fixed a real `ColorModeScript` hydration mismatch. 4 recorded deviations. Awaiting human sign-off. |
| **2 — Theme, fonts, global CSS, keyframes** | ✅ **COMPLETE** | 19 Sep 2026 | STOP GATE 2 passed — all 18 computed values match production; 11 faces declared, 0 double-downloads, 0 preloads. Found + fixed **2 real bugs**: body text rendering in Arial (invisible to computed-style checks), and 11 fonts preloaded onto the critical path. Awaiting human sign-off. |
| 3 — Layout shell | 🟠 **CLOSED WITH 3 OPEN DELTAS — NOT "PASSED"** | 19 Sep 2026 | Announcement **0.000% ×3**, header **0.000% ×3**, footer desktop 0.290% ✅, popover 0.002% ✅. **Open: footer mobile 1.834%, footer tablet 1.191%, drawer 1.296%.** Track 2 (image geometry) PASS on all 6 image targets; exclusion guard max 10.2%. Deltas carried into Phase 4 **by decision** — footer and drawer are on screen during the ClientsReviews probe, so a systemic cause reappears there and gives a second data point. Band positions + hypothesis recorded at the end of this file. |
| 4 — Shared components (+ chatbot, D3) | ⬜ Not started | | |
| 5 — Static pages, one at a time | ⬜ Not started | | |
| **5.5 — Admin CMS (D4, D5)** | 🔴 **BLOCKED** | | New phase. After all public gates pass. **Blocked by D22** — cannot open until the human specifies the backend auth mechanism. |
| 6 — Blog (SSG/ISR) | ⬜ Not started | | |
| 7 — SEO / AEO / GEO layer | ⬜ Not started | | |
| 8 — Performance pass | ⬜ Not started | | |
| 9 — Cutover, redirects, rollback | ⬜ Not started | | |

---

## Phase 3 — in-progress checklist (resume point)

**Scope:** AnnouncementBar, Navbar (Header), Footer. **No ChatBubble** (D24).

### Pre-phase work — DONE
- [x] `agentRules: false` proven empirically **with a control** (flag on → both files
      regenerate; flag off → neither does). The option is not a no-op.
- [x] `scripts/resolution-checks.mjs` written — 5 checks, exits non-zero on failure.
- [x] "Resolution checks — what computed style will not tell you" added to
      MIGRATION-GUIDE.md, with the Arial bug as the canonical example and the
      retroactive Gate-2 specimen step.
- [x] Backlog **A8** (Phase 8 font preload, per-`localFont()` mechanism recorded).
- [x] Decisions **D24** (ChatBubble→Phase 4), **D25** (resolution checks mandatory),
      **D26** (never tune the threshold).

### Ported so far
- [x] `context/BookingContext.jsx` — verbatim + `'use client'`
- [x] `utils/analytics.js` — verbatim + `'use client'`
- [x] `components/layout/AnnouncementBar.jsx` — verbatim; TEXT const copied byte-for-byte
      including the four leading U+00A0 and the mixed escape/literal style
- [x] `components/common/Logo.jsx` — react-router `<Link to>` → `next/link` `<Link href>`
- [x] Assets copied: `assests/**` (icons, partner logos, project images, visuals, logo)
- [x] Constants copied: `utils/Constant/{index,caseStudies,countries}.js`
- [x] `utils/asset.js` — **new helper**, see the finding below

### Ported (cont.)
- [x] `components/layout/Navbar.jsx` — router migration (next/link, useRouter,
      usePathname), 2 Popovers, mobile Drawer, scroll progress, `layoutId` highlight.
      Service icons → next/image per D27.
- [x] `components/layout/Footer.jsx` — 5 link groups, newsletter (EmailJS keys ported
      as-is, NOT env-var-ified), markets row, CSS wordmark + mirrored reflection.
      Project thumbnails → next/image `fill` per D27.
- [x] Wired into `app/layout.tsx` inside `<BookingProvider>`, with the old App.jsx
      flex shell reproduced (`#app` minH 100vh / flex column, `main` flex:1) so the
      Footer`s `mt="auto"` pins correctly. Verified: main and footer ARE direct
      children of #app (Providers renders as a fragment), `main` computes flex-grow:1.
- [x] Installed missing runtime deps: `react-icons@5.7.0`, `@emailjs/browser@4.4.1`
- [x] `npx tsc --noEmit` clean; `npm run build` green

### Remaining for the Phase 3 gate
- [ ] `scripts/visual-diff.mjs` — first real run; expect to debug the script itself
- [ ] Popover portal capture — Chakra renders PopoverContent in a portal at body level.
      **Confirm the script actually captures the portal content before trusting a pass.**
      An empty capture that "passes" is the Arial bug wearing a different hat.
- [ ] Mobile drawer at 390px, opened, WITH body scroll-lock active. Scroll-lock changes
      body dimensions → full-page screenshot height changes → expect the size-mismatch
      branch to fire. Handle it deliberately, do NOT loosen the comparison.
- [ ] Gate: 390 / 768 / 1440, < 0.5%, ChatBubble region the only explained delta,
      both popovers + drawer captured, + the 5 resolution checks

### 🔴 Finding: static image imports resolve differently in Vite vs Next

| | Vite | Next |
|---|---|---|
| `import logo from './x.png'` | `"/assets/x-a1b2c3.png"` (**string**) | `{ src, width, height, blurDataURL }` (**object**) |

Verified by rendering the barrel: `logo` → `{"src":"/_next/static/media/New-logo-3x.3_s-pj0rcq4qe.png","width":354,"height":120,…}`.

Every ported component passes these imports straight into Chakra's `<Image src={...}>`,
which expects a string. Passing the object renders `src="[object Object]"` and a broken
image — **no build error, no console warning**. Resolution check 4 catches it, but only
after the fact.

**Mitigation:** `utils/asset.js` exports `assetSrc()` / `assetSize()`. Ported call sites
use `src={assetSrc(x)}` so they still read like the originals.

⚠️ **Applies to every remaining phase.** Any component doing `<Image src={importedAsset}>`
needs it — Navbar service icons, Footer project thumbnails, Partners, OurServices,
WhyChooseUs, TechnologyExcellence, TeamSection, hero client logos.
**Exception:** where a component is converted to `next/image` in a later phase, pass the
**import itself**, not the helper — `next/image` needs the object for intrinsic
width/height, which is what fixes the 71 missing dimension attributes.

---

## Phase 3 — FIRST VISUAL DIFF RESULTS (19 Sep 2026)

**Raw first numbers, reported before any fixing, as instructed:**

| Target | mobile | tablet | desktop |
|---|---|---|---|
| announcement | **12.419%** | **13.806%** | **13.433%** |
| header | **0.000%** ✅ | **0.000%** ✅ | **0.000%** ✅ |
| footer | **3.799%** | SIZE MISMATCH (1px) | **2.231%** |

**The header is pixel-perfect at all three viewports** — including both Popover triggers,
the nav pill, the scroll-progress bar and the wordmark. That is the single largest
component in the phase and it ported exactly.

### After three rounds of fixing

| Target | mobile | tablet | desktop |
|---|---|---|---|
| announcement | 9.224% | 10.695% | 11.471% |
| header | 0.000% ✅ | 0.000% ✅ | 0.000% ✅ |
| footer | 2.965% | 2.150% | **0.411%** ✅ |

**Still failing. Phase 3 is NOT gated.**

### What the first run found — 3 script bugs, 2 real code bugs

#### Script bugs (measurement artefacts, now fixed)

1. **Marquee not reset.** Zeroing `animation-duration` freezes an infinite marquee
   *wherever it happens to be*, not at frame 0. Both captures caught the announcement bar
   at different offsets. Fixed by forcing `transform: translateX(0)` on `.announcement-track`
   and the `react-fast-marquee` classes.
2. **Sticky header overlapping element captures.** Playwright scrolls an element into view
   before screenshotting it; the `position: sticky` header rides down and paints over the
   top of the footer. Fixed by neutralising sticky/fixed positioning for non-header
   captures. Worth **1.6pp** on the desktop footer on its own.
3. **1px size mismatch failing outright.** Tablet footer was 768x1212 vs 768x1211 —
   sub-pixel rounding from `clamp()`/vw-driven type. Now: ≤2px on either axis is cropped
   to the common area and **reported in a `note` column**; anything larger is still a hard
   SIZE MISMATCH. This is a tolerance on *capture geometry*, **not** on the diff threshold
   (D26 intact).

#### Real code bugs (found by the diff, fixed)

4. 🔴 **A SECOND instance of the Arial bug — in `AnnouncementBar`'s inline `<style>`.**
   Same root cause as the `#app` rule: `font-family: 'Aeonik Trial', …` matches nothing
   under next/font.
   - production → `AeonikTRIAL-Regular` (custom, 157 glyphs)
   - port → **`SegoeUI-Semibold`** (NOT custom, 156 glyphs)
   - **`getComputedStyle().fontFamily` was IDENTICAL on both.** Only CDP
     `CSS.getPlatformFontsForNode` showed it.

   This is the second time this exact class of bug has appeared in two phases. **Any
   ported CSS naming a font family by literal string is suspect.**

5. 🔴 **Nine U+00A0 non-breaking spaces silently became regular spaces.**
   The source `TEXT` const mixes `\uXXXX` escapes with literal characters. When I wrote
   the ported file, **the escape sequences were interpreted rather than written
   literally**, so `\u00a0\u00a0\u00a0\u00a0` became four ordinary spaces.
   - production: 27 nbsp · port: **18 nbsp** · same 168 characters otherwise
   - Non-breaking and regular spaces have **different advance widths**, so the whole
     marquee shifted.

   This is precisely the corruption AGENTS.md rule 5 exists to prevent, and character
   counts alone would not have caught it — the string *length* was identical.

   **Fix:** copied the literal's exact bytes from the source file programmatically and
   verified `portLiteral === sourceLiteral`. **Lesson: for any string containing escapes,
   copy bytes from source — never retype, and never trust a visual match.**

### Remaining, for the next session

- [ ] **announcement ~9–11%** — DIAGNOSED, NOT YET RESOLVED. Reported rather than
      chased further; see the analysis block below.
- [ ] **footer mobile 2.965% / tablet 2.150%** unchanged across all fixes while desktop
      dropped to 0.411% — a **breakpoint-specific** cause, not a global one. Likely the
      4-up→2-up thumbnail grid or the markets row wrapping.
- [ ] Popover open-state capture **with portal presence asserted**
- [ ] Mobile drawer capture with scroll-lock
- [ ] Resolution checks (6, incl. the new flex-chain assertion)
- [ ] Hover pass
- [ ] Mechanism-changes table
- [ ] Dependency-delta sweep

### Announcement bar — diagnosis of the residual ~9–11%

Investigated to the point of diminishing returns, then stopped and reported (one image,
one attempt policy applied to a diagnosis rather than a fix).

**What was RULED OUT by direct measurement — all confirmed identical on both sides:**

| Checked | production | port | same? |
|---|---|---|---|
| Rendered text (`textContent`) | 168 chars, 27 nbsp, 19 space | 168 chars, 27 nbsp, 19 space | ✅ **byte-identical** |
| Control string `"Book a Complimentary…"` | 281.203px | 281.203px | ✅ |
| Four U+00A0 | 14.406px | 14.406px | ✅ |
| 📅 / 🚀 / 🌎 each | 18.047px | 18.047px | ✅ |
| `font-size` / `weight` / `letter-spacing` / `padding` | 13px / 500 / 0.195px / 0 32px | identical | ✅ |
| Bar height, inner height, background gradient, bottom border | identical | identical | ✅ |
| Rendered face | `AeonikTRIAL-Regular` | `AeonikTRIAL-Regular` | ✅ (after fix 4) |

**The one number that still differs:** the FULL string measures **984.344px** on
production and **981.047px** on the port — **3.3px over ~1045px**, i.e. **~0.3%**.

Every component of that string measures the same in isolation, so this is a **sub-pixel
text-shaping/accumulation difference**, not a mis-ported value. There is no CSS property
left that differs.

**Why it produces a 9–11% pixel diff on a 37px strip:** the bar is a marquee of two
identical repetitions. A 3.3px width difference shifts the SECOND repetition by 3.3px,
and every glyph after the midpoint misregisters by 1–3px. On a strip only 37px tall,
almost all non-background pixels are glyph edges, so a 1px horizontal shift of half the
text lights up a large fraction of them. **The percentage is inflated by the geometry of
the element, not by the severity of the defect.**

Visual inspection of the two crops side by side (`diffs/ann_old.png`, `diffs/ann_new.png`)
shows no perceptible difference: same text, colours, gradient, emoji, spacing.

**Open question for the human — I am NOT acting on this unilaterally (D26):**
a 37px-tall full-width marquee may be a case where a flat 0.5% pixel threshold is the
wrong instrument, since the element is ~95% text edges by area. Options:
 (a) accept and document as a known sub-pixel delta,
 (b) compare the bar with text masked, so the diff measures the chrome,
 (c) leave it FAILING and treat it as a blocker.
**Recommendation: (b)** — it keeps a real gate on everything except the shaping noise.
**Awaiting a decision. Threshold NOT changed.**

---

## Phase 3 — investigation results (19 Sep 2026, session 3)

### ✅ Item 1 — FONT FILES ARE BYTE-IDENTICAL (hypothesis eliminated)

Downloaded the woff2 files production actually serves and hashed them against the bundled
copies:

| Face | prod bytes | port bytes | sha256 equal? |
|---|---|---|---|
| `aeoniktrial-regular` | 6572 | 6572 | ✅ **YES** |
| `aeoniktrial-bold` | 6636 | 6636 | ✅ **YES** |
| `Zangezi08_Trial-Regular` | 41996 | 41996 | ✅ **YES** |

**No metric difference can originate from the font binaries.** The largest-blast-radius
hypothesis is dead. (Production loads only these 3 of the 11 declared faces on `/`, which
also confirms the port's on-demand loading matches.)

### ✅ Footer layout is IDENTICAL at every breakpoint — my grid hypothesis was WRONG

The 4-up→2-up thumbnail grid theory does not survive measurement:

| | mobile old/new | tablet old/new |
|---|---|---|
| footer height | 1684 / **1684** | 1211 / **1211** |
| thumbnail grid columns | `167px 167px` / **identical** | `164px ×4` / **identical** |
| brand grid columns | `350px` / **identical** | `332px 332px` / **identical** |
| image sizes | `165x90 ×4, 100x34` / **identical** | `162x118 ×4, 118x40` / **identical** |
| markets nav | `350x100` / **identical** | `704x82` / **identical** |

Footer link Y-positions are **pixel-identical** — every Δy = 0.00 across 8 sampled links,
same 22.5px line-height. **Geometry is not the cause.**

### 🔴 CORRECTION TO MY OWN HYPOTHESIS — the bar is NOT text rasterisation

I previously concluded the announcement bar's 9–11% was sub-pixel text shaping. **A
text-masking experiment disproves that:**

| Target | normal diff | TEXT-MASKED diff |
|---|---|---|
| announcement (desktop) | 11.471% | **11.471% — UNCHANGED** |
| footer (mobile) | 2.965% | 1.749% |
| footer (tablet) | 2.150% | 1.462% |

Masking `color`/`-webkit-text-fill-color` does **not** reduce the bar at all. The bar's
text uses `-webkit-text-fill-color: transparent` with a **gradient background clipped to
the text**, so the glyphs are painted by the BACKGROUND, not by colour — colour-masking
cannot hide them. **My "distributed sub-pixel shaping" conclusion is not established, and
I should not have stated it as confidently as I did.** Items 2–5 are still owed.

The footer's ~40% drop under masking does show text is roughly half of ITS diff — leaving
~1.5–1.75% of genuinely non-text difference.

### 🔴 Footer diff LOCATED: the project-thumbnail grid

Banding the mobile footer diff in 100px strips:

| band | diff px | % of band |
|---|---|---|
| 0–100 | 529 | 1.36% |
| **100–200** | **3707** | **9.51%** ← |
| **200–300** | **3116** | **7.99%** ← |
| 300–400 | 1310 | 3.36% |
| 700–800 | 2663 | 6.83% |
| 1200–1300 | 2542 | 6.52% |

**y=100–300 is the 4-up project thumbnail grid** — precisely where I made a MECHANISM
CHANGE: Chakra `<Image w/h="full" objectFit="cover">` → `next/image` with `fill` + `sizes`.
Element boxes measure identically (165x90), so the difference is in the **pixels inside**
the images: next/image serves a RESIZED, RE-ENCODED variant (`/_next/image?w=…&q=75`)
rather than the original asset. Re-encoding at q=75 changes pixel values without changing
layout.

**This is a real, explainable code difference, not noise — and it is the first real cost
of D27 surfacing.** Not yet fixed; `quality` and `sizes` are the levers to try first.

### Cookie-consent pill — third-party, non-deterministic

Appeared in one production footer capture as "Allow cookies ×". **Not in `src/` anywhere**
(grep clean), and **does not reproduce on a fresh load** — injected conditionally at
runtime, most likely Clarity's EEA consent banner. Added to `KNOWN_DELTAS` and flagged:
if this widget is wanted on the new site it is a deployment/GTM concern, not a component.
Its exclusion changed no number, confirming it was absent from the measured captures.

### Still owed on the announcement bar (items 2–5)

Not yet run. Given the masking result above, these now matter MORE, not less:
2. CDP `getPlatformFontsForNode` on both sides **after** the fix — byte-equal familyName
3. Full-precision computed metrics (no rounding): `word-spacing`, `font-kerning`,
   `font-feature-settings`, `font-variant-ligatures`, `font-optical-sizing`, `text-rendering`
4. Binary-search the string (first 84 vs last 84 chars)
5. Control render outside the component

**Masking decision deferred to the human. Threshold unchanged (D26).**

---

## 🔴 ROOT CAUSE FOUND — `adjustFontFallback` (19 Sep 2026, session 4)

**Result: announcement bar went from 11.471% → 0.000% at all three viewports.**

### What it was

next/font **synthesises an extra `@font-face` and splices it into the family stack**:

```css
@font-face { font-family: "aeonik Fallback";
             src: local("Arial"); size-adjust: 101.4%;
             ascent-override: 91.72%; descent-override: 20.71%; line-gap-override: 0% }
```

so the computed family became
`aeonik, "aeonik Fallback", -apple-system, system-ui, sans-serif`
where the old app had
`'Aeonik Trial', -apple-system, system-ui, sans-serif`

Any character the real face does not cover — here the **U+2022 bullets** — landed on
**Arial scaled to 101.4%** instead of plain Arial, at a different advance width.

### The measurements that isolated it

| Measure | old | new | delta |
|---|---|---|---|
| Full 168-char string | 984.3438 | 981.0469 | **−3.2969** |
| First 84 chars | 490.8125 | 489.2813 | −1.5312 |
| Last 84 chars | 489.9375 | 488.1563 | −1.7812 |
| 3 emoji alone | 54.1406 | 54.1406 | **0.0000** |
| 27 × U+00A0 alone | 97.2344 | 97.2344 | **0.0000** |
| **Bare `<div>` outside the component** | 962.7344 | 959.4375 | **−3.2969 (reproduces exactly)** |

Then, on the port alone:

| Family stack | width |
|---|---|
| `aeonik, "aeonik Fallback", …` (as shipped) | 981.0469 |
| `aeonik` alone | 983.5000 |
| `"aeonik Fallback"` alone | 1009.1719 |

**After `adjustFontFallback: false`: old 1048.3438 · new 1048.3438 · delta 0.0000.**

### Why a 0.3% width error became an 11% pixel diff

The bar paints glyphs with a **gradient clipped to the text**
(`background-clip: text` + `-webkit-text-fill-color: transparent`) at
`background-size: auto` — i.e. sized to the **element**. Changing the element's width
**remaps which part of the gradient every glyph samples**, so the whole string shifts
colour rather than merely shifting position.

### Process notes

- All ten text metrics (`word-spacing`, `font-kerning`, `font-feature-settings`,
  `font-variant-ligatures`, `font-stretch`, `text-rendering`, `font-optical-sizing`,
  `letter-spacing`, `font-size`, `font-weight`) were **identical** throughout. Items 3
  and 4 came back clean; **item 5 (the bare-div control) is what found it** — the delta
  reproducing outside the component proved the component was innocent.
- The gradient paint comparison (run first, as instructed) came back **identical on every
  property** — correctly ruling the gradient out and pointing at width.
- **My "distributed sub-pixel shaping" conclusion was wrong**, and the retraction was
  right: this was a single, findable, fixable cause.

### ⚠️ Consequence beyond this component — applies to EVERY text element on the site

`adjustFontFallback` is now `false` on **both** families. This is a **parity requirement**,
documented at length in `theme/fonts.ts`. Anything that re-enables it silently re-breaks
text width sitewide.

**It also means STOP GATE 2 passed with this defect present.** The h1/h2/body measurements
matched because those strings are pure Latin and fully covered by the real face — the
synthetic fallback only engages on uncovered characters. A gate can be genuinely passed
and still not prove the absence of a related defect.

### Current diff state

| Target | mobile | tablet | desktop |
|---|---|---|---|
| announcement | **0.000%** ✅ | **0.000%** ✅ | **0.000%** ✅ |
| header | **0.000%** ✅ | **0.000%** ✅ | **0.000%** ✅ |
| footer | 3.509% | 2.540% | 0.790% |

⚠️ **The footer number moved** (desktop 0.411% → 0.790%, mobile 2.965% → 3.509%).

**Checked immediately — the wordmark hypothesis was WRONG.** The footer CSS watermark now
measures **IDENTICALLY** on both sides:

| | old | new | Δ |
|---|---|---|---|
| wordmark (main) | 1160 x 103.391 | 1160 x 103.391 | **0.000** |
| wordmark (reflection) | 1160 x 103.391 | 1160 x 103.391 | **0.000** |
| font-size / letter-spacing | 110px / -3.3px | 110px / -3.3px | same |

So `adjustFontFallback: false` **improved** the heading type too — it did not regress it.
The footer moving is a measurement artefact of comparing two runs where OTHER pixels
changed, not a new defect in the wordmark.

**Remaining footer diff is almost certainly the `next/image` re-encoding** already
located at y=100-300 (the project-thumbnail grid) — exactly what D28 exists to measure
separately. Do not chase it on Track 1.

---

## ✅ THE FOOTER RISE — EXPLAINED AND REVERSED (19 Sep 2026, session 5)

The human refused to accept the unexplained rise. **They were right — it was a second
real bug, not a measurement artefact.** My "measurement artefact" reading was the
convenient one and it was wrong. Second time this phase.

### Step 1 — was it even real? Yes, and perfectly deterministic

| Run | footer desktop diff |
|---|---|
| 1 | 0.939% (12582px) |
| 2 | 0.939% (12582px) |
| 3 | 0.939% (12582px) |
| **production vs ITSELF** | **0.000% (0px)** ×2 |

Zero run-to-run variance, and production is perfectly stable against itself. Nothing could
be blamed on capture noise.

### Step 2 — not images, not text colour

| Condition | diff |
|---|---|
| baseline | 0.939% |
| all footer images hidden | 0.880% (−0.059) |
| text colour-masked | 0.497% |
| **images hidden AND text masked** | **0.439% — still there** |

### Step 3 — located by row/column density

Diff pixels concentrated at **y≈855–862, y≈642–647**, columns clustered **x≈1379–1402**.
y=642–647 is the **Markets row**.

### Step 4 — the bug

Element measurements across the markets row:

| Element | production | port |
|---|---|---|
| `·` separator `<span>` | **29px** | **27px** |
| "New Zealand" `<li>` | 116px | 114px |
| "United States" `<li>` | 119px | 117px |
| "United States" x-offset | 256 | **254** |
| "Australia" x-offset | 375 | **371** |

**2px lost per separator, 6 separators, cumulative** — every market link shifted left,
and the drift grew along the row.

Measuring `·` (U+00B7) per face on the port:

| Face | glyph width |
|---|---|
| aeonik / Arial / -apple-system / sans-serif | 4.672px |
| **system-ui** | **3.047px** ← what was winning |

Live box was 27.047px = 24px padding + **3.047px**.

### Root cause — `fallback` is baked into the CSS variable

next/font bakes the `fallback` array **into the variable itself**, so `--font-aeonik`
expanded to `aeonik, -apple-system, system-ui, sans-serif` rather than the family name.

The legacy rule `#app { font-family: var(--font-aeonik), 'Inter', sans-serif }` therefore
became:

```
aeonik, -apple-system, system-ui, sans-serif, Inter, sans-serif
                       ^^^^^^^^^ inserted AHEAD of Inter
```

where the old app went **straight from Aeonik to Inter**. For any character Aeonik does
not cover, `system-ui` now won instead of the next real face.

**Fix:** removed the `fallback` array from both families. The variable now resolves to the
family name alone and every consumer's own stack is honoured exactly as written.

Verified: `#app` computes `aeonik, Inter, sans-serif` (the old shape), separator
27.047 → **28.672px** (production 29px, rounded).

### Result

| Target | before fallback fix | after |
|---|---|---|
| footer desktop | 0.790% | **0.348% ✅ PASS** |
| footer tablet | 2.540% | 2.098% |
| footer mobile | 3.509% | 2.901% |

Desktop is now **better than the 0.411% measured before `adjustFontFallback` changed** —
so the rise is fully accounted for and reversed. **7 of 9 targets passing; announcement
and header are 0.000% at all three viewports.**

### The pattern, stated once

Both font bugs this phase are the same shape: **next/font alters the FAMILY STACK, and the
damage lands on characters the primary face does not cover.** Pure-Latin text is fine,
which is why Gate 2 passed and why both bugs hid in a bullet and a middot.

**This is exactly what SWEEP C must enumerate — it is now the top priority, and its scope
is confirmed non-theoretical by two independent instances.**

---

## ✅ SWEEP C + the combined font-parity instrument (19 Sep 2026, session 6)

`scripts/font-parity.mjs` — Sweep C and the two promoted checks built as ONE tool,
because Sweep C is the targeting mechanism that makes check 2 affordable.

### The invariant

> On every text-bearing element, BOTH must match production:
>   1. the **declared stack** — `getComputedStyle().fontFamily`
>   2. the **resolved face** — CDP `getPlatformFontsForNode`, familyName + glyph count

| Phase-3 bug | declared | resolved | caught by |
|---|---|---|---|
| Arial #1 (body copy) | DIFFERS | differs | check 1 |
| Arial #2 (AnnouncementBar) | **IDENTICAL** | **DIFFERS** | **check 2 ONLY** |
| `adjustFontFallback` synthetic face | DIFFERS | differs | check 1 |
| `system-ui` baked into the variable | DIFFERS | differs | check 1 |

Neither check alone catches all four. Together they catch all four in one run, without a
pixel diff or a row-density analysis.

### Sweep C — the character inventory

The old source contains **24 distinct non-ASCII codepoints**. Excluding box-drawing (code
comments only), 23 are watched. On `/` alone, **41 elements carry 13 distinct watched
codepoints**: `U+00A0 U+00A9 U+00B7 U+2013 U+2014 U+2019 U+201C U+201D U+2022 U+2192`
plus emoji `U+1F30E U+1F4C5 U+1F680`.

Two of these have already caused a shipped bug: **U+2022** (announcement bar) and
**U+00B7** (footer markets). The rest are now under continuous check.

Check 1 is pure JS → runs on **every** text-bearing element.
Check 2 is a CDP round-trip → runs on Sweep-C-flagged elements **plus every 25th ordinary
element as a control**.

### Two instrument bugs found while building it — both would have faked a PASS

1. **Index-based pairing compared unrelated elements.** Production has 331 text elements,
   the port 89 (it is only the shell so far). Pairing by index meant almost every
   comparison was skipped — **a check that reports PASS while measuring nothing**. Fixed
   by pairing on `text + fontSize`. It immediately surfaced a mismatch the index version
   had hidden.
2. **`<script>`/`<style>` text was being compared as if it were rendered copy.** The
   ColorModeScript's inline JS produced a false positive. Fixed by skipping
   SCRIPT/STYLE/NOSCRIPT/TEMPLATE in both walks.

The tool now prints **`PAIRED BY TEXT (actually compared): N`** and shouts if N is 0.
A coverage number is not optional for a check like this.

### Control test — the instrument discriminates

Re-introduced the `fallback` array and re-ran:

```
CHECK 1 (declared stack)  : 2 MISMATCH
  · "FUTURISE SOLUTIONS"
      old: Zangezi, "Aeonik Trial", -apple-system, system-ui, sans-serif
      new: zangezi, -apple-system, system-ui, sans-serif, aeonik, -apple-system, system-ui, sans-serif
```

Caught, with the exact corruption shown. Fix restored; back to PASS.

### Result across all three ported components

```
PAIRED BY TEXT (actually compared): 82
CHECK 1 (declared stack)  : PASS
CHECK 2 (resolved face)   : PASS
```

**82 of 89 port text elements compared against production. No fifth font bug.**

---

## Bug classification by layer — and the honest answer on rate

### By layer

| Layer | Bugs | Status | Reasoning |
|---|---|---|---|
| **Font / text metrics** | **4** (Arial ×2, adjustFontFallback, system-ui-in-variable) | 🟢 **CLOSED** | All four share ONE mechanism: next/font alters the family stack, damage lands on uncovered characters. `font-parity.mjs` now checks both halves of the invariant on every element, is control-tested, and reports its own coverage. The 23-codepoint inventory is enumerated and bounded. |
| **String fidelity** | **1** (nine U+00A0 → regular spaces) | 🟡 **OPEN** | Mechanism understood (escape sequences interpreted instead of written literally) but **Sweep B is NOT built yet**. One instance found by accident, via a width measurement. Phase 5 ports 48,000 words; the geo pages hold the unusual characters. **This is the highest-risk open layer.** |
| **Asset pipeline** | 0 confirmed | 🟡 **OPEN** | `next/image` re-encoding is a KNOWN, INTENDED difference, not yet measured. D28 exists to measure it and is not yet implemented. Whether it hides a real bug underneath is unknown. |
| **Router** | 0 | 🟡 **UNTESTED** | The migration is mechanical (`Link`→`next/link`, `useNavigate`→`useRouter`, `useLocation`→`usePathname`) and the header diffs at 0.000%, but **no navigation has been exercised** — no popover opened, no drawer opened, no route change. |
| **Layout / CSS** | 0 | 🟢 **Likely closed for the shell** | Header 0.000% ×3, announcement 0.000% ×3, footer desktop 0.348%. Footer mobile/tablet unexplained (see below). The `#app` flex chain is a brittle invariant with **no check yet** (check 6 outstanding). |
| **Dependency** | **1** (`react-icons` missing) | 🟡 **OPEN** | Found by a build failure, not a check. The Phase 1 dependency pass was incomplete. **Sweep (dependency delta) not yet run.** |

### Were these four a one-time cost, or a continuing rate?

**Honest answer: mostly one-time for the FONT layer, and I have reasonable evidence for
that — but it says nothing about the other layers, and the overall bug rate will NOT drop
as much as "4 font bugs, now closed" suggests.**

Why the font layer is genuinely one-time:
- All four are the **same mechanism**, found at the boundary where next/font replaces
  eleven `@font-face` blocks. That substitution happens **once**, in Phase 2, for the
  whole site. There is no second font system to introduce in Phases 4–9.
- The damage surface is **bounded and enumerated**: 23 codepoints, now inventoried.
- It is now guarded by a control-tested check that reports its own coverage.

Why the overall rate will not drop proportionally:
- Phase 3 ported **3 components**. Phases 4–5 port **~40 components and 27 pages**. Even
  at a much lower defect density per component, absolute counts will rise.
- Three layers are **open and unmeasured** — string fidelity, asset pipeline, router —
  and each has the same signature as the font bugs: invisible to a casual look, visible
  only to a targeted instrument.
- Phase 3's components are the **simplest** in the project. `ServiceHeroVisual.jsx` alone
  is 963 lines with 10 keyframes and 6 bespoke SVG diagrams; the geo pages are 21,500
  words of bespoke copy.

**What would actually tell us, rather than guessing:** port ONE mid-complexity Phase 4
component (`GlassCard` or `Section` — heavily reused, moderate surface) and run the full
instrument set on it *before* committing to a Phase 4 schedule. If it comes back clean on
the first pass, the font layer was the anomaly and the remaining phases are mostly
mechanical. If it produces 1–2 bugs in new layers, the rate is structural and Phase 5
should be planned at roughly Phase 3's pace — **which would mean 27 pages is a far larger
job than the guide's 2–3 week estimate.**

I would not commit to a Phase 4/5 schedule before that measurement exists.

### ⚠️ Not assuming the footer mobile/tablet cause

Footer mobile 2.901% and tablet 2.098% vs desktop 0.348% is **probably** the image
re-encode, since thumbnails occupy a larger pixel fraction at narrow widths.
**That is the same shape of reasoning that was wrong twice this phase, so it stays a
hypothesis.** D28's two-track measurement decides it, not inference.

---

## Rule 8a + 8b, and what applying them immediately found (19 Sep 2026, session 7)

### The rules, now in AGENTS.md

**8a — NO CHECK MAY REPORT PASS WITHOUT REPORTING ITS COVERAGE.** Every check prints how
much it measured and fails loudly at zero. A coverage far below what the route contains
is a FAIL, not a pass.

**8b — EVERY NEW CHECK SHIPS WITH A CONTROL.** Reintroduce the defect, confirm the check
fails, restore. A check that has never failed has never been shown to work.

### Applying 8a to `resolution-checks.mjs` immediately exposed TWO false positives

Adding coverage output made both visible in the first run:

| Reported | Verdict |
|---|---|
| `FAIL 3. no synthesised weights/styles — NO REAL FACE for: 400 16px "zangezi"` | ❌ **FALSE POSITIVE** |
| `FAIL 4. no broken assets — 404 /favicon.ico` | ❌ **FALSE POSITIVE** |

**Check 3 was wrong twice over.**
1. `document.fonts.check()` returns **false for a DECLARED but UNLOADED face**. next/font
   fetches on demand, so a weight nothing on the route renders reads as "no real face".
   Zangezi *does* declare 400 — it simply was not loaded. The check conflated
   **declaration** with **load state**.
2. `FontFace.family` includes the **surrounding quote characters** (`"aeonik"`, not
   `aeonik`), so every name comparison silently failed.

Rewritten to read declarations from `document.fonts` and match weight RANGES
(`"400 500"` covers 400), stripping quotes first. Now PASS with 6 combinations probed.

**Check 4:** `/favicon.ico` 404s **on production too** (verified by curl). Both sites
declare an SVG icon + apple-touch-icon and neither ships a root `favicon.ico`. A 404 here
is a **parity match**. Added to an `IGNORED_404` list with the reasoning inline; NOT
"fixed" by adding a favicon, which would be an unrequested change (rule 1).

### 🔴 A process failure worth recording

Check 3 took **three attempts** because I kept patching the script via shell codegen.
The third attempt introduced a **new bug**: `split(/\s+/)` became `split(/s+/)` when the
shell ate the backslash, so `parseW("400 500")` returned `NaN` and every range comparison
failed. I then misread that as a deeper problem.

This is precisely the failure mode already recorded after the `layout.tsx` incident:
**an edit made by a generator cannot be reviewed as a diff.** I did it anyway, and it cost
two wasted attempts plus a self-inflicted bug.

**Standing correction: edit files directly. No shell-codegen patching of source, ever —
including for "mechanical" changes.**

### Final state — all five checks pass WITH coverage

```
PASS  1. animation-name resolves to a real @keyframes   [coverage: 1]
PASS  2. declared animations are actually running       [coverage: 1]
PASS  3. no synthesised weights/styles                  [coverage: 6]
PASS  3b. renderer used the real webfont (CDP)          [coverage: 4]
PASS  4. no broken assets (>=400)                       [coverage: 47]
ALL CHECKS PASSED
```

⚠️ Coverage 1 on checks 1 and 2 is **honest and expected** — the shell has exactly one
animated element (the announcement marquee). It will rise sharply in Phase 4 (31
keyframes). The point of 8a is that this number is now **visible**, so a drop to 0 in a
later phase cannot hide behind a PASS.

---

## Phase 5 gate addition — ELEMENT-COUNT PARITY (recorded now, per the human)

Production `/` has **331** text-bearing elements; the port's shell has **89**. Correct
today, since no page content exists yet. **At Phase 5 this becomes a check:**

> **Element-count parity per route, against production.**

It catches **an entire missing section**, which:
- **word-count ±5% can miss** if the section is short
- **pixel diff can miss** if the resulting shift stays under threshold

Cheap to compute, complements the ±5% word count, and directly targets the geo-page
failure mode (21,500 words of bespoke copy silently collapsing into a template).
Add to `content-check.mjs` alongside words, with coverage reported per rule 8a.

---

## Rules 8c and 11 (19 Sep 2026, session 8)

### Rule 11 — READ THE DIFF OF EVERY EDIT BEFORE RUNNING ANYTHING

"Direct edits only" was written down as a lesson **twice** and failed **twice**. It is now
an instrument rather than an intention:

> After every edit to a source or script file, print that file's diff and read it.

Rationale recorded in AGENTS.md: every code failure mode in this project has a check;
this one was relying on willpower. The diff converts *"the edit I intended"* into
*"what is actually on disk"* — the same relationship as check 3b (declared vs **rendered**)
and rule 8a (reported vs **measured**).

**It paid off within minutes.** Immediately after adding rule 8c, the diff check showed
the new subsection had landed as `8a → 8c → 8b`, out of order. Caught and fixed before it
was committed to. Under the old habit that would have shipped.

### Rule 8c — EVERY CHECK DECLARES AN EXPECTED COVERAGE AND FAILS BELOW IT

8a catches *"measured nothing"*. It does not catch *"measured a third of it"* — non-zero,
reported, and wrong. Phase 4 ports 31 keyframes; a coverage of 12 would PASS today.

New file: **`scripts/expected-coverage.mjs`**, with one governing rule stated at the top:

> ⚠️ **EVERY NUMBER COMES FROM THE INVENTORY OR FROM PRODUCTION. NEVER FROM A RUN.**
> Deriving an expectation from the last run ratchets in whatever was already broken.

Phase-3 expectations for `/`, each **verified against the live render before being
written down** (not asserted):

| Metric | Expected | Verified |
|---|---|---|
| `animationsRunning` | 1 (phase 3) → **31 (phase 4)** | measured 1 ✅ |
| `images` | 12 | measured 12 ✅ — 1 navbar wordmark + 6 service icons + 4 thumbnails + 1 footer wordmark |
| `fontCombos` | 6 | measured 6 ✅ |
| `textElements` | *dynamic* — compared against production live | 331 on `/` |

`coverage > expected` does **not** fail, but is reported as *"RAISE the expectation"*, so
a stale number surfaces deliberately instead of drifting.

**Control test (rule 8b):** raised `animationsRunning` to 5 to simulate a port that lost
animations →

```
FAIL  2. declared animations are actually running   [coverage: 1]
      ⚠️ COVERAGE 1 < EXPECTED 5 — something is missing. 1 animated elements
```

Caught, with the shortfall named. Restored; back to ALL CHECKS PASSED.

### Checks 3 and 3b — documented as an inseparable pair

Check 3's *name* ("no synthesised weights/styles") describes what the **pair** achieves.
3b is the expensive half (a CDP round-trip per node) and therefore the tempting one to
cut. Long notes now sit above **both**:

- **check 3** — is a real face *available* for this weight/style? Reads declarations.
  Cheap, broad. **Blind to whether it was used.**
- **check 3b** — which face did the *renderer* pick? CDP. Expensive, sampled.
  **The only thing that catches a declared-but-unused face.**

Evidence in the note: Arial bug #2 had an **identical computed font-family on both sides**
with the face perfectly available, and still rendered in SegoeUI-Semibold. Check 3 would
have passed it. Same structure as checks 1 and 2 in `font-parity.mjs`.

### Two false positives fixed in check 3 (found by rule 8a's coverage output)

1. `document.fonts.check()` returns **false for a DECLARED but UNLOADED face**. next/font
   fetches on demand, so any weight the route does not render read as "no real face".
   Rewritten to read declarations and match weight **ranges** (`"400 500"` covers 400).
2. `FontFace.family` includes the **surrounding quote characters** (`"aeonik"`), so every
   name comparison silently failed.

### Current check suite

```
PASS  1. animation-name resolves to a real @keyframes   [coverage: 1]
PASS  2. declared animations are actually running       [coverage: 1]   (8c: = expected)
PASS  3. no synthesised weights/styles                  [coverage: 6]   (8c: = expected)
PASS  3b. renderer used the real webfont (CDP)          [coverage: 4]
PASS  4. no broken assets (>=400)                       [coverage: 47]
ALL CHECKS PASSED
```

`/favicon.ico` is in `IGNORED_404` — **production 404s on it identically** (curl-verified),
so reproducing it is correct parity. Logged as backlog **D9** as a genuine minor live-site
issue for post-launch, not fixed here (rule 1).

---

## Phase 3 closing list — session 9 (19 Sep 2026)

Instruments frozen. This session used them rather than extending them.

### ✅ Sweep A — font-family literals

> ⚠️ **OBSERVED, NOT VERIFIED** — this is a grep plus my reading of each hit, not a check
> with a coverage number. Grep is a fair instrument for "does this string appear", but it
> **cannot see a family string built at runtime** (template literal, theme lookup,
> concatenation). Sweep A therefore proves the literals are gone; it does not prove no
> code constructs one. Recorded as a known limit rather than re-built — the freeze holds
> and check 3b catches the *outcome* on any element it probes.

Grepped the whole ported tree. **Every live `font-family` declaration already uses
`var(--font-aeonik)`**; the only literal `'Aeonik Trial'` strings left are inside
explanatory comments recording what the original said. `Footer.jsx` uses
`fontFamily="heading"` — the theme token, correct.

One genuine find: **`app/page.module.css`** was an unreferenced create-next-app leftover
declaring `var(--font-geist-sans)` / `var(--font-geist-mono)`, fonts that do not exist in
this project. Deleted.

### ✅ Dependency sweep

Extracted every bare-module import from the old `src/` tree and diffed against
`futurise-next/package.json`. Installed the four genuinely needed in Phase 4/5 —
`react-countup`, `react-fast-marquee`, `react-visibility-sensor`, `react-markdown` +
`remark-gfm` — with **zero peer conflicts**.

Correctly NOT installed: `react-router-dom` (replaced), `swiper` (dead, D8),
`@uiw/react-md-editor` (Phase 5.5, blocked), test tooling (no test port yet).

*(The sweep's regex also matched prose inside a string — "we have heard of PIPEDA" — a
false positive from scanning content files, not a module.)*

### ✅ Check 6 — `#app` flex chain

```
PASS  6. #app flex chain intact (footer pins on short pages)   [coverage: 3]
      #app flex/column minH 900px; main direct-child true (parent DIV#app),
      flex-grow 1; footer direct-child true
```

**Control (rule 8b):** wrapped `<Providers>` in a `<div>` →
`FAIL … main direct-child false (parent DIV), footer direct-child false`.
Caught, named exactly what broke, reverted.

### 🔴 ROUTER SMOKE TEST — found a SITE-BREAKING bug no other check could see

Two stub routes (`/about`, `/portfolio`), then navigate.

**`/about` was completely unreachable: `ERR_TOO_MANY_REDIRECTS`, `document.body` emptied
(`bodyLen: 0`).**

Cause: I ported `{ source: '/About', destination: '/about' }` from `vercel.json`. **Next
matches redirect `source` case-INsensitively**, so `/about` also matched `/About` and
redirected to itself, forever. Vercel's own redirects are case-sensitive, so the old site
was never affected — this is a Next-specific behaviour difference introduced by the port.

> **No pixel diff, font check or resolution check would ever have found this.** The home
> page rendered perfectly and every gate passed. Only exercising navigation exposed it.
> This alone justifies the smoke test.

**Fix:** rule removed → `/about` 200s. **Measured consequence: `/About` now 404s where
production 308s** (corrected later this session — this line originally said 301; Vercel
serves `"permanent": true` as **308**) — logged as **O12**, reinstated in `proxy.ts` at Phase 7 with an
explicit case-sensitive comparison. I initially wrote in the config that Next would resolve
`/About` case-insensitively anyway; **curl proved that wrong (404)** and the comment was
corrected rather than left standing.

A second self-inflicted detour: I grepped for `caseSensitive`, found it in
`next/types/global.d.ts`, and used it — it belongs to **glob imports**, not redirects.
`Error: Invalid redirect found`. Reading the grep hit's *context* rather than trusting the
match would have avoided it.

### Router layer — now TESTED, no longer an open layer

```
1. load /           path=/          highlighted=["/"]          scrollY=0
   scrolled to 596
2. → /about         path=/about     highlighted=["/about"]     scrollY=0
3. → /portfolio     path=/portfolio highlighted=["/portfolio"] scrollY=0
4. browser BACK     path=/about     highlighted=["/portfolio"] ← stale
full page loads: 1  (all navigation client-side)
```

✅ client-side navigation · ✅ active pill tracks `usePathname()` · ✅ header/footer persist
· ✅ scroll resets 596 → 0 on route change · ⚠️ stale highlight on browser BACK

**The stale highlight reproduces IDENTICALLY on production** (verified live), so it is a
faithful port of an existing defect, not a regression. Logged as backlog **B5** with the
cause (`hovered` state surviving a POP navigation). Not fixed — rule 1.

### Two pre-existing defects confirmed by comparison, not "fixed"

| | production | port | verdict |
|---|---|---|---|
| Nested `<li>` in footer Markets (`Wrap shouldWrapChildren` + explicit `WrapItem`) | **6** | **6** | identical → backlog **D10** |
| Stale nav highlight after browser BACK | yes | yes | identical → backlog **B5** |

Both now log a React 19 hydration warning under Next (React 19 is stricter about tag
nesting than React 18), but rendering and the pixel diff are unaffected. **Ported as-is.**

### Remaining to close Phase 3

- [ ] D28 two-track with the exclusion-area guard
- [ ] Footer re-measured under two-track (the only failing target: mobile 2.901%,
      tablet 2.098%; desktop already PASSes at 0.348%)
- [ ] Popover + drawer captures, portal verified present in the capture

---

## Session record — platform-config behaviour audit + console allowlist

### D29 — platform config is ported by BEHAVIOUR, not by literal entry

New narrow exception to rule 1, granted after the `/About` redirect loop:

> For platform config, port the BEHAVIOUR, verified by curl against production, not the
> literal entry. Record each one's production behaviour (status code and Location header)
> and assert the port matches.

Rule 1 (port verbatim) is **wrong for this layer** because the config text is identical
while the engine interpreting it is not. Scoped to `vercel.json` / platform routing only.
Rule 1 is unchanged everywhere else.

### Case-variant redirect enumeration — 3 divergences, not 1

Full results in **REDIRECT-BEHAVIOUR-BASELINE.md** (curl-measured, both sides).

| URL | production | port | |
|---|---|---|---|
| `/About` | **308** → `/about` | **404** | ❌ lost redirect |
| `/Home` | **404** | **308** → `/` | ❌ invented redirect |
| `/LLMs` | **404** | **308** → `/llms.txt` | ❌ invented redirect |
| `/about`, `/home`, `/llms`, `/Contact` | — | — | ✅ match |

**`/About` was NOT alone, but not in the way expected.** Grep for uppercase in any
`"source"` in `vercel.json` returns exactly one hit (`/About`), so by the letter of the
task the answer was "one". The other two divergences are **invisible to that grep**: the
entries are written in lowercase and are correct as written. The defect is that Next
matches `source` case-INSENSITIVELY, so `/home` and `/llms` now also answer `/Home`,
`/HOME`, `/hOmE`, `/LLMs`, `/LLMS` — **inventing permanent redirects from URLs that have
never existed**, which is a new and wrong signal to crawlers.

Mechanism demonstrated, not inferred: every case permutation of a redirect **source**
matches, while `/ABOUT` → 404 proves route **resolution** stays case-sensitive. One
behavioural difference produces divergence in **both** directions.

### ⚠️ Correction: production returns 308, not 301

`next.config.ts` and the Phase 3 router report both said production **301**s `/About`.
It is **308** — Vercel serves `"permanent": true` as 308. Both are permanent and both
pass link equity, so **the O12 conclusion is unchanged**, but the status `proxy.ts` must
emit to match production is 308. Corrected in `next.config.ts` (two places).

### O12 scope expanded

O12 now covers **all three** redirects moving to `proxy.ts` with explicit case-sensitive
`pathname === …` comparisons, plus the **full `vercel.json` behavioural audit** at Phase 7
(rewrites, headers, `cleanUrls`, `trailingSlash`, cache-control). Assert by curl against
REDIRECT-BEHAVIOUR-BASELINE.md — **never by reading the config**.

### CHECK 7 — console allowlist (and the detector that did not exist)

Instructed to allowlist the D10 hydration warning by text so the "zero hydration warnings"
detector keeps its signal. On going to implement it: **there was no such detector.** No
console listener existed in any of the four scripts. "Zero hydration warnings, no
suppression" had been enforced by *me reading dev-server output by eye*, and was asserted
on that basis at the Phase 1 and Phase 2 gates.

Freeze note: the instrument freeze holds. This is not a new check invented to feel
productive — it is the minimum required for the instructed allowlist to mean anything,
since an exception to an unenforced rule enforces nothing. Flagged rather than assumed.

**Measured, not guessed — the D10 defect emits FOUR messages, not one:**

1. `In HTML, %s cannot be a descendant of <%s>` (error)
2. `<%s> cannot contain a nested %s` (error)
3. `Hydration failed because the server rendered HTML didn't match the client` (pageerror)
4. plus the `/favicon.ico` 404 (D9, already-known parity match)

A single-pattern allowlist written from memory would have left three failures behind.

**And it surfaced a fifth message that is NOT D10** → logged as new backlog item **D11**:
`<ColorModeScript>` renders a `<script>` inside a client component, which React 19 warns
never executes on the client. **Verified not broken** — curl confirms the colour-mode
snippet IS in the server HTML and runs pre-hydration. Cosmetic only.

**Control (rule 8b):** injected `console.error('CONTROL: synthetic regression')` →
check 7 **FAILED, exit 1**, naming the message, while D10/D11 still passed through.
The allowlist discriminates; it does not blanket-pass. Control removed, re-verified green.

Nothing is suppressed in the app, and **the D10 markup was not changed** — altering the
DOM to quiet a console message would risk parity for a console message.

**Current state — all checks green on `/`:**
`1 ✅ 2 ✅ 3 ✅ 3b ✅ 4 ✅ 6 ✅ 7 ✅ (coverage 5, matched D10+D11)`

---

# PHASE 3 — CLOSED WITH THREE OPEN DELTAS (19 Sep 2026)

⚠️ **Phase 3 does NOT pass. It CLOSES with three open deltas.**

Recorded in these words deliberately. A gate is not declared passed with failures inside
it; that standard has to survive intact into Phases 4–9, where the surface is far larger
and the temptation to round a number down is correspondingly greater.

**Decision:** do not spend a session chasing the three. The footer and the drawer are both
on screen during the ClientsReviews probe, so a systemic cause **reappears there** and
yields a second data point; a local cause does not reappear and is low-value. Diagnose with
two data points, not one.

## The three open deltas

| target | viewport | Track 1 % | status |
|---|---|---|---|
| footer | mobile (390) | **1.834** | 🔴 open |
| footer | tablet (768) | **1.191** | 🔴 open |
| footer | desktop (1440) | 0.290 | ✅ passing |
| drawer | mobile (390) | **1.296** | 🔴 open |

## Band positions — the diagnostic data

Contiguous rows of diff pixels, largest first.

**footer mobile (390x1685)** — 291 diff rows, 20 bands
```
y 772-813    (42px)  3879px  peak 121/row   46% down   ← dominant
y 1406-1417  (12px)   814px  peak 134/row   83% down
y 432-446    (15px)   801px  peak 137/row   26% down
y 1537-1550  (14px)   740px  peak 131/row   91% down
y 300-311    (12px)   693px  peak 115/row   18% down
y 192-203    (12px)   611px  peak 112/row   11% down
… 14 smaller bands
```

**footer tablet (768x1211)** — 212 diff rows, 14 bands
```
y 956-992    (37px)  3760px  peak 121/row   79% down   ← dominant
y 906-920    (15px)  1547px  peak 263/row   75% down
y 211-222    (12px)  1304px  peak 227/row   17% down
y 604-618    (15px)  1112px  peak 192/row   50% down
y 365-379    (15px)   801px  peak 137/row   30% down
y 405-430    (26px)   570px  peak  84/row   33% down
… 8 smaller bands
```

**footer desktop (1440x931)** — 36 diff rows, **ONE band**
```
y 832-867    (36px)  3884px  peak 121/row   89% down   ← the ONLY band
```

**drawer mobile (320x844)** — 47 diff rows, **ONE band**
```
y 782-828    (47px)  3499px  peak 109/row   93% down   ← the ONLY band
```

## 🔴 THE SIGNATURE — read this first when resuming

**All four captures share one band: ~36–47px tall, near the BOTTOM, peak 109–121 px/row,
~3500–3900 diff px.** It is the *only* band on the two passing/simplest captures (footer
desktop, drawer) and the *largest* band on both failing ones.

That band appears at **every breakpoint and in the drawer**, which is a different component
tree. Its pixel count is near-constant (3879 / 3760 / 3884 / 3499) while the capture width
varies 320→1440. **A constant pixel count across a 4.5× width change means a fixed-size
element, not a reflowing one.**

The narrow viewports then add **many small 12–15px bands with peak 112–263 px/row** that
desktop does not have. Those are text-height bands — consistent with one or two lines of
type differing in position or metrics, repeated down a stacked column layout.

## Already ruled out

| Ruled out | Evidence |
|---|---|
| **Images** | Track 2 **PASS** on all 6 image-bearing targets, 5–7 images each: geometry, crop, object-fit, object-position and source aspect all identical |
| **Masked-away truth** | Exclusion-area guard: max **10.2%**, all well under 25%. No target passed on Track 1 alone by exclusion |
| **Marquee offset** | FREEZE forces `translateX(0)`; announcement is **0.000% ×3** |
| **Fonts** | Announcement and header **0.000% at all three breakpoints**; check 3b confirms real custom faces |
| **Sticky overlap** | Neutralised in capture; header is 0.000% ×3 |
| **Purely breakpoint-specific** | ❌ **NOT ruled out — but the dominant band is NOT breakpoint-specific.** It is present at desktop too. Only the *small* bands are narrow-only |

## Hypothesis

**One narrow-viewport cause, plus one fixed-size element present at all widths.**

Refined from the band data — there appear to be **two** distinct things, not one:

1. **The bottom band (all four captures, constant ~3.8k px).** A fixed-size element near the
   bottom of the footer and of the drawer. Present at desktop, where it alone yields 0.290%
   — i.e. it is *inside tolerance at desktop and only becomes material when the capture is
   shorter*. Same element likely rendered in both footer and drawer.
2. **The small 12–15px bands (mobile/tablet only).** Text-metric or position deltas in a
   stacked narrow-width layout, absent at desktop where the layout is columnar.

If (1) and (2) are the same root cause, fixing it clears all three deltas at once. **Do not
assume they are.** The evidence that they might be: both are absent from header and
announcement, which are 0.000% everywhere.

**Diff images retained:** `diffs/mobile__footer.png`, `diffs/tablet__footer.png`,
`diffs/desktop__footer.png`, `diffs/overlay_drawer.png`.

## Also recorded

- **Popover renders INLINE, not portaled** — verified identical on both sides
  (`section.chakra-popover__content < div.chakra-popover__popper < div.chakra-stack <
  div < header`). `portaled_out: false/false` is a genuine parity match, not a broken test.
  The **drawer IS portaled** (`true/true`). Popover diffs at **0.002%**.
- **The port still serves the Phase-2 scratch page body.** Shell targets are unaffected
  (they capture `header`/`footer`/`.announcement-bar` directly), but **full-page diff mode
  is not usable until Phase 5**.

---

## NEXT-ITEM POINTER (read this first, then begin)

**Phases 5, 6 and 7 are CODE-COMPLETE. Nothing has been run or verified — the human tests.**

Phase 5 — 27/27 pages: /privacy /terms /pricing /about /portfolio /case-studies
/case-studies/[slug] (6) /service/[slug] (6) /nz /us /au /ca /ae /europe /contact /

Phase 6 — lib/blog.ts (real API shape, bare-array envelope, status===published filter),
app/blog (ISR 600, paginated 12/page, first 6 eager), app/blog/[slug] (ISR 3600,
generateStaticParams, dynamicParams true). ArticleBody is a SERVER component using
ArticleBody.module.css; ArticleSidebar is the only client island (TOC scroll-spy +
share). #fs-boot and the 5 fs-* keyframes were never ported — noted in globals.css.

Phase 7 — old <Seo> never ported (nothing to delete). app/sitemap.ts (15 static + 6
services + 6 case studies + all published blog slugs), app/robots.ts,
app/llms.txt/route.ts (body byte-copied, round-trip asserted). proxy.ts implements O12
BOTH directions; /home and /llms REMOVED from next.config.ts.
scripts/postbuild-guards.mjs wired as npm postbuild.

**NEXT: human verification.** Then Phase 8/9 when released.

⚠️ OPEN / NEEDS A DECISION:
- D8 premise was WRONG. Swiper is NOT dead — Portfolio.jsx renders <Swiper>. Package
  installed, component ported. Revisit D8/D2 before acting on either.
- Phase 3 left 3 open deltas (footer mobile 1.834%, tablet 1.191%, drawer 1.296%),
  carried into Phase 4 by decision. Never re-measured — measurement is frozen.
- O13 (standing check for font preloads/double-downloads) still deferred to Phase 8.
- Phase 5.5 (admin CMS) still blocked, untouched.

Tooling built and working — use it, do not rebuild it:
- `scripts/gen-page-body.cjs <cfg.json>` — slices a page body BYTE-FOR-BYTE from src/Pages.
  Config keys: src, out, componentName, route, imports[], and optionally
  preambleFrom + componentDecl (module-level helper components above the page),
  localsFrom (hooks/consts inside the component), localsStopAt (cut the jsonLd const).
  Configs live in `scripts/pagecfg/`. Node resolves `/tmp` to `C:\tmp` — keep them in-repo.
- `scripts/gen-content.cjs <cfg.json>` — extracts module-level content consts to content/*.ts.
- `futurise-next/lib/seo.ts` — buildMetadata(), reproduces the old <Seo> title rule
  (brand appended ONLY when the result fits 60 chars, never twice). D7: title {absolute}.
- `futurise-next/components/common/JsonLd.tsx` — server-rendered JSON-LD.

Per page after generating: convert `to=` → `href=` (both `to="..."` and `to={...}`),
add the useRouter/navigate shim if the body calls navigate(), and convert Chakra
<Image> → next/image (except the HeroSection plate, which is a documented D27 exception).
