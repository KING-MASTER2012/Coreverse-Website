"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { videos } from "@/generated/video-manifest";
import { FeatureVideo } from "./feature-video";
import type { FeatureVideo as FeatureVideoItem } from "./types";

export const FeaturesPanel = () => {
  const t = useTranslations("featuresPanel");

  const [currentVideo, setCurrentVideo] = useState(0);

  const items = useMemo<FeatureVideoItem[]>(
    () =>
      videos.map((video: string, index: number) => ({
        id: index,
        source: video,
        title: t(`videos.${index}.title`),
        description: t(`videos.${index}.description`),
      })),
    [t],
  );

  const nextVideo = () => {
    setCurrentVideo((current) => (current + 1) % items.length);
  };

  const previousVideo = () => {
    setCurrentVideo((current) => (current - 1 + items.length) % items.length);
  };

  const activeItem = items[currentVideo];

  return (
    <section
      id="features"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-24"
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-card/70 p-5 shadow-2xl backdrop-blur-xl">

        <div className="grid gap-8 rounded-[1.5rem] border border-border/70 bg-background/80 p-6 lg:grid-cols-[0.85fr_1.15fr]">

          <div className="flex flex-col">
            <div className="inline-flex w-fit rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300">
              {t("badge")}
            </div>

            <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em]">
              {t("title")}
            </h2>

            <p className="mt-4 text-muted-foreground">
              {t("description")}
            </p>

            <div className="mt-8 border-t border-border/50 pt-8">
              <h3
                key={`title-${currentVideo}`}
                className="text-xl font-semibold tracking-tight animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                {activeItem.title}
              </h3>
              <p
                key={`desc-${currentVideo}`}
                className="mt-2 text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-2 duration-300 delay-75"
              >
                {activeItem.description}
              </p>
            </div>
          </div>

          <FeatureVideo
            videos={items}
            currentIndex={currentVideo}
            onNext={nextVideo}
            onPrevious={previousVideo}
            onChange={setCurrentVideo}
          />

        </div>

      </div>
    </section>
  );
};
