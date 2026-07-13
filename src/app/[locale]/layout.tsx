import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/routing";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const generateStaticParams = () =>
  locales.map((locale) => ({ locale }));

export default async function LocaleLayout({
                                             children,
                                             params,
                                           }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  return (
    <NextIntlClientProvider>
      {children}
    </NextIntlClientProvider>
  );
}
