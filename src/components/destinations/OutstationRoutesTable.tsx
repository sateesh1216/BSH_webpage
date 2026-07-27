import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { outstationRoutes } from "../../data/outstationRoutesData";
import { useBooking } from "../booking/BookingContext";
export default function OutstationRoutesTable() {
  const { openBooking, setTripType, setDrop } = useBooking();
  return (
    <section className="w-full px-6 py-16 sm:px-10 lg:px-16">
      <SectionHeading eyebrow="Top Outstation Routes" />

      <div className="mx-auto max-w-[80em] overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-175 text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-6 py-4">From</th>
                <th className="px-6 py-4">To</th>
                {/* <th className="px-6 py-4">Distance (Approx.)</th> */}
                <th className="px-6 py-4">One Day Fare*</th>
                {/* <th className="px-6 py-4">Two Day Trip Fare*</th> */}
                <th className="px-6 py-4">Travel Time (Approx.)</th>
                <th className="px-6 py-4 text-right">Book</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {outstationRoutes.map((route) => (
                <tr key={route.to} className="transition-colors hover:bg-slate-50/60">
                  <td className="px-6 py-4 font-medium text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-primary" />
                      {route.from}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900">{route.to}</td>
                  {/* <td className="px-6 py-4 text-slate-500">{route.distance}</td> */}
                  <td className="px-6 py-4 font-semibold text-primary">₹{route.onedayFare.toLocaleString("en-IN")}</td>
                  {/* <td className="px-6 py-4 font-semibold text-primary">₹{route.TwodaysFare.toLocaleString("en-IN")}</td> */}
                  <td className="px-6 py-4 text-slate-500">{route.travelTime}</td>
                  <td className="px-6 py-4 text-right">
                  <button
  type="button"
  onClick={() => {
    setTripType("Outstation");
    setDrop(route.to);
    openBooking();
  }}
  className="inline-block rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white transition-transform hover:-translate-y-0.5"
>
  Book Now
</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-2 border-t border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-400">*Note: The rates are valid up to 31st July. Vizag & Araku tourist season starts from 1st August to February. Season rates are a little bit higher depending on the availability of the vehicle.</p>
          <Link
            to="/destinations"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5"
          >
            View All Destinations
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}