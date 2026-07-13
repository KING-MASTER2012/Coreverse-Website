"use client";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

export const CommunityPanel = () => {
  const t = useTranslations("communityPanel");

  return (
    <section
      id="community"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-24"
      aria-labelledby="community-title"
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-card/70 p-5 shadow-2xl shadow-blue-950/10 backdrop-blur-xl dark:shadow-blue-950/30">
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

        <div className="grid gap-6 rounded-[1.5rem] border border-border/70 bg-background/80 p-6 sm:p-8 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 rounded-3xl border border-border/70 bg-card/70 p-2 shadow-sm">
              <button
                type="button"
                className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-foreground transition-colors hover:bg-blue-500/20"
                aria-label={t("search")}
              >
                <Search className="size-5"/>
              </button>

              <input
                type="search"
                placeholder={t("search")}
                className="h-11 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>

            <div className="mt-8 flex-1 rounded-[1.75rem] border border-border/70 bg-card/70 p-6">
              <div className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300">
                {t("discussionBadge")}
              </div>

              <h2
                id="community-title"
                className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-foreground"
              >
                {t("discussionTitle")}
              </h2>

              <div className="mt-8 min-h-[320px] rounded-3xl border border-dashed border-border/70 bg-background/40" />
            </div>
          </div>

          <aside className="flex flex-col">
            <div className="flex-1 rounded-[1.75rem] border border-border/70 bg-card/70 p-6">
              <div className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300">
                {t("eventsBadge")}
              </div>

              <h3 className="mt-5 text-2xl font-semibold text-foreground">
                {t("eventsTitle")}
              </h3>

              <div className="mt-8 flex-1 rounded-3xl border border-dashed border-border/70 bg-background/40" />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
