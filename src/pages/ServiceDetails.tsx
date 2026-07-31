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
  longDescription: React.ReactNode; // was `string` — now allows JSX (bold/italic keywords)
  highlights: string[];
  notes: string[];
};

const serviceDetailsContent: Record<string, ServiceDetailContent> = {
  "local-taxi": {
    tagline: "Book the Best Taxi in Vizag",
    longDescription: (
      <p>
        Looking for a <strong>taxi in Vizag</strong>? BSH Taxi Services provides the{" "}
        <i>best taxi service in Visakhapatnam (Vizag)</i> with affordable
        fares and 24/7 availability. Book a local taxi in Vizag for office
        commutes, airport transfers, railway station pickups, shopping
        trips, hospital visits, business travel, and sightseeing. Our
        experienced drivers, clean vehicles, and transparent pricing make
        us one of the most trusted taxi services in Vizag. Whether you
        need a local cab, airport taxi, or outstation taxi, BSH Taxi
        Services is ready to serve you anytime.
      </p>
    ),
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
    tagline: "Reliable Outstation Taxi Service in Vizag",
    longDescription: (
      <p>
        Planning a trip outside the city? BSH Taxi Services offers the
        best <strong>outstation taxi service in Vizag</strong> for one-way drops,
        round trips, and multi-day travel across Andhra Pradesh and
        nearby states. Whether you're traveling for business, family
        vacations, temple visits, or sightseeing, our outstation taxi in
        Vizag ensures a safe, comfortable, and affordable journey. We
        provide reliable one-way taxi and outstation cab services with
        experienced highway drivers, well-maintained vehicles,
        transparent pricing, and 24/7 customer support.{" "}
        <i>
          Popular routes include Vizag to Araku, Vizag to Tirupati, Vizag
          to Vijayawada, and Vizag to Hyderabad.
        </i>{" "}
        Book your outstation taxi in Vizag today and enjoy a hassle-free
        travel experience with BSH Taxi Services.
      </p>
    ),
    highlights: [
      "One-Way & Round Trip Taxi Service",
      "24/7 Outstation Cab Booking",
      "Experienced Highway Drivers",
      "Affordable Pricing with No Hidden Charges",
    ],
    notes: [
      "For one-way trips, the fare is calculated based on the total distance of both the onward and return journey.",
      "Round trips include a minimum daily kilometre package.",
      "Driver allowance, toll, and permit charges are extra.",
    ],
  },
  "airport-transfer": {
    tagline: "Reliable Airport Taxi Service in Vizag",
    longDescription: (
      <p>
        Need a reliable <strong>airport taxi in Vizag</strong>? BSH Taxi Services
        provides safe, affordable, and 24/7 airport transfer services to
        and from Visakhapatnam International Airport. Whether you're
        catching an early morning flight or arriving late at night, our
        professional drivers ensure on-time pickups and drop-offs with
        comfortable, well-maintained vehicles. We monitor your flight
        schedule to provide timely service, helping you avoid
        unnecessary waiting. Book your <i>airport taxi in Vizag</i>{" "}
        today for a smooth, hassle-free, and stress-free travel
        experience.
      </p>
    ),
    highlights: [
      "24/7 Airport Pickup & Drop Service",
      "On-Time Airport Transfers",
      "Flight Tracking for Timely Pickups",
      "Experienced & Professional Drivers",
    ],
    notes: [
      "Free waiting time of 30 minutes from flight landing.",
      "Fare is fixed for the selected route.",
      "Additional stops en route are chargeable.",
    ],
  },
  "tour-packages": {
    tagline: "Explore the Best Tour Packages from Vizag",
    longDescription: (
      <p>
        Discover the beauty of Andhra Pradesh with BSH Taxi Services'
        affordable and customizable{" "}
        <strong>tour packages from Vizag</strong>. Whether you're planning an{" "}
        <i>Araku Valley</i> tour, Lambasingi trip, Annavaram Temple
        visit, Simhachalam Darshan, Borra Caves adventure, or a family
        sightseeing tour, we provide safe, comfortable, and reliable
        travel. Our experienced drivers, well-maintained vehicles, and
        flexible itineraries ensure a hassle-free journey for families,
        couples, groups, and corporate travelers. Book the best tour
        package in Vizag today and explore Andhra Pradesh's top tourist
        destinations at your own pace with BSH Taxi Services.
      </p>
    ),
    highlights: [
      "Customized Vizag & Andhra Pradesh Tour Packages",
      "Popular Destinations: Araku, Lambasingi & Borra Caves",
      "Comfortable Vehicles with Experienced Drivers",
      "Affordable Packages with Flexible Itineraries",
    ],
    notes: [
      "Itinerary and pricing depend on the destinations chosen.",
      "Entry tickets and guide fees (if any) are not included.",
      "Overnight halts include driver allowance charges.",
    ],
  },
  "corporate-travel": {
    tagline: "Reliable Corporate Taxi Service in Vizag",
    longDescription: (
      <p>
        BSH Taxi Services provides reliable and professional{" "}
        <strong>corporate taxi services</strong> for businesses of all sizes.
        Whether you need employee transportation, executive travel,
        client pickups, airport transfers, or event transportation, our
        corporate cab service ensures safe, comfortable, and punctual
        journeys. With experienced drivers, well-maintained vehicles,
        flexible booking options, transparent pricing, and convenient
        monthly billing, we make business travel simple and
        hassle-free. Book the{" "}
        <i>best corporate taxi service in Visakhapatnam (Vizag)</i> and
        enjoy dependable transportation tailored to your company's
        needs.
      </p>
    ),
    highlights: [
      "Reliable Employee & Executive Transportation",
      "Corporate Airport Transfers & Client Pickups",
      "Flexible Monthly Billing with Transparent Pricing",
      "Professional Drivers & Well-Maintained Vehicles",
    ],
    notes: [
      "Corporate rates apply for monthly or bulk bookings.",
      "GST invoicing available on request.",
      "Custom SLAs available for regular contracts.",
    ],
  },
  "wedding-car-rentals": {
    tagline: "Luxury Wedding Car Rentals in Vizag",
    longDescription: (
      <p>
        Make your special day unforgettable with BSH Taxi Services'
        premium wedding <strong>car rental service in Vizag</strong>. We offer
        elegant, well-maintained wedding cars with professional
        chauffeurs to ensure a stylish, comfortable, and punctual
        arrival for your wedding ceremonies, receptions, engagements,
        and other special occasions. Whether you need a luxury sedan,
        SUV, or multiple vehicles for your family and guests, our{" "}
        <i>wedding car rental service</i> provides reliable
        transportation with flexible booking options and affordable
        pricing. Book the best wedding car rental in Visakhapatnam
        (Vizag) and celebrate your big day with comfort, elegance, and
        peace of mind.
      </p>
    ),
    highlights: [
      "Luxury Wedding Cars with Professional Chauffeurs",
      "Elegant Vehicles for Weddings & Special Events",
      "Punctual Service with Flexible Booking Options",
      "Affordable Wedding Car Rental in Vizag",
    ],
    notes: [
      "Vehicle availability is subject to advance booking.",
      "Decoration and floral arrangements are available on request at extra cost.",
      "Booking is confirmed only after advance payment.",
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

              {/* Changed from <p> to <div> since longDescription already
                  renders its own <p> — avoids invalid nested <p> tags */}
              <div className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                {longDescription || description}
              </div>

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