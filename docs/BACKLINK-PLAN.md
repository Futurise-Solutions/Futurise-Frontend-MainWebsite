# Backlink Plan — Futurise Solutions

**Date:** 2026-09-20 · **Facts re-checked against the live site:** 2026-11-09
**Audience:** whoever executes this by hand. Everything is paste-ready.

> ### Nov 2026 update: what changed and where links should point
>
> - **Portfolio is now 12 projects, 12 clients named** (was 9 / 8): Startus Cloud, Raman
>   Scientific and Jain Ceramic Mart were added, and the perpetuals terminal's client
>   (GDT Exchange) now appears in the site's logo strip. §1.4 and §1.7 are updated.
>   **Seven** case studies are published at `/case-studies` (was six).
> - **Where authority is needed most (from Search Console, Nov 2026):** the Shopify pages
>   rank 50–90 for "shopify agency/developers dubai" and NZ, and on-page work alone will
>   not move them. Where a profile allows a portfolio item or service link, point the
>   Shopify entry at `/solutions/shopify-development-cro` (or `/ae` and `/nz` variants
>   for those markets), not only at `/`.
> - **Do not state a location for Startus Cloud, Raman Scientific or Jain Ceramic Mart.**
>   The site publishes none.

Every fact in Part 1 is pulled from this repository — `/about`, `/portfolio`,
`utils/Constant/index.js` (CONTACT, SOCIAL_PROFILES, AREAS_SERVED) and the Organization
schema. **Nothing is invented.** Where I could not verify something, it is marked rather
than guessed.

> ### Three things to settle before you start
>
> ### Two things to settle before you start
>
> 1. **✅ PHONE: DECIDED — there is no published phone number.** Owner decision. It has been
>    removed from `llms.txt` and from both chatbot files, so every surface now agrees with
>    `/about` ("no telephone number is published anywhere on this site") and with the
>    Organization schema, which omits `telephone`.
>
>    **Consequence: 26 of the 100 targets below are marked 🚫 SKIP** — their forms cannot be
>    completed without a number, and three verify by OTP. §2.8 lists them. **Do not start
>    those 26.** The remaining 74 are unaffected, including every item in the first sitting.
>
> 2. **Confirm the registered entity name.** Listings ask for a legal name. The site says
>    "registered in Wellington" but never prints the registered company name or NZBN. Look
>    it up on the NZ Companies Register before filling in anything legal.
>
> *(Resolved, for the record: `predefinedQA.js` previously answered "Show me your portfolio"
> with "We've delivered 25+ projects" where `/portfolio` publishes twelve — see §6. Do not
> repeat any project count in a listing.)*

---

# PART 1 — Company fact sheet

## 1.1 Core identity

| Field | Value |
|---|---|
| Trading name | Futurise Solutions |
| Website | https://www.futurisesolutions.com |
| Email | business@futurisesolutions.com |
| Registered address | Huddart Parker Building, Wellington Central, Wellington 6011, New Zealand |
| Phone | **None published.** Removed from `llms.txt`; absent from every page and from the Organization schema. See §2.8 for the 26 targets that require one. |
| Founded | 2024 |
| Entity type | Registered New Zealand company |
| Delivery team | Udaipur, Rajasthan, India |
| Team size band | ⚠️ **Not published anywhere.** Use "2–10" only if you can stand behind it; the site deliberately publishes no headcount. Leave blank where optional. |
| Languages | English |
| Currencies | NZD, USD, AED, CAD, AUD, EUR, INR *(markets served; NZD and USD are the ones named in page copy)* |
| Markets served | New Zealand, United Arab Emirates, United States, Canada, India, United Kingdom, Australia |

## 1.2 Social profiles (for "social" fields and sameAs)

| Network | URL |
|---|---|
| LinkedIn | https://www.linkedin.com/company/futurisesolutions/ |
| Instagram | https://www.instagram.com/futurisesolutions |
| Facebook | https://www.facebook.com/share/1E6xe2C5DW/ |
| X (Twitter) | https://x.com/futurisesol |

> **Note on brand disambiguation:** "Futurise Solutions" is one character from **Futurice**,
> an established Finnish consultancy with a Wikipedia entry. Every consistent listing helps
> search engines tell them apart. Always use the **full** name "Futurise Solutions", never
> "Futurise" alone.

## 1.3 Taglines (3 variants)

1. Full-cycle digital product studio *(this is the `slogan` in the Organization schema — prefer it where a short tagline is needed)*
2. From idea to scaled production — AI, SaaS, web and mobile.
3. Fixed-scope quotes. Senior engineers. Shipped products.

## 1.4 Descriptions

**50 words**

> Futurise Solutions is a Wellington-registered digital product studio founded in 2024, with
> an engineering team in Udaipur, India. We build AI agents, SaaS platforms, web and mobile
> apps end to end — on fixed-scope quotes rather than hourly billing. Delivered client work
> in the UAE, the United States and India.

**100 words**

> Futurise Solutions is a full-cycle digital product studio registered in Wellington, New
> Zealand and founded in 2024, with its engineering team in Udaipur, India. We design, build
> and scale AI, web, mobile and Web3 products for startup founders, SaaS companies and
> enterprises.
>
> Six disciplines in-house: AI & ML, web development, mobile app development, UI/UX design,
> blockchain and digital marketing. Engagements start with a free discovery call and a
> fixed-scope estimate, not an open-ended hourly count. Work runs in two-week sprints with
> reviewable software at each one. NDAs signed on request. Published client work spans the
> UAE, the United States and India.

**160 words**

> Futurise Solutions is a full-cycle digital product studio registered in Wellington, New
> Zealand, founded in 2024, with its engineering team based in Udaipur, India. We take
> products from concept to scaled production for startup founders, SaaS companies and
> enterprises.
>
> Six disciplines run in-house. AI & ML: custom agents, LLM and RAG integrations, NLP and
> computer vision, model-agnostic across OpenAI, Anthropic, Google and Meta. Web: React,
> Next.js, Astro and Node.js — SEO-ready and fast. Mobile: React Native and Expo from a
> single codebase. UI/UX: research, Figma, design systems to WCAG 2.1. Blockchain: audited
> smart contracts, DeFi and multi-chain dApps. Digital marketing: SEO, paid media and CRO
> tied to revenue.
>
> How we work is deliberately checkable. Every engagement starts with a free discovery call
> and a fixed-scope estimate. Delivery runs in two-week sprints. We publish twelve client
> projects with screenshots and seven long-form case studies, and we name no client
> we have not delivered for.

**300 words**

