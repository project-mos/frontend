"use client";

import { GetStudyDetailResponse } from "@/features/studies/types/studies.api";
import { useGetStudySchedule } from "@/features/study-room/hooks/useScheduleQueries";

import Card from "@/shared/components/atoms/Card";
import Tag from "@/shared/components/atoms/Tag";
import Typography from "@/shared/components/atoms/Typography";
import { formatDate } from "@/shared/utils/date";
import { useParams } from "next/navigation";

const StudyRoomTitleCard = ({ data }: { data: GetStudyDetailResponse }) => {
  const params = useParams() as { id: string };

  const { data: scheduleData } = useGetStudySchedule(Number(params.id));
  const formatScheduleDate = getFormatStartEndDate();

  const getProgress = (): number => {
    if (formatScheduleDate) {
      const startDate = new Date(formatScheduleDate?.startDate);
      const endDate = new Date(formatScheduleDate?.endDate);
      const today = new Date();

      const total = endDate.getTime() - startDate.getTime();
      const current = today.getTime() - startDate.getTime();

      if (today < startDate) return 0;
      if (today > endDate) return 100;
      return Math.round((current / total) * 100);
    } else {
      return 0;
    }
  };
  function getFormatStartEndDate() {
    if (scheduleData && scheduleData?.length > 0) {
      const formatStartDate = formatDate(
        "YYYY-MM-DD",
        scheduleData[0].startDateTime
      );
      const formatEndDate = formatDate(
        "YYYY-MM-DD",
        scheduleData[scheduleData.length - 1].endDateTime
      );
      return {
        startDate: formatStartDate,
        endDate: formatEndDate,
      };
    } else {
      return undefined;
    }
  }

  return (
    <Card className="col-span-12 min-h-48 justify-between tablet:col-span-8">
      <Card.Header className="flex-col gap-3">
        <div className="flex justify-between gap-2">
          <div className="flex flex-col gap-2">
            <Tag.Blue bold border>
              {data.category}
            </Tag.Blue>
          </div>
          <div className="flex gap-2">
            <Tag.Green bold border>
              {data.recruitmentStatus}
            </Tag.Green>
            <Tag.Pink bold border>
              {data.meetingType}
            </Tag.Pink>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Typography.Head3>{data.title}</Typography.Head3>
          <div className="flex gap-2">
            {/* 추후 API 연동 예정 */}
            <Typography.P3 className="text-mos-gray-500">
              내일은 선릉역에서 봐요!
            </Typography.P3>
          </div>
        </div>
      </Card.Header>

      <Card.Footer className="flex-col gap-1">
        <div className="flex justify-between">
          <Typography.P3 className="text-mos-gray-500">진행률</Typography.P3>
          <Typography.P3 className="text-mos-gray-500">
            {getProgress()}%
          </Typography.P3>
        </div>
        {/* progress bar */}
        <div className="h-3 w-full rounded-full bg-gray-100 dark:bg-gray-700">
          <div
            className="h-3 w-1/2 rounded-full bg-mos-main-500"
            style={{
              width: `${getProgress()}%`,
            }}
          />
        </div>
      </Card.Footer>
    </Card>
  );
};

export default StudyRoomTitleCard;
