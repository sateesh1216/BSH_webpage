import { Phone, Mail, MapPin, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import logo from "../../assets/Logo_bsh taxi services.webp";

const PHONE_DISPLAY = "+91 8886803322";
const PHONE_HREF = "tel:+918886803322";
const EMAIL = "info.bshtaxiservices@gmail.com";
const WHATSAPP_HREF = "https://wa.me/918886803322";
const ADDRESS_LINES = [
  "36-92-242-532/1, Palanati Colony,",
  "Kancharapalem, Visakhapatnam,",
  "Andhra Pradesh - 530008",
];

interface ProfileSheetProps {
  open: boolean;
  onClose: () => void;
}

export default function ProfileSheet({ open, onClose }: ProfileSheetProps) {
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
        aria-label="Contact details"
        className={`fixed inset-x-0 bottom-0 z-[10001] rounded-t-3xl bg-white p-5 shadow-[0_-8px_40px_rgba(15,23,42,0.18)] transition-transform duration-300 md:hidden ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1.25rem)" }}
      >
        {/* Grabber */}
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-200" />

        {/* Header */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="" className="h-12 w-12 shrink-0 rounded-full object-contain" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-extrabold text-slate-900">BSH Taxi Services</p>
            <p className="text-xs text-slate-500">24/7 taxi service in Visakhapatnam</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500"
          >
            <X size={18} />
          </button>
        </div>

        {/* Details */}
        <div className="mt-5 space-y-1">
          <a
            href={PHONE_HREF}
            className="flex items-center gap-3 rounded-xl px-2 py-3 active:bg-slate-50"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
              <Phone size={18} />
            </span>
            <span>
              <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Phone
              </span>
              <span className="block text-sm font-semibold text-slate-800">{PHONE_DISPLAY}</span>
            </span>
          </a>

          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center gap-3 rounded-xl px-2 py-3 active:bg-slate-50"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
              <Mail size={18} />
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Email
              </span>
              <span className="block truncate text-sm font-semibold text-slate-800">{EMAIL}</span>
            </span>
          </a>

          <div className="flex items-start gap-3 rounded-xl px-2 py-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
              <MapPin size={18} />
            </span>
            <span>
              <span className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Address
              </span>
              {ADDRESS_LINES.map((line) => (
                <span key={line} className="block text-sm font-medium leading-snug text-slate-700">
                  {line}
                </span>
              ))}
            </span>
          </div>
        </div>

        {/* Call & WhatsApp buttons */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <a
            href={PHONE_HREF}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-sm active:scale-95"
          >
            <Phone size={17} />
            Call Now
          </a>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-semibold text-white shadow-sm active:scale-95"
          >
            <FaWhatsapp size={17} />
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
