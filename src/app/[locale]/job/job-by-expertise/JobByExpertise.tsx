/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { expertises } from "@/config/variable";
import { useLocale } from "next-intl";
import Link from "next/link";

export default function JobByExpertise() {
  const locale = useLocale();
  const expertisesList = expertises.map((expertise: any) => ({
    name: expertise.name[locale],
    link: `/job/job-by-expertise/${(expertise.slug[locale])}`
  }))

  return (
    <>
      <div className="grid lg:grid-cols-3 grid-cols-2 sm:gap-[20px] gap-x-[10px] gap-y-[20px]">
        {expertisesList.map((item, index) => (
          <Link href={item.link} className="hover:text-[#0088FF] p-[2px]" key={index}>
            {item.name}
          </Link>
        ))}
      </div>
    </>
  )
}