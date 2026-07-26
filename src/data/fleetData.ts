import dzire from "../assets/cars/Dzire-taxi-services-in-visakhapatnam-bshtaxiservices.png";
import ertiga from "../assets/cars/ertiga-taxi-services-in-visakhapatnam-bshtaxiservices.png";
import innova from "../assets/cars/innova-crysta-in-vizag-bshtaxiservices.png";
import tempoTraveller from "../assets/cars/17-seater-tempo-traveller-bshtaxiservices.png";

export type VehicleCategory = "Sedan" | "SUV" | "MUV" | "Tempo Traveller" | "Luxury Cars";

export type Vehicle = {
  slug: string;
  name: string;
  category: VehicleCategory;
  image: string;
  seats: number;
  hasAC: boolean;
  bags: number;
  pricePerKm: number;
  description: string;
};

export const vehicles: Vehicle[] = [
  {
    slug: "maruti-swift-dzire",
    name: "Dzire",
    category: "Sedan",
    image: dzire,
    seats: 4,
    hasAC: true,
    bags: 2,
    pricePerKm: 14,
    description: "Perfect for daily city rides and short trips.",
  },
  {
    slug: "maruti-ertiga",
    name: "Ertiga",
    category: "MUV",
    image: ertiga,
    seats: 6,
    hasAC: true,
    bags: 3,
    pricePerKm: 17,
    description: "Ideal for family trips and long drives.",
  },
  {
    slug: "toyota-innova",
    name: "Innova Crysta",
    category: "MUV",
    image: innova,
    seats: 7,
    hasAC: true,
    bags: 4,
    pricePerKm: 20,
    description: "Spacious, comfortable and perfect for outstation.",
  },
  {
    slug: "toyota-innova-crysta",
    name: "Toyota Innova Crysta",
    category: "Luxury Cars",
    image: innova,
    seats: 7,
    hasAC: true,
    bags: 4,
    pricePerKm: 20,
    description: "Luxury and extra comfort for your long journeys.",
  },
  {
    slug: "tempo-traveller-17-seater",
    name: "Tempo Traveller (17 Seater)",
    category: "Tempo Traveller",
    image: tempoTraveller,
    seats: 17,
    hasAC: true,
    bags: 8,
    pricePerKm: 30,
    description: "Best for group travel, tours and pilgrimages.",
  },
  {
    slug: "toyota-fortuner",
    name: "Toyota Fortuner",
    category: "Luxury Cars",
    image: innova, // TODO: replace with a real Fortuner image — see note below
    seats: 7,
    hasAC: true,
    bags: 4,
    pricePerKm: 50,
    description: "Premium SUV for a luxury travel experience.",
  },
];

export const vehicleCategories: VehicleCategory[] = ["Sedan", "SUV", "MUV", "Tempo Traveller", "Luxury Cars"];