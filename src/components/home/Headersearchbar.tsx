import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  MapPin,
  X,
  Users,
  Briefcase,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

import { destinations } from "../../data/DestinationsData";
import { VEHICLES, SUPPORT_PHONE } from "../../data/bookingConfig";
import { FIXED_PRICES } from "../../data/fixedPrices";

/* ---------------------------------------------------------------------- */
/*  HeaderSearchBar — same booking logic as MobileSearchBar (home hero),   */
/*  restyled as a bar that spans the FULL width of the navbar's bottom     */
/*  row (edge-to-edge with the logo/call-button row above it), and         */
/*  expands into a floating panel on click. Keep the two files' data /     */
/*  logic in sync if you change trip types, fare lookup, etc.              */
/* ---------------------------------------------------------------------- */

const POPULAR_SLUGS: { slug: string; label: string }[] = [
  { slug: "vizag-local", label: "Vizag Local Sightseeing" },
  { slug: "vizag-airport", label: "Vizag Airport" },
  { slug: "simhachalam-temple", label: "Simhachalam Temple" },
  { slug: "araku-valley", label: "Araku Valley" },
  { slug: "annavaram-temple", label: "Annavaram Temple" },
  { slug: "arasavalli-temple", label: "Arasavalli Temple" },
  { slug: "vanjangi-hills", label: "Vanjangi Hills" },
  { slug: "lambasingi", label: "Lambasingi" },
  { slug: "tirupati", label: "Tirupati" },
];

type PopularLocation = {
  slug: string;
  name: string;
  image: string;
  distanceKm: number;
};

const POPULAR_LOCATIONS: PopularLocation[] = POPULAR_SLUGS.map(({ slug, label }) => {
  const match = destinations.find((d) => d.slug === slug);
  return {
    slug,
    name: label,
    image: match?.image ?? "",
    distanceKm: match?.distanceKm ?? 0,
  };
}).filter((loc) => loc.image);

const PICKUP_CITY = "Visakhapatnam";

type TripTypeKey = "One Way" | "Round Trip" | "Hourly" | "Package";
const TRIP_TYPES: TripTypeKey[] = ["One Way", "Round Trip", "Hourly", "Package"];

function waLink(message: string) {
  return `https://wa.me/${SUPPORT_PHONE}?text=${encodeURIComponent(message)}`;
}

function lookupFare(
  destinationSlug: string,
  vehicleId: string,
  tripType: TripTypeKey
): number | null {
  const vehiclePrices = FIXED_PRICES[destinationSlug]?.[vehicleId];
  if (!vehiclePrices) return null;
  if (tripType === "One Way") return vehiclePrices.oneWay ?? null;
  if (tripType === "Round Trip") return vehiclePrices.roundTrip ?? null;
  return null;
}

