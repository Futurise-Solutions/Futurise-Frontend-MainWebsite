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
const PrivacyPolicy = lazy(() => import("../Pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("../Pages/TermsConditions"));
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
        <Route path="/futurise-admin/blog" element={<AdminBlogPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AllRoutes;
