import { generateTranslatedMetadata } from "@/app/lib/generateMetadata";
import { ContentPage } from "./ContentPage";
import { skills } from "@/config/variable";

type Params = Promise<{ locale: string, slug: string }>
// Hàm này chạy trên server, trước khi render
export async function generateMetadata({
  params
}: {
  params: Params
}) {
  const { locale, slug } = await params; // Await params để lấy giá trị thực
  const skill = skills.find((c) => c.slug === slug);
  const skillName = skill?.name ?? slug.replace(/-/g, " ");

  return generateTranslatedMetadata(locale, 'JobBySkillPage', skillName);
}

export default async function JobBySkillDetailPage({ params }: {
  params: Params
}) {
  const { locale, slug } = await params;

  return (
    <>
      <div className="pt-[30px] pb-[60px]">
        <ContentPage slug={slug} locale={locale} />
      </div>
    </>
  )
}