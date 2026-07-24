import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { destinations } from "../../data/destinationsData";

export default function DestinationsGrid() {
  return (
    <section className="w-full px-6 py-20 sm:px-10 lg:px-16">
      <SectionHeading eyebrow="Popular Destinations" />
      <p className="-mt-8 mb-14 text-center text-base text-slate-500">
        Handpicked beautiful places you must visit
      </p>

      <div className="mx-auto grid max-w-[80em] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map(({ slug, name, image, distanceFromVizag, description }) => (
          <article
            key={slug}
            className="group overflow-hidden rounded-3xl bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)] ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(16,24,40,0.12)] hover:ring-primary/15"
          >
            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
              <img
                src={image}
                alt={name}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/0 to-transparent" />
            </div>

            <div className="px-6 pb-6 pt-5">
              <h3 className="text-lg font-bold tracking-tight text-slate-900">{name}</h3>
              <p className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-primary">
                <MapPin size={14} />
                {distanceFromVizag}
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-500">{description}</p>

              <Link
                to={`/destinations/${slug}`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all hover:gap-2.5"
              >
                Explore Route
                <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}