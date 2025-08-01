import { CardJobItem } from "@/app/components/card/CardJobItem"
import { generateTranslatedMetadata } from "@/app/lib/generateMetadata";
import { useTranslations } from "next-intl";

// Hàm này chạy trên server, trước khi render
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; // Await params để lấy giá trị thực
  return generateTranslatedMetadata(locale, 'SearchPage');
}

export default function SearchPage() {
  const t = useTranslations('SearchPage');
  return (
    <>
      {/* Kết quả tìm kiếm */}
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">

          <h2 className="font-[700] text-[28px] text-[#121212] mb-[30px]">
            76 {t('jobs')} <span className="text-[#0088FF]">reactjs</span>
          </h2>

          <div
            className="bg-white rounded-[8px] py-[10px] px-[20px] mb-[30px] flex flex-wrap gap-[12px]"
            style={{
              boxShadow: "0px 4px 20px 0px #0000000F"
            }}
          >
            <select name="" className="border border-[#DEDEDE] rounded-[20px] h-[36px] px-[18px] font-[400] text-[16px] text-[#414042]">
              <option value="">{t('level.level')}</option>
              <option value="">{t('level.intern')}</option>
              <option value="">{t('level.fresher')}</option>
              <option value="">{t('level.junior')}</option>
              <option value="">{t('level.middle')}</option>
              <option value="">{t('level.senior')}</option>
              <option value="">{t('level.manager')}</option>
            </select>
            <select name="" className="border border-[#DEDEDE] rounded-[20px] h-[36px] px-[18px] font-[400] text-[16px] text-[#414042]">
              <option value="">{t('work-type.work-type')}</option>
              <option value="">{t('work-type.on-site')}</option>
              <option value="">{t('work-type.remote')}</option>
              <option value="">{t('work-type.flexible')}</option>
            </select>
          </div>

          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
            <CardJobItem />
          </div>

          <div className="mt-[30px]">
            <select name="" className="border border-[#DEDEDE] rounded-[8px] py-[12px] px-[18px] font-[400] text-[16px] text-[#414042] outline-none">
              <option value="">{t('page')} 1</option>
              <option value="">{t('page')} 2</option>
              <option value="">{t('page')} 3</option>
            </select>
          </div>

        </div>
      </div>
      {/* Hết Kết quả tìm kiếm */}
    </>
  )
}