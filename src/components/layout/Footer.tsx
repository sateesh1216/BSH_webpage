import { Phone, Mail, MapPin } from "lucide-react";
import { navLinks } from "../../data/nav";

const quickLinks = navLinks.filter((link) =>
  ["Home", "Services", "Fleet & Pricing", "Contact Us"].includes(link.label),
);

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#161B22] text-slate-300">
      <div className="mx-auto w-[92%] max-w-[1240px] py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="mb-4 text-lg font-bold text-white">BSH TAXI SERVICES</div>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              Safe, reliable and affordable taxi services across Visakhapatnam and Andhra Pradesh.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">Quick Links</h4>
            <div className="flex flex-col gap-2.5 text-sm">
              {quickLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-slate-400 transition-colors hover:text-primary">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">Contact Us</h4>
            <div className="flex flex-col gap-3 text-sm text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                36-92-242-532/1, Palanati Colony, Kancharapalem, Visakhapatnam, Andhra Pradesh - 530008
              </p>
              <a href="tel:+918886803322" className="flex items-center gap-2 hover:text-primary">
                <Phone size={16} className="text-primary" />
                +91 8886803322
              </a>
              <a href="mailto:info.bshtaxiservices@gmail.com" className="flex items-center gap-2 hover:text-primary">
                <Mail size={16} className="text-primary" />
                info.bshtaxiservices@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-700/60 pt-6 text-center text-xs text-slate-500">
          © 2026 BSH Taxi Services. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}