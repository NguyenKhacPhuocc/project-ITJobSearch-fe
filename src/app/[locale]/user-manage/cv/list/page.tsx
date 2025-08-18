import { generateTranslatedMetadata } from "@/app/lib/generateMetadata";
import { useTranslations } from "next-intl";
import { CVList } from "./CVList";

// Hàm này chạy trên server, trước khi render
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; // Await params để lấy giá trị thực
  return generateTranslatedMetadata(locale, 'UserManageCVListPage');
}

export default function UserManageCVListPage() {

  const t = useTranslations('UserManageCVListPage');

  return (
    <>
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">
          <h2 className="font-[700] sm:text-[28px] text-[24px] sm:w-auto w-[100%] text-[#121212] mb-[20px]">
            {t('cv-submitted-management')}
          </h2>

          <CVList />

        </div>
      </div>
    </>
  )
}