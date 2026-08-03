import { describe, it, expect } from "vitest";
import {
  OurServiceData, services, techStacks, NavbarservicesOptions, navbarOptions,
  companyStats, faqs, testimonials, clientProof, processSteps, strengths, coreValues, partners, Projects,
  SOCIAL_PROFILES, SAME_AS,
} from "./index";
import {
  team, publishedTeam, isTeamPublished, teamPersonSchema, articleAuthor, articleAuthorName, TEAM_PUBLISHED,
} from "./team";

describe("services data integrity", () => {
  it("every service card route maps to a real service page", () => {
    OurServiceData.forEach((s) => {
      expect(services[s.route], `missing service page for "${s.route}"`).toBeDefined();
    });
  });

  it("every service page has a matching tech stack and vice versa", () => {
    const serviceKeys = Object.keys(services).sort();
    const stackKeys = Object.keys(techStacks).sort();
    expect(stackKeys).toEqual(serviceKeys);
  });

  it("each service has a title, description, details and at least 3 features", () => {
    Object.entries(services).forEach(([key, s]) => {
      expect(s.title, key).toBeTruthy();
      expect(s.description, key).toBeTruthy();
      expect(s.details, key).toBeTruthy();
      expect(s.features?.length, key).toBeGreaterThanOrEqual(3);
    });
  });

  it("navbar service links point to valid service routes", () => {
    NavbarservicesOptions.forEach((opt) => {
      const slug = opt.path.replace("/service/", "");
      expect(services[slug], `navbar links to unknown service "${slug}"`).toBeDefined();
    });
  });

  it("every tech stack entry exposes a comma-separated techStack string", () => {
    Object.values(techStacks).forEach((group) => {
      group.stacks.forEach((stack) => {
        expect(typeof stack.techStack).toBe("string");
        expect(stack.techStack.split(",").length).toBeGreaterThan(0);
      });
    });
  });
});

describe("content quality", () => {
  it("contains no leftover Lorem ipsum placeholder copy", () => {
    const blob = JSON.stringify({ OurServiceData, services, faqs, testimonials, strengths, coreValues });
    expect(blob.toLowerCase()).not.toContain("lorem ipsum");
  });

  it("has non-empty marketing data sets", () => {
    expect(companyStats.length).toBe(4);
    expect(faqs.length).toBeGreaterThanOrEqual(5);
    expect(testimonials.length).toBeGreaterThanOrEqual(1);
    expect(clientProof.length).toBeGreaterThanOrEqual(5);
    expect(processSteps.length).toBeGreaterThanOrEqual(5);
    expect(coreValues.length).toBeGreaterThanOrEqual(3);
    expect(partners.length).toBeGreaterThan(0);
  });
  it("every portfolio project has imagery with alt text, copy, and tags", () => {
    expect(Projects.length).toBeGreaterThanOrEqual(6);
    Projects.forEach((p) => {
      expect(p.Heading, "project heading").toBeTruthy();
      expect(p.aboutProject?.length, `${p.Heading} description length`).toBeGreaterThan(120);
      expect(p.img?.length, `${p.Heading} images`).toBeGreaterThan(0);
      p.img.forEach((image) => {
        expect(image.src, `${p.Heading} image src`).toBeTruthy();
        expect(image.alt, `${p.Heading} image alt`).toBeTruthy();
      });
      expect(p.tags?.length, `${p.Heading} tags`).toBeGreaterThan(0);
    });
  });

  it("home page features exactly four highlighted projects", () => {
    expect(Projects.filter((p) => p.featured).length).toBe(4);
  });

  it("company stats each have a numeric value and a label", () => {
    companyStats.forEach((s) => {
      expect(typeof s.value).toBe("number");
      expect(s.label).toBeTruthy();
    });
  });

  it("primary navbar routes are well-formed", () => {
    const paths = navbarOptions.map((o) => o.path);
    expect(paths).toContain("/");
    expect(paths).toContain("/about");
    expect(paths).toContain("/portfolio");
    expect(paths).toContain("/contact");
  });
});

