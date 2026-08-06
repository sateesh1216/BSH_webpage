/* ------------------------------------------------------------------ */
/*  src/data/outstationDestinations.data.ts                            */
/*                                                                      */
/*  Full per-destination content for every outstation route, keyed    */
/*  by slug. This is separate from the taxi-page fleet/pricing data   */
/*  (outstationTaxidata.ts) and separate from DestinationPage.tsx —   */
/*  DestinationPage.tsx should import and look up from this file by   */
/*  its `:slug` param (and `type=outstation-taxi-services`), nothing  */
/*  here changes that component.                                      */
/*                                                                      */
/*  ⚠️ TODO: km / duration / fromPrice below are estimated placeholder */
/*  values based on approximate road distance from Vizag. Replace     */
/*  with your confirmed operational figures before going live.        */
/* ------------------------------------------------------------------ */

export type OutstationDestination = {
  slug: string;
  name: string;
  km: string;
  duration: string;
  fromPrice: string;
  tagline: string;
  highlights: string[];
  hot?: boolean;
};

export const outstationDestinations: OutstationDestination[] = [
  {
    slug: "amadalavalasa",
    name: "Amadalavalasa",
    km: "90 KM",
    duration: "2-2.5 Hours",
    fromPrice: "₹3,600",
    tagline: "A quick highway run north of Vizag on the way to Srikakulam district.",
    highlights: ["Short highway drive", "Good day-trip option", "En route to Srikakulam"],
  },
  {
    slug: "annavaram",
    name: "Annavaram",
    km: "125 KM",
    duration: "3 Hours",
    fromPrice: "₹4,200",
    tagline: "Home to the Sri Veera Venkata Satyanarayana Swamy Temple atop Ratnagiri hill.",
    highlights: ["Popular pilgrimage stop", "Hill-top temple", "Comfortable half-day trip"],
  },
  {
    slug: "araku-valley",
    name: "Araku Valley",
    km: "120 KM",
    duration: "3-4 Hours",
    fromPrice: "₹5,000",
    tagline: "Scenic hill station known for coffee plantations, valleys, and the Borra Caves route.",
    highlights: ["Most requested outstation trip", "Coffee plantation views", "Borra Caves nearby"],
    hot: true,
  },
  {
    slug: "arasavalli",
    name: "Arasavalli",
    km: "110 KM",
    duration: "2.5-3 Hours",
    fromPrice: "₹4,000",
    tagline: "Coastal temple town near Srikakulam, home to the Sun God temple.",
    highlights: ["Sun temple visit", "Close to Srikakulam town", "Easy day trip"],
  },
  {
    slug: "bangalore",
    name: "Bangalore",
    km: "1,050 KM",
    duration: "18-19 Hours",
    fromPrice: "₹26,500",
    tagline: "Long-distance interstate run — best suited for a driver-swap or overnight halt trip.",
    highlights: ["Overnight halt recommended", "Ideal for relocation trips", "Multi-day return option"],
  },
  {
    slug: "bhadrachalam",
    name: "Bhadrachalam",
    km: "330 KM",
    duration: "6-7 Hours",
    fromPrice: "₹9,200",
    tagline: "Temple town on the banks of the Godavari, popular for Ram Navami pilgrimage travel.",
    highlights: ["Godavari riverside temple", "Popular pilgrimage route", "Full-day drive"],
  },
  {
    slug: "bhubaneswar",
    name: "Bhubaneswar",
    km: "450 KM",
    duration: "8-9 Hours",
    fromPrice: "₹11,800",
    tagline: "Odisha's capital city — a common onward stop for travellers heading to Puri.",
    highlights: ["Gateway to Odisha", "Temple city stopover", "Can be combined with Puri"],
  },
  {
    slug: "bobbili",
    name: "Bobbili",
    km: "180 KM",
    duration: "4 Hours",
    fromPrice: "₹5,600",
    tagline: "Historic town in Vizianagaram district known for its fort and veena craftsmanship.",
    highlights: ["Bobbili Fort visit", "Half-day highway drive", "Vizianagaram district route"],
  },
  {
    slug: "chennai",
    name: "Chennai",
    km: "800 KM",
    duration: "14-15 Hours",
    fromPrice: "₹19,800",
    tagline: "Long interstate highway trip along the East Coast Road corridor.",
    highlights: ["Overnight travel recommended", "East coast highway route", "Best for one-way drops"],
  },
  {
    slug: "eluru",
    name: "Eluru",
    km: "215 KM",
    duration: "4-5 Hours",
    fromPrice: "₹6,200",
    tagline: "West Godavari district hub, a convenient stop on the way to Vijayawada.",
    highlights: ["West Godavari district", "Comfortable single-day drive", "Near Vijayawada"],
  },
  {
    slug: "guntur",
    name: "Guntur",
    km: "270 KM",
    duration: "5-6 Hours",
    fromPrice: "₹7,800",
    tagline: "Major commercial city in the Krishna–Guntur belt, well connected by highway.",
    highlights: ["Business & family travel", "Full highway route", "Near Vijayawada & Mangalagiri"],
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    km: "620 KM",
    duration: "11-12 Hours",
    fromPrice: "₹17,000",
    tagline: "One of our most booked long-distance routes, ideal for business trips and relocation.",
    highlights: ["Overnight halt option", "Popular business route", "Relocation-friendly"],
    hot: true,
  },
  {
    slug: "ichchapuram",
    name: "Ichchapuram",
    km: "150 KM",
    duration: "3.5 Hours",
    fromPrice: "₹4,800",
    tagline: "Border town toward Odisha, a convenient stop before crossing into Berhampur.",
    highlights: ["Andhra–Odisha border town", "Coastal highway drive", "Half-day trip"],
  },
  {
    slug: "jagdalpur",
    name: "Jagdalpur",
    km: "380 KM",
    duration: "8-9 Hours",
    fromPrice: "₹10,500",
    tagline: "Gateway to Chhattisgarh's Bastar region, known for waterfalls and tribal culture.",
    highlights: ["Bastar region gateway", "Waterfall sightseeing route", "Full-day drive"],
  },
  {
    slug: "kakinada",
    name: "Kakinada",
    km: "160 KM",
    duration: "3-4 Hours",
    fromPrice: "₹4,500",
    tagline: "Coastal port city in East Godavari, popular for business and beach visits.",
    highlights: ["Port city visit", "Beach & business travel", "Comfortable day trip"],
  },
  {
    slug: "khammam",
    name: "Khammam",
    km: "330 KM",
    duration: "6-7 Hours",
    fromPrice: "₹9,200",
    tagline: "Telangana town well connected on the route toward Hyderabad.",
    highlights: ["En route to Hyderabad", "Full-day highway drive", "Telangana district hub"],
  },
  {
    slug: "kolkata",
    name: "Kolkata",
    km: "900 KM",
    duration: "16-17 Hours",
    fromPrice: "₹22,500",
    tagline: "Major interstate route along NH16 — best planned as an overnight or multi-day trip.",
    highlights: ["Overnight halt required", "NH16 highway corridor", "Best for one-way drops"],
  },
  {
    slug: "kurnool",
    name: "Kurnool",
    km: "600 KM",
    duration: "10-11 Hours",
    fromPrice: "₹16,200",
    tagline: "Rayalaseema city on the route toward Karnataka, a long single-day drive.",
    highlights: ["Rayalaseema region", "Long single-day drive", "En route to Karnataka"],
  },
  {
    slug: "lambasingi",
    name: "Lambasingi",
    km: "100 KM",
    duration: "3-3.5 Hours",
    fromPrice: "₹4,600",
    tagline: "Andhra's 'Kashmir of the East' — known for misty mornings and cool weather.",
    highlights: ["Scenic hill drive", "Best visited early morning", "Combine with Araku Valley"],
  },
  {
    slug: "narsipatnam",
    name: "Narsipatnam",
    km: "65 KM",
    duration: "1.5-2 Hours",
    fromPrice: "₹2,800",
    tagline: "Quick nearby town trip, often used as a stop on the way to Araku.",
    highlights: ["Short quick trip", "En route to Araku Valley", "Good for half-day plans"],
  },
  {
    slug: "nellore",
    name: "Nellore",
    km: "570 KM",
    duration: "10 Hours",
    fromPrice: "₹15,500",
    tagline: "South coastal Andhra city, a long single-day highway drive.",
    highlights: ["Long coastal highway drive", "South AP route", "Single-day travel"],
  },
  {
    slug: "palakollu",
    name: "Palakollu",
    km: "230 KM",
    duration: "5 Hours",
    fromPrice: "₹6,600",
    tagline: "West Godavari town known for its temples and delta scenery.",
    highlights: ["Godavari delta route", "Temple visits", "Comfortable day trip"],
  },
  {
    slug: "palakonda",
    name: "Palakonda",
    km: "140 KM",
    duration: "3.5 Hours",
    fromPrice: "₹4,700",
    tagline: "Srikakulam district town on the route toward the Odisha border.",
    highlights: ["Srikakulam district", "Border-area route", "Half-day drive"],
  },
  {
    slug: "palasa",
    name: "Palasa",
    km: "160 KM",
    duration: "3.5-4 Hours",
    fromPrice: "₹5,000",
    tagline: "Coastal cashew-belt town near the Andhra–Odisha border.",
    highlights: ["Cashew belt region", "Coastal highway drive", "Near Odisha border"],
  },
  {
    slug: "parvathipuram",
    name: "Parvathipuram",
    km: "170 KM",
    duration: "4 Hours",
    fromPrice: "₹5,300",
    tagline: "Vizianagaram district town on the route toward Odisha's interior.",
    highlights: ["Vizianagaram district", "Interior highway route", "Half-day drive"],
  },
  {
    slug: "raipur",
    name: "Raipur",
    km: "600 KM",
    duration: "11-12 Hours",
    fromPrice: "₹16,500",
    tagline: "Chhattisgarh's capital, reachable via the Jagdalpur highway corridor.",
    highlights: ["Chhattisgarh capital", "Overnight halt recommended", "Long interstate drive"],
  },
  {
    slug: "rajahmundry",
    name: "Rajahmundry",
    km: "200 KM",
    duration: "4-5 Hours",
    fromPrice: "₹5,200",
    tagline: "Cultural capital of the Godavari districts, on the banks of the river Godavari.",
    highlights: ["Godavari riverfront city", "Popular family route", "Comfortable day trip"],
  },
  {
    slug: "ravulapalem",
    name: "Ravulapalem",
    km: "180 KM",
    duration: "4 Hours",
    fromPrice: "₹5,600",
    tagline: "East Godavari junction town on the way to Konaseema.",
    highlights: ["Gateway to Konaseema", "Godavari district route", "Half-day drive"],
  },
  {
    slug: "razam",
    name: "Razam",
    km: "130 KM",
    duration: "3 Hours",
    fromPrice: "₹4,300",
    tagline: "Srikakulam district town along the northern highway corridor.",
    highlights: ["Srikakulam district", "Quick highway trip", "Half-day plan"],
  },
  {
    slug: "sompeta",
    name: "Sompeta",
    km: "155 KM",
    duration: "3.5 Hours",
    fromPrice: "₹4,900",
    tagline: "Coastal town in Srikakulam district, close to the Odisha border.",
    highlights: ["Coastal route", "Near Odisha border", "Half-day drive"],
  },
  {
    slug: "srikakulam",
    name: "Srikakulam",
    km: "110 KM",
    duration: "2.5-3 Hours",
    fromPrice: "₹4,000",
    tagline: "District headquarters town, a frequent short outstation run from Vizag.",
    highlights: ["District headquarters", "Frequent short trip", "Comfortable half-day"],
  },
  {
    slug: "srimukhalingam",
    name: "Srimukhalingam",
    km: "150 KM",
    duration: "3.5 Hours",
    fromPrice: "₹4,800",
    tagline: "Historic temple town in Srikakulam district, known for ancient Shiva temples.",
    highlights: ["Ancient temple town", "Heritage sightseeing", "Half-day trip"],
  },
  {
    slug: "tirupati",
    name: "Tirupati",
    km: "780 KM",
    duration: "13-14 Hours",
    fromPrice: "₹19,500",
    tagline: "Home to the Sri Venkateswara Temple — our most requested long-distance pilgrimage route.",
    highlights: ["Top pilgrimage route", "Overnight halt recommended", "Darshan trip planning support"],
    hot: true,
  },
  {
    slug: "tuni",
    name: "Tuni",
    km: "90 KM",
    duration: "2-2.5 Hours",
    fromPrice: "₹3,600",
    tagline: "East Godavari town on the highway toward Kakinada and Rajahmundry.",
    highlights: ["Short highway drive", "En route to Kakinada", "Good half-day trip"],
  },
  {
    slug: "vijayawada",
    name: "Vijayawada",
    km: "350 KM",
    duration: "7-8 Hours",
    fromPrice: "₹9,600",
    tagline: "Andhra Pradesh's business hub on the Krishna river — a heavily booked route.",
    highlights: ["High-demand business route", "Krishna riverside city", "Comfortable single-day drive"],
    hot: true,
  },
  {
    slug: "vizianagaram",
    name: "Vizianagaram",
    km: "65 KM",
    duration: "1.5-2 Hours",
    fromPrice: "₹2,800",
    tagline: "Nearby district headquarters, one of the quickest outstation runs from Vizag.",
    highlights: ["Shortest outstation trip", "District headquarters", "Quick round trip possible"],
  },
];

/* ------------------------------------------------------------------ */
/*  Helper — look this up from DestinationPage.tsx via :slug param    */
/*  without modifying that component.                                  */
/* ------------------------------------------------------------------ */
export function getOutstationDestinationBySlug(
  slug: string
): OutstationDestination | undefined {
  return outstationDestinations.find((d) => d.slug === slug);
}