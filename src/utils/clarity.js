/**
 * Microsoft Clarity loader
 * ========================
 * Session recordings, heatmaps, Smart Events and funnels.
 *
 * WHY THIS IS A MODULE AND NOT A <script> IN index.html
 * GA4 is hardcoded into index.html, which means it also runs on localhost and inside the
 * prerenderer — the prerenderer has to explicitly abort googletagmanager requests to stop
 * it stalling the headless browser. Repeating that pattern would put development sessions
 * and 27 headless Chrome renders into the Clarity dashboard as real traffic, which is
 * exactly the noise that makes recordings useless.
 *
 * Loading it from JavaScript instead means the decision of *whether* to load can be made
 * at runtime, so the tag simply never enters the page unless it should. See shouldLoad().
 *
 * WHY NO NPM PACKAGE
 * `@microsoft/clarity` wraps the same four lines of loader below and adds a dependency,
 * a version to keep current and bundle weight, for no capability this site uses. The
 * official snippet is the supported path and costs nothing.
 *
 * PRIVACY
 * Clarity masks the contents of every input box and dropdown in all masking modes, and
 * that behaviour cannot be switched off — so the contact form's name, email, phone,
 * company and message values are never uploaded. Nothing here unmasks anything, and no
 * identifying data is passed to Clarity: the Identify API is deliberately not used.
 *
 * Consent: since 31 October 2025 Clarity enforces consent signals for visitors from the
 * EEA, UK and Switzerland, and Consent Mode is enabled by default for those regions —
 * cookies are withheld until a valid signal arrives. That default is the correct
 * behaviour for this site, which targets European visitors among others, so no consent
 * call is made here. Adding a blanket `clarity('consent')` would *assert* consent this
 * site has not collected, which would weaken the current position rather than improve it.
 * If a consent banner is added later, call the Consent API v2 from the banner's own
 * handler — not from here.
 */

// Public, not a secret: the project ID identifies the Clarity project in requests made
// from the browser and is visible to anyone who opens devtools. It is therefore a VITE_
// variable by design. Treat it like the GA4 measurement ID already in index.html.
const PROJECT_ID = import.meta.env.VITE_CLARITY_PROJECT_ID;

const SCRIPT_ID = "ms-clarity";

/**
 * Whether Clarity should load for this page view.
 *
 * Skipped without an ID so a missing variable is a no-op rather than a broken script tag,
 * and skipped outside production so local development and the prerender pass — which
 * loads all 27 routes in headless Chrome — never reach the dashboard.
 */
function shouldLoad() {
  if (!PROJECT_ID) return false;
  if (!import.meta.env.PROD) return false;
  if (typeof window === "undefined" || typeof document === "undefined") return false;
  // Headless Chrome is how this site is prerendered; those page views are not visitors.
  if (navigator.webdriver) return false;
  return true;
}

/**
 * Inject the Clarity tag exactly once.
 *
 * Idempotence matters here beyond ordinary tidiness: the app is wrapped in
 * <React.StrictMode>, which deliberately invokes effects twice in development to surface
 * exactly this class of bug. Both the module-level guard and the getElementById check are
 * load-bearing — the first stops a second call in the same tick, the second stops a
 * duplicate after a hot reload has reset module state.
 */
let started = false;

export function initClarity() {
  if (started || !shouldLoad()) return false;
  if (document.getElementById(SCRIPT_ID)) return false;
  started = true;

  // Microsoft's official snippet, with the queue shim kept intact: calls made before the
  // remote script arrives are buffered on `clarity.q` and replayed once it loads, so
  // nothing is lost in the gap.
  window.clarity =
    window.clarity ||
    function () {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  // `async` keeps the fetch off the critical rendering path. The tag is also injected
  // from an effect after mount rather than parsed with the document, so it cannot delay
  // the boot loader, the home hero or first paint.
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${PROJECT_ID}`;
  // Analytics must never be able to break the page: a blocked or failed request (ad
  // blockers reject this on a meaningful share of traffic) resolves quietly here instead
  // of surfacing an unhandled error.
  script.onerror = () => {
    started = false;
  };

  document.head.appendChild(script);
  return true;
}

/**
 * Clarity tracks SPA route changes on its own — it observes History API navigations and
 * starts a new page view without being told. No per-route call is exposed here on
 * purpose: a manual hook would double-count against what Clarity already records, and
 * Smart Events' "Page visits" category reads the same automatic signal.
 *
 * Nothing else is instrumented either. Clarity auto-detects Contact Us, Submit Form,
 * Request Quote, Download, Sign Up and Login from real buttons and page visits, all
 * configurable code-free in the dashboard, and this site's CTAs already carry the plain
 * text ("Contact", "Book appointment", "Send message", "Subscribe") those detectors
 * match on. Hand-written custom events would add code to maintain for signals Clarity
 * already produces.
 */
