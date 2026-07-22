// import { useState } from "react";
import {
  MapPin,
  Phone,
  ShieldCheck,
  IndianRupee,
  UserCheck,
  Headset,
} from "lucide-react";

import heroBanner from "../../assets/Home page banners/Home page banner 3-bshtaxiservices.png";

// Hero-only presentation config (icon + hero image per tab). Trip-shape
// config (tripOptions/dropLabel/dropPlaceholder) now lives in
// BookingContext's TRIP_CONFIG, shared across every entry point.

// Matches the 4-badge row shown directly under the hero subtext in the design.
const heroBadges = [
  { icon: ShieldCheck, title: "Safe & Secure", description: "Your safety is our priority" },
  { icon: UserCheck, title: "Professional Drivers", description: "Trained & Experienced" },
  { icon: IndianRupee, title: "Best Price Guarantee", description: "No hidden charges" },
  { icon: Headset, title: "24/7 Support", description: "We're always here" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate z-20 flex min-h-screen flex-col overflow-x-hidden bg-linear-to-b from-primary-light/70 via-primary-light/25 to-white"
    >
      {/* Signature: a dashed route line running from the text column toward
          the image, with a pin marking the destination — the one visual idea
          this page is allowed to be a little bold about. Decorative only,
          desktop-only since the two-column layout it traces only exists at lg+. */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-24 z-0 hidden h-105 w-full lg:block motion-reduce:[&_path]:stroke-dasharray-none!"
        viewBox="0 0 1440 420"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M 40 60 C 300 40, 420 220, 620 200 S 980 60, 1240 140"
          stroke="var(--color-primary, #f59e0b)"
          strokeOpacity="0.35"
          strokeWidth="2.5"
          strokeDasharray="1 14"
          strokeLinecap="round"
          className="route-path"
        />
        <circle cx="40" cy="60" r="5" fill="var(--color-primary, #f59e0b)" fillOpacity="0.55" />
        <g transform="translate(1226, 118)">
          <circle cx="14" cy="14" r="14" fill="var(--color-primary, #f59e0b)" fillOpacity="0.12" />
          <MapPin
            x={4}
            y={4}
            width={20}
            height={20}
            className="text-primary"
            strokeWidth={2.25}
          />
        </g>
      </svg>
      <style>{`
        @keyframes bsh-route-dash { to { stroke-dashoffset: -300; } }
        @keyframes bsh-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @media (prefers-reduced-motion: no-preference) {
          .route-path { animation: bsh-route-dash 14s linear infinite; }
          .bsh-float-card { animation: bsh-float 5s ease-in-out infinite; }
        }
      `}</style>

      <div className="relative z-10 grid flex-1 lg:grid-cols-2 lg:auto-rows-fr">
        {/* Text column */}
        <div className="mx-auto flex w-[92%] max-w-155 flex-col justify-center py-10 sm:py-14 lg:mx-0 lg:w-full lg:max-w-none lg:py-24 lg:pl-[6%] lg:pr-10">
          <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary-hover sm:mb-5 sm:px-3.5 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Vizag's trusted cab service
          </span>

          <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl sm:leading-[1.08] md:text-5xl lg:text-[3.4rem]">
            Your Journey,
            <br />
            <span
              className="text-[#2997FF] font-normal"
              style={{
                fontFamily: '"Lavishly Yours", cursive',
                fontWeight: 400,
              }}
            >
              Our Responsibility.
            </span>
          </h1>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-500 sm:mt-6 sm:text-base lg:text-lg">
            Safe, reliable and affordable taxi service in Visakhapatnam — local rides, outstation
            trips, and airport transfers across Andhra Pradesh.
          </p>

          {/* Mobile / tablet hero image — the two-column layout (and the image
              inside it) only exists from lg up, so phones and tablets need
              their own visible photo instead of seeing nothing at all. */}
          <div className="relative mt-7 mx-[4%] h-56 w-full overflow-hidden rounded-2xl sm:mt-8 sm:h-72 md:h-80 lg:hidden">
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/20 blur-3xl"
            />
            <img
              src={heroBanner}
              alt="BSH Taxi Services"
              loading="eager"
              className="h-full w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-slate-900/25 via-transparent to-transparent"
            />
          </div>

          {/* CTA buttons */}
          <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
            <a
              href="tel:+918886803322"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:px-6 sm:py-3"
            >
              <Phone size={16} />
              Call Now
            </a>
          </div>

          {/* Trust badges — 4 inline items matching the design */}
          <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-5 xs:grid-cols-2 sm:mt-9 sm:flex sm:flex-wrap">
            {heroBadges.map(({ icon: Icon, title, description }) => (
              <div key={title} className="group flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-primary shadow-[0_1px_2px_rgba(16,24,40,0.06),0_0_0_1px_rgba(16,24,40,0.06)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[0_6px_16px_rgba(16,24,40,0.10),0_0_0_1px_rgba(245,158,11,0.25)] sm:h-11 sm:w-11">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{title}</p>
                  <p className="text-xs text-slate-500">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image column (lg and up only) — fills the section exactly: full
            height of the row, bleeds to the viewport's right edge, image
            mapped with object-cover so it always fills the frame with no
            gaps, overflow, or stretching. */}
   <div className="relative hidden lg:block">
          <div className="absolute inset-y-0 -left-33 right-[calc((100vw-100%)/-2)] overflow-hidden rounded-l-[2.5rem]">
            {/* Ambient color wash behind the photo, echoing the accent */}
            <div
              aria-hidden="true"
              className="absolute -right-24 -top-24 h-105 w-105 rounded-full bg-primary/20 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-32 left-10 h-80 w-80 rounded-full bg-primary-hover/15 blur-3xl"
            />

            <img
              src={heroBanner}
              alt="BSH Taxi Services"
              loading="eager"
              className="h-full w-full object-cover"
            />

            {/* Soft fade on the seam so the photo settles into the page
                instead of cutting hard against the text column */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-primary-light/70 to-transparent"
            />
            {/* Gentle base shadow to ground the image */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-slate-900/25 via-transparent to-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}