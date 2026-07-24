import ContactHero from "../Components/Contact/ContactHero";
import GetInTouchCard from "../Components/Contact/GetInTouchCard";
import ContactForm from "../Components/Contact/ContactForm";
import FindUsMap from "../Components/Contact/FindUsMap";
import ContactTrustStrip from "../Components/Contact/ContactTrustStrip";

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <section className="w-full px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[80em] grid-cols-1 gap-6 lg:grid-cols-[340px_1fr_360px]">
          <GetInTouchCard />
          <ContactForm />
          <FindUsMap />
    
        </div>
      </section>

      <ContactTrustStrip />
    </>
  );
}