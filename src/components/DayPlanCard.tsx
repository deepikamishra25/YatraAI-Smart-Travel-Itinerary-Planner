"use client";

import { useState } from "react";
import { DayPlan } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";
import { ChevronDown, ChevronUp, MapPin, Clock, IndianRupee } from "lucide-react";

interface DayPlanCardProps {
  dayPlan: DayPlan;
  defaultOpen?: boolean;
}

export default function DayPlanCard({ dayPlan, defaultOpen = false }: DayPlanCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card className="glass-premium overflow-hidden transition-all border-2 border-orange-50 hover:border-orange-100 shadow-sm">
      <div 
        className="flex items-center justify-between p-4 sm:p-5 bg-white/40 cursor-pointer hover:bg-white/60 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FFB347] text-white font-bold text-lg shadow-sm border border-white/50">
            Day {dayPlan.dayNumber}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{dayPlan.theme}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              {dayPlan.activities.length} activities • {formatCurrency(dayPlan.dailyCost)} est. daily cost
            </p>
          </div>
        </div>
        <div className="pl-2">
          {isOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
        </div>
      </div>
      
      {isOpen && (
        <CardContent className="p-0 border-t">
          <div className="flex flex-col divide-y">
            {dayPlan.activities.map((activity, idx) => (
              <div key={activity.id} className="p-4 sm:px-6 hover:bg-muted/30 transition-colors relative">
                {/* Timeline connector line */}
                {idx !== dayPlan.activities.length - 1 && (
                  <div className="absolute left-7 sm:left-9 top-14 bottom-0 w-0.5 bg-border -mb-4 z-0"></div>
                )}
                <div className="flex gap-4 relative z-10">
                  <div className="flex flex-col items-center mt-1">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center border-2 border-white shadow-sm text-xs font-bold text-primary">
                      {idx + 1}
                    </div>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-gray-900">{activity.title}</h4>
                      <span className="text-xs font-semibold text-primary bg-orange-50 px-2 py-1 rounded-full whitespace-nowrap ml-2 border border-orange-100">
                        {activity.type}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-muted-foreground font-medium">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {activity.durationHours} hrs
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {activity.location}
                      </div>
                      {activity.costEstimate > 0 && (
                        <div className="flex items-center gap-1">
                          <IndianRupee className="w-3.5 h-3.5" />
                          {formatCurrency(activity.costEstimate)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
