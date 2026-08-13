import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { navLinks } from "../../data/nav";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/Logo_bsh taxi services.webp";
import HeaderSearchBar from "../home/Headersearchbar";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  // Which second-level item's flyout (grandchildren) is open on desktop, e.g. "Local Taxi Services"
  const [openNested, setOpenNested] = useState<string | null>(null);
  // Mobile: which top-level accordion is open
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  // Mobile: which nested (second-level) accordion is open, e.g. "Local Taxi Services"
  const [openMobileNested, setOpenMobileNested] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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
    setOpenMobileDropdown(null);
    setOpenMobileNested(null);
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

        <div ref={shellRef} className="mx-auto w-[92%] max-w-7xl">
          {/* Main row: logo + nav + call button. */}
          <div className="flex h-16 items-center justify-between gap-4 lg:gap-6 xl:gap-10">
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

            {/* Nav pill — centered, with its own breathing room from logo & button */}
            <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
              <nav
                ref={navPillRef}
                className="flex shrink-0 items-center gap-1 rounded-full border border-white/60 bg-white/45 p-1.5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),inset_0_-1px_3px_rgba(15,23,42,0.06)]"
              >
                {navLinks.map((link) => {
                  const active = location.pathname === link.href;

                  if (link.children) {
                    const children = link.children; // narrow once, reuse everywhere below

                    return (
                      <div
                        key={link.label}
                        className="relative"
                        onMouseEnter={() => setOpenDropdown(link.label)}
                        onMouseLeave={() => {
                          setOpenDropdown(null);
                          setOpenNested(null);
                        }}
                      >
                        <button
                          className="flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-[12px] font-semibold text-slate-700 outline-none transition-colors duration-200 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40 xl:px-4 xl:text-[13px]"
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
                          className={`absolute top-full left-1/2 -translate-x-1/2 z-50 mt-6 ${
                            link.label === "Outstation Taxi" ? "w-[1000px]" : "w-60"
                          } rounded-2xl border border-slate-100 bg-white/95 p-2 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.25)] backdrop-blur-xl transition-all duration-300 ${
                            openDropdown === link.label
                              ? "visible translate-y-0 opacity-100"
                              : "invisible -translate-y-2 opacity-0"
                          }`}
                        >
                          {link.label === "Outstation Taxi" ? (
                            <div className="flex gap-5">
                              {Array.from(
                                {
                                  length: Math.ceil(children.length / 7),
                                },
                                (_, i) => children.slice(i * 7, i * 7 + 7)
                              ).map((column, index) => (
                                <div key={index} className="min-w-[160px]">
                                  {column.map((item) => (
                                    <Link
                                      key={item.label}
                                      to={item.href}
                                      className="block rounded-xl px-3 py-2 text-[13px] font-medium text-slate-700 transition-all duration-200 hover:bg-primary hover:text-white"
                                    >
                                      {item.label}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                            </div>
                          ) : (
                            children.map((item) => {
                              const hasNested = !!item.children?.length;
                              // Wide multi-column grid for flyouts with a lot of
                              // grandchildren (e.g. "Outstation Taxi" -> city list)
                              const isWideNested = hasNested && item.children!.length > 8;

                              return (
                                <div
                                  key={item.label}
                                  className="relative"
                                  onMouseEnter={() =>
                                    hasNested && setOpenNested(item.label)
                                  }
                                  onMouseLeave={() =>
                                    hasNested && setOpenNested(null)
                                  }
                                >
                                  <Link
                                    to={item.href}
                                    className="group/item flex items-center justify-between rounded-xl px-3 py-2 text-[13px] font-medium text-slate-700 transition-all duration-200 hover:bg-primary hover:pl-4 hover:text-white"
                                  >
                                    {item.label}

                                    <ChevronDown
                                      size={12}
                                      className={`shrink-0 transition-transform duration-200 ${
                                        hasNested
                                          ? "-rotate-90 opacity-70"
                                          : "-rotate-90 opacity-0 group-hover/item:opacity-70"
                                      }`}
                                    />
                                  </Link>

                                  {hasNested && (
                                    <div
                                      className={`absolute left-full top-0 z-50 ml-1 rounded-2xl border border-slate-100 bg-white/95 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.25)] backdrop-blur-xl transition-all duration-200 ${
                                        isWideNested ? "w-[720px] p-3" : "w-48 p-1.5"
                                      } ${
                                        openNested === item.label
                                          ? "visible translate-x-0 opacity-100"
                                          : "invisible -translate-x-2 opacity-0"
                                      }`}
                                    >
                                      {isWideNested ? (
                                        <div className="grid max-h-[70vh] grid-cols-5 gap-x-1 gap-y-0.5 overflow-y-auto">
                                          {item.children!.map((sub) => (
                                            <Link
                                              key={sub.label}
                                              to={sub.href}
                                              className="block rounded-lg px-3 py-2 text-[13px] font-medium text-slate-700 transition-all duration-200 hover:bg-primary hover:text-white"
                                            >
                                              {sub.label}
                                            </Link>
                                          ))}
                                        </div>
                                      ) : (
                                        item.children!.map((sub) => (
                                          <Link
                                            key={sub.label}
                                            to={sub.href}
                                            className="block rounded-xl px-3 py-2 text-[13px] font-medium text-slate-700 transition-all duration-200 hover:bg-primary hover:pl-4 hover:text-white"
                                          >
                                            {sub.label}
                                          </Link>
                                        ))
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.label}
                      to={link.href}
                      className={`group relative whitespace-nowrap rounded-full px-3 py-2 text-[12px] font-semibold outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary/40 xl:px-4 xl:text-[13px] ${
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
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary py-2 pl-2 pr-2 text-[13px] font-semibold text-white shadow-lg shadow-blue-600/20 outline-none transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-blue-600/30 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 xl:pr-6"
              >
                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/15">
                  <Phone size={14} className="animate-[pulse_2.5s_ease-in-out_infinite]" />
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

          <div className="hidden border-t border-white/30 pb-3 pt-3 lg:block">
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
          style={{ WebkitOverflowScrolling: "touch" }}
          className={`overscroll-contain border-t transition-all duration-300 lg:hidden ${
            menuOpen
              ? "max-h-[calc(100dvh-3.5rem)] overflow-y-auto overflow-x-hidden border-slate-100 opacity-100"
              : "max-h-0 overflow-hidden border-transparent opacity-0 pointer-events-none"
          }`}
        >
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
                const children = link.children; // narrow once, reuse everywhere below

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
                        setOpenMobileDropdown(openMobileDropdown === link.label ? null : link.label)
                      }
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-[13px] font-semibold text-slate-800 outline-none transition-colors duration-200 hover:bg-primary/10 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40"
                    >
                      {link.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${
                          openMobileDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openMobileDropdown === link.label ? "max-h-[999px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="ml-3 mt-1 space-y-0.5 border-l-2 border-primary/15 pl-3">
                        {children.map((child) => {
                          const hasNested = !!child.children?.length;

                          if (!hasNested) {
                            return (
                              <Link
                                key={child.label}
                                to={child.href}
                                onClick={() => {
                                  setMenuOpen(false);
                                  setOpenMobileDropdown(null);
                                  setOpenMobileNested(null);
                                }}
                                className="block rounded-lg px-2.5 py-1.5 text-[13px] text-slate-600 outline-none transition-colors duration-200 hover:bg-primary hover:text-white focus-visible:bg-primary focus-visible:text-white"
                              >
                                {child.label}
                              </Link>
                            );
                          }

                          // Second-level accordion for package/duration options
                          return (
                            <div key={child.label}>
                              <button
                                type="button"
                                onClick={() =>
                                  setOpenMobileNested(
                                    openMobileNested === child.label ? null : child.label
                                  )
                                }
                                className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-slate-600 outline-none transition-colors duration-200 hover:bg-primary hover:text-white focus-visible:bg-primary focus-visible:text-white"
                              >
                                {child.label}
                                <ChevronDown
                                  size={13}
                                  className={`transition-transform duration-300 ${
                                    openMobileNested === child.label ? "rotate-180" : ""
                                  }`}
                                />
                              </button>

                              <div
                                className={`overflow-hidden transition-all duration-300 ${
                                  openMobileNested === child.label
                                    ? "max-h-[999px] opacity-100"
                                    : "max-h-0 opacity-0"
                                }`}
                              >
                                <div className="ml-3 mt-0.5 space-y-0.5 border-l border-primary/10 pl-3">
                                  {child.children!.map((sub) => (
                                    <Link
                                      key={sub.label}
                                      to={sub.href}
                                      onClick={() => {
                                        setMenuOpen(false);
                                        setOpenMobileDropdown(null);
                                        setOpenMobileNested(null);
                                      }}
                                      className="block rounded-lg px-2.5 py-1.5 text-[12px] text-slate-500 outline-none transition-colors duration-200 hover:bg-primary hover:text-white focus-visible:bg-primary focus-visible:text-white"
                                    >
                                      {sub.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </div>
                          );
                        })}
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

            {/* <a
              href="tel:+918886803322"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-primary to-[#0F4FD8] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_8px_20px_-6px_rgba(21,94,239,0.5)] outline-none transition-all duration-200 hover:shadow-[0_10px_24px_-6px_rgba(21,94,239,0.6)] focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 active:scale-[0.98]"
            >
              <Phone size={16} />
              +91 8886803322
            </a> */}
          </div>
        </nav>
      </header>

      <div className="h-16 lg:h-24" />
    </>
  );
}