/* ---------------------------------------------------------------------- */
/*  Single source of truth for booking types, static config, and helpers.  */
/*  Both BookingContext and BookingWizard import from here — this is what  */
/*  removes the old circular import (BookingContext -> BookingWizard ->    */
/*  BookingContext) and the duplicated/out-of-sync TRIP_CONFIG that each   */
/*  file used to keep separately.                                          */
/* ---------------------------------------------------------------------- */

export type TabKey = "Outstation" | "Local" | "Airport" | "Tour";
import dzireImg from "../assets/cars/Dzire-taxi-services-in-visakhapatnam-bshtaxiservices.jpg";
import ertigaImg from "../assets/cars/ertiga-taxi-services-in-visakhapatnam-bshtaxiservices.png";
import innovaImg from "../assets/cars/innova-crysta-in-vizag-bshtaxiservices.png";
import tempoImg from "../assets/cars/17-seater-tempo-traveller-bshtaxiservices.png";
export interface TripDetails {
  tripType: TabKey;
  tripOption: string;
  pickup: string;
  drop: string;
  passengers: string;
  luggage: string;
  travelDate: string;
  travelTime: string;
  pickupAddress: string;
  landmark: string;
  instructions: string;
}

export interface PassengerDetails {
  fullName: string;
  phone: string;
  whatsapp: string;
  email: string;
  confirmEmail: string;
  billingAddress: string;
  city: string;
  state: string;
  pincode: string;
  gstNumber: string;
  needInvoice: "yes" | "no";
  paymentMethod: "cash" | "upi" | "card" | "later";
}

export interface Vehicle {
  id: string;
  name: string;
  seats: string;
  bags: number;
  ac: boolean;
  ratePerKm: number;
  image?: string;
  badge?: string;
}

export const SUPPORT_PHONE_DISPLAY = "+91 8886803322";
export const SUPPORT_PHONE = "918886803322"; // WhatsApp number, no "+" or spaces

export const TRIP_CONFIG: Record<
  TabKey,
  { tripOptions: string[]; dropLabel: string; dropPlaceholder: string }
> = {
  Outstation: {
    tripOptions: ["One Way", "Round Trip"],
    dropLabel: "Drop Location",
    dropPlaceholder: "Enter a location",
  },
  Local: {
    tripOptions: ["One Way", "Round Trip"],
    dropLabel: "Drop Location",
    dropPlaceholder: "Enter a location",
  },
  Airport: {
    tripOptions: ["One Way", "Round Trip"],
    dropLabel: "Drop Location",
    dropPlaceholder: "Visakhapatnam Airport",
  },
  Tour: {
    tripOptions: ["One Day", "Multi Day"],
    dropLabel: "Destination",
    dropPlaceholder: "Enter a destination",
  },
};

export const PASSENGER_OPTIONS = ["1 Passenger", "2 Passengers", "3 Passengers", "4+ Passengers"];
export const LUGGAGE_OPTIONS = ["No Bags", "1 Bag", "2 Bags", "3+ Bags"];

export const VEHICLES: Vehicle[] = [
  { id: "dzire", name: "Dzire", seats: "4 Seats", bags: 2, ac: true, ratePerKm: 14, badge: "Most Popular" , image: dzireImg,},
  { id: "ertiga", name: "Ertiga", seats: "6 Seats", bags: 3, ac: true, ratePerKm: 16 , image: ertigaImg,},
  { id: "innova", name: "Innova Crysta", seats: "6-7 Seats", bags: 4, ac: true, ratePerKm: 18, image: innovaImg, },
  { id: "tempo", name: "Tempo Traveller", seats: "12 Seats", bags: 8, ac: true, ratePerKm: 30 , image: tempoImg,},
];

export function makeDefaultTrip(): TripDetails {
  return {
    tripType: "Outstation",
    tripOption: TRIP_CONFIG.Outstation.tripOptions[0],
    pickup: "Visakhapatnam",
    drop: "",
    passengers: PASSENGER_OPTIONS[0],
    luggage: LUGGAGE_OPTIONS[0],
    travelDate: "",
    travelTime: "09:00 AM",
    pickupAddress: "",
    landmark: "",
    instructions: "",
  };
}

export function makeDefaultPassenger(): PassengerDetails {
  return {
    fullName: "",
    phone: "",
    whatsapp: "",
    email: "",
    confirmEmail: "",
    billingAddress: "",
    city: "",
    state: "",
    pincode: "",
    gstNumber: "",
    needInvoice: "yes",
    paymentMethod: "cash",
  };
}

/**
 * Rough placeholder distance/time estimator based on the pickup/drop text.
 * Swap this out for a real distance-matrix / maps API call.
 */
export function estimateRoute(pickup: string, drop: string) {
  if (!pickup.trim() || !drop.trim()) return { distanceKm: 0, minutes: 0 };
  let hash = 0;
  const seed = `${pickup.toLowerCase()}|${drop.toLowerCase()}`;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) % 9973;
  const distanceKm = 20 + (hash % 180); // 20 - 200 km
  const minutes = Math.round((distanceKm / 42) * 60); // ~42 km/h average
  return { distanceKm, minutes };
}

export function formatDuration(minutes: number) {
  if (!minutes) return "—";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export function formatDateLabel(iso: string) {
  if (!iso) return "Not selected";
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", weekday: "short" });
}

export function formatCurrency(n: number) {
  return `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

export function makeBookingId() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const seq = String(Math.floor(Math.random() * 900) + 100);
  return `BSH-${y}-${m}${d}${seq}`;
}

export function buildWhatsAppMessage(trip: TripDetails, vehicle: Vehicle | null, total: number) {
  const lines = [
    "Hi BSH Taxi Services, I'd like to book a ride:",
    `*Trip:* ${trip.tripType} (${trip.tripOption})`,
    `*Pickup:* ${trip.pickup || "Not specified"}`,
    `*Drop:* ${trip.drop || "Not specified"}`,
    trip.travelDate ? `*Date:* ${trip.travelDate} at ${trip.travelTime}` : null,
    `*Passengers:* ${trip.passengers}`,
    vehicle ? `*Preferred Vehicle:* ${vehicle.name}` : null,
    total ? `*Estimated Total:* ${formatCurrency(total)}` : null,
  ].filter(Boolean);
  return lines.join("\n");
}