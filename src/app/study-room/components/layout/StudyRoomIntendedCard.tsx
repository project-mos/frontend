import React from "react";
import StudyRoomSessionCard from "./StudyRoomSessionCard";

import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";
import { MockStudyScheduleApiResult } from "@/shared/mock/api/studies";

const StudyRoomIntendedCard = () => {
  return (
    // 진행중인 일정같은 경우는 없다면 예정된 일정 중 가장 빠른걸로 보여준다.
    // 미리 출석(스터디 시작하고 15분 후에는 지각이고, 스터디 시작 전 15분에는 미리출석가능)
    <Card className="col-span-12 gap-2 tablet:col-span-4">
      <Card.Header className="flex justify-between">
        <Typography.SubTitle1>진행중인 스터디 일정</Typography.SubTitle1>
        <Button.Solid color="Green" active size="sm">
          <i className="bi bi-person-check text-[18px]"></i>
          출석하기
        </Button.Solid>
      </Card.Header>
      <Card.Content>
        <StudyRoomSessionCard data={MockStudyScheduleApiResult[0]} />
      </Card.Content>
    </Card>
  );
};

export default StudyRoomIntendedCard;
