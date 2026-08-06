import { Link } from "react-router-dom";
import {
  PhoneCall,
  ArrowRight,
  CheckCircle2,
  Car,
  Users,
  Briefcase,
  MapPin,
  ShieldCheck,
  Route,
  Luggage,
  Sparkles,
  Star,
  Clock,
  Flame,
} from "lucide-react";
import { useBooking } from "../components/booking/BookingContext";
import SEO from "../components/seo/SEO";
/* ------------------------------------------------------------------ */
/*  FIXED: this now correctly points to                               */
/*  src/data/outstationDestinations.data.ts (the actual file/export   */
/*  name). Previously this imported from "../data/Outstationtaxidata" */
/*  which does not exist, so destinations (incl. Araku Valley) never  */
/*  connected correctly / would break the build.                      */
/* ------------------------------------------------------------------ */
import { outstationDestinations } from "../data/Outstationtaxidata";

/* ------------------------------------------------------------------ */
/*  Standalone route, same pattern as LocalTaxi.tsx — its own hero,   */
/*  its own palette (slate-950 hero + amber accent), and              */
/*  ServiceDetails-style gradient price cards.                        */
/*                                                                    */
/*  Pricing here is a FIXED starting amount per car (not per-km, no   */
/*  One Way / Round Trip toggle) — the header's Outstation submenu    */
/*  now links straight to destination pages instead of a pkg switch.  */
/*                                                                    */
/*  DATA:                                                             */
/*    All per-destination content (name, km, duration, fromPrice,     */
/*    hot flag, slug) now comes from                                  */
/*    src/data/outstationDestinations.data.ts — this file only        */
/*    derives display slices from it (featured cards + full A-Z       */
/*    directory). Update fares/distances in that one file and both    */
/*    sections below update automatically.                            */
/*                                                                    */
/*  ROUTING:                                                          */
/*    <Route path="/services/outstation-taxi" element={<OutstationTaxi />} /> */
/*    <Route path="/destinations/:slug" element={<DestinationPage />} />     */
/*    (DestinationPage.tsx reads outstationDestinations.data.ts by    */
/*    :slug param when ?type=outstation-taxi-services is present —    */
/*    unchanged, this file only needs a correct, matching import.)    */
/* ------------------------------------------------------------------ */

const WHATSAPP_NUMBER = "918886803322";

type Fare = { rate: string; note: string; includes: string };

type CarTheme = {
  gradient: string;
  iconColor: string;
  ring: string;
  glow: string;
};

const carThemes: Record<string, CarTheme> = {
  "Swift Dzire": {
    gradient: "from-blue-500 to-sky-400",
    iconColor: "text-white",
    ring: "hover:ring-blue-400/30",
    glow: "group-hover:shadow-blue-400/30",
  },
  Ertiga: {
    gradient: "from-teal-500 to-emerald-400",
    iconColor: "text-white",
    ring: "hover:ring-emerald-400/30",
    glow: "group-hover:shadow-emerald-400/30",
  },
  "Innova Crysta": {
    gradient: "from-violet-500 to-purple-400",
    iconColor: "text-white",
    ring: "hover:ring-violet-400/30",
    glow: "group-hover:shadow-violet-400/30",
  },
  "Tempo Traveller": {
    gradient: "from-orange-500 to-amber-400",
    iconColor: "text-white",
    ring: "hover:ring-amber-400/30",
    glow: "group-hover:shadow-amber-400/30",
  },
};

type Car2 = {
  name: string;
  category: string;
  seats: number;
  luggage: number;
  theme: CarTheme;
  fare: Fare;
  popular?: boolean;
};

