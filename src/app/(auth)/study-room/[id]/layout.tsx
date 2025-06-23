import React from "react";

import StudyRoomIntendedCard from "@/app/(auth)/study-room/components/layout/StudyRoomIntendedCard";
import StudyRoomSideBarCard from "@/app/(auth)/study-room/components/layout/StudyRoomSideBarCard";
import StudyRoomTitleCard from "@/app/(auth)/study-room/components/layout/StudyRoomTitleCard";
import Grid from "@/shared/components/atoms/Grid";
import { getStudy } from "@/features/studies/services/studies.service";
import ImportantNoticeBar from "@/entities/study/notice/ui/ImportantNoticeBar";

interface StudyRoomLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

const layout = async ({ children, params }: StudyRoomLayoutProps) => {
  const { id } = await params;
  const studyDetailData = await getStudy(id);

  return (
    <>
      <ImportantNoticeBar />
      <Grid cols={12} gap={5}>
        <StudyRoomTitleCard data={studyDetailData} />
        <StudyRoomIntendedCard />
        <StudyRoomSideBarCard />
        {children}
      </Grid>
    </>
  );
};

export default layout;
