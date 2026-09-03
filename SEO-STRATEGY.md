# Futurise Solutions — SEO / Local / AEO / GEO Strategy

Research date: 3 September 2026. Every SERP claim below was checked against live search
results by a research agent, not assumed. Where a figure could not be verified it is
labelled as an estimate with its confidence stated.

---

## 1. The diagnosis: you do not have a CTR problem

This is the single most important finding, and it inverts the brief's premise.

| Metric | Your figure | Benchmark at position 16.5 |
|---|---|---|
| Impressions (28d) | 1,440 | — |
| Clicks | 23 (≈18 internal) | — |
| CTR as reported | 1.6% | 0.3–0.4% |
| CTR excluding your own visits | **0.35%** | **0.3–0.4%** |
| Average position | 16.5 | — |

Position 16.5 is page two. Composite CTR-by-position data (seoClarity, ~750B impressions;
Backlinko; SISTRIX) puts positions 15–16 at **0.3–0.4%** — the lowest-CTR band on the whole
SERP. Your true external CTR of 0.35% is therefore **exactly benchmark**, not below it.

The practical consequence:

- A perfect title rewrite at position 16.5 might add **~3 clicks/month**.
- Moving the same pages to position 8–10, changing nothing else, yields **~100 clicks/month**
  on identical impressions.

**Position is worth roughly 30× what meta copy is worth here.** Rewriting titles before
rankings move is optimising the wrong variable. That is why only three meta rewrites were
applied in this pass, not a sitewide sweep.

Two corollaries worth acting on:

1. **Filter your own traffic in GSC/GA.** 18 of 23 clicks were internal. Every future
   decision made on the 1.6% headline is made on a number inflated ~4.5×.
2. **n=23 is below the threshold where CTR is measurable.** Do not A/B test titles at this
   volume; you will read noise as signal for months.

---

## 2. City targeting: what the SERPs actually showed

You named Udaipur, Delhi, Mumbai, Bangalore, Dubai, Chicago, New York and Toronto as
examples and asked for research rather than assumption. Here is what the research found.

### Rejected — with evidence

| Market | Why rejected |
|---|---|
| **Chicago** | Page 1 for "app development company Chicago" contains **no Chicago companies at all** — TekRevol, Zazz, TechGropse, iQlance, Trango Tech, all offshore shops running `/app-development-chicago/` location templates. This is the exact doorway pattern your brief forbids. They rank on domain authority *despite* the pattern, not because of it. |
| **New York** | The most competitive agency SERP in the world: Clutch/DesignRush directories plus the same offshore template farms plus genuine local agencies. |
| **Dubai** | "web development company in Dubai" and "blockchain development company Dubai" return the same offshore template farms (TekRevol `/ae/`, Zazz, Apptunix `.ae`, Blocktunix, Suffescom). Incumbents stack review counts and award badges you cannot match without fabricating them. |
| **Mumbai / Bangalore / Delhi** | Near-total high-DA directory lock — Clutch, GoodFirms, DesignRush, TechBehemoths, SelectedFirms hold most of page 1. A 2024 domain cannot displace Clutch on a head term. Bangalore is additionally India's tech capital: thousands of established engineering firms. |
| **Toronto** | Same offshore-template pattern as Chicago (iQlance, TekRevol both run Toronto location pages) layered over strong local agencies. |
| **European cities** (London, Berlin, Amsterdam) | No European entity, clients, case studies, or timezone/regulatory advantage. Rejected wholesale — see §3 for what was built instead. |
| **Jaipur / Jodhpur / other Rajasthan** | The doorway trap precisely: Udaipur is legitimate because there is a real office and named local clients; these have neither. |
| **Blockchain in Udaipur; blockchain in NZ cities** | Insufficient commercial demand at city level. |
| **Digital marketing outside Udaipur** | Most commoditised of the six services in every market examined. |

### The structural reason most city pages fail for you

Two compounding constraints, both verified:

1. **You cannot enter the map pack.** Google Business Profile guidelines state verbatim that
   a virtual office or unstaffed address "isn't eligible for a Business Profile". The
   Wellington address is a registered office; the team is in Udaipur. **Creating a Wellington
   GBP listing would be a guidelines violation with suspension risk.** The local pack takes
   42–44% of clicks on local-intent queries — permanently closed to you in every city except
   Udaipur.
2. **Below a map pack, organic #1 earns ~15% CTR, not ~28%.** So even ranking #3 organically
   on a local SERP — an aggressive 6–12 month goal — realistically yields 1–3 clicks/month.

### Recommended — built or buildable

| Priority | Page | Why it survives the doorway test |
|---|---|---|
| **Tier 1** | Wellington + web development | A real registered office. Page 1 is small `.co.nz` studios (Somar Digital, Webstruxure, Alphero), not directory walls. |
| **Tier 1** | Udaipur + web development | A real staffed office — the **only GBP-eligible address you have** — plus two genuinely local named clients (Dhanlaxmi Property, Palm Vision Technology). Page 1 is technically weak local agencies. |
| **Tier 1** | NZ-hires-offshore-team | Nobody credible owns this query. You are structurally both a NZ entity and an owned India delivery team; no competitor is both. |
| **Tier 2** | Auckland (ecommerce/Shopify angle) | Winnable but 9–18 months, no physical presence. |
| **Tier 2** | Christchurch (agritech/logistics) | Genuinely low volume; build fourth, not first. |

