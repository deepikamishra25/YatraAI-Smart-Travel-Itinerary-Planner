import { DayPlan, Preferences, CostBreakdown } from "../types";

export function calculateCosts(days: DayPlan[], prefs: Preferences): CostBreakdown {
  // Rough baseline per day costs
  const baseAccommodation = 2500;
  const baseFood = 1500;
  const baseTransport = 1000;
  const baseMisc = 500;

  let peopleCount = 1;
  if (prefs.travelMates === "Couple") peopleCount = 2;
  else if (prefs.travelMates === "Family" || prefs.travelMates === "Friends") peopleCount = 4;
  else if (!isNaN(Number(prefs.travelMates))) peopleCount = Number(prefs.travelMates);

  const accommodation = prefs.duration * baseAccommodation * (peopleCount > 1 ? peopleCount * 0.75 : 1); 
  const food = prefs.duration * baseFood * peopleCount;
  const transport = prefs.duration * baseTransport * (peopleCount > 1 ? peopleCount * 0.8 : 1); 
  
  let activitiesCost = 0;
  days.forEach(day => {
    day.activities.forEach(act => {
      activitiesCost += (act.costEstimate * peopleCount);
    });
  });

  const miscellaneous = prefs.duration * baseMisc * peopleCount;
  const total = accommodation + food + transport + activitiesCost + miscellaneous;

  return {
    accommodation: Math.round(accommodation),
    food: Math.round(food),
    transport: Math.round(transport),
    activities: Math.round(activitiesCost),
    miscellaneous: Math.round(miscellaneous),
    total: Math.round(total),
    perPerson: Math.round(total / peopleCount)
  };
}
