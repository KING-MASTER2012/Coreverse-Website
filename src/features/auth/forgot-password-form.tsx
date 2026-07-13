"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";

import { requestPasswordReset } from "./actions";
import type { AuthActionState } from "./types";
import { Input } from "@/components/ui/Input/input";
import { Label } from "@/components/ui/Label/label";
import { Button } from "@/components/ui/Button/button";

const initialState: AuthActionState = { status: "idle" };

const SubmitButton = () => {
  const { pending } = useFormStatus();
  const t = useTranslations("auth.forgotPassword");

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

export const ForgotPasswordForm = () => {
  const t = useTranslations("auth.forgotPassword");
  const [state, formAction] = useActionState(requestPasswordReset, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4 text-sm text-blue-700 dark:text-blue-200">
        {state.message}
      </div>
    );
  }

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

      {state.status === "error" && state.message ? (
        <p role="alert" className="text-sm text-destructive">
          {state.message}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
};
