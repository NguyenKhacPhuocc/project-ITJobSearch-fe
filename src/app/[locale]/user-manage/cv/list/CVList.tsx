/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client"

import { cvStatusList, levelList, workingFormList } from "@/config/variable";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaBriefcase, FaCircleCheck, FaDev, FaUserTie } from "react-icons/fa6"
import useSWR from "swr";
import PopupCV from "./CVPopup";
import { ButtonDelete } from "@/app/components/button/ButtonDelete";

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

      {/* Salary skeleton */}
      <div className="mt-[12px] h-[20px] bg-gray-200 rounded animate-pulse w-2/3 mx-auto" />
      <div className="mt-[12px] h-[20px] bg-gray-200 rounded animate-pulse w-2/3 mx-auto" />

      {/* Salary skeleton */}
      <div className="mt-[12px] h-[20px] bg-gray-200 rounded animate-pulse w-2/3 mx-auto" />
      <div className="mt-[12px] h-[20px] bg-gray-200 rounded animate-pulse w-2/3 mx-auto" />

      {/* Buttons skeleton */}
      <div className="flex items-center justify-center gap-[12px] mb-[20px] mt-[20px]">
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

type Locale = "vi" | "en";

export const CVList = () => {
  const t = useTranslations('UserManageCVListPage');

  const router = useRouter();
  const locale = useLocale() as Locale;
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1'); // Mặc định trang 1
  const [page, setPage] = useState(currentPage);
  const [selectedCV, setSelectedCV] = useState<any | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Fetch total pages once when component mounts
  const { data: totalPageData } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/user/cv/total-page`,
    fetcher,
    { dedupingInterval: 60000 }   //cache
  );

  // fetch data cv-list
  const { data, error, isLoading } = useSWR(
    [`${process.env.NEXT_PUBLIC_API_URL}/user/cv/list?page=${page}`], // listKey
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

  const handleViewCV = (cv: any) => {
    setSelectedCV(cv);
    setIsPopupOpen(true);
  };

  return (
    <>
      <div className="h-[300px]">
        {isLoading ? (
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
            {[...Array(3)].map((_, index) => (
              <JobCardSkeleton key={index} />
            ))}
          </div>
        ) : cvList.length > 0 ? (
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
            {cvList.map((item: any) => {
              item.level = levelList.find(itemLevel => itemLevel.value == item.jobLevel)?.label;
              item.workingForm = workingFormList.find(itemWork => itemWork.value == item.jobWorkingForm)?.label[locale];
              const status = cvStatusList.find(itemStatus => itemStatus.value == item.status);
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
                  <h3 className="mt-[20px] mx-[16px] font-[700] text-[18px] text-[#121212] text-center flex-1 whitespace-normal line-clamp-2">
                    {item.jobName}
                  </h3>
                  <div className="mt-[12px] text-center font-[400] text-[14px] text-black">
                    {t('company')} <span className="font-[700]">{item.companyName}</span>
                  </div>
                  <div className="mt-[6px] text-center font-[600] text-[16px] text-[#0088FF]">
                    {item.jobSalaryMin.toLocaleString('vi-VN')}$ - {item.jobSalaryMax.toLocaleString('vi-VN')}$
                  </div>
                  <div className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
                    <FaDev className="text-[16px]" /> {item.expertise}
                  </div>
                  <div className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
                    <FaUserTie className="text-[16px]" /> {item.level}
                  </div>
                  <div className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
                    <FaBriefcase className="text-[16px]" /> {item.workingForm}
                  </div>
                  <div
                    className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]"
                    style={{
                      color: status?.color
                    }}
                  >
                    <FaCircleCheck className="text-[16px]" /> {status?.label[locale]}
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-[8px] mt-[12px] mb-[20px]">
                    <button
                      onClick={() => handleViewCV(item)}
                      className="bg-[#0088FF] rounded-[4px] font-[400] text-[14px] text-white inline-block py-[8px] px-[20px]"
                    >
                      {t("view")}
                    </button>
                    {/* Popup */}
                    <PopupCV
                      isOpen={isPopupOpen}
                      onClose={() => setIsPopupOpen(false)}
                      item={selectedCV}
                    />
                    <ButtonDelete
                      api={`${process.env.NEXT_PUBLIC_API_URL}/user/cv/delete/${item.id}`}
                      item={item}
                      listKey={[`${process.env.NEXT_PUBLIC_API_URL}/user/cv/list?page=${currentPage}`]}  // listKey = useSWR([listKey],.....)
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