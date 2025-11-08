"use client";

import Button from "@/shared/components/atoms/Button";
import useModal from "@/shared/hooks/useModal";
import { useToast } from "@/shared/hooks/useToast";
import { useMyJoinedStudyStore } from "@/shared/store/useMyJoinedStudyStore";
import StudyFormModal from "./StudyFormModal";

const CreateScheduleButton = () => {
  const { isModalOpenState, openModal, closeModal } = useModal();
  const toast = useToast();
  const myJoinedStudiesData = useMyJoinedStudyStore(
    (state) => state.myJoinedStudiesData
  );

  const handleCreateSchedule = () => {
    if (myJoinedStudiesData?.length === 0) {
      toast.info(
        "참여중인 스터디가 없습니다. 스터디에 참여 후 일정을 생성해주세요."
      );
    } else {
      openModal();
    }
  };

  return (
    <>
      <Button.Ghost
        color="Main"
        className="h-[30px] p-0 pl-1.5 pr-3 text-[14px]"
        onClick={handleCreateSchedule}
        disabled={false}
      >
        <i className="bi bi-plus text-[22px]" />
        스터디 일정 생성
      </Button.Ghost>

      {/* 일정 생성 모달 */}
      <StudyFormModal isOpen={isModalOpenState} onClose={() => closeModal()} />
    </>
  );
};

export default CreateScheduleButton;
