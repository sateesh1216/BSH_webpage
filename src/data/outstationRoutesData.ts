export type OutstationRoute = {
  from: string;
  to: string;
  distance: string;
  onedayFare: number;
  TwodaysFare: number;
  travelTime: string;
};

export const outstationRoutes: OutstationRoute[] = [
  { from: "Visakhapatnam", to: "Araku Valley", distance: "120 KM", onedayFare: 5000, TwodaysFare: 10000, travelTime: "6AM - 6PM" },
  { from: "Visakhapatnam", to: "Lambasingi", distance: "100 KM", onedayFare: 5000, TwodaysFare: 0, travelTime: "2AM - 4PM" },
  { from: "Visakhapatnam", to: "Vanjangi Hills", distance: "90 KM", onedayFare: 5000, TwodaysFare: 0, travelTime: "2AM - 4PM" },
  { from: "Visakhapatnam", to: "Araku 2days 1Nights", distance: "Local", onedayFare: 10000, TwodaysFare: 6000, travelTime: "8AM - Next day 6PM" },
  { from: "Visakhapatnam", to: "Local(10Hr-100km)", distance: "Local", onedayFare: 3000, TwodaysFare: 6000, travelTime: "8AM - 6PM" },
  { from: "Visakhapatnam", to: "Outstation (Minimum 300km's)", distance: "Local", onedayFare: 4200, TwodaysFare: 6000, travelTime: "8AM - 8PM (Per km 14/-)" },
  
  
];