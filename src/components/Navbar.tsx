"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Map, Moon, Sun, Menu, X, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { User } from "@/types";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
    
    // Add event listener to detect local storage changes for cross-tab or current-tab auth updates
    const handleStorageChange = () => {
      setUser(getCurrentUser());
    };
    window.addEventListener("storage", handleStorageChange);
    
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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
            
            <div className="h-6 w-px bg-orange-200/60 dark:bg-slate-700/60 mx-2" />
            
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme" className="mr-2">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {user ? (
              <UserMenu user={user} />
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" className="font-semibold hover:text-primary rounded-full">
                    Log in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="font-semibold bg-btn-gradient text-white shadow-md hover:shadow-lg rounded-full">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
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
            
            {!user && (
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-orange-100/50 dark:border-slate-800/50">
                <Link 
                  href="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <LogIn className="w-5 h-5 text-muted-foreground" />
                  Log in
                </Link>
                <Link 
                  href="/signup" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <UserPlus className="w-5 h-5" />
                  Sign up
                </Link>
              </div>
            )}
            
            {user && (
              <div className="mt-4 pt-4 border-t border-orange-100/50 dark:border-slate-800/50">
                <div className="px-3 py-2">
                  <p className="text-sm font-semibold truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                <Link 
                  href="/saved-trips" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 mt-2 rounded-md text-base font-medium hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors"
                >
                  My Saved Trips
                </Link>
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    // logout logic is handled by reloading
                    localStorage.removeItem("yatraai-current-user");
                    window.location.href = "/";
                  }}
                  className="w-full text-left px-3 py-2 mt-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
