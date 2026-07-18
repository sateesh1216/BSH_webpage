interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  align?: "center" | "left";
}

export default function SectionHeading({ eyebrow, title, align = "center" }: SectionHeadingProps) {
  return (
    <div
      className={`mb-12 flex flex-col ${
        align === "center" ? "items-center text-center" : "items-start text-left"
      }`}
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h2>
      <span className="mt-4 h-1 w-16 rounded-full bg-primary" />
    </div>
  );
}