/**
 * Team / leadership data
 * ======================
 * The site currently names no human being. The only person identified anywhere on it is
 * a client. For a services company that is the single largest trust gap on the site:
 *
 *   - Buyers hire people, not logos. "Who will actually build this?" is the first
 *     question on a discovery call and the site answers it nowhere.
 *   - Google's E-E-A-T guidance treats identifiable, credentialed authors and operators
 *     as a quality signal. An anonymous agency site competing against 20-year incumbents
 *     starts from behind on exactly that axis.
 *   - AI answer engines cite sources they can attribute. An unattributed page is a
 *     weaker citation candidate than one with a named, linkable expert behind it.
 *
 * ── HOW TO PUBLISH ──────────────────────────────────────────────────────────────────
 * 1. Fill in `name`, `image`, `linkedin` (and tighten `bio`) for each member below.
 * 2. Delete `placeholder: true` from every member whose details are real.
 * 3. Set `TEAM_PUBLISHED` to `true`.
 * 4. Delete any member entries you don't need — the grid adapts to the count.
 *
 * Owner rule (Nov 2026): the team is not shown on this site. Leave TEAM_PUBLISHED false.
 *
 * Until step 3, the section renders in local development only, so the layout can be
 * reviewed, and never appears in a production build. That gate is deliberate: publishing
 * invented colleagues would misrepresent the company to buyers, and emitting Person
 * schema for people who do not exist is precisely the kind of fabricated-authority
 * signal Google's spam policies target. Both effects are worse than having no section.
 */

/** Flip to `true` once every member below carries real details. Owner rule (Nov 2026): the team is not shown on this site. Leave TEAM_PUBLISHED false. */
export const TEAM_PUBLISHED = false;

/** Images live in /public so paths stay stable and are usable in schema.org absolute URLs. */
const IMAGE_BASE = "/team";

export const team = [
  {
    id: "founder",
    // ↓ Replace with the real name.
    name: "[Founder Name]",
    role: "Founder & Director",
    // Keep bios factual and specific. Vague seniority claims ("10+ years of excellence")
    // read as filler; a concrete focus reads as a person you could actually brief.
    bio: "Leads client strategy and delivery, and sets the technical direction for AI, SaaS and product engagement.",
    expertise: ["Product strategy", "AI systems", "Delivery"],
    image: `${IMAGE_BASE}/founder.jpg`,
    linkedin: "",
    placeholder: true,
  },
  {
    id: "engineering-lead",
    name: "[Engineering Lead Name]",
    role: "Engineering Lead",
    bio: "Owns architecture and code quality across web, mobile and backend builds, from first commit to production.",
    expertise: ["React & Next.js", "Node.js", "Cloud architecture"],
    image: `${IMAGE_BASE}/engineering-lead.jpg`,
    linkedin: "",
    placeholder: true,
  },
  {
    id: "design-lead",
    name: "[Design Lead Name]",
    role: "Design Lead",
    bio: "Runs UX research, interface design and design systems, turning product requirements into interfaces people finish using.",
    expertise: ["UX research", "UI design", "Design systems"],
    image: `${IMAGE_BASE}/design-lead.jpg`,
    linkedin: "",
    placeholder: true,
  },
];

/** Members safe to show publicly: real details only. */
export const publishedTeam = team.filter((m) => !m.placeholder);

/**
 * Whether the section should render for real visitors. Requires both the explicit flag
 * and at least one member with real details, so flipping the flag before filling the
 * data in cannot publish placeholders by accident.
 */
export const isTeamPublished = () => TEAM_PUBLISHED && publishedTeam.length > 0;

/** Initials for the avatar fallback when a photo is missing or fails to load. */
export const initialsOf = (name = "") =>
  name
    .replace(/[[\]]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

const SITE_URL = "https://www.futurisesolutions.com";

/**
 * schema.org `Person` nodes for published members, tied to the Organization node so the
 * relationship is explicit rather than inferred. Returns `[]` while unpublished — never
 * describe people to search engines before they are real.
 */
export const teamPersonSchema = () =>
  isTeamPublished()
    ? publishedTeam.map((m) => ({
        "@type": "Person",
        "@id": `${SITE_URL}/about#${m.id}`,
        name: m.name,
        jobTitle: m.role,
        description: m.bio,
        ...(m.image ? { image: `${SITE_URL}${m.image}` } : {}),
        ...(m.linkedin ? { sameAs: [m.linkedin] } : {}),
        knowsAbout: m.expertise,
        worksFor: { "@id": `${SITE_URL}/#organization` },
      }))
    : [];

/**
 * The person credited as author on blog articles. Falls back to the Organization while
 * the team is unpublished — an Organization author is weaker than a named Person for
 * E-E-A-T, but it is accurate, which a fabricated byline would not be.
 */
export const articleAuthor = () => {
  const lead = publishedTeam[0];
  return isTeamPublished() && lead
    ? { "@type": "Person", "@id": `${SITE_URL}/about#${lead.id}`, name: lead.name, url: `${SITE_URL}/about` }
    : { "@type": "Organization", name: "Futurise Solutions", url: SITE_URL };
};

/** Human-readable byline for the article header. */
export const articleAuthorName = () => {
  const lead = publishedTeam[0];
  return isTeamPublished() && lead ? lead.name : "Futurise Solutions";
};
