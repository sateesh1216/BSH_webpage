import { useBooking } from "../booking/BookingContext";
import { Compass, ShieldCheck, UserCheck, Tag, Phone } from "lucide-react";
import heroImage from "../../assets/cars/innova-crysta-in-vizag-bshtaxiservices.png";

const highlights = [
  { icon: Compass, label: "Best Tourist Spots" },
  { icon: ShieldCheck, label: "Safe & Comfortable" },
  { icon: UserCheck, label: "Professional Drivers" },
  { icon: Tag, label: "Affordable Prices" },
];

export default function DestinationsHero() {
  const { openBooking, setTripType } = useBooking();
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-blue-50/80 via-blue-50/30 to-white">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-1/3 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-[80em] grid-cols-1 items-center gap-10 px-6 py-14 sm:px-10 lg:grid-cols-2 lg:px-16 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-primary ring-1 ring-primary/15">
            <Compass size={14} />
            Destinations
          </span>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Explore Amazing{" "}
            <span className="bg-linear-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Destinations
            </span>
          </h1>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-600">
            Discover beautiful places across Andhra Pradesh with BSH Taxi Services. Safe, comfortable
            and memorable journeys await you.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
            {highlights.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-linear-to-br from-primary/15 to-blue-100 text-primary">
                  <Icon size={17} strokeWidth={2} />
                </span>
                <span className="text-sm font-semibold text-slate-700">{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
           <button
  type="button"
  onClick={() => {
    setTripType("Tour");
    openBooking({ resetTrip: true });
  }}
  className="rounded-lg bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 sm:text-base"
>
  Plan Your Trip
</button>
            <a
              href="tel:+918886803322"
              className="flex items-center gap-2 rounded-lg border-2 border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-700 transition-colors hover:border-primary hover:text-primary sm:text-base"
            >
              <Phone size={16} />
              +91 8886803322
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-x-8 bottom-6 h-3/4 rounded-3xl bg-linear-to-tr from-primary/15 to-blue-200/30 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/40 p-6 shadow-2xl shadow-primary/10 backdrop-blur-sm sm:p-10">
            <img src={heroImage} alt="BSH Taxi Services outstation cab" className="w-full object-contain drop-shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}