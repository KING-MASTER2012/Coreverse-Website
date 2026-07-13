"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";

import { signIn } from "./actions";
import type { AuthActionState } from "./types";
import { Input } from "@/components/ui/Input/input";
import { Label } from "@/components/ui/Label/label";
import { Checkbox } from "@/components/ui/Checkbox/checkbox";
import { Button } from "@/components/ui/Button/button";
import { Link } from "@/i18n/navigation";

const initialState: AuthActionState = { status: "idle" };

const SubmitButton = () => {
  const { pending } = useFormStatus();
  const t = useTranslations("auth.login");

  return (
    <Button
      type="submit"
      disabled={pending}
      size="lg"
      className="h-11 w-full rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500"
    >
      {pending ? t("submitting") : t("submit")}
    </Button>
  );
};

export const LoginForm = () => {
  const t = useTranslations("auth.login");
  const [state, formAction] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">{t("emailLabel")}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder={t("emailPlaceholder")}
          aria-invalid={Boolean(state.fieldErrors?.email)}
        />
        {state.fieldErrors?.email ? <p className="text-xs text-destructive">{state.fieldErrors.email[0]}</p> : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">{t("passwordLabel")}</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder={t("passwordPlaceholder")}
          aria-invalid={Boolean(state.fieldErrors?.password)}
        />
        {state.fieldErrors?.password ? <p className="text-xs text-destructive">{state.fieldErrors.password[0]}</p> : null}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox id="rememberMe" name="rememberMe" />
          <Label htmlFor="rememberMe" className="font-normal text-muted-foreground">
            {t("rememberMe")}
          </Label>
        </div>
        <Link href="/forgot-password" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
          {t("forgotPassword")}
        </Link>
      </div>

      {state.status === "error" && state.message ? (
        <p role="alert" className="text-sm text-destructive">
          {state.message}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
};
