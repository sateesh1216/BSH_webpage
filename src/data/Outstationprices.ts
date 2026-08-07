// ============================================================================
// Outstation Taxi Pricing — BSH Taxi Services
// ----------------------------------------------------------------------------
// Two pricing modes per route:
//
//   1. "fixed"  -> Show the exact round-trip ₹ price (edit outstationPrices).
//                  Used for: Araku, Vizianagaram, Srikakulam, Annavaram,
//                  Arasavalli, Bobbili, Lambasingi, Srimukhalingam.
//
//   2. "perKm"  -> Show a per-km rate instead of a fixed price
//                  (e.g. "₹13/km"). Used for every other route.
//                  Rates: Swift Dzire ₹13, Ertiga ₹14,
//                         Innova Crysta ₹18, Tempo Traveller ₹20.
//
// To move a route from perKm -> fixed: add its prices to `outstationPrices`
// and add its slug to `FIXED_PRICE_SLUGS`.
// To move a route from fixed -> perKm: remove its slug from
// `FIXED_PRICE_SLUGS` (and its distance must exist in `oneWayDistanceKm`
// if you still want a computed round-trip fare anywhere).
// ============================================================================

import type { VehicleOption } from "./Outstationtaxidata";

export type VehicleSlug =
  | "swift-dzire"
  | "ertiga"
  | "innova-crysta"
  | "tempo-traveller";

export type PricingMode = "fixed" | "perKm";

// ----------------------------------------------------------------------------
// 1. FIXED-PRICE ROUTES — these display the exact ₹ number below.
// ----------------------------------------------------------------------------
export const FIXED_PRICE_SLUGS: string[] = [
  "vizag-to-araku-taxi",
  "vizag-to-vizianagaram-taxi",
  "vizag-to-srikakulam-taxi",
  "vizag-to-annavaram-taxi",
  "vizag-to-arasavalli-taxi",
  "vizag-to-bobbili-taxi",
  "vizag-to-lambasingi-taxi",
  "vizag-to-srimukhalingam-taxi",
];

/**
 * Round-trip price (₹) for each FIXED-price outstation route, per vehicle.
 * Edit any value freely — these are the only routes that use a flat price.
 */
export const outstationPrices: Record<string, Record<VehicleSlug, number>> = {
  "vizag-to-araku-taxi": { "swift-dzire": 3200, "ertiga": 3900, "innova-crysta": 4600, "tempo-traveller": 6800 }, // Araku — 120 km one-way
  "vizag-to-vizianagaram-taxi": { "swift-dzire": 2400, "ertiga": 2800, "innova-crysta": 3200, "tempo-traveller": 5200 }, // Vizianagaram — 65 km one-way
  "vizag-to-srikakulam-taxi": { "swift-dzire": 3000, "ertiga": 3700, "innova-crysta": 4300, "tempo-traveller": 6400 }, // Srikakulam — 113 km one-way
  "vizag-to-annavaram-taxi": { "swift-dzire": 3200, "ertiga": 3900, "innova-crysta": 4600, "tempo-traveller": 6800 }, // Annavaram — 120 km one-way
  "vizag-to-arasavalli-taxi": { "swift-dzire": 3000, "ertiga": 3700, "innova-crysta": 4400, "tempo-traveller": 6500 }, // Arasavalli — 115 km one-way
  "vizag-to-bobbili-taxi": { "swift-dzire": 3800, "ertiga": 4700, "innova-crysta": 5600, "tempo-traveller": 8200 }, // Bobbili — 145 km one-way
  // NOTE: Lambasingi was missing from the original table. Added using the
  // ~100-120 km one-way road distance (same bracket as Araku/Annavaram).
  // Update this if you have an exact operator-quoted price.
  "vizag-to-lambasingi-taxi": { "swift-dzire": 3200, "ertiga": 3900, "innova-crysta": 4600, "tempo-traveller": 6800 }, // Lambasingi — ~110 km one-way
  "vizag-to-srimukhalingam-taxi": { "swift-dzire": 4100, "ertiga": 5000, "innova-crysta": 5900, "tempo-traveller": 8700 }, // Srimukhalingam — 155 km one-way
};

// ----------------------------------------------------------------------------
// 2. PER-KM ROUTES — everything not listed in FIXED_PRICE_SLUGS falls back to
//    this. Displayed as a rate (e.g. "₹13/km"), not a total price.
// ----------------------------------------------------------------------------
export const perKmRates: Record<VehicleSlug, number> = {
  "swift-dzire": 13,
  "ertiga": 14,
  "innova-crysta": 18,
  "tempo-traveller": 20,
};

/**
 * One-way distance (km) for per-km routes — kept only for reference /
 * optional round-trip estimate calculations. Not required for display.
 */
export const oneWayDistanceKm: Record<string, number> = {
  "vizag-to-kakinada-taxi": 140,
  "vizag-to-vijayawada-taxi": 350,
  "vizag-to-rajahmundry-taxi": 240,
  "vizag-to-bangalore-taxi": 990,
  "vizag-to-bhadrachalam-taxi": 330,
  "vizag-to-bhubaneswar-taxi": 455,
  "vizag-to-jagdalpur-taxi": 330,
  "vizag-to-kolkata-taxi": 895,
  "vizag-to-raipur-taxi": 550,
  "vizag-to-razam-taxi": 150,
  "vizag-to-tirupati-taxi": 770,
  "vizag-to-tuni-taxi": 100,
};

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

/** Returns "fixed" if the route has a flat price set, otherwise "perKm". */
export function getPricingMode(outstationSlug: string): PricingMode {
  return FIXED_PRICE_SLUGS.includes(outstationSlug) ? "fixed" : "perKm";
}

/**
 * Main function for the price card.
 * - Fixed routes  -> { mode: "fixed", price: 4600 }
 * - Per-km routes -> { mode: "perKm", rate: 18, label: "₹18/km" }
 */
export function getOutstationPricing(
  outstationSlug: string,
  vehicleSlug: VehicleSlug
): { mode: "fixed"; price: number } | { mode: "perKm"; rate: number; label: string } {
  if (getPricingMode(outstationSlug) === "fixed") {
    const routePrices = outstationPrices[outstationSlug];
    if (!routePrices) {
      console.warn(`No fixed price found for outstation "${outstationSlug}"`);
      return { mode: "fixed", price: 0 };
    }
    return { mode: "fixed", price: routePrices[vehicleSlug] };
  }

  const rate = perKmRates[vehicleSlug];
  return { mode: "perKm", rate, label: `₹${rate}/km` };
}

/**
 * Backwards-compatible helper: always returns a number.
 * - Fixed routes  -> the flat round-trip price.
 * - Per-km routes -> the per-km RATE (not a total), so old callers expecting
 *   a lump sum should switch to getOutstationPricing() for correct display.
 */
export function getOutstationFare(
  outstationSlug: string,
  vehicleSlug: VehicleSlug
): number {
  const pricing = getOutstationPricing(outstationSlug, vehicleSlug);
  return pricing.mode === "fixed" ? pricing.price : pricing.rate;
}

/**
 * Convenience overload if you have the full VehicleOption object instead
 * of just its slug (e.g. when mapping over vehicleOptions in a pricing card).
 */
export function getOutstationPricingForVehicle(
  outstationSlug: string,
  vehicle: VehicleOption
) {
  return getOutstationPricing(outstationSlug, vehicle.slug as VehicleSlug);
}