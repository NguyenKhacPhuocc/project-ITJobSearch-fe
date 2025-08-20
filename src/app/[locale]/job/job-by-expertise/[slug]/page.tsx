import { generateTranslatedMetadata } from "@/app/lib/generateMetadata";
import { ContentPage } from "./ContentPage";
import { expertises } from "@/config/variable";

type Params = Promise<{ locale: string, slug: string }>
// Hàm này chạy trên server, trước khi render
export async function generateMetadata({
  params
}: {
  params: Params
}) {
  const { locale, slug } = await params; // Await params để lấy giá trị thực
  const expertise = expertises.find((c) => c.slug[locale as "vi" | "en"] === slug);
  const expertiseName = expertise?.name[locale as "vi" | "en"] ?? slug.replace(/-/g, " ");

  return generateTranslatedMetadata(locale, 'JobByExpertisePage', expertiseName);
}

export default async function JobByExpertiseDetailPage({ params }: {
  params: Params
}) {
  const { locale, slug } = await params;

  return (
    <>
      <div className="pt-[30px] pb-[60px]">
        <ContentPage slug={slug} locale={locale} />
      </div>
    </>
  )
}