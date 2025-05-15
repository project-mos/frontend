"use client";
import React from "react";

import Grid from "@/shared/components/atoms/Grid";
import Typography from "@/shared/components/atoms/Typography";

import LandingStudyCard from "./LandingStudyCard";

import { GetStudiesRequest } from "@/shared/types/api/studies";
import {
  useHotStudies,
  useStudies,
} from "@/features/landing/services/landing.service";

interface LandingContentCards {
  searchParams: GetStudiesRequest;
}

const LandingContentCards = ({ searchParams }: LandingContentCards) => {
  const { data: studiesData } = useStudies(searchParams);
  const { data: hotStudiesData } = useHotStudies();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="mb-3 flex items-center gap-3">
          <i className="bi bi-star-fill text-3xl text-yellow-400"></i>
          <Typography.Head3>인기 스터디</Typography.Head3>
        </div>
        <LandingGrid>
          {/* 인기 */}
          {hotStudiesData &&
            hotStudiesData.map((item, index) => {
              return (
                <LandingStudyCard key={`${item.id}_${index}`} data={item} />
              );
            })}
        </LandingGrid>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <i className="bi bi-star-fill text-3xl text-yellow-400" />
          <Typography.Head3>전체 스터디</Typography.Head3>
        </div>
        <LandingGrid>
          {/* 일반 작성글 */}
          {studiesData &&
            studiesData.studies.map((item, index) => {
              return (
                <LandingStudyCard key={`${item.id}_${index}`} data={item} />
              );
            })}
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
