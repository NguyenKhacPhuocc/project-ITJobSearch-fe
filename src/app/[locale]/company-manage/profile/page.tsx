import { generateTranslatedMetadata } from "@/app/lib/generateMetadata";
import { useTranslations } from "next-intl";
import ProfileForm from "./ProfileForm";

// Hàm này chạy trên server, trước khi render
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; // Await params để lấy giá trị thực
  return generateTranslatedMetadata(locale, 'CompanyManageProfilePage');
}

export default function CompanyManageProfilePage() {
  const t = useTranslations('CompanyManageProfilePage');
  return (
    <>
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">
          <div className="border border-[#DEDEDE] rounded-[8px] p-[20px]">
            <h1 className="font-[700] text-[20px] text-black mb-[20px]">
              {t('company-info')}
            </h1>
            <ProfileForm />
          </div>
        </div>
      </div>
    </>
  )
}