import SectionHeading from "../ui/SectionHeading";
import { fleet } from "../../data/fleet";

export default function Fleet() {
  return (
    <section id="fleet" className="py-20">
      <div className="mx-auto w-[92%] max-w-[1240px]">
        <SectionHeading eyebrow="Choose Your Ride" title="Our Taxi Fleet" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fleet.map((car) => (
            <article
              key={car.name}
              className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm"
            >
              <div className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-slate-50 text-3xl">
                {car.emoji}
              </div>
              <h3 className="text-lg font-bold text-slate-900">{car.name}</h3>
              <p className="mt-1 text-sm text-slate-500">{car.type}</p>
              <p className="mt-4 text-2xl font-extrabold text-primary">
                ₹{car.rate}
                <span className="text-sm font-medium text-slate-400"> / km</span>
              </p>

              {/* Per spec: only "Our Taxi Fleet -> Book Now" buttons use this gradient */}
              <a
                href="#home"
                className="mt-6 w-full rounded-xl bg-[linear-gradient(135deg,#EFF5FF,#DCEAFF)] py-2.5 text-sm font-semibold text-primary transition-opacity hover:opacity-90"
              >
                Book Now
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}