"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";

import { updatePassword } from "./actions";
import type { AuthActionState } from "./types";
import { Input } from "@/components/ui/Input/input";
import { Label } from "@/components/ui/Label/label";
import { Button } from "@/components/ui/Button/button";

const initialState: AuthActionState = { status: "idle" };

const SubmitButton = () => {
  const { pending } = useFormStatus();
  const t = useTranslations("auth.resetPassword");

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

export const ResetPasswordForm = () => {
  const t = useTranslations("auth.resetPassword");
  const [state, formAction] = useActionState(updatePassword, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">{t("passwordLabel")}</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          aria-invalid={Boolean(state.fieldErrors?.password)}
        />
        {state.fieldErrors?.password ? <p className="text-xs text-destructive">{state.fieldErrors.password[0]}</p> : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="confirmPassword">{t("confirmPasswordLabel")}</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          aria-invalid={Boolean(state.fieldErrors?.confirmPassword)}
        />
        {state.fieldErrors?.confirmPassword ? (
          <p className="text-xs text-destructive">{state.fieldErrors.confirmPassword[0]}</p>
        ) : null}
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
