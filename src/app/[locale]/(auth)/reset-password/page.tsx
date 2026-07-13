import { getTranslations } from "next-intl/server";

import { createClient } from "@/supabase/server";
import { ResetPasswordForm } from "@/features/auth/reset-password-form";

type ResetPasswordPageProps = {
  searchParams: Promise<{ code?: string }>;
};

const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {
  const { code } = await searchParams;
  const supabase = await createClient();

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  const t = await getTranslations("auth.resetPassword");

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">{t("title")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>

      <ResetPasswordForm />
    </div>
  );
};

export default ResetPasswordPage;
