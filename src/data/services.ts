export interface Service {
  number: string;
  title: string;
  description: string;
  href: string;
}

export const services: Service[] = [
  {
    number: "01",
    title: "Local Taxi",
    description: "Comfortable taxi services for your daily travel needs across Visakhapatnam.",
    href: "#home",
  },
  {
    number: "02",
    title: "Outstation Taxi",
    description: "Reliable outstation taxi services for one-way and round trips.",
    href: "#home",
  },
  {
    number: "03",
    title: "Airport Transfer",
    description: "Convenient airport pickup and drop services with professional drivers.",
    href: "#home",
  },
];