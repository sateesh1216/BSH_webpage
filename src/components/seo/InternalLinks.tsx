import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

type InternalLink = {
  label: string;
  href: string;
  description: string;
};

export const defaultLinks: InternalLink[] = [
  {
    label: "Taxi Service in Vizag",
    href: "/services",
    description: "Explore local, airport and outstation taxi services in Visakhapatnam.",
  },
  {
    label: "Local Taxi Service in Vizag",
    href: "/services/local-taxi",
    description: "Book hourly local cab packages for city travel and sightseeing.",
  },
  {
    label: "Airport Taxi in Vizag",
    href: "/services/airport-transfer",
    description: "Arrange reliable pickup and drop service to Visakhapatnam Airport.",
  },
  {
    label: "Outstation Taxi from Vizag",
    href: "/services/outstation-taxi",
    description: "Compare one-way and round-trip cab options for outstation travel.",
  },
  {
    label: "Tour Packages in Vizag",
    href: "/services/tour-packages",
    description: "Discover convenient half-day and full-day local tour packages.",
  },
  {
    label: "Taxi Fleet & Pricing",
    href: "/fleet",
    description: "View available cars, seating capacity and pricing information.",
  },
  {
    label: "Vizag Local Sightseeing",
    href: "/destinations/vizag-local",
    description: "Plan a local sightseeing trip around Visakhapatnam.",
  },
  {
    label: "Araku Valley Taxi",
    href: "/destinations/araku-valley",
    description: "Plan a comfortable taxi trip from Vizag to Araku Valley.",
  },
  {
    label: "Lambasingi Taxi",
    href: "/destinations/lambasingi",
    description: "Explore taxi options for a trip to Lambasingi.",
  },
  {
    label: "Vizag Airport",
    href: "/destinations/vizag-airport",
    description: "Find airport travel information and taxi options.",
  },
  {
    label: "All Taxi Destinations",
    href: "/destinations",
    description: "Browse popular taxi destinations, sightseeing routes and outstation travel pages.",
  },
  {
    label: "About BSH Taxi Services",
    href: "/about",
    description: "Learn more about BSH Taxi Services and our travel team.",
  },
  {
    label: "Contact BSH Taxi Services",
    href: "/contact",
    description: "Get in touch for taxi bookings, fares and trip assistance.",
  },
];


export const serviceRelatedLinks: InternalLink[] = defaultLinks.filter((link) =>
  [
    "/services/local-taxi",
    "/services/airport-transfer",
    "/services/outstation-taxi",
    "/services/tour-packages",
    "/fleet",
    "/destinations/vizag-local",
    "/about",
    "/contact",
  ].includes(link.href)
);

export const destinationRelatedLinks: InternalLink[] = defaultLinks.filter((link) =>
  [
    "/services",
    "/services/local-taxi",
    "/services/airport-transfer",
    "/services/outstation-taxi",
    "/fleet",
    "/destinations/vizag-local",
    "/about",
    "/contact",
  ].includes(link.href)
);

export const detailRelatedLinks: InternalLink[] = defaultLinks.filter((link) =>
  [
    "/services",
    "/services/local-taxi",
    "/services/airport-transfer",
    "/services/outstation-taxi",
    "/fleet",
    "/destinations",
    "/about",
    "/contact",
  ].includes(link.href)
);

type InternalLinksProps = {
  title?: string;
  description?: string;
  links?: InternalLink[];
  className?: string;
};

export default function InternalLinks({
  title = "Explore Our Taxi Services",
  description = "Use these related pages to find the right taxi, cab or travel service for your trip from Vizag.",
  links = defaultLinks,
  className = "",
}: InternalLinksProps) {
  return (
    <section
      aria-labelledby="related-taxi-links"
      className={`mx-auto w-full max-w-7xl px-6 py-14 sm:px-10 lg:px-16 ${className}`}
    >
      <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8 lg:p-10">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Related Pages
          </p>
          <h2
            id="related-taxi-links"
            className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            {title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            {description}
          </p>
        </div>

        <nav aria-label="Related taxi service pages" className="mt-7">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {links.map((link) => (
              <li key={`${link.href}-${link.label}`}>
                <Link
                  to={link.href}
                  className="group block h-full rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-sm font-bold text-slate-900 group-hover:text-primary">
                      {link.label}
                    </span>
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-primary"
                    />
                  </span>
                  <span className="mt-2 block text-xs leading-5 text-slate-500">
                    {link.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
