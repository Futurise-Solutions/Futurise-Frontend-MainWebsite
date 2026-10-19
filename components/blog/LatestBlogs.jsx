import { getCachedBlogSummaries } from '@/lib/blogSummaries'
import LatestBlogsView from './LatestBlogsView'

/**
 * SERVER component. Fetches on the server and passes the four newest posts down.
 *
 * The old version used a client `useBlogs()` hook and returned null while loading. That
 * guard existed for a CLS reason worth preserving the intent of:
 *
 *   Returning null *after* a full-height loading skeleton has painted collapses roughly
 *   740px of layout and drags the footer up with it — a ~0.18 CLS hit on the home page.
 *   Rendering nothing from the very first paint removes the shift entirely.
 *
 * Fetching on the server makes that structural rather than defensive: there is no
 * loading state at all, so the markup is correct in the very first byte and nothing can
 * shift. The "hide the section when there are no published posts" rule is kept.
 */
export default async function LatestBlogs() {
  const blogs = await getCachedBlogSummaries()
  const latest = blogs.slice(0, 4)

  // Hide the section entirely if there are no published blogs (or the API is unreachable).
  if (latest.length === 0) return null

  return <LatestBlogsView latest={latest} />
}
