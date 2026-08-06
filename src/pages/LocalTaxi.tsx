import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import {
  PhoneCall,
  ArrowRight,
  CheckCircle2,
  Car,
  Users,
  Briefcase,
  Clock,
  MapPin,
  ShieldCheck,
  Star,
  Sparkles,
} from "lucide-react";
import { useBooking } from "../components/booking/BookingContext";
import SEO from "../components/seo/SEO";

/* ------------------------------------------------------------------ */
/*  This page is intentionally NOT part of ServiceDetails.tsx.        */
/*  It's a standalone route with its own layout — used only for Local */
/*  Taxi (8 Hr/80 Km and 10 Hr/100 Km packages). The price-card        */
/*  styling below mirrors ServiceDetails.tsx (gradient badges,        */
/*  ring-slate-100 cards, same hover/shadow treatment). The hero has  */
/*  been restyled to match DestinationsHero.tsx — a light gradient    */
/*  band with soft blurred blobs, a pill badge, gradient heading      */
/*  text, and glass highlight cards — instead of the old dark hero.   */
/*                                                                    */
/*  ROUTING — register alongside your other routes, above the         */
/*  generic /services/:slug catch-all so these win the match:         */
/*                                                                    */
/*    <Route path="/services/local-taxi" element={<LocalTaxi />} />   */
/*    <Route path="/services/local-taxi/:pkg" element={<LocalTaxi />} />
/*    <Route path="/services/:slug" element={<ServiceDetails />} />   */
/*    <Route path="/services/:slug/:pkg" element={<ServiceDetails />} />
/* ------------------------------------------------------------------ */

const WHATSAPP_NUMBER = "918886803322";

type PackageId = "8hr-80km" | "10hr-100km";

/** `note` = small print under the price. `includes` = what this package is
 *  actually good for — this is the text that differs meaningfully between
 *  the 8 Hr/80 Km and 10 Hr/100 Km tabs, not just the number. */
type Fare = { rate: string; unit: string; note: string; includes: string };

type CarTheme = {
  gradient: string;
  iconColor: string;
};

const carThemes: Record<string, CarTheme> = {
  "Swift Dzire": { gradient: "from-blue-500 to-sky-400", iconColor: "text-white" },
  Ertiga: { gradient: "from-teal-500 to-emerald-400", iconColor: "text-white" },
  "Innova Crysta": { gradient: "from-violet-500 to-purple-400", iconColor: "text-white" },
  "Tempo Traveller": { gradient: "from-orange-500 to-amber-400", iconColor: "text-white" },
};

type Car2 = {
  name: string;
  category: string;
  seats: number;
  luggage: number;
  theme: CarTheme;
  fares: Record<PackageId, Fare>;
};

