import { Clock, Users, Car } from "lucide-react";

import About  from "../../assets/About/24-7-bshtaxiservices+91 8886803322.webp";

const heroStats = [
  { icon: Clock, value: "5+", label: "Years Experience" },
  { icon: Users, value: "10,000+", label: "Happy Customers" },
  { icon: Car, value: "50+", label: "Premium Vehicles" },
];

export default function AboutHero() {
  return (
    <section className="relative mt-18 overflow-hidden bg-linear-to-b from-primary-light/40 to-white">
      <div className="mx-auto grid w-[92%] max-w-310 items-center gap-10 py-16 lg:grid-cols-2 lg:gap-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
  About BSH Taxi Services
</span>

<h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
  Best Taxi Service in
  <br />
  <span className="text-primary">
    Visakhapatnam (Vizag)
  </span>
</h1>

  <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
    BSH Taxi Services is a trusted provider of <strong>taxi services in Visakhapatnam (Vizag)</strong>, offering
    <em> local taxi services</em>, 
    {" "}
          <a
          href="/destinations/vizag-airport?type=airport-taxi"
          title="Vizag airport Taxi  - BSH Taxi Services"
          aria-label="Vizag airport Taxi  - BSH Taxi Services"
          className="hover:underline"
        >
          airport taxi transfers,
        </a>{" "} 

    
    <strong> outstation taxi services</strong>, 
    {" "}
          <a
          href="/services/corporate-travel?type=corporate-cab-services"
          title="Vizag corporate Taxi  - BSH Taxi Services"
          aria-label="Vizag corporate Taxi  - BSH Taxi Services"
          className="hover:underline"
        >
          corporate cab services,
        </a>{" "} 

    
    and 
     {" "}
          <a
          href="/services/local-taxi/10hr-100km?type=local-taxi-services"
          title="Vizag local Taxi  - BSH Taxi Services"
          aria-label="Vizag local Taxi  - BSH Taxi Services"
          className="hover:underline"
        >
          Vizag tour packages.
        </a>{" "} 

     With experienced drivers,
    well-maintained vehicles, affordable pricing, and 24/7 customer support,
    we ensure every journey is safe, comfortable, and reliable.
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
            src={About}
            alt="BSH Taxi Services car on a coastal highway"
            className="w-full rounded-2xl object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}