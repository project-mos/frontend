import Grid from "@/components/atoms/Grid";
import DashboardIntendedCard from "@/features/studies/components/dashboard/DashboardIntendedCard";
import DashboardSideBarCard from "@/features/studies/components/dashboard/DashboardSideBarCard";
import DashboardTitleCard from "@/features/studies/components/dashboard/DashboardTitleCard";
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
