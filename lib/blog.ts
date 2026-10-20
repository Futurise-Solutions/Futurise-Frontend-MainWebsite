/**
 * Blog data layer.
 *
 * The record shape below is the REAL one, read from the live endpoint — not inferred.
 * The envelope is a BARE ARRAY: no wrapper object, no `data` key, no `blogs` key. The
 * old `toBlogArray()` handled three shapes defensively; only the array case is real.
 *
 * ⚠️ THERE IS NO AUTHOR FIELD on a blog record. Article/BlogPosting JSON-LD takes its
 * author and publisher from the Organization node that /about and /contact already
 * declare. Do not invent an author field and do not declare a second Organization.
 */

import { RETIRED_BLOG_REDIRECTS } from '../content/blogRedirects'

const API_ORIGIN =
  process.env.BLOG_API_ORIGIN || 'https://futurise-backend-main-website.vercel.app'

export interface BlogMeta {
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string | string[]
  ogType?: string
  robots?: string
}

export interface Blog {
  _id: string
  title: string
  slug: string
  shortDescription: string
  /** Cloudinary URL. res.cloudinary.com is in images.remotePatterns. */
  featuredImage: string
  category: string
  tags: string[]
  /** Markdown. */
  content: string
  /** "published" — anything else is a draft and must not be rendered. */
  status: string
  createdAt: string
  updatedAt: string
  __v?: number
  meta?: BlogMeta
}

/**
 * Ported verbatim from src/config.js.
 * An absolute URL passes through; a relative path is joined to the API origin.
 */
export function mediaUrl(path?: string): string {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  return `${API_ORIGIN}${path.startsWith('/') ? '' : '/'}${path}`
}

/** Only published posts are ever rendered, listed, prerendered or put in the sitemap. */
export const isPublished = (b: Blog) => b.status === 'published'

/**
 * Retired posts are 308-redirected in next.config.ts but the CMS may still list them as
 * published until they are deleted. They must never be listed, linked or served.
 */
const isRetiredSlug = (slug: string) => Object.prototype.hasOwnProperty.call(RETIRED_BLOG_REDIRECTS, slug)

/**
 * Fetch all published blogs, newest first.
 * `revalidate` is passed by the caller so the index (600s) and posts (3600s) can differ.
 */
/**
 * ⚠️ PROCESS-LOCAL MEMO. This is not an optimisation; the build fails without it.
 *
 * /api/blogs returns ~3.5MB, which is over Next's 2MB data-cache ceiling, so the
 * response is NEVER cached ("items over 2MB can not be cached"). With 83 posts each
 * calling getBlogs() for their related-posts list, that is 83+ uncached 3.5MB fetches
 * during `next build` — which saturated the connection and killed the build with
 * ECONNRESET partway through prerendering.
 *
 * Memoising the in-flight promise collapses that to ONE request per process. It does not
 * replace ISR: `revalidate` still governs the cached page lifetime in production, and a
 * this memo expires according to the caller's revalidation interval. Compact summary
 * results also use the persistent framework cache in blogSummaries.ts.
 */
let _blogsPromise: Promise<Blog[]> | null = null
let _blogsFetchedAt = 0
let _blogsPending = false

export async function getBlogs(revalidate = 600): Promise<Blog[]> {
  if (_blogsPromise && (_blogsPending || Date.now() - _blogsFetchedAt < revalidate * 1000)) return _blogsPromise
  _blogsPending = true

  _blogsPromise = (async () => {
    // The raw list exceeds the framework data-cache limit. Cache compact summaries
    // separately; use this expiring process memo to deduplicate full-list requests.
    const res = await fetch(`${API_ORIGIN}/api/blogs`, { cache: 'no-store' })
    if (!res.ok) throw new Error(`Blog list request failed: ${res.status}`)
    const data = await res.json()
    // Bare array — confirmed against the live endpoint.
    if (!Array.isArray(data)) throw new Error('Unexpected blog list response')
    const list: Blog[] = data
    return list
      .filter(isPublished)
      .filter((b) => !isRetiredSlug(b.slug))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  })()

  try {
    const list = await _blogsPromise
    _blogsFetchedAt = Date.now()
    return list
  } catch (err) {
    // Never memoise a failure — the next caller must be able to retry.
    _blogsPromise = null
    throw err
  } finally {
    _blogsPending = false
  }
}

