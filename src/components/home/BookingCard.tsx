import { useState } from "react";
import { createPortal } from "react-dom";
import { X, Phone, MessageCircle, Send, CheckCircle2, ExternalLink } from "lucide-react";

const ADMIN_WHATSAPP_NUMBER = "918886803322";

export type TripDetails = {
  tripType: string;
  tripOption: string;
  pickup: string;
  drop: string;
  departureDate: string;
  passengers: string;
};

type BookingModalProps = {
  open: boolean;
  onClose: () => void;
  trip: TripDetails;
};

function formatDate(value: string) {
  if (!value) return "Not specified";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function buildWhatsAppMessage(trip: TripDetails, mobile: string, whatsapp: string, name: string) {
  const lines = [
    "*New Taxi Booking Request*",
    "",
    name.trim() ? `*Name:* ${name.trim()}` : null,
    `*Trip Type:* ${trip.tripType} (${trip.tripOption})`,
    `*Pickup:* ${trip.pickup}`,
    `*Drop:* ${trip.drop}`,
    `*Departure:* ${formatDate(trip.departureDate)}`,
    `*Passengers:* ${trip.passengers}`,
    `*Mobile Number:* ${mobile}`,
    `*WhatsApp Number:* ${whatsapp}`,
  ].filter(Boolean);

  return lines.join("\n");
}

function isValidIndianMobile(value: string) {
  const digits = value.replace(/\D/g, "");
  const normalized = digits.length > 10 ? digits.slice(-10) : digits;
  return /^[6-9]\d{9}$/.test(normalized);
}

export default function BookingModal({ open, onClose, trip }: BookingModalProps) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [sameAsMobile, setSameAsMobile] = useState(true);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [waUrl, setWaUrl] = useState("");

  if (!open) return null;

  const effectiveWhatsapp = sameAsMobile ? mobile : whatsapp;

  function handleSubmit() {
    if (isSubmitting) return; // guard against double-clicks

    if (!isValidIndianMobile(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!sameAsMobile && !isValidIndianMobile(whatsapp)) {
      setError("Please enter a valid 10-digit WhatsApp number.");
      return;
    }
    setError("");
    setIsSubmitting(true);

    const message = buildWhatsAppMessage(trip, mobile.trim(), effectiveWhatsapp.trim(), name);
    const url = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    setWaUrl(url);

    const newWindow = window.open(url, "_blank", "noopener,noreferrer");

    if (!newWindow) {
      console.warn("WhatsApp popup was blocked; showing fallback link.");
    }

    setIsSubmitting(false);
    setSent(true);
  }

  function handleClose() {
    setSent(false);
    setName("");
    setMobile("");
    setWhatsapp("");
    setSameAsMobile(true);
    setError("");
    setWaUrl("");
    onClose();
  }

  return createPortal(
    <div
      className="fixed inset-0 z-9999 isolate flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      <div className="relative z-10000 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 id="booking-modal-title" className="text-lg font-bold text-slate-900">
              {sent ? "Request sent!" : "Confirm your booking"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {sent
                ? "We've opened WhatsApp with your trip details."
                : "Share your number and we'll confirm on WhatsApp."}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="shrink-0 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        {!sent ? (
          <>
            <div className="mb-5 space-y-1.5 rounded-xl bg-slate-50 p-3.5 text-sm">
              <p className="text-slate-700">
                <span className="font-semibold text-slate-500">Trip: </span>
                {trip.tripType} · {trip.tripOption}
              </p>
              <p className="truncate text-slate-700">
                <span className="font-semibold text-slate-500">Pickup: </span>
                {trip.pickup}
              </p>
              <p className="truncate text-slate-700">
                <span className="font-semibold text-slate-500">Drop: </span>
                {trip.drop}
              </p>
              <p className="text-slate-700">
                <span className="font-semibold text-slate-500">Departure: </span>
                {formatDate(trip.departureDate)}
              </p>
              <p className="text-slate-700">
                <span className="font-semibold text-slate-500">Passengers: </span>
                {trip.passengers}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="booking-name" className="mb-1.5 block text-xs font-medium text-slate-500">
                  Your name (optional)
                </label>
                <input
                  id="booking-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-primary placeholder:text-slate-400"
                />
              </div>

              <div>
                <label htmlFor="booking-mobile" className="mb-1.5 block text-xs font-medium text-slate-500">
                  Mobile number
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 transition-colors focus-within:border-primary">
                  <Phone size={16} className="shrink-0 text-primary" />
                  <input
                    id="booking-mobile"
                    type="tel"
                    inputMode="numeric"
                    value={mobile}
                    onChange={(event) => setMobile(event.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full min-w-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <input
                  type="checkbox"
                  checked={sameAsMobile}
                  onChange={(event) => setSameAsMobile(event.target.checked)}
                  className="h-3.5 w-3.5 rounded border-slate-300 text-primary focus:ring-primary/30"
                />
                My WhatsApp number is the same as my mobile number
              </label>

              {!sameAsMobile && (
                <div>
                  <label htmlFor="booking-whatsapp" className="mb-1.5 block text-xs font-medium text-slate-500">
                    WhatsApp number
                  </label>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 transition-colors focus-within:border-primary">
                    <MessageCircle size={16} className="shrink-0 text-primary" />
                    <input
                      id="booking-whatsapp"
                      type="tel"
                      inputMode="numeric"
                      value={whatsapp}
                      onChange={(event) => setWhatsapp(event.target.value)}
                      placeholder="10-digit WhatsApp number"
                      className="w-full min-w-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>
              )}

              {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 ring-1 ring-inset ring-red-100">
                  ⚠ {error}
                </p>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-150 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={16} />
                {isSubmitting ? "Sending..." : "Send booking on WhatsApp"}
              </button>

              <p className="text-center text-[11px] text-slate-400">
                We'll open WhatsApp with your trip details pre-filled to send to our team.
              </p>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <CheckCircle2 size={40} className="text-primary" />
            <p className="text-sm text-slate-600">
              If WhatsApp didn't open automatically, check your pop-up blocker, or tap below.
            </p>
            {waUrl && (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-colors hover:bg-primary-hover"
              >
                Open WhatsApp
                <ExternalLink size={14} />
              </a>
            )}
            <button
              type="button"
              onClick={handleClose}
              className="mt-1 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-primary/40 hover:text-primary"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}