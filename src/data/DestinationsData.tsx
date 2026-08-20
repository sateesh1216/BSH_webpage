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
  imageAlt: string;
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
  imageAlt: string;

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

  history?: ReactNode;
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
    imageAlt: "Vizag to Araku taxi service by BSH Taxi Services with misty Eastern Ghats hills in the background",
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
  "Araku Valley, located in the Eastern Ghats of Andhra Pradesh near the Odisha border, has been home to Adivasi communities for generations. Surrounded by forested hills and valleys, the region is known for its scenic landscapes, cool climate, and rich tribal heritage. The valley lies among important hill ranges including Galikonda, Raktakonda, Chitamogondi, and Sunkarimetta, making it one of the most distinctive hill destinations in Andhra Pradesh.\n\nAraku's connection with coffee began in the mid-20th century when Arabica coffee cultivation was introduced in the region to support tribal communities and develop sustainable livelihoods. The coffee plantations gradually became an important part of the valley's identity, with coffee traditionally grown under the shade of trees in the Eastern Ghats. Today, Araku coffee is widely recognised for its distinctive flavour and connection with the region's tribal farming communities.\n\nThe railway connection through the Eastern Ghats also played an important role in opening Araku Valley to visitors. The route towards Araku passes through numerous tunnels, bridges, forests, and mountain landscapes, making the journey itself a memorable part of travelling to the valley. Improved road and rail connectivity later helped Araku develop into one of Andhra Pradesh's popular hill and nature destinations.\n\nAraku's cultural identity remains closely connected to its tribal communities and traditions. Dhimsa, a traditional tribal dance, is an important part of local cultural celebrations, while weekly markets offer visitors an opportunity to see bamboo crafts, traditional jewellery, agricultural products, and other locally made goods. Festivals and community gatherings continue to preserve the region's distinctive heritage.\n\nToday, Araku Valley attracts travellers for its natural beauty, coffee plantations, tribal culture, scenic viewpoints, forests, and pleasant hill climate. For visitors travelling from Vizag, the journey to Araku is itself an important part of the experience, passing through the Eastern Ghats before reaching one of the most scenic destinations in northern Andhra Pradesh.",
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
        imageAlt: "Vizag to Araku taxi service visiting Damuku View Point with scenic Eastern Ghats valley views",
        description:
      "Damuku View Point is one of the best viewpoints in Araku Valley, offering panoramic views of lush green valleys and rolling hills. A popular stop on Vizag to Araku sightseeing trips for photography, nature lovers, and scenic travel.",
  },
      {
        name: "Borra Caves",
        image: Borracaves,
        imageAlt: "Borra Caves limestone stalactite and stalagmite formations near Araku Valley",
        description:
          "Borra Caves is one of the most famous tourist attractions near Araku Valley, known for its million-year-old limestone formations, stunning stalactites, and stalagmites. A must-visit destination on your Vizag to Araku trip with BSH Taxi Services.",
      },
      {
        name: "Katika Waterfalls",
        image: Katikawaterfalls,
        imageAlt: "Katiki Waterfalls cascading through lush green forest near Borra Caves, Araku Valley",
        tag: "Only Car Parking",
        description: "Katiki Waterfalls, located near Borra Caves in Araku Valley, is a beautiful natural waterfall surrounded by lush forests. This scenic attraction is perfect for adventure lovers and nature enthusiasts visiting from Vizag.",
      },
      {
        name: "Galikonda Viewpoint",
        image: Galikondaviewpoint,
        imageAlt: "Galikonda Viewpoint sunrise over misty mountains, the highest viewpoint in Andhra Pradesh",
        description: "Galikonda Viewpoint, one of the highest viewpoints in Andhra Pradesh, offers spectacular sunrise views, mist-covered mountains, and breathtaking landscapes. It's a must-visit attraction on your Vizag to Araku Valley tour.",
      },
      {
        name: "Coffee Plantation",
        image: Coffeeplantation,
        imageAlt: "Araku Valley organic Arabica coffee plantation with wooden bridge and green landscape",
        description: "Explore the famous Araku Valley Coffee Plantations, known for their premium organic Arabica coffee and picturesque green landscapes. A visit to these plantations offers an authentic experience of Andhra Pradesh's coffee culture near Vizag.",
      },
      {
        name: "Coffee Museum",
        image: Coffeemuseum,
        imageAlt: "Araku Coffee Museum showcasing the history and culture of Araku's organic coffee",
        description: "Visit the Araku Coffee Museum and experience the story of India's famous Araku Coffee. Enjoy coffee tastings, handcrafted chocolates, and explore the rich coffee culture of Araku Valley with BSH Taxi Services from Vizag.",
      },
      {
        name: "Tribal Museum",
        image: Tribalmuseum,
        imageAlt: "Araku Tribal Museum exhibits of tribal handicrafts and Eastern Ghats heritage",
        description: "Explore the Araku Tribal Museum, one of the best cultural attractions in Araku Valley, showcasing tribal traditions, handicrafts, art, and the unique heritage of the Eastern Ghats in Andhra Pradesh.",
      },
      {
        name: "Padmapuram Gardens",
        image: Padmapuramgardens,
        imageAlt: "Padmapuram Gardens in Araku Valley with botanical gardens and tree-top cottages",
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
    imageAlt: "Vizag to Lambasingi taxi service through the scenic Eastern Ghats hills",
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
  "Lambasingi, locally known as \"Korra Bayalu,\" is a small hill village in the Chintapalle area of Alluri Sitharama Raju district, Andhra Pradesh. Located at an elevation of around 1,000 metres in the Eastern Ghats, the village is known for its unusually cool winter climate, misty mornings, and occasional frost-like conditions. This distinctive weather has earned Lambasingi the popular nickname \"Kashmir of Andhra Pradesh\" and made it a well-known hill destination for travellers from Vizag and across Andhra Pradesh.\n\nFor many years, Lambasingi remained a quiet agricultural village, with local communities cultivating coffee, pepper, strawberries, dragon fruit, and other hill crops suited to its cool climate. As awareness of its winter weather and scenic surroundings grew, Lambasingi gradually developed into a popular weekend getaway. Nearby attractions such as Thajangi Reservoir and Kothapalli Waterfalls have further expanded the area into a scenic Eastern Ghats circuit, making Lambasingi suitable for sightseeing, nature trips, and short outstation journeys from Vizag.",
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
    imageAlt: "Vizag local sightseeing taxi and tour package covering RK Beach, Kailasagiri and Rushikonda Beach",
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
  "Visakhapatnam, commonly known as Vizag, has a long coastal history shaped by its natural harbour, maritime trade, fishing communities, and strategic importance along the Bay of Bengal. Over time, the city developed from a coastal settlement into an important port and industrial centre, while its beaches, hills, and coastline helped shape its identity as a major tourist destination in Andhra Pradesh.\n\nRushikonda Beach is one of Vizag's best-known coastal attractions. The name \"Rushikonda\" is traditionally associated with local legends of sages performing penance in the area. Once a quieter fishing shoreline, Rushikonda gradually became a popular tourism destination as Vizag's beach and water-sports infrastructure developed. Today, its sandy beach, surrounding hills, and water-based activities make it an important stop on Vizag local sightseeing tours.\n\nVizag's local sightseeing circuit also includes major landmarks such as RK Beach, Kailasagiri, and the INS Kurusura Submarine Museum. Kailasagiri is known for its hilltop views of the coastline and the large Shiva and Parvati statues, while the submarine museum preserves the history of India's naval service and has become one of the city's popular attractions.\n\nTogether, Vizag's beaches, hill viewpoints, museums, temples, and maritime landmarks form a diverse local sightseeing circuit. Visitors can explore these attractions through a Vizag local sightseeing taxi or tour package, making it convenient to cover the city's major coastal and cultural destinations in a single day.",
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
    imageAlt: "Simhachalam Temple taxi service in Vizag for Sri Varaha Lakshmi Narasimha Swamy Temple",
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
  "Simhachalam Temple, also known as Sri Varaha Lakshmi Narasimha Swamy Temple, is one of the most important Hindu pilgrimage sites in Visakhapatnam. The name Simhachalam means \"Lion's Hill,\" reflecting the temple's association with Lord Narasimha. According to temple tradition, the presiding deity is worshipped in the unique Varaha Narasimha form, combining aspects of Lord Varaha and Lord Narasimha. The temple is closely associated with the story of Prahlada and Lord Narasimha and remains an important centre of Vaishnavite worship in Andhra Pradesh.\n\nThe temple has a long documented history, with inscriptions dating back to the 11th century. Over the centuries, Simhachalam received patronage from several South Indian dynasties, including the Cholas, Eastern Gangas, Chalukyas, and Vijayanagara rulers. These successive periods of patronage contributed to the temple's distinctive architecture, elaborate stone carvings, large courtyards, gateways, and imposing gopuram.\n\nOne of the most distinctive traditions at Simhachalam is the sandalwood covering of the main deity. Throughout most of the year, the idol is covered with sandalwood paste, giving it a distinctive appearance. During the annual Chandanotsavam festival, the sandalwood covering is removed and devotees are given an opportunity to see the deity in its traditional form. The festival attracts large numbers of pilgrims from Visakhapatnam and other parts of Andhra Pradesh.\n\nThe temple's architecture reflects a combination of regional South Indian styles and features developed under different ruling dynasties. Its fortified appearance, stone pillars, detailed carvings, multiple courtyards, gateways, and tall rajagopuram give Simhachalam Temple a distinctive architectural character. The hilltop setting also provides views over parts of Visakhapatnam and the surrounding landscape.\n\nToday, Simhachalam Temple remains one of the most visited pilgrimage destinations in Visakhapatnam. Its combination of ancient religious traditions, historic inscriptions, distinctive Varaha Narasimha worship, Chandanotsavam celebrations, and impressive architecture makes it an important religious and heritage landmark. For visitors exploring Vizag, a trip to Simhachalam is a popular pilgrimage and sightseeing experience that can be easily included in a local sightseeing or temple tour.",
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
    imageAlt: "Vizag to Tirupati taxi service for Sri Venkateswara Temple pilgrimage",
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
  "Tirupati is one of the most important pilgrimage destinations in Andhra Pradesh and is closely associated with the famous Sri Venkateswara Temple at Tirumala. The temple stands on the seventh peak of the Seshachalam Hills and is dedicated to Lord Venkateswara, a revered form of Lord Vishnu. Devotees traditionally regard Tirumala as a sacred destination and often refer to the temple as \"Kaliyuga Vaikuntha,\" reflecting its importance in Hindu religious tradition.\n\nThe history of the Sri Venkateswara Temple extends back many centuries, with ancient literary references, inscriptions, and historical records documenting its religious importance. The temple received patronage from several South Indian dynasties, including the Pallavas, Cholas, Pandyas, and Vijayanagara rulers. The Vijayanagara period was particularly significant, with rulers such as Krishnadevaraya making substantial contributions to the temple's development and religious institutions. An inscription associated with the Pallava queen Samavai from 966 CE is among the important early records connected with the temple.\n\nOver the centuries, the Tirumala temple complex expanded into a major pilgrimage centre with elaborate architecture, towering gopurams, sacred shrines, traditional rituals, and extensive facilities for devotees. The temple's religious traditions have continued through generations, attracting pilgrims from across India and from around the world.\n\nToday, the Sri Venkateswara Temple is administered by the Tirumala Tirupati Devasthanams (TTD), which manages the temple's religious activities, pilgrim facilities, accommodation, and other services across Tirumala and Tirupati. The enormous number of visitors throughout the year has made Tirupati one of India's best-known pilgrimage cities.\n\nFor travellers from Vizag, a trip to Tirupati and Tirumala is a significant long-distance pilgrimage journey. Visitors can combine the temple visit with other religious and cultural attractions around Tirupati, making the city an important destination for devotees, families, and travellers exploring the spiritual heritage of Andhra Pradesh.",
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
    imageAlt: "Vizag to Annavaram taxi service for Sri Satyanarayana Swamy Temple on Ratnagiri Hill",
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
  "The Sri Veera Venkata Satyanarayana Swamy Temple at Annavaram is one of the important pilgrimage destinations in Andhra Pradesh. The temple stands on Ratnagiri Hill and has a long association with Sri Satyanarayana Swamy worship. The present shrine developed over time from an earlier place of worship, with the temple complex undergoing major construction and renovation during the 20th and early 21st centuries.\n\nAnnavaram is especially famous for the Satyanarayana Swamy Vratam, a traditional puja performed by devotees throughout the year. Families visit the temple to perform the vratam on important occasions and to seek blessings for prosperity, health, and well-being. This strong religious tradition has made Annavaram an important pilgrimage centre for devotees travelling from Vizag, Kakinada, Rajahmundry, and other parts of Andhra Pradesh.\n\nThe temple's hilltop location on Ratnagiri Hill adds to its distinctive character, with the Pampa River flowing around the surrounding landscape. Annavaram has developed into a well-known pilgrimage and cultural destination while retaining its traditional temple atmosphere. Today, visitors travelling from Vizag can easily plan Annavaram as a one-day pilgrimage trip or combine it with nearby destinations in the Godavari region.",
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
    imageAlt: "Vizag to Arasavalli taxi service for Sri Suryanarayana Swamy Temple in Srikakulam",
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
  "The Sri Suryanarayana Swamy Temple at Arasavalli, near Srikakulam, is one of the important historic Sun temples in Andhra Pradesh. The temple is traditionally associated with the worship of Lord Surya and has a long religious history in the region. Historical traditions and inscriptions connect the temple with the Eastern Ganga dynasty and the Kalinga architectural style, reflecting the cultural links between northern Andhra Pradesh and Odisha.\n\nOne of the most distinctive features of the Arasavalli Sun Temple is its carefully planned orientation. During specific solar occasions, including Ratha Saptami, sunlight enters through the temple's gateways and falls on the deity in the sanctum. This unusual relationship between the temple's architecture and the movement of sunlight is an important reason why Arasavalli attracts both pilgrims and visitors interested in India's traditional temple architecture.\n\nThe temple is especially significant during Ratha Saptami, an important festival dedicated to Lord Surya. Large numbers of devotees visit Arasavalli during the festival and throughout the year to offer prayers and participate in religious rituals. Located close to Srikakulam town, the temple remains an important pilgrimage and heritage destination in North Coastal Andhra Pradesh.",
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
    imageAlt: "Vizag to Vanjangi Hills taxi service for the Sea of Clouds sunrise near Paderu",
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
  "Vanjangi, also known as Vanajangi, is a scenic tribal village in the Eastern Ghats of Alluri Sitharama Raju district near Paderu. Located at a high elevation, the area is surrounded by forested hills and valleys and is known for its cool climate, misty landscapes, and spectacular sunrise views. For many years, Vanjangi remained a quiet hill settlement before gaining popularity among travellers and nature enthusiasts.\n\nVanjangi became widely known for its winter sunrise, when clouds often fill the valleys below the viewpoint, creating the spectacular sight popularly called \"Megha Samudram,\" or Ocean of Clouds. The destination has since become a popular sunrise and nature sightseeing spot for visitors exploring the Paderu and Eastern Ghats region. Its relatively remote setting and early-morning trek add to the unique experience, making Vanjangi a popular destination for travellers looking for scenic hill landscapes and offbeat places near Vizag.",
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
  name: "Alluri sitarama raju international airport",
  image: vizagairport, // replace with "../assets/destinations/vizag-airport.jpg"
  imageAlt: "Vizag Airport taxi service for 24/7 pickup and drop at Visakhapatnam International Airport",
  distanceFromVizag: "50 KM from Vizag City Center",
  distanceKm: 50,
  driveTime: "01hr 30mins",
 
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
  costPerDay: 2500,
  history:
  "Alluri Sitarama Raju International Airport is the new international greenfield airport developed at Bhogapuram in Vizianagaram district of Andhra Pradesh. The airport was created as a major aviation gateway for Visakhapatnam, Vizianagaram, Srikakulam, and the wider North Coastal Andhra region. Its development represents an important step in strengthening air connectivity, tourism, trade, business, and economic growth across North Andhra. The Need for a New Airport Before the development of the Bhogapuram airport, Visakhapatnam was primarily served by Visakhapatnam Airport, also known as Vizag Airport, located within INS Dega. The existing airport has operated as a civil enclave and began civilian operations in 1981 with one flight per day. Over the years, passenger traffic increased as Visakhapatnam developed into a major port, industrial, naval, commercial, and tourism centre. As air travel continued to grow, the need for a larger and more modern airport became increasingly important. The new airport at Bhogapuram was planned to provide additional capacity and modern infrastructure while supporting the long-term development of the North Andhra region. Planning of Bhogapuram International Airport Bhogapuram was identified as a suitable location for a new greenfield airport. The project received in-principle approval under India's Greenfield Airports Policy, and the airport was planned as a major international aviation facility for Andhra Pradesh. An important agreement was signed between the Airports Authority of India and the Government of Andhra Pradesh on 12 September 2022. The project was subsequently structured for development through a public-private partnership, with GMR Visakhapatnam International Airport Limited selected as the airport developer. Foundation Stone and Construction A major milestone in the airport's history came on 3 May 2023, when the foundation stone for the development of Bhogapuram International Airport was laid. The first phase was planned with an estimated cost of ₹4,592 crore and an initial capacity of 6 million passengers per year. The airport was planned as a large greenfield facility with a 3,800-metre runway and a 5,000-square-metre cargo terminal. The overall development plan was designed in three phases, with the eventual capacity planned to increase from 6 million passengers per year to 12 million and finally to 18 million passengers per year. The project was envisioned not simply as an airport, but as an important piece of infrastructure for the future growth of North Andhra. Better air connectivity was expected to support tourism, industries, businesses, employment, investment, and regional development. A Modern Airport for North Andhra During construction, the airport was designed with modern passenger facilities and infrastructure suitable for both domestic and international aviation. The passenger terminal was designed to provide a modern and comfortable travel experience while also reflecting the cultural identity of Andhra Pradesh. The terminal's architectural concept draws inspiration from traditional Andhra Pradesh elements, including Chuttilu-style cottages, the landscapes of Araku Valley, and the flying fish. This gives the airport a distinctive regional identity while combining traditional influences with modern airport architecture. The airport's development also includes facilities intended to support passenger processing, aircraft operations, cargo movement, road connectivity, and future expansion. Connection with the Legacy of Alluri Sitarama Raju The airport carries the name of Alluri Sitarama Raju, one of Andhra Pradesh's most respected freedom fighters. Alluri Sitarama Raju is remembered for his leadership of the Rampa Rebellion and his association with the tribal communities of the Eastern Ghats. Naming the new airport after Alluri Sitarama Raju gives the modern aviation facility a strong historical and cultural identity. The airport stands in the broader North Andhra region whose history and landscape are closely connected with the tribal communities and Eastern Ghats associated with his legacy. At the airport's inauguration, the Prime Minister highlighted Alluri Sitarama Raju's dedication to the welfare of tribal communities and described the new airport as an important runway for the growth of Andhra and North Andhra and a launchpad for the future of the state's youth. Inauguration of Alluri Sitarama Raju International Airport A historic milestone was reached on 1 August 2026, when Prime Minister Narendra Modi inaugurated the new airport at Bhogapuram. The airport was developed under the Public-Private Partnership model at a cost of more than ₹5,640 crore and was designed to handle approximately 6 million passengers annually in its initial phase. The inauguration marked the beginning of a new chapter in aviation for North Andhra. The airport was formally presented as a major infrastructure project intended to strengthen regional connectivity and contribute to economic development. Importance for Visakhapatnam and North Andhra Alluri Sitarama Raju International Airport is strategically important because of its location and its connection to one of Andhra Pradesh's fastest-growing regions. The airport provides an important gateway for people travelling to Visakhapatnam, Vizianagaram, Srikakulam, and other parts of North Andhra. The airport is also expected to support tourism to destinations such as Araku Valley, Borra Caves, Lambasingi, Simhachalam, and other attractions across the Eastern Ghats and coastal Andhra region. Improved air connectivity can also benefit industries, businesses, educational institutions, healthcare travel, pilgrimage, government services, and the region's growing tourism sector. A Gateway to Tourism North Andhra is known for its combination of beaches, hills, forests, tribal culture, temples, and historical attractions. With the new airport at Bhogapuram, travellers arriving in the region have improved access to Visakhapatnam and popular tourist destinations. For tourists planning trips to Araku Valley, Borra Caves, Lambasingi, Vizianagaram, Srikakulam, and other destinations, the airport can serve as an important starting point for road journeys throughout the region. The Future of the Airport The airport has been planned with future expansion in mind. Its development is structured in multiple phases, with the long-term plan increasing passenger-handling capacity from 6 million passengers per year to 12 million and eventually 18 million passengers per year. This phased approach allows the airport to expand according to passenger demand and regional growth. As Visakhapatnam and North Andhra continue to develop in tourism, industry, technology, trade, and infrastructure, the airport is expected to become an increasingly important part of the region's transportation network. Alluri Sitarama Raju International Airport Today Today, Alluri Sitarama Raju International Airport represents a combination of history, modern aviation, regional development, and cultural identity. From the growing aviation needs of Visakhapatnam to the development of a new greenfield airport at Bhogapuram, its story reflects the transformation of North Andhra into an increasingly connected region. For passengers travelling to and from the airport, reliable road transportation is an important part of the overall journey. Airport taxi services provide convenient connectivity between Alluri Sitarama Raju International Airport and Visakhapatnam city, hotels, railway stations, business areas, tourist destinations, and nearby towns. For travellers looking for a Vizag airport taxi, Visakhapatnam airport cab, Bhogapuram airport taxi, or airport transfer service, BSH Taxi Services provides convenient road transportation for airport arrivals and departures, local travel, and outstation journeys across Andhra Pradesh.Alluri Sitarama Raju International Airport therefore represents more than a new airport. It is a major gateway connecting North Andhra with the rest of India and the world, while carrying forward the name and legacy of one of Andhra Pradesh's most inspiring historical figures.", 
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

  "Alluri Sitarama Raju International Airport operates as a modern international gateway to North Andhra, serving passengers travelling to Visakhapatnam, Vizianagaram, Srikakulam, and nearby destinations. The region can be visited throughout the year, with the cooler months from October to March being especially popular for tourism. BSH Taxi Services provides convenient airport pickup and drop services for passengers travelling to and from the airport.",

    howToReach:

      "Alluri Sitarama Raju International Airport is located at Bhogapuram in Vizianagaram district, approximately 40 KM from Visakhapatnam city. The airport is well connected by road to Visakhapatnam, Vizianagaram, Srikakulam, and other parts of North Andhra. Book your Vizag Airport taxi with BSH Taxi Services for comfortable, reliable, and convenient airport transfers to Visakhapatnam city, hotels, railway stations, tourist destinations, Araku Valley, and nearby locations.",

    funFact:

      "Alluri Sitarama Raju International Airport is a newly developed greenfield international airport at Bhogapuram and is named after Alluri Sitarama Raju, the legendary freedom fighter and leader of the Rampa Rebellion. The airport has been planned for phased expansion, with an initial passenger capacity of around 6 million passengers per year and future expansion planned to serve up to 18 million passengers annually. It is designed to become an important aviation gateway for Visakhapatnam and the wider North Coastal Andhra region.",
    importantNotes: [
        "The above prices do not include tolls, entry fees, parking fees and driver food.",
        "We track your flight status in real time, so pickup timing adjusts automatically for delays or early arrivals.",
      ],

},
];