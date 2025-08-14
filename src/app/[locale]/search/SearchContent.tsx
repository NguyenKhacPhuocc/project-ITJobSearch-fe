/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { CardJobItem } from "@/app/components/card/CardJobItem"
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

const JobCardSkeleton = () => {
  return (
    <div className="border border-[#DEDEDE] rounded-[8px] flex flex-col relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #F6F6F6 2.38%, #FFFFFF 70.43%)"
      }}
    >
      {/* Background image skeleton */}
      <div className="absolute top-[0px] left-[0px] w-[100%] h-[100px] bg-gray-200 animate-pulse" />

      {/* Logo skeleton */}
      <div className="relative mt-[20px] w-[116px] h-[116px] bg-gray-300 mx-auto rounded-[8px] p-[10px] animate-pulse"
        style={{
          boxShadow: "0px 4px 24px 0px #0000001F"
        }}
      />

      {/* Title skeleton */}
      <div className="mt-[20px] mx-[16px] h-[24px] bg-gray-200 rounded animate-pulse w-3/4 " />
      <div className="mt-[10px] mx-[16px] h-[20px] bg-gray-200 rounded animate-pulse w-1/2" />

      {/* Salary skeleton */}
      <div className="mt-[12px] h-[20px] bg-gray-200 rounded animate-pulse w-2/3 mx-auto" />

      {/* Details skeleton */}
      <div className="mt-[6px] h-[16px] bg-gray-200 rounded animate-pulse w-1/2 mx-auto" />
      <div className="mt-[6px] h-[16px] bg-gray-200 rounded animate-pulse w-1/2 mx-auto" />
      <div className="mt-[6px] h-[16px] bg-gray-200 rounded animate-pulse w-1/2 mx-auto" />
      <div className="mt-[6px] h-[16px] bg-gray-200 rounded animate-pulse w-1/2 mx-auto" />

      {/* Skills skeleton */}
      <div className="mt-[12px] mb-[20px] mx-[16px] flex flex-wrap justify-center gap-[8px]">
        <div className="h-[34px] w-[72px] bg-gray-200 rounded-[20px] animate-pulse" />
        <div className="h-[36px] w-[78px] bg-gray-200 rounded-[20px] animate-pulse" />
        <div className="h-[36px] w-[78px] bg-gray-200 rounded-[20px] animate-pulse" />
        <div className="h-[36px] w-[78px] bg-gray-200 rounded-[20px] animate-pulse" />
      </div>
    </div>
  );
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const SearchContent = () => {
  const t = useTranslations('SearchPage');
  const searchParams = useSearchParams();
  const skill = searchParams.get("skill") || "";
  const city = searchParams.get("city") || "";
  const locale = useLocale();

  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/search?skill=${skill}&city=${city}`,
    fetcher,
    {
      keepPreviousData: true,     // Giữ data cũ khi đổi key
      revalidateOnFocus: false,   // Không fetch lại khi focus tab
    }
  );

  const jobList = data?.code === "success" ? data.jobs : [];

  return (
    <>
      <div className="container mx-auto px-[16px]">

        <h2 className="font-[700] text-[28px] text-[#121212] mb-[30px] flex items-center">
          <div className="bg-[#F0F6FF] text-[#0088FF] flex justify-center items-center h-[40px] w-[80px] mr-[5px] rounded-[8px] border border-[#D6E6FF]">
            {jobList.length ? jobList.length : 0}
          </div>
          {t('jobs')} <span className="text-[#0088FF] ml-[7px]">{skill} {city}</span>
        </h2>

        <div
          className="bg-white rounded-[8px] py-[10px] px-[20px] mb-[30px] flex flex-wrap gap-[12px]"
          style={{
            boxShadow: "0px 4px 20px 0px #0000000F"
          }}
        >
          <select name="" className="border border-[#DEDEDE] rounded-[20px] h-[36px] px-[18px] font-[400] text-[16px] text-[#414042]">
            <option value="">{t('level.level')}</option>
            <option value="intern">{t('level.intern')}</option>
            <option value="fresher">{t('level.fresher')}</option>
            <option value="junior">{t('level.junior')}</option>
            <option value="middle">{t('level.middle')}</option>
            <option value="senior">{t('level.senior')}</option>
            <option value="manager">{t('level.manager')}</option>
          </select>
          <select name="" className="border border-[#DEDEDE] rounded-[20px] h-[36px] px-[18px] font-[400] text-[16px] text-[#414042]">
            <option value="">{t('work-type.work-type')}</option>
            <option value="">{t('work-type.on-site')}</option>
            <option value="">{t('work-type.remote')}</option>
            <option value="">{t('work-type.flexible')}</option>
          </select>
        </div>

        {jobList.length > 0 ?
          (
            <>
              <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
                {isLoading
                  ? Array.from({ length: 3 }).map((_, idx) => (
                    <JobCardSkeleton key={idx} />
                  ))
                  : jobList.map((item: any) => (
                    <CardJobItem key={item.id} item={item} locale={locale} />
                  ))}
              </div>
              <div className="mt-[30px]">
                <select name="" className="border border-[#DEDEDE] rounded-[8px] py-[12px] px-[18px] font-[400] text-[16px] text-[#414042] outline-none">
                  <option value="">{t('page')} 1</option>
                  <option value="">{t('page')} 2</option>
                  <option value="">{t('page')} 3</option>
                </select>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <svg
                className="w-16 h-16 text-blue-400 mb-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25m0 0A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25v3A2.25 2.25 0 0010.5 10.5h3A2.25 2.25 0 0015.75 8.25V5.25zm-7.5 9.75v3A2.25 2.25 0 0010.5 21h3a2.25 2.25 0 002.25-2.25v-3A2.25 2.25 0 0013.5 13.5h-3a2.25 2.25 0 00-2.25 2.25z"
                />
              </svg>
              <div className="text-xl font-semibold text-gray-700 mb-2">{t('no-job')}</div>
              <div className="text-gray-500">{t('try-another-search')}</div>
            </div>
          )
        }
      </div>
    </>
  )
}