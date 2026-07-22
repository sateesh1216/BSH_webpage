import { Link } from "react-router-dom";
import { ChevronRight, ShieldCheck, Star, PhoneCall, Users, Clock, MapPinned } from "lucide-react";
import heroImage from "../../assets/Our Services car img's/our services-banner-bshtaxiservices.png";
import { useBooking } from "../booking/BookingContext";

export default function ServicesHero() {
  const { openBooking } = useBooking();

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-blue-50/80 via-blue-50/30 to-white">
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideLeft {
          from { opacity: 0; transform: translateX(24px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .hero-in-1 { animation: fadeSlideUp 0.7s ease-out 0.05s both; }
        .hero-in-2 { animation: fadeSlideUp 0.7s ease-out 0.15s both; }
        .hero-in-3 { animation: fadeSlideUp 0.7s ease-out 0.25s both; }
        .hero-in-4 { animation: fadeSlideUp 0.7s ease-out 0.35s both; }
        .hero-in-image { animation: fadeSlideLeft 0.9s ease-out 0.2s both; }
        @media (prefers-reduced-motion: reduce) {
          .hero-in-1, .hero-in-2, .hero-in-3, .hero-in-4, .hero-in-image { animation: none; }
        }
      `}</style>

      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-1/3 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />

      {/* Signature route-line with traveling marker */}
      <svg
        className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block"
        viewBox="0 0 1600 800"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          id="routePath"
          d="M 420 400 C 650 400, 700 320, 950 300"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="6 10"
          className="text-primary/30"
        />
        <g className="fill-primary">
          <circle r="6" opacity="0.9">
            <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
              <mpath href="#routePath" />
            </animateMotion>
            <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>

      <div className="relative z-10 mx-auto grid w-full max-w-[90em] grid-cols-1 lg:grid-cols-[1fr_1.15fr] lg:gap-6">
        {/* Text column */}
        <div className="px-6 py-8 sm:px-10 lg:px-16 lg:py-12">
          <nav className="hero-in-1 mb-5 flex items-center gap-2 text-sm text-slate-500" aria-label="Breadcrumb">
            <Link
              to="/"
              className="rounded font-medium text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="font-semibold text-slate-700">Services</span>
          </nav>

          <span className="hero-in-1 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary ring-1 ring-primary/20">
            <ShieldCheck size={14} />
            Trusted Since Day One
          </span>

          <h1 className="hero-in-2 mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Our Services
          </h1>

          <p className="hero-in-2 mt-4 text-lg font-semibold text-primary sm:text-xl">
            Safe, Reliable &amp; Comfortable Rides for Every Journey
          </p>

          <p className="hero-in-3 mt-4 max-w-xl text-base leading-relaxed text-slate-600">
            At BSH Taxi Services, we offer a wide range of transportation solutions designed to meet
            your travel needs. Whether it's a short city ride or a long outstation trip, we ensure a
            smooth and memorable journey.
          </p>

          <div className="hero-in-3 mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => openBooking({ resetTrip: true })}
              className="group relative overflow-hidden rounded-lg bg-linear-to-r from-primary to-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-base"
            >
              <span className="relative z-10">Book Your Ride</span>
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
            </button>

            <a
              href="tel:+918886803322"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-700 transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-base"
            >
              <PhoneCall size={16} />
              +91 8886803322
            </a>
          </div>

          {/* Micro-stat strip */}
          <div className="hero-in-4 mt- -1 flex flex-wrap gap-x-8 gap-y-4 border-t border-slate-200/70 pt-4">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">
                <Users size={16} />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">15,000+</p>
                <p className="text-xs text-slate-500">Rides completed</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">
                <MapPinned size={16} />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">20+</p>
                <p className="text-xs text-slate-500">Cities covered</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">
                <Clock size={16} />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">&lt; 10 min</p>
                <p className="text-xs text-slate-500">Avg. response time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Image column — full bleed */}
        <div className="hero-in-image relative h-65 w-full overflow-hidden sm:h-85 lg:h-auto lg:min-h-110 lg:self-stretch lg:rounded-l-[3rem]">
          {/* Blend the photo into the page on its left edge */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden w-32 bg-linear-to-r from-white via-white/60 to-transparent lg:block" />

          <img
            src={heroImage}
            alt="BSH Taxi Services Innova Crysta driving through the city"
            className="h-full w-full scale-105 object-cover transition-transform duration-[3s] ease-out hover:scale-100"
          />

          {/* Graded overlay for a less "flat upload" feel */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/15 via-transparent to-blue-900/10 mix-blend-multiply" />

          {/* Bottom scrim so badges stay legible */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/45 via-black/10 to-transparent" />

          {/* Top-right floating chip */}
          <div className="absolute right-5 top-5 z-20 flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 shadow-lg ring-1 ring-white/60 backdrop-blur-md">
            <Users size={14} className="text-primary" />
            <span className="text-xs font-bold text-slate-800">2,000+ Happy Riders</span>
          </div>

          {/* Bottom-left rating badge — glass, with pulse ring on the star */}
          <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3 rounded-2xl bg-white/90 px-5 py-4 shadow-xl ring-1 ring-white/60 backdrop-blur-md">
            <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-amber-100 text-amber-500">
              <span className="absolute inset-0 animate-ping rounded-full bg-amber-300/40" />
              <Star size={20} fill="currentColor" strokeWidth={0} className="relative" />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">4.9 / 5 Rating</p>
              <p className="text-xs text-slate-500">from 2,000+ happy riders</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}