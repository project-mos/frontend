import Card from "@/components/atoms/Card";
import Tag from "@/components/atoms/Tag";
import Typography from "@/components/atoms/Typography";
import React from "react";

const StudyRoomTitleCard = () => {
  return (
    <Card className="col-span-12 gap-3 tablet:col-span-8">
      <Card.Header>
        <Tag.Blue bold border>
          프로그래밍
        </Tag.Blue>
      </Card.Header>
      <Card.Content>
        <Typography.Head3>알고리즘 스터디</Typography.Head3>
      </Card.Content>
      <Card.Footer>
        <Typography.P3 className="text-mos-gray-500">
          매주 화요일 오후 8시에 진행되며, 스터디 전 자료를 미리 읽어와 주시기
          바랍니다.
        </Typography.P3>
      </Card.Footer>
    </Card>
  );
};

export default StudyRoomTitleCard;
