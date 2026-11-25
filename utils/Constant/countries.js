/**
 * The single source of truth for which country landing pages exist.
 *
 * WHY THIS FILE EXISTS
 * hreflang is reciprocal: Google only honours an annotation when every page in the
 * cluster declares the whole cluster, including itself. Written by hand that costs
 * pages x entries, so it grows as the square of the country count — six pages each
 * listing six alternates is thirty-six entries by the fifth market, and adding that
 * market means editing every page shipped before it.
 *
 * The failure mode is what makes this worth centralising rather than documenting: a
 * missed edit produces no build error, no console warning and no visible defect. Google
 * simply drops the annotation and starts choosing between the pages itself, which is the
 * exact duplicate-content outcome the country pages exist to avoid.
 *
 * Deriving the cluster from one array makes reciprocity structural — every page renders
 * the identical list because they all read the same constant.
 *
 * TO ADD A COUNTRY
 *   1. add an entry here
 *   2. add `src/utils/Constant/<country>.js` with the page copy
 *   3. add `src/Pages/<Country>Page.jsx`
 *   4. register the route in src/Routes/AllRoutes.jsx
 * hreflang, the sitemap entry, the prerender route and the footer link all follow from
 * step 1 automatically.
 */

export const COUNTRIES = [
  {
    // ISO 3166-1 alpha-2, lowercased — also the URL segment and the prerender route.
    code: "nz",
    path: "/nz",
    // BCP 47. The region subtag must match `code`, which is why both derive from one entry.
    hrefLang: "en-NZ",
    label: "New Zealand",
  },
  {
    code: "us",
    path: "/us",
    hrefLang: "en-US",
    label: "United States",
  },
  {
    code: "au",
    path: "/au",
    hrefLang: "en-AU",
    label: "Australia",
  },
  {
    code: "ca",
    path: "/ca",
    hrefLang: "en-CA",
    label: "Canada",
  },
  {
    code: "ae",
    path: "/ae",
    hrefLang: "en-AE",
    label: "United Arab Emirates",
  },
  {
    // India is the only entry here where the company has PEOPLE rather than only clients:
    // the engineering team is in India (stated as the country only, never a city), and two
    // published clients are Indian businesses.
    // ⚠️ ONE entry for the country. No per-city entries — see the note at the top of
    // utils/Constant/india.js for the test any additional Indian location must pass.
    code: "in",
    path: "/in",
    hrefLang: "en-IN",
    label: "India",
  },
];

/**
 * The complete hreflang cluster, shared verbatim by the homepage and every country page.
 *
 * `x-default` points at the homepage: it is the page for a visitor whose region we do not
 * target, which is precisely what x-default means. Every page also lists itself — a
 * self-reference is required, not optional.
 */
export const COUNTRY_ALTERNATES = [
  { hrefLang: "x-default", path: "/" },
  ...COUNTRIES.map(({ hrefLang, path }) => ({ hrefLang, path })),
];

