import { useParams, Link } from "react-router-dom";
import {
  PhoneCall,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Car,
  Users,
  Briefcase,
} from "lucide-react";
import { services } from "../data/servicesData";
import { useBooking } from "../components/booking/BookingContext";
import SectionHeading from "../components/ui/SectionHeading";

/* ------------------------------------------------------------------ */
/*  Extra per-service copy (H2 tagline, long description, notes)      */
/*  Keyed by the same `slug` used in servicesData.ts                  */
/* ------------------------------------------------------------------ */

type ServiceDetailContent = {
  tagline: string;
  longDescription: string;
  highlights: string[];
  notes: string[];
};

const serviceDetailsContent: Record<string, ServiceDetailContent> = {
  "local-taxi": {
    tagline: "Your everyday ride around Vizag",
    longDescription:
      "From office commutes to shopping trips, hospital visits to a night out, our local taxi service keeps you moving around Visakhapatnam without the wait. Transparent fares, clean cars, and drivers who know every street in the city.",
    highlights: [
      "Point-to-point & hourly packages",
      "Available 24/7, including late nights",
      "Verified, background-checked drivers",
      "No surge pricing, ever",
    ],
    notes: [
      "Fare is calculated based on distance and time.",
      "Waiting charges apply after the first 10 minutes.",
      "Toll, parking, and state permit charges (if any) are extra.",
    ],
  },
  "outstation-taxi": {
    tagline: "One-way or round trip, we've got the distance covered",
    longDescription:
      "Heading out of the city? Whether it's a one-way drop or a round trip across Andhra Pradesh, our outstation service pairs you with an experienced highway driver and a well-maintained vehicle for a safe, comfortable ride.",
    highlights: [
      "One-way drops with no return fare charged",
      "Experienced highway & night drivers",
      "Sanitized, regularly serviced vehicles",
      "Flexible multi-day round trip packages",
    ],
    notes: [
      "One-way trips are charged only for the distance travelled.",
      "Round trips include a minimum daily kilometre package.",
      "Driver allowance, toll, and permit charges are extra.",
    ],
  },
  "airport-transfer": {
    tagline: "On time, every time",
    longDescription:
      "Never miss a flight or wait around at arrivals. Our airport transfer service tracks your flight status, and drivers arrive well ahead of time for pickups and are ready the moment you land.",
    highlights: [
      "Live flight tracking for pickups",
      "Meet & greet at arrivals",
      "Free waiting time on landing",
      "Fixed, upfront fares — no surprises",
    ],
    notes: [
      "Free waiting time of 45 minutes from flight landing.",
      "Fare is fixed for the selected route.",
      "Additional stops en route are chargeable.",
    ],
  },
  "tour-packages": {
    tagline: "Explore Andhra Pradesh, at your own pace",
    longDescription:
      "See the best of Andhra Pradesh with a tour package built around what you want to see. From Araku Valley to the temple towns, we plan the route, the stops, and the schedule — you just enjoy the ride.",
    highlights: [
      "Customizable multi-day itineraries",
      "Popular routes: Araku, Lambasingi, Annavaram & more",
      "Driver doubles as a local guide",
      "Comfortable sedans & SUVs for hill routes",
    ],
    notes: [
      "Itinerary and pricing depend on the destinations chosen.",
      "Entry tickets and guide fees (if any) are not included.",
      "Overnight halts include driver accommodation charges.",
    ],
  },
  "corporate-travel": {
    tagline: "Dependable travel for your business",
    longDescription:
      "From daily employee commutes to client pickups and event logistics, our corporate travel service is built for businesses that need reliability, professionalism, and simple monthly billing.",
    highlights: [
      "Monthly billing & dedicated account support",
      "Uniformed, professionally trained drivers",
      "Employee shuttle & roster-based booking",
      "Priority support for last-minute changes",
    ],
    notes: [
      "Corporate rates apply for monthly or bulk bookings.",
      "GST invoicing available on request.",
      "Custom SLAs available for regular contracts.",
    ],
  },
  "wedding-car-rentals": {
    tagline: "Arrive in style, on your big day",
    longDescription:
      "Your wedding day deserves a ride as memorable as the occasion. Choose from our premium fleet, decorated to your liking, with professional chauffeurs who understand the importance of punctuality on this day.",
    highlights: [
      "Premium sedans & luxury car options",
      "Optional decoration & ribbon setup",
      "Punctual, formally dressed chauffeurs",
      "Multi-car bookings for the full wedding party",
    ],
    notes: [
      "Advance booking is recommended for wedding dates.",
      "Decoration is available at an additional cost.",
      "Extra hours beyond the booked slot are chargeable.",
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Shared car fleet shown on every service detail page                */
/*  TODO: replace the `icon` with your actual car photos if you'd      */
/*  rather show images — swap <Icon /> below for an <img src={} />     */
/* ------------------------------------------------------------------ */

type CarOption = {
  name: string;
  category: string;
  seats: number;
  luggage: number;
  bestFor: string;
  features: string[];
  icon: typeof Car;
};

const carFleet: CarOption[] = [
  {
    name: "Hatchback",
    category: "Economy",
    seats: 4,
    luggage: 2,
    bestFor: "Solo & couple city rides",
    features: ["AC", "Music System", "Clean Interiors"],
    icon: Car,
  },
  {
    name: "Sedan",
    category: "Comfort",
    seats: 4,
    luggage: 3,
    bestFor: "Families & business trips",
    features: ["AC", "Extra Legroom", "Charging Ports"],
    icon: Car,
  },
  {
    name: "SUV",
    category: "Premium",
    seats: 6,
    luggage: 4,
    bestFor: "Group & outstation travel",
    features: ["AC", "3-Row Seating", "Ample Boot Space"],
    icon: Car,
  },
  {
    name: "Innova / Crysta",
    category: "Premium+",
    seats: 7,
    luggage: 5,
    bestFor: "Long trips & tour packages",
    features: ["AC", "Pushback Seats", "Extra Comfort"],
    icon: Car,
  },
];

/* ------------------------------------------------------------------ */
/*  Maps a service slug to the trip type used by the BookingContext   */
/*  (keep this in sync with the mapping used in ServicesGrid.tsx)     */
/* ------------------------------------------------------------------ */

const serviceToTab = {
  "local-taxi": "Local",
  "outstation-taxi": "Outstation",
  "airport-transfer": "Airport",
  "tour-packages": "Tour",
  "corporate-travel": "Local",
  "wedding-car-rentals": "Local",
} as const;

export default function ServiceDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { openBooking, setTripType } = useBooking();

  const service = services.find((s) => s.slug === slug);
  const details = slug ? serviceDetailsContent[slug] : undefined;

  const handleBookNow = () => {
    const tab = slug ? serviceToTab[slug as keyof typeof serviceToTab] : undefined;
    if (tab) setTripType(tab);
    openBooking({ resetTrip: !tab });
  };

  // Fallback for an unknown / missing slug
  if (!service || !details) {
    return (
      <section className="mx-auto flex max-w-2xl flex-col items-center px-6 py-32 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Service not found
        </h1>
        <p className="mt-3 text-slate-500">
          The service you're looking for doesn't exist or may have moved.
        </p>
        <Link
          to="/services"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-700"
        >
          <ArrowLeft size={18} />
          Back to all services
        </Link>
      </section>
    );
  }

  const { icon: Icon, title, description, image } = service;
  const { tagline, longDescription, highlights, notes } = details;

  return (
    <>
      {/* ---------------------------------------------------------- */}
      {/* Hero                                                       */}
      {/* ---------------------------------------------------------- */}
      <section className="relative mt-8 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-sky-50">
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <Link
            to="/services"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-primary"
          >
            <ArrowLeft size={16} />
            All services
          </Link>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary ring-1 ring-primary/20">
                <Icon size={18} />
                {title}
              </span>

              <h1 className="mt-6 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
                {title}
              </h1>

              <h2 className="mt-3 text-xl font-semibold text-primary">
                {tagline}
              </h2>

              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                {longDescription || description}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={handleBookNow}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700"
                >
                  Book Now
                  <ArrowRight size={18} />
                </button>

                <a
                  href="tel:+918886803322"
                  className="flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-8 py-4 font-bold text-slate-700 transition hover:border-primary hover:text-primary"
                >
                  <PhoneCall size={20} />
                  Call Now
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-[0_24px_48px_rgba(16,24,40,0.12)] ring-1 ring-slate-100">
                <img
                  src={image}
                  alt={title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Highlights strip */}
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur"
              >
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-primary" />
                <p className="text-sm font-medium text-slate-700">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Available cars                                              */}
      {/* ---------------------------------------------------------- */}
      <section className="w-full bg-slate-50/60 px-6 py-20 sm:px-10 lg:px-16">
        <SectionHeading eyebrow="Choose Your Ride" />
        <p className="-mt-8 mb-14 text-center text-base text-slate-500">
          Pick the car that suits your {title.toLowerCase()} best.
        </p>

        <div className="mx-auto grid max-w-[80em] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {carFleet.map((car) => (
            <article
              key={car.name}
              className="group flex flex-col rounded-3xl bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)] ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(16,24,40,0.12)] hover:ring-primary/15"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                <car.icon size={30} />
              </div>

              <h3 className="mt-5 text-center text-lg font-bold text-slate-900">
                {car.name}
              </h3>
              <p className="text-center text-xs font-bold uppercase tracking-wide text-primary/70">
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

              <p className="mt-3 text-center text-sm text-slate-500">
                {car.bestFor}
              </p>

              <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-4">
                {car.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-xs text-slate-600"
                  >
                    <CheckCircle2 size={14} className="shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={handleBookNow}
                className="mt-6 inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary/10 py-3 text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
              >
                Book Now
                <ArrowRight size={15} />
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Notes / terms                                               */}
      {/* ---------------------------------------------------------- */}
      <section className="mx-auto max-w-4xl px-6 py-20 sm:px-10 lg:px-16">
        <SectionHeading eyebrow="Good to Know" />

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <ul className="space-y-4">
            {notes.map((note) => (
              <li key={note} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" />
                <p className="text-sm leading-relaxed text-slate-600">{note}</p>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-4 border-t border-slate-100 pt-8">
            <button
              onClick={handleBookNow}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700"
            >
              Book Now
              <ArrowRight size={18} />
            </button>

            <a
              href="tel:+918886803322"
              className="flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-8 py-4 font-bold text-slate-700 transition hover:border-primary hover:text-primary"
            >
              <PhoneCall size={20} />
              +91 8886803322
            </a>
          </div>
        </div>
      </section>
    </>
  );
}