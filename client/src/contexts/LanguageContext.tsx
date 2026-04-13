import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

export type SupportedLocale = "en" | "es";

export interface LanguageContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
}

export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "hooks.locale";
const SPANISH_COUNTRY_CODES = new Set([
  "ar", "bo", "cl", "co", "cr", "cu", "do", "ec",
  "sv", "gq", "gt", "hn", "mx", "ni", "pa", "py",
  "pe", "pr", "es", "uy", "ve",
]);

const normalizeLocale = (value?: string | null): SupportedLocale | undefined => {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();

  if (normalized === "es" || normalized.startsWith("es-")) {
    return "es";
  }

  if (normalized === "en" || normalized.startsWith("en-")) {
    return "en";
  }

  return undefined;
};

const detectInitialLocale = (): SupportedLocale => {
  if (typeof window === "undefined") {
    return "en";
  }

  const queryLocale = normalizeLocale(new URLSearchParams(window.location.search).get("lang"));
  if (queryLocale) {
    return queryLocale;
  }

  const storedLocale = normalizeLocale(window.localStorage.getItem(STORAGE_KEY));
  if (storedLocale) {
    return storedLocale;
  }

  const browserLocales = window.navigator.languages?.length
    ? window.navigator.languages
    : [window.navigator.language];

  for (const locale of browserLocales) {
    const directMatch = normalizeLocale(locale);
    if (directMatch) {
      return directMatch;
    }
  }

  for (const locale of browserLocales) {
    const region = locale?.toLowerCase().split("-")[1];
    if (region && SPANISH_COUNTRY_CODES.has(region)) {
      return "es";
    }
  }

  return "en";
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLocale>(() => detectInitialLocale());

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, locale);
    }
  }, [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale: setLocaleState,
    }),
    [locale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}
