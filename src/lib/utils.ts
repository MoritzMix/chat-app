import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToLocalTime(timestamp: string | Date) {
  if (typeof timestamp === "string") {
    timestamp = new Date(timestamp);
  }

  return timestamp.toLocaleTimeString();
}

export function getScreenSize(window: Window): string {
  const width: number = window.innerWidth;
  return width < 640 ? "sm" : width < 768 ? "md" : width < 1024 ? "lg" : "xl";
}

export function isDesktop(window: Window) {
  const width: number = window.innerWidth;
  return width >= 768 ? true : false;
}
