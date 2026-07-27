import { useState } from "react";
import {
  MapPin,
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  MessageCircle,
  ShieldCheck,
  Car,
  Check,
  Users,
} from "lucide-react";

import LocationAutocomplete, {
  POPULAR_PICKUP_PLACES,
  POPULAR_DROP_PLACES,
} from "./LocationAutocomplete";
import {
  SUPPORT_PHONE,
  SUPPORT_PHONE_DISPLAY,
  VEHICLES,
  makeBookingId,
} from "../../data/bookingConfig";

interface InstantBookingCardProps {
  /** Pre-filled when opened from a specific fleet card's "Book Now". */
  vehicleName?: string;
  /** Pre-filled pickup text, e.g. from the fare estimator's "From" field. */
  initialPickup?: string;
  /** Pre-filled drop text, e.g. from the fare estimator's selected destination. */
  initialDrop?: string;
  onClose: () => void;
}

// Shared input classes — text-base (16px) below the sm breakpoint is
// intentional: any input font-size under 16px makes iOS Safari
// auto-zoom the whole page on focus, which is jarring on a modal form.
const INPUT_TEXT = "text-base sm:text-xs";

/**
 * InstantBookingCard
 * -------------------
 * A short, single-screen booking form used inside <BookingModal>.
 * Deliberately NOT the multi-step <BookingWizard> — just the fields
 * needed to get a booking request moving: pickup, drop, vehicle, date,
 * time, name, phone. Submitting opens WhatsApp with all the details
 * pre-filled so the BSH team can confirm directly.
 *
 * Mobile notes:
 * - Inputs use 16px text below `sm` to avoid iOS Safari's auto-zoom.
 * - The submit button + call link sit in a `sticky bottom-0` footer so
 *   they stay reachable while the fields above scroll (this relies on
 *   the parent <BookingModal> body being the scrolling container).
 * - Touch targets (vehicle cards, inputs, button) are sized for thumbs.
 */
