import { useEffect } from "react";

const SITE_NAME = "Futurise Solutions";
const SITE_URL = "https://www.futurisesolutions.com";
const DEFAULT_IMAGE = `${SITE_URL}/home.png`;

const upsertMeta = (selector, attr, key, content) => {
  if (!content) return;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const removeMeta = (selector) => {
  const el = document.head.querySelector(selector);
  if (el) el.remove();
};

const upsertCanonical = (href) => {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const upsertJsonLd = (id, data) => {
  let el = document.head.querySelector(`script[data-schema="${id}"]`);
  if (!el) {
    el = document.createElement("script");
    el.setAttribute("type", "application/ld+json");
    el.setAttribute("data-schema", id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
};

// hreflang alternates for regional variants of the same English content — the homepage
// and the country landing pages (/nz, /us, …).
//
// Two rules drive the shape of this. Google only honours an annotation when every page
// in the cluster declares the whole cluster, including itself, so each variant ships the
// full list rather than pointing one way. And the set must include `x-default` for the
// visitor whose region we do not target, which is the global homepage.
//
// Any link matching rel="alternate"[hreflang] is one of ours, so no marker attribute is
// needed to identify them. Anything left over after a sync is removed, which is what
// stops a client-side navigation from /nz to a page with no regional variants leaving
// stale tags behind that would claim alternates the new page does not have.
const syncAlternates = (list) => {
  const stale = new Map();
  document.head
    .querySelectorAll('link[rel="alternate"][hreflang]')
    .forEach((el) => stale.set(el.getAttribute("hreflang"), el));

  list.forEach(({ hrefLang, href }) => {
    let el = stale.get(hrefLang);
    if (!el) {
      el = document.createElement("link");
      el.setAttribute("rel", "alternate");
      el.setAttribute("hreflang", hrefLang);
      document.head.appendChild(el);
    }
    el.setAttribute("href", href);
    stale.delete(hrefLang);
  });

  stale.forEach((el) => el.remove());
};

// Drop any page JSON-LD blocks left over from a previously rendered route beyond
// `keep`, so stale structured data never leaks across client-side navigations.
const pruneJsonLd = (keep) => {
  document.head
    .querySelectorAll('script[data-schema^="page-schema-"]')
    .forEach((el) => {
      const i = Number(el.getAttribute("data-schema").replace("page-schema-", ""));
      if (Number.isNaN(i) || i >= keep) el.remove();
    });
};

const Seo = ({
  title,
  description,
  path = "",
  image,
  type = "website",
  noindex = false,
  keywords = "",
  jsonLd = null,
  publishedTime = "",
  modifiedTime = "",
  section = "",
  // [{ hrefLang: "en-NZ", path: "/nz" }, …]. `path` is site-relative; an absolute
  // `href` is accepted too. Omit on pages that have no regional variants.
  alternates = null,
}) => {
  // Google renders roughly 60 characters of a title before truncating. Appending the
  // brand unconditionally pushed 9 of 14 pages past that, so the suffix was cut
  // mid-word and the keyword at the end of the title was lost — and pages that already
  // ended with the brand rendered it twice.
  //
  // The brand is kept whenever it fits and dropped when it would cost visible keyword
  // space. That trade is right while the brand has little recognition outside India:
  // on a non-branded query the keyword earns the click, not the company name.
  const TITLE_LIMIT = 60;
  const withBrand = `${title} | ${SITE_NAME}`;
  const fullTitle = !title
    ? SITE_NAME
    : title.includes(SITE_NAME)
      ? title
      : withBrand.length <= TITLE_LIMIT
        ? withBrand
        : title;
  const url = `${SITE_URL}${path}`;
  const ogImage = image
    ? (/^https?:\/\//i.test(image) ? image : `${SITE_URL}${image}`)
    : DEFAULT_IMAGE;

  // Serialised so an inline array literal does not re-run the effect on every render.
  const alternatesKey = JSON.stringify(alternates || []);

  useEffect(() => {
    document.title = fullTitle;

    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[name="robots"]', "name", "robots", noindex ? "noindex, follow" : "index, follow");
    upsertMeta('meta[name="keywords"]', "name", "keywords", keywords);
    upsertCanonical(url);

    // Each variant stays self-canonical; hreflang is what ties the cluster together.
    // Canonicalising a country page to the global one would erase it from the index.
    syncAlternates(
      (JSON.parse(alternatesKey) || []).map(({ hrefLang, path: altPath, href }) => ({
        hrefLang,
        href: /^https?:\/\//i.test(href || altPath || "")
          ? (href || altPath)
          : `${SITE_URL}${href || altPath || ""}`,
      }))
    );

    upsertMeta('meta[property="og:title"]', "property", "og:title", fullTitle);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:type"]', "property", "og:type", type);
    upsertMeta('meta[property="og:url"]', "property", "og:url", url);
    upsertMeta('meta[property="og:image"]', "property", "og:image", ogImage);
    upsertMeta('meta[property="og:image:width"]', "property", "og:image:width", "1200");
    upsertMeta('meta[property="og:image:height"]', "property", "og:image:height", "630");
    upsertMeta('meta[property="og:site_name"]', "property", "og:site_name", SITE_NAME);

    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", fullTitle);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", ogImage);

    // Article-only Open Graph tags — set on article pages, cleared elsewhere so
    // they never linger when navigating to a non-article route.
    const isArticle = type === "article";
    const articleMeta = [
      ['meta[property="article:published_time"]', "article:published_time", publishedTime],
      ['meta[property="article:modified_time"]', "article:modified_time", modifiedTime],
      ['meta[property="article:section"]', "article:section", section],
    ];
    articleMeta.forEach(([sel, key, content]) => {
      if (isArticle && content) upsertMeta(sel, "property", key, content);
      else removeMeta(sel);
    });

    const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
    schemas.forEach((schema, i) => upsertJsonLd(`page-schema-${i}`, schema));
    pruneJsonLd(schemas.length);
  }, [fullTitle, description, url, ogImage, type, noindex, keywords, jsonLd, publishedTime, modifiedTime, section, alternatesKey]);

  return null;
};

export default Seo;
