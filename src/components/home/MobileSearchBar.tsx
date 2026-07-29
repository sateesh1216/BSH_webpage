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

import { destinations } from "../../data/destinationsData";
import { VEHICLES, SUPPORT_PHONE } from "../../data/bookingConfig";
import { FIXED_PRICES } from "../../data/fixedPrices";

/* ---------------------------------------------------------------------- */
/*  Default / popular locations — pulled straight from destinationsData    */
/*  so the images, names and distances stay in sync with the rest of the   */
/*  site. Add/remove slugs here to change what shows in the dropdown.       */
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

/** Looks up the hand-set price for this destination + vehicle + trip type
 *  from FIXED_PRICES (src/data/fixedPrices.ts) — no distance/km math here.
 *  "Hourly" and "Package" always show "Contact for pricing" since they
 *  aren't in the fixed matrix. */
function lookupFare(
  destinationSlug: string,
  vehicleId: string,
  tripType: TripTypeKey
): number | null {
  const vehiclePrices = FIXED_PRICES[destinationSlug]?.[vehicleId];
  if (!vehiclePrices) return null;
  if (tripType === "One Way") return vehiclePrices.oneWay ?? null;
  if (tripType === "Round Trip") return vehiclePrices.roundTrip ?? null;
  return null; // Hourly / Package — always "contact for pricing"
}

