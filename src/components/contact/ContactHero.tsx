import { Headset, Timer, PhoneCall } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative mt-8 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
      {/* Background Blur */}
      <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px]" />

      <div className="relative mx-auto mt-8 flex max-w-5xl flex-col items-center px-6 text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          <PhoneCall size={22} />
          Contact BSH Taxi Services
        </span>

        {/* Heading */}
        <h1 className="mt-6 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Contact the Best
          <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Taxi Service in Vizag
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          Need help booking the 
          {" "}
          <a
          href="/destinations/vizag-local?type=taxi-services-in-vizag"
          title="Vizag local Taxi Service - BSH Taxi Services"
          aria-label="Vizag local Taxi Service - BSH Taxi Services"
          className="hover:underline"
        >
          best taxi service in Vizag?
        </a>{" "} 
          
          Contact <strong>BSH Taxi Services</strong> for
          {" "}
            <a
            href="/destinations/vizag-airport?type=airport-taxi"
            title="Vizag to airport Taxi Service - BSH Taxi Services"
            aria-label="Vizag to airport Taxi Service - BSH Taxi Services"
            className="hover:underline"
          >
            airport taxi service,
          </a>{" "} 
          {" "}
          <a
          href="/destinations/vizag-local?type=taxi-services-in-vizag"
          title="Vizag local cab Service - BSH Taxi Services"
          aria-label="Vizag local cab Service - BSH Taxi Services"
          className="hover:underline"
        >
          local cab service in Vizag,
        </a>{" "}

          <strong> outstation taxi service</strong>,
          one-way taxi bookings, round trips, corporate travel, and Vizag tour packages.
          Our friendly support team is available <strong>24/7</strong> to assist you with bookings and travel inquiries.
        </p>

        {/* Feature Cards */}
        <div className="mt-14 grid w-full max-w-3xl gap-6 sm:grid-cols-2">
          {/* Card 1 */}
          <div className="group rounded-3xl border border-white/60 bg-white/80 p-7 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
              <Headset size={30} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              24/7 Customer Support
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Get instant assistance for airport transfers, local taxi bookings,
              outstation trips, and travel planning anytime.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group rounded-3xl border border-white/60 bg-white/80 p-7 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
              <Timer size={30} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              Quick Response
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              We respond quickly to ensure your taxi booking is confirmed without delay.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}