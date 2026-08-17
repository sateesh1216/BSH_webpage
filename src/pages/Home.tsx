import { Helmet } from "react-helmet-async";
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
  image: "https://bshtaxiservices.com/bshtaxiservice-homepage-banner_3.webp",
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
    <>
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