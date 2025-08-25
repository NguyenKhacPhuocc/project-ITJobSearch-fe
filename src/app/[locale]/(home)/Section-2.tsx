/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { CardCompanyItem } from "@/app/components/card/CardCompanyItem"
import { useLocale, useTranslations } from 'next-intl';
import useSWR from "swr";

const LoadingSkeleton = () => (
  <div className="grid lg:grid-cols-3 grid-cols-2 sm:gap-[20px] gap-x-[10px] gap-y-[20px]">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="animate-pulse bg-gray-200 h-[300px] rounded-lg" />
    ))}
  </div>
);

const fetcher = (url: string) => fetch(url).then(res => res.json())

export const Section2 = () => {
  const locale = useLocale();
  const t = useTranslations('Home');

  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/company/list?limitItems=6`,
    fetcher
  )

  const companyList = data?.code == "success" ? data.companyList : [];

  return (
    <>
      <section className="py-[60px]">
        <div className="container mx-auto px-[16px]">
          <h2 className="font-[700] sm:text-[28px] text-[24px] text-[#121212] text-center mb-[30px]">
            {t('top-company')}
          </h2>

          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <div className="grid lg:grid-cols-3 grid-cols-2 sm:gap-[20px] gap-x-[10px] gap-y-[20px]">
              {companyList.map((item: any) => (
                <CardCompanyItem key={item.id} item={item} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}