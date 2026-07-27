const serviceHighlights = [
  {
    title: "Well Maintained Fleet",
    desc: "Regularly serviced and clean vehicles",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Professional Drivers",
    desc: "Trained, verified and experienced drivers",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Airport Transfers",
    desc: "Timely pickups and drop at airport",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Outstation Travel",
    desc: "Comfortable long drives to your destinations",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Safe & Comfortable",
    desc: "Your family's safety is our responsibility",
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "24x7 Support",
    desc: "We are always here to assist you",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
  },
];

export default function WeServeYouBetter() {
  return (
    <section className="mx-auto w-[92%] max-w-310 py-16">
      <div className="mb-10 flex items-center justify-center gap-4">
        <span className="h-px w-8 bg-primary/40" />
        <h2 className="text-sm font-bold tracking-[0.15em] text-slate-900">
          WE SERVE YOU BETTER
        </h2>
        <span className="h-px w-8 bg-primary/40" />
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
        {serviceHighlights.map(({ title, desc, image }) => (
          <div
            key={title}
            className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow duration-200 hover:shadow-lg"
          >
            <div className="aspect-4/3 overflow-hidden">
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <p className="text-sm font-bold text-slate-900">{title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}