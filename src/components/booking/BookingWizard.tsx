import { useRef, useState, useEffect, type ElementType } from "react";
import {
  Car,
  Navigation,
  Plane,
  Briefcase,
  Calendar,
  Clock,
  ChevronDown,
  Check,
  X,
  AlertCircle,
  MessageCircle,
  CalendarCheck,
  ArrowLeftRight,
  Users,
  MapPin,
  Locate,
  ShieldCheck,
  BadgeIndianRupee,
  Headset,
  UserRound,
  Lock,
  Send,
  LogOut,
} from "lucide-react";
import { createPortal } from "react-dom";

const WHATSAPP_NUMBER = "918886803322";

import DzireImg from "../../assets/icons_cars/Dzire-taxi-services-in-visakhapatnam-bshtaxiservices.webp";
import ErtigaImg from "../../assets/icons_cars/ertiga-taxi-services-in-visakhapatnam-bshtaxiservices.webp";
import InnovaCrystaImg from "../../assets/icons_cars/innova-crysta-in-vizag-bshtaxiservices.webp";
import TempoTravellerImg from "../../assets/icons_cars/17-seater-tempo-traveller-bshtaxiservices.webp";

// =============================================================================
// VEHICLE CATALOG
// Every fare below is a FIXED value you set directly — nothing is calculated
// or multiplied. To change a price, just edit the number in the tables below.
// =============================================================================

const CAR_TYPES = [
  {
    id: "sedan",
    name: "Dzire, Etios",
    subtitle: "Comfortable city rides",
    image: DzireImg,
    seats: 4,
    ac: true,
  },
  {
    id: "suv",
    name: "SUV (Ertiga, Innova)",
    subtitle: "Spacious for families & groups",
    image: ErtigaImg,
    seats: 7,
    ac: true,
  },
  {
    id: "innova_crysta",
    name: "Innova Crysta",
    subtitle: "Premium long-distance travel",
    image: InnovaCrystaImg,
    seats: 7,
    ac: true,
  },
  {
    id: "tempo_traveller",
    name: "17-Seater Tempo Traveller",
    subtitle: "Best for large groups & outings",
    image: TempoTravellerImg,
    seats: 17,
    ac: true,
  },
] as const;

type CarId = (typeof CAR_TYPES)[number]["id"];
type CarType = (typeof CAR_TYPES)[number];

// ---- LOCAL package definitions (label/description only — prices live below) ----
const LOCAL_PACKAGES = [
  { id: "pkg8_80", label: "8 Hours / 80 KM", description: "Ideal for local city travel" },
  { id: "pkg10_100", label: "10 Hours / 100 KM", description: "More time, more places" },
] as const;

type LocalPackageId = (typeof LOCAL_PACKAGES)[number]["id"];

// ---- FIXED local fares: [carId][packageId] -> price. Edit freely. ----
const LOCAL_FARES: Record<CarId, Record<LocalPackageId, number>> = {
  sedan: { pkg8_80: 2500, pkg10_100: 3000 },
  suv: { pkg8_80: 3200, pkg10_100: 3800 },
  innova_crysta: { pkg8_80: 3500, pkg10_100: 4000 },
  tempo_traveller: { pkg8_80: 5500, pkg10_100: 6500 },
};

// ---- Airport fares: kept for reference only — no longer shown in the UI.
// Airport now works like Outstation ("Fare confirmed on call / WhatsApp").
// If you want fixed airport pricing back, restore the `airportFare` lookup
// and swap `<OnCallFare />` back to `<FareSummary amount={airportFare} />`
// in the Airport tab below. ----


const POPULAR_PICKUP_PLACES = [
  "RTC Complex, Vizag",
  "Vizag Railway Station",
  "Visakhapatnam Airport (VTZ)",
  "MVP Colony",
  "Dwaraka Nagar",
  "Gajuwaka",
  "Madhurawada",
  "Rushikonda Beach",
  "Simhachalam",
  "Pendurthi",
  "Yendada",
  "Beach Road, Vizag",
];

const POPULAR_DROP_PLACES = [
  "Araku Valley",
  "Vijayawada",
  "Rajahmundry",
  "Srikakulam",
  "Vizianagaram",
  "Hyderabad",
  "Bhubaneswar",
  "Annavaram",
];

