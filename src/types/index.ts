export interface Preferences {
  budget: number;
  duration: number;
  interests: string[];
  region?: string;
  travelMonth?: string;
  travelMates?: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  durationHours: number;
  costEstimate: number;
  location: string;
  type: string;
}

export interface DayPlan {
  dayNumber: number;
  theme: string;
  activities: Activity[];
  dailyCost: number;
}

export interface CostBreakdown {
  accommodation: number;
  food: number;
  transport: number;
  activities: number;
  miscellaneous: number;
  total: number;
  perPerson: number;
}

export interface Destination {
  id: string;
  name: string;
  state: string;
  region: string;
  interests: string[];
  minBudget: number;
  avgDailyCost: number;
  bestDuration: {
    min: number;
    max: number;
  };
  attractions: string[];
  image: string;
  rating: number;
  bestMonths: string[];
  packingHints: string[];
}

export interface ScoredDestination extends Destination {
  matchScore: number;
  matchReasons: string[];
}
