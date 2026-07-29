import { X } from "lucide-react";
import MobileSearchBar from "../home/MobileSearchBar";

interface SearchSheetProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchSheet({ open, onClose }: SearchSheetProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-[10000] bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search a destination"
        className={`fixed inset-x-0 bottom-0 z-[10001] max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-5 shadow-[0_-8px_40px_rgba(15,23,42,0.18)] transition-transform duration-300 md:hidden ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1.25rem)" }}
      >
        {/* Grabber */}
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-200" />

        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-base font-extrabold text-slate-900">Where do you want to go?</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500"
          >
            <X size={18} />
          </button>
        </div>

        <MobileSearchBar />
      </div>
    </>
  );
}
