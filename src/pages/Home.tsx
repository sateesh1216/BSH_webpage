import { Helmet } from "react-helmet-async";
import SEO from "../components/seo/SEO";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import TravelSections from "../components/home/TravelSections";
import TrustBar from "../components/home/TrustBar";
import { CTA, ContactUs } from "../components/home/CTA";
import { BookingProvider } from "../components/booking/BookingContext";
import Review from "../components/home/Review";
import BookingWizard from "../components/booking/BookingWizard";
import FloatingContactButtons from "../components/home/FloatingContactButtons";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  name: "BSH Taxi Services",
  image: "https://www.bshtaxiservices.com/og-image.jpg",
  telephone: "+91-8886803322",
  email: "info.bshtaxiservices@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "36-92-242-532/1, Palanati Colony, Kancharapalem",
    addressLocality: "Visakhapatnam",
    addressRegion: "Andhra Pradesh",
    postalCode: "530008",
    addressCountry: "IN",
  },
  areaServed: {
    "@type": "State",
    name: "Andhra Pradesh",
  },
  openingHours: "Mo-Su 00:00-23:59",
  priceRange: "₹₹",
};

export default function HomePage() {
  return (
    <BookingProvider>
      <SEO
        title="Best Taxi Service in Visakhapatnam"
        description="BSH Taxi Services offers safe, reliable and affordable taxi booking in Visakhapatnam — local rides, outstation trips, airport transfers, corporate travel and wedding car rentals. Book now, available 24/7."
        keywords={[
          "tour and travels vizag",
          "taxi service in vizag",
          "visakhapatnam airport taxi",
          "best travels in vizag",
          "outstation cabs in vizag",
          "visakhapatnam taxi service",
          "tempo traveller rent in vizag",
          "cabs in vizag",
          "best cab service in vizag",
          "taxi in vizag",
          "vizag cab services",
          "innova car rental",
          "cab booking visakhapatnam",
          "vizag taxi",
          "car rentals in visakhapatnam for outstation",
          "visakhapatnam airport cab services",
          "cab services in vizag airport",
          "local cab service in visakhapatnam",
          "visakhapatnam taxi booking",
          "best taxi service in vizag",
          "car booking in vizag",
          "online cab booking in vizag",
          "taxi booking in vizag",
          "taxi services in visakhapatnam",
          "taxi booking in visakhapatnam",
          "mini bus travels in vizag",
          "visakhapatnam airport taxi service",
          "bus rentals in vizag",
          "cab services in vizag",
          "vizag taxi booking",
          "cab booking vizag",
          "tours and travels visakhapatnam",
          "visakhapatnam tour and travels",
          "tours and travels in vizag",
          "car travels in vizag",
          "visakhapatnam taxi number",
          "cabs in visakhapatnam",
          "cabs for rent in vizag",
          "cab service in visakhapatnam",
          "vizag city cabs",
          "visakhapatnam airport cabs",
          "vizag local cabs",
          "vizag cab rental",
          "cab booking in vizag",
          "vizag airport cabs",
          "cabs in vizag airport",
          "taxi in visakhapatnam",
          "cabs in visakhapatnam airport",
          "vizag airport taxi",
          "vizag car booking",
          "one way taxi",
          "book outstation cab",
          "vizag outstation taxi",
          "outstation taxi",
          "outstation cab",
          "intercity taxi",
          "vizag to srikakulam taxi",
          "vizag to kakinada taxi",
          "hyderabad to vizag taxi",
          "vizag taxi service",
          "vizag to tirupati taxi",
          "vizag to hyderabad taxi",
          "visakhapatnam to araku cab service",
          "taxi from visakhapatnam to araku",
          "visakhapatnam to araku cabs",
          "visakhapatnam to araku taxi",
          "araku cabs",
          "vizag to araku taxi",
          "vizag to araku cab booking",
          "vizag to araku cabs",
          "araku tour packages",
        ]}
        canonicalPath="/"
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      <Hero />

      <section className="-mt-2 relative z-30 px-4 lg:px-8">
        <BookingWizard />
      </section>

      <TrustBar />

      <Features />

      <TravelSections />

      <Review />

      <CTA />

      <ContactUs />

      {/* Floating Call & WhatsApp Buttons */}
      <FloatingContactButtons />
    </BookingProvider>
  );
}