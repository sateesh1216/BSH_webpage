
import AboutHero from "../components/about/AboutHero";
import WhoWeAre from "../components/about/WhoWeAre";
import MissionVisionValues from "../components/about/MissionVisionValues";
import AboutStatsBar from "../components/about/AboutStatsBar";
import WeServeYouBetter from "../components/about/WeServeYouBetter";
// import Testimonials from "../components/about/Testimonials";
import { CTA } from "../components/home/CTA";
import Review from "../components/home/review";

export default function AboutPage() {
  return (
    <>
 
      <main>
        <AboutHero />
        <WhoWeAre />
        <MissionVisionValues />
        <AboutStatsBar />
        <WeServeYouBetter />
        <Review />
        <div className="mb-6">
        <CTA />
        </div>
      </main>

    </>
  );
}