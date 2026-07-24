
import { ArrowRight } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { services } from "../../data/servicesData";
import { useBooking } from "../booking/BookingContext";
              const serviceToTab = {
  "local-taxi": "Local",
  "outstation-taxi": "Outstation",
  "airport-transfer": "Airport",
  "tour-packages": "Tour",
  "corporate-travel": "Local",      // choose the tab you want
  "wedding-car-rentals": "Local",   // choose the tab you want
} as const;
export default function ServicesGrid() {
    const { openBooking, setTripType } = useBooking();
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
              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/0 to-transparent" />

              {/* Icon badge, inset into image */}
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
               <button
              onClick={() => {


                const tab = serviceToTab[slug as keyof typeof serviceToTab];

                if (tab) {
                  setTripType(tab);
                }

                openBooking();
              }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
            >
              Book Now
              <ArrowRight size={16} />
            </button>
              </div>
            </div>

            {/* Subtle corner accent on hover */}
            <span className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-transparent transition-all duration-300 group-hover:ring-primary/10" />
          </article>
        ))}
      </div>
    </section>
  );
}