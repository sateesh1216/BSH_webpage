

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
import type { ReactNode } from "react";


// import Coffeehouse  from "../assets/Destinations/Araku/araku-coffee house-taxi-services-bshtaxiservices.png"; --- IGNORE ---
export type DestinationPlace = {
  name: string;
  image: string;
  tag?: string;
  description: ReactNode;
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
 

  description: ReactNode;
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
  VIZAGLOCALTAXIPACKAGE?: string;
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
   
    category: "Hill Station",
description: (
  <>
    Book the best<strong>Vizag to Araku Valley taxi service</strong> with{" "}
    <strong>BSH Taxi Services</strong>. Enjoy a comfortable journey through
    the Eastern Ghats, visit Borra Caves, coffee plantations, waterfalls, and
    scenic viewpoints with experienced drivers, clean vehicles, and affordable
    taxi fares.
  </>
),
    seoTitle: "Vizag to Araku Valley Cab Service | Taxi Booking | BSH Taxi",    
    seoDescription:
      "Book Vizag to Araku Valley taxi service with BSH Taxi Services. Affordable cab booking, one-day Araku tour packages, Borra Caves sightseeing, AC cabs, experienced drivers, and 24/7 taxi service.",
    keywords: [
        "vizag to araku valley taxi",
        "vizag to araku taxi",
        "vizag to araku cab service",
        "araku valley taxi service",
        "araku valley cab service",
        "vizag to araku one day trip",
        "araku tour package",
        "visakhapatnam to araku taxi",
        "borra caves taxi",
        "araku sightseeing taxi"
    ],
    tagline: "Book the Best Vizag to Araku Valley Taxi Service",
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
      "August to March is the best time to visit Araku Valley. The pleasant weather, misty hills, coffee plantations, waterfalls, and scenic viewpoints make it the perfect season for sightseeing. Book your Vizag to Araku Valley taxi service for a comfortable and memorable trip.",
    howToReach:
      "Araku Valley is around 120 km from Visakhapatnam and is easily accessible by road and rail. Book a Vizag to Araku Valley taxi with BSH Taxi Services for a comfortable journey covering Borra Caves, coffee plantations, waterfalls, and popular sightseeing attractions. One-day trips and round-trip taxi packages are available.",
    funFact:
      "Araku's coffee story began with the British in the early 1900s, but it was tribal cooperatives who turned it into a globally recognised, organic, GI-tagged brand.",
    importantNotes: [
      "The above prices do not include tolls, entry fees, parking fees and driver food.",
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
      "The above prices do not include tolls, entry fees, parking fees and driver food.",
      "During standby and ghat roads, the cabin A/C will be turned off to ensure safe driving power.",
      "Early morning sunrise-viewing trips may require starting from Vizag before dawn to catch the frosty hours.",
    ],
 
  },

