import { Headset, Timer } from "lucide-react";
import heroImage from "../../assets/cars/innova-crysta-in-vizag-bshtaxiservices.png";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-blue-50/80 via-blue-50/30 to-white">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-[80em] grid-cols-1 items-center gap-10 px-6 py-14 sm:px-10 lg:grid-cols-2 lg:px-16 lg:py-20">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Contact Us</span>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            We're Here to{" "}
            <span className="text-primary">Help You!</span>
          </h1>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-600">
            Have questions or need assistance? Our team is available 24/7 to help you with your
            travel needs.
          </p>

          <div className="mt-8 flex flex-wrap gap-8">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <Headset size={20} strokeWidth={2} />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">24/7 Customer Support</p>
                <p className="text-xs text-slate-500">We're always here for you</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                <Timer size={20} strokeWidth={2} />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">Quick Response</p>
                <p className="text-xs text-slate-500">We'll get back to you ASAP</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={heroImage}
            alt="BSH Taxi Services contact"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}