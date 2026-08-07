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
  innova_crysta: { pkg8_80: 4000, pkg10_100: 4700 },
  tempo_traveller: { pkg8_80: 5500, pkg10_100: 6500 },
};

// ---- FIXED airport fares: [carId] -> price. Edit freely. ----
const AIRPORT_FARES: Record<CarId, number> = {
  sedan: 549,
  suv: 799,
  innova_crysta: 999,
  tempo_traveller: 1799,
};

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
    name: "Araku Valley Day Trip",
    days: 1,
    nights: 0,
    description: "Coffee plantations, Borra Caves & scenic ghats",
    highlights: ["Borra Caves", "Coffee Museum", "Tribal Museum", "Katiki Waterfalls"],
  },
  {
    id: "araku_2d",
    name: "Araku Valley 2D/1N",
    days: 2,
    nights: 1,
    description: "Overnight stay with sunrise viewpoint",
    highlights: ["Padmapuram Gardens", "Sunrise Viewpoint", "Borra Caves", "Local stay"],
  },
  {
    id: "lambasingi_2d",
    name: "Lambasingi 2D/1N",
    days: 2,
    nights: 1,
    description: "'Kashmir of Andhra' — misty hills getaway",
    highlights: ["Lambasingi hills", "Valley viewpoints", "Apple orchards", "Bonfire evening"],
  },
  {
    id: "vizag_city",
    name: "Vizag City Full Day",
    days: 1,
    nights: 0,
    description: "Beaches, temples & submarine museum",
    highlights: ["RK Beach", "Kailasagiri", "INS Kurusura Museum", "Simhachalam Temple"],
  },
  {
    id: "vizag_araku_3d",
    name: "Vizag + Araku 3D/2N",
    days: 3,
    nights: 2,
    description: "Full city & valley combo package",
    highlights: ["City sightseeing", "Araku Valley", "Borra Caves", "2 nights stay"],
  },
] as const;

type TourId = (typeof TOUR_PACKAGES)[number]["id"];

// ---- FIXED tour fares: [tourId][carId] -> price. Edit freely. ----
const TOUR_FARES: Record<TourId, Record<CarId, number>> = {
  araku_1d: { sedan: 3499, suv: 4899, innova_crysta: 5999, tempo_traveller: 8499 },
  araku_2d: { sedan: 6499, suv: 8999, innova_crysta: 10999, tempo_traveller: 15999 },
  lambasingi_2d: { sedan: 6999, suv: 9499, innova_crysta: 11499, tempo_traveller: 16999 },
  vizag_city: { sedan: 2499, suv: 3499, innova_crysta: 4299, tempo_traveller: 6499 },
  vizag_araku_3d: { sedan: 10999, suv: 14999, innova_crysta: 17999, tempo_traveller: 25999 },
};

function formatCurrency(amount: number | null | undefined) {
  if (amount === null || amount === undefined) return "—";
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

/* =============================================================================
   LOCATION AUTOCOMPLETE (plain text + suggestion list, no distance/coords)
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
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

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
          onFocus={() => setOpen(true)}
          onChange={(e) => onChange(e.target.value)}
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

      {open && filtered.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-56 overflow-y-auto rounded-xl border border-white/70 bg-white/95 py-1 shadow-xl backdrop-blur-xl">
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
  return (
    <div className="fixed inset-0 z-[1000] flex items-end justify-center bg-slate-900/40 p-4 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-md rounded-2xl border border-white/70 bg-white/90 p-4 shadow-2xl backdrop-blur-xl sm:max-w-sm sm:p-5">
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
              <span className="text-slate-500">{row.label}</span>
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
    </div>
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
  const localFare = LOCAL_FARES[carId][localPackageId];
  const airportFare = AIRPORT_FARES[carId];
  const tourFare = TOUR_FARES[tourId][carId];

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
        fare: airportFare,
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

  function openWhatsApp() {
    const summary = buildSummary();
    const lines = [
      "Hi BSH Taxi Services! I'd like to book a cab.",
      "",
      `*${summary.title.replace("Confirm ", "").replace(" Booking", "")}*`,
      ...summary.rows.map((r) => `${r.label}: ${r.value}`),
      `${summary.fareLabel}: ${summary.fare !== null ? formatCurrency(summary.fare) : "Please confirm on call"}`,
    ];
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

  return (
    <div className="relative mx-auto w-full max-w-6xl">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-blue-200/60 via-indigo-100/50 to-sky-200/60 blur-2xl sm:-inset-6 sm:rounded-[2.5rem] lg:-inset-10"
      />

      <div className="relative overflow-hidden rounded-[24px] border border-white/60 bg-white/45 shadow-2xl shadow-blue-900/10 backdrop-blur-2xl sm:rounded-[28px] lg:rounded-[32px]">
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
                  <FareSummary amount={airportFare} />
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
      </div>
    </div>
  );
}