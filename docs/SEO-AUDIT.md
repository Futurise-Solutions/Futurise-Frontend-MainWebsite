# SEO Audit — futurisesolutions.com

**Date:** 2026-09-20
**Method:** every figure below was read out of the **prerendered HTML** in `.next/server/app`
after a clean `npm run build`. Counts were taken at 115 pages; `/in` was added afterwards
(§7.7), so the build is now 116 and the market pages are 7. Figures below are as measured.
Where a number is quoted, the command that produced it is stated.

**Scope note:** the site has **27 hand-authored routes** (15 static + 6 `/service/*` +
6 `/case-studies/*`) plus **86 blog posts** = 113 indexable pages, plus `/_not-found` and
`/_global-error` which are correctly unlinked.

> **Nothing in this document was applied to a title, H1 or meta description.** Those are in
> `KEYWORD-MAP.md` as side-by-side recommendations awaiting approval, per the standing
> instruction. What *was* fixed is listed in §7, and every item there is mechanical:
> missing schema, missing links, crawler directives.

---

## 1. Per-page inventory (27 routes)

Canonical is `https://www.futurisesolutions.com` + the path shown, **self-canonical on every
page**, with no cross-canonicalisation anywhere. Verified: 0 of 115 pages missing a canonical
except `/_not-found` and `/_global-error`, which correctly have none.

`Desc` is the rendered meta description length in characters.

### 1.1 Core pages

| Route | Title (as rendered) | Desc | H1 | JSON-LD |
|---|---|---:|---|---|
| `/` | AI, SaaS & Web App Development Company \| Futurise Solutions | 160 | AI-powered apps & SaaS that scale. | WebPage, FAQPage, BreadcrumbList |
| `/about` | About Futurise Solutions — NZ-Registered Dev Studio | 148 | We turn bold ideas into products that scale. | AboutPage, Organization, BreadcrumbList |
| `/contact` | Contact Us — Get a Free Quote \| Futurise Solutions | 149 | Tell us about your project. | ContactPage, Organization, BreadcrumbList |
| `/portfolio` | Portfolio — AI, SaaS & Web Projects \| Futurise Solutions | 158 | Crafting innovation with every project. | CollectionPage, **ItemList (added)**, BreadcrumbList |
| `/pricing` | How We Price Projects — Costs, Scope & Engagement | 149 | What actually drives the cost of your project | FAQPage, BreadcrumbList |
| `/case-studies` | Case Studies — How We Build, In Detail \| Futurise Solutions | 147 | From Brief to Breakthrough | CollectionPage, ItemList, BreadcrumbList |
| `/blog` | AI, SaaS & Web Development Insights \| Futurise Solutions | 126 | Insights on AI, SaaS & Product Engineering | CollectionPage, ItemList, WebSite, BreadcrumbList |
| `/privacy` | Privacy Policy \| Futurise Solutions | 128 | Privacy Policy | WebPage, BreadcrumbList |
| `/terms` | Terms & Conditions \| Futurise Solutions | 132 | Terms & Conditions | WebPage, BreadcrumbList |

### 1.2 Market pages (7)

All are **self-canonical** and carry the **full hreflang cluster** via `COUNTRY_ALTERNATES`,
so reciprocity holds by construction — verified after `/in` was added: 7 pages x 7
alternates, each including `en-IN`. All emit WebPage + ProfessionalService + OfferCatalog +
FAQPage + BreadcrumbList, and now **SpeakableSpecification**.

| Route | Title | Desc | H1 | H2s |
|---|---|---:|---|---:|
| `/nz` | Software Development Company New Zealand | 150 | Software development for New Zealand businesses | 11 |
| `/us` | Software Development Company USA \| Futurise Solutions | 153 | Software development for United States businesses | 11 |
| `/au` | Software Development Company Australia \| Futurise Solutions | 150 | Software development for Australian businesses | 10 |
| `/ca` | Software Development Company Canada \| Futurise Solutions | 163 | Software development for Canadian businesses | 12 |
| `/ae` | Software Development Company UAE \| Futurise Solutions | 153 | Software development for UAE businesses | 11 |
| `/europe` | Software Development for European Businesses | 152 | Software development for European businesses | 8 |
| `/in` | Software Development Company India | Futurise Solutions | 154 | Software development for Indian businesses | 7 |

`/nz` H2 sequence, as a representative sample — note every one is a buyer question, which is
why these pages are the best speakable candidates on the site:

