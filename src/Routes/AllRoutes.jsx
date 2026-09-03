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

// Country landing pages. Each one must also be added to `buildRouteList()` in
// prerender.js — a route registered here but missing there ships a hard 404 in
// production, because the wildcard rewrites that used to mask that were removed.
const NewZealandPage = lazy(() => import("../Pages/NewZealandPage"));
const UnitedStatesPage = lazy(() => import("../Pages/UnitedStatesPage"));
const AustraliaPage = lazy(() => import("../Pages/AustraliaPage"));
const CanadaPage = lazy(() => import("../Pages/CanadaPage"));
const UAEPage = lazy(() => import("../Pages/UAEPage"));
// Europe is a REGION page, not a country page: it is deliberately outside the COUNTRIES
// registry and the hreflang cluster. See src/Pages/EuropePage.jsx for why.
const EuropePage = lazy(() => import("../Pages/EuropePage"));

/*
 * Suspense fallback for the lazily-loaded route chunks.
 *
 * The height here is a Core Web Vitals decision, not a cosmetic one.
 *
 * At `minH: 70vh` this box was 630px tall, so the footer rendered at y=742 — on screen,
 * just below the fold. When the real route resolved ~320ms later the document grew to
 * ~10,300px and the footer was pushed down by more than 8,000px. The browser scored that
 * displacement as a single layout shift of 0.1756, which was essentially the entire
 * 0.18 CLS measured on every route: same fallback, same shift, every page.
 *
 * `100vh` keeps the footer just past the bottom of the viewport while the chunk loads,
 * so its later move happens entirely off-screen. CLS only counts shifts of content
 * visible in the viewport, which takes the shift out of the score rather than merely
 * making it smaller — measured 0.1812 -> 0.0056 on the home page.
 *
 * Do not reduce this below 100vh without re-measuring CLS. Anything that lets the footer
 * paint inside the viewport before the route mounts brings the whole shift back.
 */
const LoadingSpinner = () => (
  <Box minH="100vh" display="grid" placeItems="center">
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
        <Route path="/nz" element={<NewZealandPage />} />
        <Route path="/us" element={<UnitedStatesPage />} />
        <Route path="/au" element={<AustraliaPage />} />
        <Route path="/ca" element={<CanadaPage />} />
        <Route path="/ae" element={<UAEPage />} />
        <Route path="/europe" element={<EuropePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AllRoutes;
