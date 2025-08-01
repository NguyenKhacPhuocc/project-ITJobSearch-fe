import { generateTranslatedMetadata } from "@/app/lib/generateMetadata";
import { ProfileForm } from "./ProfileForm"
import { useTranslations } from "next-intl";

// Hàm này chạy trên server, trước khi render
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; // Await params để lấy giá trị thực
  return generateTranslatedMetadata(locale, 'UserManageProfilePage');
}

export default function UserManageProfilePage() {

  const t = useTranslations('UserManageProfilePage');

  return (
    <>
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">
          <div className="border border-[#DEDEDE] rounded-[8px] p-[20px]">
            <h1 className="font-[700] text-[20px] text-black mb-[20px]">
              {t('user-profile')}
            </h1>
            <ProfileForm />
          </div>
        </div>
      </div>
    </>
  )
}