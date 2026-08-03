interface SectionHeadingProps {
  eyebrow: string;
  title?: string;
  align?: "center" | "left";
}


export default function SectionHeading({ eyebrow, title, align = "center" }: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div className={`mb-10 flex flex-col ${isCentered ? "items-center text-center" : "items-start text-left"}`}>
      <div className="flex items-center gap-4">
        {isCentered && <span className="h-px w-12 bg-slate-300 sm:w-16" aria-hidden="true" />}
        <p className="text-sm font-bold uppercase tracking-[0.15em] text-slate-900 sm:text-base">
          {eyebrow}
        </p>
        {isCentered && <span className="h-px w-12 bg-slate-300 sm:w-16" aria-hidden="true" />}
      </div>

      {title && (
        <>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h2>
          <span className="mt-4 h-1 w-16 rounded-full bg-primary" />
        </>
      )}
    </div>
  );
}