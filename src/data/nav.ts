export interface NavChild {
  label: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavChild[];
}

export const navLinks: NavLink[] = [
  {
    label: "Home",
    href: "/",
  },

  {
    label: "Services",
    href: "/services?type=taxi-services-in-vizag",
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

      // {
      //   label: "Arasavalli Temple",
      //   href: "/destinations/arasavalli-temple?type=package",
      // },

      // {
      //   label: "Hyderabad",
      //   href: "/destinations/hyderabad?type=Outstation",
      // },
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