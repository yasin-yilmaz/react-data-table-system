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

export const getTableErrorMessage = (error: unknown) => {
  if (!(error instanceof Error)) {
    return "Beklenmeyen bir hata oluştu.";
  }

  if (error.message.includes("Failed to fetch")) {
    return "Sunucuya ulaşılamadı. Lütfen bağlantınızı kontrol edin.";
  }

  return error.message;
};
