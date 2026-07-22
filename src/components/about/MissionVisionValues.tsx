import {
  Target,
  Eye,
  ShieldCheck,
  UserRound,
  Clock,
  IndianRupee,
} from "lucide-react";

const coreValues = [
  {
    icon: ShieldCheck,
    title: "Safety First",
    desc: "Your safety is always our top priority.",
  },
  {
    icon: UserRound,
    title: "Customer Commitment",
    desc: "We are committed to providing the best customer experience.",
  },
  {
    icon: Clock,
    title: "Reliable Service",
    desc: "Punctual, dependable and professional service every time.",
  },
  {
    icon: IndianRupee,
    title: "Affordable Pricing",
    desc: "Best prices with no hidden charges.",
  },
];

export default function MissionVisionValues() {
  return (
    <section className="mx-auto w-[92%] max-w-310 pb-16">
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1.4fr]">
        {/* Mission */}
        <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-7">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-primary shadow-sm">
            <Target size={20} />
          </span>
          <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-primary">
            Our Mission
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            To provide safe, reliable, affordable and comfortable
            transportation while exceeding customer expectations.
          </p>
        </div>

        {/* Vision */}
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-7">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-emerald-600 shadow-sm">
            <Eye size={20} />
          </span>
          <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-emerald-600">
            Our Vision
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            To become the most trusted taxi service across Andhra Pradesh
            by delivering world-class travel experiences.
          </p>
        </div>

        {/* Core Values */}
        <div className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
            Our Core Values
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {coreValues.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-light text-primary">
                  <Icon size={17} />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-900">{title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}