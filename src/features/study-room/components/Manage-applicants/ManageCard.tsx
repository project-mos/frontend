"use client";
import Card from "@/components/atoms/Card";
import Typography from "@/components/atoms/Typography";
import { MockManageCardApiResult } from "@/app/mock/api/study-room";
import { StudyManageCardInterface } from "@/types/api/study-room";
import useModal from "@/app/hooks/useModal";
import InfoModal from "./InfoModal";
import { useState } from "react";

const List = () => {
  const data: StudyManageCardInterface[] = MockManageCardApiResult;
  const { modal, openModal, closeModal } = useModal();

  // 선택된 사용자 정보를 상태로 관리
  const [selectedUser, setSelectedUser] = useState<StudyManageCardInterface>({
    name: "",
    date: "",
    email: "",
    experience: "",
    questionList: [{ question: "", answer: "" }],
  });

  const handleClick = (user: StudyManageCardInterface) => {
    setSelectedUser(user);
    openModal();
  };

  return (
    <>
      {/* 지원자 상세 정보 모달 */}
      <InfoModal isOpen={modal} onClose={closeModal} data={selectedUser} />

      {/* 지원자 리스트 */}
      <div className="flex flex-col gap-3">
        {data.map((list) => (
          <div
            key={list.date}
            className="cursor-pointer rounded-md border border-mos-gray-100 px-[20px] py-[15] transition-all duration-200 hover:border-mos-main"
            onClick={() => handleClick(list)}
          >
            {/* 지원자, 지원일시 */}
            <div className="flex w-full justify-between">
              <Typography.P3 className="text-[16px]">{list.name}</Typography.P3>
              <Typography.P3 className="text-[14px]">{list.date}</Typography.P3>
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
