import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

export type SupportedLocale = "en" | "es";

export interface LanguageContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
}

export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "hooks.locale";

export function resolveBrowserLocale(languages: readonly string[]): SupportedLocale {
  const supportedLocale = languages
    .map((language) => language.toLowerCase().split("-")[0])
    .find((language): language is SupportedLocale => language === "en" || language === "es");

  return supportedLocale ?? "en";
}

function getBrowserLocale(): SupportedLocale {
  if (typeof window === "undefined") {
    return "en";
  }

  const languages = window.navigator.languages?.length
    ? window.navigator.languages
    : [window.navigator.language];

  return resolveBrowserLocale(languages);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLocale>(getBrowserLocale);

  const setLocale = (nextLocale: SupportedLocale) => {
    setLocaleState(nextLocale);
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, locale);
    }
  }, [locale]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const handleLanguageChange = () => {
      setLocaleState(getBrowserLocale());
    };

    window.addEventListener("languagechange", handleLanguageChange);

    return () => {
      window.removeEventListener("languagechange", handleLanguageChange);
    };
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
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
