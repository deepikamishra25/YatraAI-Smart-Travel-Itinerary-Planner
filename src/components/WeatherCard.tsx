import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { ScoredDestination } from "@/types";
import { Sun, Cloud, CloudRain, Snowflake, ThermometerSun, CalendarDays } from "lucide-react";

export default function WeatherCard({ destination }: { destination: ScoredDestination }) {
  const iconMap: Record<string, React.ReactNode> = {
    sun: <Sun className="w-8 h-8 text-orange-500 animate-pulse" />,
    cloud: <Cloud className="w-8 h-8 text-blue-400" />,
    rain: <CloudRain className="w-8 h-8 text-blue-600" />,
    snow: <Snowflake className="w-8 h-8 text-blue-300 animate-spin-slow" />
  };

  const weatherIcon = destination.weatherInfo?.icon 
    ? iconMap[destination.weatherInfo.icon] || iconMap['sun']
    : iconMap['sun'];

  return (
    <Card className="glass-premium border-[2px] border-orange-100/50 dark:border-slate-800 hover-lift-premium relative overflow-hidden group">
      {/* Decorative gradient blob */}
      <div className="absolute top-[-20%] right-[-10%] w-32 h-32 rounded-full bg-orange-200/30 dark:bg-orange-600/20 blur-2xl z-0 group-hover:scale-110 transition-transform duration-500"></div>
      
      <CardHeader className="bg-muted/30 border-b p-5 relative z-10">
        <CardTitle className="flex justify-between items-center text-lg font-['var(--font-playfair)']">
          <span className="flex items-center gap-2">
            <ThermometerSun className="w-5 h-5 text-primary" />
            Weather Profile
          </span>
          {weatherIcon}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-5 space-y-4 relative z-10">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Estimated Temperature</span>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-400 dark:from-orange-400 dark:to-orange-300">
            {destination.weatherInfo?.tempRange || "20°C - 30°C"}
          </span>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-semibold text-muted-foreground flex items-center gap-1">
            <CalendarDays className="w-4 h-4" /> 
            Best Months to Visit
          </span>
          <div className="flex flex-wrap gap-2">
            {destination.bestMonths.map((month, idx) => (
              <span 
                key={idx} 
                className="bg-white/60 dark:bg-slate-800/60 text-gray-700 dark:text-slate-300 px-2.5 py-1 rounded-md text-xs font-medium border border-orange-100 dark:border-slate-700 shadow-sm"
              >
                {month.slice(0, 3)}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
