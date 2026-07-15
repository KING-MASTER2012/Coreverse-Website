import { getTranslations } from "next-intl/server";

import { createClient } from "@/supabase/server";
import { ResetPasswordForm } from "@/features/auth/reset-password-form";
import { RecoverySessionHandler } from "@/features/auth/recovery-session-handler";
import { Link } from "@/i18n/navigation";

const ResetPasswordPage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const t = await getTranslations("auth.resetPassword");

  if (!user) {
    return (
      <>
        <RecoverySessionHandler />
        <div className="flex flex-col gap-4 text-center">
          <h1 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">{t("invalidLinkTitle")}</h1>
          <p className="text-sm text-muted-foreground">{t("invalidLinkSubtitle")}</p>
          <Link href="/forgot-password" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
            {t("requestNewLink")}
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">{t("title")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>

      <ResetPasswordForm email={user.email ?? ""} />
    </div>
  );
};

export default ResetPasswordPage;
