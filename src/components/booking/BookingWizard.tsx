import { useEffect, useMemo, useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Navigation,
  Car,
  Users,
  Briefcase,
  Repeat2,
  ArrowRight,
  ArrowLeftRight,
  Calendar as CalendarIcon,
  Clock,
  Info,
  ShieldCheck,
  Phone,
  MessageCircle,
  Mail,
  User,

  MapPinned,


  Headphones,
  Home,
  Lock,
  BookOpen,
} from "lucide-react";
import LocationAutocomplete, {
  POPULAR_PICKUP_PLACES,
  POPULAR_DROP_PLACES,
} from "./LocationAutocomplete";
import RouteMapPreview from "./Routemappreview";
import type {
  TripDetails,
  PassengerDetails,
  Vehicle,
} from "../../data/Bookingconfig";


import {
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE,
  TRIP_CONFIG,
  PASSENGER_OPTIONS,
  LUGGAGE_OPTIONS,
  VEHICLES,
  makeDefaultTrip,
  makeDefaultPassenger,
  estimateRoute,
  formatDuration,
  formatDateLabel,
  formatCurrency,
  makeBookingId,
  buildWhatsAppMessage,
} from "../../data/Bookingconfig";

interface BookingWizardProps {
  vehicleId?: string;
}

// Simple lat/lon pair — mirrors the shape RouteMapPreview expects.
type GeoPoint = { lat: number; lon: number };

const STEPS = [
  { key: "trip", label: "Trip Details", sub: "Pickup & Drop" },
  { key: "vehicle", label: "Vehicle", sub: "Choose your ride" },
  { key: "datetime", label: "Date & Time", sub: "When you want to travel" },
  { key: "review", label: "Review", sub: "Review your trip" },
  { key: "passenger", label: "Passenger Details", sub: "Contact information" },
  { key: "confirm", label: "Confirm Booking", sub: "You're almost done!" },
] as const;

/* ---------------------------------------------------------------------- */
/*  Small shared UI bits                                                   */
/* ---------------------------------------------------------------------- */

function FieldShell({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 transition-colors focus-within:border-primary">
      <Icon size={16} className="shrink-0 text-primary" />
      {children}
    </div>
  );
}

function Label({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1 block text-xs font-medium text-slate-700">
      {children}
    </label>
  );
}

function SummaryRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between py-1.5 text-xs">
      <div className="flex items-center gap-1.5 text-slate-500">
        <Icon size={14} className="text-primary" />
        <span>{label}</span>
      </div>
      <span className="font-medium text-slate-800">{value}</span>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  Stepper                                                                 */
/* ---------------------------------------------------------------------- */

