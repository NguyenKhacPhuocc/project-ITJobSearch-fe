import Home from "./(home)/page";
import { generateTranslatedMetadata } from "../lib/generateMetadata";

// Hàm này chạy trên server, trước khi render
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; // Await params để lấy giá trị thực
  return generateTranslatedMetadata(locale, 'HomePage');
}

// mặc định đây là trang home
export default function HomePage() {
  return (
    <Home />
  );
}