import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import SEO from "../components/seo/SEO";
import { SUPPORT_PHONE, SUPPORT_PHONE_DISPLAY } from "../data/bookingConfig";

/**
 * ProfilePage
 * -----------
 * Placeholder screen for the mobile bottom nav's "Profile" tab. There's
 * no login/account system in this project yet, so this simply surfaces
 * support info and a place riders will eventually see their own bookings.
 *
 * TODO before shipping a real profile: replace this with an actual
 * sign-in flow and a "My Bookings" list once you have a backend/auth
 * provider wired up.
 */
export default function ProfilePage() {
  return (
    <>
      <SEO
        title="My Account"
        description="Manage your BSH Taxi Services bookings and get in touch with support."
        canonicalPath="/profile"
      />

      <div className="mx-auto min-h-[70vh] w-full max-w-2xl px-4 pt-28 pb-16 sm:pt-32">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-[0_2px_20px_-4px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="text-2xl font-extrabold">👤</span>
          </div>
          <h1 className="mt-4 text-xl font-extrabold tracking-tight text-slate-900">
            Your Account
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Sign-in and booking history are coming soon. In the meantime, our
            team is available round the clock for anything you need.
          </p>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <a
            href={`tel:+${SUPPORT_PHONE}`}
            className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-colors hover:bg-slate-50"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Phone size={17} />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">Call Support</p>
              <p className="text-xs text-slate-500">{SUPPORT_PHONE_DISPLAY}</p>
            </div>
          </a>

          <a
            href={`https://wa.me/${SUPPORT_PHONE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-colors hover:bg-slate-50"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <FaWhatsapp size={18} />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">WhatsApp Us</p>
              <p className="text-xs text-slate-500">Quick replies, 24/7</p>
            </div>
          </a>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MapPin size={17} />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">Based in Vizag</p>
              <p className="text-xs text-slate-500">Serving all of Andhra Pradesh</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Clock size={17} />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">Available 24/7</p>
              <p className="text-xs text-slate-500">Book anytime, day or night</p>
            </div>
          </div>
        </div>

        <a
          href={`https://wa.me/${SUPPORT_PHONE}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-b from-primary to-primary/90 px-4 py-3.5 text-sm font-bold text-white shadow-[0_4px_14px_-2px] shadow-primary/35"
        >
          <MessageCircle size={16} />
          Message Us About a Booking
        </a>
      </div>
    </>
  );
}
