/* eslint-disable @next/next/no-img-element */
import { FaLocationDot } from "react-icons/fa6"
import { CardJobItem } from "@/app/components/card/CardJobItem"
import { useTranslations } from "next-intl"
import { generateTranslatedMetadata } from "@/app/lib/generateMetadata";

// Hàm này chạy trên server, trước khi render
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params; // Await params để lấy giá trị thực
  return generateTranslatedMetadata(locale, 'CompanyDetailPage');
}

export default function CompanyDetailPage() {
  const t = useTranslations('CompanyDetailPage');
  return (
    <>
      <div className="pt-[30px] pb-[60px]">
        <div className="container mx-auto px-[16px]">

          {/* Thông tin công ty */}
          <div className="border border-[#DEDEDE] rounded-[8px] p-[20px]">
            <div className="flex flex-wrap items-center gap-[16px] mb-[20px]">
              <div className="w-[100px]">
                <img 
                  src="/assets/images/demo-cong-ty-2.jpg" 
                  alt="LG CNS Việt Nam" 
                  className="w-[100%] aspect-square object-cover rounded-[4px]"
                />
              </div>
              <div className="sm:flex-1">
                <h1 className="font-[700] text-[28px] text-[#121212] mb-[10px]">
                  LG CNS Việt Nam
                </h1>
                <div className="flex items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
                  <FaLocationDot className="text-[16px]" /> Tầng 15, tòa Keangnam Landmark 72, Mễ Trì, Nam Tu Liem, Ha Noi
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <div className="font-[400] text-[16px] text-[#A6A6A6]">
                {t('company-model')}
                <span className="text-[#121212]">
                  Sản phẩm
                </span>
              </div>
              <div className="font-[400] text-[16px] text-[#A6A6A6]">
                {t('company-size')}
                <span className="text-[#121212]">
                  151 - 300 nhân viên
                </span>
              </div>
              <div className="font-[400] text-[16px] text-[#A6A6A6]">
                {t('working-time')}
                <span className="text-[#121212]">
                  Thứ 2 - Thứ 6
                </span>
              </div>
              <div className="font-[400] text-[16px] text-[#A6A6A6]">
                {t('overtime')}
                <span className="text-[#121212]">
                  Không có OT
                </span>
              </div>
            </div>
          </div>
          {/* Hết Thông tin công ty */}

          {/* Mô tả chi tiết */}
          <div className="border border-[#DEDEDE] rounded-[8px] p-[20px] mt-[20px]">
            {t('detailed-description')}
          </div>
          {/* Hết Mô tả chi tiết */}

          {/* Việc làm */}
          <div className="mt-[30px]">
            <h2 className="font-[700] text-[28px] text-[#121212] mb-[20px]">
              {t('pre-jobs')} 6 {t('post-jobs')}
            </h2>
      
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
              <CardJobItem />
            </div>
          </div>
          {/* Hết Việc làm */}

        </div>
      </div>
    </>
  )
}