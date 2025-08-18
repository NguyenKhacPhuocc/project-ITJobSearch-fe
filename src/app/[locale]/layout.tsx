import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Header } from '../components/header/Header';
import { Footer } from '../components/footer/Footer';
import '../globals.css';

type Params = Promise<{ locale: string }>

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Params
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider>
      <Header />
      <div className="pt-[65px]">
        {children}
      </div>
      <Footer />
    </NextIntlClientProvider>
  );
}
