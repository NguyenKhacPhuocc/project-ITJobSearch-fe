/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useCities.ts
"use client"
import { useEffect, useState } from "react";

export const useCities = () => {
  const [cities, setCities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/city/api/list`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setCities(data.cities);
      } catch (err) {
        setError("Failed to fetch cities: " + err);
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  return { cities, loading, error };
};