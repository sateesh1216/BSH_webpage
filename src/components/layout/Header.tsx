import { useState, useEffect } from "react";
import { Phone, Menu, X, ChevronDown, } from "lucide-react";
import { navLinks } from "../../data/nav";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/Logo_bsh taxi services.webp";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Mobile backdrop overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm transition-opacity duration-500 lg:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
          scrolled
            ? "border-white/40 bg-white/70 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-2xl"
            : "border-white/20 bg-white/20 shadow-lg backdrop-blur-xl"
        }`}
      >
      {/* Subtle gradient accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#155EEF]/40 to-transparent" />

      <div className="mx-auto flex h-20 w-[92%] max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-amber-400/0 blur-md transition-all duration-300 group-hover:bg-amber-400/30" />
            <img
              src={logo}
              alt="BSH Taxi Services"
              className="relative h-14 w-auto object-contain transition-transform duration-300 ease-out group-hover:scale-105"
            />
          </div>

          <span className="flex flex-col leading-none">
            <span className="text-xl font-extrabold tracking-tight sm:text-2xl">
              <span className="text-slate-900">BSH </span>
              <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                TAXI
              </span>
            </span>

            <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-600 transition-colors duration-300 group-hover:text-slate-800">
              Services
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 rounded-full border border-white/40 bg-white/30 p-1.5 shadow-inner lg:flex">

  {navLinks.map((link) => {

    const active = location.pathname === link.href;

    if (link.children) {
      return (
        <div
          key={link.label}
          className="relative"
          onMouseEnter={() => setOpenDropdown(link.label)}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <button
            className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:text-[#155EEF]"
          >
            {link.label}

            <ChevronDown
              size={16}
              className={`transition ${
                openDropdown === link.label
                  ? "rotate-180"
                  : ""
              }`}
            />
          </button>

          <div
            className={`absolute left-0 top-full mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl transition-all duration-300 ${
              openDropdown === link.label
                ? "visible translate-y-0 opacity-100"
                : "invisible -translate-y-2 opacity-0"
            }`}
          >
            {link.children.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-[#155EEF] hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      );
    }

    return (
      <Link
        key={link.label}
        to={link.href}
        className={`group relative rounded-full px-4 py-2 text-sm font-semibold transition ${
          active
            ? "text-[#155EEF]"
            : "text-slate-700 hover:text-[#155EEF]"
        }`}
      >
        <span className="relative z-10">
          {link.label}
        </span>

        <span
          className={`absolute inset-0 rounded-full transition ${
            active
              ? "scale-100 bg-white opacity-100 shadow-sm"
              : "scale-90 bg-white/70 opacity-0 group-hover:scale-100 group-hover:opacity-100"
          }`}
        />
      </Link>
    );
  })}
</nav>

        {/* Call Button */}
        <div className="hidden lg:flex">
          <a
            href="tel:+918886803322"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#155EEF] py-2 pl-2 pr-6 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 outline-none transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-blue-600/30 focus-visible:ring-2 focus-visible:ring-[#155EEF]/50 focus-visible:ring-offset-2"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative grid h-8 w-8 place-items-center rounded-full bg-white/15">
              <Phone size={16} className="animate-[pulse_2.5s_ease-in-out_infinite]" />
            </span>
            <span className="relative">+91 8886803322</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className={`grid h-11 w-11 place-items-center rounded-full backdrop-blur-md transition-all duration-300 lg:hidden ${
            menuOpen
              ? "bg-[#155EEF] text-white"
              : "bg-white/60 text-black hover:bg-white/80"
          }`}
        >
          <span className="relative h-6 w-6">
            <Menu
              size={24}
              className={`absolute inset-0 transition-all duration-300 ${
                menuOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
              }`}
            />
            <X
              size={24}
              className={`absolute inset-0 transition-all duration-300 ${
                menuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
              }`}
            />
          </span>
        </button>
      </div>

      
{/* Mobile Navigation */}
<nav
  className={`overflow-hidden transition-all duration-300 lg:hidden ${
    menuOpen
      ? "max-h-[700px] opacity-100"
      : "max-h-0 opacity-0 pointer-events-none"
  }`}
>
  <div className="flex flex-col gap-1.5 px-5 py-5">
    {navLinks.map((link, i) => {
      const active = location.pathname === link.href;

      // Dropdown Item
      if (link.children) {
        return (
          <div
            key={link.label}
            style={{
              transitionDelay: menuOpen ? `${i * 40}ms` : "0ms",
            }}
            className={`transition-all duration-300 ${
              menuOpen
                ? "translate-x-0 opacity-100"
                : "-translate-x-3 opacity-0"
            }`}
          >
            <button
              type="button"
              onClick={() =>
                setOpenDropdown(
                  openDropdown === link.label ? null : link.label
                )
              }
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-[#155EEF]/10 hover:text-[#155EEF]"
            >
              {link.label}

              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${
                  openDropdown === link.label ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openDropdown === link.label
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="ml-3 mt-2 space-y-1 border-l border-slate-200 pl-3">
                {link.children.map((child) => (
                  <Link
                    key={child.label}
                    to={child.href}
                    onClick={() => {
                      setMenuOpen(false);
                      setOpenDropdown(null);
                    }}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-[#155EEF] hover:text-white"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      }

      // Normal Menu Item
      return (
        <Link
          key={link.label}
          to={link.href}
          onClick={() => setMenuOpen(false)}
          style={{
            transitionDelay: menuOpen ? `${i * 40}ms` : "0ms",
          }}
          className={`rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
            menuOpen
              ? "translate-x-0 opacity-100"
              : "-translate-x-3 opacity-0"
          } ${
            active
              ? "bg-[#155EEF] text-white shadow-md shadow-blue-600/20"
              : "text-slate-800 hover:bg-[#155EEF]/10 hover:text-[#155EEF]"
          }`}
        >
          {link.label}
        </Link>
      );
    })}

    <a
      href="tel:+918886803322"
      className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[#155EEF] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-[#0F4FD8]"
    >
      <Phone size={18} />
      +91 8886803322
    </a>
  </div>
</nav>
      </header>
    </>
  );
}