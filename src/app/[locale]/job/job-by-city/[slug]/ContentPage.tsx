/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { CardJobItem } from "@/app/components/card/CardJobItem";
import { JobCardSkeleton } from "@/app/components/card/JobCardSkeleton";
import { cities, levelList, workingFormList } from "@/config/variable"
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import { useTranslations } from "next-intl";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type JobDetailClientProps = {
  slug: string;
  locale: string;
};
export const ContentPage = ({ slug, locale }: JobDetailClientProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const level = searchParams.get("level") || "";
  const workingForm = searchParams.get("workingForm") || "";
  const currentPage = parseInt(searchParams.get('page') || '1'); // Mặc định trang 1
  const [page, setPage] = useState(currentPage);
  const t = useTranslations('JobByCityPage');

  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/job/job-by-city/${slug}?level=${level}&workingForm=${workingForm}&page=${page}`,
    fetcher,
    {
      keepPreviousData: true,     // Giữ data cũ khi đổi key
      revalidateOnFocus: false,   // Không fetch lại khi focus tab
    }
  );

  // lấy tổng số trang
  const { data: totalPageData } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/job/job-by-city/total-pages/${slug}?level=${level}&workingForm=${workingForm}`,
    fetcher,
    {
      keepPreviousData: true,     // Giữ data cũ khi đổi key
      revalidateOnFocus: false,   // Không fetch lại khi focus tab
      dedupingInterval: 60000, // Cache for 1 minute
    }
  );

  const jobList = data?.code === "success" ? data.jobs : [];
  const totalPage = totalPageData?.code === "success" ? totalPageData.totalPage : 0;
  const totalRecord = totalPageData?.code === "success" ? totalPageData.totalRecord : 0;

  const handleFilterLevel = (event: any) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("level", value);
    } else {
      params.delete("level");
    }

    router.push(`?${params.toString()}`)
  }

  const handleFilterWorkingForm = (event: any) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("workingForm", value);
    } else {
      params.delete("workingForm");
    }

    router.push(`?${params.toString()}`)
  }

  const handlePagination = (event: any) => {
    const value = event.target.value;
    setPage(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("page", value);
    } else {
      params.delete("page");
    }
    router.push(`?${params.toString()}`)
  }

  // Tìm city theo slug
  const city = cities.find((c) => c.slug === slug);
  // Lấy tên hiển thị theo locale
  const cityName = city?.name[locale as "vi" | "en"] ?? slug.replace(/-/g, " ");

  return (
    <>
      <div className="container mx-auto px-[16px]">
        {/* title */}
        <h2 className="font-[700] text-[28px] text-[#121212] mb-[10px] flex items-center">
          {totalRecord ?? 0} {t('job_in')} {cityName}
        </h2>
        {/* filter */}
        <div
          className="bg-white rounded-[8px] py-[10px] px-[20px] mb-[30px] flex flex-wrap gap-[12px]"
          style={{
            boxShadow: "0px 4px 20px 0px #0000000F"
          }}
        >
          <select name="" className="border border-[#DEDEDE] rounded-[20px] h-[36px] px-[18px] font-[400] text-[16px] text-[#414042]" onChange={handleFilterLevel} defaultValue={level}>
            <option value="">{t('level')}</option>
            {levelList.map((level, index) => (
              <option key={index} value={level.value}>{level.label}</option>
            ))}
          </select>
          <select name="" className="border border-[#DEDEDE] rounded-[20px] h-[36px] px-[18px] font-[400] text-[16px] text-[#414042]" onChange={handleFilterWorkingForm} defaultValue={workingForm}>
            <option value="">{t('working_form')}</option>
            {workingFormList.map((workingForm, index) => (
              <option key={index} value={workingForm.value}>{workingForm.label?.[locale as 'vi' | 'en']}</option>
            ))}
          </select>
        </div>

        {/* main content */}
        {isLoading ? (
          // Trường hợp 1: Đang loading
          <div className="h-auto">
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
              {Array.from({ length: 3 }).map((_, idx) => (
                <JobCardSkeleton key={idx} />
              ))}
            </div>
          </div>
        ) : jobList.length > 0 ? (
          // Trường hợp 2: Có job sau khi load xong
          <div className="h-auto">
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
              {jobList.map((item: any) => (
                <CardJobItem key={item.id} item={item} locale={locale} />
              ))}
            </div>
          </div>
        ) : (
          // Trường hợp 3: Không có job sau khi load xong
          <div className="flex flex-col items-center justify-center py-16 h-[300px]">
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
            <div className="text-xl font-semibold text-gray-700 mb-2">
              {t('no-job')}
            </div>
            <div className="text-gray-500">
              {t('try-another-search')}
            </div>
          </div>
        )}
        <hr className="mt-[30px]" />

        {/* pagination */}
        {totalPage > 0 && (
          <div className="mt-[20px]">
            <select
              name="pagination"
              className="border border-[#DEDEDE] rounded-[8px] py-[12px] px-[18px] font-[400] text-[16px] text-[#414042]"
              onChange={handlePagination}
              value={currentPage}
            >
              {Array.from({ length: totalPage }).map((_, index: number) => (
                <option key={index} value={index + 1}>
                  {t('page')} {index + 1}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </>
  )
}