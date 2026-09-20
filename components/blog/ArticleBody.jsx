import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from './ArticleBody.module.css'

/**
 * Article body — a SERVER COMPONENT. No 'use client'.
 *
 * This is the whole point of Phase 6: the article text is the page's reason to exist, so
 * it is rendered on the server and ships as HTML. The old BlogMarkdown.jsx mapped every
 * markdown node onto a Chakra component, which requires the Emotion client runtime and
 * would drag the entire article back across the client boundary.
 *
 * Plain elements + a CSS Module replace that map. Every value in the stylesheet is
 * transcribed from the Chakra props it replaces — see ArticleBody.module.css.
 *
 * Only two element overrides remain, and both exist for a reason CSS cannot express:
 *   - headings need an `id` so the table of contents can anchor to them
 *   - tables need a scroll wrapper element that has no markdown equivalent
 *
 * ── ⚠️ HEADINGS ARE SHIFTED DOWN ONE LEVEL. DO NOT "RESTORE" THEM. ──────────
 * Markdown `#` renders as <h2>, `##` as <h3>, `###` as <h4>.
 *
 * WHY: the page template emits the post title as the ONLY <h1>. The CMS authors used
 * `#` for every section heading, so rendering markdown levels literally produced 2–21
 * <h1> elements per post — 262 surplus across the 86 published posts, with ZERO posts
 * having exactly one. That is not a ranking penalty in itself, but it destroys the
 * document outline that answer engines read to extract structure, which is precisely
 * the surface this site's remaining upside sits on.
 *
 * The shift is SEMANTIC ONLY. ArticleBody.module.css restyles each shifted level to the
 * exact values its old level used — h2 gets the old h1 sizing, h3 the old h2, h4 the old
 * h3 — so rendered output is pixel-identical. Change one without the other and every
 * article's heading sizes visibly jump.
 *
 * NOT DONE HERE: no copy was touched. The CMS content still says `#`; only its mapping
 * changed. Fixing the source Markdown across 86 posts would achieve the same thing and
 * is the tidier long-term answer, but it is 86 manual edits against this one mapping.
 */

/** Flatten markdown children to plain text (for heading anchor ids). */
const toText = (children) => {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.map(toText).join('')
  if (children?.props?.children) return toText(children.props.children)
  return ''
}

/** Must match parseHeadings() in lib/blog.ts so the TOC anchors line up. */
const slug = (children) =>
  toText(children)
    .toLowerCase()
    .replace(/[^\w]+/g, '-')
    .replace(/^-+|-+$/g, '')

const components = {
  /* Shifted one level down — see the note above. The `id` still comes from the heading's
     own text, so existing TOC anchors and any inbound #fragment links keep working. */
  h1: ({ children }) => <h2 id={slug(children)}>{children}</h2>,
  h2: ({ children }) => <h3 id={slug(children)}>{children}</h3>,
  h3: ({ children }) => <h4 id={slug(children)}>{children}</h4>,
  h4: ({ children }) => <h5 id={slug(children)}>{children}</h5>,
  h5: ({ children }) => <h6 id={slug(children)}>{children}</h6>,
  /* `######` has nowhere left to shift to — HTML stops at h6. It renders as <h6> with
     the same id, which is the closest correct answer. No published post uses it. */
  h6: ({ children }) => <h6 id={slug(children)}>{children}</h6>,
  // The old component set isExternal on every link, which is rel+target on all of them.
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className={styles.tableWrap}>
      <table>{children}</table>
    </div>
  ),
}

export default function ArticleBody({ content = '' }) {
  return (
    <div className={styles.body}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
