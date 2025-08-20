/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateTranslatedMetadata } from "@/app/lib/generateMetadata";
import { skills } from "@/config/variable";
import { useTranslations } from "next-intl";
import Link from "next/link";

// Hàm này chạy trên server, trước khi render
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; // Await params để lấy giá trị thực
  return generateTranslatedMetadata(locale, 'JobBySkillPage');
}

export default function JobBySkillPage() {
  const t = useTranslations('JobBySkillPage');
  const skillList = skills.map((skill: any) => ({
      name: skill.name,
      link: `/job/job-by-skill/${(skill.slug)}`
    }))

  return (
    <>
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">
          <h2 className="font-[700] sm:text-[28px] text-[24px] text-[#121212] mb-[15px]">
            {t('title')}
          </h2>
          <hr className="mb-[30px] border" />
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:gap-[20px] gap-x-[10px] gap-y-[20px]">
            {skillList.map((item, index) => (
              <Link href={item.link} className="hover:text-[#0088FF] p-[2px]" key={index}>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}