import ShareCard from "@/app/studies/components/ShareCard";
import StudyCurriculumCard from "@/app/studies/components/StudyCurriculumCard";
import StudyDescriptionCard from "@/app/studies/components/StudyDescriptionCard";
import StudyLeaderCard from "@/app/studies/components/StudyLeaderCard";
import Apply from "@/app/studies/components/applyStudy/Apply";

import { MockStudiesApiResult } from "@/shared/mock/api/studies";

const page = () => {
  return (
    <>
      <StudyDescriptionCard data={MockStudiesApiResult} />
      <div className="order-last col-span-12 flex flex-col gap-5 tablet:order-none tablet:col-span-4">
        <StudyLeaderCard />
        <ShareCard />
      </div>
      <StudyCurriculumCard />
      <Apply />
    </>
  );
};

export default page;
