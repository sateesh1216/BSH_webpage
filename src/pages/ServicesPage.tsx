import ServicesHero from "../components/services/ServicesHero";
import ServicesGrid from "../components/services/ServicesGrid";
import HowItWorks from "../components/services/HowItWorks";
import TrustBar from "../components/home/TrustBar";
import { CTA } from "../components/home/CTA"; // adjust path to your CTA file

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <TrustBar />
      <HowItWorks />
      <div className="mb-6">
      <CTA />
      </div>
    </>
  );
}