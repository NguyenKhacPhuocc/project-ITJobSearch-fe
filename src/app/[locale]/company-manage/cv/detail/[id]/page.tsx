import { generateTranslatedMetadata } from "@/app/lib/generateMetadata";
import { levelList, workingFormList } from "@/config/variable";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import Link from "next/link"
import { notFound } from "next/navigation";

// Hàm này chạy trên server, trước khi render
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params; // Await params để lấy giá trị thực
  return generateTranslatedMetadata(locale, 'CompanyManageCVDetailPage');
}


type Locale = "vi" | "en";
export default async function CompanyManageCVDetailPage({ params, searchParams }: {
  params: Promise<{
    locale: Locale;
    id: string;
  }>;
  searchParams: Promise<{
    fromPage?: string;
  }>;
}) {
  const t = await getTranslations('CompanyManageCVDetailPage')
  const { locale, id } = await params;
  const { fromPage = '1' } = searchParams ? await searchParams : {};
  const headerList = await headers();
  const cookie = headerList.get("cookie");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/cv/detail/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      cookie: cookie || ""
    },
    cache: "no-store"
  })

  if (!res.ok) {
    notFound(); // trả về trang 404
  }
  const data = await res.json();

  if (data.code === "error") {
    console.log(data);
    notFound();
  }

  const detailedCV = data?.detailedCV || {};
  const jobInfo = data?.jobInfo || {};
  const level = levelList.find(itemLevel => itemLevel.value == jobInfo?.level)?.label;
  const workingForm = workingFormList.find(itemWork => itemWork.value == jobInfo?.workingForm)?.label[locale];

  return (
    <>
      <div className="py-[60px]">
        <div className=" mx-auto lg:px-[80px] px-[35] flex flex-row flex-1 gap-[20px]">
          {/* Thông tin công việc */}
          {jobInfo && (
            <div className="flex-[4] ">
              <div className="border border-[#DEDEDE] rounded-[8px] p-[20px] sticky top-[80px] right-0">
                <h2 className="sm:w-auto w-[100%] font-[700] text-[20px] text-black mb-[20px]">
                  {t('job-information')}
                </h2>
                <hr className="py-[10px]" />

                <div className="font-[400] text-[16px] text-black mb-[10px]">
                  {t('job-title')}
                  <span className="font-[700]">
                    {jobInfo.title}
                  </span>
                </div>
                <div className="font-[400] text-[16px] text-black mb-[10px]">
                  {t('salary')}
                  <span className="font-[700]">
                    {jobInfo.salaryMin.toLocaleString("vi-VN")}$ -  {jobInfo.salaryMax.toLocaleString("vi-VN")}$
                  </span>
                </div>
                <div className="font-[400] text-[16px] text-black mb-[10px]">
                  {t('level')}
                  <span className="font-[700]">
                    {level}
                  </span>
                </div>
                <div className="font-[400] text-[16px] text-black mb-[10px]">
                  {t('work-type')}
                  <span className="font-[700]">
                    {workingForm}
                  </span>
                </div>
                <div className="font-[400] text-[16px] text-black mb-[10px]">
                  {t('technology')}
                  {jobInfo.skills.join(", ")}

                </div>
                <Link href={`/company-manage/job/edit/${jobInfo.slug}`} className="font-[400] text-[14px] text-[#0088FF] underline">
                  {t('view-job-details')}
                </Link>
              </div>
            </div>
          )}
          {/* Hết Thông tin công việc */}

          {/* Thông tin CV */}
          {detailedCV && (
            <div className="border border-[#DEDEDE] rounded-[8px] p-[20px] flex-[8]">
              <div className="flex flex-wrap gap-[20px] items-center justify-between mb-[20px]">
                <h2 className="sm:w-auto w-[100%] font-[700] text-[20px] text-black">
                  {t('cv-information')}
                </h2>
                <Link href={`/company-manage/cv/list?page=${fromPage}`} className="bg-[#005E92] rounded-[4px] font-[400] text-[14px] text-white inline-block py-[8px] px-[20px] cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.5,1.5)] hover:scale-105 active:scale-95 group-hover:animate-bounce-out">
                  {t('back-to-list')}
                </Link>
              </div>
              <hr className="py-[10px]" />

              <div className="font-[400] text-[16px] text-black mb-[10px]">
                {t('full-name')}
                <span className="font-[700]">
                  {detailedCV.fullName}
                </span>
              </div>
              <div className="font-[400] text-[16px] text-black mb-[10px]">
                {t('email')}
                <span className="font-[700]">
                  {detailedCV.email}
                </span>
              </div>
              <div className="font-[400] text-[16px] text-black mb-[10px]">
                {t('phone-number')}
                <span className="font-[700]">
                  {detailedCV.phone}
                </span>
              </div>
              <div className="font-[400] text-[16px] text-black mb-[10px]">
                {t('cv-file')}
              </div>
              <div className="bg-[#D9D9D9] h-[736px]">
                {/* Preview File CV dạng PDF tại đây */}
                <iframe src={detailedCV.fileCV} className="h-full w-full">

                </iframe>
              </div>
            </div>
          )}
          {/* Hết Thông tin CV */}
        </div>
      </div>
    </>
  )
}