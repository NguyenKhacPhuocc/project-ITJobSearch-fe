/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import { levelList, workingFormList } from "@/config/variable";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import useSWR from "swr";
import { FaBriefcase, FaDev, FaLocationDot, FaUserTie } from "react-icons/fa6";

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

  const { data, error, isLoading } = useSWR(
    [`${process.env.NEXT_PUBLIC_API_URL}/company/job/list`, locale],
    ([url, locale]) => fetcher(url, locale),
    {
      dedupingInterval: 5000,
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading jobs.</div>;

  const jobList = data?.code === "success" ? data.jobList : [];

  return (
    <>
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
                <Link href="#" className="bg-[#FFB200] rounded-[4px] font-[400] text-[14px] text-black inline-block py-[8px] px-[20px]">
                  {t('edit-job')}
                </Link>
                <Link href="#" className="bg-[#FF0000] rounded-[4px] font-[400] text-[14px] text-white inline-block py-[8px] px-[20px]">
                  {t('delete-job')}
                </Link>
              </div>
            </div>
          )
        })}

      </div>
    </>
  )
}