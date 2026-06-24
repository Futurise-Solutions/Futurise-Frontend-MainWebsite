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
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Futurise Solutions",
            "url": "https://www.futurisesolutions.com/about",
            "description": "Senior team building AI, SaaS, web & mobile products for clients in New Zealand, India and USA.",
            "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.futurisesolutions.com/" }, { "@type": "ListItem", "position": 2, "name": "About", "item": "https://www.futurisesolutions.com/about" }] },
            "mainEntity": { "@id": "https://www.futurisesolutions.com/#organization" }
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://www.futurisesolutions.com/#organization",
            "name": "Futurise Solutions",
            "url": "https://www.futurisesolutions.com",
            "logo": "https://www.futurisesolutions.com/favicon-new.png",
            "slogan": "Full-cycle digital product studio",
            "description": "Futurise Solutions is a full-cycle digital product studio building AI & ML systems, SaaS platforms, web and mobile apps, UI/UX design, blockchain, and digital marketing.",
            "foundingDate": "2024",
            "email": "business@futurisesolutions.com",
            "telephone": "+91-7665013356",
            "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 10 },
            "address": { "@type": "PostalAddress", "streetAddress": "Huddart Parker Building", "addressLocality": "Wellington Central", "postalCode": "6011", "addressCountry": "NZ" },
            "areaServed": ["New Zealand", "India", "United States", "United Kingdom", "Australia", "United Arab Emirates", "Canada", "Worldwide"],
            "knowsAbout": ["Artificial Intelligence", "Machine Learning", "SaaS Development", "Web Development", "Mobile App Development", "UI UX Design", "Blockchain Development", "Digital Marketing"],
            "sameAs": [
              "https://www.linkedin.com/company/futurisesolutions/",
              "https://www.instagram.com/futurisesolutions",
              "https://www.facebook.com/share/1E6xe2C5DW/"
            ]
          }
        ]}
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
