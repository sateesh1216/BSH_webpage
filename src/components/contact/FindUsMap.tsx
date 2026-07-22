import { MapPin } from "lucide-react";

const businessLocation = {
  name: "BSH Taxi Services",
  mapEmbedUrl: "https://www.google.com/maps?q=BSH+Taxi+Services+Kancharapalem+Visakhapatnam&output=embed",
};

export default function FindUsMap() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="px-6 pt-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Find Us Here</h2>
      </div>

      <div className="mt-4 h-64 w-full">
        <iframe
          title={`${businessLocation.name} Location`}
          src={businessLocation.mapEmbedUrl}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="flex items-start gap-3 px-6 py-5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
          <MapPin size={18} strokeWidth={2} />
        </span>
        <div>
          <p className="text-sm font-bold text-slate-900">Easy to Reach</p>
          <p className="mt-1 text-sm leading-snug text-slate-500">
            We are located in the heart of Visakhapatnam city. You can easily reach us by road, bus
            or train.
          </p>
        </div>
      </div>
    </div>
  );
}