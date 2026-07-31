import { CheckCircle2 } from "lucide-react";

import Whyweare  from "../../assets/About/about-bshtaxiservices+91 8886803322.webp";      

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
          src={Whyweare}
          alt="Driver assisting a customer with airport pickup"
          className="w-full rounded-2xl object-cover shadow-md"
        />

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
  Who We Are
</span>

<h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
    Reliable Taxi Services Across Vizag
</h1>

<p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
  BSH Taxi Services is one of the most trusted providers of <strong>taxi services in Visakhapatnam (Vizag)</strong>, offering reliable
  <strong> local taxi services</strong>, <strong>airport taxi transfers</strong>,
  <strong> outstation taxi services</strong>, <strong>corporate cab services</strong>,
  <strong> wedding car rentals</strong>, and <strong>Vizag tour packages</strong>.
  With experienced drivers, well-maintained vehicles, transparent pricing,
  and 24/7 customer support, we are committed to providing safe, comfortable,
  affordable, and on-time transportation across Visakhapatnam and Andhra Pradesh.
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