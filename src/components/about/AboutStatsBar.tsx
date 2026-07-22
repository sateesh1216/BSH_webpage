import { Users, UserRound, Car, ShieldCheck, IndianRupee, Clock } from "lucide-react";

const stats = [
  { icon: Users, value: "20,000+", label: "Happy Customers" },
  { icon: UserRound, value: "150+", label: "Professional Drivers" },
  { icon: Car, value: "50+", label: "Premium Vehicles" },
  { icon: ShieldCheck, value: "10+", label: "Years Experience" },
  { icon: IndianRupee, value: "99%", label: "Customer Satisfaction" },
  { icon: Clock, value: "24x7", label: "Support Available" },
];

export default function AboutStatsBar() {
  return (
    <section className="mx-auto w-[92%] max-w-310 pb-16">
      <div className="flex flex-wrap items-center divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white shadow-sm sm:flex-nowrap sm:divide-x sm:divide-y-0">
        {stats.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="flex w-1/2 min-w-0 items-center gap-3 px-5 py-5 sm:w-auto sm:flex-1 sm:justify-center sm:px-4 lg:px-6"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-primary/25 text-primary">
              <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
            </span>
            <div className="min-w-0 text-left">
              <p className="truncate text-base font-extrabold leading-tight text-primary">
                {value}
              </p>
              <p className="truncate text-[11px] font-medium leading-tight text-slate-500">
                {label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}