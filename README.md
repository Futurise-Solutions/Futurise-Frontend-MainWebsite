# Futurise Solutions — Marketing Website

Vite + React 18 single-page app for [futurisesolutions.com](https://www.futurisesolutions.com),
deployed on Vercel.

## Stack

| Concern | Choice |
| --- | --- |
| Build | Vite 5, `@vitejs/plugin-react-swc` |
| UI | React 18, Chakra UI v2, Emotion, framer-motion |
| Routing | react-router-dom v6 |
| Blog content | External CMS API (`VITE_API_BASE_URL`) |
| SEO for crawlers | Build-time prerendering (`prerender.js`) + edge SSR (`middleware.js`) |
| Analytics | GA4 + Vercel Analytics, via `src/utils/analytics.js` |
| Tests | Vitest + Testing Library |

## Getting started

```bash
npm install
cp .env.example .env    # then fill in the values
npm run dev
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Production build, then prerender 21 routes and write `dist/sitemap.xml` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npm test` | Vitest, single run |
| `npm run test:watch` | Vitest, watch mode |

## How pages reach crawlers

This is a client-rendered SPA, so raw HTML would otherwise be an empty `<div id="root">`.
Two mechanisms fix that, and both matter:

- **`prerender.js`** runs after `vite build`. It renders the 21 static routes in headless
  Chrome and writes real HTML to `dist/<route>/index.html`, generates `404.html`, and
  writes `sitemap.xml`. Blog posts get meta-only files here — their bodies are not in the
  repo, so baking them in would need a redeploy per post.
- **`middleware.js`** is a Vercel Edge Middleware matching `/blog/:path+`. For crawler
  user-agents it fetches the post from the CMS and renders the full article, JSON-LD and
  all, at request time. Human visitors fall through to the SPA. AI crawlers matter most
  here: none of them execute JavaScript.

## Routing (`vercel.json`)

Vercel resolves in this order: **redirects → filesystem → rewrites.** `vercel.json` carries
no comments — Vercel validates it against a strict schema and rejects unknown keys,
including the `"//"` convention — so the reasoning lives here.

**There is no `/(.*)` catch-all rewrite, deliberately.** That version returned HTTP 200
with the SPA shell for *every* unknown URL, which Google treats as a soft 404: crawl
budget goes to URLs that do not exist and they inflate the not-indexed count. Without it,
unmatched paths fall through to `404.html` with a real 404 status.

**Each real route is instead listed explicitly.** Dropping the catch-all made the site
depend on `prerender.js` having produced a file for every route, and it cannot guarantee
that — Puppeteer does not always launch on the build container. `/blog` shipped to
production with no file behind it and served Vercel's raw `404: NOT_FOUND`. The explicit
rewrites are a floor: the filesystem still wins whenever a prerendered file exists, so a
healthy build behaves identically, but a route can never 404 again. Naming routes rather
than restoring the catch-all keeps the soft-404 fix intact.

**When adding a route,** add it in three places: `staticPages` (or `servicesData`) in
`prerender.js`, the `rewrites` array in `vercel.json`, and `AllRoutes.jsx`.

## Environment variables

See `.env.example`. Two kinds live there and the difference matters:

- `VITE_*` is compiled into the client bundle — **public**, never a secret.
- Everything else is read only by the serverless functions in `api/` and stays server-side.

`ADMIN_PASSWORD` must be set in the Vercel project environment before deploying, or the
admin dashboard reports "not configured" and rejects every login.

## Admin authentication

`/futurise-admin/blog` is gated by a server-validated session:

| Endpoint | Purpose |
| --- | --- |
| `POST /api/admin-login` | Constant-time password check against `ADMIN_PASSWORD`; sets the session cookie |
| `GET /api/admin-session` | Reports whether the current cookie is a valid session |
| `POST /api/admin-logout` | Expires the cookie |

The session is an HMAC-signed, 8-hour token in an `HttpOnly; Secure; SameSite=Strict`
cookie — unreadable by JavaScript, and never sent cross-site. The password is never in
the client bundle.

**Local development:** `npm run dev` serves the SPA but not the functions in `api/`, so
the admin login will 404. Use `vercel dev` when working on the dashboard.

**Known gap:** this secures the dashboard, not the data. `src/api/blogs.js` calls the CMS
directly with no credentials, so writes to `api.futurisesolutions.com` are reachable
without going through this site at all. Closing that requires the CMS to authenticate
writes itself — a change in the backend repository, not this one.

## Conventions worth knowing

- **Trust content.** Testimonials, stats, team members and market claims must trace to
  real delivered work. `src/utils/Constant/constant.test.js` enforces this.
- **The team section is publish-gated.** `src/utils/Constant/team.js` exports
  `TEAM_PUBLISHED`; while it is `false` the section renders in dev only and no `Person`
  schema is emitted. Fill in real details before flipping it.
- **Image sizing.** Chakra treats `width`/`height` as style props — pass `htmlWidth` /
  `htmlHeight` to emit the intrinsic-size attributes that prevent layout shift.
- **Conversion tracking.** Use `trackEvent` with a name from `EVENTS`
  (`src/utils/analytics.js`) rather than calling `gtag` directly.
