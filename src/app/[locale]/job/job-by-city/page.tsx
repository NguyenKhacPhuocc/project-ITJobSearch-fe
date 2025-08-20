import { generateTranslatedMetadata } from "@/app/lib/generateMetadata";
import JobByCity from "./JobByCity";
import { useTranslations } from "next-intl";

// Hàm này chạy trên server, trước khi render
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; // Await params để lấy giá trị thực
  return generateTranslatedMetadata(locale, 'JobByCityPage');
}

export default function JobByCityPage() {
  const t = useTranslations('JobByCityPage');
  return (
    <>
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">
          <h2 className="font-[700] sm:text-[28px] text-[24px] text-[#121212] mb-[15px]">
            {t('title')}
          </h2>
          <hr className="mb-[30px] border" />
          <JobByCity />
        </div>
      </div>
    </>
  )
}