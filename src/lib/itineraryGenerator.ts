import { Destination, Preferences, DayPlan, Activity } from "../types";

export function generateItinerary(destination: Destination, prefs: Preferences): DayPlan[] {
  const days: DayPlan[] = [];
  const attractions = [...destination.attractions];

  for (let i = 1; i <= prefs.duration; i++) {
    const activities: Activity[] = [];
    let theme = "";
    
    if (i === 1) {
      theme = "Arrival & Leisurely Exploration";
      activities.push({
        id: `day-${i}-arrival`,
        title: "Hotel Check-in & Rest",
        description: "Arrive at your accommodation, check-in, and freshen up after the journey.",
        durationHours: 2,
        costEstimate: 0,
        location: "Hotel / Resort",
        type: "Transit"
      });
      if (attractions.length > 0) {
        const attraction = attractions.shift()!;
        activities.push({
          id: `day-${i}-sightseeing`,
          title: `Evening at ${attraction}`,
          description: `Enjoy a relaxed evening visit to ${attraction}.`,
          durationHours: 3,
          costEstimate: 500,
          location: attraction,
          type: "Sightseeing"
        });
      }
    } else if (i === prefs.duration) {
      theme = "Final Souvenirs & Departure";
      activities.push({
        id: `day-${i}-shopping`,
        title: "Local Market Visit",
        description: "Pick up local souvenirs and enjoy a local breakfast.",
        durationHours: 3,
        costEstimate: 1500,
        location: "City Center / Local Market",
        type: "Shopping"
      });
      activities.push({
        id: `day-${i}-departure`,
        title: "Departure",
        description: "Head to the airport or station for your onward journey.",
        durationHours: 2,
        costEstimate: 500,
        location: "Transit Hub",
        type: "Transit"
      });
    } else {
      theme = "Explore the Highlights";
      if (attractions.length > 0) {
        const attraction = attractions.shift()!;
        activities.push({
          id: `day-${i}-morning`,
          title: `Morning at ${attraction}`,
          description: `Start your day by exploring ${attraction}.`,
          durationHours: 4,
          costEstimate: 800,
          location: attraction,
          type: "Sightseeing"
        });
      }
      if (attractions.length > 0) {
        const attraction = attractions.shift()!;
        activities.push({
          id: `day-${i}-afternoon`,
          title: `Afternoon at ${attraction}`,
          description: `Continue your adventure at ${attraction}.`,
          durationHours: 3,
          costEstimate: 800,
          location: attraction,
          type: "Sightseeing"
        });
      }
      activities.push({
        id: `day-${i}-evening`,
        title: "Evening Leisure",
        description: "Enjoy local cuisine and relax after a long day of sightseeing.",
        durationHours: 2,
        costEstimate: 1000,
        location: "Local Restaurant",
        type: "Dining"
      });
    }

    const dailyCost = activities.reduce((acc, act) => acc + act.costEstimate, 0);

    days.push({
      dayNumber: i,
      theme,
      activities,
      dailyCost
    });
  }

  return days;
}
