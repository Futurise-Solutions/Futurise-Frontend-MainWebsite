import { useEffect } from "react";

const SITE_NAME = "Futurise Solutions";
const SITE_URL = "https://futurisesolutions.com";
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

const Seo = ({
  title,
  description,
  path = "",
  image,
  type = "website",
  noindex = false,
  keywords = "",
  jsonLd = null,
}) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const url = `${SITE_URL}${path}`;
  const ogImage = image ? `${SITE_URL}${image}` : DEFAULT_IMAGE;

  useEffect(() => {
    document.title = fullTitle;

    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[name="robots"]', "name", "robots", noindex ? "noindex, follow" : "index, follow");
    upsertMeta('meta[name="keywords"]', "name", "keywords", keywords);
    upsertCanonical(url);

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

    if (jsonLd) {
      const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      schemas.forEach((schema, i) => upsertJsonLd(`page-schema-${i}`, schema));
    }
  }, [fullTitle, description, url, ogImage, type, noindex, keywords, jsonLd]);

  return null;
};

export default Seo;
