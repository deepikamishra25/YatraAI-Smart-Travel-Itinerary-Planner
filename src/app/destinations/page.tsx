import { Metadata } from "next";
import destinationsData from "@/data/destinations.json";
import { Destination } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Explore Destinations | YatraAI",
  description: "Browse all premium travel destinations across India.",
};

export default function DestinationsPage() {
  const destinations = destinationsData as Destination[];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold font-['var(--font-playfair)'] mb-6">
          Explore Incredible India
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover a curated collection of breathtaking destinations. From the snow-capped Himalayas to the sun-kissed beaches of the south.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {destinations.map((dest) => (
          <div key={dest.id} className="group h-full">
            <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 bg-card h-full flex flex-col">
              <div className="relative h-64 overflow-hidden shrink-0">
                <img
                  src={`/api/proxy-image?url=${encodeURIComponent(dest.image)}`}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 text-sm font-medium shadow-sm">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{dest.rating}</span>
                </div>
              </div>
              <CardContent className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold font-['var(--font-playfair)']">{dest.name}</h3>
                  <span className="text-sm font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-md whitespace-nowrap ml-2">
                    {dest.bestDuration.min}-{dest.bestDuration.max} Days
                  </span>
                </div>
                <div className="flex items-center text-muted-foreground text-sm mb-4">
                  <MapPin className="w-4 h-4 mr-1 shrink-0" />
                  {dest.state}, {dest.region}
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {dest.interests.slice(0, 3).map((interest, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                      {interest}
                    </span>
                  ))}
                  {dest.interests.length > 3 && (
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full font-medium">
                      +{dest.interests.length - 3}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
