"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ScoredDestination } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { MapPin } from "lucide-react";

// Fix for default Leaflet marker icon in Next.js
const customIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const destIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
  iconRetinaUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to recenter map when destination changes
function MapRecenter({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 12, { animate: true });
  }, [center, map]);
  return null;
}

export default function TripMap({ destination }: { destination: ScoredDestination }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <Card className="glass-premium border-[2px] border-orange-100/50 dark:border-slate-800 h-[400px] flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <MapPin className="w-10 h-10 text-primary mb-4" />
        <p className="text-muted-foreground font-medium">Loading Map...</p>
      </div>
    </Card>
  );

  const center: [number, number] = [destination.latitude, destination.longitude];

  return (
    <Card className="glass-premium border-[2px] border-orange-100/50 dark:border-slate-800 overflow-hidden flex flex-col">
      <CardHeader className="bg-muted/50 border-b p-5">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapPin className="w-5 h-5 text-primary" />
          Trip Map
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 h-[400px] w-full relative z-0">
        <MapContainer 
          center={center} 
          zoom={12} 
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapRecenter center={center} />
          
          {/* Main Destination Marker */}
          <Marker position={center} icon={destIcon}>
            <Popup>
              <div className="font-bold text-gray-900">{destination.name}</div>
              <div className="text-xs text-gray-500">Main Destination</div>
            </Popup>
          </Marker>

          {/* Attraction Markers */}
          {destination.attractions.map((attr, idx) => {
            const attrPos: [number, number] = [
              attr.latitude || destination.latitude + (Math.random() - 0.5) * 0.05,
              attr.longitude || destination.longitude + (Math.random() - 0.5) * 0.05
            ];
            
            return (
              <Marker key={idx} position={attrPos} icon={customIcon}>
                <Popup>
                  <div className="font-bold text-gray-900">{attr.name}</div>
                  <div className="text-xs text-gray-500">Attraction</div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </CardContent>
    </Card>
  );
}