const fleet: Car2[] = [
  {
    name: "Swift Dzire",
    category: "Sedan",
    seats: 4,
    luggage: 2,
    theme: carThemes["Swift Dzire"],
    fares: {
      "8hr-80km": {
        rate: "₹2,400",
        unit: "/ 80 km",
        note: "Extra km ₹13 · Extra hr ₹150",
        includes: "Best for 2-3 stops — office runs, a quick errand, and back.",
      },
      "10hr-100km": {
        rate: "₹3,000",
        unit: "/ 100 km",
        note: "Extra km ₹13 · Extra hr ₹150",
        includes: "Best for 4-5 stops — a full day of sightseeing or shopping.",
      },
    },
  },
  {
    name: "Ertiga",
    category: "MUV",
    seats: 6,
    luggage: 3,
    theme: carThemes.Ertiga,
    fares: {
      "8hr-80km": {
        rate: "₹2,800",
        unit: "/ 80 km",
        note: "Extra km ₹16 · Extra hr ₹180",
        includes: "Good for a family of 5-6 on a half-day city run.",
      },
      "10hr-100km": {
        rate: "₹3,500",
        unit: "/ 100 km",
        note: "Extra km ₹16 · Extra hr ₹180",
        includes: "Good for a family day trip with multiple temple/beach stops.",
      },
    },
  },
  {
    name: "Innova Crysta",
    category: "Premium SUV",
    seats: 7,
    luggage: 4,
    theme: carThemes["Innova Crysta"],
    fares: {
      "8hr-80km": {
        rate: "₹3,200",
        unit: "/ 80 km",
        note: "Extra km ₹19 · Extra hr ₹200",
        includes: "Comfortable half-day pick for business or airport-adjacent trips.",
      },
      "10hr-100km": {
        rate: "₹4,000",
        unit: "/ 100 km",
        note: "Extra km ₹19 · Extra hr ₹200",
        includes: "Ideal for a full-day corporate or VIP sightseeing itinerary.",
      },
    },
  },
  {
    name: "Tempo Traveller",
    category: "Group Travel",
    seats: 17,
    luggage: 10,
    theme: carThemes["Tempo Traveller"],
    fares: {
      "8hr-80km": {
        rate: "₹5,200",
        unit: "/ 80 km",
        note: "Extra km ₹28 · Extra hr ₹300",
        includes: "Fits large groups for a half-day event or short group outing.",
      },
      "10hr-100km": {
        rate: "₹6,500",
        unit: "/ 100 km",
        note: "Extra km ₹28 · Extra hr ₹300",
        includes: "Best for full-day group tours, weddings, or school/office trips.",
      },
    },
  },
];

const packageMeta: Record<
  PackageId,
  { label: string; short: string; blurb: string }
> = {
  "8hr-80km": {
    label: "8 Hr / 80 Km",
    short: "8 Hours",
    blurb:
      "Ideal for a busy day in the city — office runs, a few errands, and a couple of stops without watching the clock.",
  },
  "10hr-100km": {
    label: "10 Hr / 100 Km",
    short: "10 Hours",
    blurb:
      "Built for a full day out — local sightseeing, shopping, temple visits, or back-to-back meetings across Vizag.",
  },
};

const useCases = [
  { icon: Briefcase, label: "Office commutes & business travel" },
  { icon: MapPin, label: "Vizag local sightseeing" },
  { icon: Car, label: "Railway station & bus stand pickups" },
  { icon: Users, label: "Family outings & shopping trips" },
  { icon: Clock, label: "Hospital visits & same-day errands" },
  { icon: Star, label: "Wedding & event local support" },
];

const whyUs = [
  {
    title: "No surge pricing",
    body: "The fare you're quoted is the fare you pay — no last-minute multipliers, ever.",
  },
  {
    title: "Verified drivers",
    body: "Every driver is background-checked, licensed, and trained for city driving.",
  },
  {
    title: "Clean, maintained cars",
    body: "Sanitised interiors and regularly serviced vehicles across the whole fleet.",
  },
  {
    title: "24/7 availability",
    body: "Early morning starts or late-night pickups — we're on call around the clock.",
  },
];

type LocalPlace = {
  name: string;
  about: string;
};

