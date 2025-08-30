"use client";

import { useEffect } from "react";

export default function JobClickTracker({ slug }: { slug: string }) {
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/click/${slug}`, {
      method: "POST",
      credentials: "include", // cookie sẽ được gửi kèm
    }).catch(console.error);
  }, [slug]);

  return null; // không hiển thị gì
}
