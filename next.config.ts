import type { NextConfig } from 'next'
import { RETIRED_BLOG_REDIRECTS, RENAMED_BLOG_REDIRECTS } from './content/blogRedirects'

/**
 * ⚠️ NO CUSTOM WEBPACK CONFIG. Turbopack is the default bundler in Next 16 for both
 * `next dev` and `next build`; adding a `webpack` key makes the build FAIL unless you
 * also pass `--webpack`. The old Vite app's manualChunks and the preloadHomeChunks
 * plugin are both deliberately dropped — Next's route-based splitting replaces them.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Production checks freshly generated build types, not a running dev server's cache.
  typescript: {
    tsconfigPath: process.env.NODE_ENV === 'production' ? 'tsconfig.build.json' : 'tsconfig.json',
  },
  // Opt-in for constrained local verification; normal production builds keep defaults.
  ...(process.env.FUTURISE_LOW_MEMORY_BUILD === '1' ? { experimental: { cpus: 1 } } : {}),

  /**
   * PHASE 8 — React Compiler.
   * Auto-memoises components and hooks, which removes most of the re-render work this
   * app would otherwise need manual useMemo/useCallback for. Requires
   * babel-plugin-react-compiler (installed as a devDependency).
   */
  reactCompiler: true,

  /**
   * `turbopack.root` was pinned here while the Vite app lived one directory up with its
   * own package-lock.json, which made Turbopack infer the PARENT as the workspace root.
   * The app now sits AT the repo root and the old lockfile is gone, so the inference is
   * correct on its own and the pin has been removed.
   */

  /**
   * `next dev` writes its own AGENTS.md and CLAUDE.md into this directory on every boot.
   * Those files SHADOW the project's real AGENTS.md at the repo root — the one carrying
   * the ten rules and the source-of-truth precedence. Disabled so the real instructions
   * are the ones an agent reads.
   */
  agentRules: false,

  images: {
    formats: ['image/avif', 'image/webp'],

    /**
     * Blog media comes from the CMS host, resolved by mediaUrl() in the old src/config.js.
     * There is NO Cloudinary usage anywhere in this project despite the preconnect hint
     * in the old index.html — see MIGRATION-INVENTORY.md §G.1. Do not add res.cloudinary.com.
     */
    remotePatterns: [
      { protocol: 'https', hostname: 'futurise-backend-main-website.vercel.app' },
      /* Blog `featuredImage` values are Cloudinary URLs — confirmed against the live
         /api/blogs endpoint. The preconnect hint in the old index.html referred to an
         unused account (§G.1); this entry is for the URLs the API actually returns. */
      // Only our own Cloudinary account: any account on the host would let anyone route
      // their files through this site's public /_next/image optimizer.
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/dbiuh48bc/**' },
    ],

    // Next 16 changed three defaults. Restoring what the site actually needs:
    qualities: [75, 90],     // default is now [75] only
    minimumCacheTTL: 14400,  // default changed 60s → 4h; 14400s = 4h, stated explicitly
  },

  /**
   * Ported verbatim from vercel.json. These are the only four redirects the old site has,
   * and all four must survive the cutover — the apex→www one especially, since dropping
   * it would split the domain's authority across two hostnames.
   *
   * The ten `rewrites` in vercel.json are NOT ported: nine exist only to serve index.html
   * for client-side routes (App Router makes them unnecessary) and the tenth
   * (/blog/:slug → /api/blog-fallback) is replaced by real SSG in Phase 6.
   *
   * `trailingSlash` is left at the Next default (false), matching vercel.json's
   * "trailingSlash": false. Do not change it — it would alter every URL on the site.
   */
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'futurisesolutions.com' }],
        destination: 'https://www.futurisesolutions.com/:path*',
        permanent: true,
      },
      /**
       * 🔴 `/About` → `/about` IS DELIBERATELY OMITTED. Re-adding it as a plain
       * redirect creates an INFINITE LOOP and makes /about completely unreachable.
       *
       * Next matches redirect `source` CASE-INSENSITIVELY, so a rule with
       * `source: '/About'` also matches `/about` and redirects it to `/about`, which
       * matches again, forever.
       *
       * Measured with the rule present:
       *   GET /about → 308 → http://localhost:3000/about → 308 → …
       *   browser: net::ERR_TOO_MANY_REDIRECTS, document.body emptied (bodyLen 0)
       *
       * Vercel's `redirects` in vercel.json ARE case-sensitive, so the old site was
       * unaffected. This is a Next-specific behaviour difference introduced by the port.
       *
       * ⚠️ MEASURED CONSEQUENCE OF OMITTING IT — this is a REAL, OPEN GAP:
       *     /about  → 200 ✅ (the loop is fixed)
       *     /About  → 404 ❌ (production 308s it to /about)
       *
       * So omitting the rule does NOT preserve behaviour. Redirect `source` matching is
       * case-insensitive, but ROUTE resolution is case-SENSITIVE, so `/About` matches no
       * route at all. (I initially assumed route matching was case-insensitive too and
       * wrote that here — it is not. Verified by curl.)
       *
       * ⚠️ MUST BE FIXED IN PHASE 7, in `proxy.ts` (Next 16's renamed middleware), with
       * an explicit case-sensitive comparison:
       *     if (request.nextUrl.pathname === '/About') → 308 to '/about'
       * It cannot be expressed in this array without re-creating the loop.
       *
       * Tracked as owed item O12 in MIGRATION-STATUS.md. Low traffic impact (one legacy
       * capitalised URL) but it is a live 308 on production and must not silently become
       * a 404 at cutover.
       *
       * (Production serves `"permanent": true` as 308, NOT 301. An earlier version of this
       * comment said 301 in both places. Both codes are permanent and pass link equity, so
       * the conclusion is unchanged, but the status `proxy.ts` must emit is 308.)
       *
       * Found by the Phase 3 ROUTER SMOKE TEST, the only thing that exercises navigation.
       * No pixel diff, font check or resolution check would have seen it: the home page
       * renders perfectly and every other gate passes.
       */
      /**
       * ✅ `/home` AND `/llms` HAVE MOVED TO proxy.ts — DO NOT PUT THEM BACK HERE.
       *
       * They were written in lowercase and looked correct, but because Next matches
       * `source` case-INSENSITIVELY they also answered `/Home`, `/HOME`, `/hOmE`,
       * `/LLMs`, `/LLMS` — all 308, where production 404s every one. That INVENTED a set
       * of permanent redirects from URLs that never existed, and because the match is
       * case-insensitive the set is unbounded.
       *
       * A grep for uppercase in vercel.json finds nothing, so this defect was invisible
       * in the config: it was in how Next INTERPRETS these entries, not in what they say.
       *
       * proxy.ts now expresses all three redirects (`/About`, `/home`, `/llms`) with
       * explicit case-SENSITIVE lookups, so the case variants fall through to 404 exactly
       * as production does.
       *
       * Acceptance: the FULL table in REDIRECT-BEHAVIOUR-BASELINE.md, including the 404
       * rows. Asserting only that `/About` redirects again is a FAILURE.
       */
      /**
       * Retired blog posts (Oct 2026 consolidation) → the page that absorbed the topic.
       * The slugs are long and lowercase, so the case-insensitive source matching above
       * cannot collide with a real route or a kept post.
       */
      ...Object.entries({ ...RETIRED_BLOG_REDIRECTS, ...RENAMED_BLOG_REDIRECTS }).map(([slug, destination]) => ({
        source: `/blog/${slug}`,
        destination,
        permanent: true,
      })),
    ]
  },
}

export default nextConfig
