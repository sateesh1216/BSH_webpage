import { Link } from "react-router-dom";
import {
  ChevronRight,
  ShieldCheck,
  PhoneCall,
  Users,
  Clock,
  MapPinned,
  Star,
} from "lucide-react";
import { useBooking } from "../booking/BookingContext";

export default function ServicesHero() {
  const { openBooking } = useBooking();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-sky-50">
      <style>{`
        @keyframes fadeUp {
          from {
            opacity:0;
            transform:translateY(25px);
          }
          to{
            opacity:1;
            transform:translateY(0);
          }
        }

        .fade-1{
          animation:fadeUp .6s ease forwards;
        }

        .fade-2{
          animation:fadeUp .6s .15s ease forwards;
          opacity:0;
        }

        .fade-3{
          animation:fadeUp .6s .3s ease forwards;
          opacity:0;
        }

        .fade-4{
          animation:fadeUp .6s .45s ease forwards;
          opacity:0;
        }

        @media (prefers-reduced-motion:reduce){
          .fade-1,.fade-2,.fade-3,.fade-4{
            animation:none;
            opacity:1;
          }
        }
      `}</style>

      {/* Background Blur */}
      <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl" />
      <div className="absolute left-1/2 bottom-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-10">

        {/* Breadcrumb */}
        <nav
          className="fade-1 mb-6 flex items-center justify-center gap-2 text-sm text-slate-500"
          aria-label="Breadcrumb"
        >
          <Link
            to="/"
            className="font-medium text-primary hover:underline"
          >
            Home
          </Link>

          <ChevronRight size={14} />

          <span className="font-semibold text-slate-700">
            Services
          </span>
        </nav>

        {/* Badge */}
        <div className="fade-1 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary ring-1 ring-primary/20">
            <ShieldCheck size={35} />
            Trusted Taxi Service in Vizag
          </span>
        </div>

        {/* Heading */}
        <h1 className="fade-2 mx-auto mt-6 max-w-4xl text-center text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Reliable Taxi Services
          <span className="block text-primary">
            For Every Journey
          </span>
        </h1>

        {/* Subtitle */}
        <p className="fade-3 mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-slate-600">
          Whether you're planning a local trip, airport transfer,
          outstation journey, corporate travel, or family vacation,
          BSH Taxi Services delivers safe, affordable, and comfortable
          rides with professional drivers and well-maintained vehicles.
        </p>

        {/* Buttons */}
        <div className="fade-3 mt-10 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => openBooking({ resetTrip: true })}
            className="rounded-xl bg-primary px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700"
          >
            Book Your Ride
          </button>

          <a
            href="tel:+918886803322"
            className="flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-8 py-4 font-bold text-slate-700 transition hover:border-primary hover:text-primary"
          >
            <PhoneCall size={20} />
            +91 8886803322
          </a>
        </div>

        {/* Feature Cards */}
        <div className="fade-4 mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 text-center shadow-sm backdrop-blur">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Users size={26} />
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              15,000+
            </h3>

            <p className="mt-2 text-slate-600">
              Happy Customers
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 text-center shadow-sm backdrop-blur">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MapPinned size={26} />
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              20+
            </h3>

            <p className="mt-2 text-slate-600">
              Cities Covered
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 text-center shadow-sm backdrop-blur">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Clock size={26} />
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              &lt;10 Min
            </h3>

            <p className="mt-2 text-slate-600">
              Quick Response
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 text-center shadow-sm backdrop-blur">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-500">
              <Star fill="currentColor" size={24} />
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              5.0 Rating
            </h3>

            <p className="mt-2 text-slate-600">
              Trusted by Thousands
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
