import { HTMLAttributes } from "react";
import Card from "@/components/atoms/Card";
import Tag from "@/components/atoms/Tag";
import Typography from "@/components/atoms/Typography";
import Meta from "@/components/molecules/Meta";
import { StudyCardInterface } from "@/types/api/studies/detail";

interface StudyCardProps
  extends StudyCardInterface,
    HTMLAttributes<HTMLDivElement> {}

const StudyCard = ({ study, className, ...props }: StudyCardProps) => {
  return (
    <Card className={`w-[255px] cursor-pointer ${className ?? ""}`} {...props}>
      <Card.Header className="flex-col">
        <div className="mb-[20px] flex justify-between">
          <div className="flex gap-[4.5px]">
            <Tag.Green bold>{study.category}</Tag.Green>
            <Tag.Blue bold>{study.type}</Tag.Blue>
          </div>
          {study.recruit ? (
            <Tag.Green bold border={false}>
              모집중
            </Tag.Green>
          ) : (
            <Tag.Gray bold border={false}>
              모집 완료
            </Tag.Gray>
          )}
        </div>
        <Typography.Head3>{study.title}</Typography.Head3>
        <Meta icon="calendar" className="text-[13px] text-red-500">
          마감: {study.deadline}
        </Meta>
      </Card.Header>
      <Card.Content>
        <Typography.P1 className="py-[20px] text-mos-gray-700">
          {study.contents}
        </Typography.P1>
        <div className="mb-[40px] flex flex-wrap gap-[5px]">
          {study.tags.map((tag, index) => (
            <Tag.Detail key={index}>#{tag}</Tag.Detail>
          ))}
        </div>
      </Card.Content>
      <Card.Footer className="flex justify-between">
        <div className="flex gap-1  text-mos-gray-300">
          <Meta icon="person">
            {study.members.current}/{study.members.max}명
          </Meta>
        </div>
        <div className="flex gap-1 text-mos-gray-300">
          <Meta icon="eye">{study.views}</Meta>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default StudyCard;
