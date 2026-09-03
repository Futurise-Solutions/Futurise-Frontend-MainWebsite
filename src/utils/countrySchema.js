import { CONTACT, NavbarservicesOptions } from "./Constant";
import { COUNTRIES } from "./Constant/countries";

/**
 * JSON-LD for a country landing page.
 *
 * WHY THIS EXISTS
 * The structured data on a country page is ~60 lines of which about twenty characters
 * differ between markets: the label, the language tag, the currency and the regions. Left
 * inline it would be copied per country, and the failure mode is drift — someone corrects
 * or extends the schema on one page and the other four keep the old shape. Unlike the
 * hreflang problem this one is visible rather than silent, which is why the fix is a
 * builder rather than a build-time guard, but at five markets it is still 300 lines of
 * near-identical JSON maintained by hand.
 *
 * Everything country-specific arrives as configuration. Everything site-wide — the origin,
 * the brand, the contact address, the service list, the `@id` links back to the shared
 * Organization and WebSite nodes — is resolved here, so no country page can invent a second
 * company entity or point at the wrong node.
 *
 * Emits WebPage, ProfessionalService (carrying the Service/Offer catalogue), FAQPage and
 * BreadcrumbList.
 */

const SITE_URL = "https://www.futurisesolutions.com";
const SITE_NAME = "Futurise Solutions";

export const buildCountrySchema = ({
  // ISO 3166-1 alpha-2, lowercased — the key into the country registry. Path, label and
  // language tag are read from there rather than passed, so the schema, the hreflang
  // cluster, the sitemap and the footer link can never disagree about a market.
  code,
  // The page's meta title. The brand is appended here so the WebPage name follows one
  // pattern across markets instead of being retyped per country.
  title,
  description,
  // Cities or states named as AdministrativeArea alongside the country itself. Optional:
  // a market we serve without naming sub-regions simply omits them.
  regions = [],
  // ISO 4217, e.g. "NZD". This is the field a buyer's currency-qualified query keys on.
  currency,
  faqs = [],
  image = "/home.png",
  // A market with more than one working language (e.g. en + ar) passes both.
  languages = ["English"],
  services = NavbarservicesOptions,
}) => {
  const country = COUNTRIES.find((c) => c.code === code);
  if (!country) {
    // Destructuring undefined would throw here anyway; naming the file to edit turns a
    // stack trace during prerender into an instruction.
    throw new Error(
      `buildCountrySchema: unknown country code "${code}". Add it to COUNTRIES in src/utils/Constant/countries.js.`
    );
  }

  const { path, label, hrefLang } = country;
  const url = `${SITE_URL}${path}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": url,
      name: `${title} — ${SITE_NAME}`,
      url,
      description,
      inLanguage: hrefLang,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}${image}` },
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${url}#service`,
      name: `${SITE_NAME} — ${label}`,
      url,
      description,
      // Links this regional node to the site-wide Organization rather than declaring a
      // second, competing company entity.
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      areaServed: [
        { "@type": "Country", name: label },
        ...regions.map((region) => ({ "@type": "AdministrativeArea", name: region })),
      ],
      availableLanguage: languages,
      currenciesAccepted: currency,
      email: CONTACT.email,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `Software development services in ${label}`,
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.option, url: `${SITE_URL}${s.path}` },
        })),
      },
    },
    // A FAQPage with an empty mainEntity is an invalid-object error in Search Console, so
    // a market that ships without questions omits the block rather than emitting a husk.
    faqs.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${url}#faq`,
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null,
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: label, item: url },
      ],
    },
  ].filter(Boolean);
};