> Futurise Solutions is a full-cycle digital product studio registered in Wellington, New
> Zealand at the Huddart Parker Building, founded in 2024, with its engineering team in
> Udaipur, Rajasthan, India. We design, build and scale AI, web, mobile and Web3 products,
> taking an idea from concept through to production for startup founders, SaaS companies and
> enterprises.
>
> Six disciplines are delivered in-house. **AI & ML** — custom AI agents, LLM and RAG
> integrations, NLP pipelines and computer vision, built model-agnostically across OpenAI,
> Anthropic Claude, Google Gemini and Meta Llama, and built for production rather than demos.
> **Web development** — SaaS platforms, dashboards and APIs on React, Next.js, Astro and
> Node.js, SEO-ready with sub-two-second loads. **App development** — cross-platform iOS and
> Android from one React Native and Expo codebase. **UI/UX design** — UX research,
> wireframing, high-fidelity Figma work and design systems meeting WCAG 2.1. **Blockchain** —
> audited smart contracts, DeFi platforms and multi-chain dApps across Ethereum, Base,
> Arbitrum, Polygon and Solana. **Digital marketing** — SEO, performance media and conversion
> optimisation measured against revenue rather than vanity metrics.
>
> Engagements begin with a free discovery call, followed by a fixed-scope estimate rather
> than an open-ended hourly count. Delivery runs in two-week sprints producing reviewable
> software, with NDAs signed on request and post-launch support available. MVPs typically run
> 6–12 weeks; larger platforms 3–6 months.
>
> Our published record is deliberately checkable. Twelve client engagements appear on the
> portfolio with screenshots and the problem each solved, and seven long-form case studies
> are published alongside them. We publish no
> client counts, no award badges and no ratings, and we name no client we have not delivered
> for. Clients span Dubai, the United States and India.

## 1.5 Service categories (as directories label them)

Pick the closest match from each directory's own taxonomy:

- Software Development · Custom Software Development
- Web Development · Web Design & Development
- Mobile App Development · iOS & Android Development
- Artificial Intelligence · AI Development · Machine Learning
- UI/UX Design · Product Design
- Blockchain Development · Web3
- Digital Marketing · SEO Services
- SaaS Development
- IT Services & Consulting

## 1.6 Fifteen keywords for tag fields

```
software development company, custom software development, AI development company,
AI agent development, SaaS development, web development company, Next.js development,
React development, mobile app development, React Native development, UI UX design agency,
blockchain development, smart contract development, digital marketing agency, New Zealand
```

## 1.7 Client names safe to publish

Only these. Every one is named on `/portfolio` with screenshots.

⚠️ **Naming and referencing are different permissions.** You may state that work has been
delivered in a market WITHOUT naming the client — *"delivered for clients we are not able to
name"* is accurate and backed by the published NDA commitment. You may **not** name, or show
a logo for, any client absent from this table.

| Client | Sector | Location |
|---|---|---|
| Infinity Bay Trading | B2B FMCG / HORECA / industrial supply | Dubai, UAE |
| Dhanlaxmi Property | Land development & property advisory | Udaipur, India |
| Palm Vision Technology | CCTV, security & office technology | Udaipur, India |
| HOMIES | PropTech SaaS | USA & India |
| Marty-QR | AI review platform (SaaS) | USA & India |
| David Tishbi | Luxury jewellery e-commerce | USA |
| Estate | Real-estate listings platform | India & USA |
| Platinum Peak | Hospitality / hotel booking | India & USA |
| Startus Cloud | Shopify e-commerce & CRO (PC components) | *not published, leave blank* |
| Raman Scientific | Laboratory supplies website (Next.js) | *not published, leave blank* |
| Jain Ceramic Mart | Ceramics showroom website | *not published, leave blank* |
| GDT Exchange | Crypto perpetuals trading terminal | *not published, leave blank* |

**Twelve projects are published.** Every client above appears by name in the site's logo
strip. On `/portfolio` the perpetuals terminal is titled by product ("Crypto Exchange"), so
in a portfolio-item field, use the product title and keep the client name for logo or
client-list fields. Startus Cloud is the only published **Shopify** project, so it is the
right portfolio item for any Shopify category.

**Testimonials:** exactly one is on the record, from the Founder of Infinity Bay Trading
(Dubai). Do not imply more.

---

# PART 2 — 100 link targets

**Confidence:** HIGH = the site exists and accepts listings · MEDIUM = exists, verify it
still accepts submissions · LOW = may be dead or may have closed submissions.

**Honesty rule applied:** anywhere requiring a local street address in a city with no
presence is marked **"needs local address — skip"**. Udaipur and Wellington listings *are*
available, because there is a real address in Wellington and named local clients in Udaipur.

**Anchor mix across the 100:** ~50 branded, ~25 bare URL, ~25 descriptive. Target URLs are
deliberately spread — roughly 40 to `/`, and the rest across `/nz`, `/us`, `/ae`, `/europe`,
`/portfolio`, `/about`, `/pricing` and the six `/service/*` pages.

## 2.1 New Zealand (15)

> ### 🔴 THE NEW ZEALAND RULE — read before filling in any form in this section
>
> **`/about` states that no published engagement on this site belongs to a New Zealand
> business.** New Zealand is where the company is *registered*. Wellington is also the one
> place with a **real address**, which is what makes these listings legitimate at all.
>
> - ✅ **Say:** registered in Wellington · a New Zealand company founded in 2024 · NZD
>   fixed-scope quotes · NZ business-hours delivery · serving New Zealand businesses ·
>   delivered client work in the UAE, the US and India
> - ❌ **Never say or imply:** a named New Zealand client · "trusted by NZ companies" · an
>   NZ case study · any client logo in an NZ context
>
> ⚠️ **This is narrower than the general location rule, deliberately.** Elsewhere,
> referencing delivered work you cannot name is fine. Here it is not, because `/about`
> makes a specific published claim about New Zealand — no delivered engagement belongs to
> an NZ business — and a directory profile hinting otherwise contradicts the site directly.
> Sell the registration and the delivery model, not a customer base.
>
> **The 50/100/160/300-word descriptions in Part 1 are already safe** — they say "Delivered
> client work in the UAE, the United States and India", which is accurate and states the
> position plainly. **Paste them as written.** The risk is in the free-text fields
> directories add on top ("Why choose us", "Areas we serve", "Our clients"), and in the
> temptation to localise a description for an NZ form. Do not localise it.
>
> Two specific traps in this section:
> - **#12 NoCowboys** is a *customer review* platform aimed at NZ consumers. There are no
>   NZ clients to ask, and routing overseas clients there to review an NZ-consumer listing
>   would misrepresent the record. Create the profile if you like; do not chase reviews.
> - **#15 Google Business Profile** will prompt for service areas and may surface a
>   "customers in your area" framing. Set it to the Wellington registered address and the
>   services offered — never to a customer base.

