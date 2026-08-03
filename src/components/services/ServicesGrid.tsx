

import SectionHeading from "../ui/SectionHeading";
import { services } from "../../data/servicesData";

import { Link } from "react-router-dom";

export default function ServicesGrid() {
  return (
    <section className="w-full bg-slate-50/60 px-6 py-20 sm:px-10 lg:px-16">
      <SectionHeading eyebrow="Services We Offer" />
      <p className="-mt-8 mb-14 text-center text-base text-slate-500">
        From local travel to outstation journeys, we've got you covered.
      </p>
      <div className="mx-auto grid max-w-[80em] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ slug, icon: Icon, title, description, image }) => (
          <article
            key={slug}
            className="group relative overflow-hidden rounded-3xl bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)] ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(16,24,40,0.12)] hover:ring-primary/15"
          >
            <div className="relative h-52 w-full overflow-hidden">
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/0 to-transparent" />
              <span className="absolute left-6 bottom-5 grid h-13 w-13 place-items-center rounded-2xl bg-white/95 text-primary shadow-lg backdrop-blur-sm ring-1 ring-white/50 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                <Icon size={22} strokeWidth={2} />
              </span>
            </div>
            <div className="px-7 pb-7 pt-6">
              <h3 className="text-lg font-bold tracking-tight text-slate-900">
                {title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-500">
                {description}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">
                <span
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
                >
                  Book Taxi
                </span>
              </div>
            </div>

            {/* Stretched link: makes the whole card clickable */}
            <Link
              to={`/services/${slug}`}
              aria-label={`View details for ${title}`}
              className="absolute inset-0 z-10"
            />

            <span className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-transparent transition-all duration-300 group-hover:ring-primary/10" />
          </article>
        ))}
      </div>
    </section>
  );
}