import type { ComponentType } from "react";
import { useState } from "react";
import { Home as HomeIcon, Phone, User, Search } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import ProfileSheet from "./ProfileSheet";
import SearchSheet from "./SearchSheet";
// Path goes up 2 levels: layout/ -> components/ -> src/, then into assets/
import logo from "../../assets/Logo_bsh taxi services.webp";

const PHONE_NUMBER = "+918886803322";
const WHATSAPP_NUMBER = "918886803322";

const PROFILE_LOGO_SRC: string | null = logo;

type NavIcon = ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;

type NavItem =
  | { key: string; label: string; icon: NavIcon; to: string; kind: "link"; badge?: boolean }
  | { key: string; label: string; icon: NavIcon; href: string; kind: "external"; badge?: boolean }
  | { key: string; label: string; icon: NavIcon; kind: "action"; badge?: boolean };

const items: NavItem[] = [
  { key: "home", label: "Home", icon: HomeIcon, to: "/", kind: "link" },
  {
    key: "whatsapp",
    label: "WhatsApp",
    icon: FaWhatsapp,
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    kind: "external",
    badge: true,
  },
  { key: "call", label: "Call", icon: Phone, href: `tel:${PHONE_NUMBER}`, kind: "external" },
  // Search sits right beside Call — opens a bottom sheet with the
  // destination search + fleet/pricing card (MobileSearchBar).
  { key: "search", label: "Search", icon: Search, kind: "action" },
  // Profile no longer navigates away — it opens a bottom sheet with
  // phone / email / address / Call / WhatsApp right where the user is.
  { key: "profile", label: "Profile", icon: User, kind: "action", badge: true },
];

export default function MobileBottomNav() {
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* Floating glass pill nav — sits with a small gap above the bottom edge */}
      <nav
        className="
          fixed inset-x-0 bottom-0 z-[9999]
          px-3
          md:hidden
        "
        style={{ paddingBottom: "max(env(safe-area-inset-bottom), 10px)" }}
        aria-label="Quick actions"
      >
        <div
          className="
            mx-auto flex max-w-md items-center justify-between
            rounded-full
            border border-white/50
            bg-white/60
            backdrop-blur-2xl
            shadow-[0_8px_30px_rgba(15,23,42,0.15)]
            px-2 py-1.5
          "
        >
          {items.map((item) => {
            const Icon = item.icon;
            const isWhatsapp = item.key === "whatsapp";
            const isProfile = item.key === "profile";
            const active =
              (item.kind === "link" && location.pathname === item.to) ||
              (item.key === "profile" && profileOpen) ||
              (item.key === "search" && searchOpen);

            const content = (
              <>
                <span
                  className={`
                    relative flex h-9 w-9 items-center justify-center
                    rounded-full transition-all duration-300 ease-out
                    group-hover:scale-110
                    ${
                      active
                        ? "bg-gradient-to-br from-primary/15 to-primary/5 shadow-md shadow-primary/20 ring-1 ring-primary/10 scale-105"
                        : "hover:bg-slate-100/70 scale-100"
                    }
                  `}
                >
                  <span
                    className={`
                      flex items-center justify-center transition-all duration-300
                      group-hover:scale-110
                      ${
                        isWhatsapp
                          ? "text-[#25D366]"
                          : active
                          ? "text-primary scale-110"
                          : "text-slate-500"
                      }
                    `}
                  >
                    {isProfile && PROFILE_LOGO_SRC ? (
                      <img
                        src={PROFILE_LOGO_SRC}
                        alt="Profile"
                        className="h-5 w-5 rounded-full object-contain"
                      />
                    ) : (
                      <Icon size={19} strokeWidth={active ? 2.5 : 2.2} />
                    )}
                  </span>

                  {item.badge && (
                    <span className="absolute top-0.5 right-0.5 flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60" />
                      <span className="relative h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                    </span>
                  )}
                </span>
              </>
            );

            const className =
              "group flex flex-1 flex-col items-center justify-center py-1 transition-all duration-300 active:scale-95";

            if (item.kind === "link") {
              return (
                <Link key={item.key} to={item.to} className={className} aria-label={item.label}>
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
                  aria-label={item.label}
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
                aria-label={item.label}
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