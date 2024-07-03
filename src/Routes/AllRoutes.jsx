import React from "react";
import { Route, Routes } from "react-router-dom";
import { AboutUs, Contactus, HomePage, Portfolio, ServiceSingalPage } from "../Pages";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path="/About-us" element={<AboutUs/>} />
        <Route path="/portfolio" element={<Portfolio/>} />
        <Route path="/service/:serviceName" element={<ServiceSingalPage />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
