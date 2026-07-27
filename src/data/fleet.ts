export interface FleetCar {
  emoji: string;
  name: string;
  type: string;
  rate: number;
}

export const fleet: FleetCar[] = [
  { emoji: "🚗", name: "Swift Dzire", type: "Comfortable Sedan", rate: 13 },
  { emoji: "🚙", name: "Maruti Ertiga", type: "Spacious Family Car", rate: 16 },
  { emoji: "🚐", name: "Toyota Innova", type: "Premium MPV", rate: 18 },
  { emoji: "🚐", name: "Tempo Traveller", type: "Perfect for Groups", rate: 22 },
];