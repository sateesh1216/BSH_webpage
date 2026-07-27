export interface VehicleOption {
  label: string;
  value: number; // rate per km
}

export const vehicles: VehicleOption[] = [
  { label: "Dzire / Sedan", value: 14 },
  { label: "Ertiga / SUV", value: 17 },
  { label: "Innova / MPV", value: 20 },
  { label: "Tempo Traveller", value: 30 },
];