/**
 * Conversion event tracking
 * =========================
 * Every lead-generating action on this site was previously invisible: GA4 recorded
 * pageviews and Vercel Analytics recorded visits, but nothing recorded the moments that
 * actually matter — a form sent, a WhatsApp chat opened, a call booked. Without those,
 * there is no way to tell which page, market or campaign produces enquiries, and no way
 * to judge whether a change helped.
 *
 * One helper fires into both sinks so instrumentation never has to be written twice:
 *   - GA4 (`gtag`) — loaded from index.html, used for acquisition/geo reporting
 *   - Vercel Analytics (`track`) — already bundled, used for fast in-dashboard funnels
 *
 * Primary conversions additionally emit GA4's recommended `generate_lead` event, so
 * "mark as key event" in GA4 is a single click rather than a custom definition per
 * action, and Google Ads can import one conversion instead of five.
 */
import { track } from "@vercel/analytics";

/**
 * Canonical event names. Import these rather than typing string literals — a typo in a
 * literal produces a silently separate event in GA4 that nobody notices for months.
 */
export const EVENTS = {
  CONTACT_FORM_SUBMIT: "contact_form_submit",
  CONTACT_FORM_ERROR: "contact_form_error",
  NEWSLETTER_SUBSCRIBE: "newsletter_subscribe",
  WHATSAPP_CLICK: "whatsapp_click",
  BOOKING_MODAL_OPEN: "booking_modal_open",
  BOOKING_CALENDAR_OPEN: "booking_calendar_open",
  PHONE_CLICK: "phone_click",
  EMAIL_CLICK: "email_click",
  CHATBOT_OPEN: "chatbot_open",
};

/**
 * Actions that represent a real enquiry rather than intent. These also fire
 * `generate_lead`, GA4's recommended lead event.
 *
 * `BOOKING_MODAL_OPEN` is deliberately absent: opening the modal is intent, but only
 * `BOOKING_CALENDAR_OPEN` means the visitor actually left for the booking page. Counting
 * both would roughly double the apparent lead volume.
 */
const LEAD_EVENTS = new Set([
  EVENTS.CONTACT_FORM_SUBMIT,
  EVENTS.WHATSAPP_CLICK,
  EVENTS.BOOKING_CALENDAR_OPEN,
  EVENTS.PHONE_CLICK,
]);

/**
 * Vercel Analytics rejects nested objects and undefined values, and GA4 silently drops
 * them. Flatten to the primitives both accept so a stray `undefined` can't void the
 * whole event.
 */
const clean = (props) =>
  Object.entries(props ?? {}).reduce((acc, [key, value]) => {
    if (value === undefined || value === null) return acc;
    acc[key] =
      typeof value === "string" || typeof value === "number" || typeof value === "boolean"
        ? value
        : String(value);
    return acc;
  }, {});

/**
 * Record a conversion event in GA4 and Vercel Analytics.
 *
 * Analytics must never be able to break a conversion flow, so every call is wrapped:
 * a blocked gtag (ad blockers reject it on a large share of traffic) must not prevent
 * the form from submitting or the WhatsApp tab from opening.
 *
 * @param {string} name  One of `EVENTS`.
 * @param {Record<string, string|number|boolean>} [props]  Context, e.g. `{ location: "footer" }`.
 */
export function trackEvent(name, props = {}) {
  if (!name || typeof window === "undefined") return;

  const payload = clean(props);

  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, payload);
      if (LEAD_EVENTS.has(name)) {
        window.gtag("event", "generate_lead", { ...payload, lead_source: name });
      }
    }
  } catch {
    /* analytics is never allowed to break a conversion path */
  }

  try {
    track(name, payload);
    if (LEAD_EVENTS.has(name)) track("generate_lead", { ...payload, lead_source: name });
  } catch {
    /* same */
  }
}

/**
 * Convenience wrapper for elements that are already real anchors (`<a href>`). The link
 * navigates on its own; this only records that it happened, so the handler must stay
 * side-effect free and must not preventDefault.
 */
export const trackClick = (name, props) => () => trackEvent(name, props);
