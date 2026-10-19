import { hasValidSession, proxyToCms, unauthorized } from '@/lib/adminProxy'

/**
 * PUT    /api/admin/blogs/[id]   → update a post   (CMS: PUT    /api/blogs/:id)
 * DELETE /api/admin/blogs/[id]   → delete a post   (CMS: DELETE /api/blogs/:id)
 *
 * ⚠️ Next 16: `params` is a Promise and must be awaited.
 */
export const dynamic = 'force-dynamic'

type Params = { id: string }

/**
 * The id goes into a URL path, so it is encoded rather than interpolated raw. A Mongo
 * ObjectId contains nothing that needs escaping, but this route does not verify that the
 * value IS an ObjectId — it takes whatever the dashboard sends. Encoding means a value
 * containing `/` or `?` cannot be used to reach a different CMS endpoint than intended.
 */
export async function PUT(request: Request, { params }: { params: Promise<Params> }) {
  if (!(await hasValidSession())) return unauthorized()

  const { id } = await params
  const body = await request.text()

  return proxyToCms(`/api/blogs/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body,
    contentType: 'application/json',
  })
}

export async function DELETE(_request: Request, { params }: { params: Promise<Params> }) {
  if (!(await hasValidSession())) return unauthorized()

  const { id } = await params
  return proxyToCms(`/api/blogs/${encodeURIComponent(id)}`, { method: 'DELETE' })
}
