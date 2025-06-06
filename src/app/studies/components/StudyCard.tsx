import { HTMLAttributes } from "react";

import Card from "@/shared/components/atoms/Card";
import Tag from "@/shared/components/atoms/Tag";
import Typography from "@/shared/components/atoms/Typography";
import Meta from "@/shared/components/molecules/Meta";
import { Study } from "@/features/landing/types/landing.api";

interface StudyCardProps extends HTMLAttributes<HTMLDivElement> {
  data: Study;
}

const StudyCard = ({ data, className, ...props }: StudyCardProps) => {
  return (
    <Card
      className={`flex w-[255px] cursor-pointer flex-col gap-7 ${
        className ?? ""
      }`}
      {...props}
    >
      <Card.Header className="flex-col">
        <div className="mb-[20px] flex justify-between">
          <div className="flex gap-[4.5px]">
            <Tag.Green bold>{data.category}</Tag.Green>
            <Tag.Blue bold>{data.meetingType}</Tag.Blue>
          </div>
          {data.recruitmentStatus === "모집 중" ? (
            <Tag.Green bold border={false}>
              모집중
            </Tag.Green>
          ) : (
            <Tag.Gray bold border={false}>
              모집 완료
            </Tag.Gray>
          )}
        </div>
        <Typography.Head3 className="truncate">{data.title}</Typography.Head3>
        <div className="mt-1">
          <Meta icon="calendar" className="text-[13px] text-red-500">
            마감: {data.recruitmentEndDate}
          </Meta>
        </div>
      </Card.Header>
      <Card.Content>
        {/* <Typography.P1 className="py-[20px] text-mos-gray-700">
          {data.contents}
        </Typography.P1> */}
        <div className="mb-[40px] flex flex-wrap gap-[5px]">
          {data.tags.map((tag, index) => (
            <Tag.Detail key={index}>#{tag}</Tag.Detail>
          ))}
        </div>
      </Card.Content>
      <Card.Footer className="flex justify-between">
        <div className="flex gap-1  text-mos-gray-300">
          <Meta icon="person">
            {data.currentStudyMembers}/{data.maxStudyMembers}명
          </Meta>
        </div>
        <div className="flex gap-1 text-mos-gray-300">
          <Meta icon="eye">{data.viewCount}</Meta>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default StudyCard;
