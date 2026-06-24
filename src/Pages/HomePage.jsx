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
import LatestBlogs from "../Components/blog/LatestBlogs";
import { CTASection, Seo } from "../Components/common";
import { faqs } from "../utils/Constant";
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
        title="AI, SaaS & Web App Development Studio | New Zealand, India & USA"
        description="Futurise Solutions builds AI agents, SaaS platforms, web apps, mobile apps & Web3 products end-to-end. Serving clients in New Zealand, India & USA. Get a free quote today."
        path="/"
        image="/home.png"
        keywords="AI app development, SaaS development, web development company, mobile app development, React Native, blockchain development, Web3, AI agents, digital marketing, New Zealand, India, USA, Futurise Solutions"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Futurise Solutions — AI, SaaS & Web App Development Studio",
            "url": "https://www.futurisesolutions.com/",
            "description": "Futurise Solutions builds AI agents, SaaS platforms, web apps, mobile apps & Web3 products end-to-end.",
            "isPartOf": { "@id": "https://www.futurisesolutions.com/#website" },
            "about": { "@id": "https://www.futurisesolutions.com/#organization" },
            "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.futurisesolutions.com/" }] }
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((f) => ({
              "@type": "Question",
              "name": f.question,
              "acceptedAnswer": { "@type": "Answer", "text": f.answer },
            })),
          }
        ]}
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
      <LatestBlogs />
    </Box>
  );
};

export default HomePage;
