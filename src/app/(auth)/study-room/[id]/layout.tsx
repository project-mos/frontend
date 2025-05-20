import React from "react";

import StudyRoomIntendedCard from "@/app/(auth)/study-room/components/layout/StudyRoomIntendedCard";
import StudyRoomSideBarCard from "@/app/(auth)/study-room/components/layout/StudyRoomSideBarCard";
import StudyRoomTitleCard from "@/app/(auth)/study-room/components/layout/StudyRoomTitleCard";
import ImportantNoticeBar from "@/app/(auth)/study-room/components/notice/ImportantNoticeBar";
import Grid from "@/shared/components/atoms/Grid";

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
