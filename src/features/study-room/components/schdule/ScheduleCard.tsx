 
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
      <div className="col-span-12 h-fit gap-3 tablet:col-span-9 laptop:col-span-10">
        <StudyScheduleCard title="예정된 스터디 일정" onAdd={openModal}>
          <StudyRoomSessionCard
            onDelete={() => console.log("delete")}
            onEdit={() => console.log("edit")}
          />
          <StudyRoomSessionCard />
          <StudyRoomSessionCard />
        </StudyScheduleCard>
        <StudyScheduleCard title="마감된 스터디 일정">
          <StudyRoomSessionCard />
          <StudyRoomSessionCard />
          <StudyRoomSessionCard />
        </StudyScheduleCard>
      </div>
    </>
  );
};

const StudyScheduleCard = ({
  title,
  onAdd,
  children,
}: {
  title: string;
  onAdd?: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Card className="mb-3 max-h-[400px] overflow-y-auto pt-0 tablet:max-h-[310px]">
      <Card.Header className="sticky top-0 z-[1] flex flex-col justify-between gap-3 bg-white py-4">
        <div className="flex w-full justify-between">
          <Typography.SubTitle1>{title}</Typography.SubTitle1>
          {onAdd && (
            <Button.Solid color="Main" active size="sm" onClick={onAdd}>
              <i className="bi bi-plus text-xl" /> 일정 추가
            </Button.Solid>
          )}
        </div>
      </Card.Header>
      <Card.Content className="gap-3">{children}</Card.Content>
    </Card>
  );
};

export default ScheduleCard;
