import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import {
  Aboutus,
  ClientsReviews,
  CompanyStats,
  HeroSection,
  OurProjects,
  OurServices,
  Partners,
  Process,
  WhyChooseUs,
} from "../Components";
import Faqs from "../Components/HomePage Components/Faqs";
import { CTASection, Seo } from "../Components/common";
import LoadingIndicator from "../Components/LoadingComponent/LoadingIndicator";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(() => !sessionStorage.getItem("hasVisited"));

  useEffect(() => {
    if (isLoading) {
      sessionStorage.setItem("hasVisited", "true");
      const timer = setTimeout(() => setIsLoading(false), 1400);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <Box>
      <Seo
        title="Web, Mobile & Web3 Product Studio for India & USA"
        description="Futurise Solutions is a full-cycle digital product studio building high-performing web, mobile, and Web3 products for businesses in India and the USA — web & app development, UI/UX design, blockchain, smart contracts, and digital marketing."
        path="/"
      />
      {isLoading && <LoadingIndicator />}
      <HeroSection />
      <Partners />
      <CompanyStats />
      <Aboutus />
      <OurServices />
      <WhyChooseUs />
      <Process />
      <OurProjects />
      <ClientsReviews />
      <Faqs />
      <CTASection />
    </Box>
  );
};

export default HomePage;
