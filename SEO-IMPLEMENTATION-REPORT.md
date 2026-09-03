# SEO Implementation Report — Futurise Solutions

Sprint date: 3 September 2026. Baseline: `SEO-STRATEGY.md` (research pass).
Standard applied: Google Search Essentials, spam policies, helpful-content guidance,
structured-data policies, AI-features guidance, LocalBusiness guidance — all verified
against `developers.google.com` and `support.google.com` primary sources, not SEO blogs.

**Nothing has been committed, pushed, or deployed.** `HEAD` is still `08c4028`.

---

## 1. Executive summary

### What was already strong

More than the previous audit gave credit for. Specifically:

- **The five country pages are not doorway pages.** I measured this rather than asserting
  it: 8-word-shingle similarity between every pair of market pages peaks at **9.7%**. A
  templated city-swap page scores 70–95%. `/us` carries the state privacy patchwork, `/ca`
  carries Quebec Law 25 and French-language architecture, `/ae` carries free-zone vs
  mainland and PDPL. These are genuinely differentiated documents.
- **No fabricated Person, founder, employee, Review or AggregateRating schema ships.**
  Verified in built output: zero occurrences. `src/utils/Constant/team.js` gates the team
  section behind `TEAM_PUBLISHED = false`, so placeholder names cannot leak. Your privacy
  requirement was already satisfied — **nothing needed removing**.
- **Internal linking was already dense** — 22 in-body internal links from a service page
  before this sprint.
- **Metadata renders correctly** on all 27 routes in prerendered HTML.

### What changed

Four things, in order of expected value:

1. **A `ProfessionalService` node for the verified Wellington location** — the correction
   you flagged. Now on all 27 pages.
2. **Service → Market contextual internal links** — the one genuine gap in the link graph.
3. **Two unverifiable price figures qualified** (not deleted).
4. **`areaServed` documented and reconciled** with the new `/europe` page.

### Biggest remaining opportunity

Unchanged from the strategy doc: **position, not copy**. At position 16.5 your true external
CTR (0.35%) is already at benchmark. The lever is ranking for queries you can win, not
rewriting snippets.

---

## 2. Implemented changes

| File | Change | Why | Expected impact |
|---|---|---|---|
| `index.html` | Added `ProfessionalService` node `#wellington` with full `PostalAddress`, `areaServed`, `hasOfferCatalog`, `parentOrganization` → `#organization` | You have a verified GBP for this address. Google's LocalBusiness docs require only `name` + `address`; a LocalBusiness subtype is the correct type for a real, checkable location | Stronger local entity signal for NZ queries; explicit website↔GBP correspondence |
| `index.html` | Added `addressRegion: "Wellington"` to Organization `PostalAddress` | Address was incomplete — locality and postcode without region | Cleaner NAP parsing |
| `index.html` | Added a long HTML comment documenting why `openingHoursSpecification`, `priceRange`, `Review`, `aggregateRating` and `Person` are **absent** | Prevents a future contributor "helpfully" adding markup that would violate policy | Durable compliance |
| `src/Pages/ServicePage.jsx` | New "Building from a specific market?" block linking all 6 service pages → all 6 market pages, with descriptive anchors | Service → Market existed only via the footer. Anchors describe what each market page argues rather than repeating `<service> in <country>` | Completes the topical graph; distributes authority to market pages |
| `src/utils/Constant/caseStudies.js` | Replaced an invented `$28,000` third-party audit fee with a qualitative explanation of how audit cost scales | Per your Rule 1 — not our figure to state, and unverifiable. Engineering point preserved | Removes an unverifiable price claim; keeps the useful guidance |
| `src/utils/Constant/index.js` | Replaced invented ad-budget bands (`$2,000/mo`, `$5,000–$10,000/mo`) with a description of how budget is actually assessed | Same rule. The useful answer is *how to think about budget*, not a number we cannot stand behind | Honest, and more useful to a real buyer |
| `src/utils/Constant/index.js` | Documented `AREAS_SERVED`, retained `United Kingdom` | `/europe` now argues EEA + UK explicitly, so GB is a market the site genuinely addresses rather than an aspiration | Consistent entity signal |
| `prerender.js` | Hardened `extractBootLoader()` — regex boundaries + a content sanity check | The exact-string end marker `<div id="root"></div>` only exists in a *fresh* build. Re-running prerender against already-prerendered output silently shipped all 27 pages **without the boot loader**. My own warning caught it; the fragility was the real bug | Prevents a silent, sitewide regression |

