import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles, MapPin, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden rounded-3xl mt-4 bg-orange-50/40 dark:bg-slate-900/40 backdrop-blur-xl shadow-sm border border-orange-200 dark:border-slate-800 px-6 py-12 md:py-20 lg:px-12 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(255,107,53,0.1)] dark:hover:shadow-[0_30px_60px_rgba(255,107,53,0.05)] hover:border-orange-300 dark:hover:border-slate-700">
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="flex-1 flex flex-col items-start text-left space-y-6">
          <div className="inline-flex items-center rounded-full border border-orange-200 bg-white/60 px-4 py-1.5 text-sm font-semibold text-primary backdrop-blur-md shadow-sm">
            <Sparkles className="mr-2 h-4 w-4 text-accent" />
            AI-Powered Travel Planning
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-slate-50 font-['var(--font-playfair)'] leading-tight">
            Discover India, <br className="hidden sm:block" /> 
            <span className="text-primary">Curated for You</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-slate-400 max-w-xl">
            Experience the vibrant culture, breathtaking landscapes, and hidden gems of India with an intelligent itinerary designed exactly to your preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
            <Link href="/planner" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-base h-14 px-8">
                Plan Your Trip <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/destinations" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-14 px-8">
                Explore Destinations
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Content - Image & Metrics */}
        <div className="flex-1 w-full relative mt-12 lg:mt-0">
          <div className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-[4/3] lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] border-white/50 backdrop-blur-sm">
            <img
              src={`/api/proxy-image?url=${encodeURIComponent("https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop")}`}
              alt="Taj Mahal, India"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Floating Metric 1 */}
          <div className="absolute top-10 -left-4 sm:-left-10 lg:-left-16 glass-premium bg-white/90 dark:bg-slate-900/90 p-4 rounded-2xl flex items-center gap-4 hover-lift-premium cursor-default">
            <div className="bg-orange-100 dark:bg-orange-500/20 p-3 rounded-full text-primary">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Destinations</p>
              <p className="text-xl font-bold text-gray-900">500+</p>
            </div>
          </div>

          {/* Floating Metric 2 */}
          <div className="absolute bottom-20 -right-4 sm:-right-8 lg:-right-12 glass-premium bg-white/90 dark:bg-slate-900/90 p-4 rounded-2xl flex items-center gap-4 hover-lift-premium cursor-default">
            <div className="bg-green-100 dark:bg-emerald-500/20 p-3 rounded-full text-secondary dark:text-emerald-400">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Average Rating</p>
              <p className="text-xl font-bold text-gray-900">4.9/5</p>
            </div>
          </div>
          
          {/* Floating Metric 3 */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 glass-premium bg-white/90 dark:bg-slate-900/90 px-6 py-3 rounded-full flex items-center gap-3 w-max hover-lift-premium cursor-default">
            <div className="flex -space-x-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-500 z-30">A</div>
              <div className="w-8 h-8 rounded-full bg-orange-200 border-2 border-white flex items-center justify-center text-xs font-bold text-orange-700 z-20">M</div>
              <div className="w-8 h-8 rounded-full bg-green-200 border-2 border-white flex items-center justify-center text-xs font-bold text-green-700 z-10">S</div>
            </div>
            <p className="text-sm font-semibold text-gray-900">10k+ <span className="text-gray-500 font-normal">Travelers</span></p>
          </div>
        </div>
      </div>
    </section>
  );
}
