import type { Career } from "@/types/career";

const CAREER_STORAGE_KEY = "career";

export function loadCareer(): Career | null {
  if (typeof window === "undefined") {
    return null;
  }

  const savedCareer = localStorage.getItem(CAREER_STORAGE_KEY);

  if (!savedCareer) {
    return null;
  }

  try {
    return JSON.parse(savedCareer) as Career;
  } catch (error) {
    console.error("Errore durante il caricamento della carriera:", error);
    return null;
  }
}

export function saveCareer(career: Career): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    CAREER_STORAGE_KEY,
    JSON.stringify(career)
  );
}

export function deleteCareer(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(CAREER_STORAGE_KEY);
}