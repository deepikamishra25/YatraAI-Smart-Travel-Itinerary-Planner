"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "@/types";
import { logout } from "@/lib/auth";
import { LogOut, Map as MapIcon, User as UserIcon, ChevronDown, Bookmark } from "lucide-react";

export default function UserMenu({ user }: { user: User }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    window.location.href = "/"; // Force full reload to reset all client state and go to home
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-slate-800 border border-orange-100 dark:border-slate-700 hover:bg-orange-100 dark:hover:bg-slate-700 transition-colors"
      >
        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium hidden sm:block">{user.name.split(" ")[0]}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-orange-100 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
          <div className="px-4 py-3 border-b border-orange-100/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-800/50">
            <p className="text-sm font-semibold truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
          <div className="p-1">
            <Link 
              href="/planner" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors"
            >
              <MapIcon className="w-4 h-4 text-primary" />
              Plan New Trip
            </Link>
            <Link 
              href="/saved-trips" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Bookmark className="w-4 h-4 text-primary" />
              My Saved Trips
            </Link>
            <div className="h-px bg-orange-100/50 dark:bg-slate-800/50 my-1 mx-2" />
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 w-full text-left transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
