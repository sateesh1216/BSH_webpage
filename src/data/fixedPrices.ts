import type { VehicleId } from "./bookingConfig";



export type HourlyPackages = {
  "8hr80km"?: number;
  "10hr100km"?: number;
};

export type FixedPriceEntry = {
  oneWay?: number;
  roundTrip?: number;
  hourly?: HourlyPackages;
};

export const FIXED_PRICES: Record<string, Partial<Record<VehicleId, FixedPriceEntry>>> = {
  // "vizag-local" has no oneWay/roundTrip fixed prices (shows "Contact for
  // pricing" for those tabs), but DOES have Hourly package pricing below.
  "vizag-local": {
    dzire: {
      hourly: { "8hr80km": 2500, "10hr100km": 3000 },
    },
    ertiga: {
     hourly: { "8hr80km": 3000, "10hr100km": 3500 },
    },
    innova: {
       hourly: { "8hr80km": 3500, "10hr100km": 4000 },
    },
    tempo: {
 hourly: { "8hr80km": 8000, "10hr100km": 8000 },
    },
  },
  "vizag-airport": {
    dzire: { oneWay: 1500, roundTrip: 2500 },
    ertiga: { oneWay: 1800, roundTrip: 2800 },
    innova: { oneWay: 2000, roundTrip: 4000 },
    tempo: { oneWay: 4000, roundTrip: 6000 },
  },
  "simhachalam-temple": {
    dzire: { oneWay: 1500, roundTrip: 2500 },
    ertiga: { oneWay: 1800, roundTrip: 2800 },
    innova: { oneWay: 2000, roundTrip: 4000 },
    tempo: { oneWay: 4000, roundTrip: 6000 },
  },
  "araku-valley": {
    dzire: { oneWay: 4500, roundTrip: 5000 },
    ertiga: { oneWay: 6500, roundTrip: 7000 },
    innova: { oneWay: 7500, roundTrip: 8000 },
    tempo: { oneWay: 7500, roundTrip: 15000 },
  },
  "annavaram-temple": {
    dzire: { oneWay: 4500, roundTrip: 5000 },
    ertiga: { oneWay: 6500, roundTrip: 7000 },
    innova: { oneWay: 7500, roundTrip: 8000 },
    tempo: { oneWay: 7500, roundTrip: 15000 },
  },
  "arasavalli-temple": {
    dzire: { oneWay: 4500, roundTrip: 5000 },
    ertiga: { oneWay: 6500, roundTrip: 7000 },
    innova: { oneWay: 7500, roundTrip: 8000 },
    tempo: { oneWay: 7500, roundTrip: 15000 },
  },
  "vanjangi-hills": {
    dzire: { oneWay: 5000, roundTrip: 5500 },
    ertiga: { oneWay: 7000, roundTrip: 7500 },
    innova: { oneWay: 7500, roundTrip: 8000 },
    tempo: { oneWay: 7500, roundTrip: 15000 },
  },
  "lambasingi": {
    dzire: { oneWay: 5000, roundTrip: 5500 },
    ertiga: { oneWay: 7000, roundTrip: 7500 },
    innova: { oneWay: 7500, roundTrip: 8000 },
    tempo: { oneWay: 7500, roundTrip: 15000 },
  },
  "tirupati": {
    dzire: { oneWay: 20800, roundTrip: 22400 },
    ertiga: { oneWay: 25600, roundTrip: 27200 },
    innova: { oneWay: 30400, roundTrip: 32000 },
    tempo: { oneWay: 46400, roundTrip: 48000 },
  },
};