/* TODO: swap these fixed starting fares for your real, current rates */
const fleet: Car2[] = [
  {
    name: "Swift Dzire",
    category: "Sedan",
    seats: 4,
    luggage: 2,
    theme: carThemes["Swift Dzire"],
    fare: {
      rate: "₹4,200",
      note: "Starting fare · Toll, parking & permit extra",
      includes: "Best for a comfortable one-way or round trip for up to 4.",
    },
  },
  {
    name: "Ertiga",
    category: "MUV",
    seats: 6,
    luggage: 3,
    theme: carThemes.Ertiga,
    fare: {
      rate: "₹5,200",
      note: "Starting fare · Toll, parking & permit extra",
      includes: "Good for a family of 5-6 with luggage on outstation trips.",
    },
    popular: true,
  },
  {
    name: "Innova Crysta",
    category: "Premium SUV",
    seats: 7,
    luggage: 4,
    theme: carThemes["Innova Crysta"],
    fare: {
      rate: "₹6,500",
      note: "Starting fare · Toll, parking & permit extra",
      includes: "Comfortable pick for long highway drives and overnight halts.",
    },
  },
  {
    name: "Tempo Traveller",
    category: "Group Travel",
    seats: 17,
    luggage: 10,
    theme: carThemes["Tempo Traveller"],
    fare: {
      rate: "₹9,800",
      note: "Starting fare · Toll, parking & permit extra",
      includes: "Best for group tours, pilgrimages, and multi-day outings.",
    },
  },
];

const useCases = [
  { icon: Route, label: "One-way & round-trip outstation drops" },
  { icon: MapPin, label: "Temple & pilgrimage travel" },
  { icon: Car, label: "Multi-day tour packages" },
  { icon: Users, label: "Family & group outstation trips" },
  { icon: Luggage, label: "Relocation & long-distance moves" },
  { icon: Sparkles, label: "Weekend getaways from Vizag" },
];

const whyUs = [
  { title: "No surge pricing", body: "The fare you're quoted is the fare you pay — no last-minute multipliers, ever." },
  { title: "Verified drivers", body: "Every driver is background-checked, licensed, and trained for highway driving." },
  { title: "Clean, maintained cars", body: "Sanitised interiors and regularly serviced vehicles across the whole fleet." },
  { title: "24/7 availability", body: "Early morning starts or late-night pickups — we're on call around the clock." },
];

/* ------------------------------------------------------------------ */
/*  Featured destinations — derived from outstationDestinations.data. */
/*  `hot: true` entries surface first (they get the "Trending" badge  */
/*  in the UI below — this is where Araku Valley shows up, since it   */
/*  is marked hot: true in the data file), padded out with the next   */
/*  entries in file order so the grid keeps up to 8 cards even if     */
/*  fewer are marked hot.                                             */
/* ------------------------------------------------------------------ */
const FEATURED_COUNT = 8;

const featuredDestinations = outstationDestinations
  .filter((d) => d.hot)
  .concat(outstationDestinations.filter((d) => !d.hot))
  .slice(0, FEATURED_COUNT)
  .map((d) => ({
    name: d.name,
    km: d.km,
    duration: d.duration,
    fromPrice: d.fromPrice,
    hot: d.hot,
    href: `/destinations/${d.slug}?type=outstation-taxi-services`,
  }));

/* ------------------------------------------------------------------ */
/*  Full destinations directory — alphabetical, using each entry's    */
/*  own slug from the data file (no on-the-fly slugify needed).       */
/*  Araku Valley appears here too, at /destinations/araku-valley.     */
/* ------------------------------------------------------------------ */
const allDestinations = [...outstationDestinations].sort((a, b) =>
  a.name.localeCompare(b.name)
);

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.004 2C6.486 2 2.01 6.477 2.01 11.996c0 2.115.664 4.078 1.796 5.688L2 22l4.443-1.767a9.94 9.94 0 0 0 5.561 1.674h.004c5.518 0 9.994-4.477 9.994-9.996C21.998 6.477 17.522 2 12.004 2zm0 18.16h-.003a8.13 8.13 0 0 1-4.156-1.14l-.298-.176-3.098 1.233.83-3.05-.194-.313a8.13 8.13 0 0 1-1.246-4.318c0-4.5 3.67-8.16 8.166-8.16 2.18 0 4.229.852 5.77 2.394a8.1 8.1 0 0 1 2.393 5.775c0 4.5-3.67 8.16-8.164 8.16z" />
    </svg>
  );
}

