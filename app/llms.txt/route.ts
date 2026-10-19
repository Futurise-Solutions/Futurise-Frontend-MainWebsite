import { LLMS_TXT } from '@/content/llms.txt'

/**
 * GET /llms.txt
 *
 * Served by a route handler rather than a static public/ file so the body lives in one
 * place and cannot drift from the site it describes.
 *
 * ⚠️ `/llms` → `/llms.txt` is a 308 redirect on production. It is currently in
 * next.config.ts, but that entry ALSO answers /LLMs and /LLMS, which production 404s —
 * O12 moves all three redirects to proxy.ts with case-sensitive comparisons. Do not
 * treat the redirect as done until the full table in REDIRECT-BEHAVIOUR-BASELINE.md
 * matches, including the 404 rows.
 */
export const dynamic = 'force-static'

export function GET() {
  return new Response(LLMS_TXT, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
