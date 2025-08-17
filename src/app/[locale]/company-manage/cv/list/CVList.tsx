/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import { CVItem } from "./CVItem";

const JobCardSkeleton = () => {
  return (
    <div className="border border-[#DEDEDE] rounded-[8px] flex flex-col relative overflow-hidden p-[10px]"
      style={{
        background: "linear-gradient(180deg, #F6F6F6 2.38%, #FFFFFF 70.43%)"
      }}
    >
      {/* Title skeleton */}
      <div className="mt-[20px] mx-[16px] h-[24px] bg-gray-200 rounded animate-pulse w-3/4 " />
      <div className="mt-[10px] mx-[16px] h-[20px] bg-gray-200 rounded animate-pulse w-1/2" />
      {/* Title skeleton */}
      <div className="mt-[20px] mx-[16px] h-[24px] bg-gray-200 rounded animate-pulse w-3/4 " />
      <div className="mt-[10px] mx-[16px] h-[20px] bg-gray-200 rounded animate-pulse w-1/2" />
      {/* Title skeleton */}
      <div className="mt-[20px] mx-[16px] h-[24px] bg-gray-200 rounded animate-pulse w-3/4 " />

      {/* Salary skeleton */}
      <div className="mt-[12px] h-[20px] bg-gray-200 rounded animate-pulse w-2/3 mx-auto" />
      {/* Salary skeleton */}
      <div className="mt-[12px] h-[20px] bg-gray-200 rounded animate-pulse w-2/3 mx-auto" />

      {/* Buttons skeleton */}
      <div className="flex items-center justify-center gap-[12px] mb-[20px] mt-[20px]">
        <div className="h-[36px] w-[80px] bg-gray-300 rounded-[4px] animate-pulse" />
        <div className="h-[36px] w-[80px] bg-gray-300 rounded-[4px] animate-pulse" />
        <div className="h-[36px] w-[80px] bg-gray-300 rounded-[4px] animate-pulse" />
        <div className="h-[36px] w-[80px] bg-gray-300 rounded-[4px] animate-pulse" />
      </div>
    </div>
  );
};


const fetcher = (url: string) => {
  return fetch(url, {
    method: "GET",
    credentials: "include",
  }).then((res) => res.json());
};

export const CVList = () => {
  const t = useTranslations('CompanyManageCVListPage');

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1'); // Mặc định trang 1
  const [page, setPage] = useState(currentPage);

  // Fetch total pages once when component mounts
  const { data: totalPageData } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/company/cv/total-page`,
    fetcher,
    { dedupingInterval: 60000 }   //cache
  );

  // fetch data cv-list
  const { data, error, isLoading } = useSWR(
    [`${process.env.NEXT_PUBLIC_API_URL}/company/cv/list?page=${page}`], // listKey
    fetcher,    // thực hiện fetch
    {
      dedupingInterval: 5000,
      revalidateOnFocus: true,
      revalidateOnMount: true,
      revalidateOnReconnect: true
    }
  );

  if (error) return <div>Error loading data</div>;

  const cvList = data?.code === "success" ? data.cvList : [];
  const totalPage = totalPageData?.code === "success" ? totalPageData.totalPage : 1;
  //end fetch data job-list


  const handlePagination = (event: any) => {
    const value = event.target.value;
    setPage(value);
    router.push(`?page=${value}`);
  }

  return (
    <>
      <div className="h-[350px]">
        {isLoading ? (
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
            {[...Array(3)].map((_, index) => (
              <JobCardSkeleton key={index} />
            ))}
          </div>
        ) : cvList.length > 0 ? (
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
            {cvList.map((item: any) => {
              return (
                <CVItem key={item.id} item={item} />
              )
            })}
          </div>
        ) : (
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
            <div className="text-xl font-semibold text-gray-700 mb-2">{t('no-cvs')}</div>
          </div>
        )}
      </div>


      <hr className="mt-[50px]" />

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
    </>
  )
}