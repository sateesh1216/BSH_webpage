import { CalendarCheck, UserCog, CarFront, MapPin, ArrowRight, type LucideIcon } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";

type Step = {
  step: number;
  icon: LucideIcon;
  title: string;
  description: string;
};

const steps: Step[] = [
  { step: 1, icon: CalendarCheck, title: "Book Your Ride", description: "Enter your details and choose your service" },
  { step: 2, icon: UserCog, title: "Driver Assigned", description: "We assign the best driver for you" },
  { step: 3, icon: CarFront, title: "Enjoy Your Ride", description: "Relax and enjoy a safe and comfortable ride" },
  { step: 4, icon: MapPin, title: "Reach Destination", description: "We drop you safely at your destination" },
];

export default function HowItWorks() {
  return (
    <section className="relative w-full overflow-hidden px-6 py-20 sm:px-10 lg:px-16">
      {/* Soft ambient backdrop */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative">
        <SectionHeading eyebrow="How It Works" />

        <div className="mx-auto mt-4 grid max-w-[80em] grid-cols-1 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-0">
          {steps.map(({ step, icon: Icon, title, description }, i) => (
            <div key={step} className="relative flex flex-col items-center text-center">
              {/* Connector: dashed gradient line + arrow, desktop only */}
              {i < steps.length - 1 && (
                <div className="absolute left-[calc(50%+2.25rem)] top-9 hidden w-[calc(100%-4.5rem)] items-center lg:flex">
                  <span className="h-px w-full bg-linear-to-r from-primary/40 via-primary/20 to-transparent background-size:8px_1px background-image:repeating-linear-gradient(to_right,_var(--color-primary,_#2563eb)_0,_var(--color-primary,_#2563eb)_6px,_transparent_6px,_transparent_12px) opacity-30" />
                  <ArrowRight size={18} className="absolute right-0 shrink-0 -translate-y-px text-primary/50" />
                </div>
              )}

              {/* Icon circle with layered ring + step badge */}
              <div className="relative z-10 grid h-18 w-18 place-items-center rounded-full bg-white text-primary ring-1 ring-primary/15 shadow-[0_12px_32px_rgba(37,99,235,0.12)] transition-transform duration-300 hover:scale-105">
                <span className="absolute inset-0 rounded-full bg-primary/5" />
                <Icon size={26} strokeWidth={2} className="relative" />
                <span className="absolute -right-1.5 -top-1.5 grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-bold text-white shadow-md ring-4 ring-white">
                  {step}
                </span>
              </div>

              <h3 className="mt-5 text-base font-bold tracking-tight text-slate-900">
                {title}
              </h3>
              <p className="mt-1.5 max-w-48 text-sm leading-relaxed text-slate-500">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}