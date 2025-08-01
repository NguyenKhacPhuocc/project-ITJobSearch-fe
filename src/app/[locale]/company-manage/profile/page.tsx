import { generateTranslatedMetadata } from "@/app/lib/generateMetadata";
import { useTranslations } from "next-intl";

// Hàm này chạy trên server, trước khi render
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; // Await params để lấy giá trị thực
  return generateTranslatedMetadata(locale, 'CompanyManageProfilePage');
}

export default function CompanyManageProfilePage() {
  const t = useTranslations('CompanyManageProfilePage');
  return (
    <>
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">
          <div className="border border-[#DEDEDE] rounded-[8px] p-[20px]">
            <h1 className="font-[700] text-[20px] text-black mb-[20px]">
              {t('company-info')}
            </h1>
            <form action="" className="grid sm:grid-cols-2 grid-cols-1 gap-x-[20px] gap-y-[15px]">
              <div className="sm:col-span-2">
                <label htmlFor="companyName" className="block font-[500] text-[14px] text-black mb-[5px]">
                  {t('company-name')} <span className="text-red-500 ml-[5px]">*</span>
                </label>
                <input 
                  type="text" 
                  name="" 
                  id="companyName" 
                  className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" 
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="logo" className="block font-[500] text-[14px] text-black mb-[5px]">
                  {t('company-logo')}
                </label>
                <input 
                  type="file" 
                  name="" 
                  id="logo" 
                  accept="image/*" 
                  className="" 
                />
              </div>
              <div className="">
                <label htmlFor="city" className="block font-[500] text-[14px] text-black mb-[5px]">
                  {t('company-city')}
                </label>
                <select 
                  name="" 
                  id="city" 
                  className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                >
                  <option value="">Hà Nội</option>
                  <option value="">Đà Nẵng</option>
                  <option value="">Hồ Chí Minh</option>
                </select>
              </div>
              <div className="">
                <label htmlFor="address" className="block font-[500] text-[14px] text-black mb-[5px]">
                  {t('company-address')}
                </label>
                <input 
                  type="text" 
                  name="" 
                  id="address" 
                  className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                />
              </div>
              <div className="">
                <label htmlFor="companyModel" className="block font-[500] text-[14px] text-black mb-[5px]">
                  {t('company-model')}
                </label>
                <input 
                  type="text" 
                  name="" 
                  id="companyModel" 
                  className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                />
              </div>
              <div className="">
                <label htmlFor="companyEmployees" className="block font-[500] text-[14px] text-black mb-[5px]">
                  {t('company-size')}
                </label>
                <input 
                  type="text" 
                  name="" 
                  id="companyEmployees" 
                  className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                />
              </div>
              <div className="">
                <label htmlFor="workingTime" className="block font-[500] text-[14px] text-black mb-[5px]">
                  {t('company-worktime')}
                </label>
                <input 
                  type="text" 
                  name="" 
                  id="workingTime" 
                  className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                />
              </div>
              <div className="">
                <label htmlFor="WorkOvertime" className="block font-[500] text-[14px] text-black mb-[5px]">
                  {t('company-worktime-ot')}
                </label>
                <input 
                  type="text" 
                  name="" 
                  id="WorkOvertime" 
                  className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                />
              </div>
              <div className="">
                <label htmlFor="email" className="block font-[500] text-[14px] text-black mb-[5px]">
                  {t('company-email')} <span className="text-red-500 ml-[5px]">*</span>
                </label>
                <input 
                  type="email" 
                  name="" 
                  id="email" 
                  className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                />
              </div>
              <div className="">
                <label htmlFor="phone" className="block font-[500] text-[14px] text-black mb-[5px]">
                  {t('company-phone')}
                </label>
                <input 
                  type="text" 
                  name="" 
                  id="phone" 
                  className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block font-[500] text-[14px] text-black mb-[5px]">
                  {t('company-detail-description')}
                </label>
                <textarea 
                  name="" 
                  id="description" 
                  className="w-[100%] h-[350px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                ></textarea>
              </div>
              <div className="sm:col-span-2">
                <button className="bg-[#0088FF] rounded-[4px] h-[48px] px-[20px] font-[700] text-[16px] text-white">
                  {t('update')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}