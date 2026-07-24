import ContactHero from "../components/contact/ContactHero";
import GetInTouchCard from "../components/contact/GetInTouchCard";
import ContactForm from "../components/contact/ContactForm";
import FindUsMap from "../components/contact/FindUsMap";
import ContactTrustStrip from "../components/contact/ContactTrustStrip";

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