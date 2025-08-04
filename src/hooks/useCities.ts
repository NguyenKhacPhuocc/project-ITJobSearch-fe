// hooks/useCities.ts
import useSWR from 'swr';

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
  });
  return res.json();
};

export const useCities = () => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/city/api/list`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
      dedupingInterval: 60000, // 60s chống gọi API trùng lặp
    }
  );

  return {
    cities: data?.cities || [],
    loading: isLoading,
    error: error ? error.message : null,
  };
};