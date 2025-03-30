import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";
import React from "react";

const StudyRoomSessionCard = ({
  onEdit,
  onDelete,
}: {
  onEdit?: () => void;
  onDelete?: () => void;
}) => {
  return (
    <Card className="col-span-12 gap-3 shadow-none mobile:gap-1 tablet:col-span-10">
      <Card.Header className="relative justify-between">
        <div className="flex flex-col gap-1 mobile:flex-row">
          <Badge color="Blue">
            <i className="bi bi-calendar3 mr-1"></i>
            2024-02-25
          </Badge>
          <Badge color="Gray">
            <i className="bi bi-clock mr-1"></i>
            20:00 - 22:00
          </Badge>
        </div>

        <div className="z-1 absolute right-0 flex gap-2">
          {onEdit && (
            <Button.Icon color="Blue" onClick={onEdit}>
              <i className="bi bi-pencil"></i>
            </Button.Icon>
          )}
          {onDelete && (
            <Button.Icon color="Red" onClick={onDelete}>
              <i className="bi bi-trash"></i>
            </Button.Icon>
          )}
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
  );
};

export default StudyRoomSessionCard;
