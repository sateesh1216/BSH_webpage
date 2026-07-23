import type { LucideIcon } from "lucide-react";
import { Phone, MapPin, Mail, Navigation } from "lucide-react";
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
            <p className="mt-1 max-w-md text-sm text-[#D6E4FF] sm:text-base">Call us now for the best taxi services in Visakhapatnam and beyond.</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => { window.location.href = "tel:+918886803322"; }}
            className="flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-[#1554B8] shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg sm:text-base"
          >
            <Phone size={18} />
            +91 8886803322
          </button>
          <button
            type="button"
            onClick={() => openBooking({ resetTrip: true })}
            className="rounded-lg border-2 border-white/80 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#1554B8] sm:text-base"
          >
            Book Now
          </button>
        </div>

        <div className="hidden shrink-0 lg:block">
          <img src="/src/assets/cars/Dzire-taxi-services-2-in-visakhapatnam-bshtaxiservices.png" alt="BSH Taxi Services car" className="h-auto w-64 object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.35)]" />
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
        <h2 id="contact-heading" className="mt-3 text-2xl font-extrabold tracking-tight text-[#0A1F3D] sm:text-3xl">Contact Us</h2>
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

export default function CTAContactSection() {
  return (
    <>
      <CTA />
      <ContactUs />
    </>
  );
}