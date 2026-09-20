import type { MetadataRoute } from 'next'

/**
 * Ported from public/robots.txt, rule for rule, then extended for AI crawlers.
 *
 * The old file also carried two comment lines pointing at /llms.txt. Comments are not
 * expressible through MetadataRoute.Robots, and they were never machine-read — the
 * llms.txt route exists and is linked from the sitemap and the page copy, so nothing is
 * lost. Every DIRECTIVE from the original is preserved below, unchanged.
 *
 * ── WHY THE AI AGENTS ARE NAMED EXPLICITLY ───────────────────────────────────
 * `User-agent: *` already permits all of them, so these blocks grant no access the
 * wildcard did not. They exist because several of these crawlers are governed by
 * publisher-side opt-OUT conventions, and an explicit ALLOW is the unambiguous signal
 * that the omission of a `Disallow` was deliberate rather than an oversight. It also
 * documents the decision in the one file an operator checks first.
 *
 * `Google-Extended` is the important one: it is NOT a crawler. It is a token that
 * controls whether content already fetched by Googlebot may be used for Gemini and
 * AI Overviews grounding. Disallowing it removes the site from AI Overviews without
 * affecting Search ranking — which is why it needs a deliberate answer either way.
 *
 * ⚠️ Each of these is a REVENUE-NEUTRAL, VISIBILITY-POSITIVE choice for an agency whose
 * product is services rather than ad-supported content: being quoted by an assistant is
 * a referral, not a substitution. A publisher selling impressions would rationally
 * choose the opposite. Do not copy this block to such a site without re-deciding.
 *
 * The admin disallow is repeated in EVERY block. A `User-agent` group does not inherit
 * from the wildcard group — a named agent reads ONLY its own group — so omitting it here
 * would expose /futurise-admin/ to precisely the agents named.
 */

/** Agents granted explicit access. See the note above before adding or removing one. */
const AI_AGENTS = [
  'GPTBot', // OpenAI — ChatGPT browsing and model training
  'OAI-SearchBot', // OpenAI — ChatGPT Search index (separate token from GPTBot)
  'ChatGPT-User', // OpenAI — live fetch when a user asks ChatGPT to open a URL
  'ClaudeBot', // Anthropic — crawling for Claude
  'Claude-User', // Anthropic — live fetch on a user's request
  'PerplexityBot', // Perplexity — search index
  'Perplexity-User', // Perplexity — live fetch on a user's request
  'Google-Extended', // Google — Gemini / AI Overviews grounding permission token
  'CCBot', // Common Crawl — the corpus behind many open models
  'Bytespider', // ByteDance — Doubao / TikTok search
  'Applebot-Extended', // Apple — Apple Intelligence training permission token
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/case-studies', '/case-studies/*'],
        // Block admin paths from indexing.
        disallow: '/futurise-admin/',
      },
      ...AI_AGENTS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: '/futurise-admin/',
      })),
    ],
    sitemap: 'https://www.futurisesolutions.com/sitemap.xml',
    host: 'https://www.futurisesolutions.com',
  }
}
