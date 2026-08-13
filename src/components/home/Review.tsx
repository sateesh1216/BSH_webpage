import { useState } from "react";
import { Smile, UserRound, Car, Headphones, ThumbsUp, Star, ChevronLeft, ChevronRight } from "lucide-react";

// ---------- Data ----------

interface Stat {
  icon: typeof Smile;
  value: string;
  label: string;
}

const stats: Stat[] = [
  { icon: Smile, value: "10,000+", label: "Happy Customers" },
  { icon: UserRound, value: "30+", label: "Professional Drivers" },
  { icon: Car, value: "25+", label: "Premium Vehicles" },
  { icon: Headphones, value: "24/7", label: "Customer Support" },
  { icon: ThumbsUp, value: "99.9%", label: "Customer Satisfaction" },
];

interface Review {
  initials: string;
  location: string;
  rating: number;
  text: string;
}


const reviews: Review[] = [
  {
    initials: "MK",
    location: "Vizag \u2192 Araku Valley trip",
    rating: 5,
    text: "Our trip to Vizag and Araku Valley was truly unforgettable! From the beautiful beaches of Vizag to the breathtaking hills, lush greenery, and peaceful atmosphere of Araku, every moment was filled with wonderful memories. A heartfelt thank you to Annayya Bandaru Sateesh for his exceptional driving skills, professionalism, and friendly nature. The roads to Araku can be challenging, but he drove with great care, making our journey safe, smooth, and comfortable. Thank you for making this trip so enjoyable. Highly recommended!",
  },
  {
    initials: "SK",
    location: "Visakhapatnam",
    rating: 5,
    text: "It was a wonderful journey with Sateesh. We travelled from Visakhapatnam airport to Araku and back to Vizag. He is a very cordial, helpful and nice person. Will recommend BSH cab/taxi to everyone. They have a very professional, timely and efficient service and behavior is excellent. Would like to come back and have their service again.",
  },
  {
    initials: "DB",
    location: "Visakhapatnam",
    rating: 5,
    text: "Best cab service in town... Would highly recommend anyone who is planning an affordable and luxury cab service... Man's behaviour is extremely polite and hospitality is top notch. No complaints regarding anything.. would highly recommend experiencing this cab service.",
  },
  {
    initials: "BT",
    location: "Araku Valley",
    rating: 5,
    text: "Today, 22nd Aug, 2025I took the cab service and felt happy with communication and reasonable price as I compared with other Services. Services expected on time, drives safely and return safety. Car is very neatness. Please contact satish for this Bsh taxi service.",
  },
  {
    initials: "SP",
    location: "Visakhapatnam",
    rating: 5,
    text: "BSH taxi services...good for safe journey...the services in vizag was soo good than other taxi services...Driver have an punctual on time...The destination is reached in time... reasonable prices, Good receiving of customers.",
  },
  {
    initials: "PC",
    location: "Visakhapatnam",
    rating: 5,
    text: "I have talked sateesh at 9 30 night and next day he has provided excellent service. His car was neat and clean and driver venkat is very polite and loving boy. Sateesh ji is also a person of gem",
  },
  
];

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/?q=place_id:ChIJpUbhbnd-omYRWRj_FIZFKUg";
const GOOGLE_RATING = 5.0;
const GOOGLE_REVIEW_COUNT = 151;

const REVIEWS_PER_PAGE = 3;
const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);

// ---------- Component ----------

export default function ReviewsStats() {
  const [page, setPage] = useState(0);

  const goTo = (index: number) => {
    setPage((index + totalPages) % totalPages);
  };

  const visibleReviews = reviews.slice(
    page * REVIEWS_PER_PAGE,
    page * REVIEWS_PER_PAGE + REVIEWS_PER_PAGE
  );

  return (
    <section className="py-4">
      <div className="w-full px-6 sm:px-10 lg:px-16 py-10">
        {/* Stats bar */}
        <div className="flex flex-wrap items-center justify-between gap-y-6 rounded-2xl border border-slate-100 bg-white px-8 py-7 shadow-sm">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-3 sm:pr-6">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-primary/30 text-primary">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <div className="text-left">
                  <p className="text-lg font-extrabold leading-tight text-primary">
                    {stat.value}
                  </p>
                  <p className="text-xs font-medium leading-tight text-slate-500">
                    {stat.label}
                  </p>
                </div>
                {i < stats.length - 1 && (
                  <span className="ml-3 hidden h-8 w-px bg-slate-100 sm:block" />
                )}
              </div>
            );
          })}
        </div>

        {/* Section heading */}
        <div className="mt-10 flex items-center justify-center gap-2">
          <span className="h-px w-8 bg-primary/40" />
          <h2 className="text-sm font-bold tracking-[0.15em] text-slate-900">
            CUSTOMER REVIEWS
          </h2>
          <span className="h-px w-8 bg-primary/40" />
        </div>

        {/* Google rating badge */}
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-600 hover:text-primary transition-colors"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          <span className="font-semibold text-slate-900">{GOOGLE_RATING.toFixed(1)}</span>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span>&middot; {GOOGLE_REVIEW_COUNT} Google reviews</span>
        </a>

        {/* Reviews grid */}
        <div className="relative mt-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleReviews.map((review, i) => (
              <article
                key={`${review.initials}-${page}-${i}`}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {review.initials}
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  {review.text}
                </p>

                <p className="mt-4 text-xs font-medium text-slate-500">
                  {review.location} &middot; Google review
                </p>
              </article>
            ))}
          </div>

          {/* Arrows (optional, only show if more than one page) */}
          {totalPages > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous reviews"
                onClick={() => goTo(page - 1)}
                className="absolute -left-5 top-1/2 hidden -translate-y-1/2 rounded-full border border-slate-100 bg-white p-2 text-slate-500 shadow-sm transition-colors hover:text-primary lg:block"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next reviews"
                onClick={() => goTo(page + 1)}
                className="absolute -right-5 top-1/2 hidden -translate-y-1/2 rounded-full border border-slate-100 bg-white p-2 text-slate-500 shadow-sm transition-colors hover:text-primary lg:block"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>

        {/* Dot pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to page ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-200 ${
                  i === page
                    ? "w-6 bg-primary"
                    : "w-2 bg-slate-200 hover:bg-slate-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}