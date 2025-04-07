"use client";

import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";

import ScheduleModal from "./ScheduleModal";

import useMultiModal from "@/app/hooks/useMultiModal";
import ActionConfirmModal from "@/components/molecules/ActionConfirmModal";
import { useState } from "react";
import { MockStudyScheduleApiResult } from "@/app/mock/api/studies";
import StudyRoomSessionCard from "../layout/StudyRoomSessionCard";
import { StudyScheduleInterface } from "@/types/api/studies/detail";

const ScheduleCard = () => {
  // const { modal, openModal, closeModal } = useModal();
  const { modal, openModal, closeModal } = useMultiModal();

  const [selectStudyData, setSelectStudyData] =
    useState<StudyScheduleInterface>();

  const handleEdit = (id: number) => {
    const hasData = MockStudyScheduleApiResult.length > 0;
    if (hasData) {
      const findData = MockStudyScheduleApiResult.find(
        (item) => item.studyId === id
      );
      if (findData) {
        setSelectStudyData(findData);
        openModal("schedule");
      } else {
        throw "Not Found Data";
      }
    }
  };

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
          {MockStudyScheduleApiResult.map((item, index) => {
            return (
              <StudyRoomSessionCard
                data={item}
                key={`${item.studyId}_${index}`}
                handleEdit={handleEdit}
                handleDelete={() => {
                  openModal("schedule_delete_confirm");
                }}
              />
            );
          })}
        </StudyScheduleCard>
        <StudyScheduleCard title="마감된 스터디 일정">
          {MockStudyScheduleApiResult.map((item, index) => {
            return (
              <StudyRoomSessionCard
                data={item}
                key={`${item.studyId}_${index}`}
              />
            );
          })}
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

export default ScheduleCard;
