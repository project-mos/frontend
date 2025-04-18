"use client";
import { useRouter } from "next/navigation";

import StudyCard from "@/app/studies/components/StudyCard";
import URL from "@/shared/constants/URL";
import { MockStudyCardApiResult } from "@/shared/mock/api/studies";

const LandingStudyCard = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center ">
      <StudyCard
        className="hover:shadow-2xs w-full transition  hover:border-mos-main-500"
        study={MockStudyCardApiResult.study}
        onClick={() => {
          router.push(`${URL.STUDY.DETAIL}/1`);
        }}
      />
    </div>
  );
};

export default LandingStudyCard;
