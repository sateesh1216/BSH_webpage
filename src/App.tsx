import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/ScrollToTop";
import FloatingContactButtons from "./components/home/FloatingContactButtons";

import Home from "./pages/Home";

const About = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const FleetPage = lazy(() => import("./pages/FleetPage"));
const DestinationsPage = lazy(() => import("./pages/DestinationsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const DestinationDetail = lazy(() => import("./pages/DestinationDetail"));

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/fleet" element={<FleetPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/destinations/:slug" element={<DestinationDetail />} />
        </Routes>
      </Suspense>
      <Footer />
      <FloatingContactButtons />
    </>
  );
}