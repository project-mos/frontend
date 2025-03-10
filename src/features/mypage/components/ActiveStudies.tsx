"use client";
import {
  MockActiveStudiesApiResult,
  MockApplyStatusApiResult,
} from "@/app/mock/api/mypage";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Tab from "@/components/atoms/Tab";
import Tag from "@/components/atoms/Tag";
import Typography from "@/components/atoms/Typography";
import Meta from "@/components/molecules/Meta";
import { activeStudiesProps, applyStatusProps } from "@/types/api/mypage";
import { useState } from "react";

const ActiveStudies = () => {
  const [selectedTab, setSelectedTab] = useState<string>("참여 중인 스터디");

  return (
    <Card className="col-span-12">
      <Card.Header className="mb-[20px]">
        <Tab
          tabList={["참여 중인 스터디", "지원 현황"]}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </Card.Header>
      <Card.Content>
        {selectedTab === "참여 중인 스터디" ? (
          <StudyList data={MockActiveStudiesApiResult} type="active" />
        ) : (
          <StudyList data={MockApplyStatusApiResult} type="apply" />
        )}
      </Card.Content>
    </Card>
  );
};

const StudyList = ({
  data,
  type,
}: {
  data: activeStudiesProps[] | applyStatusProps[];
  type: "active" | "apply";
}) => {
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
          className="mb-[20px] flex flex-col gap-[10px] rounded-[10px] border border-mos-gray-100 p-[20px] transition-colors duration-200 hover:border-mos-main-500"
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
          <div className="flex justify-between">
            <div className="flex items-center gap-[10px]">
              {"meta" in data ? (
                <>
                  <Meta icon="person">{data.meta.members}</Meta>
                  <span>•</span>
                  <Meta icon="calendar">{data.meta.nextMeeting}</Meta>
                </>
              ) : (
                <Typography.P3>지원일 : {data.date}</Typography.P3>
              )}
            </div>
            <div>
              <Button.Ghost color="Main" className="h-[30px] text-[14px]">
                {type === "active" ? "스터디룸 입장" : "상세보기"}
              </Button.Ghost>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ActiveStudies;
