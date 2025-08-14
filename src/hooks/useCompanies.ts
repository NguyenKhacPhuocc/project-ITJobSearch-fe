// hooks/useCompanies.ts
import useSWR from 'swr';

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
  });
  return res.json();
};

export const useCompanies = () => {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/company/api/list`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
      dedupingInterval: 60000, // 60s chống gọi API trùng lặp
    }
  );

  return {
    companies: data?.companies || [],
  };
};