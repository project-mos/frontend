import LandingLoginToast from "@/widget/landing/ui/LandingLoginToast";
import {
  getBenefits,
  getCurriculums,
  getMembers,
  getRequirements,
  getRules,
  getStudy,
} from "@/features/studies/services/studies.service";
import StudyDescriptionCard from "@/widget/studies/ui/StudiesDescriptionCard";
import StudyCurriculumCard from "@/widget/studies/ui/StudiesCurriculumCard";
import StudyApplicationSection from "@/features/study/study-application/ui/StudyApplicationSection";

// import { MockStudiesApiResult } from "@/shared/mock/api/studies";

interface StudyDetailPageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: StudyDetailPageProps) => {
  const { id } = await params;
  const studyDetailData = await getStudy(id);
  const requirementsData = await getRequirements(id);
  const rulesData = await getRules(Number(id));
  const benefitsData = await getBenefits(id);
  const curriculumsData = await getCurriculums(Number(id));
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
      <StudyApplicationSection data={studyDetailData} />
    </>
  );
};

export default page;
