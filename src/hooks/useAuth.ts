import useSWR, { mutate } from 'swr';
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    method: "GET",
    credentials: "include"
  });
  const data = await res.json();

  if (data.code === "success") {
    console.log("check login: success");
  } else {
    console.log("check login: error");
  }

  return data;
};

export const useAuth = () => {
  const pathname = usePathname();
  const lastPathname = useRef(pathname);

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/check-login`,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      shouldRetryOnError: false,
      dedupingInterval: 5000, // Chống gọi API trùng lặp trong 5s
      refreshInterval: 1000000  // refresh sau 1000s
    }
  );

  // Thêm effect để force revalidate khi pathname thay đổi
  useEffect(() => {
    // Chỉ revalidate khi pathname THỰC SỰ thay đổi
    if (pathname !== lastPathname.current) {
      lastPathname.current = pathname;
      mutate(`${process.env.NEXT_PUBLIC_API_URL}/auth/check-login`);
    }
  }, [pathname]);
  const isLogin = data?.code === "success";
  const info = isLogin ? data.info : null;

  return {
    isLogin,
    infoUser: info?.role === "user" ? info : null,
    infoCompany: info?.role === "company" ? info : null,
    isLoading: !data && !error
  };
}