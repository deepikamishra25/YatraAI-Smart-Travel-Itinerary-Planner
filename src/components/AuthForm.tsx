"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, signup } from "@/lib/auth";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Eye, EyeOff, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";

interface AuthFormProps {
  type: "login" | "signup";
}

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulate slight network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      if (type === "signup") {
        if (formData.password.length < 6) {
          setError("Password must be at least 6 characters.");
          setIsLoading(false);
          return;
        }

        const res = signup({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });

        if (!res.success) {
          setError(res.error || "Signup failed.");
          setIsLoading(false);
          return;
        }
      } else {
        const res = login({
          email: formData.email,
          password: formData.password
        });

        if (!res.success) {
          setError(res.error || "Login failed.");
          setIsLoading(false);
          return;
        }
      }

      router.push("/planner");
      router.refresh();
    } catch (err) {
      setError("An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <Card className="glass-premium w-full max-w-md mx-auto border-2 border-orange-100/50 dark:border-slate-800 shadow-2xl">
      <CardHeader className="space-y-1 pb-6 text-center">
        <div className="flex justify-center mb-2">
          <div className="bg-orange-100 dark:bg-orange-500/20 p-3 rounded-full">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold font-['var(--font-playfair)'] tracking-tight">
          {type === "login" ? "Welcome back" : "Create an account"}
        </CardTitle>
        <CardDescription className="text-base">
          {type === "login" 
            ? "Enter your email and password to access your trips." 
            : "Sign up to start planning your perfect journey."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
              {error}
            </div>
          )}
          
          {type === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                placeholder="John Doe" 
                required 
                className="bg-white/50 dark:bg-slate-900/50 border-orange-200/50 dark:border-slate-700"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="you@example.com" 
              required 
              className="bg-white/50 dark:bg-slate-900/50 border-orange-200/50 dark:border-slate-700"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-2 relative">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"} 
                required 
                className="bg-white/50 dark:bg-slate-900/50 border-orange-200/50 dark:border-slate-700 pr-10"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {type === "signup" && (
              <p className="text-xs text-muted-foreground mt-1">Must be at least 6 characters.</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-btn-gradient text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all mt-6"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            {type === "login" ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t border-orange-100/30 dark:border-slate-800/50 pt-6">
        <p className="text-sm text-muted-foreground">
          {type === "login" ? "Don't have an account? " : "Already have an account? "}
          <Link 
            href={type === "login" ? "/signup" : "/login"} 
            className="text-primary font-semibold hover:underline"
          >
            {type === "login" ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
