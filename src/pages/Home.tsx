import SEO from "../components/seo/SEO";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import TravelSections from "../components/home/TravelSections";
import TrustBar from "../components/home/TrustBar";
import { CTA, ContactUs,FAQSection } from "../components/home/CTA";
import Review from "../components/home/Review";
import MobileSearchBar from "../components/home/MobileSearchBar";
import BookingWizard from "../components/booking/BookingWizard";
import FloatingContactButtons from "../components/home/FloatingContactButtons";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  name: "BSH Taxi Services",
  image: "https://www.bshtaxiservices.com/bshtaxiservice-homepage-banner_3.webp",
  url: "https://www.bshtaxiservices.com/",
  logo: "https://www.bshtaxiservices.com/bshtaxiservice-homepage-banner_3.webp",
  telephone: "+91-8886803322",
  email: "info.bshtaxiservices@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "44-66, Palanati Colony, Srinivasa Nagar, Kancharapalem",
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
    <>
     <SEO
          title="Airport, Local & Outstation Cabs in Vizag"
              description="BSH Taxi Services offers reliable taxi, local cab, outstation and airport cab services in Vizag, with one-way and round-trip bookings, corporate travel and 24/7 support."
           keywords={[
              // Core Taxi Keywords
              "taxi service in vizag",
              "best taxi service in vizag",
              "vizag taxi service",
              "taxi services in visakhapatnam",
              "visakhapatnam taxi service",
              "taxi in vizag",
              "taxi in visakhapatnam",
              "cabs in vizag",
              "cab service in vizag",
              "best cab service in vizag",

              // Local Taxi & Cab Keywords
              "local taxi service in vizag",
              "local cab service in vizag",
              "local cab service in visakhapatnam",
              "local cabs in vizag",
              "vizag local cabs",
              "vizag city cabs",
              "city taxi service in vizag",

              // Taxi & Cab Booking Keywords
              "taxi booking in vizag",
              "cab booking in vizag",
              "online cab booking in vizag",
              "taxi booking in visakhapatnam",
              "cab booking in visakhapatnam",
              "cab booking visakhapatnam",
              "visakhapatnam taxi booking",
              "vizag taxi booking",
              "cab booking vizag",

              // Outstation Taxi Keywords
              "outstation taxi in vizag",
              "outstation cabs in vizag",
              "vizag outstation taxi",
              "outstation cab service in vizag",
              "outstation cabs in visakhapatnam",
              "outstation taxi from vizag",
              "one way taxi from vizag",
              "round trip taxi from vizag",
              "intercity taxi in vizag",

              // Airport Taxi Keywords
              "airport taxi in vizag",
              "vizag airport taxi",
              "visakhapatnam airport taxi",
              "airport cab service in vizag",
              "visakhapatnam airport cab service",
              "vizag airport cabs",
              "airport pickup and drop vizag",
              "visakhapatnam airport cab services",
              "cab services in vizag airport",
              "cabs in visakhapatnam airport",
              "cabs in vizag airport",
              "visakhapatnam airport cabs",
              "visakhapatnam airport taxi service",

              // Car Rental & Travel Keywords
              "car rental in vizag",
              "car rentals in visakhapatnam",
              "innova car rental in vizag",
              "innova car rental",
              "tempo traveller rental in vizag",
              "tempo traveller rent in vizag",
              "car rental in visakhapatnam for outstation",
              "vizag cab rental",
              "cabs for rent in vizag",
              "car booking in vizag",
              "vizag car booking",
              "car travels in vizag",

              // Tour & Travel Keywords
              "tour and travels in vizag",
              "tours and travels in visakhapatnam",
              "tours and travels visakhapatnam",
              "travel services in vizag",
              "visakhapatnam tour and travels",
              "tour and travels vizag",
              "best travels in vizag",
              "mini bus travels in vizag",

              // General Service Keywords
              "vizag taxi",
              "vizag cab services",
              "cab services in vizag",
              "cabs in visakhapatnam",
              "visakhapatnam taxi number",

              // Important Route Keywords
              "vizag to hyderabad taxi",
              "vizag to tirupati taxi",
              "vizag to araku taxi",
              "vizag to srikakulam taxi",
              "vizag to kakinada taxi",
              "vizag to rajahmundry taxi",
            ]}
               schema={localBusinessSchema}
        canonicalPath="/"
      />
<section className="relative z-10 hidden px-4 pt-6 md:block lg:px-8">
  <Hero />
</section>

{/* Quick search bar — mobile only. Sits right below the (hidden-on-mobile)
    hero area, so give it its own top spacing instead of relying on Hero's. */}
<section className="px-4 pt-4 pb-2 sm:px-5 md:hidden">
  <div className="mx-auto w-full max-w-md">
    <MobileSearchBar />
  </div>
</section>

{/* Desktop / tablet: full multi-step booking wizard, further down the page */}
{/* Desktop: Booking Wizard overlaps Hero */}
<section className="relative z-30 mt-2 md:mt-0 md:block md:-mt-20 lg:-mt-24 xl:-mt-15 px-4 lg:px-8">
  <div className="mx-auto max-w-7xl">
    <BookingWizard />
  </div>
</section>

      <TrustBar />

      <Features />

      <TravelSections />

      <Review />

      <CTA />

      <ContactUs />
<FAQSection />
      {/* Floating Call & WhatsApp Buttons */}
      <FloatingContactButtons />
    </>
  );
}