**Built in this pass:** `/europe` (see §3). The Tier 1 city pages are specified above and
ready to build — they were not built in this pass because the case-study remediation took
priority as a live risk.

---

## 3. `/europe` — what was built and why

One region page, not a country cluster. Rationale, in the page's own file header:

- No European entity, staff or client work exists, so country pages would be unrankable
  **and** would read as doorway pages.
- What *is* genuinely true and genuinely useful: engaging a non-EEA supplier is a
  data-protection decision before it is a procurement one, and most suppliers in this
  bracket cannot name the transfer mechanism they rely on.

The page argues that position with dated, checkable public record — GDPR Art. 3/28/33/46,
the 2021 Standard Contractual Clauses, Schrems II (C-311/18), EU AI Act (Reg. 2024/1689)
with its actual applicability dates, PSD2 SCA, and New Zealand's EU adequacy decision.

It states plainly what you are **not**: no European office, no European staff, no European
client work, and wrong supplier for an EU-establishment contract. That candour is the
differentiator — every competing page claims local presence.

- 2,659 crawlable words, 1 × h1, 8 × h2, 5 JSON-LD blocks
- `ProfessionalService` with `areaServed: Place` (not `Country` — Europe is a region)
- Deliberately **outside** the hreflang cluster: it is a distinct topic, not a regional
  variant of the homepage. Self-canonical.
- Linked from the footer on all 27 pages; links out to 6 service pages + 5 country pages.

---

## 4. Case studies: a live risk, now removed

`/case-studies` and its six children shipped **24 fabricated performance metrics** and **six
testimonials attributed to people who do not exist** ("Marcus T.", "Alex K.", "Priya S.",
"James R.", "David M.", "Sarah L.").

This mattered for three independent reasons:

1. It contradicted your own `/about` page, which publicly states *"No awards, ratings or
   scores"* and *"one testimonial, attributed to a named person at a named company"*.
2. Fabricated review/rating content is a **Google structured-data policy violation** with
   manual-action exposure.
3. `"1.5x token price appreciation"` and `"$850K TVL"` are investment-performance claims —
   the most legally sensitive lines on the site.

The same figures were also being fed to AI answer engines through `public/llms.txt`, under
the heading *"verified client outcomes"*.

**What was done** (your chosen option: rewrite as honest work, keep the pages):

- All 24 outcome metrics replaced with **build facts** — architecture, thresholds, durations,
  stack decisions. Things true by construction that need no client confirmation.
- All 6 testimonials removed (`testimonial: null`; the renderer already guarded for null).
- Narrative prose scrubbed of unverifiable client analytics (ticket volumes, churn rates,
  ad spend, MQL cost, domain ratings) — 29 further replacements.
- `llms.txt` rewritten: no counts, no percentages, no "verified outcomes" framing.
- Page-level copy changed from "Real Results From Real Projects" to "How We Build, In Detail".

**The pages got better, not thinner:** 1,250–1,337 words each, up from ~1,000.

An independent adversarial audit pass caught four issues the rewriters missed (participant
counts, an unverifiable claim about a client's internal team, an "external audit"
attribution, one over-length description). All four were fixed.

---

## 5. Technical SEO: the metadata rendering issue

You asked me to re-verify this against real rendered output rather than source. I did.

**Result: metadata renders correctly on all 27 pages.** Verified in built HTML:

- `<title>`, meta description, canonical, robots, OG tags, Twitter tags, JSON-LD — all
  present and page-specific on every route.
- 91 JSON-LD blocks parsed, **0 invalid**.
- Every page has exactly one `<h1>` and 882–4,906 crawlable words *with JavaScript disabled*
  (the prerenderer bakes real DOM into each route), so AI crawlers that never execute JS —
  GPTBot, ClaudeBot, PerplexityBot, CCBot — see full content.

**One thing I checked and did NOT change.** `vercel.json` rewrites `/about`, `/contact`,
`/portfolio` etc. to `/index.html`, which looked like it would destroy per-page metadata. It
does not: Vercel's documentation states *"precedence is given to the filesystem prior to
rewrites being applied"*, so the prerendered static files win and the rewrites are dead
config acting as a fallback. Verified against Vercel's official docs rather than assumed —
"fixing" it would have removed a safety net for no benefit.

---

## 6. Core Web Vitals: CLS fixed sitewide

**This is the highest-impact technical change in the pass**, because CLS is a confirmed
ranking signal and the site was failing it on every route.

