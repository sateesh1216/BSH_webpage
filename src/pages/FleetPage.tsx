import SEO from "../components/seo/SEO";
import { pageMeta } from "../data/pageMeta";
import FleetHero from "../components/fleet/FleetHero";
import FleetGrid from "../components/fleet/FleetGrid";
import TrustBar from "../components/home/TrustBar";
import { CTA } from "../components/home/CTA";

export default function FleetPage() {
  const meta = pageMeta["/fleet"];

  return (
    <>
      <SEO title={meta.title} description={meta.description} keywords={meta.keywords} canonicalPath="/fleet" />
      <FleetHero />
      <FleetGrid />
      <TrustBar />
      <div className="mb-6">
      <CTA />
      </div>
    </>
  );
}