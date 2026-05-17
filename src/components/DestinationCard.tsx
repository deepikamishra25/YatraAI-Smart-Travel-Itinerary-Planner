import { ScoredDestination } from "@/types";
import { Card, CardContent } from "./ui/card";
import { MapPin, CheckCircle2 } from "lucide-react";
import MatchScoreBadge from "./MatchScoreBadge";

interface DestinationCardProps {
  destination: ScoredDestination;
  onClick?: () => void;
  isSelected?: boolean;
}

export default function DestinationCard({ destination, onClick, isSelected }: DestinationCardProps) {
  return (
    <Card 
      className={`glass-premium overflow-hidden border-[3px] transition-all cursor-pointer hover-lift-premium ${
        isSelected ? "border-primary shadow-lg ring-4 ring-orange-100 ring-offset-2 scale-[1.02]" : "border-transparent"
      }`}
      onClick={onClick}
    >
      <div className="relative h-48 w-full">
        <img 
          src={`/api/proxy-image?url=${encodeURIComponent(destination.image)}`} 
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full shadow-md border border-orange-100/50 dark:border-slate-700">
          <MatchScoreBadge score={destination.matchScore} className="border-none" />
        </div>
        {isSelected && (
          <div className="absolute top-3 right-3 bg-gradient-to-br from-[#FF6B35] to-[#FFB347] text-white rounded-full p-1.5 shadow-md border border-white/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        )}
      </div>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold font-['var(--font-playfair)'] text-gray-900 dark:text-slate-50">{destination.name}</h3>
          <span className="text-xs font-semibold bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 text-primary px-2.5 py-1 rounded-md whitespace-nowrap ml-2 shadow-sm">
            {destination.bestDuration.min}-{destination.bestDuration.max} Days
          </span>
        </div>
        <div className="flex items-center text-muted-foreground text-sm mb-4">
          <MapPin className="w-4 h-4 mr-1 shrink-0" />
          {destination.state}, {destination.region}
        </div>
        
        <div className="space-y-2 mt-4 pt-4 border-t border-border/50">
          <p className="text-sm font-semibold">Why it's a match:</p>
          <ul className="text-sm text-muted-foreground space-y-1.5">
            {destination.matchReasons.map((reason, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span className="leading-tight">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
