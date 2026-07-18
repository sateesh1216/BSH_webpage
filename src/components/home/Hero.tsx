import { ShieldCheck, Briefcase, Phone } from "lucide-react";
import Button from "../ui/Button";
import BookingCard from "./BookingCard";
import { heroFeatures } from "../../data/heroFeatures";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-14 sm:pt-20">
      <div className="mx-auto grid w-[92%] max-w-[1240px] items-center gap-14 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
            <ShieldCheck size={14} />
            Safe. Reliable. On Time.
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.1] text-slate-900 sm:text-5xl lg:text-[3.4rem]">
            Your Journey,
            <br />
            <span className="text-primary">Our Responsibility.</span>
          </h1>

          <p className="mt-6 max-w-md text-base text-slate-500 sm:text-lg">
            BSH Taxi Services offers safe, comfortable and affordable travel solutions in Visakhapatnam and beyond.
          </p>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-5">
            {heroFeatures.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary-light text-primary">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{title}</p>
                  <p className="text-xs text-slate-500">{description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button variant="primary" icon={<Briefcase size={16} />}>
              Book Your Ride
            </Button>
            <Button as="a" href="tel:+918886803322" variant="outline" icon={<Phone size={16} />}>
              Call Now
            </Button>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <BookingCard />
        </div>
      </div>
    </section>
  );
}
