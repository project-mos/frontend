"use client";

import { useEffect, useState } from "react";

import Card from "@/shared/components/atoms/Card";
import Tab from "@/shared/components/atoms/Tab";

import {
  useGetMyApplyStatus,
  useGetMyJoinedStudies,
} from "@/entities/study/join/model/join.query";
import StudyList from "@/features/study/active-studies/ui/ActiveStudiesList";
import ApplyList from "@/features/study/apply-studies/ui/ApplyStudiesList";
import LikeStudyList from "@/features/study/like-studies/LikeStudyList";
import useDecodeToken from "@/shared/hooks/useDecodeToken";
import { useApplyStatusStore } from "@/shared/store/useApplyStatusStore";
import { useMyJoinedStudyStore } from "@/shared/store/useMyJoinedStudyStore";

const ActiveStudies = () => {
  const decoded = useDecodeToken();
  const userId = decoded?.id;

  const [selectedTabState, setSelectedTabState] =
    useState<string>("참여 중인 스터디");
  const setAllApplyStatus = useApplyStatusStore(
    (state) => state.setAllApplyStatus
  );
  const setMyJoinedStudiesData = useMyJoinedStudyStore(
    (state) => state.setMyJoinedStudiesData
  );

  // 참여 중인 스터디 조회
  const { data: myJoinedStudiesData } = useGetMyJoinedStudies(userId!);

  // 나의 지원 현황 조회
  const { data: myApplyStatusData } = useGetMyApplyStatus();

  useEffect(() => {
    if (myApplyStatusData && setAllApplyStatus) {
      setAllApplyStatus(myApplyStatusData);
    }
  }, [myApplyStatusData, setAllApplyStatus]);

  useEffect(() => {
    if (myJoinedStudiesData) {
      setMyJoinedStudiesData(myJoinedStudiesData);
    }
  }, [myJoinedStudiesData, setMyJoinedStudiesData]);

  return (
    <Card className="col-span-12">
      <Card.Header className="mb-[20px]">
        <Tab
          tabList={["좋아요 누른 스터디", "참여 중인 스터디", "지원 현황"]}
          selectedTab={selectedTabState}
          setSelectedTab={setSelectedTabState}
        />
      </Card.Header>
      <Card.Content>
        {selectedTabState === "좋아요 누른 스터디" && <LikeStudyList />}
        {selectedTabState === "참여 중인 스터디" && (
          <StudyList userId={userId!} />
        )}
        {selectedTabState === "지원 현황" && <ApplyList />}
      </Card.Content>
    </Card>
  );
};

export default ActiveStudies;
