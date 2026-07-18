import { Locate, Navigation2 } from "lucide-react";
import { useFareCalculator } from "../../hooks/useFareCalculator";
import { vehicles } from "../../data/vehicles";
import { tripTypes } from "../../data/tripTypes";

export default function BookingCard() {
  const {
    pickup,
    setPickup,
    drop,
    setDrop,
    vehicleRate,
    setVehicleRate,
    tripType,
    setTripType,
    error,
    fare,
    calculateRoute,
  } = useFareCalculator();

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_10px_30px_rgba(16,24,40,0.08)] sm:p-8">
      <h3 className="text-xl font-bold text-slate-900">Get Instant Fare</h3>
      <p className="mt-1 text-sm text-slate-500">Enter your trip details to see estimated fare</p>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="pickup" className="mb-1.5 block text-sm font-medium text-slate-700">
            Pickup Location
          </label>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 transition-colors focus-within:border-primary">
            <Locate size={18} className="shrink-0 text-primary" />
            <input
              id="pickup"
              value={pickup}
              onChange={(event) => setPickup(event.target.value)}
              placeholder="Enter pickup location"
              autoComplete="off"
              className="w-full text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <div>
          <label htmlFor="drop" className="mb-1.5 block text-sm font-medium text-slate-700">
            Drop Location
          </label>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 transition-colors focus-within:border-primary">
            <Navigation2 size={18} className="shrink-0 text-primary" />
            <input
              id="drop"
              value={drop}
              onChange={(event) => setDrop(event.target.value)}
              placeholder="Enter drop location"
              autoComplete="off"
              className="w-full text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="vehicle" className="mb-1.5 block text-sm font-medium text-slate-700">
              Select Vehicle
            </label>
            <select
              id="vehicle"
              value={vehicleRate}
              onChange={(event) => setVehicleRate(Number(event.target.value))}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-primary"
            >
              {vehicles.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="tripType" className="mb-1.5 block text-sm font-medium text-slate-700">
              Trip Type
            </label>
            <select
              id="tripType"
              value={tripType}
              onChange={(event) => setTripType(event.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-primary"
            >
              {tripTypes.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={calculateRoute}
          className="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          Search Taxi & Check Fare
        </button>

        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">⚠ {error}</p>}

        <div className="grid grid-cols-3 divide-x divide-slate-200 rounded-xl bg-slate-50 px-2 py-4 text-center">
          <div>
            <p className="text-xs text-slate-500">Distance</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">{fare ? `${fare.distanceKm} km` : "-- km"}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Base Fare</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">{fare ? `₹${fare.rate}` : "₹ --"}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Total Fare</p>
            <p className="mt-1 text-sm font-semibold text-primary">
              {fare ? `₹${fare.totalFare.toFixed(0)}` : "₹ --"}
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400">
          * Final fare may vary based on actual route, tolls, waiting time, etc.
        </p>
      </div>
    </div>
  );
}