1. What building software here actually changes
2. The honest version of the offshore question
3. What New Zealand businesses ask us to build
4. The systems your software has to talk to
5. Distance is a constraint, not an excuse
6. New Zealand obligations that shape the build
7. How we price work in New Zealand dollars
8. Working with us from New Zealand
9. What we build, and what we have published on it
10. Questions from New Zealand buyers.
11. Building something in New Zealand?

### 1.3 Service pages (6)

All six emit Service + BreadcrumbList + FAQPage, and now **WebPage carrying
SpeakableSpecification**.

| Route | Title | Desc | H1 | H2s |
|---|---|---:|---|---:|
| `/service/web-development` | Web Development Company — React, Next.js & Node.js | 151 | Web Development | 7 |
| `/service/app-development` | App Development Company — iOS & Android (React Native) | 162 | App Development | 7 |
| `/service/ui-ux-design` | UI/UX Design Agency — Product Design & Figma | 153 | UI/UX Design | 7 |
| `/service/blockchain-development` | Blockchain Development — Smart Contracts, DeFi & Web3 | 147 | Blockchain Development | 7 |
| `/service/ai-ml-solutions` | AI & ML Development — AI Agents, LLMs & Computer Vision | 147 | AI & ML Solutions | 7 |
| `/service/digital-marketing` | Digital Marketing Agency — SEO, Paid Ads & CRO | 149 | Digital Marketing | 7 |

### 1.4 Case studies (6)

All six emit Article + BreadcrumbList + FAQPage, each self-canonical, each with one H1 and
seven H2s. Service mapping is 1:1 with `/service/*`:

| Route | Service | Maps to |
|---|---|---|
| `/case-studies/ai-support-agent` | AI & ML Solutions | `/service/ai-ml-solutions` |
| `/case-studies/saas-platform-scale` | Web Development | `/service/web-development` |
| `/case-studies/real-estate-app` | App Development | `/service/app-development` |
| `/case-studies/fintech-ux-redesign` | UI/UX Design | `/service/ui-ux-design` |
| `/case-studies/defi-protocol-launch` | Blockchain Development | `/service/blockchain-development` |
| `/case-studies/saas-seo-growth` | Digital Marketing | `/service/digital-marketing` |

---

## 2. Thin or duplicated metadata

**Duplicate titles across 115 pages: zero. Duplicate meta descriptions: zero.**
The `resolveTitle` rule in `lib/seo.ts` (brand appended only when the result stays ≤60 chars)
is working as designed.

Length outliers, all minor and none requiring action:

- **13 pages with a rendered title over 60 characters.** Eleven are blog posts whose titles
  come from the CMS; two are site pages: `/` at 63 and `/service/ai-ml-solutions` at 63.
  Both are 63 *after* HTML-entity expansion of `&amp;` — the visible string is 61 and 61.
  Google truncates on pixel width, not characters, so this is cosmetic. **No change
  recommended.**
- **`/blog` description is 126 chars** and `/privacy` 128 — short but adequate and accurate.
- Blog descriptions range 78–170. The two shortest
  (`how-to-build-an-autonomous-ai-agent…` at 78 and
  `how-to-build-a-custom-ai-agent-for-lead-generation…` at 93) are genuinely thin. These are
  **CMS fields**, editable without touching code or ranking page titles.

**No page on the site has thin body content.** The shortest non-legal pages are the service
pages, which each carry an H1, 7 H2s, an industries grid, a case-study link, four blog links
and an FAQ block.

---

## 3. Missing schema

| Page | Was missing | Status |
|---|---|---|
| `/portfolio` | `ItemList` over the nine projects | **FIXED** — §7.4 |
| `/in` | (new page) | **BUILT** — full graph, §7.7 |
| `/service/*` (6) | `speakable` | **FIXED** — §7.2 |
| Market pages (6) | `speakable` | **FIXED** — §7.2 |
| Blog posts (86) | — | Already correct: BlogPosting + BreadcrumbList with real `datePublished`/`dateModified` |

Two deliberate omissions, both correct and **not** to be "fixed":

- **No `AggregateRating` anywhere.** There is no review corpus behind one. `/about` states
  this explicitly. Adding it would be fabricated structured data.
- **No `telephone` in Organization.** The site publishes no phone number in its pages, and
  `/about` commits to that in writing. *(See §6 — `llms.txt` contradicts this.)*

---