{
    slug: "vizag-local",
    name: "Vizag Local Sightseeing",
    image: VizagLocal, // replace with "../assets/destinations/rushikonda-beach.jpg"
    distanceFromVizag: "10-Hour Local Sightseeing Package in Vizag",
    distanceKm: 100,
    driveTime: "10 hrs",

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
      { label: "Best Time", value: "Aug – Feb" },
      { label: "Activities", value: "Surfing, Kayaking, Jet-Ski" },
      { label: "Distance", value: "10-Hour Local Sightseeing Package in Vizag" },
    ],
    bestTimeToVisit: "October to March is the ideal time to visit Rushikonda Beach in Vizag, when the pleasant weather and calm sea create the perfect setting for beach walks, water sports, and family vacations.",
    howToReach: "Rushikonda Beach is just 12 KM from Visakhapatnam City Center. Travel comfortably with BSH Taxi Services for quick and reliable taxi services to one of the most popular beaches in Vizag.",
    funFact:
      "Rushikonda Beach is a prestigious Blue Flag certified beach in Andhra Pradesh, renowned for its crystal-clear waters, golden sands, eco-friendly facilities, and world-class beach management, making it a must-visit destination in Visakhapatnam (Vizag).",
    importantNotes: [
      "The above prices do not include tolls, entry fees, parking fees and driver food.",
      "Itinerary order may be adjusted slightly depending on traffic and opening hours.",
    ],
  
  },
{
    slug: "simhachalam-temple",
    name: "Simhachalam Temple",
    image: Simhachalam, // replace with "../assets/destinations/simhachalam-temple.jpg"
    distanceFromVizag: "20 KM from Vizag",
    distanceKm: 20,
    driveTime: "25 mins",
  
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
      "Visit Simhachalam Temple throughout the year, with April and May being the most auspicious months during the Chandanotsavam Festival, when thousands of devotees gather for the sacred Nijarupa Darshanam.",
    howToReach: "Simhachalam Temple is just 16 KM from Vizag. Travel comfortably with BSH Taxi Services, offering reliable taxi services from Visakhapatnam for temple visits, local sightseeing, and pilgrimage tours.",
    funFact:
      "Simhachalam Temple is one of the most famous pilgrimage destinations in Andhra Pradesh, dedicated to Lord Varaha Lakshmi Narasimha Swamy. The deity is covered with sandalwood paste for 364 days, revealing the original idol only once a year during the Chandanotsavam Festival, making it a unique spiritual experience for devotees.",
    importantNotes: [
      "The above prices do not include tolls, entry fees, parking fees and driver food.",
      "Mobile phones, cameras and bags are not allowed inside the sanctum and must be deposited at the cloakroom.",
      "Special/VIP darshan tickets are payable separately at the temple counter and are not included in the taxi fare.",
    ],
 
  },
{
    slug: "tirupati",
    name: "Tirupati",
    image: Tirupati, // replace with "../assets/destinations/tirupati-temple.jpg"
    distanceFromVizag: "780 KM Round Trip from Vizag",
    distanceKm: 780,
    driveTime: "12-13 hrs",
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
      "Visit Tirupati between September and February for pleasant weather and smooth temple visits. Experience the grand Srivari Brahmotsavam Festival, one of the most important religious events in Andhra Pradesh",
    howToReach:
      "Travel from Vizag to Tirupati with BSH Taxi Services. Our reliable taxi service offers a comfortable and convenient journey to the sacred Sri Venkateswara Swamy Temple, one of India's most visited pilgrimage destinations.",
    funFact:
      "Tirupati Sri Venkateswara Swamy Temple welcomes millions of devotees every year and is one of the world's most revered Hindu pilgrimage sites. The temple is renowned for its spiritual significance, free Annaprasadam, and centuries-old traditions, making it a must-visit destination in Andhra Pradesh.",
    importantNotes: [
      "This is a long outstation trip; the above pricing is typically structured as a multi-day round-trip package (driver batta/night halt charges may apply).",
      "Darshan tickets (Special Entry / Sarva Darshan) must be booked separately via TTD and are not included in the taxi fare.",
      "Personal vehicles are not allowed all the way to the temple doorstep; local shuttle/battery vehicles operate within the Tirumala complex.",
    ],
  
  },
{
    slug: "annavaram-temple",
    name: "Annavaram (Sri Satyanarayana Swamy Temple)",
    image: Annavaram, // replace with "../assets/destinations/annavaram-temple.jpg"
    distanceFromVizag: "250 KM Round Trip from Vizag",
    distanceKm: 110,
    driveTime: "2.5 to 3hrs",

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
      "Visit Annavaram Temple between October and February to enjoy pleasant weather and a peaceful spiritual experience. The annual Kalyanotsavam Festival is one of the temple's most important celebrations, attracting devotees from across India.",
    howToReach:
      "Travel from Vizag to Annavaram with BSH Taxi Services. Located about 110 KM from Visakhapatnam, the temple is well connected by NH16 and railway, making it one of the most convenient pilgrimage destinations in Andhra Pradesh.",
    funFact:
      "Annavaram Sri Veera Venkata Satyanarayana Swamy Temple is famous for its sacred Satyanarayana Vratham, daily Annadanam service, and serene location atop Ratnagiri Hill. It is one of the most important Hindu pilgrimage sites near Vizag, attracting thousands of devotees throughout the year.",
    importantNotes: [
      "The above prices do not include tolls, entry fees, or parking fees (excluding driver food).",
      "Special/VIP darshan and Vratham booking slots must be arranged separately at the temple counter or via the Devasthanam website.",
      "The final stretch up Ratnagiri hill is via steps, ghat road, or ropeway — private vehicles do not go all the way to the sanctum.",
    ],
 
  },
{
    slug: "arasavalli-temple",
    name: "Arasavalli (Sri Suryanarayana Swamy Vari Devasthanam)",
    image: Arasavalli, // replace with "../assets/destinations/arasavalli-temple.jpg"
    distanceFromVizag: "226 KM Round Trip from Vizag",
    distanceKm: 226,
    driveTime: "2.5-3 hrs",

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
      "Visit Arasavalli Sri Suryanarayana Swamy Temple between October and February for pleasant weather and a peaceful pilgrimage. The Ratha Saptami Festival is the temple's most celebrated event, attracting thousands of devotees from Vizag and across India.",
    howToReach:
      "Travel from Vizag to Arasavalli Temple with BSH Taxi Services. Located approximately 113 KM from Visakhapatnam, the temple is well connected by NH16, making it one of the most popular pilgrimage destinations in Andhra Pradesh.",
    funFact:
      "Arasavalli Sri Suryanarayana Swamy Temple is one of India's most ancient Sun Temples and a major spiritual attraction in Andhra Pradesh. Its remarkable architectural design allows the first rays of the rising sun to illuminate the deity during Ratha Saptami, making it a must-visit destination for devotees and tourists alike.",
    importantNotes: [
      "The above prices do not include tolls, entry fees, or parking fees (excluding driver food).",
      "Vehicles must be parked a short distance from the temple; the final approach is on foot through a narrow walkway.",
      "Special entry darshan is available for a small additional fee, payable directly at the temple counter.",
    ],
  
  },
{
    slug: "vanjangi-hills",
    name: "Vanjangi Hills",
    image: Vanjangi, // replace with "../assets/destinations/vanjangi-sunrise.jpg"
    distanceFromVizag: "220 KM Round Trip from Vizag",
    distanceKm: 220,
    driveTime: "10-12 hrs",
  
    category: "Hill Station",
 description: (
    <>
      Book your trip with <strong>BSH Taxi Services</strong> and witness the
      magical sunrise at Vanjangi Hills, famous for its Sea of Clouds, misty
      mountains, and breathtaking natural beauty near Visakhapatnam.
    </>
  ),
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
      "Visit Vanjangi Hills between November and February to witness the spectacular Sea of Clouds, cool weather, and breathtaking sunrise views. It is one of the top tourist destinations near Vizag during the winter season.",
    howToReach:
      "Travel from Vizag to Vanjangi Hills with BSH Taxi Services. Located approximately 110 KM from Visakhapatnam, the scenic route passes through Paderu and the beautiful Eastern Ghats, followed by a short trek to the viewpoint.",
    funFact:
      "Vanjangi Hills is renowned for its magical Sea of Clouds (Megha Samudram) and stunning sunrise views, making it one of the most popular weekend getaway destinations near Vizag and a must-visit attraction in Andhra Pradesh.",
    importantNotes: [
      "This is a pre-dawn trip: pickup from Vizag is typically around 1-2 AM to reach the trek start point before sunrise.",
      "The final 4-5 km stretch to the viewpoint is a forest trek on foot — the taxi cannot go beyond Paderu/the trek starting point.",
      "Cloud views are weather-dependent and most reliable in winter (Nov-Feb); monsoon and summer months rarely produce the cloud bed.",
    ],
  
  },

{
  slug: "vizag-airport",
  name: "Vizag Airport",
  image: vizagairport, // replace with "../assets/destinations/vizag-airport.jpg"
  distanceFromVizag: "20 KM from Vizag City Center",
  distanceKm: 20,
  driveTime: "25 mins",
 
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
    "Vizag Airport operates 24/7, making it the perfect gateway to Visakhapatnam in every season. BSH Taxi Services provides round-the-clock airport pickup and drop services for a smooth and hassle-free travel experience.",
  howToReach:
    "Visakhapatnam International Airport is just 12 KM from Vizag City Center. Book your Vizag Airport taxi with BSH Taxi Services for punctual, comfortable, and affordable airport transfers to hotels, railway stations, tourist attractions, and nearby destinations.",
  funFact:
    "Visakhapatnam International Airport (Vizag Airport) is one of India's unique dual-use airports, sharing its runway with the Indian Navy's INS Dega. It serves as the primary gateway to Visakhapatnam, making travel to beaches, tourist attractions, and business destinations quick and convenient.",
  importantNotes: [
    "The above prices do not include tolls, entry fees, parking fees and driver food.",
    "We track your flight status in real time, so pickup timing adjusts automatically for delays or early arrivals.",
  ],

},
];