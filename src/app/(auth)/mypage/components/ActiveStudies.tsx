"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Card from "@/shared/components/atoms/Card";
import Tab from "@/shared/components/atoms/Tab";
import Tag from "@/shared/components/atoms/Tag";
import Typography from "@/shared/components/atoms/Typography";
import Meta from "@/shared/components/molecules/Meta";

import URL from "@/shared/constants/URL";
import {
  MockActiveStudiesApiResult,
  MockApplyStatusApiResult,
} from "@/shared/mock/api/mypage";
import {
  activeStudiesProps,
  applyStatusProps,
} from "@/shared/types/api/mypage";

const ActiveStudies = () => {
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
        {selectedTabState === "참여 중인 스터디" ? (
          <StudyList data={MockActiveStudiesApiResult} />
        ) : (
          <StudyList data={MockApplyStatusApiResult} />
        )}
      </Card.Content>
    </Card>
  );
};

const StudyList = ({
  data,
}: {
  data: activeStudiesProps[] | applyStatusProps[];
}) => {
  const router = useRouter();

  const tagColors: Record<string, keyof typeof Tag> = {
    스터디장: "Green",
    스터디원: "Blue",
    검토중: "Pink",
    승인됨: "Gray",
  };

  return (
    <>
      {data.map((data) => (
        <div
          key={data.title}
          className="mb-[20px] flex cursor-pointer flex-col gap-[10px] rounded-[10px] border border-mos-gray-100 p-[20px] transition-colors duration-200 hover:border-mos-main-500 active:bg-gray-50"
          onClick={() => router.push(URL.STUDY_ROOM.DETAIL_SCHEDULE("1"))}
        >
          <div className="flex justify-between">
            {data.tag.map((tag) => {
              const TagComponent = Tag[tagColors[tag] || "Green"]; // 기본값 "Green"
              return (
                <TagComponent border={true} key={tag}>
                  {tag}
                </TagComponent>
              );
            })}
          </div>
          <Typography.Head3 className="text-[20px]">
            {data.title}
          </Typography.Head3>
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-[10px]">
              {"meta" in data ? (
                <div className="flex flex-col gap-1 mobile:flex-row">
                  <Meta icon="person">{data.meta.members}</Meta>
                  <span className="hidden mobile:inline-block">•</span>
                  <Meta icon="calendar">{data.meta.nextMeeting}</Meta>
                </div>
              ) : (
                <Typography.P3>지원일 : {data.date}</Typography.P3>
              )}
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

export default ActiveStudies;
