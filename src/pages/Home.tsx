import Hero from "../components/home/Hero";
import TrustBar from "../components/home/TrustBar";
import Features from "../components/home/Features";
import Services from "../components/home/Services";
import Fleet from "../components/home/Fleet";
import CTA from "../components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Features />
      <Services />
      <Fleet />
      <CTA />
    </>
  );
}