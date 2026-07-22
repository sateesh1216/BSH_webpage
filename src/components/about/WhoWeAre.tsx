import { CheckCircle2 } from "lucide-react";

const highlights = [
  "Licensed & Verified Drivers",
  "GPS Enabled Cabs",
  "Clean & Sanitized Vehicles",
  "On-time Pickup Guarantee",
  "Transparent Pricing",
  "24x7 Customer Support",
];

export default function WhoWeAre() {
  return (
    <section className="mx-auto w-[92%] max-w-310 py-16">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=80"
          alt="Driver assisting a customer with airport pickup"
          className="w-full rounded-2xl object-cover shadow-md"
        />

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Who We Are
          </span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Trusted Taxi Service in Visakhapatnam
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            BSH Taxi Services is a leading taxi provider based in
            Visakhapatnam, offering a wide range of travel solutions
            including Local, Outstation, Airport Transfers and Tour
            Packages. We are committed to delivering a travel experience
            that is safe, comfortable and affordable.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <CheckCircle2 size={18} className="shrink-0 text-primary" />
                <span className="text-sm font-medium text-slate-700">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}