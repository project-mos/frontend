import Grid from "@/components/atoms/Grid";
import DashboardIntendedCard from "@/features/study-room/components/dashboard/DashboardIntendedCard";
import DashboardSideBarCard from "@/features/study-room/components/dashboard/DashboardSideBarCard";
import DashboardTitleCard from "@/features/study-room/components/dashboard/DashboardTitleCard";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid cols={12} gap={5}>
      <DashboardTitleCard />
      <DashboardIntendedCard />
      <DashboardSideBarCard />
      {children}
    </Grid>
  );
};

export default layout;
