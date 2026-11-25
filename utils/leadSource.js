/**
 * Where a visitor came from, kept for the length of the browser session so an enquiry
 * can say which page and campaign produced it.
 *
 * Captured once, on the first page of a visit (components/common/Analytics.jsx calls
 * captureLeadSource on mount). Read when a lead is sent (ContactForm). Nothing here is
 * sent anywhere on its own, and nothing is stored after the tab closes: sessionStorage
 * only, no cookie, no identifier.
 */
const KEY = 'fs_lead_source_v1';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

const clip = (value, max) => String(value || '').slice(0, max);

/** Record landing page, external referrer and UTM tags. First call of a session wins. */
export function captureLeadSource() {
  if (typeof window === 'undefined') return;
  try {
    if (window.sessionStorage.getItem(KEY)) return;
    const url = new URL(window.location.href);
    const utm = {};
    for (const key of UTM_KEYS) {
      const value = url.searchParams.get(key);
      if (value) utm[key] = clip(value, 100);
    }
    let referrer = '';
    try {
      const ref = document.referrer ? new URL(document.referrer) : null;
      // Same-site referrers say nothing about acquisition; keep external ones only.
      if (ref && ref.hostname !== url.hostname) referrer = clip(ref.origin + ref.pathname, 200);
    } catch {}
    window.sessionStorage.setItem(
      KEY,
      JSON.stringify({
        landing: clip(url.pathname, 200),
        referrer,
        utm,
        paidClick: url.searchParams.has('gclid') || url.searchParams.has('msclkid'),
      }),
    );
  } catch {
    // Storage blocked (private mode, strict settings): the lead still sends, just without source lines.
  }
}

/** The stored source, or an empty object. Never throws. */
export function getLeadSource() {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}') || {};
  } catch {
    return {};
  }
}

/** "source=google, medium=cpc" style summary of the stored UTM tags, or ''. */
export function formatUtm(source) {
  return Object.entries(source?.utm || {})
    .map(([key, value]) => `${key.replace('utm_', '')}=${value}`)
    .join(', ');
}
