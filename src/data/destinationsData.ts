// Temporary fallback while you source the real destination photos above.
// Once downloaded, swap these imports for the real files with matching names.

import Aruku from "../assets/Destinations/araku-taxi-services-bshtaxiservices.webp";
import lambasingi from "../assets/Destinations/Lambasingi-taxi-services-bshtaxiservices.webp";
import VizagLocal from "../assets/Destinations/Vizag_local-taxi-services-bshtaxiservices.webp";
import Simhachalam  from "../assets/Destinations/Simhachalam-Temple-taxi-services-bshtaxiservices.webp";
import Tirupati  from "../assets/Destinations/Tirupati-taxi-service-Packages-bshtaxiservices.webp";
import Annavaram  from "../assets/Destinations/Annavaram_Temple-taxi-services-bshtaxiservices.webp";
import vizagairport  from "../assets/Destinations/Airport-taxi-services-bshtaxiservices.webp";
import Vanjangi  from "../assets/Destinations/Vanjangi-taxi-services-bshtaxiservices.webp";
import Arasavalli  from "../assets/Destinations/Arasavalli_Temple-taxi-services-bshtaxiservices.webp";
import Borracaves  from "../assets/Destinations/Araku/Borra_Caves-taxi-services-bshtaxiservices.webp";
import Katikawaterfalls  from "../assets/Destinations/Araku/Katika_Waterfalls-taxi-services-bshtaxiservices.webp";
import Galikondaviewpoint  from "../assets/Destinations/Araku/araku-Galikonda_Viewpoint-taxi-services-bshtaxiservices.webp";
import Coffeeplantation  from "../assets/Destinations/Araku/araku-coffee_plantation-wooden_bridge-taxi-services-bshtaxiservices.webp";
import Coffeemuseum  from "../assets/Destinations/Araku/araku-Coffee_Museum-taxi-services-bshtaxiservices.webp";
import Tribalmuseum  from "../assets/Destinations/Araku/Araku-Tribal_Museum-taxi-services-bshtaxiservices.webp";
import Padmapuramgardens  from "../assets/Destinations/Araku/Araku-Padmapuram_Gardens-taxi-services-bshtaxiservices.webp";
import Damukuviewpoint  from "../assets/Destinations/Araku/Araku-Damuku_View_Point-taxi-services-bshtaxiservices.webp";


// import Coffeehouse  from "../assets/Destinations/Araku/araku-coffee house-taxi-services-bshtaxiservices.png"; --- IGNORE ---
export type DestinationPlace = {
  name: string;
  image: string;
  tag?: string;
  description?: string;
};

export type QuickFact = {
  label: string;
  value: string;
};


export type Destination = {
  slug: string;
  name: string;
  image: string;

  distanceFromVizag: string;
  distanceKm: number;        // was optional — now required
  driveTime?: string;
  sources?: string[];

  description: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];

  tagline?: string;
  costPerDay?: number;
  importantNotes?: string[];
  places?: DestinationPlace[];

  category:                  // was optional — now required
    | "Hill Station"
    | "Nature & Caves"
    | "Beach"
    | "Temple"
    | "Transit"
    | "Heritage & Buddhist Site"
    | "Pilgrimage";

  history?: string;
  highlights?: string[];
  quickFacts?: QuickFact[];
  bestTimeToVisit?: string;
  howToReach?: string;
  funFact?: string;
};

