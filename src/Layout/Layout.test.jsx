import { describe, it, expect } from "vitest";
import { renderWithProviders, screen } from "../test/test-utils";
import Navbar from "./Navbar";
import Footer from "./Footer";

describe("Navbar", () => {
  it("renders the brand and primary navigation links", () => {
    renderWithProviders(<Navbar />);
    expect(screen.getAllByAltText(/Futurise/i).length).toBeGreaterThan(0);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Portfolio")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Get a quote")).toBeInTheDocument();
  });
});

describe("Footer", () => {
  it("renders columns, contact details and the current year", () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText(/Get in touch/i)).toBeInTheDocument();
    expect(screen.getByText(/business@futurisesolutions\.com/)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`${new Date().getFullYear()}`))
    ).toBeInTheDocument();
  });
});
