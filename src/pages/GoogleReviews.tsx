import SEO from "../components/seo/SEO";
import { useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Link as LinkIcon,
  MapPin,
  MessageCircle,
  Quote,
  ShieldCheck,
  Star,
  ThumbsUp,
  UserRound,
  Users,
  Clock3,
} from "lucide-react";
const GOOGLE_REVIEW_ALL_URL= "https://www.google.com/search?q=bsh+Taxi+Services+reviews&oq=bsh+Taxi+Services+reviews&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyBggDEEUYPNIBCTE2NjA3ajBqNKgCALACAQ&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0x66a27e776ee146a5:0x4829458614ff1859,1,,,,"
const GOOGLE_REVIEW_URL = "https://g.page/r/CVkY_xSGRSlIEAI/review";
const INSTAGRAM_URL = "https://www.instagram.com/bshtaxiservices/";
const WHATSAPP_NUMBER = "918886803322";

const reviews = [
  {
    name: "Manshi Kumari",
    initial: "MK",
    date: "Google Review",
    text: "Our trip to Vizag and Araku Valley was truly unforgettable! From the beautiful beaches of Vizag to the breathtaking hills, lush greenery, and peaceful atmosphere of Araku, every moment was filled with wonderful memories. A heartfelt thank you to Annayya Bandaru Sateesh for his exceptional driving skills, professionalism, and friendly nature. The roads to Araku can be challenging, but he drove with great care, making our journey safe, smooth, and comfortable. Thank you for making this trip so enjoyable. Highly recommended!",
  },
  {
    name: "Suparno Karmakar",
    initial: "SK",
    date: "Google Review",
    text: "It was a wonderful journey with Sateesh. We travelled from Visakhapatnam airport to Araku and back to Vizag. He is a very cordial, helpful and nice person. Will recommend BSH cab/taxi to everyone. They have a very professional, timely and efficient service and behavior is excellent. Would like to come back and have their service again.",
  },
  {
    name: "Dhrub Basak",
    initial: "DB",
    date: "Google Review",
    text: "Best cab service in town... Would highly recommend anyone who is planning an affordable and luxury cab service... Man's behaviour is extremely polite and hospitality is top notch. No complaints regarding anything.. would highly recommend experiencing this cab service.",
  },
  {
    name: "Balaji Tharigonda",
    initial: "BT",
    date: "Google Review",
    text: "Today, 22nd Aug, 2025I took the cab service and felt happy with communication and reasonable price as I compared with other Services. Services expected on time, drives safely and return safety. Car is very neatness. Please contact satish for this Bsh taxi service.",
  },
  {
    name: "Surya Pavan Nandyala",
    initial: "SP",
    date: "Google Review",
    text: "BSH taxi services...good for safe journey...the services in vizag was soo good than other taxi services...Driver have an punctual on time...The destination is reached in time... reasonable prices, Good receiving of customers",
  },
  {
    name: "Pankaj Caturvedi",
    initial: "PC",
    date: "Google Review",
    text: "I have talked sateesh at 9 30 night and next day he has provided excellent service. His car was neat and clean and driver venkat is very polite and loving boy. Sateesh ji is also a person of gem",
  },
];

const faqs = [
  {
    question: "How can I give a Google review?",
    answer:
      "Click the Write a Google Review button at the top of this page. It will open BSH Taxi Services on Google, where you can select your star rating and write your experience.",
  },
  {
    question: "Do I need a Google account?",
    answer:
      "Yes. Google normally requires you to be signed in to a Google account before submitting a review.",
  },
  {
    question: "Can I share BSH Taxi Services with my friends?",
    answer:
      "Yes. Use the WhatsApp, Instagram or Copy Link buttons to easily share the BSH Taxi Services page with friends and family.",
  },
  {
    question: "Are the reviews shown on this page real?",
    answer:
      "Only reviews taken from your actual Google Business Profile should be displayed as real reviews. Replace the sample cards in this page with your genuine customer feedback.",
  },
];

