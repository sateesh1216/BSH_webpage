import { useState } from "react";
import { vehicles } from "../data/vehicles";

export interface FareState {
  distanceKm: number;
  rate: number;
  totalFare: number;
}

export function useFareCalculator() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [vehicleRate, setVehicleRate] = useState<number>(vehicles[0].value);
  const [tripType, setTripType] = useState("One Way");
  const [error, setError] = useState<string | null>(null);
  const [fare, setFare] = useState<FareState | null>(null);

  const calculateRoute = () => {
    if (!pickup.trim() || !drop.trim()) {
      setError("Please enter both pickup and drop locations.");
      setFare(null);
      return;
    }

    setError(null);

    /**
     * ------------------------------------------------------------------
     * GOOGLE MAPS INTEGRATION
     * ------------------------------------------------------------------
     * Replace this demo distance with the distance returned by the
     * Google Maps Routes API using `pickup` and `drop` as origin/destination.
     *
     * Example:
     *   Pickup: Visakhapatnam Airport
     *   Drop:   RK Beach
     *   Google Maps distance: 14.5 KM
     *   Fare: 14.5 x rate (per km)
     * ------------------------------------------------------------------
     */
    const demoDistanceKm = 15;
    const multiplier = tripType === "Round Trip" ? 2 : 1;
    const distanceKm = demoDistanceKm * multiplier;
    const totalFare = distanceKm * vehicleRate;

    setFare({ distanceKm, rate: vehicleRate, totalFare });
  };

  const reset = () => {
    setFare(null);
    setError(null);
  };

  return {
    pickup,
    setPickup,
    drop,
    setDrop,
    vehicleRate,
    setVehicleRate,
    tripType,
    setTripType,
    error,
    fare,
    calculateRoute,
    reset,
  };
}