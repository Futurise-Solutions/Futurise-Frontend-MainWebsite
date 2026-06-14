/** Format an ISO date string as e.g. "June 14, 2026". */
export const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "";

/** Estimate read time in minutes from markdown/plain content (~200 wpm). */
export const readTime = (content = "") =>
  Math.max(1, Math.ceil(String(content).trim().split(/\s+/).filter(Boolean).length / 200));

/** Parse `##`/`###` headings out of markdown for a table of contents. */
export const parseHeadings = (markdown = "") => {
  const out = [];
  String(markdown)
    .split("\n")
    .forEach((line) => {
      const m = /^(#{2,3})\s+(.*)$/.exec(line.trim());
      if (m) {
        const text = m[2].replace(/[#*`]/g, "").trim();
        const id = text.toLowerCase().replace(/[^\w]+/g, "-").replace(/^-+|-+$/g, "");
        out.push({ level: m[1].length, text, id });
      }
    });
  return out;
};
