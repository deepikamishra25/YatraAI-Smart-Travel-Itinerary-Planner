"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Bookmark, Check, BookmarkCheck } from "lucide-react";
import { Preferences, ScoredDestination, DayPlan, CostBreakdown } from "@/types";
import { getCurrentUser } from "@/lib/auth";

interface SaveTripButtonProps {
  destination: ScoredDestination;
  preferences: Preferences;
  itinerary: DayPlan[];
  costs: CostBreakdown;
}

export default function SaveTripButton({ 
  destination, 
  preferences, 
  itinerary, 
  costs 
}: SaveTripButtonProps) {
  const [saveState, setSaveState] = useState<"idle" | "saved" | "exists">("idle");

  const handleSaveTrip = () => {
    try {
      const user = getCurrentUser();
      if (!user) {
        alert("You must be logged in to save a trip.");
        return;
      }

      const existingData = localStorage.getItem("yatraai-saved-trips");
      const savedTrips = existingData ? JSON.parse(existingData) : [];

      // Create a unique-ish ID for this trip plan based on dest, duration, budget, and user
      const tripId = `${user.id}-${destination.id}-${preferences.duration}d-${preferences.budget}`;

      const isDuplicate = savedTrips.some((trip: any) => trip.id === tripId);

      if (isDuplicate) {
        setSaveState("exists");
        setTimeout(() => setSaveState("idle"), 3000);
        return;
      }

      const newTrip = {
        id: tripId,
        userId: user.id,
        dateSaved: new Date().toISOString(),
        destination,
        preferences,
        itinerary,
        costs
      };

      savedTrips.push(newTrip);
      localStorage.setItem("yatraai-saved-trips", JSON.stringify(savedTrips));
      
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 3000);
    } catch (e) {
      console.error("Failed to save trip:", e);
      alert("Failed to save trip to local storage.");
    }
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleSaveTrip}
      disabled={saveState !== "idle"}
      className="w-full sm:w-auto rounded-full font-medium transition-all hover:scale-105"
    >
      {saveState === "saved" ? (
        <>
          <Check className="w-4 h-4 mr-2 text-emerald-500" />
          Saved Successfully!
        </>
      ) : saveState === "exists" ? (
        <>
          <BookmarkCheck className="w-4 h-4 mr-2 text-primary" />
          Already Saved
        </>
      ) : (
        <>
          <Bookmark className="w-4 h-4 mr-2" />
          Save Trip
        </>
      )}
    </Button>
  );
}
