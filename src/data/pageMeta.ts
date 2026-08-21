export type PageMetaEntry = {
  title: string;
  description: string;
  keywords?: string[];
};

export const pageMeta: Record<string, PageMetaEntry> = {
  "/": {
    title: "Best Taxi Service in Visakhapatnam (Vizag)",
    description: "24/7 airport taxi, local cab, outstation trips & corporate travel in Vizag.",
    keywords: ["taxi service vizag", "cab booking visakhapatnam", "airport taxi vizag"],
  },
  "/services": {
    title: "Taxi Services in Vizag | Local, Airport & Outstation Cabs",
    description: "Explore local, outstation, airport, corporate & wedding car rental services in Visakhapatnam.",
    keywords: ["taxi services vizag", "cab types visakhapatnam"],
  },
  "/services/local-taxi": {
    title: "Local Taxi Service in Visakhapatnam",
    description: "Reliable local cab service across Vizag, available 24/7 for city rides and daily commutes.",
    keywords: ["local taxi vizag", "city cab visakhapatnam",
      "local taxi service in vizag",
                "local cab service in vizag",
                "local cab service in visakhapatnam",
                "local cabs in vizag",
                "vizag local cabs",
                "vizag city cabs",
                "city taxi service in vizag",
    ],
  },
  "/services/outstation-taxi": {
    title: "Outstation Taxi from Vizag | One-Way & Round Trips",
    description: "Book outstation taxis from Visakhapatnam for one-way or round trips at transparent pricing.",
    keywords: ["outstation taxi vizag", 
      "one way cab visakhapatnam",  
            
                "outstation cabs in vizag",
                "vizag outstation taxi",
                "outstation cab service in vizag",
                "outstation cabs in visakhapatnam",
                "outstation taxi from vizag",
                "one way taxi from vizag",
                "round trip taxi from vizag",
                "intercity taxi in vizag",

    ],
  },
  "/services/airport-transfer": {
    title: "Vizag Airport Taxi | Pickup & Drop",
    description: "24/7 airport taxi pickup and drop in Visakhapatnam. On-time, reliable, and easy to book.",
    keywords: ["vizag airport taxi", "airport cab visakhapatnam",
          "airport taxi in vizag",
                "vizag airport taxi",
                "visakhapatnam airport taxi",
                "airport cab service in vizag",
                "visakhapatnam airport cab service",
                "vizag airport cabs",
                "airport pickup and drop vizag",

    ],
  },
  "/services/tour-packages": {
    title: "Vizag Tour Packages & Sightseeing Taxi",
    description: "Custom tour packages for Araku Valley, Lambasingi, Simhachalam and more, with a taxi included.",
    keywords: ["vizag tour packages", "sightseeing taxi vizag"],
  },
  "/services/corporate-travel": {
    title: "Corporate Taxi & Employee Travel in Vizag",
    description: "Dependable corporate travel solutions for businesses in Visakhapatnam.",
    keywords: ["corporate taxi vizag", "employee transport visakhapatnam"],
  },
  "/services/wedding-car-rentals": {
    title: "Wedding Car Rentals in Vizag",
    description: "Decorated wedding cars and premium vehicle rentals for weddings in Visakhapatnam.",
    keywords: ["wedding car rental vizag", "decorated car visakhapatnam"],
  },
  "/fleet": {
    title: "Taxi Fleet in Vizag | Sedans, SUVs & Tempo Travellers",
    description: "Browse our fleet of sedans, SUVs, and tempo travellers available for hire in Vizag.",
    keywords: ["taxi fleet vizag", "tempo traveller visakhapatnam"],
  },
  "/destinations": {
    title: "Taxi Destinations from Vizag | Araku, Tirupati & More",
    description: "Popular destinations around Visakhapatnam you can reach with BSH Taxi Services.",
    keywords: ["vizag tourist places", "places near visakhapatnam"],
  },
  "/destinations/vizag-local": {
    title: "Vizag Local Sightseeing Taxi",
    description: "Explore Visakhapatnam city with a comfortable local sightseeing taxi package.",
    keywords: ["vizag local sightseeing", "city tour taxi visakhapatnam"],
  },
  "/destinations/simhachalam-temple": {
    title: "Taxi to Simhachalam Temple from Vizag",
    description: "Book a taxi to Simhachalam Temple with flexible pickup times and fair pricing.",
    keywords: ["simhachalam temple taxi", "vizag to simhachalam cab"],
  },
  "/destinations/vizag-airport": {
    title: "Taxi to Vizag Airport",
    description: "Direct airport taxi service to and from Visakhapatnam Airport, available 24/7.",
    keywords: ["vizag airport cab", "visakhapatnam airport taxi"],
  },
  "/destinations/araku-valley": {
    title: "Vizag to Araku Valley Taxi",
    description: "Comfortable taxi rides from Visakhapatnam to Araku Valley for day trips and sightseeing.",
    keywords: ["vizag to araku taxi", "araku valley cab booking",
        "taxi from visakhapatnam to araku",
        "visakhapatnam to araku taxi",
        "visakhapatnam to araku cabs",
         "araku cabs",
        "visakhapatnam to araku cab service",
        "araku tour packages",
        "vizag to araku cabs",
        "vizag to araku cab booking"

    ],
  },
  "/destinations/lambasingi": {
    title: "Vizag to Lambasingi Taxi",
    description: 'Book a taxi from Vizag to Lambasingi, the "Kashmir of Andhra Pradesh".',
    keywords: ["vizag to lambasingi taxi", "lambasingi cab booking"],
  },
  "/destinations/vanjangi-hills": {
    title: "Vizag to Vanjangi Hills Taxi | Sea of Clouds",
    description: "Taxi service to Vanjangi Hills from Vizag for the famous sea-of-clouds sunrise view.",
    keywords: ["vanjangi hills taxi", "vizag to vanjangi cab"],
  },
  "/destinations/annavaram-temple": {
    title: "Taxi to Annavaram Temple from Vizag",
    description: "Reliable taxi service from Visakhapatnam to Annavaram Temple.",
    keywords: ["annavaram temple taxi", "vizag to annavaram cab"],
  },
  "/destinations/arasavalli-temple": {
    title: "Taxi to Arasavalli Temple from Vizag",
    description: "Book a taxi from Vizag to the Arasavalli Sun Temple in Srikakulam.",
    keywords: ["arasavalli temple taxi", "vizag to srikakulam cab"],
  },
  "/destinations/tirupati": {
    title: "Vizag to Tirupati Taxi | Outstation Cab",
    description: "Long-distance outstation taxi from Visakhapatnam to Tirupati, comfortable and affordable.",
    keywords: ["vizag to tirupati taxi", "tirupati outstation cab"],
  },
  "/about": {
    title: "About BSH Taxi Services | Taxi Company in Vizag",
    description: "Learn about BSH Taxi Services, a local taxi company in Visakhapatnam offering city rides, airport transfers, outstation cabs and tour travel.",
    keywords: ["about bsh taxi services"],
  },
  "/contact": {
    title: "Contact BSH Taxi Services | Taxi Booking in Vizag",
    description: "Contact BSH Taxi Services for taxi bookings, airport transfers, outstation trips, tour packages and customer support in Vizag.",
    keywords: ["contact bsh taxi services", "vizag taxi phone number"],
  },
  "/privacy-policy": {
    title: "Privacy Policy",
    description: "Read the privacy policy for BSH Taxi Services.",
  },
  "/terms": {
    title: "Terms & Conditions",
    description: "Terms and conditions for using BSH Taxi Services.",
  },
};