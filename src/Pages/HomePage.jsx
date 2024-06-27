import React, { useEffect, useState } from "react";
import {
  Aboutus,
  ClientsReviews,
  HeroSection,
  OurProjects,
  OurServices,
  Partners,
  WhyChooseUs,
} from "../Components";
import Faqs from "../Components/HomePage Components/Faqs";
import { Box } from "@chakra-ui/react";
import LoadingIndicator from "../Components/LoadingComponent/LoadingIndicator";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const hasVisited = sessionStorage.getItem('hasVisited');

      if (!hasVisited) {
          sessionStorage.setItem('hasVisited', 'true');

          // Simulate a network request
          const timer = setTimeout(() => {
              setIsLoading(false);
          }, 2000); // Adjust the timeout as needed

          return () => clearTimeout(timer);
      } else {
          setIsLoading(false);
      }
  }, []);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);


  return (
    <Box>
      
      {isLoading && <LoadingIndicator />}
      <HeroSection />
      <Aboutus />
      <OurServices />
      <OurProjects />
      <WhyChooseUs />
      <ClientsReviews />
      <Partners />
      <Faqs />
    </Box>
  );
};

export default HomePage;
