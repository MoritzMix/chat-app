import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToLocalTime(timestamp: string) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString();
}