## 4. Orphan pages — the largest finding

**Before this audit: 42 of 86 blog posts had ZERO inbound internal links.**

Measured by parsing every `href="/…"` out of all 115 prerendered pages and counting
inbound edges, excluding self-links (`.links.cjs`).

Every non-blog page scored 113 inbound links — they are all in the header and footer, so
the static site is densely connected. The entire deficit was in the blog, and it had two
compounding causes:

1. **`/blog` is client-paginated.** `BlogsPageView.jsx` holds `PAGE_SIZE = 12` in React
   state, so the server-rendered HTML contained **13 of 86** post links. Pages 2–8 exist
   only after a click and are invisible to a crawler.
2. **Related posts were same-category-only.** With 32 of 86 posts in one category and
   several categories holding a single post, the graph clustered: big categories linked
   among themselves, small ones emitted nothing.

Result: 42 posts were reachable only from `sitemap.xml`, which is a discovery hint, not a
ranking path. Both causes are now fixed (§7.1) — **blog orphans are 0.**

Inbound-link distribution, before → after:

| Inbound links | Posts (before) | Posts (after) |
|---:|---:|---:|
| 0 | **42** | **0** |
| 1 | 16 | 47 |
| 2 | 5 | 11 |
| 3–8 | 21 | 22 |
| 32+ | 6 | 6 |

The only remaining zero-inbound routes are `/_not-found` and `/_global-error`, which is
correct — framework error pages should not be linked.

---

## 5. Cannibalisation

**5.1 — Already solved, do not re-open.** Seven blog posts previously competed with their
service page for the same head term. `utils/Constant/serviceResources.js` documents the
resolution: the posts keep their URLs and bodies, and the *anchor text* pointing at them was
written to the informational angle so it never repeats the service's head term. Body overlap
between each pair was measured at 1.17–2.36%, i.e. these are distinct pages colliding on
intent, not duplicates. The seven carry a `retarget: true` marker pending a CMS title change.

**5.2 — Homepage vs `/nz`: resolved.** The homepage title previously carried a New Zealand
suffix and competed with `/nz`. It now holds the unsuffixed global terms and `/nz` owns
everything ending "New Zealand". Confirmed in the rendered titles above. No action.

**5.3 — Genuine remaining overlap: AI-agent cost queries.** Four posts target a
cost-of-an-AI-agent query separated only by geography:

- `how-much-does-it-cost-to-build-a-custom-ai-agent-in-2026` (global)
- `ai-agent-development-cost-2026-a-global-price-comparison…` (global)
- `ai-agent-development-cost-in-new-zealand-2026…` (NZ)
- `custom-ai-agent-development-cost-uk-2026…` (UK)

The two **global** ones genuinely compete with each other. The NZ and UK ones are
geo-qualified and fine. This is a content decision, not a mechanical fix — see
`KEYWORD-MAP.md` §D for the consolidation recommendation. **Not actioned.**

**5.4 — `/pricing` vs the cost posts.** `/pricing` targets "how we price"; the posts target
"what does X cost in 2026". Adjacent but distinct intent (supplier process vs market rate).
No change recommended; the internal linking now added makes the hierarchy explicit.

---

## 6. Flagged for a decision — not actioned

**6.1 ✅ RESOLVED — blog posts had 2–21 `<h1>` elements each. All 86 were affected.**

> **Fixed after this audit was first written.** See §7.6. All 86 posts now render exactly
> one `<h1>`, with zero visual change. The finding is kept below because the measurement
> is the evidence for why the change was made.

Measured across `.next/server/app/blog/*.html`: **262 surplus `<h1>` elements**, and **zero
posts with exactly one**. Worst cases:

| Post | `<h1>` | `<h2>` |
|---|---:|---:|
| `ai-agent-vs-traditional-chatbot…` | 21 | 26 |
| `how-much-does-it-cost-to-build-a-custom-ai-agent-in-2026` | 19 | 35 |
| `custom-software-development-cost-guide-2026…` | 18 | 19 |
| `saas-development-cost-guide-2026…` | 18 | 21 |
| `uiux-design-cost-in-new-zealand-2026…` | 18 | 20 |

**Cause:** `components/blog/ArticleBody.jsx` maps Markdown `#` → `<h1>` faithfully (line 37).
The authors used `#` for every section heading in the CMS, so a post with 18 sections renders
18 H1s on top of the template's own. The renderer is behaving correctly; the *content* uses
the wrong level.

