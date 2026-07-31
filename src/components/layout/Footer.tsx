import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaRoute,
  FaCity,
  FaPlaneDeparture,
  FaBuilding,
  FaSuitcaseRolling,
  FaRing,
} from "react-icons/fa";
import { MessageCircle } from "lucide-react";
import { navLinks } from "../../data/nav";
import { FaTag, FaMapMarkedAlt, FaBell } from "react-icons/fa";

const quickLinks = navLinks.filter((link) =>
  ["Home", "Services", "Our Fleet", "Destinations", "About Us", "Contact Us"].includes(
    link.label,
  ),
);

// Each service gets its own icon + accent color so the list scans instantly
// `slug` must match the `slug` used in ../../data/servicesData.ts so these
// links route to the correct /services/:slug detail page.
const serviceLinks = [
  { label: "Outstation Taxi", slug: "outstation-taxi", icon: FaRoute, color: "text-sky-400" },
  { label: "Local Taxi", slug: "local-taxi", icon: FaCity, color: "text-emerald-400" },
  { label: "Airport Transfer", slug: "airport-transfer", icon: FaPlaneDeparture, color: "text-amber-400" },
  { label: "Corporate Travel", slug: "corporate-travel", icon: FaBuilding, color: "text-violet-400" },
  { label: "Tour Packages", slug: "tour-packages", icon: FaSuitcaseRolling, color: "text-rose-400" },
  { label: "Wedding Cars", slug: "wedding-car-rentals", icon: FaRing, color: "text-pink-400" },
];

// `slug` must match the `slug` used in ../../data/servicesData.ts (destinations
// array) so these links route to the correct /destinations/:slug detail page.
// "And More" routes to the full destinations listing instead of a single slug.
const destinationLinks = [
  { label: "Araku Valley", slug: "araku-valley", color: "text-emerald-400" },
  { label: "Lambasingi", slug: "lambasingi", color: "text-sky-400" },
  { label: "Tirupati", slug: "tirupati", color: "text-amber-400" },
  { label: "Simhachalam Temple", slug: "simhachalam-temple", color: "text-violet-400" },
  { label: "Vanjangi Hills", slug: "vanjangi-hills", color: "text-rose-400" },
  { label: "And More", slug: null, color: "text-slate-400" },
];

