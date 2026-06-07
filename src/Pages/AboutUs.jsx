import React from "react";
import { Box } from "@chakra-ui/react";
import { AboutUsHero, MissionVision, CompanyStats } from "../Components";
import CoreValues from "../Components/AboutUs Components/CoreValues";
import TechnologyExcellence from "../Components/ContactCusCpmponents/TechnologyExcellence";
import { CTASection, Seo } from "../Components/common";

const AboutUs = () => {
  return (
    <Box>
      <Seo
        title="About Us — Full-Cycle Digital Product Studio"
        description="Meet Futurise Solutions: a senior team of designers and engineers building web, mobile, and Web3 products for ambitious brands across India and the USA. Learn about our mission, values, and technology expertise."
        path="/about"
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
      />
    </Box>
  );
};

export default AboutUs;