| # | Site | URL | City | Type | Cost | Signup | Target | Anchor | Conf |
|---:|---|---|---|---|---|---|---|---|---|
| 1 | NZ Companies Register | companiesoffice.govt.nz | Wellington | Government | Free | Already registered — verify public record is correct | `/` | Futurise Solutions | HIGH |
| 2 | NZBN | nzbn.govt.nz | Wellington | Government | Free | Claim & complete the entry | `/` | futurisesolutions.com | HIGH |
| 3 | Yellow NZ | yellow.co.nz | Wellington | Business directory | Freemium | Claim listing | `/nz` | Futurise Solutions | HIGH |
| 4 | Finda | finda.co.nz | Wellington | Business directory | Free | Submit | `/nz` | software development company New Zealand | MEDIUM |
| 5 | Localist | localist.co.nz | Wellington | Business directory | Free | Submit | `/nz` | Futurise Solutions | MEDIUM |
| 6 | NZ Business Directory | nzbusinessdirectory.co.nz | — | Business directory | Free | Submit | `/nz` | futurisesolutions.com | MEDIUM |
| 7 | Wellington Chamber of Commerce | wellingtonchamber.co.nz | Wellington | Chamber | Paid | Membership | `/about` | Futurise Solutions | HIGH |
| 8 | BusinessNZ | businessnz.org.nz | Wellington | Industry body | Paid | Membership | `/` | Futurise Solutions | MEDIUM |
| 9 | NZTech | nztech.org.nz | — | Tech association | Paid | Membership | `/` | Futurise Solutions | HIGH |
| 10 | Startup Aotearoa | startupaotearoa.nz | — | Startup directory | Free | Submit | `/` | Futurise Solutions | MEDIUM |
| 11 | Neighbourly Business | neighbourly.co.nz | Wellington | Local directory | Free | Submit | `/nz` | Futurise Solutions | MEDIUM |
| 12 | NoCowboys | nocowboys.co.nz | — | Review platform | Freemium | Create profile | `/nz` | Futurise Solutions | MEDIUM |
| 13 | Builderscrack *(if any build/IT services fit)* | builderscrack.co.nz | — | Marketplace | Commission | Profile | `/nz` | futurisesolutions.com | LOW |
| 14 | NZ Herald Business Directory | nzherald.co.nz | — | Media directory | Paid | Submit | `/nz` | web and AI development NZ | LOW |
| 15 | Google Business Profile | business.google.com | Wellington | Local | Free | Verify at the Wellington address | `/nz` | Futurise Solutions | HIGH |

## 2.2 India (30)

Udaipur listings are legitimate — two named Udaipur clients and the delivery team are there.

> **Target page:** `/in` now exists (built after this plan was first written) and is the
> correct destination for Indian directory listings. It names both Udaipur clients, states
> the team location, and states plainly that there is **no Indian entity** — which matters
> here, because several listings below ask for one.
>
> ⚠️ **One page for India.** Do not create city-specific listings implying a Mumbai, Delhi,
> Bangalore or Pune presence. Udaipur is the only Indian location this company can claim.

| # | Site | URL | City | Type | Cost | Signup | Target | Anchor | Conf |
|---:|---|---|---|---|---|---|---|---|---|
| 16 | JustDial | justdial.com | Udaipur | Business directory | Freemium | Free listing | `/in` | Futurise Solutions | HIGH |
| 17 | IndiaMART | indiamart.com | Udaipur | B2B directory | Freemium | Seller account | `/in` | Futurise Solutions | HIGH |
| 18 | Sulekha | sulekha.com | Udaipur | Business directory | Freemium | Submit | `/service/web-development` | web development company | HIGH |
| 19 | TradeIndia | tradeindia.com | Udaipur | B2B directory | Freemium | Submit | `/in` | futurisesolutions.com | HIGH |
| 20 | Google Business Profile (India) | business.google.com | Udaipur | Local | Free | ⚠️ Needs a verifiable Udaipur address — use only if the team has a registered office there | `/` | Futurise Solutions | MEDIUM |
| 21 | Clutch | clutch.co | Global/India | Review platform | Freemium | Company profile | `/portfolio` | Futurise Solutions | HIGH |
| 22 | GoodFirms | goodfirms.co | Global/India | Review platform | Freemium | Company profile | `/portfolio` | Futurise Solutions | HIGH |
| 23 | DesignRush | designrush.com | Global | Agency listing | Freemium | Submit | `/service/ui-ux-design` | UI UX design agency | HIGH |
| 24 | TopDevelopers.co | topdevelopers.co | India | Agency listing | Freemium | Submit | `/service/app-development` | Futurise Solutions | MEDIUM |
| 25 | SoftwareSuggest | softwaresuggest.com | India | Software directory | Freemium | Vendor profile | `/` | futurisesolutions.com | MEDIUM |
| 26 | AppFutura | appfutura.com | Global | Agency listing | Freemium | Submit | `/service/app-development` | app development company | MEDIUM |
| 27 | ITFirms | itfirms.co | India | Agency listing | Free | Submit | `/` | Futurise Solutions | MEDIUM |
| 28 | Techreviewer | techreviewer.co | Global | Agency listing | Freemium | Submit | `/service/ai-ml-solutions` | AI development company | MEDIUM |
| 29 | SelectedFirms | selectedfirms.co | Global | Agency listing | Free | Submit | `/` | futurisesolutions.com | MEDIUM |
| 30 | MouthShut | mouthshut.com | India | Review platform | Free | Business profile | `/` | Futurise Solutions | MEDIUM |
| 31 | Yalwa India | yalwa.in | Udaipur | Business directory | Free | Submit | `/in` | Futurise Solutions | MEDIUM |
| 32 | Cybo | cybo.com | Udaipur | Business directory | Free | Submit | `/` | futurisesolutions.com | MEDIUM |
| 33 | Tuugo India | tuugo.in | Udaipur | Business directory | Free | Submit | `/` | Futurise Solutions | MEDIUM |
| 34 | Hotfrog India | hotfrog.in | Udaipur | Business directory | Free | Submit | `/in` | software development company Udaipur | MEDIUM |
| 35 | ExportersIndia | exportersindia.com | Udaipur | B2B directory | Freemium | Submit | `/` | Futurise Solutions | MEDIUM |
| 36 | Fundoodata | fundoodata.com | India | B2B directory | Freemium | Submit | `/` | Futurise Solutions | LOW |
| 37 | StartupIndia | startupindia.gov.in | India | Government / startup | Free | ⚠️ Requires Indian entity registration — verify eligibility | `/` | Futurise Solutions | MEDIUM |
| 38 | YourStory Directory | yourstory.com | India | Startup directory | Free | Submit | `/` | futurisesolutions.com | LOW |
| 39 | Rajasthan Udyog / MSME portal | msme.gov.in | Udaipur | Government | Free | ⚠️ Requires Indian entity | `/` | Futurise Solutions | LOW |
| 40 | Udaipur Chamber of Commerce | ucciudaipur.com | Udaipur | Chamber | Paid | Membership — legitimate, two local clients | `/in` | Futurise Solutions | MEDIUM |
| 41 | Crunchbase | crunchbase.com | Global | Startup directory | Freemium | Company profile | `/` | Futurise Solutions | HIGH |
| 42 | LinkedIn Company Page | linkedin.com | Global | Social profile | Free | Already exists — complete every field | `/` | Futurise Solutions | HIGH |
| 43 | Glassdoor | glassdoor.com | Global | Employer profile | Free | Claim | `/about` | Futurise Solutions | MEDIUM |
| 44 | AmbitionBox | ambitionbox.com | India | Employer profile | Free | Claim | `/about` | Futurise Solutions | MEDIUM |
| 45 | Zaubacorp / Tofler | zaubacorp.com | India | Company data | Free | ⚠️ Indian entities only — skip if none | `/` | Futurise Solutions | LOW |

