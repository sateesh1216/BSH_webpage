import FleetHero from "../Components/Fleet/FleetHero";
import FleetGrid from "../Components/Fleet/FleetGrid";
import TrustBar from "../Components/Home/TrustBar";
import { CTA } from "../Components/Home/CTA";

export default function FleetPage() {
  return (
    <>
      <FleetHero />
      <FleetGrid />
      <TrustBar />
      <div className="mb-6">
      <CTA />
      </div>
    </>
  );
}