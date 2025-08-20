/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useCities } from "@/hooks/useCities";
import { useLocale } from "next-intl";
import Link from "next/link";

export default function JobByCity() {
  const locale = useLocale();
  const { cities } = useCities();
  const cityList = cities.map((city: any) => ({
    name: city.name[locale],
    link: `/job/job-by-city/${(city.slug)}`
  }))

  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:gap-[20px] gap-x-[10px] gap-y-[20px]">
        {cityList.map((item: any, index: number) => (
          <Link href={item.link} className="hover:text-[#0088FF] p-[2px]" key={index}>
            {item.name}
          </Link>
        ))}
      </div>
    </>
  )
}