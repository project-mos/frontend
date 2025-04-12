"use client";
import { useNoticeStore } from "@/app/store/useNoticeStore";
import Button from "@/components/atoms/Button";
import Checkbox from "@/components/atoms/Checkbox";
import Modal, { ModalOnClose, ModalProps } from "@/components/atoms/Modal";
import Typography from "@/components/atoms/Typography";
import LabelInput from "@/components/molecules/LabelInput";
import LabelTextAreaInput from "@/components/molecules/LabelTextAreaInput";
import { StudyNoticeCardInterface } from "@/types/api/study-room";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface NoticeModalProps extends ModalProps {
  onClose: ModalOnClose;
  data?: StudyNoticeCardInterface;
}

interface NoticeData {
  title: string;
  content: string;
  isImportantNoticeChecked: boolean;
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

  useEffect(() => {
    if (data) {
      setValue("title", data.title);
      setValue("content", data.content);
    }
  }, [data, setValue]);

  const onSubmit = (data: NoticeData) => {
    console.log("data", data);
    // 중요 공지로 설정 시 내용 저장
    if (data.isImportantNoticeChecked) {
      setImportantNotice(data.content);
    }
    reset();
    onClose();
  };

  const onClickCloseBtn = () => {
    onClose();
  };

  return (
    <FormProvider {...methods}>
      <Modal {...props} onClose={onClickCloseBtn}>
        <Modal.Header onClose={onClickCloseBtn}>
          <Typography.Head3>공지사항 {data ? "수정" : "추가"}</Typography.Head3>
        </Modal.Header>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Content className="flex flex-col gap-5">
            <LabelInput
              label="제목"
              name="title"
              placeholder="제목을 입력하세요."
              required
              registerOptions={{ required: "필수 입력입니다." }}
            />
            <LabelTextAreaInput
              label="내용"
              name="content"
              placeholder="내용울 입력하세요."
              required
              registerOptions={{ required: "필수 입력입니다." }}
            />
            <div className="mb-2 mt-[-10px] flex justify-end gap-2">
              <Checkbox {...register("isImportantNoticeChecked")} />
              <Typography.P3 className="text-[14px]">
                중요 공지로 설정
              </Typography.P3>
            </div>
          </Modal.Content>

          <Modal.Footer>
            <Button.Ghost color="Gray" onClick={onClickCloseBtn}>
              취소
            </Button.Ghost>
            <Button.Solid
              type="submit"
              color="Main"
              active={isActiveBtn}
              disabled={!formState.isValid}
            >
              확인
            </Button.Solid>
          </Modal.Footer>
        </form>
      </Modal>
    </FormProvider>
  );
};

export default NoticeModal;
