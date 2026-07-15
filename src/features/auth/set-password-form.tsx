"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";

import { setInitialPassword } from "./actions";
import { Button } from "@/components/ui/Button/button";
import { Input } from "@/components/ui/Input/input";
import { Label } from "@/components/ui/Label/label";
import type { AuthActionState } from "./types";

const initialState: AuthActionState = { status: "idle" };

type SetPasswordFormProps = {
  next: string;
};

export const SetPasswordForm = ({ next }: SetPasswordFormProps) => {
  const t = useTranslations("auth.setPassword");
  const [state, formAction, isPending] = useActionState(setInitialPassword, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="next" value={next} />

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">{t("passwordLabel")}</Label>
        <Input id="password" name="password" type="password" autoComplete="new-password" required />
        {state.fieldErrors?.password?.map((msg) => (
          <p key={msg} className="text-sm text-destructive">{msg}</p>
        ))}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="confirmPassword">{t("confirmPasswordLabel")}</Label>
        <Input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required />
        {state.fieldErrors?.confirmPassword?.map((msg) => (
          <p key={msg} className="text-sm text-destructive">{msg}</p>
        ))}
      </div>

      {state.status === "error" && state.message && <p className="text-sm text-destructive">{state.message}</p>}

      <Button type="submit" disabled={isPending} className="w-full">
        {t("submit")}
      </Button>
    </form>
  );
};
