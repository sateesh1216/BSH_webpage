import { Car, UserCheck, Clock, ShieldCheck, Tag, type LucideIcon } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";

type Reason = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const reasons: Reason[] = [
  { icon: Car, title: "Comfortable Rides", description: "Well-maintained vehicles for your comfort" },
  { icon: UserCheck, title: "Expert Drivers", description: "Experienced drivers who know the best routes" },
  { icon: Clock, title: "On-Time Service", description: "Punctual pickups and timely drop" },
  { icon: ShieldCheck, title: "Safe & Secure", description: "Your safety is our top priority" },
  { icon: Tag, title: "Best Prices", description: "Affordable fares with no hidden charges" },
];

export default function WhyTravelWithUs() {
  return (
    <section className="w-full bg-slate-50/60 px-6 py-16 sm:px-10 lg:px-16">
      <SectionHeading eyebrow="Why Travel with BSH Taxi Services?" />

      <div className="mx-auto mt-4 grid max-w-[80em] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {reasons.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-white px-5 py-7 text-center shadow-sm transition-all duration-200 hover:-translate-y-1.5 hover:border-primary/20 hover:shadow-lg"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
              <Icon size={22} strokeWidth={2} />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">{title}</p>
              <p className="mt-1 text-xs leading-snug text-slate-500">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}