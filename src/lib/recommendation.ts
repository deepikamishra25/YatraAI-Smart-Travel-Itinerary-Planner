import { Destination, Preferences, ScoredDestination } from "../types";
import destinationsData from "../data/destinations.json";

const destinations = destinationsData as Destination[];

export function getRecommendations(prefs: Preferences): ScoredDestination[] {
  const scoredDestinations: ScoredDestination[] = destinations.map((dest) => {
    let score = 0;
    const matchReasons: string[] = [];

    // Interest match (40 points)
    if (prefs.interests && prefs.interests.length > 0) {
      const matchCount = prefs.interests.filter(i => dest.interests.includes(i)).length;
      const interestScore = (matchCount / prefs.interests.length) * 40;
      score += interestScore;
      if (interestScore >= 20) {
        matchReasons.push("Strong match for your preferred interests");
      }
    } else {
      score += 40; 
    }

    // Budget fit (25 points)
    const estimatedCost = dest.avgDailyCost * prefs.duration;
    if (estimatedCost <= prefs.budget) {
      score += 25;
      matchReasons.push("Fits comfortably within your budget");
    } else if (estimatedCost <= prefs.budget * 1.2) {
      score += 15;
      matchReasons.push("Slightly above budget, but highly recommended");
    } else {
      score += 5;
      matchReasons.push("Exceeds initial budget");
    }

    // Region match (20 points)
    if (prefs.region && prefs.region === dest.region) {
      score += 20;
      matchReasons.push(`Located in your preferred region (${dest.region})`);
    } else if (!prefs.region) {
      score += 20; 
    }

    // Duration fit (15 points)
    if (prefs.duration >= dest.bestDuration.min && prefs.duration <= dest.bestDuration.max) {
      score += 15;
      matchReasons.push("Perfect duration to explore this destination");
    } else if (prefs.duration > dest.bestDuration.max) {
      score += 10;
      matchReasons.push("Allows for a very relaxed and deep exploration");
    } else {
      score += 5;
      matchReasons.push("A bit rushed, but covers the major highlights");
    }

    return {
      ...dest,
      matchScore: Math.round(score),
      matchReasons
    };
  });

  return scoredDestinations
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);
}
