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
    { label: "Kakinada", href: "/outstation/kakinada" },
    { label: "Araku", href: "/outstation/araku" },
    { label: "Vijayawada", href: "/outstation/vijayawada" },
    { label: "Rajahmundry", href: "/outstation/rajahmundry" },
    { label: "Vizianagaram", href: "/outstation/vizianagaram" },
    { label: "Srikakulam", href: "/outstation/srikakulam" },

    { label: "Amadalavalasa", href: "/outstation/amadalavalasa" },
    { label: "Annavaram", href: "/outstation/annavaram" },
    { label: "Arasavalli", href: "/outstation/arasavalli" },
    { label: "Bangalore", href: "/outstation/bangalore" },
    { label: "Bhadrachalam", href: "/outstation/bhadrachalam" },
    { label: "Bhubaneswar", href: "/outstation/bhubaneswar" },
    { label: "Bobbili", href: "/outstation/bobbili" },
    { label: "Chennai", href: "/outstation/chennai" },
    { label: "Eluru", href: "/outstation/eluru" },
    { label: "Guntur", href: "/outstation/guntur" },
    { label: "Hyderabad", href: "/outstation/hyderabad" },
    { label: "Ichchapuram", href: "/outstation/ichchapuram" },
    { label: "Jagdalpur", href: "/outstation/jagdalpur" },
    { label: "Khammam", href: "/outstation/khammam" },
    { label: "Kolkata", href: "/outstation/kolkata" },
    { label: "Kurnool", href: "/outstation/kurnool" },
    { label: "Lambasingi", href: "/outstation/lambasingi" },
    { label: "Narasannapeta", href: "/outstation/narasannapeta" },
    { label: "Nellore", href: "/outstation/nellore" },
    { label: "Palakollu", href: "/outstation/palakollu" },
    { label: "Palakonda", href: "/outstation/palakonda" },
    { label: "Palasa", href: "/outstation/palasa" },
    { label: "Parvathipuram", href: "/outstation/parvathipuram" },
    { label: "Raipur", href: "/outstation/raipur" },
    { label: "Ravulapalem", href: "/outstation/ravulapalem" },
    { label: "Razam", href: "/outstation/razam" },
    { label: "Sompeta", href: "/outstation/sompeta" },
    { label: "Srimukhalingam", href: "/outstation/srimukhalingam" },
    { label: "Tirupati", href: "/outstation/tirupati" },
    { label: "Tuni", href: "/outstation/tuni" },
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