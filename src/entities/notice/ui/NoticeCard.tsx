"use client";
import { Dispatch, SetStateAction, useState } from "react";

import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Checkbox from "@/shared/components/atoms/Checkbox";
import Typography from "@/shared/components/atoms/Typography";

import useMultiModal from "@/shared/hooks/useMultiModal";

import NoticeModal from "./NoticeModal";
import { useQuery } from "@tanstack/react-query";
import { NoticeResponse } from "@/entities/notice/model/notice.type";
import { noticesQueryOption } from "@/features/notice/fetch-notice/model/fetch-notice.hook";

const List = (
  data: NoticeResponse[],
  setSelectedNoticeState: Dispatch<SetStateAction<NoticeResponse[]>>,
  openModal: (is: string) => void
) => {
  const handleCheckbox = (item: NoticeResponse) => {
    setSelectedNoticeState((prev) => {
      return [...prev, item];
    });
  };

  const handleEdit = (item: NoticeResponse) => {
    openModal("notice_update");
    setSelectedNoticeState([item]);
  };

  return (
    <div className="flex flex-col gap-2">
      {data?.map((item) => {
        const isCreatorEqualModifier =
          item.creatorNickname !== item.modifierNickname;

        return (
          <div
            key={item.studyNoticeId}
            className="cursor-pointer rounded-md border border-mos-gray-100 px-[15px] py-[10px] hover:border-mos-main hover:bg-gray-50"
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
              작성자: {item.creatorNickname}
              {isCreatorEqualModifier && ` | 수정자: ${item.modifierNickname}`}
            </Typography.P3>
          </div>
        );
      })}
    </div>
  );
};

const NoticeCard = ({ studyId }: { studyId: number }) => {
  const { modal, openModal, closeModal } = useMultiModal();
  const [selectedNoticeState, setSelectedNoticeState] = useState<
    NoticeResponse[]
  >([]);

  // 공지사항 데이터 조회
  const { data: noticesData } = useQuery(noticesQueryOption(studyId));

  return (
    <>
      <Card className="col-span-12 min-h-10 gap-3 tablet:col-span-9 laptop:col-span-10">
        <Card.Header className="mb-[10px] justify-between">
          <Typography.SubTitle1>공지사항</Typography.SubTitle1>
          <div className="flex items-center gap-2">
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
          {List(noticesData!, setSelectedNoticeState, openModal)}
        </Card.Content>
      </Card>

      {/* 공지사항 생성 모달 */}
      <NoticeModal
        isOpen={modal.get("notice")!}
        onClose={() => closeModal("notice")}
        studyId={studyId}
      />

      {/* 공지사항 수정 모달 */}
      <NoticeModal
        isOpen={modal.get("notice_update")!}
        onClose={() => closeModal("notice_update")}
        data={selectedNoticeState[0]!}
        studyId={studyId}
      />
    </>
  );
};

export default NoticeCard;
