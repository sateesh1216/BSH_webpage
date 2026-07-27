# BSH Taxi Services — React + Tailwind

## Setup (drop into your existing Vite project)

```bash
npm install lucide-react
```

`tailwindcss` / `@tailwindcss/vite` (or `autoprefixer` + `postcss`) should already be installed per your terminal screenshot.
Copy `tailwind.config.ts` and `postcss.config.js` into your project root (or merge with existing ones), then copy everything in `src/` into your `src/`.

## Structure

```
src/
├── main.tsx                 # ReactDOM entry
├── App.tsx                  # Root component -> MainLayout > Home
├── index.css                # Tailwind directives + body background
├── layouts/
│   └── MainLayout.tsx        # Header + <main> + Footer wrapper
├── pages/
│   └── Home.tsx               # Composes all home page sections
├── components/
│   ├── layout/
│   │   ├── Header.tsx         # Sticky nav, mobile menu
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── Hero.tsx           # Left copy + right BookingCard
│   │   ├── BookingCard.tsx    # "Get Instant Fare" card (uses useFareCalculator)
│   │   ├── TrustBar.tsx       # 24/7 Service / Affordable Rates / ... strip
│   │   ├── Features.tsx       # "Why Choose Us" 4-up grid
│   │   ├── Services.tsx       # Local / Outstation / Airport cards
│   │   ├── Fleet.tsx          # Fleet cards w/ gradient "Book Now"
│   │   └── CTA.tsx            # Solid-primary call banner
│   └── ui/
│       ├── Button.tsx         # variant="primary|outline|gradient"
│       └── SectionHeading.tsx
├── data/                     # All copy/content lives here — edit freely
│   ├── nav.ts
│   ├── vehicles.ts
│   ├── tripTypes.ts
│   ├── heroFeatures.ts
│   ├── trustItems.ts
│   ├── features.ts
│   ├── services.ts
│   └── fleet.ts
└── hooks/
    └── useFareCalculator.ts  # Ported from script.js's calculateRoute()
```

## Design tokens (tailwind.config.ts)

- `primary` → `#155EEF`, `primary-hover` → `#004EEB`, `primary-light` → `#EFF5FF`
- `bg-hero-glow` → the radial-gradient page background, applied on `<body>` in `index.css`
- `bg-fleet-btn` → `linear-gradient(135deg, #EFF5FF, #DCEAFF)`, used **only** on Fleet "Book Now" buttons

## Notes

- `useFareCalculator` keeps the same **demo distance (15km)** placeholder and Google Maps Routes API integration comment from your original `script.js` — swap `demoDistanceKm` for a real API call there.
- All page copy (nav labels, fleet rates, services, footer text) lives in `src/data/*.ts` — edit those instead of digging through JSX.
- Mobile menu toggle replaces the old `toggleMenu()` DOM function with a `useState` in `Header.tsx`.