export async function getBlogBySlug(slug: string, revalidate = 3600): Promise<Blog | null> {
  /* ⚠️ BUILD AND RUNTIME NEED OPPOSITE THINGS HERE — read before "simplifying".

     AT BUILD TIME the list is already in memory (generateStaticParams fetched it), so
     serving from it costs nothing and SAVES 80+ round-trips: without this, prerendering
     every post would re-request each one individually on top of the list fetch.

     AT RUNTIME the opposite holds. Each ISR revalidation of ONE post would otherwise pull
     the entire ~3.5MB list to extract a single record — and because that response is over
     Next's 2MB data-cache ceiling it is never cached, so the cost repeats every time.
     Fetching the single-post endpoint is a few KB instead.

     `phase` distinguishes them: NEXT_PHASE is 'phase-production-build' only during
     `next build`. Everything else — dev, ISR revalidation, on-demand rendering of a slug
     published after the build — takes the single-post path. */
  if (isRetiredSlug(slug)) return null
  const isBuild = process.env.NEXT_PHASE === 'phase-production-build'
  if (isBuild && _blogsPromise) {
    const list = await _blogsPromise
    const hit = list.find((b) => b.slug === slug)
    if (hit) return hit
  }

  const res = await fetch(`${API_ORIGIN}/api/blogs/${encodeURIComponent(slug)}`, {
    next: { revalidate },
  })
  if (!res.ok) return null
  const data = await res.json()
  const blog: Blog | null = data && typeof data === 'object' && !Array.isArray(data) ? data : null
  // A draft reached by direct URL must 404, exactly as an unknown slug does.
  return blog && isPublished(blog) ? blog : null
}

/** A blog record without its Markdown body — enough for cards, related lists and sorting. */
export type BlogSummary = Omit<Blog, 'content'> & { content?: string; readingMinutes?: number }

/**
 * The published list WITHOUT `content`.
 *
 * `content` is the Markdown body and is the overwhelming bulk of the ~3.5MB payload, but
 * nothing that renders a LIST needs it — cards show title, description, image and date.
 * Dropping it after the fetch does not avoid the download, but it does keep the retained
 * objects small, which matters on the article page where this is held alongside the post
 * itself for the related-posts strip.
 *
 * `readTime()` is the one consumer that reads `content`; it falls back to
 * `shortDescription`, which is exactly what the old BlogsPage did for the same reason.
 */
export async function getBlogSummaries(revalidate = 600): Promise<BlogSummary[]> {
  const list = await getBlogs(revalidate)
  return list.map(({ content, ...rest }) => ({ ...rest, readingMinutes: readTime(content || rest.shortDescription) }))
}

/**
 * Keyword parser ported VERBATIM from BlogDetailPage.jsx.
 *
 * Handles legacy space-separated and comma-separated values: a single string containing
 * commas splits on commas; a single string of more than three words splits on
 * whitespace; anything else is flattened and comma-split per element.
 */
export function parseKeywords(blog: Blog): string[] {
  const rawKeywords = blog.meta?.metaKeywords || blog.tags || []
  const keywords = Array.isArray(rawKeywords) ? rawKeywords : [rawKeywords]
  if (keywords.length === 1 && typeof keywords[0] === 'string') {
    const single = keywords[0].trim()
    if (single.includes(',')) {
      return single
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    }
    if (single.split(/\s+/).length > 3) {
      return single
        .split(/\s+/)
        .map((t) => t.trim())
        .filter(Boolean)
    }
  }
  return keywords
    .flatMap((t) => (typeof t === 'string' ? t.split(',').map((x) => x.trim()) : t))
    .filter(Boolean)
}

/**
 * Format an ISO date as e.g. "June 14, 2026". Ported from src/utils/blog.js.
 * Pinned to IST: without a timeZone the server (UTC) and a visitor's browser can land on
 * different calendar days, which breaks hydration (React #418) and shows the wrong date.
 */
