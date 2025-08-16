/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { CardCompanyItem } from "@/app/components/card/CardCompanyItem"
import { useLocale, useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

const LoadingSkeleton = () => (
  <div className="grid lg:grid-cols-3 grid-cols-2 sm:gap-[20px] gap-x-[10px] gap-y-[20px]">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="animate-pulse bg-gray-200 h-[318px] rounded-lg" />
    ))}
  </div>
);

const fetcher = (url: string) => fetch(url).then(res => res.json())

export const ContentPage = () => {
  const t = useTranslations('CompanyListPage');
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1'); // Mặc định trang 1
  const [page, setPage] = useState(currentPage);

  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/company/list?page=${page}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  // Fetch total pages once when component mounts
  const { data: totalPageData } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/company/list/total-page`,
    fetcher,
    {
      dedupingInterval: 60000, // Cache for 1 minute
      revalidateOnFocus: false,
    }
  );

  const companyList = data?.code == "success" ? data.companyList : [];
  const totalPage = totalPageData?.code == "success" ? totalPageData.totalPage : 0;

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

  return (
    <>
      {/* Item */}
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <div
          className="grid lg:grid-cols-3 grid-cols-2 sm:gap-[20px] gap-x-[10px] gap-y-[20px]"
          aria-live="polite"
          aria-busy={isLoading}
        >
          {companyList.map((item: any) => (
            <CardCompanyItem key={item.id} item={item} locale={locale} />
          ))}
        </div>
      )}

      <hr className="mt-[50px]" />

      {totalPage > 0 && (
        <div className="mt-[20px]">
          <select
            name="pagination"
            className="border border-[#DEDEDE] rounded-[8px] py-[12px] px-[18px] font-[400] text-[16px] text-[#414042] outline-none"
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