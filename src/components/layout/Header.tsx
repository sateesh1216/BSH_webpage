import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { navLinks } from "../../data/nav";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/Logo_bsh taxi services.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/30 bg-white/30 backdrop-blur-xl shadow-lg">
      <div className="mx-auto flex h-20 w-[92%] max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-3">
          <img
            src={logo}
            alt="BSH Taxi Services"
            className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />

          <span className="flex flex-col leading-none">
            <span className="text-xl font-extrabold tracking-tight sm:text-2xl">
              <span className="text-black">BSH </span>
              <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                TAXI
              </span>
            </span>

            <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-700">
              SERVICES
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-3 lg:flex">
          {navLinks.map((link) => {
            const active = location.pathname === link.href;

            return (
              <Link
                key={link.label}
                to={link.href}
                className={`group relative px-3 py-2 text-sm font-semibold transition-all duration-300 ${
                  active
                    ? "text-[#155EEF]"
                    : "text-black hover:text-[#155EEF]"
                }`}
              >
                {link.label}

                <span
                  className={`absolute left-0 bottom-0 h-[2px] w-full rounded-full bg-[#155EEF] transition-all duration-300 ${
                    active
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  } origin-center`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Call Button */}
        <div className="hidden lg:flex">
          <a
            href="tel:+918886803322"
            className="inline-flex items-center gap-2 rounded-full bg-[#155EEF] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#0F4FD8]"
          >
            <Phone size={18} />
            +91 8886803322
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="grid h-11 w-11 place-items-center rounded-full bg-white/50 backdrop-blur-md transition hover:bg-white/70 lg:hidden"
        >
          {menuOpen ? (
            <X size={24} className="text-black" />
          ) : (
            <Menu size={24} className="text-black" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden border-t border-white/20 bg-white/40 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-2 px-5 py-5">
          {navLinks.map((link) => {
            const active = location.pathname === link.href;

            return (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                  active
                    ? "bg-[#155EEF] text-white"
                    : "text-black hover:bg-[#155EEF]/10 hover:text-[#155EEF]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <a
            href="tel:+918886803322"
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[#155EEF] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#0F4FD8]"
          >
            <Phone size={18} />
            +91 8886803322
          </a>
        </nav>
      </div>
    </header>
  );
}