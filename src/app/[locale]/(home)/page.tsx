import Link from "next/link";
import { FaMagnifyingGlass } from "react-icons/fa6"
import { CardCompanyItem } from "@/app/components/card/CardCompanyItem"
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Home');

  return (
    <>
      {/* Section 1 */}
      <div className="bg-[linear-gradient(to_right,_#000000_0%,_#0D1B2A_60%,_#005E92_120%)] pt-[100px] py-[50px] mt-[-65px]">
        <div className="container mx-auto px-[16px]">
          <h1 className="text-white font-[700] text-[28px] text-center mb-[30px]">
            923 {t('title')}
          </h1>
          <form action="" className="flex flex-wrap gap-x-[15px] gap-y-[12px] mb-[30px]">
            <select name="" className="bg-white md:w-[200px] w-[100%] h-[56px] rounded-[4px] px-[20px] font-[500] text-[15px] text-[#121212]">
              <option value="">{t('all-cities')}</option>
              <option value="">{t('hanoi')}</option>
              <option value="">{t('danang')}</option>
              <option value="">{t('ho-chi-minh')}</option>
              <option value="">{t('other')}</option>
            </select>
            <input type="text" name="" placeholder={t('search-placeholder')} className="md:flex-1 flex-none w-[100%] bg-white h-[56px] rounded-[4px] px-[20px] font-[500] text-[16px]" />
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
              <Link href="#" className="border border-[#414042] bg-[#121212] hover:bg-[#414042] rounded-[20px] inline-block text-[#DEDEDE] hover:text-white font-[500] text-[16px] py-[8px] px-[22px] transition-all duration-200 ease-in-out">
                ReactJS
              </Link>
              <Link href="#" className="border border-[#414042] bg-[#121212] hover:bg-[#414042] rounded-[20px] inline-block text-[#DEDEDE] hover:text-white font-[500] text-[16px] py-[8px] px-[22px] transition-all duration-200 ease-in-out">
                Javascript
              </Link>
              <Link href="#" className="border border-[#414042] bg-[#121212] hover:bg-[#414042] rounded-[20px] inline-block text-[#DEDEDE] hover:text-white font-[500] text-[16px] py-[8px] px-[22px] transition-all duration-200 ease-in-out">
                NodeJS
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* End Section 1 */}

      {/* Section 2 */}
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">
          <h2 className="font-[700] sm:text-[28px] text-[24px] text-[#121212] text-center mb-[30px]">
            {t('top-company')}
          </h2>
          {/* Wrap */}
          <div className="grid lg:grid-cols-3 grid-cols-2 sm:gap-[20px] gap-x-[10px] gap-y-[20px]">
            {/* Item */}
            <CardCompanyItem />
          </div>
        </div>
      </div>
      {/* End Section 2 */}
    </>
  );
}