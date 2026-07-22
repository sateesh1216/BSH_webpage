import { Clock, Users, Car } from "lucide-react";

const heroStats = [
  { icon: Clock, value: "10+", label: "Years Experience" },
  { icon: Users, value: "20,000+", label: "Happy Customers" },
  { icon: Car, value: "50+", label: "Premium Vehicles" },
];

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-primary-light/40 to-white">
      <div className="mx-auto grid w-[92%] max-w-310 items-center gap-10 py-16 lg:grid-cols-2 lg:gap-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            About Us
          </span>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            About
            <br />
            <span className="text-primary">BSH Taxi Services</span>
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">
            Your trusted travel partner for safe, reliable and comfortable
            journeys across Visakhapatnam and Andhra Pradesh.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {heroStats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary-light text-primary">
                  <Icon size={16} />
                </span>
                <div>
                  <p className="text-sm font-extrabold leading-tight text-slate-900">
                    {value}
                  </p>
                  <p className="text-xs font-medium leading-tight text-slate-500">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-4xl bg-linear-to-br from-primary/10 to-transparent" />
          <img
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80"
            alt="BSH Taxi Services car on a coastal highway"
            className="w-full rounded-2xl object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}