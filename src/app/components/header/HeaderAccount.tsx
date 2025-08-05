/* eslint-disable @next/next/no-img-element */
"use client"
import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const HeaderAccount = () => {

  const { isLogin, infoUser, infoCompany } = useAuth();
  const router = useRouter();

  const handleLogout = (linkRedirect: string) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.code === "success") {
          router.push(linkRedirect);
        } else {
          alert(data.message);
        }
      })
      .catch(error => console.error("Error:", error));
  };

  const t = useTranslations('HeaderAccount');

  return (
    <>

      <div className="inline-flex items-center gap-x-[5px] text-white  sm:text-[15px] text-[12px] relative group/sub-1">
        {isLogin ? (
          infoUser ? (
            <>
              {/* Đã đăng nhập dành cho ứng viên */}
              <Link href="/user-manage/profile" className="flex items-center gap-[8px]">
                <div className="w-[42px] h-[42px] relative rounded-full overflow-hidden group">
                  <img
                    src={infoUser.avatar}
                    alt={infoUser.fullName}
                    className="w-full h-full object-cover object-center transition-transform duration-200 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col ">
                  <div className="text-[15px]">{infoUser.fullName}</div>
                </div>
              </Link>
              <ul className="absolute top-[100%] right-[0px] w-[200px] bg-[#0D1B2A] hidden group-hover/sub-1:block z-[999]">
                <li className="flex items-center justify-between hover:bg-[#18324e] relative group/sub-2 transition-colors duration-200 ease-in-out">
                  <Link href="/user-manage/profile" className="py-[10px] px-[15px] w-full text-white text-[15px]">
                    {t('user-profile')}
                  </Link>
                </li>
                <li className=" flex items-center justify-between hover:bg-[#18324e] relative group/sub-2 transition-colors duration-200 ease-in-out">
                  <Link href="/user-manage/cv/list" className="py-[10px] px-[15px] w-full text-white text-[15px]">
                    {t('cv-submitted')}
                  </Link>
                </li>
                <li
                  className="py-[10px] px-[15px] flex items-center justify-between hover:bg-[#18324e] relative group/sub-2 cursor-pointer transition-colors duration-200 ease-in-out"
                  onClick={() => handleLogout("/user/login")}
                >
                  {t('logout')}
                </li>
              </ul>
            </>
          ) : infoCompany ? (
            <>
              {/* Đã đăng nhập dành cho công ty */}
              <Link href="/company-manage/profile" className="group flex items-center gap-[8px]">
                <div className="w-[42px] h-[42px] relative rounded-full overflow-hidden  bg-black">
                  <img
                    src={infoCompany.logo}
                    alt={infoCompany.companyName}
                    className="w-full h-full object-contain object-center transition-transform duration-200 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="text-[15px]  hidden md:block ">{infoCompany.companyName}</div>
                </div>
              </Link>
              <ul className="absolute top-[100%] right-[0px] w-[200px] bg-[#0D1B2A] hidden group-hover/sub-1:block z-[999]">
                <li className="flex items-center justify-between hover:bg-[#18324e] relative group/sub-2 transition-colors duration-200 ease-in-out">
                  <Link href="/company-manage/profile" className="text-white text-[15px] py-[10px] px-[15px] w-full">
                    {t('company-info')}
                  </Link>
                </li>
                <li className="flex items-center justify-between hover:bg-[#18324e] relative group/sub-2 transition-colors duration-200 ease-in-out">
                  <Link href="/company-manage/job/list" className="text-white text-[15px] py-[10px] px-[15px] w-full">
                    {t('job-management')}
                  </Link>
                </li>
                <li className="flex items-center justify-between hover:bg-[#18324e] relative group/sub-2 transition-colors duration-200 ease-in-out">
                  <Link href="/company-manage/cv/list" className="text-white text-[15px] py-[10px] px-[15px] w-full">
                    {t('cv-management')}
                  </Link>
                </li>
                <li
                  className="py-[10px] px-[15px] flex items-center justify-between hover:bg-[#18324e] relative group/sub-2 cursor-pointer transition-colors duration-200 ease-in-out"
                  onClick={() => handleLogout("/company/login")}
                >
                  {t('logout')}
                </li>
              </ul>
            </>
          ) : null
        ) : (
          <>
            {/* Chưa đăng nhập */}
            <Link href="/user/login" className="">
              {t('login')}
            </Link>
            <span className="">/</span>
            <Link href="/user/register" className="">
              {t('register')}
            </Link>
          </>
        )}
      </div>
    </>
  );
} 