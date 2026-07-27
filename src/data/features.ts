import { MapPin, Sparkles, ShieldCheck, IndianRupee, type LucideIcon } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const features: Feature[] = [
  { icon: MapPin, title: "Local & Outstation", description: "Reliable rides near and far" },
  { icon: Sparkles, title: "Clean & Safe Cabs", description: "Hygienic and well maintained" },
  { icon: ShieldCheck, title: "Professional Drivers", description: "Trained, verified & courteous" },
  { icon: IndianRupee, title: "Best Price Guarantee", description: "No hidden charges" },
];