/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { generateTranslatedMetadata } from "@/app/lib/generateMetadata";
import { levelList, workingFormList } from "@/config/variable";
import { getTranslations } from "next-intl/server";
import Link from "next/link"
import { notFound } from "next/navigation";
import { FaBriefcase, FaLocationDot, FaUserTie } from "react-icons/fa6"
import { ApplyForm } from "./ApplyForm";

type Params = Promise<{ locale:string, slug: string }>

// Hàm này chạy trên server, trước khi render
export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params; // Await params để lấy giá trị thực
  return generateTranslatedMetadata(locale, 'JobDetailPage');
}

export default async function JobDetailPage({ params }: {
  params: Params
}) {
  const t = await getTranslations('JobDetailPage');
  const { locale, slug } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/detail/${slug}`)
  if (!res.ok) {
    notFound(); // trả về trang 404
  }
  const data = await res.json();

  if (data.code !== "success" || !data.detailedJob) {
    notFound();
  }

  const detailedJob = data.detailedJob;

  const level = levelList.find(itemLevel => itemLevel.value == detailedJob?.level)?.label;
  const workingForm = workingFormList.find(itemWork => itemWork.value === detailedJob?.workingForm)?.label[locale as 'vi' | 'en'];


  return (
    <>
      {/* Chi tiết công việc */}
      {detailedJob && (
        <div className="pt-[30px] pb-[60px]">
          <div className="container mx-auto px-[16px]">
            {/* Wrap */}
            <div className="flex flex-wrap gap-[20px]">
              {/* Left */}
              <div className="lg:w-[65%] w-[100%]">
                {/* Thông tin công việc */}
                <div className="border border-[#DEDEDE] rounded-[8px] p-[20px]">
                  <h1 className="font-[700] sm:text-[24px] text-[20px] text-[#121212] mb-[10px]">
                    {detailedJob.title}
                  </h1>
                  <div className="font-[400] text-[16px] text-[#414042] mb-[10px]">
                    {detailedJob.company?.companyName || ""}
                  </div>
                  <div className="font-[700] text-[20px] text-[#0088FF] sm:mb-[20px] mb-[10px]">
                    {detailedJob.salaryMin.toLocaleString("vi-VN")}$ - {detailedJob.salaryMax.toLocaleString("vi-VN")}$
                  </div>
                  <Link href="#applyForm" className="bg-[#0088FF] rounded-[4px] font-[700] text-[16px] text-white flex items-center justify-center h-[48px] mb-[20px] hover:bg-[#0364b8]">
                    {t('apply')}
                  </Link>
                  <div className="grid grid-cols-3 sm:gap-[16px] gap-[8px] mb-[20px]">
                    {detailedJob.images.map((image: string, index: number) => (
                      <img
                        key={index}
                        src={image}
                        alt={detailedJob.title}
                        className="aspect-[232/145] object-cover rounded-[4px]"
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-[8px] font-[400] text-[14px] text-[#121212] mb-[10px]">
                    <FaUserTie className="text-[16px]" /> {level}
                  </div>
                  <div className="flex items-center gap-[8px] font-[400] text-[14px] text-[#121212] mb-[10px]">
                    <FaBriefcase className="text-[16px]" /> {workingForm}
                  </div>
                  <div className="flex items-center gap-[8px] font-[400] text-[14px] text-[#121212] mb-[10px]">
                    <FaLocationDot className="text-[16px]" /> {detailedJob.company.address}
                  </div>
                  <div className="flex flex-wrap gap-[8px]">
                    {detailedJob.skills.map((item: any, index: number) => (
                      <div key={index} className="border border-[#DEDEDE] rounded-[20px] font-[400] text-[12px] text-[#414042] py-[6px] px-[16px] hover:bg-slate-300 hover:cursor-pointer">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Hết Thông tin công việc */}

                {/* Mô tả chi tiết */}
                <div className="border border-[#DEDEDE] rounded-[8px] p-[20px] mt-[20px]">
                  <div className="font-[700] text-[20px] text-black mb-[20px]">{t('detail-description')}</div>
                  <div dangerouslySetInnerHTML={{ __html: detailedJob.description }} />
                </div>
                {/* Hết Mô tả chi tiết */}

                {/* Form ứng tuyển */}
                <ApplyForm jobId={detailedJob.id} />
                {/* Hết Form ứng tuyển */}
              </div>
              {/* Right */}
              <div className="flex-1 top-0 right-0">
                {/* Thông tin công ty */}
                <div className="border border-[#DEDEDE] rounded-[8px] p-[20px] sticky top-[80px] right-0">
                  <div className="flex gap-[12px]">
                    <div className="w-[100px] border rounded-[4px] overflow-hidden shadow-lg">
                      <img
                        src={detailedJob.company.logo}
                        alt={detailedJob.company.companyName}
                        className="aspect-square object-cover rounded-[4px] w-full"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="font-[700] text-[18px] text-[#121212] mb-[10px]">
                        {detailedJob.company.companyName}
                      </div>
                      <Link href={`/company/detail/${detailedJob.company.slug}`} className="bg-[#005E92] rounded-[4px] font-[400] text-[14px] text-white inline-block py-[8px] px-[20px] hover:cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.5,1.5)] hover:scale-105 active:scale-95 group-hover:animate-bounce-out">
                        {t('view-detail')}
                      </Link>
                    </div>
                  </div>
                  <div className="mt-[20px] flex flex-col gap-[10px] ">
                    <div className="flex flex-wrap justify-start gap-[10px] font-[400] text-[16px]">
                      <div className="text-[#555555]">
                        {t('company-model')}
                      </div>
                      <div className="text-[#121212]">
                        {detailedJob.company.companyModel}
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-start gap-[10px] font-[400] text-[16px]">
                      <div className="text-[#555555]">
                        {t('company-employees')}
                      </div>
                      <div className="text-[#121212]">
                        {detailedJob.company.companyEmployees}
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-start gap-[10px] font-[400] text-[16px]">
                      <div className="text-[#555555]">
                        {t('working-time')}
                      </div>
                      <div className="text-[#121212]">
                        {detailedJob.company.workingTime}
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-start gap-[10px] font-[400] text-[16px]">
                      <div className="text-[#555555]">
                        {t('working-over-time')}
                      </div>
                      <div className="text-[#121212]">
                        {detailedJob.company.workOvertime}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Hết Thông tin công ty */}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Hết Chi tiết công việc */}
    </>
  )
}