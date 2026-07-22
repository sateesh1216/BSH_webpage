import { ShieldCheck, UserCheck, Sparkles, Headset, Car, Phone, BadgeCheck } from "lucide-react";
import { useBooking } from "../booking/BookingContext";
import { vehicles } from "../../data/fleetData";
import heroImage from "../../assets/cars/innova-crysta-in-vizag-bshtaxiservices.png";

const highlights = [
  { icon: ShieldCheck, label: "Well Maintained Vehicles" },
  { icon: UserCheck, label: "Verified & Trained Drivers" },
  { icon: Sparkles, label: "Clean & Sanitized Cabs" },
  { icon: Headset, label: "24/7 Service Available" },
];

export default function FleetHero() {
  const { openBooking } = useBooking();
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-blue-50/80 via-blue-50/30 to-white">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-1/3 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />

      {/* Subtle dot-grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(37,99,235,0.15) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "linear-gradient(to bottom, black, transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-[80em] grid-cols-1 items-center gap-10 px-6 py-14 sm:px-10 lg:grid-cols-2 lg:px-16 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-primary ring-1 ring-primary/15">
            <Car size={14} />
            Our Fleet
          </span>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Comfortable Rides,{" "}
            <span className="bg-linear-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Every Time.
            </span>
          </h1>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-600">
            Choose from our wide range of well-maintained vehicles and travel in comfort, safety and style.
          </p>

          {/* Highlight mini-cards */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
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
  onClick={() => openBooking({ resetTrip: true })}
  className="rounded-lg bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 sm:text-base"
>
  Book a Vehicle
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
            <img src={heroImage} alt="BSH Taxi Services fleet" className="w-full object-contain drop-shadow-2xl" />

            {/* Top-right verified tag */}
            <span className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-primary shadow-md ring-1 ring-white/50">
              <BadgeCheck size={14} />
              Verified Fleet
            </span>
          </div>

          {/* Floating fleet-size badge */}
          <div className="absolute -bottom-4 left-6 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-xl ring-1 ring-slate-100 sm:left-10">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              <Car size={20} strokeWidth={2} />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">{vehicles.length}+ Vehicle Types</p>
              <p className="text-xs text-slate-500">from sedans to tempo travellers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}