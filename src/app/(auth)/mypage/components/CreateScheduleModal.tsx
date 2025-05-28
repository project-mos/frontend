"use client";
import { FormProvider, useForm } from "react-hook-form";

import Button from "@/shared/components/atoms/Button";
import Modal, {
  ModalOnClose,
  ModalProps,
} from "@/shared/components/atoms/Modal";
import Typography from "@/shared/components/atoms/Typography";
import LabelInput from "@/shared/components/molecules/LabelInput";
import LabelTextAreaInput from "@/shared/components/molecules/LabelTextAreaInput";

import LabelInputDate from "@/shared/components/molecules/LabelInputDate";

interface NoticeModalProps extends ModalProps {
  onClose: ModalOnClose;
}

interface ScheduleData {
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
}

const CreateScheduleModal = ({ onClose, ...props }: NoticeModalProps) => {
  const methods = useForm<ScheduleData>({
    defaultValues: {
      title: "",
      description: "",
      startDateTime: "",
      endDateTime: "",
    },
    mode: "onChange",
  });
  const { handleSubmit, formState, watch, reset } = methods;
  const scheduleData = watch();

  // 빈 항목이 하나라도 있으면 false
  const isActiveBtn =
    !!scheduleData.title &&
    !!scheduleData.description &&
    !!scheduleData.startDateTime &&
    !!scheduleData.endDateTime;

  const onSubmit = (data: ScheduleData) => {
    console.log("data", data);
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
          <Typography.Head3>스터디 일정 추가</Typography.Head3>
        </Modal.Header>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Content className="flex flex-col gap-7">
            <LabelInput
              label="제목"
              name="title"
              placeholder="제목을 입력하세요."
              required
              registerOptions={{ required: "필수 입력입니다." }}
            />
            <LabelTextAreaInput
              label="일정 설명"
              name="description"
              placeholder="일정 설명울 입력하세요."
              required
              registerOptions={{ required: "필수 입력입니다." }}
            />
            <div className="flex w-full flex-col gap-3 mobile:flex-row">
              <LabelInputDate
                name="startDateTime"
                label="일정 시작일"
                required
                registerOptions={{
                  required: "일정 시작일을 선택해주세요",
                }}
              />
              <LabelInputDate
                name="endDateTime"
                label="일정 마감일"
                required
                registerOptions={{
                  required: "일정 마감일을 선택해주세요",
                }}
              />
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

export default CreateScheduleModal;
