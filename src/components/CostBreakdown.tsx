import { CostBreakdown as CostBreakdownType } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Bed, Utensils, Bus, Ticket, CircleEllipsis, ExternalLink } from "lucide-react";

interface CostBreakdownProps {
  costs: CostBreakdownType;
}

export default function CostBreakdown({ costs }: CostBreakdownProps) {
  const items = [
    { label: "Accommodation", value: costs.accommodation, icon: Bed, color: "text-blue-500", bg: "bg-blue-500/10", link: "https://www.booking.com/searchresults.html?ss=India", linkText: "Find Hotel Deals" },
    { label: "Food & Dining", value: costs.food, icon: Utensils, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Local Transport", value: costs.transport, icon: Bus, color: "text-amber-500", bg: "bg-amber-500/10", link: "https://www.skyscanner.co.in/", linkText: "Search Flights & Trains" },
    { label: "Activities & Tickets", value: costs.activities, icon: Ticket, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Miscellaneous", value: costs.miscellaneous, icon: CircleEllipsis, color: "text-gray-500", bg: "bg-gray-500/10" },
  ];

  return (
    <Card className="glass-premium overflow-hidden border-[2px] border-orange-100/50 dark:border-slate-800 hover-lift-premium">
      <div className="bg-gradient-to-r from-orange-50 dark:from-slate-900 to-orange-100/50 dark:to-slate-800 border-b border-orange-100/80 dark:border-slate-800 p-5 sm:p-6">
        <h3 className="flex justify-between items-center text-xl font-bold font-['var(--font-playfair)'] text-gray-900 dark:text-slate-50">
          <span>Estimated Total Trip Cost</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FFD700] text-3xl">{formatCurrency(costs.total)}</span>
        </h3>
        <p className="text-sm font-medium text-gray-700 dark:text-slate-400 mt-1">
          Roughly {formatCurrency(costs.perPerson)} per person
        </p>
      </div>
      <CardContent className="p-0">
        <div className="divide-y">
          {items.map((item, idx) => (
            <div key={idx} className="p-4 sm:px-6 hover:bg-muted/30 transition-colors">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-md ${item.bg}`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <span className="font-medium text-sm sm:text-base">{item.label}</span>
                </div>
                <span className="font-semibold text-sm sm:text-base">{formatCurrency(item.value)}</span>
              </div>
              {item.link && (
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs flex items-center gap-1 text-primary hover:text-orange-600 transition-colors mt-2 ml-12"
                >
                  {item.linkText} <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
