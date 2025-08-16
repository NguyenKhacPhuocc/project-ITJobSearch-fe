import { generateTranslatedMetadata } from "@/app/lib/generateMetadata";
import { useTranslations } from "next-intl";
import { ContentPage } from "./ContentPage";

// Hàm này chạy trên server, trước khi render
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params; // Await params để lấy giá trị thực
  return generateTranslatedMetadata(locale, 'CompanyListPage');
}

export default function CompanyListPage() {
  const t = useTranslations('CompanyListPage');
  return (
    <>
      {/* Section 2 */}
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">
          <h2 className="font-[700] sm:text-[28px] text-[24px] text-[#121212] text-center mb-[30px]">
            {t('top-employers')}
          </h2>
          {/* Wrap */}
          <ContentPage />
        </div>
      </div>
      {/* End Section 2 */}
    </>
  )
}