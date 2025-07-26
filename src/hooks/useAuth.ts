/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [info, setInfo] = useState<any>(null); // có thể là user hoặc company
  const pathname = usePathname(); // lấy đường dẫn hiện tại

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/check-login`, {
      method: "GET",
      credentials: "include", // gửi cookie từ backend
    })
      .then(res => res.json())
      .then(data => {
        if (data.code === "success") {
          setIsLogin(true);
          setInfo(data.info); // info chứa cả role
          console.log("success")
        } else {
          setIsLogin(false);
          setInfo(null);
          console.log("error")
        }
      });
  }, [pathname]);

  return {
    isLogin,
    infoUser: info?.role === "user" ? info : null,
    infoCompany: info?.role === "company" ? info : null,
  };
}