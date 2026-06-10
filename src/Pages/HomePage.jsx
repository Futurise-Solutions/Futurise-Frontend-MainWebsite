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
            "url": "https://futurisesolutions.com/",
            "description": "Futurise Solutions builds AI agents, SaaS platforms, web apps, mobile apps & Web3 products end-to-end.",
            "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://futurisesolutions.com/" }] }
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "What services does Futurise Solutions offer?", "acceptedAnswer": { "@type": "Answer", "text": "We offer AI & ML solutions, web development, mobile app development, UI/UX design, blockchain development, and digital marketing." } },
              { "@type": "Question", "name": "How much does a project cost?", "acceptedAnswer": { "@type": "Answer", "text": "Every project is scoped individually. After a free consultation we send a transparent fixed-scope estimate. Most engagements start from a small discovery phase." } },
              { "@type": "Question", "name": "How long does it take to build a product?", "acceptedAnswer": { "@type": "Answer", "text": "A focused MVP typically takes 6–12 weeks, while larger platforms run 3–6 months. We work in two-week agile sprints." } },
              { "@type": "Question", "name": "Do you work with clients in New Zealand?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we are based in Wellington, New Zealand and serve clients across NZ, India, the USA, and worldwide." } }
            ]
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
    </Box>
  );
};

export default HomePage;
