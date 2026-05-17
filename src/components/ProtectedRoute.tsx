"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { Sparkles } from "lucide-react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-6 text-center px-4">
        <div className="relative">
          <div className="absolute inset-0 bg-orange-100 dark:bg-orange-500/20 rounded-full blur-xl animate-pulse"></div>
          <Sparkles className="w-16 h-16 text-primary animate-bounce relative z-10" />
        </div>
        <p className="text-muted-foreground text-lg">Securing your journey...</p>
      </div>
    );
  }

  return <>{children}</>;
}
