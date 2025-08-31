import { RecommendedJob } from "./RecommendedJob";
import { Section1 } from "./Section-1";
import { Section2 } from "./Section-2";

export default function Home() {

  return (
    <>
      {/* Section 1 */}
      <Section1 />
      {/* End Section 1 */}

      <RecommendedJob />

      {/* Section 2 */}
      <Section2 />
      {/* End Section 2 */}
    </>
  );
}