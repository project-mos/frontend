import { HTMLAttributes } from "react";

import Card from "@/shared/components/atoms/Card";
import Tag from "@/shared/components/atoms/Tag";
import Typography from "@/shared/components/atoms/Typography";
import Meta from "@/shared/components/molecules/Meta";
import { Study } from "@/features/landing/types/landing.api";
import CustomMdxRemote from "@/shared/components/system/CustomMdxRemote";

interface StudyCardProps extends HTMLAttributes<HTMLDivElement> {
  data: Study;
}

const StudyCard = ({ data, className, ...props }: StudyCardProps) => {
  // const content = data.content.slice(0, 50) + "...";
  return (
    <Card
      className={`flex w-[255px] cursor-pointer flex-col gap-5 ${
        className ?? ""
      }`}
      {...props}
    >
      <Card.Header className="flex-col gap-2">
        <div className="flex justify-between">
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

        <div className="flex flex-col gap-1">
          <Meta icon="calendar" className="text-sm text-black">
            {data.recruitmentEndDate} ~ {data.recruitmentEndDate}
          </Meta>
        </div>
      </Card.Header>
      <Card.Content className="">
        <div className="h-[50px] max-w-full truncate text-mos-gray-700">
          <CustomMdxRemote
            content={data.content}
            components={
              {
                // h1: (props) => <span role="" {...props} />,
                // h2: (props) => <span role="" {...props} />,
                // h3: (props) => <span role="" {...props} />,
                // h4: (props) => <span role="" {...props} />,
                // ul: (props) => <span role="" {...props} />,
              }
            }
          />
        </div>
      </Card.Content>
      <div className="flex flex-wrap gap-[5px]">
        {data.tags.map((tag, index) => (
          <Tag.Detail key={index}>#{tag}</Tag.Detail>
        ))}
      </div>
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