export default function InstantBookingCard({
  vehicleName,
  initialPickup,
  initialDrop,
  onClose,
}: InstantBookingCardProps) {
  const [pickup, setPickup] = useState(initialPickup?.trim() ? initialPickup : "Visakhapatnam");
  const [drop, setDrop] = useState(initialDrop ?? "");
  // Pre-select the vehicle if this card was opened from a specific fleet
  // card's "Book Now" (vehicleName matches one of VEHICLES by name).
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | undefined>(
    () => VEHICLES.find((v) => v.name.toLowerCase() === vehicleName?.toLowerCase())?.id
  );
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  const todayIso = new Date().toISOString().split("T")[0];
  const selectedVehicle = VEHICLES.find((v) => v.id === selectedVehicleId) ?? null;

  // Format "14:30" -> "2:30 PM" for a friendlier WhatsApp message.
  function formatTime12h(t: string) {
    const [hStr, mStr] = t.split(":");
    const h = Number(hStr);
    const period = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12}:${mStr} ${period}`;
  }

  const canSubmit =
    pickup.trim().length > 0 &&
    drop.trim().length > 0 &&
    !!selectedVehicleId &&
    date.trim().length > 0 &&
    time.trim().length > 0 &&
    name.trim().length > 0 &&
    phone.trim().length >= 10;

  function handleSubmit() {
    if (!canSubmit) return;

    const bookingId = makeBookingId();
    const lines = [
      "Hi BSH Taxi Services, I'd like to book a ride:",
      `*Booking ID:* ${bookingId}`,
      `*Name:* ${name}`,
      `*Phone:* ${phone}`,
      `*Pickup:* ${pickup}`,
      `*Drop:* ${drop}`,
      `*Date:* ${date}`,
      `*Time:* ${formatTime12h(time)}`,
      selectedVehicle ? `*Preferred Vehicle:* ${selectedVehicle.name}` : null,
      "Please confirm my booking.",
    ].filter(Boolean);

    const message = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${SUPPORT_PHONE}?text=${message}`, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  // Success state, shown right after the WhatsApp tab opens.
  if (sent) {
    return (
      <div className="p-6 text-center sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 ring-8 ring-emerald-50/60">
          <MessageCircle size={26} className="text-emerald-500" />
        </div>
        <h3 className="mt-4 text-lg font-extrabold text-slate-900">Request Sent!</h3>
        <p className="mx-auto mt-1 max-w-xs text-sm text-slate-500">
          We've opened WhatsApp with your booking details. Our team will confirm your ride shortly.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50 active:scale-[0.99] sm:w-auto sm:py-2.5"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-3.5">
        <LocationAutocomplete
          id="instant-pickup"
          label="Pickup Location"
          value={pickup}
          onChange={(v) => setPickup(v)}
          placeholder="Enter pickup location"
          icon={MapPin}
          limitToVizag
          popularPlaces={POPULAR_PICKUP_PLACES}
        />

        <LocationAutocomplete
          id="instant-drop"
          label="Drop Location"
          value={drop}
          onChange={(v) => setDrop(v)}
          placeholder="Enter drop location"
          icon={MapPin}
          popularPlaces={POPULAR_DROP_PLACES}
        />

        <div>
          <label className="mb-1.5 flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-[0.08em] text-slate-500">
            Choose Vehicle *
          </label>
          <div className="grid grid-cols-2 gap-2">
            {VEHICLES.map((v) => {
              const active = selectedVehicleId === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVehicleId(v.id)}
                  className={`relative flex min-h-13 items-center gap-2 rounded-xl border px-2.5 py-2.5 text-left transition-all duration-150 active:scale-[0.98] ${
                    active
                      ? "border-primary bg-primary/6 ring-1 ring-primary/25"
                      : "border-slate-200 bg-white hover:border-primary/40"
                  }`}
                >
                  {active && (
                    <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white">
                      <Check size={10} strokeWidth={3} />
                    </span>
                  )}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-primary/12 to-primary/5 text-primary">
                    <Car size={15} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-bold text-slate-900">{v.name}</span>
                    <span className="flex items-center gap-1 text-[10.5px] text-slate-500">
                      <Users size={10} /> {v.seats}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="instant-date"
              className="mb-1.5 flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-[0.08em] text-slate-500"
            >
              Travel Date *
            </label>
            <div className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white px-3 py-3 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200 focus-within:border-primary sm:py-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-primary/12 to-primary/5 text-primary">
                <CalendarIcon size={13} />
              </span>
              <input
                id="instant-date"
                type="date"
                min={todayIso}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full bg-transparent font-medium text-slate-800 outline-none ${INPUT_TEXT}`}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="instant-time"
              className="mb-1.5 flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-[0.08em] text-slate-500"
            >
              Travel Time *
            </label>
            <div className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white px-3 py-3 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200 focus-within:border-primary sm:py-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-primary/12 to-primary/5 text-primary">
                <Clock size={13} />
              </span>
              <input
                id="instant-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={`w-full bg-transparent font-medium text-slate-800 outline-none ${INPUT_TEXT}`}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="instant-name"
              className="mb-1.5 flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-[0.08em] text-slate-500"
            >
              Full Name *
            </label>
            <div className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white px-3 py-3 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200 focus-within:border-primary sm:py-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-primary/12 to-primary/5 text-primary">
                <User size={13} />
              </span>
              <input
                id="instant-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                autoComplete="name"
                className={`w-full bg-transparent font-medium text-slate-800 outline-none placeholder:font-normal placeholder:text-slate-400 ${INPUT_TEXT}`}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="instant-phone"
              className="mb-1.5 flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-[0.08em] text-slate-500"
            >
              Phone Number *
            </label>
            <div className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white px-3 py-3 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200 focus-within:border-primary sm:py-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-primary/12 to-primary/5 text-primary">
                <Phone size={13} />
              </span>
              <input
                id="instant-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10 digit mobile number"
                inputMode="numeric"
                autoComplete="tel"
                className={`w-full bg-transparent font-medium text-slate-800 outline-none placeholder:font-normal placeholder:text-slate-400 ${INPUT_TEXT}`}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 rounded-xl bg-linear-to-br from-primary/[0.07] to-primary/2 px-3.5 py-2.5 text-xs text-slate-600 ring-1 ring-inset ring-primary/10">
          <ShieldCheck size={14} className="shrink-0 text-primary" />
          Your details are safe. We'll confirm your ride directly on WhatsApp.
        </div>
      </div>

      {/* Sticky footer — stays reachable while fields above scroll, since
          the parent <BookingModal> body (overflow-y-auto) is the
          scrolling ancestor this sticky container attaches to. */}
      <div className="sticky bottom-0 -mx-4 -mb-4 mt-4 border-t border-slate-100 bg-white/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-sm sm:-mx-6 sm:-mb-6 sm:px-6">
        <button
          type="button"
          disabled={!canSubmit}
          onClick={handleSubmit}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-b from-primary to-primary/90 px-4 py-3.5 text-sm font-bold tracking-tight text-white shadow-[0_4px_14px_-2px] shadow-primary/35 transition-all duration-150 hover:brightness-[1.07] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none sm:py-3"
        >
          <MessageCircle size={16} />
          Send Booking Request
        </button>

        <a
          href={`tel:+${SUPPORT_PHONE}`}
          className="mt-3 flex items-center justify-center gap-1.5 py-1 text-xs font-semibold text-primary active:opacity-70"
        >
          <Phone size={12} /> Or call us at {SUPPORT_PHONE_DISPLAY}
        </a>
      </div>
    </div>
  );
}