import type { LucideIcon } from "lucide-react";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export type ContactInfoItem = {
  id: string;
  icon: LucideIcon;
  title: string;
  lines: string[];
  href?: string;
};

export const contactInfoItems: ContactInfoItem[] = [
  {
    id: "office",
    icon: MapPin,
    title: "Our Office",
    lines: [
      "36-92-242-532/1, Palanati Colony,",
      "Kancharapalem, Visakhapatnam,",
      "Andhra Pradesh - 530008",
    ],
  },
  {
    id: "call",
    icon: Phone,
    title: "Call Us",
    lines: ["+91 8886803322", "Mon - Sun: 24/7 Available"],
    href: "tel:+918886803322",
  },
  {
    id: "email",
    icon: Mail,
    title: "Email Us",
    lines: ["info.bshtaxiservices@gmail.com", "We reply within 30 minutes"],
    href: "mailto:info.bshtaxiservices@gmail.com",
  },
  {
    id: "hours",
    icon: Clock,
    title: "Working Hours",
    lines: ["Monday - Sunday", "24 Hours / 7 Days"],
  },
  {
    id: "whatsapp",
    icon: MessageCircle,
    title: "WhatsApp",
    lines: ["+91 8886803322", "Chat with us on WhatsApp"],
    href: "https://wa.me/918886803322",
  },
];