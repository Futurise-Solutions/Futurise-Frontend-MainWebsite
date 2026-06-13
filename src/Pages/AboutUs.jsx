import React from "react";
import { Box } from "@chakra-ui/react";
import { AboutUsHero, MissionVision, CompanyStats } from "../Components";
import CoreValues from "../Components/AboutUs Components/CoreValues";
import TechnologyExcellence from "../Components/ContactCusCpmponents/TechnologyExcellence";
import { CTASection, Seo } from "../Components/common";
import { useBooking } from "../context/BookingContext";

const AboutUs = () => {
  const { onOpen: openBooking } = useBooking();
  return (
    <Box>
      <Seo
        title="About Us — AI & Web Development Studio | Futurise Solutions"
        description="Meet Futurise Solutions — a senior team building AI agents, SaaS platforms, web apps, mobile apps & Web3 products for ambitious brands in New Zealand, India & USA. Our mission, values & tech expertise."
        path="/about"
        image="/about.png"
        keywords="about Futurise Solutions, AI development team, web development company, mobile app developers, blockchain team, New Zealand tech agency, digital product studio"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Futurise Solutions",
          "url": "https://futurisesolutions.com/about",
          "description": "Senior team building AI, SaaS, web & mobile products for clients in New Zealand, India and USA.",
          "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://futurisesolutions.com/" }, { "@type": "ListItem", "position": 2, "name": "About", "item": "https://futurisesolutions.com/about" }] }
        }}
      />
      <AboutUsHero />
      <CompanyStats />
      <MissionVision />
      <CoreValues />
      <TechnologyExcellence />
      <CTASection
        eyebrow="Let’s work together"
        title="Ready to build something"
        highlight="exceptional?"
        subtitle="Tell us about your idea and we’ll help you turn it into a product your users will love."
        primaryLabel="Book a free call"
        onPrimary={openBooking}
      />
    </Box>
  );
};

export default AboutUs;
