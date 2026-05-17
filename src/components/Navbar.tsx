"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Map, Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("dark");
      localStorage.setItem("yatraai-theme", "light");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("yatraai-theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-100/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl no-print shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Map className="w-8 h-8 text-primary" />
            <span className="font-['var(--font-playfair)'] text-2xl font-bold tracking-tight text-primary">YatraAI</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors px-4 py-2 rounded-full hover:bg-orange-50 dark:hover:bg-orange-900/20">
              Home
            </Link>
            <Link href="/destinations" className="text-sm font-medium hover:text-primary transition-colors px-4 py-2 rounded-full hover:bg-orange-50 dark:hover:bg-orange-900/20">
              Top Destinations
            </Link>
            <Link href="/planner" className="text-sm font-medium hover:text-primary transition-colors px-4 py-2 rounded-full hover:bg-orange-50 dark:hover:bg-orange-900/20">
              AI Planner
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link 
              href="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-orange-50 hover:text-primary dark:hover:bg-orange-900/20 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/destinations" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-orange-50 hover:text-primary dark:hover:bg-orange-900/20 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Top Destinations
            </Link>
            <Link 
              href="/planner" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-orange-50 hover:text-primary dark:hover:bg-orange-900/20 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              AI Planner
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
