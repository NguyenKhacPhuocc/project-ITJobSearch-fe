import { generateTranslatedMetadata } from "@/app/lib/generateMetadata";
import { useTranslations } from "next-intl";
import Link from "next/link"
import { JobList } from "./JobList";

// Hàm này chạy trên server, trước khi render
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params; // Await params để lấy giá trị thực
  return generateTranslatedMetadata(locale, 'CompanyManageJobListPage');
}

export default function CompanyManageJobListPage() {
  const t = useTranslations('CompanyManageJobListPage');
  return (
    <>
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">

          <div className="flex flex-wrap gap-[20px] items-center justify-between mb-[20px]">
            <h2 className="font-[700] sm:text-[28px] text-[24px] sm:w-auto w-[100%] text-[#000000]">
              {t('management-job')}
            </h2>
            <Link
              href="/company-manage/job/create"
              className="bg-[#005E92] rounded-[4px] font-[400] text-[14px] text-white inline-block py-[8px] px-[20px] hover:cursor-pointer
             transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.5,1.5)]
             hover:scale-105 active:scale-95 group-hover:animate-bounce-out"
            >
              {t('create-new-job')}
            </Link>
          </div>
          
          <JobList />

        </div>
      </div>
    </>
  )
}