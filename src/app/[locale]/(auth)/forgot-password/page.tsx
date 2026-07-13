import { getTranslations } from "next-intl/server";

import { ForgotPasswordForm } from "@/features/auth/forgot-password-form";
import { Link } from "@/i18n/navigation";

const ForgotPasswordPage = async () => {
  const t = await getTranslations("auth.forgotPassword");

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">{t("title")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>

      <ForgotPasswordForm />

      <p className="text-center text-sm text-muted-foreground">
        <Link href="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
          {t("backToLogin")}
        </Link>
      </p>
    </div>
  );
};

export default ForgotPasswordPage;
