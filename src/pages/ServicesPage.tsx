import ServicesHero from "../Components/Services/ServicesHero";
import ServicesGrid from "../Components/Services/ServicesGrid";
import HowItWorks from "../Components/Services/HowItWorks";
import TrustBar from "../Components/Home/TrustBar";
import { CTA } from "../Components/Home/CTA"; // adjust path to your CTA file

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