| Route | CLS before | CLS after |
|---|---|---|
| `/` | 0.181 ❌ | **0.014** ✅ |
| `/about` | 0.191 ❌ | **0.006** ✅ |
| `/portfolio` | 0.267 ❌ | **0.091** ✅ |
| `/nz`, `/us`, `/pricing`, `/contact` | ~0.190 ❌ | **0.014** ✅ |

**Root cause, found by attribution rather than guesswork:** a single shift at 1643ms worth
0.1756 — the `<footer>` jumping from y=742 to off-screen. The Suspense fallback in
`AllRoutes.jsx` was `minH="70vh"` (630px), so the footer painted just below the fold; when
the lazy route resolved the document grew to ~10,300px and the footer was displaced by
>8,000px. Same fallback on every route, same shift, every page.

**Fix:** `minH="100vh"`, so the footer sits past the viewport during loading and its move is
never visible. CLS only counts shifts of *visible* content, which removes the shift from the
score rather than shrinking it.

LCP (700ms–2.3s) and TBT (70–98ms) were already green and remain so.

---

## 7. AEO / GEO

### Real, worth doing

- **Wikidata item** — the highest-leverage entity action available. Unlike Wikipedia it does
  not require notability; a registered legal entity, website and founding date qualify. Add
  the resulting URI to `sameAs`.
- **NZBN / NZ Companies Office record** — a free, authoritative government corroboration of
  "registered in Wellington". Cite it on `/about` and `/contact`.
- **LinkedIn** — ~11% of AI answers cite a LinkedIn URL (Profound/ALM 2026). Higher ROI than
  any on-site schema change.
- **Clutch profile** — *only* if real clients will leave real reviews. An empty profile adds
  nothing.
- **Direct-answer-first structure** — ~44% of LLM citations come from the first 30% of page
  content (SparkToro 2026). Follow each question heading with a 40–60 word self-contained
  answer. `/europe` is written this way; the FAQ blocks already do it well.

### Confirmed snake oil — do not do

- **There is no such thing as an "AEO tag" or "GEO meta tag".** No `ai-content`,
  `aeo-optimized`, `llm-friendly` or similar exists in any specification. Your instinct here
  was right.
- **`HowTo` schema** — deprecated by Google, removed from search appearance.
- **`AggregateRating` / `Review` schema** — you have no review corpus. Fabricating one is the
  highest-severity structured-data violation available.
- **`LocalBusiness` for the Wellington address** — asserts a walk-in presence that does not
  exist. `ProfessionalService` (already in use) is correct.
- **"Guaranteed ChatGPT rankings" / AI-visibility dashboards** — unfalsifiable; LLM output is
  non-deterministic across sessions, regions and model versions.

### Schema: current state is good

91 valid blocks across Organization, WebSite, WebPage, FAQPage, BreadcrumbList,
ProfessionalService, Article, CollectionPage, AboutPage, ItemList, ContactPage.
The genuine remaining gap is a **real named `Person`** as founder/author — gated on you being
willing to publish a name. `src/utils/Constant/team.js` is already built for this and falls
back to Organization until then, with a test guarding against fabricated people.

---

## 8. What to do next, in order

1. **Filter internal traffic in Search Console and GA.** Everything else is measured against
   a number that is currently 4.5× inflated.
2. **Create the Wikidata item and add the NZBN to `/about`.** Cheap, high entity leverage.
3. **Build the three Tier-1 pages** specified in §2: Wellington, Udaipur, NZ-offshore.
4. **Consider publishing real pricing.** Both the competitor and keyword agents independently
   identified this as your single largest content opportunity — the NZ "website cost" SERP
   has zero directories and zero big brands, because large agencies structurally cannot
   publish rates without breaking their quote-based sales motion. Your `/pricing` page
   currently declines to publish figures by deliberate design decision; that is a legitimate
   commercial choice, but it forgoes the clearest ranking opening found in this research.
   **I did not invent price bands — those numbers are yours to supply.**
5. **Request indexing** for `/europe` and the six rewritten case studies in Search Console.

---

## 9. Realistic expectations

- **Fastest to move:** the six rewritten case studies and `/europe` — new/changed content
  Google will recrawl within days to a few weeks of an indexing request.
- **CLS improvement** feeds into Core Web Vitals via field data (CrUX), which uses a 28-day
  rolling window. Expect the "Poor CLS" flag to clear in Search Console roughly a month after
  deployment, assuming real-user traffic confirms it.
- **`/europe` will not rank quickly.** It targets a low-competition informational angle, but
  it is a new URL on a low-authority domain. Months, not weeks.
- **Position 16.5 → page 1 on head terms is not realistic** for a 2024 domain against
  Clutch and DA-70 offshore networks. Do not target it. Target long-tail queries where you
  can plausibly hold positions 1–3: specific integrations, stacks, compliance regimes,
  and geographies where you have genuine substance.
- **200 impressions at position 3 beats 1,440 at position 16.5** by roughly 10× in clicks
  and considerably more in lead quality. That is the whole strategy.

No ranking guarantees are made anywhere in this document, and none should be made to clients.
