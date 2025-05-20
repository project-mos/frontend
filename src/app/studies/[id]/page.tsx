import ShareCard from "@/app/studies/components/ShareCard";
import StudyCurriculumCard from "@/app/studies/components/StudyCurriculumCard";
import StudyDescriptionCard from "@/app/studies/components/StudyDescriptionCard";
import StudyLeaderCard from "@/app/studies/components/StudyLeaderCard";
import Apply from "@/app/studies/components/applyStudy/Apply";
import {
  getBenefits,
  getCurriculums,
  getRequirements,
  getRules,
  getStudy,
} from "@/features/studies/services/studies.service";

// import { MockStudiesApiResult } from "@/shared/mock/api/studies";

interface StudyDetailPageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: StudyDetailPageProps) => {
  const { id } = await params;
  const studyDetailData = await getStudy(id);
  const requirementsData = await getRequirements(id);
  const rulesData = await getRules(id);
  const benefitsData = await getBenefits(id);
  const curriculumsData = await getCurriculums(id);

  return (
    <>
      <StudyDescriptionCard
        studyDetailData={studyDetailData}
        requirementsData={requirementsData}
        rulesData={rulesData}
        benefitsData={benefitsData}
      />
      <div className="order-last col-span-12 flex flex-col gap-5 tablet:order-none tablet:col-span-4">
        <StudyLeaderCard />
        <ShareCard />
      </div>
      <StudyCurriculumCard data={curriculumsData} />
      <Apply />
    </>
  );
};

export default page;
