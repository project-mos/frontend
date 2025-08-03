import Typography from "@/shared/components/atoms/Typography";

import StudyLandingCard from "@/features/study/landing/ui/StudyLandingCard";
import LandingGrid from "@/widget/landing/ui/LandingGrid";
import LandingEmptyContents from "@/widget/landing/ui/LandingEmptyContents";
import { Study } from "@/entities/study/studies/api/studies.api.type";
import { LandingContentCardsProps } from "@/widget/landing/ui/landing.ui.types";

const LandingContentCards = ({
  studiesData,
  hotStudiesData,
}: LandingContentCardsProps) => {
  const hasHotStudyData = hotStudiesData && hotStudiesData.length > 0;
  const hasStudiesData = studiesData && studiesData.studies.length > 0;

  const studyIds = studiesData.studies.map((item) => item.id);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="mb-3 flex items-center gap-3">
          <i className="bi bi-star-fill text-3xl text-yellow-400"></i>
          <Typography.Head3>인기 스터디</Typography.Head3>
        </div>
        <LandingGrid>
          {/* 인기 */}
          {hasHotStudyData ? (
            hotStudiesData.map((item: Study, index: number) => {
              return (
                <StudyLandingCard
                  key={`${item.id}_${index}`}
                  data={item}
                  studyIds={studyIds}
                />
              );
            })
          ) : (
            <LandingEmptyContents content="인기 스터디가 없습니다." />
          )}
        </LandingGrid>
      </div>
      <div className="flex flex-col gap-3" id="landing-content-cards">
        <div className="flex items-center gap-3">
          <i className="bi bi-star-fill text-3xl text-yellow-400" />
          <Typography.Head3>전체 스터디</Typography.Head3>
        </div>
        <LandingGrid>
          {/* 일반 작성글 */}
          {hasStudiesData ? (
            studiesData.studies.map((item: Study, index) => {
              return (
                <StudyLandingCard
                  key={`${item.id}_${index}`}
                  data={item}
                  studyIds={studyIds}
                />
              );
            })
          ) : (
            <LandingEmptyContents content="등록된 스터디가 없습니다." />
          )}
        </LandingGrid>
      </div>
    </div>
  );
};

export default LandingContentCards;