export default function OutstationTaxi() {
  const { openBooking, setTripType } = useBooking();

  const handleBookNow = () => {
    setTripType("Outstation");
    openBooking({ resetTrip: false });
  };

  const getWhatsAppLink = (carName: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      `Hi BSH Taxi Services, I'd like to book a ${carName} for an outstation trip from Vizag. Please share availability and fare.`
    )}`;

  return (
    <>
      <SEO
        title="Outstation Taxi from Vizag | BSH Taxi Services"
        description="Book an outstation taxi from Vizag with transparent, fixed fares, verified highway drivers, and 24/7 availability. Covering Araku, Vijayawada, Hyderabad, Tirupati and more."
        keywords={[
          "outstation taxi in vizag",
          "vizag outstation cab",
          "outstation taxi services",
        ]}
        canonicalPath="/services/outstation-taxi"
      />

      {/* ---------------------------------------------------------- */}
      {/* Hero                                                        */}
      {/* ---------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-slate-950 pt-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-amber-500/20 blur-3xl" />
          <div className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-primary/25 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-10 lg:px-10">
          <nav className="mb-8 flex items-center gap-2 text-xs font-medium text-slate-400">
            <Link to="/" className="hover:text-amber-400">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-amber-400">Services</Link>
            <span>/</span>
            <span className="text-slate-200">Outstation Taxi</span>
          </nav>

          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.15)]">
            <Sparkles size={14} />
            Outstation Taxi from Vizag
          </span>

          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            Outstation Taxi
            <span className="mt-2 block bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
              from Vizag
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            BSH Taxi Services runs outstation cabs to Araku, Vijayawada,
            Hyderabad, Tirupati, and every major town in Andhra Pradesh and
            beyond — with fixed, transparent pricing and drivers who know
            the highways well.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={handleBookNow}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-8 py-4 font-bold text-slate-900 shadow-lg shadow-amber-400/20 transition-all duration-300 hover:-translate-y-1 hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/30"
            >
              Book This Trip
              <ArrowRight size={18} />
            </button>

            <a
              href="tel:+918886803322"
              className="flex items-center gap-2 rounded-xl border-2 border-white/15 bg-white/5 px-8 py-4 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10"
            >
              <PhoneCall size={20} />
              Call Now
            </a>

            <a
              href={getWhatsAppLink("a car")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border-2 border-green-400/30 bg-green-400/10 px-8 py-4 font-bold text-green-300 transition-all duration-300 hover:-translate-y-1 hover:border-green-400/60 hover:bg-green-400/20"
            >
              <WhatsAppIcon size={20} />
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
              className="group flex flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-50 text-amber-600 transition-colors duration-300 group-hover:bg-amber-400 group-hover:text-white">
                <Icon size={20} />
              </div>
              <p className="text-xs font-semibold text-slate-600">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Featured destinations — highlighted cards w/ price          */}
      {/* Data source: outstationDestinations (hot flag + full info)  */}
      {/* ---------------------------------------------------------- */}
      <section className="relative overflow-hidden px-6 py-16 lg:px-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-amber-50/50 via-white to-white" />

        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
              <Flame size={14} />
              Popular Routes
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Popular outstation destinations
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-500">
              Tap a destination to see the full route page — distance, drive
              time, and starting fare.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredDestinations.map((dest) => (
              <Link
                key={dest.name}
                to={dest.href}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-100"
              >
                {dest.hot && (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-700">
                    <Flame size={11} />
                    Trending
                  </span>
                )}

                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-amber-50 text-amber-600 transition-transform duration-300 group-hover:scale-110 group-hover:from-amber-400 group-hover:to-amber-300 group-hover:text-white">
                  <MapPin size={22} />
                </div>

                <p className="text-lg font-bold text-slate-900">{dest.name}</p>

                <div className="mt-2 flex items-center justify-center gap-3 text-xs font-medium text-slate-500">
                  <span className="flex items-center gap-1">
                    <Route size={12} />
                    {dest.km}
                  </span>
                  <span className="h-3 w-px bg-slate-200" />
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {dest.duration}
                  </span>
                </div>

                <div className="mt-4 border-t border-dashed border-slate-100 pt-4">
                  <p className="text-xs font-medium text-slate-400">Starting from</p>
                  <p className="mt-0.5 text-xl font-extrabold text-amber-600">
                    {dest.fromPrice}
                  </p>
                </div>

                <span className="mt-4 inline-flex items-center justify-center gap-1 text-xs font-bold text-slate-400 transition-colors duration-300 group-hover:text-amber-600">
                  View route
                  <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Fleet & pricing — fixed starting fare per car, no tabs       */}
      {/* ---------------------------------------------------------- */}
      <section className="w-full bg-gradient-to-b from-slate-50 to-slate-100/60 px-6 py-20 sm:px-10 lg:px-16">
        <div className="mb-4 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
            Transparent Pricing
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Choose your ride
          </h2>
        </div>
        <p className="mx-auto mb-12 max-w-2xl text-center text-base text-slate-500">
          Fixed starting fares across our full outstation fleet — the exact
          amount depends on your destination, so confirm it with our team
          before booking.
        </p>

        <div className="mx-auto grid max-w-[80em] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {fleet.map((car) => (
            <article
              key={car.name}
              className={`group relative flex flex-col rounded-3xl bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)] ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${car.theme.ring} ${car.theme.glow} ${
                car.popular ? "ring-2 ring-amber-300 sm:scale-[1.03]" : ""
              }`}
            >
              {car.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-amber-400 to-amber-300 px-4 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-900 shadow-md">
                  <Star size={10} className="mr-1 inline -mt-0.5 fill-slate-900" />
                  Most Popular
                </span>
              )}

              <div className="relative mx-auto h-20 w-20">
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${car.theme.gradient} opacity-20 blur-lg transition-opacity duration-300 group-hover:opacity-40`} />
                <div
                  className={`relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${car.theme.gradient} shadow-md transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105`}
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

              {/* Fixed starting fare — no per-km rate, no tabs */}
              <div className="mt-5 rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white px-4 py-4 text-center transition-colors duration-300 group-hover:border-amber-100">
                <p className="text-2xl font-extrabold text-slate-900">
                  {car.fare.rate}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  {car.fare.note}
                </p>
              </div>

              <p className="mt-3 text-center text-xs leading-relaxed text-slate-500">
                {car.fare.includes}
              </p>

              <div className="mt-5 flex flex-col gap-2">
                <button
                  onClick={handleBookNow}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-50 py-3 text-sm font-bold text-amber-700 transition-all duration-300 hover:bg-amber-400 hover:text-slate-900 hover:shadow-md"
                >
                  Book Now
                  <ArrowRight size={15} />
                </button>

                <a
                  href={getWhatsAppLink(car.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-green-50 py-3 text-sm font-bold text-green-700 transition-all duration-300 hover:bg-green-500 hover:text-white hover:shadow-md"
                >
                  <WhatsAppIcon size={16} />
                  WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Full destinations directory — alphabetical grid              */}
      {/* Data source: outstationDestinations (sorted by name)         */}
      {/* ---------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
        <div className="mb-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
            All Routes
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Every outstation destination we cover
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-500">
            From nearby towns to cities across neighbouring states — tap a
            destination to open its route page.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
            {allDestinations.map((dest) => (
              <Link
                key={dest.slug}
                to={`/destinations/${dest.slug}?type=outstation-taxi-services`}
                className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition-colors duration-200 hover:text-amber-600"
              >
                <MapPin size={12} className="text-slate-300" />
                {dest.name}
              </Link>
            ))}
          </div>
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
            Vizag's trusted outstation taxi service
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map(({ title, body }) => (
            <div
              key={title}
              className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-500 transition-colors duration-300 group-hover:bg-amber-400 group-hover:text-white">
                <ShieldCheck size={20} />
              </div>
              <h3 className="mt-4 font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Other services links                                        */}
      {/* ---------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
            Explore More
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
              { label: "Local Taxi", href: "/services/local-taxi" },
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
                <ArrowRight size={16} className="text-slate-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-amber-500" />
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
                "The price shown is a starting fare — the final amount depends on your exact destination and trip type.",
                "Toll, parking, and state permit charges are extra and shown separately in your invoice.",
                "Overnight halts include a driver allowance — ask our team for the exact amount for your route.",
                "Call or WhatsApp us with your destination for an exact, confirmed quote.",
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