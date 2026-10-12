import { hasValidSession, unauthorized } from '@/lib/adminProxy'

/**
 * POST /api/admin/upload   → push an image to Cloudinary   (CMS: POST /api/upload)
 *
 * ⚠️ THIS DOES NOT USE proxyToCms(). That helper sets Content-Type explicitly, which is
 * exactly wrong for multipart: the boundary token is generated when the FormData is
 * serialised, and a hand-written `multipart/form-data` header without the matching
 * boundary makes the upstream parser fail with an empty-body error that looks like a
 * corrupt file. The header must be left for fetch to generate.
 *
 * So the FormData is re-read and re-sent, and only X-Admin-Key is set by hand.
 */
export const dynamic = 'force-dynamic'

const BACKEND_ORIGIN =
  process.env.BLOG_API_ORIGIN || 'https://futurise-backend-main-website.vercel.app'

/** Mirrors the CMS's own multer limits, so an oversized file is rejected before upload. */
const MAX_BYTES = 5 * 1024 * 1024
const ALLOWED = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export async function POST(request: Request) {
  if (!(await hasValidSession())) return unauthorized()

  const adminKey = process.env.ADMIN_KEY
  if (!adminKey) {
    return Response.json(
      { success: false, message: 'Admin API key is not configured on this deployment.' },
      { status: 503 }
    )
  }

  let incoming: FormData
  try {
    incoming = await request.formData()
  } catch {
    return Response.json({ success: false, message: 'Expected multipart form data.' }, { status: 400 })
  }

  const file = incoming.get('image')
  if (!(file instanceof File)) {
    return Response.json({ success: false, message: 'No image supplied.' }, { status: 400 })
  }

  /**
   * Validated HERE as well as in the CMS, deliberately. The CMS is authoritative, but
   * rejecting early means an oversized or wrong-typed file never crosses the second hop —
   * the request costs one upload instead of two, and the user gets a clearer message than
   * multer's generic error.
   */
  if (file.size > MAX_BYTES) {
    return Response.json({ success: false, message: 'File too large. Max size is 5MB.' }, { status: 400 })
  }
  if (!ALLOWED.includes(file.type)) {
    return Response.json(
      { success: false, message: 'Only image files are allowed (jpeg, jpg, png, webp).' },
      { status: 400 }
    )
  }

  const outgoing = new FormData()
  outgoing.append('image', file, file.name)

  const res = await fetch(`${BACKEND_ORIGIN}/api/upload`, {
    method: 'POST',
    // NO Content-Type here — see the note at the top of this file.
    headers: { 'X-Admin-Key': adminKey },
    body: outgoing,
    cache: 'no-store',
  })

  const text = await res.text()
  return new Response(text || null, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  })
}
