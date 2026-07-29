import type { VehicleId } from "./bookingConfig";

/* ---------------------------------------------------------------------- */
/*  Fixed, hand-set prices — NOT calculated from distance/km at runtime.   */
/*  Edit the numbers below directly to change what a customer sees for a   */
/*  given destination + car + trip type. Add a new destination slug here   */
/*  (matching the slug in POPULAR_SLUGS in MobileSearchBar.tsx, and in     */
/*  destinationsData.ts) to give it its own prices — any destination/car   */
/*  combination that isn't listed just falls back to "Contact for pricing".*/
/* ---------------------------------------------------------------------- */

export type FixedPriceEntry = {
  oneWay?: number;
  roundTrip?: number;
};

export const FIXED_PRICES: Record<string, Partial<Record<VehicleId, FixedPriceEntry>>> = {
  "vizag-local": {
    dzire: { "oneWay": 2500, "roundTrip": 3000 },
    ertiga: { "oneWay": 1700, "roundTrip": 3500 },
    innova: { "oneWay": 2000, "roundTrip": 4000 },
    tempo: { "oneWay": 3000, "roundTrip": 6000 },
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
