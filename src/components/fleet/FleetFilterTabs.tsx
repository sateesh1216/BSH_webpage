import { vehicleCategories, type VehicleCategory } from "../../data/fleetData";

export type FleetFilter = "All Vehicles" | VehicleCategory;

const filters: FleetFilter[] = ["All Vehicles", ...vehicleCategories];

type Props = {
  active: FleetFilter;
  onChange: (filter: FleetFilter) => void;
};

export default function FleetFilterTabs({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-2 rounded-full border border-slate-100 bg-white p-2 shadow-sm sm:inline-flex sm:gap-1">
      {filters.map((filter) => {
        const isActive = filter === active;
        return (
          <button
            key={filter}
            type="button"
            onClick={() => onChange(filter)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              isActive ? "bg-primary text-white shadow-md shadow-primary/25" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}