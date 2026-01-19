import  { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

// Lazy load all page components
const HomePage = lazy(() => import("../Pages/HomePage"));
const Contactus = lazy(() => import("../Pages/ContactusPage"));
const AboutUs = lazy(() => import("../Pages/AboutUs"));
const Portfolio = lazy(() => import("../Pages/Portfolio"));
const ServiceSingalPage = lazy(() => import("../Pages/ServicePage"));

// Loading component
const LoadingSpinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontSize: "18px",
      color: "#333",
    }}
  >
    <div>Loading...</div>
  </div>
);

const AllRoutes = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<Contactus />} />
          <Route path="/About" element={<AboutUs />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/service/:serviceName" element={<ServiceSingalPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default AllRoutes;