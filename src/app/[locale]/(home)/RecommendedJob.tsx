/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { CardJobItem } from "@/app/components/card/CardJobItem";
import { JobCardSkeleton } from "@/app/components/card/JobCardSkeleton";
import { useAuth } from "@/hooks/useAuth";
import { useLocale, useTranslations } from 'next-intl';
import useSWR from "swr";

const fetcher = async (url: string, { arg }: { arg: any }) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(arg),
  });
  return res.json();
};

export const RecommendedJob = () => {
  const locale = useLocale();
  const t = useTranslations('Home');
  const { infoUser } = useAuth();
  const { data, error, isLoading } = useSWR(
    infoUser ? [`${process.env.NEXT_PUBLIC_API_URL}/ai/recommend-jobs`, infoUser.id] : null,
    ([url, userId]) => fetcher(url, { arg: { userId } }),
    {
      revalidateOnFocus: false, // Không revalidate khi focus lại
      revalidateIfStale: false, // Không revalidate nếu dữ liệu hết hạn
      refreshInterval: 300000
    }
  );

  const recommendedJobList = data?.code === "success" ? data.recommendedJobList : [];
  const recommendedJobListId = recommendedJobList.filter((item: any) => item.id) // Lọc các đối tượng có id
  console.log(recommendedJobListId)

  return (
    <>
      <section className="pt-[60px]">
        <div className="container mx-auto px-[16px]">
          <h2 className="font-[700] sm:text-[28px] text-[24px] text-[#121212] text-center mb-[30px]">
            {t('recommended-job')}
          </h2>
          {isLoading ? (
            // Trường hợp 1: Đang loading
            <div className="h-auto">
              <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <JobCardSkeleton key={idx} />
                ))}
              </div>
            </div>
          ) : recommendedJobListId.length > 0 ? (
            // Trường hợp 2: Có job sau khi load xong
            <div className="h-auto">
              <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
                {recommendedJobListId.map((item: any) => (
                  <CardJobItem key={item.id} item={item} locale={locale} />
                ))}
              </div>
            </div>
          ) : (
            // Trường hợp 3: Không có job sau khi load xong
            <div className="flex flex-col items-center justify-center ">
              <div className="text-xl font-semibold text-blue-400">
                {t('login-to-recommend')}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};