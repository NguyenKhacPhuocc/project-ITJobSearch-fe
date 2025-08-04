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
            <h2 className="font-[700] sm:text-[28px] text-[24px] sm:w-auto w-[100%] text-[#121212]">
              {t('management-job')}
            </h2>
            <Link href="/company-manage/job/create" className="bg-[#0088FF] rounded-[4px] font-[400] text-[14px] text-white inline-block py-[8px] px-[20px] hover:cursor-pointer">
              {t('create-new-job')}
            </Link>
          </div>

          <JobList/>

          <div className="mt-[30px]">
            <select name="" className="border border-[#DEDEDE] rounded-[8px] py-[12px] px-[18px] font-[400] text-[16px] text-[#414042]">
              <option value="">{t('page')} 1</option>
              <option value="">{t('page')} 2</option>
              <option value="">{t('page')} 3</option>
            </select>
          </div>

        </div>
      </div>
    </>
  )
}