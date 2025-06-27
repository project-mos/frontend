"use client";
import React, { useEffect, useState } from "react";
import ScheduleSessionCard from "../../../../features/study/schedule/ui/ScheduleSessionCard";

import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";

import { useParams } from "next/navigation";
import { useGetStudySchedule } from "@/entities/study/schedule/model/schedule.queries";

const ScheduleIntendedCard = () => {
  const params = useParams() as { id: string };

  const { data: scheduleData } = useGetStudySchedule(Number(params.id));
  const [now, setNow] = useState<number>();

  const getIsStudyingTime = (startDateTime: string, endDateTime: string) => {
    const start = new Date(startDateTime).getTime() - 15 * 60 * 1000;
    const end = new Date(endDateTime).getTime();
    return now! >= start && now! <= end;
  };
  const filteredSchedules = scheduleData?.filter((item) => {
    return getIsStudyingTime(item.startDateTime, item.endDateTime);
  });

  const isActive = filteredSchedules && filteredSchedules.length > 0;

  // const buttonActive =
  //   filteredSchedules &&
  //   getIsStudyingTime(
  //     filteredSchedules[0].startDateTime,
  //     filteredSchedules[0].endDateTime
  //   );

  useEffect(() => {
    setNow(Date.now());
  }, []);
  return (
    // 진행중인 일정같은 경우는 없다면 예정된 일정 중 가장 빠른걸로 보여준다.
    // 미리 출석(스터디 시작하고 15분 후에는 지각이고, 스터디 시작 전 15분에는 미리출석가능)
    <Card className="col-span-12 gap-2 tablet:col-span-4">
      <Card.Header className="flex justify-between">
        <Typography.SubTitle1>진행중인 스터디 일정</Typography.SubTitle1>
        <Button.Solid color="Green" size="sm">
          <i className="bi bi-person-check text-[18px]"></i>
          출석하기
        </Button.Solid>
      </Card.Header>
      <Card.Content className="h-full items-center justify-center">
        {isActive ? (
          <ScheduleSessionCard data={filteredSchedules[0]} className="w-full" />
        ) : (
          <Typography.P3 className="text-mos-gray-500">
            진행중인 스터디가 없습니다!
          </Typography.P3>
        )}
      </Card.Content>
    </Card>
  );
};

export default ScheduleIntendedCard;
