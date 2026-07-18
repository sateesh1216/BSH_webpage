import { ShieldCheck, Gift, UserCheck, Headset, type LucideIcon } from "lucide-react";

export interface TrustItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const trustItems: TrustItem[] = [
  { icon: ShieldCheck, title: "24/7 Service", description: "We are available every time for you" },
  { icon: Gift, title: "Affordable Rates", description: "Best prices with no hidden charges" },
  { icon: UserCheck, title: "Professional Drivers", description: "Experienced & verified drivers" },
  { icon: Headset, title: "Customer Support", description: "Dedicated support whenever you need" },
];