---

## 3. Keyword → page map

Built from the research baseline. **No page was created merely because a keyword exists.**

### New Zealand — strongest market (real registered address + verified GBP)

| Primary keyword | Intent | Target page | Status |
|---|---|---|---|
| software development company New Zealand | Commercial | `/nz` | Existing |
| custom software development NZ | Commercial | `/nz` | Existing |
| AI development company New Zealand | Commercial | `/nz` → `/service/ai-ml-solutions` | Existing |
| web development company Wellington | Local commercial | **Not built** — see §12 | Deferred |
| Xero / MYOB integration developer NZ | Long-tail commercial | `/nz` (integrations section) | Existing |
| Privacy Act 2020 software obligations | Informational | `/nz` (compliance section) | Existing |

### India

| Primary keyword | Intent | Target page | Status |
|---|---|---|---|
| web development company in Udaipur | Local commercial | **Not built** — see §12 | Deferred |
| software development company India | Commercial | Homepage + service pages | Existing |

Udaipur is the **only GBP-eligible address you have** (staffed office) and has two genuinely
local named clients. Highest-value page not yet built.

### USA / Canada / UAE — **not abandoned**

Per Step 8, these are served by service+market+regulatory intent, not city pages:

| Market | Angle that differentiates | Page |
|---|---|---|
| USA | State privacy patchwork; HIPAA/PCI floor; AI system rules | `/us` (4,722 words) |
| Canada | Quebec Law 25; French-language architecture; accessibility filing; CASL consent | `/ca` (4,807 words) |
| UAE | Free zone vs mainland vs DIFC; PDPL; e-invoicing dates; Arabic/RTL | `/ae` (3,715 words) |
| Australia | Consumer Data Right; Privacy Act reform | `/au` (3,778 words) |

Each links to all six service pages and seven case studies.

### Europe

| Primary keyword | Intent | Target page |
|---|---|---|
| GDPR compliant software development | Commercial + compliance | `/europe` |
| EU AI Act compliance software | Informational → commercial | `/europe` |
| offshore development GDPR / SCCs | Commercial | `/europe` |
| EU data residency development | Commercial | `/europe` |

### Services (six pages, all improved)

Each targets `<service> company` + named stack, and now links to all six markets.

---

## 4. New pages

### `/europe` — created in the previous pass, verified in this one

- **Intent:** "can we lawfully engage a non-EEA supplier, and does this one understand the mechanism?"
- **Why it exists:** European city/country SERPs are held by directories and offshore
  location-template farms. A dozen thin country pages would be unrankable *and* would be
  doorway pages. One page arguing a single honest position is the defensible form.
- **Differentiation:** dated public record throughout — GDPR Art. 3/28/33/46, the 2021 SCCs,
  Schrems II (C-311/18), EU AI Act (Reg. 2024/1689) with real applicability dates, PSD2 SCA,
  NZ's EU adequacy decision. Plus an explicit "what we are not" section stating there is no
  European office, staff, entity or client work.
- **Measured:** 2,560 body words, 1 × h1, 8 × h2, 5 JSON-LD blocks, max 9.7% similarity to
  any other market page.
- **Realistic opportunity:** low-competition informational angle, but a new URL on a
  low-authority domain. Months, not weeks.

No other pages were added. Creating more would have been page-count theatre.

---

## 5. Existing pages improved

| Page | Change |
|---|---|
| `/` (index.html) | Wellington `ProfessionalService` node; `addressRegion`; compliance documentation |
| `/service/web-development` | Market link block |
| `/service/ai-ml-solutions` | Market link block |
| `/service/app-development` | Market link block |
| `/service/ui-ux-design` | Market link block |
| `/service/blockchain-development` | Market link block |
| `/service/digital-marketing` | Market link block; ad-budget answer qualified |
| `/case-studies/defi-protocol-launch` | Audit-fee figure qualified |
| `/about`, `/portfolio`, `/privacy`, `/terms` | Meta descriptions (previous pass) |

**Design, animations, hero, section hierarchy and visual system are untouched.**