const socialLinks = [
  { icon: FaFacebookF, label: "Facebook", href: "https://www.facebook.com/bshtaxiservices", hoverBg: "hover:bg-[#1877F2]" },
  { icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/bshtaxiservices/", hoverBg: "hover:bg-gradient-to-tr hover:from-[#FEDA75] hover:via-[#D62976] hover:to-[#4F5BD5]" },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/918886803322", hoverBg: "hover:bg-[#25D366]" },
  { icon: FaYoutube, label: "YouTube", href: "https://www.youtube.com/@bshtaxiservices4129", hoverBg: "hover:bg-[#FF0000]" },
];

const BUSINESS = {
  phone: "+91 88868 03322",
  phoneHref: "tel:+918886803322",
  email: "info@bshtaxiservices.com",
  addressLine: "Visakhapatnam, Andhra Pradesh, India",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  name: "BSH Taxi Services",
  image: "https://bshtaxiservices.com/logo.png",
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Visakhapatnam",
    addressRegion: "Andhra Pradesh",
    addressCountry: "IN",
  },
  areaServed: ["Visakhapatnam", "Araku Valley", "Lambasingi", "Tirupati", "Puri", "Hyderabad"],
  sameAs: socialLinks.map((s) => s.href),
  url: "https://bshtaxiservices.com",
};

export default function Footer() {

  return (
    <footer id="contact" className="bg-[#0B1220] text-slate-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <h2 className="sr-only">Site footer, contact and quick links</h2>

      {/* thin gradient accent strip at the top of the footer */}
      <div className="h-[3px] w-full bg-gradient-to-r from-sky-400 via-primary to-rose-400" />

      <div className="w-full px-6 py-14 sm:px-10 lg:px-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4 text-lg font-bold leading-tight">
              <span className="text-white">BSH </span>
              <span className="text-primary">TAXI SERVICES</span>
            </div>
<p className="max-w-xs text-sm leading-relaxed text-slate-400">
  BSH Taxi Services is a trusted{" "}
  <a
    href="https://bshtaxiservices.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:underline"
  >
    <strong>taxi service in Vizag</strong>
  </a>{" "}
  offering local taxi services, airport taxi, outstation cabs, corporate travel, wedding car rentals, and tour packages at affordable prices.
</p>
            <address
              itemScope
              itemType="https://schema.org/LocalBusiness"
              className="mt-5 flex flex-col gap-2.5 text-sm not-italic text-slate-400"
            >
              <a href={BUSINESS.phoneHref} itemProp="telephone" className="flex items-center gap-2.5 transition-colors hover:text-sky-400">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sky-400/10 text-sky-400">
                  <FaPhoneAlt size={11} />
                </span>
                {BUSINESS.phone}
              </a>
              <a href={`mailto:${BUSINESS.email}`} itemProp="email" className="flex items-center gap-2.5 transition-colors hover:text-amber-400">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-amber-400/10 text-amber-400">
                  <FaEnvelope size={11} />
                </span>
                {BUSINESS.email}
              </a>
              <span itemProp="address" className="flex items-start gap-2.5">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-400/10 text-emerald-400">
                  <FaMapMarkerAlt size={11} />
                </span>
                {BUSINESS.addressLine}
              </span>
            </address>

            <div className="mt-5 flex items-center gap-2.5">
              {socialLinks.map(({ icon: Icon, label, href, hoverBg }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`Visit BSH Taxi Services on ${label}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`grid h-9 w-9 place-items-center rounded-full bg-white/5 text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:text-white ${hoverBg}`}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links">
            <h3 className="mb-4 text-sm font-semibold text-white">Quick Links</h3>
            <div className="flex flex-col gap-2.5 text-sm">
              {quickLinks.map((link) => (
                <a key={link.label} href={link.href} className="w-fit text-slate-400 transition-colors hover:text-primary">
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Our Services — icon + color per item, routes to /services/:slug */}
          <nav aria-label="Our services">
            <h3 className="mb-4 text-sm font-semibold text-white">Our Services</h3>
            <div className="flex flex-col gap-3 text-sm">
              {serviceLinks.map(({ label, slug, icon: Icon, color }) => (
                <Link
                  key={slug}
                  to={`/services/${slug}`}
                  className="group flex w-fit items-center gap-2.5 text-slate-400 transition-colors hover:text-white"
                >
                  <Icon size={13} className={`${color} transition-transform group-hover:scale-110`} />
                  {label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Destinations — color-coded dots, routes to /destinations/:slug */}
          <nav aria-label="Popular destinations">
            <h3 className="mb-4 text-sm font-semibold text-white">Destinations</h3>
            <div className="flex flex-col gap-3 text-sm">
              {destinationLinks.map(({ label, slug, color }) => (
                <Link
                  key={label}
                  to={slug ? `/destinations/${slug}` : "/destinations"}
                  className="group flex w-fit items-center gap-2.5 text-slate-400 transition-colors hover:text-white"
                >
                  <span className={`h-1.5 w-1.5 rounded-full bg-current ${color} transition-transform group-hover:scale-150`} />
                  {label}
                </Link>
              ))}
            </div>
          </nav>

         {/* Newsletter — reframed around real traveler value, not generic "updates" */}
<div>
  <h3 className="mb-4 text-sm font-semibold text-white">Travel Perks</h3>
  <p className="mb-4 text-sm text-slate-400">
    Get fare drops, festive package deals, and route tips before anyone else.
  </p>

  {/* value props — why someone should actually subscribe */}
  <ul className="mb-4 flex flex-col gap-2 text-xs text-slate-400">
    <li className="flex items-center gap-2">
      <FaTag size={11} className="shrink-0 text-amber-400" />
      Early access to seasonal tour discounts
    </li>
    <li className="flex items-center gap-2">
      <FaMapMarkedAlt size={11} className="shrink-0 text-emerald-400" />
      New destination routes as we add them
    </li>
    <li className="flex items-center gap-2">
      <FaBell size={11} className="shrink-0 text-sky-400" />
      Fare alerts for outstation & airport trips
    </li>
  </ul>

  {/* <form onSubmit={handleSubscribe} className="flex flex-col gap-2.5">
    <label htmlFor="footer-email" className="sr-only">Email address</label>
    <input
      id="footer-email"
      type="email"
      required
      value={email}
      onChange={(event) => setEmail(event.target.value)}
      placeholder="Enter your email"
      className="w-full rounded-lg border border-white/10 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/40"
    />
    <button
      type="submit"
      className="w-full shrink-0 rounded-lg bg-gradient-to-r from-primary to-rose-500 px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-[#0B1220]"
    >
      {subscribed ? "You're in ✓" : "Get travel deals"}
    </button>
  </form> */}

  {/* fast path for people who want a ride NOW, not a newsletter later */}
  <a
    href="https://wa.me/918886803322"
    target="_blank"
    rel="noopener noreferrer"
    className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-5 py-2.5 text-sm font-medium text-emerald-400 transition-colors hover:bg-emerald-400/20"
  >
    Need a cab right now? WhatsApp us
  </a>
</div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-700/60 pt-6 text-center text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} BSH Taxi Services. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <a href="/privacy-policy" className="hover:text-primary">Privacy Policy</a>
            <span className="text-slate-700">|</span>
            <a href="/terms" className="hover:text-primary">Terms &amp; Conditions</a>
            <span className="text-slate-700">|</span>
            <a href="/sitemap.xml" className="hover:text-primary">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}