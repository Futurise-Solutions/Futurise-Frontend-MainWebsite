import React from "react";
import { Box } from "@chakra-ui/react";
import { AboutUsHero, MissionVision, CompanyStats } from "../Components";
import CoreValues from "../Components/AboutUs Components/CoreValues";
import TeamSection from "../Components/AboutUs Components/TeamSection";
import TechnologyExcellence from "../Components/ContactCusCpmponents/TechnologyExcellence";
import { CTASection, Seo } from "../Components/common";
import { AREAS_SERVED, SAME_AS } from "../utils/Constant";
import { teamPersonSchema, isTeamPublished } from "../utils/Constant/team";
import { useBooking } from "../context/BookingContext";

// Names the markets with delivered client work. This previously read "for ambitious
// brands in New Zealand, India & USA" — there is no delivered New Zealand work, and the
// meta description is exactly what a prospect reads in the search result.
const META_DESCRIPTION =
  "Meet Futurise Solutions — a senior team building AI agents, SaaS platforms, web apps, mobile apps & Web3 products. Registered in Wellington, New Zealand, with delivered work across the UAE, USA and India. Our mission, values & tech expertise.";

const AboutUs = () => {
  const { onOpen: openBooking } = useBooking();
  return (
    <Box>
      <Seo
        title="About Us — AI & Web Development Studio | Futurise Solutions"
        description={META_DESCRIPTION}
        path="/about"
        image="/about.png"
        keywords="about Futurise Solutions, AI development team, web development company, mobile app developers, blockchain team, New Zealand tech agency, digital product studio"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Futurise Solutions",
            "url": "https://www.futurisesolutions.com/about",
            "description": "Senior team building AI, SaaS, web and mobile products. Registered in Wellington, New Zealand, with delivered client work in the United Arab Emirates, the United States and India.",
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
            // `numberOfEmployees: { minValue: 10 }` removed. Nothing on the site supports
            // it, the published stats describe 6 core service areas, and a headcount
            // claim is exactly the kind of assertion a prospect checks on LinkedIn.
            "address": { "@type": "PostalAddress", "streetAddress": "Huddart Parker Building", "addressLocality": "Wellington Central", "postalCode": "6011", "addressCountry": "NZ" },
            "areaServed": AREAS_SERVED,
            "knowsAbout": ["Artificial Intelligence", "Machine Learning", "SaaS Development", "Web Development", "Mobile App Development", "UI UX Design", "Blockchain Development", "Digital Marketing"],
            "sameAs": SAME_AS,
            // `employee` links the Organization to named people. Spread rather than set
            // unconditionally: while the team is unpublished this contributes nothing,
            // and an empty array is a worse signal than an absent property.
            ...(isTeamPublished()
              ? { "employee": teamPersonSchema().map((p) => ({ "@id": p["@id"] })) }
              : {})
          },
          // Person nodes, emitted only once real details are filled in. See
          // src/utils/Constant/team.js — describing invented people to search engines is
          // the fabricated-authority signal Google's spam policies target.
          ...teamPersonSchema().map((person) => ({ "@context": "https://schema.org", ...person }))
        ]}
      />
      <AboutUsHero />
      <CompanyStats />
      <MissionVision />
      <CoreValues />
      <TeamSection />
      <TechnologyExcellence />
      <CTASection
        eyebrow="Let’s work together"
        title="Ready to build something"
        highlight="exceptional?"
        subtitle="Tell us about your idea and we’ll help you turn it into a product your users will love."
        primaryLabel="Book a free call"
        onPrimary={() => openBooking("about-cta")}
      />
    </Box>
  );
};

export default AboutUs;
