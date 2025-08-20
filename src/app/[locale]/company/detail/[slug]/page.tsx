/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { FaLocationDot } from "react-icons/fa6"
import { CardJobItem } from "@/app/components/card/CardJobItem"
import { generateTranslatedMetadata } from "@/app/lib/generateMetadata";
import { getTranslations } from "next-intl/server";

type Params = Promise<{ locale: string, slug: string }>

// Hàm này chạy trên server, trước khi render
export async function generateMetadata({
  params
}: {
  params: Params
}) {
  const { locale } = await params; // Await params để lấy giá trị thực
  return generateTranslatedMetadata(locale, 'CompanyDetailPage');
}


async function fetchCompany(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/detail/${slug}`);
  if (!res.ok) throw new Error('Failed to fetch company');
  return res.json();
}

async function fetchJobs(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/${slug}/jobs`);
  if (!res.ok) throw new Error('Failed to fetch jobs');
  return res.json();
}


export default async function CompanyDetailPage({ params }: {
  params: Params
}) {
  const { locale, slug } = await params;
  const t = await getTranslations('CompanyDetailPage');
  // Fetch song song company và jobs
  const [companyData, jobsData] = await Promise.all([
    fetchCompany(slug),
    fetchJobs(slug)
  ]);

  // Xử lý khi có lỗi
  if (companyData.code === "error") throw new Error('Failed to load company');
  if (jobsData.code === "error") console.error('Failed to load jobs, using fallback');

  const company = companyData.detailedCompany;
  const jobs = jobsData.jobs || []; // Fallback empty array


  return (
    <>
      <div className="pt-[30px] pb-[60px]">
        <div className="container mx-auto px-[16px]">

          {/* Thông tin công ty */}
          <div className="border border-[#DEDEDE] rounded-[8px] p-[20px]">
            <div className="flex flex-wrap items-center gap-[16px] mb-[20px]">
              <div className="w-[100px] border rounded-[4px] overflow-hidden shadow-lg">
                <img
                  src={company.logo}
                  alt={company.companyName}
                  className="w-[100%] aspect-square object-cover rounded-[4px]"
                />
              </div>
              <div className="sm:flex-1">
                <h1 className="font-[700] text-[28px] text-[#121212] mb-[10px]">
                  {company.companyName}
                </h1>
                <div className="flex items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
                  <FaLocationDot className="text-[16px]" /> {company.address}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <div className="font-[400] text-[16px] text-[#A6A6A6]">
                {t('company-model')}
                <span className="text-[#121212] ml-[5px]">
                  {company.companyModel}
                </span>
              </div>
              <div className="font-[400] text-[16px] text-[#A6A6A6]">
                {t('company-size')}
                <span className="text-[#121212] ml-[5px]">
                  {company.companyEmployees} {t('employees')}
                </span>
              </div>
              <div className="font-[400] text-[16px] text-[#A6A6A6]">
                {t('working-time')}
                <span className="text-[#121212] ml-[5px]">
                  {company.workingTime}
                </span>
              </div>
              <div className="font-[400] text-[16px] text-[#A6A6A6]">
                {t('overtime')}
                <span className="text-[#121212] ml-[5px]">
                  {company.workOvertime}
                </span>
              </div>
            </div>
          </div>
          {/* Hết Thông tin công ty */}

          {/* Mô tả chi tiết */}
          <div className="border border-[#DEDEDE] rounded-[8px] p-[20px] mt-[20px]">
            <div className="font-[700] text-[20px] text-black mb-[20px]">{t('detailed-description')}</div>
            <div
              className="lg:text-[15px] text-[10px] font-[350]"
              dangerouslySetInnerHTML={{ __html: company?.description ?? "" }}
            />
          </div>
          {/* Hết Mô tả chi tiết */}

          {/* Việc làm */}
          <div className="mt-[30px]">
            <h2 className="font-[700] text-[28px] text-[#121212] mb-[20px]">
              {t('pre-jobs')} {jobs.length} {t('post-jobs')}
            </h2>

            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
              {jobs.map((job: any) => (
                <CardJobItem key={job.id} item={job} locale={locale} />
              ))}
            </div>
          </div>
          {/* Hết Việc làm */}

        </div>
      </div>
    </>
  )
}