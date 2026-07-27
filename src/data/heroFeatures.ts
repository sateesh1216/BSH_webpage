import { ShieldCheck, Car, Clock, type LucideIcon } from "lucide-react";

export interface HeroFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const heroFeatures: HeroFeature[] = [
  { icon: ShieldCheck, title: "Safe & Secure", description: "Your safety is our priority" },
  { icon: Car, title: "Clean Cars", description: "Well maintained vehicles" },
  { icon: Clock, title: "On Time", description: "Punctual & reliable service" },
];