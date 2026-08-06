export interface NavGrandchild {
  label: string;
  href: string;
}

export interface NavChild {
  label: string;
  href: string;
  /** Optional third-level flyout, e.g. package/duration options for a service */
  children?: NavGrandchild[];
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavChild[];
}

/**
 * IMPORTANT — how the `pkg` query param works:
 * Each grandchild link points at the SAME service detail page as its parent
 * (e.g. /services/local-taxi) but adds a `pkg=` query param. ServiceDetails.tsx
 * reads that param on load and pre-selects the matching fare tab (8 Hours,
 * 10 Hours, etc.) so the visitor lands directly on the package they clicked
 * instead of the default tab.
 *
 * Keep these `pkg` values in sync with `packageParamToTab` in ServiceDetails.tsx.
 *
 * NOTE — Outstation Taxi is the one exception: its third-level flyout below
 * lists actual destinations (Araku, Annavaram, Kakinada, ...) instead of a
 * One Way / Round Trip toggle. Each entry links straight to that
 * destination's own page (/destinations/<slug>), not to a `pkg=` query param.
 */
export const navLinks: NavLink[] = [
  {
    label: "Home",
    href: "/",
  },

  {
    label: "Services",
    href: "/services?type=taxi-services-in-vizag",

    children: [
      {
        label: "All Services",
        href: "/services?type=taxi-services-in-vizag",
      },
      {
        label: "Local Taxi Services",
        href: "/services/local-taxi?type=local-taxi-services",
        children: [
          {
            label: "8 Hr / 80 Km",
            href: "/services/local-taxi/8hr-80km?type=local-taxi-services",
          },
          {
            label: "10 Hr / 100 Km",
            href: "/services/local-taxi/10hr-100km?type=local-taxi-services",
          },
        ],
      },

      {
        label: "Outstation Taxi",
        href: "/services/outstation-taxi?type=outstation-taxi-services",
        children: [
          { label: "Araku Valley", href: "/destinations/araku-valley?type=outstation-taxi-services" },
          { label: "Annavaram", href: "/destinations/annavaram-temple?type=outstation-taxi-services" },
          { label: "Kakinada", href: "/destinations/kakinada?type=outstation-taxi-services" },
          { label: "Rajahmundry", href: "/destinations/rajahmundry?type=outstation-taxi-services" },
          { label: "Vijayawada", href: "/destinations/vijayawada?type=outstation-taxi-services" },
          { label: "Tirupati", href: "/destinations/tirupati?type=outstation-taxi-services" },
          { label: "Hyderabad", href: "/destinations/hyderabad?type=outstation-taxi-services" },
          { label: "Puri (Odisha)", href: "/destinations/puri-odisha?type=outstation-taxi-services" },
        ],
      },

      {
        label: "Airport Transfers",
        href: "/services/airport-transfer?type=airport-taxi",
      },

      {
        label: "Tour Packages",
        href: "/services/tour-packages?type=tour-packages",
        children: [
          {
            label: "Half Day Tour",
            href: "/services/tour-packages?type=tour-packages&pkg=half-day",
          },
          {
            label: "Full Day Tour",
            href: "/services/tour-packages?type=tour-packages&pkg=full-day",
          },
        ],
      },

      {
        label: "Corporate Taxi",
        href: "/services/corporate-travel?type=corporate-cab-services",
        children: [
          {
            label: "One Way",
            href: "/services/corporate-travel?type=corporate-cab-services&pkg=one-way",
          },
          {
            label: "Round Trip",
            href: "/services/corporate-travel?type=corporate-cab-services&pkg=round-trip",
          },
          {
            label: "Hourly",
            href: "/services/corporate-travel?type=corporate-cab-services&pkg=hourly",
          },
          {
            label: "Monthly",
            href: "/services/corporate-travel?type=corporate-cab-services&pkg=monthly",
          },
        ],
      },

      {
        label: "Wedding Car Rentals",
        href: "/services/wedding-car-rentals?type=wedding-car-rentals",
        children: [
          {
            label: "8 Hr Package",
            href: "/services/wedding-car-rentals?type=wedding-car-rentals&pkg=8hr",
          },
          {
            label: "10 Hr Package",
            href: "/services/wedding-car-rentals?type=wedding-car-rentals&pkg=10hr",
          },
        ],
      },
    ],
  },

  {
    label: "Fleet & Pricing",
    href: "/fleet?type=taxi-services-in-vizag",
  },

  {
    label: "Local & Outstation Taxi",
    href: "/Destinations?type=taxi-in-vizag",

    children: [
      {
        label: "All Destinations",
        href: "/Destinations?type=cabs-in-vizag",
      },

      {
        label: "Vizag Local Sightseeing",
        href: "/destinations/vizag-local?type=taxi-services-in-vizag",
      },

      {
        label: "Simhachalam Temple",
        href: "/destinations/simhachalam-temple?type=taxi-in-vizag",
      },

      {
        label: "Vizag Airport",
        href: "/destinations/vizag-airport?type=airport-taxi",
      },

      {
        label: "Araku Valley",
        href: "/destinations/araku-valley?type=vizag-to-araku-taxi",
      },

      {
        label: "Lambasingi",
        href: "/destinations/lambasingi?type=vizag-to-lambasingi-taxi-services",
      },

      {
        label: "Vanjangi Hills",
        href: "/destinations/vanjangi-hills?type=vizag-to-vanjangi-hills-taxi-services",
      },

      {
        label: "Annavaram Temple",
        href: "/destinations/annavaram-temple?type=annavaram-temple-taxi-services",
      },

      {
        label: "Arasavalli Temple",
        href: "/destinations/arasavalli-temple?type=arasavalli-temple-taxi-services",
      },

      {
        label: "Tirupati",
        href: "/destinations/tirupati?type=outstation-taxi-services",
      },
    ],
  },

  {
    label: "About Us",
    href: "/about",
  },

  {
    label: "Contact Us",
    href: "/contact",
  },
];