
import AboutHero from "../components/about/AboutHero";
import WhoWeAre from "../components/about/WhoWeAre";
import MissionVisionValues from "../components/about/MissionVisionValues";

import { CTA } from "../components/home/CTA";
import Review from "../components/home/Review";


export default function AboutPage() {
  return (
    <>
 
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
