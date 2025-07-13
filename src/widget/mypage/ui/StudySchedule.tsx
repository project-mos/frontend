import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";

import Calendar from "@/widget/mypage/ui/Calendar";
import CreateScheduleButton from "./CreateScheduleButton";

const StudySchedule = () => {
  return (
    <Card className="col-span-12 tablet:col-span-8">
      <Card.Header className="flex items-center justify-between">
        <Typography.P1 className="text-[20px]">스터디 일정</Typography.P1>
        <CreateScheduleButton />
      </Card.Header>
      <Card.Content>
        <Calendar />
      </Card.Content>
    </Card>
  );
};

export default StudySchedule;