// ---- TOUR packages: metadata only — prices live in TOUR_FARES below ----
const TOUR_PACKAGES = [
  {
    id: "araku_1d",
    name: "Araku Valley 1Day Trip",
    days: 1,
    nights: 0,
    description: "Coffee plantations, Borra Caves & scenic ghats",
    highlights: [
      "damuku view point",
      "Borra Caves",
      "Katika waterfalls (Only car parking)",
      "Galikonda viewponit",
      "Coffee Plantation",
      "Coffee Museum",
      "Tribal Museum",
      "Coffee House",
      "padmapuram gardens",
    ],
  },
  {
    id: "araku_2d",
    name: "Araku Valley 2D/1N",
    days: 2,
    nights: 1,
    description: "Overnight stay with sunrise viewpoint",
    highlights: [
      "damuku view point",
      "Borra Caves",
      "Katika waterfalls (Only car parking)",
      "Galikonda viewponit",
      "Coffee Plantation",
      "Coffee Museum",
      "Tribal Museum",
      "Coffee House",
      "padmapuram gardens",
      "madagada view point",
      "chaparai waterfalls",
      "Ranajilleda waterfalls",
    ],
  },
  {
    id: "araku & lambasingi_2d",
    name: "Araku & Lambasingi 2D/1N",
    days: 2,
    nights: 1,
    description: "'Kashmir of Andhra' — misty hills getaway",
    highlights: [
      "damuku view point",
      "Borra Caves",
      "Katika waterfalls (Only car parking)",
      "Galikonda viewponit",
      "Coffee Plantation",
      "Coffee Museum",
      "Tribal Museum",
      "Coffee House",
      "padmapuram gardens",
      "madagada view point",
      "chaparai waterfalls",
      "Kothapalli waterfalls",
      "strawberry plantation",
      "Lambasingi",
    ],
  },
  {
    id: "vizag_local_tour_package",
    name: "Vizag City 1 Day",
    days: 1,
    nights: 0,
    description: "Beaches, temples & submarine museum",
    highlights: [
      "RK Beach",
      "Visakha museum",
      "Vuda park",
      "Fishing harbour",
      "Simhachalam Temple",
      "Kailasagiri",
      "Zoo park",
      "TTD temple",
      "Rushikonda beach",
      "Thotla konda",
      "Ramanaidu studioes",
      "Submarine(INS Kurusura Museum)",
      "Aircraft museum",
    ],
  },
  {
    id: "vizag_araku_3d",
    name: "Vizag 2D/1N + Araku 1D",
    days: 3,
    nights: 2,
    description: "Full city & valley combo package",
    highlights: [
      "RK Beach",
      "Visakha museum",
      "Vuda park",
      "Fishing harbour",
      "Fishing harbour",
      "Simhachalam Temple",
      "Kailasagiri",
      "Zoo park",
      "TTD temple",
      "Rushikonda beach",
      "Thotla konda",
      "Ramanaidu studioes",
      "Submarine(INS Kurusura Museum)",
      "Aircraft museum",
      "yarada beach",
      "light house",
      "damuku view point",
      "Borra Caves",
      "Katika waterfalls (Only car parking)",
      "Galikonda viewponit",
      "Coffee Plantation",
      "Coffee Museum",
      "Tribal Museum",
      "Coffee House",
      "padmapuram gardens",
    ],
  },
  {
    id: "vizag_araku_4d",
    name: "Vizag 2D/1N + Araku 1D/1N + Lambasingi 1D",
    days: 3,
    nights: 2,
    description: "Full city & valley combo package",
    highlights: [
      "RK Beach",
      "Visakha museum",
      "Vuda park",
      "Fishing harbour",
      "Fishing harbour",
      "Simhachalam Temple",
      "Kailasagiri",
      "Zoo park",
      "TTD temple",
      "Rushikonda beach",
      "Thotla konda",
      "Ramanaidu studioes",
      "Submarine(INS Kurusura Museum)",
      "Aircraft museum",
      "yarada beach",
      "light house",
      "damuku view point",
      "Borra Caves",
      "Katika waterfalls (Only car parking)",
      "Galikonda viewponit",
      "Coffee Plantation",
      "Coffee Museum",
      "Tribal Museum",
      "Coffee House",
      "padmapuram gardens",
      "madagada view point",
      "chaparai waterfalls",
      "Kothapalli waterfalls",
      "strawberry plantation",
      "Lambasingi",
    ],
  },
] as const;

type TourId = (typeof TOUR_PACKAGES)[number]["id"];

// ---- FIXED tour fares: [tourId][carId] -> price. Edit freely. ----
const TOUR_FARES: Record<TourId, Record<CarId, number>> = {
  araku_1d: { sedan: 5000, suv: 6500, innova_crysta: 8000, tempo_traveller: 12000 },
  araku_2d: { sedan: 10000, suv: 12000, innova_crysta: 15000, tempo_traveller: 18999 },
  "araku & lambasingi_2d": { sedan: 10000, suv: 12000, innova_crysta: 15000, tempo_traveller: 18999 },
  vizag_local_tour_package: { sedan: 3000, suv: 3500, innova_crysta: 4000, tempo_traveller: 6500 },
  vizag_araku_3d: { sedan: 11000, suv: 14000, innova_crysta: 16000, tempo_traveller: 25000 },
  vizag_araku_4d: { sedan: 15000, suv: 18000, innova_crysta: 20000, tempo_traveller: 30000 },
};

// ---- Terms & Conditions — shown in the confirm modal and appended to every
// WhatsApp booking message. Edit freely; each string becomes one numbered line. ----
const TERMS_AND_CONDITIONS = [
  "Toll charges and parking fees and Driver food and entry fees are not included.",
  "Driver Batta is optional.",
  "During standby and ghat roads, AC will be switched off.",
];

// =============================================================================
// ADMIN ACCESS
// ----------------------------------------------------------------------------
// Visiting the site with ?admin=1 in the URL unlocks admin-only controls
// (currently: "Send Quotation to Customer"). Once unlocked, the flag is
// saved to this browser's localStorage so the admin doesn't need to keep
// adding ?admin=1 every visit, and the query param is stripped from the
// visible URL right away so it isn't accidentally shared/bookmarked/seen
// by a customer looking over someone's shoulder.
//
// This is a simple "secret URL" gate, not real authentication — anyone who
// knows/guesses the URL can unlock it. Good enough to hide the control from
// ordinary customers; if you ever need real security, put this behind a
// proper login.
//
// To change the secret, edit ADMIN_QUERY_VALUE below (e.g. to something
// less guessable than "1").
// =============================================================================
const ADMIN_QUERY_PARAM = "admin";
const ADMIN_QUERY_VALUE = "1216";
const ADMIN_STORAGE_KEY = "bsh_admin_access";


function formatCurrency(amount: number | null | undefined) {
  if (amount === null || amount === undefined) return "—";
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

// Turns a loosely-typed Indian phone number into wa.me format (91XXXXXXXXXX).
// Returns null if it doesn't look like a valid number.
function normalizeIndianWhatsAppNumber(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 11 && digits.startsWith("0")) return `91${digits.slice(1)}`;
  if (digits.length === 12 && digits.startsWith("91")) return digits;
  return null;
}

/* =============================================================================
   LOCATION AUTOCOMPLETE (plain text + suggestion list, no distance/coords)
   ----------------------------------------------------------------------------
   FIX: the suggestion list now renders through a React portal into
   document.body (same pattern as CarSelect below). Previously it was an
   absolutely-positioned <ul> nested inside the booking card, and the card
   has `overflow-hidden` for its rounded corners — so the dropdown was being
   silently clipped/hidden behind the card edge on desktop. Portaling it out
   fixes that, and a full-screen invisible overlay (z-[999], list at
   z-[1000]) handles "click outside to close" instead of a mousedown
   listener, so clicks on list items are never swallowed.
   ============================================================================= */

