import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Box, Spinner, Text, VStack } from "@chakra-ui/react";

// Lazy load all page components
const HomePage = lazy(() => import("../Pages/HomePage"));
const Contactus = lazy(() => import("../Pages/ContactusPage"));
const AboutUs = lazy(() => import("../Pages/AboutUs"));
const Portfolio = lazy(() => import("../Pages/Portfolio"));
const ServiceSingalPage = lazy(() => import("../Pages/ServicePage"));
const BlogsPage = lazy(() => import("../Pages/BlogsPage"));
const BlogDetailPage = lazy(() => import("../Pages/BlogDetailPage"));
const AdminBlogPage = lazy(() => import("../Pages/AdminBlogPage"));
const PricingGuide = lazy(() => import("../Pages/PricingGuide"));
const PrivacyPolicy = lazy(() => import("../Pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("../Pages/TermsConditions"));
const CaseStudiesPage = lazy(() => import("../Pages/CaseStudiesPage"));
const CaseStudyDetailPage = lazy(() => import("../Pages/CaseStudyDetailPage"));
const NotFound = lazy(() => import("../Pages/NotFound"));

const LoadingSpinner = () => (
  <Box minH="70vh" display="grid" placeItems="center">
    <VStack spacing={4}>
      <Spinner thickness="3px" speed="0.7s" size="xl" color="brand.400" emptyColor="rgba(255,255,255,0.08)" />
      <Text color="text.muted" fontSize="sm">Loading…</Text>
    </VStack>
  </Box>
);

const AllRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/service/:serviceName" element={<ServiceSingalPage />} />
        <Route path="/blog" element={<BlogsPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/case-studies/ai-support-agent" element={<CaseStudyDetailPage slug="ai-support-agent" />} />
        <Route path="/case-studies/saas-platform-scale" element={<CaseStudyDetailPage slug="saas-platform-scale" />} />
        <Route path="/case-studies/real-estate-app" element={<CaseStudyDetailPage slug="real-estate-app" />} />
        <Route path="/case-studies/fintech-ux-redesign" element={<CaseStudyDetailPage slug="fintech-ux-redesign" />} />
        <Route path="/case-studies/defi-protocol-launch" element={<CaseStudyDetailPage slug="defi-protocol-launch" />} />
        <Route path="/case-studies/saas-seo-growth" element={<CaseStudyDetailPage slug="saas-seo-growth" />} />
        <Route path="/futurise-admin/blog" element={<AdminBlogPage />} />
        <Route path="/pricing" element={<PricingGuide />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AllRoutes;