## 2.3 USA (15)

No US office. **Every city-specific US directory is marked skip.** National and global
listings only.

| # | Site | URL | Scope | Type | Cost | Signup | Target | Anchor | Conf |
|---:|---|---|---|---|---|---|---|---|---|
| 46 | Clutch (US market page) | clutch.co | National | Review platform | Freemium | Same profile as #21 | `/us` | software development company USA | HIGH |
| 47 | The Manifest | themanifest.com | National | Agency listing | Freemium | Submit | `/us` | Futurise Solutions | HIGH |
| 48 | UpCity | upcity.com | National | Agency listing | Freemium | Submit | `/us` | futurisesolutions.com | HIGH |
| 49 | G2 | g2.com | National | Review platform | Freemium | Vendor profile | `/` | Futurise Solutions | HIGH |
| 50 | Capterra | capterra.com | National | Software directory | Freemium | Vendor profile | `/` | Futurise Solutions | MEDIUM |
| 51 | Product Hunt | producthunt.com | Global | Community | Free | Maker profile | `/portfolio` | Futurise Solutions | HIGH |
| 52 | AngelList / Wellfound | wellfound.com | National | Startup directory | Free | Company profile | `/` | Futurise Solutions | HIGH |
| 53 | F6S | f6s.com | Global | Startup directory | Free | Submit | `/` | futurisesolutions.com | HIGH |
| 54 | Expertise.com | expertise.com | National | Agency listing | Free | ⚠️ Mostly city-gated — use national categories only | `/us` | Futurise Solutions | LOW |
| 55 | Goodfirms (US) | goodfirms.co | National | Review platform | Freemium | Same profile as #22 | `/us` | Futurise Solutions | HIGH |
| 56 | Sortlist | sortlist.com | Global | Agency marketplace | Freemium | Submit | `/service/digital-marketing` | digital marketing agency | MEDIUM |
| 57 | DesignRush (US) | designrush.com | National | Agency listing | Freemium | Same as #23 | `/us` | Futurise Solutions | HIGH |
| 58 | Yelp (US) | yelp.com | Local | Business directory | Free | **needs local address — skip** | — | — | — |
| 59 | BBB | bbb.org | Local | Accreditation | Paid | **needs local address — skip** | — | — | — |
| 60 | Chambers in NYC / Chicago | various | Local | Chamber | Paid | **needs local address — skip** | — | — | — |

## 2.4 UAE (12)

Infinity Bay Trading and Platinum Peak are real UAE engagements, so UAE listings are honest —
but the company holds **no UAE entity or licence**, which `/ae` states plainly. Anything
requiring a trade licence is marked skip.

| # | Site | URL | City | Type | Cost | Signup | Target | Anchor | Conf |
|---:|---|---|---|---|---|---|---|---|---|
| 61 | Clutch (UAE) | clutch.co | Dubai | Review platform | Freemium | Same profile | `/ae` | software development company UAE | HIGH |
| 62 | GoodFirms (UAE) | goodfirms.co | Dubai | Review platform | Freemium | Same profile | `/ae` | Futurise Solutions | HIGH |
| 63 | DesignRush (UAE) | designrush.com | Dubai | Agency listing | Freemium | Same profile | `/ae` | futurisesolutions.com | HIGH |
| 64 | Yellow Pages UAE | yellowpages.ae | Dubai | Business directory | Freemium | ⚠️ May require a UAE licence — verify | `/ae` | Futurise Solutions | MEDIUM |
| 65 | Connect.ae | connect.ae | Dubai | Business directory | Free | Submit | `/ae` | Futurise Solutions | MEDIUM |
| 66 | UAE-Business-Directory | uaebusinessdirectory.com | Dubai | Business directory | Free | Submit | `/ae` | futurisesolutions.com | LOW |
| 67 | Dubai Chamber | dubaichamber.com | Dubai | Chamber | Paid | **needs UAE trade licence — skip** | — | — | — |
| 68 | Dubai SME / DED | ded.ae | Dubai | Government | — | **needs UAE trade licence — skip** | — | — | — |
| 69 | Sortlist (MENA) | sortlist.com | Dubai | Agency marketplace | Freemium | Same as #56 | `/ae` | web development Dubai | MEDIUM |
| 70 | TechBehemoths | techbehemoths.com | Global/UAE | Agency listing | Free | Submit | `/ae` | Futurise Solutions | MEDIUM |
| 71 | Gulf Business directory | gulfbusiness.com | Dubai | Media directory | Paid | Submit | `/ae` | Futurise Solutions | LOW |
| 72 | Astro showcase / built-with | astro.build/showcase | Global | Tech community | Free | **Submit Infinity Bay** — genuinely strong fit | `/ae` | Infinity Bay Trading rebuild | MEDIUM |

## 2.5 Europe (10)

No European entity, office or staff — `/europe` says so explicitly. Global and
remote-friendly listings only.

