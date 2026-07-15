"use client";

import Image from "next/image";
import { useTransition } from "react";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

import { signInWithOAuth } from "./actions";
import { Button } from "@/components/ui/Button/button";
import type { OAuthProvider } from "./types";

type OAuthProviderConfig = {
  id: OAuthProvider;
  labelKey: string;
  icon: ReactNode;
};

const providers: OAuthProviderConfig[] = [
  {
    id: "google",
    labelKey: "continueWithGoogle",
    icon: (
      <Image src="/images/Google-Logo.svg" alt="" width={18} height={18} aria-hidden="true" />
    ),
  },
  {
    id: "github",
    labelKey: "continueWithGithub",
    icon: (
      <>
        <Image
          src="/images/GitHub_Invertocat_Black.svg"
          alt=""
          width={18}
          height={18}
          aria-hidden="true"
          className="block dark:hidden"
        />
        <Image
          src="/images/GitHub_Invertocat_white.svg"
          alt=""
          width={18}
          height={18}
          aria-hidden="true"
          className="hidden dark:block"
        />
      </>
    ),
  },
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
          <span className="flex items-center justify-center gap-2">
            {provider.icon}
            {t(provider.labelKey)}
          </span>
        </Button>
      ))}
    </div>
  );
};
