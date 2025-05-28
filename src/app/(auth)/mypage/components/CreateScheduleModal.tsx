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
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
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
    !!scheduleData.startDate &&
    !!scheduleData.endDate &&
    !!scheduleData.startTime &&
    !!scheduleData.endTime;

  const onSubmit = (data: ScheduleData) => {
    const startDateTime = `${data.startDate}T${data.startTime}`;
    const endDateTime = `${data.endDate}T${data.endTime}`;

    // formattedData 생성
    const formattedData = {
      ...data,
      curriculumIds: [1, 2, 3], // 무엇인지는 모르겠으나 우선 백엔드 요청 데이터에 맞게 추가
      startDateTime,
      endDateTime,
    };

    // 불필요한 필드 제거
    delete formattedData.startDate;
    delete formattedData.startTime;
    delete formattedData.endDate;
    delete formattedData.endTime;

    console.log("formattedData", formattedData);
    reset();
    onClose();
  };

  const onClickCloseBtn = () => {
    reset();
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
                name="startDate"
                label="일정 시작일"
                required
                registerOptions={{
                  required: "일정 시작일을 선택해주세요",
                }}
              />
              <LabelInputDate
                name="endDate"
                label="일정 마감일"
                required
                registerOptions={{
                  required: "일정 마감일을 선택해주세요",
                }}
              />
            </div>
            <div className="flex w-full flex-col gap-3 mobile:flex-row">
              <LabelInput
                label="일정 시작 시간"
                name="startTime"
                placeholder="00:00:00"
                required
                registerOptions={{
                  required: "00:00:00 형식에 맞게 입력하세요.",
                  pattern: {
                    value: /^\d{2}:\d{2}:\d{2}$/,
                    message: "00:00:00 형식에 맞게 입력하세요.",
                  },
                }}
              />
              <LabelInput
                label="일정 종료 시간"
                name="endTime"
                placeholder="00:00:00"
                required
                registerOptions={{
                  required: "00:00:00 형식에 맞게 입력하세요.",
                  pattern: {
                    value: /^\d{2}:\d{2}:\d{2}$/,
                    message: "00:00:00 형식에 맞게 입력하세요.",
                  },
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
