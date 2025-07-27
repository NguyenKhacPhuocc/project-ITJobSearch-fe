"use client"
import { useAuth } from "@/hooks/useAuth";
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

  return (
    <>

      <div className="inline-flex items-center gap-x-[5px] text-white  sm:text-[15px] text-[12px] relative group/sub-1">
        {isLogin ? (
          infoUser ? (
            <>
              {/* Đã đăng nhập dành cho ứng viên */}
              <Link href="/user-manage/profile" className="text-[15px]">{infoUser.fullName}</Link>
              <ul className="absolute top-[100%] right-[0px] w-[200px] bg-[#0D1B2A] hidden group-hover/sub-1:block z-[999]">
                <li className="flex items-center justify-between hover:bg-[#18324e] relative group/sub-2 transition-colors duration-200 ease-in-out">
                  <Link href="/user-manage/profile" className="py-[10px] px-[15px] w-full text-white text-[15px]">Thông tin cá nhân</Link>
                </li>
                <li className=" flex items-center justify-between hover:bg-[#18324e] relative group/sub-2 transition-colors duration-200 ease-in-out">
                  <Link href="/user-manage/cv/list" className="py-[10px] px-[15px] w-full text-white text-[15px]">CV đã gửi</Link>
                </li>
                <li
                  className="py-[10px] px-[15px] flex items-center justify-between hover:bg-[#18324e] relative group/sub-2 cursor-pointer transition-colors duration-200 ease-in-out"
                  onClick={() => handleLogout("/user/login")}
                >
                  Đăng xuất
                </li>
              </ul>
            </>
          ) : infoCompany ? (
            <>
              {/* Đã đăng nhập dành cho công ty */}
              <Link href="#" className="text-[15px]">{infoCompany.companyName}</Link>
              <ul className="absolute top-[100%] right-[0px] w-[200px] bg-[#0D1B2A] hidden group-hover/sub-1:block z-[999]">
                <li className="py-[10px] px-[15px] flex items-center justify-between hover:bg-[#18324e] relative group/sub-2 transition-colors duration-200 ease-in-out">
                  <Link href="" className="text-white text-[15px]">Thông tin công ty</Link>
                </li>
                <li className="py-[10px] px-[15px] flex items-center justify-between hover:bg-[#18324e] relative group/sub-2 transition-colors duration-200 ease-in-out">
                  <Link href="" className="text-white text-[15px]">Quản lý công việc</Link>
                </li>
                <li className="py-[10px] px-[15px] flex items-center justify-between hover:bg-[#18324e] relative group/sub-2 transition-colors duration-200 ease-in-out">
                  <Link href="" className="text-white text-[15px]">Quản lý CV</Link>
                </li>
                <li
                  className="py-[10px] px-[15px] flex items-center justify-between hover:bg-[#18324e] relative group/sub-2 cursor-pointer transition-colors duration-200 ease-in-out"
                  onClick={() => handleLogout("/company/login")}
                >
                  Đăng xuất
                </li>
              </ul>
            </>
          ) : null
        ) : (
          <>
            {/* Chưa đăng nhập */}
            <Link href="/user/login" className="">
              Đăng Nhập
            </Link>
            <span className="">/</span>
            <Link href="/user/register" className="">
              Đăng Ký
            </Link>
          </>
        )}
      </div>
    </>
  );
} 