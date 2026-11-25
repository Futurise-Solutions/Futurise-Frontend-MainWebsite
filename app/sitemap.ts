import type { MetadataRoute } from 'next'
import { getCachedBlogSummaries } from '@/lib/blogSummaries'
import { RETIRED_BLOG_REDIRECTS } from '@/content/blogRedirects'
import { caseStudies } from '@/utils/Constant/caseStudies'
import { services } from '@/utils/Constant'
import { solutions } from '@/utils/Constant/solutions'
import { variantList } from '@/utils/Constant/solutionMarkets'

/**
 * Dynamic sitemap: the static routes below plus every published blog slug.
 *
 * The old build wrote this from prerender.js and could silently emit a truncated file.
 * Generating it from the same sources the routes use means it cannot drift: the service
 * and case-study lists come from the content modules that generateStaticParams uses, and
 * the blog list is the same filtered, published-only set the index renders.
 */
export const revalidate = 3600

const SITE = 'https://www.futurisesolutions.com'

/** Routes with no dynamic segment. */
const STATIC_ROUTES: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/portfolio', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/case-studies', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/solutions', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/tools/ota-commission-calculator', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.9, changeFrequency: 'daily' },
  // Market pages.
  { path: '/nz', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/us', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/au', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/ca', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/ae', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/in', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/europe', priority: 0.9, changeFrequency: 'monthly' },
  // Legal.
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))

  const serviceEntries: MetadataRoute.Sitemap = Object.keys(services).map((slug) => ({
    url: `${SITE}/service/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const caseStudyEntries: MetadataRoute.Sitemap = Object.keys(caseStudies).map((slug) => ({
    url: `${SITE}/case-studies/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const solutionEntries: MetadataRoute.Sitemap = Object.keys(solutions).map((slug) => ({
    url: `${SITE}/solutions/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const variantEntries: MetadataRoute.Sitemap = variantList.map(({ slug, market }) => ({
    url: `${SITE}/solutions/${slug}/${market}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // Published only — getBlogs() already filters status === 'published'. Retired slugs are
  // skipped too, so they stay out of the sitemap until the CMS marks them as drafts.
  const blogs = await getCachedBlogSummaries(revalidate)
  const blogEntries: MetadataRoute.Sitemap = blogs
    .filter((b) => !(b.slug in RETIRED_BLOG_REDIRECTS))
    .map((b) => ({
      url: `${SITE}/blog/${b.slug}`,
      lastModified: new Date(b.updatedAt || b.createdAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

  return [...staticEntries, ...serviceEntries, ...caseStudyEntries, ...solutionEntries, ...variantEntries, ...blogEntries]
}
