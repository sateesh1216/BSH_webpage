import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { LucideIcon } from "lucide-react";
import { Loader2, MapPin, Star } from "lucide-react";

export type PlaceSuggestion = {
  primary: string;
  secondary: string;
  fullLabel: string;
  lat: string;
  lon: string;
};

type LocationAutocompleteProps = {
  id: string;
  label: string;
  value: string;
  // Second arg is populated whenever the value came from picking a
  // suggestion (popular list or live search) — omitted for free-typed
  // text so callers know not to trust stale coordinates.
  onChange: (value: string, coords?: { lat: string; lon: string }) => void;
  placeholder: string;
  icon: LucideIcon;
  limitToVizag?: boolean;
  popularPlaces?: PlaceSuggestion[];
};

const PHOTON_ENDPOINT = "https://photon.komoot.io/api/";
const VIZAG_CENTER = { lat: 17.6868, lon: 83.2185 };

// Two different radii on purpose:
//  - SEARCH_RADIUS_KM is what we send to Photon as the bbox — generous,
//    so it doesn't quietly exclude real nearby places (Anakapalli,
//    Bheemunipatnam, Paravada, Yelamanchili, etc. all sit past a tight
//    30-35km box even though they're common pickup points).
//  - We no longer *hard-filter* results a second time on the client by
//    that box (that was the actual bug — a place Photon correctly
//    returned would still get dropped). Instead we sort by distance
//    from the city center, so close-by places surface first without
//    silently disappearing when they're a bit further out.
const SEARCH_RADIUS_KM = 65;
const DEG_LAT = SEARCH_RADIUS_KM / 111;
const DEG_LON = SEARCH_RADIUS_KM / 106;
const VIZAG_BBOX = [
  VIZAG_CENTER.lon - DEG_LON,
  VIZAG_CENTER.lat - DEG_LAT,
  VIZAG_CENTER.lon + DEG_LON,
  VIZAG_CENTER.lat + DEG_LAT,
].join(",");

const MIN_CHARS_FOR_SEARCH = 1;

export const POPULAR_PICKUP_PLACES: PlaceSuggestion[] = [
  { primary: "RTC Complex", secondary: "Visakhapatnam, Andhra Pradesh, India", fullLabel: "RTC Complex, Visakhapatnam, Andhra Pradesh, India", lat: "17.7274", lon: "83.3061" },
  { primary: "Vizag Railway Station", secondary: "Visakhapatnam, Andhra Pradesh, India", fullLabel: "Visakhapatnam Railway Station, Visakhapatnam, Andhra Pradesh, India", lat: "17.7128", lon: "83.2971" },
  { primary: "Visakhapatnam Airport", secondary: "Visakhapatnam, Andhra Pradesh, India", fullLabel: "Visakhapatnam Airport, Visakhapatnam, Andhra Pradesh, India", lat: "17.7212", lon: "83.2245" },
  { primary: "MVP Colony", secondary: "Visakhapatnam, Andhra Pradesh, India", fullLabel: "MVP Colony, Visakhapatnam, Andhra Pradesh, India", lat: "17.7326", lon: "83.3255" },
  { primary: "Madhurawada", secondary: "Visakhapatnam, Andhra Pradesh, India", fullLabel: "Madhurawada, Visakhapatnam, Andhra Pradesh, India", lat: "17.8065", lon: "83.3789" },
  { primary: "Gajuwaka", secondary: "Visakhapatnam, Andhra Pradesh, India", fullLabel: "Gajuwaka, Visakhapatnam, Andhra Pradesh, India", lat: "17.6868", lon: "83.2065" },
  { primary: "Dwaraka Nagar", secondary: "Visakhapatnam, Andhra Pradesh, India", fullLabel: "Dwaraka Nagar, Visakhapatnam, Andhra Pradesh, India", lat: "17.7266", lon: "83.3038" },
  { primary: "Rushikonda", secondary: "Visakhapatnam, Andhra Pradesh, India", fullLabel: "Rushikonda, Visakhapatnam, Andhra Pradesh, India", lat: "17.7810", lon: "83.3811" },
  { primary: "Pendurthi", secondary: "Visakhapatnam, Andhra Pradesh, India", fullLabel: "Pendurthi, Visakhapatnam, Andhra Pradesh, India", lat: "17.8228", lon: "83.2415" },
  { primary: "Simhachalam", secondary: "Visakhapatnam, Andhra Pradesh, India", fullLabel: "Simhachalam, Visakhapatnam, Andhra Pradesh, India", lat: "17.7642", lon: "83.2569" },
  { primary: "Beach Road", secondary: "Visakhapatnam, Andhra Pradesh, India", fullLabel: "Beach Road, Visakhapatnam, Andhra Pradesh, India", lat: "17.7112", lon: "83.3247" },
  { primary: "Steel Plant", secondary: "Visakhapatnam, Andhra Pradesh, India", fullLabel: "Visakhapatnam Steel Plant, Visakhapatnam, Andhra Pradesh, India", lat: "17.6300", lon: "83.1930" },
  { primary: "Anakapalli", secondary: "Visakhapatnam District, Andhra Pradesh, India", fullLabel: "Anakapalli, Visakhapatnam District, Andhra Pradesh, India", lat: "17.6910", lon: "83.0037" },
  { primary: "Bheemunipatnam", secondary: "Visakhapatnam, Andhra Pradesh, India", fullLabel: "Bheemunipatnam, Visakhapatnam, Andhra Pradesh, India", lat: "17.8905", lon: "83.4514" },
];

