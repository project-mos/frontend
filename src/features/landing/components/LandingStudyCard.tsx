"use client";
import { MockStudyCardApiResult } from "@/app/mock/api/studies";
import StudyCard from "@/features/studies/components/StudyCard";
import { useRouter } from "next/navigation";

import React from "react";

const LandingStudyCard = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center ">
      <StudyCard
        className="hover:shadow-2xs w-full transition  hover:border-mos-main-500"
        study={MockStudyCardApiResult.study}
        onClick={() => {
          // 추후 라우터 constant예정
          router.push("/studies/1");
        }}
      />
    </div>
  );
};

export default LandingStudyCard;
