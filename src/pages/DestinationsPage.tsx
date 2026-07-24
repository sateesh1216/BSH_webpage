import DestinationsHero from "../components/destinations/DestinationsHero";
import DestinationsGrid from "../components/destinations/DestinationsGrid";
import WhyTravelWithUs from "../components/destinations/WhyTravelWithUs";
import OutstationRoutesTable from "../components/destinations/OutstationRoutesTable";
import { CTA } from "../components/home/CTA";

export default function DestinationsPage() {
  return (
    <>
      <DestinationsHero />
      <DestinationsGrid />
      
      <OutstationRoutesTable />
      <WhyTravelWithUs />
      <div className="mb-6">
      <CTA />
      </div>
    </>
  );
}