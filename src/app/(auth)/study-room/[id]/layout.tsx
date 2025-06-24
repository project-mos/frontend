import React from "react";

import ImportantNoticeBar from "@/entities/study/notice/ui/ImportantNoticeBar";
import { getStudy } from "@/features/studies/services/studies.service";
import StudyRoomIntendedCard from "@/features/study-room/component/StudyRoomIntendedCard";
import StudyRoomSideBarCard from "@/features/study-room/component/StudyRoomSideBarCard";
import StudyRoomTitleCard from "@/features/study-room/component/StudyRoomTitleCard";
import Grid from "@/shared/components/atoms/Grid";

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
