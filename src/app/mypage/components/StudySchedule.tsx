import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";

import Calendar from "@/shared/components/molecules/Calendar";

const StudySchedule = () => {
  return (
    <Card className="col-span-12 tablet:col-span-8">
      <Card.Header>
        <Typography.P1 className="text-[20px]">스터디 일정</Typography.P1>
      </Card.Header>
      <Card.Content>
        <Calendar />
      </Card.Content>
    </Card>
  );
};

export default StudySchedule;
