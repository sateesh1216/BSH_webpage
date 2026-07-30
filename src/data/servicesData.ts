import { Car, Route, Plane, Compass, Briefcase, Heart, type LucideIcon } from "lucide-react";

import Local from "../assets/Our Services car img's/vizag-local-taxi-services-bshtaxiservices.webp";
import outstation from "../assets/Our Services car img's/outstation-bshtaxiservices.webp";
import airport from "../assets/Our Services car img's/vizag-airport-taxi-services-bshtaxiservices.webp";
import tour from "../assets/Our Services car img's/Tourpackages-bshtaxiservices.webp";
import Wedding from "../assets/Our Services car img's/Wedding-Car-Rentals-bshtaxiservices.webp";
import corporate from "../assets/Our Services car img's/Corporate- taxi-services-bshtaxiservices.webp";
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
    title: "Local Taxi Service in Visakhapatnam (Vizag)",
    description:
      "Book reliable local taxi services in Visakhapatnam (Vizag) with BSH Taxi Services. We provide comfortable cabs for city travel, shopping, business meetings, sightseeing, railway station transfers, and daily commuting at affordable prices.",
    image: Local,
  },
  {
    slug: "outstation-taxi",
    icon: Route,
    title: "Outstation Taxi Service from Vizag",
    description:
      "Travel safely with our outstation taxi service from Visakhapatnam (Vizag). We offer one-way and round-trip cab services to Araku, Hyderabad, Vijayawada, Tirupati, Kakinada, Srikakulam, and many other destinations across Andhra Pradesh.",
    image: outstation,
  },
  {
    slug: "airport-transfer",
    icon: Plane,
    title: "Visakhapatnam Airport Taxi Service",
    description:
      "Book 24/7 airport taxi services in Visakhapatnam (Vizag) for airport pickup and drop. Our professional drivers ensure safe, punctual, and affordable transfers to and from Visakhapatnam Airport.",
    image: airport,
  },
  {
    slug: "tour-packages",
    icon: Compass,
    title: "Tour Packages",
    description:
      "Explore the best Visakhapatnam tour packages with BSH Taxi Services. Book comfortable cabs for Araku Valley, Borra Caves, Lambasingi, Simhachalam, and other popular tourist destinations with experienced drivers.",
    image: tour,
  },
  {
    slug: "corporate-travel",
    icon: Briefcase,
    title: "Corporate Taxi Services",
    description:
      "BSH Taxi Services provides reliable corporate taxi services in Visakhapatnam for business meetings, airport transfers, employee transportation, and corporate events with professional drivers and premium vehicles.",
    image: corporate,
  },
  {
    slug: "wedding-car-rentals",
    icon: Heart,
    title: "Wedding Car Rental in Visakhapatnam",
    description:
      "Book luxury wedding car rentals in Visakhapatnam (Vizag) for weddings, receptions, engagements, and special occasions. Choose from premium cars with professional chauffeurs for a memorable experience.",
    image: Wedding,
  },
];