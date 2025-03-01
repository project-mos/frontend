import ShareCard from "@/features/studies-detail/components/ShareCard";
import StudyLeaderCard from "@/features/studies-detail/components/StudyLeaderCard";
import { MockStudiesApiResult } from "@/app/mock/api/studies";
import StudyDescriptionCard from "@/features/studies/components/StudyDescriptionCard";
import React from "react";
import StudyCurriculumCard from "@/features/studies/components/StudyCurriculumCard";

const page = () => {
  return (
    <>
      <StudyDescriptionCard data={MockStudiesApiResult} />
      <div className="col-span-4 flex flex-col gap-5">
        <StudyLeaderCard />
        <ShareCard />
      </div>
      <StudyCurriculumCard />
    </>
  );
};

export default page;
