import { useState, useEffect } from "react";
import { useParams, Link, Navigate, useLocation } from "react-router-dom";
/**
 * ROUTING — this component now serves TWO routes. Wherever your <Routes>
 * are declared (App.tsx / router.tsx), make sure BOTH of these point here:
 *
 *   <Route path="/services/:slug" element={<ServiceDetails />} />
 *   <Route path="/services/:slug/:pkg" element={<ServiceDetails />} />
 *
 * The second route is what makes /services/local-taxi/8hr-80km,
 * /services/outstation-taxi/one-way, etc. resolve as real, separate pages.
 */
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
import { pageMeta } from "../data/pageMeta";
import SEO from "../components/seo/SEO";

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
  tagline: "Affordable Local Taxi Service in Vizag",
  longDescription: (
    <p>
      Need a taxi for city travel? BSH Taxi Services offers the best{" "}
      <strong>local taxi service in Vizag</strong> for shopping trips, office
      commutes, hospital visits, sightseeing, and everyday errands around
      Visakhapatnam. Choose from flexible hourly packages with a fixed
      kilometre allowance, so you get a comfortable ride without worrying
      about surprise charges. Our local drivers know the city well and get
      you there quickly and safely. Book your{" "}
      <i>local taxi in Vizag</i> today for convenient, on-demand city
      travel with BSH Taxi Services.
    </p>
  ),
  highlights: [
    "Flexible Hourly & KM Packages",
    "On-Demand City Rides",
    "Local Drivers Who Know Vizag Well",
    "No Hidden Charges, Fixed Package Fares",
  ],
  notes: [
    "Package includes a fixed number of hours and kilometres; extra usage is billed as per the rate card.",
    "Waiting time beyond the package allowance is chargeable.",
    "Driver allowance applies for late-night bookings.",
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
        vacations, temple visits, or sightseeing,{" "}
        <a
          href="https://www.bshtaxiservices.com/destinations/tirupati?type=outstation-taxi-services"
          target="_blank"
          rel="noopener noreferrer"
          title="Outstation Taxi Service in Vizag - BSH Taxi Services"
          aria-label="Outstation Taxi Service in Vizag - BSH Taxi Services"
          className="hover:underline"
        >
          <em>our outstation taxi in Vizag</em>
        </a>{" "}
        ensures a safe, comfortable, and affordable journey. We
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
        provides safe, affordable, and 24/7{" "}
        <a
          href="https://www.bshtaxiservices.com/destinations/vizag-airport?type=airport-taxi"
          target="_blank"
          rel="noopener noreferrer"
          title="Airport Taxi Service in Vizag - BSH Taxi Services"
          aria-label="Airport Taxi Service in Vizag - BSH Taxi Services"
          className="hover:underline"
        >
          <i>airport transfer services</i>
        </a>{" "}
        to and from Visakhapatnam International Airport. Whether you're
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
/*  Fare types                                                        */
/* ------------------------------------------------------------------ */

type FareInfo = {
  rate: string; // headline price
  unit: string; // what the rate is per
  note: string; // small print under the rate
};

type CarTheme = {
  gradient: string; // badge background
  glow: string; // soft blurred glow behind the badge
  iconColor: string;
  ring: string;
  shadow: string; // colored drop-shadow matching the gradient
};

type CarPriceOption = {
  name: string;
  category: string;
  seats: number;
  luggage: number;
  icon: typeof Car;
  theme: CarTheme;
  /** Fares keyed by tab label. When a service has no tabs, use the "default" key. */
  fares: Record<string, FareInfo>;
};

/** Shared per-car branding so every service's fleet list looks consistent */
const carThemes: Record<string, { icon: typeof Car; theme: CarTheme }> = {
  Dzire: {
    icon: Car,
    theme: {
      gradient: "from-blue-500 to-sky-400",
      glow: "bg-blue-400/40",
      iconColor: "text-white",
      ring: "ring-blue-200",
      shadow: "shadow-blue-500/30",
    },
  },
  Ertiga: {
    icon: Car,
    theme: {
      gradient: "from-teal-500 to-emerald-400",
      glow: "bg-teal-400/40",
      iconColor: "text-white",
      ring: "ring-teal-200",
      shadow: "shadow-teal-500/30",
    },
  },
  "Innova Crysta": {
    icon: Car,
    theme: {
      gradient: "from-violet-500 to-purple-400",
      glow: "bg-violet-400/40",
      iconColor: "text-white",
      ring: "ring-violet-200",
      shadow: "shadow-violet-500/30",
    },
  },
  "Tempo Traveller": {
    icon: Car,
    theme: {
      gradient: "from-orange-500 to-amber-400",
      glow: "bg-orange-400/40",
      iconColor: "text-white",
      ring: "ring-orange-200",
      shadow: "shadow-orange-500/30",
    },
  },
};

/** Helper so each service's fleet definition stays short and readable */
function makeCar(
  name: keyof typeof carThemes,
  category: string,
  seats: number,
  luggage: number,
  fares: Record<string, FareInfo>
): CarPriceOption {
  const { icon, theme } = carThemes[name];
  return { name, category, seats, luggage, icon, theme, fares };
}

/* ------------------------------------------------------------------ */
/*  Per-service pricing configuration                                 */
/*  - `tabs`: null/[] => no tab switcher, show the "default" fare     */
/*  - each car's `fares` object is keyed by the matching tab label    */
/*  TODO: swap the numbers below for your real, current fares         */
/* ------------------------------------------------------------------ */

type ServiceFareConfig = {
  tabs: string[];
  fleet: CarPriceOption[];
};

const serviceFareConfig: Record<string, ServiceFareConfig> = {
  "local-taxi": {
  tabs: ["8hr - 80km", "10hr - 100km"],
  fleet: [
    makeCar("Dzire", "Sedan", 4, 2, {
      "8hr - 80km": { rate: "₹2,000", unit: "/pkg", note: "Extra km ₹13, extra hr ₹300" },
      "10hr - 100km": { rate: "₹2,500", unit: "/pkg", note: "Extra km ₹13, extra hr ₹300" },
    }),
    makeCar("Ertiga", "MUV", 6, 3, {
      "8hr - 80km": { rate: "₹2,400", unit: "/pkg", note: "Extra km ₹17, extra hr ₹350" },
      "10hr - 100km": { rate: "₹3,000", unit: "/pkg", note: "Extra km ₹17, extra hr ₹350" },
    }),
    makeCar("Innova Crysta", "Premium SUV", 7, 4, {
      "8hr - 80km": { rate: "₹2,900", unit: "/pkg", note: "Extra km ₹20, extra hr ₹400" },
      "10hr - 100km": { rate: "₹3,600", unit: "/pkg", note: "Extra km ₹20, extra hr ₹400" },
    }),
    makeCar("Tempo Traveller", "Group Travel", 17, 10, {
      "8hr - 80km": { rate: "₹4,800", unit: "/pkg", note: "Extra km ₹30, extra hr ₹800" },
      "10hr - 100km": { rate: "₹5,800", unit: "/pkg", note: "Extra km ₹30, extra hr ₹800" },
    }),
  ],
},
  /* ---------------- Outstation Taxi — One Way / Round Trip --------- */
  "outstation-taxi": {
    tabs: ["One Way", "Round Trip"],
    fleet: [
      makeCar("Dzire", "Sedan", 4, 2, {
        "One Way": { rate: "₹13", unit: "/km", note: "Min 300 km/day" },
        "Round Trip": { rate: "₹14", unit: "/km", note: "Min 300 km/day" },
      }),
      makeCar("Ertiga", "MUV", 6, 3, {
        "One Way": { rate: "₹16", unit: "/km", note: "Min 300 km/day" },
        "Round Trip": { rate: "₹17", unit: "/km", note: "Min 300 km/day" },
      }),
      makeCar("Innova Crysta", "Premium SUV", 7, 4, {
        "One Way": { rate: "₹19", unit: "/km", note: "Min 300 km/day" },
        "Round Trip": { rate: "₹20", unit: "/km", note: "Min 300 km/day" },
      }),
      makeCar("Tempo Traveller", "Group Travel", 17, 10, {
        "One Way": { rate: "₹29", unit: "/km", note: "Min 300 km/day" },
        "Round Trip": { rate: "₹30", unit: "/km", note: "Min 300 km/day" },
      }),
    ],
  },

  /* ---------------- Airport Transfer — no tabs, starts at ₹1000 ---- */
  "airport-transfer": {
    tabs: [],
    fleet: [
      makeCar("Dzire", "Sedan", 4, 2, {
        default: { rate: "₹2,500", unit: "/trip", note: "Starting fare, one-way" },
      }),
      makeCar("Ertiga", "MUV", 6, 3, {
        default: { rate: "₹3,000", unit: "/trip", note: "Starting fare, one-way" },
      }),
      makeCar("Innova Crysta", "Premium SUV", 7, 4, {
        default: { rate: "₹3,500", unit: "/trip", note: "Starting fare, one-way" },
      }),
      makeCar("Tempo Traveller", "Group Travel", 17, 10, {
        default: { rate: "₹8,000", unit: "/trip", note: "Starting fare, one-way" },
      }),
    ],
  },

  /* ---------------- Tour Packages — Half Day / Full Day ------------ */
  "tour-packages": {
    tabs: ["Half Day", "Full Day"],
    fleet: [
      makeCar("Dzire", "Sedan", 4, 2, {
        "Half Day": { rate: "₹1,800", unit: "/50km", note: "Extra km ₹13" },
        "Full Day": { rate: "₹3,000", unit: "/100km", note: "Extra km ₹13" },
      }),
      makeCar("Ertiga", "MUV", 6, 3, {
        "Half Day": { rate: "₹2,200", unit: "/50km", note: "Extra km ₹16" },
        "Full Day": { rate: "₹3,500", unit: "/100km", note: "Extra km ₹16" },
      }),
      makeCar("Innova Crysta", "Premium SUV", 7, 4, {
        "Half Day": { rate: "₹2,800", unit: "/50km", note: "Extra km ₹19" },
        "Full Day": { rate: "₹4,000", unit: "/100km", note: "Extra km ₹19" },
      }),
      makeCar("Tempo Traveller", "Group Travel", 17, 10, {
        "Half Day": { rate: "₹4,500", unit: "/50km", note: "Extra km ₹28" },
        "Full Day": { rate: "₹6,500", unit: "/100km", note: "Extra km ₹28" },
      }),
    ],
  },

  /* ---------------- Corporate Travel — One Way / Round Trip / Monthly */
  "corporate-travel": {
    tabs: ["One Way", "Round Trip", "Hourly", "Monthly"],
    fleet: [
      makeCar("Dzire", "Sedan", 4, 2, {
        "One Way": { rate: "₹13", unit: "/km", note: "Min 300 km/day" },
        "Round Trip": { rate: "₹14", unit: "/km", note: "Min 300 km/day" },
        Hourly: { rate: "₹300", unit: "/hr", note: "Min 8 hrs booking" },
        Monthly: { rate: "Contact us", unit: "", note: "Custom billing for regular routes" },
      }),
      makeCar("Ertiga", "MUV", 6, 3, {
        "One Way": { rate: "₹16", unit: "/km", note: "Min 300 km/day" },
        "Round Trip": { rate: "₹17", unit: "/km", note: "Min 300 km/day" },
        Hourly: { rate: "₹350", unit: "/hr", note: "Min 8 hrs booking" },
        Monthly: { rate: "Contact us", unit: "", note: "Custom billing for regular routes" },
      }),
      makeCar("Innova Crysta", "Premium SUV", 7, 4, {
        "One Way": { rate: "₹19", unit: "/km", note: "Min 300 km/day" },
        "Round Trip": { rate: "₹20", unit: "/km", note: "Min 300 km/day" },
        Hourly: { rate: "₹400", unit: "/hr", note: "Min 8 hrs booking" },
        Monthly: { rate: "Contact us", unit: "", note: "Custom billing for regular routes" },
      }),
      makeCar("Tempo Traveller", "Group Travel", 17, 10, {
        "One Way": { rate: "₹29", unit: "/km", note: "Min 300 km/day" },
        "Round Trip": { rate: "₹30", unit: "/km", note: "Min 300 km/day" },
        Hourly: { rate: "₹650", unit: "/hr", note: "Min 8 hrs booking" },
        Monthly: { rate: "Contact us", unit: "", note: "Custom billing for regular routes" },
      }),
    ],
  },

  /* ---------------- Wedding Car Rentals — 8 Hours / 10 Hours ------- */
  "wedding-car-rentals": {
    tabs: ["8 Hours", "10 Hours"],
    fleet: [
      makeCar("Dzire", "Sedan", 4, 2, {
        "8 Hours": { rate: "₹2,500", unit: "/80hr", note: "Extra km ₹13" },
        "10 Hours": { rate: "₹3,000", unit: "/10hr", note: "Extra km ₹13" },
      }),
      makeCar("Ertiga", "MUV", 6, 3, {
        "8 Hours": { rate: "₹3,000", unit: "/80hr", note: "Extra km ₹17" },
        "10 Hours": { rate: "₹3,500", unit: "/10hr", note: "Extra km ₹17" },
      }),
      makeCar("Innova Crysta", "Premium SUV", 7, 4, {
        "8 Hours": { rate: "₹3,500", unit: "/80hr", note: "Extra km ₹20" },
        "10 Hours": { rate: "₹4,000", unit: "/10hr", note: "Extra km ₹20" },
      }),
      makeCar("Tempo Traveller", "Group Travel", 17, 10, {
        "8 Hours": { rate: "₹8,000", unit: "/80hr", note: "Extra km ₹30" },
        "10 Hours": { rate: "₹8,000", unit: "/10hr", note: "Extra km ₹30" },
      }),
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Maps the `:pkg` route segment (used by the header's nested flyout  */
/*  links, e.g. /services/local-taxi/8hr-80km) to the matching fare    */
/*  tab label for each service slug.                                   */
/*  Keep these keys in sync with the path segments used in nav.ts.     */
/* ------------------------------------------------------------------ */

const packageParamToTab: Record<string, Record<string, string>> = {
  "local-taxi": {
  "8hr-80km": "8hr - 80km",
  "10hr-100km": "10hr - 100km",
},
  "outstation-taxi": {
    "one-way": "One Way",
    "round-trip": "Round Trip",
  },
  "tour-packages": {
    "half-day": "Half Day",
    "full-day": "Full Day",
  },
  "corporate-travel": {
    "one-way": "One Way",
    "round-trip": "Round Trip",
    hourly: "Hourly",
    monthly: "Monthly",
  },
  "wedding-car-rentals": {
    "8hr": "8 Hours",
    "10hr": "10 Hours",
  },
};

/** Resolve the initial/active tab for a slug from the `:pkg` route param,
 *  falling back to the service's first tab (or "default" when it has none). */
function resolveTab(
  slug: string | undefined,
  pkg: string | undefined,
  fareConfig: ServiceFareConfig | undefined
): string {
  if (!fareConfig) return "default";
  if (fareConfig.tabs.length === 0) return "default";

  const mappedTab = slug && pkg ? packageParamToTab[slug]?.[pkg] : undefined;
  if (mappedTab && fareConfig.tabs.includes(mappedTab)) {
    return mappedTab;
  }

  return fareConfig.tabs[0];
}

/* WhatsApp business number — keep in sync with the call number below */
const WHATSAPP_NUMBER = "918886803322";

/* Simple inline WhatsApp glyph so we don't need an extra icon package */
function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.004 2C6.486 2 2.01 6.477 2.01 11.996c0 2.115.664 4.078 1.796 5.688L2 22l4.443-1.767a9.94 9.94 0 0 0 5.561 1.674h.004c5.518 0 9.994-4.477 9.994-9.996C21.998 6.477 17.522 2 12.004 2zm0 18.16h-.003a8.13 8.13 0 0 1-4.156-1.14l-.298-.176-3.098 1.233.83-3.05-.194-.313a8.13 8.13 0 0 1-1.246-4.318c0-4.5 3.67-8.16 8.166-8.16 2.18 0 4.229.852 5.77 2.394a8.1 8.1 0 0 1 2.393 5.775c0 4.5-3.67 8.16-8.164 8.16z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Maps a service slug to the trip type used by the BookingContext   */
/*  (keep this in sync with the mapping used in ServicesGrid.tsx)     */
/* ------------------------------------------------------------------ */

const serviceToTab = {
  "outstation-taxi": "Outstation",
  "airport-transfer": "Airport",
  "tour-packages": "Tour",
  "corporate-travel": "Local",
  "wedding-car-rentals": "Local",
  "local-taxi": "Local",
} as const;

export default function ServiceDetails() {
  const { slug, pkg } = useParams<{ slug: string; pkg?: string }>();
  const { openBooking, setTripType } = useBooking();
  const { pathname } = useLocation();

  const fareConfig = slug ? serviceFareConfig[slug] : undefined;
  const hasTabs = !!fareConfig && fareConfig.tabs.length > 0;

  const service = services.find((s) => s.slug === slug);
  const details = slug ? serviceDetailsContent[slug] : undefined;

  // Look for an explicit pageMeta entry for this exact URL first (e.g. if
  // you later hand-write SEO copy for /services/local-taxi/8hr-80km). If
  // there isn't one yet, fall back to the base service's meta and derive a
  // package-specific title/description automatically so every package URL
  // still gets a distinct, non-duplicate <title> and meta description.
  const exactMeta = pageMeta[pathname];
  const baseMeta = slug ? pageMeta[`/services/${slug}`] : undefined;

  // Hooks must run unconditionally on every render (before any early
  // return), even for an invalid slug — resolveTab() safely no-ops when
  // fareConfig is undefined.
  const [activeTab, setActiveTab] = useState<string>(
    resolveTab(slug, pkg, fareConfig)
  );

  // Re-sync the active tab whenever the visitor lands on a different service
  // or package page (e.g. /services/local-taxi/8hr-80km vs /10hr-100km).
  useEffect(() => {
    setActiveTab(resolveTab(slug, pkg, fareConfig));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, pkg]);

  // Only a totally unknown service slug (no base meta at all) is a real 404.
  if (!service || !details || !baseMeta) {
    return <Navigate to="/services" replace />;
  }

  const packageLabel = hasTabs ? activeTab : null;

  const meta =
    exactMeta ??
    (packageLabel
      ? {
          ...baseMeta,
          title: `${service.title} — ${packageLabel} Package | BSH Taxi Services`,
          description: `${baseMeta.description} Viewing the ${packageLabel} ${service.title.toLowerCase()} package — fares, inclusions, and instant WhatsApp booking.`,
        }
      : baseMeta);

  const handleBookNow = () => {
    const tab = slug ? serviceToTab[slug as keyof typeof serviceToTab] : undefined;
    if (tab) setTripType(tab);
    openBooking({ resetTrip: !tab });
  };

  const getWhatsAppLink = (carName: string) => {
    const tripLabel = hasTabs ? activeTab : "";
    const message = `Hi BSH Taxi Services, I'd like to book a ${carName}${
      tripLabel ? ` for a ${tripLabel} trip` : ""
    }${title ? ` (${title})` : ""}. Please share availability and fare.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const { icon: Icon, title, description, image } = service;
  const { tagline, longDescription, highlights, notes } = details;

  return (
    <>
      <SEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        canonicalPath={pathname}
      />
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
                {hasTabs && (
                  <span className="block text-2xl font-bold text-primary sm:text-3xl">
                    {activeTab} Package
                  </span>
                )}
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

                <a
                  href={getWhatsAppLink("a car")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border-2 border-green-200 bg-green-50 px-8 py-4 font-bold text-green-700 transition hover:border-green-500 hover:bg-green-500 hover:text-white"
                >
                  <WhatsAppIcon size={20} />
                  WhatsApp
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
      {/* Price cards — tabs vary per service, some have none          */}
      {/* ---------------------------------------------------------- */}
      {fareConfig && (
        <section className="w-full bg-slate-50/60 px-6 py-20 sm:px-10 lg:px-16">
          <SectionHeading eyebrow="Transparent Pricing" />
          <p className="-mt-8 mb-10 text-center text-base text-slate-500">
            {hasTabs
              ? `Pick a trip type and see the fare for every car in our ${title.toLowerCase()} fleet.`
              : `Fares for every car in our ${title.toLowerCase()} fleet, starting at ${
                  fareConfig.fleet[0]?.fares.default?.rate ?? ""
                }.`}
          </p>

          {/* Tabs — only rendered when the service actually needs them */}
          {hasTabs && (
            <div className="mx-auto mb-12 flex max-w-2xl flex-wrap items-center justify-center gap-3">
              {fareConfig.tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "border-2 border-slate-200 bg-white text-slate-600 hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}

          {/* Price cards */}
          <div className="mx-auto grid max-w-[80em] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {fareConfig.fleet.map((car) => {
              const fare = car.fares[hasTabs ? activeTab : "default"];
              if (!fare) return null;

              return (
                <article
                  key={car.name}
                  className="group flex flex-col rounded-3xl bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)] ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(16,24,40,0.12)] hover:ring-primary/15"
                >
                  <div className="relative mx-auto h-20 w-20">
                    <div
                      className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${car.theme.gradient} shadow-md transition-transform duration-300 group-hover:-translate-y-1`}
                    >
                      <car.icon size={32} className={car.theme.iconColor} strokeWidth={2} />
                    </div>
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

                  {/* Fare for the selected tab (or the single default fare) */}
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

                  <div className="mt-5 flex flex-col gap-2">
                    <button
                      onClick={handleBookNow}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary/10 py-3 text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
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
      )}

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

            <a
              href={getWhatsAppLink("a car")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border-2 border-green-200 bg-green-50 px-8 py-4 font-bold text-green-700 transition hover:border-green-500 hover:bg-green-500 hover:text-white"
            >
              <WhatsAppIcon size={20} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}