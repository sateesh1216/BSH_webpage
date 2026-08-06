import { useParams, Link, Navigate, useLocation } from "react-router-dom";
import {
  MapPin,
  IndianRupee,

  Sparkle,
  ArrowRight,
  Clock,
  Navigation,
  Quote,
  Building2,
  Landmark,
  Briefcase,
  Factory,
  CalendarCheck,
  Phone,
  Car,
  CarFront,
  Bus,
  Gem,
  Users,
  Luggage,
  MessageCircle,
} from "lucide-react";
import {
  outstations,
  vehicleOptions,
  type VehicleOption,
} from "../data/Outstationtaxidata";
import { getOutstationFare, type VehicleSlug } from "../data/Outstationprices";
import { useBooking } from "../components/booking/BookingContext";
import SEO from "../components/seo/SEO";
import { pageMeta } from "../data/pageMeta";

// Independent theme map — no relation to Destination categories
type OutstationCategory = "City" | "Pilgrimage" | "Business Hub" | "Industrial City";

const CATEGORY_THEME: Record<
  OutstationCategory,
  {
    accent: string;
    accentSoft: string;
    accentText: string;
    hoverBg: string;
    ring: string;
    Icon: typeof Building2;
    label: string;
  }
> = {
  City: {
    accent: "bg-[#2F5C82]",
    accentSoft: "bg-[#2F5C82]/10",
    accentText: "text-[#2F5C82]",
    hoverBg: "hover:bg-[#2F5C82]",
    ring: "ring-[#2F5C82]/25",
    Icon: Building2,
    label: "City",
  },
  Pilgrimage: {
    accent: "bg-[#A8472B]",
    accentSoft: "bg-[#A8472B]/10",
    accentText: "text-[#A8472B]",
    hoverBg: "hover:bg-[#A8472B]",
    ring: "ring-[#A8472B]/25",
    Icon: Landmark,
    label: "Pilgrimage",
  },
  "Business Hub": {
    accent: "bg-[#3D6B3F]",
    accentSoft: "bg-[#3D6B3F]/10",
    accentText: "text-[#3D6B3F]",
    hoverBg: "hover:bg-[#3D6B3F]",
    ring: "ring-[#3D6B3F]/25",
    Icon: Briefcase,
    label: "Business Hub",
  },
  "Industrial City": {
    accent: "bg-[#7A6A4F]",
    accentSoft: "bg-[#7A6A4F]/10",
    accentText: "text-[#7A6A4F]",
    hoverBg: "hover:bg-[#7A6A4F]",
    ring: "ring-[#7A6A4F]/25",
    Icon: Factory,
    label: "Industrial City",
  },
};

// Vehicle category → icon, kept independent from destination theming.
// Each tier gets its own mark so the ride lineup reads as a real hierarchy, not four repeats.
const VEHICLE_ICON: Record<VehicleOption["category"], typeof Car> = {
  Sedan: Car,
  MUV: CarFront,
  "Premium SUV": Gem,
  "Group Travel": Bus,
};

const CONTACT_PHONE = "+918886803322";
const CONTACT_PHONE_DISPLAY = "+91 8886803322";