---

## 6. Internal linking changes

Before: Service → Market existed only through the footer (site-wide, non-contextual).

Now the chain is complete in both directions:

```
SERVICE ──▶ MARKET        (new: 6 services × 6 markets, descriptive anchors)
SERVICE ──▶ CASE STUDY    (existing)
SERVICE ──▶ SERVICE       (existing: sibling chips)
SERVICE ──▶ BLOG          (existing: 4 posts per service)
MARKET  ──▶ SERVICE       (existing: all 6 from every market page)
MARKET  ──▶ CASE STUDY    (existing: 6–7 from every market page)
EUROPE  ──▶ MARKET        (existing: 5 sibling markets)
ALL     ──▶ CONTACT       (existing)
```

Anchor text is deliberately **descriptive, not exact-match**: "Europe — GDPR transfers and
the EU AI Act", not "web development Europe". Six services × six markets using exact-match
anchors would be 36 near-identical links — the pattern to avoid.

No orphan pages: `/europe` receives links from all 27 pages (footer) plus 6 contextual
in-body links from the service pages.

---

## 7. Structured data changes

**Sitewide: 96 JSON-LD blocks, 0 invalid.**

| Type | Count | Decision |
|---|---|---|
| `ProfessionalService` | 33 | **Retained + extended.** Added the Wellington node. Correct LocalBusiness subtype for a real, GBP-verified location |
| `Organization` | 29 | Retained; `addressRegion` added |
| `WebSite` | 27 | Retained |
| `FAQPage` | 20 | Retained — all have visible on-page FAQs |
| `BreadcrumbList` | 14 | Retained |
| `WebPage` | 9 | Retained |
| `Article` | 6 | Retained |
| `Service` | 6 | Retained |
| `CollectionPage` / `AboutPage` / `ItemList` / `ContactPage` | 6 | Retained |
| **`Person`** | **0** | **Correctly absent.** No staff member is named publicly. Emitting Person nodes for unidentified people is a fabricated-authority signal. `team.js` gates this behind `TEAM_PUBLISHED = false` and a unit test guards it. **Nothing removed — nothing was there.** |
| **`Review`** | **0** | **Deliberately absent.** Your genuine review lives on the Google Business Profile. Google's review-snippet policy: *"Don't aggregate reviews or ratings from other websites"*, and an entity controlling reviews about itself is *"ineligible for star review feature"*. Marking it up would be a violation. |
| **`AggregateRating`** | **0** | Same reason. No on-site review corpus exists. |
| **`openingHoursSpecification`** | **0** | Optional property; there are no published walk-in hours. Inventing them would be misleading markup. |
| **`priceRange`** | **0** | Optional; no rate card exists (see §Pricing). |

Every decision above is now documented in an HTML comment in `index.html` so it cannot be
casually undone.

---

## 8. Google compliance check

