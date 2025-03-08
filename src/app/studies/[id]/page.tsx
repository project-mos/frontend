import ShareCard from "@/features/studies/components/ShareCard";
import StudyLeaderCard from "@/features/studies/components/StudyLeaderCard";
import { MockStudiesApiResult } from "@/app/mock/api/studies";
import StudyDescriptionCard from "@/features/studies/components/StudyDescriptionCard";
import React from "react";
import StudyCurriculumCard from "@/features/studies/components/StudyCurriculumCard";
import Apply from "@/features/studies/components/applyStudy/Apply";

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
