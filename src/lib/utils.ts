import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Preferences } from "../types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function encodePrefs(prefs: Preferences): string {
  return typeof window !== "undefined"
    ? btoa(encodeURIComponent(JSON.stringify(prefs)))
    : Buffer.from(encodeURIComponent(JSON.stringify(prefs))).toString("base64");
}

export function decodePrefs(encoded: string): Preferences {
  return typeof window !== "undefined"
    ? JSON.parse(decodeURIComponent(atob(encoded)))
    : JSON.parse(decodeURIComponent(Buffer.from(encoded, "base64").toString("utf-8")));
}
