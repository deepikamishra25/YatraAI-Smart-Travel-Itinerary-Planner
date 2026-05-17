import Link from "next/link";
import { Map } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-orange-100 bg-white/80 backdrop-blur-md no-print mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Map className="w-5 h-5 text-primary" />
              </div>
              <span className="font-['var(--font-playfair)'] text-2xl font-bold tracking-tight text-gray-900">YatraAI</span>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed pr-4">
              Your intelligent travel companion for exploring the diverse landscapes and rich culture of India.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-orange-200"></span>Home</Link></li>
              <li><Link href="/planner" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-orange-200"></span>Plan Itinerary</Link></li>
              <li><Link href="/destinations" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-orange-200"></span>Destinations</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Top Destinations</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-primary transition-colors">Rajasthan Royal Tour</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Kerala Backwaters</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Goa Beaches</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Himachal Mountains</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-primary transition-colors inline-block hover:-translate-y-0.5 transform-gpu">Twitter</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors inline-block hover:-translate-y-0.5 transform-gpu">Instagram</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors inline-block hover:-translate-y-0.5 transform-gpu">GitHub</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-orange-100/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} YatraAI. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
