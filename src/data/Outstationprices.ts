
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
  "vizag-to-araku-taxi": { "swift-dzire": 5000, "ertiga": 6500, "innova-crysta": 8000, "tempo-traveller": 12000 }, // Araku — 120 km one-way
  "vizag-to-vizianagaram-taxi": { "swift-dzire": 3000, "ertiga": 3500, "innova-crysta": 4000, "tempo-traveller": 8000 }, // Vizianagaram — 65 km one-way
  "vizag-to-srikakulam-taxi": { "swift-dzire": 3500, "ertiga": 4500, "innova-crysta": 7000, "tempo-traveller": 12000 }, // Srikakulam — 113 km one-way
  "vizag-to-annavaram-taxi": { "swift-dzire": 5000, "ertiga": 6500, "innova-crysta": 8000, "tempo-traveller": 12000 }, // Annavaram — 120 km one-way
  "vizag-to-arasavalli-taxi": { "swift-dzire": 5000, "ertiga": 6500, "innova-crysta": 8000, "tempo-traveller": 12000 }, // Arasavalli — 115 km one-way
  "vizag-to-bobbili-taxi": { "swift-dzire": 3800, "ertiga": 4700, "innova-crysta": 5600, "tempo-traveller": 8200 }, // Bobbili — 145 km one-way
  // NOTE: Lambasingi was missing from the original table. Added using the
  // ~100-120 km one-way road distance (same bracket as Araku/Annavaram).
  // Update this if you have an exact operator-quoted price.
  "vizag-to-lambasingi-taxi": { "swift-dzire": 5000, "ertiga": 6500, "innova-crysta": 8000, "tempo-traveller": 12000 }, // Lambasingi — ~110 km one-way
  "vizag-to-srimukhalingam-taxi": { "swift-dzire": 5000, "ertiga": 6500, "innova-crysta": 8000, "tempo-traveller": 12000 }, // Srimukhalingam — 155 km one-way
};

// ----------------------------------------------------------------------------
// 2. PER-KM ROUTES — everything not listed in FIXED_PRICE_SLUGS falls back to
//    this. Displayed as a rate (e.g. "₹13/km"), not a total price.
// ----------------------------------------------------------------------------
export const perKmRates: Record<VehicleSlug, number> = {
  "swift-dzire": 14,
  "ertiga": 17,
  "innova-crysta": 20,
  "tempo-traveller": 30,
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