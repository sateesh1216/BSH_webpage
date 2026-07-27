import { Star } from "lucide-react";

const reviews = [
  {
    name: "Ramesh K.",
    location: "Visakhapatnam",
    rating: 5,
    text: "Excellent service! Driver was punctual and very polite.",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Sravani P.",
    location: "Vizag",
    rating: 5,
    text: "Very clean cars and professional drivers. Best taxi service in Vizag!",
    avatar: "https://i.pravatar.cc/100?img=47",
  },
  {
    name: "Vikram A.",
    location: "Hyderabad",
    rating: 5,
    text: "Affordable prices and great customer support. Will book again!",
    avatar: "https://i.pravatar.cc/100?img=33",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto w-[92%] max-w-310 pb-16">
      <div className="mb-10 flex items-center justify-center gap-4">
        <span className="h-px w-8 bg-primary/40" />
        <h2 className="text-sm font-bold tracking-[0.15em] text-slate-900">
          WHAT OUR CUSTOMERS SAY
        </h2>
        <span className="h-px w-8 bg-primary/40" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <article
            key={review.name}
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-lg hover:shadow-primary/10"
          >
            <div className="flex items-center gap-3">
              <img
                src={review.avatar}
                alt={review.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="flex gap-0.5">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              "{review.text}"
            </p>

            <p className="mt-4 text-sm font-bold text-slate-900">{review.name}</p>
            <p className="text-xs text-slate-500">{review.location}</p>
          </article>
        ))}
      </div>
    </section>
  );
}