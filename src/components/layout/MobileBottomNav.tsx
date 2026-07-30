import type { ComponentType } from "react";
import { useState } from "react";
import { Home as HomeIcon, Phone, User, Search } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import ProfileSheet from "./ProfileSheet";
import SearchSheet from "./SearchSheet";

const PHONE_NUMBER = "+918886803322";
const WHATSAPP_NUMBER = "918886803322";

type NavIcon = ComponentType<{ size?: number; className?: string }>;

type NavItem =
  | { key: string; label: string; icon: NavIcon; to: string; kind: "link" }
  | { key: string; label: string; icon: NavIcon; href: string; kind: "external" }
  | { key: string; label: string; icon: NavIcon; kind: "action" };

const items: NavItem[] = [
  { key: "home", label: "Home", icon: HomeIcon, to: "/", kind: "link" },
  {
    key: "whatsapp",
    label: "WhatsApp",
    icon: FaWhatsapp,
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    kind: "external",
  },
  { key: "call", label: "Call", icon: Phone, href: `tel:${PHONE_NUMBER}`, kind: "external" },
  // Search sits right beside Call — opens a bottom sheet with the
  // destination search + fleet/pricing card (MobileSearchBar).
  { key: "search", label: "Search", icon: Search, kind: "action" },
  // Profile no longer navigates away — it opens a bottom sheet with
  // phone / email / address / Call / WhatsApp right where the user is.
  { key: "profile", label: "Profile", icon: User, kind: "action" },
];

export default function MobileBottomNav() {
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed inset-x-0 bottom-0 z-[9999] border-t border-slate-100 bg-white/95 backdrop-blur-lg md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        aria-label="Quick actions"
      >
        <div className="mx-auto grid max-w-md grid-cols-5">
          {items.map((item) => {
            const Icon = item.icon;
            const isWhatsapp = item.key === "whatsapp";
            const active =
              (item.kind === "link" && location.pathname === item.to) ||
              (item.key === "profile" && profileOpen) ||
              (item.key === "search" && searchOpen);

            const content = (
              <>
                <span
                  className={`flex h-6 w-6 items-center justify-center ${
                    isWhatsapp ? "text-[#25D366]" : active ? "text-primary" : "text-slate-500"
                  }`}
                >
                  <Icon size={18} />
                </span>
                <span
                  className={`text-[9.5px] font-medium leading-none ${
                    active ? "text-primary" : "text-slate-500"
                  }`}
                >
                  {item.label}
                </span>
              </>
            );

            const className =
              "flex flex-col items-center justify-center gap-1 py-2 transition-colors active:bg-slate-50";

            if (item.kind === "link") {
              return (
                <Link key={item.key} to={item.to} className={className}>
                  {content}
                </Link>
              );
            }

            if (item.kind === "action") {
              const isSearch = item.key === "search";
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => (isSearch ? setSearchOpen(true) : setProfileOpen(true))}
                  aria-haspopup="dialog"
                  aria-expanded={isSearch ? searchOpen : profileOpen}
                  className={className}
                >
                  {content}
                </button>
              );
            }

            return (
              <a
                key={item.key}
                href={item.href}
                target={item.key === "whatsapp" ? "_blank" : undefined}
                rel={item.key === "whatsapp" ? "noopener noreferrer" : undefined}
                className={className}
              >
                {content}
              </a>
            );
          })}
        </div>
      </nav>

      <ProfileSheet open={profileOpen} onClose={() => setProfileOpen(false)} />
      <SearchSheet open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}