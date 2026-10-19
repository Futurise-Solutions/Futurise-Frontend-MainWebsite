import { NextResponse, type NextRequest } from 'next/server'

/**
 * proxy.ts — Next 16's renamed middleware.
 *
 * ⚠️ THIS FILE EXISTS BECAUSE OF O12, AND O12 HAS TWO HALVES. Fixing only the first
 * leaves the worse defect shipping.
 *
 * Next matches `redirects()` `source` CASE-INSENSITIVELY. Vercel's redirects in
 * vercel.json are case-SENSITIVE. That single difference breaks parity in BOTH
 * directions:
 *
 *   (A) LOST — a capitalised source cannot be expressed in next.config.ts at all.
 *       `{ source: '/About' }` also matches `/about`, which then redirects to itself:
 *       308 → /about → 308 → … → ERR_TOO_MANY_REDIRECTS, blank page. Removing the rule
 *       unbreaks /about but leaves `/About` returning 404 where production returns 308.
 *
 *   (B) INVENTED — `/home` and `/llms` are written in lowercase and look correct, but
 *       Next also answers `/Home`, `/HOME`, `/hOmE`, `/LLMs`, `/LLMS`. Production 404s
 *       every one of those. A permanent redirect from a URL that has never existed tells
 *       crawlers it is canonical-adjacent and worth following, and because the match is
 *       case-insensitive the set of resolving variants is UNBOUNDED.
 *
 * The fix for both is the same: express every redirect HERE with an explicit
 * case-sensitive `===` comparison, and REMOVE `/home` and `/llms` from next.config.ts so
 * nothing case-insensitive is left matching them.
 *
 * Status is 308, not 301 — Vercel serves `"permanent": true` as 308, verified by curl.
 *
 * ✅ ACCEPTANCE IS THE FULL TABLE IN REDIRECT-BEHAVIOUR-BASELINE.md, INCLUDING THE 404
 *    ROWS. Asserting only that /About redirects again passes (A) while shipping (B).
 *
 *        MUST REDIRECT (308)          MUST 404
 *        /About  → /about             /Home  /HOME  /hOmE
 *        /home   → /                  /LLMs  /LLMS
 *        /llms   → /llms.txt          /ABOUT
 */

/** Exact, case-SENSITIVE pathname → destination. Order is irrelevant; keys are unique. */
const EXACT_REDIRECTS: Record<string, string> = {
  '/About': '/about',
  '/home': '/',
  '/llms': '/llms.txt',
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  /* `Object.prototype.hasOwnProperty` via a null-prototype lookup would be tidier, but a
     plain `in` check on a string-keyed literal is exact and case-sensitive, which is the
     entire point of this file. `/Home` is not a key, so it falls through to a 404. */
  const destination = Object.prototype.hasOwnProperty.call(EXACT_REDIRECTS, pathname)
    ? EXACT_REDIRECTS[pathname]
    : null

  if (destination) {
    const url = request.nextUrl.clone()
    url.pathname = destination
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

/**
 * Only run on paths that could match. The matcher is a performance filter, NOT the
 * case-sensitivity mechanism — that is the `===`-equivalent lookup above. It is written
 * case-insensitively on purpose so that `/Home` still ENTERS this function and then
 * falls through to 404, rather than being silently skipped.
 */
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