export const formatDate = (d?: string) =>
  d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Kolkata' }) : ''

/** Estimate read time in minutes from markdown (~200 wpm). Ported from src/utils/blog.js. */
export const readTime = (content = '') =>
  Math.max(1, Math.ceil(String(content).trim().split(/\s+/).filter(Boolean).length / 200))

/**
 * Parse headings out of markdown for a TOC. Ported from src/utils/blog.js, with the
 * level range widened — see below.
 *
 * ⚠️ THE ORIGINAL MATCHED `#{2,3}` ONLY, i.e. `##` and `###`, SKIPPING `#`.
 *
 * That was correct when the renderer emitted markdown `#` as a page-level <h1>. But the
 * CMS authors used `#` for every SECTION heading, so on most posts the only headings
 * present were `#` — and the TOC matched none of them and rendered EMPTY. Measured on
 * `how-much-does-it-cost-to-build-a-custom-ai-agent-in-2026`, a post with 18 sections:
 * zero `href="#…"` anchors in the built HTML.
 *
 * `#{1,3}` now matches, so those sections appear in the TOC. `level` is the count of
 * markdown hashes (1–3), NOT the rendered tag level — ArticleBody shifts rendering down
 * one (`#` → <h2>), but the ids are derived from the heading text either way, so TOC
 * anchors resolve regardless. Any consumer indenting by `level` keeps the author's own
 * hierarchy, which is the intent.
 */
export const parseHeadings = (markdown = '') => {
  const out: Array<{ level: number; text: string; id: string }> = []
  String(markdown)
    .split('\n')
    .forEach((line) => {
      const m = /^(#{1,3})\s+(.*)$/.exec(line.trim())
      if (m) {
        const text = m[2].replace(/[#*`]/g, '').trim()
        const id = text
          .toLowerCase()
          .replace(/[^\w]+/g, '-')
          .replace(/^-+|-+$/g, '')
        out.push({ level: m[1].length, text, id })
      }
    })
  return out
}

/** Markdown → plain text: links keep their label, emphasis/code markers drop, whitespace collapses. */
const toPlainText = (md: string) =>
  md
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*`]+/g, '')
    .replace(/(^|\s)_+|_+(?=\s|$|[.,;:!?)])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()

/**
 * FAQ extractor for the `## Frequently asked questions` section that rewritten posts end
 * with. Each `### Question?` heading owns the text up to the next `###` or `##`; the
 * section itself ends at the next `## ` heading or the end of the post. Returns [] when
 * the section is missing.
 */
export function parseFaqs(markdown: string): Array<{ q: string; a: string }> {
  const lines = String(markdown || '').split('\n')
  const start = lines.findIndex((l) => /^##\s+frequently asked questions\s*$/i.test(l.trim()))
  if (start === -1) return []

  const out: Array<{ q: string; a: string }> = []
  let q: string | null = null
  let answer: string[] = []
  const flush = () => {
    if (q) {
      const a = toPlainText(answer.join(' '))
      if (a) out.push({ q, a })
    }
  }

  for (const line of lines.slice(start + 1)) {
    const t = line.trim()
    if (/^##\s/.test(t)) break
    if (/^###\s/.test(t)) {
      flush()
      q = toPlainText(t.replace(/^###\s+/, ''))
      answer = []
    } else if (q) {
      answer.push(t)
    }
  }
  flush()
  return out
}

/**
 * Tag parser ported VERBATIM from BlogDetailPage.jsx.
 * Same legacy-format handling as parseKeywords, applied to `tags`.
 */
export function parseTags(blog: Blog): string[] {
  if (!blog.tags || !Array.isArray(blog.tags)) return []
  if (blog.tags.length === 1 && typeof blog.tags[0] === 'string') {
    const single = blog.tags[0].trim()
    if (single.includes(',')) {
      return single
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    }
    if (single.split(/\s+/).length > 3) {
      return single
        .split(/\s+/)
        .map((t) => t.trim())
        .filter(Boolean)
    }
  }
  return blog.tags
    .flatMap((t) => (typeof t === 'string' ? t.split(',').map((x) => x.trim()) : t))
    .filter(Boolean)
}
