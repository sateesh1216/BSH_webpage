// ============================================================================
// Outstation Taxi Pricing — BSH Taxi Services
// STATIC PRICE TABLE — edit any number below to change pricing for that
// route + vehicle. Nothing here is calculated automatically anymore.
// ============================================================================

import type { VehicleOption } from "./Outstationtaxidata";

export type VehicleSlug =
  | "swift-dzire"
  | "ertiga"
  | "innova-crysta"
  | "tempo-traveller";

/**
 * Round-trip price (₹) for each outstation route, per vehicle.
 * Key = outstation `slug` from your outstations array.
 * These starting numbers were generated once from the old formula
 * (2 × one-way km × extraKmRate, rounded up to ₹100, floored at
 * basePackagePrice) purely so every route has a sensible default —
 * edit any value freely from here on.
 */
export const outstationPrices: Record<string, Record<VehicleSlug, number>> = {
  kakinada: { "swift-dzire": 3700, "ertiga": 4500, "innova-crysta": 5400, "tempo-traveller": 8000 }, // Kakinada — 140 km one-way
  araku: { "swift-dzire": 3200, "ertiga": 3900, "innova-crysta": 4600, "tempo-traveller": 6800 }, // Araku — 120 km one-way
  vijayawada: { "swift-dzire": 9100, "ertiga": 11200, "innova-crysta": 13300, "tempo-traveller": 19600 }, // Vijayawada — 350 km one-way
  rajahmundry: { "swift-dzire": 6300, "ertiga": 7700, "innova-crysta": 9200, "tempo-traveller": 13500 }, // Rajahmundry — 240 km one-way
  vizianagaram: { "swift-dzire": 2400, "ertiga": 2800, "innova-crysta": 3200, "tempo-traveller": 5200 }, // Vizianagaram — 65 km one-way
  srikakulam: { "swift-dzire": 3000, "ertiga": 3700, "innova-crysta": 4300, "tempo-traveller": 6400 }, // Srikakulam — 113 km one-way
  amadalavalasa: { "swift-dzire": 3400, "ertiga": 4200, "innova-crysta": 5000, "tempo-traveller": 7300 }, // Amadalavalasa — 130 km one-way
  annavaram: { "swift-dzire": 3200, "ertiga": 3900, "innova-crysta": 4600, "tempo-traveller": 6800 }, // Annavaram — 120 km one-way
  arasavalli: { "swift-dzire": 3000, "ertiga": 3700, "innova-crysta": 4400, "tempo-traveller": 6500 }, // Arasavalli — 115 km one-way
  bangalore: { "swift-dzire": 25800, "ertiga": 31700, "innova-crysta": 37700, "tempo-traveller": 55500 }, // Bangalore — 990 km one-way
  bhadrachalam: { "swift-dzire": 8600, "ertiga": 10600, "innova-crysta": 12600, "tempo-traveller": 18500 }, // Bhadrachalam — 330 km one-way
  bhubaneswar: { "swift-dzire": 11900, "ertiga": 14600, "innova-crysta": 17300, "tempo-traveller": 25500 }, // Bhubaneswar — 455 km one-way
  bobbili: { "swift-dzire": 3800, "ertiga": 4700, "innova-crysta": 5600, "tempo-traveller": 8200 }, // Bobbili — 145 km one-way
  chennai: { "swift-dzire": 20700, "ertiga": 25500, "innova-crysta": 30300, "tempo-traveller": 44600 }, // Chennai — 795 km one-way
  eluru: { "swift-dzire": 7600, "ertiga": 9300, "innova-crysta": 11100, "tempo-traveller": 16300 }, // Eluru — 290 km one-way
  guntur: { "swift-dzire": 10800, "ertiga": 13300, "innova-crysta": 15800, "tempo-traveller": 23300 }, // Guntur — 415 km one-way
  hyderabad: { "swift-dzire": 17000, "ertiga": 20900, "innova-crysta": 24900, "tempo-traveller": 36600 }, // Hyderabad — 653 km one-way
  ichchapuram: { "swift-dzire": 4700, "ertiga": 5800, "innova-crysta": 6900, "tempo-traveller": 10100 }, // Ichchapuram — 180 km one-way
  jagdalpur: { "swift-dzire": 8600, "ertiga": 10600, "innova-crysta": 12600, "tempo-traveller": 18500 }, // Jagdalpur — 330 km one-way
  khammam: { "swift-dzire": 9700, "ertiga": 11900, "innova-crysta": 14100, "tempo-traveller": 20800 }, // Khammam — 370 km one-way
  kolkata: { "swift-dzire": 23300, "ertiga": 28700, "innova-crysta": 34100, "tempo-traveller": 50200 }, // Kolkata — 895 km one-way
  kurnool: { "swift-dzire": 18500, "ertiga": 22800, "innova-crysta": 27000, "tempo-traveller": 39800 }, // Kurnool — 710 km one-way
  lambasingi: { "swift-dzire": 2600, "ertiga": 3200, "innova-crysta": 3800, "tempo-traveller": 5600 }, // Lambasingi — 100 km one-way
  narasannapeta: { "swift-dzire": 2800, "ertiga": 3400, "innova-crysta": 4000, "tempo-traveller": 5900 }, // Narasannapeta — 105 km one-way
  nellore: { "swift-dzire": 16700, "ertiga": 20500, "innova-crysta": 24400, "tempo-traveller": 35900 }, // Nellore — 640 km one-way
  palakollu: { "swift-dzire": 6000, "ertiga": 7400, "innova-crysta": 8800, "tempo-traveller": 12900 }, // Palakollu — 230 km one-way
  palakonda: { "swift-dzire": 3900, "ertiga": 4800, "innova-crysta": 5700, "tempo-traveller": 8400 }, // Palakonda — 150 km one-way
  palasa: { "swift-dzire": 4500, "ertiga": 5500, "innova-crysta": 6500, "tempo-traveller": 9600 }, // Palasa — 170 km one-way
  parvathipuram: { "swift-dzire": 4200, "ertiga": 5200, "innova-crysta": 6100, "tempo-traveller": 9000 }, // Parvathipuram — 160 km one-way
  raipur: { "swift-dzire": 14300, "ertiga": 17600, "innova-crysta": 20900, "tempo-traveller": 30800 }, // Raipur — 550 km one-way
  ravulapalem: { "swift-dzire": 5000, "ertiga": 6100, "innova-crysta": 7300, "tempo-traveller": 10700 }, // Ravulapalem — 190 km one-way
  razam: { "swift-dzire": 3900, "ertiga": 4800, "innova-crysta": 5700, "tempo-traveller": 8400 }, // Razam — 150 km one-way
  sompeta: { "swift-dzire": 4300, "ertiga": 5300, "innova-crysta": 6300, "tempo-traveller": 9300 }, // Sompeta — 165 km one-way
  srimukhalingam: { "swift-dzire": 4100, "ertiga": 5000, "innova-crysta": 5900, "tempo-traveller": 8700 }, // Srimukhalingam — 155 km one-way
  tirupati: { "swift-dzire": 20100, "ertiga": 24700, "innova-crysta": 29300, "tempo-traveller": 43200 }, // Tirupati — 770 km one-way
  tuni: { "swift-dzire": 2600, "ertiga": 3200, "innova-crysta": 3800, "tempo-traveller": 5600 }, // Tuni — 100 km one-way
};

/**
 * Look up the static round-trip fare for a vehicle on a given outstation route.
 * Use this everywhere you previously called calculateOutstationFare().
 *
 *   getOutstationFare("kakinada", "innova-crysta")  →  5400
 */
export function getOutstationFare(
  outstationSlug: string,
  vehicleSlug: VehicleSlug
): number {
  const routePrices = outstationPrices[outstationSlug];
  if (!routePrices) {
    console.warn(`No static price found for outstation "${outstationSlug}"`);
    return 0;
  }
  return routePrices[vehicleSlug];
}

/**
 * Convenience overload if you have the full VehicleOption object instead
 * of just its slug (e.g. when mapping over vehicleOptions in a pricing card).
 */
export function getOutstationFareForVehicle(
  outstationSlug: string,
  vehicle: VehicleOption
): number {
  return getOutstationFare(outstationSlug, vehicle.slug as VehicleSlug);
}