**Two possible fixes, both needing your call:**

- **(a) One-line renderer change** — demote Markdown `#` to `<h2>`, `##` to `<h3>`, and let
  the template keep the only `<h1>`. Fixes all 86 posts at once with no CMS work. Risk: it
  changes the heading level of every existing post, and these pages rank.
- **(b) Fix the CMS content** — 86 posts edited by hand. Safer per-post, far slower.

My recommendation is **(a)**, applied to a couple of posts first and measured. But it changes
heading structure on ranking pages, which is exactly what you reserved for approval, so it
sits here.

**6.2 `llms.txt` publishes a phone number that no other surface does.**

`content/llms.txt.ts` contains `Phone: +91 76650 13356`. This directly contradicts `/about`
("No telephone number is published anywhere on this site") and the deliberate omission of
`telephone` from the Organization schema. One of the two is wrong.

**✅ RESOLVED for `llms.txt`** — the line was removed, so the site is internally consistent:
email only, matching `/about` and the schema. `BACKLINK-PLAN.md` §2.8 now lists the 26
directory targets that require a phone number, so the decision can be made on facts.

⚠️ **STILL OUTSTANDING:** the chatbot publishes the same number in
`components/Chatbot/keywordMatcher.js` and `components/Chatbot/predefinedQA.js`. Those are
user-visible answers contradicting `/about` in exactly the way `llms.txt` did. The same file
also answers the portfolio question with "25+ projects" where `/portfolio` publishes nine and
`/about` commits to publishing no counts. Both left alone — out of the stated scope.

**6.3 Two blog meta descriptions are under 100 characters** (78 and 93). CMS fields, no code
change needed.

---

## 7. What was fixed — all mechanical

### 7.1 Internal linking (Task 3)

- **`components/blog/BlogsPageView.jsx`** — added a server-rendered "Complete archive" `<nav>`
  listing **every** post as a plain link, built from `blogs` rather than the filtered/paged
  arrays. `/blog` now links to **86 of 86** posts, up from 13.
- **`app/blog/[slug]/page.tsx`** — related posts now fill to three from the newest remaining
  posts when the same category cannot supply three. Every post emits three internal links
  regardless of how its category is populated.
- **`utils/Constant/index.js`** — added `CASE_STUDY_FOR_SERVICE`, `caseStudyForService()` and
  `caseStudyForBlogCategory()`, routed through the *existing* `serviceForBlogCategory` so the
  service link and the case-study link on a post can never disagree.
- **`components/blog/BlogCTA.jsx`** — every post now also links to the case study proving its
  service was delivered. Anchor text names the build, not the service, so it does not compete
  with `/service/*` for that service's head term.

Verified in the built HTML: **86/86 posts link to a `/service/*` page and to a targeted
`/case-studies/*` page.**

### 7.2 Speakable (Task 4)

- Market pages: **39 H2 + answer-paragraph pairs** marked across the six bodies. Six H2s that
  lead straight into card grids were deliberately skipped — card fragments do not read aloud
  as standalone answers.
- Service pages: hero definition sentence + the industries H2/answer pair.
- Schema: `speakable` added to the market `WebPage` node (`utils/countrySchema.js`) and to a
  **new** `WebPage` node on service pages. It is a separate node because `speakable` is
  defined on `WebPage`/`CreativeWork`, **not** on `Service`.

**Verified the selectors actually resolve** — this is the failure mode that is silent:
`/nz` 5 matches, `/us` 10, `/service/web-development` 3–4, `SpeakableSpecification` present
on each. A `cssSelector` matching nothing advertises speakable content and supplies none.

### 7.3 Crawler access (Task 4)

`app/robots.ts` now names **11 AI agents** explicitly with `Allow: /`: GPTBot, OAI-SearchBot,
ChatGPT-User, ClaudeBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, CCBot,
Bytespider, Applebot-Extended.

Two things worth knowing about this block:

- `User-agent: *` already permitted all of them. The value is that `Google-Extended` and
  `Applebot-Extended` are **permission tokens, not crawlers** — they govern whether already-
  fetched content may ground Gemini/AI Overviews and Apple Intelligence. An explicit allow is
  the unambiguous answer.
- **`Disallow: /futurise-admin/` is repeated in every block.** A named `User-agent` group does
  **not** inherit from the wildcard group. Omitting it would have exposed the admin path to
  precisely the agents being named.

