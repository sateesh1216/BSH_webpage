import { useState, type FormEvent } from "react";
import { Send, ShieldCheck } from "lucide-react";

const subjectOptions = [
  "General Inquiry",
  "Book a Ride",
  "Corporate Travel",
  "Tour Package",
  "Feedback / Complaint",
  "Other",
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: wire this up to your actual email/API endpoint.
    setStatus("submitting");
    setTimeout(() => setStatus("submitted"), 800);
  }

  const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15";

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Send Us a Message</h2>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input type="text" required placeholder="Your Name *" className={inputClass} />
          <input type="tel" required placeholder="Phone Number *" className={inputClass} />
        </div>

        <input type="email" required placeholder="Email Address *" className={inputClass} />

        <select required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Subject *
          </option>
          {subjectOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <textarea required placeholder="Your Message *" rows={5} className={`${inputClass} resize-none`} />

        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-primary py-3.5 text-sm font-bold text-white shadow-md shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70"
        >
          <Send size={16} />
          {status === "submitting" ? "Sending..." : status === "submitted" ? "Message Sent!" : "Send Message"}
        </button>

        <p className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
          <ShieldCheck size={13} />
          Your information is safe with us. We never share your data.
        </p>
      </form>
    </div>
  );
}