function LocationAutocomplete({
  id,
  value,
  onChange,
  placeholder,
  icon: Icon = MapPin,
  popularPlaces = [],
  allowGeolocate = false,
}: {
  id: string;
  value: string;
  onChange: (label: string) => void;
  placeholder: string;
  icon?: ElementType;
  popularPlaces?: string[];
  allowGeolocate?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [locating, setLocating] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);

  function updateCoords() {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    setCoords({
      top: rect.bottom + window.scrollY + 6,
      left: rect.left + window.scrollX,
      width: rect.width,
    });
  }

  function openDropdown() {
    updateCoords();
    setOpen(true);
  }

  useEffect(() => {
    if (!open) return;
    function reposition() {
      updateCoords();
    }
    window.addEventListener("scroll", reposition, true);
    window.addEventListener("resize", reposition);
    return () => {
      window.removeEventListener("scroll", reposition, true);
      window.removeEventListener("resize", reposition);
    };
  }, [open]);

  const filtered = (() => {
    const q = value.trim().toLowerCase();
    if (!q) return popularPlaces;
    return popularPlaces.filter((p) => p.toLowerCase().includes(q));
  })();

  function handleGeolocate() {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      () => {
        onChange("My Current Location");
        setLocating(false);
        setOpen(false);
      },
      () => setLocating(false),
      { timeout: 8000 }
    );
  }

  return (
    <div className="relative" ref={wrapRef}>
      <div className="flex items-center gap-2 rounded-xl border border-white/70 bg-white/60 px-3 py-2.5 backdrop-blur-md transition-colors focus-within:border-blue-400 focus-within:bg-white/80 focus-within:ring-4 focus-within:ring-blue-500/10">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600">
          <Icon size={13} />
        </span>
        <input
          id={id}
          type="text"
          value={value}
          onFocus={openDropdown}
          onChange={(e) => {
            onChange(e.target.value);
            if (!open) openDropdown();
          }}
          placeholder={placeholder}
          className="w-full min-w-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />
        {allowGeolocate && (
          <button
            type="button"
            onClick={handleGeolocate}
            aria-label="Use current location"
            className="shrink-0 text-slate-400 hover:text-blue-600"
          >
            <Locate size={16} className={locating ? "animate-pulse text-blue-500" : ""} />
          </button>
        )}
      </div>

      {open &&
        filtered.length > 0 &&
        createPortal(
          <>
            <div className="fixed inset-0 z-[999]" onClick={() => setOpen(false)} />
            <ul
              style={{
                position: "absolute",
                top: coords.top,
                left: coords.left,
                width: coords.width,
              }}
              className="z-[1000] max-h-56 overflow-y-auto rounded-xl border border-white/70 bg-white/95 py-1 shadow-xl backdrop-blur-xl"
            >
              {filtered.map((place) => (
                <li key={place}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(place);
                      setOpen(false);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-blue-50"
                  >
                    <MapPin size={13} className="shrink-0 text-slate-300" />
                    <span className="truncate">{place}</span>
                  </button>
                </li>
              ))}
            </ul>
          </>,
          document.body
        )}
    </div>
  );
}

/* =============================================================================
   SHARED UI PIECES
   ============================================================================= */

function StepField({
  index,
  label,
  icon: Icon,
  children,
}: {
  index: number;
  label: string;
  icon?: ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <p className="mb-2 flex items-center gap-1.5 text-[13px] font-semibold text-slate-600 sm:gap-2 sm:text-sm">
        {Icon && <Icon size={14} className="shrink-0 text-slate-400 sm:hidden" />}
        <span className="hidden h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-500 text-[10px] font-bold text-white shadow-sm shadow-blue-500/30 sm:flex">
          {index}
        </span>
        <span>
          {index}. {label}
        </span>
      </p>
      {children}
    </div>
  );
}

