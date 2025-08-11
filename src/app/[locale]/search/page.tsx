import { generateTranslatedMetadata } from "@/app/lib/generateMetadata";
import { SearchContent } from "./SearchContent";

// Hàm này chạy trên server, trước khi render
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; // Await params để lấy giá trị thực
  return generateTranslatedMetadata(locale, 'SearchPage');
}

export default function SearchPage() {
  return (
    <>
      {/* Kết quả tìm kiếm */}
      <div className="py-[60px]">
        <SearchContent />
      </div>
      {/* Hết Kết quả tìm kiếm */}
    </>
  )
}