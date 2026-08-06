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
  "vizag-to-kakinada-taxi": { "swift-dzire": 3700, "ertiga": 4500, "innova-crysta": 5400, "tempo-traveller": 8000 }, // Vizag to Kakinada — 140 km one-way
  "vizag-to-araku-taxi": { "swift-dzire": 3200, "ertiga": 3900, "innova-crysta": 4600, "tempo-traveller": 6800 }, // Vizag to Araku — 120 km one-way
  "vizag-to-vijayawada-taxi": { "swift-dzire": 9100, "ertiga": 11200, "innova-crysta": 13300, "tempo-traveller": 19600 }, // Vizag to Vijayawada — 350 km one-way
  "vizag-to-rajahmundry-taxi": { "swift-dzire": 6300, "ertiga": 7700, "innova-crysta": 9200, "tempo-traveller": 13500 }, // Vizag to Rajahmundry — 240 km one-way
  "vizag-to-vizianagaram-taxi": { "swift-dzire": 2400, "ertiga": 2800, "innova-crysta": 3200, "tempo-traveller": 5200 }, // Vizag to Vizianagaram — 65 km one-way
  "vizag-to-srikakulam-taxi": { "swift-dzire": 3000, "ertiga": 3700, "innova-crysta": 4300, "tempo-traveller": 6400 }, // Vizag to Srikakulam — 113 km one-way
  "vizag-to-amadalavalasa-taxi": { "swift-dzire": 3400, "ertiga": 4200, "innova-crysta": 5000, "tempo-traveller": 7300 }, // Vizag to Amadalavalasa — 130 km one-way
  "vizag-to-annavaram-taxi": { "swift-dzire": 3200, "ertiga": 3900, "innova-crysta": 4600, "tempo-traveller": 6800 }, // Vizag to Annavaram — 120 km one-way
  "vizag-to-arasavalli-taxi": { "swift-dzire": 3000, "ertiga": 3700, "innova-crysta": 4400, "tempo-traveller": 6500 }, // Vizag to Arasavalli — 115 km one-way
  "vizag-to-bangalore-taxi": { "swift-dzire": 25800, "ertiga": 31700, "innova-crysta": 37700, "tempo-traveller": 55500 }, // Vizag to Bangalore — 990 km one-way
  "vizag-to-bhadrachalam-taxi": { "swift-dzire": 8600, "ertiga": 10600, "innova-crysta": 12600, "tempo-traveller": 18500 }, // Vizag to Bhadrachalam — 330 km one-way
  "vizag-to-bhubaneswar-taxi": { "swift-dzire": 11900, "ertiga": 14600, "innova-crysta": 17300, "tempo-traveller": 25500 }, // Vizag to Bhubaneswar — 455 km one-way
  "vizag-to-bobbili-taxi": { "swift-dzire": 3800, "ertiga": 4700, "innova-crysta": 5600, "tempo-traveller": 8200 }, // Vizag to Bobbili — 145 km one-way
  "vizag-to-ichchapuram-taxi": { "swift-dzire": 4700, "ertiga": 5800, "innova-crysta": 6900, "tempo-traveller": 10100 }, // Vizag to Ichchapuram — 180 km one-way
  "vizag-to-jagdalpur-taxi": { "swift-dzire": 8600, "ertiga": 10600, "innova-crysta": 12600, "tempo-traveller": 18500 }, // Vizag to Jagdalpur — 330 km one-way
  "vizag-to-khammam-taxi": { "swift-dzire": 9700, "ertiga": 11900, "innova-crysta": 14100, "tempo-traveller": 20800 }, // Vizag to Khammam — 370 km one-way
  "vizag-to-kolkata-taxi": { "swift-dzire": 23300, "ertiga": 28700, "innova-crysta": 34100, "tempo-traveller": 50200 }, // Vizag to Kolkata — 895 km one-way
  "vizag-to-raipur-taxi": { "swift-dzire": 14300, "ertiga": 17600, "innova-crysta": 20900, "tempo-traveller": 30800 }, // Raipur — 550 km one-way
  "vizag-to-ravulapalem-taxi": { "swift-dzire": 5000, "ertiga": 6100, "innova-crysta": 7300, "tempo-traveller": 10700 }, // Ravulapalem — 190 km one-way
  "vizag-to-razam-taxi": { "swift-dzire": 3900, "ertiga": 4800, "innova-crysta": 5700, "tempo-traveller": 8400 }, // Razam — 150 km one-way
  "vizag-to-sompeta-taxi": { "swift-dzire": 4300, "ertiga": 5300, "innova-crysta": 6300, "tempo-traveller": 9300 }, // Sompeta — 165 km one-way
  "vizag-to-srimukhalingam-taxi": { "swift-dzire": 4100, "ertiga": 5000, "innova-crysta": 5900, "tempo-traveller": 8700 }, // Srimukhalingam — 155 km one-way
  "vizag-to-tirupati-taxi": { "swift-dzire": 20100, "ertiga": 24700, "innova-crysta": 29300, "tempo-traveller": 43200 }, // Tirupati — 770 km one-way
  "vizag-to-tuni-taxi": { "swift-dzire": 2600, "ertiga": 3200, "innova-crysta": 3800, "tempo-traveller": 5600 }, // Tuni — 100 km one-way
};

//  *   getOutstationFare("kakinada", "innova-crysta")  →  5400
//  */
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