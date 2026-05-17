import PreferenceForm from "@/components/PreferenceForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan Your Trip | YatraAI",
  description: "Enter your travel preferences to generate a smart itinerary.",
};

export default function PlannerPage() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-10">
      <div className="text-center mb-10 px-4">
        <h1 className="text-4xl md:text-5xl font-bold font-['var(--font-playfair)'] mb-4">
          Design Your Perfect Trip
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto text-lg">
          Answer a few quick questions and let our AI curate the ideal Indian destination and day-by-day itinerary for you.
        </p>
      </div>

      <PreferenceForm />
    </div>
  );
}
