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
  return generateTranslatedMetadata(locale, 'CompanyManageJobCreatePage');
}

export default function CompanyManageJobCreatePage() {
  const t = useTranslations('CompanyManageJobCreatePage');
  return (
    <>
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">
          <div className="border border-[#DEDEDE] rounded-[8px] p-[20px]">
            <div className="flex flex-wrap gap-[20px] items-center justify-between mb-[20px]">
              <h1 className="sm:w-auto w-[100%] font-[700] text-[20px] text-black">
                {t('title')}
              </h1>
              <Link href="#" className="font-[400] text-[14px] text-[#0088FF] underline">
                {t('back-to-list')}
              </Link>
            </div>
            
            <form action="" className="grid sm:grid-cols-2 grid-cols-1 gap-x-[20px] gap-y-[15px]">
              <div className="sm:col-span-2">
                <label htmlFor="title" className="block font-[500] text-[14px] text-black mb-[5px]">
                  {t('job-title')} <span className="text-red-500 ml-[5px]">*</span>
                </label>
                <input 
                  type="text" 
                  name="" 
                  id="title" 
                  className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                />
              </div>
              <div className="">
                <label htmlFor="salaryMin" className="block font-[500] text-[14px] text-black mb-[5px]">
                  {t('salary-min')}
                </label>
                <input 
                  type="number" 
                  name="" 
                  id="salaryMin" 
                  className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                />
              </div>
              <div className="">
                <label htmlFor="salaryMax" className="block font-[500] text-[14px] text-black mb-[5px]">
                  {t('salary-max')}
                </label>
                <input 
                  type="number" 
                  name="" 
                  id="salaryMax" 
                  className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                />
              </div>
              <div className="">
                <label htmlFor="position" className="block font-[500] text-[14px] text-black mb-[5px]">
                  {t('position')} <span className="text-red-500 ml-[5px]">*</span>
                </label>
                <select 
                  name="" 
                  id="position" 
                  className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                >
                  <option value="">{t('positions.intern')}</option>
                  <option value="">{t('positions.fresher')}</option>
                  <option value="">{t('positions.junior')}</option>
                  <option value="">{t('positions.middle')}</option>
                  <option value="">{t('positions.senior')}</option>
                  <option value="">{t('positions.manager')}</option>
                </select>
              </div>
              <div className="">
                <label htmlFor="workingForm" className="block font-[500] text-[14px] text-black mb-[5px]">
                  {t('working-form')} <span className="text-red-500 ml-[5px]">*</span>
                </label>
                <select 
                  name="" 
                  id="workingForm" 
                  className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                >
                  <option value="">{t('working-forms.on-site')}</option>
                  <option value="">{t('working-forms.remote')}</option>
                  <option value="">{t('working-forms.flexible')}</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="technologies" className="block font-[500] text-[14px] text-black mb-[5px]">
                  {t('technologies')}
                </label>
                <input 
                  type="text" 
                  name="" 
                  id="technologies" 
                  className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="images" className="block font-[500] text-[14px] text-black mb-[5px]">
                  {t('images')} <span className="text-red-500 ml-[5px]">*</span>
                </label>
                <input 
                  type="file" 
                  name="" 
                  id="images" 
                  accept="image/*" 
                  multiple 
                  className=""
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block font-[500] text-[14px] text-black mb-[5px]">
                  {t('detail-description')}
                </label>
                <textarea 
                  name="" 
                  id="description" 
                  className="w-[100%] h-[350px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                ></textarea>
              </div>
              <div className="sm:col-span-2">
                <button className="bg-[#0088FF] rounded-[4px] h-[48px] px-[20px] font-[700] text-[16px] text-white">
                  {t('create-button')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}