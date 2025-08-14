/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import { levelList, workingFormList } from "@/config/variable";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import useSWR from "swr";
import { FaBriefcase, FaDev, FaLocationDot, FaUserTie } from "react-icons/fa6";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ButtonDelete } from "@/app/components/button/ButtonDelete";

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

      {/* Buttons skeleton */}
      <div className="flex items-center justify-center gap-[12px] mb-[20px]">
        <div className="h-[36px] w-[80px] bg-gray-300 rounded-[4px] animate-pulse" />
        <div className="h-[36px] w-[80px] bg-gray-300 rounded-[4px] animate-pulse" />
      </div>
    </div>
  );
};


type Locale = "vi" | "en";
const fetcher = (url: string, locale: Locale) => {
  console.log("🔄 Fetching job list from API...");
  return fetch(url, {
    method: "GET",
    headers: { "Accept-Language": locale },
    credentials: "include",
  }).then((res) => res.json());
};


export const JobList = () => {
  const t = useTranslations("CompanyManageJobListPage");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1'); // Mặc định trang 1
  const [page, setPage] = useState(currentPage);

  // Fetch total pages once when component mounts
  const { data: totalPageData } = useSWR(
    [`${process.env.NEXT_PUBLIC_API_URL}/company/job/total-pages`, locale],
    ([url, locale]) => fetcher(url, locale),
    {
      dedupingInterval: 60000, // Cache for 1 minute
      revalidateOnFocus: false,
    }
  );

  // fetch data job-list
  const { data, error, isLoading } = useSWR(
    [`${process.env.NEXT_PUBLIC_API_URL}/company/job/list`, locale, page], // listKey
    ([url, locale, page]) => fetcher(`${url}?page=${page}`, locale),  // thực hiện fetch
    {                                                                   // các option
      dedupingInterval: 5000,
    }
  );

  if (error) return <div>Error loading data</div>;

  const jobList = data?.code === "success" ? data.jobList : [];
  const totalPage = totalPageData?.code === "success" ? totalPageData.totalPage : 1;
  //end fetch data job-list


  const handlePagination = (event: any) => {
    const value = event.target.value;
    setPage(value);
    router.push(`?page=${value}`);
  }


  return (
    <>
      <div className="h-[600px]">
        {isLoading ? (
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
            {[...Array(3)].map((_, index) => (
              <JobCardSkeleton key={index} />
            ))}
          </div>
        ) : jobList.length > 0 ? (
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
            {jobList.map((item: any) => {
              const level = levelList.find(itemLevel => itemLevel.value == item.level)?.label;
              const workingForm = workingFormList.find(itemWork => itemWork.value == item.workingForm)?.label[locale];

              return (
                <div
                  key={item.id}
                  className="border border-[#DEDEDE] rounded-[8px] flex flex-col relative truncate"
                  style={{
                    background: "linear-gradient(180deg, #F6F6F6 2.38%, #FFFFFF 70.43%)"
                  }}
                >
                  <img
                    src="/assets/images/card-bg.svg"
                    alt=""
                    className="absolute top-[0px] left-[0px] w-[100%] h-auto"
                  />
                  <div
                    className="relative mt-[20px] w-[116px] h-[116px] bg-white mx-auto rounded-[8px] p-[10px]"
                    style={{
                      boxShadow: "0px 4px 24px 0px #0000001F"
                    }}
                  >
                    <img
                      src={item.companyLogo}
                      alt={item.title}
                      className="w-[100%] h-[100%] object-contain"
                    />
                  </div>
                  <h3 className="mt-[20px] mx-[16px] font-[700] text-[18px] text-[#121212] text-center flex-1 whitespace-normal line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="mt-[6px] text-center font-[400] text-[14px] text-[#121212]">
                    {item.companyName}
                  </div>
                  <div className="mt-[12px] text-center font-[600] text-[16px] text-[#0088FF]">
                    {item.salaryMin.toLocaleString('vi-VN')}$ - {item.salaryMax.toLocaleString('vi-VN')}$
                  </div>
                  <div className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
                    <FaUserTie className="text-[16px]" /> {level}
                  </div>
                  <div className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
                    <FaDev className="text-[16px]" /> {item.expertise}
                  </div>
                  <div className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
                    <FaBriefcase className="text-[16px]" /> {workingForm}
                  </div>
                  <div className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
                    <FaLocationDot className="text-[16px]" /> {item.companyCity}
                  </div>
                  <div className="mt-[12px] mb-[20px] mx-[16px] flex flex-wrap justify-center gap-[8px]">
                    {item.skills.map((itemTech: string, indexTech: number) => (
                      <div
                        key={indexTech}
                        className="border border-[#DEDEDE] rounded-[20px] py-[6px] px-[16px] font-[400] text-[12px] text-[#414042]"
                      >
                        {itemTech}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-[12px] mb-[20px]">
                    <Link href={`/company-manage/job/edit/${item.id}`} className="bg-[#FFB200] rounded-[4px] font-[400] text-[14px] text-black inline-block py-[8px] px-[20px]">
                      {t('edit-job')}
                    </Link>
                    <ButtonDelete
                      api={`${process.env.NEXT_PUBLIC_API_URL}/company/job/delete/${item.id}`}
                      item={item}
                      listKey={[`${process.env.NEXT_PUBLIC_API_URL}/company/job/list`, locale, page]}  // listKey = useSWR([listKey],.....)
                    />
                  </div>
                </div>
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
            <div className="text-xl font-semibold text-gray-700 mb-2">{t('no-jobs-created')}</div>
          </div>
        )}
      </div>

      <hr />

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