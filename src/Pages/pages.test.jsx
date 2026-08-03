import { describe, it, expect, vi } from "vitest";
import { Routes, Route } from "react-router-dom";
import { renderWithProviders, screen } from "../test/test-utils";
import HeroSection from "../Components/HomePage Components/HeroSection";
import NotFound from "./NotFound";
import ServicePage from "./ServicePage";
import { CTASection, ContactForm, SectionHeading } from "../Components/common";
import TeamSection from "../Components/AboutUs Components/TeamSection";
import { team, initialsOf } from "../utils/Constant/team";

// emailjs makes a network call — mock it for the ContactForm test.
vi.mock("@emailjs/browser", () => ({
  default: { sendForm: vi.fn(() => Promise.resolve({ status: 200, text: "OK" })) },
}));

describe("HeroSection", () => {
  it("renders the main headline and CTAs", () => {
    renderWithProviders(<HeroSection />);
    expect(screen.getByText(/We build the future/i)).toBeInTheDocument();
    expect(screen.getByText("Start your project")).toBeInTheDocument();
    expect(screen.getByText("View our work")).toBeInTheDocument();
  });
});

describe("NotFound", () => {
  it("renders a 404 message", () => {
    renderWithProviders(<NotFound />);
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Back home")).toBeInTheDocument();
  });
});

describe("ServicePage", () => {
  const renderAt = (slug) =>
    renderWithProviders(
      <Routes>
        <Route path="/service/:serviceName" element={<ServicePage />} />
      </Routes>,
      { route: `/service/${slug}` }
    );

  it("renders details for a valid service slug", () => {
    renderAt("web-development");
    expect(screen.getAllByText(/Web Development/i).length).toBeGreaterThan(0);
    expect(screen.getByText("What’s included")).toBeInTheDocument();
  });

  it("shows the 404 page for an unknown service slug", () => {
    renderAt("does-not-exist");
    expect(screen.getByText("404")).toBeInTheDocument();
  });
});

describe("SectionHeading", () => {
  it("renders title, highlight and subtitle", () => {
    renderWithProviders(
      <SectionHeading eyebrow="Eyebrow" title="Main title" highlight="accent" subtitle="A subtitle" />
    );
    expect(screen.getByText("Eyebrow")).toBeInTheDocument();
    expect(screen.getByText(/Main title/)).toBeInTheDocument();
    expect(screen.getByText("accent")).toBeInTheDocument();
    expect(screen.getByText("A subtitle")).toBeInTheDocument();
  });
});

describe("CTASection", () => {
  it("renders default conversion copy and buttons", () => {
    renderWithProviders(<CTASection />);
    expect(screen.getByText("Get a free quote")).toBeInTheDocument();
    expect(screen.getByText("View our work")).toBeInTheDocument();
  });
});

describe("ContactForm", () => {
  it("renders all required fields and a submit button", () => {
    renderWithProviders(<ContactForm />);
    expect(screen.getByPlaceholderText("Your name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tell us about your project/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Send message/i })).toBeInTheDocument();
  });
});

// TeamSection is invisible in production until TEAM_PUBLISHED is flipped, so a crash in
// it would go unnoticed right up until the moment it goes live in front of buyers.
describe("TeamSection", () => {
  it("renders the roster without crashing and shows a heading per member", () => {
    renderWithProviders(<TeamSection />);
    // Vitest runs with DEV semantics, so the preview branch renders every member.
    team.forEach((m) => {
      expect(screen.getByText(m.role), `role "${m.role}" missing`).toBeInTheDocument();
    });
  });

  it("falls back to initials when a member has no usable photo", () => {
    renderWithProviders(<TeamSection />);
    // Placeholder members must never request an image; they show initials instead.
    team
      .filter((m) => m.placeholder)
      .forEach((m) => {
        expect(screen.getByText(initialsOf(m.name)), `initials for ${m.id}`).toBeInTheDocument();
      });
  });
});
