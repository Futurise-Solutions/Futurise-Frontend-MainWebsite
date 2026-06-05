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
import { CTASection } from "../Components/common";
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