function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function OutstationDetail() {
  const { slug } = useParams<{ slug?: string }>();

  // No slug = listing page
  if (!slug) {
    return <Navigate to="/services/outstation-taxi" replace />;
  }

  const outstation = outstations.find((o) => o.slug === slug);

  if (!outstation) {
    return <Navigate to="/services/outstation-taxi" replace />;
  }

  const { openBooking } = useBooking();
  const { pathname } = useLocation();
  const meta = pageMeta[pathname];

  const {
    name,
    distanceFromVizag,
    driveTime,
    description,
    tagline,
    costPerDay,

    places,
    history,
    highlights,
    quickFacts,
    bestTimeToVisit,
    howToReach,
    funFact,
    sources,
  } = outstation;

  const distanceKm = outstation.distanceKm ?? 0;
  const category: keyof typeof CATEGORY_THEME =
    (outstation.category as keyof typeof CATEGORY_THEME) ?? "City";
  const theme = CATEGORY_THEME[category];
  const routeFill = Math.min(100, Math.round((distanceKm / 450) * 100));

  const otherOutstations = outstations
    .filter((o) => o.slug !== outstation.slug)
    .slice(0, 4);

  const waMessage = encodeURIComponent(
    `Hi BSH Taxi Services, I'd like to book a Vizag to ${name} outstation taxi.`
  );

  return (
    <>
      <SEO
        title={meta?.title ?? `${name} Taxi from Vizag | BSH Taxi Services`}
        description={meta?.description}
        keywords={meta?.keywords}
        canonicalPath={pathname}
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&family=Public+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Public Sans', sans-serif; }
        .font-mono-route { font-family: 'IBM Plex Mono', monospace; }
        .route-dash { background-image: repeating-linear-gradient(to right, currentColor 0 10px, transparent 10px 18px); }
        .drop-cap::first-letter { font-family: 'Fraunces', serif; font-weight: 600; font-size: 3.5rem; line-height: 0.85; float: left; padding-right: 0.35rem; padding-top: 0.2rem; }
        .lift-on-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .lift-on-hover:hover { transform: translateY(-3px); box-shadow: 0 12px 24px -12px rgba(0,0,0,0.18); }
        .book-btn { transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease; }
        .book-btn:hover { transform: translateY(-1px); filter: brightness(1.08); box-shadow: 0 10px 20px -8px rgba(0,0,0,0.35); }
        .book-btn:active { transform: translateY(0); }
        .eyebrow { letter-spacing: 0.22em; }
        .section-heading { font-family: 'Fraunces', serif; }
        .price-card { transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; }
        .price-card:hover { transform: translateY(-4px); }
        :focus-visible { outline: 2px solid rgba(27,27,22,0.45); outline-offset: 3px; border-radius: 4px; }
      `}</style>

      <div className="font-body bg-[#F6F1E4] text-[#1B1B16]">
        {/* Hero — content-driven, no image (DestinationsHero style) */}
        <section className="relative mt-8 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 sm:py-28">
          {/* Background blur blobs — tinted with the category accent */}
          <div className={`absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full ${theme.accent} opacity-10 blur-[120px]`} />
          <div className={`absolute bottom-0 right-0 h-72 w-72 rounded-full ${theme.accent} opacity-10 blur-[100px]`} />

          <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
            {/* Badge */}
            <span className={`inline-flex items-center gap-2 rounded-full ${theme.accentSoft} ${theme.accentText} px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em]`}>
              <theme.Icon size={18} />
              {theme.label}
            </span>

            {/* Tagline */}
            {tagline && (
              <p className={`font-display mt-5 text-lg italic ${theme.accentText} sm:text-xl`}>
                {tagline}
              </p>
            )}

            {/* Heading */}
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {name}
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              {description}
            </p>

            {/* Route info card */}
            <div className="mt-10 flex w-full max-w-3xl items-center gap-4 rounded-2xl border border-white/60 bg-white/80 px-5 py-4 shadow-lg backdrop-blur sm:gap-6 sm:px-7">
              <div className="flex shrink-0 items-center gap-2">
                <MapPin size={18} className={theme.accentText} />
                <span className="font-mono-route text-sm font-semibold text-slate-900 sm:text-base">
                  {distanceFromVizag}
                </span>
              </div>

              <div className="route-dash hidden h-px flex-1 text-slate-300 sm:block" />

              <div
                className="relative hidden h-1.5 w-24 shrink-0 overflow-hidden rounded-full bg-slate-100 sm:block"
                aria-label={`${distanceKm} kilometers from Visakhapatnam`}
              >
                <div className={`h-full rounded-full ${theme.accent}`} style={{ width: `${routeFill}%` }} />
              </div>

              <div className="flex shrink-0 items-center gap-1.5 border-l border-slate-200 pl-4 text-slate-600">
                <Clock size={16} />
                <span className="font-mono-route text-xs font-medium sm:text-sm">{driveTime}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => openBooking({ resetTrip: true, drop: name })}
                className={`book-btn inline-flex items-center justify-center gap-2 rounded-xl ${theme.accent} px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <CalendarCheck size={18} />
                Book Now
              </button>

              <a
                href={`tel:${CONTACT_PHONE}`}
                className={`flex items-center justify-center gap-2 rounded-xl border-2 border-current bg-white px-8 py-4 text-base font-semibold ${theme.accentText} ${theme.hoverBg} transition-all duration-300 hover:text-white`}
              >
                <Phone size={18} />
                {CONTACT_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>

        <section className="w-full px-6 pb-28 pt-16 sm:px-10 sm:pb-16 sm:pt-20 lg:px-16">
          {/* ------------------------------------------------------------ */}
          {/* Quick facts + highlights                                     */}
          {/* ------------------------------------------------------------ */}
          {quickFacts && quickFacts.length > 0 && (
            <div className="mx-auto mt-2 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
              {quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className={`lift-on-hover rounded-2xl border border-black/5 bg-white px-4 py-4 text-center ring-1 ${theme.ring}`}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">{fact.label}</p>
                  <p className="font-mono-route mt-1.5 text-sm font-semibold text-slate-900 sm:text-base">
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {highlights && highlights.length > 0 && (
            <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2.5">
              {highlights.map((h) => (
                <span
                  key={h}
                  className={`inline-flex items-center gap-1.5 rounded-full ${theme.accentSoft} ${theme.accentText} px-3.5 py-1.5 text-xs font-semibold sm:text-sm`}
                >
                  <Sparkle size={13} />
                  {h}
                </span>
              ))}
            </div>
          )}

          {/* ------------------------------------------------------------ */}
          {/* Choose Your Ride — vehicle pricing cards                     */}
          {/* ------------------------------------------------------------ */}
          <div className="mx-auto mt-20 max-w-6xl">
            <div className="text-center">
              <p className={`eyebrow text-xs font-bold uppercase ${theme.accentText}`}>Transparent Pricing</p>
              <h2 className="section-heading mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Choose Your Ride to {name}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-600">
                Pick a vehicle below to see the round-trip fare for the {distanceFromVizag.toLowerCase()} —
                every package includes a driver, fuel, and standard toll allowance for the base kilometers.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {vehicleOptions.map((vehicle) => {
                const VIcon = VEHICLE_ICON[vehicle.category];
                const fare = getOutstationFare(outstation.slug, vehicle.slug as VehicleSlug);
                const isFeatured = vehicle.category === "MUV";

                return (
                  <div
                    key={vehicle.slug}
                    className={`price-card group relative flex flex-col overflow-hidden rounded-[28px] bg-white ${
                      isFeatured
                        ? `ring-2 ${theme.ring} shadow-xl lg:-translate-y-2`
                        : "shadow-sm ring-1 ring-slate-100 hover:shadow-xl"
                    }`}
                  >
                    {/* Accent bar */}
                    <div className={`h-1.5 w-full ${theme.accent}`} />

                    {isFeatured && (
                      <span
                        className={`absolute right-5 top-6 rounded-full ${theme.accent} px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-md`}
                      >
                        Best Value
                      </span>
                    )}

                    <div className="flex flex-1 flex-col p-7">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${theme.accentSoft} ${theme.accentText}`}>
                        <VIcon size={26} strokeWidth={1.75} />
                      </div>

                      <p className="font-display mt-5 text-xl font-semibold leading-snug text-slate-900">
                        {vehicle.name}
                      </p>
                      <p className={`mt-0.5 text-[11px] font-bold uppercase tracking-widest ${theme.accentText}`}>
                        {vehicle.category}
                      </p>

                      <div className="mt-4 flex items-center gap-4 border-y border-slate-100 py-3 text-xs font-medium text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Users size={14} className="text-slate-400" /> {vehicle.seats} seats
                        </span>
                        <span className="h-3 w-px bg-slate-200" aria-hidden="true" />
                        <span className="flex items-center gap-1.5">
                          <Luggage size={14} className="text-slate-400" /> {vehicle.bags} bags
                        </span>
                      </div>

                      <div className="mt-5">
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                          Round-trip fare
                        </p>
                        <p className="font-mono-route mt-1 flex items-baseline gap-0.5 text-[28px] font-bold leading-none text-slate-900">
                          <IndianRupee size={20} strokeWidth={2.5} className="translate-y-[1px]" />
                          {fare.toLocaleString("en-IN")}
                        </p>
                        <p className="mt-1.5 text-[11px] text-slate-500">
                          Extra km ₹{vehicle.extraKmRate} · Extra hr ₹{vehicle.extraHourRate}
                        </p>
                      </div>

                      <p className="mt-4 flex-1 text-[13px] leading-relaxed text-slate-500">{vehicle.bestFor}</p>

                      <div className="mt-6 flex flex-col gap-2.5">
                        <button
                          type="button"
                          onClick={() => openBooking({ resetTrip: true, drop: name })}
                          className={`book-btn inline-flex items-center justify-center gap-2 rounded-xl ${theme.accent} px-4 py-3 text-sm font-semibold text-white shadow-md`}
                        >
                          Book Now <ArrowRight size={14} />
                        </button>
                        <a
                          href={`https://wa.me/${CONTACT_PHONE.replace("+", "")}?text=${waMessage}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 transition-colors duration-200 hover:bg-emerald-100"
                        >
                          <MessageCircle size={14} /> WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-slate-400">
              Fares shown are fixed round-trip package rates for the {distanceFromVizag.toLowerCase()}. Final fare may vary
              with tolls, entry fees, waiting time, and driver night halt where applicable.
            </p>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* History                                                       */}
          {/* ------------------------------------------------------------ */}
          {history && (
            <div className="mx-auto mt-20 max-w-3xl">
              <h2 className="section-heading text-center text-3xl font-semibold tracking-tight text-slate-900">
                The Story of {name}
              </h2>
              <div className={`mx-auto mt-3 mb-8 h-1 w-14 rounded-full ${theme.accent}`} />
              {history.split("\n\n").map((para, i) => (
                <p key={i} className={`mb-5 text-[15.5px] leading-[1.85] text-slate-700 sm:text-base ${i === 0 ? "drop-cap" : ""}`}>
                  {para}
                </p>
              ))}
              {sources && sources.length > 0 && (
                <p className="mt-2 text-xs italic text-slate-400">Sourced from {sources.join(", ")}.</p>
              )}
            </div>
          )}

          {/* ------------------------------------------------------------ */}
          {/* Plan your visit                                               */}
          {/* ------------------------------------------------------------ */}
          {(bestTimeToVisit || howToReach) && (
            <div className="mx-auto mt-16 max-w-5xl">
              <h2 className="section-heading text-center text-3xl font-semibold tracking-tight text-slate-900">
                Plan Your Visit
              </h2>
              <div className={`mx-auto mt-3 mb-8 h-1 w-14 rounded-full ${theme.accent}`} />
              <div className="grid gap-5 sm:grid-cols-2">
                {bestTimeToVisit && (
                  <div className="lift-on-hover rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">
                    <p className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest ${theme.accentText}`}>
                      <Clock size={16} /> Best Time to Visit
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{bestTimeToVisit}</p>
                  </div>
                )}
                {howToReach && (
                  <div className="lift-on-hover rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">
                    <p className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest ${theme.accentText}`}>
                      <Navigation size={16} /> How to Reach
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{howToReach}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------ */}
          {/* Fun fact                                                      */}
          {/* ------------------------------------------------------------ */}
          {funFact && (
            <div className="mx-auto mt-14 max-w-3xl">
              <div className={`relative rounded-3xl ${theme.accent} px-8 py-9 text-white shadow-lg sm:px-12 sm:py-11`}>
                <Quote size={28} className="mb-3 text-white/50" />
                <p className="font-display text-xl leading-snug sm:text-2xl">{funFact}</p>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------ */}
          {/* Places you'll visit                                           */}
          {/* ------------------------------------------------------------ */}
          {places && places.length > 0 && (
            <div className="mx-auto mt-20 max-w-3xl">
              <h2 className="section-heading text-center text-3xl font-semibold tracking-tight text-slate-900">
                Places You'll Visit
              </h2>
              <div className={`mx-auto mt-3 mb-10 h-1 w-14 rounded-full ${theme.accent}`} />
              <ol className="relative">
                <div
                  className={`absolute left-6.75 top-2 bottom-2 hidden w-px sm:block ${theme.accentSoft}`}
                  style={{ borderLeft: "2px dashed currentColor" }}
                  aria-hidden="true"
                />
                {places.map((place, i) => (
                  <li key={place.name} className="relative mb-6 flex gap-5 last:mb-0 sm:gap-6">
                    <div className={`z-10 hidden h-14 w-14 shrink-0 items-center justify-center rounded-full ${theme.accent} font-mono-route text-base font-bold text-white shadow-md sm:flex`}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="lift-on-hover flex flex-1 gap-4 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                      <div className="flex flex-col justify-center py-3 pr-4 pl-4 sm:pl-0">
                        <span className={`mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest ${theme.accentText} sm:hidden`}>
                          Stop {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-sm font-bold uppercase tracking-wide text-slate-900 sm:text-base">
                          {place.name}
                          {place.tag && (
                            <span className="ml-1.5 text-[11px] font-medium normal-case text-slate-400">({place.tag})</span>
                          )}
                        </p>
                        {place.description && (
                          <p className="mt-1 text-[13px] leading-snug text-slate-500 sm:text-sm">{place.description}</p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* ------------------------------------------------------------ */}
          {/* Cross-sell: other outstation destinations                    */}
          {/* ------------------------------------------------------------ */}
          {otherOutstations.length > 0 && (
            <div className="mx-auto mt-20 max-w-6xl">
              <div className="text-center">
                <p className={`eyebrow text-xs font-bold uppercase ${theme.accentText}`}>Go Further</p>
                <h2 className="section-heading mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  Explore More Outstation Destinations
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-600">
                  Planning a longer trip? Here's what our outstation cabs from Vizag typically cost to other
                  popular destinations.
                </p>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {otherOutstations.map((dest) => {
                  const destTheme = CATEGORY_THEME[dest.category as keyof typeof CATEGORY_THEME] ?? CATEGORY_THEME.City;
                  return (
                    <Link
                      key={dest.slug}
                      to={`/services/outstation-taxi/${dest.slug}`}
                      className="lift-on-hover group flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`inline-flex items-center gap-1.5 rounded-full ${destTheme.accentSoft} ${destTheme.accentText} px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest`}>
                          <destTheme.Icon size={12} />
                          {destTheme.label}
                        </span>
                        <ArrowRight
                          size={16}
                          className={`${destTheme.accentText} transition-transform group-hover:translate-x-1`}
                        />
                      </div>
                      <p className="mt-4 text-lg font-bold text-slate-900">{dest.name}</p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin size={12} /> {dest.distanceKm} KM · {dest.driveTime}
                      </p>
                      {dest.costPerDay && (
                        <p className="mt-3 font-mono-route text-sm font-semibold text-slate-900">
                          From {formatINR(dest.costPerDay)}
                        </p>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------ */}
          {/* Final CTA                                                     */}
          {/* ------------------------------------------------------------ */}
          <div className="mx-auto mt-16 max-w-3xl">
            <div className={`flex flex-col items-center justify-between gap-5 rounded-3xl ${theme.accent} px-8 py-9 text-center text-white shadow-lg sm:flex-row sm:text-left`}>
              <div>
                <p className="font-display text-2xl font-semibold">Ready to visit {name}?</p>
                <p className="mt-1 text-sm text-white/80">Lock in your trip and we'll handle the rest.</p>
              </div>
              <button
                onClick={() => openBooking({ resetTrip: true, drop: name })}
                className={`book-btn hidden items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold ${theme.accentText} shadow-lg sm:inline-flex`}
              >
                <CalendarCheck size={16} />
                Book Now
              </button>
            </div>
          </div>
        </section>

        {/* Mobile sticky booking bar */}
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-black/5 bg-white/95 px-5 py-3 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.25)] backdrop-blur sm:hidden">
          <div className="flex items-center justify-between gap-4">
            <div>
              {costPerDay ? (
                <>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Starting From</p>
                  <p className="font-mono-route text-base font-bold text-slate-900">
                    ₹{costPerDay.toLocaleString("en-IN")}/day onwards
                  </p>
                </>
              ) : (
                <p className="font-display text-sm font-semibold text-slate-900">{name}</p>
              )}
            </div>
            <button
              onClick={() => openBooking({ resetTrip: true, drop: name })}
              className={`book-btn inline-flex items-center gap-2 rounded-full ${theme.accent} px-5 py-2.5 text-sm font-bold text-white shadow-lg`}
            >
              <CalendarCheck size={16} />
              Book Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}