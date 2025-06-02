"use client";

import Button from "@/shared/components/atoms/Button";
import useModal from "@/shared/hooks/useModal";
import CreateScheduleModal from "./CreateScheduleModal";

const CreateScheduleButton = () => {
  const { isModalOpenState, openModal, closeModal } = useModal();

  const handleCreateSchedule = () => {
    openModal();
  };

  return (
    <>
      <Button.Ghost
        color="Main"
        className="h-[30px] p-0 pl-1.5 pr-3 text-[14px]"
        onClick={handleCreateSchedule}
      >
        <i className="bi bi-plus text-[22px]" />
        일정 생성
      </Button.Ghost>

      {/* 일정 생성 모달 */}
      <CreateScheduleModal
        isOpen={isModalOpenState}
        onClose={() => closeModal()}
      />
    </>
  );
};

export default CreateScheduleButton;
