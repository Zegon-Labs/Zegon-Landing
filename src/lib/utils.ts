import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const GAME_URL = import.meta.env.VITE_GAME_URL ?? "https://zegon-dapp.vercel.app";
