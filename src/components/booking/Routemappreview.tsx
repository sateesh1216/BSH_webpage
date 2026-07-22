import { useCallback, useEffect, useRef, useState } from "react";
import { Navigation, Clock, MapPin, AlertCircle, Plus, Minus, Maximize2, RefreshCw } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { formatDuration } from "../../data/Bookingconfig";

/**
 * NOTE ON DEPENDENCIES
 * --------------------
 * This component renders a real, interactive map. It needs:
 *
 *   npm install leaflet
 *   npm install -D @types/leaflet
 *
 * It uses free, keyless services so it works out of the box:
 *   - Tiles:     OpenStreetMap
 *   - Geocoding: Photon (openstreetmap-based, komoot.io) — used only as a
 *                fallback for free-typed pickup/drop text. When the text
 *                came from LocationAutocomplete's suggestion list, the
 *                caller already has coordinates and passes them straight
 *                in via `pickupCoords` / `dropCoords`, so no geocode call
 *                happens at all for the common case.
 *   - Routing:   OSRM public demo server
 *
 * These public services are rate-limited and meant for light/demo use.
 * Photon is noticeably more forgiving than Nominatim (which enforces a
 * hard 1 request/second cap and routinely 403s on anything faster), and
 * since coordinates are usually supplied directly now, geocode traffic
 * here is already much lower than before. Sequential calls, retry with
 * backoff, and a results cache are all still kept as a safety net for
 * whatever free-typed traffic remains.
 *
 * For production traffic at scale, swap `geocode()` / the OSRM fetch
 * below for a paid provider (Google, Mapbox, HERE, etc.) — the
 * component's public API (props + onRouteComputed) stays the same.
 */

interface GeocodedPoint {
  lat: number;
  lon: number;
}

interface RouteMapPreviewProps {
  pickupLabel: string;
  dropLabel: string;
  /** Known coordinates for pickup/drop, if the caller already has them
   *  (e.g. user picked a suggestion from LocationAutocomplete). When
   *  present, geocoding is skipped entirely for that point. */
  pickupCoords?: GeocodedPoint | null;
  dropCoords?: GeocodedPoint | null;
  /** Called with the real, routed distance/time once the map resolves it. */
  onRouteComputed?: (info: { distanceKm: number; minutes: number }) => void;
}

type Status = "idle" | "loading" | "ready" | "error";

const PHOTON_URL = "https://photon.komoot.io/api/";
const OSRM_URL = "https://router.project-osrm.org/route/v1/driving";
const DEFAULT_CENTER: [number, number] = [17.686, 83.2185]; // Visakhapatnam

// Photon's usage policy is far more relaxed than Nominatim's, but this
// still only fires for free-typed text (coords-known cases skip it
// entirely), so a small courtesy gap is enough — no more forced 1.1s
// stalls per lookup.
const GEOCODE_MIN_GAP_MS = 350;
let lastGeocodeCallAt = 0;

// Cache geocode results for the lifetime of the tab so navigating back
// and forth between wizard steps doesn't re-hit the API for the same text.
const geocodeCache = new Map<string, GeocodedPoint | null>();

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function respectRateLimit() {
  const elapsed = Date.now() - lastGeocodeCallAt;
  if (elapsed < GEOCODE_MIN_GAP_MS) {
    await wait(GEOCODE_MIN_GAP_MS - elapsed);
  }
  lastGeocodeCallAt = Date.now();
}

/** Generic fetch with retry + exponential backoff for transient failures. */
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  { retries = 2, baseDelayMs = 500 }: { retries?: number; baseDelayMs?: number } = {}
): Promise<Response> {
  let lastErr: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, options);
      // 429 (rate limited) / 5xx are worth retrying; other errors are not.
      if (res.ok) return res;
      if (res.status === 429 || res.status >= 500) {
        lastErr = new Error(`HTTP ${res.status}`);
      } else {
        return res; // e.g. 400 — retrying won't help
      }
    } catch (err) {
      lastErr = err;
      if ((err as { name?: string })?.name === "AbortError") throw err;
    }
    if (attempt < retries) {
      await wait(baseDelayMs * 2 ** attempt);
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error("Request failed");
}

