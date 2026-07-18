export interface VehicleOption {
  label: string;
  value: number; // rate per km
}

export const vehicles: VehicleOption[] = [
  { label: "Dzire / Sedan", value: 13 },
  { label: "Ertiga / SUV", value: 16 },
  { label: "Innova / MPV", value: 18 },
  { label: "Tempo Traveller", value: 22 },
];