"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface FeatureControlsProps {
  readonly totalVideos: number;
  readonly currentIndex: number;
  readonly onPrevious: () => void;
  readonly onNext: () => void;
  readonly onChange: (index: number) => void;
}

export const FeatureControls = ({
                                  totalVideos,
                                  currentIndex,
                                  onPrevious,
                                  onNext,
                                  onChange,
                                }: FeatureControlsProps) => {
  return (
    <div className="mt-5 flex items-center justify-center gap-6">
      <button
        type="button"
        aria-label="Previous video"
        onClick={onPrevious}
        className="flex size-11 items-center justify-center rounded-full border border-border/70 bg-card/70 transition-all hover:border-blue-500/40 hover:bg-blue-500/10"
      >
        <ChevronLeft className="size-5" />
      </button>

      <div className="flex items-center gap-3">
        {Array.from({ length: totalVideos }, (_, index) => {
          const active = index === currentIndex;

          return (
            <button
              key={index}
              type="button"
              aria-label={`Video ${index + 1}`}
              onClick={() => onChange(index)}
              className={[
                "transition-all duration-300",
                "rounded-full",
                active
                  ? "h-3 w-8 bg-blue-500 shadow-lg shadow-blue-500/40"
                  : "size-3 bg-muted-foreground/30 hover:bg-muted-foreground/60",
              ].join(" ")}
            />
          );
        })}
      </div>

      <button
        type="button"
        aria-label="Next video"
        onClick={onNext}
        className="flex size-11 items-center justify-center rounded-full border border-border/70 bg-card/70 transition-all hover:border-blue-500/40 hover:bg-blue-500/10"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
};
