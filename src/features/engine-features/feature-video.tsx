"use client";

import { MediaPlayer, MediaOutlet } from "@vidstack/react";
import { FeatureControls } from "./feature-controls";
import type { FeatureVideo as FeatureVideoItem } from "./types";

interface Props {
  readonly videos: readonly FeatureVideoItem[];
  readonly currentIndex: number;
  readonly onNext: () => void;
  readonly onPrevious: () => void;
  readonly onChange: (index: number) => void;
}

export const FeatureVideo = ({
                               videos,
                               currentIndex,
                               onNext,
                               onPrevious,
                               onChange,
                             }: Props) => {
  return (
    <div className="space-y-5">

      <div className="overflow-hidden rounded-3xl border border-border">
        <MediaPlayer
          className="aspect-video w-full"
          src={videos[currentIndex].source}
          autoPlay
          playsInline
          onEnded={onNext}
        >
          <MediaOutlet />
        </MediaPlayer>
      </div>

      <FeatureControls
        totalVideos={videos.length}
        currentIndex={currentIndex}
        onPrevious={onPrevious}
        onNext={onNext}
        onChange={onChange}
      />

    </div>
  );
};