export const POPULAR_DROP_PLACES: PlaceSuggestion[] = [
  { primary: "Hyderabad", secondary: "Telangana, India", fullLabel: "Hyderabad, Telangana, India", lat: "17.3850", lon: "78.4867" },
  { primary: "Vijayawada", secondary: "Andhra Pradesh, India", fullLabel: "Vijayawada, Andhra Pradesh, India", lat: "16.5062", lon: "80.6480" },
  { primary: "Bengaluru", secondary: "Karnataka, India", fullLabel: "Bengaluru, Karnataka, India", lat: "12.9716", lon: "77.5946" },
  { primary: "Chennai", secondary: "Tamil Nadu, India", fullLabel: "Chennai, Tamil Nadu, India", lat: "13.0827", lon: "80.2707" },
  { primary: "Araku Valley", secondary: "Andhra Pradesh, India", fullLabel: "Araku Valley, Andhra Pradesh, India", lat: "18.3273", lon: "82.8770" },
  { primary: "Srikakulam", secondary: "Andhra Pradesh, India", fullLabel: "Srikakulam, Andhra Pradesh, India", lat: "18.2949", lon: "83.8938" },
  { primary: "Rajahmundry", secondary: "Andhra Pradesh, India", fullLabel: "Rajahmundry, Andhra Pradesh, India", lat: "17.0005", lon: "81.8040" },
  { primary: "Bhubaneswar", secondary: "Odisha, India", fullLabel: "Bhubaneswar, Odisha, India", lat: "20.2961", lon: "85.8245" },
];

type PhotonFeature = {
  geometry: { coordinates: [number, number] };
  properties: {
    name?: string;
    street?: string;
    housenumber?: string;
    district?: string;
    city?: string;
    county?: string;
    state?: string;
    country?: string;
    postcode?: string;
  };
};

function photonFeatureToSuggestion(feature: PhotonFeature): PlaceSuggestion {
  const p = feature.properties;
  const [lon, lat] = feature.geometry.coordinates;

  const primary =
    p.name ||
    [p.housenumber, p.street].filter(Boolean).join(" ") ||
    p.street ||
    p.city ||
    "Unnamed location";

  const secondaryParts = [
    p.street && p.name && p.street !== primary ? p.street : null,
    p.district,
    p.city,
    p.state,
    p.country,
  ].filter(Boolean);

  const secondary = Array.from(new Set(secondaryParts)).join(", ");
  const fullLabel = [primary, secondary].filter(Boolean).join(", ");

  return { primary, secondary, fullLabel, lat: String(lat), lon: String(lon) };
}

