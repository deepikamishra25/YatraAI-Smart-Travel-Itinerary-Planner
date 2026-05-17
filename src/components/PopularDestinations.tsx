import Link from "next/link";
import destinationsData from "@/data/destinations.json";
import { Destination } from "@/types";
import { MapPin, Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export default function PopularDestinations() {
  // Take top 6 highly rated destinations for the showcase
  const popularDestinations = (destinationsData as Destination[])
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return (
    <section className="py-16">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold font-['var(--font-playfair)'] mb-4">Popular Destinations</h2>
          <p className="text-muted-foreground max-w-2xl">
            Explore some of the most sought-after locations across India.
          </p>
        </div>
        <Link href="/destinations">
          <Button variant="outline" className="rounded-full">View All Destinations</Button>
        </Link>
      </div>

      {/* Horizontal scroll container on mobile, grid on desktop */}
      <div className="flex overflow-x-auto pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 snap-x hide-scrollbar">
        {popularDestinations.map((dest) => (
          <Link href={`/destinations/${dest.id}`} key={dest.id} className="min-w-[85vw] md:min-w-0 snap-center group block h-full">
            <Card className="glass-premium overflow-hidden h-full flex flex-col cursor-pointer hover-lift-premium">
              <div className="relative h-64 overflow-hidden shrink-0">
                <img
                  src={`/api/proxy-image?url=${encodeURIComponent(dest.image)}`}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 text-sm font-bold shadow-sm border border-green-100 dark:border-slate-700">
                  <Star className="w-4 h-4 fill-secondary text-secondary dark:fill-emerald-400 dark:text-emerald-400" />
                  <span className="text-gray-900 dark:text-slate-100">{dest.rating}</span>
                </div>
              </div>
              <CardContent className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold font-['var(--font-playfair)'] text-gray-900 dark:text-slate-50">{dest.name}</h3>
                  <span className="text-xs font-semibold text-primary bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 px-2 py-1 rounded-md whitespace-nowrap ml-2">
                    {dest.bestDuration.min}-{dest.bestDuration.max} Days
                  </span>
                </div>
                <div className="flex items-center text-muted-foreground text-sm mb-4">
                  <MapPin className="w-4 h-4 mr-1 shrink-0" />
                  {dest.state}, {dest.region}
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {dest.interests.slice(0, 3).map((interest, i) => (
                    <span key={i} className="text-xs bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 px-3 py-1 rounded-full font-medium border border-orange-100 dark:border-orange-500/20">
                      {interest}
                    </span>
                  ))}
                  {dest.interests.length > 3 && (
                    <span className="text-xs bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-slate-400 px-3 py-1 rounded-full font-medium border border-gray-200 dark:border-slate-700">
                      +{dest.interests.length - 3}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      {/* Global CSS for hide-scrollbar */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
