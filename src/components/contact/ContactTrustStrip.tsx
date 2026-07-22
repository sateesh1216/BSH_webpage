import { Zap, Headset, Car, ShieldCheck, type LucideIcon } from "lucide-react";

type TrustItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const trustItems: TrustItem[] = [
  { icon: Zap, title: "Fast Response", description: "We respond within minutes" },
  { icon: Headset, title: "Trusted Support", description: "We are here to help" },
  { icon: Car, title: "Easy Booking", description: "Book your ride anytime" },
  { icon: ShieldCheck, title: "Safe & Reliable", description: "Your journey is our priority" },
];

export default function ContactTrustStrip() {
  return (
    <section className="w-full px-6 pb-16 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-[80em] grid-cols-1 gap-6 rounded-2xl bg-blue-50/60 px-8 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {trustItems.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-primary shadow-sm">
              <Icon size={19} strokeWidth={2} />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">{title}</p>
              <p className="text-xs text-slate-500">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}