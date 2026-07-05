import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { InteractiveBackground } from "@/components/effects/interactive-background";
import { TopBar } from "@/components/layout/top-bar";
import { isLocale, locales } from "@/i18n/routing";

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}>;

export const generateStaticParams = () => {
  return locales.map((locale) => ({ locale }));
};

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider>
      <InteractiveBackground />
      <TopBar />
      {children}
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;
