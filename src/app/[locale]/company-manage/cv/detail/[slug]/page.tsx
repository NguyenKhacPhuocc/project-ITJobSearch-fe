import { generateTranslatedMetadata } from "@/app/lib/generateMetadata";
import { useTranslations } from "next-intl";
import Link from "next/link"

// Hàm này chạy trên server, trước khi render
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params; // Await params để lấy giá trị thực
  return generateTranslatedMetadata(locale, 'CompanyManageCVDetailPage');
}

export default function CompanyManageCVDetailPage() {
  const t = useTranslations('CompanyManageCVDetailPage')
  return (
    <>
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">
          {/* Thông tin CV */}
          <div className="border border-[#DEDEDE] rounded-[8px] p-[20px]">
            <div className="flex flex-wrap gap-[20px] items-center justify-between mb-[20px]">
              <h2 className="sm:w-auto w-[100%] font-[700] text-[20px] text-black">
                {t('cv-information')}
              </h2>
              <Link href="#" className="font-[400] text-[14px] text-[#0088FF] underline">
                {t('back-to-list')}
              </Link>
            </div>
            
            <div className="font-[400] text-[16px] text-black mb-[10px]">
              {t('full-name')}
              <span className="font-[700]">
                Lê Văn A
              </span>
            </div>
            <div className="font-[400] text-[16px] text-black mb-[10px]">
              {t('email')}
              <span className="font-[700]">
                levana@gmail.com
              </span>
            </div>
            <div className="font-[400] text-[16px] text-black mb-[10px]">
              {t('phone-number')}
              <span className="font-[700]">
                0123456789
              </span>
            </div>
            <div className="font-[400] text-[16px] text-black mb-[10px]">
              {t('cv-file')}
            </div>
            <div className="bg-[#D9D9D9] h-[736px]">
              {/* Preview File CV dạng PDF tại đây */}
            </div>
          </div>
          {/* Hết Thông tin CV */}
          
          {/* Thông tin công việc */}
          <div className="border border-[#DEDEDE] rounded-[8px] p-[20px] mt-[20px]">
            <h2 className="sm:w-auto w-[100%] font-[700] text-[20px] text-black mb-[20px]">
              {t('job-information')}
            </h2>

            <div className="font-[400] text-[16px] text-black mb-[10px]">
              {t('job-title')}
              <span className="font-[700]">
                Frontend Engineer (ReactJS)
              </span>
            </div>
            <div className="font-[400] text-[16px] text-black mb-[10px]">
              {t('salary')}
              <span className="font-[700]">
                1.000$ - 1.500$
              </span>
            </div>
            <div className="font-[400] text-[16px] text-black mb-[10px]">
              {t('level')}
              <span className="font-[700]">
                Fresher
              </span>
            </div>
            <div className="font-[400] text-[16px] text-black mb-[10px]">
              {t('work-type')}
              <span className="font-[700]">
                Tại văn phòng
              </span>
            </div>
            <div className="font-[400] text-[16px] text-black mb-[10px]">
              {t('technology')}
              <span className="font-[700]">
                HTML5, CSS3, Javascript, ReactJS
              </span>
            </div>
            <Link href="#" className="font-[400] text-[14px] text-[#0088FF] underline">
              {t('view-job-details')}
            </Link>
          </div>
          {/* Hết Thông tin công việc */}
        </div>
      </div>
    </>
  )
}