| Policy | Source | Status | Evidence |
|---|---|---|---|
| **Doorway pages** | [spam-policies](https://developers.google.com/search/docs/essentials/spam-policies) | ✅ Pass | Max cross-page similarity **9.7%** between market pages (measured, 8-word shingles). Google's definition targets "substantially similar pages"; these are not |
| **Scaled content abuse** | spam-policies | ✅ Pass | 27 pages total. No mass generation. Every page 882–4,906 words of specific content |
| **Misleading structured data** | [sd-policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) | ✅ Pass | 96 blocks, 0 invalid. All markup corresponds to visible page content. No Review/Rating/Person |
| **Review snippet policy** | [review-snippet](https://developers.google.com/search/docs/appearance/structured-data/review-snippet) | ✅ Pass | GBP review deliberately **not** marked up — aggregating third-party reviews is prohibited |
| **LocalBusiness guidance** | [local-business](https://developers.google.com/search/docs/appearance/structured-data/local-business) | ✅ Pass | Required `name` + `address` present; optional hours/priceRange correctly omitted |
| **People-first content** | [creating-helpful-content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) | ✅ Pass | Content answers real buyer questions (transfer mechanisms, jurisdiction choice, offshore tradeoffs) and states what the company *cannot* do — the opposite of search-engine-first writing |
| **AI features guidance** | [ai-features](https://developers.google.com/search/docs/appearance/ai-features) | ✅ Pass | Google: *"You don't need to create new machine readable files, AI text files, or markup… no special schema.org structured data that you need to add."* **No AEO/GEO tags invented.** AI crawlers allowed in robots.txt; content in prerendered text |
| **Search Essentials (crawlability)** | [essentials](https://developers.google.com/search/docs/essentials) | ✅ Pass | 27/27 prerendered; all sitemap URLs resolve; robots.txt allows all; content present without JS |

**No failures. No issues outstanding.**

---

## 9. Fakeness / trust audit

| Item | Current state | Action taken | Reason | Future owner input |
|---|---|---|---|---|
| Wellington address & GBP | **Supported** | Strengthened with `ProfessionalService` node | Real registered address + verified GBP with a genuine review | None |
| Wellington wording sitewide | **Supported** | Audited, no change needed | Already says "registered in Wellington… engineering team in India" — accurate and self-disclosing | None |
| GBP review | **Supported but not markup-eligible** | Deliberately **not** marked up | Google prohibits aggregating third-party reviews | Could collect first-party reviews on-site later |
| `companyStats` (25+ projects, 15+ clients) | **Qualified** | Retained | Owner-attested operating figures, rounded with "+", documented as answerable on a sales call | Keep answerable |
| Homepage testimonial (Abbas Kagzi, Infinity Bay) | **Supported** | Retained | Named person at a named client whose project is in the portfolio | None |
| Case-study metrics (24 figures) | **Removed in previous pass** | Replaced with build facts | Fabricated; contradicted `/about`; policy risk | Supply real metrics → can be reinstated with proof |
| Case-study testimonials (6) | **Removed in previous pass** | Set to `null` | Attributed to people who do not exist | Real named clients only |
| `$28,000` audit fee | **Currently unverified** | **Qualified, not deleted** | Third-party cost we cannot evidence; the engineering point is preserved | Supply the real figure if you want it stated |
| Ad budget bands | **Currently unverified** | **Qualified, not deleted** | Replaced with how budget is actually assessed | Supply your real minimum if you have one |
| `United Kingdom` in `areaServed` | **Supported** | Retained + documented | `/europe` now argues EEA + UK explicitly | Remove if `/europe` is ever removed |
| Founder / team identity | **Private by instruction** | No Person schema; placeholders gated | Privacy respected; no invented identity | Only publish if you choose to |
| Pricing | **Requirement-based by design** | No figures invented | Custom engineering; cost depends on scope | Decide whether to publish bands (see §12) |

**Nothing was deleted that could be truthfully qualified.**

---

## 10. SEO impact model

### Expected immediate (days–weeks after recrawl)

- **Cleaner local entity signal** — website↔GBP correspondence is now explicit in structured
  data for the Wellington location.
- **Better crawl distribution to market pages** — 36 new contextual in-body links.
- **Reduced misleading-content risk** — no unverifiable price figures remain in body copy.
- **No structured-data policy exposure** — 0 Review/Rating/Person nodes.

### Expected medium-term (1–6 months)

- **Stronger topical relevance** for service+market queries, because the graph now connects
  those concepts contextually rather than only through boilerplate.
- **Improved entity understanding** for AI/generative systems — consistent
  Organization + Wellington location + service catalogue across every page.
- **Better long-tail coverage** via `/europe` on GDPR/EU AI Act intent, where competition is
  informational rather than directory-locked.
- **CLS improvement** (0.18 → 0.014, previous pass) should clear the Core Web Vitals "Poor"
  flag once CrUX's 28-day field window refreshes post-deployment.

### What is NOT guaranteed

Stated plainly:

- **Rankings are not guaranteed.** No change here creates an entitlement to a position.
- **Indexing is not guaranteed or immediate.** Google decides whether and when to index.
- **Rich results are not guaranteed.** Valid structured data makes a page *eligible*; it
  does not entitle it to any search feature.
- **AI citations are not guaranteed.** LLM output is non-deterministic and varies by
  session, region and model version.
- **Traffic growth depends on** competition, domain authority, relevance, crawl budget,
  indexing decisions and ranking systems outside anyone's control.
- **No traffic forecast is given**, because any number would be invented.

The honest summary: this sprint removed risk, improved machine-readability, and closed a
link-graph gap. It does not, by itself, move you from position 16.5 to page 1.

---

## 11. Baseline vs final

| Metric | Baseline (start of sprint) | Final | Note |
|---|---|---|---|
| Routes prerendered | 27/27 | **27/27** | Includes `/europe` |
| Sitemap URLs | 27 | **27** | All resolve to built pages |
| JSON-LD blocks | 91 | **96** | +5 from the Wellington node propagating |
| Invalid JSON-LD | 0 | **0** | |
| Pages with valid metadata | 27/27 | **27/27** | title ≤60, desc ≤160, canonical, robots, OG, Twitter, single h1 |
| `Person` / `Review` / `AggregateRating` nodes | 0 | **0** | Confirmed absent in built output |
| Unverifiable outcome claims rendered | 2 (price figures) | **0** | Scanned all 27 built pages |
| Service → Market in-body links | 0 | **36** | 6 services × 6 markets |
| Max market-page similarity | not measured | **9.7%** | Doorway test |
| Responsive/integrity checks | — | **152 passed** | 19 routes × 8 widths |
| Horizontal overflow | 0 | **0** | |
| JS errors | 0 | **0** | |
| Broken images | 0 | **0** | |
| LCP (home) | 700ms | **1020ms** | Both well under 2500ms; run-to-run variance |
| CLS (home) | 0.014 | **0.014** | Was 0.181 before the previous pass |
| TBT | 70–98ms | **151–225ms** | Under 300ms; two routes in the "needs improvement" band — see §12 |
| Lint | 19 errors | **19 errors** | Pre-existing, unrelated (unescaped quotes in legal copy) |
| Tests | 3 failing / 39 | **3 failing / 39** | Pre-existing, unchanged |

---

## 12. Remaining actions

### Owner input required (only you can supply these truthfully)

1. **Pricing policy decision.** Both research agents identified published pricing as the
   single largest content opportunity — the NZ "website cost" SERP has no directories and no
   large brands, because large agencies structurally cannot publish rates. Your `/pricing`
   page declines to publish figures **by deliberate design**, which is a legitimate
   commercial position and consistent with your Rule 1. If you ever want to compete there,
   the numbers must come from you. **I invented nothing.**
2. **Real case-study metrics**, if you want figures reinstated. They must be client-verifiable.
3. **The real audit fee** for the DeFi case study, if you want it stated.
4. **A real minimum ad budget**, if one exists.
5. **Founder identity** — currently private by your instruction. Publishing a real name with
   a real LinkedIn would be the single largest remaining E-E-A-T and entity gain, but it is
   entirely your call. `team.js` is built and gated, ready if you choose.
6. **Blog CMS availability** — `/blog` prerenders thin (531 words, 0 child links) because
   `api.futurisesolutions.com` was unreachable from this machine. Confirm it responds during
   your build; the build already fails loudly if it does not.

### Post-deployment actions (Google Search Console)

1. **Filter internal traffic** in GSC and GA. 18 of 23 clicks were your own — every metric
   you look at is currently inflated ~4.5×. Do this first.
2. **Request indexing** for `/europe` and the six rewritten case studies.
3. **Submit the sitemap** (or confirm it re-fetches) — it now has 27 URLs.
4. **Validate structured data** with the Rich Results Test on `/`, `/nz`, `/europe`.
5. **Confirm GBP consistency** — business name, address and website URL on the profile
   should match the site exactly.
6. **Watch Core Web Vitals** in GSC for the CLS flag to clear (~28 days of field data).

### Future SEO opportunities (deliberately deferred)

1. **Wellington service page** — real address, real GBP, page-1 competition is small
   `.co.nz` studios. The strongest untapped page.
2. **Udaipur service page** — your only staffed, GBP-eligible office, plus two genuinely
   local named clients (Dhanlaxmi Property, Palm Vision Technology).
3. **NZ-hires-offshore-team page** — uncontested high-intent query nobody credible owns.
4. **Wikidata item + NZBN citation** — highest-leverage entity actions available.
5. **Auckland / Christchurch** — winnable but 9–18 months and lower volume.
6. **TBT** — 151–225ms on two routes, inside Google's 300ms threshold but worth watching if
   more JS is added.

Deferred deliberately: each needs either owner input or is lower value than what was done.
