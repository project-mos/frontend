"use client";
import React from "react";

import Grid from "@/shared/components/atoms/Grid";
import Typography from "@/shared/components/atoms/Typography";

import LandingStudyCard from "./LandingStudyCard";

import {
  useHotStudies,
  useStudies,
} from "@/features/landing/services/landing.service";
import { GetStudiesRequest, Study } from "@/features/landing/types/landing.api";

interface LandingContentCards {
  searchParams: GetStudiesRequest;
}

const LandingContentCards = ({ searchParams }: LandingContentCards) => {
  const { data: studiesData } = useStudies(searchParams);
  const { data: hotStudiesData } = useHotStudies();
  const hasHotStudyData = hotStudiesData && hotStudiesData.length > 0;
  const hasStudiesData = studiesData && studiesData.studies.length > 0;

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
                <LandingStudyCard key={`${item.id}_${index}`} data={item} />
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
                <LandingStudyCard key={`${item.id}_${index}`} data={item} />
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

const LandingEmptyContents = ({ content }: { content: string }) => {
  return (
    <div className="col-span-4 flex h-80 w-full items-center justify-center border-none p-[15px] shadow-none">
      <Typography.Head2 className="text-mos-gray-700">
        {content}
      </Typography.Head2>
    </div>
  );
};