export default function HeaderSearchBar() {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState<PopularLocation | null>(null);
  const [tripType, setTripType] = useState<TripTypeKey>("One Way");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
        setExpanded(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function openPill() {
    setExpanded(true);
    setDropdownOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  const filteredLocations = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return POPULAR_LOCATIONS;
    return POPULAR_LOCATIONS.filter((loc) => loc.name.toLowerCase().includes(q));
  }, [query]);

  function selectLocation(loc: PopularLocation) {
    setSelected(loc);
    setQuery(loc.name);
    setTripType("One Way");
    setDropdownOpen(false);
  }

  function clearSelection() {
    setSelected(null);
    setQuery("");
    setDropdownOpen(false);
    setExpanded(false);
  }

  function handleSearch() {
    const trimmed = query.trim();
    if (!trimmed) {
      setDropdownOpen(true);
      return;
    }

    const match = POPULAR_LOCATIONS.find((loc) =>
      loc.name.toLowerCase().includes(trimmed.toLowerCase())
    );

    if (match) {
      selectLocation(match);
      return;
    }

    const message = `Hi BSH Taxi Services! I'd like to book a taxi from ${PICKUP_CITY} to "${trimmed}". Please share the fare and available cars.`;
    window.open(waLink(message), "_blank", "noopener,noreferrer");
  }

  const showPanel = dropdownOpen || !!selected;

  return (
    // w-full: the bar now fills its parent exactly — and since Header.tsx
    // wraps both this row and the logo/call-button row in the identical
    // `w-[92%] max-w-7xl` container, the bar's left/right edges land flush
    // with the logo and call button above it.
    <div ref={containerRef} className="relative w-full">
      {/* Full-width bar */}
      <div
        className={`flex h-12 w-full items-center gap-2 rounded-full border bg-white pl-4 pr-2 shadow-sm transition-all duration-200 ${
          expanded || showPanel
            ? "border-primary/50 shadow-[0_0_0_4px_rgba(21,94,239,0.10)]"
            : "border-slate-200 hover:border-primary/30"
        }`}
      >
        <Search size={17} className="shrink-0 text-primary" />

        <input
          ref={inputRef}
          value={query}
          onFocus={openPill}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(null);
            setDropdownOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
            if (e.key === "Escape") {
              setExpanded(false);
              setDropdownOpen(false);
            }
          }}
          placeholder="Where do you want to go?"
          className="min-w-0 flex-1 bg-transparent text-left text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
        />

        {(query || selected) && (
          <span
            role="button"
            tabIndex={0}
            aria-label="Clear"
            onClick={(e) => {
              e.stopPropagation();
              clearSelection();
            }}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors duration-150 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={14} />
          </span>
        )}

        <button
          type="button"
          onClick={handleSearch}
          className="ml-1 flex h-8 shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-[#155EEF] to-[#0F4FD8] px-4 text-xs font-semibold text-white shadow-[0_4px_10px_-2px_rgba(21,94,239,0.45)] transition-all duration-200 hover:shadow-[0_6px_14px_-2px_rgba(21,94,239,0.55)] active:scale-[0.97]"
        >
          Search
        </button>
      </div>

      {/* Floating panel — destinations list or selected-trip results.
          Anchored to the full-width bar's own edges so it never overhangs
          past the logo or the call button. */}
      {showPanel && (
        <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-50 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_24px_55px_-12px_rgba(15,23,42,0.28)] animate-fade-up">
          {!selected ? (
            <div className="max-h-96 overflow-y-auto p-1.5 md:grid md:max-h-[26rem] md:grid-cols-3 md:gap-x-1 md:p-2">
              <p className="sticky top-0 z-10 col-span-3 flex items-center gap-1.5 bg-white/95 px-2.5 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400 backdrop-blur-sm">
                <Sparkles size={12} className="text-amber-400" />
                Popular destinations
              </p>
              {filteredLocations.length === 0 ? (
                <button
                  type="button"
                  onClick={handleSearch}
                  className="col-span-3 flex w-full items-center justify-between gap-2 rounded-xl px-2.5 py-2.5 text-left text-sm text-slate-600 transition-colors duration-150 hover:bg-primary-light"
                >
                  <span>
                    Search &ldquo;<span className="font-medium text-slate-800">{query}</span>&rdquo; on WhatsApp
                  </span>
                  <FaWhatsapp className="shrink-0 text-[#25D366]" size={16} />
                </button>
              ) : (
                filteredLocations.map((loc) => (
                  <button
                    key={loc.slug}
                    type="button"
                    onClick={() => selectLocation(loc)}
                    className="group flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors duration-150 hover:bg-primary-light"
                  >
                    <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                      <img
                        src={loc.image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-slate-800">
                        {loc.name}
                      </span>
                      <span className="block text-xs text-slate-500">
                        ~{loc.distanceKm} km from Vizag
                      </span>
                    </span>
                    <ChevronRight
                      size={14}
                      className="shrink-0 text-slate-300 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </button>
                ))
              )}
            </div>
          ) : (
            <div className="max-h-[32rem] overflow-y-auto md:max-h-[34rem]">
              {/* Location banner */}
              <div className="relative h-28 w-full md:h-32">
                <img src={selected.image} alt={selected.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/15 to-transparent" />
                <button
                  type="button"
                  onClick={clearSelection}
                  aria-label="Change destination"
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm backdrop-blur-sm transition-colors duration-150 hover:bg-white"
                >
                  <X size={14} />
                </button>
                <div className="absolute bottom-2.5 left-3.5 right-3.5 text-white">
                  <p className="flex items-center gap-1.5 text-sm font-bold leading-tight tracking-tight md:text-base">
                    <MapPin size={13} className="shrink-0 text-amber-300" />
                    {PICKUP_CITY} <ChevronRight size={13} className="shrink-0" /> {selected.name}
                  </p>
                  <p className="text-xs text-white/80">~{selected.distanceKm} km from Vizag</p>
                </div>
              </div>

              {/* Trip type pills */}
              <div className="flex gap-1.5 overflow-x-auto px-3.5 py-3 md:px-5">
                {TRIP_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTripType(type)}
                    className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 md:text-sm ${
                      tripType === type
                        ? "border-primary bg-gradient-to-r from-primary to-primary-hover text-white shadow-[0_4px_10px_-2px_rgba(21,94,239,0.45)]"
                        : "border-slate-200 bg-white text-slate-600 hover:border-primary/30 hover:text-primary"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Fleet + pricing */}
              <div className="grid grid-cols-2 gap-2.5 px-3.5 pb-3.5 md:grid-cols-4 md:gap-3 md:px-5 md:pb-5">
                {VEHICLES.map((vehicle) => {
                  const fare = lookupFare(selected.slug, vehicle.id, tripType);
                  const message =
                    fare != null
                      ? `Hi BSH Taxi Services! I want to book a ${vehicle.name} (${tripType}) from ${PICKUP_CITY} to ${selected.name} (~${selected.distanceKm} km). Fare: ₹${fare.toLocaleString("en-IN")}. Please confirm availability.`
                      : `Hi BSH Taxi Services! I want to book a ${vehicle.name} (${tripType}) from ${PICKUP_CITY} to ${selected.name} (~${selected.distanceKm} km). Please share the pricing.`;

                  return (
                    <div
                      key={vehicle.id}
                      className="flex flex-col overflow-hidden rounded-xl border border-slate-100 transition-all duration-200 hover:border-primary/20 hover:shadow-[0_8px_18px_-8px_rgba(15,23,42,0.18)]"
                    >
                      <div className="relative h-16 w-full overflow-hidden md:h-20">
                        <img
                          src={vehicle.image ?? ""}
                          alt={vehicle.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-2 md:p-2.5">
                        <p className="truncate text-xs font-bold text-slate-800 md:text-sm">{vehicle.name}</p>
                        <div className="mt-0.5 flex items-center gap-2 text-[10px] text-slate-500 md:text-[11px]">
                          <span className="flex items-center gap-0.5">
                            <Users size={10} /> {vehicle.seats}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <Briefcase size={10} /> {vehicle.bags}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs font-extrabold text-primary md:text-sm">
                          {fare != null ? `₹${fare.toLocaleString("en-IN")}` : "Contact for pricing"}
                        </p>
                        <a
                          href={waLink(message)}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Book ${vehicle.name} on WhatsApp`}
                          className="mt-1.5 flex items-center justify-center gap-1 rounded-lg bg-[#25D366] py-1.5 text-[11px] font-semibold text-white shadow-[0_3px_8px_-2px_rgba(37,211,102,0.5)] transition-all duration-150 hover:brightness-105 active:scale-95"
                        >
                          <FaWhatsapp size={12} />
                          Book
                        </a>
                      </div>
                    </div>
                  );
                })}

                <Link
                  to="/fleet"
                  className="col-span-2 flex items-center justify-center gap-1 rounded-xl border border-dashed border-primary/30 py-2 text-xs font-semibold text-primary transition-all duration-200 hover:border-primary/60 hover:bg-primary-light md:col-span-4"
                >
                  <Sparkles size={13} />
                  View full fleet & pricing
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}