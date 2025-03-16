import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";
import React from "react";

const StudyRoomIntendedCard = () => {
  return (
    <Card className="col-span-12 tablet:col-span-4">
      <Card.Header className="flex justify-between">
        <Typography.SubTitle1>다음 스터디 일정</Typography.SubTitle1>
        <Button.Solid color="Green" active>
          <i className="bi bi-person-check text-[24px]"></i>
          출석하기
        </Button.Solid>
      </Card.Header>
      <Card.Content>
        <Typography.P3 className="text-mos-gray-300">
          예정된 일정이 없습니다
        </Typography.P3>
      </Card.Content>
    </Card>
  );
};

export default StudyRoomIntendedCard;
