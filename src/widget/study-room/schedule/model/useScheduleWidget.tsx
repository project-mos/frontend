import { useMyStudyRole } from "@/entities/study/member/model/member.query";
import {
  useDeleteStudySchedule,
  useGetStudySchedule,
} from "@/entities/study/schedule/model/schedule.query";
import { useGetStudy } from "@/features/studies/model/useStudiesQueries";

import { GetStudySchedule } from "@/features/study-room/types/study-room.api";
import useMultiModal from "@/shared/hooks/useMultiModal";
import { formatDate } from "@/shared/utils/date";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const useScheduleWidget = () => {
  const { id: studyId } = useParams() as { id: string };
  // const { modal, openModal, closeModal } = useModal();
  const { modal, openModal, closeModal } = useMultiModal();
  // 모달 상세보기
  const [isModalReadonly, setIsModalReadOnly] = useState(false);
  const [selectStudyData, setSelectStudyData] = useState<GetStudySchedule>();
  const [now, setNow] = useState<number>();

  const { data: scheduleData } = useGetStudySchedule(Number(studyId));
  const { data: studyData } = useGetStudy(studyId);
  const { mutate: deleteScheduleMutate } = useDeleteStudySchedule(
    Number(studyId)
  );

  const isAdmin = useMyStudyRole(studyId) === "스터디장";
  const formatScheduleDate = getFormatStartEndDate();

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
    deleteScheduleMutate(scheduleId);
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

  useEffect(() => {
    setNow(Date.now());
  }, []);

  return {
    modal,
    openModal,
    closeModal,
    isModalReadonly,
    studyData,
    handleViewModal,
    setIsModalReadOnly,
    handleDelete,
    getFormatStartEndDate,
    isAdmin,
    formatScheduleDate,
    selectStudyData,
    scheduleData,
    setSelectStudyData,
    now,
  };
};

export default useScheduleWidget;
