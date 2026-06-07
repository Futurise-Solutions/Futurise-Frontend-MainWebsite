import { useEffect } from "react";

/**
 * Lightweight, dependency-free SEO head manager.
 * Sets the document <title>, description, canonical, and Open Graph / Twitter
 * tags per route. Tags are created once and reused, then restored on unmount so
 * client-side navigation always reflects the active page.
 */

const SITE_NAME = "Futurise Solutions";
const SITE_URL = "https://futurisetechnologies.com";
const DEFAULT_IMAGE = `${SITE_URL}/og-cover.png`;

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

const Seo = ({ title, description, path = "", image = DEFAULT_IMAGE, type = "website", noindex = false }) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const url = `${SITE_URL}${path}`;

  useEffect(() => {
    document.title = fullTitle;

    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[name="robots"]', "name", "robots", noindex ? "noindex, follow" : "index, follow");
    upsertCanonical(url);

    upsertMeta('meta[property="og:title"]', "property", "og:title", fullTitle);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:type"]', "property", "og:type", type);
    upsertMeta('meta[property="og:url"]', "property", "og:url", url);
    upsertMeta('meta[property="og:image"]', "property", "og:image", image);
    upsertMeta('meta[property="og:site_name"]', "property", "og:site_name", SITE_NAME);

    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", fullTitle);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", image);
  }, [fullTitle, description, url, image, type, noindex]);

  return null;
};

export default Seo;