const localSightseeingPlaces: LocalPlace[] = [
  { name: "Simhachalam Temple", about: "Ancient hill temple dedicated to Lord Varaha Narasimha, one of Vizag's most visited pilgrim spots." },
  { name: "Kailasagiri", about: "Hilltop park with a ropeway, giant Shiva-Parvati statues, and sweeping views of the city and coastline." },
  { name: "Zoo Park", about: "Indira Gandhi Zoological Park — spread across a forested hillside, home to a wide range of native and exotic species." },
  { name: "TTD Temple", about: "Sri Venkateswara Swamy temple run by TTD, a peaceful hillside shrine popular for daily darshan." },
  { name: "Rushikonda Beach", about: "Golden-sand beach known for water sports, calm waters, and a relaxed evening vibe." },
  { name: "Thotlakonda", about: "2nd-century Buddhist monastery ruins on a hilltop, with quiet views over the Bay of Bengal." },
  { name: "Ramanaidu Studios", about: "Working film studio offering a peek into sets, props, and behind-the-scenes movie-making." },
  { name: "Submarine Museum", about: "INS Kursura, a decommissioned Indian Navy submarine turned museum right on the beach road." },
  { name: "Aircraft Museum", about: "A retired TU-142 aircraft converted into an aviation museum near RK Beach." },
  { name: "Visakha Museum", about: "Housed in an old Dutch bungalow, showcasing the city's maritime and wartime history." },
  { name: "Yarada Beach", about: "Secluded beach tucked between hills, quieter and greener than the city beaches." },
  { name: "Lighthouse", about: "Working lighthouse near RK Beach with a small museum and city-and-sea views from the top." },
  { name: "VUDA Park", about: "Landscaped waterfront park by Vizag's Kailasagiri lake, popular for evening walks." },
  { name: "RK Beach", about: "Ramakrishna Beach — Vizag's iconic promenade, lined with statues, food stalls, and sea views." },
  { name: "Matsyadarshini", about: "Underwater-themed aquarium showcasing marine life native to the Bay of Bengal." },
  { name: "Fishing Harbour", about: "Vizag's working fishing harbour — an early-morning glimpse into the city's boats and catch." },
];

type Destination = {
  name: string;
  km: string;
  duration: string;
  fromPrice: string;
  href: string;
};

const outstationDestinations: Destination[] = [
  { name: "Araku Valley", km: "120 KM", duration: "3-4 Hours", fromPrice: "₹5,000", href: "/destinations/araku-valley?type=vizag-to-araku-taxi" },
  { name: "Narsipatnam", km: "80 KM", duration: "2 Hours", fromPrice: "₹3,000", href: "/destinations/narsipatnam?type=outstation-taxi-services" },
  { name: "Annavaram", km: "125 KM", duration: "3 Hours", fromPrice: "₹4,200", href: "/destinations/annavaram-temple?type=annavaram-temple-taxi-services" },
  { name: "Kakinada", km: "160 KM", duration: "3-4 Hours", fromPrice: "₹4,500", href: "/destinations/kakinada?type=outstation-taxi-services" },
  { name: "Rajahmundry", km: "200 KM", duration: "4-5 Hours", fromPrice: "₹5,200", href: "/destinations/rajahmundry?type=outstation-taxi-services" },
  { name: "Vijayawada", km: "350 KM", duration: "7-8 Hours", fromPrice: "₹9,600", href: "/destinations/vijayawada?type=outstation-taxi-services" },
  { name: "Hyderabad", km: "620 KM", duration: "11-12 Hours", fromPrice: "₹17,000", href: "/destinations/hyderabad?type=outstation-taxi-services" },
  { name: "Puri (Odisha)", km: "450 KM", duration: "9-10 Hours", fromPrice: "₹9,500", href: "/destinations/puri-odisha?type=outstation-taxi-services" },
];

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.004 2C6.486 2 2.01 6.477 2.01 11.996c0 2.115.664 4.078 1.796 5.688L2 22l4.443-1.767a9.94 9.94 0 0 0 5.561 1.674h.004c5.518 0 9.994-4.477 9.994-9.996C21.998 6.477 17.522 2 12.004 2zm0 18.16h-.003a8.13 8.13 0 0 1-4.156-1.14l-.298-.176-3.098 1.233.83-3.05-.194-.313a8.13 8.13 0 0 1-1.246-4.318c0-4.5 3.67-8.16 8.166-8.16 2.18 0 4.229.852 5.77 2.394a8.1 8.1 0 0 1 2.393 5.775c0 4.5-3.67 8.16-8.164 8.16z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero highlight cards — mirrors the "highlights" grid pattern from */
/*  DestinationsHero.tsx, adapted to this page's package + fare copy. */
/* ------------------------------------------------------------------ */
const heroHighlights = [
  { icon: ShieldCheck, label: "No Surge Pricing" },
  { icon: Clock, label: "24/7 Availability" },
  { icon: Car, label: "Verified Drivers" },
  { icon: MapPin, label: "All Of Vizag Covered" },
];

