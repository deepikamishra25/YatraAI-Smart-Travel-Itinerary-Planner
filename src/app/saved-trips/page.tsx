"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Preferences, ScoredDestination, DayPlan, CostBreakdown } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Calendar, IndianRupee, Trash2, Bookmark } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";

interface SavedTrip {
  id: string;
  userId?: string;
  dateSaved: string;
  destination: ScoredDestination;
  preferences: Preferences;
  itinerary: DayPlan[];
  costs: CostBreakdown;
}

export default function SavedTripsPage() {
  const router = useRouter();
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const user = getCurrentUser();
    if (!user) return; // ProtectedRoute will handle redirect anyway

    const trips = localStorage.getItem("yatraai-saved-trips");
    if (trips) {
      const parsedTrips: SavedTrip[] = JSON.parse(trips);
      const userTrips = parsedTrips.filter(t => t.userId === user.id || !t.userId); // Support legacy trips if needed, or strictly user.id
      setSavedTrips(userTrips);
    }
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to permanently delete this trip?")) {
      const updated = savedTrips.filter(t => t.id !== id);
      setSavedTrips(updated);
      localStorage.setItem("yatraai-saved-trips", JSON.stringify(updated));
    }
  };

  const handleView = (id: string) => {
    router.push(`/itinerary?savedTrip=${id}`);
  };

  if (!mounted) return null;

  return (
    <ProtectedRoute>
      <div className="py-8 space-y-8">
        <div className="flex items-center gap-3 border-b border-orange-100/60 dark:border-slate-800/60 pb-6">
          <div className="bg-orange-100 dark:bg-orange-500/20 p-3 rounded-full">
            <Bookmark className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-['var(--font-playfair)']">My Saved Trips</h1>
            <p className="text-muted-foreground mt-1">Manage and revisit your perfectly planned AI itineraries.</p>
          </div>
        </div>

        {savedTrips.length === 0 ? (
          <div className="text-center py-20 px-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 mb-6">
              <MapPin className="w-10 h-10 text-slate-300 dark:text-slate-600" />
            </div>
            <h3 className="text-2xl font-bold font-['var(--font-playfair)'] mb-2">No trips saved yet</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              You haven't saved any itineraries yet. Let our AI plan the perfect trip tailored just for you!
            </p>
            <Link href="/planner">
              <Button className="rounded-full bg-btn-gradient text-white font-semibold px-8 py-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                Plan a New Trip
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedTrips.map((trip) => (
              <Card key={trip.id} className="glass-premium border-2 border-orange-100/50 dark:border-slate-800 overflow-hidden group hover-lift-premium flex flex-col h-full">
                <div 
                  className="h-40 w-full relative bg-cover bg-center"
                  style={{ backgroundImage: `url(${trip.destination.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-bold font-['var(--font-playfair)']">{trip.destination.name}</h3>
                    <p className="text-sm font-medium opacity-90">{trip.destination.state}, India</p>
                  </div>
                </div>
                
                <CardContent className="p-5 flex-grow space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="font-medium text-foreground">{trip.preferences.duration} Days</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <IndianRupee className="w-4 h-4 text-primary" />
                      <span className="font-medium text-foreground">₹{trip.costs.total.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-orange-100/50 dark:border-slate-800/50">
                    <p className="text-xs text-muted-foreground">
                      Saved on {new Date(trip.dateSaved).toLocaleDateString(undefined, { 
                        year: 'numeric', month: 'short', day: 'numeric' 
                      })}
                    </p>
                  </div>
                </CardContent>
                
                <CardFooter className="p-4 pt-0 gap-2">
                  <Button 
                    className="flex-1 bg-btn-gradient text-white rounded-full font-semibold shadow-md"
                    onClick={() => handleView(trip.id)}
                  >
                    View Itinerary
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full shrink-0 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 dark:border-red-900/30 dark:hover:bg-red-900/20"
                    onClick={() => handleDelete(trip.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
