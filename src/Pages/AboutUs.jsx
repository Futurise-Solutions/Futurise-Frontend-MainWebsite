import React from "react";
import { Box } from "@chakra-ui/react";
import { AboutUsHero, MissionVision, CompanyStats } from "../Components";
import CoreValues from "../Components/AboutUs Components/CoreValues";
import Team from "../Components/AboutUs Components/Team";
import TechnologyExcellence from "../Components/ContactCusCpmponents/TechnologyExcellence";
import { CTASection } from "../Components/common";

const AboutUs = () => {
  return (
    <Box>
      <AboutUsHero />
      <CompanyStats />
      <MissionVision />
      <CoreValues />
      <TechnologyExcellence />
      <Team />
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