export default function MobileSearchBar() {
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState<PopularLocation | null>(null);
  const [tripType, setTripType] = useState<TripTypeKey>("One Way");
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Close the dropdown when tapping outside the card.
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

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
  }

  /** Enter key or the search icon: match against the popular list first;
   *  anything that doesn't match goes straight to WhatsApp — never to
   *  Google Maps or any other map service. */
  function handleSearch() {
    const trimmed = query.trim();
    if (!trimmed) {
      setDropdownOpen(true);
      return;
    }

    const match = POPULAR_LOCATIONS.find((loc) => loc.name.toLowerCase().includes(trimmed.toLowerCase()));

    if (match) {
      selectLocation(match);
      return;
    }

    // Custom / typed-in location that isn't one of our defaults — send it
    // straight to WhatsApp so a real person can quote it, instead of
    // opening any map.
    const message = `Hi BSH Taxi Services! I'd like to book a taxi from ${PICKUP_CITY} to "${trimmed}". Please share the fare and available cars.`;
    window.open(waLink(message), "_blank", "noopener,noreferrer");
  }

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Search card */}
      <div className="rounded-2xl border border-slate-100 bg-white p-3 shadow-premium md:p-4">
        <div className="flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-primary/50 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/15 md:py-3">
            <MapPin size={18} className="shrink-0 text-primary" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelected(null);
                setDropdownOpen(true);
              }}
              onFocus={() => setDropdownOpen(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              placeholder="Where do you want to go?"
              className="w-full bg-transparent text-[16px] text-slate-800 placeholder:text-slate-400 focus:outline-none md:text-sm"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear"
                onClick={clearSelection}
                className="shrink-0 text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={handleSearch}
            aria-label="Search"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-sm transition-colors hover:bg-primary-hover active:scale-95 md:h-12 md:w-12"
          >
            <Search size={19} />
          </button>
        </div>

        {/* Default-locations dropdown */}
        {dropdownOpen && !selected && (
          <div className="mt-2 max-h-96 overflow-y-auto rounded-xl border border-slate-100 sm:border-none">
            <p className="sticky top-0 z-10 bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Popular destinations
            </p>
            {filteredLocations.length === 0 ? (
              <button
                type="button"
                onClick={handleSearch}
                className="flex w-full items-center justify-between gap-2 px-3 py-3 text-left text-sm text-slate-600 hover:bg-primary-light sm:rounded-xl sm:border sm:border-slate-100"
              >
                <span>
                  Search &ldquo;<span className="font-medium text-slate-800">{query}</span>&rdquo; on WhatsApp
                </span>
                <FaWhatsapp className="shrink-0 text-[#25D366]" size={18} />
              </button>
            ) : (
              <div className="sm:grid sm:grid-cols-2 sm:gap-2 sm:px-1 sm:pb-1 lg:grid-cols-3">
                {filteredLocations.map((loc) => (
                  <button
                    key={loc.slug}
                    type="button"
                    onClick={() => selectLocation(loc)}
                    className="flex w-full items-center gap-3 border-t border-slate-50 px-3 py-2.5 text-left first:border-t-0 hover:bg-primary-light sm:rounded-xl sm:border sm:border-slate-100 sm:hover:border-primary/30 sm:hover:bg-primary-light"
                  >
                    <img
                      src={loc.image}
                      alt=""
                      className="h-11 w-11 shrink-0 rounded-lg object-cover"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-slate-800">{loc.name}</span>
                      <span className="block text-xs text-slate-500">~{loc.distanceKm} km from Vizag</span>
                    </span>
                    <ChevronRight size={16} className="shrink-0 text-slate-300 sm:hidden" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Results panel — trip type + fleet & pricing for the selected location */}
      {selected && (
        <div className="mt-3 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-premium animate-fade-up">
          {/* Location banner */}
          <div className="relative h-28 w-full md:h-36">
            <img src={selected.image} alt={selected.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />
            <button
              type="button"
              onClick={clearSelection}
              aria-label="Change destination"
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm"
            >
              <X size={16} />
            </button>
            <div className="absolute bottom-2 left-3 right-3 text-white md:bottom-3 md:left-4 md:right-4">
              <p className="text-sm font-bold leading-tight md:text-base">{PICKUP_CITY} → {selected.name}</p>
              <p className="text-xs text-white/85">~{selected.distanceKm} km</p>
            </div>
          </div>

          {/* Trip type pills */}
          <div className="flex gap-2 overflow-x-auto px-3 py-3 md:justify-center md:px-4">
            {TRIP_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setTripType(type)}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors md:px-5 md:py-2 md:text-sm ${
                  tripType === type
                    ? "border-primary bg-primary text-white"
                    : "border-slate-200 bg-white text-slate-600"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Fleet + pricing */}
          <div className="grid grid-cols-2 gap-2 px-3 pb-3 md:grid-cols-3 md:gap-3 md:px-4 md:pb-4 lg:grid-cols-4">
            {VEHICLES.map((vehicle) => {
              const fare = lookupFare(selected.slug, vehicle.id, tripType);
              const message =
                fare != null
                  ? `Hi BSH Taxi Services! I want to book a ${vehicle.name} (${tripType}) from ${PICKUP_CITY} to ${selected.name} (~${selected.distanceKm} km). Fare: ₹${fare}. Please confirm availability.`
                  : `Hi BSH Taxi Services! I want to book a ${vehicle.name} (${tripType}) from ${PICKUP_CITY} to ${selected.name} (~${selected.distanceKm} km). Please share the pricing.`;

              return (
                <div
                  key={vehicle.id}
                  className="flex flex-col overflow-hidden rounded-xl border border-slate-100"
                >
                  <img
                    src={vehicle.image ?? ""}
                    alt={vehicle.name}
                    className="h-20 w-full object-cover md:h-24"
                  />
                  <div className="flex flex-1 flex-col p-2.5">
                    <p className="truncate text-sm font-bold text-slate-800">{vehicle.name}</p>
                    <div className="mt-0.5 flex items-center gap-2.5 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Users size={12} /> {vehicle.seats}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase size={12} /> {vehicle.bags} bags
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-extrabold text-primary">
                      {fare != null ? `₹${fare.toLocaleString("en-IN")}` : "Contact for pricing"}
                    </p>

                    <a
                      href={waLink(message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Book ${vehicle.name} on WhatsApp`}
                      className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-[#25D366] py-2 text-xs font-semibold text-white shadow-sm active:scale-95"
                    >
                      <FaWhatsapp size={14} />
                      Book
                    </a>
                  </div>
                </div>
              );
            })}

            <Link
              to="/fleet"
              className="col-span-2 flex items-center justify-center gap-1 rounded-xl border border-dashed border-primary/30 py-2.5 text-xs font-semibold text-primary md:col-span-3 lg:col-span-4"
            >
              <Sparkles size={14} />
              View full fleet & pricing
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
