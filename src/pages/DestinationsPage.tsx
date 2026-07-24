import DestinationsHero from "../Components/Destinations/DestinationsHero";
import DestinationsGrid from "../Components/Destinations/DestinationsGrid";
import WhyTravelWithUs from "../Components/Destinations/WhyTravelWithUs";
import OutstationRoutesTable from "../Components/Destinations/OutstationRoutesTable";
import { CTA } from "../Components/Home/CTA";

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