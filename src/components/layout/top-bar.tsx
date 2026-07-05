"use client";

import Image from "next/image";
import { useEffect, useSyncExternalStore } from "react";
import i18n from "@/constants/i18n.json";
import { Button } from "@/components/ui/Button/button";

type Theme = "light" | "dark";

const themeChangeEvent = "coreverse-theme-change";

const navigationItems = [
  { label: i18n.en.navigation.main, href: "#main" },
  { label: i18n.en.navigation.install, href: "#install" },
  { label: i18n.en.navigation.community, href: "#community" },
  { label: i18n.en.navigation.faq, href: "#faq" },
];

const getPreferredTheme = (): Theme => {
  const storedTheme = window.localStorage.getItem("theme");

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const getServerTheme = (): Theme => "dark";

const subscribeTheme = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener(themeChangeEvent, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(themeChangeEvent, callback);
  };
};

const applyTheme = (theme: Theme) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
  window.localStorage.setItem("theme", theme);
};

const SunIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 fill-none stroke-current stroke-2">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 fill-none stroke-current stroke-2">
    <path d="M21 14.4A7.7 7.7 0 0 1 9.6 3 8.7 8.7 0 1 0 21 14.4Z" />
  </svg>
);

export const TopBar = () => {
  const theme = useSyncExternalStore(subscribeTheme, getPreferredTheme, getServerTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const themeLabel = theme === "dark" ? i18n.en.theme.light : i18n.en.theme.dark;

  const handleThemeToggle = () => {
    applyTheme(theme === "dark" ? "light" : "dark");
    window.dispatchEvent(new Event(themeChangeEvent));
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 px-4 py-3 backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center gap-4">
        <a href="#main" className="flex min-w-0 items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 shadow-lg shadow-blue-500/10">
            <Image src="/images/coreverse-engine-emblem.svg" alt="Coreverse Engine Logo" width={34} height={34} priority />
          </span>
          <span className="hidden min-w-0 flex-col sm:flex">
            <span className="truncate text-sm font-semibold tracking-[0.22em] text-foreground uppercase">
              {i18n.en.brand.name}
            </span>
            <span className="truncate text-xs text-muted-foreground">{i18n.en.brand.tagline}</span>
          </span>
        </a>

        <nav aria-label="Primary navigation" className="ml-auto hidden items-center gap-1 md:flex">
          {navigationItems.map((item) => (
            <Button key={item.href} asChild variant="ghost" className="h-10 rounded-full px-4 text-sm text-muted-foreground hover:text-foreground">
              <a href={item.href}>{item.label}</a>
            </Button>
          ))}
        </nav>

        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={themeLabel}
          className="ml-auto size-10 rounded-full border-blue-500/30 bg-background/70 text-blue-600 shadow-sm shadow-blue-500/10 hover:bg-blue-500/10 dark:text-blue-300 md:ml-2"
          onClick={handleThemeToggle}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>
    </header>
  );
};
