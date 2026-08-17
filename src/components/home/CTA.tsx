import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { Phone, MapPin, Mail, Navigation, ChevronDown, HelpCircle } from "lucide-react";
import { useBooking } from "../booking/BookingContext";

interface ContactDetail { id: string; icon: LucideIcon; label: string; primary: string; secondary: string; href?: string; }

const contactDetails: ContactDetail[] = [
  { id: "location", icon: MapPin, label: "Our Location", primary: "36-92-242-532/1, Palanati Colony", secondary: "Kancharapalem, Visakhapatnam, Andhra Pradesh - 530008" },
  { id: "phone", icon: Phone, label: "Call Us", primary: "+91 8886803322", secondary: "Mon - Sun : 24/7 Available", href: "tel:+918886803322" },
  { id: "email", icon: Mail, label: "Email Us", primary: "info.bshtaxiservices@gmail.com", secondary: "We reply within 30 minutes", href: "mailto:info.bshtaxiservices@gmail.com" },
];

const businessLocation = {
  name: "BSH Taxi Services",
  mapEmbedUrl: "https://www.google.com/maps?q=BSH+Taxi+Services+Kancharapalem+Visakhapatnam&output=embed",
  mapLinkUrl: "https://www.google.com/maps?q=BSH+Taxi+Services+Kancharapalem+Visakhapatnam",
};

// -------------------- FAQ DATA (SEO-focused) --------------------
interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: "faq-book",
    question: "How can I book a taxi in Vizag?",
    answer:
      "You can book a taxi online through the BSH Taxi Services website, or contact our booking team directly by phone or WhatsApp at +91 8886803322. We confirm most bookings within a few minutes.",
  },
  {
    id: "faq-airport",
    question: "Do you provide airport pickup in Visakhapatnam?",
    answer:
      "Yes, BSH Taxi Services provides airport pickup and drop services in Visakhapatnam. We monitor your flight timing and arrange the pickup according to your scheduled arrival, including delayed flights.",
  },
  {
    id: "faq-oneway",
    question: "Do you provide one-way taxi services from Vizag?",
    answer:
      "Yes, we offer one-way and round-trip taxi services from Vizag for selected outstation routes, including Araku, Vizianagaram, Rajahmundry, Vijayawada, Hyderabad, and other destinations.",
  },
  {
    id: "faq-outstation",
    question: "Do you provide outstation taxi services from Vizag?",
    answer:
      "Yes, BSH Taxi Services provides outstation taxi services from Vizag to destinations across Andhra Pradesh and nearby states. One-way and round-trip taxi options are available depending on the route and vehicle type.",
  },
  {
    id: "faq-araku",
    question: "Can I book an Araku sightseeing taxi from Vizag?",
    answer:
      "Yes, you can book a taxi from Vizag for Araku Valley sightseeing. Popular stops can include Borra Caves, Tyda, coffee plantations, and other attractions, with flexible sightseeing packages based on your travel plan.",
  },
  {
    id: "faq-fare",
    question: "How is the taxi fare calculated in Vizag?",
    answer:
      "Taxi fares are calculated based on the distance, trip type such as local, outstation, or airport transfer, and vehicle category. BSH Taxi Services provides transparent pricing, and you can contact us for an exact fare quote for your trip.",
  },
  {
    id: "faq-247",
    question: "Is BSH Taxi Services available 24/7?",
    answer:
      "Yes, BSH Taxi Services is available 24/7 for taxi bookings and customer assistance, including early-morning and late-night airport transfers, subject to vehicle availability.",
  },
  {
    id: "faq-payment",
    question: "What payment methods do you accept?",
    answer:
      "We accept cash and UPI payments for taxi services. Payment details can be confirmed with our booking team when you make your reservation.",
  },
  {
    id: "faq-safety",
    question: "Are your taxi drivers verified and experienced?",
    answer:
      "BSH Taxi Services works with verified and licensed drivers who are experienced with local and outstation routes. Our aim is to provide safe, reliable, and comfortable taxi services in Visakhapatnam and nearby destinations.",
  },
];

