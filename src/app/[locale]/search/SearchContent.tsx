/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { CardJobItem } from "@/app/components/card/CardJobItem"
import { JobCardSkeleton } from "@/app/components/card/JobCardSkeleton";
import { levelList, workingFormList } from "@/config/variable";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import useSWR from "swr";


const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const SearchContent = () => {
  const t = useTranslations('SearchPage');
  const searchParams = useSearchParams();
  const city = searchParams.get("city") || "";
  const keysearch = searchParams.get("keysearch") || "";
  const level = searchParams.get("level") || "";
  const workingForm = searchParams.get("workingForm") || "";
  const currentPage = parseInt(searchParams.get('page') || '1'); // Mặc định trang 1
  const [page, setPage] = useState(currentPage);
  const locale = useLocale();
  const router = useRouter();

  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/search?city=${city}&keysearch=${keysearch}&level=${level}&workingForm=${workingForm}&page=${page}`,
    fetcher,
    {
      keepPreviousData: true,     // Giữ data cũ khi đổi key
      revalidateOnFocus: false,   // Không fetch lại khi focus tab
    }
  );

  // lấy tổng số trang
  const { data: totalPageData } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/search/total-pages?city=${city}&keysearch=${keysearch}&level=${level}&workingForm=${workingForm}`,
    fetcher,
    {
      keepPreviousData: true,     // Giữ data cũ khi đổi key
      revalidateOnFocus: false,   // Không fetch lại khi focus tab
      dedupingInterval: 60000, // Cache for 1 minute
    }
  );

  const jobList = data?.code === "success" ? data.jobs : [];
  const companyInfo = data?.code === "success" ? data.companyInfo : [];
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

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/search?keysearch=${keysearch}`, {
      method: "POST",
      credentials: "include", // cookie sẽ được gửi kèm
    }).catch(console.error);
  }, [keysearch]);

  return (
    <>
      <div className="container mx-auto px-[16px]">
        {/* Thông tin công ty */}
        {companyInfo && companyInfo.companyName && (
          <div className="border border-[#DEDEDE] rounded-[8px] px-[20px] py-[10px] mb-[20px]">
            <div className="flex flex-wrap items-center gap-[16px] ">
              <div className="w-[100px] border rounded-[4px] overflow-hidden shadow-lg">
                <img
                  src={companyInfo.logo}
                  alt={companyInfo.companyName}
                  className="w-[100%] aspect-square object-cover rounded-[4px]"
                />
              </div>
              <div className="sm:flex-1">
                <div className="flex justify-between items-center mb-[10px]">
                  <h1 className="font-[700] text-[28px] text-[#121212] ">
                    {companyInfo.companyName}
                  </h1>
                  <Link href={`/company/detail/${companyInfo.slug}`} className="bg-[#005E92] rounded-[4px] font-[400] text-[14px] text-white inline-block py-[8px] px-[20px] hover:cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.5,1.5)] hover:scale-105 active:scale-95 group-hover:animate-bounce-out">
                    {t('view-detail')}
                  </Link>
                </div>
                <div className="flex items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
                  <FaLocationDot className="text-[16px]" /> {companyInfo.address}
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Hết Thông tin công ty */}

        <h2 className="font-[700] text-[28px] text-[#121212] mb-[10px] flex items-center">
          <div className="bg-[#F0F6FF] text-[#0088FF] flex justify-center items-center h-[40px] w-[80px] mr-[10px] rounded-[8px] border border-[#D6E6FF]">
            {totalRecord ? totalRecord : 0}
          </div>
          {t('search-results-for')} <span className="text-[#0088FF] ml-[10px]">{[city, keysearch].filter(Boolean).join(', ')}</span>
        </h2>

        <div
          className="bg-white rounded-[8px] py-[10px] px-[20px] mb-[30px] flex flex-wrap gap-[12px]"
          style={{
            boxShadow: "0px 4px 20px 0px #0000000F"
          }}
        >
          <select name="" className="border border-[#DEDEDE] rounded-[20px] h-[36px] px-[18px] font-[400] text-[16px] text-[#414042]" onChange={handleFilterLevel} defaultValue={level}>
            <option value="">{t('level.level')}</option>
            {levelList.map((level, index) => (
              <option key={index} value={level.value}>{level.label}</option>
            ))}
          </select>
          <select name="" className="border border-[#DEDEDE] rounded-[20px] h-[36px] px-[18px] font-[400] text-[16px] text-[#414042]" onChange={handleFilterWorkingForm} defaultValue={workingForm}>
            <option value="">{t('work-type.work-type')}</option>
            {workingFormList.map((workingForm, index) => (
              <option key={index} value={workingForm.value}>{workingForm.label?.[locale as 'vi' | 'en']}</option>
            ))}
          </select>
        </div>

        {isLoading ? (
          // Trường hợp 1: Đang loading
          <div className="h-[500px]">
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
            <div className="text-xl font-semibold text-gray-700 mb-2">{t('no-job')}</div>
            <div className="text-gray-500">{t('try-another-search')}</div>
          </div>
        )}
        <hr className="mt-[30px]" />
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
      </div >
    </>
  )
}