export const destinations: Destination[] = [
  {
    slug: "araku-valley",
    name: "Araku Valley",
    image: Aruku, // replace with "../assets/destinations/araku-valley.jpg"
    distanceFromVizag: "250 KM from vizag to araku round trip",
    distanceKm: 250,
    driveTime: "10 hrs",
    sources: ["AP Tourism", "Wikipedia"],
    category: "Hill Station",
    description:
      "A beautiful hill station in Andhra Pradesh, famous for its lush coffee plantations, breathtaking valleys, misty hills, and stunning waterfalls.",
    seoTitle: "Vizag to Araku Valley Taxi | One Day Trip Package | BSH Taxi Services",
    seoDescription:
      "Book Vizag to Araku Valley taxi with BSH Taxi Services. Affordable one-way, round-trip & one-day tour packages covering Borra Caves. AC cabs, 24/7 booking.",
    keywords: [
      "vizag to araku valley taxi",
      "vizag to araku one day trip taxi",
      "araku valley taxi fare from vizag",
      "araku valley cab booking online",
      "visakhapatnam to araku taxi package price",
      "araku valley outstation taxi service",
      "araku coffee plantation tour taxi",
      "vizag araku borra caves combo taxi",
      "araku valley round trip taxi vizag",
      "best taxi service araku valley vizag",
      "innova crysta taxi vizag to araku",
      "araku valley sightseeing cab package",
    ],
    tagline: "Escape to Nature, Enjoy the Journey!",
    costPerDay: 5000,
    history:
      "Tucked into the Eastern Ghats near the Odisha border, Araku Valley has been home to indigenous Adivasi communities for centuries, long before it appeared on any tourist map. Surrounded by the Ananthagiri and Sunkarimetta reserve forests and ringed by the Raktakonda, Chitamogondi, Galikonda and Sunkarimetta hills, the valley sits at an average elevation of roughly 900–1,300 metres. Galikonda is the tallest hill in Andhra Pradesh, giving the valley some of its most dramatic viewpoints.\n\nModern tourism took off in the early 1960s when the South Central Railway carved out the Kirandul–Araku line, an engineering feat of dozens of tunnels and bridges through the Eastern Ghats that turned the journey itself into an attraction. Coffee arrived a little earlier: the Andhra Pradesh Forest Department introduced Arabica cultivation in the 1950s to give tribal farmers a sustainable livelihood, growing the beans in the shade of silver oak trees exactly as it's still done today. In 2007, tribal growers launched Araku Emerald, India's first organic coffee brand from indigenous farmers, which has since earned a GI tag and international recognition.\n\nBeyond coffee, Araku's culture is built around its tribal roots — the Dhimsa folk dance, weekly tribal shandies (markets) selling bamboo crafts and jewellery, and festivals like Itika Pongal keep that heritage very much alive.",
    highlights: [
      "GI-tagged organic Araku Emerald coffee",
      "Home to Andhra Pradesh's tallest hill, Galikonda",
      "One of India's most scenic train routes (58+ tunnels)",
      "Rich Adivasi tribal culture & Dhimsa dance",
    ],
    quickFacts: [
      { label: "Altitude", value: "900–1,300 m" },
      { label: "Best Time", value: "Aug – Mar" },
      { label: "District", value: "Alluri Sitharama Raju" },
      { label: "Known For", value: "Coffee & Tribal Culture" },
    ],
    bestTimeToVisit:
      "August to March is the best time to visit Araku Valley from Vizag. During these months, the cool climate, mist-covered hills, lush coffee plantations, and scenic landscapes make Araku one of the top tourist destinations in Andhra Pradesh.",
    howToReach:
      "Araku Valley is easily accessible from Visakhapatnam (Vizag) by road or rail. Book your Vizag to Araku Valley taxi with BSH Taxi Services for a comfortable journey through the Eastern Ghats, scenic ghat roads, lush coffee plantations, and the famous Borra Caves. Travelers can also enjoy the iconic Vizag–Araku passenger train, one of the most scenic railway routes in Andhra Pradesh.",
    funFact:
      "Araku's coffee story began with the British in the early 1900s, but it was tribal cooperatives who turned it into a globally recognised, organic, GI-tagged brand.",
    importantNotes: [
      "The above prices do not include tolls, entry fees, or parking fees (excluding driver food).",
      "During standby and ghat roads, the cabin A/C will be turned off to ensure safe driving power.",
    ],
    places: [
         {
        name: "Damuku View Point",
        image: Damukuviewpoint,
        description: "Damuku View Point is one of the best viewpoints in Araku Valley, offering breathtaking panoramic views of lush green valleys and rolling hills. A perfect destination near Vizag for photography, nature lovers, and scenic sightseeing.",
      },
      {
        name: "Borra Caves",
        image: Borracaves,
        description:
          "Borra Caves is one of the most famous tourist attractions near Araku Valley, known for its million-year-old limestone formations, stunning stalactites, and stalagmites. A must-visit destination on your Vizag to Araku trip with BSH Taxi Services.",
      },
      {
        name: "Katika Waterfalls",
        image: Katikawaterfalls,
        tag: "Only Car Parking",
        description: "Katiki Waterfalls, located near Borra Caves in Araku Valley, is a beautiful natural waterfall surrounded by lush forests. This scenic attraction is perfect for adventure lovers and nature enthusiasts visiting from Vizag.",
      },
      {
        name: "Galikonda Viewpoint",
        image: Galikondaviewpoint,
        description: "Galikonda Viewpoint, one of the highest viewpoints in Andhra Pradesh, offers spectacular sunrise views, mist-covered mountains, and breathtaking landscapes. It's a must-visit attraction on your Vizag to Araku Valley tour.",
      },
      {
        name: "Coffee Plantation",
        image: Coffeeplantation,
        description: "Explore the famous Araku Valley Coffee Plantations, known for their premium organic Arabica coffee and picturesque green landscapes. A visit to these plantations offers an authentic experience of Andhra Pradesh's coffee culture near Vizag.",
      },
      {
        name: "Coffee Museum",
        image: Coffeemuseum,
        description: "Visit the Araku Coffee Museum and experience the story of India's famous Araku Coffee. Enjoy coffee tastings, handcrafted chocolates, and explore the rich coffee culture of Araku Valley with BSH Taxi Services from Vizag.",
      },
      {
        name: "Tribal Museum",
        image: Tribalmuseum,
        description: "Explore the Araku Tribal Museum, one of the best cultural attractions in Araku Valley, showcasing tribal traditions, handicrafts, art, and the unique heritage of the Eastern Ghats in Andhra Pradesh.",
      },
      {
        name: "Padmapuram Gardens",
        image: Padmapuramgardens,
        description: "Discover the beauty of Padmapuram Gardens in Araku Valley, featuring lush botanical gardens, tree-top cottages, colorful flowers, and a toy train. A must-visit tourist destination near Vizag for families and nature lovers.",
      },
   
      // {
      //   name: "Coffee House",
      //   image: Coffeehouse,
      //   description: "A cosy stop for a fresh cup of locally grown filter coffee before heading back.",
      // },
    ],
  },
{
    slug: "lambasingi",
    name: "Lambasingi",
    image: lambasingi, // replace with "../assets/destinations/lambasingi.jpg"
    distanceFromVizag: "350 KM from vizag to lambasingi round trip",
    distanceKm: 350,
    driveTime: "10 hrs",
    sources: ["AP Tourism", "Wikipedia", "Trawell"],
    category: "Hill Station",
    description:
      "Lambasingi, known as the \"Kashmir of Andhra Pradesh,\" is famous for its cool climate, misty mornings, lush greenery, and breathtaking landscapes. It's one of the top weekend getaway destinations near Visakhapatnam (Vizag).",
    seoTitle: "Vizag to Lambasingi Taxi | Kashmir of Andhra Pradesh | BSH Taxi Services",
    seoDescription:
      "Reliable taxi service from Visakhapatnam to Lambasingi, the Kashmir of Andhra Pradesh. Affordable weekend trip & sightseeing cab packages, booked online 24/7.",
    keywords: [
      "vizag to lambasingi taxi",
      "lambasingi cab service from vizag",
      "kashmir of andhra pradesh taxi booking",
      "visakhapatnam to lambasingi taxi fare",
      "lambasingi weekend trip taxi package",
      "vizag to lambasingi one day trip cab",
      "lambasingi araku combo taxi package",
      "lambasingi sunrise view point taxi",
      "outstation cab vizag to lambasingi",
      "lambasingi tour package taxi price",
      "innova crysta taxi vizag to lambasingi",
      "lambasingi strawberry farm taxi package",
    ],
    tagline: "Where South India Feels Like the Himalayas!",
    costPerDay: 5500,
    history:
      "Locally known as \"Korra Bayalu\" — meaning that anyone left out in the open overnight would freeze stiff by morning — Lambasingi is a small hamlet in the Chintapalle mandal of the Alluri Sitharama Raju district, perched at around 1,000–1,025 metres in the Eastern Ghats. What makes it famous is something almost unheard of in a tropical state: on winter mornings, temperatures here can fall close to, and occasionally below, freezing point, making it the only place in South India known to see frost-like conditions and, rarely, snowfall.\n\nFor years Lambasingi stayed a quiet farming village, its slopes given over to coffee, pepper, strawberries, dragon fruit and other orchard crops grown in the cool micro-climate. Word of its unusual winter chill spread mostly by travellers' accounts, and the village has only recently grown into an organised weekend getaway, still refreshingly free of the crowds and commercial sprawl found at bigger hill stations. Nearby attractions like Thajangi Reservoir and Kothapalli Waterfalls have since turned the region into a fuller weekend circuit rather than just a sunrise stopover.",
    highlights: [
      "The only place in South India with near-freezing winters",
      "Coffee, pepper, strawberry & dragon fruit farms",
      "Still largely untouched by mass tourism",
      "Spectacular fog-laced sunrise viewpoints",
    ],
    quickFacts: [
      { label: "Altitude", value: "~1,000-1,025 m" },
      { label: "Best Time", value: "Nov – Jan" },
      { label: "Mandal", value: "Chintapalle" },
      { label: "Known For", value: "Freezing Winter Mornings" },
    ],
    bestTimeToVisit:
      "November to January is the best time to visit Lambasingi from Vizag, when the weather is at its coolest with misty mornings, dense fog, and temperatures that can drop close to 0°C. This is the perfect season to experience the natural beauty of the\"Kashmir of Andhra Pradesh.\"",
    howToReach:
      "Lambasingi is located about 100 KM from Visakhapatnam (Vizag) and is easily accessible by road. Book your Vizag to Lambasingi taxi with BSH Taxi Services for a safe and comfortable journey through the scenic Eastern Ghats, lush forests, and winding hill roads.",
    funFact:
      "Lambasingi, popularly known as the\"Kashmir of Andhra Pradesh,\"is one of the coldest places in the state. During winter, the village is covered with mist and occasional frost, making it one of the most unique tourist destinations near Vizag for nature lovers and adventure seekers.",
    importantNotes: [
      "The above prices do not include tolls, entry fees, or parking fees (excluding driver food).",
      "During standby and ghat roads, the cabin A/C will be turned off to ensure safe driving power.",
      "Early morning sunrise-viewing trips may require starting from Vizag before dawn to catch the frosty hours.",
    ],
    // places: [
    //   {
    //     name: "Lambasingi View Point",
    //     image: Lambasingiviewpoint,
    //     description: "The main sunrise spot, offering misty valley views and the coldest morning temperatures in the village.",
    //   },
    //   {
    //     name: "Thajangi Reservoir",
    //     image: Thajangireservoir,
    //     description: "A scenic reservoir about 6 km away on the Narsipatnam–Paderu road, framed by hills and popular for boating.",
    //   },
    //   {
    //     name: "Kothapalli Waterfalls",
    //     image: Kothapalliwaterfalls,
    //     tag: "Only Car Parking",
    //     description: "A cascading forest waterfall over the Gostani River, roughly 37 km from Lambasingi, discovered by locals in 2012.",
    //   },
    //   {
    //     name: "Strawberry & Dragon Fruit Farms",
    //     image: Strawberryfarms,
    //     description: "Cool-climate orchard farms growing strawberries, dragon fruit, coffee and pepper across the hillsides.",
    //   },
    //   {
    //     name: "Susan Garden",
    //     image: Susangarden,
    //     description: "A colourful flower garden nicknamed the 'Amber Coloured Garden', best visited at sunset.",
    //   },
    //   {
    //     name: "Yerravaram Waterfalls",
    //     image: Yerravaramwaterfalls,
    //     description: "A year-round cascade tucked in a quiet valley near Narsipatnam, popular with hill-climbers.",
    //   },
    //   {
    //     name: "Paddy Fields & Buddha Statue",
    //     image: Paddyfieldsbuddha,
    //     description: "Terraced paddy fields dotted with carved Buddha statues, a quietly scenic and lesser-known stop.",
    //   },
    // ],
  },

{
    slug: "vizag-local",
    name: "Vizag Local Sightseeing",
    image: VizagLocal, // replace with "../assets/destinations/rushikonda-beach.jpg"
    distanceFromVizag: "10-Hour Local Sightseeing Package in Vizag",
    distanceKm: 100,
    driveTime: "10 hrs",
    sources: ["AP Tourism", "Wikipedia"],
    category: "Beach",
    description:
      "Explore the best of Visakhapatnam (Vizag) with BSH Taxi Services. Our 10-hour local sightseeing package covers popular attractions like RK Beach, Kailasagiri, Rushikonda Beach, INS Kurusura Submarine Museum, Tenneti Park, and Simhachalam Temple. Enjoy safe, comfortable, and affordable taxi services with professional drivers. Call +91 8886803322 to book your Vizag local tour.",
    seoTitle: "Rushikonda Beach Taxi in Vizag | Local Cab Service | BSH Taxi Services",
    seoDescription:
      "Book a local taxi to Rushikonda Beach in Visakhapatnam. Quick, comfortable rides to Vizag's most popular Blue Flag beach, available 24/7 at affordable fares.",
    keywords: [
      "vizag rushikonda beach taxi",
      "local taxi to rushikonda beach",
      "visakhapatnam beach cab service",
      "rushikonda beach one day trip taxi",
      "rushikonda beach taxi fare vizag",
      "vizag city sightseeing taxi package",
      "rushikonda kailasagiri combo taxi",
      "cab booking near rushikonda beach",
      "best taxi service vizag beaches",
      "rushikonda beach resort taxi drop",
      "vizag local full day taxi package",
      "vizag one day sightseeing cab",
    ],
    tagline: "Discover the City by the Bay, One Stop at a Time!",
    costPerDay: 3000,
    history:
      "\"Rushikonda\" translates to \"Hill of the Sage\" in Telugu, tied to local legend that holds this stretch of coast was once a site where sages performed penance. For most of its history it was a quiet fishing shoreline; recognition as a tourist spot only began building in the 1980s, and the real transformation came in the early 2000s when the Andhra Pradesh Tourism Development Corporation invested in resorts, water-sports infrastructure and restaurants along the shore.\n\nToday Rushikonda is one of only a handful of Indian beaches to hold the international Blue Flag certification, recognising its clean sands and high environmental and safety standards. It has grown into the region's main hub for water sports and adventure tourism, while still keeping the hillside backdrop and comparatively uncrowded feel that first drew visitors in.\n\nBeyond Rushikonda, Vizag's local circuit has grown around the city's port heritage and hilltop views — from the INS Kursura Submarine Museum, decommissioned in 2001 after decades of active service, to the hilltop statues of Shiva and Parvati at Kailasagiri, which has become the city's most recognisable skyline landmark.",
    highlights: [
      "Blue Flag certified — one of only a few beaches in India",
      "Vizag's main hub for water sports and adventure tourism",
      "Name means \"Hill of the Sage\" in Telugu",
      "Close to Kailasagiri and the ISKCON Temple",
    ],
    quickFacts: [
      { label: "Certification", value: "Blue Flag" },
      { label: "Best Time", value: "Oct – Feb" },
      { label: "Activities", value: "Surfing, Kayaking, Jet-Ski" },
      { label: "Distance", value: "8 km from city centre" },
    ],
    bestTimeToVisit: "October to February, for pleasant weather and calmer seas ideal for water sports.",
    howToReach: "Just a 20–25 minute drive from central Vizag along the coastal road.",
    funFact:
      "Rushikonda is one of the very few beaches in India to hold Blue Flag certification — the same international eco-standard used to rate beaches across Europe.",
    importantNotes: [
      "The above prices do not include tolls, entry fees, or parking fees (excluding driver food).",
      "Museum and park entry tickets (Submarine Museum, Kailasagiri ropeway, etc.) are payable separately at each location.",
      "Itinerary order may be adjusted slightly depending on traffic and opening hours.",
    ],
    // places: [
    //   {
    //     name: "Rushikonda Beach",
    //     image: Rushikondabeach,
    //     description: "Vizag's Blue Flag-certified beach, known for golden sands and water sports like surfing and jet-skiing.",
    //   },
    //   {
    //     name: "Kailasagiri Park",
    //     image: Kailasagiripark,
    //     description: "A 100-acre hilltop park with 40-ft Shiva-Parvati statues, ropeway rides and panoramic bay views.",
    //   },
    //   {
    //     name: "RK Beach (Ramakrishna Beach)",
    //     image: Rkbeach,
    //     description: "A popular city beach and promenade lined with parks, food stalls and the Submarine Museum.",
    //   },
    //   {
    //     name: "Submarine Museum",
    //     image: Submarinemuseum,
    //     tag: "Only Car Parking",
    //     description: "The decommissioned INS Kursura, converted into Asia's only shore-based submarine museum in 2001.",
    //   },
    //   {
    //     name: "Visakha Museum",
    //     image: Visakhamuseum,
    //     description: "Housed in a 150-year-old Dutch bungalow on RK Beach Road, showcasing the region's colonial and maritime history.",
    //   },
    //   {
    //     name: "Tenneti Park",
    //     image: Tennetipark,
    //     description: "A coastal eco-park at the foot of the Kailasagiri ropeway, popular for its cliffside pathways and sea views.",
    //   },
    //   {
    //     name: "Simhachalam Temple",
    //     image: Simhachalamtemple,
    //     description: "An ancient hilltop temple dedicated to Lord Narasimha, one of Vizag's most revered pilgrimage sites.",
    //   },
    //   {
    //     name: "Kali Mata Temple",
    //     image: Kalimatatemple,
    //     description: "A well-known temple near RK Beach, often combined with a beach-side evening visit.",
    //   },
    // ],
  },
{
    slug: "simhachalam-temple",
    name: "Simhachalam Temple",
    image: Simhachalam, // replace with "../assets/destinations/simhachalam-temple.jpg"
    distanceFromVizag: "20 KM from Vizag",
    distanceKm: 20,
    driveTime: "25 mins",
    sources: ["AP Tourism", "Wikipedia"],
    category: "Temple",
    description:
      "One of the most famous temples in Visakhapatnam, dedicated to Lord Varaha Lakshmi Narasimha Swamy, known for its rich history, stunning architecture, and spiritual significance.",
    seoTitle: "Simhachalam Temple Taxi Booking in Vizag | BSH Taxi Services",
    seoDescription:
      "Book a taxi to Simhachalam Temple from anywhere in Visakhapatnam. Comfortable local cabs for temple darshan visits, available all day at affordable rates.",
    keywords: [
      "vizag to simhachalam temple taxi",
      "simhachalam temple cab booking",
      "visakhapatnam temple taxi service",
      "simhachalam darshan taxi booking",
      "simhachalam temple taxi fare vizag",
      "local taxi near simhachalam temple",
      "vizag temple tour taxi package",
      "simhachalam pilgrimage taxi service",
      "one day temple tour taxi vizag",
      "best cab service simhachalam vizag",
      "simhachalam temple drop taxi vizag",
      "chandanotsavam simhachalam taxi booking",
    ],
    tagline: "A Sacred Hilltop Where Faith Meets History!",
    costPerDay: 1800,
    history:
      "Simhachalam — literally \"Lion's Hill\" — is one of 32 Narasimha temples in Andhra Pradesh and one of the state's most important Vaishnavite pilgrimage sites. According to temple legend, Lord Vishnu appeared here in a unique combined form, Varaha-Narasimha (part boar, part lion), to protect his devotee Prahlada from his father, the demon king Hiranyakashipu. To this day the deity is kept covered year-round in sandalwood paste, resembling a lingam, and is revealed in its true form only once a year during the Chandanotsavam festival on Akshaya Tritiya.\n\nInscriptions on the temple walls date back to 1098 CE, from the reign of the Chola king Kulottunga I, making its documented history nearly a thousand years old. It was later expanded and patronised by the Eastern Ganga dynasty, the Chalukyas, and the Vijayanagara Empire — Krishnadevaraya himself is said to have donated gold and a victory pillar that still stands on the grounds. Architecturally, the temple resembles a fortress, with three enclosing courtyards, five gateways, and a blend of Kalinga, Chalukya and Chola styles culminating in a five-tiered rajagopuram.",
    highlights: [
      "One of 32 Narasimha temples in Andhra Pradesh",
      "Inscriptions dating back to 1098 CE (Chola era)",
      "Deity kept coated in sandalwood paste year-round",
      "Patronised by Chola, Eastern Ganga & Vijayanagara rulers",
    ],
    quickFacts: [
      { label: "Deity", value: "Varaha Lakshmi Narasimha" },
      { label: "Elevation", value: "~300 m" },
      { label: "Oldest Inscription", value: "1098 CE" },
      { label: "Key Festival", value: "Chandanotsavam" },
    ],
    bestTimeToVisit:
      "Year-round, though the Chandanotsavam festival (Akshaya Tritiya, usually April–May) is the most significant time to visit when the deity's true form is revealed.",
    howToReach: "A short 30–40 minute drive from Vizag city, with the temple sitting partway up Simhachalam Hill.",
    funFact:
      "The main idol is smeared in sandalwood paste 364 days of the year — devotees see the deity's actual form for only a few hours, once annually.",
    importantNotes: [
      "The above prices do not include tolls, entry fees, or parking fees (excluding driver food).",
      "Mobile phones, cameras and bags are not allowed inside the sanctum and must be deposited at the cloakroom.",
      "Special/VIP darshan tickets are payable separately at the temple counter and are not included in the taxi fare.",
    ],
    // places: [
    //   {
    //     name: "Main Sanctum (Garbhagriha)",
    //     image: Simhachalamsanctum,
    //     description: "Home to the sandalwood-coated Varaha Narasimha idol, revealed in its true form only once a year.",
    //   },
    //   {
    //     name: "Kalyana Mandapam",
    //     image: Kalyanamandapam,
    //     description: "An intricately carved pillared hall used for temple rituals and ceremonial functions.",
    //   },
    //   {
    //     name: "Krishnadevaraya's Victory Pillar",
    //     image: Victorypillar,
    //     description: "A stone pillar said to have been gifted by the Vijayanagara emperor Krishnadevaraya.",
    //   },
    //   {
    //     name: "Temple Tank (Pushkarini)",
    //     image: Templetank,
    //     description: "A sacred stepped water tank within the temple complex, used for ritual bathing.",
    //   },
    //   {
    //     name: "Simhachalam View Point",
    //     image: Simhachalamviewpoint,
    //     description: "A scenic hilltop stop along the ghat road offering panoramic views of the surrounding Eastern Ghats and city.",
    //   },
    //   {
    //     name: "Rajagopuram (Five-Tiered Gateway)",
    //     image: Rajagopuram,
    //     description: "The temple's towering entrance gopuram, showcasing a blend of Kalinga, Chalukya and Chola architectural styles.",
    //   },
    // ],
  },
{
    slug: "tirupati",
    name: "Tirupati",
    image: Tirupati, // replace with "../assets/destinations/tirupati-temple.jpg"
    distanceFromVizag: "780 KM Round Trip from Vizag",
    distanceKm: 780,
    driveTime: "12-13 hrs",
    sources: ["TTD", "Incredible India", "Wikipedia"],
    category: "Temple",
    description:
      "Visit the world-renowned Sri Venkateswara Swamy Temple in Tirupati with BSH Taxi Services. Enjoy a safe, comfortable, and hassle-free pilgrimage from Vizag.",
    seoTitle: "Vizag to Tirupati Taxi | Outstation Cab & Tour Package | BSH Taxi Services",
    seoDescription:
      "Book Vizag to Tirupati taxi with BSH Taxi Services. Comfortable outstation cabs for Tirumala darshan trips, round-trip & multi-day packages, available 24/7.",
    keywords: [
      "vizag to tirupati taxi",
      "vizag to tirupati outstation cab",
      "visakhapatnam to tirupati taxi fare",
      "tirumala darshan taxi package",
      "vizag tirupati round trip taxi",
      "tirupati balaji taxi booking vizag",
      "innova crysta taxi vizag to tirupati",
      "vizag to tirumala temple cab service",
      "tirupati pilgrimage taxi package price",
      "one way taxi vizag to tirupati",
      "vizag tirupati multi day tour package",
      "best taxi service tirupati from vizag",
    ],
    tagline: "A Sacred Journey to the Seven Hills!",
    costPerDay: 23000,
    history:
      "Tirupati's Sri Venkateswara Temple, perched on the seventh peak of the Tirumala hills (the Seshachalam range, said to symbolise the seven hoods of the serpent Adishesha), is dedicated to Lord Venkateswara — a form of Vishnu believed to save devotees from the trials of Kali Yuga, earning the temple the title \"Kaliyuga Vaikuntha.\" Its earliest roots stretch back to around 300 CE under a Thondaman king, with a mention even appearing in the Tamil Sangam epic Silappathikaram, dated to roughly the 2nd century CE.\n\nOver the following centuries the temple was steadily expanded and endowed by the Pallavas, Cholas, Pandyas and, most significantly, the Vijayanagara Empire, whose emperors — including Krishnadevaraya — funded much of its gold-plated architecture and towering gopurams. A recorded endowment by the Pallava queen Samavai dates to 966 CE. Today it is managed by the Tirumala Tirupati Devasthanams (TTD) and draws an estimated 50,000-plus pilgrims a day through its Vaikuntam Queue Complex, making it one of the most visited religious sites in the world.",
    highlights: [
      "One of the world's richest and most-visited temples",
      "History tracing back to c. 300 CE, expanded by Pallavas, Cholas & Vijayanagara rulers",
      "Perched at 853 m atop the seven hills of Tirumala",
      "Managed by the Tirumala Tirupati Devasthanams (TTD)",
    ],
    quickFacts: [
      { label: "Deity", value: "Lord Venkateswara" },
      { label: "Elevation", value: "~853 m" },
      { label: "Oldest Reference", value: "c. 300 CE" },
      { label: "Key Festival", value: "Brahmotsavam" },
    ],
    bestTimeToVisit:
      "September to February, when the weather is cooler; the annual Brahmotsavam festival (September/October) is the most significant time to visit, though crowds peak then.",
    howToReach:
      "A long outstation drive of roughly 12-13 hours from Vizag; most travellers split the journey overnight or fly into Tirupati Airport and use a local cab for the temple visit and darshan queue.",
    funFact:
      "The temple's hundis (donation boxes) alone collect crores of rupees a day, making it one of the wealthiest religious institutions in the world — funding hospitals, universities and free meals (Annaprasadam) for pilgrims.",
    importantNotes: [
      "This is a long outstation trip; the above pricing is typically structured as a multi-day round-trip package (driver batta/night halt charges may apply).",
      "Darshan tickets (Special Entry / Sarva Darshan) must be booked separately via TTD and are not included in the taxi fare.",
      "Personal vehicles are not allowed all the way to the temple doorstep; local shuttle/battery vehicles operate within the Tirumala complex.",
    ],
    // places: [
    //   {
    //     name: "Sri Venkateswara Temple (Main Sanctum)",
    //     image: Venkateswaratemple,
    //     description: "The gold-plated sanctum atop Tirumala hill, home to the deity Lord Venkateswara, visited by over 50,000 pilgrims daily.",
    //   },
    //   {
    //     name: "Vaikuntam Queue Complex",
    //     image: Vaikuntamqueue,
    //     description: "A series of interconnected halls that guide devotees through the darshan queue toward the main shrine.",
    //   },
    //   {
    //     name: "Sri Padmavathi Temple, Tiruchanoor",
    //     image: Padmavathitemple,
    //     description: "Dedicated to Goddess Padmavathi, consort of Lord Venkateswara; devotees traditionally visit here before Tirumala.",
    //   },
    //   {
    //     name: "Silathoranam",
    //     image: Silathoranam,
    //     description: "A rare natural rock arch formed within the Tirumala hills, reachable via a short trek.",
    //   },
    //   {
    //     name: "Sri Govindaraja Swamy Temple",
    //     image: Govindarajatemple,
    //     description: "A 12th-century temple in Tirupati town with a 50-foot gopuram, dedicated to a reclining form of Vishnu.",
    //   },
    //   {
    //     name: "Talakona Waterfall",
    //     image: Talakonawaterfall,
    //     description: "Andhra Pradesh's highest waterfall, tucked inside the Sri Venkateswara Wildlife Sanctuary near Tirupati.",
    //   },
    //   {
    //     name: "Chandragiri Fort",
    //     image: Chandragirifort,
    //     description: "A centuries-old Vijayanagara-era fort and palace complex a short drive from Tirupati town.",
    //   },
    //   {
    //     name: "Sri Venkateswara Dhyana Vignan Mandiram",
    //     image: Dhyanamandiram,
    //     description: "An open-air meditation centre and museum, opened in 1980, showcasing religious artifacts and offering a quiet retreat.",
    //   },
    // ],
  },
{
    slug: "annavaram-temple",
    name: "Annavaram (Sri Satyanarayana Swamy Temple)",
    image: Annavaram, // replace with "../assets/destinations/annavaram-temple.jpg"
    distanceFromVizag: "250 KM Round Trip from Vizag",
    distanceKm: 110,
    driveTime: "2.5 to 3hrs",
    sources: ["Trawell", "Wikipedia"],
    category: "Temple",
    description:
      "Travel from Vizag to the sacred Annavaram Temple, dedicated to Sri Veera Venkata Satyanarayana Swamy, for a peaceful and memorable spiritual journey.",
    seoTitle: "Vizag to Annavaram Temple Taxi | Pilgrimage Cab Booking | BSH Taxi",
    seoDescription:
      "Book an outstation taxi from Visakhapatnam to Annavaram Satyanarayana Swamy Temple. Comfortable one-way and round-trip pilgrimage cabs, 24/7 booking.",
    keywords: [
      "vizag to annavaram taxi",
      "annavaram temple cab booking",
      "visakhapatnam to annavaram taxi fare",
      "annavaram satyanarayana vratham taxi",
      "annavaram temple taxi package price",
      "vizag to annavaram one day trip taxi",
      "annavaram pilgrimage taxi service",
      "outstation cab vizag to annavaram",
      "best taxi service annavaram vizag",
      "annavaram round trip taxi booking",
      "annavaram bojjannakonda combo taxi",
      "innova crysta taxi vizag to annavaram",
    ],
    tagline: "Where Every Wish Finds Its Boon!",
    costPerDay: 5000,
    history:
      "Annavaram's temple traces back to 1891, when a modest shed was first built on Ratnagiri hill to house the deity's idol, discovered by a local landholder guided, as legend has it, by a dream. The shrine grew through community support into a full temple, was substantially rebuilt in stone during 1933–34, and renovated again in 2011–12. The name itself reflects the belief the temple embodies — \"Anna\" (what is desired) and \"varam\" (boon) — the idea that Sri Satyanarayana grants devotees whatever they ask for. It has since become the second most-visited pilgrimage site in Andhra Pradesh after Tirupati, especially for the Satyanarayana Swamy Vratham, a ritual performed here for family prosperity.\n\nThe Pampa River encircles the base of Ratnagiri hill, and local legend holds that Krishnadevaraya of Vijayanagara once used secret underground passages in these hills during his Kalinga campaign — passages later said to have been used again by the revolutionary Alluri Sitarama Raju against the British.",
    highlights: [
      "Second most-visited pilgrimage site in Andhra Pradesh",
      "Home to the famous Satyanarayana Swamy Vratham ritual",
      "13-ft Trimurthi idol of Brahma, Vishnu and Shiva",
      "Located on the Chennai–Kolkata rail line and NH16",
    ],
    quickFacts: [
      { label: "Deity", value: "Sri Satyanarayana Swamy" },
      { label: "Built", value: "1891, rebuilt 1933–34" },
      { label: "Hill", value: "Ratnagiri" },
      { label: "Rank", value: "2nd busiest shrine in AP" },
    ],
    bestTimeToVisit:
      "October to February for cooler travel weather; the Kalyana Mahotsavam in April/May is the temple's biggest festival.",
    howToReach:
      "Roughly a 2.5-hour drive south from Vizag via NH16, or by train — Annavaram railway station is on the main Chennai–Howrah line, just 2 km from the temple.",
    funFact:
      "The temple's daily Annadanam feeds thousands of pilgrims for free, one of the largest such programs in coastal Andhra Pradesh.",
    importantNotes: [
      "The above prices do not include tolls, entry fees, or parking fees (excluding driver food).",
      "Special/VIP darshan and Vratham booking slots must be arranged separately at the temple counter or via the Devasthanam website.",
      "The final stretch up Ratnagiri hill is via steps, ghat road, or ropeway — private vehicles do not go all the way to the sanctum.",
    ],
    // places: [
    //   {
    //     name: "Sri Satyanarayana Swamy Temple",
    //     image: Satyanarayanatemple,
    //     description: "The main Dravidian-style shrine atop Ratnagiri hill, home to the 13-ft Trimurthi idol and the famed Satyanarayana Vratham.",
    //   },
    //   {
    //     name: "Ratnagiri Hill & Ghat Steps",
    //     image: Ratnagirihill,
    //     description: "About 460 stone steps (or a ghat road) climb roughly 300 ft to the temple, with scenic sunrise and sunset viewpoints along the way.",
    //   },
    //   {
    //     name: "Pampa River & Pampa Sarovara",
    //     image: Pampariver,
    //     description: "The river encircling the base of Ratnagiri hill, with a barrage and boating facility used for ritual bathing before darshan.",
    //   },
    //   {
    //     name: "Vaikunta Narayana Dwaram",
    //     image: Vaikuntadwaram,
    //     description: "A key gateway within the temple complex, tied to the belief that the deity grants devotees whatever they earnestly desire.",
    //   },
    //   {
    //     name: "Bojjannakonda",
    //     image: Bojjannakonda,
    //     tag: "Only Car Parking",
    //     description: "A nearby Buddhist archaeological site with rock-cut caves, stupas and ancient sculptures.",
    //   },
    //   {
    //     name: "Thalupulamma Talli Temple",
    //     image: Thalupulammatemple,
    //     description: "A temple roughly 15 km away between Annavaram and Tuni, popular with travellers seeking protection for new vehicles.",
    //   },
    // ],
  },
{
    slug: "arasavalli-temple",
    name: "Arasavalli (Sri Suryanarayana Swamy Vari Devasthanam)",
    image: Arasavalli, // replace with "../assets/destinations/arasavalli-temple.jpg"
    distanceFromVizag: "226 KM Round Trip from Vizag",
    distanceKm: 226,
    driveTime: "2.5-3 hrs",
    sources: ["Wikipedia", "Srikakulam District Govt.", "Go2India"],
    category: "Temple",
    description:
      "Travel from Vizag to the sacred Arasavalli Sri Suryanarayana Swamy Temple with BSH Taxi Services. Experience one of India's oldest Sun Temples, renowned for its spiritual significance and divine atmosphere.",
    seoTitle: "Vizag to Arasavalli Sun Temple Taxi | Srikakulam Pilgrimage Cab | BSH Taxi",
    seoDescription:
      "Book an outstation taxi from Visakhapatnam to Arasavalli Suryanarayana Swamy Temple, Srikakulam. Comfortable one-way and round-trip pilgrimage cabs, 24/7 booking.",
    keywords: [
      "vizag to arasavalli taxi",
      "arasavalli temple cab booking",
      "visakhapatnam to arasavalli taxi fare",
      "arasavalli sun temple taxi package",
      "srikakulam temple taxi from vizag",
      "vizag to srikakulam one day trip taxi",
      "arasavalli suryanarayana swamy taxi",
      "outstation cab vizag to arasavalli",
      "ratha saptami arasavalli taxi booking",
      "best taxi service arasavalli vizag",
    ],
    tagline: "Where the Sun Himself Chose to Dwell!",
    costPerDay: 5000,
    history:
      "The Sri Suryanarayana Swamy Temple at Arasavalli — originally called Harshavalli, meaning \"abode of joy\" — is one of only two ancient temples in India dedicated to the Sun God, the other being Konark, which was left unfinished. Inscriptions credit its construction to King Devendra Varma of the Eastern Ganga (Kalinga) dynasty in the 7th century CE, built in the Kalinga/Odisha architectural style. Temple legend holds that the deity Indra, after being struck by Nandi for trying to force his way in on Lord Shiva, was told in a dream that installing an idol of the Sun God here would heal him — and so Sage Kashyapa is said to have consecrated the Surya idol at this very spot, making the Sun of \"Kasyapasa Gotra.\"\n\nThe temple's five gateways were deliberately aligned so that, during Rathasapthami in the month of Magha, the sun's rays fall directly on the deity's feet at sunrise — an architectural feat still observed by devotees today. Located just a kilometre from Srikakulam town, the temple remains one of the most visited pilgrimage sites in North Coastal Andhra Pradesh, drawing devotees who believe prayers here can heal ailments of the eyes and skin.",
    highlights: [
      "One of only two ancient Sun temples in India",
      "7th-century Kalinga-style architecture",
      "Sunlight aligns with the deity's feet during Rathasapthami",
      "Just 1 km from Srikakulam town centre",
    ],
    quickFacts: [
      { label: "Deity", value: "Surya (Suryanarayana Swamy)" },
      { label: "Built", value: "7th century CE" },
      { label: "Dynasty", value: "Eastern Ganga (Kalinga)" },
      { label: "Key Festival", value: "Rathasapthami" },
    ],
    bestTimeToVisit:
      "October to February for pleasant travel weather; Rathasapthami (Jan/Feb) is the most significant day, when sunrise light aligns with the deity.",
    howToReach:
      "About a 2.5–3 hour drive north from Vizag along NH16 through Srikakulam town; the nearest railway station is Amadalavalasa, roughly 16 km away.",
    funFact:
      "The temple's five gateways were positioned with such precision that sunrise rays travel straight through them to touch the deity's feet — centuries before modern instruments existed to plan it.",
    importantNotes: [
      "The above prices do not include tolls, entry fees, or parking fees (excluding driver food).",
      "Vehicles must be parked a short distance from the temple; the final approach is on foot through a narrow walkway.",
      "Special entry darshan is available for a small additional fee, payable directly at the temple counter.",
    ],
    // places: [
    //   {
    //     name: "Sri Suryanarayana Swamy Sanctum",
    //     image: Suryanarayanasanctum,
    //     description: "The 7th-century main shrine where sunrise rays are said to fall directly on the deity's feet during Rathasapthami.",
    //   },
    //   {
    //     name: "Five Temple Gateways",
    //     image: Templegateways,
    //     description: "The precisely aligned entrances built to channel sunlight to the sanctum, a hallmark of the temple's Kalinga architecture.",
    //   },
    //   {
    //     name: "Sri Sathya Sai Dhyana Mandir",
    //     image: Dhyanamandir,
    //     description: "A meditation centre located directly opposite the temple, popular with pilgrims for quiet reflection before or after darshan.",
    //   },
    //   {
    //     name: "Nagavali River",
    //     image: Nagavaliriver,
    //     description: "The river associated with the temple's founding legend, said to have been channelled here by Balarama in the Dwapara Yuga.",
    //   },
    //   {
    //     name: "Srikakulam Town",
    //     image: Srikakulamtown,
    //     description: "The district headquarters just 1 km away, known for traditional brass crafts and temple bell-making.",
    //   },
    // ],
  },
{
    slug: "vanjangi-hills",
    name: "Vanjangi Hills",
    image: Vanjangi, // replace with "../assets/destinations/vanjangi-sunrise.jpg"
    distanceFromVizag: "220 KM Round Trip from Vizag",
    distanceKm: 220,
    driveTime: "10-12 hrs",
    sources: ["Outlook Traveller", "Yovizag"],
    category: "Hill Station",
    description:
      "Book your trip with BSH Taxi Services and witness the magical sunrise at Vanjangi Hills, famous for its Sea of Clouds, misty mountains, and breathtaking natural beauty near Visakhapatnam.",
    seoTitle: "Vizag to Vanjangi Hills Taxi | Sea of Clouds Sunrise Trip | BSH Taxi Services",
    seoDescription:
      "Book a Vizag to Vanjangi taxi with BSH Taxi Services for the famous Sea of Clouds sunrise. Night-drive & early morning cab packages, AC cabs, 24/7 booking.",
    keywords: [
      "vizag to vanjangi taxi",
      "vanjangi sea of clouds taxi package",
      "vanjangi sunrise trip taxi vizag",
      "visakhapatnam to vanjangi taxi fare",
      "vanjangi hills night taxi booking",
      "vanjangi araku combo taxi package",
      "paderu vanjangi taxi service",
      "vanjangi trek taxi drop vizag",
      "megha samudram taxi vizag",
      "best taxi service vanjangi vizag",
      "innova crysta taxi vizag to vanjangi",
      "vanjangi hills outstation cab",
    ],
    tagline: "Where Sunrise Rises Above a Sea of Clouds!",
    costPerDay: 5500,
    history:
      "Vanjangi (also spelled Vanajangi) is a small tribal hamlet in the Alluri Sitharama Raju district's Eastern Ghats, near Paderu, sitting at roughly 3,400 feet above sea level. For most of its history it was simply a quiet forest village — its rise to fame is remarkably recent. Around 2019–2020, trekkers and nature photographers began sharing images of its winter sunrise, where thick banks of cloud settle in the valley below and the sun breaks over them like a rising tide, earning the spot the nickname \"Megha Samudram\" (Ocean of Clouds).\n\nWord spread rapidly on social media, and Vanjangi went from an unknown hamlet to one of Andhra Pradesh's most talked-about sunrise destinations within a single tourist season — following in the footsteps of nearby Lambasingi, which had earned its own reputation as the state's coldest hill spot only a few years earlier. Unlike more developed viewpoints, Vanjangi remains genuinely remote: there's no direct road to the summit, and reaching it still requires a forest trek in the dark, which is part of what keeps the experience feeling undiscovered.",
    highlights: [
      "Famous 'Sea of Clouds' (Megha Samudram) sunrise phenomenon",
      "One of Andhra Pradesh's most recently discovered viewpoints",
      "Genuinely offbeat — reachable only by a pre-dawn forest trek",
      "Set among coffee plantations and dense Eastern Ghats forest",
    ],
    quickFacts: [
      { label: "Altitude", value: "~3,400 ft (1,050 m)" },
      { label: "Best Time", value: "Nov – Feb" },
      { label: "Final Trek", value: "4-5 km on foot" },
      { label: "Nearest Town", value: "Paderu (~6 km)" },
    ],
    bestTimeToVisit:
      "November to February, when winter humidity reliably forms the dense cloud bed; the window to catch it is roughly 5:30–6:15 AM before the sun burns it off.",
    howToReach:
      "A 3-4 hour drive from Vizag via Vaddadi Madugula–Paderu–Dumbriguda road, followed by a 4-5 km trek on foot from Paderu since no motorable road reaches the summit. Most visitors start from Vizag around 2 AM or overnight in Araku/Paderu.",
    funFact:
      "Vanjangi has no direct road, no streetlights, and almost no accommodation — visitors either drive through the night from Vizag or camp near Paderu, making the sunrise feel far more earned than at most viewpoints.",
    importantNotes: [
      "This is a pre-dawn trip: pickup from Vizag is typically around 1-2 AM to reach the trek start point before sunrise.",
      "The final 4-5 km stretch to the viewpoint is a forest trek on foot — the taxi cannot go beyond Paderu/the trek starting point.",
      "Cloud views are weather-dependent and most reliable in winter (Nov-Feb); monsoon and summer months rarely produce the cloud bed.",
    ],
    // places: [
    //   {
    //     name: "Vanjangi Sunrise Viewpoint",
    //     image: Vanjangiviewpoint,
    //     description: "The hilltop summit where the famous 'Sea of Clouds' unfolds at sunrise, with the sun rising through a valley blanketed in fog.",
    //   },
    //   {
    //     name: "Paderu Town",
    //     image: Paderutown,
    //     description: "The last motorable point before the trek begins, and the main hub for guides, jeeps and basic supplies.",
    //   },
    //   {
    //     name: "Forest Trekking Trail",
    //     image: Foresttrail,
    //     description: "A 4-5 km trail through dense Eastern Ghats forest connecting Paderu to the Vanjangi summit.",
    //   },
    //   {
    //     name: "Coffee Plantations",
    //     image: Vanjangicoffeeplantations,
    //     description: "Shade-grown coffee estates surrounding the village, similar to those found in nearby Araku Valley.",
    //   },
    // ],
  },

{
  slug: "vizag-airport",
  name: "Vizag Airport",
  image: vizagairport, // replace with "../assets/destinations/vizag-airport.jpg"
  distanceFromVizag: "20 KM from Vizag City Center",
  distanceKm: 20,
  driveTime: "25 mins",
  sources: ["AAI", "Wikipedia"],
  category: "Transit",
  description: "Choose BSH Taxi Services for 24/7 airport pickup and drop services at Visakhapatnam International Airport. Enjoy punctual, comfortable, and affordable taxi services for business and leisure travel.",
  seoTitle: "Vizag Airport Taxi Service | 24/7 Airport Transfers | BSH Taxi Services",
  seoDescription:
    "Book reliable airport taxi service in Visakhapatnam. Punctual pickup and drop to Vizag Airport (VTZ), available 24/7 with professional drivers, fixed fares.",
  keywords: [
    "vizag airport taxi",
    "visakhapatnam airport transfer taxi",
    "airport taxi booking vizag",
    "vizag airport pickup drop taxi",
    "24/7 airport cab service visakhapatnam",
    "vtz airport taxi fare",
    "vizag airport taxi online booking",
    "cheap airport cab visakhapatnam",
    "vizag airport to city taxi",
    "prepaid taxi vizag airport",
  ],
  tagline: "Land, Relax, We'll Handle the Ride!",
  costPerDay: 1500,
  history:
    "Visakhapatnam Airport (IATA: VTZ) operates as a civil enclave inside INS Dega, an Indian Navy air station, reflecting the city's long-standing role as home to the Eastern Naval Command. Civilian flights began modestly in 1981 with a single daily service on a short 1,800-metre runway.\n\nThe real transformation came in the 2000s: a new 10,500-foot runway capable of handling wide-body aircraft was inaugurated in June 2007, night-landing capability followed soon after, and a modern integrated terminal with aerobridges opened in March 2009. These upgrades earned the airport international status, with direct flights launched to Dubai, Singapore and Kuala Lumpur. It has run 24-hour operations since 2014 and even added a 2-megawatt solar power plant in 2016 to lower its carbon footprint — reflecting Visakhapatnam's growth into a major industrial, IT and port city.",
  highlights: [
    "Civil enclave within the Indian Navy's INS Dega airbase",
    "International flights to Dubai, Singapore & Kuala Lumpur",
    "24-hour operations since 2014",
    "Powered in part by a 2 MW solar plant since 2016",
  ],
  quickFacts: [
    { label: "IATA Code", value: "VTZ" },
    { label: "Civilian Ops Since", value: "1981" },
    { label: "Runway", value: "10,500 ft (since 2007)" },
    { label: "Status", value: "International, 24×7" },
  ],
  bestTimeToVisit:
    "Not applicable — the airport runs 24×7 year-round, so we're available for pickups and drops any time, any day.",
  howToReach:
    "Around 12 km from the city centre, roughly a 25–30 minute drive depending on traffic — we track your flight status for pickups so you're never left waiting.",
  funFact:
    "Vizag Airport shares its runway with the Indian Navy's INS Dega — one of only a handful of airports in India where civilian and naval aviation operate side by side.",
  importantNotes: [
    "The above prices do not include tolls, entry fees, or parking fees (excluding driver food).",
    "We track your flight status in real time, so pickup timing adjusts automatically for delays or early arrivals.",
  ],

},
];