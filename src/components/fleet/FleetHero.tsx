import {
  ShieldCheck,
  UserCheck,
  Sparkles,
  Headset,

  Phone,
  BadgeCheck,

} from "lucide-react";

import { useBooking } from "../booking/BookingContext";


const highlights = [
  {
    icon: ShieldCheck,
    title: "Safe Vehicles",
    text: "Regularly serviced & safety checked",
  },
  {
    icon: UserCheck,
    title: "Professional Drivers",
    text: "Experienced & verified chauffeurs",
  },
  {
    icon: Sparkles,
    title: "Clean Interiors",
    text: "Sanitized before every trip",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    text: "Always available for your journey",
  },
];



export default function FleetHero() {
  const { openBooking } = useBooking();

  return (
    <section className="relative mt-8 overflow-hidden bg-linear-to-br from-blue-50 via-white to-sky-50">
      <style>{`
        @keyframes fadeUp{
          from{
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

        @media(prefers-reduced-motion:reduce){
          .fade-1,
          .fade-2,
          .fade-3,
          .fade-4{
            animation:none;
            opacity:1;
          }
        }
      `}</style>

      {/* Background Blobs */}
      <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl" />
      <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mt-8 mx-auto max-w-7xl px-6 py-20 lg:px-10">

        {/* Badge */}
        <div className="fade-1 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary ring-1 ring-primary/20">
            <BadgeCheck size={30} />
            Premium Fleet & Transparent Pricing
          </span>
        </div>

        {/* Heading */}
        <h1 className="fade-2 mx-auto mt-6 max-w-5xl text-center text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Choose the Perfect Vehicle
          <span className="block bg-linear-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            For Every Journey
          </span>
        </h1>

        {/* Description */}
        <p className="fade-3 mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-slate-600">
          Whether you're looking for a compact sedan, premium SUV,
          spacious Innova Crysta, Tempo Traveller or luxury vehicle,
          BSH Taxi Services provides comfortable, clean and reliable
          transportation for airport transfers, local rides,
          outstation trips, corporate travel and family vacations.
        </p>

        {/* CTA Buttons */}
        <div className="fade-3 mt-10 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => openBooking({ resetTrip: true })}
            className="rounded-xl bg-primary px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700"
          >
            Book Your Vehicle
          </button>

          <a
            href="tel:+918886803322"
            className="flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-8 py-4 font-bold text-slate-700 transition hover:border-primary hover:text-primary"
          >
            <Phone size={18} />
            +91 8886803322
          </a>
        </div>

        {/* Feature Cards */}
        <div className="fade-4 mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {highlights.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-primary/20 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon size={24} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {text}
              </p>
            </div>
          ))}
        </div>
                {/* Statistics */}
        {/* <div className="fade-4 mt-13 rounded-3xl border border-slate-200 bg-white/10 p-4 shadow-lg backdrop-blur">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="group text-center transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                  <Icon size={28} />
                </div>

                <h3 className="mt-4 text-3xl font-extrabold text-slate-900">
                  {value}
                </h3>

                <p className="mt-2 text-sm font-medium text-slate-600">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div> */}

        {/* Bottom Premium Banner */}
        {/* <div className="fade-4 mt-12 overflow-hidden rounded-3xl bg-linear-to-r from-primary via-blue-600 to-sky-600 px-8 py-6 text-white shadow-2xl">

          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">

            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-extrabold">
                Travel With Confidence
              </h2>

              <p className="mt-3 max-w-2xl text-base leading-7 text-blue-100">
                Every vehicle in our fleet is professionally maintained,
                thoroughly cleaned, and driven by experienced chauffeurs.
                Whether you're planning a local trip, airport transfer,
                corporate ride, pilgrimage, or outstation journey, we
                guarantee a safe, comfortable, and affordable travel
                experience.
              </p>
            </div>

            <button
              onClick={() => openBooking({ resetTrip: true })}
              className="rounded-xl bg-white px-8 py-4 font-bold text-primary shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              Book Your Ride
            </button>

          </div>
        </div> */}

      </div>
    </section>
  );
}
