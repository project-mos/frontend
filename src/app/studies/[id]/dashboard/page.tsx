import React from "react";
import DashboardIntendedCard from "@/features/studies/components/dashboard/DashboardIntendedCard";
import DashboardTitleCard from "@/features/studies/components/dashboard/DashboardTitleCard";
import DashboardSideBarCard from "@/features/studies/components/dashboard/DashboardSideBarCard";

import DashboardContentCard from "@/features/studies/components/dashboard/DashboardContentCard";

const StudiesDashBoardPage = () => {
  return (
    <>
      <DashboardTitleCard />
      <DashboardIntendedCard />
      <DashboardSideBarCard />
      <DashboardContentCard />
    </>
  );
};

export default StudiesDashBoardPage;
