import { Compass, Map, Clock, Wallet } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function FeatureCards() {
  const features = [
    {
      title: "Smart Recommendations",
      description: "Our AI matches you with the perfect destinations based on your unique interests and travel style.",
      icon: Compass,
      color: "text-blue-600",
      bg: "bg-blue-100",
      cardBg: "bg-blue-50/50 hover:bg-blue-50 border-blue-100/50",
    },
    {
      title: "Custom Itineraries",
      description: "Get detailed, day-by-day plans crafted to maximize your time and experiences.",
      icon: Map,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
      cardBg: "bg-emerald-50/50 hover:bg-emerald-50 border-emerald-100/50",
    },
    {
      title: "Optimized Routing",
      description: "Save time with logically ordered daily activities to minimize travel time.",
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-100",
      cardBg: "bg-amber-50/50 hover:bg-amber-50 border-amber-100/50",
    },
    {
      title: "Budget Management",
      description: "Stay within your means with our comprehensive cost breakdown and estimates.",
      icon: Wallet,
      color: "text-purple-600",
      bg: "bg-purple-100",
      cardBg: "bg-purple-50/50 hover:bg-purple-50 border-purple-100/50",
    },
  ];

  return (
    <section className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-['var(--font-playfair)'] text-gray-900 mb-4">Why Choose YatraAI?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Planning a trip can be overwhelming. We take the stress out of travel planning so you can focus on the experience.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, idx) => (
          <Card key={idx} className={`border ${feature.cardBg} shadow-sm backdrop-blur-sm hover-lift-premium cursor-default`}>
            <CardHeader>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${feature.bg} shadow-sm`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-gray-600">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
