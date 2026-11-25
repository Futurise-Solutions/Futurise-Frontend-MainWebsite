'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { captureLeadSource } from '../../utils/leadSource'

/**
 * Third-party tags, deferred (Phase 8).
 *
 * The old app hardcoded GA4 into index.html's <head> and loaded Clarity from a module.
 * Both move to next/script here so their priority is explicit and neither competes with
 * the LCP image for bandwidth.
 *
 *   GA4      afterInteractive — fires after hydration. Page-view collection does not
 *                               need to beat first paint, and `async` in <head> did.
 *   Clarity  lazyOnload       — session recording is the least urgent thing on the page.
 *
 * ⚠️ BOTH IDs ARE PUBLIC BY DESIGN, not leaked secrets. A GA4 measurement ID and a
 * Clarity project ID are visible in every browser that loads the site; they identify a
 * property, they do not authorise anything. That is why they carry NEXT_PUBLIC_.
 */

/* Hardcoded, exactly as index.html had it, so analytics keeps working if the env var is
   not set in an environment. The env var allows an override without a code change. */
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-5FKB0BL3MQ'
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || 'ycomehde8x'

/* Vercel previews, `next start` and Lighthouse runs are production builds too; only this host reports. */
const PRODUCTION_HOST = 'www.futurisesolutions.com'

export default function Analytics() {
  /* Remember where this visit started (landing page, external referrer, UTM tags) so an
     enquiry can say which page and campaign produced it. sessionStorage only; runs in
     every environment because it sends nothing by itself. See utils/leadSource.js. */
  useEffect(() => { captureLeadSource() }, [])

  /* ⚠️ PRODUCTION ONLY — this gate is ported from src/utils/clarity.js and its reasoning
     applies to both tags now:
       "local development and the prerender pass — which loads all 27 routes in headless
        Chrome — never reach the dashboard"
     Dev sessions and build-time renders are not visitors, and letting them through is
     what makes recordings useless. `next build` renders these components, so without
     this every build would register page views. */
  if (process.env.NODE_ENV !== 'production') return null

  return (
    <>
      {GA_ID && (
        /* One inline script instead of a <Script src>: the hostname check has to run before
           gtag.js is requested, so the loader element is injected from inside the check.
           The init block is ported from index.html's inline block. */
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            if (window.location.hostname === '${PRODUCTION_HOST}') {
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
              var s = document.createElement('script');
              s.async = true;
              s.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_ID}';
              document.head.appendChild(s);
            }
          `}
        </Script>
      )}

      {CLARITY_ID && (
        /* The official Clarity snippet. No npm package: `@microsoft/clarity` wraps these
           same four lines and adds a dependency, a version to keep current and bundle
           weight, for no capability this site uses.

           Consent: Clarity enforces consent signals for EEA/UK/CH visitors and Consent
           Mode is on by default there, so cookies are withheld until a valid signal
           arrives. That default is correct for this site and NO consent call is made
           here — a blanket clarity('consent') would ASSERT consent this site has not
           collected. If a banner is added later, call the Consent API from the banner's
           own handler, not from here. */
        <Script id="ms-clarity" strategy="lazyOnload">
          {`
            if (window.location.hostname === '${PRODUCTION_HOST}') {
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_ID}");
            }
          `}
        </Script>
      )}
    </>
  )
}
