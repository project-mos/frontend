"use client";

import Card from "@/shared/components/atoms/Card";
import Tab from "@/shared/components/atoms/Tab";
import useDecodeToken from "@/shared/hooks/useDecodeToken";
import StudyList from "@/features/study/active-studies/ui/ActiveStudiesList";
import ApplyList from "@/features/study/apply-studies/ui/ApplyStudiesList";
import { useState } from "react";

const ActiveStudies = () => {
  const decoded = useDecodeToken();
  const userId = decoded?.id;

  const [selectedTabState, setSelectedTabState] =
    useState<string>("참여 중인 스터디");

  return (
    <Card className="col-span-12">
      <Card.Header className="mb-[20px]">
        <Tab
          tabList={["참여 중인 스터디", "지원 현황"]}
          selectedTab={selectedTabState}
          setSelectedTab={setSelectedTabState}
        />
      </Card.Header>
      <Card.Content>
        {selectedTabState === "참여 중인 스터디" && (
          <StudyList userId={userId!} />
        )}
        {selectedTabState === "지원 현황" && <ApplyList />}
      </Card.Content>
    </Card>
  );
};

export default ActiveStudies;
