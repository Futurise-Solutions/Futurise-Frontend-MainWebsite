import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/common/JsonLd'
import ArticleShell from '@/components/blog/ArticleShell'
import ArticleBody from '@/components/blog/ArticleBody'
import { buildMetadata } from '@/lib/seo'
import {
  getBlogs,
  getBlogBySlug,
  mediaUrl,
  parseKeywords,
  parseTags,
  parseHeadings,
  parseFaqs,
} from '@/lib/blog'
import { RETIRED_BLOG_REDIRECTS } from '@/content/blogRedirects'
import { getCachedBlogSummaries } from '@/lib/blogSummaries'
import { articleAuthor, articleAuthorName } from '@/utils/Constant/team'

/** ISR — posts refresh hourly. */
export const revalidate = 3600

/** A slug published after the last build still renders, then caches. */
export const dynamicParams = true

type Params = { slug: string }

export async function generateStaticParams(): Promise<Params[]> {
  const blogs = await getBlogs()
  // Retired slugs 308 in next.config.ts; never prerender them even if still published.
  return blogs.filter((b) => !(b.slug in RETIRED_BLOG_REDIRECTS)).map((b) => ({ slug: b.slug }))
}

/**
 * ⚠️ Next 16: `params` is a Promise and must be awaited.
 *
 * Every fallback below is reproduced EXACTLY from BlogDetailPage.jsx — the live site
 * already has this chain and it is readable, so none of it is invented:
 *   title       meta.metaTitle       || title
 *   description meta.metaDescription || shortDescription
 *   type        meta.ogType          || "article"
 *   noindex     meta.robots ? /noindex/i.test(meta.robots) : false
 *   modified    updatedAt            || createdAt
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlogBySlug(slug, revalidate)
  if (!blog) return {}

  return buildMetadata({
    title: blog.meta?.metaTitle || blog.title,
    description: blog.meta?.metaDescription || blog.shortDescription,
    path: `/blog/${blog.slug}`,
    image: mediaUrl(blog.featuredImage),
    type: blog.meta?.ogType || 'article',
    keywords: parseKeywords(blog).join(', '),
    noindex: blog.meta?.robots ? /noindex/i.test(blog.meta.robots) : false,
    publishedTime: blog.createdAt,
    modifiedTime: blog.updatedAt || blog.createdAt,
    section: blog.category,
  })
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug, revalidate)
  if (!blog) notFound()

  /* PHASE 8: summaries, not full records — the related-posts strip needs title,
     description, image and date, never the Markdown body. */
  const all = await getCachedBlogSummaries(revalidate)
  const headings = parseHeadings(blog.content)
  const parsedTags = parseTags(blog)
  const isLatest = all[0]?.slug === blog.slug
  /**
   * Related posts: same category first, topped up with the newest others.
   *
   * ⚠️ The top-up is not cosmetic. Same-category-only starved the small categories —
   * "UI/UX Design" and "Technology & Business" have ONE published post each, so those
   * posts rendered an empty strip and, more importantly, passed no link onward. It also
   * left the link graph clustered: 32 of 86 posts sit in one category and linked only to
   * each other.
   *
   * Filling to three from the newest remaining posts guarantees every article emits three
   * internal links regardless of how its category is populated. Same-category matches
   * still take precedence, so relevance is unchanged wherever relevance was available.
   */
  const sameCategory = all.filter(
    (b) => b.category === blog.category && b.slug !== blog.slug
  )
  const fillers = all.filter(
    (b) => b.slug !== blog.slug && !sameCategory.some((s) => s.slug === b.slug)
  )
  const related = [...sameCategory, ...fillers].slice(0, 3)

  /**
   * JSON-LD ported verbatim.
   *
   * ⚠️ There is NO author field on a blog record. `articleAuthor()` resolves to a named
   * Person once the team is published and to the Organization until then — a named
   * author is a materially stronger E-E-A-T and AI-citation signal than an anonymous
   * corporate byline.
   *
   * Dates pass straight through: datePublished ← createdAt, dateModified ← updatedAt.
   * Both are already ISO 8601; do not reformat them.
   */
  const jsonLd: Array<Record<string, unknown>> = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: blog.title,
      description: blog.shortDescription,
      image: mediaUrl(blog.featuredImage),
      datePublished: blog.createdAt,
      dateModified: blog.updatedAt || blog.createdAt,
      author: articleAuthor(),
      publisher: {
        '@type': 'Organization',
        name: 'Futurise Solutions',
        // Google's Article guidance expects a publisher logo; it was missing.
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.futurisesolutions.com/favicon-new.png',
        },
      },
      mainEntityOfPage: `https://www.futurisesolutions.com/blog/${blog.slug}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.futurisesolutions.com/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.futurisesolutions.com/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: blog.title,
          item: `https://www.futurisesolutions.com/blog/${blog.slug}`,
        },
      ],
    },
  ]

  /* FAQPage only when the post has a real "Frequently asked questions" section with at
     least two Q&As; a single-question FAQPage adds nothing. */
  const faqs = parseFaqs(blog.content || '')
  if (faqs.length >= 2) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    })
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <ArticleShell
        blog={blog}
        headings={headings}
        parsedTags={parsedTags}
        isLatest={isLatest}
        related={related}
        authorName={articleAuthorName()}
      >
        {/* SERVER-rendered article body — never crosses the client boundary. */}
        <ArticleBody content={blog.content || ''} />
      </ArticleShell>
    </>
  )
}
