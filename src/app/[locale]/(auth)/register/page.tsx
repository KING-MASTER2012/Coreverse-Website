import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

import { createClient } from "@/supabase/server";
import { RegisterForm } from "@/features/auth/register-form";
import { Link } from "@/i18n/navigation";

type RegisterPageProps = {
  params: Promise<{ locale: string }>;
};

const RegisterPage = async ({ params }: RegisterPageProps) => {
  const { locale } = await params;
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    redirect(`/${locale}`);
  }

  const t = await getTranslations("auth.register");

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">{t("title")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>

      <RegisterForm />

      <p className="text-center text-sm text-muted-foreground">
        {t("haveAccount")}{" "}
        <Link href="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
          {t("loginLink")}
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
