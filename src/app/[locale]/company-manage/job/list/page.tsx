/* eslint-disable @next/next/no-img-element */
import { generateTranslatedMetadata } from "@/app/lib/generateMetadata";
import { useTranslations } from "next-intl";
import Link from "next/link"
import { FaBriefcase, FaLocationDot, FaUserTie } from "react-icons/fa6"


// Hàm này chạy trên server, trước khi render
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params; // Await params để lấy giá trị thực
  return generateTranslatedMetadata(locale, 'CompanyManageJobListPage');
}

export default function CompanyManageJobListPage() {
  const t = useTranslations('CompanyManageJobListPage');
  return (
    <>
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">
          
        <div className="flex flex-wrap gap-[20px] items-center justify-between mb-[20px]">
          <h2 className="font-[700] sm:text-[28px] text-[24px] sm:w-auto w-[100%] text-[#121212]">
            {t('management-job')}
          </h2>
          <Link href="#" className="bg-[#0088FF] rounded-[4px] font-[400] text-[14px] text-white inline-block py-[8px] px-[20px]">
            {t('create-new-job')}
          </Link>
        </div>

          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
            <div 
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
                  src="/assets/images/demo-cong-ty-1.png" 
                  alt="Frontend Engineer (ReactJS)"
                  className="w-[100%] h-[100%] object-contain"
                />
              </div>
              <h3 className="mt-[20px] mx-[16px] font-[700] text-[18px] text-[#121212] text-center flex-1 whitespace-normal line-clamp-2">
                Frontend Engineer (ReactJS)
              </h3>
              <div className="mt-[6px] text-center font-[400] text-[14px] text-[#121212]">
                LG CNS Việt Nam
              </div>
              <div className="mt-[12px] text-center font-[600] text-[16px] text-[#0088FF]">
                1.000$ - 1.500$
              </div>
              <div className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
                <FaUserTie className="text-[16px]" /> Fresher
              </div>
              <div className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
                <FaBriefcase className="text-[16px]" /> Tại văn phòng
              </div>
              <div className="mt-[6px] flex justify-center items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
                <FaLocationDot className="text-[16px]" /> Ha Noi
              </div>
              <div className="mt-[12px] mb-[20px] mx-[16px] flex flex-wrap justify-center gap-[8px]">
                <div className="border border-[#DEDEDE] rounded-[20px] py-[6px] px-[16px] font-[400] text-[12px] text-[#414042]">
                  ReactJS
                </div>
                <div className="border border-[#DEDEDE] rounded-[20px] py-[6px] px-[16px] font-[400] text-[12px] text-[#414042]">
                  NextJS
                </div>
                <div className="border border-[#DEDEDE] rounded-[20px] py-[6px] px-[16px] font-[400] text-[12px] text-[#414042]">
                  Javascript
                </div>
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
          </div>

          <div className="mt-[30px]">
            <select name="" className="border border-[#DEDEDE] rounded-[8px] py-[12px] px-[18px] font-[400] text-[16px] text-[#414042]">
              <option value="">{t('page')} 1</option>
              <option value="">{t('page')} 2</option>
              <option value="">{t('page')} 3</option>
            </select>
          </div>

        </div>
      </div>
    </>
  )
}