import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setSingleFilter = <T extends { id: string; value: unknown }>(
  id: string,
  value: unknown,
): T[] => {
  if (!value) {
    return [];
  }

  return [{ id, value } as T];
};
