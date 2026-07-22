import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import {
  TRIP_CONFIG,
  VEHICLES,
  makeDefaultTrip,
  type TabKey,
  type TripDetails,
  type Vehicle,
} from "../../data/Bookingconfig";

export type { TabKey } from "../../data/Bookingconfig";

type OpenBookingOptions = {
  /** Set when opened from a specific fleet card. Shown as a badge in the
   *  modal and used to pre-select the matching vehicle on the Vehicle step. */
  vehicleName?: string;
  /** Reset trip fields back to defaults before opening. Used by entry
   *  points (fleet cards, the CTA button) that aren't continuing from an
   *  already-filled-in search widget. */
  resetTrip?: boolean;
};

type BookingContextValue = {
  trip: TripDetails;
  /** Same shape as a useState setter — the wizard's internal step
   *  components already call this as `setTrip((prev) => ({ ...prev, x }))`,
   *  so it's a drop-in replacement for what used to be local state. */
  setTrip: (updater: (prev: TripDetails) => TripDetails) => void;
  vehicleName?: string;
  vehicle: Vehicle | null;
  selectedVehicleId?: string;
  setSelectedVehicleId: (id: string | undefined) => void;
  config: (typeof TRIP_CONFIG)[TabKey];
  setTripType: (tab: TabKey) => void;
  setTripOption: (option: string) => void;
  setPickup: (value: string) => void;
  setDrop: (value: string) => void;
  setDepartureDate: (value: string) => void;
  setPassengers: (value: string) => void;
  isOpen: boolean;
  openBooking: (options?: OpenBookingOptions) => void;
  closeBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used within a <BookingProvider>");
  }
  return ctx;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [trip, setTrip] = useState<TripDetails>(makeDefaultTrip);
  const [vehicleName, setVehicleName] = useState<string | undefined>(undefined);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const tripType: TabKey = (trip.tripType as TabKey) in TRIP_CONFIG ? (trip.tripType as TabKey) : "Outstation";
  const config = TRIP_CONFIG[tripType];

  const vehicle = useMemo(
    () => VEHICLES.find((v) => v.id === selectedVehicleId) ?? null,
    [selectedVehicleId]
  );

  function setTripType(tab: TabKey) {
    setTrip((prev) => ({ ...prev, tripType: tab, tripOption: TRIP_CONFIG[tab].tripOptions[0] }));
  }

  function setTripOption(tripOption: string) {
    setTrip((prev) => ({ ...prev, tripOption }));
  }

  function setPickup(pickup: string) {
    setTrip((prev) => ({ ...prev, pickup }));
  }

  function setDrop(drop: string) {
    setTrip((prev) => ({ ...prev, drop }));
  }

  function setDepartureDate(travelDate: string) {
    setTrip((prev) => ({ ...prev, travelDate }));
  }

  function setPassengers(passengers: string) {
    setTrip((prev) => ({ ...prev, passengers }));
  }

  function openBooking(options?: OpenBookingOptions) {
    if (options?.resetTrip) {
      setTrip(makeDefaultTrip());
    }
    setVehicleName(options?.vehicleName);

    // This is the fix for the fleet-card flow: previously `vehicleName`
    // (e.g. "Innova Crysta") was stored but never translated into the
    // `vehicleId` the wizard's Vehicle step actually keys off of, so the
    // "Book this vehicle" cards never actually preselected anything.
    if (options?.vehicleName) {
      const match = VEHICLES.find(
        (v) => v.name.toLowerCase() === options.vehicleName!.toLowerCase()
      );
      setSelectedVehicleId(match?.id);
    } else {
      setSelectedVehicleId(undefined);
    }

    setIsOpen(true);
  }

  function closeBooking() {
    setIsOpen(false);
  }

  const value: BookingContextValue = {
    trip,
    setTrip,
    vehicleName,
    vehicle,
    selectedVehicleId,
    setSelectedVehicleId,
    config,
    setTripType,
    setTripOption,
    setPickup,
    setDrop,
    setDepartureDate,
    setPassengers,
    isOpen,
    openBooking,
    closeBooking,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
     
    </BookingContext.Provider>
  );
}