
import AboutHero from "../components/about/AboutHero";
import WhoWeAre from "../components/about/WhoWeAre";
import MissionVisionValues from "../components/about/MissionVisionValues";

import { CTA } from "../components/home/CTA";
import Review from "../components/home/Review";
import SEO from "../components/seo/SEO";
import { pageMeta } from "../data/pageMeta";

export default function AboutPage() {
    const meta = pageMeta["/about"];
  return (
    <>
  <SEO title={meta.title} description={meta.description} keywords={meta.keywords} canonicalPath="/about" />
      <main>
        <AboutHero />
        <WhoWeAre />
        <MissionVisionValues />
   
   
        <Review />
        <div className="mb-6">
        <CTA />
        </div>
      </main>

    </>
  );
}
