import { describe, it, expect } from "vitest";
import {
  OurServiceData, services, techStacks, NavbarservicesOptions, navbarOptions,
  companyStats, faqs, testimonials, processSteps, strengths, coreValues, team, partners,
} from "./index";

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
    expect(testimonials.length).toBeGreaterThanOrEqual(3);
    expect(processSteps.length).toBeGreaterThanOrEqual(5);
    expect(coreValues.length).toBeGreaterThanOrEqual(3);
    expect(team.length).toBeGreaterThanOrEqual(3);
    expect(partners.length).toBeGreaterThan(0);
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
