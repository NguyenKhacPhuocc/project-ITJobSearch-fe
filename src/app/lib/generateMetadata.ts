// lib/generateMetadata.ts
import { getTranslations } from 'next-intl/server';

export async function generateTranslatedMetadata(locale: string, page: string) {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t(`${page}.title`),
    description: t(`${page}.description`)
  };
}
