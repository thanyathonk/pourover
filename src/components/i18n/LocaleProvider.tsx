"use client";

import { createContext, useContext, type ReactNode } from "react";

export type AppLocale = "en" | "th";

const LocaleContext = createContext<AppLocale>("en");

type LocaleProviderProps = {
  locale: AppLocale;
  children: ReactNode;
};

export function LocaleProvider({ locale, children }: LocaleProviderProps) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}

export function pickLocale(locale: AppLocale, en: string, th: string) {
  return locale === "th" ? th : en;
}
