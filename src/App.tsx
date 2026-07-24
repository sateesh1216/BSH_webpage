import { Routes, Route } from "react-router-dom";
import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import Home from "./Pages/Home";
import About from "./Pages/AboutPage";
import ServicesPage from "./Pages/ServicesPage";
import FleetPage from "./Pages/FleetPage";
import DestinationsPage from "./Pages/DestinationsPage";
import ContactPage from "./Pages/ContactPage";
import DestinationDetail from "./Pages/DestinationDetail"; 
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