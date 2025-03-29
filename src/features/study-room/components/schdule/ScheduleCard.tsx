"use client";

import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";

import ScheduleModal from "./ScheduleModal";
import useModal from "@/app/hooks/useModal";
import StudyRoomSessionCard from "../layout/StudyRoomSessionCard";

const ScheduleCard = () => {
  const { modal, openModal, closeModal } = useModal();

  return (
    <>
      <ScheduleModal
        isOpen={modal}
        onClose={closeModal}
        onSuccess={() => {
          console.log("success!!");
        }}
      />

      <Card className="col-span-12 h-fit gap-3 tablet:col-span-9 laptop:col-span-10">
        <Card.Header className="flex-col justify-between gap-3">
          <div className="flex justify-between">
            <Typography.SubTitle1>스터디 일정</Typography.SubTitle1>
            <Button.Solid color="Main" active size="sm" onClick={openModal}>
              <i className="bi bi-plus text-xl" />
              일정 추가
            </Button.Solid>
          </div>
        </Card.Header>
        <Card.Content className="gap-3">
          <StudyRoomSessionCard isEdit />
        </Card.Content>
      </Card>
    </>
  );
};

export default ScheduleCard;
