import { Study } from "@/features/landing/types/landing.api";
import StudyCard from "@/features/studies/components/StudyCard";
import URL from "@/shared/constants/URL";
import Link from "next/link";

interface LandingStudyCardProps {
  data: Study;
}

const LandingStudyCard = ({ data }: LandingStudyCardProps) => {
  return (
    <Link
      href={`${URL.STUDY.DETAIL(data.id)}`}
      className="flex justify-center "
    >
      <StudyCard
        className="hover:shadow-2xs w-full transition  hover:border-mos-main-500"
        data={data}
      />
    </Link>
  );
};

export default LandingStudyCard;
