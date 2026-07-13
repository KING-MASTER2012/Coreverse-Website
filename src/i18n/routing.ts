import { defineRouting } from "next-intl/routing";

export const locales = ["en", "tr", "fr", "de", "es", "pt", "cn", "ru", "jp", "kr", "pl", "in", "sa"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localeDetection: true,
  localePrefix: "always",
});

export const isLocale = (locale: string): locale is Locale => {
  return locales.includes(locale as Locale);
};
