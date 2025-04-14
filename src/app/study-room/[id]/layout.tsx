import React from "react";
import Grid from "@/components/atoms/Grid";
import StudyRoomIntendedCard from "@/features/study-room/components/layout/StudyRoomIntendedCard";
import StudyRoomSideBarCard from "@/features/study-room/components/layout/StudyRoomSideBarCard";
import StudyRoomTitleCard from "@/features/study-room/components/layout/StudyRoomTitleCard";
import ImportantNoticeBar from "@/features/study-room/components/notice/ImportantNoticeBar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ImportantNoticeBar />
      <Grid cols={12} gap={5}>
        <StudyRoomTitleCard />
        <StudyRoomIntendedCard />
        <StudyRoomSideBarCard />
        {children}
      </Grid>
    </>
  );
};

export default layout;
