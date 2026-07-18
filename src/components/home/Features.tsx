import SectionHeading from "../ui/SectionHeading";
import { features } from "../../data/features";

export default function Features() {
  return (
    <section className="py-20">
      <div className="mx-auto w-[92%] max-w-[1240px]">
        <SectionHeading eyebrow="Why Choose Us" title="Built Around Your Comfort" />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary-light text-primary">
                <Icon size={20} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">{title}</h3>
                <p className="mt-1 text-sm text-slate-500">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}