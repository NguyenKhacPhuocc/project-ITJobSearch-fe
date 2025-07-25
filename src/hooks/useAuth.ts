/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [infoUser, setInfoUser] = useState<any>("");
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
          setInfoUser(data.infoUser);
        } else {
          setIsLogin(false);
        }
      });
  }, [pathname]);

  return {
    isLogin,
    infoUser,
  };
}