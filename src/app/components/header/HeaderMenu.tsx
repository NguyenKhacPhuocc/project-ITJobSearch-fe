/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useAuth } from "@/hooks/useAuth";
import { useCities } from "@/hooks/useCities";
import { useCompanies } from "@/hooks/useCompanies";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";


interface MenuItem {
  name: string;
  link: string;
  isLogin?: boolean;
  children?: MenuItem[];
}

export const HeaderMenu = ({ showMenu }: { showMenu: boolean }) => {
  const { isLogin } = useAuth();
  const locale = useLocale();
  const { cities } = useCities();
  const { companies } = useCompanies();

  const t = useTranslations('HeaderMenu');

  const menuList: MenuItem[] = [
    {
      name: t('it-jobs'),
      link: "#",
      children: [
        {
          name: t('it-jobs-by-skill'),
          link: "#", // xem tất cả
          children: [
            { name: "ReactJS", link: "/search?skill=ReactJS" },
            { name: "NodeJS", link: "/search?skill=NodeJS" },
            { name: "Python", link: "/search?skill=Python" },
            { name: "Java", link: "/search?skill=Java" },
            { name: "DevOps", link: "/search?skill=DevOps" },
            { name: "PHP", link: "/search?skill=PHP" },
            { name: "JavaScript", link: "/search?skill=JavaScript" },
            { name: "HTML5", link: "/search?skill=HTML5" },
            { name: "Angular", link: "/search?skill=Angular" },
            { name: "VueJS", link: "/search?skill=VueJS" },
            { name: "C#", link: "/search?skill=CSharp" },
            { name: "C++", link: "/search?skill=Cpp" },
            { name: "Ruby", link: "/search?skill=Ruby" },
            { name: "Go", link: "/search?skill=Go" },
            { name: "Kotlin", link: "/search?skill=Kotlin" },
            { name: "Swift", link: "/search?skill=Swift" },
            { name: "TypeScript", link: "/search?skill=TypeScript" },
            { name: "Rust", link: "/search?skill=Rust" },
          ],
        },
        {
          name: t('it-jobs-by-expertise'),
          link: "#", // xem tất cả
          children: [
            { name: t('expertise.backend'), link: "/search?expertise=Backend" },
            { name: t('expertise.fullstack'), link: "/search?expertise=Fullstack" },
            { name: t('expertise.frontend'), link: "/search?expertise=Frontend" },
            { name: t('expertise.mobile'), link: "/search?expertise=Mobile" },
            { name: t('expertise.autotesting'), link: "/search?expertise=AutoTesting" },
            { name: t('expertise.devops'), link: "/search?expertise=DevOps" },
            { name: t('expertise.businessanalysis'), link: "/search?expertise=BusinessAnalysis" },
            { name: t('expertise.ai'), link: "/search?expertise=AI" },
            { name: t('expertise.management'), link: "/search?expertise=Management" },
            { name: t('expertise.testcoordinator'), link: "/search?expertise=TestCoordinator" },
            { name: t('expertise.systemadmin'), link: "/search?expertise=SystemAdmin" },
            { name: t('expertise.dataengineer'), link: "/search?expertise=DataEngineer" },
            { name: t('expertise.dataanalysis'), link: "/search?expertise=DataAnalysis" },
            { name: t('expertise.softwareengineer'), link: "/search?expertise=SoftwareEngineer" }
          ],
        },
        {
          name: t('it-jobs-by-city'),
          link: "#", // xem tất cả
          children: cities.map((city: any) => ({
            name: city.name[locale], // Lấy tên thành phố theo ngôn ngữ hiện tại
            link: `/search?city=${encodeURIComponent(city.name[locale])}` // Sử dụng tên tiếng Anh cho URL
          }))
        },
      ],
    },
    {
      name: t('top-it-companies'),
      link: "/company/list",
      children: companies.slice(0, 6).map((company: any) => ({  // hiển thị 5 
        name: company.companyName,
        link: `/company/detail/${company.slug}`
      }))
    },
    {
      name: t('employers'),
      link: "#",
      isLogin: false,
      children: [
        { name: t('login'), link: "/company/login" },
        { name: t('register'), link: "/company/register" },
      ],
    },
  ];

  return (
    <nav
      className={
        "lg:block " +
        (showMenu
          ? "fixed top-0 left-0 w-[280px] h-[100vh] z-[999] bg-[#0D1B2A] transition-all duration-500"
          : "hidden")
      }
    >
      <ul className="flex gap-x-[30px] flex-wrap">
        {menuList.map((menu, index) => (
          <li
            key={index}
            className={"inline-flex lg:w-auto w-full lg:justify-start justify-between p-[10px] items-center gap-x-[8px] relative group/sub-1 flex-wrap  " + (menu.isLogin !== undefined && menu.isLogin !== isLogin ? "hidden" : "")}
          >
            <Link
              href={menu.link}
              className="text-white  text-[16px] "
            >
              {menu.name}
            </Link>
            {menu.children && (
              <FaAngleDown className="text-white text-[16px] transition-transform duration-300 group-hover/sub-1:rotate-180" />
            )}
            {/* bg-[#0D1B2A] */}
            {menu.children && (
              <ul className="lg:absolute relative lg:top-full top-0 left-0 lg:w-[280px] w-full bg-black hidden group-hover/sub-1:block z-[999] ">
                {menu.children.map((menuSub1, indexSub1) => (
                  <li
                    key={indexSub1}
                    className=" flex items-center justify-between hover:bg-[#18324e] group/sub-2 flex-wrap "
                  >
                    <Link
                      href={menuSub1.link}
                      className="text-white font-medium text-[15px] w-[90%] py-[10px] px-[15px] "
                    >
                      {menuSub1.name}
                    </Link>
                    {menuSub1.children && (
                      <FaAngleRight className="text-white text-[16px] pr-[8px] transition-transform duration-200 group-hover/sub-2:translate-x-1 absolute right-1" />
                    )}

                    {menuSub1.children && (
                      <ul className={`lg:absolute relative top-0 lg:left-full left-0 bg-black  hidden group-hover/sub-2:block z-[999] transition-all duration-200 ease-in-out ${menuSub1.children.length > 5 ? 'lg:w-[560px]' : 'lg:w-[280px]'}`}>

                        {/* Kiểm tra nếu có nhiều hơn 5 items thì chia cột */}
                        {menuSub1.children.length > 5 ? (
                          <>
                            <div className="flex flex-wrap">
                              {/* Cột 1 - 5 items đầu */}
                              <div className="w-1/2">
                                {menuSub1.children.slice(0, 5).map((menuSub2, indexSub2) => (
                                  <li key={indexSub2} className="hover:bg-[#18324e]">
                                    <Link href={menuSub2.link} className="text-white font-medium text-[15px] block py-[10px] px-[15px]">
                                      {menuSub2.name}
                                    </Link>
                                  </li>
                                ))}
                              </div>

                              {/* Cột 2 - các items còn lại (tối đa 5 items) */}
                              <div className="w-1/2">
                                {menuSub1.children.slice(5, 10).map((menuSub2, indexSub2) => (
                                  <li key={indexSub2 + 5} className="hover:bg-[#18324e]">
                                    <Link href={menuSub2.link} className="text-white font-medium text-[15px] block py-[10px] px-[15px]">
                                      {menuSub2.name}
                                    </Link>
                                  </li>
                                ))}
                              </div>
                            </div>
                          </>
                        ) : (
                          // Hiển thị bình thường nếu có 5 items trở xuống
                          <>
                            {menuSub1.children.map((menuSub2, indexSub2) => (
                              <li key={indexSub2} className="hover:bg-[#18324e]">
                                <Link href={menuSub2.link} className="text-white font-medium text-[15px] block py-[10px] px-[15px]">
                                  {menuSub2.name}
                                </Link>
                              </li>
                            ))}
                          </>
                        )}
                        <div className="w-full border-t border-[#18324e]">
                          <li className="hover:bg-[#18324e]">
                            <Link href={menuSub1.link} className="text-blue-400 font-bold text-[15px] block py-[10px] px-[15px]">
                              {t('view-all')} ({menuSub1.children.length})
                            </Link>
                          </li>
                        </div>
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
