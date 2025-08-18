/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useCities } from "@/hooks/useCities";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6"

interface MenuItem {
  name: string;
  link: string;
}

export const Section1 = () => {
  const { cities, loading, error } = useCities();
  const locale = useLocale();
  const t = useTranslations('Home');
  const router = useRouter();
  const [totalJob, setTotalJob] = useState(1);

  const menuList: MenuItem[] = [
    { name: "ReactJS", link: "/search?skill=ReactJS" },
    { name: "NodeJS", link: "/search?skill=NodeJS" },
    { name: "Python", link: "/search?skill=Python" },
    { name: "Java", link: "/search?skill=Java" },
    { name: "DevOps", link: "/search?skill=DevOps" },
    { name: "PHP", link: "/search?skill=PHP" },
    { name: "JavaScript", link: "/search?skill=JavaScript" },
    { name: "HTML5", link: "/search?skill=HTML5" },
  ];

  const handleSearch = (event: any) => {
    event.preventDefault();
    const city = event.target.city.value;
    const keysearch = event.target.keysearch.value;

    router.push(`/search?city=${city}&keysearch=${keysearch}`);
  }

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/total-job`, {
      method: "GET",
    })
      .then(res => res.json())
      .then(data => {
        if (data.code == "success") {
          setTotalJob(data.totalJob)
        }
      })
  }, [])

  return (
    <>
      <div className="bg-[linear-gradient(to_right,_#000000_0%,_#0D1B2A_60%,_#005E92_120%)] pt-[100px] py-[50px] mt-[-65px]">
        <div className="container mx-auto px-[16px]">
          <h1 className="text-white font-[700] text-[28px] text-center mb-[30px]">
            {totalJob} {t('title')}
          </h1>
          <form onSubmit={handleSearch} className="flex flex-wrap gap-x-[15px] gap-y-[12px] mb-[30px]">
            <select
              name="city"
              id="city"
              disabled={loading ? true : error ? true : false}
              aria-busy={loading} // tăng accessibility
              className="bg-white md:w-[200px] w-[100%] h-[56px] rounded-[4px] px-[20px] font-[500] text-[15px] text-[#121212]"
            >
              <option value="">{t('all-cities')}</option>
              {!loading && !error && cities.map((city: any) => (
                <option key={city._id} value={city.name[locale]}>
                  {locale === "vi" ? city.name.vi : city.name.en}
                </option>
              ))}
            </select>
            <input type="text" name="keysearch" id="keysearch" placeholder={t('search-placeholder')} className="md:flex-1 flex-none w-[100%] bg-white h-[56px] rounded-[4px] px-[20px] font-[500] text-[16px]" />
            <button
              className="relative overflow-hidden w-full md:w-[240px] h-[56px] rounded-[8px] font-semibold text-[16px] text-white inline-flex items-center justify-center shadow-md hover:shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-[1.03] group"
            >
              <span className="absolute inset-0 z-0 rounded-[8px] bg-gradient-to-r from-[#0F2027] via-[#005E92] to-[#0F2027] bg-[length:200%_100%] bg-left transition-all duration-300 ease-in-out group-hover:bg-right">
              </span>
              <span className="relative z-10 flex items-center">
                <FaMagnifyingGlass className="text-[20px] mr-[10px]" />
                {t('search-button')}
              </span>
            </button>
          </form>
          <div className="flex flex-wrap gap-x-[12px] gap-y-[15px] items-center">
            <div className="text-[#DEDEDE] font-[500] text-[16px]">
              {t('trending-searches')}
            </div>
            <div className="flex flex-wrap gap-[10px]">
              {menuList.map((item, index) => (
                <Link key={index} href={item.link} className="border border-[#414042] bg-[#121212] hover:bg-[#414042] rounded-[20px] inline-block text-[#DEDEDE] hover:text-white font-[500] text-[16px] py-[8px] px-[22px] transition-all duration-200 ease-in-out">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}