"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Preferences, ScoredDestination, DayPlan, CostBreakdown as CostBreakdownType } from "@/types";
import { decodePrefs } from "@/lib/utils";
import { getRecommendations } from "@/lib/recommendation";
import { generateItinerary } from "@/lib/itineraryGenerator";
import { calculateCosts } from "@/lib/costCalculator";

import DestinationCard from "@/components/DestinationCard";
import DayPlanCard from "@/components/DayPlanCard";
import CostBreakdown from "@/components/CostBreakdown";
import WeatherCard from "@/components/WeatherCard";
import ExportButtons from "@/components/ExportButtons";
import SaveTripButton from "@/components/SaveTripButton";
import ProtectedRoute from "@/components/ProtectedRoute";
import dynamic from "next/dynamic";

const TripMap = dynamic(() => import("@/components/TripMap"), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full rounded-2xl bg-orange-50/50 dark:bg-slate-800/50 animate-pulse border-2 border-orange-100/50 dark:border-slate-700/50" />
});

import { Map, Sparkles, CheckCircle2, BaggageClaim } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function ItineraryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  
  const [recommendations, setRecommendations] = useState<ScoredDestination[]>([]);
  const [selectedDest, setSelectedDest] = useState<ScoredDestination | null>(null);
  
  const [itinerary, setItinerary] = useState<DayPlan[]>([]);
  const [costs, setCosts] = useState<CostBreakdownType | null>(null);

  useEffect(() => {
    const loadPreferences = () => {
      // 1. Check for saved trip ID first
      const savedTripId = searchParams.get("savedTrip");
      if (savedTripId) {
        const savedData = localStorage.getItem("yatraai-saved-trips");
        if (savedData) {
          try {
            const parsedTrips = JSON.parse(savedData);
            const foundTrip = parsedTrips.find((t: any) => t.id === savedTripId);
            if (foundTrip) {
              setPreferences(foundTrip.preferences);
              setSelectedDest(foundTrip.destination);
              setItinerary(foundTrip.itinerary);
              setCosts(foundTrip.costs);
              setRecommendations([foundTrip.destination]);
              setIsLoading(false);
              return;
            }
          } catch (e) {
            console.error("Failed to parse saved trips", e);
          }
        }
      }

      let prefs: Preferences | null = null;
      
      // 2. Check URL query next
      const planQuery = searchParams.get("plan");
      if (planQuery) {
        try {
          prefs = decodePrefs(planQuery);
        } catch (e) {
          console.error("Failed to decode plan from URL", e);
        }
      }

      // 3. Check localStorage if not in URL
      if (!prefs) {
        const localPrefs = localStorage.getItem("yatraai-prefs");
        if (localPrefs) {
          try {
            prefs = JSON.parse(localPrefs);
          } catch (e) {
            console.error("Failed to parse local preferences", e);
          }
        }
      }

      if (!prefs) {
        router.push("/planner");
        return;
      }

      setPreferences(prefs);

      // Simulate AI Processing for 1.5 seconds for new trips
      setTimeout(() => {
        const recs = getRecommendations(prefs!);
        setRecommendations(recs);
        if (recs.length > 0) {
          handleSelectDestination(recs[0], prefs!);
        }
        setIsLoading(false);
      }, 1500);
    };

    loadPreferences();
  }, [router, searchParams]);

  const handleSelectDestination = (dest: ScoredDestination, prefs: Preferences) => {
    setSelectedDest(dest);
    const newItinerary = generateItinerary(dest, prefs);
    setItinerary(newItinerary);
    const newCosts = calculateCosts(newItinerary, prefs);
    setCosts(newCosts);
  };

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-6 text-center px-4">
        <div className="relative">
          <div className="absolute inset-0 bg-orange-100 dark:bg-orange-500/20 rounded-full blur-xl animate-pulse"></div>
          <Sparkles className="w-16 h-16 text-primary animate-bounce relative z-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold font-['var(--font-playfair)']">Crafting Your Perfect Journey...</h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Our AI is analyzing thousands of data points to find the best Indian destinations and routing tailored just for you.
          </p>
        </div>
      </div>
    );
  }

  if (!preferences || !selectedDest || !costs) {
    return null; // Will redirect or just hide
  }

  return (
    <div className="py-8 space-y-12">
      {/* Header & Export */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b pb-6">
        <div>
          <div className="inline-flex items-center rounded-full border border-orange-200 dark:border-orange-500/20 bg-orange-50 dark:bg-orange-500/10 px-4 py-1.5 text-sm font-semibold text-primary mb-4 shadow-sm">
            <Sparkles className="mr-2 h-4 w-4 text-accent" />
            Your AI-Generated Travel Plan
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-['var(--font-playfair)'] text-gray-900 dark:text-slate-50 mb-2">
            Trip to {selectedDest.name}
          </h1>
          <p className="text-lg text-muted-foreground">
            {preferences.duration} Days • {preferences.travelMates}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <SaveTripButton 
            destination={selectedDest}
            preferences={preferences}
            itinerary={itinerary}
            costs={costs}
          />
          <ExportButtons targetId="itinerary-document" />
        </div>
      </div>

      <div id="itinerary-document" className="space-y-12 bg-background px-1 py-2">
        {/* Top Recommendations */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Map className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold font-['var(--font-playfair)']">Top Matches for You</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map((dest) => (
              <DestinationCard 
                key={dest.id} 
                destination={dest} 
                isSelected={selectedDest.id === dest.id}
                onClick={() => handleSelectDestination(dest, preferences)}
              />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Itinerary, Map, Packing */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold font-['var(--font-playfair)'] mb-6 flex items-center gap-2">
                Your Day-by-Day Itinerary
              </h2>
              <div className="space-y-4">
                {itinerary.map((day, idx) => (
                  <DayPlanCard 
                    key={day.dayNumber} 
                    dayPlan={day} 
                    defaultOpen={idx === 0} // Open the first day by default
                  />
                ))}
              </div>
            </section>

            <section className="pt-4">
              <TripMap destination={selectedDest} />
            </section>

            <section className="pt-4">
              <Card className="glass-premium border-[2px] border-orange-100/50 dark:border-slate-800">
                <CardHeader className="bg-muted/50 border-b p-5">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BaggageClaim className="w-5 h-5 text-primary" />
                    Packing Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 flex flex-wrap gap-2">
                  {selectedDest.packingHints.map((hint, idx) => (
                    <span key={idx} className="bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 px-3 py-1.5 rounded-full text-xs font-semibold border border-orange-100/60 dark:border-orange-500/20 shadow-sm">
                      {hint}
                    </span>
                  ))}
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Right Column: Costs, Reasons, Weather */}
          <div className="space-y-8 sticky top-24">
            <section>
              <h2 className="text-2xl font-bold font-['var(--font-playfair)'] mb-6">Trip Budget</h2>
              <CostBreakdown costs={costs} />
            </section>

            <section>
              <Card className="glass-premium border-[2px] border-orange-100/50 dark:border-slate-800">
                <CardHeader className="bg-muted/50 border-b p-5">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Why {selectedDest.name}?
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                  <ul className="space-y-3">
                    {selectedDest.matchReasons.map((reason, idx) => (
                      <li key={idx} className="flex items-start text-sm text-muted-foreground">
                        <span className="text-primary mr-2 font-bold">•</span>
                        <span className="leading-relaxed">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            <section>
              <WeatherCard destination={selectedDest} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ItineraryPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center"><div className="animate-pulse bg-primary/20 w-16 h-16 rounded-full"></div></div>}>
        <ItineraryContent />
      </Suspense>
    </ProtectedRoute>
  );
}
