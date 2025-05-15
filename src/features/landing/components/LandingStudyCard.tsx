"use client";
import { useRouter } from "next/navigation";

import StudyCard from "@/app/studies/components/StudyCard";
import URL from "@/shared/constants/URL";
import { Study } from "@/shared/types/api/studies";
// import { MockStudyCardApiResult } from "@/shared/mock/api/studies";
interface LandingStudyCardProps {
  data: Study;
}

const LandingStudyCard = ({ data }: LandingStudyCardProps) => {
  const router = useRouter();
  return (
    <div className="flex justify-center ">
      <StudyCard
        className="hover:shadow-2xs w-full transition  hover:border-mos-main-500"
        data={data}
        onClick={() => {
          router.push(`${URL.STUDY.DETAIL(data.id)}`);
        }}
      />
    </div>
  );
};

export default LandingStudyCard;
