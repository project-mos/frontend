"use client";

import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";

import StudyRoomSessionCard from "@/app/(auth)/study-room/components/layout/StudyRoomSessionCard";
import ActionConfirmModal from "@/shared/components/molecules/ActionConfirmModal";
import useMultiModal from "@/shared/hooks/useMultiModal";

import { useEffect, useState } from "react";

import {
  useGetStudy,
  useMyStudyRole,
} from "@/features/studies/hooks/useStudiesQueries";
import {
  useDeleteStudySchedule,
  useGetStudySchedule,
} from "@/features/study-room/hooks/useScheduleQueries";
import { GetStudySchedule } from "@/features/study-room/types/study-room.api";
import Meta from "@/shared/components/molecules/Meta";
import { formatDate } from "@/shared/utils/date";
import { useParams } from "next/navigation";
import ScheduleModal from "./ScheduleModal";

type ScheduleType = "upcoming" | "past";

export interface ScheduleListProps {
  scheduleData?: GetStudySchedule[];
  type: ScheduleType;
  isAdmin?: boolean;
  date: number;
  handleEdit?: (id: number) => void;
  handleDelete?: (id: number) => void;
  onClick?: (id: number) => void;
}

const ScheduleCard = () => {
  // const { modal, openModal, closeModal } = useModal();
  const { modal, openModal, closeModal } = useMultiModal();
  // 모달 상세보기
  const [isModalReadonly, setIsModalReadOnly] = useState(false);
  const { id: studyId } = useParams() as { id: string };

  const { data: scheduleData } = useGetStudySchedule(Number(studyId));
  const { data: studyData } = useGetStudy(studyId);

  const { mutate: deleteScheduleMutate } = useDeleteStudySchedule(
    Number(studyId)
  );
  const isAdmin = useMyStudyRole(studyId) === "스터디장";
  const formatScheduleDate = getFormatStartEndDate();

  const [selectStudyData, setSelectStudyData] = useState<GetStudySchedule>();
  const [now, setNow] = useState<number>();

  useEffect(() => {
    setNow(Date.now());
  }, []);

  const handleViewModal = (scheduleId: number, type: "view" | "edit") => {
    if (scheduleData) {
      const hasData = scheduleData.length > 0;
      if (hasData) {
        const findData = scheduleData.find(
          (item) => item.studyScheduleId === scheduleId
        );
        if (findData) {
          setSelectStudyData(findData);
          if (type === "view") {
            setIsModalReadOnly(true);
          } else {
            setIsModalReadOnly(false);
          }
          openModal("schedule");
        } else {
          throw "Not Found Data";
        }
      }
    } else {
      throw "Not Found Data";
    }
  };
  const handleDelete = (scheduleId: number) => {
    deleteScheduleMutate({ scheduleId });
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
    <>
      <ScheduleModal
        selectData={selectStudyData}
        isOpen={modal.get("schedule")!}
        readOnly={isModalReadonly}
        onClose={() => {
          setSelectStudyData(undefined);
          closeModal("schedule");
        }}
        onSuccess={() => {
          console.log("success!!");
        }}
      />

      <div className="col-span-12 h-fit gap-3 tablet:col-span-9 laptop:col-span-10">
        <Card className="mb-3">
          <Meta icon="calendar">
            {formatScheduleDate?.startDate} ~ {formatScheduleDate?.endDate}{" "}
            &middot; {studyData?.schedule}
          </Meta>
        </Card>
        <StudyScheduleCard
          title="예정된 스터디 일정"
          onAdd={() => {
            setIsModalReadOnly(false);
            openModal("schedule");
          }}
          isAdmin={isAdmin}
        >
          {now && (
            <ScheduleList
              scheduleData={scheduleData}
              type="upcoming"
              isAdmin={isAdmin}
              date={now}
              handleEdit={(id) => handleViewModal(id, "edit")}
              handleDelete={handleDelete}
              onClick={(id) => handleViewModal(id, "view")}
            />
          )}
        </StudyScheduleCard>
        <StudyScheduleCard title="마감된 스터디 일정" isAdmin={isAdmin}>
          {now && (
            <ScheduleList
              date={now}
              scheduleData={scheduleData}
              type="past"
              onClick={(id) => handleViewModal(id, "view")}
            />
          )}
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
  children,
  isAdmin,
}: {
  title: string;
  onAdd?: () => void;
  children: React.ReactNode;
  isAdmin: boolean;
}) => {
  return (
    <Card className="mb-3 max-h-[400px] min-h-52 overflow-y-auto pt-0 tablet:max-h-[310px]">
      <Card.Header className="sticky top-0 z-[1] flex flex-col justify-between gap-3 bg-white py-4">
        <div className="flex w-full justify-between">
          <Typography.SubTitle1>{title}</Typography.SubTitle1>
          <div className="flex gap-2">
            {isAdmin && onAdd && (
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
        <StudyRoomSessionCard
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

export default ScheduleCard;
