import { contactInfoItems } from "../../data/contactInfoData";

export default function GetInTouchCard() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Get In Touch</h2>

      <div className="mt-5 divide-y divide-slate-100">
        {contactInfoItems.map(({ id, icon: Icon, title, lines, href }) => {
          const content = (
            <div className="flex items-start gap-4 py-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-white shadow-sm">
                <Icon size={19} strokeWidth={2} />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">{title}</p>
                {lines.map((line) => (
                  <p key={line} className="text-sm leading-snug text-slate-500">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          );

          if (href) {
            return (
              <a
                key={id}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="-mx-2 block rounded-xl px-2 transition-colors hover:bg-slate-50"
              >
                {content}
              </a>
            );
          }

          return <div key={id}>{content}</div>;
        })}
      </div>
    </div>
  );
}