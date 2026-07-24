import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { navLinks } from "../../data/nav";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/Logo_bsh taxi services.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex min-h-19 w-[92%] max-w-310 items-center justify-between gap-6">
        {/* Logo */}
<Link to="/" className="group flex items-center gap-3">
          <img
            src={logo}
            alt="BSH Taxi Services"
            className="h-12 w-auto shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="flex flex-col leading-none">
            <span className="whitespace-nowrap text-xl font-extrabold tracking-tight sm:text-2xl">
              <span className="text-slate-900">BSH</span>{" "}
              <span className="bg-linear-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
                TAXI
              </span>
            </span>
            <span className="mt-1 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
              Services
            </span>
          </span>
        </Link>
           {/* <Link to="/" className="flex items-center gap-2.5">
          <img
            src={logo}
            alt="BSH Taxi Services"
            className="h-12 w-auto shrink-0 object-contain"
          />
          <span className="whitespace-nowrap text-sm font-extrabold leading-none tracking-tight">
            <span className="text-black">BSH </span>
            <span className="text-yellow-500">TAXI </span>
            <span className="text-black">SERVICES</span>
          </span>
        </Link> */}
          
        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 text-sm font-semibold text-slate-600 lg:flex">
          {navLinks.map((link) => {
            const active = location.pathname === link.href;

            return (
              <Link
                key={link.label}
                to={link.href}
                className={`relative rounded-lg px-3.5 py-2 transition-colors ${
                  active
                    ? "text-primary"
                    : "hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {link.label}

                {active && (
                  <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Call CTA */}
        <div className="hidden lg:flex">
          <a
            href="tel:+918886803322"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/30"
          >
            <Phone size={16} />
            +91 8886803322
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100 lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-slate-200 bg-white px-[4%] py-4 lg:hidden">
          {navLinks.map((link) => {
            const active = location.pathname === link.href;

            return (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-primary-light text-primary"
                    : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <a
            href="tel:+918886803322"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-primary/30"
          >
            <Phone size={16} />
            +91 8886803322
          </a>
        </nav>
      )}
    </header>
  );
}