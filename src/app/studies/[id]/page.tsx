import StudyCurriculumCard from "@/app/studies/components/StudyCurriculumCard";
import StudyDescriptionCard from "@/app/studies/components/StudyDescriptionCard";
import Apply from "@/app/studies/components/applyStudy/Apply";
import LandingLoginToast from "@/features/landing/components/LandingLoginToast";
import {
  getBenefits,
  getCurriculums,
  getMembers,
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
  const membersData = await getMembers(id);

  return (
    <>
      <LandingLoginToast />
      <StudyDescriptionCard
        studyDetailData={studyDetailData}
        requirementsData={requirementsData}
        rulesData={rulesData}
        benefitsData={benefitsData}
        membersData={membersData}
      />
      <StudyCurriculumCard data={curriculumsData} />
      <Apply data={studyDetailData} />
    </>
  );
};

export default page;
