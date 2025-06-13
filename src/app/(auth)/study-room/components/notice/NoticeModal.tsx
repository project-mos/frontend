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

import { StudyNoticeCardInterface } from "@/features/study-room/types/study-room.type";
import { useNoticeStore } from "@/shared/store/useNoticeStore";

interface NoticeModalProps extends ModalProps {
  onClose: ModalOnClose;
  data?: StudyNoticeCardInterface;
}

interface NoticeData {
  title: string;
  content: string;
  isImportantNoticeChecked: boolean;
  isPinned: boolean;
}

const NoticeModal = ({ onClose, data, ...props }: NoticeModalProps) => {
  const methods = useForm<NoticeData>({
    defaultValues: {
      title: "",
      content: "",
    },
    mode: "onChange",
  });
  const { handleSubmit, formState, setValue, watch, register, reset } = methods;
  const noticeData = watch();
  // 빈 항목이 하나라도 있으면 false
  const isActiveBtn = !!noticeData.title && !!noticeData.content;
  // 전역 상태 관리
  const { setImportantNotice } = useNoticeStore();
  // 수정모드 플래그
  const [isModifyMode, setIsModifyMode] = useState<boolean>(false);
  // 필드 활성 여부
  const disable = data ? !isModifyMode : false;

  useEffect(() => {
    if (data) {
      setValue("title", data.title);
      setValue("content", data.content);
      setValue("isImportantNoticeChecked", data.isImportantNoticeChecked);
      setValue("isPinned", data.isPinned);
    }
  }, [data, setValue]);

  const onSubmit = (data: NoticeData) => {
    console.log("data", data);
    // 중요 공지로 설정 시 내용 저장
    if (data.isImportantNoticeChecked) {
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
        isImportantNoticeChecked: data.isImportantNoticeChecked,
        isPinned: data.isPinned,
      });
    } else {
      reset();
    }

    setIsModifyMode(false);
  };

  return (
    <FormProvider {...methods}>
      <Modal {...props} onClose={onClickCloseBtn}>
        <Modal.Header onClose={onClickCloseBtn}>
          <div className="flex gap-2">
            <Typography.Head3>공지사항</Typography.Head3>
            {data && (
              // 데이터가 있는 경우만 수정 버튼 노출
              <Button.Icon
                color="Main"
                className="w-5"
                onClick={() => setIsModifyMode((prev) => !prev)}
              >
                <i className="bi bi-pencil" />
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
              <Checkbox
                {...register("isImportantNoticeChecked")}
                disabled={disable}
              />
              <Typography.P3 className="text-[14px]">
                중요 공지로 설정
              </Typography.P3>
              <Checkbox {...register("isPinned")} disabled={disable} />
              <Typography.P3 className="text-[14px]">
                공지 상단에 고정
              </Typography.P3>
            </div>
          </Modal.Content>

          <Modal.Footer>
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
                disabled={!formState.isValid}
              >
                수정
              </Button.Solid>
            )}
            {!isModifyMode && !data && (
              <Button.Solid
                type="submit"
                color="Main"
                active={isActiveBtn}
                disabled={!formState.isValid}
              >
                등록
              </Button.Solid>
            )}
          </Modal.Footer>
        </form>
      </Modal>
    </FormProvider>
  );
};

export default NoticeModal;
