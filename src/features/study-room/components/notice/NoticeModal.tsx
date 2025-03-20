"use client";
import Button from "@/components/atoms/Button";
import Modal, { ModalOnClose, ModalProps } from "@/components/atoms/Modal";
import Typography from "@/components/atoms/Typography";
import LabelInput from "@/components/molecules/LabelInput";
import LabelTextAreaInput from "@/components/molecules/LabelTextAreaInput";
import { FormProvider, useForm } from "react-hook-form";

interface NoticeModalProps extends ModalProps {
  onClose: ModalOnClose;
}

interface NoticeData {
  title: string;
  content: string;
}

const NoticeModal = ({ onClose, ...props }: NoticeModalProps) => {
  const methods = useForm<NoticeData>({
    defaultValues: { title: "", content: "" },
    mode: "onChange",
  });
  const { handleSubmit, reset, formState } = methods;

  const onSubmit = (data: NoticeData) => {
    console.log("data", data);
    reset();
    onClose();
  };

  const onClickCloseBtn = () => {
    reset();
    onClose();
  };

  return (
    <FormProvider {...methods}>
      <Modal {...props} onClose={onClickCloseBtn} className="w-[35%]">
        <Modal.Header onClose={onClickCloseBtn}>
          <Typography.Head3>공지사항 추가</Typography.Head3>
        </Modal.Header>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Content className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <LabelInput
                label="제목"
                name="title"
                placeholder="제목을 입력하세요."
                required
                registerOptions={{ required: "필수 입력입니다." }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <LabelTextAreaInput
                label="내용"
                name="content"
                placeholder="내용울 입력하세요."
                required
                registerOptions={{ required: "필수 입력입니다." }}
              />
            </div>
          </Modal.Content>

          <Modal.Footer className="flex justify-end gap-2">
            <Button.Default onClick={onClickCloseBtn}>취소</Button.Default>
            <Button.Solid
              type="submit"
              color="Main"
              active={formState.isValid}
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
