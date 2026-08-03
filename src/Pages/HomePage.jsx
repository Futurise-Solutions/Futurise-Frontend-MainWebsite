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
        // 85 characters with the brand suffix, so Google cut it mid-phrase and the
        // trailing markets never rendered. "India" is also dropped from the title: it
        // reads as offshore delivery to a New Zealand or US buyer scanning results,
        // while adding nothing in India, where the traffic is already branded search.
        title="AI, SaaS & Web App Development Company — NZ, UAE & USA"
        description="Futurise Solutions builds AI agents, SaaS platforms, web and mobile apps end-to-end. Fixed-scope quotes, not hourly billing. Book a free 45-minute consultation."
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