function Stepper({ currentIndex }: { currentIndex: number }) {
  return (
    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2 border-b border-slate-100 px-4 py-3">
      {STEPS.map((step, i) => {
        const state = i < currentIndex ? "done" : i === currentIndex ? "active" : "todo";
        return (
          <div key={step.key} className="flex items-center gap-1.5">
            <div className="flex items-center gap-1.5">
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                  state === "done"
                    ? "bg-primary text-white"
                    : state === "active"
                    ? "bg-primary text-white"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {state === "done" ? <Check size={13} /> : i + 1}
              </div>
              <div className="hidden sm:block">
                <p className={`text-xs font-semibold ${state === "todo" ? "text-slate-400" : "text-slate-900"}`}>
                  {step.label}
                </p>
                <p className="text-[10px] text-slate-400">{step.sub}</p>
              </div>
            </div>
            {i < STEPS.length - 1 && <ChevronRight size={14} className="mx-0.5 shrink-0 text-slate-300" />}
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  Trip summary sidebar                                                   */
/* ---------------------------------------------------------------------- */

function TripSummarySidebar({
  trip,
  vehicle,
  distanceKm,
  minutes,

}: {
  trip: TripDetails;
  vehicle: Vehicle | null;
  distanceKm: number;
  minutes: number;
  total: number;
}) {
  return (
    <aside className="w-full shrink-0 rounded-xl border border-slate-100 bg-white p-4 shadow-sm lg:w-72">
      <h3 className="text-sm font-bold text-slate-900">Trip Summary</h3>
      <div className="mt-1 mb-3 h-0.5 w-8 bg-primary" />

      <div className="flex gap-3">
        <div className="flex flex-col items-center pt-1">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="my-0.5 h-5 w-px border-l border-dashed border-slate-300" />
          <span className="h-2 w-2 rounded-full bg-red-500" />
        </div>
        <div className="flex-1 space-y-2.5">
          <div>
            <p className="text-sm font-semibold text-slate-900">{trip.pickup || "Pickup location"}</p>
            <p className="text-[11px] text-slate-400">Pickup location</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">{trip.drop || "Drop location"}</p>
            <p className="text-[11px] text-slate-400">Drop location</p>
          </div>
        </div>
      </div>

      <div className="mt-3 divide-y divide-slate-100 border-t border-slate-100">
        <SummaryRow icon={Car} label="Vehicle" value={vehicle ? vehicle.name : "Not selected"} />
        <SummaryRow icon={ArrowLeftRight} label="Trip Type" value={trip.tripOption} />
        <SummaryRow icon={CalendarIcon} label="Date & Time" value={trip.travelDate ? `${formatDateLabel(trip.travelDate)}` : "Not selected"} />
        <SummaryRow icon={Users} label="Passengers" value={trip.passengers} />
        <SummaryRow icon={Briefcase} label="Luggage" value={trip.luggage} />
        <SummaryRow icon={Navigation} label="Distance" value={distanceKm ? `${distanceKm} km` : "Not calculated"} />
        <SummaryRow icon={Clock} label="Est. Time" value={minutes ? formatDuration(minutes) : "Not calculated"} />
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2">
        <ShieldCheck size={16} className="shrink-0 text-primary" />
        <div>
          <p className="text-xs font-semibold text-slate-800">100% Secure Booking</p>
          <p className="text-[11px] text-slate-500">Your information is safe with us.</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
        <div>
          <p className="text-xs font-semibold text-slate-800">Need Help?</p>
          <a href={`tel:+${SUPPORT_PHONE}`} className="text-xs font-medium text-primary">
            {SUPPORT_PHONE_DISPLAY}
          </a>
          <p className="text-[11px] text-slate-400">We're available 24/7</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/5 text-primary">
          <Headphones size={17} />
        </div>
      </div>
    </aside>
  );
}

/* ---------------------------------------------------------------------- */
/*  Step 1 — Trip Details                                                  */
/* ---------------------------------------------------------------------- */

function StepTripDetails({
  trip,
  setTrip,
  distanceKm,
  minutes,
  pickupCoords,
  dropCoords,
  onPickupCoords,
  onDropCoords,
  onRouteComputed,
  onNext,
}: {
  trip: TripDetails;
  setTrip: (updater: (prev: TripDetails) => TripDetails) => void;
  distanceKm: number;
  minutes: number;
  pickupCoords: GeoPoint | null;
  dropCoords: GeoPoint | null;
  onPickupCoords: (coords: GeoPoint | null) => void;
  onDropCoords: (coords: GeoPoint | null) => void;
  onRouteComputed: (info: { distanceKm: number; minutes: number }) => void;
  onNext: () => void;
}) {
  const config = TRIP_CONFIG[trip.tripType];
  const canContinue = trip.pickup.trim().length > 0 && trip.drop.trim().length > 0;

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Step 1 of 6</p>
        <h2 className="mt-0.5 text-lg font-bold text-slate-900">Enter Trip Details</h2>
        <p className="mt-0.5 text-xs text-slate-500">Please provide your pickup and drop locations</p>

        {/* Pickup / Drop side by side with the live map preview */}
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <LocationAutocomplete
              id="wizard-pickup"
              label="Pickup Location"
              value={trip.pickup}
              onChange={(v, coords) => {
                setTrip((p) => ({ ...p, pickup: v }));
                // Keep the resolved point alongside the text so the map
                // can skip re-geocoding when the user picked a suggestion;
                // free-typed edits (no coords arg) clear it so the map
                // falls back to geocoding the new text itself.
                onPickupCoords(coords ? { lat: parseFloat(coords.lat), lon: parseFloat(coords.lon) } : null);
              }}
              placeholder="Enter pickup location"
              icon={MapPin}
              limitToVizag
              popularPlaces={POPULAR_PICKUP_PLACES}
            />
            <LocationAutocomplete
              id="wizard-drop"
              label={config.dropLabel}
              value={trip.drop}
              onChange={(v, coords) => {
                setTrip((p) => ({ ...p, drop: v }));
                onDropCoords(coords ? { lat: parseFloat(coords.lat), lon: parseFloat(coords.lon) } : null);
              }}
              placeholder={config.dropPlaceholder}
              icon={MapPin}
              popularPlaces={POPULAR_DROP_PLACES}
            />
          </div>

          <RouteMapPreview
            pickupLabel={trip.pickup}
            dropLabel={trip.drop}
            pickupCoords={pickupCoords}
            dropCoords={dropCoords}
            onRouteComputed={onRouteComputed}
          />
        </div>

        <div className="mt-3 space-y-3">
          <div>
            <span className="mb-1 block text-xs font-medium text-slate-700">Trip Type</span>
            <div className="flex gap-2">
              {config.tripOptions.map((option) => {
                const active = trip.tripOption === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setTrip((p) => ({ ...p, tripOption: option }))}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                      active
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-slate-200 text-slate-600 hover:border-primary/40"
                    }`}
                  >
                    {option.toLowerCase().includes("round") || option.toLowerCase().includes("multi") ? (
                      <Repeat2 size={13} />
                    ) : (
                      <ArrowRight size={13} />
                    )}
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="wizard-passengers">Passengers</Label>
              <FieldShell icon={Users}>
                <select
                  id="wizard-passengers"
                  value={trip.passengers}
                  onChange={(e) => setTrip((p) => ({ ...p, passengers: e.target.value }))}
                  className="w-full bg-transparent text-xs text-slate-800 outline-none"
                >
                  {PASSENGER_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </FieldShell>
            </div>
            <div>
              <Label htmlFor="wizard-luggage">Luggage (Optional)</Label>
              <FieldShell icon={Briefcase}>
                <select
                  id="wizard-luggage"
                  value={trip.luggage}
                  onChange={(e) => setTrip((p) => ({ ...p, luggage: e.target.value }))}
                  className="w-full bg-transparent text-xs text-slate-800 outline-none"
                >
                  {LUGGAGE_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </FieldShell>
            </div>
          </div>

     
        </div>

        <button
          type="button"
          disabled={!canContinue}
          onClick={onNext}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue to Choose Vehicle
          <ArrowRight size={15} />
        </button>
      </div>

      <TripSummarySidebar trip={trip} vehicle={null} distanceKm={distanceKm} minutes={minutes} total={0} />
    </div>
  );
}
/* ---------------------------------------------------------------------- */
/*  Step 2 — Vehicle                                                       */
/* ---------------------------------------------------------------------- */

function StepVehicle({
  trip,
  distanceKm,
  minutes,
  vehicle,
  setVehicleId,
  onBack,
  onNext,
}: {
  trip: TripDetails;
  distanceKm: number;
  minutes: number;
  vehicle: Vehicle | null;
  setVehicleId: (id: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Step 2 of 6</p>
        <h2 className="mt-0.5 text-lg font-bold text-slate-900">Choose Your Vehicle</h2>
        <p className="mt-0.5 text-xs text-slate-500">Select the vehicle that best suits your journey</p>

        <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl border border-slate-100 px-3 py-2 text-xs text-slate-600">
          <span className="flex items-center gap-1">
            <Navigation size={13} className="text-primary" /> {distanceKm} km
          </span>
          <span className="flex items-center gap-1">
            <Clock size={13} className="text-primary" /> {formatDuration(minutes)}
          </span>
          <span className="flex items-center gap-1">
            <ArrowLeftRight size={13} className="text-primary" /> {trip.tripOption}
          </span>
          <span className="flex items-center gap-1">
            <Users size={13} className="text-primary" /> {trip.passengers}
          </span>
        </div>

        <p className="mt-3 mb-2 text-xs font-semibold text-slate-800">
          Available Vehicles <span className="ml-1 font-normal text-slate-400">— all vehicles are sanitized and well maintained</span>
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {VEHICLES.map((v) => {
            const active = vehicle?.id === v.id;
            const total = Math.round(v.ratePerKm * distanceKm * 1.05);
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setVehicleId(v.id)}
                className={`relative rounded-xl border p-3 text-left transition-colors ${
                  active ? "border-primary bg-primary/5" : "border-slate-200 hover:border-primary/40"
                }`}
              >
                {active && (
                  <span className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                    <Check size={12} />
                  </span>
                )}
            <div className="flex h-32 items-center justify-center overflow-hidden rounded-lg bg-slate-50">
  {v.image ? (
    <img
      src={v.image}
      alt={v.name}
      className="h-full w-full object-contain"
    />
  ) : (
    <Car size={40} className="text-slate-300" />
  )}
</div>
                <div className="mt-1 flex items-center gap-1.5">
                  <p className="text-sm font-semibold text-slate-900">{v.name}</p>
                  {v.badge && (
                    <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold text-primary">
                      {v.badge}
                    </span>
                  )}
                </div>
                <div className="mt-1 flex flex-wrap gap-x-2 gap-y-0.5 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Users size={11} /> {v.seats}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase size={11} /> {v.bags} Bags
                  </span>
                  {v.ac && <span>AC</span>}
                </div>
                <div className="mt-1.5 border-t border-dashed border-slate-200 pt-1.5">
                  <p className="text-xs font-bold text-slate-900">
                    ₹{v.ratePerKm.toFixed(2)} <span className="text-[10px] font-normal text-slate-400">/km</span>
                  </p>
                  <p className="text-[11px] text-slate-400">{distanceKm ? formatCurrency(total) : "—"} (Total est.)</p>
                </div>
                <div
                  className={`mt-2 w-full rounded-md py-1.5 text-center text-[11px] font-semibold ${
                    active ? "bg-primary text-white" : "border border-slate-200 text-slate-600"
                  }`}
                >
                  {active ? "Selected" : "Select"}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-3 flex items-start gap-2 rounded-lg bg-primary/5 px-3 py-2 text-xs text-slate-600">
          <ShieldCheck size={14} className="mt-0.5 shrink-0 text-primary" />
          All our vehicles are verified, insured &amp; sanitized for your safety and comfort.
        </div>

        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-3.5 py-2.5 text-xs font-semibold text-slate-600 hover:border-slate-300"
          >
            <ChevronLeft size={14} /> Back to Trip Details
          </button>
          <button
            type="button"
            disabled={!vehicle}
            onClick={onNext}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue to Date &amp; Time <ArrowRight size={15} />
          </button>
        </div>
      </div>

      <TripSummarySidebar trip={trip} vehicle={vehicle} distanceKm={distanceKm} minutes={minutes} total={0} />
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  Step 3 — Date & Time                                                   */
/* ---------------------------------------------------------------------- */

const WEEKDAY_LABELS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const TIME_SLOTS = Array.from({ length: 24 * 2 }, (_, i) => {
  const totalMinutes = i * 30;
  const h24 = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  const suffix = h24 < 12 ? "AM" : "PM";
  return `${String(h12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${suffix}`;
});

function StepDateTime({
  trip,
  setTrip,
  vehicle,
  distanceKm,
  minutes,
  onBack,
  onNext,
}: {
  trip: TripDetails;
  setTrip: (updater: (prev: TripDetails) => TripDetails) => void;
  vehicle: Vehicle | null;
  distanceKm: number;
  minutes: number;
  onBack: () => void;
  onNext: () => void;
}) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const calendarCells = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();
    const cells: { day: number; inMonth: boolean; iso: string }[] = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      cells.push({ day: daysInPrevMonth - i, inMonth: false, iso: "" });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const iso = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      cells.push({ day: d, inMonth: true, iso });
    }
    while (cells.length % 7 !== 0) {
      cells.push({ day: cells.length, inMonth: false, iso: "" });
    }
    return cells;
  }, [viewYear, viewMonth]);

  const todayIso = today.toISOString().split("T")[0];

  function changeMonth(delta: number) {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) {
      m = 11;
      y -= 1;
    } else if (m > 11) {
      m = 0;
      y += 1;
    }
    setViewMonth(m);
    setViewYear(y);
  }

  const canContinue = trip.travelDate.trim().length > 0 && trip.pickupAddress.trim().length > 0;

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Step 3 of 6</p>
        <h2 className="mt-0.5 text-lg font-bold text-slate-900">Select Date &amp; Time</h2>
        <p className="mt-0.5 text-xs text-slate-500">Choose your preferred travel date and time</p>

        <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl border border-slate-100 px-3 py-2 text-xs text-slate-600">
          <span className="flex items-center gap-1">
            <Car size={13} className="text-primary" /> {vehicle?.name ?? "No vehicle selected"}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={13} className="text-primary" /> {trip.pickup} → {trip.drop}
          </span>
          <span className="flex items-center gap-1">
            <Navigation size={13} className="text-primary" /> {distanceKm} km
          </span>
        </div>

        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Travel Date *</Label>
            <div className="rounded-xl border border-slate-200 p-3">
              <div className="mb-2 flex items-center justify-between">
                <button type="button" onClick={() => changeMonth(-1)} className="rounded-full p-1 hover:bg-slate-100">
                  <ChevronLeft size={16} />
                </button>
                <p className="text-xs font-semibold text-slate-800">{monthLabel}</p>
                <button type="button" onClick={() => changeMonth(1)} className="rounded-full p-1 hover:bg-slate-100">
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-slate-400">
                {WEEKDAY_LABELS.map((w) => (
                  <span key={w}>{w}</span>
                ))}
              </div>
              <div className="mt-1 grid grid-cols-7 gap-1">
                {calendarCells.map((cell, i) => {
                  const isPast = cell.inMonth && cell.iso < todayIso;
                  const isSelected = cell.inMonth && cell.iso === trip.travelDate;
                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={!cell.inMonth || isPast}
                      onClick={() => setTrip((p) => ({ ...p, travelDate: cell.iso }))}
                      className={`aspect-square rounded-md text-xs transition-colors ${
                        !cell.inMonth
                          ? "text-transparent"
                          : isSelected
                          ? "bg-primary font-semibold text-white"
                          : isPast
                          ? "cursor-not-allowed text-slate-300"
                          : "text-slate-700 hover:bg-primary/10"
                      }`}
                    >
                      {cell.day}
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => setTrip((p) => ({ ...p, travelDate: todayIso }))}
                className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-primary"
              >
                <CalendarIcon size={12} /> Today: {formatDateLabel(todayIso)}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <Label htmlFor="wizard-time">Travel Time *</Label>
              <FieldShell icon={Clock}>
                <select
                  id="wizard-time"
                  value={trip.travelTime}
                  onChange={(e) => setTrip((p) => ({ ...p, travelTime: e.target.value }))}
                  className="w-full bg-transparent text-xs text-slate-800 outline-none"
                >
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </FieldShell>
            </div>

            <div>
              <Label htmlFor="wizard-pickup-address">Pickup Address *</Label>
              <FieldShell icon={MapPin}>
                <input
                  id="wizard-pickup-address"
                  value={trip.pickupAddress}
                  onChange={(e) => setTrip((p) => ({ ...p, pickupAddress: e.target.value }))}
                  placeholder="Enter pickup address"
                  className="w-full bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400"
                />
              </FieldShell>
            </div>

            <div>
              <Label htmlFor="wizard-landmark">Landmark / Nearby Place (Optional)</Label>
              <FieldShell icon={MapPinned}>
                <input
                  id="wizard-landmark"
                  value={trip.landmark}
                  onChange={(e) => setTrip((p) => ({ ...p, landmark: e.target.value }))}
                  placeholder="Enter landmark or nearby place"
                  className="w-full bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400"
                />
              </FieldShell>
            </div>

            <div>
              <Label htmlFor="wizard-instructions">Special Instructions (Optional)</Label>
              <textarea
                id="wizard-instructions"
                value={trip.instructions}
                onChange={(e) => setTrip((p) => ({ ...p, instructions: e.target.value }))}
                placeholder="Any special requests or instructions for the driver..."
                rows={2}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-800 outline-none placeholder:text-slate-400 focus:border-primary"
              />
            </div>

            <div className="flex items-start gap-2 rounded-lg bg-primary/5 px-3 py-2 text-xs text-slate-600">
              <Info size={14} className="mt-0.5 shrink-0 text-primary" />
              Note: Your driver will arrive 15 minutes before the scheduled pickup time.
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-3.5 py-2.5 text-xs font-semibold text-slate-600 hover:border-slate-300"
          >
            <ChevronLeft size={14} /> Back to Choose Vehicle
          </button>
          <button
            type="button"
            disabled={!canContinue}
            onClick={onNext}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue to Review <ArrowRight size={15} />
          </button>
        </div>
      </div>

      <TripSummarySidebar trip={trip} vehicle={vehicle} distanceKm={distanceKm} minutes={minutes} total={0} />
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  Step 4 — Review                                                        */
/* ---------------------------------------------------------------------- */

function StepReview({
  trip,
  vehicle,
  distanceKm,
  minutes,
  pricing,
  onBack,
  onNext,
}: {
  trip: TripDetails;
  vehicle: Vehicle | null;
  distanceKm: number;
  minutes: number;
  pricing: { base: number; gst: number; total: number };
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Step 4 of 6</p>
        <h2 className="mt-0.5 text-lg font-bold text-slate-900">Review Your Trip</h2>
        <p className="mt-0.5 text-xs text-slate-500">Please review your trip details before proceeding</p>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-100 p-3">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
              <MapPin size={13} className="text-primary" /> Trip Route
            </p>
            <div className="mt-2 space-y-2 text-xs">
              <div>
                <p className="font-medium text-slate-900">{trip.pickup}</p>
                <p className="text-[11px] text-slate-400">Pickup Location</p>
              </div>
              <div>
                <p className="font-medium text-slate-900">{trip.drop}</p>
                <p className="text-[11px] text-slate-400">Drop Location</p>
              </div>
            </div>
            <div className="mt-2 flex justify-between border-t border-slate-100 pt-2 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <Navigation size={11} /> {distanceKm} km
              </span>
              <span className="flex items-center gap-1">
                <Clock size={11} /> {formatDuration(minutes)}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 p-3">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
              <Car size={13} className="text-primary" /> Selected Vehicle
            </p>
          <div className="mt-3 flex h-28 items-center justify-center">
  {vehicle?.image ? (
    <img
      src={vehicle.image}
      alt={vehicle.name}
      className="h-full object-contain"
    />
  ) : (
    <Car size={32} className="text-slate-300" />
  )}
</div>
            <p className="mt-1 text-center text-sm font-semibold text-slate-900">{vehicle?.name}</p>
            <p className="text-center text-[11px] text-slate-400">
              {vehicle?.seats} · {vehicle?.ac ? "AC" : "Non-AC"} · {vehicle?.bags} Bags
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 p-3">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
              <CalendarIcon size={13} className="text-primary" /> Date &amp; Time
            </p>
            <div className="mt-2 space-y-1.5 text-xs text-slate-600">
              <p>
                <span className="text-slate-400">Travel Date: </span>
                {formatDateLabel(trip.travelDate)}
              </p>
              <p>
                <span className="text-slate-400">Travel Time: </span>
                {trip.travelTime}
              </p>
              <p>
                <span className="text-slate-400">Trip Type: </span>
                {trip.tripOption}
              </p>
              <p>
                <span className="text-slate-400">Passengers: </span>
                {trip.passengers}
              </p>
              <p>
                <span className="text-slate-400">Luggage: </span>
                {trip.luggage}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-3 rounded-xl border border-slate-100 p-4">
       
       
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <div className="rounded-lg bg-emerald-50 p-2.5 text-[11px] text-emerald-700">
              <p className="mb-0.5 font-semibold">✓ Included in Fare</p>
              <p>Driver Charges · Fuel Charges · GST</p>
            </div>
            <div className="rounded-lg bg-amber-50 p-2.5 text-[11px] text-amber-700">
              <p className="mb-0.5 font-semibold">Extra Charges (If Applicable)</p>
              <p>Toll Charges · Parking Charges · State Permit</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2 text-xs text-slate-600">
            <ShieldCheck size={14} className="shrink-0 text-primary" />
            No hidden charges. What you see is what you pay.
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-3.5 py-2.5 text-xs font-semibold text-slate-600 hover:border-slate-300"
          >
            <ChevronLeft size={14} /> Back to Date &amp; Time
          </button>
          <button
            type="button"
            onClick={onNext}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white"
          >
            Continue to Passenger Details <ArrowRight size={15} />
          </button>
        </div>
      </div>

      <TripSummarySidebar trip={trip} vehicle={vehicle} distanceKm={distanceKm} minutes={minutes} total={pricing.total} />
    </div>
  );
}

function StepPassenger({
  trip,
  vehicle,
  distanceKm,
  minutes,
  pricing,
  passenger,
  setPassenger,
  onBack,
  onNext,
}: {
  trip: TripDetails;
  vehicle: Vehicle | null;
  distanceKm: number;
  minutes: number;
  pricing: { base: number; gst: number; total: number };
  passenger: PassengerDetails;
  setPassenger: (updater: (prev: PassengerDetails) => PassengerDetails) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const emailsMismatch =
    passenger.email.trim().length > 0 &&
    passenger.confirmEmail.trim().length > 0 &&
    passenger.email !== passenger.confirmEmail;

  const canContinue =
    passenger.fullName.trim().length > 0 && passenger.phone.trim().length >= 10 && !emailsMismatch;



  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Step 5 of 6</p>
        <h2 className="mt-0.5 text-lg font-bold text-slate-900">Passenger Details</h2>
        <p className="mt-0.5 text-xs text-slate-500">Please provide passenger and contact information</p>

        <div className="mt-3 rounded-xl border border-slate-100 p-4">
          <p className="text-xs font-semibold text-slate-800">Contact Information</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <div>
              <Label htmlFor="p-name">Full Name *</Label>
              <FieldShell icon={User}>
                <input
                  id="p-name"
                  value={passenger.fullName}
                  onChange={(e) => setPassenger((p) => ({ ...p, fullName: e.target.value }))}
                  placeholder="Enter full name"
                  className="w-full bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400"
                />
              </FieldShell>
            </div>
            <div>
              <Label htmlFor="p-phone">Phone Number *</Label>
              <FieldShell icon={Phone}>
                <input
                  id="p-phone"
                  value={passenger.phone}
                  onChange={(e) => setPassenger((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="Enter 10 digit mobile number"
                  inputMode="numeric"
                  className="w-full bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400"
                />
              </FieldShell>
            </div>
            <div>
              <Label htmlFor="p-whatsapp">WhatsApp Number (Optional)</Label>
              <FieldShell icon={MessageCircle}>
                <input
                  id="p-whatsapp"
                  value={passenger.whatsapp}
                  onChange={(e) => setPassenger((p) => ({ ...p, whatsapp: e.target.value }))}
                  placeholder="Enter WhatsApp number"
                  className="w-full bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400"
                />
              </FieldShell>
            </div>
            <div>
              <Label htmlFor="p-email">Email Address (Optional)</Label>
              <FieldShell icon={Mail}>
                <input
                  id="p-email"
                  type="email"
                  value={passenger.email}
                  onChange={(e) => setPassenger((p) => ({ ...p, email: e.target.value }))}
                  placeholder="Enter email address"
                  className="w-full bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400"
                />
              </FieldShell>
            </div>
      
          </div>
        </div>



   

        <div className="mt-3 flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-2 text-xs text-slate-600">
          <ShieldCheck size={14} className="shrink-0 text-primary" />
          Your details are safe and secure. We never share your information with third parties.
        </div>

        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-3.5 py-2.5 text-xs font-semibold text-slate-600 hover:border-slate-300"
          >
            <ChevronLeft size={14} /> Back to Review
          </button>
          <button
            type="button"
            disabled={!canContinue}
            onClick={onNext}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue to Confirm Booking <ArrowRight size={15} />
          </button>
        </div>
      </div>

      <TripSummarySidebar trip={trip} vehicle={vehicle} distanceKm={distanceKm} minutes={minutes} total={pricing.total} />
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  Step 6 — Confirm booking                                                */
/* ---------------------------------------------------------------------- */

function StepConfirm({
  trip,
  vehicle,
  distanceKm,
  minutes,
  pricing,
  bookingId,
  confirmed,
  onConfirm,
  onBack,
  onClose,
}: {
  trip: TripDetails;
  vehicle: Vehicle | null;
  distanceKm: number;
  minutes: number;
  pricing: { base: number; gst: number; total: number };
  bookingId: string;
  confirmed: boolean;
  onConfirm: () => void;
  onBack: () => void;
  onClose: () => void;
}) {
  const bookingDateLabel = new Date().toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  function sendWhatsApp() {
    const message = encodeURIComponent(buildWhatsAppMessage(trip, vehicle, pricing.total));
    window.open(`https://wa.me/${SUPPORT_PHONE}?text=${message}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px_300px]">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">Step 6 of 6</p>
        <h2 className="mt-0.5 text-lg font-bold text-slate-900">
          {confirmed ? "Booking Confirmed!" : "Confirm Your Booking"}
        </h2>
        <p className="mt-0.5 text-xs text-slate-500">
          {confirmed
            ? "Thank you for choosing BSH Taxi Services."
            : "Please review your booking details and confirm to complete"}
        </p>

        <div className="mt-3 rounded-xl border border-slate-100 p-5 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
            <Check size={32} className="text-emerald-500" />
          </div>
          <h3 className="mt-3 text-base font-bold text-slate-900">{confirmed ? "Booking Confirmed!" : "Almost Done!"}</h3>
          <p className="mt-1 text-xs text-slate-500">
            {confirmed
              ? "Your booking is confirmed and we're excited to serve you."
              : "Please confirm your booking to complete the reservation."}
          </p>

          <div className="mx-auto mt-4 max-w-sm rounded-lg border border-slate-100 p-3 text-left">
            <p className="text-[11px] text-slate-400">Booking ID</p>
            <p className="text-sm font-bold text-primary">{bookingId}</p>
            <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-500">
              <CalendarIcon size={12} /> {bookingDateLabel}
            </div>
          </div>

          {confirmed ? (
            <div className="mt-4 grid grid-cols-1 gap-2.5 rounded-lg bg-emerald-50 p-3 text-left sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <MessageCircle size={14} />
                </span>
                <div>
                  <p className="text-[11px] font-semibold text-slate-800">SMS Sent</p>
                  <p className="text-[10px] text-slate-500">Booking details sent to your mobile</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Phone size={14} />
                </span>
                <div>
                  <p className="text-[11px] font-semibold text-slate-800">WhatsApp Sent</p>
                  <p className="text-[10px] text-slate-500">Booking details sent on WhatsApp</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Mail size={14} />
                </span>
                <div>
                  <p className="text-[11px] font-semibold text-slate-800">Email Sent</p>
                  <p className="text-[10px] text-slate-500">Booking details sent to your email</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 space-y-2.5 text-left">
              <div className="flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
                <Info size={14} className="mt-0.5 shrink-0" />
                Free Cancellation — cancel up to 12 hours before the scheduled pickup time for a full refund.
              </div>
            </div>
          )}

          <div className="mt-5 grid grid-cols-1 gap-2.5 text-left sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <Car size={14} />
              </span>
              <div>
                <p className="text-[11px] font-semibold text-slate-800">Driver Assigned</p>
                <p className="text-[10px] text-slate-500">We'll assign the best driver for your trip.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <Phone size={14} />
              </span>
              <div>
                <p className="text-[11px] font-semibold text-slate-800">You'll Get Updates</p>
                <p className="text-[10px] text-slate-500">Receive driver details via SMS, WhatsApp &amp; Email.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <MapPin size={14} />
              </span>
              <div>
                <p className="text-[11px] font-semibold text-slate-800">Enjoy Your Ride</p>
                <p className="text-[10px] text-slate-500">Our driver will reach on time and ensure comfort.</p>
              </div>
            </div>
          </div>

          {confirmed ? (
            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              <button className="flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-[11px] font-semibold text-white">
                <BookOpen size={13} /> Track Booking
              </button>
              <button
                onClick={sendWhatsApp}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-semibold text-emerald-600"
              >
                <MessageCircle size={13} /> Share on WhatsApp
              </button>
              <a
                href={`tel:+${SUPPORT_PHONE}`}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-semibold text-primary"
              >
                <Phone size={13} /> Call Support
              </a>
              <button
                onClick={onClose}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-semibold text-slate-600"
              >
                <Home size={13} /> Back to Home
              </button>
            </div>
          ) : (
            <>
              <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={onConfirm}
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-white"
                >
                  <Lock size={14} /> Confirm Booking Now
                </button>
                <button
                  type="button"
                  onClick={sendWhatsApp}
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-semibold text-emerald-600"
                >
                  <MessageCircle size={14} /> Send Booking on WhatsApp
                </button>
                <a
                  href={`tel:+${SUPPORT_PHONE}`}
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-semibold text-primary"
                >
                  <Phone size={14} /> Call to Confirm
                </a>
              </div>
              <p className="mt-2.5 text-[11px] text-slate-400">
                By confirming, you agree to our Terms &amp; Conditions and Privacy Policy.
              </p>
            </>
          )}
        </div>

        {!confirmed && (
          <button
            type="button"
            onClick={onBack}
            className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-700"
          >
            <ChevronLeft size={14} /> Back to Passenger Details
          </button>
        )}
      </div>

      <TripSummarySidebar trip={trip} vehicle={vehicle} distanceKm={distanceKm} minutes={minutes} total={pricing.total} />
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  Root wizard                                                            */
/* ---------------------------------------------------------------------- */

export default function BookingWizard({ vehicleId }: BookingWizardProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [trip, setTrip] = useState<TripDetails>(makeDefaultTrip);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | undefined>(vehicleId);
  const [passenger, setPassenger] = useState<PassengerDetails>(makeDefaultPassenger);
  const [bookingId, setBookingId] = useState(makeBookingId());
  const [confirmed, setConfirmed] = useState(false);

  // Real distance/time reported by the live map, once it resolves the route.
  const [mapRoute, setMapRoute] = useState<{ distanceKm: number; minutes: number } | null>(null);

  // Coordinates resolved directly from LocationAutocomplete (user picked a
  // suggestion). When present, RouteMapPreview can skip geocoding that
  // point entirely and go straight to routing.
  const [pickupCoords, setPickupCoords] = useState<GeoPoint | null>(null);
  const [dropCoords, setDropCoords] = useState<GeoPoint | null>(null);

  const vehicle = useMemo(() => VEHICLES.find((v) => v.id === selectedVehicleId) ?? null, [selectedVehicleId]);

  // Instant placeholder estimate shown before the map finishes geocoding/routing.
  const fallbackEstimate = useMemo(() => estimateRoute(trip.pickup, trip.drop), [trip.pickup, trip.drop]);

  // Clear the resolved route whenever pickup/drop changes so the fallback
  // estimate shows again until the map recomputes the real one.
  useEffect(() => {
    setMapRoute(null);
  }, [trip.pickup, trip.drop]);

  const distanceKm = mapRoute?.distanceKm ?? fallbackEstimate.distanceKm;
  const minutes = mapRoute?.minutes ?? fallbackEstimate.minutes;

  const pricing = useMemo(() => {
    if (!vehicle || !distanceKm) return { base: 0, gst: 0, total: 0 };
    const base = Math.round(vehicle.ratePerKm * distanceKm);
    const gst = Math.round(base * 0.05);
    return { base, gst, total: base + gst };
  }, [vehicle, distanceKm]);

  function goTo(index: number) {
    setStepIndex(Math.max(0, Math.min(STEPS.length - 1, index)));
  }

  function handleClose() {
    // Reset for next time this wizard is opened.
    setStepIndex(0);
    setTrip(makeDefaultTrip());
    setSelectedVehicleId(vehicleId);
    setPassenger(makeDefaultPassenger());
    setConfirmed(false);
    setBookingId(makeBookingId());
    setMapRoute(null);
    setPickupCoords(null);
    setDropCoords(null);
  }

  function handleConfirm() {
    setConfirmed(true);
  }

  return (
    <div className="w-full">
      <div className="w-full px-3 py-4 sm:px-5 lg:px-8">
        <div className="rounded-xl bg-white shadow-sm">
          <Stepper currentIndex={stepIndex} />

          <div className="p-4 sm:p-5">
            {stepIndex === 0 && (
              <StepTripDetails
                trip={trip}
                setTrip={setTrip}
                distanceKm={distanceKm}
                minutes={minutes}
                pickupCoords={pickupCoords}
                dropCoords={dropCoords}
                onPickupCoords={setPickupCoords}
                onDropCoords={setDropCoords}
                onRouteComputed={setMapRoute}
                onNext={() => goTo(1)}
              />
            )}
            {stepIndex === 1 && (
              <StepVehicle
                trip={trip}
                distanceKm={distanceKm}
                minutes={minutes}
                vehicle={vehicle}
                setVehicleId={setSelectedVehicleId}
                onBack={() => goTo(0)}
                onNext={() => goTo(2)}
              />
            )}
            {stepIndex === 2 && (
              <StepDateTime
                trip={trip}
                setTrip={setTrip}
                vehicle={vehicle}
                distanceKm={distanceKm}
                minutes={minutes}
                onBack={() => goTo(1)}
                onNext={() => goTo(3)}
              />
            )}
            {stepIndex === 3 && (
              <StepReview
                trip={trip}
                vehicle={vehicle}
                distanceKm={distanceKm}
                minutes={minutes}
                pricing={pricing}
                onBack={() => goTo(2)}
                onNext={() => goTo(4)}
              />
            )}
            {stepIndex === 4 && (
              <StepPassenger
                trip={trip}
                vehicle={vehicle}
                distanceKm={distanceKm}
                minutes={minutes}
                pricing={pricing}
                passenger={passenger}
                setPassenger={setPassenger}
                onBack={() => goTo(3)}
                onNext={() => goTo(5)}
              />
            )}
            {stepIndex === 5 && (
              <StepConfirm
                trip={trip}
                vehicle={vehicle}
                distanceKm={distanceKm}
                minutes={minutes}
                pricing={pricing}
                bookingId={bookingId}
                confirmed={confirmed}
                onConfirm={handleConfirm}
                onBack={() => goTo(4)}
                onClose={handleClose}
              />
            )}
          </div>
        </div>

      
      </div>
    </div>
  );
}