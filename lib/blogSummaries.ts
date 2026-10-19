import 'server-only'
import { unstable_cache } from 'next/cache'
import { getBlogSummaries } from './blog'

// Cache the small result, not the multi-megabyte upstream response. Keep the
// existing ISR model; no whole-site Cache Components migration is needed.
export async function getCachedBlogSummaries(revalidate = 600) {
  return unstable_cache(
    () => getBlogSummaries(revalidate),
    ['published-blog-summaries-v1', process.env.BLOG_API_ORIGIN || 'default', String(revalidate)],
    { revalidate, tags: ['blog-summaries'] },
  )()
}
