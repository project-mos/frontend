import Card from "@/components/atoms/Card";
import Tag from "@/components/atoms/Tag";
import Typography from "@/components/atoms/Typography";

interface StudyCardProps {
  study: {
    title: string;
    contents: string;
    deadline: string;
    category: string;
    type: string;
    recruit: boolean;
    tags: string[];
    members: { current: number; max: number };
    views: number;
  };
}

const StudyCard = ({ study }: StudyCardProps) => {
  return (
    <Card className="w-[255px] cursor-pointer">
      <Card.Header className="flex-col">
        <div className="flex justify-between mb-[20px]">
          <div className="flex gap-[4.5px]">
            <Tag.Green>{study.category}</Tag.Green>
            <Tag.Blue>{study.type}</Tag.Blue>
          </div>
          {study.recruit ? (
            <Tag.Green border={false}>모집중</Tag.Green>
          ) : (
            <Tag.Gray border={false}>모집 완료</Tag.Gray>
          )}
        </div>
        <Typography.Head3>{study.title}</Typography.Head3>
        <div className="flex gap-1 text-[13px] text-red-500">
          <i className="bi bi-calendar" />
          <Typography.P1 className=" text-[13px]">
            마감: {study.deadline}
          </Typography.P1>
        </div>
      </Card.Header>
      <Card.Content>
        <Typography.P1 className="pt-[20px] pb-[20px] text-mos-gray-700">
          {study.contents}
        </Typography.P1>
        <div className="flex flex-wrap gap-[5px] mb-[40px]">
          {study.tags.map((tag, index) => (
            <Tag.Detail key={index}>#{tag}</Tag.Detail>
          ))}
        </div>
      </Card.Content>
      <Card.Footer className="flex justify-between">
        <div className="flex gap-1  text-mos-gray-300">
          <i className="bi bi-people text-[15px]" />
          <Typography.P1 className="text-[15px]">
            {study.members.current}/{study.members.max}명
          </Typography.P1>
        </div>
        <div className="flex gap-1 text-mos-gray-300">
          <i className="bi bi-eye text-[15px]" />
          <Typography.P1 className="text-[15px]">{study.views}</Typography.P1>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default StudyCard;
