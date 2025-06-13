"use client";
import { Dispatch, SetStateAction, useState } from "react";

import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Checkbox from "@/shared/components/atoms/Checkbox";
import Typography from "@/shared/components/atoms/Typography";
import ActionConfirmModal from "@/shared/components/molecules/ActionConfirmModal";

import useMultiModal from "@/shared/hooks/useMultiModal";
import { MockNoticeCardApiResult } from "@/shared/mock/api/study-room";

import { StudyNoticeCardInterface } from "@/features/study-room/types/study-room.type";
import NoticeModal from "./NoticeModal";

const List = (
  data: StudyNoticeCardInterface[],
  setSelectedNoticeState: Dispatch<SetStateAction<StudyNoticeCardInterface[]>>,
  openModal: (is: string) => void
) => {
  const handleCheckbox = (item: StudyNoticeCardInterface) => {
    setSelectedNoticeState((prev) => {
      return [...prev, item];
    });
  };

  const handleEdit = (item: StudyNoticeCardInterface) => {
    openModal("notice_update");
    setSelectedNoticeState([item]);
  };

  return (
    <div className="flex flex-col gap-2">
      {data.map((item) => (
        <div
          key={item.content}
          className="rounded-md border border-mos-gray-100 px-[15px] py-[10px] hover:border-mos-main hover:bg-gray-50"
          onClick={() => handleEdit(item)}
        >
          <div className="flex items-center gap-2">
            <i className="bi bi-exclamation-circle text-orange-600"></i>
            <div className="flex w-full justify-between">
              <Typography.P3 className="text-[18px]">
                {item.title}
              </Typography.P3>
              <Checkbox
                className="size-[15px] border border-mos-main"
                onClick={() => handleCheckbox(item)}
              />
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <Typography.P3 className="truncate text-[16px] text-mos-gray-700">
              {item.content}
            </Typography.P3>
          </div>
          <div className="my-2 border-b border-mos-gray-100"></div>
          <Typography.P3 className="text-[14px] text-mos-gray-500">
            {item.writer}
          </Typography.P3>
        </div>
      ))}
    </div>
  );
};

const NoticeCard = () => {
  const { modal, openModal, closeModal } = useMultiModal();
  const [selectedNoticeState, setSelectedNoticeState] = useState<
    StudyNoticeCardInterface[]
  >([]);

  const data: StudyNoticeCardInterface[] = MockNoticeCardApiResult;

  const onClickDeleteBtn = () => {
    if (selectedNoticeState.length === 0) {
      alert("삭제할 공지사항을 선택해주세요.");
    } else {
      openModal("notice_delete_confirm");
    }
  };

  return (
    <>
      <Card className="col-span-12 h-fit gap-3 tablet:col-span-9 laptop:col-span-10">
        <Card.Header className="mb-[10px] justify-between">
          <Typography.SubTitle1>공지사항</Typography.SubTitle1>
          <div className="flex items-center gap-2">
            <Button.Ghost color="Red" size="sm" onClick={onClickDeleteBtn}>
              삭제
            </Button.Ghost>
            <Button.Solid
              color="Main"
              active
              size="sm"
              onClick={() => openModal("notice")}
            >
              <i className="bi bi-plus text-[22px]"></i>
              공지 작성
            </Button.Solid>
          </div>
        </Card.Header>
        <Card.Content>
          {List(data, setSelectedNoticeState, openModal)}
        </Card.Content>
      </Card>

      {/* 공지사항 생성 모달 */}
      <NoticeModal
        isOpen={modal.get("notice")!}
        onClose={() => closeModal("notice")}
      />

      {/* 공지사항 수정 모달 */}
      <NoticeModal
        isOpen={modal.get("notice_update")!}
        onClose={() => closeModal("notice_update")}
        data={selectedNoticeState[0]}
      />

      {/* 공지사항 삭제 확인 모달 */}
      <ActionConfirmModal
        type="danger"
        title="삭제 확인"
        content="정말 삭제하시겠습니까?"
        buttonLabel="삭제"
        isOpen={modal.get("notice_delete_confirm")!}
        onClose={() => closeModal("notice_delete_confirm")}
      />
    </>
  );
};

export default NoticeCard;
