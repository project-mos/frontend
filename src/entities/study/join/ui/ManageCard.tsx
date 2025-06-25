"use client";
import { useState } from "react";

import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";

import { StudyManageCardInterface } from "@/features/study-room/types/study-room.type";
import useModal from "@/shared/hooks/useModal";
import { MockManageCardApiResult } from "@/shared/mock/api/study-room";

import InfoModal from "./InfoModal";

const List = () => {
  const data: StudyManageCardInterface[] = MockManageCardApiResult;
  const { isModalOpenState, openModal, closeModal } = useModal();

  // 선택된 사용자 정보를 상태로 관리
  const [selectedUserState, setSelectedUserState] =
    useState<StudyManageCardInterface>({
      name: "",
      date: "",
      email: "",
      experience: "",
      questionList: [{ question: "", answer: "" }],
    });

  const handleClick = (user: StudyManageCardInterface) => {
    setSelectedUserState(user);
    openModal();
  };

  return (
    <>
      {/* 지원자 상세 정보 모달 */}
      <InfoModal
        isOpen={isModalOpenState}
        onClose={closeModal}
        data={selectedUserState}
      />

      {/* 지원자 리스트 */}
      <div className="flex flex-col gap-3">
        {data.map((list) => (
          <div
            key={list.date}
            className="cursor-pointer rounded-md border border-mos-gray-100 px-[20px] py-[15] transition-all duration-200 hover:border-mos-main"
            onClick={() => handleClick(list)}
          >
            {/* 지원자, 지원일시 */}
            <div className="flex w-full items-center justify-between py-5">
              <div className="flex flex-col gap-1">
                <Typography.P3 className="text-[18px] font-semibold">
                  {list.name}
                </Typography.P3>
                <Typography.P3 className="text-[14px] text-mos-gray-700">
                  {list.date}
                </Typography.P3>
              </div>
              <Button.Ghost disabled={false} color="Main" size="sm">
                더보기
              </Button.Ghost>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const ManageCard = () => {
  return (
    <Card className="col-span-12 h-fit gap-3 tablet:col-span-9 laptop:col-span-10">
      <Card.Header className="mb-[10px] justify-between">
        <Typography.SubTitle1>지원자 목록</Typography.SubTitle1>
      </Card.Header>
      <Card.Content>
        <List />
      </Card.Content>
    </Card>
  );
};

export default ManageCard;
