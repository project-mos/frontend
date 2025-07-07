"use client";
import { FormProvider } from "react-hook-form";

import Button from "@/shared/components/atoms/Button";
import Checkbox from "@/shared/components/atoms/Checkbox";
import Modal, {
  ModalOnClose,
  ModalProps,
} from "@/shared/components/atoms/Modal";
import Typography from "@/shared/components/atoms/Typography";
import LabelInput from "@/shared/components/molecules/LabelInput";
import LabelTextAreaInput from "@/shared/components/molecules/LabelTextAreaInput";

import { NoticeRequest } from "@/entities/study/notice/api/notice.api.types";
import useHandleAddNotice from "@/features/study/notice/add-notice/model/useHandleAddNotice";
import useHandleUpdateNotice from "@/features/study/notice/update-notice/model/useHandleUpdateNotice";
import useFormNotice from "@/features/study/notice/form-notice/model/useFormNotice";
import { useEffect } from "react";
import { DeleteNoticeButton } from "@/features/study/notice/delete-notice/ui/DeleteNoticeButton";
import { UpdateNoticeButton } from "@/features/study/notice/update-notice/ui/UpdateNoticeButton";
import { AddNoticeButton } from "@/features/study/notice/add-notice/ui/AddNoticeButton";

interface NoticeModalProps extends ModalProps {
  onClose: ModalOnClose;
  studyId: number;
  noticeId?: number;
  isCreateMode?: boolean;
}

const NoticeModal = ({
  onClose,
  studyId,
  isCreateMode,
  ...props
}: NoticeModalProps) => {
  // 폼 상태 관리
  const { methods, noticeData, isActiveBtn, noticeId } = useFormNotice(studyId);
  const { handleSubmit, formState, setValue, register, reset } = methods;

  // 생성
  const { createNotice, isCreating } = useHandleAddNotice(studyId, () =>
    reset({
      title: "",
      content: "",
      important: false,
      pinned: false,
    })
  );

  // 수정
  const { isModifyMode, setIsModifyMode, updateNotice, isUpdating } =
    useHandleUpdateNotice(studyId, noticeId!);

  // 필드 활성 여부
  const disable = noticeData && !isCreateMode ? !isModifyMode : false;

  useEffect(() => {
    if (noticeData && !isCreateMode) {
      setValue("title", noticeData.title);
      setValue("content", noticeData.content);
      setValue("important", noticeData.important);
      setValue("pinned", noticeData.pinned);
    }

    if (isCreateMode) {
      reset({
        title: "",
        content: "",
        important: false,
        pinned: false,
      });
    }
  }, [isCreateMode, noticeData, setValue]);

  const onSubmit = (data: NoticeRequest) => {
    if (isModifyMode) {
      updateNotice(data);
    } else {
      createNotice(data);
    }

    onClickCloseBtn();
  };

  const onClickCloseBtn = () => {
    onClose();
    setIsModifyMode(false);
  };

  return (
    <FormProvider {...methods}>
      <Modal {...props} onClose={onClickCloseBtn}>
        <Modal.Header onClose={onClickCloseBtn}>
          <div className="gap flex items-center gap-2">
            <Typography.Head3>공지사항</Typography.Head3>
            {/* 수정 아이콘 버튼 */}
            {!isCreateMode && (
              <Button.Icon
                color="Main"
                className="!py-3 px-1"
                onClick={() => setIsModifyMode((prev) => !prev)}
              >
                <i className="bi bi-pencil text-[14px]" />
              </Button.Icon>
            )}
          </div>
        </Modal.Header>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Content className="flex flex-col gap-5">
            <LabelInput
              label="제목"
              name="title"
              placeholder="제목을 입력하세요."
              required
              registerOptions={{ required: "필수 입력입니다." }}
              disabled={disable}
            />
            <LabelTextAreaInput
              label="내용"
              name="content"
              placeholder="내용울 입력하세요."
              required
              registerOptions={{ required: "필수 입력입니다." }}
              disabled={disable}
            />
            <div className="mb-2 mt-[-10px] flex justify-end gap-2">
              <Checkbox {...register("important")} disabled={disable} />
              <Typography.P3 className="text-[14px]">
                중요 공지로 설정
              </Typography.P3>
              <Checkbox {...register("pinned")} disabled={disable} />
              <Typography.P3 className="text-[14px]">
                공지 상단에 고정
              </Typography.P3>
            </div>
          </Modal.Content>

          <Modal.Footer>
            {!isCreateMode && (
              <DeleteNoticeButton
                studyId={studyId}
                noticeId={noticeId!}
                onClickCloseBtn={onClickCloseBtn}
              />
            )}
            {isModifyMode && (
              <UpdateNoticeButton
                isActiveBtn={isActiveBtn}
                disabled={!formState.isValid || isUpdating}
              />
            )}
            {isCreateMode && (
              <AddNoticeButton
                isActiveBtn={isActiveBtn}
                disabled={!formState.isValid || isCreating}
              />
            )}
            {!isModifyMode && !isCreateMode && (
              <Button.Solid
                type="button"
                color="Main"
                active
                onClick={() => {
                  onClose();
                }}
              >
                확인
              </Button.Solid>
            )}
          </Modal.Footer>
        </form>
      </Modal>
    </FormProvider>
  );
};

export default NoticeModal;
