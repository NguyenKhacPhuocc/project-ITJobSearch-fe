import { generateTranslatedMetadata } from "@/app/lib/generateMetadata";
import Link from "next/link"
import { EditForm } from "./EditForm";
import { getTranslations } from "next-intl/server";

// Hàm này chạy trên server, trước khi render
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params; // Await params để lấy giá trị thực
  return generateTranslatedMetadata(locale, 'CompanyManageJobEditPage');
}

export default async function CompanyManageJobEditPage({ params }: {
  params: {
    id: string
  }
}) {
  const t = await getTranslations('CompanyManageJobEditPage');
  const { id } = await params;
  return (
    <>
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">
          <div className="border border-[#DEDEDE] rounded-[8px] p-[20px]">
            <div className="flex flex-wrap gap-[20px] items-center justify-between mb-[20px]">
              <h1 className="sm:w-auto w-[100%] font-[700] text-[20px] text-black">
                {t('title')}
              </h1>
              <Link
                href="/company-manage/job/list"
                className="bg-[#005E92] rounded-[4px] font-[400] text-[14px] text-white inline-block py-[8px] px-[20px] hover:cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.5,1.5)] hover:scale-105 active:scale-95 group-hover:animate-bounce-out"
              >
                {t('back-to-list')}
              </Link>
            </div>
            <EditForm id={id} />
          </div>
        </div>
      </div>
    </>
  )
}