import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App";
import { BookingProvider } from "./components/booking/BookingContext";
import BookingModal from "./components/booking/Bookingmodal";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <BookingProvider>
          <App />
          <BookingModal />
        </BookingProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);