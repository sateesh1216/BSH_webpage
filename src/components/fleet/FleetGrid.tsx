import { useState } from "react";
import { useBooking } from "../booking/BookingContext";
import { Users, Snowflake, Briefcase, ArrowRight } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import FleetFilterTabs, { type FleetFilter } from "./FleetFilterTabs";
import { vehicles } from "../../data/fleetData";

export default function FleetGrid() {
  const { openBooking } = useBooking();
  const [activeFilter, setActiveFilter] = useState<FleetFilter>("All Vehicles");

  const filteredVehicles =
    activeFilter === "All Vehicles" ? vehicles : vehicles.filter((v) => v.category === activeFilter);

  return (
    <section className="relative w-full overflow-hidden bg-slate-50/60 px-6 py-20 sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-full max-w-6xl -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative">
        <SectionHeading eyebrow="Our Premium Fleet" />
        <p className="-mt-8 mb-10 text-center text-base text-slate-500">
          A wide range of vehicles for every journey and every need.
        </p>

        <div className="mb-14 flex justify-center">
          <FleetFilterTabs active={activeFilter} onChange={setActiveFilter} />
        </div>

        <div className="mx-auto grid max-w-[80em] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVehicles.map(({ slug, name, image, seats, hasAC, bags, pricePerKm, description }) => (
            <article
              key={slug}
              className="group relative overflow-hidden rounded-3xl bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)] ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(16,24,40,0.12)] hover:ring-primary/15"
            >
              <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                <img
                  src={image}
                  alt={name}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                {/* Gradient overlay for legibility + depth */}
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/0 to-transparent" />

                {/* Floating price badge */}
                <span className="absolute right-4 top-4 rounded-xl bg-white/95 px-3.5 py-2 text-right shadow-lg backdrop-blur-sm ring-1 ring-white/50">
                  <span className="block text-lg font-extrabold leading-none text-primary">
                    ₹{pricePerKm}
                  </span>
                  <span className="block text-[11px] font-medium leading-none text-slate-500 mt-0.5">/ KM</span>
                </span>
              </div>

              <div className="px-7 pb-7 pt-6">
                <h3 className="text-lg font-bold tracking-tight text-slate-900">{name}</h3>

                <div className="mt-3.5 flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-100">
                    <Users size={13} className="text-primary" /> {seats} Seater
                  </span>
                  {hasAC && (
                    <span className="flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-100">
                      <Snowflake size={13} className="text-primary" /> AC
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-100">
                    <Briefcase size={13} className="text-primary" /> {bags} Bags
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-500">{description}</p>

                <div className="mt-5 border-t border-slate-100 pt-5">
                  <button
  type="button"
  onClick={() =>
    openBooking({
      vehicleName: name,
      resetTrip: true,
    })
  }
  className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
>
  Book Now
  <ArrowRight
    size={16}
    className="transition-transform duration-300 group-hover:translate-x-0.5"
  />
</button>
                </div>
              </div>

              {/* Subtle corner accent on hover */}
              <span className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-transparent transition-all duration-300 group-hover:ring-primary/10" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}