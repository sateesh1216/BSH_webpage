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
    href: "/services",
  },

  {
    label: "Fleet & Pricing",
    href: "/fleet",
  },

  {
    label: "Local & Outstation Taxi",
    href: "/Destinations",

    children: [
      {
        label: "All Destinations",
        href: "/Destinations",
      },

      {
        label: "Vizag Local Sightseeing",
        href: "/destinations/vizag-local?type=local",
      },

      {
        label: "Simhachalam Temple",
        href: "/destinations/simhachalam-temple?type=local",
      },

      {
        label: "Vizag Airport",
        href: "/destinations/vizag-airport?type=local",
      },

      {
        label: "Araku Valley",
        href: "/destinations/araku-valley?type=package",
      },

      {
        label: "Lambasingi",
        href: "/destinations/lambasingi?type=package",
      },

      {
        label: "Vanjangi Hills",
        href: "/destinations/vanjangi-hills?type=package",
      },

      {
        label: "Annavaram Temple",
        href: "/destinations/annavaram-temple?type=package",
      },

      {
        label: "Arasavalli Temple",
        href: "/destinations/arasavalli-temple?type=package",
      },

      {
        label: "Tirupati",
        href: "/destinations/tirupati?type=Outstation",
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