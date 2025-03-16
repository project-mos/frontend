import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";

const ScheduleCard = () => {
  return (
    <Card className="col-span-12 h-fit gap-3 tablet:col-span-10">
      <Card.Header className="flex-col justify-between gap-3">
        <div className="flex justify-between">
          <Typography.SubTitle1>스터디 일정</Typography.SubTitle1>
          <Button.Solid color="Main" active>
            <i className="bi bi-plus text-2xl" />
            일정추가
          </Button.Solid>
        </div>
      </Card.Header>
      <Card.Content className="gap-3">
        <Card className="col-span-12 gap-1 shadow-none tablet:col-span-10">
          <Card.Header className="justify-between">
            <div className="flex gap-1">
              <Badge color="Blue">
                <i className="bi bi-calendar3 mr-1"></i>
                2024-02-25
              </Badge>
              <Badge color="Gray">
                <i className="bi bi-clock mr-1"></i>
                20:00 - 22:00
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button.Icon color="Blue">
                <i className="bi bi-pencil"></i>
              </Button.Icon>
              <Button.Icon color="Red">
                <i className="bi bi-trash"></i>
              </Button.Icon>
            </div>
          </Card.Header>
          <Card.Content>
            <Typography.SubTitle1>알고리즘 기초 - 정렬</Typography.SubTitle1>
          </Card.Content>
          <Card.Footer>
            <Typography.P3 className="text-mos-gray-300">
              버블 정렬, 선택 정렬, 삽입 정렬에 대해 학습합니다.
            </Typography.P3>
          </Card.Footer>
        </Card>
      </Card.Content>
    </Card>
  );
};

export default ScheduleCard;
