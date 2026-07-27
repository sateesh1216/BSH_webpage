import { Car, Route, Plane, Compass, Briefcase, Heart, type LucideIcon } from "lucide-react";

import Local from "../assets/Our Services car img's/vizag-local-taxi-services-bshtaxiservices.png";
import outstation from "../assets/Our Services car img's/outstation-bshtaxiservices.png";
import airport from "../assets/Our Services car img's/vizag-airport-taxi-services-bshtaxiservices.png";
import tour from "../assets/Our Services car img's/Tour Packages-bshtaxiservices.png";
import Wedding from "../assets/Our Services car img's/Wedding-Car-Rentals-bshtaxiservices.png";
import corporate from "../assets/Our Services car img's/Corporate- taxi-services-bshtaxiservices.png";
export type Service = {
  slug: string;
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
};

export const services: Service[] = [
  {
    slug: "local-taxi",
    icon: Car,
    title: "Local Taxi Service",
    description:
      "Comfortable and convenient rides within Visakhapatnam city. Ideal for daily travel, shopping, business meetings and more.",
    image: Local,
  },
  {
    slug: "outstation-taxi",
    icon: Route,
    title: "Outstation Taxi Service",
    description:
      "One-way or round-trip outstation rides to all major destinations. Enjoy a safe and relaxing journey with our expert drivers.",
    image: outstation,
  },
  {
    slug: "airport-transfer",
    icon: Plane,
    title: "Airport Transfer",
    description:
      "Punctual airport pickup and drop services 24/7. We ensure you reach on time, every time.",
    image: airport,
  },
  {
    slug: "tour-packages",
    icon: Compass,
    title: "Tour Packages",
    description:
      "Customizable tour packages to explore Andhra Pradesh's most beautiful tourist destinations with comfort.",
    image: tour,
  },
  {
    slug: "corporate-travel",
    icon: Briefcase,
    title: "Corporate Travel",
    description:
      "Reliable and professional travel solutions for businesses. Perfect for employee transport, meetings and events.",
    image: corporate,
  },
  {
    slug: "wedding-car-rentals",
    icon: Heart,
    title: "Wedding Car Rentals",
    description:
      "Make your special day even more memorable with our premium cars and professional drivers.",
    image: Wedding,
  },
];