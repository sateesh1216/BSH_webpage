// import { useState } from "react";
import {
  MapPin,

  ShieldCheck,
  IndianRupee,
  UserCheck,
  Headset,
  Star,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

// Hero-only presentation config (icon + hero image per tab). Trip-shape
// config (tripOptions/dropLabel/dropPlaceholder) now lives in
// BookingContext's TRIP_CONFIG, shared across every entry point.

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

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate z-20 flex flex-col overflow-x-hidden bg-linear-to-b from-primary-light/70 via-primary-light/25 to-white"
    >
      {/* Soft ambient glow — adds depth without competing with the route line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 z-0 h-72 w-72 rounded-full bg-primary/15 blur-3xl sm:h-96 sm:w-96"
      />

      {/* Signature: a dashed route line running from the text column toward
          the image, with a pin marking the destination — the one visual idea
          this page is allowed to be a little bold about. Decorative only,
          desktop-only since the two-column layout it traces only exists at lg+. */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-10 z-0 hidden h-64 w-full lg:block motion-reduce:[&_path]:stroke-dasharray-none!"
        viewBox="0 0 1440 420"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="routeLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-primary, #f59e0b)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="var(--color-primary, #f59e0b)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--color-primary, #f59e0b)" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <path
          d="M 40 60 C 300 40, 420 220, 620 200 S 980 60, 1240 140"
          stroke="url(#routeLineGradient)"
          strokeWidth="2.5"
          strokeDasharray="1 14"
          strokeLinecap="round"
          className="route-path"
        />
        <circle cx="40" cy="60" r="5" fill="var(--color-primary, #f59e0b)" fillOpacity="0.55" />
        <g transform="translate(1226, 118)">
          <circle cx="14" cy="14" r="14" fill="var(--color-primary, #f59e0b)" fillOpacity="0.12" />
          <MapPin x={4} y={4} width={20} height={20} className="text-primary" strokeWidth={2.25} />
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

      {/* Text column */}
      <div className="relative z-10 mx-auto flex w-full max-w-155 flex-col justify-center px-4 py-8 xs:px-6 sm:py-10 lg:mx-0 lg:max-w-none lg:py-14 lg:pl-[6%] lg:pr-8">
        <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-primary-hover sm:mb-5 sm:px-3.5 sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Vizag's trusted cab service
        </span>

        <h1 className="text-[2rem] font-extrabold leading-[1.12] tracking-tight text-slate-900 sm:text-4xl sm:leading-[1.08] md:text-5xl lg:text-[3.25rem] lg:leading-[1.05]">
          Your Journey,{" "}
          <span
            className="text-[#2997FF] font-normal"
            style={{ fontFamily: '"Lavishly Yours", cursive', fontWeight: 400 }}
          >
            Our Responsibility.
          </span>
        </h1>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-500 sm:mt-5 sm:max-w-lg sm:text-base lg:text-base">
          Safe, reliable and affordable taxi service in Visakhapatnam — local rides, outstation
          trips, and airport transfers across Andhra Pradesh.
        </p>



        {/* Trust badges — 4 inline items matching the design */}
        <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-4 xs:grid-cols-2 sm:mt-8 sm:flex sm:flex-wrap sm:gap-x-8">
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

        {/* Floating trust card — desktop only, sits near the route line's
            destination pin. Reuses the previously-unused bsh-float-card
            keyframe so it isn't dead CSS. */}
        <div className="bsh-float-card pointer-events-none absolute right-10 top-8 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white/90 px-4 py-3 shadow-[0_12px_32px_-8px_rgba(16,24,40,0.18)] backdrop-blur-sm xl:flex">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-amber-50 text-amber-500">
            <Star size={16} fill="currentColor" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">4.8 / 5 Rating</p>
            <p className="text-xs text-slate-500">10,000+ happy riders</p>
          </div>
        </div>
      </div>
    </section>
  );
}