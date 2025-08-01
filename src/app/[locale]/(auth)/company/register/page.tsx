import { useTranslations } from "next-intl";
import { FormRegister } from "./FormRegister"
import { generateTranslatedMetadata } from "@/app/lib/generateMetadata";

// Hàm này chạy trên server, trước khi render
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params; // Await params để lấy giá trị thực
  return generateTranslatedMetadata(locale, 'CompanyRegisterPage');
}

export default function CompanyRegisterPage() {
  const t = useTranslations('CompanyRegisterPage');
  return (
    <>
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">
          <div className="border border-[#DEDEDE] rounded-[8px] py-[50px] px-[20px] max-w-[602px] mx-auto">
            <h1 className="font-[700] text-[20px] text-black text-center mb-[20px]">
              {t('title')}
            </h1>
            <FormRegister />
          </div>
        </div>
      </div>
    </>
  )
}