| # | Site | URL | Scope | Type | Cost | Signup | Target | Anchor | Conf |
|---:|---|---|---|---|---|---|---|---|---|
| 73 | Sortlist (EU) | sortlist.com | EU | Agency marketplace | Freemium | Same profile | `/europe` | Futurise Solutions | HIGH |
| 74 | TechBehemoths (EU) | techbehemoths.com | EU | Agency listing | Free | Same as #70 | `/europe` | futurisesolutions.com | MEDIUM |
| 75 | Clutch (UK) | clutch.co | UK | Review platform | Freemium | Same profile | `/europe` | software development for European businesses | HIGH |
| 76 | EU-Startups directory | eu-startups.com | EU | Startup directory | Freemium | Submit | `/` | Futurise Solutions | MEDIUM |
| 77 | Startup.info | startup.info | EU | Startup directory | Freemium | Submit | `/` | Futurise Solutions | MEDIUM |
| 78 | Behance | behance.net | Global | Portfolio community | Free | Post UI/UX work | `/service/ui-ux-design` | Futurise Solutions | HIGH |
| 79 | Dribbble | dribbble.com | Global | Portfolio community | Freemium | Team profile | `/service/ui-ux-design` | product design agency | HIGH |
| 80 | Awwwards | awwwards.com | Global | Design awards | Paid per entry | Submit Infinity Bay | `/portfolio` | Futurise Solutions | MEDIUM |
| 81 | CSS Design Awards | cssdesignawards.com | Global | Design awards | Paid per entry | Submit | `/portfolio` | futurisesolutions.com | MEDIUM |
| 82 | UK chambers / local EU city directories | various | Local | Chamber | Paid | **needs local address — skip** | — | — | — |

## 2.6 Australia & Canada (8)

| # | Site | URL | Scope | Type | Cost | Signup | Target | Anchor | Conf |
|---:|---|---|---|---|---|---|---|---|---|
| 83 | Clutch (AU) | clutch.co | AU | Review platform | Freemium | Same profile | `/au` | software development company Australia | HIGH |
| 84 | Clutch (CA) | clutch.co | CA | Review platform | Freemium | Same profile | `/ca` | software development company Canada | HIGH |
| 85 | GoodFirms (AU) | goodfirms.co | AU | Review platform | Freemium | Same profile | `/au` | Futurise Solutions | HIGH |
| 86 | TrueLocal | truelocal.com.au | AU | Business directory | Free | ⚠️ Usually needs an AU address — verify | `/au` | futurisesolutions.com | LOW |
| 87 | StartupAUS / Techboard | techboard.com.au | AU | Startup directory | Free | Submit | `/au` | Futurise Solutions | LOW |
| 88 | The Manifest (CA) | themanifest.com | CA | Agency listing | Freemium | Same as #47 | `/ca` | Futurise Solutions | HIGH |
| 89 | Canadian Business Directory | canadianbusinessdirectory.ca | CA | Business directory | Free | ⚠️ May need a CA address — verify | `/ca` | futurisesolutions.com | LOW |
| 90 | AU/CA city chambers | various | Local | Chamber | Paid | **needs local address — skip** | — | — | — |

## 2.7 Global / tech communities (10)

These are the highest-value entries in the table — real communities where contribution earns
the link rather than a form submission.

| # | Site | URL | Type | Cost | Signup | Target | Anchor | Conf |
|---:|---|---|---|---|---|---|---|---|
| 91 | GitHub organisation | github.com | Tech community | Free | Org profile + pinned OSS | `/` | futurisesolutions.com | HIGH |
| 92 | Stack Overflow (company) | stackoverflow.com | Forum | Free | Team profile, answer in-domain | `/service/ai-ml-solutions` | Futurise Solutions | HIGH |
| 93 | dev.to organisation | dev.to | Community / blog | Free | Org account, cross-post | `/blog` | Futurise Solutions | HIGH |
| 94 | Hashnode | hashnode.com | Community / blog | Free | Team blog with canonical back | `/blog` | futurisesolutions.com | HIGH |
| 95 | Medium publication | medium.com | Community / blog | Free | Publication, canonical back | `/blog` | Futurise Solutions | HIGH |
| 96 | Indie Hackers | indiehackers.com | Community | Free | Profile + contribute | `/` | Futurise Solutions | HIGH |
| 97 | Reddit (r/webdev, r/SaaS) | reddit.com | Forum | Free | ⚠️ Contribute genuinely; self-promo is removed | `/blog` | descriptive, in context | MEDIUM |
| 98 | Hacker News | news.ycombinator.com | Forum | Free | Show HN for a real launch only | `/portfolio` | bare URL | MEDIUM |
| 99 | Trustpilot | trustpilot.com | Review platform | Freemium | Business profile | `/` | Futurise Solutions | HIGH |
| 100 | Slashdot / SourceForge listings | sourceforge.net | Software directory | Free | Vendor profile | `/` | futurisesolutions.com | MEDIUM |

---

## 2.8 ⚠️ Which targets require a phone number

The site now publishes **no phone number anywhere** — `/about` says so explicitly, the
Organization schema omits `telephone`, and it has been removed from `llms.txt`. That is a
deliberate, defensible position: `/about` argues that listing a channel nobody answers is
worse than listing none.

Directories do not all agree. Below is what each of the 100 actually demands, so the
decision can be made on facts rather than guessed at halfway through a submission run.

**🚫 SKIP — these 26 require a phone number, and there is none to give (owner decision)**

