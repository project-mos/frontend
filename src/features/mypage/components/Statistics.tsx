import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";

const Statistics = () => {
  return (
    <Card>
      <Card.Header>
        <Typography.P1 className="text-[20px]">활동 통계</Typography.P1>
      </Card.Header>
      <Card.Content>
        <div className="flex gap-3 py-[40px]">
          <div className="flex w-[50%] flex-col items-center">
            <Typography.Head2>2</Typography.Head2>
            <Typography.P1 className="text-mos-gray-300">
              참여 스터디
            </Typography.P1>
          </div>
          <div className="flex w-[50%] flex-col items-center">
            <Typography.Head2>1</Typography.Head2>
            <Typography.P1 className="text-mos-gray-300">
              지원 현황
            </Typography.P1>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default Statistics;
