import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { useBooking } from "./BookingContext";
import InstantBookingCard from "./Instantbookingcard";

/**
 * BookingModal
 * ------------
 * Thin modal shell around <InstantBookingCard>. Mount this once near the
 * root of the app (alongside <BookingProvider>) — it portals to
 * document.body and shows/hides itself based on `isOpen`, so nothing
 * else needs to render it conditionally.
 *
 * NOTE: This is intentionally the short, single-screen booking form
 * (pickup, drop, vehicle, date, name, phone) — NOT the multi-step
 * <BookingWizard>. The full wizard still lives inline on the home page
 * hero section and is untouched by this modal.
 *
 * Mobile: on small screens this behaves like a bottom sheet — anchored
 * to the bottom of the viewport with only the top corners rounded —
 * instead of a centered card, which is easier to reach with a thumb and
 * feels more native on phones. It switches to a centered card at `sm`.
 */
export default function BookingModal() {
  const { isOpen, closeBooking, vehicleName, trip } = useBooking();

  // Close on Escape.
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeBooking();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, closeBooking]);

  // Lock background scroll while the modal is open.
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-end justify-center sm:items-center sm:p-6">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close booking"
        onClick={closeBooking}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
      />

      {/* Card — bottom sheet on mobile, centered card from `sm` up */}
      <div className="relative z-10 flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-h-[85vh] sm:w-full sm:max-w-md sm:rounded-3xl">
        {/* Drag-handle hint — mobile only, signals "this sheet can be dismissed" */}
        <div className="flex shrink-0 justify-center bg-linear-to-br from-blue-600 via-blue-700 to-indigo-700 pt-2.5 sm:hidden">
          <span className="h-1.25 w-10 rounded-full bg-white/40" />
        </div>

        {/* Header */}
        <div className="relative shrink-0 bg-linear-to-br from-blue-600 via-blue-700 to-indigo-700 px-5 pb-5 pt-3 text-white sm:px-6 sm:pt-6">
          <button
            type="button"
            aria-label="Close"
            onClick={closeBooking}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-4 sm:top-4 sm:h-8 sm:w-8"
          >
            <X size={16} />
          </button>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-100">
            Instant Booking
          </p>
          <h2 className="mt-1 pr-10 text-lg font-extrabold tracking-tight sm:text-xl">
            {vehicleName ? vehicleName : "Reserve a taxi in minutes"}
          </h2>
          <p className="mt-1 text-sm text-blue-100">
            Fill in a few details, we'll confirm on WhatsApp.
          </p>
        </div>

        {/* Card body — this is the scrolling container; the sticky footer
            inside <InstantBookingCard> attaches to it. Also respects the
            bottom safe-area on notched phones. */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-white pb-[env(safe-area-inset-bottom)]">
          <InstantBookingCard
            vehicleName={vehicleName}
            initialPickup={trip.pickup}
            initialDrop={trip.drop}
            onClose={closeBooking}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}