### 7.4 Schema

`/portfolio` gained an `ItemList`. It is **derived from the `Projects` constant**, not
hand-written — the existing `hasPart` array lists six projects while the page renders nine,
because three clients were added and the literal was never updated. Deriving it means the
count cannot drift again.

### 7.5 `llms.txt`

Rewritten from 9,962 → 12,702 bytes:

- **New `## Markets` section** — all six market pages, each with a one-line summary. All six
  were previously absent entirely.
- **`## Key pages` expanded** with a one-line summary each, plus `/pricing`, `/privacy` and
  `/terms`, which were missing.
- **Corrected the client record**: "seven projects" → nine, and added Dhanlaxmi Property and
  Palm Vision Technology, both of which were missing from the selected-work list.

---

### 7.6 Blog heading hierarchy (86 posts)

The §6.1 defect, fixed with **zero visual change**, in three coupled edits:

- **`components/blog/ArticleBody.jsx`** — markdown `#` now renders `<h2>`, `##` → `<h3>`,
  `###` → `<h4>` (and `h4`→`h5`, `h5`→`h6`). The page template keeps the only `<h1>`.
- **`components/blog/ArticleBody.module.css`** — each rule moved down one selector with its
  **values unchanged**, so `h2` now carries the old `h1` sizing (1.875rem / mt 2.5rem /
  mb 1rem), `h3` the old `h2`, `h4` the old `h3`. Verified in the compiled CSS chunk.
  The two files are a matched pair — changing either alone makes every article's headings
  jump one step.
- **`lib/blog.ts`** — `parseHeadings` widened from `#{2,3}` to `#{1,3}`.

**A second silent defect surfaced while fixing the first.** `parseHeadings` matched only
`##`/`###`, but the CMS authors used `#` for every section — so the on-page table of
contents matched nothing and **rendered empty on most posts**. Measured on
`how-much-does-it-cost-to-build-a-custom-ai-agent-in-2026`, a post with 18 sections: zero
TOC entries.

| Metric | Before | After |
|---|---:|---:|
| Posts with `<h1>` ≠ 1 | **86** | **0** |
| Surplus `<h1>` elements | **262** | **0** |
| Posts with an empty TOC | **82** | **0** |
| Total TOC entries site-wide | — | **3,954** |

No copy was changed. The CMS content still says `#`; only its mapping changed.

### 7.7 `/in` — India market page (new)

A seventh market page, built because Udaipur clears the doorway test on evidence the
original brief did not have: the engineering team is there **and** two named, published
clients are Udaipur businesses (Dhanlaxmi Property, trading since 1998; Palm Vision
Technology, since 2006).

- **One page for India.** No per-city routes. Mumbai, Delhi, Bangalore and Pune appear on
  the page only inside an FAQ answer that explicitly **denies** presence in them.
- **Bespoke copy** — verified to share **no sentence over 60 characters** with any of the
  six existing market content modules. It inverts their argument: they argue remote
  delivery works, this one leads with people on the ground.
- **Full schema**: WebPage (+ speakable), ProfessionalService, OfferCatalog, FAQPage,
  BreadcrumbList. `areaServed` is **Udaipur and Rajasthan only**.
- **Registered in `COUNTRIES`**, so hreflang reciprocity is structural. Verified: all
  seven pages (`/`, `/nz`, `/us`, `/au`, `/ca`, `/ae`, `/in`) now declare 7 alternates
  including `en-IN`, each self-canonical.
- Added to `sitemap.ts`; footer Markets band picks it up automatically from `COUNTRIES`.
  The nav carries no market links, so nothing was needed there.
- Added to `llms.txt` Markets section.

⚠️ **States plainly that there is no Indian entity** — the contracting company is the NZ
one. That is in the first FAQ answer rather than a footer, because it is the fact most
likely to rule the company out for a procurement-constrained buyer.

---

## 8. Verification

```
npm run build    →  116 prerendered pages, ✅ all guards passed   (115 before /in)
npx tsc --noEmit →  clean
sitemap          →  86 published posts
blog orphans     →  42 → 0
/blog post links →  13 → 86
posts h1 != 1    →  86 → 0        (262 surplus <h1> removed)
empty TOCs       →  82 → 0        (3,954 entries now rendered)
hreflang cluster →  7 pages x 7 alternates, reciprocal, incl. en-IN
```

No title, H1 or meta description was modified. No commit, no push.
