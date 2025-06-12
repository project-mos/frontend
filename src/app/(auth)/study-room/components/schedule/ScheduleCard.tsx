"use client";

import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";

import StudyRoomSessionCard from "@/app/(auth)/study-room/components/layout/StudyRoomSessionCard";
import ActionConfirmModal from "@/shared/components/molecules/ActionConfirmModal";
import useMultiModal from "@/shared/hooks/useMultiModal";

import { StudyScheduleInterface } from "@/shared/types/api/studies/detail";
import { useState } from "react";
import ScheduleModal from "./ScheduleModal";
import { useGetStudySchedule } from "@/features/study-room/services/study-room.service";
import { useParams } from "next/navigation";
import { GetStudySchedule } from "@/features/study-room/types/study-room.api";

type ScheduleType = "upcoming" | "past";

interface ScheduleListProps {
  scheduleData?: GetStudySchedule[];
  type: ScheduleType;
}

const ScheduleCard = () => {
  // const { modal, openModal, closeModal } = useModal();
  const { modal, openModal, closeModal } = useMultiModal();
  const params = useParams() as { id: string };

  const { data: scheduleData } = useGetStudySchedule(params.id);

  const [selectStudyData, setSelectStudyData] =
    useState<StudyScheduleInterface>();

  // const handleEdit = (id: number) => {
  //   const hasData = MockStudyScheduleApiResult.length > 0;
  //   if (hasData) {
  //     const findData = MockStudyScheduleApiResult.find(
  //       (item) => item.studyId === id
  //     );
  //     if (findData) {
  //       setSelectStudyData(findData);
  //       openModal("schedule");
  //     } else {
  //       throw "Not Found Data";
  //     }
  //   }
  // };

  return (
    <>
      <ScheduleModal
        selectData={selectStudyData}
        isOpen={modal.get("schedule")!}
        onClose={() => {
          setSelectStudyData(undefined);
          closeModal("schedule");
        }}
        onSuccess={() => {
          console.log("success!!");
        }}
      />
      <div className="col-span-12 h-fit gap-3 tablet:col-span-9 laptop:col-span-10">
        <StudyScheduleCard
          title="예정된 스터디 일정"
          onAdd={() => openModal("schedule")}
          // onDelete={() => openModal("schedule_delete_confirm")}
        >
          <ScheduleList scheduleData={scheduleData} type="upcoming" />
        </StudyScheduleCard>
        <StudyScheduleCard title="마감된 스터디 일정">
          <ScheduleList scheduleData={scheduleData} type="past" />
        </StudyScheduleCard>
      </div>
      {/* 공지사항 삭제 확인 모달 */}
      <ActionConfirmModal
        type="danger"
        title="삭제 확인"
        content="정말 삭제하시겠습니까?"
        buttonLabel="삭제"
        isOpen={modal.get("schedule_delete_confirm")!}
        onClose={() => closeModal("schedule_delete_confirm")}
      />
    </>
  );
};

const StudyScheduleCard = ({
  title,
  onAdd,
  // onDelete,
  children,
}: {
  title: string;
  onAdd?: () => void;
  // onDelete?: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Card className="mb-3 max-h-[400px] overflow-y-auto pt-0 tablet:max-h-[310px]">
      <Card.Header className="sticky top-0 z-[1] flex flex-col justify-between gap-3 bg-white py-4">
        <div className="flex w-full justify-between">
          <Typography.SubTitle1>{title}</Typography.SubTitle1>
          <div className="flex gap-2">
            {/* {onDelete && (
              <Button.Ghost color="Red" size="sm" onClick={onDelete}>
                삭제
              </Button.Ghost>
            )} */}
            {onAdd && (
              <Button.Solid color="Main" active size="sm" onClick={onAdd}>
                <i className="bi bi-plus text-xl" /> 일정 추가
              </Button.Solid>
            )}
          </div>
        </div>
      </Card.Header>
      <Card.Content className="gap-3">{children}</Card.Content>
    </Card>
  );
};

function ScheduleList({ scheduleData, type }: ScheduleListProps) {
  if (!scheduleData)
    return (
      <div className="flex items-center justify-center p-10 text-xl text-gray-500">
        데이터를 불러오지 못했습니다!
      </div>
    );

  const now = Date.now();

  // 공통 필터링 로직
  const filteredSchedules = scheduleData.filter((item) =>
    type === "upcoming"
      ? new Date(item.endDateTime).getTime() > now
      : new Date(item.endDateTime).getTime() < now
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

  return (
    <>
      {filteredSchedules.map((item, index) => (
        <StudyRoomSessionCard data={item} key={`${item.studyId}_${index}`} />
      ))}
    </>
  );
}

export default ScheduleCard;
