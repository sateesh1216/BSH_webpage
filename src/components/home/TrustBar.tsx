import { trustItems } from "../../data/trustItems";

export default function TrustBar() {
  return (
    <section className="relative z-10 pb-16">
      <div className="mx-auto w-[92%] max-w-[1240px]">
        <div className="grid gap-8 rounded-2xl border border-slate-100 bg-white px-8 py-10 shadow-[0_10px_30px_rgba(16,24,40,0.06)] sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary-light text-primary">
                <Icon size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{title}</p>
                <p className="text-xs text-slate-500">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}