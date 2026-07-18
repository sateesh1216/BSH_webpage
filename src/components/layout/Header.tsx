import { useState } from "react";
import { Phone, Menu, X, Car } from "lucide-react";
import { navLinks } from "../../data/nav";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex min-h-[76px] w-[92%] max-w-[1240px] items-center justify-between gap-6">
        <a href="#home" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-light text-primary">
            <Car size={20} />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            BSH <span className="font-bold text-slate-700">TAXI SERVICES</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 lg:flex">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="transition-colors hover:text-primary">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex">
          <a
            href="tel:+918886803322"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            <Phone size={16} />
            +91 8886803322
          </a>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg text-slate-700 lg:hidden"
          aria-label="Open menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-slate-200 bg-white px-[4%] py-4 lg:hidden">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:+918886803322"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white"
          >
            <Phone size={16} />
            +91 8886803322
          </a>
        </nav>
      )}
    </header>
  );
}