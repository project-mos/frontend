import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";
import React from "react";
import StudyRoomSessionCard from "./StudyRoomSessionCard";

const StudyRoomIntendedCard = () => {
  return (
    <Card className="col-span-12 gap-2 tablet:col-span-4">
      <Card.Header className="flex justify-between">
        <Typography.SubTitle1>진행중인 스터디 일정</Typography.SubTitle1>
        <Button.Solid color="Green" active size="sm">
          <i className="bi bi-person-check text-[18px]"></i>
          출석하기
        </Button.Solid>
      </Card.Header>
      <Card.Content>
        <StudyRoomSessionCard />
      </Card.Content>
    </Card>
  );
};

export default StudyRoomIntendedCard;
