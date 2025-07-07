"use client";

import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";

import { NoticeList } from "@/features/study/notice/fetch-notice/ui/NoticeList";
import { AddNoticeModalButton } from "@/features/study/notice/add-notice/ui/AddNoticeModalButton";
import NoticeModal from "./NoticeModal";
import useMultiModal from "@/shared/hooks/useMultiModal";
import useHandleAddNotice from "@/features/study/notice/add-notice/model/useHandleAddNotice";

const NoticeCard = ({ studyId }: { studyId: number }) => {
  const { modal, openModal, closeModal } = useMultiModal();
  const { isCreate, setIsCreate } = useHandleAddNotice(studyId);

  return (
    <>
      <Card className="col-span-12 min-h-10 gap-3 tablet:col-span-9 laptop:col-span-10">
        <Card.Header className="mb-[10px] justify-between">
          <Typography.SubTitle1>공지사항</Typography.SubTitle1>
          <div className="flex items-center gap-2">
            <AddNoticeModalButton
              onClick={() => {
                openModal("notice");
                setIsCreate(true);
              }}
            />
          </div>
        </Card.Header>
        <Card.Content>
          <NoticeList studyId={studyId!} />
        </Card.Content>
      </Card>

      <NoticeModal
        isOpen={modal.get("notice")!}
        onClose={() => closeModal("notice")}
        studyId={studyId}
        isCreateMode={isCreate}
      />
    </>
  );
};

export default NoticeCard;
