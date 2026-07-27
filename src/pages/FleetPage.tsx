import FleetHero from "../components/fleet/FleetHero";
import FleetGrid from "../components/fleet/FleetGrid";
import TrustBar from "../components/home/TrustBar";
import { CTA } from "../components/home/CTA";

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