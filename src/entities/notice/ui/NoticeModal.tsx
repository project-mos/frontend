"use client";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import Button from "@/shared/components/atoms/Button";
import Checkbox from "@/shared/components/atoms/Checkbox";
import Modal, {
  ModalOnClose,
  ModalProps,
} from "@/shared/components/atoms/Modal";
import Typography from "@/shared/components/atoms/Typography";
import LabelInput from "@/shared/components/molecules/LabelInput";
import LabelTextAreaInput from "@/shared/components/molecules/LabelTextAreaInput";

import { useNoticeStore } from "@/shared/store/useNoticeStore";
import {
  NoticeRequest,
  NoticeResponse,
} from "@/entities/notice/model/notice.type";
import { useQueryClient } from "@tanstack/react-query";
import { NOTICE_QUERY_KEY } from "@/features/notice/fetch-notice/model/constants";
import { useToast } from "@/shared/hooks/useToast";
import useMultiModal from "@/shared/hooks/useMultiModal";
import ActionConfirmModal from "@/shared/components/molecules/ActionConfirmModal";
import { usePostNotice } from "@/features/notice/create-notice/model/create-notice.hook";
import { usePatchNotice } from "@/features/notice/update-notice/model/update-notice.hook";
import { useDeleteNotice } from "@/features/notice/delete-notice/model/delete-notice.hook";

interface NoticeModalProps extends ModalProps {
  onClose: ModalOnClose;
  studyId: number;
  data?: NoticeResponse;
}

const NoticeModal = ({
  onClose,
  studyId,
  data,
  ...props
}: NoticeModalProps) => {
  const queryClient = useQueryClient();
  const { success, error } = useToast();
  const methods = useForm<NoticeRequest>({
    defaultValues: {
      title: "",
      content: "",
    },
    mode: "onChange",
  });
  const { handleSubmit, formState, setValue, watch, register, reset } = methods;
  const noticeData = watch();
  const noticeId = data && data.studyNoticeId;
  // 빈 항목이 하나라도 있으면 false
  const isActiveBtn = !!noticeData.title && !!noticeData.content;
  // 전역 상태 관리
  const { setImportantNotice } = useNoticeStore();
  // 수정모드 플래그
  const [isModifyMode, setIsModifyMode] = useState<boolean>(false);
  // 필드 활성 여부
  const disable = data ? !isModifyMode : false;
  // 삭제 확인 모달
  const { modal, openModal, closeModal } = useMultiModal();

  // 공지사항 생성 API
  const { mutate: createNotice, isPending: isCreating } = usePostNotice(
    studyId,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: NOTICE_QUERY_KEY.all(studyId),
        });
        success("공지가 등록되었습니다.");
      },
      onError: (err) => {
        error(String(err));
      },
    }
  );

  // 공지사항 수정 API
  const { mutate: updateNotice, isPending: isUpdating } = usePatchNotice(
    studyId,
    noticeId!,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: NOTICE_QUERY_KEY.all(studyId),
        });
        success("공지가 수정되었습니다.");
      },
      onError: (err) => {
        error(String(err));
      },
    }
  );

  // 공지사항 삭제 API
  const { mutate: deleteNotices } = useDeleteNotice(studyId, noticeId!, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: NOTICE_QUERY_KEY.all(studyId),
      });
      closeModal("notice_delete_confirm");
      onClickCloseBtn();
      success("공지가 삭제되었습니다.");
    },
    onError: (err) => {
      error(String(err));
    },
  });

  useEffect(() => {
    if (data) {
      setValue("title", data.title);
      setValue("content", data.content);
      setValue("important", data.important);
      setValue("pinned", data.pinned);
    }
  }, [data, setValue]);

  const onSubmit = (data: NoticeRequest) => {
    if (isModifyMode) {
      updateNotice(data);
    } else {
      // 등록
      createNotice(data);
    }

    // 중요 공지로 설정 시 내용 저장
    if (data.important) {
      localStorage.setItem("importantNoticeContent", data.content);
      setImportantNotice(data.content);
    }

    onClickCloseBtn();
  };

  const onClickCloseBtn = () => {
    onClose();
    if (data) {
      reset({
        title: data.title,
        content: data.content,
        important: data.important,
        pinned: data.pinned,
      });
    } else {
      reset();
    }

    setIsModifyMode(false);
  };

  const handleDeleteNotice = () => {
    deleteNotices(studyId);
  };

  return (
    <FormProvider {...methods}>
      <Modal {...props} onClose={onClickCloseBtn}>
        <Modal.Header onClose={onClickCloseBtn}>
          <div className="gap flex items-center gap-2">
            <Typography.Head3>공지사항</Typography.Head3>
            {data && (
              // 데이터가 있는 경우만 수정 버튼 노출
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
            <Button.Ghost
              type="button"
              color="Red"
              active
              onClick={() => openModal("notice_delete_confirm")}
            >
              삭제
            </Button.Ghost>
            {!isModifyMode && data && (
              <Button.Solid
                type="button"
                color="Main"
                active
                onClick={() => onClose()}
              >
                확인
              </Button.Solid>
            )}
            {isModifyMode && (
              <Button.Solid
                type="submit"
                color="Main"
                active={isActiveBtn}
                disabled={!formState.isValid || isCreating || isUpdating}
              >
                수정
              </Button.Solid>
            )}
            {!isModifyMode && !data && (
              <Button.Solid
                type="submit"
                color="Main"
                active={isActiveBtn}
                disabled={!formState.isValid || isCreating || isUpdating}
              >
                등록
              </Button.Solid>
            )}
          </Modal.Footer>
        </form>
      </Modal>
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
    </FormProvider>
  );
};

export default NoticeModal;
