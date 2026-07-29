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
    dzire: { oneWay: 1400, roundTrip: 2800 },
    ertiga: { oneWay: 1700, roundTrip: 3400 },
    innova: { oneWay: 2000, roundTrip: 4000 },
    tempo: { oneWay: 3000, roundTrip: 6000 },
  },
  "vizag-airport": {
    dzire: { oneWay: 280, roundTrip: 560 },
    ertiga: { oneWay: 340, roundTrip: 680 },
    innova: { oneWay: 400, roundTrip: 800 },
    tempo: { oneWay: 600, roundTrip: 1200 },
  },
  "simhachalam-temple": {
    dzire: { oneWay: 280, roundTrip: 560 },
    ertiga: { oneWay: 340, roundTrip: 680 },
    innova: { oneWay: 400, roundTrip: 800 },
    tempo: { oneWay: 600, roundTrip: 1200 },
  },
  "araku-valley": {
    dzire: { oneWay: 3500, roundTrip: 7000 },
    ertiga: { oneWay: 4250, roundTrip: 8500 },
    innova: { oneWay: 5000, roundTrip: 10000 },
    tempo: { oneWay: 7500, roundTrip: 15000 },
  },
  "annavaram-temple": {
    dzire: { oneWay: 1540, roundTrip: 3080 },
    ertiga: { oneWay: 1870, roundTrip: 3740 },
    innova: { oneWay: 2200, roundTrip: 4400 },
    tempo: { oneWay: 3300, roundTrip: 6600 },
  },
  "arasavalli-temple": {
    dzire: { oneWay: 3160, roundTrip: 6330 },
    ertiga: { oneWay: 3840, roundTrip: 7680 },
    innova: { oneWay: 4520, roundTrip: 9040 },
    tempo: { oneWay: 6780, roundTrip: 13560 },
  },
  "vanjangi-hills": {
    dzire: { oneWay: 3080, roundTrip: 6160 },
    ertiga: { oneWay: 3740, roundTrip: 7480 },
    innova: { oneWay: 4400, roundTrip: 8800 },
    tempo: { oneWay: 6600, roundTrip: 13200 },
  },
  "lambasingi": {
    dzire: { oneWay: 4900, roundTrip: 9800 },
    ertiga: { oneWay: 5950, roundTrip: 11900 },
    innova: { oneWay: 7000, roundTrip: 14000 },
    tempo: { oneWay: 10500, roundTrip: 21000 },
  },
  "tirupati": {
    dzire: { oneWay: 10920, roundTrip: 21840 },
    ertiga: { oneWay: 13260, roundTrip: 26520 },
    innova: { oneWay: 15600, roundTrip: 31200 },
    tempo: { oneWay: 23400, roundTrip: 46800 },
  },
};