// Social proof is the one area where wrong content is a legal exposure rather than just
// a quality problem — fabricated testimonials breach Google's spam policies and the
// FTC's 2024 consumer-review rule — so it is guarded here rather than left to review.
describe("trust signals are genuine", () => {
  it("uses no stock or placeholder avatar services", () => {
    const blob = JSON.stringify({ testimonials, clientProof });
    ["pravatar", "placeholder.com", "randomuser.me", "thispersondoesnotexist"]
      .forEach((host) => expect(blob, `placeholder avatar source "${host}"`).not.toContain(host));
  });

  it("every testimonial is attributed to a named person and role", () => {
    testimonials.forEach((t) => {
      expect(t.name?.trim(), "testimonial name").toBeTruthy();
      expect(t.title?.trim(), `${t.name} role/company`).toBeTruthy();
      expect(t.review?.length, `${t.name} quote length`).toBeGreaterThan(60);
    });
  });

  it("uses no obviously invented placeholder identities", () => {
    const blob = JSON.stringify({ testimonials, clientProof }).toLowerCase();
    ["jane smith", "john doe", "john carter", "jane doe", "acme corp"]
      .forEach((name) => expect(blob, `placeholder identity "${name}"`).not.toContain(name));
  });

  it("every delivery-record entry states client, market, work and outcome", () => {
    clientProof.forEach((p) => {
      expect(p.client?.trim(), "client").toBeTruthy();
      expect(p.location?.trim(), `${p.client} location`).toBeTruthy();
      expect(p.work?.trim(), `${p.client} work`).toBeTruthy();
      expect(p.outcome?.trim(), `${p.client} outcome`).toBeTruthy();
      expect(p.discipline?.trim(), `${p.client} discipline`).toBeTruthy();
    });
  });

  // These are whole-business figures, so they are NOT capped by what /portfolio shows —
  // featured work is a subset of delivered work, and an earlier version of this test
  // wrongly used Projects.length as a ceiling. What is still worth enforcing is the
  // shape of the claims: rounded, never below the evidence, and free of the precise
  // percentages that read as invented.
  it("company stats are rounded claims, not false precision", () => {
    companyStats.forEach((s) => {
      expect(Number.isInteger(s.value), `${s.label} should be a whole number`).toBe(true);
      expect(s.value, `${s.label} should be a positive figure`).toBeGreaterThan(0);
      // Any figure the site cannot itself corroborate must carry "+", so it reads as
      // "at least this" rather than an exact count a prospect could try to audit.
      expect(["", "+"], `${s.label} uses an unexpected suffix`).toContain(s.suffix);
    });
  });

  it("claims no fewer projects or clients than the site already shows", () => {
    const byLabel = Object.fromEntries(companyStats.map((s) => [s.label, s.value]));
    // The floor, not the ceiling: publishing more work than the headline claims would
    // make the stat look stale and understate the business.
    expect(byLabel["Projects delivered"], "portfolio shows more projects than the stat claims")
      .toBeGreaterThanOrEqual(Projects.length);
    expect(byLabel["Clients served"], "more client logos shown than the stat claims")
      .toBeGreaterThanOrEqual(partners.length);
  });

  it("states no satisfaction or retention percentage", () => {
    companyStats.forEach((s) => {
      expect(s.suffix, `${s.label} claims a percentage`).not.toBe("%");
      expect(s.label, `${s.label} implies a tracked satisfaction metric`)
        .not.toMatch(/satisfaction|retention|success rate|on-time/i);
    });
  });

  it("counts exactly the service areas the navigation offers", () => {
    const byLabel = Object.fromEntries(companyStats.map((s) => [s.label, s.value]));
    // Exact by design: claiming more service areas than there are service pages is a
    // contradiction a visitor finds in one click.
    expect(byLabel["Core service areas"]).toBe(OurServiceData.length);
  });
});

// The team section is the one place on the site that will describe real, named people.
// Publishing invented colleagues would misrepresent the company to buyers, and emitting
// Person schema for people who do not exist is the fabricated-authority signal Google's
// spam policies target. The gate is therefore tested, not merely commented.
describe("team data cannot publish placeholders", () => {
  it("never exposes a member still marked as a placeholder", () => {
    publishedTeam.forEach((m) => {
      expect(m.placeholder, `${m.id} is still a placeholder but is in publishedTeam`).toBeFalsy();
    });
  });

  it("emits no Person schema unless the team is genuinely published", () => {
    if (!isTeamPublished()) {
      expect(teamPersonSchema(), "Person schema emitted while team is unpublished").toEqual([]);
    } else {
      expect(teamPersonSchema().length).toBe(publishedTeam.length);
    }
  });

  it("requires the flag AND at least one real member before publishing", () => {
    expect(isTeamPublished()).toBe(TEAM_PUBLISHED && publishedTeam.length > 0);
  });

  it("carries no bracketed placeholder names once published", () => {
    publishedTeam.forEach((m) => {
      expect(m.name, `${m.id} name still looks like a placeholder`).not.toMatch(/^\[.*\]$/);
    });
  });

  it("gives every member the fields the card and schema both need", () => {
    team.forEach((m) => {
      expect(m.id?.trim(), "member id").toBeTruthy();
      expect(m.role?.trim(), `${m.id} role`).toBeTruthy();
      expect(m.bio?.trim(), `${m.id} bio`).toBeTruthy();
      expect(Array.isArray(m.expertise) && m.expertise.length, `${m.id} expertise`).toBeTruthy();
    });
  });

  it("falls back to the Organization byline while unpublished", () => {
    const author = articleAuthor();
    if (isTeamPublished()) {
      expect(author["@type"]).toBe("Person");
    } else {
      expect(author["@type"], "named author claimed before the team is published").toBe("Organization");
      expect(articleAuthorName()).toBe("Futurise Solutions");
    }
  });
});

// sameAs is a primary entity-disambiguation signal, and this brand sits one character
// from Futurice. The footer and the schema previously disagreed — X was linked in one
// and absent from the other — so the two are now derived from one list and checked here.
describe("social profiles feed schema.org sameAs", () => {
  it("exposes every footer profile as a sameAs URL", () => {
    expect(SAME_AS.length).toBe(SOCIAL_PROFILES.length);
    SOCIAL_PROFILES.forEach((p) => expect(SAME_AS).toContain(p.href));
  });

  it("uses absolute https URLs only", () => {
    SAME_AS.forEach((url) => expect(url, `${url} is not an absolute https URL`).toMatch(/^https:\/\//));
  });

  it("contains no duplicate profiles", () => {
    expect(new Set(SAME_AS).size).toBe(SAME_AS.length);
  });
});
