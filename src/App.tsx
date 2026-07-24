import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import FleetPage from "./pages/FleetPage";
import DestinationsPage from "./pages/DestinationsPage";
import ContactPage from "./pages/ContactPage";
import DestinationDetail from "./pages/DestinationDetail"; 
export default function App() {
  return (
    <>

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/fleet" element={<FleetPage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/destinations/:slug" element={<DestinationDetail />} />
      </Routes>
       <Footer />
    </>
   
  );
}