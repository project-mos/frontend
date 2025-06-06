"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Card from "@/shared/components/atoms/Card";
import Tab from "@/shared/components/atoms/Tab";
import Tag from "@/shared/components/atoms/Tag";
import Typography from "@/shared/components/atoms/Typography";
import Meta from "@/shared/components/molecules/Meta";

import URL from "@/shared/constants/URL";
import {
  GetMyApplyStatusResult,
  GetMyJoinedStudiesResult,
} from "@/shared/types/api/mypage";
import { useQuery } from "@tanstack/react-query";
import {
  myApplyStatusQueryOption,
  myJoinedStudiesQueryOption,
} from "@/features/mypage/services/mypage.service";
import { useApplyStatusStore } from "@/shared/store/useApplyStatusStore";
import { useTokenStore } from "@/shared/store/authStore";
import useDecodeToken from "@/shared/hooks/useDecodeToken";

const tagColors: Record<string, keyof typeof Tag> = {
  스터디장: "Green",
  스터디원: "Blue",
  검토중: "Pink",
  승인됨: "Gray",
  대기: "Green",
  승낙: "Blue",
  탈락: "Gray",
  취소: "Pink",
};

const StudyList = ({ data }: { data: GetMyJoinedStudiesResult[] }) => {
  const router = useRouter();

  if (data.length === 0) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <Typography.P3>참여중인 스터디가 없습니다.</Typography.P3>
      </div>
    );
  }
  return (
    <>
      {data.map((data) => (
        <div
          key={data.id}
          className="mb-[20px] flex cursor-pointer flex-col gap-[10px] rounded-[10px] border border-mos-gray-100 p-[20px] transition-colors duration-200 hover:border-mos-main-500 active:bg-gray-50"
          onClick={() =>
            router.push(URL.STUDY_ROOM.DETAIL_SCHEDULE(`${data.id}`))
          }
        >
          <div className="flex justify-between">
            {/* 왼쪽에 배치할 태그 */}
            <div className="flex gap-2">
              {data.tags
                .filter((tag) => tag !== "스터디장" && tag !== "스터디원")
                .map((tag) => {
                  const TagComponent = Tag[tagColors[tag] || "Green"]; // 기본값 "Green"
                  return (
                    <TagComponent border={true} key={tag}>
                      {tag}
                    </TagComponent>
                  );
                })}
            </div>

            {/* 오른쪽에 배치할 태그 */}
            <div className="flex gap-2">
              {data.tags
                .filter((tag) => tag === "스터디장" || tag === "스터디원")
                .map((tag) => {
                  const TagComponent = Tag[tagColors[tag] || "Green"]; // 기본값 "Green"
                  return (
                    <TagComponent border={true} key={tag}>
                      {tag}
                    </TagComponent>
                  );
                })}
            </div>
          </div>
          <Typography.Head3 className="text-[20px]">
            {data.title}
          </Typography.Head3>
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-[10px]">
              <div className="flex flex-col gap-1 mobile:flex-row">
                <Meta icon="person">
                  {data.currentStudyMembers} / {data.maxStudyMembers}
                </Meta>
                <span className="hidden mobile:inline-block">
                  &nbsp;•&nbsp;
                </span>
                <Meta icon="calendar">{data.schedule}</Meta>
              </div>
            </div>
            <div className="flex items-center ">
              <i className="bi bi-chevron-right text-xl text-mos-gray-500"></i>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

const ApplyList = ({ data }: { data: GetMyApplyStatusResult[] }) => {
  const router = useRouter();

  if (data.length === 0) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <Typography.P3>지원중인 스터디가 없습니다.</Typography.P3>
      </div>
    );
  }
  return (
    <>
      {data.map((data) => {
        const statusTagMapping =
          data.studyJoinStatus === "PENDING" ? "검토중" : data.studyJoinStatus;
        // 동적으로 Tag 컴포넌트 선택
        const CategoryTagComponent = Tag[tagColors[data.category] || "Green"];
        const StatusTagComponent =
          Tag[tagColors[data.studyJoinStatus] || "Green"];

        return (
          <div
            key={data.studyId}
            className="mb-[20px] flex cursor-pointer flex-col gap-[10px] rounded-[10px] border border-mos-gray-100 p-[20px] transition-colors duration-200 hover:border-mos-main-500 active:bg-gray-50"
            onClick={() =>
              router.push(URL.STUDY_ROOM.DETAIL_SCHEDULE(`${data.studyId}`))
            }
          >
            <div className="flex justify-between">
              {/* 카테고리 태그 */}
              <CategoryTagComponent border={true} key={data.category}>
                {data.category}
              </CategoryTagComponent>
              {/* 스터디 상태 태그 */}
              <StatusTagComponent border={true} key={data.studyJoinStatus}>
                {statusTagMapping}
              </StatusTagComponent>
            </div>
            <Typography.Head3 className="text-[20px]">
              {data.title}
            </Typography.Head3>
            <div className="flex items-end justify-between">
              <div className="flex items-center gap-[10px]">
                <Typography.P3>
                  지원일 : {data.createdAt.split("T")[0]}
                </Typography.P3>
              </div>
              <div className="flex items-center ">
                <i className="bi bi-chevron-right text-xl text-mos-gray-500"></i>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

const ActiveStudies = () => {
  const { accessToken } = useTokenStore();
  const decoded = useDecodeToken(accessToken);
  const userId = decoded?.id;

  const [selectedTabState, setSelectedTabState] =
    useState<string>("참여 중인 스터디");
  const setAllApplyStatus = useApplyStatusStore(
    (state) => state.setAllApplyStatus
  );

  // 참여 중인 스터디 조회
  const { data: myJoinedStudiesData } = useQuery(
    myJoinedStudiesQueryOption(accessToken, userId)
  );

  // 나의 지원 현황 조회
  const { data: myApplyStatusData } = useQuery(
    myApplyStatusQueryOption(accessToken)
  );

  useEffect(() => {
    if (myApplyStatusData && setAllApplyStatus) {
      setAllApplyStatus(myApplyStatusData);
    }
  }, [myApplyStatusData, setAllApplyStatus]);

  useEffect(() => {
    if (myJoinedStudiesData) {
      localStorage.setItem(
        "JoinedStudiesNumber",
        myJoinedStudiesData.length.toString()
      );
    }
  }, [myJoinedStudiesData]);

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
          <StudyList data={myJoinedStudiesData ?? []} />
        )}
        {selectedTabState === "지원 현황" && (
          <ApplyList data={myApplyStatusData ?? []} />
        )}
      </Card.Content>
    </Card>
  );
};

export default ActiveStudies;
