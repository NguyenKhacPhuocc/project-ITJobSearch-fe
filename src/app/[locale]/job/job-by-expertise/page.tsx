import { generateTranslatedMetadata } from "@/app/lib/generateMetadata";
import { useTranslations } from "next-intl";
import JobByExpertise from "./JobByExpertise";

// Hàm này chạy trên server, trước khi render
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; // Await params để lấy giá trị thực
  return generateTranslatedMetadata(locale, 'JobByExpertisePage');
}

export default function JobByExpertisePage() {
  const tt = useTranslations('JobByExpertisePage');

  return (
    <>
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">
          <h2 className="font-[700] sm:text-[28px] text-[24px] text-[#121212] mb-[15px]">
            {tt('title')}
          </h2>
          <hr className="mb-[30px] border" />
          <JobByExpertise />
        </div>
      </div>
    </>
  )
}