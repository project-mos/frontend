import Card from "@/components/atoms/Card";
import Input from "@/components/atoms/Input";
import Typography from "@/components/atoms/Typography";

const ApplyFormCard = () => {
  return (
    <Card className="h-auto w-full">
      <Card.Header className="mb-[15px]">
        <Typography.SubTitle1>지원양식</Typography.SubTitle1>
      </Card.Header>

      <Card.Content>
        <div className="mb-[10px]">
          <Typography.P3 className="mb-[5px]">
            스터디를 지원하게 된 동기
          </Typography.P3>
          <Input className="h-[80px] w-full" />
        </div>
        <div className="mb-[10px]">
          <Typography.P3 className="mb-[5px]">
            관련 경험 및 보유 기술
          </Typography.P3>
          <Input className="w-full" />
        </div>
        <div className="mb-[10px]">
          <Typography.P3 className="mb-[5px]">
            스터디를 통해 이루고 싶은 목표
          </Typography.P3>
          <Input className="w-full" />
        </div>
      </Card.Content>

      <Card.Footer>
        <div className="flex w-full gap-2"></div>
      </Card.Footer>
    </Card>
  );
};

export default ApplyFormCard;
