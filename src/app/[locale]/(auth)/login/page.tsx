import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

import { createClient } from "@/supabase/server";
import { LoginForm } from "@/features/auth/login-form";
import { OAuthButtons } from "@/features/auth/oauth-buttons";
import { Button } from "@/components/ui/Button/button";
import { Link } from "@/i18n/navigation";

type LoginPageProps = {
  params: Promise<{ locale: string }>;
};

const LoginPage = async ({ params }: LoginPageProps) => {
  const { locale } = await params;
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    redirect(`/${locale}`);
  }

  const t = await getTranslations("auth.login");

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">{t("title")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>

      <LoginForm />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border/70" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">{t("noAccountDivider")}</span>
        </div>
      </div>

      <div className="text-center">
        <p className="mb-3 text-sm text-muted-foreground">{t("noAccount")}</p>
        <Button asChild variant="outline" size="lg" className="h-11 w-full rounded-full">
          <Link href="/register">{t("registerLink")}</Link>
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border/70" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">{t("orContinueWith")}</span>
        </div>
      </div>

      <OAuthButtons />
    </div>
  );
};

export default LoginPage;