export default function GoogleReviews() {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "BSH Taxi Services",
    url: "https://www.bshtaxiservices.com/google-reviews",
    telephone: "+91-8886803322",
  };

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const currentPageUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://www.bshtaxiservices.com/google-reviews";

  const shareText =
    "Check out BSH Taxi Services for reliable taxi services in Visakhapatnam.";

  const shareWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      `${shareText} ${currentPageUrl}`,
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const openInstagram = () => {
    window.open(INSTAGRAM_URL, "_blank", "noopener,noreferrer");
  };

  return (
    // NOTE ON THE HEADER/HERO GAP:
    // The old code used `pt-14` here to push content below a (presumably fixed/sticky)
    // header. If your header is fixed and its real height isn't exactly 3.5rem (14),
    // you get either a gap or an overlap. Two ways to fix it properly:
    //   1) If the header is `position: fixed` / `sticky`, set this padding-top to match
    //      the header's ACTUAL height exactly (e.g. h-16 header -> pt-16 here).
    //   2) If the header is in normal document flow (not fixed), remove this padding-top
    //      entirely — the browser will stack them with zero extra gap.
    // I've removed the padding here (assuming a normal-flow header). If your header is
    // fixed/sticky, tell me its height (or paste the header code) and I'll set the exact
    // pt-* value instead of guessing.
    <main className="min-h-screen bg-white">
      <SEO
        title="Google Reviews for BSH Taxi Services"
        description="Read customer reviews for BSH Taxi Services in Vizag and share your taxi, airport transfer, or outstation travel experience."
        keywords={["bsh taxi services reviews", "vizag taxi reviews", "best taxi service vizag reviews"]}
        canonicalPath="/google-reviews"
        schema={reviewSchema}
      />
      {/* ================================================================
          HERO
      ================================================================ */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#eff6ff] via-white to-[#dbeafe]">
        {/* Background decoration */}
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl animate-pulse" />
        <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-100/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-4xl text-center">
            {/* Google badge */}
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-5 py-2.5 shadow-sm backdrop-blur-sm">
              <span className="text-xl font-bold text-[#4285F4]">G</span>
              <span className="text-sm font-bold text-slate-800">
                Google Customer Reviews
              </span>
            </div>

            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              What Our Customers{" "}
              <span className="bg-linear-to-r from-[#155EEF] via-[#4285F4] to-[#6ea8ff] bg-clip-text text-transparent">
                Say
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Real experiences from customers who travelled with BSH Taxi
              Services. Your feedback helps us serve you better.
            </p>

            {/* Rating + CTA */}
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition hover:shadow-[0_8px_30px_rgb(21,94,239,0.12)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-3xl font-black">
                  <span className="text-[#4285F4]">G</span>
                </div>

                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-black text-slate-900">
                      5/5
                    </span>

                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-5 w-5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-slate-500">
                    Google Customer Rating
                  </p>
                </div>
              </div>

              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-[#155EEF] to-[#0a3fc4] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30"
              >
                <Star className="h-5 w-5 fill-white" />
                Write a Google Review
                <ExternalLink className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            <p className="mt-4 text-xs font-medium text-slate-500">
              Opens BSH Taxi Services on Google
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          REORDERABLE SECTION GROUP
          Mobile order:  Reviews -> Trust Features -> Share -> Location/Trust CTA -> FAQ
          Desktop order: Trust Features -> Reviews -> Share -> Location/Trust CTA -> FAQ
          (unchanged from before, minus the Write Review section which has
          been removed). Controlled with Tailwind `order-*` / `md:order-*`.
      ================================================================ */}
      <div className="flex flex-col">
        {/* ================================================================
            TRUST FEATURES  (mobile: 3rd, desktop: 1st)
        ================================================================ */}
      <section className="relative z-10 order-3 mx-auto -mt-7 max-w-6xl px-4 sm:px-6 md:order-1 lg:px-8">
  <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_-15px_rgba(21,94,239,0.15)] sm:grid-cols-2 lg:grid-cols-4">
    {[
      {
        icon: Users,
        title: "Trusted by",
        text: "Happy Customers",
      },
      {
        icon: ShieldCheck,
        title: "Safe & Comfortable",
        text: "Taxi Journeys",
      },
      {
        icon: UserRound,
        title: "Professional",
        text: "Drivers",
      },
      {
        icon: Clock3,
        title: "On-Time",
        text: "Pickup Service",
      },
    ].map((item, index) => {
      const Icon = item.icon;

      // Border logic per breakpoint's column count:
      //  - mobile/sm (2 cols, 2 rows): left border on col 2, top border on row 2
      //  - lg (4 cols, 1 row): left border on every item except the first, no top border
      const isRightCol = index % 2 === 1; // col 2 of 2 at mobile/sm
      const isSecondRow = index >= 2; // row 2 of 2 at mobile/sm
      const isFirstLg = index === 0; // col 1 of 4 at lg

      return (
        <div
          key={item.title}
          className={`group flex flex-col items-center gap-2 p-4 text-center transition hover:bg-blue-50/40 sm:flex-row sm:items-center sm:gap-4 sm:p-6 sm:text-left ${
            isRightCol ? "border-l border-slate-200" : ""
          } ${isSecondRow ? "border-t border-slate-200" : ""} ${
            isFirstLg ? "lg:border-l-0" : "lg:border-l lg:border-t-0"
          } ${!isRightCol && !isSecondRow ? "" : ""}`}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#155EEF] transition group-hover:scale-110 group-hover:bg-[#155EEF] group-hover:text-white sm:h-12 sm:w-12">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>

          <div>
            <p className="text-xs font-bold text-slate-900 sm:text-base">
              {item.title}
            </p>
            <p className="text-[11px] text-slate-500 sm:text-sm">
              {item.text}
            </p>
          </div>
        </div>
      );
    })}
  </div>
</section>

        {/* ================================================================
            REVIEWS  (mobile: 2nd, desktop: 2nd)
        ================================================================ */}
        <section className="section-padding order-2 md:order-2">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-[#155EEF]">
                <Quote className="h-4 w-4" />
                Customer Feedback
              </div>

              <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Our Customers{" "}
                <span className="bg-linear-to-r from-[#155EEF] via-[#4285F4] to-[#6ea8ff] bg-clip-text text-transparent">
                  Love Us
                </span>
              </h2>

              <p className="mt-4 text-slate-600">
                Genuine feedback from people who choose BSH Taxi Services.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <article
                  key={`${review.name}-${review.initial}`}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_20px_40px_-15px_rgba(21,94,239,0.2)]"
                >
                  <div className="absolute -right-6 -top-6 text-slate-100 transition group-hover:text-blue-50">
                    <Quote className="h-20 w-20" />
                  </div>

                  {/* Customer */}
                  <div className="relative flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-blue-400 text-sm font-black text-white shadow-md shadow-blue-500/20">
                        {review.initial}
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900">
                          {review.name}
                        </h3>
                        <p className="text-xs text-slate-500">{review.date}</p>
                      </div>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50">
                      <span className="text-lg font-bold text-[#4285F4]">
                        G
                      </span>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="relative mt-5 flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-5 w-5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  {/* Review */}
                  <p className="relative mt-4 text-sm leading-7 text-slate-600">
                    {review.text}
                  </p>

                  <div className="relative mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-400">
                    <ThumbsUp className="h-4 w-4" />
                    Helpful
                  </div>
                </article>
              ))}
            </div>

            {/* Google CTA */}
            <div className="mt-10 text-center">
              <a
                href={GOOGLE_REVIEW_ALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-xl border-2 border-[#155EEF] bg-white px-6 py-3.5 text-sm font-bold text-[#155EEF] transition hover:bg-[#155EEF] hover:text-white"
              >
                <span className="text-lg font-black">G</span>
                View All Reviews on Google
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ================================================================
            SHARE  (mobile: 4th, desktop: 4th)
        ================================================================ */}
        <section className="order-4 pb-16 md:order-4">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#155EEF]">
                <LinkIcon className="h-7 w-7" />
              </div>

              <h2 className="mt-5 text-2xl font-black text-slate-900 sm:text-3xl">
                Share BSH Taxi Services
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
                Know someone looking for a reliable taxi service? Share BSH
                Taxi Services with your friends and family.
              </p>

              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={shareWhatsApp}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-[#20bd5b] hover:shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12.004 2.003a9.936 9.936 0 0 0-8.607 14.97L2 22l5.198-1.363a9.936 9.936 0 1 0 4.806-18.634zm0 18.13a8.17 8.17 0 0 1-4.166-1.143l-.298-.177-3.085.809.824-3.005-.194-.308a8.17 8.17 0 1 1 6.919 3.824z" />
                  </svg>
                  Share on WhatsApp
                </button>

                <button
                  type="button"
                  onClick={openInstagram}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-pink-500/20 transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  Follow on Instagram
                </button>
              </div>

              <p className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-slate-500">
                <MessageCircle className="h-4 w-4 text-[#25D366]" />
                Message us directly on WhatsApp:{" "}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#155EEF] hover:underline"
                >
                  +91 88868 03322
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================
            LOCATION / TRUST CTA  (mobile: 5th, desktop: 5th)
        ================================================================ */}
        <section className="order-5 pb-16 md:order-5">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-8 text-white sm:p-10 lg:p-12">
              <div className="absolute right-0 top-0 h-full w-1/2 bg-linear-to-l from-blue-900/50 to-transparent" />

              <div className="relative flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
                <div>
                  <div className="mb-3 flex items-center gap-2 text-sm font-bold text-blue-300">
                    <MapPin className="h-4 w-4" />
                    Visakhapatnam, Andhra Pradesh
                  </div>

                  <h2 className="text-2xl font-black sm:text-3xl">
                    Your Journey, Our Priority
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                    Thank you for choosing BSH Taxi Services. We look forward
                    to serving you again.
                  </p>
                </div>

                <a
                  href="/contact"
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-300"
                >
                  Book Your Taxi
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            FAQ  (mobile: 6th, desktop: 6th)
        ================================================================ */}
        <section className="section-padding order-6 bg-slate-50 md:order-6">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-black text-slate-900">
                Frequently Asked{" "}
                <span className="bg-linear-to-r from-[#155EEF] via-[#4285F4] to-[#6ea8ff] bg-clip-text text-transparent">
                  Questions
                </span>
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <div
                    key={faq.question}
                    className={`overflow-hidden rounded-2xl border bg-white transition ${
                      isOpen ? "border-blue-200 shadow-sm" : "border-slate-200"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                    >
                      <span className="text-sm font-bold text-slate-900 sm:text-base">
                        {faq.question}
                      </span>

                      {isOpen ? (
                        <ChevronUp className="h-5 w-5 shrink-0 text-[#155EEF]" />
                      ) : (
                        <ChevronDown className="h-5 w-5 shrink-0 text-slate-400" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="border-t border-slate-100 px-5 pb-5 pt-4">
                        <p className="text-sm leading-7 text-slate-600">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

    </main>
  );
}