function matchesQuery(place: PlaceSuggestion, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = `${place.primary} ${place.secondary}`.toLowerCase();
  return haystack.split(/[\s,]+/).some((word) => word.startsWith(q)) || haystack.startsWith(q);
}

// Rough distance in km between two lat/lon points (haversine).
function distanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

type Coords = { top: number; left: number; width: number };

export default function LocationAutocomplete({
  id,
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
  limitToVizag = false,
  popularPlaces,
}: LocationAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [coords, setCoords] = useState<Coords | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const skipNextFetchRef = useRef(false);
  const requestIdRef = useRef(0);
  // Only real DOM events (focus, typing) set this to true. The search
  // effect below refuses to touch `isOpen` until this is true, so no
  // amount of effect re-invocation (StrictMode double-mount, prop churn,
  // parent re-renders, etc.) can pop the dropdown open on its own.
  const hasInteractedRef = useRef(false);

  const trimmedValue = value.trim();

  const localMatches = popularPlaces?.length
    ? popularPlaces.filter((place) => matchesQuery(place, trimmedValue)).slice(0, 6)
    : [];

  const showingLocalOnly = trimmedValue.length < MIN_CHARS_FOR_SEARCH && localMatches.length > 0;

  const mergedSuggestions = (() => {
    if (showingLocalOnly) return localMatches;
    const seen = new Set(localMatches.map((p) => p.fullLabel));
    const apiOnly = suggestions.filter((p) => !seen.has(p.fullLabel));
    return [...localMatches, ...apiOnly];
  })();

  // Recompute the dropdown's fixed-position coordinates from the input
  // wrapper's real position on screen — this is what lets the portal
  // render it above *everything*, regardless of parent overflow/z-index.
  const updateCoords = () => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    setCoords({ top: rect.bottom + 6, left: rect.left, width: rect.width });
  };

  useLayoutEffect(() => {
    if (!isOpen) return;
    updateCoords();
    const handle = () => updateCoords();
    window.addEventListener("scroll", handle, true);
    window.addEventListener("resize", handle);
    return () => {
      window.removeEventListener("scroll", handle, true);
      window.removeEventListener("resize", handle);
    };
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const insideWrapper = wrapperRef.current?.contains(target);
      const insideDropdown = dropdownRef.current?.contains(target);
      if (!insideWrapper && !insideDropdown) setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Never let this effect open the dropdown on its own — only after the
    // user has actually focused or typed into the field. This also covers
    // the empty-value branch below, which would otherwise auto-open the
    // "popular places" list for a field that starts out blank (e.g. Drop).
    if (!hasInteractedRef.current) return;

    if (skipNextFetchRef.current) {
      skipNextFetchRef.current = false;
      return;
    }

    if (trimmedValue.length < MIN_CHARS_FOR_SEARCH) {
      setSuggestions([]);
      setHasSearched(false);
      setIsOpen(!!popularPlaces?.length);
      return;
    }

    setIsOpen(true);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      const thisRequestId = ++requestIdRef.current;
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          q: value,
          lang: "en",
          limit: "10",
          lat: String(VIZAG_CENTER.lat),
          lon: String(VIZAG_CENTER.lon),
        });

        if (limitToVizag) {
          params.set("bbox", VIZAG_BBOX);
        }

        const response = await fetch(`${PHOTON_ENDPOINT}?${params.toString()}`);
        if (!response.ok) throw new Error("Search failed");
        const data: { features: PhotonFeature[] } = await response.json();

        if (thisRequestId !== requestIdRef.current) return;

        let results = data.features.map(photonFeatureToSuggestion);

        // Don't hard-exclude results here — Photon's bbox param already
        // scoped the search. Re-filtering client-side with the same box
        // was dropping legitimate places that Photon correctly returned
        // near the edge. Instead, just bring the closest-to-center
        // results to the top so relevant local places surface first.
        if (limitToVizag) {
          results = results
            .map((s) => ({
              s,
              d: distanceKm(VIZAG_CENTER.lat, VIZAG_CENTER.lon, parseFloat(s.lat), parseFloat(s.lon)),
            }))
            .sort((a, b) => a.d - b.d)
            .map(({ s }) => s);
        }

        setSuggestions(results);
        setIsOpen(true);
        setHasSearched(true);
        setHighlightIndex(-1);
      } catch {
        if (thisRequestId === requestIdRef.current) {
          setSuggestions([]);
          setHasSearched(true);
        }
      } finally {
        if (thisRequestId === requestIdRef.current) setIsLoading(false);
      }
    }, 200);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value, trimmedValue, limitToVizag, popularPlaces]);

  function selectSuggestion(suggestion: PlaceSuggestion) {
    skipNextFetchRef.current = true;
    // Pass the coordinates along so the caller (BookingWizard) can hand
    // them straight to the map instead of re-geocoding this same text.
    onChange(suggestion.fullLabel, { lat: suggestion.lat, lon: suggestion.lon });
    setSuggestions([]);
    setIsOpen(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || mergedSuggestions.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % mergedSuggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightIndex((prev) => (prev - 1 + mergedSuggestions.length) % mergedSuggestions.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (highlightIndex >= 0) selectSuggestion(mergedSuggestions[highlightIndex]);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  const showEmptyState =
    isOpen &&
    !isLoading &&
    hasSearched &&
    !showingLocalOnly &&
    mergedSuggestions.length === 0;

  const dropdownVisible = isOpen && coords && (mergedSuggestions.length > 0 || showEmptyState);

  return (
    <div className="relative" ref={wrapperRef}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 transition-colors focus-within:border-primary">
        <Icon size={18} className="shrink-0 text-primary" />
        <input
          id={id}
          value={value}
          onChange={(event) => {
            hasInteractedRef.current = true;
            // Free typing has no known coordinate — the caller should
            // treat this as invalidating any previously selected point.
            onChange(event.target.value);
          }}
          onFocus={() => {
            hasInteractedRef.current = true;
            updateCoords();
            if (mergedSuggestions.length > 0 || popularPlaces?.length) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full text-sm text-slate-800 outline-none placeholder:text-slate-400"
        />
        {isLoading && <Loader2 size={16} className="shrink-0 animate-spin text-slate-400" />}
      </div>

      {dropdownVisible &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "fixed",
              top: coords!.top,
              left: coords!.left,
              width: coords!.width,
              zIndex: 9999,
            }}
            className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl"
          >
            {(showingLocalOnly || (localMatches.length > 0 && trimmedValue.length >= MIN_CHARS_FOR_SEARCH)) && (
              <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-3.5 py-1.5 text-[11px] font-medium text-slate-500">
                <Star size={12} className="text-primary" />
                {limitToVizag ? "Popular Vizag pickup points" : "Popular destinations"}
              </div>
            )}

            {mergedSuggestions.length > 0 ? (
              <ul className="max-h-72 overflow-y-auto py-1">
                {mergedSuggestions.map((suggestion, index) => (
                  <li key={`${suggestion.lat}-${suggestion.lon}-${suggestion.primary}`}>
                    <button
                      type="button"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => selectSuggestion(suggestion)}
                      onMouseEnter={() => setHighlightIndex(index)}
                      className={`flex w-full items-start gap-2.5 px-3.5 py-2.5 text-left transition-colors ${
                        index === highlightIndex ? "bg-primary/5" : "hover:bg-slate-50"
                      }`}
                    >
                      <MapPin
                        size={16}
                        className={`mt-0.5 shrink-0 ${
                          index === highlightIndex ? "text-primary" : "text-slate-400"
                        }`}
                      />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium text-slate-800">
                          {suggestion.primary}
                        </span>
                        {suggestion.secondary && (
                          <span className="block truncate text-xs text-slate-500">
                            {suggestion.secondary}
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-3.5 py-3 text-sm text-slate-500">
                {limitToVizag
                  ? `No locations found near Visakhapatnam. Try a nearby landmark or area name.`
                  : "No locations found. Try a different city or landmark name."}
              </p>
            )}

            <div className="border-t border-slate-100 bg-slate-50 px-3.5 py-1.5 text-right text-[11px] text-slate-400">
              Powered by Photon (OpenStreetMap)
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}