import { ArrowRight } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { services } from "../../data/services";

export default function Services() {
  return (
    <section id="services" className="bg-slate-50/60 py-20">
      <div className="mx-auto w-[92%] max-w-[1240px]">
        <SectionHeading eyebrow="Our Services" title="Travel Your Way" />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.number}
              className="group rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 text-3xl font-extrabold text-primary/15">{service.number}</div>
              <h3 className="text-lg font-bold text-slate-900">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{service.description}</p>
              <a href={service.href} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Book a Ride
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}