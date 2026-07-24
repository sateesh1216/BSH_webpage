
import AboutHero from "../Components/About/AboutHero";
import WhoWeAre from "../Components/About/WhoWeAre";
import MissionVisionValues from "../Components/About/MissionVisionValues";
import AboutStatsBar from "../Components/About/AboutStatsBar";
import WeServeYouBetter from "../Components/About/WeServeYouBetter";
// import Testimonials from "../components/about/Testimonials";
import { CTA } from "../Components/Home/CTA";
import Review from "../Components/Home/Review";

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