import Button from "@/shared/components/atoms/Button";
import ActionConfirmModal from "@/shared/components/molecules/ActionConfirmModal";
import useMultiModal from "@/shared/hooks/useMultiModal";
import useHandleDeleteNotice from "@/features/study/notice/delete-notice/model/useHandleDeleteNotice";

export const DeleteNoticeButton = ({
  studyId,
  noticeId,
  onClickCloseBtn,
}: {
  studyId: number;
  noticeId: number;
  onClickCloseBtn: () => void;
}) => {
  const { modal, openModal, closeModal } = useMultiModal();

  // 삭제
  const { deleteNotices } = useHandleDeleteNotice(studyId, noticeId, () =>
    onClickCloseBtn()
  );

  const handleDeleteNotice = () => {
    deleteNotices();
    closeModal("notice_delete_confirm");
  };

  return (
    <>
      <Button.Ghost
        type="button"
        color="Red"
        active
        onClick={() => openModal("notice_delete_confirm")}
      >
        삭제
      </Button.Ghost>

      {/* 공지사항 삭제 확인 모달 */}
      <ActionConfirmModal
        type="danger"
        title="삭제 확인"
        content="정말 삭제하시겠습니까?"
        buttonLabel="삭제"
        isOpen={modal.get("notice_delete_confirm")!}
        onClose={() => closeModal("notice_delete_confirm")}
        onClick={handleDeleteNotice}
      />
    </>
  );
};
