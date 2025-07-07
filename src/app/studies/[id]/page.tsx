import { getCurriculum } from "@/entities/study/curriculum/api/curriculum.api";
import { getMembers } from "@/entities/study/member/api/member.api";
import { getBenefits } from "@/entities/study/overview/api/benefits.api";
import { getRules } from "@/entities/study/overview/api/rules.api";
import { getRequirements } from "@/entities/study/requirement/api/requirement.api";
import { getStudy } from "@/entities/study/studies/api/studies.api";
import StudyApplicationSection from "@/features/study/study-application/ui/StudyApplicationSection";
import LandingLoginToast from "@/widget/landing/ui/LandingLoginToast";
import StudyCurriculumCard from "@/widget/studies/ui/StudiesCurriculumCard";
import StudyDescriptionCard from "@/widget/studies/ui/StudiesDescriptionCard";

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
  const curriculumsData = await getCurriculum(Number(id));
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
