import { ScheduleListProps } from "@/features/study/schedule/ui/schedule.ui.types";
import ScheduleSessionCard from "@/features/study/schedule/ui/ScheduleSessionCard";
import React from "react";

function ScheduleList({
  scheduleData,
  type,
  isAdmin = false,
  date,
  handleEdit,
  handleDelete,
  onClick,
}: ScheduleListProps) {
  if (!scheduleData)
    return (
      <div className="flex items-center justify-center p-10 text-xl text-gray-500">
        데이터를 불러오지 못했습니다!
      </div>
    );

  // 공통 필터링 로직
  const filteredSchedules = scheduleData.filter((item) =>
    type === "upcoming"
      ? new Date(item.startDateTime).getTime() > date
      : new Date(item.startDateTime).getTime() - 15 * 60 * 1000 < date
  );

  const emptyMessage =
    type === "upcoming"
      ? "예정된 스터디 일정이 없습니다!"
      : "마감된 스터디 일정이 없습니다!";

  if (filteredSchedules.length === 0) {
    return (
      <div className="flex items-center justify-center p-10 text-xl text-gray-500">
        {emptyMessage}
      </div>
    );
  }
  // 최신순으로 정렬

  return (
    <>
      {filteredSchedules.map((item, index) => (
        <ScheduleSessionCard
          data={item}
          key={`${item.studyId}_${index}`}
          handleEdit={isAdmin ? handleEdit : undefined}
          handleDelete={isAdmin ? handleDelete : undefined}
          onClick={onClick}
        />
      ))}
    </>
  );
}

export default ScheduleList;
