"use client";

import { useCallback, useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { useTranslations } from "next-intl";

import { compressImage } from "@/lib/image-compression";
import { InitialsAvatar } from "@/components/ui/InitialsAvatar/initials-avatar";
import { cn } from "@/lib/utils";

type AvatarUploadProps = {
  username: string;
  error?: string;
};

const MAX_SOURCE_SIZE_BYTES = 8 * 1024 * 1024;

export const AvatarUpload = ({ username, error }: AvatarUploadProps) => {
  const t = useTranslations("auth.register.avatar");
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const applyFile = useCallback(
    async (file: File) => {
      setLocalError(null);

      if (!file.type.startsWith("image/")) {
        setLocalError(t("invalidType"));
        return;
      }

      if (file.size > MAX_SOURCE_SIZE_BYTES) {
        setLocalError(t("tooLarge"));
        return;
      }

      setIsProcessing(true);

      try {
        const compressed = await compressImage(file);

        if (inputRef.current) {
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(compressed);
          inputRef.current.files = dataTransfer.files;
        }

        setPreviewUrl((current) => {
          if (current) {
            URL.revokeObjectURL(current);
          }
          return URL.createObjectURL(compressed);
        });
      } catch {
        setLocalError(t("processingFailed"));
      } finally {
        setIsProcessing(false);
      }
    },
    [t],
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      void applyFile(file);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      void applyFile(file);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleRemove = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            inputRef.current?.click();
          }
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        data-dragging={isDragging}
        className="group relative flex size-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-border/70 bg-background/60 transition-colors hover:border-blue-500/50 data-[dragging=true]:border-blue-500 data-[dragging=true]:bg-blue-500/10"
      >
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt="" className="size-full object-cover" />
        ) : (
          <InitialsAvatar name={username} size={96} />
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-[11px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
          {isProcessing ? t("processing") : t("changePhoto")}
        </div>
      </div>

      <input ref={inputRef} type="file" name="avatar" accept="image/*" className="sr-only" onChange={handleInputChange} />

      <div className="text-center">
        <p className="text-xs text-muted-foreground">{t("hint")}</p>
        {localError ?? error ? <p className="mt-1 text-xs text-destructive">{localError ?? error}</p> : null}
        {previewUrl ? (
          <button
            type="button"
            onClick={handleRemove}
            className="mt-1 text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            {t("remove")}
          </button>
        ) : null}
      </div>
    </div>
  );
};
