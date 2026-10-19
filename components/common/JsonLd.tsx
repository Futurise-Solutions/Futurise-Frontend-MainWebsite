import { jsonLdScripts } from '@/lib/seo'

/**
 * Renders a page's JSON-LD exactly as the old <Seo> did, with the same
 * `data-schema="page-schema-N"` attribute so the markup is recognisable against
 * production.
 *
 * This is a SERVER component: the script lands in the SSR HTML, which is what crawlers
 * read. The old version injected it from a useEffect, so it existed only after hydration
 * — one of the things this migration is meant to fix.
 */
export default function JsonLd({ data }: { data: unknown }) {
  const blocks = jsonLdScripts(data)
  if (!blocks.length) return null
  return (
    <>
      {blocks.map((b) => (
        <script
          key={b.key}
          type="application/ld+json"
          data-schema={b.id}
          dangerouslySetInnerHTML={{ __html: b.html }}
        />
      ))}
    </>
  )
}
