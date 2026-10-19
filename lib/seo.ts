import type { Metadata } from 'next'

/**
 * Metadata helper — the Next equivalent of the old <Seo> component.
 *
 * ⚠️ D7: NEVER use a Next title TEMPLATE. Every page sets
 *        title: { absolute: '<exact live title>' }
 * A template would append the brand to every page, which is precisely the behaviour the
 * old <Seo> was written to AVOID. Its rule (reproduced exactly in `resolveTitle` below)
 * is conditional: the brand is appended only when it fits, and never twice.
 *
 * The constants and the title rule are copied from src/Components/common/Seo.jsx
 * verbatim. Do not "simplify" them — the 60-character limit and the two early exits are
 * load-bearing, and the original comment explains why.
 */

export const SITE_NAME = 'Futurise Solutions'
export const SITE_URL = 'https://www.futurisesolutions.com'
export const DEFAULT_IMAGE = `${SITE_URL}/home.png`

/**
 * Reproduces the old <Seo> title logic EXACTLY:
 *
 *   Google renders roughly 60 characters of a title before truncating. Appending the
 *   brand unconditionally pushed 9 of 14 pages past that, so the suffix was cut
 *   mid-word and the keyword at the end of the title was lost — and pages that already
 *   ended with the brand rendered it twice.
 *
 *   The brand is kept whenever it fits and dropped when it would cost visible keyword
 *   space.
 */
export function resolveTitle(title?: string): string {
  const TITLE_LIMIT = 60
  if (!title) return SITE_NAME
  if (title.includes(SITE_NAME)) return title
  const withBrand = `${title} | ${SITE_NAME}`
  return withBrand.length <= TITLE_LIMIT ? withBrand : title
}

export interface SeoInput {
  title?: string
  description?: string
  path?: string
  image?: string
  type?: string
  noindex?: boolean
  keywords?: string
  publishedTime?: string
  modifiedTime?: string
  section?: string
  /** [{ hrefLang: 'en-NZ', path: '/nz' }, …] — omit on pages with no regional variants. */
  alternates?: Array<{ hrefLang: string; path?: string; href?: string }> | null
}

/** Build a Next `Metadata` object matching what <Seo> wrote into the DOM. */
export function buildMetadata(input: SeoInput): Metadata {
  const {
    title,
    description,
    path = '',
    image,
    type = 'website',
    noindex = false,
    keywords = '',
    publishedTime = '',
    modifiedTime = '',
    alternates = null,
  } = input

  const fullTitle = resolveTitle(title)
  const url = `${SITE_URL}${path}`
  const ogImage = image
    ? /^https?:\/\//i.test(image)
      ? image
      : `${SITE_URL}${image}`
    : DEFAULT_IMAGE

  const languages: Record<string, string> = {}
  for (const a of alternates || []) {
    const raw = a.href || a.path || ''
    languages[a.hrefLang] = /^https?:\/\//i.test(raw) ? raw : `${SITE_URL}${raw}`
  }

  const meta: Metadata = {
    // D7 — absolute, never a template.
    title: { absolute: fullTitle },
    description,
    robots: noindex ? 'noindex, follow' : 'index, follow',
    alternates: {
      // Each variant stays self-canonical; hreflang is what ties the cluster together.
      // Canonicalising a country page to the global one would erase it from the index.
      canonical: url,
      ...(Object.keys(languages).length ? { languages } : {}),
    },
    openGraph: {
      title: fullTitle,
      description,
      type: type as 'website' | 'article',
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      ...(type === 'article' && (publishedTime || modifiedTime)
        ? {
            ...(publishedTime ? { publishedTime } : {}),
            ...(modifiedTime ? { modifiedTime } : {}),
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
  }

  if (keywords) meta.keywords = keywords
  return meta
}

/**
 * Render one or more JSON-LD blocks.
 *
 * The old <Seo> injected these into <head> with `data-schema="page-schema-N"`. In the
 * App Router a <script type="application/ld+json"> rendered in the page body is the
 * documented equivalent and is present in the SSR HTML, which is what crawlers read.
 * The attribute is preserved so the markup is recognisable against production.
 */
export function jsonLdScripts(jsonLd: unknown): Array<{ key: string; html: string; id: string }> {
  if (!jsonLd) return []
  const list = Array.isArray(jsonLd) ? jsonLd : [jsonLd]
  return list.map((schema, i) => ({
    key: `page-schema-${i}`,
    id: `page-schema-${i}`,
    html: JSON.stringify(schema),
  }))
}
