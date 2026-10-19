import type { Metadata } from 'next'
import JsonLd from '@/components/common/JsonLd'
import BlogsPageView from '@/components/blog/BlogsPageView'
import { buildMetadata } from '@/lib/seo'
import { getCachedBlogSummaries } from '@/lib/blogSummaries'

/** ISR — the index refreshes every 10 minutes. */
export const revalidate = 600

export const metadata: Metadata = buildMetadata({
  title: 'AI, SaaS & Web Development Insights',
  description:
    'Engineering notes and deep-dives on AI agents, SaaS architecture, web and mobile development from the Futurise Solutions team.',
  path: '/blog',
  keywords:
    'software development blog, AI development insights, web development, SaaS, app development, futurise solutions',
})

export default async function Page() {
  const blogs = await getCachedBlogSummaries(revalidate)

  /** JSON-LD ported verbatim. The ItemList is only emitted when there are posts. */
  const jsonLd: Array<Record<string, unknown>> = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Futurise Solutions Blog',
      url: 'https://www.futurisesolutions.com/blog',
      description:
        'Insights, deep-dives and engineering notes from Futurise Solutions on AI, SaaS, web and mobile development.',
      isPartOf: {
        '@type': 'WebSite',
        name: 'Futurise Solutions',
        url: 'https://www.futurisesolutions.com',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.futurisesolutions.com/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.futurisesolutions.com/blog' },
      ],
    },
  ]

  if (blogs.length) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: blogs.slice(0, 20).map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://www.futurisesolutions.com/blog/${b.slug}`,
        name: b.title,
      })),
    })
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <BlogsPageView blogs={blogs} />
    </>
  )
}
