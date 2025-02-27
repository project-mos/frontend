import Card from "@/components/atoms/Card";
import Tag from "@/components/atoms/Tag";
import Typography from "@/components/atoms/Typography";

const StudyCard = () => {
  return (
    <Card className="w-[255px]">
      <Card.Header className="flex-col">
        <div className="flex">
          <Tag.Green>어학</Tag.Green>
          <Tag.Blue>비대면</Tag.Blue>
          <Tag.Green border={false}>모집중</Tag.Green>
        </div>
        <Typography.Head3>스프링부트 심화 스터디</Typography.Head3>
        <Typography.P1 className="text-red-500 text-[13px]">
          마감: 2024-03-27
        </Typography.P1>
      </Card.Header>
      <Card.Content>
        <Typography.P1>
          글은 최대 2줄까지 보이게 2줄을 넘어가면 ...으로 표기
        </Typography.P1>
        <div className="flex flex-wrap gap-[5px]">
          <Tag.Detail>#Next.js</Tag.Detail>
          <Tag.Detail>#코딩테스트</Tag.Detail>
          <Tag.Detail>#Python</Tag.Detail>
          <Tag.Detail>#Next</Tag.Detail>
          <Tag.Detail>#알고리즘</Tag.Detail>
        </div>
      </Card.Content>
      <Card.Footer>
        <div>
          <Typography.P1>4/5명</Typography.P1>
        </div>
        <div>
          <Typography.P1>678명</Typography.P1>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default StudyCard;
