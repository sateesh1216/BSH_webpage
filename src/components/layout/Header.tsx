import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { navLinks } from "../../data/nav";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/Logo_bsh taxi services.webp";
import HeaderSearchBar from "../home/Headersearchbar";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Refs used to measure the nav-links pill's EXACT rendered box (it's
  // content-width, not a fixed size, so there's no Tailwind class that can
  // guarantee this — we read the real DOM rect instead) and mirror that
  // left offset + width onto the search row below it.
  const shellRef = useRef<HTMLDivElement | null>(null);
  const navPillRef = useRef<HTMLElement | null>(null);
  const [pillBounds, setPillBounds] = useState<{ left: number; width: number } | null>(null);

  useLayoutEffect(() => {
    function measure() {
      if (!shellRef.current || !navPillRef.current) return;
      const shellRect = shellRef.current.getBoundingClientRect();
      const pillRect = navPillRef.current.getBoundingClientRect();
      setPillBounds({
        left: pillRect.left - shellRect.left,
        width: pillRect.width,
      });
    }

    measure();

    // Re-measure on resize, and whenever the pill itself changes size
    // (e.g. web font finishing load, nav items changing).
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (navPillRef.current) ro.observe(navPillRef.current);
    if (shellRef.current) ro.observe(shellRef.current);

    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <div
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-500 lg:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
          scrolled
            ? "border-white/50 bg-white/80 shadow-[0_10px_40px_-10px_rgba(15,23,42,0.18)] backdrop-blur-2xl"
            : "border-white/25 bg-white/15 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.08)] backdrop-blur-xl"
        }`}
      >
        {/* Top hairline highlight for glass depth */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/70 to-transparent" />

        {/* Signature accent: a whisper of taxi-livery checker, not a literal
            block — a fine diagonal check fading in from the edges into a
            solid brand line at center. This is the one bold flourish in an
            otherwise quiet header, and it only shows once scrolled so it
            reads as an earned detail rather than default decoration. */}
  

        {/* Single shared-width shell for BOTH rows below. Defining
            `w-[92%] max-w-7xl mx-auto` exactly once here — instead of on
            each row separately — is what guarantees the search bar's
            left/right edges land on the exact same pixels as the logo and
            call button above it. Never duplicate this width elsewhere in
            the header. */}
        <div ref={shellRef} className="mx-auto w-[92%] max-w-5xl">
          {/* Main row: logo + nav + call button. */}
          <div className="flex h-14 items-center justify-between gap-2 lg:gap-3 xl:gap-4">
            {/* Logo */}
            <Link to="/" className="group flex shrink-0 items-center gap-2">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-amber-400/0 blur-lg transition-all duration-500 group-hover:bg-amber-400/40" />
                <img
                  src={logo}
                  alt="BSH Taxi Services"
                  className="relative h-9 w-auto object-contain drop-shadow-sm transition-transform duration-300 ease-out group-hover:-rotate-2 group-hover:scale-105"
                />
              </div>

              <span className="flex flex-col justify-center leading-none">
                <span className="text-base font-extrabold tracking-tight sm:text-lg">
                  <span className="text-slate-900">BSH </span>
                  <span className="bg-linear-to-r from-yellow-400 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                    TAXI
                  </span>
                </span>

                <span className="relative mt-1 flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-slate-500 transition-colors duration-300 group-hover:text-slate-800">
                  Services
                  <span className="relative flex h-1 w-1">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1 w-1 rounded-full bg-emerald-500" />
                  </span>
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-linear-to-r from-primary to-amber-400 transition-all duration-300 group-hover:w-full" />
                </span>
              </span>
            </Link>

            {/* Desktop Navigation — centers the pill in the remaining space
                between the logo and the call button. */}
            <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
              <nav
                ref={navPillRef}
                className="flex shrink-0 items-center gap-0.5 rounded-full border border-white/60 bg-white/45 p-1 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),inset_0_-1px_3px_rgba(15,23,42,0.06)] lg:mx-6 xl:mx-10"
              >
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
                          className="flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-1.5 text-[12px] font-semibold text-slate-700 outline-none transition-colors duration-200 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40 xl:px-3 xl:text-[13px]"
                          aria-expanded={openDropdown === link.label}
                        >
                          {link.label}
                          <ChevronDown
                            size={14}
                            className={`shrink-0 transition-transform duration-300 ${
                              openDropdown === link.label ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <div
                          className={`absolute left-0 top-full z-50 mt-2 w-56 rounded-2xl border border-slate-100 bg-white/95 p-1.5 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.25)] backdrop-blur-xl transition-all duration-300 ${
                            openDropdown === link.label
                              ? "visible translate-y-0 opacity-100"
                              : "invisible -translate-y-2 opacity-0"
                          }`}
                        >
                          {link.children.map((item) => (
                            <Link
                              key={item.label}
                              to={item.href}
                              className="group/item flex items-center justify-between rounded-xl px-3 py-2 text-[13px] font-medium text-slate-700 outline-none transition-all duration-200 hover:bg-primary hover:pl-4 hover:text-white focus-visible:bg-primary focus-visible:pl-4 focus-visible:text-white"
                            >
                              {item.label}
                              <ChevronDown
                                size={12}
                                className="-rotate-90 opacity-0 transition-opacity duration-200 group-hover/item:opacity-70"
                              />
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
                      className={`group relative whitespace-nowrap rounded-full px-2 py-1.5 text-[12px] font-semibold outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary/40 xl:px-3 xl:text-[13px] ${
                        active ? "text-primary" : "text-slate-700 hover:text-primary"
                      }`}
                    >
                      <span className="relative z-10">{link.label}</span>

                      <span
                        className={`absolute inset-0 rounded-full transition-all duration-300 ${
                          active
                            ? "scale-100 bg-white opacity-100 shadow-[0_2px_10px_-2px_rgba(21,94,239,0.3)]"
                            : "scale-90 bg-white/70 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                        }`}
                      />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Call Button */}
            <div className="hidden shrink-0 lg:flex">
              <a
                href="tel:+918886803322"
                aria-label="Call +91 8886803322"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary py-1.5 pl-1.5 pr-1.5 text-[13px] font-semibold text-white shadow-lg shadow-blue-600/20 outline-none transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-blue-600/30 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 xl:pr-5"
              >
                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/15">
                  <Phone size={13} className="animate-[pulse_2.5s_ease-in-out_infinite]" />
                </span>
                <span className="relative hidden flex-col leading-tight xl:flex">
                  <span className="text-[9px] font-medium uppercase tracking-wider text-white/70">
                    Book now
                  </span>
                  <span className="whitespace-nowrap">+91 8886803322</span>
                </span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-full shadow-sm outline-none backdrop-blur-md transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 lg:hidden ${
                menuOpen
                  ? "bg-primary text-white shadow-[0_6px_18px_-4px_rgba(21,94,239,0.5)]"
                  : "bg-white/70 text-slate-900 hover:bg-white/90"
              }`}
            >
              <span className="relative h-5 w-5">
                <Menu
                  size={20}
                  className={`absolute inset-0 transition-all duration-300 ${
                    menuOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                  }`}
                />
                <X
                  size={20}
                  className={`absolute inset-0 transition-all duration-300 ${
                    menuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                  }`}
                />
              </span>
            </button>
          </div>
          {/* /Main row */}

          {/* Search row — sits directly under the nav pill and mirrors its
              exact left offset + width via pillBounds, so its edges line
              up perfectly with the pill above it rather than the shell. */}
          <div className="hidden border-t border-white/30 pb-2 pt-2 lg:block">
            <div
              style={
                pillBounds
                  ? { marginLeft: pillBounds.left, width: pillBounds.width }
                  : { marginLeft: "20%", width: "60%" }
              }
              className="transition-[margin,width] duration-200 ease-out"
            >
              <HeaderSearchBar />
            </div>
          </div>
        </div>
        {/* /Shared-width wrapper for both rows */}

        {/* Mobile Navigation */}
        <nav
          className={`overflow-hidden border-t transition-all duration-300 lg:hidden ${
            menuOpen
              ? "max-h-175 border-slate-100 opacity-100"
              : "max-h-0 border-transparent opacity-0 pointer-events-none"
          }`}
        >
          {/* Same checker-livery whisper, echoed at the top of the mobile
              drawer so the signature detail reads as one motif rather than
              a one-off on the desktop bottom edge. */}
          <div
            className="h-0.75 w-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, rgba(21,94,239,0.4) 0, rgba(21,94,239,0.4) 3px, rgba(245,158,11,0.4) 3px, rgba(245,158,11,0.4) 6px)",
            }}
          />
          <div className="flex flex-col gap-1 bg-white/70 px-4 py-4 backdrop-blur-xl">
            {navLinks.map((link, i) => {
              const active = location.pathname === link.href;

              if (link.children) {
                return (
                  <div
                    key={link.label}
                    style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
                    className={`transition-all duration-300 ${
                      menuOpen ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdown(openDropdown === link.label ? null : link.label)
                      }
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-[13px] font-semibold text-slate-800 outline-none transition-colors duration-200 hover:bg-primary/10 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40"
                    >
                      {link.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${
                          openDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openDropdown === link.label ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="ml-3 mt-1 space-y-0.5 border-l-2 border-primary/15 pl-3">
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            onClick={() => {
                              setMenuOpen(false);
                              setOpenDropdown(null);
                            }}
                            className="block rounded-lg px-2.5 py-1.5 text-[13px] text-slate-600 outline-none transition-colors duration-200 hover:bg-primary hover:text-white focus-visible:bg-primary focus-visible:text-white"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
                  className={`rounded-xl px-3 py-2 text-[13px] font-semibold outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/40 ${
                    menuOpen ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
                  } ${
                    active
                      ? "bg-primary text-white shadow-[0_6px_16px_-4px_rgba(21,94,239,0.4)]"
                      : "text-slate-800 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <a
              href="tel:+918886803322"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-primary to-[#0F4FD8] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_8px_20px_-6px_rgba(21,94,239,0.5)] outline-none transition-all duration-200 hover:shadow-[0_10px_24px_-6px_rgba(21,94,239,0.6)] focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 active:scale-[0.98]"
            >
              <Phone size={16} />
              +91 8886803322
            </a>
          </div>
        </nav>
      </header>

      {/* Spacer so page content doesn't sit under the fixed header. Height
          matches the header's natural height: h-14 main row + border-t
          search row on desktop, h-14 alone on mobile. Adjust if the
          search row's vertical padding changes. */}
      <div className="h-14 lg:h-22" />
    </>
  );
}