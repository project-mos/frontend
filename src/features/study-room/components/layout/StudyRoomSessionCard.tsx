import Badge from "@/components/atoms/Badge";

import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";
import { StudyScheduleInterface } from "@/types/api/studies/detail";
import React from "react";

const StudyRoomSessionCard = ({
  handleEdit,
  handleDelete,
  data,
}: {
  data: StudyScheduleInterface;
  handleEdit?: (data: number) => void;
  handleDelete?: (data: number) => void;
}) => {
  return (
    <Card className="col-span-12 gap-3 shadow-none mobile:gap-1 tablet:col-span-10">
      <Card.Header className="relative justify-between">
        <div className="flex flex-col gap-1 mobile:flex-row">
          <Badge color="Blue">
            <i className="bi bi-calendar3 mr-1"></i>
            {data.startDateTime}
          </Badge>
          <Badge color="Gray">
            <i className="bi bi-clock mr-1"></i>
            {data.endDateTime}
          </Badge>
        </div>

        <div className="z-1 absolute right-0 flex gap-2">
          <div className="flex items-center gap-2">
            {handleEdit && (
              <i
                className="bi bi-pencil-square cursor-pointer transition-all duration-200 hover:text-mos-main"
                onClick={() => handleEdit(data.studyId)}
              ></i>
            )}
            {handleDelete && (
              <i
                className="bi bi-trash cursor-pointer transition-all duration-200 hover:text-red-400"
                onClick={() => handleDelete(data.studyId)}
              ></i>
            )}
            {/* {handleCheckbox && (
              <Checkbox
                className="size-[15px] border border-mos-main"
                onClick={() => handleCheckbox(data.studyId)}
              />
            )} */}
          </div>
        </div>
      </Card.Header>
      <Card.Content>
        <Typography.SubTitle1>{data.title}</Typography.SubTitle1>
      </Card.Content>
      <Card.Footer>
        <Typography.P3 className="text-mos-gray-300">
          {data.description}
        </Typography.P3>
      </Card.Footer>
    </Card>
  );
};

export default StudyRoomSessionCard;
