// lib/generateMetadata.ts
import { getTranslations } from 'next-intl/server';

export async function generateTranslatedMetadata(locale: string, page: string, sub?: string) {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t(`${page}.title`) + (sub ? ` | ${sub}` : ""),
    description: t(`${page}.description`)
  };
}
