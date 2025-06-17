import Badge from "@/shared/components/atoms/Badge";
import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";
import { StudyScheduleInterface } from "@/shared/types/api/studies/detail";
import { formatDate } from "@/shared/utils/date";
import clsx from "clsx";

const StudyRoomSessionCard = ({
  handleEdit,
  handleDelete,
  data,
  className,
}: {
  data: StudyScheduleInterface;
  className?: string;
  handleEdit?: (id: number) => void;
  handleDelete?: (id: number) => void;
}) => {
  return (
    <Card
      className={clsx(
        "col-span-12 gap-3 shadow-none mobile:gap-1 tablet:col-span-10",
        className
      )}
    >
      <Card.Header className="relative justify-between">
        <div className="flex w-full flex-wrap gap-1">
          <Badge color="Blue">
            <i className="bi bi-calendar3 mr-1"></i>
            {formatDate("YYYY-MM-DD HH:mm", data.startDateTime)}
          </Badge>
          <Badge color="Gray">
            <i className="bi bi-calendar3 mr-1"></i>
            {formatDate("YYYY-MM-DD HH:mm", data.endDateTime)}
          </Badge>
        </div>

        <div className="z-1 absolute right-0 flex gap-2">
          <div className="flex items-center gap-2">
            {handleEdit && (
              <i
                className="bi bi-pencil-square cursor-pointer transition-all duration-200 hover:text-mos-main"
                onClick={() => handleEdit(data.studyScheduleId)}
              ></i>
            )}
            {handleDelete && (
              <i
                className="bi bi-trash cursor-pointer transition-all duration-200 hover:text-red-400"
                onClick={() => handleDelete(data.studyScheduleId)}
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
          {data.description === "" ? "일정 설명이 없습니다" : data.description}
        </Typography.P3>
      </Card.Footer>
    </Card>
  );
};

export default StudyRoomSessionCard;
