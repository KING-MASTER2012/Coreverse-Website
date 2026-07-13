"use client";

import { useTransition } from "react";
import { useTranslations } from "next-intl";

import { signInWithOAuth } from "./actions";
import { Button } from "@/components/ui/Button/button";
import type { OAuthProvider } from "./types";

const providers: { id: OAuthProvider; labelKey: string }[] = [
  { id: "google", labelKey: "continueWithGoogle" },
  { id: "github", labelKey: "continueWithGithub" },
];

export const OAuthButtons = () => {
  const t = useTranslations("auth.oauth");
  const [isPending, startTransition] = useTransition();

  const handleClick = (provider: OAuthProvider) => {
    startTransition(() => {
      void signInWithOAuth(provider);
    });
  };

  return (
    <div className="flex flex-col gap-3">
      {providers.map((provider) => (
        <Button
          key={provider.id}
          type="button"
          variant="outline"
          size="lg"
          disabled={isPending}
          onClick={() => handleClick(provider.id)}
          className="h-11 w-full rounded-full border-border/70 bg-background/60 hover:bg-blue-500/10"
        >
          {t(provider.labelKey)}
        </Button>
      ))}
    </div>
  );
};