async function geocode(query: string, signal: AbortSignal): Promise<GeocodedPoint | null> {
  const cacheKey = query.trim().toLowerCase();
  if (geocodeCache.has(cacheKey)) return geocodeCache.get(cacheKey) ?? null;

  await respectRateLimit();

  const params = new URLSearchParams({
    q: query,
    limit: "1",
    lat: String(DEFAULT_CENTER[0]),
    lon: String(DEFAULT_CENTER[1]),
  });

  const res = await fetchWithRetry(`${PHOTON_URL}?${params.toString()}`, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    geocodeCache.set(cacheKey, null);
    return null;
  }
  const data = await res.json();
  const feature = data?.features?.[0];
  const point = feature
    ? { lat: feature.geometry.coordinates[1], lon: feature.geometry.coordinates[0] }
    : null;
  geocodeCache.set(cacheKey, point);
  return point;
}

function pinIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="width:16px;height:16px;border-radius:9999px;background:${color};border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.35)"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

function shortLabel(label: string) {
  return label.split(",")[0].trim();
}

export default function RouteMapPreview({
  pickupLabel,
  dropLabel,
  pickupCoords,
  dropCoords,
  onRouteComputed,
}: RouteMapPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const routeLineRef = useRef<L.Polyline | null>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [distanceKm, setDistanceKm] = useState(0);
  const [minutes, setMinutes] = useState(0);
  // Bumping this forces the resolve effect to re-run even if pickup/drop
  // text hasn't changed — used by the manual "Retry" button.
  const [retryTick, setRetryTick] = useState(0);

  // Initialize the map exactly once.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      zoomControl: false,
      attributionControl: true,
    }).setView(DEFAULT_CENTER, 7);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    // Some parent layouts (e.g. this preview sitting in a flex/grid cell
    // that changes size once siblings render) can leave Leaflet with a
    // stale container size, which shows as a partially grey/broken map.
    // A couple of delayed invalidateSize() calls fix that cheaply.
    const t1 = setTimeout(() => map.invalidateSize(), 150);
    const t2 = setTimeout(() => map.invalidateSize(), 500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const zoomIn = useCallback(() => mapRef.current?.zoomIn(), []);
  const zoomOut = useCallback(() => mapRef.current?.zoomOut(), []);
  const resetView = useCallback(() => {
    const line = routeLineRef.current;
    if (line && mapRef.current) {
      mapRef.current.fitBounds(line.getBounds(), { padding: [24, 24] });
    }
  }, []);

  // Resolve pickup/drop to coordinates (reusing known coords when
  // possible, geocoding only what's missing), fetch a real route, draw
  // it. Retries transient failures automatically.
  useEffect(() => {
    const pickup = pickupLabel.trim();
    const drop = dropLabel.trim();

    if (pickup.length < 3 || drop.length < 3) {
      setStatus("idle");
      layerRef.current?.clearLayers();
      routeLineRef.current = null;
      setDistanceKm(0);
      setMinutes(0);
      return;
    }

    const controller = new AbortController();
    const debounce = setTimeout(async () => {
      setStatus("loading");
      try {
        // Reuse coordinates the caller already resolved (e.g. the user
        // picked a suggestion from LocationAutocomplete) instead of
        // re-geocoding. Only fall back to a live lookup for free-typed
        // text, and even then do it sequentially — some geocoders
        // throttle/block parallel requests from the same client.
        const from = pickupCoords ?? (await geocode(`${pickup}, Andhra Pradesh, India`, controller.signal));
        const to = dropCoords ?? (await geocode(`${drop}, India`, controller.signal));

        if (!from || !to) {
          setStatus("error");
          return;
        }

        const routeRes = await fetchWithRetry(
          `${OSRM_URL}/${from.lon},${from.lat};${to.lon},${to.lat}?overview=full&geometries=geojson`,
          { signal: controller.signal }
        );
        const routeData = await routeRes.json();
        const route = routeData?.routes?.[0];

        if (!route) {
          setStatus("error");
          return;
        }

        const km = Math.round((route.distance / 1000) * 10) / 10;
        const mins = Math.round(route.duration / 60);
        setDistanceKm(km);
        setMinutes(mins);
        onRouteComputed?.({ distanceKm: km, minutes: mins });

        const map = mapRef.current;
        const layer = layerRef.current;
        if (map && layer) {
          layer.clearLayers();
          map.invalidateSize();

          const coords: [number, number][] = route.geometry.coordinates.map(
            ([lon, lat]: [number, number]) => [lat, lon]
          );
          const line = L.polyline(coords, { color: "#2563eb", weight: 4 }).addTo(layer);
          routeLineRef.current = line;

          L.marker([from.lat, from.lon], { icon: pinIcon("#10b981") })
            .bindTooltip(shortLabel(pickupLabel), {
              permanent: true,
              direction: "top",
              className: "route-pin-label",
            })
            .addTo(layer);

          L.marker([to.lat, to.lon], { icon: pinIcon("#ef4444") })
            .bindTooltip(shortLabel(dropLabel), {
              permanent: true,
              direction: "top",
              className: "route-pin-label",
            })
            .addTo(layer);

          map.fitBounds(line.getBounds(), { padding: [24, 24] });
        }

        setStatus("ready");
      } catch (err: unknown) {
        if ((err as { name?: string })?.name !== "AbortError") setStatus("error");
      }
    }, 700);

    return () => {
      clearTimeout(debounce);
      controller.abort();
    };
  }, [pickupLabel, dropLabel, pickupCoords, dropCoords, onRouteComputed, retryTick]);

  const hasRoute = status === "ready" && distanceKm > 0;

  return (
    <div className="relative h-56 w-full overflow-hidden rounded-xl border border-slate-100 md:h-full md:min-h-60">
      <style>{`
        .route-pin-label {
          background: white;
          border: none;
          border-radius: 6px;
          box-shadow: 0 1px 4px rgba(15, 23, 42, 0.12);
          padding: 2px 6px;
          font-size: 11px;
          font-weight: 600;
          color: #334155;
        }
        .route-pin-label::before { display: none; }
        .leaflet-container { font-family: inherit; }
      `}</style>

      <div ref={containerRef} className="h-full w-full" />

      {status === "idle" && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-slate-50/95 text-slate-400">
          <MapPin size={22} />
          <p className="text-xs">Enter pickup &amp; drop to preview the route</p>
        </div>
      )}

      {status === "loading" && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-white/70 text-slate-400">
          <Navigation size={18} className="animate-pulse" />
          <p className="text-xs">Finding the best route…</p>
        </div>
      )}

      {status === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/90 px-4 text-center text-slate-400">
          <AlertCircle size={18} />
          <p className="text-xs">Couldn't find that route. Check the location names.</p>
          <button
            type="button"
            onClick={() => setRetryTick((t) => t + 1)}
            className="pointer-events-auto flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-[11px] font-semibold text-slate-600 hover:border-primary/40 hover:text-primary"
          >
            <RefreshCw size={12} /> Retry
          </button>
        </div>
      )}

      {hasRoute && (
        <div className="absolute left-2 top-2 flex items-center gap-3 rounded-lg bg-white px-3 py-1.5 shadow-sm">
          <div className="flex items-center gap-1 text-xs text-slate-700">
            <Navigation size={13} className="text-primary" />
            <div>
              <p className="font-semibold leading-none">{distanceKm} km</p>
              <p className="text-[10px] text-slate-400">Distance</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-700">
            <Clock size={13} className="text-primary" />
            <div>
              <p className="font-semibold leading-none">{formatDuration(minutes)}</p>
              <p className="text-[10px] text-slate-400">Est. Time</p>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-2 right-2 z-400 flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <button
          type="button"
          onClick={zoomIn}
          aria-label="Zoom in"
          className="flex h-7 w-7 items-center justify-center text-slate-500 hover:bg-slate-50"
        >
          <Plus size={12} />
        </button>
        <div className="h-px bg-slate-200" />
        <button
          type="button"
          onClick={zoomOut}
          aria-label="Zoom out"
          className="flex h-7 w-7 items-center justify-center text-slate-500 hover:bg-slate-50"
        >
          <Minus size={12} />
        </button>
        <div className="h-px bg-slate-200" />
        <button
          type="button"
          onClick={resetView}
          aria-label="Reset view to full route"
          className="flex h-7 w-7 items-center justify-center text-slate-500 hover:bg-slate-50"
        >
          <Maximize2 size={12} />
        </button>
      </div>
    </div>
  );
}