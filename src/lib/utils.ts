import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class lists safely — later classes win over earlier
 * conflicting ones, and falsy values are dropped.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
