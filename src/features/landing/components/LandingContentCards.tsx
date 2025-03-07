import { MockStudyCardApiResult } from "@/app/mock/api/studies";
import Grid from "@/components/atoms/Grid";
import Typography from "@/components/atoms/Typography";
import StudyCard from "@/features/studies/components/StudyCard";
import React from "react";

const LandingContentCards = () => {
  return (
    <div>
      <div className="w-full border">
        <div className="mb-3 flex items-center gap-3">
          <i className="bi bi-star-fill text-3xl text-yellow-400"></i>
          <Typography.Head3>인기 스터디</Typography.Head3>
        </div>
        <LandingGrid>
          <LandingStudyCard />
          <LandingStudyCard />
          <LandingStudyCard />
          <LandingStudyCard />
        </LandingGrid>
      </div>
      <div className="flex flex-col gap-3 border">
        <div className="flex items-center gap-3">
          <Typography.Head3>전체 스터디</Typography.Head3>
        </div>
        <LandingGrid>
          <LandingStudyCard />
          <LandingStudyCard />
          <LandingStudyCard />
          <LandingStudyCard />
          <LandingStudyCard />
          <LandingStudyCard />
          <LandingStudyCard />
          <LandingStudyCard />
          <LandingStudyCard />
        </LandingGrid>
      </div>
    </div>
  );
};

export default LandingContentCards;

const LandingGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid
      cols={1}
      gap={3}
      className="gap-y-4 mobile:grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4"
    >
      {children}
    </Grid>
  );
};

const LandingStudyCard = () => {
  return (
    <div className="flex justify-center ">
      <StudyCard
        className="hover:shadow-2xs w-full transition hover:-translate-y-1 hover:border-mos-main-500 hover:shadow-mos-main-500"
        study={MockStudyCardApiResult.study}
      />
    </div>
  );
};