function CarSelect({ car, onChange }: { car: CarType; onChange: (id: CarId) => void }) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);

  function toggleOpen() {
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 6,
        left: rect.left + window.scrollX,
        width: Math.min(rect.width, window.innerWidth - 20),
      });
    }
    setOpen((o) => !o);
  }

  useEffect(() => {
    if (!open) return;
    function reposition() {
      if (!btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 6,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
    window.addEventListener("scroll", reposition, true);
    window.addEventListener("resize", reposition);
    return () => {
      window.removeEventListener("scroll", reposition, true);
      window.removeEventListener("resize", reposition);
    };
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={toggleOpen}
        className="flex w-full items-center gap-3 rounded-xl border border-white/70 bg-white/60 px-3 py-2 text-left backdrop-blur-md transition-colors hover:border-blue-300 hover:bg-white/80"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/80 ring-1 ring-white/80 sm:h-11 sm:w-11">
          <img
            src={car.image}
            alt={car.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-slate-800">{car.name}</span>
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <Users size={11} /> {car.seats} Seater • {car.ac ? "AC" : "Non-AC"}
          </span>
        </span>
        <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open &&
        createPortal(
          <>
            <div className="fixed inset-0 z-[999]" onClick={() => setOpen(false)} />
            <ul
              style={{
                position: "absolute",
                top: coords.top,
                left: coords.left,
                width: coords.width,
              }}
              className="z-[1000] max-h-80 overflow-y-auto rounded-xl border border-white/70 bg-white/95 py-1 shadow-2xl backdrop-blur-xl"
            >
              {CAR_TYPES.map((option) => (
                <li key={option.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.id);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-blue-50 ${
                      option.id === car.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-50 ring-1 ring-slate-100 sm:h-11 sm:w-11">
                      <img
                        src={option.image}
                        alt={option.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-slate-800">{option.name}</span>
                      <span className="block text-xs text-slate-400">{option.subtitle}</span>
                    </span>
                    {option.id === car.id && <Check size={15} className="shrink-0 text-blue-600" />}
                  </button>
                </li>
              ))}
            </ul>
          </>,
          document.body
        )}
    </div>
  );
}

function DateTimeFields({
  date,
  time,
  onDate,
  onTime,
  dateLabel = "Pickup Date",
}: {
  date: string;
  time: string;
  onDate: (v: string) => void;
  onTime: (v: string) => void;
  dateLabel?: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <label className="mb-1.5 flex items-center gap-1 text-[11px] font-medium text-slate-500">
          <Calendar size={11} /> {dateLabel}
        </label>
        <input
          type="date"
          value={date}
          min={todayISO()}
          onChange={(e) => onDate(e.target.value)}
          className="w-full rounded-lg border border-white/70 bg-white/60 px-2.5 py-2 text-xs text-slate-700 outline-none backdrop-blur-md focus:border-blue-400 focus:bg-white/80"
        />
      </div>
      <div>
        <label className="mb-1.5 flex items-center gap-1 text-[11px] font-medium text-slate-500">
          <Clock size={11} /> Time
        </label>
        <input
          type="time"
          value={time}
          onChange={(e) => onTime(e.target.value)}
          className="w-full rounded-lg border border-white/70 bg-white/60 px-2.5 py-2 text-xs text-slate-700 outline-none backdrop-blur-md focus:border-blue-400 focus:bg-white/80"
        />
      </div>
    </div>
  );
}

function FareSummary({
  amount,
  note,
}: {
  amount: number | null | undefined;
  note?: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-blue-200/60 bg-blue-500/10 px-3 py-2.5 backdrop-blur-md">
      <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-blue-700">
        <BadgeIndianRupee size={13} /> Fixed Fare
      </span>
      {amount !== null && amount !== undefined ? (
        <span className="text-lg font-bold leading-tight text-slate-800">{formatCurrency(amount)}</span>
      ) : (
        <span className="text-xs font-medium text-slate-500">{note ?? "Select options"}</span>
      )}
    </div>
  );
}

function OnCallFare() {
  return (
    <div className="flex items-center justify-between rounded-xl border border-amber-200/60 bg-amber-500/10 px-3 py-2.5 backdrop-blur-md">
      <span className="text-[11px] font-medium text-amber-700">Fare confirmed on call / WhatsApp</span>
    </div>
  );
}

function TrustItem({
  icon: Icon,
  label,
  iconBg,
  iconColor,
}: {
  icon: ElementType;
  label: string;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${iconBg}`}>
        <Icon size={15} className={iconColor} />
      </span>
      <span className="text-xs font-medium text-slate-600">{label}</span>
    </div>
  );
}

function ProceedButtons({
  onBook,
  onWhatsApp,
  error,
}: {
  onBook: () => void;
  onWhatsApp: () => void;
  error: string | null;
}) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onBook}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-blue-500 py-3 text-[13px] font-semibold text-white shadow-lg shadow-blue-500/30 transition-transform hover:scale-[1.01] hover:shadow-xl active:scale-[0.99] sm:text-sm"
        >
          <CalendarCheck size={15} /> Book Now
        </button>
        <button
          type="button"
          onClick={onWhatsApp}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-[#25D366] py-3 text-[13px] font-semibold text-white shadow-lg shadow-emerald-500/30 transition-transform hover:scale-[1.01] active:scale-[0.99] sm:text-sm"
        >
          <MessageCircle size={15} /> WhatsApp
        </button>
      </div>
      {error && (
        <p className="flex items-start gap-1.5 text-[11px] font-medium text-red-500">
          <AlertCircle size={13} className="mt-0.5 shrink-0" /> {error}
        </p>
      )}
    </div>
  );
}

/* =============================================================================
   CONFIRM MODAL
   ----------------------------------------------------------------------------
   FIX: rendered through createPortal into document.body. The booking card
   wrapper uses `backdrop-blur-2xl`, and any ancestor with a CSS filter /
   backdrop-filter creates a new containing block for `position: fixed`
   descendants — so this modal was being positioned/clipped relative to the
   card (which also has `overflow-hidden`) instead of the viewport, hiding
   part of it (e.g. the Confirm button) depending on scroll position.
   Portaling to document.body escapes that entirely.

   UPDATE: now also shows the Terms & Conditions (same list that gets
   appended to the WhatsApp message) so the customer sees them before
   confirming, not just after.
   ============================================================================= */

function ConfirmModal({
  summary,
  onClose,
  onConfirm,
}: {
  summary: {
    title: string;
    rows: { label: string; value: string }[];
    fareLabel: string;
    fare: number | null;
  };
  onClose: () => void;
  onConfirm: () => void;
}) {
  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-end justify-center bg-slate-900/40 p-4 backdrop-blur-sm sm:items-center">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-white/70 bg-white/90 p-4 shadow-2xl backdrop-blur-xl sm:max-w-sm sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800">{summary.title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-2 rounded-xl bg-slate-50/80 p-3">
          {summary.rows.map((row) => (
            <div key={row.label} className="flex items-start justify-between gap-3 text-sm">
              <span className="shrink-0 text-slate-500">{row.label}</span>
              <span className="text-right font-medium text-slate-800">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between rounded-xl border border-blue-200/60 bg-blue-500/10 px-3 py-2.5">
          <span className="text-sm font-medium text-slate-600">{summary.fareLabel}</span>
          <span className="text-xl font-bold text-blue-600">
            {summary.fare !== null ? formatCurrency(summary.fare) : "On call"}
          </span>
        </div>

        <div className="mt-3 rounded-xl border border-slate-200/70 bg-slate-50/60 p-3">
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Terms &amp; Conditions
          </p>
          <ol className="space-y-1 text-[11px] leading-snug text-slate-500">
            {TERMS_AND_CONDITIONS.map((term, i) => (
              <li key={term} className="flex gap-1.5">
                <span className="shrink-0 font-semibold text-slate-400">{i + 1}.</span>
                <span>{term}</span>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-3 text-center text-[11px] text-slate-400">
          Fixed package fare. Tolls, parking &amp; waiting charges (if any) are extra.
        </p>

        <button
          type="button"
          onClick={onConfirm}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-[#25D366] py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-500/30 transition-transform hover:scale-[1.01] active:scale-[0.99] sm:py-3 sm:text-sm"
        >
          <MessageCircle size={16} /> Confirm &amp; Continue on WhatsApp
        </button>
        <button
          type="button"
          onClick={onClose}
          className="mt-2 w-full rounded-xl py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-50"
        >
          Edit Details
        </button>
      </div>
    </div>,
    document.body
  );
}

/* =============================================================================
   QUOTATION MODAL (ADMIN ONLY)
   ----------------------------------------------------------------------------
   Lets an admin send the currently-configured trip (whichever tab/options
   are selected) as a quotation directly to a CUSTOMER's WhatsApp number —
   as opposed to the normal booking flow, which always messages the
   business's own WhatsApp number. The admin can override the price shown
   to the customer (handy for Outstation/Airport, which are normally
   "confirmed on call") and add a short note.
   ============================================================================= */

function QuotationModal({
  summary,
  onClose,
  onSend,
}: {
  summary: {
    title: string;
    rows: { label: string; value: string }[];
    fareLabel: string;
    fare: number | null;
  };
  onClose: () => void;
  onSend: (data: { customerName: string; customerPhone: string; amount: string; note: string }) => string | null;
}) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [amount, setAmount] = useState(summary.fare !== null ? String(summary.fare) : "");
  const [note, setNote] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  function handleSend() {
    const err = onSend({ customerName, customerPhone, amount, note });
    if (err) {
      setFormError(err);
      return;
    }
    setFormError(null);
  }

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-end justify-center bg-slate-900/40 p-4 backdrop-blur-sm sm:items-center">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-white/70 bg-white/90 p-4 shadow-2xl backdrop-blur-xl sm:max-w-sm sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-1.5 text-base font-bold text-slate-800">
            <Send size={16} className="text-blue-600" /> Send Quotation to Customer
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mb-3 space-y-2 rounded-xl bg-slate-50/80 p-3">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            {summary.title.replace("Confirm ", "").replace(" Booking", "")}
          </p>
          {summary.rows.map((row) => (
            <div key={row.label} className="flex items-start justify-between gap-3 text-sm">
              <span className="shrink-0 text-slate-500">{row.label}</span>
              <span className="text-right font-medium text-slate-800">{row.value || "—"}</span>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div>
            <label className="mb-1.5 block text-[11px] font-medium text-slate-500">Customer Name (optional)</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Ramesh"
              className="w-full rounded-lg border border-white/70 bg-white/60 px-3 py-2 text-sm text-slate-700 outline-none backdrop-blur-md focus:border-blue-400 focus:bg-white/80"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-medium text-slate-500">Customer WhatsApp Number</label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="10-digit number, e.g. 9876543210"
              className="w-full rounded-lg border border-white/70 bg-white/60 px-3 py-2 text-sm text-slate-700 outline-none backdrop-blur-md focus:border-blue-400 focus:bg-white/80"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-medium text-slate-500">Quoted Fare (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount to quote"
              className="w-full rounded-lg border border-white/70 bg-white/60 px-3 py-2 text-sm text-slate-700 outline-none backdrop-blur-md focus:border-blue-400 focus:bg-white/80"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] font-medium text-slate-500">Note (optional)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Anything extra to add to the message"
              rows={2}
              className="w-full resize-none rounded-lg border border-white/70 bg-white/60 px-3 py-2 text-sm text-slate-700 outline-none backdrop-blur-md focus:border-blue-400 focus:bg-white/80"
            />
          </div>
        </div>

        {formError && (
          <p className="mt-3 flex items-start gap-1.5 text-[11px] font-medium text-red-500">
            <AlertCircle size={13} className="mt-0.5 shrink-0" /> {formError}
          </p>
        )}

        <button
          type="button"
          onClick={handleSend}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-[#25D366] py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-500/30 transition-transform hover:scale-[1.01] active:scale-[0.99] sm:py-3 sm:text-sm"
        >
          <MessageCircle size={16} /> Send Quotation via WhatsApp
        </button>
        <button
          type="button"
          onClick={onClose}
          className="mt-2 w-full rounded-xl py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </div>,
    document.body
  );
}

const TABS = [
  { id: "local", label: "Local", icon: Car },
  { id: "outstation", label: "Outstation", icon: Navigation },
  { id: "airport", label: "Airport", icon: Plane },
  { id: "tour", label: "Tour Packages", icon: Briefcase },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function BookingCard() {
  const [activeTab, setActiveTab] = useState<TabId>("local");
  const [carId, setCarId] = useState<CarId>(CAR_TYPES[0].id); // default: Sedan
  const car = CAR_TYPES.find((c) => c.id === carId) ?? CAR_TYPES[0];

  const [error, setError] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // ---- Admin state ----
  const [isAdmin, setIsAdmin] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  // ---- Local tab state ----
  const [localPickup, setLocalPickup] = useState("");
  const [localPackageId, setLocalPackageId] = useState<LocalPackageId>(LOCAL_PACKAGES[0].id);
  const [localDate, setLocalDate] = useState(todayISO());
  const [localTime, setLocalTime] = useState("");

  // ---- Outstation tab state ----
  const [outPickup, setOutPickup] = useState("");
  const [outDrop, setOutDrop] = useState("");
  const [tripType, setTripType] = useState<"oneway" | "round">("oneway");
  const [outDate, setOutDate] = useState(todayISO());
  const [outTime, setOutTime] = useState("");

  // ---- Airport tab state ----
  const [airportDirection, setAirportDirection] = useState<"fromAirport" | "toAirport">("fromAirport");
  const [airportOther, setAirportOther] = useState("");
  const [airportDate, setAirportDate] = useState(todayISO());
  const [airportTime, setAirportTime] = useState("");

  // ---- Tour tab state ----
  const [tourId, setTourId] = useState<TourId>(TOUR_PACKAGES[0].id);
  const [tourDate, setTourDate] = useState(todayISO());
  const tourPkg = TOUR_PACKAGES.find((t) => t.id === tourId) ?? TOUR_PACKAGES[0];

  const airportPickupLabel = airportDirection === "fromAirport" ? "Visakhapatnam Airport (VTZ)" : airportOther;
  const airportDropLabel = airportDirection === "fromAirport" ? airportOther : "Visakhapatnam Airport (VTZ)";

  // ---- FIXED fares — pure lookups by [car] and [package], no math ----
  // Note: Airport fares are intentionally NOT looked up/displayed anymore —
  // Airport now behaves like Outstation (fare confirmed on call/WhatsApp).
  const localFare = LOCAL_FARES[carId][localPackageId];
  const tourFare = TOUR_FARES[tourId][carId];

  // ---- Detect admin access via ?admin=1 (see ADMIN ACCESS block above) ----
useEffect(() => {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get(ADMIN_QUERY_PARAM) === ADMIN_QUERY_VALUE) {
      window.localStorage.setItem(ADMIN_STORAGE_KEY, "1");
      setIsAdmin(true);
      params.delete(ADMIN_QUERY_PARAM);
      const newSearch = params.toString();
      const newUrl = `${window.location.pathname}${newSearch ? `?${newSearch}` : ""}${window.location.hash}`;
      window.history.replaceState({}, "", newUrl);
    } else if (window.localStorage.getItem(ADMIN_STORAGE_KEY) === "1") {
      setIsAdmin(true);
    }
  } catch {
    // ignore
  }
}, []);
  function exitAdminMode() {
    try {
      window.localStorage.removeItem(ADMIN_STORAGE_KEY);
    } catch {
      // ignore
    }
    setIsAdmin(false);
    setQuoteModalOpen(false);
  }

  function switchTab(tab: TabId) {
    setActiveTab(tab);
    setError(null);
  }

  function swapOutstation() {
    setOutPickup(outDrop);
    setOutDrop(outPickup);
  }

  // ---- Validation ----
  function validate() {
    if (activeTab === "local") {
      if (localPickup.trim().length < 3) return "Please enter a pickup location.";
      if (!localTime) return "Please choose a pickup time.";
    }
    if (activeTab === "outstation") {
      if (outPickup.trim().length < 3) return "Please enter a pickup location.";
      if (outDrop.trim().length < 3) return "Please enter a drop location.";
      if (!outTime) return "Please choose a pickup time.";
    }
    if (activeTab === "airport") {
      if (airportOther.trim().length < 3)
        return airportDirection === "fromAirport"
          ? "Please enter a drop location."
          : "Please enter a pickup location.";
      if (!airportTime) return "Please choose a pickup time.";
    }
    if (activeTab === "tour") {
      if (!tourId) return "Please select a tour package.";
    }
    return null;
  }

  function buildSummary() {
    if (activeTab === "local") {
      const pkg = LOCAL_PACKAGES.find((p) => p.id === localPackageId)!;
      return {
        title: "Confirm Local Booking",
        rows: [
          { label: "Pickup", value: localPickup },
          { label: "Package", value: pkg.label },
          { label: "Date & Time", value: `${localDate} · ${localTime || "—"}` },
          { label: "Car", value: car.name },
        ],
        fareLabel: "Package Fare",
        fare: localFare,
      };
    }
    if (activeTab === "outstation") {
      return {
        title: "Confirm Outstation Booking",
        rows: [
          { label: "Pickup", value: outPickup },
          { label: "Drop", value: outDrop },
          { label: "Trip Type", value: tripType === "round" ? "Round Trip" : "One Way" },
          { label: "Date & Time", value: `${outDate} · ${outTime || "—"}` },
          { label: "Car", value: car.name },
        ],
        fareLabel: "Trip Fare",
        fare: null, // confirmed on call/WhatsApp
      };
    }
    if (activeTab === "airport") {
      return {
        title: "Confirm Airport Booking",
        rows: [
          { label: "Direction", value: airportDirection === "fromAirport" ? "Airport → City" : "City → Airport" },
          { label: "Pickup", value: airportPickupLabel },
          { label: "Drop", value: airportDropLabel },
          { label: "Date & Time", value: `${airportDate} · ${airportTime || "—"}` },
          { label: "Car", value: car.name },
        ],
        fareLabel: "Airport Fare",
        fare: null, // confirmed on call/WhatsApp — same as Outstation
      };
    }
    return {
      title: "Confirm Tour Booking",
      rows: [
        { label: "Package", value: tourPkg.name },
        { label: "Duration", value: `${tourPkg.days}D / ${tourPkg.nights}N` },
        { label: "Travel Date", value: tourDate },
        { label: "Car", value: car.name },
      ],
      fareLabel: "Package Price",
      fare: tourFare,
    };
  }

  function handleBookNow() {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setConfirmOpen(true);
  }

  // ---- Build the WhatsApp message ----
  // Includes: greeting, booking type + summary rows, tour place list
  // (tour tab only), fare, and Terms & Conditions on every booking type.
  function openWhatsApp() {
    const summary = buildSummary();

    const lines = [
      "Hi BSH Taxi Services! I'd like to book a cab.",
      "",
      `*${summary.title.replace("Confirm ", "").replace(" Booking", "")}*`,
      ...summary.rows.map((r) => `${r.label}: ${r.value}`),
    ];

    // Tour packages: list every place covered, numbered for readability.
    if (activeTab === "tour") {
      lines.push("", "*Places Covered:*");
      tourPkg.highlights.forEach((place, i) => {
        lines.push(`${i + 1}. ${place}`);
      });
    }

    lines.push(
      "",
      `${summary.fareLabel}: ${summary.fare !== null ? formatCurrency(summary.fare) : "Please confirm on call"}`
    );

    // Terms & Conditions — appended to every booking type.
    lines.push("", "*Terms & Conditions:*");
    TERMS_AND_CONDITIONS.forEach((term, i) => {
      lines.push(`${i + 1}. ${term}`);
    });

    const message = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank", "noopener,noreferrer");
    setConfirmOpen(false);
  }

  function handleQuickWhatsApp() {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    openWhatsApp();
  }

  // ---- ADMIN ONLY: send the current trip as a quotation to a customer's
  // own WhatsApp number, with an optional price override and note. ----
  function handleSendQuotation(data: {
    customerName: string;
    customerPhone: string;
    amount: string;
    note: string;
  }): string | null {
    const normalizedPhone = normalizeIndianWhatsAppNumber(data.customerPhone);
    if (!normalizedPhone) {
      return "Please enter a valid 10-digit WhatsApp number.";
    }

    const summary = buildSummary();
    const trimmedAmount = data.amount.trim();
    const amountNumber = trimmedAmount ? Number(trimmedAmount) : null;
    if (trimmedAmount && (Number.isNaN(amountNumber) || amountNumber! <= 0)) {
      return "Please enter a valid fare amount.";
    }

    const lines = [
      `Hello${data.customerName.trim() ? ` ${data.customerName.trim()}` : ""}, this is BSH Taxi Services. Here's your quotation:`,
      "",
      `*${summary.title.replace("Confirm ", "").replace(" Booking", "")}*`,
      ...summary.rows.map((r) => `${r.label}: ${r.value || "—"}`),
    ];

    if (activeTab === "tour") {
      lines.push("", "*Places Covered:*");
      tourPkg.highlights.forEach((place, i) => {
        lines.push(`${i + 1}. ${place}`);
      });
    }

    lines.push(
      "",
      `${summary.fareLabel}: ${amountNumber !== null ? formatCurrency(amountNumber) : "Please confirm"}`
    );

    if (data.note.trim()) {
      lines.push("", `Note: ${data.note.trim()}`);
    }

    lines.push("", "*Terms & Conditions:*");
    TERMS_AND_CONDITIONS.forEach((term, i) => {
      lines.push(`${i + 1}. ${term}`);
    });

    lines.push("", "Reply here on WhatsApp if you'd like to confirm this booking. Thank you!");

    const message = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${normalizedPhone}?text=${message}`, "_blank", "noopener,noreferrer");
    setQuoteModalOpen(false);
    return null;
  }

  return (
    <div className="relative mx-auto w-full max-w-6xl">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-blue-200/60 via-indigo-100/50 to-sky-200/60 blur-2xl sm:-inset-6 sm:rounded-[2.5rem] lg:-inset-10"
      />

      <div className="relative overflow-hidden rounded-[24px] border border-white/60 bg-white/45 shadow-2xl shadow-blue-900/10 backdrop-blur-2xl sm:rounded-[28px] lg:rounded-[32px]">
        {/* Admin-only strip — only ever rendered when isAdmin is true */}
        {isAdmin && (
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/60 bg-amber-50/80 px-4 py-2 backdrop-blur-md sm:px-6">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-700">
              <Lock size={12} /> Admin mode
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuoteModalOpen(true)}
                className="flex items-center gap-1.5 rounded-full bg-amber-600 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm transition-colors hover:bg-amber-700"
              >
                <Send size={12} /> Send Quotation to Customer
              </button>
              <button
                type="button"
                onClick={exitAdminMode}
                className="flex items-center gap-1 text-[11px] font-medium text-amber-700 hover:text-amber-900"
              >
                <LogOut size={12} /> Exit
              </button>
            </div>
          </div>
        )}

        <div className="relative z-10">
          <div className="grid grid-cols-4 gap-1.5 p-3 sm:m-4 sm:mb-0 sm:flex sm:w-fit sm:gap-2 sm:rounded-2xl sm:border sm:border-white/60 sm:bg-white/50 sm:p-1.5 sm:backdrop-blur-md">
            {TABS.map(({ id, label, icon: Icon }) => {
              const active = activeTab === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => switchTab(id)}
                  className={`flex flex-col items-center justify-center gap-1 rounded-xl border py-2.5 text-[10.5px] font-semibold leading-tight transition-all sm:flex-row sm:gap-2 sm:rounded-xl sm:border-0 sm:px-4 sm:py-2.5 sm:text-sm ${
                    active
                      ? "border-transparent bg-gradient-to-br from-indigo-600 to-blue-500 text-white shadow-md shadow-blue-500/30 sm:bg-gradient-to-r"
                      : "border-slate-200/80 bg-white/70 text-slate-500 hover:border-blue-200 hover:text-blue-600 sm:border-0 sm:bg-transparent sm:hover:bg-white/60"
                  }`}
                >
                  <Icon size={19} strokeWidth={2.15} className="sm:hidden" />
                  <Icon size={17} strokeWidth={2.25} className="hidden sm:block" />
                  <span className="text-center">{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative z-10 p-4 sm:p-6">
          {/* ------------------------------------------------------------- LOCAL */}
          {activeTab === "local" && (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr_1.1fr_1fr]">
              <StepField index={1} label="Pickup Location" icon={MapPin}>
                <div className="space-y-2.5">
                  <LocationAutocomplete
                    id="local-pickup"
                    value={localPickup}
                    onChange={setLocalPickup}
                    placeholder="Enter pickup location"
                    icon={MapPin}
                    popularPlaces={POPULAR_PICKUP_PLACES}
                    allowGeolocate
                  />
                  <DateTimeFields date={localDate} time={localTime} onDate={setLocalDate} onTime={setLocalTime} />
                </div>
              </StepField>

              <StepField index={2} label="Package" icon={Clock}>
                <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
                  {LOCAL_PACKAGES.map((pkg) => (
                    <label
                      key={pkg.id}
                      className={`flex cursor-pointer items-start gap-2 rounded-xl border px-3 py-2.5 backdrop-blur-md transition-colors ${
                        localPackageId === pkg.id
                          ? "border-blue-400 bg-blue-500/10"
                          : "border-white/70 bg-white/50 hover:border-blue-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="local-package"
                        className="mt-0.5 accent-blue-600"
                        checked={localPackageId === pkg.id}
                        onChange={() => setLocalPackageId(pkg.id)}
                      />
                      <span>
                        <span className="block text-sm font-semibold text-slate-800">{pkg.label}</span>
                        <span className="block text-xs text-slate-500">{pkg.description}</span>
                        <span className="mt-0.5 block text-xs font-semibold text-blue-600">
                          {formatCurrency(LOCAL_FARES[carId][pkg.id])}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </StepField>

              <StepField index={3} label="Select Car" icon={Car}>
                <div className="space-y-3">
                  <CarSelect car={car} onChange={setCarId} />
                  <FareSummary amount={localFare} />
                </div>
              </StepField>

              <StepField index={4} label="Proceed" icon={CalendarCheck}>
                <ProceedButtons onBook={handleBookNow} onWhatsApp={handleQuickWhatsApp} error={error} />
              </StepField>
            </div>
          )}

          {/* -------------------------------------------------------- OUTSTATION */}
          {activeTab === "outstation" && (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr_1.1fr_1fr]">
              <StepField index={1} label="Pickup & Drop" icon={MapPin}>
                <div className="relative space-y-2">
                  <LocationAutocomplete
                    id="out-pickup"
                    value={outPickup}
                    onChange={setOutPickup}
                    placeholder="Pickup location"
                    icon={MapPin}
                    popularPlaces={POPULAR_PICKUP_PLACES}
                    allowGeolocate
                  />
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={swapOutstation}
                      aria-label="Swap pickup and drop"
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-white/70 bg-white/60 text-slate-400 backdrop-blur-md hover:border-blue-300 hover:text-blue-600"
                    >
                      <ArrowLeftRight size={13} />
                    </button>
                  </div>
                  <LocationAutocomplete
                    id="out-drop"
                    value={outDrop}
                    onChange={setOutDrop}
                    placeholder="Drop location / city"
                    icon={Navigation}
                    popularPlaces={POPULAR_DROP_PLACES}
                  />
                </div>
              </StepField>

              <StepField index={2} label="Trip Type" icon={ArrowLeftRight}>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
                    {(["oneway", "round"] as const).map((type) => (
                      <label
                        key={type}
                        className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 backdrop-blur-md transition-colors ${
                          tripType === type
                            ? "border-blue-400 bg-blue-500/10"
                            : "border-white/70 bg-white/50 hover:border-blue-200"
                        }`}
                      >
                        <input
                          type="radio"
                          name="trip-type"
                          className="accent-blue-600"
                          checked={tripType === type}
                          onChange={() => setTripType(type)}
                        />
                        <span className="text-sm font-semibold text-slate-800">
                          {type === "oneway" ? "One Way" : "Round Trip"}
                        </span>
                      </label>
                    ))}
                  </div>
                  <DateTimeFields date={outDate} time={outTime} onDate={setOutDate} onTime={setOutTime} />
                </div>
              </StepField>

              <StepField index={3} label="Select Car" icon={Car}>
                <div className="space-y-3">
                  <CarSelect car={car} onChange={setCarId} />
                  <OnCallFare />
                </div>
              </StepField>

              <StepField index={4} label="Proceed" icon={CalendarCheck}>
                <ProceedButtons onBook={handleBookNow} onWhatsApp={handleQuickWhatsApp} error={error} />
              </StepField>
            </div>
          )}

          {/* ------------------------------------------------------------ AIRPORT */}
          {activeTab === "airport" && (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr_1.1fr_1fr]">
              <StepField index={1} label="Direction & Location" icon={Plane}>
                <div className="space-y-2.5">
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "fromAirport" as const, label: "Airport → City" },
                      { id: "toAirport" as const, label: "City → Airport" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setAirportDirection(opt.id)}
                        className={`rounded-xl border px-2 py-2 text-xs font-semibold backdrop-blur-md transition-colors ${
                          airportDirection === opt.id
                            ? "border-blue-400 bg-blue-500/10 text-blue-700"
                            : "border-white/70 bg-white/50 text-slate-500 hover:border-blue-200"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <LocationAutocomplete
                    id="airport-other"
                    value={airportOther}
                    onChange={setAirportOther}
                    placeholder={airportDirection === "fromAirport" ? "Drop location in Vizag" : "Pickup location in Vizag"}
                    icon={MapPin}
                    popularPlaces={POPULAR_PICKUP_PLACES}
                    allowGeolocate
                  />
                </div>
              </StepField>

              <StepField index={2} label="Date & Time" icon={Calendar}>
                <DateTimeFields
                  date={airportDate}
                  time={airportTime}
                  onDate={setAirportDate}
                  onTime={setAirportTime}
                  dateLabel={airportDirection === "fromAirport" ? "Flight Landing Date" : "Pickup Date"}
                />
              </StepField>

              <StepField index={3} label="Select Car" icon={Car}>
                <div className="space-y-3">
                  <CarSelect car={car} onChange={setCarId} />
                  <OnCallFare />
                </div>
              </StepField>

              <StepField index={4} label="Proceed" icon={CalendarCheck}>
                <ProceedButtons onBook={handleBookNow} onWhatsApp={handleQuickWhatsApp} error={error} />
              </StepField>
            </div>
          )}

          {/* --------------------------------------------------------------- TOUR */}
          {activeTab === "tour" && (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr_1.1fr_1fr]">
              <StepField index={1} label="Select Package" icon={Briefcase}>
                <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
                  {TOUR_PACKAGES.map((pkg) => (
                    <label
                      key={pkg.id}
                      className={`flex cursor-pointer items-start gap-2 rounded-xl border px-3 py-2.5 backdrop-blur-md transition-colors ${
                        tourId === pkg.id
                          ? "border-blue-400 bg-blue-500/10"
                          : "border-white/70 bg-white/50 hover:border-blue-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="tour-package"
                        className="mt-1 accent-blue-600"
                        checked={tourId === pkg.id}
                        onChange={() => setTourId(pkg.id)}
                      />
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-slate-800">{pkg.name}</span>
                        <span className="block text-xs text-slate-500">
                          {pkg.days}D/{pkg.nights}N · {pkg.description}
                        </span>
                        <span className="mt-0.5 block text-xs font-semibold text-blue-600">
                          {formatCurrency(TOUR_FARES[pkg.id][carId])} with {car.name}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </StepField>

              <StepField index={2} label="Travel Date" icon={Calendar}>
                <div className="space-y-2">
                  <div>
                    <label className="mb-1.5 flex items-center gap-1 text-[11px] font-medium text-slate-500">
                      <Calendar size={11} /> Travel Date
                    </label>
                    <input
                      type="date"
                      value={tourDate}
                      min={todayISO()}
                      onChange={(e) => setTourDate(e.target.value)}
                      className="w-full rounded-lg border border-white/70 bg-white/60 px-2.5 py-2 text-xs text-slate-700 outline-none backdrop-blur-md focus:border-blue-400 focus:bg-white/80"
                    />
                  </div>
                  <ul className="space-y-1 text-[11px] text-slate-500">
                    {tourPkg.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-1.5">
                        <Check size={11} className="text-blue-600" /> {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </StepField>

              <StepField index={3} label="Select Car" icon={Car}>
                <div className="space-y-3">
                  <CarSelect car={car} onChange={setCarId} />
                  <FareSummary amount={tourFare} />
                </div>
              </StepField>

              <StepField index={4} label="Proceed" icon={CalendarCheck}>
                <ProceedButtons onBook={handleBookNow} onWhatsApp={handleQuickWhatsApp} error={error} />
              </StepField>
            </div>
          )}
        </div>

        {/* Trust strip */}
        <div className="relative z-10 grid grid-cols-2 gap-3 border-t border-white/50 bg-white/30 px-4 py-4 backdrop-blur-md sm:grid-cols-4 sm:px-6">
          <TrustItem icon={ShieldCheck} label="Safe & Secure" iconBg="bg-blue-500/10" iconColor="text-blue-600" />
          <TrustItem icon={UserRound} label="Professional Drivers" iconBg="bg-emerald-500/10" iconColor="text-emerald-600" />
          <TrustItem icon={BadgeIndianRupee} label="No Hidden Charges" iconBg="bg-violet-500/10" iconColor="text-violet-600" />
          <TrustItem icon={Headset} label="24/7 Support" iconBg="bg-orange-500/10" iconColor="text-orange-600" />
        </div>

        {confirmOpen && (
          <ConfirmModal summary={buildSummary()} onClose={() => setConfirmOpen(false)} onConfirm={openWhatsApp} />
        )}

        {isAdmin && quoteModalOpen && (
          <QuotationModal
            summary={buildSummary()}
            onClose={() => setQuoteModalOpen(false)}
            onSend={handleSendQuotation}
          />
        )}
      </div>
    </div>
  );
}