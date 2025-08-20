import { generateTranslatedMetadata } from "@/app/lib/generateMetadata";
import { ContentPage } from "./ContentPage";
import { cities } from "@/config/variable";

type Params = Promise<{ locale: string, slug: string }>
// Hàm này chạy trên server, trước khi render
export async function generateMetadata({
  params
}: {
  params: Params
}) {
  const { locale, slug } = await params; // Await params để lấy giá trị thực
  // Tìm city theo slug
  const city = cities.find((c) => c.slug === slug);

  // Lấy tên hiển thị theo locale
  const cityName = city?.name[locale as "vi" | "en"] ?? slug.replace(/-/g, " ");

  return generateTranslatedMetadata(locale, 'JobByCityPage', cityName);
}

export default async function JobByCityDetailPage({ params }: {
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