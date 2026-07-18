export default function CTA() {
  return (
    <section id="about" className="bg-primary py-16">
      <div className="mx-auto flex w-[92%] max-w-[1240px] flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70">BSH Taxi Services</p>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Need a Taxi? Call Us Today.</h2>
        </div>
        <a
          href="tel:+918886803322"
          className="rounded-xl bg-white px-8 py-4 text-lg font-bold text-primary shadow-lg transition-transform hover:-translate-y-0.5"
        >
          +91 8886803322
        </a>
      </div>
    </section>
  );
}