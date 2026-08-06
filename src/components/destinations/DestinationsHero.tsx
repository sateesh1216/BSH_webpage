import { useBooking } from "../booking/BookingContext";
import {
  Compass,
  ShieldCheck,
  UserCheck,
  Tag,
  Phone,
} from "lucide-react";

const highlights = [
  { icon: Compass, label: "Best Tourist Spots" },
  { icon: ShieldCheck, label: "Safe & Comfortable" },
  { icon: UserCheck, label: "Professional Drivers" },
  { icon: Tag, label: "Affordable Prices" },
];

export default function DestinationsHero() {
  const { openBooking, setTripType } = useBooking();

  return (
    <section className="relative mt-8 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
      {/* Background Blur */}
      <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px]" />

      <div className="relative mt-8 mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          <Compass size={30} />
          Destinations
        </span>

        {/* Heading */}
      
        <h1 className="mt-6 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Discover Amazing {" "}
          <span className="block bg-linear-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
            Destinations
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          BSH Taxi Services is a <b>trusted taxi service in Vizag,</b> 
          offering safe and affordable cab services across Visakhapatnam. 
          <b>From airport transfers and local sightseeing to outstation trips,</b> 
          our experienced drivers ensure a comfortable travel experience. 
          <i> Call +91 8886803322</i> to book your ride today.
        </p>

        {/* Highlight Cards */}
        <div className="mt-14 grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="group rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:scale-110">
                <Icon size={30} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {label}
              </h3>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-14 flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              setTripType("Tour");
              openBooking({ resetTrip: true });
            }}
            className="rounded-xl bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            Plan Your Trip
          </button>

          <a
            href="tel:+918886803322"
            className="flex items-center justify-center gap-2 rounded-xl border-2 border-primary bg-white px-8 py-4 text-base font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-white"
          >
            <Phone size={18} />
            +91 8886803322
          </a>
        </div>
      </div>
    </section>
  );
}