Do not start these. The form cannot be completed truthfully without a number, and several
(#16, #17, #19) verify by OTP, so one cannot be borrowed or faked. Revisit only if the
no-phone decision is ever reversed — and then read the note at the end of this section first.

| # | Target | Status | Reason |
|---:|---|---|---|
| 3 | Yellow NZ | 🚫 SKIP | Core directory field — phone mandatory |
| 4 | Finda | 🚫 SKIP | Core directory field — phone mandatory |
| 5 | Localist | 🚫 SKIP | Core directory field — phone mandatory |
| 6 | NZ Business Directory | 🚫 SKIP | Core directory field — phone mandatory |
| 7 | Wellington Chamber of Commerce | 🚫 SKIP | Membership application — phone mandatory |
| 8 | BusinessNZ | 🚫 SKIP | Membership application — phone mandatory |
| 9 | NZTech | 🚫 SKIP | Membership application — phone mandatory |
| 11 | Neighbourly Business | 🚫 SKIP | Core directory field — phone mandatory |
| 12 | NoCowboys | 🚫 SKIP | Review platform, contact required — phone mandatory |
| 15 | **Google Business Profile (NZ)** | ✅ **DO IT** | Accepts **address instead of phone** — the Wellington address satisfies it. Highest-value listing available. |
| 16 | JustDial | 🚫 SKIP | Phone is the primary key, OTP-verified — cannot be worked around |
| 17 | IndiaMART | 🚫 SKIP | Seller account, OTP-verified |
| 18 | Sulekha | 🚫 SKIP | Lead routing is by phone — a listing without one receives nothing |
| 19 | TradeIndia | 🚫 SKIP | Seller account, OTP-verified |
| 20 | Google Business Profile (India) | 🚫 SKIP | Needs a verifiable Udaipur **address** as well as a phone |
| 30 | MouthShut | 🚫 SKIP | Business profile — phone mandatory |
| 31 | Yalwa India | 🚫 SKIP | Core directory field — phone mandatory |
| 33 | Tuugo India | 🚫 SKIP | Core directory field — phone mandatory |
| 34 | Hotfrog India | 🚫 SKIP | Core directory field — phone mandatory |
| 35 | ExportersIndia | 🚫 SKIP | Seller account — phone mandatory |
| 36 | Fundoodata | 🚫 SKIP | B2B data listing — phone mandatory |
| 40 | Udaipur Chamber of Commerce | 🚫 SKIP | Membership application — phone mandatory |
| 59 | BBB | 🚫 SKIP | Already skipped in §2.3 — needs a US address too |
| 64 | Yellow Pages UAE | 🚫 SKIP | Phone required, and may need a UAE trade licence |
| 65 | Connect.ae | 🚫 SKIP | Core directory field — phone mandatory |
| 71 | Gulf Business | 🚫 SKIP | Paid media listing — phone mandatory |

**OPTIONAL — form has the field, submission completes without it (19)**

#21 Clutch · #22 GoodFirms · #23 DesignRush · #24 TopDevelopers · #25 SoftwareSuggest ·
#26 AppFutura · #27 ITFirms · #28 Techreviewer · #29 SelectedFirms · #32 Cybo ·
#43 Glassdoor · #47 The Manifest · #48 UpCity · #50 Capterra · #56 Sortlist ·
#57 DesignRush (US) · #66 UAE-Business-Directory · #70 TechBehemoths · #99 Trustpilot

**NOT REQUIRED — no phone field at all (45, plus the 10 already skipped)**

Everything in §2.7 (#91–100, the tech communities), #41 Crunchbase, #42 LinkedIn,
#51 Product Hunt, #52 Wellfound, #53 F6S, #76 EU-Startups, #77 Startup.info,
#78 Behance, #79 Dribbble, #80 Awwwards, #81 CSS Design Awards, and the remaining
agency-listing profiles that accept email-only contact.

### What this means practically

- **The 34 items in the "first sitting" list in Part 5 need no phone.** Every one of items
  1–13 is in the NOT REQUIRED or OPTIONAL group, so the highest-value work is unblocked
  today regardless of what you decide.
- **Google Business Profile (#15) is the important exception.** It is the single
  highest-value local listing available, and it accepts **a verified address instead of a
  phone** — the Wellington address qualifies. ⚠️ But see the NZ caution in §2.1: a GBP
  listing must not imply NZ client work, only NZ registration.
- **The Indian directory cluster (#16–19, #31, #33–36) is effectively phone-gated.** Those
  nine are the bulk of the REQUIRED list, and JustDial/IndiaMART/TradeIndia all verify by
  OTP, so a number cannot be faked or borrowed.

**If you decide to publish a number,** it must be added to `/contact`, the Organization
schema (`telephone`), `llms.txt` and the two chatbot files *at the same time*, and the
`/about` copy asserting that none is published must be rewritten. Publishing it only in
directories recreates exactly the inconsistency this removal just fixed — in the harder
direction, because directory listings are not yours to edit later.

---

# PART 3 — 15 guest post targets

Every angle below comes from work actually shipped. **No metric or quote is invented** —
where a number would normally sit, the pitch promises architecture and tradeoffs instead,
which is what these publications accept anyway.

| # | Publication | URL | Accepts | Conf |
|---:|---|---|---|---|
| 1 | Smashing Magazine | smashingmagazine.com | Deep technical, 2000+ words, editor-reviewed | HIGH |
| 2 | CSS-Tricks | css-tricks.com | Front-end technique articles | MEDIUM |
| 3 | LogRocket Blog | blog.logrocket.com | Paid technical writing, React/JS focus | HIGH |
| 4 | Smashing / Astro blog | astro.build/blog | Case studies using Astro | MEDIUM |
| 5 | dev.to | dev.to | Anything technical, self-publish | HIGH |
| 6 | Hashnode | hashnode.com | Self-publish, canonical back to your blog | HIGH |
| 7 | freeCodeCamp News | freecodecamp.org/news | Tutorial-style, editor-reviewed | HIGH |
| 8 | SitePoint | sitepoint.com | Paid technical articles | MEDIUM |
| 9 | Towards Data Science | towardsdatascience.com | ML/AI engineering write-ups | HIGH |
| 10 | The New Stack | thenewstack.io | Architecture & infrastructure | MEDIUM |
| 11 | InfoQ | infoq.com | Practitioner architecture articles | MEDIUM |
| 12 | Hacker Noon | hackernoon.com | Tech, editor-reviewed | HIGH |
| 13 | UX Collective (Medium) | uxdesign.cc | UX process & research | HIGH |
| 14 | Search Engine Journal | searchenginejournal.com | SEO practitioner content | MEDIUM |
| 15 | NZ Herald / Idealog (NZ tech) | idealog.co.nz | NZ business & tech commentary | LOW |

## 3.1 Angle A — Infinity Bay: WordPress → Astro

**Best fit:** #1, #4, #5, #6, #8.

**100-word pitch (paste-ready):**

> Hi [Editor],
>
> I'd like to pitch a technical write-up on rebuilding a B2B supply company's WordPress site
> on Astro. Infinity Bay Trading is a Dubai FMCG, HORECA and industrial supplier whose
> previous site loaded slowly and ranked poorly. We rebuilt it on Astro, restructured the
> content around product-led pages, and set up Search Console indexing from scratch.
>
> The article would cover why Astro suited a content-heavy B2B catalogue over Next.js, how we
> mapped WordPress content without losing URLs, and the tradeoffs of islands architecture for
> a marketing site. Code examples throughout, no vendor pitch.
>
> — [Name], Futurise Solutions

**150-word article description:**

> **Rebuilding a B2B Supply Catalogue on Astro: What We Kept From WordPress and What We
> Didn't**
>
> A working write-up of migrating a Dubai-based FMCG, HORECA and industrial supply company
> from WordPress to Astro. The article opens with the decision itself: why a content-heavy
> B2B catalogue with almost no interactive surface is a better fit for Astro's zero-JS
> default than for a React framework, and where that judgement would flip.
>
> It then covers the migration mechanics — preserving the existing URL structure so ranking
> pages were not orphaned, modelling product categories as content collections, and handling
> the image pipeline for a catalogue with many near-identical product shots.
>
> The third section covers SEO structure: how the content was reorganised around
> product-led pages rather than the original brochure hierarchy, and what setting up Search
> Console indexing from zero actually involves. Closes with what we would do differently.

## 3.2 Angle B — HOMIES: property dashboard

**Best fit:** #3, #10, #11, #12.

**100-word pitch:**

> Hi [Editor],
>
> I'd like to pitch an article on rebuilding a PropTech analytics dashboard that was
> inherited as an unscalable prototype. HOMIES is a property management SaaS; the original
> build worked at demo scale and fell over as portfolios grew.
>
> The piece would cover diagnosing and eliminating N+1 query patterns, where we added caching
> and where we deliberately did not, and the indexing work that made portfolio-wide
> aggregation viable. It is about inheriting someone else's prototype and deciding what to
> rewrite versus repair — a situation most teams hit and few write about honestly.
>
> — [Name], Futurise Solutions

**150-word article description:**

> **Inheriting a Prototype: Rebuilding a PropTech Dashboard Without a Rewrite**
>
> Most architecture articles describe greenfield decisions. This one describes the more
> common situation: inheriting a working prototype that cannot scale, and deciding
> line-by-line what to repair and what to replace.
>
> The subject is a property management and analytics dashboard whose aggregate views degraded
> sharply as portfolios grew. The article walks through the diagnosis — identifying N+1 query
> patterns behind per-unit analytics — and the fixes, covering query restructuring, the
> indexes that made portfolio-wide aggregation viable, and the caching layer added around the
> genuinely expensive computations.
>
> It gives equal space to what was *not* changed and why, since the most expensive mistake
> available when inheriting a codebase is rewriting the parts that were already fine. Closes
> with a checklist for auditing an inherited dashboard before committing to either path.

## 3.3 Angle C — GDT: perpetuals terminal

**Best fit:** #3, #10, #11, #12. ⚠️ Publish **without the client name** — the portfolio
publishes this one under its product only.

**100-word pitch:**

> Hi [Editor],
>
> I'd like to pitch an article on the front-end engineering behind a crypto perpetuals
> trading terminal — real-time candlestick charts, a live order book and an order form, all
> updating continuously without the interface becoming unusable.
>
> The piece would cover managing high-frequency WebSocket updates without re-rendering the
> world, why an order book is a genuinely hard rendering problem, and the state architecture
> that keeps chart, book and form consistent. Trading UIs are a demanding real-time case that
> generalises to any dense live dashboard.
>
> — [Name], Futurise Solutions

**150-word article description:**

> **Rendering a Live Order Book Without Melting the Browser**
>
> A trading terminal is one of the most demanding real-time interfaces on the web: a
> candlestick chart, a continuously updating order book and an order form, all consistent
> with one another while data arrives many times a second.
>
> The article covers the rendering problem first — why naive React re-renders fail on an
> order book, and the batching and virtualisation strategies that make continuous updates
> viable. It then addresses state architecture: keeping chart, book and form reading from one
> coherent source when each updates on a different cadence.
>
> The final section covers the human constraints — where visual stability matters more than
> latency, and why some updates should be deliberately throttled even when faster is
> technically possible. The techniques generalise to any dense live dashboard: monitoring,
> logistics, telemetry.

## 3.4 Angle D — Marty-QR: review platform

**Best fit:** #5, #6, #9, #12, #13.

**100-word pitch:**

> Hi [Editor],
>
> I'd like to pitch an article on designing the collection side of a review platform —
> specifically, the QR-to-review flow for local businesses, where the hard problem is not
> storing reviews but getting a customer to leave one at all.
>
> The piece would cover the friction audit behind the flow, why each additional step costs
> disproportionately when the user has no intrinsic motivation, and how the platform routes
> feedback. It sits between UX and engineering and suits a product-design audience.
>
> — [Name], Futurise Solutions

**150-word article description:**

> **The Hardest Part of a Review Platform Is the First Tap**
>
> Building a review platform is mostly an exercise in removing friction from an interaction
> nobody is motivated to complete. This article covers the collection flow for a QR-based
> review system built for local businesses.
>
> It starts with the constraint: a customer scanning a code at a counter has seconds of
> patience and no intrinsic reason to continue. Every field, every redirect and every
> app-store bounce costs a disproportionate share of completions.
>
> The article walks the flow decision by decision — what was removed, what had to stay, and
> where platform rules constrain the design regardless of what would convert better. It then
> covers routing: what happens to feedback that is not destined for a public review, and why
> that path deserves as much design attention as the public one. Closes with a friction
> checklist for any low-motivation capture flow.

---

# PART 4 — Client link outreach

A "built by" credit or a case-study link from a real client is the strongest link available
here. Eight clients are named on `/portfolio`; the ninth stays unnamed.

**Best candidates, in order:** Infinity Bay Trading (already gave a testimonial — warmest
relationship), Dhanlaxmi Property and Palm Vision Technology (local, recent, both had whole
sites built), then HOMIES, Marty-QR, Estate, Platinum Peak, David Tishbi.

## 4.1 Initial email

**Subject:** Quick favour — a credit link from [COMPANY]'s site

> Hi [NAME],
>
> Hope things are going well with [PROJECT].
>
> I have a small favour to ask. We're building out the public record of our work, and a link
> from [COMPANY]'s site back to ours would genuinely help — it's the kind of credit that
> carries far more weight than any directory listing, because it comes from someone we
> actually delivered for.
>
> Two easy options, whichever suits:
>
> 1. **A "built by" credit in your footer** — something like *Website by
>    [Futurise Solutions](https://www.futurisesolutions.com)*. One line, sits quietly.
> 2. **A short mention on your about or partners page** — a sentence about the project and a
>    link.
>
> Happy to write the blurb for you so it's genuinely zero work — just tell me which option
> and I'll send wording you can paste or edit. And if either is awkward for any reason, no
> problem at all; it won't change anything on our side.
>
> Thanks either way,
> [YOUR NAME]
> Futurise Solutions · business@futurisesolutions.com

## 4.2 Follow-up (7–10 days later)

**Subject:** Re: Quick favour — a credit link from [COMPANY]'s site

> Hi [NAME],
>
> Just floating this back up in case it got buried.
>
> If it's easier, I can send a one-line footer credit you can paste straight in — takes about
> thirty seconds and needs nothing else from you.
>
> And a genuine no is completely fine, just let me know and I'll stop asking.
>
> Cheers,
> [YOUR NAME]

## 4.3 Ready-to-send blurbs

Send whichever matches their choice, so the client truly has nothing to write.

**Footer credit (one line):**

```html
Website by <a href="https://www.futurisesolutions.com" rel="noopener">Futurise Solutions</a>
```

**About / partners page (≈40 words) — adapt the bracketed part:**

> Our website was designed and built by
> [Futurise Solutions](https://www.futurisesolutions.com), a digital product studio working
> across [the UAE / India / the US]. They handled [the rebuild / the design and build] end to
> end, from [architecture and content structure] through to launch.

⚠️ **Do not** ask a client to publish a performance figure. No metric anywhere in this
programme is invented, and asking a client to assert one they have not measured is exactly
the trust problem `/about` is written to avoid.

---

# PART 5 — Execution order

Ranked by effort-to-value. **⚡ = under five minutes.**

## First sitting (about 90 minutes, in this order)

1. ⚡ **LinkedIn company page** — complete every field, add the website URL (#42)
2. ⚡ **Crunchbase** — claim or create, add website (#41)
3. ⚡ **F6S** — profile + URL (#53)
4. ⚡ **Wellfound** — company profile (#52)
5. ⚡ **dev.to org account** (#93)
6. ⚡ **Hashnode team blog** — set canonical back to `/blog` (#94)
7. ⚡ **Medium publication** — canonical back (#95)
8. ⚡ **GitHub org profile** — add website URL (#91)
9. ⚡ **Indie Hackers profile** (#96)
10. ⚡ **Trustpilot business profile** (#99)
11. **Clutch** — full profile; this single entry serves #21, #46, #55, #61, #75, #83, #84 (~25 min)
12. **GoodFirms** — full profile; serves #22, #55, #62, #85 (~20 min)
13. **DesignRush** — serves #23, #57, #63 (~15 min)

**Why this order:** items 1–10 are all free, all instant, all HIGH confidence, and several
are prerequisites other listings verify against. Items 11–13 are the three profiles that each
syndicate across multiple market pages — one submission, many listings.

## Second sitting (~90 minutes)

14. ⚡ **Google Business Profile** at the Wellington address (#15) — the single
    highest-value listing available, and it accepts the **address instead of a phone**.
    Set service areas and services offered, never a customer base (see the NZ rule in §2.1).
15. NZBN + Companies Register check (#1, #2)
16. The Manifest, UpCity (#47, #48)
17. Sortlist, TechBehemoths (#56, #70)
18. Capterra, G2 vendor profiles (#50, #49)
19. TopDevelopers, Techreviewer, SelectedFirms, ITFirms (#24, #28, #29, #27)

> ⚠️ **Yellow NZ, Finda, Localist (#3–5) and JustDial, IndiaMART, Sulekha, TradeIndia
> (#16–19) were in this sitting and have been REMOVED — all seven are phone-mandatory and
> now marked 🚫 SKIP.** That is why this sitting is shorter than it was.

## Third sitting (~2 hours)

20. Behance + Dribbble — needs UI/UX assets prepared (#78, #79)
21. Astro showcase submission for Infinity Bay (#72)
22. Product Hunt (#51)
23. Glassdoor + AmbitionBox employer profiles (#43, #44)
24. Cybo (#32), UAE-Business-Directory (#66), EU-Startups (#76), Startup.info (#77)
25. Awwwards / CSS Design Awards — paid per entry, so only if the budget exists (#80, #81)

> ⚠️ "Remaining Indian directories (#31–36)" and "Remaining UAE directories (#64–66, #71)"
> previously sat here. Most of those are phone-mandatory; only #32 and #66 survive, and they
> are listed individually above.

## Ongoing, highest value per hour

26. **Client outreach (Part 4)** — start with Infinity Bay. Eight emails, and a single yes
    beats fifty directory listings.
27. **Guest posts (Part 3)** — one pitch a week. Start with dev.to and Hashnode (self-publish,
    no gatekeeper) to build a body of work, then pitch Smashing and LogRocket.
28. **Stack Overflow / Reddit** — genuine participation only, over months.

## Skipped and why — 36 of the 100

**26 phone-mandatory** (§2.8): #3, #4, #5, #6, #7, #8, #9, #11, #12, #16, #17, #18, #19, #20,
#30, #31, #33, #34, #35, #36, #40, #59, #64, #65, #71 and the phone-gated part of #45.
There is no published phone number — owner decision — and three of these verify by OTP, so
one cannot be borrowed. Their forms cannot be completed truthfully.

**10 presence-gated**: #58, #59, #60, #67, #68, #82, #90 and the address-gated parts of #37,
#39, #86, #89. Each needs a local address or a local entity that does not exist. This is the
line that survives the corrected location rule: claiming delivered work in a market is fine
whether or not the client can be named, but claiming premises is not.

(#59 and #64 appear in both lists — they fail on phone *and* address.)

Submitting anyway means either an inaccurate listing or a rejection, and inaccurate NAP data
across directories is actively harmful and hard to correct once live.

**That leaves ~64 actionable targets**, including every item in the first sitting.

---

# PART 6 — What not to do

**Paid link packages.** "500 backlinks for $50" buys links from sites built to sell links,
which is precisely the footprint Google's link spam systems detect. At best the links are
ignored; at worst the site takes a manual action that costs months.

**PBNs (private blog networks).** A network of sites existing to link to clients is
link-scheme manipulation by definition. They share hosting, registration and template
footprints, which is how they get caught as a group — your site is then penalised for
someone else's network being discovered.

**Reciprocal link swaps.** "Link to me and I'll link to you," at scale, is explicitly named in
Google's link spam policy. A handful of genuine partner links is fine; a page of them signals
a scheme.

**Bulk submission tools.** Software that blasts one profile at 500 directories produces
listings on dead sites nobody visits, frequently with mangled data, and creates inconsistent
NAP records you then cannot fix because you do not control the accounts.

**Comment spam.** Dropping links in blog comments and forum signatures. Almost universally
`nofollow`, removed by moderators, and it attaches the brand to the behaviour in front of
exactly the technical audience you want to be credible with.

**Identical anchor text everywhere.** A hundred links all reading "software development
company" is a statistically obvious pattern — organic link profiles are dominated by brand
names and bare URLs. This is why Part 2 is roughly half branded, a quarter bare URL and a
quarter descriptive, and why the descriptive anchors vary.

**One more, specific to this site:** do not let any listing state a team size, a project
count, a client count or a performance metric. `/about` commits in writing to publishing none
of those, and a directory profile contradicting the site is both a trust problem and an
inconsistency a careful buyer will notice.

**And the one that is easiest to breach by accident — never imply New Zealand client work.**
`/about` states that no published engagement belongs to a New Zealand business. NZ is the
registration, not the customer base. This is not a stylistic preference: it is the claim the
site's credibility rests on, and the single place it would slip in unnoticed is an NZ
directory's "our clients" or "why choose us" free-text box, written from memory rather than
pasted from Part 1. Paste the descriptions as written. Full rule in §2.1.
