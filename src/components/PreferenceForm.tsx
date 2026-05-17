"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Preferences } from "@/types";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Compass, Calendar, Heart, Users, IndianRupee, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

const REGIONS = ["North", "South", "East", "West", "North East", "Anywhere"];
const INTERESTS_LIST = [
  "Nature", "Adventure", "History", "Culture", "Beaches", 
  "Spirituality", "Food", "Shopping", "Relaxation", "Photography", "Romance", "Wildlife"
];
const MATES_LIST = ["Solo", "Couple", "Family", "Friends"];

export default function PreferenceForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [prefs, setPrefs] = useState<Partial<Preferences>>({
    region: "",
    duration: 5,
    interests: [],
    travelMates: "",
    budget: 50000,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    // Validation
    const newErrors: Record<string, string> = {};
    if (step === 1 && !prefs.region) newErrors.region = "Please select a region.";
    if (step === 2 && (!prefs.duration || prefs.duration < 1)) newErrors.duration = "Please enter a valid duration.";
    if (step === 3 && (!prefs.interests || prefs.interests.length === 0)) newErrors.interests = "Please select at least one interest.";
    if (step === 4 && !prefs.travelMates) newErrors.travelMates = "Please select who you are traveling with.";
    if (step === 5 && (!prefs.budget || prefs.budget < 5000)) newErrors.budget = "Please enter a realistic budget (min ₹5000).";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      submitForm();
    }
  };

  const submitForm = () => {
    // If "Anywhere" was selected, remove the region property to signify any
    const finalPrefs = { ...prefs };
    if (finalPrefs.region === "Anywhere") {
      delete finalPrefs.region;
    }
    
    // Save to local storage
    localStorage.setItem("yatraai-prefs", JSON.stringify(finalPrefs));
    
    // Navigate to itinerary
    router.push("/itinerary");
  };

  const toggleInterest = (interest: string) => {
    const current = prefs.interests || [];
    if (current.includes(interest)) {
      setPrefs({ ...prefs, interests: current.filter(i => i !== interest) });
    } else {
      if (current.length < 5) {
        setPrefs({ ...prefs, interests: [...current, interest] });
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-muted-foreground mb-2">
          <span>Step {step} of {totalSteps}</span>
          <span>{Math.round(progress)}% Completed</span>
        </div>
        <div className="w-full bg-orange-100 rounded-full h-2.5 shadow-inner">
          <div 
            className="bg-gradient-to-r from-[#FF6B35] to-[#FFB347] h-2.5 rounded-full transition-all duration-500 ease-in-out shadow-[0_0_10px_rgba(255,107,53,0.5)]" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <Card className="glass-premium border-none">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            {step === 1 && <Compass className="w-8 h-8 text-primary" />}
            {step === 2 && <Calendar className="w-8 h-8 text-primary" />}
            {step === 3 && <Heart className="w-8 h-8 text-primary" />}
            {step === 4 && <Users className="w-8 h-8 text-primary" />}
            {step === 5 && <IndianRupee className="w-8 h-8 text-primary" />}
            <CardTitle className="text-2xl font-['var(--font-playfair)']">
              {step === 1 && "Where do you want to go?"}
              {step === 2 && "How long is your trip?"}
              {step === 3 && "What do you love?"}
              {step === 4 && "Who's coming along?"}
              {step === 5 && "What's your total budget?"}
            </CardTitle>
          </div>
          <CardDescription>
            {step === 1 && "Select a preferred region in India, or choose Anywhere if you're open to suggestions."}
            {step === 2 && "Tell us the number of days you plan to travel."}
            {step === 3 && "Select up to 5 interests to help us match the perfect destination."}
            {step === 4 && "Let us know your travel companions to estimate costs accurately."}
            {step === 5 && "Enter the total maximum amount (in ₹) you're willing to spend for the entire trip."}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="min-h-[250px]">
          {/* Step 1: Region */}
          {step === 1 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {REGIONS.map(region => (
                <button
                  key={region}
                  onClick={() => setPrefs({ ...prefs, region })}
                  className={`p-4 border-[3px] rounded-2xl text-center transition-all shadow-sm ${
                    prefs.region === region 
                      ? "border-primary bg-orange-50 font-bold text-primary ring-4 ring-orange-100/50 scale-[1.02]" 
                      : "border-transparent bg-white/60 hover:border-orange-200 hover:bg-white font-medium text-gray-600 hover:text-gray-900 hover:-translate-y-1 hover:shadow-md"
                  }`}
                >
                  {region}
                </button>
              ))}
              {errors.region && <p className="col-span-full text-destructive text-sm mt-2">{errors.region}</p>}
            </div>
          )}

          {/* Step 2: Duration */}
          {step === 2 && (
            <div className="max-w-xs mx-auto text-center space-y-6 pt-4">
              <div className="flex items-center justify-center space-x-6">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="w-12 h-12 rounded-full border-2"
                  onClick={() => setPrefs({ ...prefs, duration: Math.max(1, (prefs.duration || 1) - 1) })}
                >-</Button>
                <span className="text-6xl font-bold font-['var(--font-playfair)'] w-20">
                  {prefs.duration}
                </span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="w-12 h-12 rounded-full border-2"
                  onClick={() => setPrefs({ ...prefs, duration: (prefs.duration || 1) + 1 })}
                >+</Button>
              </div>
              <p className="text-muted-foreground font-medium text-lg">Days</p>
              {errors.duration && <p className="text-destructive text-sm mt-2">{errors.duration}</p>}
            </div>
          )}

          {/* Step 3: Interests */}
          {step === 3 && (
            <div>
              <div className="flex justify-between items-center mb-4 text-sm text-muted-foreground">
                <span>Select up to 5</span>
                <span className="font-medium bg-secondary px-2 py-1 rounded-md text-secondary-foreground">{(prefs.interests || []).length}/5 selected</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {INTERESTS_LIST.map(interest => {
                  const isSelected = (prefs.interests || []).includes(interest);
                  return (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`px-4 py-2.5 border-[2px] rounded-full text-sm transition-all flex items-center gap-2 font-medium shadow-sm ${
                        isSelected 
                          ? "border-primary bg-orange-50 text-primary shadow-md scale-105" 
                          : "border-transparent bg-white/60 hover:border-orange-200 hover:bg-white text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-4 h-4" />}
                      {interest}
                    </button>
                  );
                })}
              </div>
              {errors.interests && <p className="text-destructive text-sm mt-4">{errors.interests}</p>}
            </div>
          )}

          {/* Step 4: Travel Mates */}
          {step === 4 && (
            <div className="grid grid-cols-2 gap-4">
              {MATES_LIST.map(mate => (
                <button
                  key={mate}
                  onClick={() => setPrefs({ ...prefs, travelMates: mate })}
                  className={`p-6 border-[3px] rounded-2xl text-center transition-all shadow-sm ${
                    prefs.travelMates === mate 
                      ? "border-primary bg-orange-50 font-bold text-primary ring-4 ring-orange-100/50 scale-[1.05] shadow-md" 
                      : "border-transparent bg-white/60 hover:border-orange-200 hover:bg-white font-medium text-gray-600 hover:text-gray-900 hover:-translate-y-1 hover:shadow-md"
                  }`}
                >
                  {mate}
                </button>
              ))}
              {errors.travelMates && <p className="col-span-full text-destructive text-sm mt-2">{errors.travelMates}</p>}
            </div>
          )}

          {/* Step 5: Budget */}
          {step === 5 && (
            <div className="max-w-md mx-auto space-y-8 pt-4 text-center">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Total Budget (in ₹)
                </label>
                <div className="relative group">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-muted-foreground group-focus-within:text-primary transition-colors">₹</span>
                  <input
                    type="number"
                    min="5000"
                    step="1000"
                    value={prefs.budget || ""}
                    onChange={(e) => setPrefs({ ...prefs, budget: parseInt(e.target.value) || 0 })}
                    className="w-full h-20 pl-12 pr-4 rounded-2xl border-2 border-input bg-background text-4xl font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary shadow-sm transition-all"
                  />
                </div>
                {errors.budget && <p className="text-destructive text-sm mt-2 text-left">{errors.budget}</p>}
              </div>

              <div className="p-4 bg-secondary/50 rounded-xl text-sm text-muted-foreground text-left leading-relaxed">
                <p>This budget will be used to calculate feasibility across accommodation, food, transport, and activities for <strong className="text-foreground">{prefs.duration} days</strong> and <strong className="text-foreground">{prefs.travelMates}</strong>.</p>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between border-t pt-6 pb-2 px-6">
          <Button 
            variant="ghost" 
            onClick={() => setStep(step - 1)} 
            disabled={step === 1}
            className={step === 1 ? "invisible" : ""}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button onClick={handleNext} size="lg" className="px-8 rounded-full shadow-md font-bold">
            {step === totalSteps ? "Generate Itinerary" : "Next"} 
            {step < totalSteps && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