function RouteStyles() {
  return (
    <style>{`
      @keyframes route-travel {
        0%   { left: 0%; }
        50%  { left: calc(100% - 10px); }
        100% { left: 0%; }
      }
      .route-dot { animation: route-travel 4.5s ease-in-out infinite; }
      @media (prefers-reduced-motion: reduce) {
        .route-dot { animation: none; left: 6px; }
      }
    `}</style>
  );
}

function RouteDivider({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dash = tone === "light" ? "border-[#B9D3FF]" : "border-white/30";
  return (
    <div className="relative mx-auto h-4 w-40">
      <div className={`absolute top-1/2 h-0 w-full -translate-y-1/2 border-t-2 border-dashed ${dash}`} />
      <span className="route-dot absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#FFB238] shadow-[0_0_0_3px_rgba(255,178,56,0.25)]" />
    </div>
  );
}

function CTAIconBadge() {
  return (
    <span className="relative grid h-16 w-16 shrink-0 place-items-center rounded-full bg-white text-[#1554B8] shadow-[0_0_0_6px_rgba(255,255,255,0.15)]">
      <Phone size={26} className="animate-[pulse_2.5s_ease-in-out_infinite]" />
    </span>
  );
}

function ContactInfoCard({ detail, index }: { detail: ContactDetail; index: number }) {
  const { icon: Icon, label, primary, secondary, href } = detail;
  const content = (
    <>
      <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-linear-to-br from-[#1554B8] to-[#2E6FEF] text-white shadow-md shadow-[#1554B8]/25 transition-transform duration-200 group-hover:scale-105">
        <Icon size={20} aria-hidden="true" />
        <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-[#0A1F3D] text-[9px] font-bold text-white ring-2 ring-white">{index}</span>
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#1554B8]">{label}</p>
        <p className="mt-1 text-sm font-semibold text-[#0A1F3D]">{primary}</p>
        <p className="text-sm text-[#57647B]">{secondary}</p>
      </div>
    </>
  );
  const cardClass =
    "group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-[#E3ECFF] bg-white p-5 shadow-sm transition-all duration-200 before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-gradient-to-b before:from-[#1554B8] before:to-[#2E6FEF] before:opacity-0 before:transition-opacity before:duration-200 hover:-translate-y-0.5 hover:border-[#BFD6FF] hover:shadow-lg hover:shadow-[#1554B8]/10 hover:before:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1554B8]";

  if (href) {
    return (
      <button type="button" onClick={() => { window.location.href = href; }} className={`${cardClass} w-full text-left`} aria-label={`${label}: ${primary}`}>
        {content}
      </button>
    );
  }
  return <div className={cardClass}>{content}</div>;
}


function MapEmbed({ title, embedUrl, linkUrl }: { title: string; embedUrl: string; linkUrl: string }) {
  const [loadMap, setLoadMap] = useState(false);

  if (!loadMap) {
    return (
      <button
        type="button"
        onClick={() => setLoadMap(true)}
        className="group relative flex h-80 w-full flex-col items-center justify-center gap-2 rounded-2xl border border-[#E3ECFF] bg-linear-to-br from-[#EAF1FF] to-[#F4F8FF] text-[#1554B8] shadow-lg shadow-[#1554B8]/10 transition-colors hover:from-[#E3ECFF] hover:to-[#EAF1FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1554B8] lg:h-full"
        aria-label={`Load map for ${title}`}
      >
        <span className="grid h-14 w-14 place-items-center rounded-full bg-white shadow-md shadow-[#1554B8]/15 transition-transform duration-200 group-hover:scale-105">
          <MapPin size={26} />
        </span>
        <span className="text-sm font-semibold">Tap to load map</span>
        <span className="text-xs text-[#57647B]">Kancharapalem, Visakhapatnam</span>
      </button>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#E3ECFF] shadow-lg shadow-[#1554B8]/10">
      <iframe title={title} src={embedUrl} className="h-80 w-full border-0 grayscale-15% lg:h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#1554B8]/10" />
      <button
        type="button"
        onClick={() => { window.open(linkUrl, "_blank", "noopener,noreferrer"); }}
        className="absolute left-4 top-4 flex items-center gap-1.5 rounded-lg bg-white/95 px-3 py-2 text-xs font-semibold text-[#1554B8] shadow-md backdrop-blur-sm transition-colors hover:bg-[#EAF1FF] focus-visible:outline-2 focus-visible:outline-[#1554B8]"
      >
        <Navigation size={13} />
        Open in Maps
      </button>
    </div>
  );
}

export function CTA() {
  const { openBooking } = useBooking();

  return (
    <section
      id="about"
      className="relative mx-auto w-full max-w-[70em] overflow-hidden rounded-2xl bg-linear-to-r from-[#0A1F3D] via-[#1554B8] to-[#2E6FEF] px-8 py-6 shadow-xl shadow-[#0A1F3D]/20"
    >
      <RouteStyles />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2 opacity-70"
        style={{ backgroundImage: "repeating-linear-gradient(90deg, #FFB238 0 18px, transparent 18px 34px)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: "repeating-linear-gradient(135deg, #ffffff 0 2px, transparent 2px 26px)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex w-full flex-col items-center justify-between gap-6 lg:flex-row">
        <div className="flex items-center gap-4">
          <CTAIconBadge />
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Need a Taxi?</h2>
            <p className="mt-1 max-w-md text-sm text-[#D6E4FF] sm:text-base">
              <strong>
                {" "}
                <a
                  href="https://www.bshtaxiservices.com/services/airport-transfer?type=airport-taxi"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Airport Taxi Service in Vizag | BSH Taxi Services"
                  aria-label="Airport Taxi Service in Vizag"
                  className="hover:underline"
                >
                  <strong>Book your airport taxi, </strong>
                </a>{" "}
                local cab, or outstation <em>taxi in Visakhapatnam (Vizag).</em>
              </strong>{" "}
              Call BSH Taxi Services for 24/7 reliable taxi booking at affordable prices.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <a
            href="tel:+918886803322"
            className="flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-[#1554B8] shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg sm:text-base"
          >
            <Phone size={18} />
            +91 8886803322
          </a>
          <button
            type="button"
            onClick={() => openBooking({ resetTrip: true })}
            className="rounded-lg border-2 border-white/80 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#1554B8] sm:text-base"
          >
            Book Taxi Now
          </button>
        </div>
      </div>
    </section>
  );
}

export function ContactUs() {
  return (
    <section id="contact" className="mx-auto w-full max-w-310 bg-[#F4F8FF] px-4 py-10" aria-labelledby="contact-heading">
      <RouteStyles />
      <header className="mb-12 text-center">
        <span className="inline-block rounded-full bg-[#E3ECFF] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#1554B8]">Get In Touch</span>
        <h2 id="contact-heading" className="mt-3 text-2xl font-extrabold tracking-tight text-[#0A1F3D] sm:text-3xl">Contact BSH Taxi Services in Vizag</h2>
        <div className="mt-4 flex justify-center"><RouteDivider /></div>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]">
        <div className="flex flex-col gap-5">
          {contactDetails.map((detail, i) => (
            <ContactInfoCard key={detail.id} detail={detail} index={i + 1} />
          ))}
        </div>
        <MapEmbed title={`${businessLocation.name} Location`} embedUrl={businessLocation.mapEmbedUrl} linkUrl={businessLocation.mapLinkUrl} />
      </div>
    </section>
  );
}

// -------------------- FAQ SECTION (restyled) --------------------
function FAQAccordionItem({ item, index, isOpen, onToggle }: { item: FAQItem; index: number; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-200 ${
        isOpen ? "border-[#BFD6FF] shadow-lg shadow-[#1554B8]/10" : "border-[#E3ECFF] hover:border-[#BFD6FF] hover:shadow-md"
      }`}
    >
      <span
        className={`pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#1554B8] to-[#2E6FEF] transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />
      <h3 className="m-0">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`${item.id}-panel`}
          id={`${item.id}-trigger`}
          className="flex w-full items-center gap-4 px-5 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1554B8] sm:px-6 sm:py-5"
        >
          <span
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xs font-bold transition-colors duration-200 ${
              isOpen ? "bg-linear-to-br from-[#1554B8] to-[#2E6FEF] text-white shadow-md shadow-[#1554B8]/25" : "bg-[#EAF1FF] text-[#1554B8]"
            }`}
          >
            {String(index).padStart(2, "0")}
          </span>
          <span className={`flex-1 text-sm font-semibold sm:text-base ${isOpen ? "text-[#1554B8]" : "text-[#0A1F3D]"}`}>
            {item.question}
          </span>
          <span
            className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-200 ${
              isOpen ? "rotate-180 bg-[#1554B8] text-white" : "bg-[#EAF1FF] text-[#1554B8] group-hover:bg-[#DCE9FF]"
            }`}
          >
            <ChevronDown size={16} />
          </span>
        </button>
      </h3>
      <div
        id={`${item.id}-panel`}
        role="region"
        aria-labelledby={`${item.id}-trigger`}
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="border-t border-[#EEF3FF] px-5 py-4 pl-[4.25rem] text-sm leading-relaxed text-[#57647B] sm:px-6 sm:text-base">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0].id);

  // JSON-LD structured data — helps Google show FAQ rich snippets for this page
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section id="faq" className="relative mx-auto w-full max-w-310 overflow-hidden bg-[#F4F8FF] px-4 py-14" aria-labelledby="faq-heading">
      <RouteStyles />
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#1554B8]/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#FFB238]/10 blur-3xl"
        aria-hidden="true"
      />

      <header className="relative mb-10 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E3ECFF] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#1554B8]">
          <HelpCircle size={13} />
          FAQs
        </span>
        <h2 id="faq-heading" className="mt-3 text-2xl font-extrabold tracking-tight text-[#0A1F3D] sm:text-3xl">
          Frequently Asked Questions
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-[#57647B] sm:text-base">
          Everything you need to know about booking a taxi with BSH Taxi Services in Visakhapatnam.
        </p>
        <div className="mt-4 flex justify-center"><RouteDivider /></div>
      </header>

      <div className="relative mx-auto flex max-w-3xl flex-col gap-3">
        {faqItems.map((item, i) => (
          <FAQAccordionItem
            key={item.id}
            item={item}
            index={i + 1}
            isOpen={openId === item.id}
            onToggle={() => setOpenId(openId === item.id ? null : item.id)}
          />
        ))}
      </div>

      <div className="relative mt-10 flex flex-col items-center justify-center gap-3 rounded-2xl border border-[#E3ECFF] bg-white px-6 py-6 text-center shadow-sm sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="text-sm font-semibold text-[#0A1F3D] sm:text-base">Still have questions?</p>
          <p className="text-sm text-[#57647B]">Our team is available 24/7 to help with your booking.</p>
        </div>
        <a
          href="tel:+918886803322"
          className="flex items-center gap-2 rounded-lg bg-linear-to-r from-[#1554B8] to-[#2E6FEF] px-5 py-3 text-sm font-bold text-white shadow-md shadow-[#1554B8]/25 transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          <Phone size={16} />
          Call +91 8886803322
        </a>
      </div>
    </section>
  );
}

export default function CTAContactSection() {
  return (
    <>
      <CTA />
      <ContactUs />
      <FAQSection />
    </>
  );
}