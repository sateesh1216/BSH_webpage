// import { useState } from "react";
import {
  MapPin,
  ShieldCheck,
  IndianRupee,
  UserCheck,
  Headset,
  Star,
  Navigation,
  Car,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";


interface HeroBadge {
  icon: LucideIcon;
  title: string;
  description: string;
}

// Matches the 4-badge row shown directly under the hero subtext in the design.
const heroBadges: HeroBadge[] = [
  { icon: ShieldCheck, title: "Safe & Secure", description: "Your safety is our priority" },
  { icon: UserCheck, title: "Professional Drivers", description: "Trained & Experienced" },
  { icon: IndianRupee, title: "Best Price Guarantee", description: "No hidden charges" },
  { icon: Headset, title: "24/7 Support", description: "We're always here" },
];

// Local-business structured data for SEO — helps search engines understand
// this is a taxi service in Visakhapatnam (rich results, local pack, etc.)
const taxiServiceSchema = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  name: "BSH Taxi Services",
  description:
    "Best taxi service in Vizag offering airport taxi, local cab, outstation cabs, one-way taxi and round trip bookings.",
  areaServed: {
    "@type": "City",
    name: "Visakhapatnam",
  },
  availableChannel: {
    "@type": "ServiceChannel",
    availableLanguage: ["en", "te"],
  },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate left-1/2 right-1/2 z-20 -mx-[50vw] w-screen overflow-hidden bg-white px-4 pt-8 pb-10 sm:px-6 sm:pt-10 sm:pb-14 lg:pt-14 lg:pb-20"
    >
      {/* SEO: structured data for local search / rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(taxiServiceSchema) }}
      />

      {/* Ambient glow — adds depth without a photo, keeps LCP light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 z-0 h-72 w-72 rounded-full bg-[#2997FF]/20 blur-3xl sm:h-96 sm:w-96"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-0 z-0 h-64 w-64 rounded-full bg-[#2997FF]/15 blur-3xl sm:h-80 sm:w-80"
      />

      {/* Vizag coastline silhouette anchoring the bottom of the hero */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24 w-full sm:h-32 lg:h-40"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 160 C 180 90, 320 130, 480 100 C 640 70, 760 140, 960 110 C 1140 85, 1280 130, 1440 100 L1440 220 L0 220 Z"
          fill="#2997FF"
          fillOpacity="0.06"
        />
        <path
          d="M0 190 C 220 170, 360 200, 600 180 C 840 160, 1020 200, 1440 175 L1440 220 L0 220 Z"
          fill="#0f172a"
          fillOpacity="0.05"
        />
      </svg>

      <style>{`
        @keyframes bsh-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes bsh-drive { 0% { offset-distance: 0%; } 100% { offset-distance: 100%; } }
        @media (prefers-reduced-motion: no-preference) {
          .bsh-float-card { animation: bsh-float 5s ease-in-out infinite; }
          .bsh-car {
            offset-path: path("M 20 96 C 60 30, 140 20, 190 55 S 268 118, 226 150");
            animation: bsh-drive 6s linear infinite;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .bsh-car { offset-path: path("M 20 96 C 60 30, 140 20, 190 55 S 268 118, 226 150"); offset-distance: 55%; }
        }
      `}</style>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* Text column */}
        <div className="flex flex-col justify-center">
          <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary-hover sm:mb-5 sm:px-3.5 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Your Journey, Our Responsibility.
          </span>

          <h1 className="text-[1.75rem] font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl sm:leading-[1.08] md:text-5xl lg:text-[3.25rem] lg:leading-[1.05]">
            Best Taxi Service in <span className="text-[#2997FF]">Vizag</span>
          </h1>

          <p
            className="mt-2 text-base sm:text-lg lg:text-xl text-[#2997FF] font-normal"
            style={{
              fontFamily: '"Rouge Script", cursive',
              fontWeight: 400,
            }}
          >
            Airport Taxi | Local Cab | Outstation Cabs | One Way Taxi | Round Trips
          </p>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-500 sm:mt-5 sm:max-w-lg sm:text-base lg:text-base">
            Book the <strong>best taxi service in Vizag</strong> with BSH Taxi Services.
            We provide reliable airport taxi service,{" "}
            <a
              href="/services/local-taxi?type=local-taxi-services"
              className="hover:underline"
              title="Local Taxi Service in Vizag | BSH Taxi Services"
              aria-label="Local Taxi Service in Vizag"
            >
              <strong>local cab service</strong>
            </a>
            , outstation taxi service, one-way taxi, round trips, and corporate travel at affordable prices with professional drivers.
          </p>

          {/* Trust badges — 4 inline items matching the design */}
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 xs:grid-cols-2 sm:mt-8 sm:gap-y-4 sm:flex sm:flex-wrap sm:gap-x-8">
            {heroBadges.map(({ icon: Icon, title, description }) => (
              <div key={title} className="group flex items-center gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-primary shadow-[0_1px_2px_rgba(16,24,40,0.06),0_0_0_1px_rgba(16,24,40,0.06)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[0_6px_16px_rgba(16,24,40,0.10),0_0_0_1px_rgba(245,158,11,0.25)] sm:h-10 sm:w-10">
                  <Icon size={17} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{title}</p>
                  <p className="text-xs text-slate-500">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual column — live booking preview card, replaces the old plain route sketch */}
        <div className="relative hidden lg:block">
          <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[1.75rem] border border-slate-100 bg-white shadow-[0_24px_60px_-18px_rgba(16,24,40,0.22)]">
            {/* map area */}
            <div className="relative h-52 bg-[radial-gradient(circle,#cbd5e1_1px,transparent_1px)] [background-size:18px_18px] bg-sky-50/60">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-b from-white/10 via-transparent to-white"
              />

              {/* live badge */}
              <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                Live tracking
              </div>

              <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 320 190"
                fill="none"
              >
                <path
                  d="M 20 96 C 60 30, 140 20, 190 55 S 268 118, 226 150"
                  stroke="#2997FF"
                  strokeWidth="3"
                  strokeDasharray="2 10"
                  strokeLinecap="round"
                  opacity="0.6"
                />
                <g transform="translate(6, 82)">
                  <circle cx="14" cy="14" r="14" fill="#f59e0b" fillOpacity="0.18" />
                  <circle cx="14" cy="14" r="6" fill="#f59e0b" />
                </g>
                <g transform="translate(212, 136)">
                  <circle cx="14" cy="14" r="14" fill="#2997FF" fillOpacity="0.18" />
                  <MapPin x={5} y={4} width={18} height={18} color="#2997FF" strokeWidth={2.25} />
                </g>
              </svg>

              {/* moving car icon, follows the same path as the SVG route above */}
              <div
                aria-hidden="true"
                className="bsh-car absolute left-0 top-0 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-[0_6px_16px_-4px_rgba(16,24,40,0.3)]"
              >
                <Car size={16} className="text-primary" strokeWidth={2.25} />
              </div>

              {/* ETA chip */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-white shadow-lg">
                <Navigation size={13} className="text-amber-400" />
                <div>
                  <p className="text-xs font-semibold leading-none">8 min pickup</p>
                  <p className="mt-1 text-[10px] leading-none text-slate-300">Nearest driver online</p>
                </div>
              </div>
            </div>

          </div>

          {/* Floating rating card */}
          <div className="bsh-float-card pointer-events-none absolute -right-4 -top-6 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white/90 px-4 py-3 shadow-[0_12px_32px_-8px_rgba(16,24,40,0.18)] backdrop-blur-sm xl:-right-8">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-amber-50 text-amber-500">
              <Star size={16} fill="currentColor" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">5 / 5 Rating</p>
              <p className="text-xs text-slate-500">10,000+ happy riders</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}