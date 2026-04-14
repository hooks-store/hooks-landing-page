import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

export type SupportedLocale = "en" | "es";

export interface LanguageContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
}

export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "hooks.locale";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLocale>("es");

  const forceSpanish = () => {
    setLocaleState("es");
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = "es";
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "es");
    }
  }, [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale: forceSpanish,
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