export default function LocalTaxi() {
  const { pkg } = useParams<{ pkg?: string }>();
  const { openBooking, setTripType } = useBooking();

  const activePkg: PackageId =
    pkg === "10hr-100km" ? "10hr-100km" : pkg === "8hr-80km" || !pkg ? "8hr-80km" : ("" as PackageId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pkg]);

  // Anything other than the two known package slugs is a genuine 404.
  if (pkg && pkg !== "8hr-80km" && pkg !== "10hr-100km") {
    return <Navigate to="/services/local-taxi" replace />;
  }

  const meta = packageMeta[activePkg];

  const handleBookNow = () => {
    setTripType("Local");
    openBooking({ resetTrip: false });
  };

  const getWhatsAppLink = (carName: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      `Hi BSH Taxi Services, I'd like to book a ${carName} for the ${meta.label} local taxi package in Vizag. Please share availability and fare.`
    )}`;

  return (
    <>
      <SEO
        title={`Local Taxi in Vizag — ${meta.label} Package | BSH Taxi Services`}
        description={`Book a local taxi in Vizag on the ${meta.label} package. Transparent per-km fares, verified drivers, and 24/7 availability across Visakhapatnam. ${meta.blurb}`}
        keywords={[
          "local taxi in vizag",
          "vizag local taxi",
          "taxi service in visakhapatnam",
          `${meta.short.toLowerCase()} taxi package vizag`,
          "local cab vizag",
        ]}
        canonicalPath={`/services/local-taxi${pkg ? `/${pkg}` : ""}`}
      />

      {/* ---------------------------------------------------------- */}
      {/* Hero — restyled to match DestinationsHero.tsx: light        */}
      {/* gradient band, soft blurred blobs, pill badge, gradient     */}
      {/* heading text, and glass highlight cards. Package switcher   */}
      {/* and CTAs kept from the original, re-themed for light bg.    */}
      {/* ---------------------------------------------------------- */}
      <section className="relative mt-8 overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50 pt-16 pb-20">
        {/* Background blur blobs */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-amber-400/10 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-primary/10 blur-[100px]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15,23,42,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.6) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 text-center lg:px-10">
          <nav className="mb-8 flex items-center gap-2 self-start text-xs font-medium text-slate-500">
            <Link to="/" className="hover:text-amber-600">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-amber-600">Services</Link>
            <span>/</span>
            <span className="text-slate-700">Local Taxi</span>
          </nav>

          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            <Sparkles size={16} />
            Local Taxi in Vizag
          </span>

          {/* Heading */}
          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Local Taxi in Vizag
            <span className="mt-2 block bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              {meta.label} Package
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            {meta.blurb} BSH Taxi Services runs the best local taxi service in
            Visakhapatnam — office commutes, hospital visits, shopping trips,
            and city sightseeing, all with transparent per-km pricing and
            drivers who know Vizag inside out.
          </p>

          {/* Package switcher — real links so each package is its own URL */}
          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/80 p-1 shadow-sm backdrop-blur">
            {(Object.keys(packageMeta) as PackageId[]).map((id) => (
              <Link
                key={id}
                to={`/services/local-taxi/${id}`}
                className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-200 ${
                  activePkg === id
                    ? "bg-primary text-white shadow-md shadow-primary/25"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {packageMeta[id].label}
              </Link>
            ))}
          </div>

          {/* Highlight cards */}
          <div className="mt-14 grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {heroHighlights.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="group rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:scale-110">
                  <Icon size={28} />
                </div>
                <h3 className="mt-5 text-base font-bold text-slate-900">
                  {label}
                </h3>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-14 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={handleBookNow}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Book This Package
              <ArrowRight size={18} />
            </button>

            <a
              href="tel:+918886803322"
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-primary bg-white px-8 py-4 text-base font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-white"
            >
              <PhoneCall size={18} />
              +91 8886803322
            </a>

            <a
              href={getWhatsAppLink("a car")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-green-500/30 bg-green-50 px-8 py-4 text-base font-semibold text-green-700 transition-all duration-300 hover:border-green-500/60 hover:bg-green-100"
            >
              <WhatsAppIcon size={18} />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Use cases strip                                             */}
      {/* ---------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-6 py-14 lg:px-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {useCases.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                <Icon size={20} />
              </div>
              <p className="text-xs font-semibold text-slate-600">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Local sightseeing places — card grid with short descriptions */}
      {/* ---------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
        <div className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
            Where To Go
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Popular places to visit in Vizag
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-500">
            Your {meta.label} local taxi package covers all these spots —
            mix and match your own city tour.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {localSightseeingPlaces.map((place) => (
            <div
              key={place.name}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-amber-50 text-amber-600">
                  <MapPin size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{place.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                    {place.about}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={handleBookNow}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-8 py-4 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800"
          >
            Plan Your Sightseeing Trip
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Fleet & pricing — styled like ServiceDetails.tsx: gradient   */}
      {/* circular badges, ring-slate-100 cards, hover -translate-y-2, */}
      {/* vertical card layout. `includes` text below the price note   */}
      {/* changes between the 8 Hr and 10 Hr tabs — not just the rate. */}
      {/* ---------------------------------------------------------- */}
      <section className="w-full bg-slate-50/60 px-6 py-20 sm:px-10 lg:px-16">
        <div className="mb-4 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
            Transparent Pricing
          </span>
        </div>
        <p className="mx-auto mb-10 max-w-2xl text-center text-base text-slate-500">
          Pick a package above and see the fare — and what it's actually good
          for — across our full local taxi fleet.
        </p>

        <div className="mx-auto grid max-w-[80em] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {fleet.map((car) => {
            const fare = car.fares[activePkg];
            return (
              <article
                key={car.name}
                className="group flex flex-col rounded-3xl bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)] ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(16,24,40,0.12)] hover:ring-amber-400/20"
              >
                <div className="relative mx-auto h-20 w-20">
                  <div
                    className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${car.theme.gradient} shadow-md transition-transform duration-300 group-hover:-translate-y-1`}
                  >
                    <Car size={32} className={car.theme.iconColor} strokeWidth={2} />
                  </div>
                </div>

                <h3 className="mt-5 text-center text-lg font-bold text-slate-900">
                  {car.name}
                </h3>
                <p className="text-center text-xs font-bold uppercase tracking-wide text-amber-600/80">
                  {car.category}
                </p>

                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Users size={14} /> {car.seats} seats
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase size={14} /> {car.luggage} bags
                  </span>
                </div>

                {/* Fare for the active package */}
                <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 text-center">
                  <p className="text-2xl font-extrabold text-slate-900">
                    {fare.rate}
                    <span className="text-sm font-semibold text-slate-500">
                      {fare.unit}
                    </span>
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-500">
                    {fare.note}
                  </p>
                </div>

                {/* Package-specific "what this is good for" text — this is
                    the part that genuinely differs between 8hr and 10hr,
                    not just the price. */}
                <p className="mt-3 text-center text-xs leading-relaxed text-slate-500">
                  {fare.includes}
                </p>

                <div className="mt-5 flex flex-col gap-2">
                  <button
                    onClick={handleBookNow}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-50 py-3 text-sm font-bold text-amber-700 transition hover:bg-amber-400 hover:text-slate-900"
                  >
                    Book Now
                    <ArrowRight size={15} />
                  </button>

                  <a
                    href={getWhatsAppLink(car.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-green-50 py-3 text-sm font-bold text-green-700 transition hover:bg-green-500 hover:text-white"
                  >
                    <WhatsAppIcon size={16} />
                    WhatsApp
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Why us                                                      */}
      {/* ---------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
        <div className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
            Why BSH Taxi Services
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Vizag's trusted local taxi service
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map(({ title, body }) => (
            <div
              key={title}
              className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <ShieldCheck size={22} className="text-amber-500" />
              <h3 className="mt-4 font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Popular Outstation Destinations                              */}
      {/* ---------------------------------------------------------- */}
      <section className="bg-slate-50 px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
              Go Further
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Popular Outstation Destinations
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-500">
              Planning a longer trip after your local taxi? Here's what our
              outstation cabs from Vizag typically cost.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {outstationDestinations.map((dest) => (
              <Link
                key={dest.name}
                to={dest.href}
                className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg"
              >
                <p className="text-lg font-bold text-slate-900">{dest.name}</p>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  {dest.km} • {dest.duration}
                </p>
                <p className="mt-3 text-sm font-bold text-amber-600">
                  From {dest.fromPrice}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              to="/services/outstation-taxi?type=outstation-taxi-services"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-8 py-4 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800"
            >
              View All Routes
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Other services links                                        */}
      {/* ---------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
            Explore With Your Local Taxi
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Other services
          </h2>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <h3 className="flex items-center gap-2 font-bold text-slate-900">
            <Car size={18} className="text-amber-500" />
            Other taxi services
          </h3>
          <div className="mt-5 grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {[
              { label: "Outstation Taxi", href: "/services/outstation-taxi?type=outstation-taxi-services" },
              { label: "Airport Transfers", href: "/services/airport-transfer?type=airport-taxi" },
              { label: "Tour Packages", href: "/services/tour-packages?type=tour-packages" },
              { label: "Corporate Taxi", href: "/services/corporate-travel?type=corporate-cab-services" },
              { label: "Wedding Car Rentals", href: "/services/wedding-car-rentals?type=wedding-car-rentals" },
            ].map((service) => (
              <Link
                key={service.label}
                to={service.href}
                className="group flex items-center justify-between border-b border-slate-100 py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 last:border-b-0 hover:text-amber-600 sm:odd:border-r-0"
              >
                {service.label}
                <ArrowRight
                  size={16}
                  className="text-slate-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-amber-500"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Fine print + final CTA                                      */}
      {/* ---------------------------------------------------------- */}
      <section className="bg-slate-950 px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur sm:p-10">
            <h3 className="text-lg font-bold text-white">Good to know</h3>
            <ul className="mt-5 space-y-3">
              {[
                "Package includes the stated hours and kilometres from pickup to drop.",
                "Waiting time beyond 10 minutes at a stop is billed as per extra-hour rate.",
                "Toll, parking, and state permit charges (if any) are extra.",
                "Switching between the 8 Hr/80 Km and 10 Hr/100 Km package is possible before the trip starts — just let our team know.",
              ].map((note) => (
                <li key={note} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-amber-400" />
                  <p className="text-sm leading-relaxed text-slate-300">{note}</p>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-4 border-t border-white/10 pt-8">
              <button
                onClick={handleBookNow}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-8 py-4 font-bold text-slate-900 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-amber-300"
              >
                Book Now
                <ArrowRight size={18} />
              </button>

              <a
                href="tel:+918886803322"
                className="flex items-center gap-2 rounded-xl border-2 border-white/15 bg-white/5 px-8 py-4 font-bold text-white transition hover:border-white/30 hover:bg-white/10"
              >
                <PhoneCall size={20} />
                +91 8886803322
              </a>

              <a
                href={getWhatsAppLink("a car")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border-2 border-green-400/30 bg-green-400/10 px-8 py-4 font-bold text-green-300 transition hover:border-green-400/60 hover:bg-green-400/20"
              >
                <WhatsAppIcon size={20} />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}